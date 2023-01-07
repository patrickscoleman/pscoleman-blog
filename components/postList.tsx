import { DateFormatted } from "@/components/dateFormatted";
import utilStyles from "@/styles/utils.module.css";
import Link from "next/link";

const PostListComponent = ({ allPostsData }) => {
  return (
    <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
      <h2 className={utilStyles.headingLg}>Blog</h2>
      <ul className={utilStyles.list}>
        {allPostsData.map(({ id, date, title }) => (
          <li className={utilStyles.listItem} key={id}>
            <Link href={`/posts/${id}`}>{title}</Link>
            <br />
            <small className={utilStyles.lightText}>
              <DateFormatted dateString={date} />
            </small>
          </li>
        ))}
      </ul>
    </section>
  );
};

export const PostList = PostListComponent;
