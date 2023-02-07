import postsList from "../data/postsList.json";

export interface PostData {
  id: string;
  date: string;
  title: string;
  description?: string;
}

type Path = `/${string}`;

export const getNextPost = (id: string): Path | null => {
  const index = postsList.findIndex((post) => post.id === id);
  if (index !== -1 && index !== 0) {
    return `/posts/${postsList[index - 1].id}`;
  } else {
    return null;
  }
};

export const getPrevPost = (id: string): Path | null => {
  const index = postsList.findIndex((post) => post.id === id);
  if (index !== -1 && index !== postsList.length - 1) {
    return `/posts/${postsList[index + 1].id}`;
  } else {
    return null;
  }
};
