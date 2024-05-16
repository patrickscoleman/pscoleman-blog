import fs from "fs";
import { globby } from "globby";
import prettier from "prettier";

export const generateSitemap = async () => {
  const prettierConfig = await prettier.resolveConfig("./.prettierrc.js");
  const pages = await globby(["src/app/**/page.tsx", "src/app/**/page.mdx"]);

  const sitemap = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${pages
          .map((page) => {
            const pathSegments = page
              .split("/")
              .filter((segment) => segment !== "src" && segment !== "app");
            pathSegments.pop(); // Remove the file name
            const route = `/${pathSegments.join("/")}`;

            return `
              <url>
                  <loc>${`https://pscoleman.me${route}`}</loc>
              </url>
            `;
          })
          .join("")}
    </urlset>
    `;

  const formatted = await prettier.format(sitemap, {
    ...prettierConfig,
    parser: "html",
  });

  // eslint-disable-next-line no-sync
  fs.writeFileSync("public/sitemap.xml", formatted);
};
