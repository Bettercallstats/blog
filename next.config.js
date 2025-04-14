/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: 'dist',
  images: {
    unoptimized: true
  },
  assetPrefix: process.env.NODE_ENV === 'production' ? '/bettercallstats' : '',
  basePath: process.env.NODE_ENV === 'production' ? '/bettercallstats' : ''
}

module.exports = nextConfig