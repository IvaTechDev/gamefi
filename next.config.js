/** @type {import('next').NextConfig} */
const withNextIntl = require('next-intl/plugin')(
  './i18n/request.ts'
)

const nextConfig = {
  // output: 'export', // Commented out for dev mode
  images: {
    unoptimized: true,
  },
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
}

module.exports = withNextIntl(nextConfig)
