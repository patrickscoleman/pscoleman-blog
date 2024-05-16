import fs from "fs";
import path from "path";

export const getAllPostsAndWriteToFile = async () => {
  const blogDirectory = path.join(process.cwd(), "src", "app", "blog");
  const directories = fs
    .readdirSync(blogDirectory, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory());

  const allPostsData = directories.map((directory) => {
    const id = directory.name;
    const postPath = path.join(blogDirectory, id, "page.mdx");
    const fileContents = fs.readFileSync(postPath, "utf8");

    // Extract metadata from the file
    const metadata = {};
    const metadataRegex = /export const (\w+) =\n?\s*(.*);/g;
    let match;
    while ((match = metadataRegex.exec(fileContents)) !== null) {
      metadata[match[1]] = eval(match[2]);
    }

    // Only include posts that are not hidden and have both a title and a date
    if (metadata.hidden === true || !metadata.title || !metadata.date) {
      return null;
    } else {
      return {
        id,
        ...metadata,
      };
    }
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

  const postsListFile = path.join(
    process.cwd(),
    "src",
    "data",
    "postsList.json"
  );

  fs.writeFileSync(postsListFile, JSON.stringify(sortedData, null, 2));

  return sortedData;
};
