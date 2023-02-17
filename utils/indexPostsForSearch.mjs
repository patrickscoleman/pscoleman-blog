import algoliasearch from "algoliasearch";
import * as dotenv from "dotenv";
import fs from "fs";
import { globby } from "globby";
import matter from "gray-matter";
import { remark } from "remark";
import remarkMdx from "remark-mdx";
import remarkMdxSearchable from "remark-mdx-searchable";

dotenv.config({ path: ".env.local" });

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
  process.env.ALGOLIA_ADMIN_API_KEY
);

export const indexPostsForSearch = async () => {
  const posts = await globby(["pages/posts/*.mdx", "pages/about.mdx"]);

  const postObjects = posts.map((post) => {
    const fileContents = fs.readFileSync(post, "utf8");
    const { data, content } = matter(fileContents);

    const searchableContent = remark()
      .use(remarkMdx)
      .use(remarkMdxSearchable)
      .processSync(content).data;

    const path = post.replace("pages", "").replace(".mdx", "");
    const id = path.slice(path.lastIndexOf("/") + 1);
    return {
      objectID: id,
      path,
      content: searchableContent,
      frontmatter: {
        ...data,
      },
    };
  });

  const index = searchClient.initIndex("blogposts");
  try {
    await index.replaceAllObjects(postObjects, {
      autoGenerateObjectIDIfNotExist: true,
    });
  } catch (error) {
    console.log(error);
  }
};
