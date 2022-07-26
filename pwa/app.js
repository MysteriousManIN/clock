"use strict";

if("serviceWorker" in window.navigator){
    window.navigator.serviceWorker.register("sw.js").then(
        (res) =>{ /*console.log(res.scope);*/ },
        (err) =>{ console.log(err); }
    );
}