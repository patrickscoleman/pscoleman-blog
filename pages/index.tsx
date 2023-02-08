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
        <p>
          👋 Hello internet friend, I&apos;m Patrick. This is my blog, and in
          it, you&apos;ll find thoughts on things.
        </p>
        <p>
          It&apos;s too early to tell for sure, but I&apos;ll most likely write
          about startups, maybe translate some haikus, share dog pics, keep a
          travelogue, and just jot errant thoughts down as they come up.
        </p>
        <p>
          And so you know that I&apos;m well qualified to share only the highest
          quality thoughts, please head on over to my about page to see what
          I&apos;ve been up to on my short time on this space rock that we call
          Earth.
        </p>
      </section>
      <PostsList />
    </Layout>
  );
};

export default Home;
