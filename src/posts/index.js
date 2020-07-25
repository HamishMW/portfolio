const allPosts = require.context(
  '!babel-loader!mdx-loader!posts',
  true,
  /\.mdx$/,
  'lazy'
);

const posts = allPosts.keys().map(async filePath => {
  const module = await allPosts(filePath);

  return {
    content: module.default,
    ...module.frontMatter,
  };
});

export default posts;
