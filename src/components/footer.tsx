import Link from "next/link";

export const Footer = (props: { className?: string }) => {
  return (
    <footer
      className={`flex h-16 w-full items-center justify-between bg-none px-6 ${props.className}`}
    >
      <div className="muted flex flex-col sm:flex-row items-start sm:items-center">
        <span>© 2022-{new Date().getFullYear()} by</span>
        <Link className="no-underline font-normal ml-0 sm:ml-1" href="/">
          Patrick Coleman
        </Link>
      </div>
      <div className="flex flex-col sm:flex-row items-end sm:items-center gap-0 sm:gap-4 text-sm font-medium">
        <Link
          target="_blank"
          rel="noopener noreferrer"
          className="no-underline"
          href="https://github.com/patrickscoleman/pscoleman-blog"
        >
          Source
        </Link>
        <Link
          target="_blank"
          rel="noopener noreferrer"
          className="no-underline"
          href="http://creativecommons.org/licenses/by/4.0/"
        >
          License (CC BY 4.0)
        </Link>
      </div>
    </footer>
  );
};
