// Adds global styles and analytics to the app

import { Analytics } from "@vercel/analytics/react";
import { AppProps } from "next/app";
import "../styles/global.css";

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <Analytics />
    </>
  );
}

export default App;
