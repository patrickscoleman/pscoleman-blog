import { Header } from "@/components/header";
import { Meta } from "@/components/meta";
import Link from "next/link";
import { Footer } from "@/components/footer";

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
    <div className="max-w-3xl w-10/12 sm:9/12 md:w-8/12 mx-auto my-2">
      <Meta title={title} description={description} />
      <Header home={home} />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export const Layout = LayoutComponent;
