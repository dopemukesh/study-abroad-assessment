/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'dummyjson.com' }]
  }
}
const _nextConfig = nextConfig
export { _nextConfig as nextConfig }
