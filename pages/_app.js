// Adds global CSS styles and analytics to every page in the app

import "../styles/global.css";
import { Analytics } from "@vercel/analytics/react";

function App({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <Analytics />
    </>
  );
}

export default App;
