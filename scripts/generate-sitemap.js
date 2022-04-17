const fs = require('fs');

function addPage(page) {
  const path = page
    .replace('src/pages', '')
    .replace('.page.js', '')
    .replace('.page.mdx', '')
    .replace('/index', '/');
  const route = path === '/index' ? '' : path;

  if (process.env.NODE_ENV === 'production' && path === '/articles/') return; // TODO: remove this once blog is done

  // Exclude 404 page and generated `[]` pages
  if (route.includes('[') || route.includes('404')) return;

  return `  <url>
    <loc>${`${process.env.NEXT_PUBLIC_WEBSITE_URL}${route}`}</loc>
    <changefreq>hourly</changefreq>
  </url>`;
}

function addPost(post) {
  if (process.env.NODE_ENV === 'production') return; // TODO: remove this once blog is done

  const path = post.replace('src/posts', '/articles').replace('.mdx', '');

  return `  <url>
    <loc>${`${process.env.NEXT_PUBLIC_WEBSITE_URL}${path}`}</loc>
    <changefreq>hourly</changefreq>
  </url>`;
}

async function generateSitemap() {
  const { globby } = await import('globby');
  // Ignore Next.js specific files (e.g., _app.js) and API routes.
  const pages = await globby([
    'src/pages/**/*{.page.js,.page.mdx}',
    '!src/pages/_*.js',
    '!src/pages/api',
  ]);
  const posts = await globby(['src/posts/**/*.mdx']);

  const sitemap = `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(addPage).filter(Boolean).join('\n')}
${posts.map(addPost).filter(Boolean).join('\n')}
</urlset>\n`;

  fs.writeFileSync('public/sitemap.xml', sitemap);
}

generateSitemap();
