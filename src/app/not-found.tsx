import Link from 'next/link';
import type { Metadata } from 'next';
import { Arrow } from '@/components/arrow';

export const metadata: Metadata = {
  title: 'Page not found',
  description:
    'This page is no longer available on Patrick Coleman’s personal site.',
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main id="main-content" tabIndex={-1} className="not-found">
      <p className="eyebrow">404</p>
      <h1>Page not found</h1>
      <p>The page you’re looking for is no longer here.</p>
      <Link className="back-link" href="/">
        <Arrow direction="left" />
        <span className="link-label">Back to home</span>
      </Link>
    </main>
  );
}
