let version = 'v1.1.2';

const OFFLINE_VERSION = 1;
const CACHE_NAME = "offline";
// Customize this with a different URL if needed.
const OFFLINE_URL = "chijindujulian.netlify.app/offline.html";

self.addEventListener("install", (event) => {
    event.waitUntil(
        (async () => {
            const cache = await caches.open(CACHE_NAME);
            await cache.add(new Request(OFFLINE_URL, { cache: "reload" }));
        })()
    );
    self.skipWaiting();
});

self.addEventListener("activate", (event) => {
    event.waitUntil(
        (async () => {
            if ("navigationPreload" in self.registration) {
                await self.registration.navigationPreload.enable();
            }
        })()
    );

    self.clients.claim();
});

self.addEventListener("fetch", (event) => {
    if (event.request.mode === "navigate") {
        event.respondWith(
            (async () => {
                try {
                    // First, try to use the navigation preload response if it's supported.
                    const preloadResponse = await event.preloadResponse;
                    if (preloadResponse) {
                        return preloadResponse;
                    }

                    // Always try the network first.
                    const networkResponse = await fetch(event.request);
                    return networkResponse;
                } catch (error) {
                    console.log("Fetch failed; returning offline page instead.", error);

                    const cache = await caches.open(CACHE_NAME);
                    const cachedResponse = await cache.match(OFFLINE_URL);
                    return cachedResponse;
                }
            })()
        );
    }
});


const chijindu = "chijindu-portfolio"
const assets = [
    "/",
    "/index.html",
    "/about.html",
    "/work.html",
    '/offline.html',
    "/scss/styles.css",
    "/scripts/script.js",
    "/images/circles.svg",
    "/images/cj.svg",
    "/images/hamburgerx.svg",
    "/images/hox.svg",
    "/images/icon.svg",
    "/images/chijindu1.webp",
    "/images/sca.png",
    "/images/waa.png",
]

self.addEventListener("install", installEvent => {
    installEvent.waitUntil(
        caches.open(chijindu).then(cache => {
            cache.addAll(assets)
        })
    )
})

self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request)
            .then(function (response) {
                if (response) {
                    return response;
                }
                return fetch(event.request);
            }
            )
    );
});