import { Meta } from "@/components/meta";
import Image from "next/image";
import Link from "next/link";
import { ThemeSwitch } from "@/components/themeSwitch";

const name = "Patrick Coleman";

const LayoutComponent = ({
  children,
  home,
  title,
  description,
}: {
  children: React.ReactNode;
  home?: boolean;
  title?: string;
  description?: string;
}): JSX.Element => {
  return (
    <div className="w-3/4 mx-auto my-6 md:my-10">
      <Meta title={title} description={description} />
      <header className="my-4 text-center">
        {home ? (
          <>
            <Image
              priority
              src="/images/patrick.png"
              className="rounded-full mx-auto my-4"
              height={144}
              width={144}
              alt={name}
            />
            <h1>{name}</h1>
          </>
        ) : (
          <>
            <Link href="/">
              <Image
                priority
                src="/images/patrick.png"
                className="rounded-full mx-auto"
                height={108}
                width={108}
                alt={name}
              />
            </Link>
            <h2>
              <Link href="/">{name}</Link>
            </h2>
          </>
        )}
        <ThemeSwitch />
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
