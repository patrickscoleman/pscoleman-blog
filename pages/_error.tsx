import Layout from "../components/layout";
import { NextPage, NextPageContext } from "next";

interface Props {
  statusCode?: number;
}

const Error: NextPage<Props> = ({ statusCode }) => {
  return (
    <Layout>
      <h1>
        {statusCode
          ? statusCode === 404
            ? "404 page not found ???"
            : `A ${statusCode} error occurred on the server`
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
