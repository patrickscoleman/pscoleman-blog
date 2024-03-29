import { getAllPosts } from "./getAllPosts.mjs";
import { generateRssFeed } from "./generateRssFeed.mjs";

const postData = await getAllPosts();

generateRssFeed(postData);
