import Head from "next/head";

const MetaComponent = ({
  title = "Patrick Coleman's Web Presence",
  date,
  description = "Patrick Coleman's personal site and blog",
  previewImage = "/images/patrick.png",
  post = false,
}: {
  title?: string;
  date?: string;
  description?: string;
  previewImage?: string;
  post?: boolean;
}): JSX.Element => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} key="description" />
      {post ? (
        <>
          <meta property="og:type" content="article" key="og:type" />
          <meta
            property="article:published_time"
            content={date}
            key="article:published_time"
          />
          <meta
            property="article:author"
            content="https://pscoleman.me/"
            key="article:author"
          />
        </>
      ) : (
        <meta property="og:type" content="website" key="og:type" />
      )}
      <meta property="og:title" content={description} key="og:title" />
      <meta
        property="og:description"
        content={description}
        key="og:description"
      />
      <meta
        property="og:image"
        content={
          previewImage.startsWith("http")
            ? previewImage
            : "https://pscoleman.me" + previewImage
        }
        key="og:image"
      />
      <meta
        property="profile:first_name"
        content="Patrick"
        key="profile:first_name"
      />
      <meta
        property="profile:last_name"
        content="Coleman"
        key="profile:last_name"
      />
      {/* <meta name="twitter:card" content={description} key="twitter:card" /> */}
    </Head>
  );
};

export const Meta = MetaComponent;
