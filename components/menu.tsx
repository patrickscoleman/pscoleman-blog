import { MenuItem } from "@/components/menuItem";
import { ThemeSwitch } from "@/components/themeSwitch";
import { Close, LunchDining, Menu as MenuIcon } from "@mui/icons-material";
import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const MENU_WIDTH = 220;
// @ts-ignore
const FoodHamburger = () => <LunchDining color="menu" />;
// @ts-ignore
const IconHamburger = () => <MenuIcon color="menu" />;

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
              <MenuItem path="/" name="Home" />
            </ListItem>
            <ListItem disablePadding>
              <MenuItem path="/posts" />
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
