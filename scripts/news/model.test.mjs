import assert from 'node:assert/strict';
import test from 'node:test';
import {
  canonicalUrl,
  receiveNewsletter,
  selectHackerNews,
} from '../../prototypes/news/model.mjs';

const mail = {
  verifiedIngress: true,
  dedicatedRecipient: true,
  authenticatedSender: true,
  isNewsletter: true,
  listId: '<events.example.org>',
  name: 'Example Letter',
  category: 'Local events',
};
test('new newsletter is recognized once; manual category and pause survive later mail', () => {
  const first = receiveNewsletter([], mail);
  assert.equal(first.result, 'added');
  assert.equal(first.sources[0].category, 'Local events');
  const configured = [
    { ...first.sources[0], category: 'Culture', status: 'paused' },
  ];
  const repeat = receiveNewsletter(configured, {
    ...mail,
    name: 'A changed display name',
  });
  assert.equal(repeat.process, false);
  assert.equal(repeat.sources.length, 1);
  assert.equal(repeat.sources[0].category, 'Culture');
  const resumed = receiveNewsletter(
    [{ ...configured[0], status: 'enabled' }],
    mail,
  );
  assert.equal(resumed.process, true);
});
test('removed source is remembered and is not automatically resurrected', () => {
  const known = receiveNewsletter([], mail).sources.map((source) => ({
    ...source,
    status: 'removed',
  }));
  assert.equal(receiveNewsletter(known, mail).result, 'removed');
  assert.equal(receiveNewsletter(known, mail).process, false);
});
test('unknown, unauthenticated and non-newsletter messages never auto-enable', () => {
  for (const key of [
    'verifiedIngress',
    'dedicatedRecipient',
    'authenticatedSender',
    'isNewsletter',
  ]) {
    assert.equal(
      receiveNewsletter([], { ...mail, [key]: false }).sources.length,
      0,
    );
  }
  assert.equal(
    receiveNewsletter([], { ...mail, listId: '' }).result,
    'needs-review',
  );
  assert.equal(
    receiveNewsletter([], { ...mail, category: 'untrusted category' })
      .sources[0].category,
    'Unfiled',
  );
});
test('article URLs deduplicate tracking parameters without removing meaningful queries', () => {
  assert.equal(
    canonicalUrl('https://example.org/article?id=2&utm_source=email#section'),
    'https://example.org/article?id=2',
  );
  for (const url of [
    'javascript:alert(1)',
    'https://example.org/?token=private',
    'https://example.org/?mc_eid=recipient',
    'https://user:password@example.org/',
  ])
    assert.equal(canonicalUrl(url), null);
});
test('HN selection caps two stories, excludes stale/dead content and deduplicates original URLs', () => {
  const now = Date.parse('2026-10-27T20:00:00Z');
  const story = {
    type: 'story',
    score: 100,
    time: now / 1000 - 3600,
    url: 'https://example.org/one',
  };
  const picked = selectHackerNews(
    [
      { ...story, id: 1, score: 200 },
      { ...story, id: 2, url: 'https://example.org/one?utm_source=hn' },
      {
        ...story,
        id: 3,
        url: 'https://example.org/dead',
        dead: true,
        score: 900,
      },
      {
        ...story,
        id: 4,
        url: 'https://example.org/stale',
        time: now / 1000 - 172800,
        score: 900,
      },
      { ...story, id: 5, url: 'https://example.org/two', score: 90 },
      { ...story, id: 6, type: 'job', score: 900 },
    ],
    now,
    20,
  );
  assert.deepEqual(
    picked.map((item) => item.id),
    [1, 5],
  );
  assert.deepEqual(selectHackerNews([], now), []);
});
