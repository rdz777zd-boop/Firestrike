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
async function lookupId(d,rec){let v='';
 try{const a=rec&&String(rec.aid||'');if(a&&IDRE.test(a)&&await verifyAid(a,d.n))v=a}catch(e){}
 if(!v&&window.arrIdOfNick){try{v=(await window.arrIdOfNick(d.n))||''}catch(e){}}
 return v}
/* etiquetas no perfil: ID da conta e "dados de ha X" (mostra por que um jogador antigo nao muda) */
function badges(S){const h=document.querySelector('#ppg .hero .hsub');if(!h)return;
 let e=h.querySelector('.pidx'),f=h.querySelector('.pidf');
 if(!e){e=document.createElement('span');e.className='pid pidx';h.appendChild(e)}
 e.textContent=S.id?'ID '+S.id:(S.done?'ID: sem conta':'ID …');
 e.title=S.id?'ID da conta':'Sem ID de conta: o jogador nunca entrou com conta ou o ID ainda não foi confirmado';
 const t=S.rec?(+S.rec.t||0):0;
 const txt=S.rec?(t?'dados de '+ago(t):'dados do servidor'):(S.done?'sem registro online':'');
 if(txt){if(!f){f=document.createElement('span');f.className='pid pidf';f.style.opacity='.7';h.appendChild(f)}f.textContent=txt;f.title='Última vez que o servidor recebeu mudanças deste jogador'}else if(f)f.remove()}
function live(d){const my=++tok;clearTimeout(timer);const S={id:'',done:0,rec:null};let tried=0,ln='';
 const alive=()=>my===tok&&q('ppf')&&!q('ppf').classList.contains('hide');
 const paint=()=>{try{badges(S)}catch(e){}};
 paint();
 const step=async()=>{
  if(!alive())return;
  let uid=uidOf(d);
  if(!uid&&!tried&&window.arrFind){tried=1;try{await window.arrFind(d.n)}catch(e){}uid=uidOf(d)}
  if(!alive())return;
  const rec=uid?await fetchRec(uid):null;
  if(!alive())return;
  S.rec=rec;
  if(rec){const s0=sig(d);merge(d,rec);
   if(sig(d)!==s0){const P=q('ppf'),sc=P.scrollTop;o0.call(null,d);P.scrollTop=sc}}
  paint();
  const key=d.n.toLowerCase()+'|'+String(rec&&rec.aid||'');
  if(!S.id||key!==ln){ln=key;const v=await lookupId(d,rec);if(!alive())return;S.id=v;S.done=1;paint()}
  else S.done=1;
  timer=setTimeout(step,10000)};
 step()}
ppOpen=function(d){const r=o0.apply(this,arguments);try{if(d&&!d.me)live(d);else{tok++;if(d&&d.me)ownBadge()}}catch(e){}return r};
})();
