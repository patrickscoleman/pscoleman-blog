import { Layout, siteTitle } from "@/components/layout";
import { Meta } from "@/components/meta";
import { PostList } from "@/components/postList";
import utilStyles from "@/styles/utils.module.css";
import { getSortedPostsData } from "@/utils/posts";
import { GetStaticProps } from "next";

const Home = ({
  allPostsData,
}: {
  allPostsData: {
    id: string;
    date: string;
    title: string;
    description?: string;
  }[];
}) => {
  return (
    <Layout home>
      <Meta title={siteTitle} />
      <section className={utilStyles.headingMd}>
        <p>Hi, I'm Patrick. I've just started this blog.</p>
      </section>
      <PostList allPostsData={allPostsData} />
    </Layout>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = getSortedPostsData();
  return {
    props: { allPostsData },
  };
};
