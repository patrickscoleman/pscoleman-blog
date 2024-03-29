import fs from "fs";
import prettier from "prettier";
import { siteMetadata } from "../utils/metadata.mjs";

export const generateRssFeed = async (postsList) => {
  const prettierConfig = await prettier.resolveConfig("./.prettierrc.js");

  console.log("generating rss feed");

  const feed = `
    <rss version="2.0">
    <channel>
        <title>${siteMetadata.title}</title>
        <link href="${siteMetadata.siteUrl}" />
        <description>${siteMetadata.description}</description>
        <language>en</language>
        ${postsList
          .map((post) => {
            const path = `/posts/${post.id}`;
            return `
              <item>
                  <title>${post.title}</title>
                  <link href="${siteMetadata.siteUrl}${path}" />
                  <description>${post.description || ""}</description>
                  <pubDate>${new Date(post.date).toUTCString()}</pubDate>
                  <guid>${siteMetadata.siteUrl}${path}</guid>
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
