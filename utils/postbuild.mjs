import algoliasearch from "algoliasearch";
import fs from "fs";
import { globby } from "globby";
import matter from "gray-matter";
import prettier from "prettier";
import * as dotenv from "dotenv";

dotenv.config();

const generateSitemap = async () => {
  const prettierConfig = await prettier.resolveConfig("./.prettierrc.js");
  const pages = await globby([
    "pages/*.tsx",
    "pages/**/*.mdx",
    "!pages/_*.tsx",
    "!pages/api",
    "!pages/404.tsx",
  ]);

  const sitemap = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${pages
          .map((page) => {
            const path = page
              .replace("pages", "")
              .replace(".tsx", "")
              .replace(".mdx", "");
            const route = path === "/index" ? "" : path;

            return `
              <url>
                  <loc>${`https://pscoleman.me${route}`}</loc>
              </url>
            `;
          })
          .join("")}
    </urlset>
    `;

  const formatted = prettier.format(sitemap, {
    ...prettierConfig,
    parser: "html",
  });

  // eslint-disable-next-line no-sync
  fs.writeFileSync("public/sitemap.xml", formatted);
};

const searchClient = algoliasearch(
  process.env.ALGOLIA_APP_ID,
  process.env.ALGOLIA_API_KEY
);

const indexPostsForSearch = async () => {
  const posts = await globby(["pages/posts/*.mdx"]);

  const postObjects = posts.map((post) => {
    const fileContents = fs.readFileSync(post, "utf8");
    const { data, content } = matter(fileContents);
    const path = post.replace("pages", "").replace(".mdx", "");
    return {
      path,
      content,
      frontmatter: {
        ...data,
      },
    };
  });

  console.log(postObjects);

  const index = searchClient.initIndex("pscoleman-blog");
  index.saveObjects(postObjects, {
    autoGenerateObjectIDIfNotExist: true,
  });
};

generateSitemap();
indexPostsForSearch();
