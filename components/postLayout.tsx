import { Layout } from "@/components/layout";
import { MdxComponents } from "@/components/mdxComponents";
import { getNextPost, getPrevPost } from "@/utils/getPosts";
import { MDXProvider } from "@mdx-js/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const PostLayoutComponent = ({
  children,
  title,
  date,
  description,
  previewImage,
}: {
  children: React.ReactNode;
  title: string;
  date: string;
  description: string;
  previewImage?: string;
}): JSX.Element => {
  const router = useRouter();
  const pathname = router.pathname;
  const id = pathname.slice(pathname.lastIndexOf("/") + 1);
  const prevPost = getPrevPost(id);
  const nextPost = getNextPost(id);

  return (
    <Layout
      title={title}
      date={date}
      description={description}
      previewImage={previewImage}
      post={true}
    >
      <MDXProvider components={MdxComponents}>
        <article className="prose max-w-none prose-stone dark:prose-invert dark:prose-headings:text-text-darkbold dark:prose-a:text-text-darkbold dark:prose-strong:text-text-darkbold">
          {children}
        </article>
      </MDXProvider>
      <hr className="my-8" />
      <div className="flex my-0 content-end items-center justify-around">
        {prevPost ? (
          <Link
            href={prevPost}
            className="no-underline hover:text-accent-light dark:hover:text-accent-dark"
          >
            &lt; prev
          </Link>
        ) : (
          <div className="text-text-lightfaint dark:text-text-darkfaint">
            prev
          </div>
        )}
        <Link
          href="/posts"
          className="no-underline hover:text-accent-light dark:hover:text-accent-dark"
        >
          [ all ]
        </Link>
        {nextPost ? (
          <Link
            href={nextPost}
            className="no-underline hover:text-accent-light dark:hover:text-accent-dark"
          >
            next &gt;
          </Link>
        ) : (
          <div className="text-text-lightfaint dark:text-text-darkfaint">
            next
          </div>
        )}
      </div>
    </Layout>
  );
};

export const PostLayout = PostLayoutComponent;
