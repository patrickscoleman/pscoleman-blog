import { getTranslations } from '@/lib/translations';

export const dynamic = 'force-static';
function escapeXml(value: string) {
  return value.replace(
    /[<>&"']/g,
    (character) =>
      ({
        '<': '&lt;',
        '>': '&gt;',
        '&': '&amp;',
        '"': '&quot;',
        "'": '&apos;',
      })[character] ?? character,
  );
}
export function GET() {
  const items = [...getTranslations()]
    .sort((a, b) => b.translated.localeCompare(a.translated))
    .map((work) => {
      const url = `https://pscoleman.me/translations/${work.slug}`;
      return `<item><title>${escapeXml(work.title)}</title><link>${url}</link><guid isPermaLink="true">${url}</guid><description>${escapeXml(`${work.title} by ${work.author}, translated from ${work.language} by Patrick Coleman.`)}</description><pubDate>${new Date(`${work.translated}T00:00:00Z`).toUTCString()}</pubDate></item>`;
    })
    .join('');
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel><title>Patrick Coleman — Translations</title><link>https://pscoleman.me/translations</link><description>Literary translations from Spanish and Japanese by Patrick Coleman.</description><language>en</language><atom:link href="https://pscoleman.me/feed.xml" rel="self" type="application/rss+xml"/>${items}</channel></rss>`,
    { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } },
  );
}
