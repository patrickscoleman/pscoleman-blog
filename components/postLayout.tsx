import Layout from "./layout";
import React from "react";
import utilStyles from "../styles/utils.module.css";

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
