
/* ===== TELA "ATUALIZANDO..." (v2) =====
   Aparece quando sai versao nova (ou /att). A barra enche de verdade (baixa HTML + .js/.css novos),
   e so quando chega a 100% o jogo reinicia na versao nova.
   Uso: window.fsUpdScreen({url:'https://.../'})  |  cancelar: window.fsUpdCancel()
   Testar sem reiniciar: window.__fsUpdPreview() */
(function(){
const GAME_URL='https://firestrike.rdz777zd.workers.dev/';
let on=0,dead=0,box=null,raf=0;
const TIPS=['Não feche o jogo durante a atualização.','Use o chat global para falar com a galera.','Complete as missões para ganhar recompensas.','Confira as novidades da versão em AVISOS.','Sua conta e seu progresso continuam salvos.'];

function css(){
 if(document.getElementById('fsupd-css2'))return;
 const s=document.createElement('style');s.id='fsupd-css2';
 s.textContent=`
#fsupd{position:fixed;left:0;top:0;right:0;bottom:0;z-index:100001;display:flex;align-items:center;justify-content:center;overflow:hidden;
 background:radial-gradient(ellipse at 50% 100%,#ff6a0044,transparent 55%),linear-gradient(#05070b,#0b1017 50%,#1a0f08);
 font-family:"Trebuchet MS",Arial,sans-serif;touch-action:none;user-select:none;-webkit-user-select:none;animation:fufi .35s ease-out}
#fsupd *{box-sizing:border-box}
#fsupd .fu-sky{position:absolute;left:0;bottom:0;width:100%;height:48%}
#fsupd .fu-win{animation:fuflk 3.2s steps(1) infinite}
#fsupd .fu-rain{position:absolute;left:-10%;top:-100%;width:120%;height:200%;pointer-events:none;
 background:repeating-linear-gradient(104deg,transparent 0 16px,#9fb8ff1c 16px 17px,transparent 17px 31px);animation:furn .75s linear infinite}
#fsupd .fu-fog{position:absolute;left:-30%;bottom:8%;width:160%;height:30%;pointer-events:none;
 background:radial-gradient(ellipse at 50% 50%,#ff7a1a22,transparent 65%);animation:fufg 9s ease-in-out infinite alternate}
#fsupd .fu-em{position:absolute;bottom:-10px;border-radius:50%;background:#ffb257;box-shadow:0 0 6px 2px #ff7a1aaa;opacity:0;animation:fuem linear infinite}
#fsupd .fu-vg{position:absolute;left:0;top:0;right:0;bottom:0;pointer-events:none;background:radial-gradient(ellipse at 50% 45%,transparent 40%,#000000b0 100%)}
#fsupd .fu-card{position:relative;width:min(86vw,330px);padding:26px 20px 16px;border-radius:20px;text-align:center;
 background:linear-gradient(#11141bee,#0a0c11f5);border:1px solid #ffffff1f;
 box-shadow:0 0 0 1px #000,0 0 38px #ff66002e,0 18px 50px #000c,inset 0 0 30px #000a;animation:fucd .5s cubic-bezier(.2,.9,.3,1.2)}
#fsupd .fu-c{position:absolute;width:16px;height:16px;border:0 solid #ff7a1a;opacity:.9}
#fsupd .fu-c1{top:7px;left:7px;border-top-width:2px;border-left-width:2px;border-top-left-radius:8px}
#fsupd .fu-c2{top:7px;right:7px;border-top-width:2px;border-right-width:2px;border-top-right-radius:8px}
#fsupd .fu-c3{bottom:7px;left:7px;border-bottom-width:2px;border-left-width:2px;border-bottom-left-radius:8px}
#fsupd .fu-c4{bottom:7px;right:7px;border-bottom-width:2px;border-right-width:2px;border-bottom-right-radius:8px}
#fsupd .fu-lgw{position:relative}
#fsupd .fu-glow{position:absolute;left:8%;top:-10%;width:30%;height:120%;border-radius:50%;background:radial-gradient(#ff7a1a77,transparent 70%);animation:fupl 1.6s ease-in-out infinite alternate}
#fsupd .fu-lg{position:relative;display:block;width:100%;height:auto;max-height:78px}
#fsupd .fu-ln{position:relative;height:2px;margin:14px 6px 18px;background:linear-gradient(90deg,transparent,#ff6600,transparent);overflow:hidden}
#fsupd .fu-ln:after{content:"";position:absolute;top:0;left:-30%;width:30%;height:100%;background:linear-gradient(90deg,transparent,#fff,transparent);animation:fusw 1.8s linear infinite}
#fsupd .fu-h{margin:0 0 16px;font-weight:900;font-size:clamp(22px,7vw,28px);letter-spacing:1px;line-height:1.1;
 background:linear-gradient(100deg,#ff7a1a 0 35%,#fff0cf 50%,#ff7a1a 65% 100%);background-size:250% 100%;
 -webkit-background-clip:text;background-clip:text;color:transparent;-webkit-text-fill-color:transparent;animation:fushn 2.2s linear infinite}
#fsupd .fu-tr{position:relative;height:28px;border-radius:15px;background:#05060a;border:2px solid #34353d;padding:3px;
 box-shadow:inset 0 3px 7px #000,0 0 0 1px #000,0 0 16px #ff66003a}
#fsupd .fu-seg{position:absolute;left:3px;right:3px;top:3px;bottom:3px;border-radius:11px;pointer-events:none;z-index:3;
 background:repeating-linear-gradient(90deg,transparent 0 calc(10% - 2px),#000000a8 calc(10% - 2px) 10%)}
#fsupd .fu-fill{position:relative;height:100%;width:0%;min-width:0;border-radius:11px;
 background:linear-gradient(#ffd596,#ff8a1f 48%,#d94a00);box-shadow:0 0 14px #ff7a1acc}
#fsupd .fu-str{position:absolute;left:0;top:0;right:0;bottom:0;border-radius:11px;overflow:hidden;
 background:linear-gradient(115deg,#ffffff38 25%,transparent 25% 50%,#ffffff38 50% 75%,transparent 75%);background-size:28px 28px;animation:fustr .7s linear infinite}
#fsupd .fu-str:after{content:"";position:absolute;left:0;top:0;right:0;height:46%;background:linear-gradient(#ffffff66,#ffffff00)}
#fsupd .fu-head{position:absolute;right:-8px;top:50%;width:16px;height:16px;margin-top:-8px;border-radius:50%;z-index:4;
 background:radial-gradient(#fff 0 30%,#ffd9a0 55%,#ff7a1a00 72%);box-shadow:0 0 12px 5px #ff9a3c}
#fsupd .fu-sp{position:absolute;left:50%;top:50%;width:3px;height:3px;margin:-1px;border-radius:50%;background:#ffe0b0;opacity:0;animation:fusp .9s linear infinite}
#fsupd .fu-row{display:flex;align-items:flex-end;justify-content:space-between;margin-top:13px;text-align:left}
#fsupd .fu-st{font-weight:700;font-size:12.5px;color:#b3bccb;line-height:1.3;padding-right:8px}
#fsupd .fu-ct{display:block;margin-top:2px;font-weight:600;font-size:10.5px;letter-spacing:.6px;color:#707a8c}
#fsupd .fu-pc{flex:none;font-weight:900;font-size:30px;line-height:1;color:#fff3e0;text-shadow:0 0 12px #ff7a1a99}
#fsupd .fu-pc small{font-size:15px;color:#ff9a3c;margin-left:1px}
#fsupd .fu-tip{margin-top:14px;padding-top:11px;border-top:1px solid #ffffff14;min-height:34px;font-weight:600;font-size:11.5px;line-height:1.35;color:#8a94a6;transition:opacity .35s}
#fsupd .fu-tip b{color:#ff9a3c;letter-spacing:.8px}
#fsupd .fu-dt{display:flex;justify-content:center;gap:6px;margin-top:10px}
#fsupd .fu-dt i{display:block;width:6px;height:6px;border-radius:50%;background:#ff8a1f;animation:fud 1.1s infinite}
#fsupd .fu-dt i:nth-child(2){animation-delay:.18s}#fsupd .fu-dt i:nth-child(3){animation-delay:.36s}
#fsupd.fu-done .fu-fill{filter:brightness(1.3)}
#fsupd.fu-done .fu-card{animation:fupp .5s ease-out}
@keyframes fufi{from{opacity:0}to{opacity:1}}
@keyframes fucd{from{opacity:0;transform:translateY(18px) scale(.94)}to{opacity:1;transform:none}}
@keyframes fupl{from{opacity:.35;transform:scale(.9)}to{opacity:1;transform:scale(1.15)}}
@keyframes fusw{from{left:-30%}to{left:100%}}
@keyframes fushn{from{background-position:100% 0}to{background-position:-100% 0}}
@keyframes fustr{from{background-position:0 0}to{background-position:28px 0}}
@keyframes fusp{0%{opacity:1;transform:translate(0,0)}100%{opacity:0;transform:translate(var(--sx),var(--sy))}}
@keyframes fud{0%,100%{opacity:.2;transform:scale(.8)}50%{opacity:1;transform:scale(1.15)}}
@keyframes furn{from{transform:translate3d(0,0,0)}to{transform:translate3d(-8%,50%,0)}}
@keyframes fufg{from{transform:translateX(-6%);opacity:.5}to{transform:translateX(6%);opacity:1}}
@keyframes fuem{0%{opacity:0;transform:translate3d(0,0,0)}12%{opacity:1}100%{opacity:0;transform:translate3d(var(--dx),-105vh,0)}}
@keyframes fuflk{0%{opacity:1}30%{opacity:.55}34%{opacity:1}70%{opacity:.7}74%{opacity:1}}
@keyframes fupp{0%{transform:scale(1)}40%{transform:scale(1.04)}100%{transform:scale(1)}}`;
 document.head.appendChild(s)}

/* cidade em silhueta (gerada sempre igual) */
function skyline(){
 let seed=11;const R=()=>{seed=(seed*16807)%2147483647;return seed/2147483647};
 let far='',near='',win='',neon='',x=-6;
 while(x<370){const w=18+R()*26,h=80+R()*95;far+='<rect x="'+x.toFixed(1)+'" y="'+(230-h).toFixed(1)+'" width="'+w.toFixed(1)+'" height="'+h.toFixed(1)+'" fill="#10161f"/>';
  if(R()<.45)neon+='<rect x="'+x.toFixed(1)+'" y="'+(230-h).toFixed(1)+'" width="'+w.toFixed(1)+'" height="1.6" fill="#ff6a00" opacity=".85"/>';x+=w+1.5}
 x=-12;while(x<370){const w=24+R()*36,h=40+R()*85,y=230-h;near+='<rect x="'+x.toFixed(1)+'" y="'+y.toFixed(1)+'" width="'+w.toFixed(1)+'" height="'+h.toFixed(1)+'" fill="#070a0f"/>';
  const n=Math.floor(w*h/330);for(let k=0;k<n;k++){if(R()<.45)continue;win+='<rect x="'+(x+3+R()*(w-8)).toFixed(1)+'" y="'+(y+4+R()*(h-12)).toFixed(1)+'" width="2.2" height="3.2" fill="'+(R()<.78?'#ff8a1f':'#79cfff')+'" opacity="'+(.35+R()*.6).toFixed(2)+'"/>'}
  x+=w+3}
 return '<svg class="fu-sky" viewBox="0 0 360 230" preserveAspectRatio="xMidYMax slice" xmlns="http://www.w3.org/2000/svg">'+far+neon+near+'<g class="fu-win">'+win+'</g></svg>'}

function embers(){let h='';for(let i=0;i<20;i++){const s=2+Math.random()*3;
 h+='<span class="fu-em" style="left:'+(Math.random()*100).toFixed(1)+'%;width:'+s.toFixed(1)+'px;height:'+s.toFixed(1)+'px;animation-duration:'+(5+Math.random()*6).toFixed(1)+'s;animation-delay:-'+(Math.random()*10).toFixed(1)+'s;--dx:'+(Math.random()*70-35).toFixed(0)+'px"></span>'}
 return h}

const LOGO='<svg class="fu-lg" viewBox="0 0 270 72" xmlns="http://www.w3.org/2000/svg">'+
 '<defs><linearGradient id="fsug" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffb04d"/><stop offset="1" stop-color="#ff5a00"/></linearGradient></defs>'+
 '<polygon points="36,3 66,19 66,53 36,69 6,53 6,19" fill="#15100d" stroke="#ff7a1a" stroke-width="3" stroke-linejoin="round"/>'+
 '<path d="M36 15C40 26 52 30 49 42C47 49 42 54 36 54C29 54 23 49 25 42C26 37 31 35 33 28C34 24 35 19 36 15Z" fill="url(#fsug)"/>'+
 '<path d="M36 34C38 39 43 41 41 46C40 49 38 50 36 50C33 50 31 48 32 45C33 42 35 40 36 34Z" fill="#fff0c8"/>'+
 '<g font-family="Trebuchet MS,Arial,sans-serif" font-weight="900" font-style="italic" stroke="#1a0c04" stroke-width="3" paint-order="stroke" stroke-linejoin="round">'+
 '<text x="78" y="32" font-size="31" textLength="186" lengthAdjust="spacingAndGlyphs" fill="#fff3e2">FIRE</text>'+
 '<text x="78" y="64" font-size="31" textLength="186" lengthAdjust="spacingAndGlyphs" fill="url(#fsug)">STRIKE</text></g></svg>';

const SPK=[[-14,-16,0],[-8,-22,.15],[-18,-6,.3],[-12,14,.45],[-6,20,.6],[-20,4,.75]];
function build(){
 box=document.createElement('div');box.id='fsupd';
 let sp='';SPK.forEach(a=>{sp+='<i class="fu-sp" style="--sx:'+a[0]+'px;--sy:'+a[1]+'px;animation-delay:'+a[2]+'s"></i>'});
 box.innerHTML=skyline()+'<div class="fu-fog"></div><div class="fu-rain"></div>'+embers()+'<div class="fu-vg"></div>'+
  '<div class="fu-card"><i class="fu-c fu-c1"></i><i class="fu-c fu-c2"></i><i class="fu-c fu-c3"></i><i class="fu-c fu-c4"></i>'+
  '<div class="fu-lgw"><div class="fu-glow"></div>'+LOGO+'</div><div class="fu-ln"></div>'+
  '<div class="fu-h" id="fuh">ATUALIZANDO...</div>'+
  '<div class="fu-tr"><div class="fu-fill" id="fufl"><div class="fu-str"></div><div class="fu-head">'+sp+'</div></div><div class="fu-seg"></div></div>'+
  '<div class="fu-row"><div class="fu-st"><span id="fust">Conectando ao servidor</span><span class="fu-ct" id="fuct"></span></div><div class="fu-pc"><span id="fupc">0</span><small>%</small></div></div>'+
  '<div class="fu-tip" id="futp"><b>DICA</b> &bull; '+TIPS[0]+'</div><div class="fu-dt"><i></i><i></i><i></i></div></div>';
 document.body.appendChild(box)}

function reload(base){
 try{if(navigator.serviceWorker)navigator.serviceWorker.getRegistrations().then(r=>r.forEach(x=>x.unregister()))}catch(e){}
 try{if(window.caches)caches.keys().then(k=>k.forEach(x=>caches.delete(x)))}catch(e){}
 setTimeout(()=>{location.replace(base+(base.indexOf('?')<0?'?':'&')+'v='+Date.now())},300)}

function ft(u,o,ms){const c=window.AbortController?new AbortController():null;const t=setTimeout(()=>{try{c&&c.abort()}catch(e){}},ms);o=o||{};if(c)o.signal=c.signal;
 return fetch(u,o).then(r=>{clearTimeout(t);return r},e=>{clearTimeout(t);throw e})}

/* baixa o HTML novo e os .js/.css que ele usa; cada arquivo pronto avanca a barra */
async function download(base,prog){
 let urls=[];
 try{
  const r=await ft(base+(base.indexOf('?')<0?'?':'&')+'_u='+Date.now(),{cache:'no-store',credentials:'omit'},9000);
  const html=await r.text(),o=new URL(base).origin,re=/(?:src|href)=["']([^"']+?\.(?:js|css)(?:\?[^"']*)?)["']/gi;let m,seen={};
  while((m=re.exec(html))){try{const u=new URL(m[1],base);if(u.origin===o&&!seen[u.href]){seen[u.href]=1;urls.push(u.href)}}catch(e){}}
 }catch(e){}
 const total=urls.length+1;let done=1;prog(done/total,done,total);
 let i=0;
 async function w(){while(i<urls.length&&!dead){const u=urls[i++];
  try{const r=await ft(u,{cache:'reload',credentials:'omit'},12000);await r.arrayBuffer()}catch(e){}
  done++;prog(done/total,done,total)}}
 await Promise.all([w(),w(),w(),w()]);
 prog(1,total,total)}

function run(o){
 const base=o.url||GAME_URL,MIN=o.min||2800;
 css();build();
 const $=id=>document.getElementById(id),fl=$('fufl'),st=$('fust'),pc=$('fupc'),ct=$('fuct'),hd=$('fuh'),tp=$('futp');
 let real=0,shown=0,fin=0,done=0,total=0,tpI=0,tpT=0,lastP=-1,lastS='';const t0=performance.now();
 download(base,(f,d,t)=>{real=Math.max(real,f*100);done=d;total=t}).then(()=>{real=100});
 function tick(now){
  if(dead)return;
  const el=now-t0,cap=Math.min(1,el/MIN)*100,creep=Math.min(82,el*.012);
  const goal=Math.min(cap,Math.max(real,creep));
  if(shown<goal)shown=Math.min(goal,shown+Math.max((goal-shown)*.1,.3));
  fl.style.setProperty('width',shown.toFixed(1)+'%','important');
  const p=Math.floor(shown);
  if(p!==lastP){lastP=p;pc.textContent=p}
  const s=fin?'Pronto! Reiniciando o jogo':p<6?'Conectando ao servidor':p<95?'Baixando arquivos do jogo':'Verificando arquivos';
  if(s!==lastS){lastS=s;st.textContent=s}
  ct.textContent=total?'ARQUIVOS '+Math.min(done,total)+' / '+total:'';
  if(now-tpT>3000){tpT=now;tp.style.opacity=0;setTimeout(()=>{if(dead)return;tpI=(tpI+1)%TIPS.length;tp.innerHTML='<b>DICA</b> &bull; '+TIPS[tpI];tp.style.opacity=1},350)}
  if(shown>=99.9&&!fin){fin=1;fl.style.setProperty('width','100%','important');pc.textContent=100;st.textContent='Pronto! Reiniciando o jogo';hd.textContent='ATUALIZADO!';box.classList.add('fu-done');
   setTimeout(()=>{if(dead)return;if(o.preview){window.fsUpdCancel();return}reload(base)},800);return}
  raf=requestAnimationFrame(tick)}
 raf=requestAnimationFrame(tick)}

window.fsUpdScreen=function(o){
 if(on)return;on=1;dead=0;
 try{run(o||{})}catch(e){on=0;if(box){box.remove();box=null}}};
window.fsUpdCancel=function(){
 dead=1;on=0;cancelAnimationFrame(raf);if(box){box.remove();box=null}};
window.__fsUpdPreview=function(){window.fsUpdScreen({preview:1,min:6000})};
window.fsAtt=function(){try{window.fsUpdCancel()}catch(e){}window.fsUpdScreen({url:GAME_URL})};
/* se algum codigo antigo criar o contador "ATUALIZACAO EM ( Ns )" (ex.: comando /att), esconde e mostra esta tela */
try{new MutationObserver(function(ms){ms.forEach(function(m){m.addedNodes.forEach(function(n){
 if(n.nodeType===1&&n.id!=='fsupd'&&/^ATUALIZA(Ç|C)(Ã|A)O EM/i.test((n.textContent||'').trim())){n.style.display='none';window.fsUpdScreen({url:GAME_URL})}})})}).observe(document.body,{childList:true})}catch(e){}
})();
