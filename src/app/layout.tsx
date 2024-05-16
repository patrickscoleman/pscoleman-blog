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
import { PostNavigation } from "@/components/postNavigation";

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
  title: {
    template: `%s | ${siteMetadata.baseUrl}`,
    default: siteMetadata.title + " | " + siteMetadata.baseUrl,
  },
  description: siteMetadata.description,
  creator: siteMetadata.firstName + " " + siteMetadata.lastName,
  publisher: siteMetadata.firstName + " " + siteMetadata.lastName,
  authors: [
    {
      name: siteMetadata.firstName + " " + siteMetadata.lastName,
      url: siteMetadata.siteUrl,
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`overscroll-x-none ${source_code_pro.variable} ${noto_sans.variable} ${noto_sans_jp.variable} ${noto_sans_kr.variable}`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-screen flex-col bg-background relative">
            <BackgroundGrid className="z-0" />
            <Header className="z-10" />
            <main className="z-10 flex-1 px-6 py-12 md:px-12 lg:px-24 w-full h-full relative">
              <div className="mx-auto max-w-3xl">
                {children}
                <PostNavigation />
              </div>
            </main>
            <Footer className="z-10" />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
