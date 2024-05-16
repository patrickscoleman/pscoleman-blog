import fs from "fs";
import path from "path";

export const test = () => {
  const blogDirectory = path.join(process.cwd(), "src", "app", "blog");
  const directories = fs
    .readdirSync(blogDirectory, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory());

  directories.forEach((directory) => {
    const postPath = path.join(blogDirectory, directory.name, "page.mdx");
    if (fs.existsSync(postPath)) {
      const fileContents = fs.readFileSync(postPath, "utf8");
      const metadataMatch = fileContents.match(
        /export const metadata = ({[\s\S]*?});/
      );
      if (metadataMatch && metadataMatch[1]) {
        console.log(`Metadata for ${directory.name}:`, metadataMatch[1]);
      } else {
        console.log(`No metadata found for ${directory.name}`);
      }
    } else {
      console.log(`No page.mdx found in ${directory.name}`);
    }
  });
};
