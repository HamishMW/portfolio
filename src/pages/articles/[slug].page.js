import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Post, postComponents } from 'layouts/Post';
import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import { POSTS_PATH, postFilePaths } from 'utils/mdx';

export default function PostPage({ frontmatter, code }) {
  return (
    <Post {...frontmatter}>
      <MDXRemote {...code} components={postComponents} />
    </Post>
  );
}

export const getStaticProps = async ({ params }) => {
  const postFilePath = path.join(POSTS_PATH, `${params.slug}.mdx`);
  const source = await fs.readFileSync(postFilePath, 'utf-8');

  const { content, data } = matter(source);

  const mdxSource = await serialize(content, {
    // Optionally pass remark/rehype plugins
    mdxOptions: {
      remarkPlugins: [],
      rehypePlugins: [],
    },
    scope: data,
  });

  return {
    props: {
      code: mdxSource,
      frontmatter: data,
      notFound: process.env.NODE_ENV === 'production', // TODO: Remove this for posts to appear on production
    },
  };
};

export const getStaticPaths = async () => {
  const paths = postFilePaths
    // Remove file extensions for page paths
    .map(filePath => filePath.replace(/\.mdx?$/, ''))
    // Map the path into the static paths object required by Next.js
    .map(slug => ({ params: { slug } }));

  return {
    paths,
    fallback: false,
  };
};
