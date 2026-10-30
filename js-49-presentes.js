/* ===== PRESENTES DO DONO (js-49 v2) =====
   O painel grava presentes em /inbox/giftlist/<ID ou all>/<gid> (protegido pela chave do dono no servidor).
   Este arquivo confere a cada 6 s (e na hora do login) se ha presente novo, entrega UMA vez, mostra um aviso na tela
   e marca como entregue em /inbox/gk<ID>/<gid>. Quem estava offline recebe assim que entra.
   Tambem publica o catalogo de itens em /inbox/cat* para o painel. Carregar DEPOIS do js-42 e do js-41. */
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
function snds(){try{if(typeof snd==='function'){snd(700,.15,'triangle',.06,400);setTimeout(function(){snd(1000,.12,'triangle',.05,300)},160);setTimeout(function(){snd(1300,.14,'triangle',.05,300)},320)}}catch(e){}try{if(navigator.vibrate)navigator.vibrate([120,60,120])}catch(e){}}

/* ---------- aviso na tela ---------- */
function popup(lines,msg){
 try{
  var old=document.getElementById('arrgift');if(old)old.remove();
  if(!document.getElementById('arrgift-css')){var st=document.createElement('style');st.id='arrgift-css';
   st.textContent='#arrgift{position:fixed;inset:0;z-index:2147483000;background:#000c;display:flex;align-items:center;justify-content:center;padding:16px;font-family:Trebuchet MS,Arial,sans-serif}'
   +'#arrgift .gb{width:min(360px,100%);max-height:90%;overflow:auto;text-align:center;color:#fff;border-radius:18px;border:2px solid #ffc83a;background:radial-gradient(ellipse at 50% 0,#3a2c22,#171311 75%);padding:20px 16px;box-shadow:0 0 40px #ffb02e66;animation:arrgp .35s ease-out}'
   +'#arrgift h3{margin:0 0 4px;font-size:21px;letter-spacing:1px;color:#ffd96b}#arrgift .gs{font-size:44px;line-height:1.1}'
   +'#arrgift ul{list-style:none;margin:12px 0;padding:0}#arrgift li{padding:7px 10px;margin:5px 0;border-radius:9px;background:#00000066;font-weight:800;font-size:15px;color:#7dff8a}'
   +'#arrgift .gm{margin:6px 0 12px;color:#cfd8e3;font-size:14px;font-style:italic}'
   +'#arrgift button{width:100%;padding:13px;border:0;border-radius:11px;background:#ffc83a;color:#25211e;font:900 17px Trebuchet MS,Arial,sans-serif;letter-spacing:1px}'
   +'@keyframes arrgp{from{transform:scale(.7);opacity:0}to{transform:scale(1);opacity:1}}';
   document.head.appendChild(st)}
  var d=document.createElement('div');d.id='arrgift';
  var b=document.createElement('div');b.className='gb';
  var s=document.createElement('div');s.className='gs';s.textContent='\uD83C\uDF81';b.appendChild(s);
  var h=document.createElement('h3');h.textContent='PRESENTE RECEBIDO!';b.appendChild(h);
  var u=document.createElement('ul');lines.forEach(function(t){var l=document.createElement('li');l.textContent=t;u.appendChild(l)});b.appendChild(u);
  if(msg){var m=document.createElement('div');m.className='gm';m.textContent='\u201C'+msg+'\u201D';b.appendChild(m)}
  var k=document.createElement('button');k.textContent='COLETAR';k.onclick=function(){d.remove()};b.appendChild(k);
  d.appendChild(b);document.body.appendChild(d);snds()
 }catch(e){}}

/* ---------- entrega ---------- */
function give(r){
 var t=[];
 var c=num(r.c,10000000);if(c){try{coins+=c;try{svD()}catch(x){}var e=document.getElementById('coins');if(e&&typeof fmt==='function')e.textContent=fmt(coins);t.push('+'+c+' moedas')}catch(x){console.warn('presentes: moedas',x)}}
 var g=num(r.g,1000000);if(g){try{gems+=g;try{svG()}catch(x){}var h=document.getElementById('gemv');if(h&&typeof fmt==='function')h.textContent=fmt(gems);t.push('+'+g+' gemas')}catch(x){console.warn('presentes: gemas',x)}}
 function own(L,A,LST,rot){if(!Array.isArray(A))return;A.slice(0,60).forEach(function(i){i=Math.floor(+i);if(i>0&&LST[i]&&L.indexOf(i)<0){L.push(i);t.push(rot+': '+LST[i].n)}});try{svD()}catch(x){}}
 try{own(OWN,r.sk,SK,'Skin')}catch(x){console.warn('presentes: skins',x)}
 try{own(OWNP,r.pq,PQ,'Paraquedas')}catch(x){console.warn('presentes: paraquedas',x)}
 try{own(OWNR,r.rs,RS,'Rastro')}catch(x){console.warn('presentes: rastros',x)}
 if(r.tj&&window.PE_TJ){try{window.PE_TJ.give(window.PE_TJ.id);t.push('Traje: '+window.PE_TJ.name)}catch(x){}}
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
   var lines=[],msgs=[];
   todo.filter(function(x){return !mk[x[0]]}).slice(0,10).forEach(function(x){
    done.push(x[0]);loc(dk,JSON.stringify(done.slice(-300)));
    var t=give(x[1]);lines=lines.concat(t.length?t:['Novo item']);if(x[1].m)msgs.push(String(x[1].m).slice(0,40));
    api('/inbox/gk'+u+'/'+x[0],'PUT',1).catch(function(){})});
   todo.forEach(function(x){if(mk[x[0]]&&done.indexOf(x[0])<0){done.push(x[0]);loc(dk,JSON.stringify(done.slice(-300)))}});
   if(lines.length)popup(lines,msgs.join(' / '))})
 }).catch(function(e){console.warn('presentes:',e)}).then(function(){busy=0})}
window.arrGiftCheck=check;

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

/* entra em acao assim que o jogador faz login (confere a cada 1 s ate achar o ID), depois a cada 6 s */
var started='';
setInterval(function(){var u=uid();if(u&&u!==started){started=u;check();setTimeout(catalogo,4000)}},1000);
setInterval(function(){if(!document.hidden)check()},6000);
document.addEventListener('visibilitychange',function(){if(!document.hidden)check()});
})();
