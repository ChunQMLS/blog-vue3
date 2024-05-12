import{a8 as t,r as e,a7 as n,w as s,X as o,v as a,ak as c,a9 as r,t as i,g as u,b as f,n as p,al as l,aa as h,s as d}from"./@vue-HJvXqiKQ.js";
/*!
 * pinia v2.1.7
 * (c) 2023 Eduardo San Martin Morote
 * @license MIT
 */
let y;const v=t=>y=t,b=Symbol();function _(t){return t&&"object"==typeof t&&"[object Object]"===Object.prototype.toString.call(t)&&"function"!=typeof t.toJSON}var j,O;function $(){const s=t(!0),o=s.run((()=>e({})));let a=[],c=[];const r=n({install(t){v(r),r._a=t,t.provide(b,r),t.config.globalProperties.$pinia=r,c.forEach((t=>a.push(t))),c=[]},use(t){return this._a?a.push(t):c.push(t),this},_p:a,_a:null,_e:s,_s:new Map,state:o});return r}(O=j||(j={})).direct="direct",O.patchObject="patch object",O.patchFunction="patch function";const g=()=>{};function m(t,e,n,s=g){t.push(e);const o=()=>{const n=t.indexOf(e);n>-1&&(t.splice(n,1),s())};return!n&&u()&&f(o),o}function P(t,...e){t.slice().forEach((t=>{t(...e)}))}const S=t=>t();function w(t,e){t instanceof Map&&e instanceof Map&&e.forEach(((e,n)=>t.set(n,e))),t instanceof Set&&e instanceof Set&&e.forEach(t.add,t);for(const n in e){if(!e.hasOwnProperty(n))continue;const s=e[n],o=t[n];_(o)&&_(s)&&t.hasOwnProperty(n)&&!a(s)&&!c(s)?t[n]=w(o,s):t[n]=s}return t}const E=Symbol();const{assign:x}=Object;function I(n,i,u={},f,l,h){let d;const y=x({actions:{}},u),b={deep:!0};let O,$,I,M=[],k=[];const A=f.state.value[n];let F;function C(t){let e;O=$=!1,"function"==typeof t?(t(f.state.value[n]),e={type:j.patchFunction,storeId:n,events:I}):(w(f.state.value[n],t),e={type:j.patchObject,payload:t,storeId:n,events:I});const s=F=Symbol();p().then((()=>{F===s&&(O=!0)})),$=!0,P(M,e,f.state.value[n])}h||A||(f.state.value[n]={}),e({});const J=h?function(){const{state:t}=u,e=t?t():{};this.$patch((t=>{x(t,e)}))}:g;function N(t,e){return function(){v(f);const s=Array.from(arguments),o=[],a=[];let c;P(k,{args:s,name:t,store:X,after:function(t){o.push(t)},onError:function(t){a.push(t)}});try{c=e.apply(this&&this.$id===n?this:X,s)}catch(r){throw P(a,r),r}return c instanceof Promise?c.then((t=>(P(o,t),t))).catch((t=>(P(a,t),Promise.reject(t)))):(P(o,c),c)}}const W={_p:f,$id:n,$onAction:m.bind(null,k),$patch:C,$reset:J,$subscribe(t,e={}){const o=m(M,t,e.detached,(()=>a())),a=d.run((()=>s((()=>f.state.value[n]),(s=>{("sync"===e.flush?$:O)&&t({storeId:n,type:j.direct,events:I},s)}),x({},b,e))));return o},$dispose:function(){d.stop(),M=[],k=[],f._s.delete(n)}},X=o(W);f._s.set(n,X);const q=(f._a&&f._a.runWithContext||S)((()=>f._e.run((()=>(d=t()).run(i)))));for(const t in q){const e=q[t];if(a(e)&&(!a(B=e)||!B.effect)||c(e))h||(!A||_(z=e)&&z.hasOwnProperty(E)||(a(e)?e.value=A[t]:w(e,A[t])),f.state.value[n][t]=e);else if("function"==typeof e){const n=N(t,e);q[t]=n,y.actions[t]=e}}var z,B;return x(X,q),x(r(X),q),Object.defineProperty(X,"$state",{get:()=>f.state.value[n],set:t=>{C((e=>{x(e,t)}))}}),f._p.forEach((t=>{x(X,d.run((()=>t({store:X,app:f._a,pinia:f,options:y}))))})),A&&h&&u.hydrate&&u.hydrate(X.$state,A),O=!0,$=!0,X}function M(t,e,s){let o,a;const c="function"==typeof e;function r(t,s){const r=l();(t=t||(r?i(b,null):null))&&v(t),(t=y)._s.has(o)||(c?I(o,e,a,t):function(t,e,s,o){const{state:a,actions:c,getters:r}=e,i=s.state.value[t];let u;u=I(t,(function(){i||(s.state.value[t]=a?a():{});const e=h(s.state.value[t]);return x(e,c,Object.keys(r||{}).reduce(((e,o)=>(e[o]=n(d((()=>{v(s);const e=s._s.get(t);return r[o].call(e,e)}))),e)),{}))}),e,s,0,!0)}(o,a,t));return t._s.get(o)}return"string"==typeof t?(o=t,a=c?s:e):(a=t,o=t.id),r.$id=o,r}export{$ as c,M as d};
