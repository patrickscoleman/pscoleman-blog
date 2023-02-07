import { connectStateResults, Hits } from "react-instantsearch-dom";
import { SearchResultItem } from "./searchResultItem";

const SearchResultsComponent = connectStateResults(
  ({ searchState, searchResults, searching }) => {
    const hasQuery = searchState && searchState.query;
    const hasResults = (searchResults?.hits ?? []).length > 0;
    const isSearching = searching;
    if (hasQuery && hasResults) {
      return <Hits hitComponent={SearchResultItem} />;
    }
    if (hasQuery && !hasResults && !isSearching) {
      return <div>No results 😔</div>;
    }
    return null;
  }
);
export const SearchResults = SearchResultsComponent;
