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
          These days, I&apos;m looking for my next gig. I&apos;m a business
          generalist, which means I focus on go-to-market (sales, marketing,
          growth, etc.) and operations (management, finance, legal, HR,
          recruiting, etc.), plus I code a little. I think I can offer the most
          to early-/mid-stage startups working on language learning, devtools,
          AI, or edtech. But I&apos;m open to anything with an inspiring team
          and mission.
        </p>
        <p>
          Until recently I was traveling around the world on an extended
          honeymoon with my wife Courtney (and trying to keep up on my Korean
          learning). Before that I was working with a friend on{" "}
          <Link
            href="https://www.yaya.press/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Yaya
          </Link>
          <OpenInNew className="ml-1" sx={{ fontSize: "1rem" }} />, an AI
          foreign language learning app. I was also an early leader at{" "}
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
