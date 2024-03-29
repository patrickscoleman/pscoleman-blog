import fs from "fs";
import prettier from "prettier";
import { SiteMetadata } from "../components/meta";

export const generateRssFeed = async (postsList) => {
  const prettierConfig = await prettier.resolveConfig("./.prettierrc.js");

  console.log("generating rss feed");

  const feed = `
    <rss version="2.0">
    <channel>
        <title>${SiteMetadata.title}</title>
        <link href="${SiteMetadata.siteUrl}" />
        <description>${SiteMetadata.description}</description>
        <language>${SiteMetadata.language}</language>
        ${postsList
          .map((post) => {
            const path = `/posts/${post.id}`;
            return `
              <item>
                  <title>${post.title}</title>
                  <link href="${SiteMetadata.siteUrl}${path}" />
                  <description>${post.description || ""}</description>
                  <pubDate>${new Date(post.date).toUTCString()}</pubDate>
                  <guid>${SiteMetadata.siteUrl}${path}</guid>
              </item>
            `;
          })
          .join("")}
    </channel>
    </rss>
    `;

  const formatted = prettier.format(feed, {
    ...prettierConfig,
    parser: "html",
  });

  // eslint-disable-next-line no-sync
  fs.writeFileSync("public/rss.xml", formatted);
};
