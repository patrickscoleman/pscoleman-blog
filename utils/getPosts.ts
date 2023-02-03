import fs from "fs";
import matter from "gray-matter";
import path from "path";

const postsDirectory = path.join(process.cwd(), "pages", "posts");

export interface PostData {
  id: string;
  date: string;
  title: string;
  description?: string;
}

type Path = `/${string}`;

export const getSortedPostsData = (): PostData[] => {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName: string) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.mdx$/, "");

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Combine the data with the id
    return {
      id,
      ...(matterResult.data as {
        date: string;
        title: string;
        description?: string;
      }),
    };
  });

  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
};

export const getPrevPost = ({
  id,
  posts,
}: {
  id: string;
  posts?: PostData[];
}): Path | null => {
  posts = posts || getSortedPostsData();
  const index = posts.findIndex((post) => post.id === id);
  if (index !== -1 && index !== 0) {
    return `/${posts[index - 1].id}`;
  } else {
    return null;
  }
};

export const getNextPost = ({
  id,
  posts,
}: {
  id: string;
  posts?: PostData[];
}): Path | null => {
  posts = posts || getSortedPostsData();
  const index = posts.findIndex((post) => post.id === id);
  if (index !== -1 && index !== posts.length - 1) {
    return `/${posts[index + 1].id}`;
  } else {
    return null;
  }
};
