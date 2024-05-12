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
  const blogDirectory = "src/app/blog";
  const directories = await globby([`${blogDirectory}/*/page.mdx`]);

  const postObjects = await Promise.all(
    directories.map(async (post) => {
      const fileContents = fs.readFileSync(post, "utf8");
      const { data, content } = matter(fileContents);

      if (data.hidden === true) {
        return null;
      }

      const searchableContent = remark()
        .use(remarkMdx)
        .use(remarkMdxSearchable)
        .processSync(content).data;

      const id = post.split("/").slice(-2, -1)[0]; // Get the directory name as ID
      const path = `/blog/${id}`;

      return {
        objectID: id,
        path,
        content: searchableContent,
        frontmatter: {
          ...data,
        },
      };
    })
  );

  const filteredPostObjects = postObjects.filter((post) => post !== null);

  const index = searchClient.initIndex("blogposts");
  try {
    await index.replaceAllObjects(filteredPostObjects, {
      autoGenerateObjectIDIfNotExist: true,
    });
  } catch (error) {
    console.log(error);
  }
};
