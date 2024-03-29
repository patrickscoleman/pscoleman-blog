import Head from "next/head";

const siteMetadata = {
  title: "Patrick Coleman",
  description: "Patrick Coleman's personal site and blog",
  previewImage: "/images/patrick.png",
  siteUrl: "https://pscoleman.me",
  firstName: "Patrick",
  lastName: "Coleman",
  twitterCardType: "summary_large_image",
};

const MetaComponent = ({
  title = siteMetadata.title,
  date,
  description = siteMetadata.description,
  previewImage = siteMetadata.previewImage,
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
            content={siteMetadata.siteUrl}
            key="article:author"
          />
        </>
      ) : (
        <meta property="og:type" content="website" key="og:type" />
      )}
      <meta property="og:title" content={title} key="og:title" />
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
            : siteMetadata.siteUrl + previewImage
        }
        key="og:image"
      />
      <meta
        property="profile:first_name"
        content={siteMetadata.firstName}
        key="profile:first_name"
      />
      <meta
        property="profile:last_name"
        content={siteMetadata.lastName}
        key="profile:last_name"
      />
      <meta
        name="twitter:card"
        content={siteMetadata.twitterCardType}
        key="twitter:card"
      />
    </Head>
  );
};

export const Meta = MetaComponent;
export const SiteMetadata = siteMetadata;
