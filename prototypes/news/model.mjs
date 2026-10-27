// Prototype contracts, not a production ingress or authentication boundary.
export const categories = [
  'US & world',
  'Business & technology',
  'San Francisco',
  'Sports',
  'Books & languages',
  'Culture',
  'Local events',
  'Unfiled',
];

export function canonicalUrl(input) {
  try {
    const url = new URL(input);
    if (
      !['https:', 'http:'].includes(url.protocol) ||
      url.username ||
      url.password
    )
      return null;
    // Recipient-specific links must never be presented as ordinary article URLs.
    if (
      [...url.searchParams.keys()].some((key) =>
        /^(token|auth|signature|subscriber_id|email|mc_eid)$/i.test(key),
      )
    )
      return null;
    for (const key of [...url.searchParams.keys()]) {
      if (/^(utm_.+|fbclid|gclid|mc_cid)$/i.test(key))
        url.searchParams.delete(key);
    }
    url.hash = '';
    return url.href;
  } catch {
    return null;
  }
}

export function receiveNewsletter(sources, message) {
  // These verdicts must come from trusted ingress verification in production,
  // never from fields supplied by a webhook caller or message headers alone.
  if (
    !message.verifiedIngress ||
    !message.dedicatedRecipient ||
    !message.authenticatedSender ||
    !message.listId ||
    !message.isNewsletter
  ) {
    return { sources, process: false, result: 'needs-review' };
  }
  const identity = message.listId.trim().replace(/^<|>$/g, '').toLowerCase();
  if (!/^[a-z0-9._-]+\.[a-z0-9.-]+$/.test(identity))
    return { sources, process: false, result: 'needs-review' };
  const existing = sources.find((source) => source.id === identity);
  if (existing)
    return {
      sources,
      process: existing.status === 'enabled',
      result: existing.status,
    };
  const source = {
    id: identity,
    name: message.name,
    category: categories.includes(message.category)
      ? message.category
      : 'Unfiled',
    status: 'enabled',
    kind: 'Newsletter',
    detail: 'Added from a sample email · category can be changed',
  };
  return { sources: [source, ...sources], process: true, result: 'added' };
}

export function selectHackerNews(items, now, limit = 2) {
  const oldest = now - 24 * 60 * 60 * 1000;
  const seen = new Set();
  return items
    .slice(0, 60)
    .filter(
      (item) =>
        item.type === 'story' &&
        !item.dead &&
        !item.deleted &&
        item.score >= 80 &&
        item.time * 1000 >= oldest &&
        item.time * 1000 <= now + 300000,
    )
    .sort((a, b) => b.score - a.score || b.time - a.time)
    .filter((item) => {
      const url = canonicalUrl(item.url);
      if (!url || seen.has(url)) return false;
      seen.add(url);
      return true;
    })
    .slice(0, Math.min(Math.max(limit, 0), 2));
}
