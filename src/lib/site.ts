import type { Metadata } from 'next';

export const siteUrl = 'https://pscoleman.me';
const imageOrigin =
  process.env.VERCEL_ENV === 'preview' && process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : siteUrl;

export function socialMetadata(
  title: string,
  description: string,
  pathname: string,
  image = '/opengraph-image',
  article = false,
): Pick<Metadata, 'openGraph' | 'twitter'> {
  const imageUrl = new URL(image, imageOrigin).href;
  return {
    openGraph: {
      title,
      description,
      url: `${siteUrl}${pathname}`,
      type: article ? 'article' : 'website',
      siteName: 'Patrick Coleman',
      images: [{ url: imageUrl, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      creator: '@patrickscoleman',
      title,
      description,
      images: [{ url: imageUrl, alt: title }],
    },
  };
}

export const metadataBase = new URL(imageOrigin);

export function pageAlternates(pathname: string): Metadata['alternates'] {
  return {
    canonical: `${siteUrl}${pathname}`,
    types: { 'application/rss+xml': `${siteUrl}/feed.xml` },
  };
}
