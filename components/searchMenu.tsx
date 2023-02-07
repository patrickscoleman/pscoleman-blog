import { SearchResults } from "@/components/searchResults";
import { Search } from "@mui/icons-material";
import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import algoliasearch from "algoliasearch/lite";
import { KeyboardEvent, MouseEvent, useState } from "react";
import { InstantSearch, SearchBox } from "react-instantsearch-dom";

const MENU_WIDTH = 300;

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
  process.env.NEXT_PUBLIC_ALGOLIA_API_KEY
);

const SearchMenuComponent = () => {
  const [open, setOpen] = useState(false);

  const toggleMenu = (open: boolean) => (event: KeyboardEvent | MouseEvent) => {
    if (
      event &&
      event.type === "keydown" &&
      (event as KeyboardEvent).key !== "Escape"
    ) {
      return;
    }

    setOpen(open);
  };

  return (
    <>
      <IconButton onClick={toggleMenu(true)}>
        <Search />
      </IconButton>
      <Drawer anchor="right" open={open} onClose={toggleMenu(false)}>
        <Box
          sx={{ width: MENU_WIDTH }}
          role="presentation"
          onKeyDown={toggleMenu(false)}
        >
          <List>
            <ListItem>
              <ListItemText primary="Search" />
            </ListItem>
            <InstantSearch
              searchClient={searchClient}
              indexName="pscoleman-blog"
            >
              <SearchBox />
              <SearchResults />
            </InstantSearch>
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export const SearchMenu = SearchMenuComponent;
