
/* ===== PERFIL v141: foto de perfil e banner (salvos no aparelho) ===== */
(function(){
const q=id=>document.getElementById(id),K={a:'fs_pav',b:'fs_pbn'};
const get=k=>{try{return localStorage.getItem(k)||''}catch(e){return ''}};
const say=t=>{const m=q('pfmsg');if(m)m.textContent=t;try{soon(t)}catch(e){}};
const st=q('stage'),pr=q('prof');
if(st&&pr){const c=document.createElement('div');c.id='pcard';c.innerHTML='<span class="nm" id="pcn"></span><span class="sb" id="pcs"></span>';st.insertBefore(c,pr)}
const E=t=>String(t).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
{const cs=document.createElement('style');cs.textContent='#menu#menu #pcard .nm{font-size:calc(var(--u)*36)}#menu#menu #pcard .nm .ptg{font-weight:900;margin-right:.15em;text-shadow:0 2px 6px #000}#menu#menu #pcard .nm .ytb{width:1.15em;height:1.15em;vertical-align:-.25em;margin-left:.25em}';document.head.appendChild(cs)}
let pcK='';
function sync(){const n=q('pfn'),r=q('rec'),a=q('pcn'),b=q('pcs');
 if(a&&n){const nm=n.textContent||'';let tg='',col='#ffba7d',bd='';
  try{if(typeof PC!=='undefined'&&PC&&PC.tag){tg=String(PC.tag).replace(/[^A-Za-z0-9]/g,'').slice(0,3);col=/^#[0-9a-f]{6}$/i.test(PC.col)?PC.col:'#ffba7d'}}catch(e){}
  try{if(typeof ytB==='function'&&nm)bd=ytB(nm)}catch(e){}
  const k=nm+'|'+tg+'|'+col+'|'+(bd?(bd.indexOf('owb')>=0?'o':'v'):'');
  if(k!==pcK){pcK=k;a.innerHTML=(tg?'<span class="ptg" style="color:'+col+'">['+E(tg)+']</span> ':'')+E(nm)+bd}}
 if(b&&r)b.textContent=r.textContent}
function apply(){
 const a=get(K.a),b=get(K.b),m=q('menu');
 if(m)m.style.setProperty('--fsav',a?'url("'+a+'")':'none');
 if(pr)pr.classList.toggle('hasimg',!!a);
 const c=q('pcard');if(c)c.style.backgroundImage=b?'url("'+b+'")':'';
 const pf=q('pfav');if(pf){const s=pf.firstElementChild;if(a){pf.style.setProperty('background','url("'+a+'") center/cover no-repeat','important');if(s)s.style.display='none'}else{pf.style.removeProperty('background');if(s)s.style.display=''}}
 const bp=q('fsbp');if(bp){bp.style.backgroundImage=b?'url("'+b+'")':'';bp.classList.toggle('on',!!b)}
 sync();
}
function pick(kind){
 const i=document.createElement('input');i.type='file';i.accept='image/*';
 i.onchange=()=>{const f=i.files&&i.files[0];if(!f)return;const r=new FileReader();
  r.onload=()=>{const im=new Image();
   im.onload=()=>{const W=kind=='a'?256:900,H=kind=='a'?256:340,c=document.createElement('canvas');c.width=W;c.height=H;
    const x=c.getContext('2d'),s=Math.max(W/im.width,H/im.height),w=im.width*s,h=im.height*s;x.drawImage(im,(W-w)/2,(H-h)/2,w,h);
    try{localStorage.setItem(K[kind],c.toDataURL('image/jpeg',.85))}catch(e){say('Sem espaço para salvar a imagem');return}
    try{localStorage.removeItem(KS[kind])}catch(e){}delete tried[kind];window.fsSmall();
    apply();inject();say(kind=='a'?'Foto de perfil atualizada':'Banner atualizado')};
   im.onerror=()=>say('Imagem inválida');im.src=r.result};
  r.readAsDataURL(f)};
 i.click();
}
/* versoes pequenas (vao para o ranking online) */
const KS={a:'fs_pav_u',b:'fs_pbn_u'},tried={};
const pubN=()=>{try{window.arrPub&&window.arrPub()}catch(e){}};
function mkS(kind,src){if(tried[kind])return;tried[kind]=1;const im=new Image();
 im.onload=()=>{const W=kind=='a'?64:240,H=kind=='a'?64:72,c=document.createElement('canvas');c.width=W;c.height=H;const x=c.getContext('2d'),s=Math.max(W/im.width,H/im.height),w=im.width*s,h=im.height*s;x.drawImage(im,(W-w)/2,(H-h)/2,w,h);
  try{localStorage.setItem(KS[kind],c.toDataURL('image/jpeg',.5))}catch(e){}pubN()};
 im.src=src}
window.fsSmall=function(){const a=get(K.a),b=get(K.b),r={a:'',b:''};
 if(a){r.a=get(KS.a);if(!r.a)mkS('a',a)}else{try{localStorage.removeItem(KS.a)}catch(e){}}
 if(b){r.b=get(KS.b);if(!r.b)mkS('b',b)}else{try{localStorage.removeItem(KS.b)}catch(e){}}
 return r};
window.arrPpDecor=function(d,L){if(!d||d.me)return;
 const put=()=>{const p=(window.arrPlayerByName&&window.arrPlayerByName(d.n))||{},a=d.av||p.av||'',b=d.bn||p.bn||'';if(!a&&!b)return;
  L.querySelectorAll('.fsbn,.fsav').forEach(e=>e.remove());
  const bn=document.createElement('div');bn.className='fsbn';bn.style.cursor='default';if(b)bn.style.backgroundImage='url("'+b+'")';L.insertBefore(bn,L.firstChild);
  if(a){const v=document.createElement('div');v.className='fsav';v.style.cursor='default';v.style.backgroundImage='url("'+a+'")';bn.after(v)}};
 put();
 try{if(window.arrFind&&!L.__fd){L.__fd=1;window.arrFind(d.n).then(()=>{if(L.isConnected)put()}).catch(()=>{})}}catch(e){}};
/* painel EDITAR PERFIL */
const pfp=q('pfp'),av=q('pfav');
if(pfp&&av){
 const bp=document.createElement('div');bp.id='fsbp';bp.onclick=()=>pick('b');av.before(bp);
 av.onclick=()=>pick('a');
 const ed=document.createElement('div');ed.id='fsed';
 ed.innerHTML='<div class="fsr"><button type="button" class="btn sec" id="fsa">TROCAR FOTO</button><button type="button" class="btn sec" id="fsb">TROCAR BANNER</button></div><button type="button" class="btn sec" id="fsx">REMOVER FOTOS</button>';
 av.after(ed);
 q('fsa').onclick=()=>pick('a');q('fsb').onclick=()=>pick('b');
 q('fsx').onclick=()=>{try{localStorage.removeItem(K.a);localStorage.removeItem(K.b);localStorage.removeItem('fs_pav_s');localStorage.removeItem('fs_pbn_s');localStorage.removeItem('fs_pav_u');localStorage.removeItem('fs_pbn_u')}catch(e){}apply();inject();say('Fotos removidas');pubN()};
}
/* perfil do jogador (so o proprio) */
function inject(){
 const P=q('ppf');if(!P||P.classList.contains('hide'))return;
 const me=[...(q('ppb')?q('ppb').children:[])].some(b=>/EDITAR PERFIL/i.test(b.textContent));
 const L=document.querySelector('#ppg .pl');if(!L||!me)return;
 L.querySelectorAll('.fsbn,.fsav').forEach(e=>e.remove());
 const b=get(K.b),a=get(K.a),bn=document.createElement('div');bn.className='fsbn';if(b)bn.style.backgroundImage='url("'+b+'")';bn.title='Trocar banner';
 bn.onclick=()=>pick('b');L.insertBefore(bn,L.firstChild);
 if(a){const v=document.createElement('div');v.className='fsav';v.style.backgroundImage='url("'+a+'")';v.title='Trocar foto';v.onclick=()=>pick('a');bn.after(v)}
}
try{const P=q('ppf');if(P)new MutationObserver(inject).observe(P,{attributes:true,attributeFilter:['class']});const g=q('ppg');if(g)new MutationObserver(inject).observe(g,{childList:true})}catch(e){}
try{['pfn','rec'].forEach(id=>{const e=q(id);if(e)new MutationObserver(sync).observe(e,{childList:true,characterData:true,subtree:true})})}catch(e){}
setInterval(sync,1500);apply();
})();
