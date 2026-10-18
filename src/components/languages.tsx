import { ExternalLink } from './external-link';
import {
  languages,
  LANGUAGE_GUIDE_LINKS_ENABLED,
  languageLevelLabel,
  type LanguageLevelSnapshot,
} from '@/lib/language-levels-model';

export function Languages({
  snapshot,
}: {
  snapshot: LanguageLevelSnapshot | null;
}) {
  const levels = new Map(
    snapshot?.languages.map((row) => [row.code, row]) ?? [],
  );
  return (
    <div>
      <ul className="language-list" aria-label="Languages">
        {languages.map((language) => {
          const level = levels.get(language.code);
          const label = languageLevelLabel(level);
          const contents = (
            <>
              <span lang={language.code}>{language.name}</span>
              <span className="language-level">
                <span aria-hidden="true">[</span>
                {label ?? (
                  <>
                    <span aria-hidden="true">—</span>
                    <span className="sr-only">level unavailable</span>
                  </>
                )}
                <span aria-hidden="true">]</span>
              </span>
            </>
          );
          return (
            <li key={language.code}>
              {LANGUAGE_GUIDE_LINKS_ENABLED && level?.explanationUrl ? (
                <ExternalLink
                  href={level.explanationUrl}
                  aria-label={`${language.name}: ${level.native ? 'native language' : label !== null ? `Alloglot level ${label}` : 'level unavailable'}. Level guide (opens in a new tab)`}
                >
                  {contents}
                </ExternalLink>
              ) : (
                <span className="language-entry">{contents}</span>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
