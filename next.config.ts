import type { NextConfig } from 'next';

const dev = process.env.NODE_ENV !== 'production';

// Inline scripts: the comfort boot script and JSON-LD. Tighten to nonces when analytics/forms arrive.
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${dev ? " 'unsafe-eval'" : ''}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  `connect-src 'self'${dev ? ' ws:' : ''}`,
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join('; ');

// GitHub Pages preview: static export served under /<repo>/. Vercel (production) uses the normal build.
const pagesBase = process.env.PAGES_BASE_PATH; // e.g. "/Abellaglasses"

const nextConfig: NextConfig = pagesBase !== undefined
  ? { output: 'export', basePath: pagesBase, trailingSlash: true, images: { unoptimized: true } }
  : {
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'Content-Security-Policy', value: csp },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ];
  },
};

export default nextConfig;
