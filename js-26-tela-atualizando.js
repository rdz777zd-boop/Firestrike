
/* ===== TELA "ATUALIZANDO..." =====
   Quando sai uma versao nova, em vez do contador aparece esta tela com a barra de progresso.
   A barra avanca de verdade (baixa o HTML e os arquivos .js/.css novos). Quando chega a 100%
   o jogo reinicia ja com a versao nova.
   Uso: window.fsUpdScreen({url:'https://.../'})  |  cancelar: window.fsUpdCancel()
   Testar sem reiniciar: window.__fsUpdPreview() */
(function(){
const GAME_URL='https://firestrike.rdz777zd.workers.dev/';
let on=0,dead=0,box=null,raf=0;

function css(){
 if(document.getElementById('fsupd-css'))return;
 const s=document.createElement('style');s.id='fsupd-css';
 s.textContent=
 '#fsupd{position:fixed;left:0;top:0;right:0;bottom:0;z-index:100001;display:flex;align-items:center;justify-content:center;'+
 'background:radial-gradient(ellipse at 50% 105%,#ff66003a,transparent 62%),radial-gradient(ellipse at 20% 0%,#22304a55,transparent 55%),linear-gradient(#090b10,#10141b 55%,#1a120d);'+
 'font-family:"Trebuchet MS",Arial,sans-serif;touch-action:none;user-select:none;-webkit-user-select:none}'+
 '#fsupd .cd{width:min(84vw,300px);padding:22px 18px 15px;border-radius:18px;background:#0b0c0fe6;border:1px solid #ffffff22;'+
 'box-shadow:0 0 0 1px #000,0 0 30px #ff660033,inset 0 0 26px #000a;text-align:center}'+
 '#fsupd .lg{display:block;width:100%;height:auto;max-height:76px}'+
 '#fsupd .ln{height:2px;margin:13px 8px 20px;background:linear-gradient(90deg,transparent,#ff6600,transparent)}'+
 '#fsupd h2{margin:0 0 16px;font-weight:900;font-size:clamp(20px,6vw,26px);letter-spacing:.5px;color:#ff7a1a;text-shadow:0 0 14px #ff660066}'+
 '#fsupd .tr{position:relative;height:24px;border-radius:13px;background:#06070a;border:2px solid #2d2d33;padding:2px;box-shadow:inset 0 2px 6px #000,0 0 0 1px #000,0 0 12px #ff66002b}'+
 '#fsupd .fl{position:relative;height:100%;width:0;border-radius:10px;background:linear-gradient(#ffc680,#ff8a1f 45%,#e04e00);box-shadow:0 0 12px #ff7a1aaa}'+
 '#fsupd .fl:after{content:"";position:absolute;right:-5px;top:50%;width:10px;height:10px;margin-top:-5px;border-radius:50%;background:#fff3d6;box-shadow:0 0 10px 4px #ffa94d}'+
 '#fsupd .st{margin-top:14px;font-weight:600;font-size:12px;color:#9aa3b2}'+
 '#fsupd .dt{display:flex;justify-content:center;gap:5px;margin-top:13px}'+
 '#fsupd .dt i{width:5px;height:5px;border-radius:50%;background:#ff8a1f;animation:fsud 1.1s infinite}'+
 '#fsupd .dt i:nth-child(2){animation-delay:.18s}#fsupd .dt i:nth-child(3){animation-delay:.36s}'+
 '@keyframes fsud{0%,100%{opacity:.2}50%{opacity:1}}';
 document.head.appendChild(s)}

const LOGO='<svg class="lg" viewBox="0 0 270 72" xmlns="http://www.w3.org/2000/svg">'+
 '<defs><linearGradient id="fsug" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffb04d"/><stop offset="1" stop-color="#ff5a00"/></linearGradient></defs>'+
 '<polygon points="36,3 66,19 66,53 36,69 6,53 6,19" fill="#15100d" stroke="#ff7a1a" stroke-width="3" stroke-linejoin="round"/>'+
 '<path d="M36 15C40 26 52 30 49 42C47 49 42 54 36 54C29 54 23 49 25 42C26 37 31 35 33 28C34 24 35 19 36 15Z" fill="url(#fsug)"/>'+
 '<path d="M36 34C38 39 43 41 41 46C40 49 38 50 36 50C33 50 31 48 32 45C33 42 35 40 36 34Z" fill="#fff0c8"/>'+
 '<g font-family="Trebuchet MS,Arial,sans-serif" font-weight="900" font-style="italic" stroke="#1a0c04" stroke-width="3" paint-order="stroke" stroke-linejoin="round">'+
 '<text x="78" y="32" font-size="31" textLength="186" lengthAdjust="spacingAndGlyphs" fill="#fff3e2">FIRE</text>'+
 '<text x="78" y="64" font-size="31" textLength="186" lengthAdjust="spacingAndGlyphs" fill="url(#fsug)">STRIKE</text></g></svg>';

function build(){
 box=document.createElement('div');box.id='fsupd';
 box.innerHTML='<div class="cd">'+LOGO+'<div class="ln"></div><h2>ATUALIZANDO...</h2>'+
  '<div class="tr"><div class="fl" id="fsupf"></div></div>'+
  '<div class="st" id="fsups">Baixando arquivos do jogo &bull; 0%</div>'+
  '<div class="dt"><i></i><i></i><i></i></div></div>';
 document.body.appendChild(box)}

function reload(base){
 try{if(navigator.serviceWorker)navigator.serviceWorker.getRegistrations().then(r=>r.forEach(x=>x.unregister()))}catch(e){}
 try{if(window.caches)caches.keys().then(k=>k.forEach(x=>caches.delete(x)))}catch(e){}
 setTimeout(()=>{location.replace(base+(base.indexOf('?')<0?'?':'&')+'v='+Date.now())},300)}

/* baixa o HTML novo e os .js/.css que ele usa; cada arquivo pronto avanca a barra */
async function download(base,prog){
 let urls=[];
 try{
  const r=await fetch(base+(base.indexOf('?')<0?'?':'&')+'_u='+Date.now(),{cache:'no-store',credentials:'omit'});
  const html=await r.text(),o=new URL(base).origin,re=/(?:src|href)=["']([^"']+?\.(?:js|css)(?:\?[^"']*)?)["']/gi;let m,seen={};
  while((m=re.exec(html))){try{const u=new URL(m[1],base);if(u.origin===o&&!seen[u.href]){seen[u.href]=1;urls.push(u.href)}}catch(e){}}
 }catch(e){}
 const total=urls.length+1;let done=1;prog(done/total);
 let i=0;
 async function w(){while(i<urls.length&&!dead){const u=urls[i++];
  try{const r=await fetch(u,{cache:'reload',credentials:'omit'});await r.arrayBuffer()}catch(e){}
  done++;prog(done/total)}}
 await Promise.all([w(),w(),w(),w()]);
 prog(1)}

function run(o){
 const base=o.url||GAME_URL,MIN=o.min||2200;
 css();build();
 const fl=document.getElementById('fsupf'),st=document.getElementById('fsups');
 let target=0,shown=0,fin=0;const t0=performance.now();
 download(base,p=>{target=Math.max(target,p*100)}).then(()=>{target=100});
 function tick(){
  if(dead)return;
  const el=performance.now()-t0,goal=Math.min(target,Math.min(1,el/MIN)*100);
  if(shown<goal)shown=Math.min(goal,shown+Math.max((goal-shown)*.12,.35));
  const p=Math.floor(shown);
  fl.style.width=shown+'%';
  if(!fin)st.innerHTML=(p>=100?'Concluindo':'Baixando arquivos do jogo')+' &bull; '+p+'%';
  if(shown>=100&&!fin){fin=1;st.innerHTML='Pronto! Reiniciando &bull; 100%';
   setTimeout(()=>{if(dead)return;if(o.preview){window.fsUpdCancel();return}reload(base)},500);return}
  raf=requestAnimationFrame(tick)}
 raf=requestAnimationFrame(tick)}

window.fsUpdScreen=function(o){
 if(on)return;on=1;dead=0;
 try{run(o||{})}catch(e){on=0;if(box){box.remove();box=null}}};
window.fsUpdCancel=function(){
 dead=1;on=0;cancelAnimationFrame(raf);if(box){box.remove();box=null}};
window.__fsUpdPreview=function(){window.fsUpdScreen({preview:1,min:4000})};
})();
