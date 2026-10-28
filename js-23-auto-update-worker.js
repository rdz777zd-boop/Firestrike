
/* ===== ATUALIZAÇÃO AUTOMÁTICA =====
   Vigia o link do jogo. Se a versão publicada mudar, mostra "ATUALIZAÇÃO EM ( 10s )",
   e ao chegar em zero reinicia o jogo já com a versão nova. */
(function(){
const GAME_URL='https://firestrike.rdz777zd.workers.dev';
const POLL_MS=30000,COUNT=10;
let base=null,busy=false,counting=false,box=null,tm=0;
async function hash(t){try{const b=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(t));return[...new Uint8Array(b)].map(x=>x.toString(16).padStart(2,'0')).join('')}catch(e){let h=5381;for(let i=0;i<t.length;i++)h=(h*33^t.charCodeAt(i))>>>0;return'x'+h.toString(16)}}
/* assinatura da versão publicada: o conteúdo do HTML (ignora o ?v= do reinício) */
async function sig(){
 const u=GAME_URL+'/?chk='+Date.now();
 const r=await fetch(u,{cache:'no-store',credentials:'omit'});
 if(!r.ok)throw 0;
 const t=await r.text();
 if(t.length<1000)throw 0;
 return hash(t)}
async function check(){
 if(busy||counting||document.hidden&&base)return;
 busy=true;
 try{const s=await sig();if(base===null)base=s;else if(s!==base)start()}catch(e){}
 busy=false}
function doUpdate(){
 try{if(navigator.serviceWorker)navigator.serviceWorker.getRegistrations().then(r=>r.forEach(x=>x.unregister()))}catch(e){}
 try{if(window.caches)caches.keys().then(k=>k.forEach(x=>caches.delete(x)))}catch(e){}
 setTimeout(()=>{location.replace(GAME_URL+'/?v='+Date.now())},500)}
function start(){
 if(counting)return;counting=true;if(window.fsUpdScreen){window.fsUpdScreen({url:GAME_URL+'/'});return}let n=COUNT;
 box=document.createElement('div');box.id='autoupd';
 box.style.cssText='position:fixed;left:50%;top:max(14px,env(safe-area-inset-top));transform:translateX(-50%);z-index:100000;background:#171311ee;border:3px solid #ff6600;border-radius:14px;padding:10px 22px;color:#fff;font:900 clamp(16px,4.5vw,26px) "Trebuchet MS",Arial,sans-serif;text-align:center;box-shadow:0 0 24px #ff660088;pointer-events:none;white-space:nowrap';
 const draw=()=>{box.textContent='ATUALIZAÇÃO EM ( '+n+'s )'};draw();document.body.appendChild(box);
 tm=setInterval(()=>{n--;if(n>0){draw();return}clearInterval(tm);box.textContent='ATUALIZANDO...';doUpdate()},1000)}
window.__autoUpdateTest=start;
check();
setInterval(check,POLL_MS);
document.addEventListener('visibilitychange',()=>{if(!document.hidden)check()});
addEventListener('focus',check);
})();
