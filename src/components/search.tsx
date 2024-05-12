import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Search as SearchIcon } from "lucide-react";

export function Search() {
  return (
    <div>
      <Drawer>
        <DrawerTrigger asChild>
          <Button className="md:hidden" size="icon" variant="ghost">
            <SearchIcon className="h-4 w-4" />
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
                <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
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
          <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
          <Input
            className="w-full bg-white shadow-none appearance-none pl-8 md:w-[200px] dark:bg-gray-950"
            placeholder="Search..."
            type="search"
          />
        </div>
      </form>
    </div>
  );
}
