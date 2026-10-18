import assert from 'node:assert/strict';
import {
  validateLanguageLevelSnapshot,
  isAlloglotUrl,
  languageLevelLabel,
  LANGUAGE_GUIDE_LINKS_ENABLED,
} from '../src/lib/language-levels-model.ts';
const row = {
  code: 'fr',
  displayLevel: '0.2',
  native: false,
  explanationUrl: 'https://alloglot.com/levels/french#level-0-2',
};
const wrap = (languages) => ({
  calculatedAt: '2026-10-16T00:00:00Z',
  languages,
});
assert.equal(
  validateLanguageLevelSnapshot(wrap([row])).languages[0].displayLevel,
  '0.2',
);
assert.equal(
  validateLanguageLevelSnapshot(wrap([{ ...row, displayLevel: null }]))
    .languages[0].displayLevel,
  null,
);
assert.equal(
  validateLanguageLevelSnapshot(
    wrap([{ ...row, code: 'en', native: true, displayLevel: null }]),
  ).languages[0].native,
  true,
);
assert.equal(
  validateLanguageLevelSnapshot(wrap([{ ...row, code: 'de' }])).languages
    .length,
  0,
);
assert.equal(
  validateLanguageLevelSnapshot(wrap([{ ...row, displayLevel: '0' }]))
    .languages[0].displayLevel,
  '0',
);
for (const displayLevel of ['', ' ', 'x'.repeat(33), '<script>'])
  assert.throws(() =>
    validateLanguageLevelSnapshot(wrap([{ ...row, displayLevel }])),
  );
for (const explanationUrl of [
  'javascript:alert(1)',
  'https://alloglot.com.evil.example/',
  'https://user:pass@alloglot.com/',
  'http://alloglot.com/',
])
  assert.equal(isAlloglotUrl(explanationUrl), false);
assert.throws(() => validateLanguageLevelSnapshot(wrap([row, row])));
assert.throws(() =>
  validateLanguageLevelSnapshot(wrap([{ ...row, native: true }])),
);
assert.throws(() =>
  validateLanguageLevelSnapshot({
    ...wrap([row]),
    calculatedAt: 'not a timestamp',
  }),
);
console.log(
  'Language levels verified: sublevels, native/missing states, selected languages, malformed data and URL boundaries.',
);

// Resolve extensionless TypeScript imports for Node's native type-stripping runner.
const { registerHooks } = await import('node:module');
registerHooks({
  resolve(specifier, context, nextResolve) {
    try {
      return nextResolve(specifier, context);
    } catch (error) {
      if (
        error.code === 'ERR_MODULE_NOT_FOUND' &&
        specifier.startsWith('./') &&
        context.parentURL?.endsWith('.ts')
      )
        return nextResolve(`${specifier}.ts`, context);
      throw error;
    }
  },
});
const { alloglotAdapter, isLevelsEndpoint } =
  await import('../src/lib/language-levels-adapter.ts');
const { fetchLanguageLevels, LevelsFetchError, retryAfterTime } =
  await import('../src/lib/language-levels-fetch.ts');
const endpoint =
  'https://app.alloglot.com/api/v1/levels?languages=en,es,ja,ko,fr';
const wire = {
  calculatedAt: '2026-10-16T00:00:00Z',
  languages: [
    {
      code: 'en',
      status: 'native',
      native: true,
      displayLevel: null,
      explanationUrl: '/levels/en?level=native#level-native',
    },
    ...['es', 'ja', 'ko', 'fr'].map((code, i) => ({
      code,
      status: 'available',
      native: false,
      displayLevel: ['3', '10.4', '0', '0.2'][i],
      explanationUrl: `/levels/${code}?level=${['3', '10.4', '0', '0.2'][i]}#level-${['3', '10.4', '0', '0.2'][i]}`,
    })),
  ],
};
assert(isLevelsEndpoint(endpoint));
assert(isLevelsEndpoint(endpoint.replace('app.alloglot', 'app.aloglot')));
for (const url of [
  `${endpoint}&languages=en`,
  `${endpoint}&extra=1`,
  `${endpoint}#x`,
  endpoint.replace('/api/v1/levels', '/other'),
  endpoint.replace('app.alloglot.com', 'evil.example'),
  endpoint.replace('en,es,ja,ko,fr', 'en'),
])
  assert(!isLevelsEndpoint(url));
const request = alloglotAdapter.request(endpoint, 'test-only-not-a-real-key');
assert.equal(request.method, 'GET');
assert.equal(
  request.headers.get('authorization'),
  'Bearer test-only-not-a-real-key',
);
assert.equal(
  alloglotAdapter.parse(wire, endpoint).languages[3].displayLevel,
  '0',
);
assert.equal(
  alloglotAdapter.parse(wire, endpoint).languages[4].displayLevel,
  '0.2',
);
assert.equal(
  alloglotAdapter.parse({ ...wire, languages: [] }, endpoint).languages.length,
  0,
);
const invalidRows = [
  { ...wire.languages[0], status: 'available' },
  { ...wire.languages[1], displayLevel: null },
  { ...wire.languages[1], native: true },
  { ...wire.languages[1], displayLevel: '<script>' },
  {
    ...wire.languages[1],
    explanationUrl: 'https://evil.example/levels/es?level=3#level-3',
  },
  { ...wire.languages[1], explanationUrl: '/levels/es?level=4#level-4' },
  { ...wire.languages[1], explanationUrl: '/signin' },
];
for (const row of invalidRows)
  assert.throws(() =>
    alloglotAdapter.parse({ ...wire, languages: [row] }, endpoint),
  );
assert.throws(() =>
  alloglotAdapter.parse(
    { ...wire, languages: [wire.languages[0], wire.languages[0]] },
    endpoint,
  ),
);
const unavailable = {
  code: 'fr',
  status: 'unavailable',
  native: false,
  displayLevel: null,
  explanationUrl: '/levels/fr',
};
assert.equal(
  alloglotAdapter.parse({ ...wire, languages: [unavailable] }, endpoint)
    .languages[0].displayLevel,
  null,
);
const json = (value, status = 200, headers = {}) =>
  new Response(JSON.stringify(value), {
    status,
    headers: { 'content-type': 'application/json', ...headers },
  });
const makeFetcher = (api) => async (input, options) => {
  assert(
    input instanceof Request,
    'Only the API is fetched; guides are switched off',
  );
  assert.equal(input.url, endpoint);
  assert.equal(options.cache, 'no-store');
  assert.equal(options.redirect, 'error');
  return api();
};
const success = await fetchLanguageLevels(
  endpoint,
  'test-only-not-a-real-key',
  makeFetcher(() => json(wire)),
);
assert.equal(success.languages[4].displayLevel, '0.2');
assert.equal(
  success.languages[4].explanationUrl,
  'https://app.alloglot.com/levels/fr?level=0.2#level-0.2',
);
for (const status of [400, 429, 500, 503, 204])
  await assert.rejects(
    () =>
      fetchLanguageLevels(
        endpoint,
        'test-only',
        makeFetcher(() =>
          status === 204
            ? new Response(null, { status })
            : json({ error: 'failure', code: 'unavailable' }, status),
        ),
      ),
    LevelsFetchError,
  );
await assert.rejects(() =>
  fetchLanguageLevels(
    endpoint,
    'test-only',
    makeFetcher(
      () =>
        new Response('<html>not found</html>', {
          status: 404,
          headers: { 'content-type': 'text/html' },
        }),
    ),
  ),
);
await assert.rejects(() =>
  fetchLanguageLevels(
    endpoint,
    'test-only',
    makeFetcher(() => {
      throw new TypeError('Network failure');
    }),
  ),
);
await assert.rejects(() =>
  fetchLanguageLevels(
    endpoint,
    'test-only',
    makeFetcher(() => json({ ...wire, languages: invalidRows })),
  ),
);
for (const [status, code] of [
  [401, 'unauthorized'],
  [403, 'forbidden'],
  [404, 'not_found'],
])
  await assert.rejects(
    () =>
      fetchLanguageLevels(
        endpoint,
        'test-only',
        makeFetcher(() => json({ error: 'Access unavailable', code }, status)),
      ),
    (error) => error instanceof LevelsFetchError && error.status === status,
  );
const now = Date.parse('2026-10-16T00:00:00Z');
assert.equal(retryAfterTime('120', now), now + 120000);
assert.equal(
  retryAfterTime('Fri, 16 Oct 2026 00:03:00 GMT', now),
  now + 180000,
);
assert.equal(retryAfterTime('invalid', now), now + 60000);
console.log(
  'Alloglot contract verified: GET/auth, exact endpoint, statuses, string levels, public guides without credentials, retry/backoff and access-denial handling.',
);

assert.equal(typeof LANGUAGE_GUIDE_LINKS_ENABLED, 'boolean');
assert.equal(
  languageLevelLabel({ ...row, native: true, displayLevel: null }),
  'Native',
);
assert.equal(languageLevelLabel({ ...row, displayLevel: null }), null);
assert.equal(languageLevelLabel(undefined), null);
for (const value of ['0', '0.2', '3', '10.4', '3.00'])
  assert.equal(languageLevelLabel({ ...row, displayLevel: value }), value);
const { refreshLevels, emptyLevelsState } =
  await import('../src/lib/language-levels-state.ts');
let saved = null,
  calls = 0;
const warnings = [];
const store = {
  get: async () => saved && structuredClone(saved),
  set: async (state) => {
    saved = structuredClone(state);
  },
};
const good = () => {
  calls++;
  return Promise.resolve(success);
};
assert.deepEqual(
  await refreshLevels(store, good, now, (message) => warnings.push(message)),
  success,
);
assert.equal(calls, 1);
await refreshLevels(store, good, now + 1000, (message) =>
  warnings.push(message),
);
assert.equal(calls, 1, 'Hourly backoff must suppress calls');
for (const failure of [
  new TypeError('offline'),
  new LevelsFetchError(0, 503),
  new LevelsFetchError(now + 10000000, 429),
  new SyntaxError('bad json'),
]) {
  saved.nextAttempt = 0;
  const previousDate = saved.snapshot.calculatedAt;
  const result = await refreshLevels(
    store,
    async () => {
      throw failure;
    },
    now + 3600000,
    (message) => warnings.push(message),
  );
  assert.deepEqual(result, success);
  assert.equal(saved.snapshot.calculatedAt, previousDate);
  assert(saved.nextAttempt >= now + 7200000);
  if (failure.status === 429) assert(saved.nextAttempt >= failure.retryAt);
}
saved = { ...emptyLevelsState(), snapshot: success };
const denied = async () => {
  calls++;
  throw new LevelsFetchError(0, 401);
};
await refreshLevels(store, denied, now, (message) => warnings.push(message));
await refreshLevels(store, denied, now + 3600000, (message) =>
  warnings.push(message),
);
assert.equal(saved.suspended, true);
const beforeCalls = calls;
assert.deepEqual(
  await refreshLevels(store, denied, now + 86400000, (message) =>
    warnings.push(message),
  ),
  success,
);
assert.equal(
  calls,
  beforeCalls,
  'Suspended credentials must stop polling, even with a new reader',
);
assert(warnings.some((message) => message.includes('polling suspended')));
assert.deepEqual(saved.snapshot, success);
console.log(
  'Private snapshot survives failures/restarts; hourly and Retry-After backoff, repeated-auth suspension, exact display strings and guide-link switch verified.',
);
