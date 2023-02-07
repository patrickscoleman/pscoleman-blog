import { connectStateResults, Hits } from "react-instantsearch-dom";
import { SearchResultItem } from "./searchResultItem";

const SearchResultsComponent = connectStateResults(
  ({ searchState, searchResults, searching }) => {
    const hasQuery = searchState && searchState.query;
    const hasResults = (searchResults?.hits ?? []).length > 0;
    const isSearching = searching;

    if (!hasQuery) {
      return <div>Kindly awaiting your input...</div>;
    } else if (hasQuery && hasResults) {
      return <Hits hitComponent={SearchResultItem} />;
    } else if (hasQuery && !hasResults && !isSearching) {
      return <div>...and returning empty-handed</div>;
    } else {
      return null;
    }
  }
);
export const SearchResults = SearchResultsComponent;
