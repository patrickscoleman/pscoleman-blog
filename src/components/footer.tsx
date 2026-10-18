import { ExternalLink } from './external-link';
import { LANGUAGE_LEVELS_OVERVIEW_URL } from '@/lib/language-levels-model';

export function Footer() {
  return (
    <footer className="site-footer">
      <p
        className="footer-footnote"
        id="language-levels-note"
        role="doc-footnote"
        tabIndex={-1}
      >
        <a
          href="/#language-levels-ref"
          role="doc-backlink"
          aria-label="Back to Languages, footnote 1"
        >
          1.
        </a>
        <ExternalLink href={LANGUAGE_LEVELS_OVERVIEW_URL}>
          Alloglot levels
        </ExternalLink>
      </p>
      <span>© {new Date().getFullYear()} Patrick Coleman</span>
      <nav className="footer-links" aria-label="Site information">
        <a href="/feed.xml">RSS</a>
        <ExternalLink href="https://github.com/patrickscoleman/pscoleman-blog">
          Source
        </ExternalLink>
      </nav>
    </footer>
  );
}
