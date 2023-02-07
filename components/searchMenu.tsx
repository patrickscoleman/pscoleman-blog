import { SearchResults } from "@/components/searchResults";
import { Close, Search } from "@mui/icons-material";
import { Box, Drawer, IconButton, List, ListItem } from "@mui/material";
import algoliasearch from "algoliasearch/lite";
import "instantsearch.css/themes/reset.css";
import { KeyboardEvent, MouseEvent, useState } from "react";
import {
  InstantSearch,
  PoweredBy,
  SearchBox,
} from "react-instantsearch-hooks-web";
import { useTheme } from "next-themes";

const MENU_WIDTH = 300;

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
  process.env.NEXT_PUBLIC_ALGOLIA_API_KEY
);

const SearchMenuComponent = () => {
  const [open, setOpen] = useState(false);
  const { resolvedTheme } = useTheme();
  const theme = resolvedTheme === "dark" ? "dark" : "light";

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
          className="flex flex-col h-full justify-between"
        >
          <List className="h-full">
            <ListItem className="flex justify-between mb-1 pb-0">
              <IconButton onClick={toggleMenu(false)}>
                {/* @ts-ignore */}
                <Close color="topmenu" />
              </IconButton>
              <h2 className="w-full my-0 text-lg text-right">Search</h2>
            </ListItem>
            <hr className="mx-3" />
            <InstantSearch searchClient={searchClient} indexName="blogposts">
              <ListItem>
                <SearchBox
                  autoFocus={true}
                  placeholder="[text]"
                  submitIconComponent={() => <></>}
                  resetIconComponent={() => <></>}
                  classNames={{
                    input:
                      "px-2 h-10 w-64 mx-1.5 bg-bg-lightinput dark:bg-bg-darkinput rounded focus:outline-accent-light dark:focus:outline-accent-dark",
                  }}
                />
              </ListItem>
              <hr className="mx-3" />
              <ListItem>
                <SearchResults />
              </ListItem>
            </InstantSearch>
          </List>
          <div className="flex bg-bg-lightinput dark:bg-bg-darkinput p-2 justify-end">
            <PoweredBy
              theme={theme}
              classNames={{
                link: "text-xs",
              }}
            />
          </div>
        </Box>
      </Drawer>
    </>
  );
};

export const SearchMenu = SearchMenuComponent;
