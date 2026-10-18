"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Search as SearchIcon } from "lucide-react";
import algoliasearch from "algoliasearch";
import { SearchResults } from "@/components/searchResults";
import { SearchBox } from "react-instantsearch";
import { InstantSearchNext } from "react-instantsearch-nextjs";
import Link from "next/link";

const appId = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID;
const apiKey = process.env.NEXT_PUBLIC_ALGOLIA_API_KEY;
if (!appId || !apiKey) {
  throw new Error("Algolia App ID and API Key must be defined");
}
const searchClient = algoliasearch(appId, apiKey);

export const Search = () => {
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
        <DialogContent className="max-w-[350px] sm:max-w-[425px] h-[500px] flex flex-col">
          <InstantSearchNext searchClient={searchClient} indexName="blogposts">
            <SearchBox
              className="flex-grow-0"
              searchAsYouType={true}
              autoFocus={true}
              submitIconComponent={() => <></>}
              resetIconComponent={() => <></>}
              loadingIconComponent={() => <></>}
              placeholder="Search..."
              classNames={{
                input: "w-full px-2 rounded h-10 bg-input",
              }}
            />
            <hr className="my-0" />
            <div className="flex-grow overflow-auto">
              <SearchResults />
            </div>
            <hr className="my-0" />
            <div className="flex-grow-0 muted">
              Powered by{" "}
              <Link
                className="muted no-underline font-normal"
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.algolia.com/?utm_source=react-instantsearch&utm_medium=website&utm_content=localhost&utm_campaign=poweredby"
              >
                Algolia
              </Link>
            </div>
          </InstantSearchNext>
        </DialogContent>
      </Dialog>
    </div>
  );
};
