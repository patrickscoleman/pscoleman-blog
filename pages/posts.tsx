import { Layout } from "@/components/layout";
import { Meta } from "@/components/meta";
import { PostsList } from "@/components/postsList";

const Posts = () => {
  return (
    <Layout>
      <Meta title={"Patrick Coleman's Blog Posts"} />
      <PostsList page />
    </Layout>
  );
};

export default Posts;
