import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getTranslation, getTranslations } from '@/lib/translations';
import { OriginalTextToggle } from '@/components/original-text-toggle';
import { Arrow } from '@/components/arrow';
import { ExternalLink } from '@/components/external-link';
import { pageAlternates, socialMetadata } from '@/lib/site';

export const dynamicParams = false;
export function generateStaticParams() {
  return getTranslations().map(({ slug }) => ({ slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const translation = getTranslation(slug);
  if (!translation) notFound();
  const description =
    translation.title +
    ' by ' +
    translation.author +
    ', translated from ' +
    translation.language +
    ' by Patrick Coleman.';
  return {
    title: translation.title,
    description,
    alternates: pageAlternates(`/translations/${slug}`),
    ...socialMetadata(
      `${translation.title} · Patrick Coleman`,
      description,
      `/translations/${slug}`,
      `/social/${slug}`,
      true,
    ),
  };
}

export default async function TranslationPage({ params }: Props) {
  const { slug } = await params;
  const translation = getTranslation(slug);
  if (!translation) notFound();
  const date = new Date(
    `${translation.translated}T00:00:00Z`,
  ).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  });
  const translations = getTranslations();
  const current = translations.findIndex((entry) => entry.slug === slug);
  const next = translations[(current + 1) % translations.length];
  const url = `https://pscoleman.me/translations/${slug}`;
  const structuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      '@id': `${url}#translation`,
      url,
      mainEntityOfPage: url,
      headline: translation.title,
      inLanguage: 'en',
      datePublished: translation.translated,
      author: { '@type': 'Person', name: translation.author },
      translator: {
        '@type': 'Person',
        '@id': 'https://pscoleman.me/#patrick',
        name: 'Patrick Coleman',
        url: 'https://pscoleman.me/',
      },
      image: `https://pscoleman.me/social/${slug}`,
      isBasedOn: {
        '@type': 'CreativeWork',
        name: translation.title,
        url: translation.source,
        inLanguage: translation.languageCode,
        author: { '@type': 'Person', name: translation.author },
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://pscoleman.me/',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Translations',
          item: 'https://pscoleman.me/translations',
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: translation.title,
          item: url,
        },
      ],
    },
  ];

  return (
    <main id="main-content" tabIndex={-1} className="reader-main">
      <script type="application/ld+json">
        {JSON.stringify(structuredData).replace(/</g, '\\u003c')}
      </script>
      <div className="reading-progress" aria-hidden="true" />
      <Link className="back-link" href="/translations">
        <Arrow direction="left" />
        <span className="link-label">Translations</span>
      </Link>
      <article>
        <header className="reader-header">
          <p className="eyebrow">
            {translation.language} → English <span aria-hidden="true">/</span>{' '}
            {translation.form}
          </p>
          <h1>{translation.title}</h1>
          <p className="reader-author">{translation.author}</p>
          <div className="reader-meta">
            <p>
              Translated by Patrick Coleman
              <br />
              <time dateTime={translation.translated}>{date}</time>
            </p>
            {translation.bilingual && <OriginalTextToggle key={slug} />}
          </div>
        </header>
        <div
          id="translation-text"
          className={`reader-prose ${translation.form === 'Poetry' ? 'poetry' : ''}`}
          dangerouslySetInnerHTML={{ __html: translation.html }}
        />
        <footer className="translation-credit">
          <span className="eyebrow">Original</span>
          <p>
            <ExternalLink href={translation.source}>
              {translation.sourceTitle}
            </ExternalLink>{' '}
            · {translation.author} · {translation.originalYear}
          </p>
        </footer>
      </article>
      <div className="next-translation">
        <span className="eyebrow">Next translation</span>
        <Link href={`/translations/${next.slug}`}>
          <span className="link-label">{next.title}</span>
          <Arrow />
        </Link>
      </div>
    </main>
  );
}
