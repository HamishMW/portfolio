import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import { POSTS_PATH, postFilePaths } from 'utils/mdx';
import { formatTimecode } from 'utils/timecode';

export { Articles as default } from './Articles';

export function getStaticProps() {
  const allPosts = postFilePaths.map(filePath => {
    const source = fs.readFileSync(path.join(POSTS_PATH, filePath));
    const { data, content } = matter(source);

    const { time } = readingTime(content);
    const timecode = formatTimecode(time);

    return {
      ...data,
      timecode,
      slug: filePath.replace(/\.mdx?$/, ''),
    };
  });

  const featured = allPosts.filter(post => post.featured);

  const posts = allPosts
    .filter(post => !post.featured)
    .sort((a, b) => {
      return new Date(a.date).getTime() > new Date(b.date).getTime();
    });

  return {
    props: { posts: [...featured, ...posts] },
    notFound: process.env.NODE_ENV === 'production', // TODO: Remove this for articles to appear on production
  };
}
