import { useInstantSearch, Hits } from "react-instantsearch-hooks-web";
import { SearchResultItem } from "./searchResultItem";

export const NO_RESULTS_MESSAGE = "...and returning empty-handed";

const SearchResultsComponent = () => {
  const { indexUiState, results } = useInstantSearch();

  if (!indexUiState.query) {
    return <div>Kindly awaiting your input...</div>;
  } else if (indexUiState.query && results.nbHits) {
    return (
      <Hits hitComponent={SearchResultItem} classNames={{ item: "mt-0" }} />
    );
  } else if (indexUiState.query && !results.nbHits) {
    return <div>{NO_RESULTS_MESSAGE}</div>;
  } else {
    return <div>Search error</div>;
  }
};

export const SearchResults = SearchResultsComponent;
