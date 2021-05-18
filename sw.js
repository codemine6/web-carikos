import {setCacheNameDetails} from 'workbox-core'
import {precacheAndRoute} from 'workbox-precaching'
import {registerRoute} from 'workbox-routing'
import {CacheFirst} from 'workbox-strategies'

precacheAndRoute([
    {url: '/manifest.json', revision: '2736'},
    {url: '/icons/logo-144.png', revision: '42424'}
])

setCacheNameDetails({
    prefix: 'carikos',
    suffix: 'llll',
    precache: 'aaaaaa',
    runtime: 'bbbb'
})

registerRoute(
    ({request}) => request.destination === 'image',
    new CacheFirst({
        cacheName: 'images'
    })
)

// registerRoute((a) => console.log(a.request.url), new CacheFirst({cacheName: 'tess'}))

self.skipWaiting()
self.__WB_DISABLE_DEV_LOGS = true
self.__WB_MANIFEST