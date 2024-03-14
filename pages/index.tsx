import { Layout } from "@/components/layout";
import { PostsList } from "@/components/postsList";
import { OpenInNew } from "@mui/icons-material";
import Image from "next/image";
import Link from "next/link";

const Home = () => {
  return (
    <Layout home>
      <h1 className="mb-1">Patrick Coleman&apos;s Personal Website</h1>
      <hr className="mb-8" />
      <Image
        src="/images/patrick-photo.png"
        className="rounded-full mx-auto mb-6 md:mb-8"
        alt="Photo of Patrick"
        width={250}
        height={250}
      />
      <section className="">
        <p>Hi, I&apos;m Patrick! 👋</p>
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
          These days, I&apos;m looking for my next gig. I&apos;m interested in
          AI, edtech, and dev tools. If you need a smart, hard-working business
          generalist with a technical background,{" "}
          <Link href="/hireme">consider hiring me</Link>.
        </p>
        <p>
          Until recently I was traveling around the world on an extended
          honeymoon. Before that I co-founded{" "}
          <Link
            href="https://www.yaya.press/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Yaya
          </Link>
          <OpenInNew className="ml-1" sx={{ fontSize: "1rem" }} />, an AI
          foreign language learning app (
          <Link href="/posts/yaya">lessons learned</Link>). I was also an early
          leader at{" "}
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
          <OpenInNew className="ml-1" sx={{ fontSize: "1rem" }} />.
        </p>
        <p>
          Check out <Link href="/about">my about page</Link> for more.
        </p>
      </section>
      <PostsList />
    </Layout>
  );
};

export default Home;
