import createMDX from "@next/mdx";
import type { NextConfig } from "next";


const nextConfig: NextConfig = {    
  reactCompiler: true,
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
};

const withMdx = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [
      'remark-frontmatter',
      [ 'remark-mdx-frontmatter', { name: "metadata", exports: true }],
    ],
  },
});

export default withMdx(nextConfig);
