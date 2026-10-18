import fs from 'node:fs';
import path from 'node:path';
import { cache } from 'react';
import { marked } from 'marked';
import { parse } from 'yaml';
import { z } from 'zod';

const metadataSchema = z.object({
  title: z.string().min(1),
  author: z.string().min(1),
  language: z.enum(['Spanish', 'Japanese']),
  languageCode: z.enum(['es', 'ja']),
  form: z.enum(['Fiction', 'Poetry', 'Zen text']),
  translated: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  originalYear: z.string(),
  source: z.url(),
  sourceTitle: z.string().min(1),
  bilingual: z.boolean(),
  order: z.number().int().positive(),
});

export type Translation = z.infer<typeof metadataSchema> & {
  slug: string;
  html: string;
};

export const getTranslations = cache((): Translation[] => {
  const directory = path.join(process.cwd(), 'src/content/translations');
  return fs
    .readdirSync(directory)
    .filter((file) => file.endsWith('.md'))
    .map((file) => {
      const text = fs.readFileSync(path.join(directory, file), 'utf8');
      const match = text.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
      if (!match) throw new Error(`Missing translation metadata: ${file}`);
      const metadata = metadataSchema.parse(parse(match[1]));
      return {
        ...metadata,
        slug: file.slice(0, -3),
        // These are trusted, checked-in files. No visitor-supplied HTML is rendered.
        html: marked.parse(match[2], { async: false }),
      };
    })
    .sort((a, b) => a.order - b.order);
});

export function getTranslation(slug: string) {
  return getTranslations().find((translation) => translation.slug === slug);
}
