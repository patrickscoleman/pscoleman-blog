import Link from "next/link";
import { NO_RESULTS_MESSAGE } from "./searchResults";

const SearchResultItemComponent = (props) => {
  const hlResult = props?.hit?._highlightResult;
  console.log("highlight results", hlResult);

  const matchedContent = ["test", "test2"];
  const displayResult = {
    title: hlResult.frontmatter.title.value,
    matchedContent: matchedContent,
  };
  console.log("title", displayResult.title);

  return props?.hit ? (
    <div className="">
      <Link href={props.hit.path} passHref>
        <div
          dangerouslySetInnerHTML={{
            __html: displayResult.title ?? "Untitled",
          }}
        />
      </Link>
      {/* <p>{props?.hit?._highlightResult ?? ""}</p> */}
    </div>
  ) : (
    <div>{NO_RESULTS_MESSAGE}</div>
  );
};

export const SearchResultItem = SearchResultItemComponent;
