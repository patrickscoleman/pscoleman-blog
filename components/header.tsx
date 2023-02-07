import { Menu } from "@/components/menu";
import { Search } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { SearchMenu } from "./searchMenu";

const Title = () => (
  <div className="flex">
    <Image
      priority
      src="/images/patrick.png"
      className="rounded-full border-2 border-text-light dark:border-0 self-end mb-px mr-1"
      height={25}
      width={25}
      alt="Sketched portrait of Patrick Coleman"
    />
    <h2 className="text-lg m-0">pscoleman.me/</h2>
  </div>
);

const HeaderComponent = ({ home }: { home: boolean }) => {
  return (
    <header className="mt-4 mb-8">
      <div className="flex w-full items-center justify-between mb-1">
        <Menu />
        {home ? (
          <Title />
        ) : (
          <Link href="/" className="no-underline">
            <Title />
          </Link>
        )}
        <SearchMenu />
      </div>
      <hr />
    </header>
  );
};

export const Header = HeaderComponent;
