import { ThemeSwitch } from "@/components/themeSwitch";
import {
  Article,
  Close,
  Home as HomeIcon,
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

const MenuComponent = () => {
  const [open, setOpen] = React.useState(false);

  const toggleMenu =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      console.log(event);
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
      <IconButton onClick={toggleMenu(true)}>
        <LunchDining className="text-3xl text-text-light dark:text-text-dark" />
      </IconButton>
      <Drawer anchor="right" open={open} onClose={toggleMenu(false)}>
        <Box
          sx={{ width: MENU_WIDTH }}
          role="presentation"
          onKeyDown={toggleMenu(false)}
        >
          <List>
            <ListItem>
              <ListItemText
                primary="Menu"
                primaryTypographyProps={{ className: "text-xl font-black" }}
              />
              <IconButton onClick={toggleMenu(false)}>
                <Close />
              </IconButton>
            </ListItem>
            <hr />
            <ListItem disablePadding>
              <ListItemButton>
                <Link href="/" className="flex no-underline items-center">
                  <ListItemIcon>
                    <HomeIcon />
                  </ListItemIcon>
                  <ListItemText primary="Home" />
                </Link>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={toggleMenu(false)}>
                <Link href="/posts" className="flex no-underline items-center">
                  <ListItemIcon>
                    <Article />
                  </ListItemIcon>
                  <ListItemText primary="Posts" />
                </Link>
              </ListItemButton>
            </ListItem>
            <br />
            <ThemeSwitch />
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export const Menu = MenuComponent;
