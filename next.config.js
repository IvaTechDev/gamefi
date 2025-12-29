/** @type {import('next').NextConfig} */
const withNextIntl = require('next-intl/plugin')(
  './i18n/request.ts'
)

const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
}

module.exports = withNextIntl(nextConfig)
