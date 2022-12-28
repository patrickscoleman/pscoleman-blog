// Adds global styles and analytics to the app

import "../styles/global.css";
import { Analytics } from "@vercel/analytics/react";
import { AppProps } from "next/app";

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <Analytics />
    </>
  );
}

export default App;
