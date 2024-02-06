import {
  unstable_vitePlugin as remix,
  unstable_cloudflarePreset as cloudflare,
} from '@remix-run/dev';
import { defineConfig } from 'vite';
import jsconfigPaths from 'vite-jsconfig-paths';
import mdx from '@mdx-js/rollup';
import remarkFrontmatter from 'remark-frontmatter';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';
import rehypeImgSize from 'rehype-img-size';
import rehypeSlug from 'rehype-slug';
import rehypePrism from '@mapbox/rehype-prism';

const isStorybook = process.argv[1]?.includes('storybook');

export default defineConfig({
  assetsInclude: ['**/*.glb', '**/*.hdr', '**/*.glsl'],
  build: {
    assetsInlineLimit: 1024,
  },
  server: {
    port: 7777,
  },
  plugins: [
    mdx({
      rehypePlugins: [[rehypeImgSize, { dir: 'public' }], rehypeSlug, rehypePrism],
      remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter],
      providerImportSource: '@mdx-js/react',
    }),
    !isStorybook &&
      remix({
        presets: [cloudflare()],
        routes(defineRoutes) {
          return defineRoutes(route => {
            route('/', 'routes/home/route.js', { index: true });
          });
        },
      }),
    jsconfigPaths(),
  ],
  ssr: {
    resolve: {
      externalConditions: ['workerd', 'worker'],
    },
  },
});
