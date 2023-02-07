import { useInstantSearch, Hits } from "react-instantsearch-hooks-web";
import { SearchResultItem } from "./searchResultItem";

const SearchResultsComponent = () => {
  const { status, results } = useInstantSearch();

  if (status === "idle") {
    return <div>Kindly awaiting your input...</div>;
  } else if (status === "loading" && results) {
    return <Hits hitComponent={SearchResultItem} />;
  } else if (status === "loading" && !results) {
    return <div>...and returning empty-handed</div>;
  } else {
    return <div>Search error</div>;
  }
};

export const SearchResults = SearchResultsComponent;
