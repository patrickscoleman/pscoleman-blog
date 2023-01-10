import Head from "next/head";

const MetaComponent = ({
  title = "Patrick Coleman's Web Presence",
  description = "Patrick Coleman's personal site and blog",
}: {
  title?: string;
  description?: string;
}): JSX.Element => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} key="description" />
      <meta name="og:title" content={description} key="og:title" />
      <meta name="twitter:card" content={description} key="twitter:card" />
    </Head>
  );
};

export const Meta = MetaComponent;
