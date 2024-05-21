import { getAllPostsAndWriteToFile } from "./getAllPosts.mjs";
import { generateRssFeed } from "./generateRssFeed.mjs";
import { generateSitemap } from "./generateSitemap.mjs";

await generateSitemap();

const postsData = await getAllPostsAndWriteToFile();

await generateRssFeed(postsData);
