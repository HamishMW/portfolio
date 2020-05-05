/* eslint-disable import/no-webpack-loader-syntax */
import { lazy } from 'react';
import { frontMatter as testFrontMatter } from '!babel-loader!mdx-loader!posts/test.mdx';
const TestPost = lazy(() => import('!babel-loader!mdx-loader!posts/test.mdx'));

const posts = [
  {
    content: TestPost,
    ...testFrontMatter,
  },
  {
    content: TestPost,
    ...testFrontMatter,
  },
  {
    content: TestPost,
    ...testFrontMatter,
  },
];

export default posts;
