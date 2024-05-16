import { getAllPostsAndWriteToFile } from "./getAllPosts.mjs";
import { generateRssFeed } from "./generateRssFeed.mjs";
import { generateSitemap } from "./generateSitemap.mjs";

await generateSitemap();

const postData = await getAllPostsAndWriteToFile();

await generateRssFeed(postData);
