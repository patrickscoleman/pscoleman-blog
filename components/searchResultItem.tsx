import Link from "next/link";
import { NO_RESULTS_MESSAGE } from "./searchResults";

const SearchResultItemComponent = (props) => {
  const hlResult = props?.hit?._highlightResult;

  const matchedContent = hlResult.content
    .map((c) => {
      const matchedHeadingAndContent = [];
      if (c.heading?.matchLevel !== "none") {
        matchedHeadingAndContent.push(c.heading.value);
      }
      if (c.text?.matchLevel !== "none") {
        matchedHeadingAndContent.push(c.text.value);
      }
      return matchedHeadingAndContent;
    })
    .flat();

  const displayResult = {
    title: hlResult.frontmatter.title.value,
    matchedContent: matchedContent,
  };

  return props?.hit ? (
    <div className="mt-0 mb-4">
      <Link href={props.hit.path} passHref className="my-0">
        <div
          dangerouslySetInnerHTML={{
            __html: displayResult.title ?? "Untitled",
          }}
          className="mt-0 mb-2"
        />
      </Link>
      {displayResult.matchedContent.map((result, key) => {
        return (
          <div
            key={key}
            dangerouslySetInnerHTML={{
              __html: result,
            }}
            className="mt-0 mb-2"
          />
        );
      })}
    </div>
  ) : (
    <div>{NO_RESULTS_MESSAGE}</div>
  );
};

export const SearchResultItem = SearchResultItemComponent;
