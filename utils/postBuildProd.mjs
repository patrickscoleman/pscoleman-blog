import { generateSitemap } from "./generateSitemap.mjs";
import { generateRss } from "./generateRss.mjs";
import { indexPostsForSearch } from "./indexPostsForSearch.mjs";

generateSitemap();
generateRss();
indexPostsForSearch();
