import { Layout } from "@/components/layout";
import { PostList } from "@/components/postList";
import { getSortedPostsData, PostData } from "@/utils/getPosts";
import Button from "@mui/material/Button";
import { GetStaticProps } from "next";
import Link from "next/link";
import Image from "next/image";

const Home = ({ allPostsData }: { allPostsData: PostData[] }) => {
  return (
    <Layout home>
      <h1>Patrick Coleman&apos;s Web Presence</h1>
      <Image
        priority
        src="/images/patrick.png"
        className="rounded-full mx-auto"
        height={150}
        width={150}
        alt="Patrick Coleman"
      />
      <section className="">
        <p>Hi, I&apos;m Patrick. I&apos;ve just started this blog.</p>
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
