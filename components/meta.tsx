import Head from "next/head";

const MetaComponent = ({
  title = "Patrick Coleman's Web Presence",
  description = "Patrick Coleman's personal site and blog",
  previewImage = "/images/patrick.png",
}: {
  title?: string;
  description?: string;
  previewImage?: string;
}): JSX.Element => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} key="description" />
      <meta name="og:title" content={description} key="og:title" />
      <meta name="og:description" content={description} key="og:description" />
      <meta name="og:image" content={previewImage} key="og:image" />
      <meta name="twitter:card" content={description} key="twitter:card" />
    </Head>
  );
};

export const Meta = MetaComponent;
