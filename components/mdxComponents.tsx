import { OpenInNew } from "@mui/icons-material";
import Link from "next/link";

export const MdxComponents = {
  h1: (props) => (
    <>
      <h1 {...props} className="text-3xl mb-2"></h1>
      <hr className="mt-0 mb-2 h-0.5 border-0" />
    </>
  ),
  a: (props) => (
    <>
      {props.href.startsWith("/") ? (
        <Link
          {...props}
          className="decoration-1 decoration-accent-light dark:decoration-accent-dark"
        ></Link>
      ) : (
        <span className="inline-flex items-center">
          <Link
            {...props}
            className="decoration-1 decoration-accent-light dark:decoration-accent-dark"
            target="_blank"
            rel="noopener noreferrer"
          ></Link>
          <OpenInNew className="ml-1 text-sm" />
        </span>
      )}
    </>
  ),
};
