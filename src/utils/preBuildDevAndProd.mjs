import { getAllPostsAndWriteToFile } from "./getAllPosts.mjs";
import { generateRssFeed } from "./generateRssFeed.mjs";

const postData = await getAllPostsAndWriteToFile();

await generateRssFeed(postData);
