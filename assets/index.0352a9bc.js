var lt=Object.defineProperty,ut=Object.defineProperties;var pt=Object.getOwnPropertyDescriptors;var D=Object.getOwnPropertySymbols;var dt=Object.prototype.hasOwnProperty,ct=Object.prototype.propertyIsEnumerable;var j=(t,e,o)=>e in t?lt(t,e,{enumerable:!0,configurable:!0,writable:!0,value:o}):t[e]=o,d=(t,e)=>{for(var o in e||(e={}))dt.call(e,o)&&j(t,o,e[o]);if(D)for(var o of D(e))ct.call(e,o)&&j(t,o,e[o]);return t},y=(t,e)=>ut(t,pt(e));import{w as ht,t as x,v as J,o as p,c as w,a as c,m as E,r as K,b as B,d as g,e as s,n as R,f as Q,g as _,h as _t,i as n,j as k,k as Y,l as $,p as h,q as F,s as L,F as M,u as ft,x as mt,y as gt,z as bt,A as V,B as X,C as A,D as vt,_ as yt,E as wt,G as kt,H as $t,I as Z,J as tt,K as Ct,L as G,M as C,N as Ot,O as St}from"./vendor.578910fa.js";const Bt=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))u(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&u(a)}).observe(document,{childList:!0,subtree:!0});function o(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerpolicy&&(i.referrerPolicy=r.referrerpolicy),r.crossorigin==="use-credentials"?i.credentials="include":r.crossorigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function u(r){if(r.ep)return;r.ep=!0;const i=o(r);fetch(r.href,i)}};Bt();function Pt(){return new Worker("/prettier-php-playground/assets/Prettifier.b46a5483.js",{type:"module"})}let U=ht(new Pt),O;var S={async useCustomPlugin(t){return O||(O=await new U),O.useCustomPlugin(t)},async format(t,e={},o={}){return O||(O=await new U),O.format(t,x(e),x(o))}};const et={printWidth:80,tabWidth:4,useTabs:!1,singleQuote:!1,phpVersion:"5.4",trailingCommaPHP:!0,braceStyle:"psr-2",requirePragma:!1,insertPragma:!1},ot={ast:!1},It=`<?php

array_map(function($arg1,$arg2) use ( $var1, $var2 ) {
    return $arg1+$arg2/($var+$var2);
}, array("complex"=>"code","with"=>
    function() {return "inconsistent";}
,"formatting"=>"is", "hard" => "to", "maintain"=>true));

`,Tt=()=>({initialized:!1,isMobile:!1,showSidebar:"auto",version:localStorage.getItem("custom-plugin-code")?"custom":J,versionCounter:0,url:"#",editorOptions:d({},ot),input:It,result:null,prettierOptions:d({},et)}),zt={initializeApp(t){t.initialized=!0},setMobile(t,e){t.isMobile=e},setSidebarVisibility(t,e){t.showSidebar=e},setUrl(t,e){t.url=e},setEditorOption(t,[e,o]){t.editorOptions[e]=o},setVersion(t,e){t.version=e,t.versionCounter++},setInput(t,e){t.input=e},resetInput(t){t.input=""},setResult(t,e){t.result=e},setPrettierOption(t,[e,o]){t.prettierOptions[e]=o},setJsonState(t,e){t.prettierOptions=d(d({},t.prettierOptions),e.prettierOptions),t.editorOptions=d(d({},t.editorOptions),e.editorOptions),t.input=e.input||""},resetOptions(t){t.editorOptions=d({},ot),t.prettierOptions=d({},et)}},Mt={toggleSidebar({state:t,commit:e}){typeof t.showSidebar=="boolean"?e("setSidebarVisibility",!t.showSidebar):e("setSidebarVisibility",t.isMobile)},async useCustomPluginCode({commit:t},e){await S.useCustomPlugin(e),t("setVersion","custom")},async disableCustomPlugin({commit:t}){await S.useCustomPlugin(!1),t("setVersion",J),localStorage.removeItem("custom-plugin-code")},async pickCustomPluginFile({dispatch:t},e){try{const o=await new Promise((u,r)=>{const i=new FileReader;i.onload=()=>{u(i.result)},i.onerror=r,i.readAsText(e)});await t("useCustomPluginCode",o),localStorage.setItem("custom-plugin-code",o)}catch(o){o.message==="Invalid plugin file"?alert("Invalid plugin file"):(console.error(o),alert("An error happened. See the dev tools console for details."))}}},Rt={hasResult:t=>t.result!==null,output:t=>{if(!t.result)return t.input;if(t.result instanceof Error)return String(t.result);switch(t.result.type){case"formatted":return t.result.code;case"syntax-error":return t.result.message+`

`+t.result.frame;case"error":return t.result.message}},issueMarkdown:(t,e)=>`${t.version==="custom"?"**Plugin version: local plugin file**":t.version?`**@prettier/plugin-php v${t.version}**
[Playground link](${t.url})`:"**Plugin version: unknown**"}

**Input:**
\`\`\`php
${t.input}
\`\`\`

**Output:**
\`\`\`php
${e.output}
\`\`\`
`,issueLink:(t,e)=>`https://github.com/prettier/plugin-php/issues/new?body=${encodeURIComponent(e.issueMarkdown)}`,jsonState:t=>JSON.stringify({prettierOptions:t.prettierOptions,editorOptions:t.editorOptions,input:t.input})};var Ht=Object.freeze(Object.defineProperty({__proto__:null,state:Tt,mutations:zt,actions:Mt,getters:Rt},Symbol.toStringTag,{value:"Module"}));var b=(t,e)=>{const o=t.__vccOpts||t;for(const[u,r]of e)o[u]=r;return o};const Et={inheritAttrs:!1,props:{type:{type:String,default:"button"}},computed:{elementType(){return this.type==="link"?"a":this.type}}};function Ft(t,e,o,u,r,i){return p(),w(K(i.elementType),E(t.$attrs,{class:"button"}),{default:c(()=>[B(t.$slots,"default",{},void 0,!0)]),_:3},16)}var N=b(Et,[["render",Ft],["__scopeId","data-v-78ac0611"]]);const Lt={props:{visible:{type:Boolean,default:!0},position:{type:String,default:"above"},color:{type:String,default:"#ffffff"},background:{type:String,default:"#1a2b33"}}},Vt={class:"tooltip__triangle",width:"14px",height:"7px",viewBox:"0 0 14 7",version:"1.1",xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink"},At=["points"];function Nt(t,e,o,u,r,i){return p(),g("span",{"aria-hidden":"true",class:R(["tooltip",[`tooltip--position-${o.position}`,{"tooltip--visible":o.visible}]]),style:Q({"--tooltip-color":o.color,"--tooltip-background":o.background})},[B(t.$slots,"default",{},void 0,!0),(p(),g("svg",Vt,[s("polygon",{fill:"currentColor",points:o.position==="above"?"0 0 7 7 14 0":"0 7 7 0 14 7"},null,8,At)]))],6)}var H=b(Lt,[["render",Nt],["__scopeId","data-v-fab33e6a"]]);const Wt={inheritAttrs:!1,components:{Button:N}};function Dt(t,e,o,u,r,i){const a=_("Button");return p(),w(a,E(t.$attrs,{class:"button--github"}),{default:c(()=>[B(t.$slots,"default",{},void 0,!0)]),_:3},16)}var P=b(Wt,[["render",Dt],["__scopeId","data-v-531cb9aa"]]);const jt={components:{GitHubButton:P},data:()=>({state:null,recentMessage:null}),props:{repo:String,showStars:{type:Boolean,default:!1}},computed:{link(){return`https://github.com/${this.repo}`},label(){return`${this.repo} on GitHub`}},mounted(){_t(this.$el,t=>{this.$el.parentNode.replaceChild(t,this.$el)})}};function xt(t,e,o,u,r,i){const a=_("GitHubButton");return p(),w(a,{type:"link",href:i.link,"data-show-count":o.showStars,"aria-label":i.label},{default:c(()=>[B(t.$slots,"default",{},()=>[n(k(this.repo),1)],!0)]),_:3},8,["href","data-show-count","aria-label"])}var st=b(jt,[["render",xt],["__scopeId","data-v-9da3694c"]]),Gt="/prettier-php-playground/icon.png";const Ut={components:{GitHubButton:P,RepositoryButton:st,Button:N,Tooltip:H},props:{version:String},methods:y(d({},Y(["pickCustomPluginFile","disableCustomPlugin"])),{pluginFileReset(){this.$refs.customPluginForm.reset(),this.disableCustomPlugin()},pluginFileChange(){this.$refs.customPluginButton.$el.blur(),this.$refs.customPluginFile.files.length>0&&this.pickCustomPluginFile(this.$refs.customPluginFile.files[0])}})},I=t=>(F("data-v-69063345"),t=t(),L(),t),qt={class:"header"},Jt={class:"header__logo-wrapper"},Kt=I(()=>s("img",{class:"header__logo",src:Gt,alt:"The Prettier logo"},null,-1)),Qt={class:"header__headline"},Yt=n(" Prettier PHP "),Xt={key:0,class:"header__version"},Zt={key:0,class:"header__version--local"},te=["href"],ee={hidden:"",ref:"customPluginForm"},oe=n(" \xA0 "),se=n(" Disable custom plugin "),ie=I(()=>s("svg",{class:"custom-plugin-button__icon","aria-hidden":"true",focusable:"false",role:"img",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 512 512"},[s("path",{fill:"currentColor",d:"M256 8C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm141.421 106.579c73.176 73.175 77.05 187.301 15.964 264.865L132.556 98.615c77.588-61.105 191.709-57.193 264.865 15.964zM114.579 397.421c-73.176-73.175-77.05-187.301-15.964-264.865l280.829 280.829c-77.588 61.105-191.709 57.193-264.865-15.964z"})],-1)),re=I(()=>s("span",{class:"visually-hidden"},"Disable custom plugin",-1)),ne=n("Pick"),ae=n("Use"),le=n(" local plugin file "),ue=I(()=>s("svg",{class:"custom-plugin-button__icon","aria-hidden":"true",focusable:"false",role:"img",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 640 512"},[s("path",{fill:"currentColor",d:"M537.6 226.6c4.1-10.7 6.4-22.4 6.4-34.6 0-53-43-96-96-96-19.7 0-38.1 6-53.3 16.2C367 64.2 315.3 32 256 32c-88.4 0-160 71.6-160 160 0 2.7.1 5.4.2 8.1C40.2 219.8 0 273.2 0 336c0 79.5 64.5 144 144 144h368c70.7 0 128-57.3 128-128 0-61.9-44-113.6-102.4-125.4zM393.4 288H328v112c0 8.8-7.2 16-16 16h-48c-8.8 0-16-7.2-16-16V288h-65.4c-14.3 0-21.4-17.2-11.3-27.3l105.4-105.4c6.2-6.2 16.4-6.2 22.6 0l105.4 105.4c10.1 10.1 2.9 27.3-11.3 27.3z"})],-1)),pe=I(()=>s("span",{class:"visually-hidden"},"Use local plugin file",-1)),de={class:"header__repo-buttons"},ce=I(()=>s("svg",{version:"1.1",width:"14",height:"14",viewBox:"0 0 16 16",class:"octicon octicon-mark-github","aria-hidden":"true"},[s("path",{"fill-rule":"evenodd",d:"M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"})],-1)),he=n(" Playground "),_e=n(" Prettier PHP Plugin ");function fe(t,e,o,u,r,i){const a=_("Tooltip"),l=_("Button"),f=_("GitHubButton"),m=_("RepositoryButton");return p(),g("header",qt,[s("span",Jt,[Kt,s("h1",Qt,[Yt,o.version?(p(),g("span",Xt,[o.version==="custom"?(p(),g("span",Zt," from local file ")):(p(),g("a",{key:1,href:o.version?`https://github.com/prettier/plugin-php/tree/v${o.version}`:"https://github.com/prettier/plugin-php/tree/master",target:"_blank",rel:"noopener",class:"header__version-link"}," v"+k(o.version),9,te)),s("form",ee,[s("input",{type:"file",ref:"customPluginFile",accept:"application/javascript",onChange:e[0]||(e[0]=(...v)=>i.pluginFileChange&&i.pluginFileChange(...v))},null,544)],512),oe,o.version==="custom"?(p(),w(l,{key:2,class:"custom-plugin-button",onClick:i.pluginFileReset},{default:c(()=>[h(a,{style:{transform:"translate(-50%, 0.75em)"},position:"below",visible:"",background:"#8d9599"},{default:c(()=>[se]),_:1}),ie,re]),_:1},8,["onClick"])):$("",!0),h(l,{class:"custom-plugin-button",ref:"customPluginButton",onClick:e[1]||(e[1]=v=>t.$refs.customPluginFile.click())},{default:c(()=>[h(a,{style:{transform:"translate(-50%, 0.75em)"},position:"below",visible:"",background:"#8d9599"},{default:c(()=>[o.version==="custom"?(p(),g(M,{key:0},[ne],64)):(p(),g(M,{key:1},[ae],64)),le]),_:1}),ue,pe]),_:1},512)])):$("",!0)])]),s("aside",de,[h(f,{type:"link",href:"https://github.com/Loilo/prettier-php-playground",target:"_blank",class:"header__own-repo-button"},{default:c(()=>[ce,he]),_:1}),h(m,{repo:"prettier/plugin-php","show-stars":""},{default:c(()=>[_e]),_:1})])])}var me=b(Ut,[["render",fe],["__scopeId","data-v-69063345"]]);const ge={inheritAttrs:!1,components:{Button:N,Tooltip:H},props:{color:{type:String,default:"#182024"},pressed:{type:Boolean,default:!1},tooltip:String,tooltipDuration:{type:Number,default:500,validator:t=>t>0&&Number.isInteger(t)}},data:()=>({pressing:!1,tooltipVisible:!1}),computed:{attributes(){let t=/^on[^a-z]/,[e,o]=ft(Object.entries(this.$attrs),u=>t.test(u));return d(d({},Object.fromEntries(o)),this.pressing?{onclick(u){u.preventDefault()}}:Object.fromEntries(e))}},watch:{pressing(t){window.dispatchEvent(new CustomEvent("cm-inert",{detail:{state:t,component:this}}))}},methods:{press(){this.pressing=!0,this.showTooltip()},release(){setTimeout(()=>{this.pressing=!1},0),this.hideTooltip()},showTooltip(){!this.tooltip||(clearTimeout(this.tooltipTimeoutId),this.tooltipVisible=!0)},hideTooltip(){!this.tooltip||(this.tooltipTimeoutId=setTimeout(()=>{this.tooltipVisible=!1},this.tooltipDuration))}}};function be(t,e,o,u,r,i){const a=_("Tooltip"),l=_("Button"),f=mt("touch");return gt((p(),w(l,E({class:["icon-button",{"icon-button--pressed":o.pressed}],style:{"--hover-color":o.color}},i.attributes,{onContextmenu:e[0]||(e[0]=bt(()=>{},["prevent"])),title:o.tooltip||!1}),{default:c(()=>[o.tooltip?(p(),w(a,{key:0,visible:t.tooltipVisible},{default:c(()=>[n(k(o.tooltip),1)]),_:1},8,["visible"])):$("",!0),B(t.$slots,"default",{},void 0,!0)]),_:3},16,["class","style","title"])),[[f,i.press,"press"],[f,i.release,"pressup"],[f,i.release,"panend"]])}var it=b(ge,[["render",be],["__scopeId","data-v-b01eecb4"]]);const ve={components:{GitHubButton:P,Tooltip:H},data:()=>({state:null,recentMessage:null}),props:{data:[String,Function],feedbackTimer:{type:Number,default:2500},successMessage:{type:String,default:"Copied!"},errorMessage:{type:String,default:"Error!"}},watch:{state(t){switch(t){case"success":this.recentMessage=this.successMessage;break;case"error":this.recentMessage=this.errorMessage;break}}},methods:{async copy(){const t=typeof this.data=="function"?this.data():this.data;try{await navigator.clipboard.writeText(t),this.success()}catch(e){console.error("Copying error: %o",e),this.error()}},success(){this.state="success",this.initializeStateReset()},error(){this.state="error",this.initializeStateReset()},initializeStateReset(){clearTimeout(this.timeoutId),this.timeoutId=setTimeout(()=>{this.state=null},this.feedbackTimer)}}};function ye(t,e,o,u,r,i){const a=_("Tooltip"),l=_("GitHubButton");return p(),w(l,{onClick:i.copy,class:R(["clipboard-button",{"clipboard-button--success":t.state==="success","clipboard-button--error":t.state==="error"}])},{default:c(()=>[h(a,{visible:t.state!==null},{default:c(()=>[n(k(t.recentMessage),1)]),_:1},8,["visible"]),B(t.$slots,"default",{},void 0,!0)]),_:3},8,["onClick","class"])}var rt=b(ve,[["render",ye],["__scopeId","data-v-1100fa84"]]);const we={components:{Tooltip:H,IconButton:it,ClipboardButton:rt,GitHubButton:P},data:()=>({shareCopied:!1}),computed:d(d({},V(["showSidebar","isMobile","url","prettierOptions"])),X(["issueLink","issueMarkdown"])),methods:y(d(d({},A(["resetInput"])),Y(["toggleSidebar"])),{share(){navigator.share?navigator.share({title:"Prettier PHP Playground",text:"Play with the Prettier PHP plugin",url:this.url}).catch(()=>{alert("Sharing failed")}):navigator.clipboard.writeText(this.url).then(()=>{this.shareCopied=!0,clearTimeout(this.shareCopiedTimeout),this.shareCopiedTimeout=setTimeout(()=>{this.shareCopied=!1},2500)}).catch(()=>{alert("Your device or browser does not support the Web Share API. \u{1F641}")})},getConfigJson(){return JSON.stringify(this.prettierOptions,null,2)}})},T=t=>(F("data-v-d973e572"),t=t(),L(),t),ke={class:"layout__footer footer"},$e={class:"footer__mobile"},Ce=T(()=>s("svg",{height:"16",viewBox:"0 0 14 16",version:"1.1",width:"14","aria-hidden":"true"},[s("path",{fill:"currentColor","fill-rule":"evenodd",d:"M14 8.77v-1.6l-1.94-.64-.45-1.09.88-1.84-1.13-1.13-1.81.91-1.09-.45-.69-1.92h-1.6l-.63 1.94-1.11.45-1.84-.88-1.13 1.13.91 1.81-.45 1.09L0 7.23v1.59l1.94.64.45 1.09-.88 1.84 1.13 1.13 1.81-.91 1.09.45.69 1.92h1.59l.63-1.94 1.11-.45 1.84.88 1.13-1.13-.92-1.81.47-1.09L14 8.75v.02zM7 11c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z"})],-1)),Oe=T(()=>s("svg",{height:"16",viewBox:"0 0 12 16",version:"1.1",width:"12","aria-hidden":"true"},[s("path",{fill:"currentColor","fill-rule":"evenodd",d:"M11 2H9c0-.55-.45-1-1-1H5c-.55 0-1 .45-1 1H2c-.55 0-1 .45-1 1v1c0 .55.45 1 1 1v9c0 .55.45 1 1 1h7c.55 0 1-.45 1-1V5c.55 0 1-.45 1-1V3c0-.55-.45-1-1-1zm-1 12H3V5h1v8h1V5h1v8h1V5h1v8h1V5h1v9zm1-10H2V3h9v1z"})],-1)),Se=T(()=>s("svg",{height:"16",viewBox:"0 0 16 16",version:"1.1",width:"16","aria-hidden":"true"},[s("path",{fill:"currentColor","fill-rule":"evenodd",d:"M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"})],-1)),Be=T(()=>s("svg",{height:"16",viewBox:"0 0 14 16",version:"1.1",width:"14","aria-hidden":"true"},[s("path",{fill:"currentColor","fill-rule":"evenodd",d:"M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"})],-1)),Pe=n("Copied URL!"),Ie=T(()=>s("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24"},[s("path",{d:"M0 0h24v24H0z",fill:"none"}),s("path",{fill:"currentColor",d:"M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"})],-1)),Te={class:"footer__desktop"},ze={class:"footer__buttons"},Me=n("Hide"+k(" ")),Re=n("Show"+k(" ")),He=n("options "),Ee=n(k(" ")+" "),Fe=n("Clear"),Le=n(k(" ")+" "),Ve=n("Copy config JSON"),Ae=T(()=>s("section",{class:"footer__inspired"},[n(" Inspired by and plagiarized from the "),s("a",{href:"https://prettier.io/playground",target:"_blank"},"Prettier playground")],-1)),Ne={class:"footer__buttons"},We=n("Copy link"),De=n(k(" ")+" "),je=n("Copy markdown"),xe=n(k(" ")+" "),Ge=n("Report issue");function Ue(t,e,o,u,r,i){const a=_("IconButton"),l=_("Tooltip"),f=_("GitHubButton"),m=_("ClipboardButton");return p(),g("footer",ke,[s("div",$e,[h(a,{color:"#5ab3b3",tooltip:"Toggle options",onClick:t.toggleSidebar,pressed:t.showSidebar===!0},{default:c(()=>[Ce]),_:1},8,["onClick","pressed"]),h(a,{color:"#e85f61",onClick:t.resetInput,tooltip:"Clear code"},{default:c(()=>[Oe]),_:1},8,["onClick"]),h(a,{type:"link",href:"https://github.com/prettier/plugin-php",tooltip:"Open on GitHub",target:"_blank",color:"#192B33"},{default:c(()=>[Se]),_:1}),h(a,{color:"#f8bc45",type:"link",href:t.issueLink,tooltip:"Report issue",target:"_blank"},{default:c(()=>[Be]),_:1},8,["href"]),h(a,{color:"#c596c7",onClick:i.share,tooltip:"Share your code"},{default:c(()=>[h(l,{visible:t.shareCopied},{default:c(()=>[Pe]),_:1},8,["visible"]),Ie]),_:1},8,["onClick"])]),s("div",Te,[s("section",ze,[h(f,{onClick:t.toggleSidebar},{default:c(()=>[typeof t.showSidebar=="boolean"?(p(),g(M,{key:0},[n(k(t.showSidebar?"Hide ":"Show "),1)],64)):t.isMobile?(p(),g(M,{key:2},[Re],64)):(p(),g(M,{key:1},[Me],64)),He]),_:1},8,["onClick"]),Ee,h(f,{onClick:t.resetInput},{default:c(()=>[Fe]),_:1},8,["onClick"]),Le,h(m,{data:i.getConfigJson},{default:c(()=>[Ve]),_:1},8,["data"])]),Ae,s("section",Ne,[h(m,{data:t.url},{default:c(()=>[We]),_:1},8,["data"]),De,h(m,{data:t.issueMarkdown},{default:c(()=>[je]),_:1},8,["data"]),xe,h(f,{type:"link",href:t.issueLink,target:"_blank"},{default:c(()=>[Ge]),_:1},8,["href"])])])])}var qe=b(we,[["render",Ue],["__scopeId","data-v-d973e572"]]);const Je={components:{GitHubButton:P},computed:d({},V(["prettierOptions","editorOptions"])),methods:d({},A(["resetOptions","setPrettierOption","setEditorOption"]))},z=t=>(F("data-v-2a4a226e"),t=t(),L(),t),Ke={class:"sidebar"},Qe={class:"sidebar__group",open:""},Ye=z(()=>s("summary",{class:"sidebar__headline"},"Options",-1)),Xe={class:"sidebar__option",title:"The line length where Prettier will try wrap."},Ze=n(" --print-width "),to=["value"],eo={class:"sidebar__option",title:"Number of spaces per indentation level."},oo=n(" --tab-width "),so=["value"],io={class:"sidebar__option",title:"Indent with tabs instead of spaces."},ro=["checked"],no=n(" --use-tabs "),ao={class:"sidebar__option",title:"Use single quotes instead of double quotes."},lo=["checked"],uo=n(" --single-quote "),po={class:"sidebar__group",open:""},co=z(()=>s("summary",{class:"sidebar__headline"},"PHP",-1)),ho={class:"sidebar__option",title:"Which PHP version to target"},_o=n(" --php-version "),fo=["value"],mo=vt('<option value="5.0" data-v-2a4a226e>5.0</option><option value="5.1" data-v-2a4a226e>5.1</option><option value="5.2" data-v-2a4a226e>5.2</option><option value="5.3" data-v-2a4a226e>5.3</option><option value="5.4" selected data-v-2a4a226e>5.4</option><option value="5.5" data-v-2a4a226e>5.5</option><option value="5.6" data-v-2a4a226e>5.6</option><option value="7.0" data-v-2a4a226e>7.0</option><option value="7.1" data-v-2a4a226e>7.1</option><option value="7.2" data-v-2a4a226e>7.2</option><option value="7.3" data-v-2a4a226e>7.3</option><option value="7.4" data-v-2a4a226e>7.4</option><option value="8.0" data-v-2a4a226e>8.0</option><option value="8.1" data-v-2a4a226e>8.1</option>',14),go=[mo],bo={class:"sidebar__option",title:"Where to put opening braces"},vo=n(" --brace-style "),yo=["value"],wo=z(()=>s("option",{value:"psr-2",selected:""},"PSR-2",-1)),ko=z(()=>s("option",{value:"1tbs"},"1TBS",-1)),$o=[wo,ko],Co={class:"sidebar__option",title:"Whether to insert trailing commas where applicable"},Oo=["checked"],So=n(" --trailing-comma-php "),Bo={class:"sidebar__group",open:""},Po=z(()=>s("summary",{class:"sidebar__headline"},"Special",-1)),Io={class:"sidebar__option",title:"Insert @format pragma into file's first docblock comment."},To=["checked"],zo=n(" --insert-pragma "),Mo={class:"sidebar__option",title:"Require either '@prettier' or '@format' to be present in the file's first docblock comment in order for it to be formatted."},Ro=["checked"],Ho=n(" --require-pragma "),Eo={class:"sidebar__group",open:""},Fo=z(()=>s("summary",{class:"sidebar__headline"},"Debug",-1)),Lo={class:"sidebar__option"},Vo=["checked"],Ao=n(" show AST "),No={class:"sidebar__group"},Wo=n("Reset to defaults");function Do(t,e,o,u,r,i){const a=_("GitHubButton");return p(),g("aside",Ke,[s("details",Qe,[Ye,s("label",Xe,[Ze,s("input",{type:"number",value:t.prettierOptions.printWidth,onInput:e[0]||(e[0]=l=>t.setPrettierOption(["printWidth",+l.currentTarget.value])),min:"0",step:"1",size:"3"},null,40,to)]),s("label",eo,[oo,s("input",{type:"number",value:t.prettierOptions.tabWidth,onInput:e[1]||(e[1]=l=>t.setPrettierOption(["tabWidth",+l.currentTarget.value])),min:"0",step:"1",size:"2"},null,40,so)]),s("label",io,[s("input",{type:"checkbox",checked:t.prettierOptions.useTabs,onChange:e[2]||(e[2]=l=>t.setPrettierOption(["useTabs",!t.prettierOptions.useTabs]))},null,40,ro),no]),s("label",ao,[s("input",{type:"checkbox",checked:t.prettierOptions.singleQuote,onChange:e[3]||(e[3]=l=>t.setPrettierOption(["singleQuote",!t.prettierOptions.singleQuote]))},null,40,lo),uo])]),s("details",po,[co,s("label",ho,[_o,s("select",{value:t.prettierOptions.phpVersion,onChange:e[4]||(e[4]=l=>t.setPrettierOption(["phpVersion",l.currentTarget.value]))},go,40,fo)]),s("label",bo,[vo,s("select",{value:t.prettierOptions.braceStyle,onChange:e[5]||(e[5]=l=>t.setPrettierOption(["braceStyle",l.currentTarget.value]))},$o,40,yo)]),s("label",Co,[s("input",{type:"checkbox",checked:t.prettierOptions.trailingCommaPHP,onChange:e[6]||(e[6]=l=>t.setPrettierOption(["trailingCommaPHP",!t.prettierOptions.trailingCommaPHP]))},null,40,Oo),So])]),s("details",Bo,[Po,s("label",Io,[s("input",{type:"checkbox",checked:t.prettierOptions.insertPragma,onChange:e[7]||(e[7]=l=>t.setPrettierOption(["insertPragma",!t.prettierOptions.insertPragma]))},null,40,To),zo]),s("label",Mo,[s("input",{type:"checkbox",checked:t.prettierOptions.requirePragma,onChange:e[8]||(e[8]=l=>t.setPrettierOption(["requirePragma",!t.prettierOptions.requirePragma]))},null,40,Ro),Ho])]),s("details",Eo,[Fo,s("label",Lo,[s("input",{type:"checkbox",checked:t.editorOptions.ast,onChange:e[9]||(e[9]=l=>t.setEditorOption(["ast",!t.editorOptions.ast]))},null,40,Vo),Ao])]),s("div",No,[h(a,{onClick:t.resetOptions},{default:c(()=>[Wo]),_:1},8,["onClick"])])])}var jo=b(Je,[["render",Do],["__scopeId","data-v-2a4a226e"]]);const xo={inheritAttrs:!1,components:{Codemirror:yt},computed:{classes:t=>t.$attrs.class,attributes:t=>wt(t.$attrs,"class")}};function Go(t,e,o,u,r,i){const a=_("Codemirror");return p(),g("section",{class:R(["codemirror-editor",i.classes])},[h(a,kt($t(i.attributes)),null,16)],2)}var Uo=b(xo,[["render",Go],["__scopeId","data-v-2491aa55"]]);const qo={props:{area:String}};function Jo(t,e,o,u,r,i){return p(),g("div",{class:"codemirror-inert",style:Q({"grid-area":o.area})},null,4)}var Ko=b(qo,[["render",Jo],["__scopeId","data-v-5414b1ad"]]);const Qo={},Yo=t=>(F("data-v-c3398e2c"),t=t(),L(),t),Xo={id:"unsupported-ie"},Zo=n(" Sorry, we don't support Internet Explorer here \u2014 please "),ts=Yo(()=>s("a",{href:"http://outdatedbrowser.com/en"},"install a modern browser",-1)),es=n(" to use this site. "),os=n(" document.addEventListener('DOMContentLoaded', function() { if (window.navigator.appVersion.indexOf('Trident') !== -1) { document.getElementById('unsupported-ie').style.display = 'block' } }) ");function ss(t,e,o,u,r,i){return p(),g("header",Xo,[Zo,ts,es,(p(),w(K("script"),null,{default:c(()=>[os]),_:1}))])}var is=b(Qo,[["render",ss],["__scopeId","data-v-c3398e2c"]]);function rs(){const t=document.location.hash.slice(1);if(!t)return null;try{return JSON.parse(Z.exports.decompressFromEncodedURIComponent(t))}catch{return{}}}function ns(t){const e=Z.exports.compressToEncodedURIComponent(t);if(typeof URL=="function"&&typeof history=="object"&&typeof history.replaceState=="function"){const o=new URL(location);o.hash=e,history.replaceState(null,null,o.href)}else location.hash=e}self.prettier=S;const as={components:{Header:me,Footer:qe,Sidebar:jo,GitHubButton:P,IconButton:it,ClipboardButton:rt,RepositoryButton:st,Tooltip:H,CodemirrorEditor:Uo,CodemirrorInert:Ko,UnsupportedIE:is},props:{window:Object},data:()=>({prettier:S,inertReasons:[],result:null}),computed:y(d(d({},V(["versionCounter","initialized","showSidebar","version","input","url","prettierOptions","editorOptions"])),X(["hasResult","output","issueMarkdown","issueLink","jsonState"])),{cmIsInert(){return this.inertReasons.length>0},cmBaseOptions(){return{tabSize:this.prettierOptions.tabWidth,lineNumbers:!0}},cmInputOptions(){return y(d({},this.cmBaseOptions),{mode:"application/x-httpd-php",rulers:[{column:this.prettierOptions.printWidth,color:"#eee"}]})},cmAstOptions(){return y(d({},this.cmBaseOptions),{mode:"application/json"})},cmOutputOptions(){return y(d({},this.cmBaseOptions),{readOnly:!0,lineWrapping:this.outputContainsError,rulers:this.outputContainsError?[]:[{column:this.prettierOptions.printWidth,color:"#444"}],mode:this.outputContainsError?"text/plain":"application/x-httpd-php"})},ast(){return this.editorOptions&&this.editorOptions.ast&&this.hasResult&&this.result.type==="formatted"?this.result.ast===null?"":JSON.stringify(this.result.ast,null,2):""},outputContainsError(){return this.result&&(this.result instanceof Error||this.result.type!=="formatted")},resultKey:t=>[t.versionCounter,t.input,JSON.stringify(t.prettierOptions),JSON.stringify(t.editorOptions)].join("::")}),watch:{async resultKey(){this.result=await this.updateResult()},result(t){this.$store.commit("setResult",t)},jsonState:"onStateChange",["window.is.atLeast.tablet"](t){this.$store.commit("setMobile",!t)}},methods:y(d({},A(["resetOptions"])),{async updateResult(){try{return S?await S.format(this.input,this.prettierOptions,this.editorOptions):null}catch(t){return t}},onStateChange(t){this.initialized&&(ns(t),typeof window=="object"&&this.$store.commit("setUrl",window.location.href))}}),created(){this.resetOptions(),this.onStateChange=tt(this.onStateChange,250),this.$store.commit("setMobile",!this.window.is.atLeast.tablet),window.addEventListener("cm-inert",t=>{let e=t.detail.state,o=t.detail.component;e?this.inertReasons.includes(o)||this.inertReasons.push(o):this.inertReasons.includes(o)&&this.inertReasons.splice(this.inertReasons.indexOf(o),1)})},async mounted(){const t=localStorage.getItem("custom-plugin-code");this.$store.commit("setUrl",window.location.href);const e=rs();e!==null&&this.$store.commit("setJsonState",e),t?await this.$store.dispatch("useCustomPluginCode",t):await this.$store.dispatch("disableCustomPlugin"),this.$nextTick(()=>{this.$store.commit("initializeApp")})}},ls=s("div",{class:"layout__preview"},[s("svg",{"aria-hidden":"true",focusable:"false",role:"img",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 576 512"},[s("path",{fill:"currentColor",d:"M248.747 204.705l6.588 112c.373 6.343 5.626 11.295 11.979 11.295h41.37a12 12 0 0 0 11.979-11.295l6.588-112c.405-6.893-5.075-12.705-11.979-12.705h-54.547c-6.903 0-12.383 5.812-11.978 12.705zM330 384c0 23.196-18.804 42-42 42s-42-18.804-42-42 18.804-42 42-42 42 18.804 42 42zm-.423-360.015c-18.433-31.951-64.687-32.009-83.154 0L6.477 440.013C-11.945 471.946 11.118 512 48.054 512H527.94c36.865 0 60.035-39.993 41.577-71.987L329.577 23.985zM53.191 455.002L282.803 57.008c2.309-4.002 8.085-4.002 10.394 0l229.612 397.993c2.308 4-.579 8.998-5.197 8.998H58.388c-4.617.001-7.504-4.997-5.197-8.997z"})]),s("span",null,[n(" This is a playground preview for testing upcoming versions of the Prettier PHP Plugin. You can find the current stable playground "),s("a",{href:"https://loilo.github.io/prettier-php-playground/"},"here"),n(". ")])],-1);function us(t,e,o,u,r,i){const a=_("UnsupportedIE"),l=_("Header"),f=_("Sidebar"),m=_("CodemirrorEditor"),v=_("CodemirrorInert"),nt=_("Footer");return p(),g("main",{class:R(["layout",{"layout--with-sidebar":t.showSidebar===!0,"layout--without-sidebar":t.showSidebar===!1,"layout--with-ast":t.editorOptions.ast}])},[h(a),ls,h(l,E({version:t.version},{class:"layout__header"}),null,16),h(f,{class:"layout__sidebar"}),h(m,{value:t.input,onInput:e[0]||(e[0]=at=>t.$store.commit("setInput",at)),options:i.cmInputOptions,class:"layout__input"},null,8,["value","options"]),i.cmIsInert?(p(),w(v,{key:0,area:"input"})):$("",!0),t.editorOptions.ast?(p(),w(m,{key:1,value:i.ast,options:i.cmAstOptions,class:"layout__ast"},null,8,["value","options"])):$("",!0),i.cmIsInert&&t.editorOptions.ast?(p(),w(v,{key:2,area:"ast"})):$("",!0),h(m,{value:t.output,options:i.cmOutputOptions,class:R([{"editor--with-error":i.outputContainsError},"layout__output"])},null,8,["value","options","class"]),i.cmIsInert?(p(),w(v,{key:3,area:"output"})):$("",!0),h(nt)],2)}var ps=b(as,[["render",us]]),ds={props:{defaultBreakpoint:{type:String,required:!0},breakpoints:{type:Object,default:()=>({})},strategy:{type:String,default:"mobile-first"},throttle:{type:Number,default:200},tag:{type:[String,Object,null],default:"div"}},data:t=>({width:0,observer:t.$isServer?null:new ResizeObserver(tt(e=>{t.width=e[0].contentRect.width},t.throttle))}),computed:{isMobileFirst:t=>t.strategy==="mobile-first",api(){return{is:{exactly:this.exactly,largerThan:this.gt,smallerThan:this.lt,atLeast:this.gte,atMost:this.lte},breakpoint:this.currentBreakpoint,defaultBreakpoint:this.defaultBreakpoint,breakpoints:this.breakpoints,strategy:this.strategy,larger:this.largerBreakpoints,smaller:this.smallerBreakpoints,width:this.width}},iterableBreakpoints(){return Object.entries(this.breakpoints).map(([t,e])=>({name:t,width:e}))},iterableBreakpointsWithDefault(){return this.isMobileFirst?[{name:this.defaultBreakpoint},...this.iterableBreakpoints]:[...this.iterableBreakpoints,{name:this.defaultBreakpoint}]},sizeSortedBreakpoints(){return this.iterableBreakpoints.slice(0).sort(({width:t},{width:e})=>t-e)},strategicSizeSortedBreakpoints(){return this.isMobileFirst?this.sizeSortedBreakpoints.slice(0).reverse():this.sizeSortedBreakpoints.slice(0)},currentBreakpoint(){for(const{name:t,width:e}of this.strategicSizeSortedBreakpoints)if(this.isMobileFirst){if(this.width>=e)return t}else if(this.width<=e)return t;return this.defaultBreakpoint},smallerBreakpoints(){if(this.currentBreakpoint===this.defaultBreakpoint)return this.isMobileFirst?[]:this.sizeSortedBreakpoints.map(({name:e})=>e);const t=[];return this.isMobileFirst&&t.push(this.defaultBreakpoint),t.concat(this.sizeSortedBreakpoints.slice(0,this.sizeSortedBreakpoints.findIndex(({name:e})=>e===this.currentBreakpoint)).map(({name:e})=>e))},largerBreakpoints(){if(this.currentBreakpoint===this.defaultBreakpoint)return this.isMobileFirst?this.sizeSortedBreakpoints.map(({name:e})=>e):[];const t=[];return this.isMobileFirst||t.push(this.defaultBreakpoint),this.sizeSortedBreakpoints.slice(this.sizeSortedBreakpoints.findIndex(({name:e})=>e===this.currentBreakpoint)+1).map(({name:e})=>e).concat(t)},exactly(){return this.iterableBreakpointsWithDefault.reduce((t,{name:e})=>y(d({},t),{[e]:e===this.currentBreakpoint}),{})},gt(){return this.iterableBreakpointsWithDefault.reduce((t,{name:e})=>y(d({},t),{[e]:this.smallerBreakpoints.includes(e)}),{})},gte(){return y(d({},this.gt),{[this.currentBreakpoint]:!0})},lt(){return this.iterableBreakpointsWithDefault.reduce((t,{name:e})=>y(d({},t),{[e]:this.largerBreakpoints.includes(e)}),{})},lte(){return y(d({},this.lt),{[this.currentBreakpoint]:!0})}},render(){const t=this.$slots.default(this.api);return this.tag===null?t:Ct(this.tag,[t])},mounted(){this.$nextTick(()=>{this.$el instanceof Element&&this.observer.observe(this.$el)})},destroyed(){this.observer.disconnect()}};const cs={components:{App:ps,ResponsiveContainer:ds}};function hs(t,e,o,u,r,i){const a=_("App"),l=_("ResponsiveContainer");return p(),w(l,{class:"responsive-container","default-breakpoint":"mobile",breakpoints:{tablet:768}},{default:c(f=>[h(a,{window:f},null,8,["window"])]),_:1})}var _s=b(cs,[["render",hs]]);function q(t,e){return o=>(e.prevent&&o.preventDefault(),e.stop&&o.stopPropagation(),t(o))}var fs=t=>{let e={},o={},u;t.directive("touch",{mounted(r,{arg:i,modifiers:a,value:l}){u||(u=new G(document));let f=C(r),m=new G(r);if(o[f]=m,typeof l=="function"){let v=C(r,i);e[v]=q(l,a),a.global?u.on(i,e[v]):m.on(i,e[v])}},updated(r,{arg:i,modifiers:a,value:l,oldValue:f}){if(l!==f){let m=C(r,i),v=C(r);m in e&&(a.global?u.off(i,e[m]):o[v].off(i,e[m]),r.removeEventListener(e[m])),typeof l=="function"&&(e[m]=q(l,a),a.global?u.on(i,e[symbol]):o[v].on(i,e[symbol]))}},unmounted(r,{arg:i,modifiers:a}){let l=C(r),f=C(r,i);f in e&&(a.global?u.off(i,e[f]):o[l].off(i,e[f]),delete e[f]),o[l].destroy(),delete o[l]}})};let W=Ot(_s);W.use(fs);W.use(St(Ht));W.mount("#app");
