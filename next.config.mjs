import createMDX from "@next/mdx";
import rehypeHighlight from "rehype-highlight";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure `pageExtensions` to include markdown and MDX files
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],

  async redirects() {
    return [
      // Basic redirects
      {
        source: "/about",
        destination: "/",
        permanent: true,
      },
      {
        source: "/hireme",
        destination: "/work",
        permanent: true,
      },
      {
        source: "/posts",
        destination: "/blog",
        permanent: true,
      },
      // Wildcard path matching for blog posts
      {
        source: "/posts/:slug",
        destination: "/blog/:slug",
        permanent: true,
      },
    ];
  },

  // Optionally, add any other Next.js config below
};

const withMDX = createMDX({
  // .md and .mdx files
  extension: /\.mdx?$/,
  // Add markdown plugins here, as desired
  options: {
    remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter],
    rehypePlugins: [rehypeHighlight],
  },
});

// Merge MDX config with Next.js config
export default withMDX(nextConfig);
