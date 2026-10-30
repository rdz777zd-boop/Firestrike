/* ===== PRESENTES DO DONO (js-49) =====
   O painel grava presentes em /inbox/giftlist/<ID ou all>/<gid> (protegido pela chave do dono no servidor).
   Este arquivo entrega cada presente uma unica vez a conta que o recebe (moedas, gemas, skins, paraquedas, rastros e o traje do passe).
   Tambem publica o catalogo de itens em /inbox/cat* para o painel mostrar os nomes. Carregar DEPOIS do js-42 e do js-41. */
(function(){
if(window.ARR_GIFTS)return;
window.ARR_GIFTS=1;
var B='https://armada-relay.rdz777zd.workers.dev/db';
try{var q=localStorage.getItem('arr_dburl');if(q)B=q;else if(typeof ARR_DB_URL!=='undefined'&&ARR_DB_URL)B=ARR_DB_URL}catch(e){}
B=String(B).replace(/\/+$/,'');
function api(p,m,b){var o={method:m||'GET'};if(b!==undefined){o.headers={'Content-Type':'application/json'};o.body=JSON.stringify(b)}
 return fetch(B+p+'.json',o).then(function(r){if(!r.ok)throw r.status;return r.json()})}
function uid(){var u=String(window.ARR_UID||'');return /^\d{6,10}$/.test(u)?u:''}
function say(m){try{if(typeof soon==='function')soon(m)}catch(e){}}
function num(v,max){v=Math.floor(+v);return v>0?Math.min(v,max):0}
function loc(k,v){try{if(v===undefined)return localStorage.getItem(k)||'';localStorage.setItem(k,v)}catch(e){}return ''}

/* ---------- entrega ---------- */
function give(r){
 var t=[];
 var c=num(r.c,10000000);if(c){try{coins+=c;svD();var e=document.getElementById('coins');if(e&&typeof fmt==='function')e.textContent=fmt(coins);t.push(c+' moedas')}catch(x){}}
 var g=num(r.g,1000000);if(g){try{gems+=g;svG();var h=document.getElementById('gemv');if(h&&typeof fmt==='function')h.textContent=fmt(gems);t.push(g+' gemas')}catch(x){}}
 function own(L,A,ok,nome){if(!Array.isArray(A))return;var n=0;A.slice(0,60).forEach(function(i){i=Math.floor(+i);if(i>0&&ok(i)&&L.indexOf(i)<0){L.push(i);n++}});if(n){try{svD()}catch(x){}t.push(n+' '+nome)}}
 try{own(OWN,r.sk,function(i){return !!SK[i]},'skins de arma')}catch(x){}
 try{own(OWNP,r.pq,function(i){return !!PQ[i]},'paraquedas')}catch(x){}
 try{own(OWNR,r.rs,function(i){return !!RS[i]},'rastros')}catch(x){}
 if(r.tj&&window.PE_TJ){try{window.PE_TJ.give(window.PE_TJ.id);t.push('traje '+window.PE_TJ.name)}catch(x){}}
 try{if(typeof flushAll==='function')flushAll()}catch(x){}
 return t}

var busy=0;
function check(){
 var u=uid();if(!u||busy||document.hidden)return;busy=1;
 var dk='arr_gf:'+u,done=[];try{done=JSON.parse(loc(dk)||'[]')}catch(e){}
 Promise.all([api('/inbox/giftlist/'+u).catch(function(){return null}),api('/inbox/giftlist/all').catch(function(){return null}),api('/inbox/gk'+u).catch(function(){return null})]).then(function(R){
  var mk=R[2]&&typeof R[2]=='object'?R[2]:{},todo=[];
  [R[0],R[1]].forEach(function(L){if(L&&typeof L=='object')Object.keys(L).forEach(function(id){if(/^[A-Za-z0-9_-]{1,40}$/.test(id)&&!mk[id]&&done.indexOf(id)<0&&L[id]&&typeof L[id]=='object')todo.push([id,L[id]])})});
  todo.slice(0,10).forEach(function(x){
   done.push(x[0]);loc(dk,JSON.stringify(done.slice(-300)));
   var t=give(x[1]);
   api('/inbox/gk'+u+'/'+x[0],'PUT',1).catch(function(){});
   say('Presente recebido: '+(t.length?t.join(', '):'novo item')+(x[1].m?' - '+String(x[1].m).slice(0,40):''))});
 }).catch(function(){}).then(function(){busy=0})}

/* ---------- catalogo para o painel ---------- */
function nm(s){return String(s||'').replace(/[;:|"\\<>]/g,'').slice(0,28)}
function chunks(L,pre){var out=[],cur='';L.forEach(function(e){var s=e[0]+':'+nm(e[1])+';';if(cur.length+s.length>3000){out.push(cur);cur=''}cur+=s});if(cur)out.push(cur);return out.map(function(v,i){return[pre+i,v]})}
function catalogo(){
 var u=uid();if(!u)return;
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

setTimeout(function(){check();catalogo()},6000);
setInterval(check,45000);
document.addEventListener('visibilitychange',function(){if(!document.hidden)setTimeout(check,1500)});
})();
