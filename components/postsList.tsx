import { DateFormatted } from "@/components/dateFormatted";
import postsList from "@/data/postsList.json";
import Link from "next/link";

const NUMBER_OF_POSTS_TO_SHOW = 3;

const PostsListComponent = ({ page }: { page?: boolean }) => {
  const posts = page ? postsList : postsList.slice(0, NUMBER_OF_POSTS_TO_SHOW);

  return (
    <section className="">
      {page ? (
        <h1 className="mb-1">All Blog Posts</h1>
      ) : (
        <h2 className="mb-1">Recent Blog Posts</h2>
      )}
      <hr />
      <ul className="mb-8">
        {posts.map(({ id, date, title, description }) => (
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
      {!page && <Link href="/posts">&gt; See all posts &gt;</Link>}
    </section>
  );
};

export const PostsList = PostsListComponent;
