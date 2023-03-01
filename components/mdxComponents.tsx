import { OpenInNew, Link as LinkIcon } from "@mui/icons-material";
import Link from "next/link";

export const MdxComponents = {
  h1: (props) => (
    <>
      <h1 {...props} className="text-3xl mb-2"></h1>
      <hr className="mt-0 mb-2 h-0.5 border-0" />
    </>
  ),
  h2: (props) => {
    const uriChildren = encodeURI(props.children);
    return (
      <>
        <a id={uriChildren}></a>
        <div className="flex items-center -ml-8 mt-12">
          <a href={`#${uriChildren}`} className="no-underline w-8">
            <span className="text-lg my-0">
              <LinkIcon />
            </span>
          </a>
          <a href={`#${uriChildren}`} className="no-underline hover:underline">
            <h2 {...props} className="my-0"></h2>
          </a>
        </div>
      </>
    );
  },
  a: (props) => (
    <>
      {props.href.startsWith("/") || props.href.startsWith("#") ? (
        <Link
          {...props}
          className="decoration-1 decoration-accent-light dark:decoration-accent-dark"
        ></Link>
      ) : (
        <span className="inline-flex items-center my-0">
          <Link
            {...props}
            className="decoration-1 decoration-accent-light dark:decoration-accent-dark"
            target="_blank"
            rel="noopener noreferrer"
          ></Link>
          <OpenInNew className="ml-1" sx={{ fontSize: "1rem" }} />
        </span>
      )}
    </>
  ),
};
