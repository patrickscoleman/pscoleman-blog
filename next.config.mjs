import mdx from "@next/mdx";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import rehypeHighlight from "rehype-highlight";

const withMDX = mdx({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter],
    rehypePlugins: [rehypeHighlight],
  },
});

export default withMDX({
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
});
