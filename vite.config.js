import {
  unstable_vitePlugin as remix,
  unstable_cloudflarePreset as cloudflare,
} from '@remix-run/dev';
import { defineConfig } from 'vite';
import jsconfigPaths from 'vite-jsconfig-paths';

export default defineConfig({
  assetsInclude: ['**/*.glb', '**/*.hdr'],
  plugins: [
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
