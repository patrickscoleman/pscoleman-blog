import { DateFormatted } from "@/components/dateFormatted";
import postsList from "@/data/postsList.json";
import Link from "next/link";

const PostsListComponent = ({ page }: { page?: boolean }) => {
  return (
    <section className="">
      {page ? (
        <h1 className="mb-1">Blog Posts</h1>
      ) : (
        <h2 className="mb-1">Blog Posts</h2>
      )}
      <hr />
      <ul className="mb-8">
        {postsList.map(({ id, date, title, description }) => (
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

export const PostsList = PostsListComponent;
