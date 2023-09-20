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
    }
}

module.exports = nextConfig
