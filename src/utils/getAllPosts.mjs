import fs from "fs";
import matter from "gray-matter";
import path from "path";

const postsDirectory = path.join(process.cwd(), "pages", "posts");
const postsListFile = "./data/postsList.json";
// Posts data
// { id, date, title, description?, hidden? }

export const getAllPosts = async () => {
  const blogDirectory = path.join(process.cwd(), "src", "app", "blog");
  const directories = fs
    .readdirSync(blogDirectory, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory());

  const allPostsData = directories.map((directory) => {
    const id = directory.name;
    const postPath = path.join(blogDirectory, id, "page.mdx");
    const fileContents = fs.readFileSync(postPath, "utf8");

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
