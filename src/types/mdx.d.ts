declare module "*.mdx" {
  import type * as React from "react";
  const MDXComponent: React.FC & { metadata?: Record<string, any> };
  export default MDXComponent;
}
