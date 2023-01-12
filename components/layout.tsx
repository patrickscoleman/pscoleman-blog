import { Meta } from "@/components/meta";
import Image from "next/image";
import Link from "next/link";
import { ThemeSwitch } from "@/components/themeSwitch";

const name = "Patrick Coleman";

const LayoutComponent = ({
  children,
  home,
  title,
  section,
  description,
}: {
  children: React.ReactNode;
  home?: boolean;
  title?: string;
  section?: string;
  description?: string;
}): JSX.Element => {
  return (
    <div className="w-10/12 sm:9/12 md:w-8/12 lg:w-7/12 xl:w-6/12 2xl:5/12 mx-auto my-2">
      <Meta title={title} description={description} />
      <header className="mt-4 mb-8 flex items-center justify-between">
        <div className="flex items-center">
          {home ? (
            <>
              <Image
                priority
                src="/images/patrick.png"
                className="rounded-full mx-2"
                height={100}
                width={100}
                alt={name}
              />
              <h1 className="mx-2 my-0">{name}&apos;s Site</h1>
            </>
          ) : (
            <>
              <Link href="/">
                <Image
                  priority
                  src="/images/patrick.png"
                  className="rounded-full mx-1"
                  height={70}
                  width={70}
                  alt={name}
                />
              </Link>
              <h2 className="mx-1 my-0">
                <Link href="/" className="no-underline">
                  {name}
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
      <main>{children}</main>
      {!home && (
        <div className="">
          <Link href="/">← Back to home</Link>
        </div>
      )}
    </div>
  );
};

export const Layout = LayoutComponent;
