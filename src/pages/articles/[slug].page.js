import fs from 'fs';
import path from 'path';
import { Post, postComponents } from 'layouts/Post';
import { bundleMDX } from 'mdx-bundler';
import { getMDXComponent } from 'mdx-bundler/client';
import { useMemo } from 'react';
import rehypeImgSize from 'rehype-img-size';
import rehypeMinify from 'rehype-preset-minify';
import rehypeSlug from 'rehype-slug';
import { POSTS_PATH, postFilePaths } from 'utils/mdx';
import rehypePrism from '@mapbox/rehype-prism';

export default function PostPage({ frontmatter, code }) {
  const MDXComponent = useMemo(() => getMDXComponent(code), [code]);

  return (
    <Post {...frontmatter}>
      <MDXComponent components={postComponents} />
    </Post>
  );
}

export const getStaticProps = async ({ params }) => {
  const postFilePath = path.join(POSTS_PATH, `${params.slug}.mdx`);
  const source = fs.readFileSync(postFilePath, 'utf-8');

  const mdxSource = await bundleMDX({
    source,
    mdxOptions(options) {
      options.rehypePlugins = [
        ...(options.rehypePlugins ?? []),
        rehypePrism,
        rehypeSlug,
        rehypeMinify,
        [rehypeImgSize, { dir: 'public' }],
      ];

      return options;
    },
  });

  return {
    props: {
      code: mdxSource.code,
      frontmatter: mdxSource.frontmatter,
    },
  };
};

export const getStaticPaths = async () => {
  if (process.env.NODE_ENV === 'production') {
    return {
      paths: [],
      fallback: false,
    }; // TODO: Remove this for posts to appear on production
  }

  const paths = postFilePaths
    .map(filePath => filePath.replace(/\.mdx?$/, ''))
    .map(slug => ({ params: { slug } }));

  return {
    paths,
    fallback: false,
  };
};
