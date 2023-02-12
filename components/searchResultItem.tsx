import Link from "next/link";
import { NO_RESULTS_MESSAGE } from "./searchResults";

const MATCH_BEFORE_LENGTH = 10;
const MATCH_AFTER_LENGTH = 75;

const SearchResultItemComponent = (props) => {
  const hlResult = props?.hit?._highlightResult;

  const matchedDescription =
    hlResult.frontmatter.description.matchLevel !== "none"
      ? hlResult.frontmatter.description.value
      : null;

  const matchedContent = hlResult.content
    .map((c, index) => {
      const heading = c.heading?.value ?? "";
      const text = c.text?.value ?? "";
      const result = [];

      // Don't show the title of the post more than once in the search results
      if (text === hlResult.frontmatter.title.value) {
        return null;
      }

      if (c.heading?.matchLevel !== "none") {
        result.push(heading);
      }

      if (c.text?.matchLevel !== "none") {
        const matchStart = Math.max(
          0,
          text.indexOf("<mark>") - MATCH_BEFORE_LENGTH
        );
        const matchEnd = Math.min(
          text.length,
          text.indexOf("</mark>") + "</mark>".length + MATCH_AFTER_LENGTH
        );

        const matchedSnippet =
          (matchStart === 0 ? "" : "...") +
          text.slice(matchStart, matchEnd) +
          (matchEnd === text.length ? "" : "...");

        result.push(matchedSnippet);
      }

      if (result.length === 0) {
        return null;
      }

      return result;
    })
    .flat();

  const dedupedMatchedContent = [...new Set(matchedContent)] as string[];

  const displayResult = {
    title: hlResult.frontmatter.title.value,
    matchedDescription: matchedDescription,
    matchedContent: dedupedMatchedContent,
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
