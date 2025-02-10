"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, Home, FileText } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Search } from "@/components/search";
import { ModeToggle } from "@/components/modeToggle";
import { usePathname } from "next/navigation";

export const Header = (props: { className?: string }) => {
  const pathname = usePathname();

  // Close the dropdown menu when clicking an item.
  // This is necessary when using next/link. If you just use <a> tags, then the dropdown menu works normally.
  function onClick() {
    document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
  }

  return (
    <header
      className={`flex h-16 w-full items-center justify-between bg-none px-6 ${props.className}`}
    >
      <div className="flex items-center gap-4">
        {pathname === "/" ? (
          <div className="flex items-center gap-2 text-lg font-semibold">
            <Home className="h-4 w-4" />
            <span className="large font-mono">pscoleman.me/</span>
          </div>
        ) : (
          <div className="large font-mono flex items-center text-lg font-semibold">
            <Link className="flex items-center no-underline gap-2" href="/">
              <Home className="h-4 w-4" />
              pscoleman.me/
            </Link>
            <span className="items-center hidden sm:flex overflow-hidden whitespace-nowrap">
              {pathname.includes("/") && pathname.split("/").length > 2 && (
                <Link
                  className="no-underline"
                  href={`/${pathname.split("/")[1]}`}
                >
                  {pathname.split("/")[1]}/
                </Link>
              )}
              <span className="truncate">{pathname.split("/").pop()}</span>
            </span>
          </div>
        )}
      </div>
      <div className="flex items-center gap-2">
        {/* <Search /> */}
        <ModeToggle />
        {/* <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="icon" variant="outline">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </DropdownMenuTrigger>
          <nav>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={onClick}>
                <Link
                  className="flex items-center gap-2 no-underline w-full h-full"
                  href="/"
                >
                  <Home className="h-4 w-4" />
                  Home
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onClick}>
                <Link
                  className="flex items-center gap-2 no-underline w-full h-full"
                  href="/posts"
                >
                  <FileText className="h-4 w-4" />
                  Blog
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </nav>
        </DropdownMenu> */}
      </div>
    </header>
  );
};
