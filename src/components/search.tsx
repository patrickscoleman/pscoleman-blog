import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Search as SearchIcon } from "lucide-react";

export function Search() {
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <div>
            <Button className="md:hidden" size="icon" variant="outline">
              <SearchIcon className="h-4 w-4" />
              <span className="sr-only">Search</span>
            </Button>
            <Button
              className="items-center justify-between hidden md:flex w-48"
              variant="outline"
            >
              <span className="text-muted-foreground">Search...</span>
              <SearchIcon className="h-4 w-4 mr-1" />
            </Button>
          </div>
        </DialogTrigger>
        <DialogContent className="max-w-[350px] sm:max-w-[425px]">
          <div className="mb-4 flex items-center relative">
            <Input
              className="w-full rounded-md border-none outline-none focus:outline-none pl-2 pr-8"
              placeholder="Search..."
              type="search"
            />
            <SearchIcon className="absolute right-2 h-5 w-5" />
          </div>
          <hr />
          <p>Results...</p>
        </DialogContent>
      </Dialog>
    </div>
  );
}
