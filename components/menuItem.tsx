import { Article, Home, Person, Place } from "@mui/icons-material";
import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";

const MENU_ITEM_ICONS = {
  "/": <Home />,
  "/about": <Person />,
  "/posts": <Article />,
};

type Path = `/${string}`;

const MenuItemComponent = ({ path, name }: { path: Path; name?: string }) => {
  name = name || path.charAt(1).toUpperCase() + path.slice(2);

  const router = useRouter();
  const currentPathname = router.pathname;

  return currentPathname === path ? (
    <Tooltip title="You are here" placement="right">
      <span>
        <ListItemButton disabled>
          <ListItemIcon>
            <Place />
          </ListItemIcon>
          <ListItemText primary={name} />
        </ListItemButton>
      </span>
    </Tooltip>
  ) : (
    <ListItemButton>
      <Link href={path} passHref className="flex no-underline items-center">
        <ListItemIcon>{MENU_ITEM_ICONS[path] || <Article />}</ListItemIcon>
        <ListItemText primary={name} />
      </Link>
    </ListItemButton>
  );
};

export const MenuItem = MenuItemComponent;
