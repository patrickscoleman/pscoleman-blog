import { DateFormatted } from "@/components/dateFormatted";
import Link from "next/link";

const PostListComponent = ({ allPostsData }) => {
  return (
    <section className="">
      <Link href={"/posts"}>
        <h2>Blog Posts</h2>
      </Link>
      <ul className="mb-8 pl-2">
        {allPostsData.map(({ id, date, title, description }) => (
          <li className="" key={id}>
            <p className="mt-8 mb-2">
              <Link href={`/posts/${id}`}>{title}</Link>
            </p>
            <small>
              <DateFormatted dateString={date} />
            </small>
            <p className="my-2">{description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export const PostList = PostListComponent;
