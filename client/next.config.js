/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    baseUrl: "http://localhost:3001",
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3001",
        pathname: "/uploads/**",
      },
    ],
  },
}

module.exports = nextConfig
