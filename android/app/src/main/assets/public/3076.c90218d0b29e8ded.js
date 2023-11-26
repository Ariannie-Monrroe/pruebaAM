"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[3076],{2726:(B,k,m)=>{m.d(k,{Sd:()=>Q,Uw:()=>K,fo:()=>M,xz:()=>x});var a=m(5861);typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"&&global;var O=function(r){return r.Unimplemented="UNIMPLEMENTED",r.Unavailable="UNAVAILABLE",r}(O||{});class x extends Error{constructor(e,t,o){super(e),this.message=e,this.code=t,this.data=o}}const h=r=>{var e,t,o,i,n;const l=r.CapacitorCustomPlatform||null,s=r.Capacitor||{},g=s.Plugins=s.Plugins||{},c=r.CapacitorPlatforms,D=(null===(e=null==c?void 0:c.currentPlatform)||void 0===e?void 0:e.getPlatform)||(()=>null!==l?l.name:(r=>{var e,t;return null!=r&&r.androidBridge?"android":null!==(t=null===(e=null==r?void 0:r.webkit)||void 0===e?void 0:e.messageHandlers)&&void 0!==t&&t.bridge?"ios":"web"})(r)),ie=(null===(t=null==c?void 0:c.currentPlatform)||void 0===t?void 0:t.isNativePlatform)||(()=>"web"!==D()),le=(null===(o=null==c?void 0:c.currentPlatform)||void 0===o?void 0:o.isPluginAvailable)||(u=>{const d=F.get(u);return!!(null!=d&&d.platforms.has(D())||X(u))}),X=(null===(i=null==c?void 0:c.currentPlatform)||void 0===i?void 0:i.getPluginHeader)||(u=>{var d;return null===(d=s.PluginHeaders)||void 0===d?void 0:d.find(W=>W.name===u)}),F=new Map,ge=(null===(n=null==c?void 0:c.currentPlatform)||void 0===n?void 0:n.registerPlugin)||((u,d={})=>{const W=F.get(u);if(W)return console.warn(`Capacitor plugin "${u}" already registered. Cannot register plugins twice.`),W.proxy;const j=D(),Z=X(u);let C;const ve=function(){var v=(0,a.Z)(function*(){return!C&&j in d?C=C="function"==typeof d[j]?yield d[j]():d[j]:null!==l&&!C&&"web"in d&&(C=C="function"==typeof d.web?yield d.web():d.web),C});return function(){return v.apply(this,arguments)}}(),z=v=>{let P;const w=(...S)=>{const A=ve().then(_=>{const $=((v,P)=>{var w,S;if(!Z){if(v)return null===(S=v[P])||void 0===S?void 0:S.bind(v);throw new x(`"${u}" plugin is not implemented on ${j}`,O.Unimplemented)}{const A=null==Z?void 0:Z.methods.find(_=>P===_.name);if(A)return"promise"===A.rtype?_=>s.nativePromise(u,P.toString(),_):(_,$)=>s.nativeCallback(u,P.toString(),_,$);if(v)return null===(w=v[P])||void 0===w?void 0:w.bind(v)}})(_,v);if($){const R=$(...S);return P=null==R?void 0:R.remove,R}throw new x(`"${u}.${v}()" is not implemented on ${j}`,O.Unimplemented)});return"addListener"===v&&(A.remove=(0,a.Z)(function*(){return P()})),A};return w.toString=()=>`${v.toString()}() { [capacitor code] }`,Object.defineProperty(w,"name",{value:v,writable:!1,configurable:!1}),w},q=z("addListener"),ee=z("removeListener"),he=(v,P)=>{const w=q({eventName:v},P),S=function(){var _=(0,a.Z)(function*(){const $=yield w;ee({eventName:v,callbackId:$},P)});return function(){return _.apply(this,arguments)}}(),A=new Promise(_=>w.then(()=>_({remove:S})));return A.remove=(0,a.Z)(function*(){console.warn("Using addListener() without 'await' is deprecated."),yield S()}),A},J=new Proxy({},{get(v,P){switch(P){case"$$typeof":return;case"toJSON":return()=>({});case"addListener":return Z?he:q;case"removeListener":return ee;default:return z(P)}}});return g[u]=J,F.set(u,{name:u,proxy:J,platforms:new Set([...Object.keys(d),...Z?[j]:[]])}),J});return s.convertFileSrc||(s.convertFileSrc=u=>u),s.getPlatform=D,s.handleError=u=>r.console.error(u),s.isNativePlatform=ie,s.isPluginAvailable=le,s.pluginMethodNoop=(u,d,W)=>Promise.reject(`${W} does not have an implementation of "${d}".`),s.registerPlugin=ge,s.Exception=x,s.DEBUG=!!s.DEBUG,s.isLoggingEnabled=!!s.isLoggingEnabled,s.platform=s.getPlatform(),s.isNative=s.isNativePlatform(),s},p=(r=>r.Capacitor=h(r))(typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{}),M=p.registerPlugin;class K{constructor(e){this.listeners={},this.windowListeners={},e&&(console.warn(`Capacitor WebPlugin "${e.name}" config object was deprecated in v3 and will be removed in v4.`),this.config=e)}addListener(e,t){var o=this;this.listeners[e]||(this.listeners[e]=[]),this.listeners[e].push(t);const n=this.windowListeners[e];n&&!n.registered&&this.addWindowListener(n);const l=function(){var g=(0,a.Z)(function*(){return o.removeListener(e,t)});return function(){return g.apply(this,arguments)}}(),s=Promise.resolve({remove:l});return Object.defineProperty(s,"remove",{value:(g=(0,a.Z)(function*(){console.warn("Using addListener() without 'await' is deprecated."),yield l()}),function(){return g.apply(this,arguments)})}),s;var g}removeAllListeners(){var e=this;return(0,a.Z)(function*(){e.listeners={};for(const t in e.windowListeners)e.removeWindowListener(e.windowListeners[t]);e.windowListeners={}})()}notifyListeners(e,t){const o=this.listeners[e];o&&o.forEach(i=>i(t))}hasListeners(e){return!!this.listeners[e].length}registerWindowListener(e,t){this.windowListeners[t]={registered:!1,windowEventName:e,pluginEventName:t,handler:o=>{this.notifyListeners(t,o)}}}unimplemented(e="not implemented"){return new p.Exception(e,O.Unimplemented)}unavailable(e="not available"){return new p.Exception(e,O.Unavailable)}removeListener(e,t){var o=this;return(0,a.Z)(function*(){const i=o.listeners[e];if(!i)return;const n=i.indexOf(t);o.listeners[e].splice(n,1),o.listeners[e].length||o.removeWindowListener(o.windowListeners[e])})()}addWindowListener(e){window.addEventListener(e.windowEventName,e.handler),e.registered=!0}removeWindowListener(e){e&&(window.removeEventListener(e.windowEventName,e.handler),e.registered=!1)}}const Y=r=>encodeURIComponent(r).replace(/%(2[346B]|5E|60|7C)/g,decodeURIComponent).replace(/[()]/g,escape),N=r=>r.replace(/(%[\dA-F]{2})+/gi,decodeURIComponent);class te extends K{getCookies(){return(0,a.Z)(function*(){const e=document.cookie,t={};return e.split(";").forEach(o=>{if(o.length<=0)return;let[i,n]=o.replace(/=/,"CAP_COOKIE").split("CAP_COOKIE");i=N(i).trim(),n=N(n).trim(),t[i]=n}),t})()}setCookie(e){return(0,a.Z)(function*(){try{const t=Y(e.key),o=Y(e.value),i=`; expires=${(e.expires||"").replace("expires=","")}`,n=(e.path||"/").replace("path=",""),l=null!=e.url&&e.url.length>0?`domain=${e.url}`:"";document.cookie=`${t}=${o||""}${i}; path=${n}; ${l};`}catch(t){return Promise.reject(t)}})()}deleteCookie(e){return(0,a.Z)(function*(){try{document.cookie=`${e.key}=; Max-Age=0`}catch(t){return Promise.reject(t)}})()}clearCookies(){return(0,a.Z)(function*(){try{const e=document.cookie.split(";")||[];for(const t of e)document.cookie=t.replace(/^ +/,"").replace(/=.*/,`=;expires=${(new Date).toUTCString()};path=/`)}catch(e){return Promise.reject(e)}})()}clearAllCookies(){var e=this;return(0,a.Z)(function*(){try{yield e.clearCookies()}catch(t){return Promise.reject(t)}})()}}M("CapacitorCookies",{web:()=>new te});const re=function(){var r=(0,a.Z)(function*(e){return new Promise((t,o)=>{const i=new FileReader;i.onload=()=>{const n=i.result;t(n.indexOf(",")>=0?n.split(",")[1]:n)},i.onerror=n=>o(n),i.readAsDataURL(e)})});return function(t){return r.apply(this,arguments)}}(),Q=(r,e={})=>{const t=Object.assign({method:r.method||"GET",headers:r.headers},e),i=((r={})=>{const e=Object.keys(r);return Object.keys(r).map(i=>i.toLocaleLowerCase()).reduce((i,n,l)=>(i[n]=r[e[l]],i),{})})(r.headers)["content-type"]||"";if("string"==typeof r.data)t.body=r.data;else if(i.includes("application/x-www-form-urlencoded")){const n=new URLSearchParams;for(const[l,s]of Object.entries(r.data||{}))n.set(l,s);t.body=n.toString()}else if(i.includes("multipart/form-data")){const n=new FormData;if(r.data instanceof FormData)r.data.forEach((s,g)=>{n.append(g,s)});else for(const s of Object.keys(r.data))n.append(s,r.data[s]);t.body=n;const l=new Headers(t.headers);l.delete("content-type"),t.headers=l}else(i.includes("application/json")||"object"==typeof r.data)&&(t.body=JSON.stringify(r.data));return t};class se extends K{request(e){return(0,a.Z)(function*(){const t=Q(e,e.webFetchExtra),o=((r,e=!0)=>r?Object.entries(r).reduce((o,i)=>{const[n,l]=i;let s,g;return Array.isArray(l)?(g="",l.forEach(c=>{s=e?encodeURIComponent(c):c,g+=`${n}=${s}&`}),g.slice(0,-1)):(s=e?encodeURIComponent(l):l,g=`${n}=${s}`),`${o}&${g}`},"").substr(1):null)(e.params,e.shouldEncodeUrlParams),i=o?`${e.url}?${o}`:e.url,n=yield fetch(i,t),l=n.headers.get("content-type")||"";let g,c,{responseType:s="text"}=n.ok?e:{};switch(l.includes("application/json")&&(s="json"),s){case"arraybuffer":case"blob":c=yield n.blob(),g=yield re(c);break;case"json":g=yield n.json();break;default:g=yield n.text()}const T={};return n.headers.forEach((D,G)=>{T[G]=D}),{data:g,headers:T,status:n.status,url:n.url}})()}get(e){var t=this;return(0,a.Z)(function*(){return t.request(Object.assign(Object.assign({},e),{method:"GET"}))})()}post(e){var t=this;return(0,a.Z)(function*(){return t.request(Object.assign(Object.assign({},e),{method:"POST"}))})()}put(e){var t=this;return(0,a.Z)(function*(){return t.request(Object.assign(Object.assign({},e),{method:"PUT"}))})()}patch(e){var t=this;return(0,a.Z)(function*(){return t.request(Object.assign(Object.assign({},e),{method:"PATCH"}))})()}delete(e){var t=this;return(0,a.Z)(function*(){return t.request(Object.assign(Object.assign({},e),{method:"DELETE"}))})()}}M("CapacitorHttp",{web:()=>new se})},1273:(B,k,m)=>{m.d(k,{u:()=>E});const E=(0,m(2726).fo)("Preferences",{web:()=>m.e(899).then(m.bind(m,899)).then(b=>new b.PreferencesWeb)})},185:(B,k,m)=>{m.d(k,{u:()=>E});var a=m(6242);let E=(()=>{var b;class I{constructor(){this.currentUser=null,this.loggedInUser=null}setUser(y){this.currentUser=y}getUser(){return this.currentUser}isAuthenticated(){return null!==this.currentUser}setLoggedInUser(y){localStorage.setItem("loggedInUser",y)}getLoggedInUser(){return localStorage.getItem("loggedInUser")}logout(){localStorage.removeItem("loggedInUser")}isLoggedIn(){return!!this.getLoggedInUser()}}return(b=I).\u0275fac=function(y){return new(y||b)},b.\u0275prov=a.Yz7({token:b,factory:b.\u0275fac,providedIn:"root"}),I})()},3076:(B,k,m)=>{m.d(k,{K:()=>y});var a=m(5861),E=m(1273),b=m(6242),I=m(185);let y=(()=>{var L;class O{constructor(f){this.authService=f,this.userStorage="userStorage"}agregarUsuario(f,h){return(0,a.Z)(function*(){yield E.u.set({key:f,value:h})})()}obtenerUsuarios(f){return(0,a.Z)(function*(){return(yield E.u.get({key:f})).value})()}guardarUsuario(f){var h=this;return(0,a.Z)(function*(){const U=yield h.obtenerUsuarios(h.userStorage),p=U?JSON.parse(U):[];p.push(f),yield h.agregarUsuario(h.userStorage,JSON.stringify(p))})()}validarCredenciales(f,h){var U=this;return(0,a.Z)(function*(){const p=yield U.obtenerAlumno(f);return!!p&&(console.log("Usuario obtenido:",p),p.password===h)})()}obtenerAlumno(f){var h=this;return(0,a.Z)(function*(){const U=yield h.obtenerUsuarios(h.userStorage);if(null===U)return null;const p=JSON.parse(U);if(p){console.log("Datos obtenidos:",p);const M=p.find(V=>V.email===f);return console.log("Usuario encontrado:",M),M||null}return console.log("No se encontraron usuarios en los datos."),null})()}obtenerDatosUsuarioActual(){var f=this;return(0,a.Z)(function*(){const h=f.authService.getLoggedInUser();return h?yield f.obtenerAlumno(h):null})()}}return(L=O).\u0275fac=function(f){return new(f||L)(b.LFG(I.u))},L.\u0275prov=b.Yz7({token:L,factory:L.\u0275fac,providedIn:"root"}),O})()}}]);