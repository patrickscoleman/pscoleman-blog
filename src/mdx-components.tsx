import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import { Link as LinkIcon, ExternalLink } from "lucide-react";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: (props) => (
      <>
        <a id="top"></a>
        <h1 {...props} />
      </>
    ),
    h2: (props) => {
      const h2Text = typeof props.children === "string" ? props.children : "";
      const h2ReplaceSpecialCharsWithDash = h2Text
        .toLowerCase()
        .replace(/[^a-zA-Z0-9]+/g, " ")
        .trim()
        .replace(/\s+/g, "-");
      const uri = encodeURI(h2ReplaceSpecialCharsWithDash);
      return (
        <>
          <a id={uri}></a>
          <div className="flex items-center ml-0 md:-ml-8 mt-12">
            <Link
              href={`#${uri}`}
              className="no-underline w-full flex items-center"
            >
              <span className="my-0 w-8 pb-2 hidden md:inline">
                <LinkIcon size="1.25rem" />
              </span>
              <h2 {...props} className="my-0"></h2>
            </Link>
          </div>
        </>
      );
    },
    a: (props) => (
      <>
        {props.href?.startsWith("/") || props.href?.startsWith("#") ? (
          <Link {...props} href={props.href!}></Link>
        ) : (
          <Link
            {...props}
            href={props.href!}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center"
          >
            {props.children}
            <ExternalLink className="ml-1 inline" size="1rem" />
          </Link>
        )}
      </>
    ),
    ...components,
  };
}
