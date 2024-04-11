import { Layout } from "@/components/layout";
import { PostsList } from "@/components/postsList";
import { OpenInNew } from "@mui/icons-material";
import Image from "next/image";
import Link from "next/link";

const Home = () => {
  return (
    <Layout home>
      <h1 className="mb-1">A little about Patrick Coleman...</h1>
      <hr className="mb-8" />
      <Image
        src="/images/patrick-photo.png"
        className="rounded-full mx-auto mb-6 md:mb-8"
        alt="Photo of Patrick"
        width={250}
        height={250}
      />
      <section className="">
        <p>
          Hi 👋 I&apos;m Patrick! I&apos;m a husband, dog dad, and startup
          business guy. I{" "}
          <Link
            href="https://github.com/patrickscoleman/pscoleman-blog"
            target="_blank"
            rel="noopener noreferrer"
          >
            code a little
          </Link>
          <OpenInNew className="ml-1" sx={{ fontSize: "1rem" }} /> too.
        </p>
        <p>
          Until recently I was traveling around the world on a long honeymoon.
          Before that I co-founded <Link href="/posts/yaya">Yaya</Link>, an AI
          foreign language learning app. I was also the first business hire and
          an early leader at{" "}
          <span className="flex-inline items-center space-x-1">
            <Link
              href="https://replit.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Replit
            </Link>
            <OpenInNew className="text-sm" />
          </span>{" "}
          and{" "}
          <span className="flex-inline items-center space-x-1">
            <Link
              href="https://www.peoplegrove.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              PeopleGrove
            </Link>
            <OpenInNew className="text-sm" />
          </span>
          . Check out <Link href="/about">my about page</Link> for more.
        </p>
        <p>
          If you need a smart, fast-learning business generalist, who spikes in
          finance and go-to-market,{" "}
          <Link href="/hireme">consider working with me</Link>.
        </p>
      </section>
      <PostsList />
    </Layout>
  );
};

export default Home;
