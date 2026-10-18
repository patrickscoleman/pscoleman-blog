import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Patrick Coleman',
    short_name: 'Patrick Coleman',
    description: 'Personal site and literary translations by Patrick Coleman.',
    start_url: '/',
    display: 'minimal-ui',
    background_color: '#faf9f6',
    theme_color: '#faf9f6',
    icons: [
      {
        src: '/favicon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'any',
      },
    ],
  };
}
