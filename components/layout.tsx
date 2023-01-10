import { Meta } from "@/components/meta";
import Image from "next/image";
import Link from "next/link";

const name = "Patrick Coleman";

const LayoutComponent = ({
  children,
  home,
}: {
  children: React.ReactNode;
  home?: boolean;
}): JSX.Element => {
  return (
    <div className="">
      <Meta />
      <header className="">
        {home ? (
          <>
            <Image
              priority
              src="/images/patrick.png"
              className=""
              height={144}
              width={144}
              alt={name}
            />
            <h1 className="">{name}</h1>
          </>
        ) : (
          <>
            <Link href="/">
              <Image
                priority
                src="/images/patrick.png"
                className=""
                height={108}
                width={108}
                alt={name}
              />
            </Link>
            <h2 className="">
              <Link href="/" className="">
                {name}
              </Link>
            </h2>
          </>
        )}
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
