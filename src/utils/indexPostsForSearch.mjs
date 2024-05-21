import algoliasearch from "algoliasearch";
import * as dotenv from "dotenv";
import fs from "fs";
import { globby } from "globby";
import { remark } from "remark";
import remarkMdx from "remark-mdx";
import remarkMdxSearchable from "remark-mdx-searchable";

dotenv.config({ path: ".env.local" });

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
  process.env.ALGOLIA_ADMIN_API_KEY
);

export const indexPostsForSearch = async (postsList) => {
  const blogDirectory = "src/app/blog";
  const directories = await globby([`${blogDirectory}/*/page.mdx`]);

  const postObjects = await Promise.all(
    directories.map(async (file) => {
      const fileContents = fs.readFileSync(file, "utf8");

      const searchableContent = remark()
        .use(remarkMdx)
        .use(remarkMdxSearchable)
        .processSync(fileContents).data;

      const id = file.split("/").slice(-2, -1)[0]; // Get the directory name as ID
      const path = `/blog/${id}`;

      const metadata = postsList.find((post) => post.id === id);

      if (metadata?.hidden === true) {
        return null;
      } else {
        return {
          objectID: id,
          path,
          content: searchableContent,
          metadata: {
            ...metadata,
          },
        };
      }
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
