import Link from "next/link";
import { NO_RESULTS_MESSAGE } from "@/components/searchResults";

const MATCH_BEFORE_LENGTH = 20;
const MATCH_AFTER_LENGTH = 75;

export const SearchResultItem = (props: any) => {
  // Close the dialog box when clicking an item.
  // This is necessary when using next/link. If you just use <a> tags, then the dialog box works normally.
  function onClick() {
    document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
  }

  const hit = props?.hit;
  const hlResult = hit?._highlightResult;

  const matchedContent = hlResult.content
    .map((c: any) => {
      const heading = c.heading?.value ?? "";
      const text = c.text?.value ?? "";
      const result = [];

      if (c.heading?.matchLevel !== "none" && heading !== hit.metadata?.title) {
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

  const dedupedMatchedContent = matchedContent.filter(
    (item: string, index: number) => matchedContent.indexOf(item) === index
  ) as string[];

  const displayResult = {
    title: hit.metadata?.title,
    matchedContent: dedupedMatchedContent,
  };

  return hit ? (
    <div className="mt-0 mb-4">
      <Link href={hit.path} passHref className="my-0" onClick={onClick}>
        <div
          dangerouslySetInnerHTML={{
            __html: displayResult.title ?? "Untitled",
          }}
          className="mt-0 mb-2"
        />
      </Link>
      {/* Only display the first 3 results within a blogpost */}
      {displayResult.matchedContent.slice(0, 3).map((result, key) => {
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
      {displayResult.matchedContent.length > 3 && (
        <div className="mt-0 mb-2">...</div>
      )}
    </div>
  ) : (
    <div>{NO_RESULTS_MESSAGE}</div>
  );
};
