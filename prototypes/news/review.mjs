const params = new URLSearchParams(location.search);
const frame = document.querySelector('iframe');
frame.addEventListener('load', () => window.scrollTo(0, 0));
const width = Number(params.get('width'));
frame.style.width = `${[320, 390, 759, 761, 1280].includes(width) ? width : 390}px`;
const view = ['today', 'sources', 'public'].includes(params.get('view'))
  ? params.get('view')
  : 'today';
frame.src = `/${params.get('text') === '200' ? '?text=200' : ''}#${view}`;
