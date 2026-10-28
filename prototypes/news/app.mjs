import { categories, receiveNewsletter } from './model.mjs';

const main = document.querySelector('main');
// Review-only text enlargement; rem-based type also respects browser font size.
if (new URLSearchParams(location.search).get('text') === '200')
  document.documentElement.style.fontSize = '200%';
const notice = document.querySelector('#notice');
const data = await fetch('/demo-data.json').then((response) => response.json());
// A private fixture must never populate the generic demo through browser state.
const storageKey = `news-design-preview-v2:${data.previewId ?? 'generic'}`;
let sources = structuredClone(data.sources);
try {
  const saved = JSON.parse(localStorage.getItem(storageKey));
  if (
    Array.isArray(saved) &&
    saved.every(
      (source) =>
        typeof source.id === 'string' &&
        typeof source.name === 'string' &&
        categories.includes(source.category) &&
        ['enabled', 'paused', 'removed'].includes(source.status),
    )
  )
    sources = saved;
} catch {
  /* Storage is optional in the design preview. */
}
let filter = 'all';
let query = '';
let noticeTimer;
const esc = (value) =>
  String(value).replace(
    /[&<>"']/g,
    (char) =>
      ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[
        char
      ],
  );
const safeLink = (value) => {
  try {
    const url = new URL(value);
    return url.protocol === 'https:' ? esc(url.href) : '#';
  } catch {
    return '#';
  }
};
const link = (item) =>
  `<a href="${safeLink(item.url)}" target="_blank" rel="noreferrer">${esc(item.label)} ↗</a>`;
function say(text) {
  notice.textContent = text;
  clearTimeout(noticeTimer);
  noticeTimer = setTimeout(() => {
    notice.textContent = '';
  }, 5500);
}
function persist() {
  try {
    localStorage.setItem(storageKey, JSON.stringify(sources));
  } catch {
    say('Browser storage unavailable. Changes last for this visit.');
  }
}
function edition() {
  return `<h1 class="sr-only">Daily news</h1><p class="edition-date">${esc(data.date)}</p>
    <nav class="jump" aria-label="Edition sections">${data.sections.map((section) => `<a href="#section-${esc(section.id)}">${esc(section.title)}</a>`).join('')}<a href="#coming-up">Coming up</a></nav>
    <div class="layout"><div class="briefing">${data.sections.map((section, index) => `<section class="section" id="section-${esc(section.id)}"><h2 class="section-label"><span class="number">${String(index + 1).padStart(2, '0')}</span>${esc(section.title)}</h2>${section.items.map((item) => `<article class="story"><h3>${esc(item.title)}</h3><ul>${item.bullets.map((bullet) => `<li>${esc(bullet)}</li>`).join('')}</ul><div class="source-links">${item.links.map(link).join('')}${item.access ? `<span class="chip">${esc(item.access)}</span>` : ''}</div></article>`).join('')}</section>`).join('')}</div>
    <aside class="sidebar" id="coming-up"><h2>Coming up</h2>${data.events.map((event) => `<article class="event"><time class="event-date">${esc(event.date)}</time><h3>${esc(event.title)}</h3><p>${esc(event.place)}</p><div class="source-links">${event.links.map(link).join('')}</div></article>`).join('')}</aside></div>
    <div class="end">End of edition.</div>`;
}
function sourceRows() {
  const visible = sources.filter(
    (source) =>
      (filter === 'all'
        ? source.status !== 'removed'
        : source.status === filter) &&
      source.name.toLowerCase().includes(query.toLowerCase()),
  );
  return visible.length
    ? visible
        .map(
          (source) =>
            `<article class="source-row ${source.status === 'paused' ? 'paused' : ''}" data-id="${esc(source.id)}"><div><h2>${esc(source.name)} ${source.status === 'paused' ? '<span class="chip">paused</span>' : ''}</h2><p>${esc(source.kind)}</p></div><select aria-label="Category for ${esc(source.name)}" data-category="${esc(source.id)}">${categories.map((category) => `<option ${source.category === category ? 'selected' : ''}>${esc(category)}</option>`).join('')}</select><div class="source-actions"><button data-toggle="${esc(source.id)}">${source.status === 'enabled' ? 'Pause' : 'Resume'}<span class="sr-only"> ${esc(source.name)}</span></button>${source.status === 'removed' ? '' : `<button class="remove" data-remove="${esc(source.id)}">Remove<span class="sr-only"> ${esc(source.name)}</span></button>`}</div></article>`,
        )
        .join('')
    : '<p class="empty">No sources here.</p>';
}
function sourcePage() {
  return `<h1 class="sr-only">Sources</h1><div class="source-controls"><input type="search" aria-label="Search sources" placeholder="Find a source…" value="${esc(query)}" /><div class="filters" aria-label="Filter sources">${[
    ['all', 'All'],
    ['enabled', 'Active'],
    ['paused', 'Paused'],
    ['removed', 'Removed'],
  ]
    .map(
      ([value, label]) =>
        `<button class="filter" data-filter="${value}" aria-pressed="${filter === value}">${label}</button>`,
    )
    .join(
      '',
    )}</div></div><div id="source-list">${sourceRows()}</div><details class="source-help"><summary>Source controls</summary><p>Pause keeps email delivery on. Resume includes fresh items.</p><button id="try-newsletter">Try sample newsletter</button></details>`;
}
function publicPage() {
  return `<div class="public"><h1 class="sr-only">Headlines</h1><p class="edition-date">${esc(data.date)}</p><ul>${data.publicItems.map((item) => `<li>${link(item)}<small>${esc(item.source)}</small></li>`).join('')}</ul></div>`;
}
function render() {
  const view =
    location.hash === '#sources'
      ? 'sources'
      : location.hash === '#public'
        ? 'public'
        : 'today';
  for (const anchor of document.querySelectorAll('.masthead nav a')) {
    if (anchor.getAttribute('href') === `#${view}`)
      anchor.setAttribute('aria-current', 'page');
    else anchor.removeAttribute('aria-current');
  }
  document.querySelector('.private-label').textContent =
    view === 'public' ? '[ public sample ]' : '[ private edition ]';
  main.innerHTML =
    view === 'sources'
      ? sourcePage()
      : view === 'public'
        ? publicPage()
        : edition();
}
window.addEventListener('hashchange', () => {
  if (
    location.hash.startsWith('#section-') ||
    location.hash === '#coming-up' ||
    location.hash === '#main'
  )
    return;
  render();
  main.focus();
  window.scrollTo(0, 0);
});
main.addEventListener('click', (event) => {
  const button = event.target.closest('button');
  if (!button) return;
  if (button.dataset.filter) {
    filter = button.dataset.filter;
    render();
    main.querySelector(`[data-filter="${filter}"]`).focus();
    return;
  }
  const id = button.dataset.toggle ?? button.dataset.remove;
  if (id) {
    const source = sources.find((item) => item.id === id);
    if (!source) return;
    source.status = button.dataset.remove
      ? 'removed'
      : source.status === 'enabled'
        ? 'paused'
        : 'enabled';
    persist();
    render();
    const row = [...main.querySelectorAll('[data-id]')].find(
      (item) => item.dataset.id === id,
    );
    (row?.querySelector('button') ?? main.querySelector('input')).focus();
    say(
      `${source.name}: ${source.status === 'enabled' ? 'resumed for new items' : source.status}. Email delivery is unchanged.`,
    );
  }
  if (button.id === 'try-newsletter') {
    const received = receiveNewsletter(sources, data.incomingSample);
    sources = received.sources;
    persist();
    render();
    main.querySelector('.source-help').open = true;
    main.querySelector('#try-newsletter').focus();
    say(
      received.result === 'added'
        ? 'Sample newsletter added and categorized automatically.'
        : `Recognized the existing source. It stays ${received.result}.`,
    );
  }
});
main.addEventListener('input', (event) => {
  if (event.target.type === 'search') {
    query = event.target.value;
    main.querySelector('#source-list').innerHTML = sourceRows();
  }
});
main.addEventListener('change', (event) => {
  if (!event.target.dataset.category) return;
  const source = sources.find(
    (item) => item.id === event.target.dataset.category,
  );
  if (source) {
    source.category = event.target.value;
    persist();
    say('Category saved for this source.');
  }
});
render();
