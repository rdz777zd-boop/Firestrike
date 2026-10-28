
(function(){
const $=id=>document.getElementById(id),N=()=>window.ARR_NET,DB='https://armada-relay.rdz777zd.workers.dev/db';
/* LOGIN COM GOOGLE: cole aqui o seu Client ID (Google Cloud Console > APIs e servicos > Credenciais > ID do cliente OAuth > Aplicativo da Web) */
const GOOGLE_CLIENT_ID='174515100200-bin2u6p3tklru53qicmuea6jh0fbu8od.apps.googleusercontent.com';
const gm=()=>typeof MS!=='undefined'?MS:1,sm=n=>{MS=n};
let user=null,L={i:0,end:0,go:0,ls:0,s:0,tb:0,rm:0,nt:'',ne:0};
const root=document.createElement('div');
root.innerHTML='<div id="au" class="hide"><div class="abx"><div class="alg">🔥</div><h2>FIRE STRIKE</h2><div class="asub">Entre para salvar seu progresso e jogar online com amigos.</div><div id="au_g" style="display:flex;justify-content:center;min-height:44px"></div><button id="au_gu" class="gst">ENTRAR COMO CONVIDADO</button><div class="aor"><span>ou use usuário e senha</span></div><div class="atb"><button id="au_t0" class="on">ENTRAR</button><button id="au_t1">CRIAR CONTA</button></div><input id="au_u" maxlength="12" placeholder="USUÁRIO" autocomplete="username"><input id="au_p" type="password" maxlength="30" placeholder="SENHA" autocomplete="current-password"><input id="au_n" class="hide" maxlength="12" placeholder="NICK (o nome que todos veem)" autocomplete="off"><div class="am" id="au_m"></div><button id="au_l" class="agb">ENTRAR</button><button id="au_r" class="agb hide">CRIAR CONTA</button><div class="anote">Convidado joga offline e não salva ranking online. Você pode vincular o Google depois, nas configurações.</div></div></div>'
+'<div id="sb" class="hide"><div id="sbt"></div><div id="sbp"><i></i></div><button id="sbc">CANCELAR</button></div><div id="lo" class="hide"><canvas id="lcv"></canvas><div id="lhd"><div id="lcd"></div><div id="lst"></div></div><div id="lbt"><button id="lof">OFFLINE</button><button id="lsa">SAIR</button><button id="lac">TROCAR CONTA</button></div><div id="lon"></div><div id="llg"></div><div id="lcb"><input id="lci" maxlength="120" placeholder="Conversar..."><button id="lcs">ENVIAR</button></div></div>';
document.body.appendChild(root);
const show=id=>$(id).classList.remove('hide'),hide=id=>$(id).classList.add('hide'),am=t=>{$('au_m').textContent=t||'';try{const se=$('set');if(t&&se&&!se.classList.contains('hide'))soon(t)}catch(e){}};
function sha256js(s){const K=[],H=[];let p=0;const isP=n=>{for(let f=2;f*f<=n;f++)if(n%f==0)return 0;return 1};
 for(let c=2;p<64;c++)if(isP(c)){if(p<8)H[p]=(Math.pow(c,.5)%1*4294967296)|0;K[p++]=(Math.pow(c,1/3)%1*4294967296)|0}
 const b=new TextEncoder().encode(s),l=b.length,n=((l+9+63)>>6)<<4,w=new Uint32Array(n);
 for(let i=0;i<l;i++)w[i>>2]|=b[i]<<(24-(i&3)*8);w[l>>2]|=128<<(24-(l&3)*8);w[n-1]=l*8;
 const h=H.slice(),x=new Int32Array(64),R=(v,k)=>(v>>>k)|(v<<(32-k));
 for(let j=0;j<n;j+=16){for(let i=0;i<64;i++){if(i<16)x[i]=w[j+i];else{const a=x[i-15],c=x[i-2];x[i]=(x[i-16]+(R(a,7)^R(a,18)^(a>>>3))+x[i-7]+(R(c,17)^R(c,19)^(c>>>10)))|0}}
  let[a,c,d,e,f,g,q,r]=h;
  for(let i=0;i<64;i++){const t1=(r+(R(f,6)^R(f,11)^R(f,25))+((f&g)^(~f&q))+K[i]+x[i])|0,t2=((R(a,2)^R(a,13)^R(a,22))+((a&c)^(a&d)^(c&d)))|0;r=q;q=g;g=f;f=(e+t1)|0;e=d;d=c;c=a;a=(t1+t2)|0}
  h[0]=(h[0]+a)|0;h[1]=(h[1]+c)|0;h[2]=(h[2]+d)|0;h[3]=(h[3]+e)|0;h[4]=(h[4]+f)|0;h[5]=(h[5]+g)|0;h[6]=(h[6]+q)|0;h[7]=(h[7]+r)|0}
 return h.map(v=>(v>>>0).toString(16).padStart(8,'0')).join('')}
const shaOld=s=>{let h=5381;for(const c of s)h=(h*33^c.charCodeAt(0))>>>0;return'x'+h.toString(16)};
async function sha(s){try{if(window.crypto&&crypto.subtle){const b=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(s));return[...new Uint8Array(b)].map(x=>x.toString(16).padStart(2,'0')).join('')}}catch(e){}return sha256js(s)}
async function J(p,o){let last;for(let t=0;t<2;t++){const c=new AbortController(),tm=setTimeout(()=>c.abort(),15000);try{const r=await fetch(DB+p+'.json',Object.assign({signal:c.signal,cache:'no-store'},o));if(!r.ok)throw('http'+r.status);return await r.json()}catch(e){last=e;J.last=String(e&&e.name==='AbortError'?'tempo esgotado':e)}finally{clearTimeout(tm)}await new Promise(r=>setTimeout(r,500))}throw last}
/* dono do jogo: descobre o usuario dono do ID 33044471 pelo indice de IDs (nao da pra falsificar pelo perfil) */
(()=>{const OJ=async()=>{for(const p of['/ids/'+OWNER_ID,'/inbox/id'+OWNER_ID]){try{const v=await J(p);let u=v&&typeof v.u=='string'?v.u:'',nk='';if(!/^[A-Za-z0-9_]{3,12}$/.test(u)){if(p.indexOf('/players/')===0&&v&&typeof v.n=='string'&&/^[A-Za-z0-9_]{2,12}$/.test(v.n)){nk=v.n}else continue}else{nk=u;try{const ac=await getAcc(u.toLowerCase());if(ac&&ac.nk)nk=ac.nk}catch(e){}}
if(String(window.ARR_UID||'')===OWNER_ID)return 1;OWNERS.length=0;OWNERS.push(nk);try{localStorage.setItem('arr_owner',nk)}catch(e){}return 1}catch(e){}}return 0};
OJ();setInterval(OJ,45000)})();
const paths=async u=>['/accounts/'+u,'/inbox/ac'+(await sha('acc:'+u)).slice(0,20)];
/* ---- ID unico da conta (8 digitos, indice /ids/<id> checado antes de gravar) ---- */
const idp=i=>['/ids/'+i,'/inbox/id'+i],PUTH={method:'PUT',headers:{'Content-Type':'application/json'}};
/* verificado permanente (dado pelo dono via ID): /verified/<id> */
const namesOfId=async id=>{for(const p of['/ids/'+id,'/inbox/id'+id]){try{const v=await J(p),u=v&&typeof v.u=='string'?v.u:'';if(/^[A-Za-z0-9_]{3,12}$/.test(u)){const o=[u];try{const ac=await getAcc(u.toLowerCase());if(ac&&ac.nk)o.push(ac.nk)}catch(e){}return o}}catch(e){}}return[]};
const nickOfId=async id=>{for(const p of['/ids/'+id,'/inbox/id'+id]){try{const v=await J(p),u=v&&typeof v.u=='string'?v.u:'';if(/^[A-Za-z0-9_]{3,12}$/.test(u)){let nk=u;try{const ac=await getAcc(u.toLowerCase());if(ac&&ac.nk)nk=ac.nk}catch(e){}return nk}}catch(e){}}return''};
const vcp=i=>['/vclaim/'+i,'/inbox/vc'+i];
async function vcGet(id){for(const p of vcp(id)){try{const v=await J(p);if(v)return v}catch(e){}}return null}
async function VL(){try{let v=null,v2=null,ok=0;try{v=await J('/verified');ok=1}catch(e){}try{v2=await J('/inbox/verlist');ok=1}catch(e){}if(!ok)return;
 const G={};if(v2&&typeof v2=='object')Object.assign(G,v2);if(v&&typeof v=='object')Object.assign(G,v);
 const ns=new Set(),me=String(window.ARR_UID||'');
 for(const id in G){if(!/^\d{6,10}$/.test(id))continue;const r=G[id]||{},cl=await vcGet(id),got=!!(cl&&(!r.t||cl.t===r.t));
  if(id===me){window.ARR_VGRANT={id,t:r.t||0,got};if(!got)vgNotify(id,r.t||0)}
  if(!got)continue;
  const L=await namesOfId(id);if(typeof r.n=='string')L.push(r.n);if(id===me){try{if(window.ARR_USER)L.push(window.ARR_USER)}catch(e){}try{if(typeof PN!=='undefined')L.push(PN)}catch(e){}}
  L.forEach(x=>{x=String(x||'').replace(/^\*/,'').trim().toLowerCase();if(x)ns.add(x)})}
 if(window.ARR_VGRANT&&!G[window.ARR_VGRANT.id])window.ARR_VGRANT=null;
 VERS.clear();ns.forEach(n=>VERS.add(n));try{localStorage.setItem('arr_vers',JSON.stringify([...ns]))}catch(e){}}catch(e){}}
/* aviso "Voce recebeu o VERIFICADO" (uma vez por concessao) */
function vgNotify(id,t){try{if(typeof QXN==='undefined'||typeof qxAdd!=='function')return;if(QXN.some(n=>n.act=='ver'&&n.vt===t))return;qxAdd('Você recebeu o selo VERIFICADO! Toque em COLETAR para ativar.');const n=QXN[0];n.act='ver';n.al='COLETAR';n.vt=t;if(typeof qxSv=='function')qxSv('arr_nt',QXN);if(typeof qxBadge=='function')qxBadge();if(typeof soon=='function')soon('Novo aviso: selo VERIFICADO')}catch(e){}}
window.arrVerClaim=async()=>{const g=window.ARR_VGRANT;if(!g)return{e:'Nenhum selo para coletar.'};const body=JSON.stringify({t:g.t,c:Date.now()});let err='';
 for(const p of vcp(g.id)){try{await J(p,Object.assign({body},PUTH));err='';break}catch(e){err=String(e)}}
 if(err)return{e:'Falha ao coletar ('+err+'). Tente de novo.'};await VL();return{ok:1}};
VL();setInterval(VL,60000);
/* ---- BANIMENTO por ID: /banned/<id> (ou lista /inbox/banlist). Checado no login e a cada 30s ---- */
async function bnRead(){let a=null,b=null,ok=0;try{a=await J('/banned');ok=1}catch(e){}try{b=await J('/inbox/banlist');ok=1}catch(e){}if(!ok)return null;const G={};if(b&&typeof b=='object')Object.assign(G,b);if(a&&typeof a=='object')Object.assign(G,a);return G}
window.arrBanSet=async(id,on,reason)=>{id=String(id||'').trim();if(String(window.ARR_UID||'')!==OWNER_ID)return{e:'Só o dono pode usar esse comando.'};
 if(!/^\d{6,10}$/.test(id))return{e:'ID inválido. Use o ID de 8 dígitos do jogador.'};
 if(id===OWNER_ID)return{e:'Você não pode banir o dono.'};
 const nm=await namesOfId(id);let n=nm.length?nm[nm.length-1]:'';
 const G=await bnRead();if(on&&!n)return{e:'Nenhum jogador com o ID '+id+'.'};if(!on&&!n&&G&&G[id]&&G[id].n)n=G[id].n;if(!on&&!(G&&G[id]))return{e:'O ID '+id+' não está banido.'};
 const rec={n:n||'?',t:Date.now(),r:String(reason||'').slice(0,60)};let err='';
 try{if(on)await J('/banned/'+id,Object.assign({body:JSON.stringify(rec)},PUTH));else await J('/banned/'+id,{method:'DELETE'})}catch(e){err=String(e)}
 if(err||!on){try{let L=null;try{L=await J('/inbox/banlist')}catch(e){}if(!L||typeof L!='object')L={};if(on)L[id]=rec;else delete L[id];await J('/inbox/banlist',Object.assign({body:JSON.stringify(L)},PUTH));err=''}catch(e2){if(err||on)return{e:'Falha ao salvar ('+err+' / '+String(e2)+'). Tente de novo.'}}}
 setTimeout(BL,200);return{n:n||'?',id}};
window.arrBanList=async()=>{const G=await bnRead();if(!G)return null;return Object.keys(G).filter(k=>/^\d{6,10}$/.test(k)).map(k=>({id:k,n:String((G[k]||{}).n||'?'),r:String((G[k]||{}).r||'')}))};
function banLock(r,id){if(window.__banned)return;window.__banned=1;try{localStorage.setItem('arr_ban',id||'1')}catch(e){}
 try{const n=N();if(n){try{n.leave()}catch(e){}try{n.lbClose()}catch(e){}}}catch(e){}
 try{hide('lo')}catch(e){}
 const d=document.createElement('div');d.id='banov';d.style.cssText='position:fixed;inset:0;z-index:2147483000;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;padding:20px;box-sizing:border-box;background:#0a0807;color:#fff;font-family:Trebuchet MS,Arial,sans-serif;text-align:center;touch-action:none;user-select:none';
 const h=document.createElement('div');h.textContent='VOCÊ FOI BANIDO';h.style.cssText='font:900 clamp(26px,7vw,44px) Trebuchet MS,Arial;color:#ff3b30;letter-spacing:2px';
 const p=document.createElement('div');p.textContent='Sua conta (ID '+(id||'?')+') foi banida pelo dono do jogo.'+(r&&r.r?' Motivo: '+r.r:'');p.style.cssText='font-size:15px;max-width:460px;line-height:1.5;opacity:.9';
 d.appendChild(h);d.appendChild(p);['pointerdown','touchstart','keydown','click'].forEach(t=>d.addEventListener(t,e=>{e.stopPropagation()},true));document.body.appendChild(d)}
async function BL(){try{const G=await bnRead();if(!G)return;window.ARR_BANS=G;const me=String(window.ARR_UID||'');
 let dev='';try{dev=localStorage.getItem('arr_ban')||''}catch(e){}
 if(me&&me!==OWNER_ID&&G[me]){banLock(G[me],me);return}
 if(dev&&me&&dev===me&&!G[me]){try{localStorage.removeItem('arr_ban')}catch(e){}}
 else if(dev&&me&&dev!==me&&me!==OWNER_ID&&G[dev]){banLock(G[dev],dev)}}catch(e){}}
setInterval(BL,30000);setTimeout(BL,1500);
window.arrVerSet=async(id,on)=>{id=String(id||'').trim();if(String(window.ARR_UID||'')!==OWNER_ID)return{e:'Só o dono pode usar esse comando.'};if(!/^\d{6,10}$/.test(id))return{e:'ID inválido. Use o ID de 8 dígitos do jogador.'};
 const n=await nickOfId(id);if(!n)return{e:'Nenhum jogador com o ID '+id+'.'};
 let err='';const GT=Date.now();
 try{if(on)await J('/verified/'+id,Object.assign({body:JSON.stringify({n,t:GT})},PUTH));else await J('/verified/'+id,{method:'DELETE'})}catch(e){err=String(e)}
 if(err){try{let L=null;try{L=await J('/inbox/verlist')}catch(e){}if(!L||typeof L!='object')L={};if(on)L[id]={n,t:GT};else delete L[id];await J('/inbox/verlist',Object.assign({body:JSON.stringify(L)},PUTH));err=''}catch(e2){return{e:'Falha ao salvar ('+err+' / '+String(e2)+'). Tente de novo.'}}}
 if(!on){for(const p of vcp(id)){try{await J(p,{method:'DELETE'})}catch(e){}}}
 await VL();return{n}};
const rid=()=>{let n;try{n=crypto.getRandomValues(new Uint32Array(1))[0]}catch(e){n=Math.floor(Math.random()*4294967295)}return String(10000000+n%90000000)};
async function newId(k){for(let t=0;t<10;t++){const i=rid();let taken=0;for(const p of idp(i)){try{const v=await J(p);if(v){taken=1;break}await J(p,Object.assign({body:JSON.stringify({u:k})},PUTH));return i}catch(e){}}if(!taken)return''}return''}
async function ensureId(k,a){if(a&&a.i)return String(a.i);try{const f=await getAcc(k);if(f&&f.i)return String(f.i)}catch(e){}const i=await newId(k);if(!i)return'';const rec=Object.assign({},a,{i});for(const q of await paths(k)){try{await J(q,Object.assign({body:JSON.stringify(rec)},PUTH));try{const v=await getAcc(k);if(v&&v.i)return String(v.i)}catch(e){}return i}catch(e){}}return''}
const LK='arr_acc:';
const lAcc=k=>{try{const v=JSON.parse(localStorage.getItem(LK+k)||'null');return v&&v.h&&String(v.u||'').toLowerCase()===k?v:null}catch(e){return null}};
const lSave=(k,r)=>{try{localStorage.setItem(LK+k,JSON.stringify(r))}catch(e){}};
async function getAcc(u){let ok=0;for(const p of await paths(u)){try{const v=await J(p);ok=1;if(v&&v.h&&String(v.u||'').toLowerCase()===u)return v}catch(e){}}if(!ok)throw 0;return null}
async function pushAcc(k,rec){try{if(!rec.i){const i=await newId(k);if(i)rec.i=i}
 if(rec.nk){const c=await claimNick(rec.nk,k);if(c==='taken'){rec.nk=String(rec.nk).slice(0,8)+String(rec.i||(100+Math.random()*900|0)).slice(-3);await claimNick(rec.nk,k)}}
 for(const q of await paths(k)){try{await J(q,Object.assign({body:JSON.stringify(rec)},PUTH));lSave(k,rec);return 1}catch(e){}}}catch(e){}return 0}
let AB=0;async function auth(reg){if(AB)return;AB=1;try{await auth1(reg)}finally{AB=0}}
const nkp=async n=>{const h=(await sha('nk:'+String(n).toLowerCase())).slice(0,24);return['/nicks/'+h,'/inbox/nk'+h]};
async function claimNick(n,k){let ok=0;const ps=await nkp(n);
 for(const q of ps){try{const v=await J(q);ok=1;if(v&&v.u&&v.u!==k)return'taken'}catch(e){}}
 if(!ok)return false;
 for(const q of ps){try{await J(q,Object.assign({body:JSON.stringify({u:k})},PUTH));return true}catch(e){}}return false}
async function freeNick(n,k){for(const q of await nkp(n)){try{const v=await J(q);if(v&&v.u===k)await J(q,{method:'DELETE'})}catch(e){}}}
const NKRE=/^[\p{L}\p{N} _.-]{2,12}$/u;
async function auth1(reg){let u=$('au_u').value.trim();const p=$('au_p').value;
 if(!/^[A-Za-z0-9_]{3,12}$/.test(u))return am('Usuário: 3 a 12 letras, números ou _');
 if(p.length<4)return am('Senha: mínimo 4 caracteres');
 let nk=($('au_n').value||'').replace(/\s+/g,' ').trim();
 if(reg){if(!nk)nk=u;if(!NKRE.test(nk)||nk.toLowerCase()==='voce')return am('Nick: 2 a 12 letras, números, espaço, _ . -')}
 am('Conectando...');
 const k=u.toLowerCase();let sa=null,down=0;
 try{sa=await getAcc(k)}catch(e){down=1}
 const la=lAcc(k);
 try{
  const cand=[sa,la].filter(Boolean);let hit=null;
  for(const c of cand){const t=c.s+':'+p;if(c.h===await sha(t)||c.h===shaOld(t)){hit=c;break}}
  if(hit){/* senha confere: entra (vale tambem para "criar" uma conta que ja existia com essa senha) */
   u=hit.u||u;let aid=hit.i?String(hit.i):'';
   if(hit===sa){aid=await ensureId(k,sa);nk=sa.nk||'';
    if(!nk){nk=u.slice(0,12);let c=await claimNick(nk,k);if(c==='taken'){nk=u.slice(0,8)+String(aid||'').slice(-3);await claimNick(nk,k)}}}
   else{nk=hit.nk||'';if(!down&&!sa){const r2=Object.assign({},hit);await pushAcc(k,r2);aid=r2.i?String(r2.i):aid;nk=r2.nk||nk}}
   lSave(k,Object.assign({},hit,aid?{i:aid}:{},nk?{nk}:{}));
   return enter(u,aid,nk)}
  if(!reg){if(!cand.length&&down)return am('Servidor indisponível ('+(J.last||'sem resposta')+'), tente de novo');return am('Usuário ou senha incorretos')}
  if(sa||(la&&down))return am('Esse usuário já existe');
  let cn=false;if(!down)cn=await claimNick(nk,k);
  if(cn==='taken')return am('Esse nick já está em uso');
  const s=Math.random().toString(36).slice(2,10),rec={u,s,h:await sha(s+':'+p),t:Date.now(),nk};let aid='',ok=0;
  if(!down&&cn){aid=await newId(k);if(aid)rec.i=aid;
   for(const q of await paths(k)){try{await J(q,Object.assign({body:JSON.stringify(rec)},PUTH));ok=1;break}catch(e){}}
   if(ok){try{const v=await getAcc(k);if(v&&v.h!==rec.h){await freeNick(nk,k);return am('Esse usuário já existe')}}catch(e){}}
   else await freeNick(nk,k)}
  lSave(k,rec);
  if(!ok){try{soon('Servidor indisponível: conta salva só neste aparelho')}catch(e){}}
  enter(u,aid,nk)}catch(e){am('Erro ao conectar, tente de novo')}}
/* ---- LOGIN COM GOOGLE (Google Identity Services) ---- */
const gParse=cred=>{let pl=null;try{pl=JSON.parse(decodeURIComponent(escape(atob(String(cred).split('.')[1].replace(/-/g,'+').replace(/_/g,'/')))))}catch(e){}return pl&&pl.sub&&pl.aud===GOOGLE_CLIENT_ID?pl:null};
const setOpen=()=>{const e=$('set');return !!e&&!e.classList.contains('hide')};
function gCb(r){if(setOpen()&&user)gLink(r.credential);else gAuth(r.credential)}
async function gAuth(cred){if(AB)return;AB=1;try{
 const pl=gParse(cred);
 if(!pl)return am('Login do Google inválido, tente de novo');
 am('Entrando com Google...');
 const u='g_'+(await sha('google:'+pl.sub)).slice(0,10),k=u.toLowerCase();let sa=null,down=0;
 try{sa=await getAcc(k)}catch(e){down=1}
 let a=sa||lAcc(k);
 if(a&&a.ptr){/* Google vinculado a uma conta de usuario/senha: entra nela */
  try{window.ARR_TK&&ARR_TK.clear()}catch(e){}
  const tk=String(a.ptr).toLowerCase();let ts=null,td=0;try{ts=await getAcc(tk)}catch(e){td=1}const t=ts||lAcc(tk);
  if(t){let aid=t.i?String(t.i):'';if(ts&&!aid)aid=await ensureId(tk,ts);lSave(tk,Object.assign({},t,aid?{i:aid}:{}));return enter(t.u||tk,aid,t.nk||'')}
  if(td)return am('Servidor indisponível, tente de novo');a=null;sa=null}
 if(a){let aid=a.i?String(a.i):'';if(sa&&!aid)aid=await ensureId(k,sa);if(!sa&&!down){const r2=Object.assign({},a);await pushAcc(k,r2);if(r2.i)aid=String(r2.i)}
  lSave(k,Object.assign({},a,aid?{i:aid}:{}));return enter(a.u||u,aid,a.nk||'')}
 let nk=String(pl.given_name||pl.name||'').replace(/[^\p{L}\p{N} _.-]/gu,'').replace(/\s+/g,' ').trim().slice(0,12);
 if(!NKRE.test(nk)||nk.toLowerCase()==='voce')nk='Jogador'+u.slice(2,6);
 const rec={u,s:'g',h:'g:'+await sha('google:'+pl.sub),t:Date.now(),nk,g:1};let ok=0;
 if(!down)ok=await pushAcc(k,rec);
 lSave(k,rec);if(!ok){try{soon('Servidor indisponível: conta salva só neste aparelho')}catch(e){}}
 enter(u,rec.i?String(rec.i):'',rec.nk)}
 catch(e){am('Erro no login do Google, tente de novo')}finally{AB=0}}
function gInit(){const box=$('au_g');if(!box)return;
 /* o Google bloqueia login dentro de WebView (app/APK): mostra aviso claro em vez de erro */
 if(/; wv\)|Android.*Version\/4\.0/.test(navigator.userAgent)){box.innerHTML='<button id="au_gb" class="s" style="width:100%;margin:0">ENTRAR COM GOOGLE</button>';
  $('au_gb').onclick=()=>am('O Google bloqueia login dentro do app. Use usuário e senha ou abra o jogo no navegador.');return}
 if(!/^[0-9A-Za-z._-]+\.apps\.googleusercontent\.com$/.test(GOOGLE_CLIENT_ID)||/^COLE_AQUI/.test(GOOGLE_CLIENT_ID)){
  box.innerHTML='<button id="au_gb" class="s" style="width:100%;margin:0">ENTRAR COM GOOGLE</button>';
  $('au_gb').onclick=()=>am('Google ainda não configurado: falta o GOOGLE_CLIENT_ID no código.');return}
 const sc=document.createElement('script');sc.src='https://accounts.google.com/gsi/client';sc.async=true;
 sc.onload=()=>{try{google.accounts.id.initialize({client_id:GOOGLE_CLIENT_ID,ux_mode:'popup',auto_select:false,callback:r=>{try{gCb(r)}catch(e){am('Erro no login do Google, tente de novo')}}});
  google.accounts.id.renderButton(box,{theme:'filled_black',size:'large',text:'continue_with',shape:'pill',width:280,locale:'pt-BR'});gbtn($('gl_box'))}catch(e){am('Não foi possível carregar o login do Google')}};
 sc.onerror=()=>am('Não foi possível carregar o login do Google (sem internet?)');
 document.head.appendChild(sc)}
const gbtn=el=>{try{if(el&&window.google&&google.accounts&&google.accounts.id)google.accounts.id.renderButton(el,{theme:'filled_black',size:'large',text:'continue_with',shape:'pill',width:260,locale:'pt-BR'})}catch(e){}};
async function glRefresh(){const st=$('gl_st'),bx=$('gl_box');if(!st||!bx)return;
 const showBtn=t=>{st.textContent=t;bx.style.display='flex';gbtn(bx)},showOk=t=>{st.textContent=t;bx.style.display='none'};
 if(!user){showBtn('Você está como convidado. Entre com o Google para salvar sua conta.');return}
 const u0=user,k=String(user).toLowerCase();showBtn('Vincule o Google para entrar sem digitar usuário e senha.');
 let a=null;try{a=await getAcc(k)}catch(e){a=lAcc(k)}
 if(user!==u0||!a)return;
 if(a.g)showOk('\u2713 Conta Google conectada');else if(a.gl)showOk('\u2713 Google vinculado a esta conta')}
let GLB=0;
async function gLink(cred){if(AB||GLB)return;GLB=1;try{
 const pl=gParse(cred);if(!pl)return am('Login do Google inválido, tente de novo');
 if(!user)return;const k=String(user).toLowerCase();
 const gu='g_'+(await sha('google:'+pl.sub)).slice(0,10),gk=gu.toLowerCase();
 let me=null;try{me=await getAcc(k)}catch(e){return am('Servidor indisponível, tente de novo')}
 if(!me)return am('Conta não encontrada no servidor');
 if(me.g)return am('Esta já é uma conta Google');
 if(me.gl)return am('Esta conta já tem um Google vinculado');
 let ex=null;try{ex=await getAcc(gk)}catch(e){return am('Servidor indisponível, tente de novo')}
 if(ex&&!(ex.ptr&&String(ex.ptr).toLowerCase()===k)){
  if(!ex.ptr)return am('Esse Google já tem uma conta própria. Saia e entre com ele.');
  let tg=1;try{tg=await getAcc(String(ex.ptr).toLowerCase())}catch(e){}
  if(tg)return am('Esse Google já está vinculado a outra conta')}
 const rec={u:gu,s:'g',h:'g:'+await sha('google:'+pl.sub),t:Date.now(),ptr:k};let ok=0;
 for(const q of await paths(gk)){try{await J(q,Object.assign({body:JSON.stringify(rec)},PUTH));ok=1;break}catch(e){}}
 if(!ok)return am('Não foi possível vincular agora. Tente de novo');
 const nm=Object.assign({},me,{gl:gk});ok=0;
 for(const q of await paths(k)){try{await J(q,Object.assign({body:JSON.stringify(nm)},PUTH));ok=1;break}catch(e){}}
 if(!ok)return am('Não foi possível vincular agora. Tente de novo');
 lSave(k,nm);try{soon('Google vinculado com sucesso!')}catch(e){}glRefresh()}
 catch(e){am('Erro ao vincular, tente de novo')}finally{GLB=0}}
window.arrAccNick=async u=>{try{const a=await getAcc(String(u).toLowerCase());return a?(a.nk||a.u||''):''}catch(e){return''}};
window.arrSetNick=async v=>{const u=window.ARR_USER;if(!u)return false;const k=u.toLowerCase();
 try{const a=await getAcc(k);if(!a)return false;const old=a.nk||u;
  const c=await claimNick(v,k);if(c==='taken')return'taken';if(!c)return false;
  const rec=Object.assign({},a,{nk:v});let ok=0;for(const q of await paths(k)){try{await J(q,Object.assign({body:JSON.stringify(rec)},PUTH));ok=1;break}catch(e){}}
  if(!ok)return false;if(old.toLowerCase()!==v.toLowerCase())await freeNick(old,k);
  try{localStorage.setItem('arr_nk:'+k,v)}catch(e){}
  if(String(window.ARR_UID||'')===OWNER_ID){OWNERS.length=0;OWNERS.push(v)}
  return true}catch(e){return false}};
function enter(u,aid,nk){user=u;window.ARR_USER=u;try{window.ARR_TK&&ARR_TK.commit(u)}catch(e){}try{$('au_gu').classList.remove('hide')}catch(e){}const k=u.toLowerCase(),ik='arr_uid:'+k;try{if(aid)localStorage.setItem(ik,aid);else aid=localStorage.getItem(ik)||''}catch(e){}window.ARR_UID=aid||'';
 if(!nk){try{nk=localStorage.getItem('arr_nk:'+k)||''}catch(e){}}nk=nk||u.slice(0,12);
 if(!aid)getAcc(k).then(a=>a&&ensureId(k,a)).then(i=>{if(i){window.ARR_UID=i;try{localStorage.setItem(ik,i)}catch(e){}}}).catch(()=>{});
 try{localStorage.setItem('arr_sess',u);localStorage.setItem('arr_pn',nk);localStorage.setItem('arr_nk:'+k,nk)}catch(e){}
 if(String(aid||'')===OWNER_ID){OWNERS.length=0;OWNERS.push(nk)}
 try{PN=nk;if(typeof pfShow==='function')pfShow()}catch(e){}
 setTimeout(()=>{try{BL()}catch(e){}},600);setTimeout(()=>{try{BL()}catch(e){}},4000);
 $('au_p').value='';$('au_n').value='';am('');hide('au');try{if(setOpen())glRefresh()}catch(e){}try{window.arrFrLogin&&window.arrFrLogin(u)}catch(e){}try{const n=N();if(n){n.lbOpen();n.lbSend({k:'hi',n:PN,s:1})}}catch(e){}
 getAcc(k).then(a=>{const m=a&&a.nk;if(m&&m!==PN){try{applyNick(m)}catch(e){}try{N()&&N().lbSend({k:'hi',n:PN,s:1})}catch(e){}try{window.arrPub&&window.arrPub()}catch(e){}}}).catch(()=>{})}
let AM=0;const setMode=m=>{AM=m;$('au_t0').classList.toggle('on',!m);$('au_t1').classList.toggle('on',!!m);$('au_n').classList.toggle('hide',!m);$('au_l').classList.toggle('hide',!!m);$('au_r').classList.toggle('hide',!m);$('au_p').setAttribute('autocomplete',m?'new-password':'current-password');am('')};
function guest(){am('');try{if(window.ARR_USER){PN='Convidado';if(typeof pfShow==='function')pfShow()}}catch(e){}try{N()&&N().leave()}catch(e){}user=null;window.ARR_USER=null;window.ARR_UID='';try{localStorage.removeItem('arr_sess')}catch(e){}hide('au');try{soon('Você entrou como convidado')}catch(e){}}
$('au_t0').onclick=()=>setMode(0);$('au_t1').onclick=()=>setMode(1);
$('au_l').onclick=()=>auth(0);$('au_r').onclick=()=>auth(1);$('au_gu').onclick=guest;gInit();
$('au_p').onkeydown=e=>{if(e.key==='Enter')auth(AM)};$('au_n').onkeydown=e=>{if(e.key==='Enter')auth(1)};
try{const se=$('set');if(se)new MutationObserver(()=>{if(!se.classList.contains('hide'))glRefresh()}).observe(se,{attributes:true,attributeFilter:['class']})}catch(e){}
/* ---- busca + lobby (mapa) ---- */
const TL=35000;
function msg(n,t){const d=document.createElement('div'),b=document.createElement('b');b.textContent=(n?String(n).slice(0,12)+': ':'');d.appendChild(b);d.appendChild(document.createTextNode(String(t).slice(0,120)));const g=$('llg');g.appendChild(d);while(g.children.length>5)g.firstChild.remove()}
const sys=t=>msg('',t);
const P={x:320,y:300,tx:null,ty:null,say:'',st:0},O={},B=[],K={};
window.ARR_CHAT=(f,m)=>{msg(m.n||'?',m.x||'');if(O[f]){O[f].say=String(m.x||'').slice(0,40);O[f].st=Date.now()}};
window.ARR_CD=(f,m)=>{if(N().amHost()||typeof m.r!=='number')return;if($('lo').classList.contains('hide')&&!window.MP.arm&&!window.MP.on){L.lob=1;openLobby()}L.end=Date.now()+Math.min(TL,Math.max(0,m.r));if(m.sd)L.sd=m.sd|0};
window.ARR_POS=(f,m)=>{const o=O[f]||(O[f]={x:m.x,y:m.y,say:'',st:0});o.tx=+m.x||0;o.ty=+m.y||0;o.n=String(m.n||'').slice(0,12);o.t=Date.now()};
function send(){const t=$('lci').value.trim().slice(0,120),M=window.MP;if(!t)return;$('lci').value='';msg(user,t);P.say=t.slice(0,40);P.st=Date.now();if(M.bus)M.bus.send({t:'chat',n:user,x:t})}
$('lcs').onclick=send;$('lci').onkeydown=e=>{if(e.key==='Enter')send()};
const orig=window.startL;
window.startL=function(){if(!user||window.MP.arm||!orig||window.frWN)return orig&&orig.apply(this,arguments);
 if(party()&&hum()>0){if(!N().amHost()){say('Só o líder da equipe inicia a partida');return}if((TB==0||TB==2)&&gm()<2){say('Com amigos na equipe jogue em Duo ou Squad');return}if(TB==4&&typeof SALA!=='undefined'&&SALA.n<2){say('Com amigos na equipe use 2x2 ou mais');return}}
if(L.rm){L.rm=0;hide('sb');if(window.MP.bus&&N().amHost()&&hum()>0)N().hostGo();else{N().leave();orig()}return}L.lob=typeof TB!=='undefined'&&(TB==0||TB==2);if(TB==2&&window.frWarBad&&frWarBad().length)return orig.apply(this,arguments);search()};
$('play').onclick=window.startL;$('again').onclick=window.startL;
const party=()=>/^p[a-z0-9]{3,7}$/.test((window.MP&&window.MP.code)||''),say=t=>{try{soon(t)}catch(e){nota(t)}},hum=()=>{const M=window.MP;return M.bus?Object.keys(M.pr).filter(k=>M.pr[k]&&M.pr[k].s==='l').length:0},nota=t=>{L.nt=t;L.ne=Date.now()+3000};
function tm(){}
function search(){if(L.s)return;L.rm=0;show('sb');$('sbp').style.display='';$('sbc').textContent='CANCELAR';const t0=Date.now(),D=8000;if(!party())joinRoom(0);
 L.s=setInterval(()=>{const r=D-(Date.now()-t0);if(party()&&window.MP.bus&&Date.now()-(L.sbs||0)>=900){L.sbs=Date.now();try{window.MP.bus.send({t:'sb',on:1,r:Math.max(0,r),d:D})}catch(e){}}$('sbt').textContent=Date.now()<L.ne?L.nt:'BUSCANDO PARTIDA... '+Math.max(0,Math.ceil(r/1000))+'s';$('sbp').firstChild.style.width=Math.min(100,(Date.now()-t0)/D*100)+'%';tm();
  if(r<=0){stopS(1);if(L.lob)openLobby();else if(window.MP.bus&&N().amHost()&&hum()>0)N().hostGo();else{N().leave();orig()}}},200)}
function stopS(k){clearInterval(L.s);L.s=0;hide('sb');if(party()&&window.MP.bus){try{window.MP.bus.send({t:'sb',on:0})}catch(e){}}if(!k&&!party())N().leave()}
$('sbc').onclick=()=>{L.rm=0;stopS()};
window.ARR_REAL=async n=>{try{if(!user)throw 0;if(!window.MP.bus||!party())await N().connect('p'+Math.random().toString(36).slice(2,7).padEnd(5,'0'));
 N().lbOpen();N().lbSend({k:'iv',to:n,r:window.MP.code});const t0=Date.now(),cn=String(n).replace(/[<>&"'`]/g,'').slice(0,12),w=setInterval(()=>{const M=window.MP;
  if(Object.keys(M.pr).some(k=>M.pr[k]&&M.pr[k].s==='l'&&String(M.pr[k].n)===cn)){clearInterval(w);window.frJoin(n)}else if(Date.now()-t0>25000){clearInterval(w);window.frNo(n)}},700)}catch(e){window.frNo(n)}};
window.ARR_KICK=n=>{const M=window.MP;if(!party()||!M.bus)return;if(N().amHost())M.bus.send({t:'kk',n:String(n).replace(/[<>&"'`]/g,'').slice(0,12)});else N().leave()};
function gsStop(){clearInterval(L.gs);L.gs=0;if(!L.s&&!L.rm)hide('sb');$('sbc').style.display=''}
window.ARR_SB=(f,m)=>{if(!party()||N().amHost()||L.s)return;if(!m.on){gsStop();return}
 const D=+m.d||8000,r=Math.max(0,+m.r||0);L.gt=Date.now()-(D-r);L.gd=D;L.gu=Date.now()+3500;
 if(!L.gs){show('sb');$('sbp').style.display='';$('sbc').style.display='none';
  L.gs=setInterval(()=>{const M=window.MP;if(M.arm||M.on||Date.now()>L.gu||L.s){gsStop();return}const e=Date.now()-L.gt,rm=L.gd-e;$('sbt').textContent='BUSCANDO PARTIDA... '+Math.max(0,Math.ceil(rm/1000))+'s';$('sbp').firstChild.style.width=Math.min(100,e/L.gd*100)+'%'},200)}};
window.ARR_KK=(f,m)=>{if(m.n===String(PN).replace(/[<>&"'`]/g,'').slice(0,12)&&!N().amHost())N().leave()};
window.ARR_SALA=()=>{if(!user||L.s)return;const c='p'+Math.random().toString(36).slice(2,7).padEnd(5,'0');L.tb=0;L.lob=0;
 N().connect(c).then(()=>{L.rm=1;show('sb');$('sbp').style.display='none';$('sbc').textContent='FECHAR'})};
window.ARR_INV=f=>{say('Você entrou na equipe de @'+f);try{window.frJoin(f)}catch(e){}};
setInterval(()=>{if(!L.rm)return;const M=window.MP;if(M.arm||M.on){L.rm=0;hide('sb');return}$('sbt').textContent=Date.now()<L.ne?L.nt:'SALA PRIVADA • código '+String(M.code||'').slice(1).toUpperCase();tm()},300);
async function joinRoom(i){const n=N();Object.assign(L,{i,end:Date.now()+TL,go:0,ls:0});
 try{await n.connect('m'+gm()+'abcd'[i]);n.lbOpen();n.lbSend({k:'hi',n:PN,s:1});sys('Você entrou no lobby ('+['SOLO','DUO','SQUAD'][gm()-1]+')');
  setTimeout(()=>{const M=window.MP;if(!M.bus||L.i!==i)return;const h=1+Object.keys(M.pr).filter(k=>M.pr[k]&&M.pr[k].s==='l').length;if(h>8&&i<3){n.leave();joinRoom(i+1)}},3500)}
 catch(e){sys('Falha ao conectar. Use OFFLINE para jogar com bots.')}}
function botNm(){const used=new Set([user,...B.map(b=>b.n),...Object.values(O).map(o=>o.n)]),a=NMP.filter(n=>n.toLowerCase()!='voce'&&!used.has(n));return a.length?a[Math.random()*a.length|0]:NMP[Math.random()*NMP.length|0]}
function openLobby(){$('llg').textContent='';B.length=0;L.sd=0;window.ARR_LSD=0;try{lobMap()}catch(e){LM=null}for(const k in O)delete O[k];P.x=320;P.y=300;P.tx=null;show('lo');L.end=Date.now()+TL;L.go=0}
function draw(){const M=window.MP,rem=Math.max(0,L.end-Date.now());$('lcd').textContent='Partida começa em '+Math.ceil(rem/1000)+'s';
 if(!M.bus){$('lst').textContent='Conectando...';return}
 const H=1+Object.keys(M.pr).filter(k=>M.pr[k]&&M.pr[k].s==='l').length,bots=Math.min(40-H,Math.floor((1-rem/TL)*(40-H)));
 $('lst').textContent=H+' jogador(es) + '+bots+' bots = '+(H+bots)+'/40'+(M.host?' • você é o dono':'');
 while(B.filter(b=>b.t).length<L.tb)B.push({x:300,y:330,tx:0,ty:0,t:1,n:botNm()});const Hm=Math.min(8,H),nms=(L.sd&&window.ARR_NAMES)?window.ARR_NAMES(L.sd):null,cap=Math.min(bots,12),nT=()=>B.filter(b=>!b.t).length;if(nms){while(nT()>cap){const i=B.map(b=>!b.t).lastIndexOf(true);B.splice(i,1)}let k=0;for(const b of B)if(!b.t)b.n=nms[(Hm+k++)%nms.length];while(nT()<cap){const bn=nms[(Hm+nT())%nms.length],q=lobPos();B.push({x:q[0],y:q[1],tx:0,ty:0,n:bn});sys(bn+' entrou no lobby')}};
 const on=$('lon'),key=String((window.ARR_LB&&window.ARR_LB.size)||0)+M.code;
 if(on.dataset.k!==key){on.dataset.k=key;on.textContent='';[...(window.ARR_LB||[])].forEach(([k,v])=>{const nm=typeof k==='string'&&!/^\d+$/.test(k)?k:(v&&v.n);if(!nm||nm===PN)return;const b=document.createElement('button');b.textContent='+ '+nm;b.dataset.n=nm;on.appendChild(b)})}}
$('lon').onclick=e=>{const n=e.target.dataset&&e.target.dataset.n,M=window.MP;if(n&&M.code){N().lbSend({k:'iv',to:n,r:M.code});sys('Convite enviado para '+n);e.target.textContent='enviado'}};
$('lsa').onclick=()=>{N().leave();hide('lo')};
$('lof').onclick=()=>{N().leave();hide('lo');orig&&orig()};
$('delacc').onclick=async()=>{const b=$('delacc');if(b.disabled)return;b.disabled=true;b.textContent='EXCLUINDO...';
 try{const u=window.ARR_USER;if(u){const k=String(u).toLowerCase(),aid=window.ARR_UID;
  try{if(window.arrWipe)await window.arrWipe()}catch(e){}
  let ok=0;for(const q of await paths(k)){try{await J(q,{method:'DELETE'});ok=1}catch(e){}}
  try{await freeNick(PN,k)}catch(e){}
  if(!ok)throw 0;
  if(aid)for(const q of idp(aid)){try{await J(q,{method:'DELETE'})}catch(e){}}}
  window.__arrDead=1;try{N().leave()}catch(e){}
  try{localStorage.clear();sessionStorage.clear()}catch(e){}
  location.reload()}
 catch(e){window.__arrDead=0;b.disabled=false;b.textContent='EXCLUIR CONTA';try{soon('Não foi possível excluir agora. Tente de novo')}catch(_){}}};
$('lac').onclick=()=>{N().leave();try{N().lbClose()}catch(e){}hide('lo');try{localStorage.removeItem('arr_sess')}catch(e){}user=null;window.ARR_USER=null;show('au')};
setInterval(()=>{if($('lo').classList.contains('hide'))return;const M=window.MP,n=N();
 if(M.arm||M.on){hide('lo');return}
 if(M.bus){const h=n.amHost();M.host=h?1:0;if(h&&!L.sd)L.sd=(Math.random()*2147483647)|0;if(h)window.ARR_LSD=L.sd|0;if(h&&Date.now()-L.ls>=1000){L.ls=Date.now();M.bus.send({t:'cd',r:Math.max(0,L.end-Date.now()),sd:L.sd|0})}
  if(h&&L.end-Date.now()<=0&&!L.go){L.go=1;n.hostGo()}}
 draw()},500);
setInterval(()=>{const M=window.MP;if(!$('lo').classList.contains('hide')&&M.bus)M.bus.send({t:'pos',x:P.x|0,y:P.y|0,n:user},true)},200);
/* mapa */
const cv=$('lcv'),cx=cv.getContext('2d'),W=640,H=400;let lt=performance.now();
const col=s=>{let h=0;for(const c of String(s))h=(h*31+c.charCodeAt(0))%360;return'hsl('+h+',70%,55%)'};
const typing=()=>document.activeElement&&document.activeElement.tagName==='INPUT';
addEventListener('keydown',e=>{if(!typing())K[e.key.toLowerCase()]=1});addEventListener('keyup',e=>{K[e.key.toLowerCase()]=0});
const wp=e=>{const r=cv.getBoundingClientRect(),sc=Math.min(r.width/W,(r.height-110)/H);P.tx=(e.clientX-r.left-(r.width-W*sc)/2)/sc;P.ty=(e.clientY-r.top-(r.height-H*sc)/2)/sc};
cv.onpointerdown=e=>{wp(e);cv.setPointerCapture(e.pointerId)};cv.onpointermove=e=>{if(P.tx!=null&&e.buttons)wp(e)};cv.onpointerup=()=>{P.tx=null};
/* ===== v172: cenario do lobby = mapa da SALA (Neon District, mesmo gerador genCS do modo Sala) ===== */
let LM=null,LR=[],LB={x0:14,x1:W-14,y0:40,y1:H-14};
function lobPos(){return[LB.x0+20+Math.random()*(LB.x1-LB.x0-40),LB.y0+20+Math.random()*(LB.y1-LB.y0-40)]}
function pushR(o){for(const r of LR){const qx=Math.max(r.x,Math.min(o.x,r.x+r.w)),qy=Math.max(r.y,Math.min(o.y,r.y+r.h)),dx=o.x-qx,dy=o.y-qy,d=Math.hypot(dx,dy);if(d<10){if(d>.01){o.x+=dx/d*(10-d);o.y+=dy/d*(10-d)}else o.y=r.y-10}}}
function lobMap(){const m=genCS(true),s=W/(AS+400),Z=2,c=document.createElement('canvas');c.width=W*Z;c.height=H*Z;const q=c.getContext('2d');q.scale(Z,Z);
 const X=x=>(x-(AX0-200))*s,Y=y=>(y-CY)*s+H/2;
 q.fillStyle='#120f0d';q.fillRect(0,0,W,H);
 q.strokeStyle='rgba(255,117,25,.16)';q.lineWidth=1;
 for(let g=AX0;g<=AX0+AS;g+=200){q.beginPath();q.moveTo(X(g),0);q.lineTo(X(g),H);q.stroke()}
 for(let g=CY-1000;g<=CY+1000;g+=200){q.beginPath();q.moveTo(0,Y(g));q.lineTo(W,Y(g));q.stroke()}
 for(const f of m.floors){q.globalAlpha=.32;q.fillStyle=f.c;q.fillRect(X(f.x),Y(f.y),f.w*s,f.h*s);q.globalAlpha=1;q.strokeStyle=f.c;q.lineWidth=1.5;q.strokeRect(X(f.x),Y(f.y),f.w*s,f.h*s)}
 q.fillStyle='rgba(25,200,150,.45)';for(const b of m.bushes)q.fillRect(X(b.x),Y(b.y),50*s,50*s);
 const nr=[];
 for(const w of m.walls){if(w.tr)continue;const x=X(w.x),y=Y(w.y),ww=w.w*s,hh=w.h*s;
  if(w.rk){q.fillStyle='#251f1b';q.fillRect(x,y,ww,hh);q.strokeStyle='#ff7519';q.lineWidth=1.5;q.strokeRect(x+.75,y+.75,ww-1.5,hh-1.5);nr.push({x,y,w:ww,h:hh})}
  else{q.fillStyle='#211d1a';q.fillRect(x,y,ww,hh)}}
 q.strokeStyle='#ff7519';q.lineWidth=2;q.shadowColor='#ff7519';q.shadowBlur=8;q.strokeRect(X(AX0),-8,AS*s,H+16);q.shadowBlur=0;
 for(const t of m.trees){const r=40*t.s*s;q.fillStyle='#2b221c';q.beginPath();q.arc(X(t.x),Y(t.y),r,0,7);q.fill();q.strokeStyle='#ff751988';q.lineWidth=1;q.stroke()}
 LR=nr;LB={x0:X(AX0)+14,x1:X(AX0+AS)-14,y0:40,y1:H-14};LM=c;
 for(const o of B.concat([P])){if(o.x<LB.x0||o.x>LB.x1||o.y<LB.y0||o.y>LB.y1){const q2=lobPos();o.x=q2[0];o.y=q2[1]}pushR(o)}}
function pl(x,y,n,c,say,st){cx.fillStyle='#0004';cx.beginPath();cx.ellipse(x,y+9,10,4,0,0,7);cx.fill();cx.fillStyle=c;cx.strokeStyle='#fff';cx.lineWidth=2;cx.beginPath();cx.arc(x,y,10,0,7);cx.fill();cx.stroke();
 cx.font='bold 11px Arial';cx.textAlign='center';cx.fillStyle='#fff';cx.fillText(n,x,y-16);
 if(say&&Date.now()-st<5000){const w=cx.measureText(say).width+10;cx.fillStyle='#fffe';cx.fillRect(x-w/2,y-42,w,16);cx.fillStyle='#000';cx.fillText(say,x,y-30)}}
function frame(t){requestAnimationFrame(frame);const dt=Math.min(.05,(t-lt)/1e3);lt=t;if($('lo').classList.contains('hide'))return;
 cv.width=innerWidth;cv.height=innerHeight;const sc=Math.min(cv.width/W,(cv.height-110)/H);
 let dx=(K.d||K.arrowright?1:0)-(K.a||K.arrowleft?1:0),dy=(K.s||K.arrowdown?1:0)-(K.w||K.arrowup?1:0);
 if(!dx&&!dy&&P.tx!=null){const a=P.tx-P.x,b=P.ty-P.y,d=Math.hypot(a,b);if(d>4){dx=a/d;dy=b/d}}
 const m=Math.hypot(dx,dy)||1;P.x=Math.max(LB.x0,Math.min(LB.x1,P.x+dx/m*130*dt));P.y=Math.max(LB.y0,Math.min(LB.y1,P.y+dy/m*130*dt));pushR(P);
 cx.fillStyle='#080605';cx.fillRect(0,0,cv.width,cv.height);cx.save();cx.translate((cv.width-W*sc)/2,(cv.height-H*sc)/2);cx.scale(sc,sc);
 if(!LM){try{lobMap()}catch(e){}}if(LM)cx.drawImage(LM,0,0,W,H);else{cx.fillStyle='#120f0d';cx.fillRect(0,0,W,H)}cx.fillStyle='#ff7519';cx.font='bold 13px Arial';cx.textAlign='center';cx.fillText('LOBBY - '+['SOLO','DUO','SQUAD'][gm()-1],320,24);
 for(const b of B){if(Math.random()<.01||!b.tx){const q=lobPos();b.tx=q[0];b.ty=q[1]}const a=b.tx-b.x,c=b.ty-b.y,d=Math.hypot(a,c)||1;if(d>3){b.x+=a/d*40*dt;b.y+=c/d*40*dt;pushR(b)}pl(b.x,b.y,b.n,b.t?'#ff6600':'#8892a0')}
 for(const k in O){const o=O[k];if(Date.now()-o.t>4000){delete O[k];continue}o.x+=(o.tx-o.x)*.25;o.y+=(o.ty-o.y)*.25;pl(o.x,o.y,o.n||'?',col(o.n),o.say,o.st)}
 pl(P.x,P.y,user||'',col(user),P.say,P.st);cx.restore()}
requestAnimationFrame(frame);
let s=null;try{s=localStorage.getItem('arr_sess')}catch(e){}
if(s&&/^[A-Za-z0-9_]{3,12}$/.test(s))setTimeout(()=>enter(s),300);else show('au');
})();
