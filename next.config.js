/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production'
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true
  },
  assetPrefix: isProd? '/blog' : '',
  basePath: isProd? '/blog' : '',
  trailingSlash: true,
  
}

module.exports = nextConfig


