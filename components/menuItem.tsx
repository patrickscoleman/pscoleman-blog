import { Article, Home, Place } from "@mui/icons-material";
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";

const MENU_ITEM_ICONS = {
  "/": <Home />,
  "/posts": <Article />,
};

type Path = `/${string}`;

const MenuItemComponent = ({ path, name }: { path: Path; name?: string }) => {
  name = name || path.charAt(1).toUpperCase() + path.slice(2);

  const router = useRouter();
  const currentPathname = router.pathname;

  return (
    <ListItemButton disabled={currentPathname === path}>
      <Link href={path} passHref className="flex no-underline items-center">
        <ListItemIcon>
          {currentPathname === path ? (
            <Place />
          ) : (
            MENU_ITEM_ICONS[path] || <Article />
          )}
        </ListItemIcon>
        <ListItemText
          primary={`${name}${currentPathname === path ? " (here)" : ""}`}
        />
      </Link>
    </ListItemButton>
  );
};

export const MenuItem = MenuItemComponent;
