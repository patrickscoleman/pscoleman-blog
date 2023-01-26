import { PageProvider } from "@/components/pageProvider";
import "@/styles/global.css";
import "@fontsource/roboto/400.css";
import "@fontsource/noto-sans/500.css";
import { Analytics } from "@vercel/analytics/react";
import { ThemeProvider } from "next-themes";
import { AppProps } from "next/app";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <ThemeProvider attribute="class">
        <PageProvider>
          <Component {...pageProps} />
        </PageProvider>
      </ThemeProvider>
      <Analytics />
    </>
  );
};

export default App;
