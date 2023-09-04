/** @type {import('next').NextConfig} */
const NextFederationPlugin = require("@module-federation/nextjs-mf")

const BLUE_APP_BASE_URL =
  process.env.BLUE_APP_BASE_URL || "http://localhost:3001"
const GREEN_APP_BASE_URL =
  process.env.GREEN_APP_BASE_URL || "http://localhost:3002"

const remotes = (isServer) => {
  const location = isServer ? "ssr" : "chunks"
  return {
    "blue-app": `blue-app@${BLUE_APP_BASE_URL}/_next/static/${location}/remoteEntry.js`,
    "green-app": `green-app@${GREEN_APP_BASE_URL}/_next/static/${location}/remoteEntry.js`,
  }
}

const nextConfig = {
  reactStrictMode: true,
  webpack(config, options) {
    config.plugins.push(
      new NextFederationPlugin({
        name: "host-app",
        filename: "static/chunks/remoteEntry.js",
        exposes: {
          "./middleware": "./src/middleware.ts",
        },
        remotes: remotes(options.isServer),
        shared: {},
        extraOptions: {
          exposePages: true,
        },
      }),
    )

    return config
  },
}

module.exports = nextConfig
