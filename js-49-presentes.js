/* ===== PRESENTES DO DONO (js-49 v3) =====
   O painel grava presentes em /inbox/giftlist/<ID ou all>/<gid> (protegido pela chave do dono no servidor).
   Este arquivo confere a cada 6 s (e na hora do login), entrega UMA vez, mostra a tela de presente
   e marca como entregue em /inbox/gk<ID>/<gid>. Quem estava offline recebe assim que entra.
   Presente com {a:1} e so mensagem vira "MENSAGEM DO DONO". Publica o catalogo de itens em /inbox/cat*.
   Carregar DEPOIS do js-42 e do js-41. */
(function(){
if(window.ARR_GIFTS)return;
window.ARR_GIFTS=1;
var B='https://armada-relay.rdz777zd.workers.dev/db';
try{var q=localStorage.getItem('arr_dburl');if(q)B=q;else if(typeof ARR_DB_URL!=='undefined'&&ARR_DB_URL)B=ARR_DB_URL}catch(e){}
B=String(B).replace(/\/+$/,'');
function api(p,m,b){var o={method:m||'GET',cache:'no-store'};if(b!==undefined){o.headers={'Content-Type':'application/json'};o.body=JSON.stringify(b)}
 return fetch(B+p+'.json',o).then(function(r){if(!r.ok)throw r.status;return r.json()})}
function uid(){var u=String(window.ARR_UID||'');return /^\d{6,10}$/.test(u)?u:''}
function num(v,max){v=Math.floor(+v);return v>0?Math.min(v,max):0}
function loc(k,v){try{if(v===undefined)return localStorage.getItem(k)||'';localStorage.setItem(k,v)}catch(e){}return ''}
function snds(){try{if(typeof snd==='function'){snd(520,.12,'triangle',.06,300);setTimeout(function(){snd(780,.12,'triangle',.06,300)},140);setTimeout(function(){snd(1040,.18,'triangle',.06,300)},280)}}catch(e){}try{if(navigator.vibrate)navigator.vibrate([90,50,90])}catch(e){}}

/* ---------- tela de presente ---------- */
var CSS='#arrgift{position:fixed;inset:0;z-index:2147483000;display:flex;align-items:center;justify-content:center;padding:14px;background:radial-gradient(ellipse at 50% 40%,#3a1a0acc,#000000ee 70%);-webkit-backdrop-filter:blur(3px);backdrop-filter:blur(3px);font-family:Rajdhani,Trebuchet MS,Arial,sans-serif;animation:agfade .25s ease-out}'
+'#arrgift .gbox{position:relative;width:min(380px,100%);max-height:94%;overflow-x:hidden;overflow-y:auto;border-radius:20px;border:2px solid #ff6a1f;background:linear-gradient(170deg,#2a1d15,#130f0c 60%);box-shadow:inset 0 0 0 3px #130f0c,inset 0 0 0 4px #ffc83a66,0 0 44px #ff6a1f66,0 18px 50px #000;padding:22px 16px 16px;text-align:center;color:#f3ece4;animation:agpop .45s cubic-bezier(.2,1.3,.4,1)}'
+'#arrgift .gl{position:absolute;left:50%;top:-100px;width:380px;height:380px;margin-left:-190px;border-radius:50%;background:repeating-conic-gradient(from 0deg,#ffb02e44 0 8deg,transparent 8deg 22deg);-webkit-mask:radial-gradient(circle,#000 18%,transparent 66%);mask:radial-gradient(circle,#000 18%,transparent 66%);animation:agspin 16s linear infinite;pointer-events:none}'
+'#arrgift .gx{position:relative;width:112px;height:104px;display:block;margin:0 auto -2px;filter:drop-shadow(0 0 16px #ff8a3dcc)}'
+'#arrgift .lid{transform-box:fill-box;transform-origin:50% 100%;animation:aglid .7s .35s cubic-bezier(.3,1.6,.5,1) forwards}'
+'#arrgift h3{position:relative;margin:6px 0 2px;font:800 21px Orbitron,Rajdhani,sans-serif;letter-spacing:1.5px;color:#ffd96b;text-shadow:0 0 14px #ff6a1f99}'
+'#arrgift .sub{position:relative;color:#a39a90;font-size:16px;font-weight:600;margin:0 0 8px}'
+'#arrgift .gr{position:relative;display:flex;flex-direction:column;gap:7px;margin:10px 0}'
+'#arrgift .gc{display:flex;align-items:center;gap:11px;text-align:left;padding:8px 10px;border-radius:12px;border:1px solid #ffc83a55;background:linear-gradient(90deg,#ff6a1f26,#00000055);opacity:0;transform:translateX(-14px);animation:agin .4s forwards}'
+'#arrgift .gi{flex:0 0 44px;height:44px;border-radius:50%;display:flex;align-items:center;justify-content:center;background:radial-gradient(circle at 35% 30%,#4a3322,#1a1310);border:2px solid #ffc83a;color:#ffd96b;box-shadow:0 0 12px #ffb02e66}'
+'#arrgift .gi svg{width:27px;height:27px;fill:currentColor}'
+'#arrgift .gt{flex:1;min-width:0}#arrgift .gt small{display:block;color:#a39a90;font-size:14px;font-weight:600;line-height:1.1}'
+'#arrgift .gt b{display:block;font:700 19px Rajdhani,sans-serif;color:#fff;overflow-wrap:anywhere}'
+'#arrgift .gt b.n{font:800 21px Orbitron,Rajdhani,sans-serif;color:#7dff8a;text-shadow:0 0 10px #4cc38a88}'
+'#arrgift .gm{position:relative;margin:8px 0 12px;padding:9px 12px;border-radius:10px;border-left:3px solid #ff6a1f;background:#00000066;text-align:left;font-size:17px;color:#f3ece4}'
+'#arrgift .gm small{display:block;color:#ff9a5a;font-weight:700;font-size:13px}'
+'#arrgift button.gk{position:relative;width:100%;padding:13px;border:0;border-radius:12px;background:linear-gradient(180deg,#ffb02e,#ff6a1f);color:#1b0f08;font:800 17px Orbitron,Rajdhani,sans-serif;letter-spacing:1.5px;box-shadow:0 5px 0 #8a3a0a,0 0 22px #ff6a1f88;animation:agpulse 1.6s ease-in-out infinite}'
+'#arrgift button.gk:active{transform:translateY(3px);box-shadow:0 2px 0 #8a3a0a}'
+'#arrgift .em{position:absolute;bottom:-8px;width:5px;height:5px;border-radius:50%;background:#ffb02e;box-shadow:0 0 8px #ff6a1f;opacity:0;animation:agem 3.4s linear infinite;pointer-events:none}'
+'@keyframes agfade{from{opacity:0}to{opacity:1}}@keyframes agpop{from{transform:scale(.6) translateY(30px);opacity:0}to{transform:none;opacity:1}}@keyframes agspin{to{transform:rotate(360deg)}}'
+'@keyframes aglid{to{transform:translateY(-16px) rotate(-12deg)}}@keyframes agin{to{opacity:1;transform:none}}@keyframes agpulse{50%{filter:brightness(1.15)}}@keyframes agem{0%{opacity:0;transform:translateY(0)}15%{opacity:1}100%{opacity:0;transform:translateY(-380px)}}'
+'@media (prefers-reduced-motion:reduce){#arrgift *{animation-duration:.01s!important;animation-iteration-count:1!important}}';
var BOX='<svg class="gx" viewBox="0 0 120 110"><defs><linearGradient id="agb" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ff8a3d"/><stop offset="1" stop-color="#c23a0a"/></linearGradient><linearGradient id="agr" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffe58a"/><stop offset="1" stop-color="#e0a21a"/></linearGradient></defs>'
+'<rect x="18" y="54" width="84" height="50" rx="6" fill="url(#agb)" stroke="#7a2200" stroke-width="2"/><rect x="54" y="54" width="12" height="50" fill="url(#agr)"/>'
+'<g class="lid"><rect x="12" y="40" width="96" height="18" rx="5" fill="url(#agb)" stroke="#7a2200" stroke-width="2"/><rect x="54" y="40" width="12" height="18" fill="url(#agr)"/>'
+'<path d="M60 40C44 18 24 26 38 40Z" fill="url(#agr)" stroke="#a87100" stroke-width="1.5"/><path d="M60 40C76 18 96 26 82 40Z" fill="url(#agr)" stroke="#a87100" stroke-width="1.5"/></g></svg>';
var IC={c:'i-coin',g:'i-gem',sk:'i-swords',pq:'i-parachute',rs:'i-sparkle',tj:'i-crown',x:'i-star'};
function mk(t,c,x){var e=document.createElement(t);if(c)e.className=c;if(x!=null)e.textContent=x;return e}
function cu(el,to,delay){setTimeout(function(){var t0=performance.now(),d=900;(function f(n){var p=Math.min(1,(n-t0)/d);el.textContent='+'+Math.round(to*(1-Math.pow(1-p,3))).toLocaleString('pt-BR');if(p<1)requestAnimationFrame(f)})(t0)},delay)}
function popup(items,msg){
 try{
  var old=document.getElementById('arrgift');if(old)old.remove();
  if(!document.getElementById('arrgift-css')){var st=document.createElement('style');st.id='arrgift-css';st.textContent=CSS;document.head.appendChild(st)}
  var only=!items.length,d=mk('div');d.id='arrgift';
  var b=mk('div','gbox');b.appendChild(mk('div','gl'));
  for(var i=0;i<9;i++){var em=mk('span','em');em.style.left=(6+i*11)+'%';em.style.animationDelay=(i*.37)+'s';em.style.animationDuration=(2.6+(i%4)*.5)+'s';b.appendChild(em)}
  var w=mk('div');w.innerHTML=BOX;b.appendChild(w.firstChild);
  b.appendChild(mk('h3',null,only?'MENSAGEM DO DONO':'PRESENTE RECEBIDO'));
  b.appendChild(mk('p','sub',only?'Você recebeu um aviso:':'Você ganhou:'));
  if(items.length){var g=mk('div','gr');
   items.forEach(function(it,i){var c=mk('div','gc'),ic=mk('span','gi'),t=mk('div','gt');c.style.animationDelay=(.55+i*.16)+'s';
    ic.innerHTML='<svg viewBox="0 0 24 24"><use href="#'+(IC[it.k]||'i-star')+'"/></svg>';
    t.appendChild(mk('small',null,it.l));
    if(it.v){var n=mk('b','n','+0');t.appendChild(n);cu(n,it.v,650+i*160)}else t.appendChild(mk('b',null,it.n));
    c.appendChild(ic);c.appendChild(t);g.appendChild(c)});
   b.appendChild(g)}
  if(msg){var m=mk('div','gm');m.appendChild(mk('small',null,'Mensagem do dono'));m.appendChild(document.createTextNode(msg));b.appendChild(m)}
  var k=mk('button','gk','COLETAR');k.type='button';k.onclick=function(){d.remove()};b.appendChild(k);
  d.appendChild(b);document.body.appendChild(d);snds()
 }catch(e){console.warn('presentes: tela',e)}}

/* ---------- entrega ---------- */
function give(r){
 var t=[];
 var c=num(r.c,10000000);if(c){try{coins+=c;try{svD()}catch(x){}var e=document.getElementById('coins');if(e&&typeof fmt==='function')e.textContent=fmt(coins);t.push({k:'c',l:'Moedas',v:c})}catch(x){console.warn('presentes: moedas',x)}}
 var g=num(r.g,1000000);if(g){try{gems+=g;try{svG()}catch(x){}var h=document.getElementById('gemv');if(h&&typeof fmt==='function')h.textContent=fmt(gems);t.push({k:'g',l:'Gemas',v:g})}catch(x){console.warn('presentes: gemas',x)}}
 function own(L,A,LST,k,l){if(!Array.isArray(A))return;A.slice(0,60).forEach(function(i){i=Math.floor(+i);if(i>0&&LST[i]&&L.indexOf(i)<0){L.push(i);t.push({k:k,l:l,n:LST[i].n})}});try{svD()}catch(x){}}
 try{own(OWN,r.sk,SK,'sk','Skin de arma')}catch(x){console.warn('presentes: skins',x)}
 try{own(OWNP,r.pq,PQ,'pq','Paraquedas')}catch(x){console.warn('presentes: paraquedas',x)}
 try{own(OWNR,r.rs,RS,'rs','Rastro')}catch(x){console.warn('presentes: rastros',x)}
 if(r.tj&&window.PE_TJ){try{window.PE_TJ.give(window.PE_TJ.id);t.push({k:'tj',l:'Traje exclusivo',n:window.PE_TJ.name})}catch(x){}}
 try{if(typeof flushAll==='function')flushAll()}catch(x){}
 return t}

var busy=0;
function check(){
 var u=uid();if(!u||busy)return;busy=1;
 var dk='arr_gf:'+u,done=[];try{done=JSON.parse(loc(dk)||'[]')}catch(e){}
 Promise.all([api('/inbox/giftlist/'+u).catch(function(){return null}),api('/inbox/giftlist/all').catch(function(){return null})]).then(function(R){
  var todo=[];
  [R[0],R[1]].forEach(function(L){if(L&&typeof L=='object')Object.keys(L).forEach(function(id){if(/^[A-Za-z0-9_-]{1,40}$/.test(id)&&done.indexOf(id)<0&&L[id]&&typeof L[id]=='object')todo.push([id,L[id]])})});
  if(!todo.length)return;
  return api('/inbox/gk'+u).catch(function(){return null}).then(function(mk){
   mk=mk&&typeof mk=='object'?mk:{};
   var items=[],msgs=[];
   todo.filter(function(x){return !mk[x[0]]}).slice(0,10).forEach(function(x){
    done.push(x[0]);loc(dk,JSON.stringify(done.slice(-300)));
    var t=give(x[1]);if(!t.length&&!x[1].a)t=[{k:'x',l:'Presente',n:'Novo item'}];
    items=items.concat(t);if(x[1].m)msgs.push(String(x[1].m).slice(0,40));
    api('/inbox/gk'+u+'/'+x[0],'PUT',1).catch(function(){})});
   todo.forEach(function(x){if(mk[x[0]]&&done.indexOf(x[0])<0){done.push(x[0]);loc(dk,JSON.stringify(done.slice(-300)))}});
   if(items.length||msgs.length)popup(items,msgs.join(' / '))})
 }).catch(function(e){console.warn('presentes:',e)}).then(function(){busy=0})}
window.arrGiftCheck=check;
window.arrGiftDemo=function(){popup([{k:'c',l:'Moedas',v:500},{k:'g',l:'Gemas',v:50},{k:'sk',l:'Skin de arma',n:'Dragao Flamejante'}],'Teste da tela de presente')};

/* ---------- catalogo para o painel ---------- */
function nm(s){return String(s||'').replace(/[;:|"\\<>]/g,'').slice(0,28)}
function chunks(L,pre){var out=[],cur='';L.forEach(function(e){var s=e[0]+':'+nm(e[1])+';';if(cur.length+s.length>3000){out.push(cur);cur=''}cur+=s});if(cur)out.push(cur);return out.map(function(v,i){return[pre+i,v]})}
function catalogo(){
 if(!uid())return;
 try{var sk=[],pq=[],rs=[];
  SK.forEach(function(k,i){if(i>0&&k&&k.n)sk.push([i,k.n+(typeof WP!=='undefined'&&WP[k.w]?' ('+WP[k.w].n+')':'')])});
  PQ.forEach(function(k,i){if(i>0&&k&&k.n)pq.push([i,k.n])});
  RS.forEach(function(k,i){if(i>0&&k&&k.n)rs.push([i,k.n])});
  var sig=sk.length+'/'+pq.length+'/'+rs.length+'/'+(window.PE_TJ?1:0);
  api('/inbox/catv').then(function(v){if(v===sig)return;
   var all=chunks(sk,'catsk').concat(chunks(pq,'catpq'),chunks(rs,'catrs')),p=Promise.resolve();
   all.forEach(function(x){p=p.then(function(){return api('/inbox/'+x[0],'PUT',x[1])})});
   p.then(function(){return api('/inbox/catv','PUT',sig)}).catch(function(){})}).catch(function(){})
 }catch(e){}}

/* confere a cada 1 s ate achar o ID do login, depois a cada 6 s */
var started='';
setInterval(function(){var u=uid();if(u&&u!==started){started=u;check();setTimeout(catalogo,4000)}},1000);
setInterval(function(){if(!document.hidden)check()},6000);
document.addEventListener('visibilitychange',function(){if(!document.hidden)check()});
})();
