import type { MetadataRoute } from 'next';
import { getTranslations } from '@/lib/translations';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    '/',
    '/translations',
    ...getTranslations().map((entry) => `/translations/${entry.slug}`),
  ].map((pathname) => ({
    url: `https://pscoleman.me${pathname}`,
  }));
}
