import React from "react";
import utilStyles from "@/styles/utils.module.css";
import { Layout } from "@/components/layout";

const PostLayoutComponent = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  return (
    <Layout>
      <article>
        <div className={utilStyles.markdown}>{children}</div>
      </article>
    </Layout>
  );
};

export const PostLayout = PostLayoutComponent;
