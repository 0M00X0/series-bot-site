/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: true,
    },
    env: {
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
        ],
      },
}

module.exports = nextConfig
