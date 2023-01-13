import Document, { Head, Html, Main, NextScript } from "next/document";
import { ReactElement } from "react";

class MyDocument extends Document {
  render(): ReactElement {
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <meta property="og:image" content="/patrick.png" key="og:image" />
        </Head>
        <body className="bg-bg-light text-text-light dark:bg-bg-dark dark:text-text-dark">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
