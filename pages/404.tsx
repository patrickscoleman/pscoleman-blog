import { Layout } from "@/components/layout";
import Image from "next/image";

const Custom404 = () => {
  return (
    <Layout>
      <h1 className="text-center">404 - PAGE NOT FOUND - 404</h1>
      <figure className="w-full text-center">
        <Image
          src="/images/frazzled_office_worker.png"
          className="mx-auto"
          height={500}
          width={500}
          alt="Frazzled Office Worker"
        />
        <figcaption className="text-sm text-text-lightfaint dark:text-text-darkfaint">
          Source:{" "}
          <a
            href="https://midjourney.com/"
            target="_blank"
            rel="noreferrer noopener"
          >
            Midjourney
          </a>
        </figcaption>
      </figure>
      <p className="text-center">We seem to have misplaced your page...</p>
      <p className="text-center">Sorry.</p>
    </Layout>
  );
};

export default Custom404;
