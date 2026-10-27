import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const root = new URL('../../prototypes/news/', import.meta.url);
const dataIndex = process.argv.indexOf('--data');
const dataFile =
  dataIndex === -1
    ? new URL('demo-data.json', root)
    : process.argv[dataIndex + 1];
if (!dataFile) throw new Error('--data requires a local JSON file');
// Explicit route map: never expose the repository, artifacts directory or mail.
const routes = new Map([
  ['/review.html', [new URL('review.html', root), 'text/html; charset=utf-8']],
  ['/review.css', [new URL('review.css', root), 'text/css; charset=utf-8']],
  [
    '/review.mjs',
    [new URL('review.mjs', root), 'text/javascript; charset=utf-8'],
  ],
  ['/', [new URL('index.html', root), 'text/html; charset=utf-8']],
  ['/style.css', [new URL('style.css', root), 'text/css; charset=utf-8']],
  ['/app.mjs', [new URL('app.mjs', root), 'text/javascript; charset=utf-8']],
  [
    '/model.mjs',
    [new URL('model.mjs', root), 'text/javascript; charset=utf-8'],
  ],
  ['/demo-data.json', [dataFile, 'application/json; charset=utf-8']],
]);
await readFile(dataFile); // Fail before listening if the chosen fixture is absent.
const server = createServer(async (request, response) => {
  response.setHeader('Cache-Control', 'private, no-store');
  response.setHeader('X-Robots-Tag', 'noindex, nofollow');
  response.setHeader('X-Content-Type-Options', 'nosniff');
  response.setHeader('Referrer-Policy', 'no-referrer');
  response.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self'; style-src 'self'; connect-src 'self'; img-src 'none'; frame-ancestors 'self'; base-uri 'none'; form-action 'none'",
  );
  if (!['GET', 'HEAD'].includes(request.method)) {
    response.writeHead(405, { Allow: 'GET, HEAD' });
    response.end();
    return;
  }
  const host = request.headers.host;
  if (!['127.0.0.1:4322', 'localhost:4322'].includes(host)) {
    response.writeHead(403);
    response.end();
    return;
  }
  const route = routes.get(new URL(request.url, 'http://127.0.0.1').pathname);
  if (!route) {
    response.writeHead(404);
    response.end('Not found');
    return;
  }
  try {
    const body = await readFile(route[0]);
    response.writeHead(200, { 'Content-Type': route[1] });
    response.end(request.method === 'HEAD' ? undefined : body);
  } catch {
    response.writeHead(500);
    response.end('Preview file unavailable');
  }
});
server.listen(4322, '127.0.0.1', () =>
  console.log(`Local preview: http://127.0.0.1:4322/ (${fileURLToPath(root)})`),
);
