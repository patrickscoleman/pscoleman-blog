import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import algoliasearch from "algoliasearch/lite";
import { useState, KeyboardEvent, MouseEvent } from "react";
import {
  connectStateResults,
  Hits,
  InstantSearch,
  SearchBox,
} from "react-instantsearch-dom";

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
      ((event as KeyboardEvent).key === "Tab" ||
        (event as KeyboardEvent).key === "Shift")
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
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export const SearchMenu = SearchMenuComponent;
