if(!self.define){let e,i={};const s=(s,n)=>(s=new URL(s+".js",n).href,i[s]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=i,document.head.appendChild(e)}else e=s,importScripts(s),i()})).then((()=>{let e=i[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(n,r)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(i[t])return;let o={};const c=e=>s(e,t),l={module:{uri:t},exports:o,require:c};i[t]=Promise.all(n.map((e=>l[e]||c(e)))).then((e=>(r(...e),o)))}}define(["./workbox-e3490c72"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"assets/index--yiD_aOk.js",revision:null},{url:"assets/index-CF6j-chc.css",revision:null},{url:"assets/Prettifier-DlCPZnPL.js",revision:null},{url:"index.html",revision:"80b9d2b3c8674048afe01ed50a67819c"},{url:"registerSW.js",revision:"dcc12e99bdb82dc03af8202ac4dc4d90"},{url:"favicon.ico",revision:"500da220d34224ecad1b1657342e05e6"},{url:"icon.png",revision:"ab19fcf830ea3c3727db17441eb8a63f"},{url:"robots.txt",revision:"f77c87f977e0fcce05a6df46c885a129"},{url:"manifest.webmanifest",revision:"bd172d7f9ec80858b215e6703741f297"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
