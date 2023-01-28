import { Menu } from "@/components/menu";
import { Search } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

const Title = () => (
  <div>
    <h2 aria-label="pscoleman.me/" className="flex text-lg mx-1 my-0">
      pscoleman
      <Image
        priority
        src="/images/patrick.png"
        className="rounded-full self-end mb-1.5"
        height={7}
        width={7}
        alt="dot"
      />
      me/
    </h2>
  </div>
);

const HeaderComponent = ({ home }: { home: boolean }) => {
  return (
    <header className="mt-4 mb-8">
      <div className="flex w-full items-center justify-between">
        <>
          <Menu />
          {home ? (
            <Title />
          ) : (
            <Link href="/" className="no-underline">
              <Title />
            </Link>
          )}
          <Tooltip title="Search coming soon">
            <span>
              <IconButton disabled className="p-0">
                <Search />
              </IconButton>
            </span>
          </Tooltip>
        </>
      </div>
      <hr />
    </header>
  );
};

export const Header = HeaderComponent;
