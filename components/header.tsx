import Image from "next/image";
import Link from "next/link";
import { ThemeSwitch } from "@/components/themeSwitch";

const HeaderComponent = ({ home }: { home: boolean }) => {
  return (
    <header className="mt-4 mb-8 flex items-center justify-between">
      <div className="flex items-center">
        {home ? (
          <>
            <Image
              priority
              src="/images/patrick.png"
              className="rounded-full mx-1"
              height={40}
              width={40}
              alt="Patrick Coleman"
            />
            <h2 className="text-lg mx-1 my-0">pscoleman.me/</h2>
          </>
        ) : (
          <>
            <Link href="/">
              <Image
                priority
                src="/images/patrick.png"
                className="rounded-full mx-1"
                height={40}
                width={40}
                alt="Patrick Coleman"
              />
            </Link>
            <h2 className="text-lg mx-1 my-0">
              <Link href="/" className="no-underline">
                pscoleman.me/
              </Link>
            </h2>
          </>
        )}
      </div>
      <div className="flex">
        <p className="mr-2">PAGES</p>
        <ThemeSwitch />
      </div>
    </header>
  );
};

export const Header = HeaderComponent;
