if(!self.define){let e,i={};const s=(s,r)=>(s=new URL(s+".js",r).href,i[s]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=i,document.head.appendChild(e)}else e=s,importScripts(s),i()})).then((()=>{let e=i[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(r,n)=>{const c=e||("document"in self?document.currentScript.src:"")||location.href;if(i[c])return;let t={};const o=e=>s(e,c),l={module:{uri:c},exports:t,require:o};i[c]=Promise.all(r.map((e=>l[e]||o(e)))).then((e=>(n(...e),t)))}}define(["./workbox-7369c0e1"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"assets/index-a3c304db.css",revision:null},{url:"assets/index-b67e8880.js",revision:null},{url:"assets/Prettifier-37ee14e1.js",revision:null},{url:"index.html",revision:"d990829c3495d0fc255f5468f36094db"},{url:"registerSW.js",revision:"dcc12e99bdb82dc03af8202ac4dc4d90"},{url:"favicon.ico",revision:"500da220d34224ecad1b1657342e05e6"},{url:"robots.txt",revision:"f77c87f977e0fcce05a6df46c885a129"},{url:"icon.png",revision:"ab19fcf830ea3c3727db17441eb8a63f"},{url:"manifest.webmanifest",revision:"1a8a1c629c54aca96fa4c8328be38f3c"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
