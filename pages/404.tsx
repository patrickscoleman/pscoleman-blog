import { Layout } from "@/components/layout";
import Image from "next/image";

const Custom404 = () => {
  return (
    <Layout>
      <h1 className="text-center">404 - PAGE NOT FOUND - 404</h1>
      <Image
        src="/images/frazzled_office_worker.png"
        className="mx-auto"
        height={500}
        width={500}
        alt="Frazzled Office Worker"
      />
      <p className="text-center">We seem to have misplaced your page...</p>
    </Layout>
  );
};

export default Custom404;
