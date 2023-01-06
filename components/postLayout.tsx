import React from "react";
import utilStyles from "@/styles/utils.module.css";
import Layout from "@/components/layout";

export default function PostLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <Layout>
      <article>
        <div className={utilStyles.markdown}>{children}</div>
      </article>
    </Layout>
  );
}
