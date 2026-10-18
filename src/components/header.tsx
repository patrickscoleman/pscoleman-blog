'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Arrow } from './arrow';
import { ExternalLink } from './external-link';

export function Header() {
  const pathname = usePathname();
  return (
    <header className="site-header">
      <Link href="/" className="site-name" aria-label="pscoleman.me — home">
        <span className="signature-dot" aria-hidden="true" />
        <span>
          pscoleman.me
          <span className="host-home" aria-hidden="true">
            :~
          </span>
        </span>
      </Link>
      <nav aria-label="Main navigation">
        <Link
          href="/translations"
          aria-current={
            pathname === '/translations'
              ? 'page'
              : pathname.startsWith('/translations/')
                ? 'location'
                : undefined
          }
        >
          Translations
        </Link>
        <ExternalLink href="https://aloglot.com">
          Alloglot <Arrow external />
        </ExternalLink>
      </nav>
    </header>
  );
}
