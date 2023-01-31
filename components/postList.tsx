import { DateFormatted } from "@/components/dateFormatted";
import { PostData } from "@/utils/getPosts";
import Link from "next/link";

const PostListComponent = ({
  allPostsData,
  section,
}: {
  allPostsData: PostData[];
  section?: boolean;
}) => {
  return (
    <section className="">
      {section ? (
        <h2 className="mb-1">Blog Posts</h2>
      ) : (
        <h1 className="mb-1">Blog Posts</h1>
      )}
      <hr />
      <ul className="mb-8">
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
