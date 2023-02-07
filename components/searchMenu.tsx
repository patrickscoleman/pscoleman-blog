import { SearchResults } from "@/components/searchResults";
import { Search, Close } from "@mui/icons-material";
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
import { InstantSearch, SearchBox } from "react-instantsearch-hooks-web";
import "instantsearch.css/themes/reset.css";

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
        {/* @ts-ignore */}
        <Search color="topmenu" />
      </IconButton>
      <Drawer anchor="right" open={open} onClose={toggleMenu(false)}>
        <Box
          sx={{ width: MENU_WIDTH }}
          role="presentation"
          onKeyDown={toggleMenu(false)}
        >
          <List>
            <ListItem className="flex justify-between mb-1 pb-0">
              <IconButton onClick={toggleMenu(false)}>
                {/* @ts-ignore */}
                <Close color="topmenu" />
              </IconButton>
              <ListItemText primary="Search" className="text-right" />
            </ListItem>
            <hr className="mx-3" />
            <InstantSearch searchClient={searchClient} indexName="blogposts">
              <ListItem>
                <SearchBox
                  autoFocus={true}
                  submitIconComponent={() => <></>}
                  resetIconComponent={() => <></>}
                  classNames={{
                    input:
                      "px-2 h-10 w-64 mx-1.5 focus:outline-accent-light dark:focus:outline-accent-dark",
                  }}
                />
              </ListItem>
              <hr className="mx-3" />
              <ListItem>
                <SearchResults />
              </ListItem>
            </InstantSearch>
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export const SearchMenu = SearchMenuComponent;
