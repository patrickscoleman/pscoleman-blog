import { NextPage, NextPageContext } from "next";
import Layout from "@/components/layout";

interface Props {
  statusCode?: number;
}

const Error: NextPage<Props> = ({ statusCode }) => {
  return (
    <Layout>
      <h1>
        {statusCode
          ? `A ${statusCode} error occurred on the server`
          : "An error occurred in your browser"}
      </h1>
    </Layout>
  );
};

Error.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
