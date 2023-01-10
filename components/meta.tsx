import Head from "next/head";

const MetaComponent = ({
  title = "Patrick Coleman's Web Presence",
  description,
}: {
  title?: string;
  description?: string;
}): JSX.Element => {
  return (
    <Head>
      <link rel="icon" href="/favicon.ico" />
      <title>{title}</title>
      {description && (
        <meta name="description" content={description} key="desc" />
      )}
      <meta
        name="description"
        content="Patrick Coleman's personal site and blog"
      />
      <meta
        property="og:image"
        content={`https://og-image.vercel.app/${encodeURI(
          title
        )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
      />
      <meta name="og:title" content={title} />
      <meta name="twitter:card" content="summary_large_image" />
    </Head>
  );
};

export const Meta = MetaComponent;
