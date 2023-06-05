import { Layout } from "@/components/layout";
import { PostsList } from "@/components/postsList";
import { OpenInNew } from "@mui/icons-material";
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
        <p>👋 Hello internet friend, I&apos;m Patrick! :^)</p>
        <p>
          I&apos;m a husband, dog/plant dad, and startup business guy. I{" "}
          <Link
            href="https://github.com/patrickscoleman/pscoleman-blog"
            target="_blank"
            rel="noopener noreferrer"
          >
            built this blog
          </Link>
          <OpenInNew className="ml-1" sx={{ fontSize: "1rem" }} /> and{" "}
          <Link href="/posts">wrote these posts</Link>. And I too live on this
          lovely space rock called Earth.
        </p>
        <p>
          These days, I&apos;m building{" "}
          <Link
            href="https://www.yaya.press/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Yaya
          </Link>
          <OpenInNew className="ml-1" sx={{ fontSize: "1rem" }} />, a language
          learning app, and advising startups on ops/growth. In the past, I was
          an early leader at{" "}
          <Link
            href="https://replit.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Replit
          </Link>
          <OpenInNew className="ml-1" sx={{ fontSize: "1rem" }} /> and{" "}
          <Link
            href="https://www.peoplegrove.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            PeopleGrove
          </Link>
          <OpenInNew className="ml-1" sx={{ fontSize: "1rem" }} />. Check out{" "}
          <Link href="/about">my about page</Link> for more.
        </p>
      </section>
      <PostsList />
    </Layout>
  );
};

export default Home;
