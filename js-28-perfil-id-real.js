/* ===== PERFIL DO JOGADOR: ID verdadeiro + dados atualizados (v173) =====
   Ao tocar em um jogador (ranking, amigos...), o perfil mostra o ID da conta dele
   e busca os dados mais recentes no servidor, atualizando enquanto o perfil estiver aberto. */
(function(){
if(typeof ppOpen!=='function'||window.__ppReal)return;window.__ppReal=1;
const DB='https://armada-relay.rdz777zd.workers.dev/db',UIDRE=/^[a-z0-9]{12,24}$/,CIDRE=/^[a-z0-9]{12,24}_u\d{10,16}$/,q=id=>document.getElementById(id);
const o0=ppOpen;let tok=0,timer=0;
const num=(v,m)=>{v=Math.floor(+v);return v>0?Math.min(v,m):0};
const sn=(v,n)=>String(v==null?'':v).replace(/[^\p{L}\p{N} _.-]/gu,'').replace(/\s+/g,' ').trim().slice(0,n);
const colr=v=>/^#[0-9a-f]{6}$/i.test(String(v))?v:'#8b9bb2';
async function fetchRec(uid){const c=new AbortController(),t=setTimeout(()=>c.abort(),9000);
 try{const r=await fetch(DB+'/players/'+uid+'.json',{signal:c.signal,cache:'no-store'});if(!r.ok)return null;const v=await r.json();return v&&typeof v=='object'?v:null}catch(e){return null}finally{clearTimeout(t)}}
function uidOf(d){if(UIDRE.test(String(d.key||'')))return d.key;try{const p=window.arrPlayerByName&&window.arrPlayerByName(d.n);if(p&&UIDRE.test(String(p.key||'')))return p.key}catch(e){}return''}
const sig=d=>[d.n,d.k,d.w,d.g,d.rp,d.rg,d.rw,d.rt,d.ch,d.tj,JSON.stringify(d.eq||0),d.ep,d.er,d.c?d.c.tag+'|'+d.c.n+'|'+d.c.col:''].join('~');
function merge(d,r){
 const n=sn(r.n,12);if(n)d.n=n;
 d.k=num(r.k,1e7);d.w=num(r.w,1e7);d.g=num(r.g,1e7);d.rp=num(r.rp,1e6);d.rg=num(r.rg,1e7);d.rw=num(r.rw,1e7);d.rt=num(r.rt,1e7);
 const ch=Math.floor(+r.ch),cl=(typeof CHS!=='undefined'&&CHS.length)||10;if(ch>=0&&ch<cl)d.ch=ch;
 try{const tj=String(r.tj||'');d.tj=(typeof TRAJES!=='undefined'&&TRAJES.some(k=>k.id&&k.id===tj))?tj:''}catch(e){}
 if(r.eq&&typeof r.eq=='object'){const o={};let c=0;for(const k in r.eq){const a=Math.floor(+k),b=Math.floor(+r.eq[k]);if(a>0&&a<100&&b>0&&b<1000&&c<40){o[a]=b;c++}}d.eq=o}
 d.ep=num(r.ep,999);d.er=num(r.er,999);
 if(r.cid&&CIDRE.test(String(r.cid))){
  const tag=String(r.ct||'').toUpperCase().replace(/[^A-Z0-9]/g,'').slice(0,3)||'CLA',nm=sn(r.cn,20)||'Clã',col=colr(r.cc);
  if(!(d.c&&d.c.tag===tag&&d.c.n===nm&&d.c.col===col)){
   const sl=(typeof SYM!=='undefined'&&SYM.length)||8,sy=Math.floor(+r.cs);let id=r.cid;
   try{if(typeof PC!=='undefined'&&PC&&PC.tag===tag&&PC.n===nm)id=PC.id}catch(e){}
   d.c={id,n:nm,tag,col,sym:(sy>=0&&sy<sl)?sy:0}}}
 else d.c=null}
function showId(id){const h=document.querySelector('#ppg .hero .hsub');if(!h)return;let e=h.querySelector('.pid');
 if(!id){if(e)e.remove();return}
 if(!e){e=document.createElement('span');e.className='pid';h.appendChild(e)}
 e.title='ID da conta';e.textContent='ID '+id}
function live(d){const my=++tok;clearTimeout(timer);let id='',tried=0;
 const alive=()=>my===tok&&q('ppf')&&!q('ppf').classList.contains('hide');
 const idp=()=>{if(!window.arrIdOfNick)return;const n=d.n;window.arrIdOfNick(n).then(v=>{if(!alive()||n!==d.n)return;id=v||'';showId(id)}).catch(()=>{})};
 idp();
 const step=async()=>{
  if(!alive())return;
  let uid=uidOf(d);
  if(!uid&&!tried&&window.arrFind){tried=1;try{await window.arrFind(d.n)}catch(e){}uid=uidOf(d)}
  if(!alive())return;
  const rec=uid?await fetchRec(uid):null;
  if(!alive())return;
  if(rec){const s0=sig(d),n0=d.n;merge(d,rec);
   if(sig(d)!==s0){o0.call(null,d);showId(id);if(d.n!==n0){id='';idp()}}}
  timer=setTimeout(step,10000)};
 step()}
ppOpen=function(d){const r=o0.apply(this,arguments);try{if(d&&!d.me)live(d);else tok++}catch(e){}return r};
})();
