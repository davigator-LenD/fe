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
    webpack: (config) => {
        config.module.rules.push({
            test: /\.svg$/i,
            issuer: /\.[jt]sx?$/,
            use: ['@svgr/webpack'],
        })
        return config
    },
}

module.exports = withPWA(nextConfig)
