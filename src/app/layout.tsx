import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { metadataBase, socialMetadata } from '@/lib/site';

const description =
  'Patrick Coleman builds products and helps companies grow. Personal site and translations from Spanish and Japanese.';

export const viewport: Viewport = {
  themeColor: '#faf9f6',
  colorScheme: 'light',
  viewportFit: 'cover',
};

export const metadata: Metadata = {
  metadataBase,
  title: { default: 'Patrick Coleman', template: '%s · Patrick Coleman' },
  description,
  manifest: '/manifest.webmanifest',
  alternates: {
    types: { 'application/rss+xml': 'https://pscoleman.me/feed.xml' },
  },
  robots:
    process.env.VERCEL_ENV === 'preview'
      ? { index: false, follow: false }
      : { index: true, follow: true },
  ...socialMetadata('Patrick Coleman', description, '/'),
  icons: { icon: '/favicon.svg' },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <div className="site-frame">
          <Header />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
