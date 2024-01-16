// eslint-disable-next-line @typescript-eslint/no-var-requires
const withPWA = require('next-pwa')({
    dest: 'public',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    compiler:
        process.env.NODE_ENV === 'production'
            ? {
                  removeConsole: {
                      exclude: ['error'],
                  },
              }
            : {},
    experimental: {
        // GA
        // nextScriptWorkers: true,
    },
    images: {
        remotePatterns: [],
    },
    // next.js config
}

module.exports = withPWA(nextConfig)
