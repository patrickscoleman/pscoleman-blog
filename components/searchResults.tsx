import { useInstantSearch, Hits } from "react-instantsearch-hooks-web";
import { SearchResultItem } from "./searchResultItem";

const SearchResultsComponent = () => {
  const { indexUiState, results } = useInstantSearch();
  console.log("results", results);

  // fix the logic here, status is not working, try ui state
  if (!indexUiState.query) {
    return <div>Kindly awaiting your input...</div>;
  } else if (indexUiState.query && results.nbHits) {
    return <Hits hitComponent={SearchResultItem} />;
  } else if (indexUiState.query && !results.nbHits) {
    return <div>...and returning empty-handed</div>;
  } else {
    return <div>Search error</div>;
  }
};

export const SearchResults = SearchResultsComponent;
