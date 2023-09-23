/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  env: {
    SITE_URL: process.env.SITE_URL,
    DASHBOARD_URL: process.env.DASHBOARD_URL,
    ROLES_ADMIN: JSON.stringify(["ADMIN"]),
    ROLES_EDITOR: JSON.stringify(["ADMIN", "EDITOR"]),
    ROLES_PUBLISHER: JSON.stringify(["ADMIN", "EDITOR", "PUBLISHER"]),
    ROLES_USER: JSON.stringify(["ADMIN", "EDITOR", "PUBLISHER", "USER"]),
    VERSION: require("./package.json").version,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "tailwindui.com",
      },
      {
        protocol: "https",
        hostname: "flowbite.com",
      },
      {
        protocol: "https",
        hostname: "cdn.discordapp.com",
      },
    ],
  },
}

module.exports = nextConfig
