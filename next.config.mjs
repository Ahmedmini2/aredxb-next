/** @type {import('next').NextConfig} */
const nextConfig = {
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
