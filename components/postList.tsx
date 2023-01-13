import { DateFormatted } from "@/components/dateFormatted";
import Link from "next/link";

const PostListComponent = ({ allPostsData }) => {
  return (
    <section className="">
      <h2 className="mb-1">Blog Posts</h2>
      <hr />
      <ul className="mb-8 pl-1">
        {allPostsData.map(({ id, date, title, description }) => (
          <li key={id}>
            <p className="text-lg mt-6 mb-1">
              <Link href={`/posts/${id}`}>{title}</Link>
            </p>
            <small>
              <DateFormatted dateString={date} />
            </small>
            <p className="my-1">{description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export const PostList = PostListComponent;
