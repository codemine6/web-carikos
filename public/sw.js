importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.1.5/workbox-sw.js')

self.skipWaiting()
const revision = Date.now().toString().substr(11)
const apiRoutes = [
    '/rooms/city',
    '/rooms/popular',
    '/promos'
]

workbox.setConfig({debug: false})
workbox.core.setCacheNameDetails({
    prefix: 'carikos',
    suffix: 'v1',
    precache: 'app'
})

workbox.precaching.precacheAndRoute([
    {url: '/', revision},
    {url: '/icons/logo-144.png', revision},
    {url: '/icons/logo-192.png', revision},
    {url: '/icons/logo-512.png', revision},
    {url: '/manifest.json', revision}
])

workbox.routing.registerRoute(
    ({url}) => apiRoutes.some(path => url.pathname.includes(path)),
    new workbox.strategies.StaleWhileRevalidate({
        cacheName: 'api-data',
        plugins: [
            new workbox.expiration.ExpirationPlugin({
                maxAgeSeconds: 60 * 10
            })
        ]
    })
)

workbox.routing.registerRoute(
    ({request}) => request.destination === 'image',
    new workbox.strategies.CacheFirst({
        cacheName: 'images',
        plugins: [
            new workbox.expiration.ExpirationPlugin({
                maxAgeSeconds: 60 * 60 * 24
            })
        ]
    })
)