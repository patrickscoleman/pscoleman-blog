import { LunchDining } from "@mui/icons-material";
import Link from "next/link";
import { ThemeSwitch } from "@/components/themeSwitch";
import { Menu as MenuIcon, Close } from "@mui/icons-material";

const MenuComponent = () => {
  return (
    <>
      <MenuIcon />
      <Close />
      <div className="flex flex-col">
        <LunchDining /> Menu
        <ThemeSwitch />
        <Link href="/">Home</Link>
        <Link href="/posts">Posts</Link>
      </div>
    </>
  );
};

export const Menu = MenuComponent;
