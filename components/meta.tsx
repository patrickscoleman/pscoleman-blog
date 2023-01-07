import Head from "next/head";

const MetaComponent = ({
  title,
  description,
}: {
  title: string;
  description?: string;
}): JSX.Element => {
  return (
    <Head>
      <title>{title}</title>
      {description && (
        <meta name="description" content={description} key="desc" />
      )}
    </Head>
  );
};

export const Meta = MetaComponent;
