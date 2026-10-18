import { LevelsFetchError } from './language-levels-fetch';
import type { LanguageLevelSnapshot } from './language-levels-model';

export type LevelsState = {
  snapshot: LanguageLevelSnapshot | null;
  nextAttempt: number;
  failures: number;
  authFailures: number;
  suspended: boolean;
};
export const emptyLevelsState = (): LevelsState => ({
  snapshot: null,
  nextAttempt: 0,
  failures: 0,
  authFailures: 0,
  suspended: false,
});
export interface LevelsStore {
  get(): Promise<LevelsState | null>;
  set(state: LevelsState): Promise<void>;
}

// Storage and transport are injected so failure/restart behavior is testable.
// Never store the raw response, key, headers, or error body.
export async function refreshLevels(
  store: LevelsStore,
  fetchSnapshot: () => Promise<LanguageLevelSnapshot>,
  now = Date.now(),
  warn: (message: string) => void = console.error,
): Promise<LanguageLevelSnapshot | null> {
  const previous = (await store.get()) ?? emptyLevelsState();
  if (previous.suspended || now < previous.nextAttempt)
    return previous.snapshot;
  let next: LevelsState;
  try {
    const snapshot = await fetchSnapshot();
    next = {
      snapshot,
      nextAttempt: now + 3600000,
      failures: 0,
      authFailures: 0,
      suspended: false,
    };
  } catch (error) {
    const status = error instanceof LevelsFetchError ? error.status : 0;
    const authFailures =
      status === 401 || status === 403 ? previous.authFailures + 1 : 0;
    const failures = previous.failures + 1;
    const suspended = authFailures >= 2;
    next = {
      ...previous,
      failures,
      authFailures,
      suspended,
      nextAttempt: Math.max(
        now + Math.min(21600000, 3600000 * 2 ** Math.min(failures - 1, 3)),
        error instanceof LevelsFetchError ? error.retryAt : 0,
      ),
    };
    if (suspended)
      warn(
        'Alloglot levels configuration warning: polling suspended after repeated 401/403. Replace ALLOGLOT_LEVELS_KEY or clear the private levels cache after fixing access.',
      );
    else
      warn(
        `Alloglot levels refresh deferred (${status || 'network/validation'}); retaining last successful snapshot.`,
      );
  }
  // Cache failure throws: the outer Next Data Cache keeps its previous value.
  await store.set(next);
  return next.snapshot;
}
