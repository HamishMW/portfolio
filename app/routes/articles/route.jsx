import { json } from '@remix-run/cloudflare';
import { Outlet, useLoaderData } from '@remix-run/react';
import { MDXProvider } from '@mdx-js/react';
import { Post, postMarkdown } from '~/layouts/post';
import { baseMeta } from '~/utils/meta';
import { formatTimecode, readingTime } from '~/utils/timecode';

export async function loader({ request }) {
  const slug = request.url.split('/').at(-1);
  const module = await import(`../articles.${slug}.mdx`);
  const text = await import(`../articles.${slug}.mdx?raw`);
  const readTime = readingTime(text.default);

  return json({
    frontmatter: module.frontmatter,
    timecode: formatTimecode(readTime),
  });
}

export function meta({ data }) {
  const { title, abstract } = data.frontmatter;
  return baseMeta({ title, description: abstract, prefix: '' });
}

export default function Articles() {
  const { frontmatter, timecode } = useLoaderData();

  return (
    <MDXProvider components={postMarkdown}>
      <Post {...frontmatter} timecode={timecode}>
        <Outlet />
      </Post>
    </MDXProvider>
  );
}
