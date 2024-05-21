import { getAllPostsAndWriteToFile } from "./getAllPosts.mjs";
import { generateRssFeed } from "./generateRssFeed.mjs";
import { generateSitemap } from "./generateSitemap.mjs";
import { indexPostsForSearch } from "./indexPostsForSearch.mjs";

await generateSitemap();

const postData = await getAllPostsAndWriteToFile();

await generateRssFeed(postData);

await indexPostsForSearch(postData);
