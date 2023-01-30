import { ThemeSwitch } from "@/components/themeSwitch";
import {
  Article,
  Close,
  Home as HomeIcon,
  Menu as MenuIcon,
  LunchDining,
} from "@mui/icons-material";
import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Box } from "@mui/system";
import Link from "next/link";
import React from "react";

const MENU_WIDTH = 220;
const FoodHamburger = () => <LunchDining fontSize="inherit" color="inherit" />;
const IconHamburger = () => <MenuIcon fontSize="inherit" color="inherit" />;

const MenuComponent = () => {
  const [open, setOpen] = React.useState(false);
  const [hoverIcon, setHoverIcon] = React.useState(IconHamburger);

  const toggleMenu =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setOpen(open);
    };

  return (
    <>
      <IconButton
        onClick={toggleMenu(true)}
        className="text-2xl text-text-light dark:text-text-darkbold"
        onMouseEnter={() => setHoverIcon(FoodHamburger)}
        onMouseLeave={() => setHoverIcon(IconHamburger)}
      >
        {hoverIcon}
      </IconButton>
      <Drawer anchor="left" open={open} onClose={toggleMenu(false)}>
        <Box
          sx={{ width: MENU_WIDTH }}
          role="presentation"
          onKeyDown={toggleMenu(false)}
        >
          <List>
            <ListItem className="mb-1 pb-0">
              <ListItemText primary="Menu" />
              <IconButton onClick={toggleMenu(false)}>
                <Close />
              </IconButton>
            </ListItem>
            <hr className="mx-3" />
            <ListItem disablePadding>
              <ListItemButton>
                <Link
                  href="/"
                  passHref
                  className="flex no-underline items-center"
                >
                  <ListItemIcon>
                    <HomeIcon />
                  </ListItemIcon>
                  <ListItemText primary="Home" />
                </Link>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={toggleMenu(false)}>
                <Link
                  href="/posts"
                  passHref
                  className="flex no-underline items-center"
                >
                  <ListItemIcon>
                    <Article />
                  </ListItemIcon>
                  <ListItemText primary="Posts" />
                </Link>
              </ListItemButton>
            </ListItem>
            <hr className="mx-3" />
            <ThemeSwitch />
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export const Menu = MenuComponent;
