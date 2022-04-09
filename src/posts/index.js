const allPosts = require.context(
  '!babel-loader!mdx-loader!posts',
  true,
  /\.mdx$/,
  'lazy'
);

export const fetchPosts = allPosts.keys().map(async filePath => {
  const module = await allPosts(filePath);

  return {
    content: module.default,
    ...module.frontMatter,
  };
});
