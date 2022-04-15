import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { POSTS_PATH, postFilePaths } from 'utils/mdx';

export { Articles as default } from './Articles';

export function getStaticProps() {
  const posts = postFilePaths.map(filePath => {
    const source = fs.readFileSync(path.join(POSTS_PATH, filePath));
    const { data } = matter(source);

    return {
      ...data,
      slug: filePath.replace(/\.mdx?$/, ''),
    };
  });

  return {
    props: { posts },
    notFound: process.env.NODE_ENV === 'production', // TODO: Remove this for articles to appear on production
  };
}
