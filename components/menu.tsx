import { MenuItem } from "@/components/menuItem";
import { ThemeSwitch } from "@/components/themeSwitch";
import { Close, LunchDining, Menu as MenuIcon } from "@mui/icons-material";
import { Drawer, IconButton, List, ListItem } from "@mui/material";
import { Box } from "@mui/system";
import { KeyboardEvent, MouseEvent, useState } from "react";

const MENU_WIDTH = 220;
// @ts-ignore
const IconHamburger = () => <MenuIcon color="topmenu" />;

const MenuComponent = () => {
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
        <IconHamburger />
      </IconButton>
      <Drawer anchor="left" open={open} onClose={toggleMenu(false)}>
        <Box
          sx={{ width: MENU_WIDTH }}
          role="presentation"
          onKeyDown={toggleMenu(false)}
        >
          <List>
            <ListItem className="mb-1 pb-0">
              <h2 className="w-full my-0 text-lg">Menu</h2>
              <IconButton onClick={toggleMenu(false)}>
                {/* @ts-ignore */}
                <Close color="topmenu" />
              </IconButton>
            </ListItem>
            <hr className="mx-3" />
            <ListItem disablePadding>
              <MenuItem path="/" name="Home" />
            </ListItem>
            <ListItem disablePadding>
              <MenuItem path="/about" />
            </ListItem>
            <ListItem disablePadding>
              <MenuItem path="/hireme" name="Hire Me" />
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
