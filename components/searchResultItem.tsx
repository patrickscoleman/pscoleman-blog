import Link from "next/link";

const SearchResultItemComponent = (props) => {
  const content = props?.hit?.content ?? "";
  // const words = content.split(" ").length;
  console.log("highlight results", props?.hit?._highlightResult);
  return (
    <Link href={props.hit.path} passHref>
      <div>
        <h3>{props?.hit?.frontmatter?.title ?? "no title"}</h3>
      </div>
      {/* <p>{props?.hit?._highlightResult ?? ""}</p> */}
    </Link>
  );
};

export const SearchResultItem = SearchResultItemComponent;
