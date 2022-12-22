const EXTERNAL_DATA_URL = "https://pscoleman.me/posts";

function generateSiteMap(posts) {
  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/chemas/sitemap/0.9">
      <!--Manually set URLs for static pages-->
      <url>
        <loc>https://pscoleman.me</loc>
      </url>
      ${posts
        .map(({ id }) => {
          return `
            <url>
              <loc>${EXTERNAL_DATA_URL}/${id}</loc>
            </url>
          `;
        })
        .join("")}
    </urlset>
  `;
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }) {
  // We make an API call to gather the URLs for our site
  const request = await fetch(EXTERNAL_DATA_URL);
  console.log(request);
  const posts = await request.json();

  // We generate the XML sitemap with the posts data
  const sitemap = generateSiteMap(posts);

  res.setHeader("Content-Type", "text/xml");
  // we send the XML to the browser
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;
