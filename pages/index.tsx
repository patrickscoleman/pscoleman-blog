import { Layout } from "@/components/layout";
import { PostsList } from "@/components/postsList";
import Image from "next/image";

const Home = () => {
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
      <PostsList />
    </Layout>
  );
};

export default Home;
