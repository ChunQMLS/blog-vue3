const t=(t,e=200)=>{let o=0;return(...n)=>new Promise((r=>{o&&(clearTimeout(o),r("cancel")),o=window.setTimeout((()=>{t.apply(void 0,n),o=0,r("done")}),e)}))},e=()=>`${Date.now().toString(36)}${Math.random().toString(36).substring(2)}`;export{e as k,t as x};
