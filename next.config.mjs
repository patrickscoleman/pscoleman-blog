/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  images: {
    // Fill the gap between 256 and 384 so phone screens fetch less excess detail.
    imageSizes: [32, 48, 64, 96, 128, 256, 320, 384],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          {
            key: 'Permissions-Policy',
            value:
              'camera=(), microphone=(), geolocation=(), payment=(), usb=()',
          },
          {
            key: 'Content-Security-Policy',
            // Static Next.js hydration uses inline scripts. This policy limits
            // resource origins; it is not a nonce-based XSS defence.
            value: `default-src 'self'; script-src 'self' 'unsafe-inline'${process.env.NODE_ENV === 'development' ? " 'unsafe-eval'" : ''}; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self'; object-src 'none'; base-uri 'self'; form-action 'none'; frame-ancestors 'none'`,
          },
        ],
      },
    ];
  },
  // Historical content is never part of a deployed route.
  outputFileTracingExcludes: {
    '/*': ['./archive/**/*', './tools/handwriting/**/*'],
  },
};
export default nextConfig;
