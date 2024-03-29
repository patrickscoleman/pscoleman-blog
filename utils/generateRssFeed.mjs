import fs from "fs";
import prettier from "prettier";

export const generateRssFeed = async (postsList) => {
  const prettierConfig = await prettier.resolveConfig("./.prettierrc.js");

  console.log("generating rss feed");

  const feed = `
    <rss version="2.0">
    <channel>
        <title>Your Blog Title</title>
        <link href="https://pscoleman.me" />
        <description>This is my personal blog.</description>
        <language>en-us</language>
        ${postsList
          .map((post) => {
            const path = `/posts/${post.id}`;
            return `
              <item>
                  <title>${post.title}</title>
                  <link href="${`https://pscoleman.me${path}`}" />
                  <description>${post.description || ""}</description>
                  <pubDate>${new Date(post.date).toUTCString()}</pubDate>
                  <guid>${`https://pscoleman.me${path}`}</guid>
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
