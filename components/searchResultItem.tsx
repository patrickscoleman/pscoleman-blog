import Link from "next/link";
import { NO_RESULTS_MESSAGE } from "./searchResults";

const SearchResultItemComponent = (props) => {
  const hlResult = props?.hit?._highlightResult;
  console.log("highlight results", hlResult);

  const matchedContent = hlResult.content
    .map((c) => {
      console.log("inner content", c);
      const matchedHeadingAndContent = [];
      if (c.heading?.matchLevel === "full") {
        matchedHeadingAndContent.push(c.heading.value);
      }
      if (c.text?.matchLevel === "full") {
        matchedHeadingAndContent.push(c.text.value);
      }
      return matchedHeadingAndContent;
    })
    .flat();

  console.log("matched", matchedContent);

  const displayResult = {
    title: hlResult.frontmatter.title.value,
    matchedContent: matchedContent,
  };

  return props?.hit ? (
    <div className="">
      <Link href={props.hit.path} passHref>
        <div
          dangerouslySetInnerHTML={{
            __html: displayResult.title ?? "Untitled",
          }}
        />
      </Link>
      {displayResult.matchedContent.map((result, key) => {
        return (
          <div
            key={key}
            dangerouslySetInnerHTML={{
              __html: result,
            }}
          />
        );
      })}
    </div>
  ) : (
    <div>{NO_RESULTS_MESSAGE}</div>
  );
};

export const SearchResultItem = SearchResultItemComponent;
