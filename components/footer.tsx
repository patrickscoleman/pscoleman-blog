import Image from "next/image";
import Link from "next/link";

const FooterComponent = () => {
  return (
    <footer className="mt-8 mb-4">
      <hr />
      <div className="flex w-full items-center mt-1">
        <p className="text-sm">
          © 2023{" "}
          <Link
            href="/"
            {...{ "xmlns:dct": "http://purl.org/dc/terms/" }}
            property="dct:title"
            rel="cc:attributionURL"
          >
            pscoleman.me/
          </Link>{" "}
          by{" "}
          <span
            {...{ "xmlns:cc": "http://creativecommons.org/ns#" }}
            property="cc:attributionName"
          >
            Patrick Coleman
          </span>{" "}
          is licensed under{" "}
          <Link
            rel="license"
            href="http://creativecommons.org/licenses/by/4.0/"
          >
            CC BY 4.0
          </Link>
        </p>
        <Link
          rel="license"
          className="flex ml-1 space-x-1"
          href="http://creativecommons.org/licenses/by/4.0/"
          passHref
        >
          <Image
            alt="Creative Commons License"
            height={15}
            width={15}
            src="https://mirrors.creativecommons.org/presskit/icons/cc.svg"
          />
          <Image
            alt="Creative Commons By License"
            height={15}
            width={15}
            src="https://mirrors.creativecommons.org/presskit/icons/by.svg"
          />
        </Link>
      </div>
    </footer>
  );
};

export const Footer = FooterComponent;
