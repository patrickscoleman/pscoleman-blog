import "@/styles/global.css";
import "@fontsource/roboto/400.css";
import { Analytics } from "@vercel/analytics/react";
import { AppProps } from "next/app";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Component {...pageProps} />
      <Analytics />
    </>
  );
};

export default App;
