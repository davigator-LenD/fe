if (!self.define) {
    let e,
        s = {}
    const n = (n, i) => (
        (n = new URL(n + '.js', i).href),
        s[n] ||
            new Promise((s) => {
                if ('document' in self) {
                    const e = document.createElement('script')
                    ;(e.src = n), (e.onload = s), document.head.appendChild(e)
                } else (e = n), importScripts(n), s()
            }).then(() => {
                const e = s[n]
                if (!e) throw new Error(`Module ${n} didn’t register its module`)
                return e
            })
    )
    self.define = (i, a) => {
        const c = e || ('document' in self ? document.currentScript.src : '') || location.href
        if (s[c]) return
        const t = {}
        const f = (e) => n(e, c),
            o = { module: { uri: c }, exports: t, require: f }
        s[c] = Promise.all(i.map((e) => o[e] || f(e))).then((e) => (a(...e), t))
    }
}
define(['./workbox-2e6be583'], function (e) {
    'use strict'
    importScripts(),
        self.skipWaiting(),
        e.clientsClaim(),
        e.precacheAndRoute(
            [
                { url: '/_next/app-build-manifest.json', revision: 'e9dbf2d98fec9fceb0aa2c903b4642ae' },
                { url: '/_next/static/chunks/58b651db-6b43a8ca683004ef.js', revision: 'yWCzfixZCYd4UTEtapyvS' },
                { url: '/_next/static/chunks/963-756e622655118adf.js', revision: 'yWCzfixZCYd4UTEtapyvS' },
                { url: '/_next/static/chunks/app/_not-found-c3070d377c1c1a75.js', revision: 'yWCzfixZCYd4UTEtapyvS' },
                { url: '/_next/static/chunks/app/layout-860692f401cd29c8.js', revision: 'yWCzfixZCYd4UTEtapyvS' },
                { url: '/_next/static/chunks/app/page-f3277403b3658347.js', revision: 'yWCzfixZCYd4UTEtapyvS' },
                { url: '/_next/static/chunks/framework-510ec8ffd65e1d01.js', revision: 'yWCzfixZCYd4UTEtapyvS' },
                { url: '/_next/static/chunks/main-app-8894514d14f93f8f.js', revision: 'yWCzfixZCYd4UTEtapyvS' },
                { url: '/_next/static/chunks/main-dcb774f7925ed746.js', revision: 'yWCzfixZCYd4UTEtapyvS' },
                { url: '/_next/static/chunks/pages/_app-0a1f15402f8b18c2.js', revision: 'yWCzfixZCYd4UTEtapyvS' },
                { url: '/_next/static/chunks/pages/_error-8cae7343ea415eb5.js', revision: 'yWCzfixZCYd4UTEtapyvS' },
                {
                    url: '/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js',
                    revision: '837c0df77fd5009c9e46d446188ecfd0',
                },
                { url: '/_next/static/chunks/webpack-69d8260f9859c49f.js', revision: 'yWCzfixZCYd4UTEtapyvS' },
                { url: '/_next/static/css/3b2243e91001caf5.css', revision: '3b2243e91001caf5' },
                { url: '/_next/static/media/05a31a2ca4975f99-s.woff2', revision: 'f1b44860c66554b91f3b1c81556f73ca' },
                { url: '/_next/static/media/513657b02c5c193f-s.woff2', revision: 'c4eb7f37bc4206c901ab08601f21f0f2' },
                { url: '/_next/static/media/51ed15f9841b9f9d-s.woff2', revision: 'bb9d99fb9bbc695be80777ca2c1c2bee' },
                { url: '/_next/static/media/c9a5bc6a7c948fb0-s.p.woff2', revision: '74c3556b9dad12fb76f84af53ba69410' },
                { url: '/_next/static/media/d6b16ce4a6175f26-s.woff2', revision: 'dd930bafc6297347be3213f22cc53d3e' },
                { url: '/_next/static/media/ec159349637c90ad-s.woff2', revision: '0e89df9522084290e01e4127495fae99' },
                { url: '/_next/static/media/fd4db3eb5472fc27-s.woff2', revision: '71f3fcaf22131c3368d9ec28ef839831' },
                {
                    url: '/_next/static/yWCzfixZCYd4UTEtapyvS/_buildManifest.js',
                    revision: 'f6a26e99491ea6980fb9b063c1e38178',
                },
                {
                    url: '/_next/static/yWCzfixZCYd4UTEtapyvS/_ssgManifest.js',
                    revision: 'b6652df95db52feb4daf4eca35380933',
                },
                { url: '/favicon.ico', revision: 'c30c7d42707a47a3f4591831641e50dc' },
                { url: '/icons/pwa-icons/icon-192x192.png', revision: '59788d362265fa8094c0ef0f06951cb4' },
                { url: '/icons/pwa-icons/icon-256x256.png', revision: '0631ca1e34aecce662ce91f993f14829' },
                { url: '/icons/pwa-icons/icon-384x384.png', revision: '265477582d5477ef4fa37172e0a40abc' },
                { url: '/icons/pwa-icons/icon-512x512.png', revision: '02ebb7768ff14489b4a03fab0f6cfc9e' },
                { url: '/iphone5_splash.png', revision: 'cda8c65ef863f45cdaf1e51bac9ec877' },
                { url: '/manifest.webmanifest', revision: '7e0bc7dc2e810437d4065b9c398b3839' },
                { url: '/next.svg', revision: '8e061864f388b47f33a1c3780831193e' },
                { url: '/vercel.svg', revision: '61c6b19abff40ea7acd577be818f3976' },
            ],
            { ignoreURLParametersMatching: [] }
        ),
        e.cleanupOutdatedCaches(),
        e.registerRoute(
            '/',
            new e.NetworkFirst({
                cacheName: 'start-url',
                plugins: [
                    {
                        cacheWillUpdate: async ({ request: e, response: s, event: n, state: i }) =>
                            s && 'opaqueredirect' === s.type
                                ? new Response(s.body, { status: 200, statusText: 'OK', headers: s.headers })
                                : s,
                    },
                ],
            }),
            'GET'
        ),
        e.registerRoute(
            /^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,
            new e.CacheFirst({
                cacheName: 'google-fonts-webfonts',
                plugins: [new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 31536e3 })],
            }),
            'GET'
        ),
        e.registerRoute(
            /^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,
            new e.StaleWhileRevalidate({
                cacheName: 'google-fonts-stylesheets',
                plugins: [new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 })],
            }),
            'GET'
        ),
        e.registerRoute(
            /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
            new e.StaleWhileRevalidate({
                cacheName: 'static-font-assets',
                plugins: [new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 })],
            }),
            'GET'
        ),
        e.registerRoute(
            /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
            new e.StaleWhileRevalidate({
                cacheName: 'static-image-assets',
                plugins: [new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 })],
            }),
            'GET'
        ),
        e.registerRoute(
            /\/_next\/image\?url=.+$/i,
            new e.StaleWhileRevalidate({
                cacheName: 'next-image',
                plugins: [new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 })],
            }),
            'GET'
        ),
        e.registerRoute(
            /\.(?:mp3|wav|ogg)$/i,
            new e.CacheFirst({
                cacheName: 'static-audio-assets',
                plugins: [
                    new e.RangeRequestsPlugin(),
                    new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
                ],
            }),
            'GET'
        ),
        e.registerRoute(
            /\.(?:mp4)$/i,
            new e.CacheFirst({
                cacheName: 'static-video-assets',
                plugins: [
                    new e.RangeRequestsPlugin(),
                    new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
                ],
            }),
            'GET'
        ),
        e.registerRoute(
            /\.(?:js)$/i,
            new e.StaleWhileRevalidate({
                cacheName: 'static-js-assets',
                plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
            }),
            'GET'
        ),
        e.registerRoute(
            /\.(?:css|less)$/i,
            new e.StaleWhileRevalidate({
                cacheName: 'static-style-assets',
                plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
            }),
            'GET'
        ),
        e.registerRoute(
            /\/_next\/data\/.+\/.+\.json$/i,
            new e.StaleWhileRevalidate({
                cacheName: 'next-data',
                plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
            }),
            'GET'
        ),
        e.registerRoute(
            /\.(?:json|xml|csv)$/i,
            new e.NetworkFirst({
                cacheName: 'static-data-assets',
                plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
            }),
            'GET'
        ),
        e.registerRoute(
            ({ url: e }) => {
                if (!(self.origin === e.origin)) return !1
                const s = e.pathname
                return !s.startsWith('/api/auth/') && !!s.startsWith('/api/')
            },
            new e.NetworkFirst({
                cacheName: 'apis',
                networkTimeoutSeconds: 10,
                plugins: [new e.ExpirationPlugin({ maxEntries: 16, maxAgeSeconds: 86400 })],
            }),
            'GET'
        ),
        e.registerRoute(
            ({ url: e }) => {
                if (!(self.origin === e.origin)) return !1
                return !e.pathname.startsWith('/api/')
            },
            new e.NetworkFirst({
                cacheName: 'others',
                networkTimeoutSeconds: 10,
                plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
            }),
            'GET'
        ),
        e.registerRoute(
            ({ url: e }) => !(self.origin === e.origin),
            new e.NetworkFirst({
                cacheName: 'cross-origin',
                networkTimeoutSeconds: 10,
                plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 3600 })],
            }),
            'GET'
        )
})
