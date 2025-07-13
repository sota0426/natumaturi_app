/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/natumaturi_app',
  assetPrefix: '/natumaturi_app/',
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig;