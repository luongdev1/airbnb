/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    baseUrl: "https://server-airbnb-phi.vercel.app",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "server-airbnb-phi.vercel.app",
        pathname: "/uploads/**",
      },
    ],
  },
}

module.exports = nextConfig
