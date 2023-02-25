import { Layout } from "@/components/layout";
import { PostsList } from "@/components/postsList";
import Image from "next/image";
import Link from "next/link";

const Home = () => {
  return (
    <Layout home>
      <h1>Patrick Coleman&apos;s Web Presence</h1>
      <Image
        priority
        src="/images/patrick.png"
        className="rounded-full border-4 border-text-light dark:border-0 mx-auto mb-6 md:mb-8"
        height={150}
        width={150}
        alt="Patrick Coleman"
      />
      <section className="">
        <p>
          👋 Hello internet friend, I&apos;m Patrick. I know dangerously little
          about many things. And this is my blog. In it, you&apos;ll find:
        </p>
        <ul className="list-disc pl-8">
          <li>Pics of my dog Mara</li>
          <li>Work/startup stuff</li>
          <li>Errant thoughts, hastily jotted down</li>
        </ul>
        <p>
          And so you know I&apos;m qualified to share high quality thoughts,
          please check out <Link href="/about">my about page</Link> and see how
          I&apos;ve been spending my time on this lovely space rock that we call
          Earth.
        </p>
      </section>
      <PostsList />
    </Layout>
  );
};

export default Home;
