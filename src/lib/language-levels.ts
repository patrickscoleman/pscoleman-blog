import 'server-only';
import { createHash } from 'node:crypto';
import { unstable_cache } from 'next/cache';
import { getCache } from '@vercel/functions';
import { alloglotAdapter, isLevelsEndpoint } from './language-levels-adapter';
import { fetchLanguageLevels, LevelsFetchError } from './language-levels-fetch';
import { refreshLevels, type LevelsState } from './language-levels-state';

const DEFAULT_ENDPOINT =
  'https://app.aloglot.com/api/v1/levels?languages=en,es,ja,ko,fr';
const pending = new Map<
  string,
  Promise<NonNullable<Awaited<ReturnType<typeof refreshLevels>>>>
>();

export async function getLanguageLevels() {
  const endpoint = process.env.ALLOGLOT_API_URL || DEFAULT_ENDPOINT;
  const token = process.env.ALLOGLOT_LEVELS_KEY;
  if (!token) return null;
  if (!isLevelsEndpoint(endpoint))
    throw new Error('Alloglot levels: invalid endpoint configuration');
  const credential = createHash('sha256').update(token).digest('hex');
  const key = `pscoleman-levels-v3:${credential}:${endpoint}`;
  const read = unstable_cache(
    async () => {
      const existing = pending.get(key);
      if (existing) return existing;
      const task = (async () => {
        const cache = getCache({ namespace: 'pscoleman-private-levels' });
        const snapshot = await refreshLevels(
          {
            get: async () => (await cache.get(key)) as LevelsState | null,
            set: async (state) => {
              await cache.set(key, state, {
                tags: ['alloglot-language-levels'],
                name: 'Private language levels and refresh state',
              });
            },
          },
          () => fetchLanguageLevels(endpoint, token),
        );
        // Fail the first configured build rather than publish an empty integration.
        // During revalidation, throwing preserves the prior cached page/snapshot.
        if (!snapshot) throw new LevelsFetchError();
        return snapshot;
      })();
      pending.set(key, task);
      try {
        return await task;
      } finally {
        pending.delete(key);
      }
    },
    [
      'alloglot-language-levels-v3',
      alloglotAdapter.version,
      endpoint,
      credential,
    ],
    { revalidate: 3600, tags: ['alloglot-language-levels'] },
  );
  return read();
}
