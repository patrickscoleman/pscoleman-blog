import { alloglotAdapter } from './language-levels-adapter';
import type { LanguageLevelSnapshot } from './language-levels-model';

type Fetcher = typeof fetch;
export class LevelsFetchError extends Error {
  readonly retryAt: number;
  readonly status: number;
  constructor(retryAt = 0, status = 0) {
    super('Alloglot levels unavailable');
    this.retryAt = retryAt;
    this.status = status;
  }
}
export function retryAfterTime(value: string | null, now = Date.now()): number {
  if (!value) return now + 60000;
  const milliseconds = /^\d+$/.test(value)
    ? Number(value) * 1000
    : Date.parse(value) - now;
  return (
    now +
    (Number.isFinite(milliseconds) ? Math.max(60000, milliseconds) : 60000)
  );
}

// This module receives dependencies, never reads credentials. Only the server-only
// language-levels module calls it in the application; tests use a fake fetcher.
export async function fetchLanguageLevels(
  endpoint: string,
  key: string,
  fetcher: Fetcher = fetch,
): Promise<LanguageLevelSnapshot> {
  const response = await fetcher(alloglotAdapter.request(endpoint, key), {
    cache: 'no-store',
    redirect: 'error',
    signal: AbortSignal.timeout(5000),
  });
  if (response.status === 429)
    throw new LevelsFetchError(
      retryAfterTime(response.headers.get('retry-after')),
      429,
    );
  if (
    response.status !== 200 ||
    !(response.headers.get('content-type') ?? '').includes('application/json')
  )
    throw new LevelsFetchError(0, response.status);
  const text = await response.text();
  if (text.length > 65536) throw new LevelsFetchError();
  const snapshot = alloglotAdapter.parse(JSON.parse(text), endpoint);
  return snapshot;
}
