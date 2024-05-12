import "./globals.css";
import type { Metadata } from "next";
import {
  Source_Code_Pro,
  Noto_Sans,
  Noto_Sans_JP,
  Noto_Sans_KR,
} from "next/font/google";
import { ThemeProvider } from "@/components/themeProvider";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { BackgroundGrid } from "@/components/backgroundGrid";
import { siteMetadata } from "@/utils/metadata.mjs";

const source_code_pro = Source_Code_Pro({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-source_code_pro",
});
const noto_sans = Noto_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-noto_sans",
});
const noto_sans_jp = Noto_Sans_JP({
  display: "swap",
  variable: "--font-noto_sans_jp",
  preload: false,
});
const noto_sans_kr = Noto_Sans_KR({
  display: "swap",
  variable: "--font-noto_sans_kr",
  preload: false,
});

export const metadata: Metadata = {
  title: siteMetadata.title,
  description: siteMetadata.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${source_code_pro.variable} ${noto_sans.variable} ${noto_sans_jp.variable} ${noto_sans_kr.variable}`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-screen flex-col bg-background">
            <Header className="z-10 bg-background" />
            <main className="flex-1 px-6 py-12 md:px-12 lg:px-24 w-full">
              <BackgroundGrid className="z-0 absolute inset-0" />
              <div className="z-10 relative mx-auto max-w-3xl">{children}</div>
            </main>
            <Footer className="z-10 bg-background" />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
