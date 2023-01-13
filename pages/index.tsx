import { Layout } from "@/components/layout";
import { PostList } from "@/components/postList";
import { getSortedPostsData, PostData } from "@/utils/getPosts";
import Button from "@mui/material/Button";
import { GetStaticProps } from "next";
import Link from "next/link";

const Home = ({ allPostsData }: { allPostsData: PostData[] }) => {
  return (
    <Layout home>
      <section className="">
        <p>Hi, I&apos;m Patrick. I&apos;ve just started this blog.</p>
      </section>
      <PostList allPostsData={allPostsData} />
      <Link
        href="https://zombo.com"
        passHref
        rel="noopener"
        target="_blank"
        className="no-underline"
      >
        <Button variant="outlined" color="secondary">
          Click me!
        </Button>
      </Link>
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
