import fs from 'fs';
import path from 'path';
import { Post, postMarkdown } from 'layouts/Post';
import { bundleMDX } from 'mdx-bundler';
import { getMDXComponent } from 'mdx-bundler/client';
import { useMemo } from 'react';
import readingTime from 'reading-time';
import rehypeImgSize from 'rehype-img-size';
import rehypeMinify from 'rehype-preset-minify';
import rehypeSlug from 'rehype-slug';
import { POSTS_PATH, postFilePaths } from 'utils/mdx';
import { formatTimecode } from 'utils/timecode';
import rehypePrism from '@mapbox/rehype-prism';

export default function PostPage({ frontmatter, code, timecode }) {
  const MDXComponent = useMemo(() => getMDXComponent(code), [code]);

  return (
    <Post timecode={timecode} {...frontmatter}>
      <MDXComponent components={postMarkdown} />
    </Post>
  );
}

export const getStaticProps = async ({ params }) => {
  const postFilePath = path.join(POSTS_PATH, `${params.slug}.mdx`);
  const source = fs.readFileSync(postFilePath, 'utf-8');

  const { code, frontmatter, matter } = await bundleMDX({
    source,
    mdxOptions(options) {
      options.remarkPlugins = [...(options.remarkPlugins ?? [])];
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

  const { time } = readingTime(matter.content);
  const timecode = formatTimecode(time);

  return {
    props: { code, frontmatter, timecode },
    notFound: process.env.NODE_ENV === 'production' && frontmatter.draft,
  };
};

export const getStaticPaths = async () => {
  const paths = postFilePaths
    .map(filePath => filePath.replace(/\.mdx?$/, ''))
    .map(slug => ({ params: { slug } }));

  return {
    paths,
    fallback: false,
  };
};
