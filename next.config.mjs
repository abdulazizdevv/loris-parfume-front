/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.lorisparfume.uz',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'bucket-ps4c71.s3.eu-central-1.amazonaws.com',
        port: '',
        pathname: '/**',
      },
    ],
    formats: ['image/webp'],
    minimumCacheTTL: 86400,
  },
  env: {
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
    NEXT_PUBLIC_YANDEX_API_KEY: process.env.NEXT_PUBLIC_YANDEX_API_KEY,
  },
}

export default nextConfig;