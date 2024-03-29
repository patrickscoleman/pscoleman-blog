import { getAllPosts } from "./getAllPosts.mjs";
import { generateRssFeed } from "./generateRssFeed.mjs";

getAllPosts().then(() => {
  generateRssFeed();
});
