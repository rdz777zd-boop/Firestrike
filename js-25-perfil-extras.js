
(function(){
const q=id=>document.getElementById(id);
const E=t=>String(t).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
let k0='';
function px(){
 try{
  const n=q('pfn'),p=q('prof');if(!n||!p)return;
  let x=q('pfx');if(!x){x=document.createElement('span');x.id='pfx';p.appendChild(x)}
  const nm=(n.textContent||'').trim();
  let tg='',col='#ffba7d',bd='';
  try{if(typeof PC!=='undefined'&&PC&&PC.tag){tg=String(PC.tag).replace(/[^A-Za-z0-9]/g,'').slice(0,3);col=/^#[0-9a-f]{6}$/i.test(PC.col)?PC.col:'#ffba7d'}}catch(e){}
  try{if(typeof ytB==='function'&&nm)bd=ytB(nm)||''}catch(e){}
  const cls=bd?(bd.indexOf('owb')>=0?'ow':'vf'):'';
  const k=nm+'|'+tg+'|'+col+'|'+cls;
  if(k===k0)return;k0=k;
  x.className=cls;
  x.innerHTML=(tg?'<span class="ptg" style="color:'+col+'">['+E(tg)+']</span>':'')+'<span class="pxn">'+E(nm)+'</span>'+bd;
 }catch(e){}
}
try{const n=q('pfn');if(n)new MutationObserver(px).observe(n,{childList:true,characterData:true,subtree:true})}catch(e){}
setInterval(px,1000);px();
})();
