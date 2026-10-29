
(function(){
'use strict';
const $=id=>document.getElementById(id);
const MP=window.MP={on:0,arm:0,host:0,bus:null,code:'',pr:{},slots:{},pl:{},me:-1,st:{},bs:{},q:[],sd:0,hpid:null,lastSd:0};
const mul=a=>()=>{a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296};
const clean=s=>String(s||'Jogador').replace(/[<>&"'`]/g,'').slice(0,12)||'Jogador';
function names(sd){const r=mul(sd^0x5bd1e995),a=NMP.filter(n=>n.toLowerCase()!='voce');for(let i=a.length-1;i>0;i--){const j=r()*(i+1)|0;[a[i],a[j]]=[a[j],a[i]]}return a}
window.ARR_NAMES=names;
let toastT=0;
function toast(t){let d=$('mpt');if(!d){d=document.createElement('div');d.id='mpt';document.body.appendChild(d)}d.textContent=t;d.style.display='block';clearTimeout(toastT);toastT=setTimeout(()=>d.style.display='none',4200)}

/* ---------- mapa identico para todos: sementes ---------- */
window.MPS=k=>{if(MP.on)window.__mpR=mul(MP.sd+k*7919)};
window.MPH=function(){window.__mpR=null;if(!MP.on)return;const f=G.f,nm=names(MP.sd);
 f.forEach((o,i)=>{if(!G.sala){o.name=nm[i%nm.length];o.bn=o.name;o.ctg=undefined;o.cl=null;o.bf=0}o.fr=0;o.mx=MP.host?0:1});
 for(const k in MP.slots){const idx=MP.slots[k],o=f[idx];if(!o)continue;const d=MP.pl[idx]||['Jogador',0];o.name=d[0];o.bn=d[0];o.ch=d[1];o.hum=1;o.al=0;o.mx=idx===MP.me?0:1}
 const me=f[MP.me];if(!me)return;
 if(MP.me!==0){f[0].isP=0;if(f[0].col==='#ffd93b'){f[0].col=me.col;me.col='#ffd93b'}}
 me.isP=1;me.mx=0;me.name=PN;me.ch=CH;G.p=me;G.spec=null};

/* ---------- ganchos de simulacao ---------- */
window.MPT=function(f,dt){if(!MP.on||!f.mx)return false;
 const t=MP.st[f.i]||MP.bs[f.i];if(!t)return true;
 if(t.d&&!f.dead){f.mpd=1;die(f,null);return true}
 if(t.st==='plane'){f.x=G.pl.x;f.y=G.pl.y}
 else{if(!f.mi){f.mi=1;f.x=t.x;f.y=t.y}
  let tx=t.x,ty=t.y;
  if(t._t&&t.st==='ground'){const lat=Math.min(.12,((MP.bus&&MP.bus.ping)||0)/2000),ag=Math.min(.25,Math.max(0,(performance.now()-t._t)/1000)+lat);tx+=(t.vx||0)*ag;ty+=(t.vy||0)*ag}
  const ex=tx-f.x,ey=ty-f.y;if(ex*ex+ey*ey>90000){f.x=tx;f.y=ty}
  const k=Math.min(1,dt*22),nx=f.x+(tx-f.x)*k,ny=f.y+(ty-f.y)*k;if(dt>.001){f.vx=(nx-f.x)/dt;f.vy=(ny-f.y)/dt}f.x=nx;f.y=ny}
 f.ang+=wr(t.a-f.ang)*Math.min(1,dt*14);f.hp=t.hp;f.ar=t.ar||0;f.st=t.st;f.dn=t.dn;
 if(t.st==='fall')f.ft=Math.max(.1,(f.ft||4)-dt);
 if(t.jh!=null)f.jh=t.jh;
 const wi=t.w||0;if(f.ws[0]!==wi){f.ws[0]=wi;f.cur=0}
 try{f.bush=G.bs.has((f.x/T|0)*512+(f.y/T|0))}catch(e){}
 return true};
const hu0=hurt;hurt=function(t,d,s,nc){if(MP.on){
 /* bala/explosao de humano replicada nao da dano na vitima: o dano vem do evento 'hh' do atirador */
 if(!t.mx&&t.isP&&s&&s.mx&&s.hum&&!MP.hh)return;
 /* acerto em jogador humano visto na minha tela: avisa a vitima + feedback imediato (numero, flash, som) */
 if(t.mx&&t.hum&&MP.bus&&s&&s.isP&&!s.dead&&!t.dead&&t.st=='ground'&&!(t.inv>0)&&s.tm!==t.tm&&d>0){
  ev({t:'hh',v:t.i,d:+Math.min(d,400).toFixed(1),c:_crit?1:0});
  try{t.fl=.1;if(specDmg(s))dmgTx(t.x,t.y-32,''+Math.max(1,Math.round(d)),_crit?'#ff1a1a':'#ffd93b',_crit);hitS(t,s,d)}catch(e){}
  return}
 if(t.mx){
  /* convidado: acerto em bot visto na tela dele -> avisa o dono + feedback local */
  if(!MP.host&&MP.bus&&s&&s.isP&&!s.dead&&!t.hum&&!t.dead&&t.st=='ground'&&!(t.inv>0)&&s.tm!==t.tm&&d>0){
   ev({t:'ht',v:t.i,d:+Math.min(d,400).toFixed(1),c:_crit?1:0});
   try{t.fl=.1;if(specDmg(s))dmgTx(t.x,t.y-32,''+Math.max(1,Math.round(d)),_crit?'#ff1a1a':'#ffd93b',_crit);hitS(t,s,d)}catch(e){}}
  return}
 /* dono: tiro replicado do convidado nao da dano em bot (o dano vem do evento 'ht') */
 if(MP.host&&!MP.ht&&s&&s.mx&&!t.isP&&!t.hum)return}
 return hu0.apply(this,arguments)};
const di0=die;die=function(t,s){if(MP.on&&!t.mx&&!t.mpd&&!t.dead){t.mpd=1;ev({t:'dd',v:t.i,k:s?s.i:-1})}return di0.apply(this,arguments)};
const rv0=revive;revive=function(t,by){if(MP.on&&t.mx){if(by&&(by.isP||MP.host))ev({t:'rv',v:t.i,b:by.i});return}return rv0.apply(this,arguments)};
const sh0=shoot;shoot=function(f,a){if(!MP.on||MP.rp)return sh0.apply(this,arguments);const c0=f.cd,r=sh0.apply(this,arguments);
 if(!f.mx&&f.cd>0&&c0<=0&&(f.isP||MP.host)){const q=[f.i,f.ws[f.cur]||0,+a.toFixed(2),f.x|0,f.y|0],tg=MP.host&&!f.isP?f.tg:null;if(tg&&tg.mx&&tg.hum)q.push(tg.i,+wr(a-Math.atan2(tg.y-f.y,tg.x-f.x)).toFixed(3));MP.q.push(q)}return r};
/* gelo: replica a parede de gelo para todos (antes so existia na tela de quem jogou) */
if(typeof iceMake==='function'){const ic0=iceMake;iceMake=function(q){const r=ic0.apply(this,arguments);try{const o=q&&q.o;if(MP.on&&!MP.icr&&MP.bus&&o&&!o.mx&&(o.isP||(MP.host&&!o.hum)))ev({t:'ic',i:o.i,x:Math.round(q.tx),y:Math.round(q.ty),a:+(+q.a).toFixed(3)})}catch(e){}return r}}
const z0=zupd;zupd=function(dt){if(MP.on&&!MP.host)return;return z0(dt)};
['infApply','ytApply','frApply'].forEach(n=>{const o=window[n];if(typeof o!='function')return;window[n]=function(){if(MP.on)return;return o.apply(this,arguments)}});
/* ---------- anti-cheat v159 (um unico bloco: envolve MPT e onEv) ---------- */
const inWall=(x,y)=>{try{return typeof wallAt==='function'&&!!(wallAt(x,y)&&wallAt(x+12,y)&&wallAt(x-12,y)&&wallAt(x,y+12)&&wallAt(x,y-12))}catch(e){return false}};
{const mpt0=window.MPT;window.MPT=function(f,dt){try{if(MP.on&&f.mx&&f.hum){const t=MP.st[f.i];if(t&&t.st==='ground'&&inWall(t.x,t.y)){t.x=f.x;t.y=f.y;t.vx=0;t.vy=0}}}catch(e){}return mpt0.apply(this,arguments)}}
{const onEv0=onEv;onEv=function(from,m){try{
 if(m&&typeof m==='object'&&MP.on&&G){
  if(m.t==='ic'){const f=G.f[m.i];if(!f||!f.mx||!owns(from,m.i))return;const x=+m.x,y=+m.y,a=+m.a;if(!isFinite(x)||!isFinite(y)||!isFinite(a)||typeof iceMake!=='function')return;if(!G.iw)G.iw=[];if(!G.ig)G.ig=[];MP.icr=1;try{iceMake({tx:x,ty:y,a,o:f,tm:f.tm})}catch(e){}MP.icr=0;return}
  if(m.t==='sh'&&Array.isArray(m.a))m.a=m.a.slice(0,80).filter(e=>{if(!Array.isArray(e)||typeof e[1]!=='number'||!WP[e[1]]||typeof e[2]!=='number'||typeof e[3]!=='number'||typeof e[4]!=='number'||!isFinite(e[2])||!isFinite(e[3])||!isFinite(e[4])||Math.abs(e[3])>1e6||Math.abs(e[4])>1e6)return false;const f=G.f[e[0]];return!(f&&f.hum&&inWall(e[3],e[4]))});
  if(m.t==='ht'&&MP.host){const si=MP.slots[from],sf=G.f[si],t=G.f[m.v];
   if(sf&&t){const w0=WP[sf.ws[0]||0]||{},dx0=sf.x-t.x,dy0=sf.y-t.y,mr=(w0.rg||0)*1.6+250;
    if(w0.rg&&dx0*dx0+dy0*dy0>mr*mr)return;if(inWall(sf.x,sf.y))return;if(typeof los==='function'&&!los(sf,t))return}}}
 }catch(e){console.warn(e)}
 return onEv0.apply(this,arguments)}}
const st1=start;start=function(){if(MP.arm){MP.arm=0;MP.on=1}else MP.on=0;return st1.apply(this,arguments)};

/* ---------- eventos ---------- */
function ev(m){const b=MP.bus;if(b)b.send(m)}
function owns(from,i){const f=G.f[i];if(!f)return false;return f.hum?MP.slots[from]===i:from===MP.hpid}
function onEv(from,m){if(!m||typeof m!=='object')return;if(m.t==='chat'){if(window.ARR_CHAT)window.ARR_CHAT(from,m);return}if(m.t==='cd'){if(window.ARR_CD)window.ARR_CD(from,m);return}if(m.t==='pos'){if(window.ARR_POS)window.ARR_POS(from,m);return}if(m.t==='kk'){if(window.ARR_KK)window.ARR_KK(from,m);return}if(m.t==='sb'){if(window.ARR_SB)window.ARR_SB(from,m);return}
 switch(m.t){
 case 'go':begin(m,from);break;
 case 'sh':if(!MP.on||!G||!Array.isArray(m.a))break;for(const e of m.a){const f=G.f[e[0]];if(!f||!f.mx||f.dead||!owns(from,e[0]))continue;
   const aimMe=!MP.host&&!f.hum&&e[5]===MP.me&&G.p&&!G.p.dead;if(!aimMe){f.x=e[3];f.y=e[4]}
   f.st='ground';f.ws[0]=e[1];f.cur=0;f.mg[0]=99;f.cd=0;f.rl=0;f.dn=0;f.pf=0;f.lgh=0;f.hl=null;MP.rp=1;try{shoot(f,aimMe?aimG(f):e[2])}catch(x){}MP.rp=0}break;
 case 'sn':if(!MP.on||!G||MP.host||from!==MP.hpid||!Array.isArray(m.b)||!Array.isArray(m.z))break;try{snap(m)}catch(x){console.warn('[mp] snapshot invalido',x)}break;
 case 'ht':{if(!MP.on||!G||!MP.host)break;const si=MP.slots[from];if(si==null)break;const sf=G.f[si],t=G.f[m.v];
   if(!sf||!t||sf.dead||t.dead||t.mx||t.isP||t.hum||t.st!='ground'||sf.tm===t.tm)break;const d=+m.d;if(!(d>0)||d>400)break;
   MP.ht=1;_crit=m.c?1:0;try{hurt(t,d,sf)}catch(x){console.error(x)}_crit=0;MP.ht=0;break}
 case 'hh':{if(!MP.on||!G||!G.p||G.p.mx)break;const si=MP.slots[from];if(si==null)break;const sf=G.f[si],t=G.f[m.v];
   if(!sf||!t||t!==G.p||sf.dead||t.dead||t.st!='ground'||sf.tm===t.tm)break;const d=+m.d;if(!(d>0)||d>400)break;
   MP.hh=1;_crit=m.c?1:0;try{hurt(t,d,sf)}catch(x){console.error(x)}_crit=0;MP.hh=0;break}
 case 'dd':{if(!MP.on||!G)break;const t=G.f[m.v];if(!t||t.dead||t.isP||!owns(from,m.v))break;t.mpd=1;die(t,m.k>=0?G.f[m.k]:null);break}
 case 'rv':{if(!MP.on||!G)break;const t=G.f[m.v];if(!t||t.mx||t.dead||!(t.dn>0))break;revive(t,G.f[m.b]||t);break}
 }}
function aimG(f){const p=G.p,w=WP[f.ws[0]||0]||{},d=Math.hypot(p.x-f.x,p.y-f.y)||1,lt=Math.min(.6,w.sp?d/w.sp:0),sk=typeof f.sk==='number'?f.sk:.6;return Math.atan2(p.y+(p.vy||0)*lt-f.y,p.x+(p.vx||0)*lt-f.x)+(Math.random()-.5)*(1.1-sk)*.14}
function snap(m){const bs={},nw=performance.now(),ob=MP.bs||{};for(const e of m.b){const o=ob[e[0]],r={x:e[1],y:e[2],a:e[3],hp:e[4],ar:e[5],st:e[6],dn:e[7],w:e[8],d:e[9],_t:nw,vx:0,vy:0};if(o&&o._t){const dt=(nw-o._t)/1000;if(dt>.03&&dt<.6){r.vx=(e[1]-o.x)/dt;r.vy=(e[2]-o.y)/dt}}bs[e[0]]=r}MP.bs=bs;
 if(Math.abs(G.t-m.g)>1.5)G.t=m.g;G.pl.t=m.p;const Z=G.Z,z=m.z;Z.cx=z[0];Z.cy=z[1];Z.r=z[2];Z.ph=z[3];Z.st=z[4];Z.t=z[5];Z.wait=z[6];Z.nx=z[9]?{cx:z[7],cy:z[8],r:z[9]}:null}
setInterval(()=>{const b=MP.bus;if(!b||!MP.on||!G)return;
 if(MP.q.length)b.send({t:'sh',a:MP.q.splice(0,60)})},33);
setInterval(()=>{if(!MP.on||!MP.host||!G||!MP.bus)return;const Z=G.Z,nx=Z.nx||{cx:0,cy:0,r:0},b=[];
 for(const f of G.f){if(f.mx||f.isP)continue;b.push([f.i,f.x|0,f.y|0,+f.ang.toFixed(1),f.hp|0,f.ar|0,f.st,f.dn>0?1:0,f.ws[f.cur]||0,f.dead?1:0])}
 MP.bus.send({t:'sn',g:+G.t.toFixed(1),p:+G.pl.t.toFixed(3),z:[Z.cx|0,Z.cy|0,Z.r|0,Z.ph,Z.st,+Z.t.toFixed(1),+(Z.wait>1e8?1e9:(Z.wait||0)).toFixed(1),nx.cx|0,nx.cy|0,nx.r|0],b},1)},100);
setInterval(()=>{if(!MP.on||!G||!MP.bus||MP.me<0)return;const p=G.p;if(!p)return;
 MP.bus.state({s:'g',i:MP.me,x:p.x|0,y:p.y|0,a:+p.ang.toFixed(2),hp:Math.round(p.hp),ar:Math.round(p.ar||0),st:p.st,dn:p.dn>0?1:0,w:p.ws[p.cur]||0,jh:Math.round(p.jh||0),d:p.dead?1:0,vx:Math.round(p.vx||0),vy:Math.round(p.vy||0)})},50);

/* ---------- indicador de ping ---------- */
setInterval(()=>{let d=$('mpping');const b=MP.bus;if(!MP.on||!b||b.kind!=='ws'){if(d)d.style.display='none';return}
 if(!d){d=document.createElement('div');d.id='mpping';d.style.cssText='position:fixed;left:50%;bottom:calc(2px + env(safe-area-inset-bottom));transform:translateX(-50%);z-index:60;font:800 11px Arial;padding:1px 7px;border-radius:8px;background:#000a;pointer-events:none';document.body.appendChild(d)}
 const p=b.ping|0;d.style.display='block';d.style.color=p<80?'#7dff9a':p<150?'#ffd93b':'#ff6a4a';d.textContent='PING '+(p||'--')+' ms'+(netMs?'  |  REDE '+netMs+' ms':'')},1000);
/* REDE = ida e volta ate a borda da Cloudflare (sua conexao); PING = ate a sala e de volta */
let netMs=0;
setInterval(()=>{const b=MP.bus;if(!MP.on||!b||b.kind!=='ws')return;let U='';try{U=String(ARR_WS_URL||'').replace(/^wss:/,'https:').replace(/\/+$/,'')}catch(e){}
 if(!/^https:/.test(U))return;const t=performance.now();
 fetch(U+'/ping?'+Date.now(),{mode:'no-cors',cache:'no-store'}).then(()=>{const r=Math.round(performance.now()-t);netMs=netMs?Math.round(netMs*.5+r*.5):r}).catch(()=>{})},3000);
/* ---------- presenca / lobby ---------- */
function amHost(){const b=MP.bus,me=b&&b.me();if(!me)return 0;const mj=MP.t0||0;for(const k in MP.pr){const o=MP.pr[k];if(!o||o.s!=='l')continue;if(o.j<mj||(o.j===mj&&k<me))return 0}return 1}
function onSt(id,o,direct){MP.pr[id]=o||{};if(!direct&&o&&o.s==='g'&&Array.isArray(o.xv)&&MP.bus&&o.xv.indexOf(MP.bus.me())>=0)return;if(MP.on&&o&&o.s==='g'&&MP.slots[id]===o.i&&typeof o.x==='number'){
  /* protecao: ignora estado invalido/absurdo vindo da rede (evita NaN/Infinity e arma inexistente travarem a partida de todos) */
  if(!(isFinite(o.x)&&isFinite(o.y)&&Math.abs(o.x)<1e6&&Math.abs(o.y)<1e6&&isFinite(o.a||0)&&isFinite(o.hp||0)&&Math.abs(o.vx||0)<1e5&&Math.abs(o.vy||0)<1e5&&(o.w==null||(typeof o.w==='number'&&!!WP[o.w]))))return;
  const nw=performance.now(),pv=MP.st[o.i];
  if(typeof o.vx!=='number'){o.vx=0;o.vy=0;if(pv&&pv._t&&typeof pv.x==='number'){const dt=(nw-pv._t)/1000;if(dt>.02&&dt<.5){o.vx=(o.x-pv.x)/dt;o.vy=(o.y-pv.y)/dt}}}
  o._t=nw;MP.st[o.i]=o}}
function onJoin(id,o){MP.pr[id]=o||{}}
function onLeft(id){delete MP.pr[id];const i=MP.slots[id];
 if(MP.on&&i!=null&&G){delete MP.st[i];const f=G.f[i];if(f&&!f.dead&&MP.host){f.mx=0;f.hum=0;f.al=0;toast((f.name||'Jogador')+' saiu - virou bot')}}
 if(MP.on&&!MP.host&&id===MP.hpid){MP.on=0;toast('O dono saiu da sala - partida encerrada');setTimeout(()=>{try{$('menuBtn').onclick()}catch(e){}},1200)}}
function begin(m,from){const b=MP.bus;if(!b||MP.on||MP.arm||m.sd===MP.lastSd)return;const self=from===b.me();
 if(!self&&!MP.pr[from])return;const me=m.sl&&m.sl[b.me()];if(me==null){toast('Sala cheia: voce nao entrou nesta partida');return}
 if(LD.busy)return;MP.lastSd=m.sd;Object.assign(MP,{sd:m.sd,slots:m.sl,pl:m.pl,me,hpid:from,arm:1,st:{},bs:{},q:[],host:self?1:0});
 TB=+m.tb||0;RM=+m.rm||0;MS=m.ms;try{if(m.sa&&typeof SALA!=='undefined')Object.assign(SALA,m.sa)}catch(e){}AL=false;window.frWN=null;try{mref()}catch(e){}
 startL()}
function hostGo(){const b=MP.bus,me=b.me(),ids=Object.keys(MP.pr).filter(k=>MP.pr[k]&&MP.pr[k].s==='l').sort((a,c)=>(MP.pr[a].j-MP.pr[c].j)||(a<c?-1:1)).slice(0,7),sl={},pl={};
 sl[me]=0;pl[0]=[clean(PN),CH];ids.forEach((id,i)=>{sl[id]=i+1;pl[i+1]=[clean(MP.pr[id].n),+MP.pr[id].c||0]});
 const m={t:'go',sd:((window.ARR_LSD|0)||(Math.random()*2147483647)|0),ms:MS,tb:TB,rm:RM,sa:(typeof SALA!=='undefined'?Object.assign({},SALA):0),sl,pl};b.send(m);setTimeout(()=>b.send(m),500);setTimeout(()=>b.send(m),1300);begin(m,me);window.ARR_LSD=0}

/* ---------- transporte 1: sala da plataforma (claude.use('room')) ---------- */
async function roomBus(code){const c=window.claude;if(!c||!c.use)return null;const R=await c.use('room');if(!R)return null;
 const nr=await R.join('armada-'+code.toLowerCase());let warned=0;const cur={},rtc=new Map(),cfg={iceServers:[{urls:'stun:stun.l.google.com:19302'}]};
 const ok=ch=>ch&&ch.readyState==='open',rel=id=>{const r=rtc.get(id);return r&&ok(r.rel)?r.rel:null},fst=id=>{const r=rtc.get(id);return r&&ok(r.fast)?r.fast:rel(id)};
 const others=()=>nr.peers().filter(p=>!p.isMe).map(p=>p.peer);
 const warn=e=>{if(!warned&&e&&e.code==='not_permitted'){warned=1;toast('Sem permissao para enviar tiros: peca acesso de Colaborador ao dono do jogo')}};
 const sig=(to,d)=>nr.emit('g',{t:'rtc',to,d}).catch(()=>{});
 const bus={kind:'room',cb:{},
  send(m,fast){const d=JSON.stringify({k:'e',m}),via=[];let rest=0;
   for(const id of others()){const ch=fast?fst(id):rel(id);if(ch){try{ch.send(d);via.push(id)}catch(e){rest=1}}else rest=1}
   if(rest)nr.emit('g',via.length?Object.assign({},m,{x:via}):m).catch(warn)},
  state(o){Object.assign(cur,o);if(o.s==='g'){const d=JSON.stringify({k:'s',s:cur}),via=[];let rest=0;
    for(const id of others()){const ch=fst(id);if(ch){try{ch.send(d);via.push(id)}catch(e){rest=1}}else rest=1}
    if(!rest)return;o=Object.assign({},o,{xv:via})}nr.presence(o).catch(()=>{})},
  me(){const p=nr.peers().find(q=>q.isMe&&q.sameTab);return p&&p.peer},
  direct(id){return !!rel(id)},
  leave(){clearInterval(tk);for(const r of rtc.values()){try{r.pc.close()}catch(e){}}rtc.clear();try{nr.leave()}catch(e){}}};
 function wire(id,ch){const r=rtc.get(id);if(!r)return;if(ch.label==='r')r.rel=ch;else r.fast=ch;
  ch.onmessage=e=>{let d;try{d=JSON.parse(e.data)}catch(x){return}if(d.k==='s')bus.cb.st(id,d.s,1);else if(d.k==='e')bus.cb.ev(id,d.m)}}
 function link(id,init,n){const pc=new RTCPeerConnection(cfg),r={pc,rel:null,fast:null,t:Date.now(),n:(n||0)+1,init,q:[]};rtc.set(id,r);
  pc.onicecandidate=e=>{if(e.candidate)sig(id,{c:e.candidate.toJSON()})};pc.ondatachannel=e=>wire(id,e.channel);
  if(init){wire(id,pc.createDataChannel('r'));wire(id,pc.createDataChannel('f',{ordered:false,maxRetransmits:0}));
   pc.createOffer().then(o=>pc.setLocalDescription(o)).then(()=>sig(id,{o:{type:pc.localDescription.type,sdp:pc.localDescription.sdp}})).catch(()=>{})}
  return r}
 async function drain(r){const q=r.q;r.q=[];for(const c of q){try{await r.pc.addIceCandidate(c)}catch(e){}}}
 async function onSig(from,d){let r=rtc.get(from);try{
  if(d.o){if(!r||r.pc.remoteDescription||r.init){if(r){try{r.pc.close()}catch(e){}}r=link(from,0)}
   await r.pc.setRemoteDescription(d.o);await drain(r);const a=await r.pc.createAnswer();await r.pc.setLocalDescription(a);sig(from,{a:{type:a.type,sdp:a.sdp}})}
  else if(d.a){if(r&&r.init){await r.pc.setRemoteDescription(d.a);await drain(r)}}
  else if(d.c){if(!r)r=link(from,0);if(r.pc.remoteDescription)await r.pc.addIceCandidate(d.c);else r.q.push(d.c)}
 }catch(e){}}
 const tk=setInterval(()=>{const me=bus.me();if(!me||!window.RTCPeerConnection)return;const ids=others();
  for(const id of ids){const r=rtc.get(id),bad=!r||r.pc.connectionState==='failed'||r.pc.connectionState==='closed'||(!ok(r.rel)&&Date.now()-r.t>10000);
   if(bad&&me<id&&(!r||r.n<4)){if(r){try{r.pc.close()}catch(e){}}link(id,1,r?r.n:0)}}
  for(const [id,r] of rtc)if(ids.indexOf(id)<0){try{r.pc.close()}catch(e){}rtc.delete(id)}},1500);
 nr.on('g',m=>{if(m.isMe)return;const d=m.data;if(d&&d.t==='rtc'){if(d.to===bus.me())onSig(m.peer,d.d);return}
  if(d&&d.x&&d.x.indexOf(bus.me())>=0)return;bus.cb.ev(m.peer,d)});
 nr.onPeers(ch=>{ch.joined.forEach(p=>{if(!p.isMe)bus.cb.join(p.peer,p.presence)});ch.updated.forEach(p=>{if(!p.isMe)bus.cb.st(p.peer,p.presence)});ch.left.forEach(p=>{if(!p.isMe)bus.cb.left(p.peer)})});
 return bus}

/* ---------- transporte 3: servidor proprio (Cloudflare Worker). URL: ?ws=wss://SEU.workers.dev ou ARR_WS_URL ---------- */
const ARR_WS_URL='wss://armada-relay.rdz777zd.workers.dev';
async function wsBus(code){
 let U=ARR_WS_URL;try{const q=new URLSearchParams(location.search).get('ws');if(q)localStorage.setItem('arr_ws',q);U=U||localStorage.getItem('arr_ws')||''}catch(e){}
 if(!/^wss:\/\//.test(U))return null;
 const ws=new WebSocket(U.replace(/\/+$/,'')+'/room/'+encodeURIComponent(code)),bus={kind:'ws',cb:{},pres:{},myid:null,ping:0},known=new Set();let pt=0,qn=0,pn=0;const pr=[];
 await new Promise((ok,no)=>{ws.onmessage=e=>{let d;try{d=JSON.parse(e.data)}catch(x){return}if(d.k==='hi'){bus.myid=d.id;ok()}};ws.onerror=()=>no('ws');ws.onclose=()=>no('ws');setTimeout(()=>no('timeout'),6000)});
 const put=d=>{if(ws.readyState!==1)return;if(ws.bufferedAmount>8000&&(d.k==='s'||(d.k==='e'&&d.m&&d.m.t==='sn')))return;ws.send(JSON.stringify(d))};
 ws.onmessage=e=>{if(e.data==='q'){qn++;if(pt){const r=Math.round(performance.now()-pt);pt=0;if(r<8000){pr.push(r);if(pr.length>5)pr.shift();const o=pr.slice().sort((a,b)=>a-b);bus.ping=o[o.length>>1]}}return}
  let d;try{d=JSON.parse(e.data)}catch(x){return}
  if(d.k==='pg'){const r=Math.round(performance.now()-d.t);pr.push(r);if(pr.length>5)pr.shift();const o=pr.slice().sort((a,b)=>a-b);bus.ping=o[o.length>>1];return}
  const from=d.f;if(!from)return;
  if(d.k==='l'){known.delete(from);bus.cb.left(from);return}
  if(!known.has(from)){known.add(from);bus.cb.join(from,{})}
  if(d.k==='s')bus.cb.st(from,d.s);else if(d.k==='e')bus.cb.ev(from,d.m)};
 ws.onclose=()=>{for(const id of known)try{bus.cb.left(id)}catch(e){}known.clear()};
 bus.send=m=>put({k:'e',m});bus.state=o=>{Object.assign(bus.pres,o);put({k:'s',s:bus.pres})};
 bus.me=()=>bus.myid;
 const sendP=()=>{if(ws.readyState!==1)return;pn++;pt=performance.now();try{ws.send('p')}catch(e){}if(pn>4&&!qn)put({k:'pg',t:performance.now()})};
 const tk=setInterval(()=>{if(MP.bus===bus&&!(pn&1))put({k:'s',s:bus.pres})},1000),tp=setInterval(sendP,1000);
 bus.leave=()=>{clearInterval(tk);clearInterval(tp);try{ws.close()}catch(e){}};
 sendP();setTimeout(sendP,300);setTimeout(sendP,700);return bus}

/* ---------- transporte 2: PeerJS (so funciona com internet aberta, fora do Claude) ---------- */
async function peerBus(code,isHost){
 await new Promise((ok,no)=>{if(window.Peer)return ok();const s=document.createElement('script');s.src='https://cdn.jsdelivr.net/npm/peerjs@1.5.4/dist/peerjs.min.js';s.onload=ok;s.onerror=()=>no('load');document.head.appendChild(s)});
 const pid='armada-r-'+code.toLowerCase(),ICE={config:{iceServers:[{urls:'stun:stun.l.google.com:19302'},{urls:'stun:stun.cloudflare.com:3478'}].concat(window.ARR_TURN||[])}},peer=isHost?new Peer(pid,ICE):new Peer(void 0,ICE),bus={kind:'peer',cb:{},conns:new Map(),pres:{},myid:null},known=new Set();
 await new Promise((ok,no)=>{peer.on('open',id=>{bus.myid=id;ok()});peer.on('error',no);setTimeout(()=>no('timeout'),9000)});
 const hear=(from,d)=>{if(d.k==='l'){known.delete(d.f);bus.cb.left(d.f);return}if(!known.has(from)){known.add(from);bus.cb.join(from,{})}if(d.k==='s')bus.cb.st(from,d.s);else if(d.k==='e')bus.cb.ev(from,d.m)};
 const relay=(from,d)=>{for(const [id,c] of bus.conns)if(id!==from&&c.open)c.send(Object.assign({},d,{f:from}))};
 const wire=c=>{bus.conns.set(c.peer,c);
  if(isHost){c.send({k:'s',s:bus.pres});for(const id in MP.pr)c.send({k:'s',s:MP.pr[id],f:id})}
  c.on('data',d=>{if(!d)return;if(isHost){hear(c.peer,d);relay(c.peer,d)}else hear(d.f||pid,d)});
  c.on('close',()=>{bus.conns.delete(c.peer);known.delete(c.peer);bus.cb.left(c.peer);if(isHost)relay(c.peer,{k:'l'})})};
 const sendAll=d=>{for(const c of bus.conns.values())if(c.open)c.send(d)};
 if(isHost)peer.on('connection',c=>c.on('open',()=>wire(c)));
 else{const c=peer.connect(pid,{reliable:true});await new Promise((ok,no)=>{c.on('open',ok);c.on('error',no);setTimeout(()=>no('nf'),7000)});wire(c)}
 bus.send=m=>sendAll({k:'e',m});bus.state=o=>{Object.assign(bus.pres,o);sendAll({k:'s',s:bus.pres})};
 bus.me=()=>bus.myid;bus.leave=()=>{try{peer.destroy()}catch(e){}};
 setInterval(()=>{if(MP.bus===bus)sendAll({k:'s',s:bus.pres})},3000);
 return bus}

const setMsg=()=>{};
const ROOMS=['sala1','sala2','sala3','sala4'];
function view(){}
function leave(){const b=MP.bus;if(b){try{b.state({s:'x'});b.leave()}catch(e){}}MP.bus=null;MP.pr={};MP.host=0;MP.on=0}
async function connect(code){setMsg('Conectando...');leave();MP.code=code;view();let bus=null;
 try{bus=await roomBus(code)}catch(e){console.warn(e)}
 if(!bus){try{bus=await wsBus(code)}catch(e){console.warn(e)}
  /* sala publica cheia (o servidor recusa a 9a conexao): tenta as proximas salas em vez de cair no PeerJS e ficar sozinho */
  if(!bus){const ri=ROOMS.indexOf(code);if(ri>=0)for(let j=ri+1;j<ROOMS.length&&!bus;j++){try{bus=await wsBus(ROOMS[j]);if(bus)MP.code=ROOMS[j]}catch(e){}}}}
 if(!bus){try{bus=await peerBus(code,1)}catch(e){try{bus=await peerBus(code,0)}catch(e2){setMsg('Online indisponivel aqui.');return}}}
 bus.cb={ev:onEv,st:onSt,join:onJoin,left:onLeft};MP.bus=bus;MP.t0=Date.now();MP.host=1;
 bus.state({s:'l',n:clean(PN),c:CH,j:MP.t0});setMsg('');view();
 setTimeout(()=>{if(MP.bus!==bus)return;if(Object.keys(MP.pr).length>=8){const i=ROOMS.indexOf(code);if(i>=0&&i<ROOMS.length-1){connect(ROOMS[i+1]);setMsg('Sala cheia, entrando na proxima')}else{leave();view();setMsg('Sala cheia')}}},3000)}
/* ---------- lobby online: presenca real + fila de partida ---------- */
/* ---------- convite de equipe (estilo Free Fire): cartao no topo, aceitar/recusar e barra de tempo ---------- */
const IVQ=[];let ivCur=null;const IVE=t=>String(t).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
function invPop(from,yes){from=String(from||'Jogador');if(ivCur&&ivCur.f===from||IVQ.some(x=>x.f===from))return;IVQ.push({f:from,y:yes});if(!ivCur)ivNext()}
function ivNext(){const it=IVQ.shift();if(!it){ivCur=null;return}ivCur=it;
 if(!document.getElementById('ivst')){const st=document.createElement('style');st.id='ivst';st.textContent="#ivp{position:fixed;top:max(10px,env(safe-area-inset-top));left:50%;transform:translateX(-50%);width:min(92vw,390px);z-index:100002;font-family:'Rajdhani','Trebuchet MS',Arial,sans-serif;color:#fff;background:linear-gradient(180deg,#2a221c,#0d0b0a);border:2px solid #ff7a1a;border-radius:4px 18px 4px 18px;box-shadow:0 0 22px #ff7a1a88,0 8px 30px #000c,inset 0 0 18px #ff7a1a22;overflow:hidden;animation:ivIn .38s cubic-bezier(.2,1.25,.4,1)}#ivp.out{animation:ivOut .25s ease-in forwards}@keyframes ivIn{from{transform:translate(-50%,-150%)}to{transform:translate(-50%,0)}}@keyframes ivOut{to{transform:translate(-50%,-150%);opacity:0}}#ivp .ivt{display:flex;justify-content:space-between;align-items:center;background:linear-gradient(90deg,#ffd93b,#ff7a1a);color:#1a0f05;font-weight:900;letter-spacing:2px;font-size:14px;padding:3px 12px}#ivp .ivt i{font-style:normal;font-size:11px;letter-spacing:1px;opacity:.8}#ivp .ivb{display:flex;gap:12px;align-items:center;padding:12px 12px 10px}#ivp .iva{flex:none;width:68px;height:68px;border-radius:10px;border:2px solid #ffd93b;background:radial-gradient(circle at 50% 30%,#4a3a2e,#16110e);box-shadow:0 0 12px #ffd93b66;overflow:hidden;display:grid;place-items:center;font-size:30px;font-weight:900;color:#ffd93b}#ivp .iva img,#ivp .iva canvas{width:100%;height:100%;object-fit:cover;object-position:50% 20%;display:block}#ivp .ivi{min-width:0;display:flex;flex-direction:column;gap:1px}#ivp .ivi b{font-size:21px;line-height:1.1;letter-spacing:.5px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;display:flex;align-items:center;gap:5px}#ivp .ivi small{font-size:13px;font-weight:700;color:#ffba7d}#ivp .ivi span{font-size:14px;font-weight:600;color:#cfb69f}#ivp .ivbt{display:grid;grid-template-columns:1fr 1.3fr;gap:10px;padding:0 12px 12px}#ivp button{font:800 18px 'Rajdhani','Trebuchet MS',Arial,sans-serif;letter-spacing:1.5px;border-radius:4px 12px 4px 12px;padding:9px 6px;cursor:pointer}#ivp .no{background:#25201c;color:#d8cfc7;border:1px solid #6b5f56}#ivp .ok{background:linear-gradient(#ffd93b,#ff7a1a);color:#1a0f05;border:0;box-shadow:0 0 14px #ff7a1a99}#ivp button:active{transform:scale(.96)}#ivp .ivbar{display:block;height:5px;background:#0009}#ivp .ivbar u{display:block;height:100%;width:100%;background:linear-gradient(90deg,#ff7a1a,#ffd93b);animation:ivBar linear forwards}@keyframes ivBar{to{width:0}}";document.head.appendChild(st)}
 let r=null;try{r=window.arrPlayerByName&&window.arrPlayerByName(it.f)}catch(e){}
 let lv=1,tier='BRONZE';try{if(r){lv=Math.min(99,Math.floor(prPts({k:r.k||0,w:r.w||0})/800)+1);tier=prTier(r.rp||0)}}catch(e){}
 let bd='';try{bd=ytB(it.f)}catch(e){}
 const el=document.createElement('div');el.id='ivp';
 el.innerHTML='<div class="ivt"><span>CONVITE DE EQUIPE</span><i>15s</i></div><div class="ivb"><div class="iva"></div><div class="ivi"><b>'+IVE(it.f)+bd+'</b><small>Nível '+lv+' • '+IVE(tier)+'</small><span>convidou você para a equipe</span></div></div><div class="ivbt"><button type="button" class="no">RECUSAR</button><button type="button" class="ok">ACEITAR</button></div><i class="ivbar"><u></u></i>';
 const av=el.querySelector('.iva');let ok=0;
 try{if(r&&r.av&&/^data:image\//.test(r.av)){const im=document.createElement('img');im.src=r.av;im.alt='';av.appendChild(im);ok=1}else if(r&&r.ch>=0){av.appendChild(chCv(r.ch,1,r.tj||''));ok=1}}catch(e){}
 if(!ok)av.textContent=(it.f[0]||'?').toUpperCase();
 document.body.appendChild(el);try{snd(700,.15,'triangle',.06,400);setTimeout(()=>snd(940,.12,'triangle',.05,300),140)}catch(e){}
 const T=15000;let done=0,tm=0,cd=0;const left=()=>{const q=el.querySelector('.ivt i');if(q)q.textContent=Math.max(0,Math.ceil((t0+T-Date.now())/1000))+'s'},t0=Date.now();
 const close=y=>{if(done)return;done=1;clearTimeout(tm);clearInterval(cd);el.classList.add('out');setTimeout(()=>{el.remove();if(y){try{it.y()}catch(e){}}ivCur=null;ivNext()},250)};
 tm=setTimeout(()=>close(0),T);cd=setInterval(left,250);
 el.querySelector('.ok').onclick=()=>close(1);el.querySelector('.no').onclick=()=>close(0);
 el.querySelector('.ivbar u').style.animationDuration=T+'ms'}
let lbw=null;window.ARR_LB=new Map();
const lbOn=()=>!!lbw&&lbw.readyState===1,lbSend=d=>{if(lbOn())lbw.send(JSON.stringify(d))};
function lbOpen(){let U='';try{U=(ARR_WS_URL||localStorage.getItem('arr_ws')||'').replace(/\/+$/,'')}catch(e){}
 if(!/^wss:\/\//.test(U)||lbw)return;const w=lbw=new WebSocket(U+'/lobby');
 w.onopen=()=>lbSend({k:'hi',n:clean(PN),s:1});
 w.onmessage=e=>{let d;try{d=JSON.parse(e.data)}catch(x){return}
  if(d.k==='ro')window.ARR_LB=new Map(d.l);
  else if(d.k==='rl'){window.ARR_RL=Array.isArray(d.l)?d.l:[];try{window.ARR_RLU&&window.ARR_RLU()}catch(e){}}
  else if(d.k==='iv'){if(!MP.on)invPop(d.from,()=>connect(d.c).then(()=>{window.ARR_INV&&window.ARR_INV(d.from)}))}
  else if(d.k==='ivr')setMsg(d.ok?'Convite enviado':'Jogador não está online');
  };
 w.onclose=()=>{if(lbw===w){lbw=null;window.ARR_LB=new Map()}setTimeout(()=>{if(window.ARR_USER)lbOpen()},5000)};w.onerror=()=>{try{w.close()}catch(e){}}}
setInterval(()=>lbSend({k:'st',n:clean(PN),s:(MP.on||MP.arm)?3:1}),5000);

setInterval(()=>{if(MP.bus&&!MP.on&&!MP.arm){MP.host=amHost()?1:0;MP.bus.state({n:clean(PN),c:CH})}
},700);
window.ARR_NET={connect,leave,hostGo,amHost,lbSend,lbOn,lbOpen,lbClose:()=>{const w=lbw;lbw=null;window.ARR_LB=new Map();try{w&&w.close()}catch(e){}}};
$('menuBtn').addEventListener('click',()=>{MP.on=0;if(MP.bus)MP.bus.state({s:'l'})},true);
})();
