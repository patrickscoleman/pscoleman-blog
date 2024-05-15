export const siteMetadata = {
  title: "Patrick Coleman",
  description: "Patrick Coleman's personal site and blog",
  siteUrl: "https://pscoleman.me",
  baseUrl: "pscoleman.me",
  twitterHandle: "@patrickscoleman",
  firstName: "Patrick",
  lastName: "Coleman",
};

export const generatePostMetadata = ({
  title,
  description,
  date,
  previewImage,
  alt,
}) => {
  console.log(date);
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: `${siteMetadata.siteUrl}${previewImage}`,
          alt,
        },
      ],
      type: "article",
      publishedTime: `${date}T00:00:00.000Z`,
      authors: [`${siteMetadata.firstName} ${siteMetadata.lastName}`],
    },
    twitter: {
      title,
      description,
      creator: siteMetadata.twitterHandle,
      images: [`${siteMetadata.siteUrl}${previewImage}`],
    },
  };
};
