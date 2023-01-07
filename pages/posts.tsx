import { Layout } from "@/components/layout";
import { Meta } from "@/components/meta";
import { PostList } from "@/components/postList";
import { PostData, getSortedPostsData } from "@/utils/getPosts";
import { GetStaticProps } from "next";

const Posts = ({ allPostsData }: { allPostsData: PostData[] }): JSX.Element => {
  return (
    <Layout>
      <Meta title={"Patrick Coleman's Blog Posts"} />
      <PostList allPostsData={allPostsData} />
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = getSortedPostsData();
  return {
    props: { allPostsData },
  };
};

export default Posts;
