import { z } from 'zod';
import {
  languages,
  validateLanguageLevelSnapshot,
  type LanguageLevelSnapshot,
} from './language-levels-model';

const apiOrigins = new Set([
  'https://app.alloglot.com',
  'https://app.aloglot.com',
]);
const codes = languages.map(({ code }) => code);
const selectedLanguages = codes.join(',');

export function isLevelsEndpoint(value: string): boolean {
  try {
    const url = new URL(value);
    return (
      apiOrigins.has(url.origin) &&
      !url.username &&
      !url.password &&
      !url.hash &&
      url.pathname === '/api/v1/levels' &&
      [...url.searchParams.keys()].length === 1 &&
      url.searchParams.get('languages') === selectedLanguages
    );
  } catch {
    return false;
  }
}

const wireRow = z
  .object({
    code: z.enum(['en', 'es', 'ja', 'ko', 'fr']),
    status: z.enum(['available', 'native', 'unavailable']),
    displayLevel: z
      .string()
      .max(32)
      .regex(/^(0|[1-9]\d*)(?:\.\d+)?$/)
      .nullable(),
    native: z.boolean(),
    explanationUrl: z.string().min(1).max(2048),
  })
  .refine((row) => {
    if (row.status === 'native') return row.native && row.displayLevel === null;
    if (row.status === 'available')
      return !row.native && row.displayLevel !== null;
    return !row.native && row.displayLevel === null;
  }, 'Contradictory language status');
const wireSnapshot = z
  .object({
    calculatedAt: z.iso.datetime(),
    languages: z.array(wireRow).max(codes.length),
  })
  .refine(
    (value) =>
      new Set(value.languages.map((row) => row.code)).size ===
      value.languages.length,
    'Duplicate language codes',
  );

export interface AlloglotLevelAdapter {
  version: string;
  request(endpoint: string, key: string): Request;
  parse(body: unknown, endpoint: string): LanguageLevelSnapshot;
}

export const alloglotAdapter: AlloglotLevelAdapter = {
  version: 'levels-v1',
  request(endpoint, key) {
    if (!isLevelsEndpoint(endpoint) || !key.trim())
      throw new Error('Invalid levels configuration');
    return new Request(endpoint, {
      method: 'GET',
      headers: { Authorization: `Bearer ${key}`, Accept: 'application/json' },
    });
  },
  parse(body, endpoint) {
    if (!isLevelsEndpoint(endpoint)) throw new Error('Invalid levels endpoint');
    const parsed = wireSnapshot.parse(body);
    const mapped = parsed.languages.map((row) => {
      const url = new URL(row.explanationUrl, new URL(endpoint).origin);
      const value = row.status === 'native' ? 'native' : row.displayLevel;
      const valid =
        apiOrigins.has(url.origin) &&
        !url.username &&
        !url.password &&
        url.pathname === `/levels/${row.code}` &&
        (value === null
          ? !url.search && !url.hash
          : [...url.searchParams.keys()].length === 1 &&
            url.searchParams.get('level') === value &&
            url.hash === `#level-${value}`);
      if (!valid) throw new Error('Invalid public level guide');
      return {
        code: row.code,
        native: row.native,
        displayLevel: row.displayLevel,
        explanationUrl: url.href,
      };
    });
    return validateLanguageLevelSnapshot({ ...parsed, languages: mapped });
  },
};
