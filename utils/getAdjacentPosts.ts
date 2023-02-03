type Path = `/${string}`;

export const getPrevPost = ({
  id,
  posts,
}: {
  id: string;
  posts: [];
}): Path | null => {
  return null;
  // posts = posts || getSortedPostsData();
  // const index = posts.findIndex((post) => post.id === id);
  // if (index !== -1 && index !== 0) {
  //   return `/${posts[index - 1].id}`;
  // } else {
  //   return null;
  // }
};

export const getNextPost = ({
  id,
  posts,
}: {
  id: string;
  posts: [];
}): Path | null => {
  return null;
  // posts = posts || getSortedPostsData();
  // const index = posts.findIndex((post) => post.id === id);
  // if (index !== -1 && index !== posts.length - 1) {
  //   return `/${posts[index + 1].id}`;
  // } else {
  //   return null;
  // }
};
