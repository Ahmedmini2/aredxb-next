import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Pin Turbopack + file tracing to this project dir so a stray lockfile
  // outside the project (e.g. C:\Users\<user>\package-lock.json) doesn't make
  // Next infer the wrong workspace root and 404 every route.
  turbopack: { root: __dirname },
  outputFileTracingRoot: __dirname,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '*.s3.eu-west-2.amazonaws.com' },
      { protocol: 'https', hostname: 'assets-allegiance.s3.eu-west-2.amazonaws.com' },
    ],
  },
  // We have many legacy paths from the old static site. Keep redirects friendly.
  async redirects() {
    return [
      // Legacy media single-blog URL -> new dynamic route
      { source: '/media/b.html', destination: '/media/blog', permanent: true, has: [{ type: 'query', key: 'view' }] },
      // Old offplan project URL -> new dynamic route
      { source: '/offplan/project.html', destination: '/offplan/project', permanent: true, has: [{ type: 'query', key: 'id' }] },
    ];
  },
};

export default nextConfig;
