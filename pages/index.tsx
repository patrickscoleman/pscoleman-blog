import { GetStaticProps } from "next";
import Link from "next/link";
import Date from "@/components/date";
import Layout, { siteTitle } from "@/components/layout";
import Meta from "@/components/meta";
import utilStyles from "@/styles/utils.module.css";
import { getSortedPostsData } from "@/utils/posts";

export default function Home({
  allPostsData,
}: {
  allPostsData: {
    id: string;
    date: string;
    title: string;
    description?: string;
  }[];
}) {
  return (
    <Layout home>
      <Meta title={siteTitle} />
      <section className={utilStyles.headingMd}>
        <p>Hi, I'm Patrick. I've just started this blog.</p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>{title}</Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = getSortedPostsData();
  return {
    props: { allPostsData },
  };
};
