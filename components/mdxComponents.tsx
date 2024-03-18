import { OpenInNew, Link as LinkIcon } from "@mui/icons-material";
import Link from "next/link";

export const MdxComponents = {
  h1: (props) => (
    <>
      <a id="top"></a>
      <h1 {...props} className="text-3xl mb-2"></h1>
      <hr className="mt-0 mb-2 h-0.5 border-0" />
    </>
  ),
  h2: (props) => {
    const h2Text = props.children;
    const h2ReplaceSpecialCharsWithDash = h2Text
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]+/g, " ")
      .trim()
      .replace(/\s+/g, "-");
    const uri = encodeURI(h2ReplaceSpecialCharsWithDash);
    return (
      <>
        <a id={uri}></a>
        <div className="flex items-center -ml-8 mt-12">
          <a href={`#${uri}`} className="no-underline w-8">
            <span className="text-lg my-0">
              <LinkIcon />
            </span>
          </a>
          <a href={`#${uri}`} className="no-underline hover:underline">
            <h2 {...props} className="my-0"></h2>
          </a>
        </div>
      </>
    );
  },
  a: (props) => (
    <>
      {props.href.startsWith("/") || props.href.startsWith("#") ? (
        <Link {...props}></Link>
      ) : (
        <Link {...props} target="_blank" rel="noopener noreferrer">
          {props.children}
          <OpenInNew className="ml-1" sx={{ fontSize: "1rem" }} />
        </Link>
      )}
    </>
  ),
};
