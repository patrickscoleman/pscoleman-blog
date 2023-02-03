import { Layout } from "@/components/layout";
import { MdxComponents } from "@/components/mdxComponents";
import { MDXProvider } from "@mdx-js/react";
import Link from "next/link";
import React from "react";

const PostLayoutComponent = ({
  children,
  title,
  description,
}: {
  children: React.ReactNode;
  title: string;
  description: string;
}): JSX.Element => {
  return (
    <Layout title={title} description={description}>
      <MDXProvider components={MdxComponents}>
        <article className="prose max-w-none prose-stone dark:prose-invert dark:prose-headings:text-text-darkbold dark:prose-a:text-text-darkbold dark:prose-strong:text-text-darkbold">
          <div className="">{children}</div>
        </article>
      </MDXProvider>
      <hr className="mb-8" />
      <div className="flex my-0 content-end items-center justify-around">
        {/* TO-DO - add component for next/prev and function to find next/prev post */}
        <Link
          href="/"
          className="no-underline hover:text-accent-light dark:hover:text-accent-dark"
        >
          &lt; prev
        </Link>
        <Link
          href="/posts"
          className="no-underline hover:text-accent-light dark:hover:text-accent-dark"
        >
          [ all ]
        </Link>
        <Link
          href="/"
          className="no-underline hover:text-accent-light dark:hover:text-accent-dark"
        >
          next &gt;
        </Link>
      </div>
    </Layout>
  );
};

export const PostLayout = PostLayoutComponent;
