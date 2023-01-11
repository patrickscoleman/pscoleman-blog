import "@/styles/global.css";
import "@fontsource/roboto/400.css";
import { Analytics } from "@vercel/analytics/react";
import { ThemeProvider } from "next-themes";
import { AppProps } from "next/app";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <ThemeProvider attribute="class">
        {/* <MuiThemeWrapper theme={lightTheme}> */}
        <Component {...pageProps} />
        {/* </MuiThemeWrapper> */}
      </ThemeProvider>
      <Analytics />
    </>
  );
};

export default App;
