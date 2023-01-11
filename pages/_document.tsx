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
        <body className="bg-stone-100 text-stone-900 dark:bg-stone-900 dark:text-stone-300">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
