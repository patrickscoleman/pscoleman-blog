import { z } from 'zod';

export const languages = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' },
  { code: 'ja', name: '日本語' },
  { code: 'ko', name: '한국어' },
  { code: 'fr', name: 'Français' },
] as const;

const origins = new Set([
  'https://aloglot.com',
  'https://www.aloglot.com',
  'https://app.aloglot.com',
  'https://alloglot.com',
  'https://www.alloglot.com',
  'https://app.alloglot.com',
]);
export function isAlloglotUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return origins.has(url.origin) && !url.username && !url.password;
  } catch {
    return false;
  }
}

// Internal UI/cache model, not an assumed Alloglot wire format.
// The adapter will map the supplied API contract into this shape.
const level = z
  .object({
    code: z.string().min(2).max(16),
    displayLevel: z
      .string()
      .trim()
      .min(1)
      .max(32)
      .regex(/^[^<>\p{C}]+$/u)
      .nullable(),
    native: z.boolean(),
    explanationUrl: z.string().url().refine(isAlloglotUrl).nullable(),
  })
  .refine(
    (row) => !row.native || row.displayLevel === null,
    'Native language must not imply a measured level',
  );
const snapshot = z
  .object({
    calculatedAt: z.iso.datetime(),
    languages: z.array(level).max(100),
  })
  .refine(
    (data) =>
      new Set(data.languages.map((row) => row.code)).size ===
      data.languages.length,
    'Duplicate language codes',
  );
export type LanguageLevelSnapshot = z.infer<typeof snapshot>;

export function validateLanguageLevelSnapshot(
  value: unknown,
): LanguageLevelSnapshot {
  const parsed = snapshot.parse(value);
  return {
    ...parsed,
    languages: parsed.languages.filter((row) =>
      languages.some((language) => language.code === row.code),
    ),
  };
}

// Requested for the combined review. Alloglot must publish its signed-out
// guides before this review branch is approved for production.
export const LANGUAGE_GUIDE_LINKS_ENABLED = true;
export const LANGUAGE_LEVELS_OVERVIEW_URL = 'https://app.alloglot.com/levels';
export function languageLevelLabel(
  row: LanguageLevelSnapshot['languages'][number] | undefined,
): string | null {
  return row?.native ? 'Native' : (row?.displayLevel ?? null);
}
