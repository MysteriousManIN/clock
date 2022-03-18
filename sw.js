"use strict";

const AppCacheName = "clock-cache";
const AppCache = [
    "/",
    "index.htm",
    "css/main.css",
    "css/index.css",
    "js/clock.js",
    "js/index.js",
    "_pwa/favicon.svg",
    "https://cdn.com/google/google_jquery.min.js",
    "https://vectoricons.com/typefaces/css/?display=swap&family=Euclid+Square",
    "https://cdn.com/google/google-material-icons/icon.css",
    "https://cdn.com/google/google-material-icons/fonts/MaterialIcons-Regular.woff2",
    "https://vectoricons.com/typefaces/e/Euclid%20Square/woff/EuclidSquare-Regular.woff"
];

self.addEventListener("install", (e)=>{

    e.waitUntil(
        caches.open(AppCacheName).then(cache=>{
            cache.addAll(AppCache);
        })
    );

});

self.addEventListener("fetch", (e)=>{

    e.respondWith(
        caches.match(e.request).then(resCache=>{
            return resCache || fetch(e.request).then(res=>{
                caches.open(AppCacheName).then(cache=>{
                    cache.put(e.request, res.clone());
                    return res;
                });
            })
        })
    );

});