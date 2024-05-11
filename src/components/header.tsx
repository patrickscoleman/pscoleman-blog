"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Search, Menu, Home, Laptop, FileText } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { ModeToggle } from "@/components/modeToggle";
import { usePathname } from "next/navigation";

export const Header = (props: { className?: string }) => {
  const pathname = usePathname();

  return (
    <header
      className={`flex h-16 w-full items-center justify-between border-b border-gray-200 px-6 dark:border-gray-800 ${props.className}`}
    >
      <div className="flex items-center gap-4">
        {pathname === "/" ? (
          <div className="flex items-center gap-2 text-lg font-semibold">
            <Home className="h-4 w-4" />
            <span className="large font-mono">pscoleman.me/</span>
          </div>
        ) : (
          <Link
            className="flex items-center gap-2 text-lg font-semibold no-underline"
            href="/"
          >
            <Home className="h-4 w-4" />
            <span className="large font-mono">pscoleman.me/</span>
          </Link>
        )}
      </div>
      <div className="flex items-center gap-2">
        <Drawer>
          <DrawerTrigger asChild>
            <Button className="md:hidden" size="icon" variant="ghost">
              <Search className="h-4 w-4" />
              <span className="sr-only">Search</span>
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Search</DrawerTitle>
            </DrawerHeader>
            <div>
              <form>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                  <Input
                    className="w-full bg-white shadow-none appearance-none pl-8 dark:bg-gray-950"
                    placeholder="Search..."
                    type="search"
                  />
                </div>
              </form>
            </div>
          </DrawerContent>
        </Drawer>
        <form className="hidden md:block">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
            <Input
              className="w-full bg-white shadow-none appearance-none pl-8 md:w-[200px] dark:bg-gray-950"
              placeholder="Search..."
              type="search"
            />
          </div>
        </form>
        <ModeToggle />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="icon" variant="ghost">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </DropdownMenuTrigger>
          <nav>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Link
                  className="flex items-center gap-2 no-underline w-full h-full"
                  href="/"
                >
                  <Home className="h-4 w-4" />
                  Home
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link
                  className="flex items-center gap-2 no-underline w-full h-full"
                  href="/hireme"
                >
                  <Laptop className="h-4 w-4" />
                  Work
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
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
        </DropdownMenu>
      </div>
    </header>
  );
};
