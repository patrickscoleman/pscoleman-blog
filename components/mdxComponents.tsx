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
  a: (props) => {
    const isInternalLink =
      props.href.startsWith("/") || props.href.startsWith("#");

    // Check if children is a string and handle accordingly
    const content =
      typeof props.children === "string"
        ? props.children.split(" ").reduce((acc, word, index, array) => {
            // Add the word itself
            acc.push(word);

            // If it's not the last word, add a space after it
            if (index < array.length - 1) {
              acc.push(" ");
            }

            // If it's the last word, add the OpenInNew icon
            if (index === array.length - 1) {
              acc.push(
                <OpenInNew
                  key="icon"
                  className="ml-1 inline"
                  sx={{ fontSize: "1rem" }}
                />
              );
            }

            return acc;
          }, [])
        : props.children;

    return (
      <Link
        {...props}
        className={`decoration-1 decoration-accent-light dark:decoration-accent-dark ${
          !isInternalLink ? "inline-flex items-center" : ""
        }`}
        target={!isInternalLink ? "_blank" : undefined}
        rel={!isInternalLink ? "noopener noreferrer" : undefined}
      >
        {content}
      </Link>
    );
    <>
      {props.href.startsWith("/") || props.href.startsWith("#") ? (
        <Link
          {...props}
          className="decoration-1 decoration-accent-light dark:decoration-accent-dark"
        ></Link>
      ) : (
        <Link
          {...props}
          className="decoration-1 decoration-accent-light dark:decoration-accent-dark"
          target="_blank"
          rel="noopener noreferrer"
        >
          {props.children}
          <OpenInNew className="ml-1" sx={{ fontSize: "1rem" }} />
        </Link>
      )}
    </>;
  },
};
