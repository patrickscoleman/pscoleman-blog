import type { Metadata } from 'next';
import Link from 'next/link';
import { Arrow } from '@/components/arrow';
import { getTranslations } from '@/lib/translations';
import { pageAlternates, socialMetadata } from '@/lib/site';

const description =
  'Translations from Spanish and Japanese by Patrick Coleman: Cortázar, Murakami, Bashō, and Dōgen.';

export const metadata: Metadata = {
  title: 'Translations',
  description,
  alternates: pageAlternates('/translations'),
  ...socialMetadata(
    'Translations · Patrick Coleman',
    description,
    '/translations',
    '/social/translations',
  ),
};

export default function TranslationsPage() {
  const translations = getTranslations();
  return (
    <main id="main-content" tabIndex={-1} className="index-main">
      <p className="eyebrow">Spanish / Japanese → English</p>
      <h1 className="index-title">Translations</h1>
      <ol className="translation-list">
        {translations.map((translation, index) => (
          <li key={translation.slug}>
            <Link
              className="translation-row"
              href={`/translations/${translation.slug}`}
            >
              <span className="translation-number" aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className="translation-title-group">
                <span className="translation-title">{translation.title}</span>
                <span className="translation-author">{translation.author}</span>
              </span>
              <span className="translation-language">
                {translation.language}
                <span className="translation-form">{translation.form}</span>
              </span>
              <Arrow />
            </Link>
          </li>
        ))}
      </ol>
    </main>
  );
}
