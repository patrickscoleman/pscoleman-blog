import { Menu } from "@/components/menu";
import { Search } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

const Title = () => (
  <div className="flex">
    <Image
      priority
      src="/images/patrick.png"
      className="rounded-full self-end mb-2 mr-1"
      height={15}
      width={15}
      alt="Sketched portrait of Patrick Coleman"
    />
    <span className="text-lg">://</span>
    <h2 className="text-lg m-0">pscoleman.me/</h2>
  </div>
);

const HeaderComponent = ({ home }: { home: boolean }) => {
  return (
    <header className="mt-4 mb-8">
      <div className="flex w-full items-center justify-between mb-1">
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
              <IconButton
                disabled
                // className="p-0 text-2xl text-text-light dark:text-text-darkbold"
                className="p-0 text-2xl"
              >
                <Search fontSize="inherit" color="inherit" />
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
