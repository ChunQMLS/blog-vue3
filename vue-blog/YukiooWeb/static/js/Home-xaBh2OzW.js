import{M as a}from"./MainSidebar-YJSewFY6.js";import{v as e,d as t,e as l,f as s}from"./element-plus-C50n0kKT.js";import{g as r,b as o,c as n}from"./index-ex-BpVPP.js";import{u as c}from"./vue-router-w7VblU2R.js";import{d as i,r as d,s as u,X as p,h as v,U as m,o as f,c as g,a as b,K as h,a3 as y,S as w,u as k,ao as j,T as _,M as x,O as C,L as A,am as B,an as D,Q as M,ad as L,a4 as $,J as z,B as S}from"./@vue-HJvXqiKQ.js";import{_ as H}from"./_plugin-vue_export-helper-NGi3vMWx.js";import{o as I}from"./config-p_8hFdbX.js";import{A as Y}from"./ArticleBar-F77Ui8iM.js";import{M as q,N as E,W as F}from"./aboutApi-WILlrg0U.js";import{L as N}from"./LableBar-OULIpiS_.js";import{B as T}from"./BlogEvent-tJ-7twqE.js";import"./dayjs-_EBtpdas.js";import"./copy-to-clipboard-6z1FYTZW.js";import"./toggle-selection-UL9rmEGR.js";import"./@element-plus-9anORygP.js";import"./@vueuse-f9VkAUex.js";import"./lodash-es-plMgWLWd.js";import"./@ctrl-s6KMGca5.js";import"./@popperjs-QJLSoJI5.js";import"./pinia-H_Pi8DHn.js";import"./@codemirror-f2XyNq9l.js";import"./vue3-lazy-LYe7IwOc.js";import"./axios-9BcR6lUQ.js";const U={class:"calendar-box container","element-loading-background":"rgba(122, 122, 122, 0.8)"},W={class:"calendar-table"},X=(a=>(B("data-v-bfd4facc"),a=a(),D(),a))((()=>b("td",{style:{width:"20px"}},null,-1))),J=["colspan"],K={class:"calendar-week-box"},O=["onClick"],Q={class:"calendar-tip"},V=j('<div class="color-bar" data-v-bfd4facc><div class="color-bar-tip" data-v-bfd4facc><div class="color-box bg-blue" data-v-bfd4facc></div><span data-v-bfd4facc> ~0</span></div><div class="color-bar-tip" data-v-bfd4facc><div class="color-box bg-green" data-v-bfd4facc></div><span data-v-bfd4facc> 1~5</span></div><div class="color-bar-tip" data-v-bfd4facc><div class="color-box bg-yellow" data-v-bfd4facc></div><span data-v-bfd4facc> 5~10</span></div><div class="color-bar-tip" data-v-bfd4facc><div class="color-box bg-red" data-v-bfd4facc></div><span data-v-bfd4facc> &gt;10</span></div></div>',1),Z=H(i({name:"Calendar",__name:"Calendar",setup(a){const l=(a,e)=>new Date(a,e,0).getDate(),s=(a,e,t)=>new Date(a,e-1,t).getDay();let o=["bg-none","bg-blue","bg-gray","bg-green","bg-yellow","bg-red"];const n=(a,e)=>{if(void 0!==e){if(-1===e)return o[0];if(0===e){const e=Date.parse(a),t=Date.now();return e!==t&&e<t?o[1]:o[2]}return e<=5?o[3]:e<=10?o[4]:o[5]}};let i=d((new Date).getFullYear());const j=d([]),B=u((()=>j.value.filter((a=>a.date.split("-")[0]===i.value.toString())))),D=p((()=>{let a=[];for(let e=1;e<=12;e++){let t=l(i.value,e);a.push({month:e,days:t})}return a})()),M=u((()=>{let a=[],e=0;for(let t=1;t<=12;t++){let r=l(i.value,t);for(let l=1;l<=r;l++){const r=`${i.value}-${1===t.toString().length?"0"+t:t}-${1===l.toString().length?"0"+l:l}`,o=B.value[e];o&&o.date===r?(a.push({date:o.date,week:s(i.value,t,l),count:o.count}),e++):a.push({date:r,week:s(i.value,t,l),count:0})}}return a})),L=["日","一","二","三","四","五","六"],$=u((()=>{let a=[];for(let e=0;e<=6;e++){let t={week:L[e],weekCode:e,days:M.value.filter((a=>a.week==e))};a.push(t)}return((a,e)=>{let t=s((new Date).getFullYear(),1,1);const l={date:"",week:-1,count:-1};for(let s=0;s<t;s++)a[s].days.unshift(l);let r=(e+t)%7;if(r>0)for(let s=6;s>r-1;s--)a[s].days.push(l)})(a,M.value.length),a}));v((()=>{r().then((a=>{j.value=a}))}));const z=c();return(a,l)=>{const r=t,o=e;return m((f(),g("div",U,[b("div",W,[b("table",null,[b("thead",null,[b("tr",null,[X,(f(!0),g(h,null,y(D,(a=>(f(),g("td",{colspan:1===a.month?Math.ceil((s(k(i),a.month,1)+a.days)/7):Math.ceil((s(k(i),a.month,1)+a.days)/7)-1,key:a.month},w(a.month+"月"),9,J)))),128))])]),b("tbody",null,[(f(!0),g(h,null,y($.value,(a=>(f(),g("tr",{class:"calendar-week",key:a.weekCode},[b("td",K,[b("span",{class:"calendar-week-text",style:_(a.weekCode%2==0?{"clip-path":"Circle(0)"}:{"clip-path":"None"})},w(a.week),5)]),(f(!0),g(h,null,y(a.days,((a,e)=>(f(),x(r,{class:"box-item",effect:"dark","show-after":50,"hide-after":50,disabled:-1===a.count,content:`${a.date}更新文章${a.count}篇`,placement:"top",key:e},{default:C((()=>[b("td",{class:A(["calendar-day",n(a.date,a.count)]),onClick:e=>{return t=a.date,void z.push({name:"Archives",query:{date:t}});var t}},null,10,O)])),_:2},1032,["disabled","content"])))),128))])))),128))])])]),b("div",Q,[b("div",null,[b("span",null,w(k(i)+"年博客更新动态"),1)]),V])])),[[o,!(j.value.length>0)]])}}}),[["__scopeId","data-v-bfd4facc"]]),G={class:"block container"},P={class:"lantern-slide-album"},R=["onClick"],aa={class:"lantern-slide-image"},ea=["src"],ta={class:"lantern-slide-info"},la={class:"lantern-slide-date"},sa={class:"lantern-slide-theme"},ra=["title"],oa=H(i({name:"CarouselArticles",__name:"CarouselArticles",props:{articles:{}},setup(a){const e=c();return(a,t)=>{const r=s,o=l;return f(),g("div",G,[M(o,{direction:"vertical",autoplay:!0},{default:C((()=>[(f(!0),g(h,null,y(a.articles,((a,t)=>(f(),x(r,{key:t},{default:C((()=>[b("div",P,[b("div",{class:"lantern-slide-item",onClick:t=>{return l=a.id,void e.push({name:"Blog",params:{id:l}});var l}},[b("div",aa,[b("img",{src:k(I)+a.image+"?x-oss-process=image/resize,m_fill,h_200,w_200/format,webp",alt:""},null,8,ea)]),b("div",ta,[b("div",la,w(a.releasedate),1),b("div",sa,w(a.title),1),b("div",{class:"lantern-slide-intro",title:a.intro},w(a.intro),9,ra)])],8,R)])])),_:2},1024)))),128))])),_:1})])}}}),[["__scopeId","data-v-c7872802"]]),na=a=>(B("data-v-9b64c312"),a=a(),D(),a),ca={class:"category-bar container"},ia=["onClick"],da={class:"category-text"},ua=[na((()=>b("path",{d:"M881 562H81c-27.6 0-50-22.4-50-50s22.4-50 50-50h800c27.6 0 50 22.4 50 50s-22.4 50-50 50z","p-id":"1461"},null,-1))),na((()=>b("path",{d:"M907.6 540.7L695.5 328.6c-19.5-19.5-19.5-51.2 0-70.7s51.2-19.5 70.7 0L978.4 470c19.5 19.5 19.5 51.2 0 70.7-19.6 19.6-51.2 19.6-70.8 0z","p-id":"1462"},null,-1))),na((()=>b("path",{d:"M695.5 695.4l212.1-212.1c19.5-19.5 51.2-19.5 70.7 0s19.5 51.2 0 70.7L766.2 766.1c-19.5 19.5-51.2 19.5-70.7 0s-19.5-51.2 0-70.7z","p-id":"1463"},null,-1)))],pa=H(i({name:"CategoryBar",__name:"CategoryBar",setup(a){const e=o(),t=p({width:"1em",height:"1em",verticalAlign:"middle",fill:"currentColor",overflow:"hidden"}),l=c();return(a,s)=>{const r=L("router-link");return f(),g("div",ca,[(f(!0),g(h,null,y(k(e).category.slice(0,6),((a,e)=>(f(),g("div",{class:"category-item",key:e,onClick:e=>{return t=a.category,void l.push({name:"Archives",query:{category:t}});var t}},[b("span",da,w(a.category+` (${a.lables.length})`),1),b("span",null,[(f(),g("svg",{style:_(t),t:"1709630571326",class:"icon",viewBox:"0 0 1024 1024",version:"1.1",xmlns:"http://www.w3.org/2000/svg","p-id":"1460",width:"128",height:"128"},ua,4))])],8,ia)))),128)),k(e).category.length>=6?(f(),x(r,{key:0,class:"more",to:"/category"},{default:C((()=>[$(" 查看更多 ")])),_:1})):z("",!0)])}}}),[["__scopeId","data-v-9b64c312"]]),va={class:"sticky-layout"},ma=i({name:"Home",__name:"Home",setup(e){const t=d({hot:[],recommend:[]}),l=u((()=>t.value.recommend.filter((a=>{if(!t.value.hot.includes(a))return a}))));return S((()=>{n().then((a=>{t.value=a}))})),(e,s)=>(f(),x(a,null,{left:C((()=>[M(Z),M(oa,{articles:t.value.hot},null,8,["articles"]),M(pa),M(Y,{articles:l.value},null,8,["articles"])])),right:C((()=>[M(q),M(E),M(N),b("div",va,[M(T),M(F)])])),_:1}))}});export{ma as default};