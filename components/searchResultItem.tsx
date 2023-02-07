const SearchResultItemComponent = (props) => {
  const content = props?.hit?.content ?? "";
  // const words = content.split(" ").length;
  return (
    <a href={props.hit.path}>
      <div>
        <h3>{props?.hit?.frontmatter?.title ?? "no title"}</h3>
      </div>
      <p>{props?.hit?.frontmatter?.description ?? ""}</p>
    </a>
  );
};

export const SearchResultItem = SearchResultItemComponent;
