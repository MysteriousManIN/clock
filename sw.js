"use strict";

const AppCacheName = "clock-cache";
const AppCache = [
    "/",
    "pwa/",
    "css/",
    "js/",
    "index.htm",
    "css/main.css",
    "css/index.css",
    "js/clock.js",
    "js/index.js",
    "pwa/favicon.svg",
    "pwa/manifest.json",
    "app.js",
    "sw.js",
    "https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js",
    "https://vectoricons.000webhostapp.com/typefaces/css/?display=swap&family=Euclid+Square:w@400",
    "https://fonts.googleapis.com/icon?family=Material+Icons|Material+Icons+Outlined",
    "https://fonts.gstatic.com/s/materialicons/v126/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2",
    "https://fonts.gstatic.com/s/materialiconsoutlined/v101/gok-H7zzDkdnRel8-DQ6KAXJ69wP1tGnf4ZGhUcel5euIg.woff2",
    "https://vectoricons.000webhostapp.com/typefaces/e/Euclid%20Square/woff/EuclidSquare-Regular.woff"
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
