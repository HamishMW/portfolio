import Head from 'next/head';

export const Meta = ({ title, description, prefix = 'Hamish Williams' }) => {
  const titleText = [prefix, title].filter(Boolean).join(' | ');

  return (
    <Head>
      <title key="title">{titleText}</title>
      <meta key="description" name="description" content={description} />
    </Head>
  );
};
