import Layout from "@/components/layout";
import Meta from "@/components/meta";
import PostList from "@/components/postList";
import { getSortedPostsData } from "@/utils/posts";
import { GetStaticProps } from "next";

export default function Posts({
  allPostsData,
}: {
  allPostsData: {
    id: string;
    date: string;
    title: string;
    description?: string;
  }[];
}): JSX.Element {
  return (
    <Layout home>
      <Meta title={"Patrick Coleman's Blog Posts"} />
      <PostList allPostsData={allPostsData} />
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = getSortedPostsData();
  return {
    props: { allPostsData },
  };
};
