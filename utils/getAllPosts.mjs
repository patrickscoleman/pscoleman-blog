import fs from "fs";
import matter from "gray-matter";
import path from "path";

const postsDirectory = path.join(process.cwd(), "pages", "posts");
const postsListFile = "./data/postsList.json";
// Posts data
// { id, date, title, description?, hidden? }

export const getAllPosts = async () => {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.mdx$/, "");

    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    // Parse the post metadata section
    const matterResult = matter(fileContents);

    // Hidden posts are not included in the list
    return matterResult.data?.hidden === true
      ? null
      : {
          id,
          ...matterResult.data,
        };
  });

  const sortedData = allPostsData
    .filter((i) => i !== null)
    .sort((a, b) => {
      // Compare dates in descending order
      if (a.date < b.date) {
        return 1;
      } else if (a.date > b.date) {
        return -1;
      } else {
        // If dates are equal, compare titles in alphabetical order
        return a.title.localeCompare(b.title);
      }
    });

  fs.writeFileSync(postsListFile, JSON.stringify(sortedData, null, 2));

  return sortedData;
};
