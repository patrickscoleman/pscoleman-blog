import { useInstantSearch, Hits } from "react-instantsearch";
import { SearchResultItem } from "@/components/searchResultItem";

export const NO_RESULTS_MESSAGE = "No results...";

export const SearchResults = () => {
  const { indexUiState, results } = useInstantSearch();

  if (!indexUiState.query) {
    return <div>Results...</div>;
  } else if (indexUiState.query && results.nbHits) {
    return (
      <Hits
        hitComponent={SearchResultItem}
        classNames={{ list: "list-none ml-0", item: "mt-0" }}
      />
    );
  } else if (indexUiState.query && !results.nbHits) {
    return <div>{NO_RESULTS_MESSAGE}</div>;
  } else {
    return <div>Search error</div>;
  }
};
