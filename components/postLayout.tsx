import { Layout } from "@/components/layout";
import { MdxComponents } from "@/components/mdxComponents";
import { MDXProvider } from "@mdx-js/react";
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
    </Layout>
  );
};

export const PostLayout = PostLayoutComponent;
