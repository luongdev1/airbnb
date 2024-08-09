/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    baseUrl: "https://server-airbnb-phi.vercel.app",
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
