import { DateFormatted } from "@/components/dateFormatted";
import Link from "next/link";

const PostListComponent = ({ allPostsData }) => {
  return (
    <section className="">
      <h2 className="">Blog</h2>
      <ul className="">
        {allPostsData.map(({ id, date, title }) => (
          <li className="" key={id}>
            <Link href={`/posts/${id}`}>{title}</Link>
            <br />
            <small className="">
              <DateFormatted dateString={date} />
            </small>
          </li>
        ))}
      </ul>
    </section>
  );
};

export const PostList = PostListComponent;
