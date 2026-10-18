import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { Arrow } from '@/components/arrow';
import { ExternalLink } from '@/components/external-link';
import { Portrait } from '@/components/portrait';
import { Languages } from '@/components/languages';
import { getLanguageLevels } from '@/lib/language-levels';
import { pageAlternates } from '@/lib/site';

const handwriting = localFont({
  src: '../fonts/patrick-sharpie.woff2',
  variable: '--font-handwriting',
  weight: '400',
  display: 'swap',
  preload: true,
  adjustFontFallback: false,
  fallback: ['Courier New', 'monospace'],
});

export const metadata: Metadata = {
  alternates: pageAlternates('/'),
};

const socials = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/patrickscoleman' },
  { label: 'X', href: 'https://x.com/patrickscoleman' },
  { label: 'GitHub', href: 'https://github.com/patrickscoleman' },
  { label: 'Email', href: 'mailto:patrick@pscoleman.me' },
];

const profile = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  url: 'https://pscoleman.me',
  mainEntity: {
    '@type': 'Person',
    '@id': 'https://pscoleman.me/#patrick',
    name: 'Patrick Coleman',
    url: 'https://pscoleman.me',
    image: 'https://pscoleman.me/images/patrick.png',
    sameAs: socials
      .filter(({ href }) => !href.startsWith('mailto:'))
      .map(({ href }) => href),
  },
};

const website = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': 'https://pscoleman.me/#website',
  url: 'https://pscoleman.me/',
  name: 'Patrick Coleman',
  inLanguage: 'en',
  author: { '@id': 'https://pscoleman.me/#patrick' },
};

export const revalidate = 3600;

export default async function Home() {
  const levels = await getLanguageLevels();
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className={`home-main ${handwriting.variable}`}
    >
      <script type="application/ld+json">
        {JSON.stringify([profile, website]).replace(/</g, '\\u003c')}
      </script>
      <div className="home-grid">
        <div className="home-intro">
          <h1>
            <span className="name-line">Patrick</span>{' '}
            <span className="name-line">Coleman</span>
          </h1>
          <div className="bio">
            <p>
              I’m a generalist. I build products and help companies grow.
              Currently working on{' '}
              <ExternalLink href="https://aloglot.com">Alloglot</ExternalLink>,
              a language learning app built on audiobooks.
            </p>
            <p>
              Previously, I was an early leader at{' '}
              <ExternalLink href="https://replit.com">Replit</ExternalLink> and
              PeopleGrove, co-founded Yaya (another language learning app), and
              worked on voice AI at{' '}
              <ExternalLink href="https://rime.ai">Rime</ExternalLink>. My
              career started in finance.
            </p>
            <p>
              I live with my wife Courtney and our dog Mara in San Francisco.
            </p>
          </div>
        </div>
        <aside className="portrait-column" aria-label="Portrait">
          <Portrait />
        </aside>
      </div>
      <section className="interests" aria-labelledby="interests-heading">
        <div className="interests-heading">
          <h2 id="interests-heading">Current curiosities</h2>
        </div>
        <div className="interest-copy">
          <div className="interest-item interest-languages">
            <h3>
              Languages
              <sup className="footnote-marker">
                <a
                  id="language-levels-ref"
                  href="#language-levels-note"
                  role="doc-noteref"
                  aria-label="Footnote 1: Alloglot language levels"
                >
                  1
                </a>
              </sup>
            </h3>
            <Languages snapshot={levels} />
          </div>
          <div className="interest-item interest-reading">
            <h3>On the bookshelf</h3>
            <p>
              Murakami, Bolaño, Han Kang, Moebius comics, and philosophy I only
              sorta grok.
            </p>
          </div>
          <div className="interest-item interest-ideas">
            <h3>Down some rabbit holes</h3>
            <p>
              Embodied cognition, postbiotic intelligence, relational quantum
              mechanics, and computer history.
            </p>
          </div>
          <div className="interest-item interest-music">
            <h3>And otherwise</h3>
            <p>
              Hiking, climbing, yoga. Chill electronic, country, folk, and psych
              rock. SF Giants.
            </p>
          </div>
        </div>
      </section>
      <div className="contact-row">
        <nav className="social-links" aria-label="Social and contact links">
          {socials.map((social) =>
            social.href.startsWith('mailto:') ? (
              <a key={social.label} href={social.href}>
                {social.label}
                <Arrow external />
              </a>
            ) : (
              <ExternalLink key={social.label} href={social.href}>
                {social.label}
                <Arrow external />
              </ExternalLink>
            ),
          )}
        </nav>
      </div>
    </main>
  );
}
