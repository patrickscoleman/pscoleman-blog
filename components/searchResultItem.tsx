import Link from "next/link";
import { NO_RESULTS_MESSAGE } from "./searchResults";

const SearchResultItemComponent = (props) => {
  const hlResult = props?.hit?._highlightResult;

  const matchedDescription =
    hlResult.frontmatter.description.matchLevel !== "none"
      ? hlResult.frontmatter.description.value
      : null;

  const matchedContent = hlResult.content.map((c) => {
    // ignore h1 title
    if (c.text?.value === hlResult.frontmatter.title.value) {
      return null;
    } else if (c.text?.matchLevel !== "none") {
      return c.text.value;
    } else {
      return null;
    }
  });

  const displayResult = {
    title: hlResult.frontmatter.title.value,
    matchedDescription: matchedDescription,
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
      {displayResult.matchedDescription && (
        <div
          dangerouslySetInnerHTML={{
            __html: displayResult.matchedDescription,
          }}
          className="mt-0 mb-2"
        />
      )}
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
