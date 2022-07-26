"use strict";

const CACHE_NAME = "clock_v1";
const CACHE = [
  "https://mysteriousmanin.github.io/clock/",
  "https://mysteriousmanin.github.io/clock/index.css",
  "https://mysteriousmanin.github.io/clock/index.js",
  "https://mysteriousmanin.github.io/clock/pwa/app.js",
  "https://mysteriousmanin.github.io/clock/pwa/app-icons/favicon.png",
  "https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js",
  "https://chetansainiakamysteriousman.on.drv.tw/web_store/js_lib/clock/v1/clock.min.js",
  "https://fontfamilies.herokuapp.com/0/typeface/css/?display=swap&family=Euclid+Circular+B",
  "https://fontfamilies.herokuapp.com/0/icon/css/?display=swap&icon=Remix+Icon",
  "https://fontfamiliesbychetansaini.on.drv.tw/icon/Remix%20Icon/woff/RemixIcon-OutlinedSharp_20.woff",
  "https://fontfamiliesbychetansaini.on.drv.tw/icon/Remix%20Icon/woff/RemixIcon-FilledSharp_20.woff",
  "https://fontfamiliesbychetansaini.on.drv.tw/typeface/e/Euclid%20Circular%20B/woff2/EuclidCircularB-Light.woff2",
  "https://fontfamiliesbychetansaini.on.drv.tw/typeface/e/Euclid%20Circular%20B/woff2/EuclidCircularB-Medium.woff2",
  "https://fontfamiliesbychetansaini.on.drv.tw/typeface/e/Euclid%20Circular%20B/woff2/EuclidCircularB-Regular.woff2"
];

self.addEventListener("install", (e)=>{

	// create cache
	e.waitUntil((async () => {

		const cache = await caches.open(CACHE_NAME);
		await cache.addAll(CACHE); // caching all

	})());

});

self.addEventListener("fetch", (e)=>{

	e.respondWith((async () => {

		const r = await caches.match(e.request); // fetching resource
		if (r) { return r; }

		const response = await fetch(e.request);
		const cache = await caches.open(CACHE_NAME);

		if(CACHE.includes(e.request.url)) // match the request url
		cache.put(e.request, response.clone()); // caching new resource
		
		return response;

	})());

});
