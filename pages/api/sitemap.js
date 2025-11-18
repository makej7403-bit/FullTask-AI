export default function handler(req, res) {
  res.setHeader("Content-Type", "application/xml");

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
      <loc>https://full-task-ai.vercel.app/</loc>
      <lastmod>2025-11-16</lastmod>
      <changefreq>weekly</changefreq>
      <priority>1.00</priority>
    </url>
  </urlset>`;

  res.status(200).send(sitemap);
}
