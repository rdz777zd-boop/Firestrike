
(function(){const wrap=g=>{if(g.__o)return;g.__o=1;const n=g.getAttribute('data-own')||g.getAttribute('data-vn')||'',own=g.hasAttribute('data-own');if(!n)return;let t=g.previousSibling;while(t&&t.nodeType===3&&!t.nodeValue.trim())t=t.previousSibling;if(!t||t.nodeType!==3)return;
const v=t.nodeValue,i=v.toLowerCase().lastIndexOf(n.toLowerCase());if(i<0)return;const sp=document.createElement('span');sp.className=own?'ownm':'vnm';sp.textContent=v.slice(i,i+n.length);const rest=v.slice(i+n.length);t.nodeValue=v.slice(0,i);t.after(sp);if(rest)sp.after(document.createTextNode(rest))};
const scan=r=>{try{(r.matches&&r.matches('svg.owb,img.vb')?[r]:r.querySelectorAll?r.querySelectorAll('svg.owb,img.vb'):[]).forEach(wrap)}catch(e){}};
new MutationObserver(ms=>{for(const m of ms)for(const nd of m.addedNodes)if(nd.nodeType===1)scan(nd)}).observe(document.documentElement,{childList:true,subtree:true});scan(document.documentElement)})();
