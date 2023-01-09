import { Layout } from "@/components/layout";
import { MdxComponents } from "@/components/mdxComponents";
import utilStyles from "@/styles/utils.module.css";
import { MDXProvider } from "@mdx-js/react";
import React from "react";

const PostLayoutComponent = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  return (
    <Layout>
      <MDXProvider components={MdxComponents}>
        <article>
          <div className={utilStyles.markdown}>{children}</div>
        </article>
      </MDXProvider>
    </Layout>
  );
};

export const PostLayout = PostLayoutComponent;
