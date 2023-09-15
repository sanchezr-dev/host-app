/** @type {import('next').NextConfig} */
const NextFederationPlugin = require("@module-federation/nextjs-mf")

const PRODUCTS_APP_BASE_URL =
  process.env.PRODUCTS_APP_BASE_URL || "http://localhost:3001"
const POSTS_APP_BASE_URL =
  process.env.POSTS_APP_BASE_URL || "http://localhost:3002"

const remotes = (isServer) => {
  const location = isServer ? "ssr" : "chunks"
  return {
    products: `products@${PRODUCTS_APP_BASE_URL}/_next/static/${location}/remoteEntry.js`,
    products_services: `products_services@${PRODUCTS_APP_BASE_URL}/_next/static/chunks/remoteServicesEntry.js`,
    posts: `posts@${POSTS_APP_BASE_URL}/_next/static/${location}/remoteEntry.js`,
  }
}

const nextConfig = {
  reactStrictMode: true,
  webpack(config, options) {
    config.plugins.push(
      new NextFederationPlugin({
        name: "host",
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
