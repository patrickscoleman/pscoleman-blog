import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Search</DialogTitle>
            <DialogDescription>Search</DialogDescription>
          </DialogHeader>
          <p>Results</p>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
