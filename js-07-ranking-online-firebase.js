
/* ===== RANKING ONLINE COMPARTILHADO (Firebase Realtime Database via REST) =====
   Cole abaixo a URL do seu Realtime Database, ex.: https://meujogo-default-rtdb.firebaseio.com
   Regras sugeridas (aba "Regras" do Firebase):
   { "rules": {
       "players":   { ".read": true, ".indexOn": ["k","w","rp","n"], "$uid": { ".write": true } },
       "clans":     { ".read": true, "$key": { ".write": true } },
       "clanstats": { ".read": true, "$key": { "$uid": { ".write": true } } },
       "requests":  { ".read": true, "$key": { "$uid": { ".write": true } } },
       "inbox":     { "$uid": { ".read": true, ".write": true } }
   } }
   Sem URL configurada, o jogo continua com o ranking local de antes. */
const ARR_DB_URL='https://armada-relay.rdz777zd.workers.dev/db';
(function(){
let base=ARR_DB_URL;
try{const q=new URLSearchParams(location.search).get('db');if(q)localStorage.setItem('arr_dburl',q);base=base||localStorage.getItem('arr_dburl')||''}catch(e){}
base=String(base||'').trim().replace(/\/+$/,'');
const ON=/^https:\/\/[a-z0-9-]+(\.[a-z0-9-]+)*\.(firebaseio\.com|firebasedatabase\.app|workers\.dev(\/db)?)$/i.test(base);

const REM={raw:{P:{},C:{},S:{},R:{}},req:{},lastReq:-1,list:[],byId:{},agg:{},mem:{},players:{},ok:0,err:0,n:0};
const UIDRE=/^[a-z0-9]{12,24}$/,KEYRE=/^[a-z0-9]{12,24}_u\d{10,16}$/;
const sn=(v,n)=>String(v==null?'':v).replace(/[^\p{L}\p{N} _.-]/gu,'').replace(/\s+/g,' ').trim().slice(0,n);
const num=(v,max)=>{v=Math.floor(+v);return v>0?Math.min(v,max):0};
const colr=v=>/^#[0-9a-f]{6}$/i.test(String(v))?v:'#8b9bb2';
const tagc=v=>String(v||'').toUpperCase().replace(/[^A-Z0-9]/g,'').slice(0,3);
const symc=v=>{const n=(typeof SYM!='undefined'&&SYM.length)||8;v=Math.floor(+v);return v>=0&&v<n?v:0};
const IMGRE=/^data:image\/jpeg;base64,[A-Za-z0-9+\/]{20,16000}={0,2}$/;
const imgc=v=>(typeof v=='string'&&IMGRE.test(v))?v:'';
const chc=v=>{v=Math.floor(+v);const n=(typeof CHS!='undefined'&&CHS.length)||10;return v>=0&&v<n?v:-1};
const tjc=v=>{v=String(v||'');try{return TRAJES.some(k=>k.id&&k.id===v)?v:''}catch(e){return ''}};
const eqc=v=>{const o={};if(v&&typeof v=='object'){let n=0;for(const k in v){const a=Math.floor(+k),b=Math.floor(+v[k]);if(a>0&&a<100&&b>0&&b<1000&&n<40){o[a]=b;n++}}}return o};
const idc=v=>{v=Math.floor(+v);return v>0&&v<1000?v:0};
window.arrAvByName=(n,id)=>{const a=REM.mav&&REM.mav[id];return(a&&a[n])||(REM.nm&&REM.nm[n]&&REM.nm[n].av)||''};
window.arrPlayerByName=n=>(REM.nm&&REM.nm[n])||null;
window.arrBnByName=n=>(REM.nm&&REM.nm[n]&&REM.nm[n].bn)||'';
const ENS={};window.arrEnsure=(n,cb)=>{if(!window.ARR_USER||!n)return;const r=REM.nm&&REM.nm[n];if(r&&(r.av||r.bn))return;if(ENS[n]&&Date.now()-ENS[n]<30000)return;ENS[n]=Date.now();window.arrFind(n).then(()=>{if(cb)cb()}).catch(()=>{})};
REM.extra={};REM.pic={};
const hsh=t=>{let h=5381;t=String(t);for(let i=0;i<t.length;i++)h=((h*33)^t.charCodeAt(i))>>>0;return h.toString(36)};
const picA=u=>{const p=REM.pic&&REM.pic[u];return(p&&p.a)||''},picB=u=>{const p=REM.pic&&REM.pic[u];return(p&&p.b)||''};
async function picLoad(uids,force){
 const now=Date.now(),need=[...new Set(uids)].filter(u=>UIDRE.test(u)&&u!==UID&&(force||!REM.pic[u]||now-REM.pic[u].ts>((REM.pic[u].a||REM.pic[u].b)?300000:60000))).slice(0,20);
 if(!need.length)return 0;
 need.forEach(u=>{REM.pic[u]=Object.assign({a:'',b:''},REM.pic[u],{ts:now})});
 let r=null;try{r=await J('/pics.json?ids='+need.join(','))}catch(e){return 0}
 let ch=0;need.forEach(u=>{const v=r&&r[u],a=v?imgc(v.a):'',b=v?imgc(v.b):'',o=REM.pic[u];if((o.a||'')!==a||(o.b||'')!==b)ch=1;REM.pic[u]={a,b,h:(a||b)?hsh(a+'|'+b):'',t:(v&&+v.t)||0,ts:Date.now()}});
 if(ch)rebuild();return ch}
let pollB=0;
async function picPoll(){
 if(pollB||document.hidden||!window.ARR_USER)return;
 const m=document.getElementById('menu');if(!m||m.classList.contains('hide'))return;
 const ids=Object.keys(REM.pic).filter(u=>u!==UID&&UIDRE.test(u)).slice(-60);if(!ids.length)return;
 pollB=1;
 try{const ch=[];for(let i=0;i<ids.length;i+=20){const part=ids.slice(i,i+20),r=await J('/pics.json?t=1&ids='+part.join(','));if(!r||typeof r!='object')continue;for(const u of part){const v=r[u];if(v&&typeof v=='object')continue;const o=REM.pic[u];if(o&&(o.t||0)!==(+v||0))ch.push(u)}}
  if(ch.length){const x=await picLoad(ch.slice(0,20),1);if(x)refreshUI()}}catch(e){}
 pollB=0}
setInterval(picPoll,5000);
window.arrPlayers=()=>Object.values(REM.players||{});
const encq=v=>encodeURIComponent(JSON.stringify(v));
window.arrFind=async q=>{q=sn(q,12);if(!q)return[];
 const vs=[...new Set([q,q.toLowerCase(),q.toUpperCase(),q.charAt(0).toUpperCase()+q.slice(1).toLowerCase()])];
 const rs=await Promise.all(vs.map(v=>J('/players.json?orderBy='+encq('n')+'&startAt='+encq(v)+'&endAt='+encq(v+'\uf8ff')+'&limitToFirst=8').catch(()=>null)));
 let add=0;for(const r of rs){if(!r||typeof r!='object')continue;for(const u in r){if(UIDRE.test(u)&&r[u]&&typeof r[u]=='object'){REM.extra[u]=r[u];add=1}}}
 if(add){REM.raw.P=Object.assign({},REM.extra,REM.raw.P);rebuild()}
 try{const ks=window.arrPlayers().filter(p=>p.n.toLowerCase().includes(q.toLowerCase())).slice(0,8).map(p=>p.key);await picLoad(ks,1)}catch(e){}
 return window.arrPlayers().filter(p=>p.n.toLowerCase().includes(q.toLowerCase()))};
window.arrFrSend=async(n,kind)=>{let t=window.arrPlayerByName(n);if(!t){await window.arrFind(n);t=window.arrPlayerByName(n)}
 if(!t||!UIDRE.test(t.key))throw new Error('x');
 await put('/inbox/'+t.key+'/'+UID,{f:kind,n:sn(PN,12)||'Jogador',t:Date.now()})};
async function friendInbox(I){if(!window.ARR_USER||!window.arrFrIn||!I||typeof I!='object')return;
 for(const u in I){if(!UIDRE.test(u)||u===UID)continue;const r=I[u];if(!r||typeof r!='object'||(r.f!=='req'&&r.f!=='acc'&&r.f!=='dec'&&r.f!=='rem'))continue;
  const n=sn(r.n,12);if(n){try{window.arrFrIn(n,r.f)}catch(e){}}try{await del('/inbox/'+UID+'/'+u)}catch(e){}}}

let UID=ls('arr_uid');
if(!UIDRE.test(UID||'')){UID=Array.from(crypto.getRandomValues(new Uint8Array(10)),b=>(b%36).toString(36)).join('')+Date.now().toString(36);try{localStorage.setItem('arr_uid',UID)}catch(e){}}

const myKey=()=>PC?(PC.own?UID+'_'+PC.id:PC.id):null;
/* clã desfeito pelo dono do jogo: marca em /clandead/<key> (ou /inbox/cd<key>) para o líder não recriar */
const DEAD=new Set(),DCH={};
async function deadChk(k){if(DEAD.has(k))return 1;if(DCH[k]&&Date.now()-DCH[k]<60000)return 0;DCH[k]=Date.now();
 for(const q of['/clandead/'+k,'/inbox/cd'+k]){try{const v=await J(q+'.json');if(v){DEAD.add(k);return 1}}catch(e){}}return 0}
async function ownDead(){if(!(PC&&PC.own)||!ON)return 0;const k=myKey();if(k&&await deadChk(k)){PC=null;try{svPC();clBtn();mref();soon('O dono do jogo desfez o seu clã')}catch(e){}return 1}return 0}
const lid=key=>(PC&&myKey()===key)?PC.id:key;

/* ---------- HTTP ---------- */
async function J(path,opt){const c=new AbortController(),t=setTimeout(()=>c.abort(),9000);
 try{const r=await fetch(base+path,Object.assign({signal:c.signal,cache:'no-store'},opt));if(!r.ok)throw new Error('http '+r.status);return await r.json()}finally{clearTimeout(t)}}
const put=(p,v,o)=>J(p+'.json',Object.assign({method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify(v)},o));
const del=p=>J(p+'.json',{method:'DELETE'});

/* ---------- publicar o que e meu ---------- */
let lastP='',lastC='',lastS='',lastPic='',busy=0;
async function publish(force){
 if(!ON||busy||window.__arrDead)return;busy=1;
 try{
  await ownDead();
  const m=PRS.me||{},ck=myKey();
  const rec={n:sn(PN,12)||'Jogador',k:num(m.k,1e7),w:num(m.w,1e7),g:num(m.g,1e7),rp:num(m.rp,1e6),rg:num(m.rg,1e7),rw:num(m.rw,1e7),rt:num(m.rt,1e7)};
  try{const cq=Math.floor(+CH);if(cq>=0&&cq<100)rec.ch=cq;const tq=trajeOf(CH);if(tq)rec.tj=tq;const qe={};let qn=0;for(const k in EQ){const a=Math.floor(+k),b=Math.floor(+EQ[k]);if(a>0&&a<100&&b>0&&b<1000&&qn<40){qe[a]=b;qn++}}if(qn)rec.eq=qe;if(EQP>0&&EQP<1000)rec.ep=Math.floor(EQP);if(EQR>0&&EQR<1000)rec.er=Math.floor(EQR)}catch(e){}
  if(PC&&ck){rec.cid=ck;rec.cn=sn(PC.n,20);rec.ct=tagc(PC.tag);rec.cc=colr(PC.col);rec.cs=symc(PC.sym)}
  if(window.__picH)rec.pv=window.__picH;
  if(/^\d{6,10}$/.test(String(window.ARR_UID||'')))rec.aid=String(window.ARR_UID);
  const sig=JSON.stringify(rec);
  const lck=ls('arr_lck');
  if(lck&&lck!==ck&&KEYRE.test(lck)){
   await del('/clanstats/'+lck+'/'+UID);
   if(lck.indexOf(UID+'_')===0)await del('/clans/'+lck);
   try{localStorage.removeItem('arr_lck')}catch(e){}lastC='';lastS=''}
  if(force||sig!==lastP){rec.t=Date.now();
   try{await put('/players/'+UID,rec)}catch(e1){if(rec.av||rec.bn){const r2=Object.assign({},rec);delete r2.av;delete r2.bn;await put('/players/'+UID,r2);REM.imgFail=1;try{if(!REM.imgWarned){REM.imgWarned=1;soon('Servidor recusou sua foto/banner ('+String(e1&&e1.message||e1).slice(0,40)+'). Os outros não conseguem ver.')}}catch(e3){}}else throw e1}
   lastP=sig}
  {let pic=null;try{const sm=window.fsSmall?window.fsSmall():{};const a=imgc(sm.a),b=imgc(sm.b);if(a||b)pic={a,b}}catch(e){}
   const pk=pic?JSON.stringify(pic):'';
   if(pk!==lastPic){try{if(pic)await put('/pics/'+UID,{a:pic.a,b:pic.b});else await del('/pics/'+UID);lastPic=pk;window.__picH=pic?hsh(pic.a+'|'+pic.b):'';lastP='';setTimeout(()=>{try{window.arrPub&&window.arrPub()}catch(e){}},400);
     if(pic&&!REM.picMsg){REM.picMsg=1;try{soon('Sua foto/banner foi enviada ao servidor ✔')}catch(e){}}}
    catch(e2){if(!REM.picWarn){REM.picWarn=1;try{soon('Servidor recusou sua foto/banner ('+String(e2&&e2.message||e2).slice(0,30)+'). Atualize o Worker.')}catch(e){}}}}}
  if(PC&&ck&&KEYRE.test(ck)){
   if(PC.own){const cr={n:sn(PC.n,20),tg:tagc(PC.tag),c:colr(PC.col),s:symc(PC.sym),o:UID,on:sn(PN,12)||'Jogador'},cs=JSON.stringify(cr);
    if(force||cs!==lastC){await put('/clans/'+ck,cr);lastC=cs}}
   const q=CS[PC.id]||{},st={n:sn(PN,12)||'Jogador',w:num(CW[PC.id],1e7),k:num(q.k,1e7),g:num(q.g,1e7),xp:num(q.xp,1e8)},ss=JSON.stringify(st);
   if(force||ss!==lastS){await put('/clanstats/'+ck+'/'+UID,st);lastS=ss}
   try{localStorage.setItem('arr_lck',ck)}catch(e){}
  }
  REM.err=0;
 }catch(e){REM.err=1}finally{busy=0}
}

/* ---------- baixar o ranking de todos ---------- */
async function pull(){
 if(!ON)return;
 try{
  const q=f=>J('/players.json?orderBy=%22'+f+'%22&limitToLast=60');
  const [a,b,c,cl,st,rq,ib]=await Promise.all([q('k'),q('w'),q('rp'),J('/clans.json'),J('/clanstats.json'),J('/requests.json').catch(()=>null),J('/inbox/'+UID+'.json').catch(()=>null)]);
  REM.raw={P:Object.assign({},REM.extra,a,b,c),C:cl||{},S:st||{},R:rq||{}};REM.ok=Date.now();REM.err=0;REM.loaded=1;
  try{const ids=[];for(const o of[a,b,c])if(o&&typeof o=='object')ids.push(...Object.keys(o).slice(-10));picLoad(ids).then(ch=>{if(ch)refreshUI()}).catch(()=>{});
   const st=[],nw=Date.now(),PP=REM.raw.P||{};for(const u in PP){const r=PP[u],o=REM.pic[u];if(!r||typeof r!='object'||u===UID)continue;const pv=(typeof r.pv=='string'&&/^[a-z0-9]{1,8}$/.test(r.pv))?r.pv:'';if(pv?(!o||(o.h!==pv&&nw-o.ts>15000)):(o&&(o.a||o.b)&&nw-o.ts>15000))st.push(u)}
   if(st.length)picLoad(st.slice(0,20),1).then(ch=>{if(ch)refreshUI()}).catch(()=>{})}catch(e){}
  rebuild();const jn=await inboxHandle(ib);try{await friendInbox(ib)}catch(e){}if(jn){rebuild();publish(1)}checkMyClan();notifyReq();try{await ownDead()}catch(e){}
 }catch(e){REM.err=1}
 refreshUI();
}

/* ---------- monta jogadores e clas (com sanitizacao do que vem de fora) ---------- */
function rebuild(){
 const P=REM.raw.P||{},C=REM.raw.C||{},S=REM.raw.S||{};
 const pl={},byN={};
 for(const u in P){if(!UIDRE.test(u)||u===UID)continue;const r=P[u];if(!r||typeof r!='object')continue;const n=sn(r.n,12);if(!n)continue;
  if(window.ARR_USER&&n.toLowerCase()===String(PN).toLowerCase())continue;
  const o={key:u,n,k:num(r.k,1e7),w:num(r.w,1e7),g:num(r.g,1e7),rp:num(r.rp,1e6),rg:num(r.rg,1e7),rw:num(r.rw,1e7),rt:num(r.rt,1e7),c:null,av:imgc(r.av)||picA(u),bn:imgc(r.bn)||picB(u),ch:chc(r.ch),tj:tjc(r.tj),eq:eqc(r.eq),ep:idc(r.ep),er:idc(r.er),t:+r.t||0};
  if(r.cid&&KEYRE.test(r.cid))o.c={id:lid(r.cid),n:sn(r.cn,20)||'Clã',tag:tagc(r.ct)||'CLA',col:colr(r.cc),sym:symc(r.cs)};
  {const nk=n.toLowerCase(),pv=byN[nk];if(pv){if((pv.t||0)>=(o.t||0))continue;delete pl[pv.key]}byN[nk]=o}
  pl[u]=o}
 REM.players=pl;
 const nmm={};for(const u in pl){if(!nmm[pl[u].n]||(pl[u].av&&!nmm[pl[u].n].av))nmm[pl[u].n]=pl[u]}REM.nm=nmm;
 const byId={},agg={},mem={},mav={},list=[],ck=myKey();
 const addClan=(key,r)=>{
  const id=lid(key),mine=!!(PC&&PC.id===id),st=S[key]||{};
  let ow=0,ok=0,og=0,oxp=0;const pk={},others=[];
  for(const u in st){if(!UIDRE.test(u)||u===UID)continue;const s=st[u];if(!s||typeof s!='object')continue;
   const n=sn(s.n,12)||'Jogador',w=num(s.w,1e7),k=num(s.k,1e7),g=num(s.g,1e7),xp=num(s.xp,1e8);
   ow+=w;ok+=k;og+=g;oxp+=xp;pk[n]=(pk[n]||0)+k;others.push({u,n,k})}
  const owner=r.o&&UIDRE.test(r.o)?r.o:'';
  others.sort((a,b)=>(b.u===owner)-(a.u===owner)||b.k-a.k||a.n.localeCompare(b.n));
  const names=others.map(x=>x.n),avm={};others.forEach(x=>{const p=pl[x.u];if(p&&p.av)avm[x.n]=p.av});
  if(owner&&pl[owner]&&pl[owner].av)avm[sn(r.on,12)||'Jogador']=pl[owner].av;mav[id]=avm;
  if(owner&&owner!==UID&&!others.some(x=>x.u===owner))names.unshift(sn(r.on,12)||'Jogador');
  const q=mine?(CS[PC.id]||{}):{},loc=mine?{w:num(CW[PC.id],1e7),k:num(q.k,1e7),g:num(q.g,1e7),xp:num(q.xp,1e8)}:{w:0,k:0,g:0,xp:0};
  if(mine&&loc.k)pk[sn(PN,12)||'Voce']=(pk[sn(PN,12)||'Voce']||0)+loc.k;
  const a=agg[id]={w:ow+loc.w,k:ok+loc.k,g:og+loc.g,xp:oxp+loc.xp,pk};
  let c;
  if(mine){c=PC;if(!PC.own){PC.n=sn(r.n,20)||PC.n;PC.tag=tagc(r.tg)||PC.tag;PC.col=colr(r.c);PC.sym=symc(r.s)}}
  else c={id,n:sn(r.n,20)||'Clã',tag:tagc(r.tg)||'CLA',col:colr(r.c),sym:symc(r.s)};
  c.w=a.w-(CW[id]||0);
  c.m=names.length+(mine&&PC.own?1:0);
  c.rm=1;
  byId[id]=c;mem[id]=names;list.push(c)};
 for(const key in C){if(!KEYRE.test(key))continue;const r=C[key];if(!r||typeof r!='object')continue;addClan(key,r)}
 if(PC&&ck&&!byId[PC.id]&&PC.own){addClan(ck,{n:PC.n,tg:PC.tag,c:PC.col,s:PC.sym,o:UID,on:PN})}
 const R=REM.raw.R||{},req={};
 for(const key in R){if(!KEYRE.test(key)||!R[key]||typeof R[key]!='object')continue;const o={};
  for(const u in R[key]){if(!UIDRE.test(u)||u===UID&&false)continue;const r=R[key][u];if(!r||typeof r!='object')continue;const n=sn(r.n,12);if(n)o[u]={u,n}}
  req[lid(key)]=o}
 REM.req=req;
 REM.byId=byId;REM.agg=agg;REM.mem=mem;REM.mav=mav;REM.list=list}

function checkMyClan(){
 if(!PC||PC.own||!REM.loaded)return;
 if(!REM.byId[PC.id]){PC=null;try{svPC();clBtn();mref();soon('O dono desfez o seu clã')}catch(e){}publish(1)}}

function refreshUI(){
 try{const p=$('prkp');if(p&&!p.classList.contains('hide'))prR()}catch(e){}
 try{const p=$('cln');if(p&&!p.classList.contains('hide'))clRender()}catch(e){}
 try{const p=$('cmy');if(p&&!p.classList.contains('hide'))clMy()}catch(e){}}


/* ---------- pedidos para entrar no cla ---------- */
async function inboxHandle(I){let joined=0;if(!I||typeof I!='object')return 0;
 for(const key in I){if(!KEYRE.test(key))continue;const r=I[key];if(!r||typeof r!='object')continue;const c=REM.byId[lid(key)]||REM.byId[key];
  if(r.st==='ok'){if(!PC&&c){PC={id:c.id,n:c.n,tag:c.tag,col:c.col,sym:c.sym};try{svPC();clBtn();mref();soon('Seu pedido foi aceito! Você entrou em '+c.n)}catch(e){}joined=1}}
  else if(r.st==='no'){try{soon('Seu pedido para entrar em '+(c?c.n:'um clã')+' foi recusado')}catch(e){}}
  try{await del('/inbox/'+UID+'/'+key)}catch(e){}try{await del('/requests/'+key+'/'+UID)}catch(e){}}
 return joined}
function notifyReq(){if(!PC||!PC.own){REM.lastReq=-1;return}const n=Object.keys(REM.req[PC.id]||{}).length;
 if(REM.lastReq>=0&&n>REM.lastReq){try{soon('Novo pedido para entrar no seu clã!')}catch(e){}}REM.lastReq=n}
async function reqSend(c){if(PC){soon('Saia do seu clã atual para pedir entrada');return}
 const key=c.id;if(!KEYRE.test(key))return;(REM.raw.R[key]=REM.raw.R[key]||{})[UID]={n:sn(PN,12)||'Jogador'};rebuild();
 clInfo(c);soon('Pedido enviado para '+c.n);
 try{await put('/requests/'+key+'/'+UID,{n:sn(PN,12)||'Jogador',t:Date.now()})}catch(e){soon('Falha ao enviar. Tente de novo');if(REM.raw.R[key])delete REM.raw.R[key][UID];rebuild();clInfo(c)}}
async function reqCancel(c){const key=c.id;if(REM.raw.R[key])delete REM.raw.R[key][UID];rebuild();clInfo(c);soon('Pedido cancelado');try{await del('/requests/'+key+'/'+UID)}catch(e){}}
async function reqAnswer(u,ok){const ck=myKey();if(!PC||!PC.own||!ck)return;
 if(ok&&((REM.mem[PC.id]||[]).length+1)>=30){soon('Clã cheio (30 membros)');return}
 if(REM.raw.R[ck])delete REM.raw.R[ck][u];rebuild();clMy();
 try{await put('/inbox/'+u+'/'+ck,{st:ok?'ok':'no',t:Date.now()});await del('/requests/'+ck+'/'+u);soon(ok?'Jogador aceito no clã':'Pedido recusado');if(ok){await publish(1);await pull()}}catch(e){soon('Falha ao responder. Tente de novo')}}
function reqUI(){if(!PC||!PC.own)return;const B=$('cmb');if(!B)return;const L=Object.values(REM.req[PC.id]||{});
 const d=document.createElement('div');d.style.cssText='margin:10px 0;padding:10px;border:1px solid #2a3b5c;border-radius:10px;background:#1e1916';
 d.innerHTML='<div style="font-weight:900;color:#ffba7d;margin-bottom:6px">PEDIDOS PARA ENTRAR ('+L.length+')</div>'+(L.length?'':'<small style="opacity:.7">Nenhum pedido no momento</small>');
 L.forEach(r=>{const row=document.createElement('div');row.style.cssText='display:flex;align-items:center;gap:6px;margin:4px 0';
  const nm=document.createElement('b');nm.style.cssText='flex:1;overflow:hidden;text-overflow:ellipsis';nm.textContent=r.n;row.appendChild(nm);
  [['ACEITAR',1,'#2e9e4f'],['RECUSAR',0,'#b8403a']].forEach(q=>{const b=document.createElement('button');b.type='button';b.textContent=q[0];b.style.cssText='background:'+q[2]+';color:#fff;border:0;border-radius:8px;padding:6px 10px;font-weight:800';b.onclick=()=>reqAnswer(r.u,q[1]);row.appendChild(b)});
  d.appendChild(row)});
 B.appendChild(d)}
function infoUI(c){if(!c||!REM.byId[c.id])return;const I=$('cli'),mine=PC&&PC.id==c.id,j=$('cljoin');
 const own=c.own||(PC&&PC.id===c.id&&PC.own);
 if(I){const t=document.createElement('div');t.style.cssText='font-size:11px;font-weight:800;color:#ffba7d;margin-top:4px';t.textContent='CLÃ CRIADO POR JOGADOR ONLINE';I.insertBefore(t,I.children[2]||null)}
 if(mine||!j)return;
 const pend=!!(REM.req[c.id]&&REM.req[c.id][UID]);
 if(PC){j.textContent='SAIA DO SEU CLÃ PARA PEDIR';j.onclick=()=>soon('Saia do seu clã atual para pedir entrada');return}
 j.textContent=pend?'CANCELAR PEDIDO':'PEDIR PARA ENTRAR';j.onclick=()=>pend?reqCancel(c):reqSend(c)}

function stText(){
 if(!ON)return 'Ranking local (offline) • configure ARR_DB_URL para compartilhar';
 const n=Object.keys(REM.players).length+1;
 if(!REM.ok)return REM.err?'Sem conexão com o ranking online':'Conectando ao ranking online...';
 const s=Math.max(0,Math.round((Date.now()-REM.ok)/1000));
 return 'Ranking online • '+n+' jogador'+(n>1?'es':'')+' • atualizado há '+(s<5?'instantes':s+'s')+(REM.err?' • sem conexão':'')}

if(!ON){
 const r0=prR;prR=function(){const x=r0.apply(this,arguments);try{$('prsub').textContent=stText()}catch(e){}return x};
 return}

/* ===== a partir daqui o jogo usa o ranking online ===== */
document.body.classList.add('onl-off');

/* ranking de jogadores */
const prList0=prList;
prList=function(){const L=[],m=PRS.me||{};
 if(!window.ARR_USER)try{for(const e of prList0())if(!e.me&&!(PC&&e.c&&e.c.id===PC.id))L.push(e)}catch(x){}
 for(const u in REM.players)L.push(REM.players[u]);
 L.push({key:'me',n:PN,c:PC,me:1,k:m.k||0,w:m.w||0,rp:m.rp||0,g:m.g||0,rg:m.rg||0,rw:m.rw||0,rt:m.rt||0});return L};
const prR0=prR;
prR=function(){const x=prR0.apply(this,arguments);try{$('prsub').textContent=stText()}catch(e){}return x};

/* ranking de clas */
const clRank0=clRank;
clRank=function(){return REM.list.concat(window.ARR_USER?[]:allCl().filter(c=>!(PC&&c.id==PC.id))).sort((a,b)=>cw(b)-cw(a)||clXp(b)-clXp(a)||String(a.n).localeCompare(String(b.n)))};
const clXp0=clXp;
clXp=function(c){const a=c&&REM.agg[c.id];return a?a.xp:clXp0.apply(this,arguments)};
const clRoster0=clRoster;
clRoster=function(c){return c&&REM.mem[c.id]?REM.mem[c.id].slice():clRoster0.apply(this,arguments)};
const clMembers0=clMembers;
clMembers=function(c){if(!(c&&REM.byId[c.id]))return clMembers0.apply(this,arguments);
 const on=PC&&PC.id==c.id,r=clRoster(c);
 if(c.own)return[{n:PN,leader:1,me:1}].concat(r.map(n=>({n})));
 return r.map((n,i)=>({n,leader:i==0})).concat(on?[{n:PN,me:1}]:[])};

/* telas de cla mostram os totais do cla inteiro (e nao so os seus) */
function withTotals(fn){return function(c){rebuild();const cc=c||PC;if(!cc)return fn.apply(this,arguments);
 const id=cc.id,a=REM.agg[id],lo=REM.byId[id];if(!a)return fn.apply(this,arguments);
 const sCS=CS[id],sCW=CW[id],sw=cc.w,sw2=lo?lo.w:0;
 CS[id]={g:a.g,k:a.k,xp:a.xp,pk:a.pk};CW[id]=a.w;cc.w=0;if(lo)lo.w=0;
 try{return fn.apply(this,arguments)}finally{
  if(sCS===undefined)delete CS[id];else CS[id]=sCS;
  if(sCW===undefined)delete CW[id];else CW[id]=sCW;
  if(sw===undefined)delete cc.w;else cc.w=sw;if(lo)lo.w=sw2}}}
const clInfo0=clInfo,clMy0=clMy;
clInfo=withTotals(clInfo0);clMy=withTotals(clMy0);

const clInfo1=clInfo;clInfo=function(c){const r=clInfo1.apply(this,arguments);try{infoUI(c)}catch(e){}return r};
const clMy1=clMy;clMy=function(){const r=clMy1.apply(this,arguments);try{reqUI()}catch(e){}return r};
const clRender0=clRender;
clRender=function(){rebuild();const r=clRender0.apply(this,arguments);
 try{const g=$('clg'),L=clRank(),top=new Set(L.slice(0,10).map(c=>c.id));
  const ex=[];L.forEach((c,i)=>{if(REM.byId[c.id]&&!top.has(c.id)&&!(PC&&c.id==PC.id))ex.push([c,i+1])});
  if(g&&ex.length){const h=document.createElement('div');h.className='rkno';h.style.cssText='margin-top:10px;font-weight:800;color:#ffba7d';h.textContent='CLÃS DE JOGADORES ONLINE ('+ex.length+')';g.appendChild(h);ex.forEach(([c,k])=>g.appendChild(clRow(c,k)))}}catch(e){}
 return r};

/* sem clas/vitorias simulados: so partidas reais contam */
clTick=function(){};
clRandWin=function(){const L=allCl().filter(c=>!(PC&&c.id==PC.id));if(!L.length)return;prSim=1;try{clWin(L[Math.random()*L.length|0].id)}finally{prSim=0}
 try{const p=$('cln');if(p&&!p.classList.contains('hide'))clRender()}catch(e){}};

/* ganchos: sincroniza ao fim das partidas, ao abrir os menus e periodicamente */
const sync=async f=>{await publish(f);await pull()};
window.arrPub=()=>{busy=0;return sync(1)};
window.arrClans=()=>{const C=REM.raw.C||{},o=[];for(const k in C){if(!KEYRE.test(k)||!C[k]||typeof C[k]!='object')continue;const r=C[k];o.push({key:k,n:sn(r.n,20)||'Clã',tag:tagc(r.tg),on:sn(r.on,12)||'?'})}return o};
window.arrClanKill=async q=>{if(!ON)return{e:'Servidor de clãs indisponível.'};if(!(window.arrIsOwner&&window.arrIsOwner()))return{e:'Só o dono pode usar esse comando.'};
 q=String(q||'').trim().toLowerCase().replace(/^\[|\]$/g,'');if(!q)return{e:'Informe a TAG ou o nome do clã.'};
 try{await pull()}catch(e){}
 const L=window.arrClans();let m=L.filter(c=>c.key.toLowerCase()===q);
 if(!m.length)m=L.filter(c=>c.tag.toLowerCase()===q);
 if(!m.length)m=L.filter(c=>c.n.toLowerCase()===q);
 if(!m.length)m=L.filter(c=>c.n.toLowerCase().indexOf(q)>=0);
 if(!m.length)return{e:'Clã "'+q+'" não encontrado. Use /clas para ver a lista.'};
 if(m.length>1)return{e:'Mais de um clã: '+m.slice(0,5).map(c=>'['+c.tag+'] '+c.n+' (dono @'+c.on+')').join(', ')+'. Use o nome completo.'};
 const c=m[0],k=c.key;let tomb=0;
 for(const t of['/clandead/'+k,'/inbox/cd'+k]){try{await put(t,{t:Date.now()});tomb=1;break}catch(e){}}
 let del1=0;
 try{await del('/clans/'+k);del1=1}catch(e){}
 try{await del('/clanstats/'+k)}catch(e){}try{await del('/requests/'+k)}catch(e){}
 if(!del1&&!tomb)return{e:'Falha ao desfazer (servidor recusou).'};
 DEAD.add(k);
 if(PC&&myKey()===k){PC=null;try{svPC();clBtn();mref()}catch(e){}}
 try{await pull()}catch(e){}
 return{ok:1,n:c.n,tag:c.tag,on:c.on,tomb}};
window.arrWipe=async()=>{window.__arrDead=1;
 const R=REM.raw.R||{},ks=new Set([ls('arr_lck'),myKey()]);
 for(const k of Object.keys(R))if(R[k]&&R[k][UID])ks.add(k);
 for(const k of ks){if(!k||!KEYRE.test(k))continue;
  try{await del('/clanstats/'+k+'/'+UID)}catch(e){}try{await del('/requests/'+k+'/'+UID)}catch(e){}
  if(k.indexOf(UID+'_')===0){try{await del('/clans/'+k)}catch(e){}try{await del('/clanstats/'+k)}catch(e){}try{await del('/requests/'+k)}catch(e){}}}
 await del('/players/'+UID);try{await del('/inbox/'+UID)}catch(e){}};
const f5=finish2;finish2=function(){const r=f5.apply(this,arguments);setTimeout(()=>{rebuild();sync()},600);return r};
const op=prOpen;$('rkmb').onclick=()=>{op();sync()};
const b1=$('clb').onclick;$('clb').onclick=function(){const r=b1&&b1.apply(this,arguments);sync();return r};
const b2=$('cmrk').onclick;$('cmrk').onclick=function(){const r=b2&&b2.apply(this,arguments);sync();return r};
const b3=$('clmy2').onclick;$('clmy2').onclick=function(){const r=b3&&b3.apply(this,arguments);sync();return r};
let lastKey=myKey();setInterval(()=>{const k=myKey();if(k!==lastKey){lastKey=k;sync(1)}},1500);
setInterval(()=>{if(!document.hidden)sync()},20000);
document.addEventListener('visibilitychange',()=>{if(document.hidden)publish();else sync()});
rebuild();setTimeout(()=>sync(1),1200);
})();
