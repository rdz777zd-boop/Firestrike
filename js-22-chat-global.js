
/* ===== CHAT GLOBAL (menu inicial) v160 ===== */
(function(){
const $=id=>document.getElementById(id);
let ws=null,myid=null,open=false,un=0,lastSend=0,tries=0,rt=0,ready=false;
const MAXM=40,ROOMS=['chat-global','chatglobal','sala0'];let ri=0,gotHi=0,ct=0,why='';
/* ID do DONO: crie sua conta, abra seu PERFIL, copie o ID e cole aqui entre as aspas. Vazio = ninguém é dono. */
const OWNER_ID='90514951';
const GAME_URL='https://firestrike.rdz777zd.workers.dev';
const isOwner=()=>!!OWNER_ID&&String(window.ARR_UID||'')===OWNER_ID;
window.arrIsOwner=isOwner;
async function sha(t){try{const b=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(t));return[...new Uint8Array(b)].map(x=>x.toString(16).padStart(2,'0')).join('')}catch(e){let h=5381;for(const c of t)h=(h*33^c.charCodeAt(0))>>>0;return'x'+h.toString(16)}}
function addAn(t){if(!msgs)return;const d=document.createElement('div');d.className='an';const b=document.createElement('b');b.textContent='ANÚNCIO: ';d.appendChild(b);d.appendChild(document.createTextNode(t));msgs.appendChild(d);while(msgs.children.length>MAXM)msgs.removeChild(msgs.firstChild);msgs.scrollTop=msgs.scrollHeight}
async function announce(t){if(!ws||ws.readyState!==1||!ready){add('','Sem conexão. Tente de novo.',0,1);connect();return}
const ts=Date.now(),sg=await sha(OWNER_ID+':'+ts+':'+t);ws.send(JSON.stringify({k:'e',m:{t:'gc',a:1,x:t,ts,sg,ok:await sha((localStorage.getItem('arr_owner_key')||'')+':'+ts+':'+t)}}));addAn(t)}
let attT=0,attBox=null;
function fsAtt(){attStop();if(window.fsUpdScreen){window.fsUpdScreen({url:GAME_URL+'/'});return}attStart()}
function attStop(){try{window.fsUpdCancel&&window.fsUpdCancel()}catch(e){}clearInterval(attT);attT=0;if(attBox){attBox.remove();attBox=null}}
function doUpdate(){try{if(navigator.serviceWorker)navigator.serviceWorker.getRegistrations().then(r=>r.forEach(x=>x.unregister()))}catch(e){}
try{if(window.caches)caches.keys().then(k=>k.forEach(x=>caches.delete(x)))}catch(e){}
setTimeout(()=>{location.replace(GAME_URL+'/?v='+Date.now())},500)}
function attStart(){attStop();let n=10;attBox=document.createElement('div');
attBox.style.cssText='position:fixed;left:50%;top:max(14px,env(safe-area-inset-top));transform:translateX(-50%);z-index:99999;background:#171311ee;border:3px solid #ff6600;border-radius:14px;padding:10px 22px;color:#fff;font:900 clamp(16px,4.5vw,26px) "Trebuchet MS",Arial,sans-serif;text-align:center;box-shadow:0 0 24px #ff660088;pointer-events:none;white-space:nowrap';
const draw=()=>{attBox.textContent='ATUALIZAÇÃO EM ( '+n+'s )'};draw();document.body.appendChild(attBox);
attT=setInterval(()=>{n--;if(n>0){draw();return}clearInterval(attT);attT=0;attBox.textContent='ATUALIZANDO...';doUpdate()},1000)}
async function ownerCast(u){if(!ws||ws.readyState!==1||!ready){add('','Sem conexão. Tente de novo.',0,1);connect();return false}
const ts=Date.now(),sg=await sha(OWNER_ID+':'+ts+':u'+u);ws.send(JSON.stringify({k:'e',m:{t:'gc',u,ts,sg,ok:await sha((localStorage.getItem('arr_owner_key')||'')+':'+ts+':u'+u)}}));return true}
function runCmd(x){const p=x.slice(1).trim().split(/\s+/),c=(p.shift()||'').toLowerCase(),a=p.join(' ').trim();
if(c==='ajuda'||c==='help'||c==='?'){add('','Comandos: /ajuda, /limpar'+(isOwner()?', /anuncio msg, /att, /att cancelar, /verificar ID, /desverificar ID, /clas, /desfazercla TAG, /banir ID motivo, /desbanir ID, /banidos':''),0,1);return}
if(c==='chave'||c==='key'){if(!isOwner()){add('','Esse comando e so para o dono.',0,1);return}if(!a||a.length<8||/[^A-Za-z0-9]/.test(a)){add('','Uso: /chave SEGREDO (8 ou mais letras e numeros, sem espacos).',0,1);return}try{localStorage.setItem('arr_owner_key',a);add('','Chave do dono salva neste aparelho.',0,1)}catch(e){add('','Nao foi possivel salvar a chave.',0,1)}return}
if(c==='limpar'||c==='clear'){if(msgs)msgs.innerHTML='';add('','Chat limpo.',0,1);return}
if(c==='anuncio'){if(!isOwner()){add('','Esse comando é só para o dono.',0,1);return}if(!a){add('','Uso: /anuncio mensagem',0,1);return}announce(a.slice(0,120));return}
if(c==='att'){if(!isOwner()){add('','Esse comando é só para o dono.',0,1);return}
if(a.toLowerCase()==='cancelar'){ownerCast(2).then(ok=>{if(ok){attStop();add('','Atualização cancelada.',0,1)}});return}
ownerCast(1).then(ok=>{if(ok){attStart();add('','Atualização iniciada para todos.',0,1)}});return}
if(c==='verificar'||c==='verify'||c==='desverificar'||c==='unverify'){if(!isOwner()){add('','Esse comando é só para o dono.',0,1);return}const on=c==='verificar'||c==='verify';if(!a){add('','Uso: /'+(on?'verificar':'desverificar')+' ID',0,1);return}
if(!window.arrVerSet){add('','Indisponível agora.',0,1);return}window.arrVerSet(a.split(/\s+/)[0],on).then(r=>add('',r.e?r.e:(on?'@'+r.n+' recebeu o VERIFICADO. Ele precisa coletar em AVISOS para ativar.':'@'+r.n+' não é mais verificado.'),0,1));return}
if(c==='online'||c==='jogadores'||c==='players'){if(!isOwner()){add('','Esse comando é só para o dono.',0,1);return}if(!window.arrOnlineIds){add('','Indisponível agora.',0,1);return}add('','Buscando jogadores online...',0,1);window.arrOnlineIds().then(r=>{if(r.e){add('',r.e,0,1);return}const L=r.l;add('','Online agora: '+L.length+' jogador(es)',0,1);L.slice(0,15).forEach(x=>add('','@'+x.n+' • ID '+(x.id||'não encontrado')+' • '+(x.s==3?'em partida':'no lobby'),0,1));if(L.length>15)add('','… +'+(L.length-15)+' jogadores',0,1)}).catch(()=>add('','Não foi possível buscar agora. Tente de novo.',0,1));return}
if(c==='online'||c==='jogadores'||c==='players'){if(!isOwner()){add('','Esse comando é só para o dono.',0,1);return}if(!window.arrOnlineIds){add('','Indisponível agora.',0,1);return}add('','Buscando jogadores online...',0,1);window.arrOnlineIds().then(r=>{if(r.e){add('',r.e,0,1);return}const L=r.l;add('','Online agora: '+L.length+' jogador(es)',0,1);L.slice(0,15).forEach(x=>add('','@'+x.n+' • ID '+(x.id||'não encontrado')+' • '+(x.s==3?'em partida':'no lobby'),0,1))}).catch(()=>add('','Não foi possível buscar agora.',0,1));return}
if(c==='banir'||c==='ban'||c==='desbanir'||c==='unban'){if(!isOwner()){add('','Esse comando é só para o dono.',0,1);return}const on=c==='banir'||c==='ban';const w=a.split(/\s+/);const id=w.shift()||'';if(!id){add('','Uso: /'+(on?'banir ID motivo':'desbanir ID'),0,1);return}
if(!window.arrBanSet){add('','Indisponível agora.',0,1);return}window.arrBanSet(id,on,w.join(' ')).then(r=>add('',r.e?r.e:(on?'@'+r.n+' (ID '+r.id+') foi BANIDO.':'@'+r.n+' (ID '+r.id+') foi desbanido.'),0,1));return}
if(c==='banidos'||c==='bans'){if(!isOwner()){add('','Esse comando é só para o dono.',0,1);return}if(!window.arrBanList){add('','Indisponível agora.',0,1);return}window.arrBanList().then(L=>add('',L===null?'Servidor indisponível.':L.length?'Banidos: '+L.slice(0,10).map(x=>'@'+x.n+' ('+x.id+')'+(x.r?' - '+x.r:'')).join(' • ')+(L.length>10?' … +'+(L.length-10):''):'Nenhum jogador banido.',0,1));return}
if(c==='clas'||c==='clans'){if(!isOwner()){add('','Esse comando é só para o dono.',0,1);return}const L=window.arrClans?window.arrClans():[];add('',L.length?'Clãs: '+L.slice(0,12).map(x=>'['+x.tag+'] '+x.n+' (@'+x.on+')').join(' • ')+(L.length>12?' … +'+(L.length-12):''):'Nenhum clã publicado.',0,1);return}
if(c==='desfazercla'||c==='excluircla'||c==='deletarcla'||c==='disband'){if(!isOwner()){add('','Esse comando é só para o dono.',0,1);return}if(!a){add('','Uso: /desfazercla TAG (ou nome do clã). Veja a lista com /clas',0,1);return}
if(!window.arrClanKill){add('','Indisponível agora.',0,1);return}window.arrClanKill(a).then(r=>add('',r.e?r.e:'Clã ['+r.tag+'] '+r.n+' (dono @'+r.on+') foi desfeito. Os membros saem automaticamente.',0,1));return}
add('','Comando desconhecido. Use /ajuda',0,1)}
function wsUrl(){let U='';try{U=(typeof ARR_WS_URL!=='undefined'?ARR_WS_URL:'')||localStorage.getItem('arr_ws')||''}catch(e){}if(!U)U='wss://armada-relay.rdz777zd.workers.dev';U=String(U).replace(/\/+$/,'');return/^wss:\/\//.test(U)?U+'/room/'+ROOMS[ri]:''}
function myName(){try{return String(PN||'Voce').slice(0,14)}catch(e){return 'Voce'}}
let box,msgs,inp,st,btn;
function add(n,t,me,sys){if(!msgs)return;const d=document.createElement('div');if(sys){d.textContent=t}else{const b=document.createElement('b');b.textContent=n+': ';d.appendChild(b);d.appendChild(document.createTextNode(t))}
msgs.appendChild(d);while(msgs.children.length>MAXM)msgs.removeChild(msgs.firstChild);msgs.scrollTop=msgs.scrollHeight}
function setSt(t,ok){if(st){st.textContent=t?'chat: '+t:'';st.style.cssText='font:800 11px Arial;text-shadow:0 1px 3px #000;color:'+(ok?'#7dff9a':'#ffba7d')}}
function badge(){if(!btn)return;const e=btn.querySelector('em');e.textContent=un>9?'9+':un;btn.classList.toggle('un',un>0)}
function connect(q){const u=wsUrl();if(!u){setSt('offline');if(!q)add('','Chat indisponível aqui. Só funciona online.',0,1);return}
if(ws&&ws.readyState<2)return;clearTimeout(rt);setSt('conectando...');gotHi=0;why='';
let w;try{w=ws=new WebSocket(u)}catch(e){setSt('offline ('+e.message+')');return}
clearTimeout(ct);ct=setTimeout(()=>{if(ws===w&&!gotHi){why='servidor não respondeu';try{w.close()}catch(e){}}},8000);
w.onmessage=e=>{let d;try{d=JSON.parse(e.data)}catch(x){return}
 if(d.k==='hi'){myid=d.id;ready=true;gotHi=1;tries=0;clearTimeout(ct);setSt('online',1);return}
 if(d.k==='e'&&d.m&&d.m.t==='gc'&&d.f!==myid&&d.m.u){const m=d.m;if(!OWNER_ID||Math.abs(Date.now()-(+m.ts||0))>300000)return;sha(OWNER_ID+':'+m.ts+':u'+m.u).then(h=>{if(h!==m.sg)return;if(m.u===1)attStart();else if(m.u===2)attStop()});return}
 if(d.k==='e'&&d.m&&d.m.t==='gc'&&d.f!==myid&&d.m.a){const m=d.m,x=String(m.x||'').slice(0,120);if(!OWNER_ID||!x||Math.abs(Date.now()-(+m.ts||0))>300000)return;sha(OWNER_ID+':'+m.ts+':'+x).then(h=>{if(h!==m.sg)return;addAn(x);try{soon('ANÚNCIO: '+x)}catch(e){}if(!open){un++;badge()}});return}
 if(d.k==='e'&&d.m&&d.m.t==='gc'&&d.f!==myid){const n=String(d.m.n||'?').slice(0,14),x=String(d.m.x||'').slice(0,120);if(!x)return;add(n,x,0);if(!open){un++;badge()}}};
w.onclose=e=>{ready=false;clearTimeout(ct);if(ws===w)ws=null;if(!gotHi){ri=(ri+1)%ROOMS.length;why=why||('código '+(e&&e.code||'?'))}
setSt((gotHi?'desconectado':'sem conexão ('+why+')')+' - tentando de novo...');if(wsUrl()){tries++;rt=setTimeout(()=>connect(1),Math.min(15000,1500*Math.min(tries,10)))}};
w.onerror=()=>{try{w.close()}catch(e){}}}
function send(){const x=inp.value.replace(/\s+/g,' ').trim().slice(0,120);if(!x)return;if(x.charAt(0)==='/'){inp.value='';runCmd(x);return}
const now=Date.now();if(now-lastSend<1200){return}
if(!ws||ws.readyState!==1||!ready){add('','Sem conexão. Tentando reconectar...',0,1);connect();return}
lastSend=now;ws.send(JSON.stringify({k:'e',m:{t:'gc',n:myName(),x}}));add(myName(),x,1);inp.value=''}
function place(){const vv=window.visualViewport,kb=vv?Math.max(0,Math.round(innerHeight-vv.height-vv.offsetTop)):0;box.style.bottom=(8+kb)+'px'}
function toggle(f){open=f===undefined?!open:f;if(open){place();box.classList.add('on');un=0;badge();if(!ws)connect();setTimeout(()=>{try{inp.focus({preventScroll:true})}catch(e){}},50)}else box.classList.remove('on')}
function init(){if(btn||!$('sqi'))return false;
document.body.insertAdjacentHTML('beforeend','<div id="gchp"><div class="gh"><span>CHAT GLOBAL</span><button type="button" id="gcx" aria-label="Fechar chat">\u2715</button></div><div class="gs" id="gcst"></div><div class="gm" id="gcm"></div><div class="gi"><input id="gcin" maxlength="120" placeholder="Conversar..." autocomplete="off"><button type="button" id="gcs">ENVIAR</button></div></div>');
box=$('gchp');msgs=$('gcm');inp=$('gcin');st=$('gcst');
btn=document.createElement('button');btn.type='button';btn.id='gchb';btn.innerHTML='CHAT <em>0</em>';$('sqi').insertAdjacentElement('afterend',btn);
btn.onclick=()=>toggle();$('gcs').onclick=send;$('gcx').onclick=e=>{e.stopPropagation();toggle(false)};
inp.addEventListener('keydown',e=>{e.stopPropagation();if(e.key==='Enter'){e.preventDefault();send()}});inp.addEventListener('keyup',e=>e.stopPropagation());
add('','Chat global: converse com quem está online. /ajuda p/ comandos.',0,1);connect(1);
addEventListener('online',()=>{tries=0;if(!ws)connect(1)});document.addEventListener('visibilitychange',()=>{if(!document.hidden&&!ws){tries=0;connect(1)}});
const pl=$('play');if(pl)pl.addEventListener('click',()=>toggle(false),true);
setInterval(()=>{const m=$('menu');if(open&&m&&(m.classList.contains('hide')||getComputedStyle(m).display==='none'))toggle(false)},800);
addEventListener('resize',()=>{if(open)place()});
try{if(window.visualViewport){visualViewport.addEventListener('resize',()=>{if(open)place()});visualViewport.addEventListener('scroll',()=>{if(open)place()})}}catch(e){}
return true}
const iv=setInterval(()=>{try{if(init())clearInterval(iv)}catch(e){}},400);
})();
