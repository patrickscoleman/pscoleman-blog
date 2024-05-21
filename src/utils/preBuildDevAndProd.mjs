import { getAllPostsAndWriteToFile } from "./getAllPosts.mjs";
import { generateRssFeed } from "./generateRssFeed.mjs";
import { generateSitemap } from "./generateSitemap.mjs";
import { indexPostsForSearch } from "./indexPostsForSearch.mjs";

await generateSitemap();

const postsData = await getAllPostsAndWriteToFile();

await generateRssFeed(postsData);

await indexPostsForSearch(postsData);
