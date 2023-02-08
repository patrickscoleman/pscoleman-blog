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
          👋 Hello internet friend, I&apos;m Patrick. This is my blog, and in
          it, you&apos;ll find my thoughts on things.
        </p>
        <p>
          It&apos;s too early to tell for sure, but I&apos;ll most likely write
          about startups, maybe translate some haikus, share dog pics, keep a
          travelogue, and just jot errant thoughts down as they come up.
        </p>
        <p>
          And so you know I&apos;m qualified to share the highest quality
          thoughts, please head on over to{" "}
          <Link href="/about">my about page</Link> to see what I&apos;ve been up
          to on my short time on this lovely space rock that we call Earth.
        </p>
      </section>
      <PostsList />
    </Layout>
  );
};

export default Home;
