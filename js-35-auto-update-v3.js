/* js-35-auto-update-v3.js - AUTO-ATUALIZACAO v3 (detecta mudanca em QUALQUER arquivo do jogo)

   PROBLEMA: os atualizadores antigos (js-17 e js-23) so comparavam o index.html. Quando uma versao nova
   mudava apenas um .js ou .css (o caso mais comum), o jogo nao percebia e ficava na versao velha.

   O QUE ESTE ARQUIVO FAZ:
   - guarda a "assinatura" (ETag / Last-Modified / tamanho) do index.html e de todos os .js/.css que a pagina usa;
   - a cada 15 s confere o index.html + um grupo rotativo de arquivos (todos os arquivos sao conferidos em ~1 min);
   - ao voltar para o jogo (foco, aba visivel, internet de volta) confere TODOS os arquivos na hora;
   - mudou? confirma uma 2a vez (evita falso alarme) e abre a tela ATUALIZANDO (js-27) mais curta;
   - se estiver no meio de uma partida, espera a partida acabar para atualizar.

   Para desligar: abra o jogo com ?autoupd=0   |   testar sem mudar nada: window.__autoUpd3.go() */
(function(){
'use strict';
if(!/^https?:/.test(location.protocol))return;
try{if(new URLSearchParams(location.search).get('autoupd')==='0')return}catch(e){}
var PAGE=location.origin+location.pathname,POLL=15000,PER=12,GAP=60000;
var files=[],base={},pos=0,busy=0,pend=0,ready=0;

function ft(u,o,ms){
 var c=window.AbortController?new AbortController():null,t=setTimeout(function(){try{c&&c.abort()}catch(e){}},ms);
 o=o||{};if(c)o.signal=c.signal;
 return fetch(u,o).then(function(r){clearTimeout(t);return r},function(e){clearTimeout(t);throw e})}
function sg(r){var s=(r.headers.get('etag')||'')+'|'+(r.headers.get('last-modified')||'')+'|'+(r.headers.get('content-length')||'');return s==='||'?null:s}
function head(u){return ft(u,{method:'HEAD',cache:'no-store',credentials:'omit'},8000).then(function(r){return r.ok?sg(r):null}).catch(function(){return null})}
function list(){
 var a=[PAGE],seen={};seen[PAGE]=1;
 var n=document.querySelectorAll('script[src],link[rel="stylesheet"][href]');
 for(var i=0;i<n.length;i++){
  var v=n[i].getAttribute('src')||n[i].getAttribute('href');
  try{var u=new URL(v,location.href);if(u.origin===location.origin&&!seen[u.href]){seen[u.href]=1;a.push(u.href)}}catch(e){}}
 return a}
/* processa a lista em grupos de 8 pedidos por vez */
function batch(urls,fn){
 var i=0;
 return new Promise(function(res){
  function next(){
   if(i>=urls.length)return res();
   var chunk=urls.slice(i,i+8);i+=8;
   Promise.all(chunk.map(fn)).then(next,next)}
  next()})}
function lastUpd(){try{return +sessionStorage.getItem('arr_upd3')||0}catch(e){return 0}}
function playing(){try{return typeof mode!=='undefined'&&mode==='play'}catch(e){return false}}

function go(){
 try{sessionStorage.setItem('arr_upd3',''+Date.now())}catch(e){}
 if(window.fsUpdScreen){window.fsUpdScreen({url:PAGE,min:1200});return}
 setTimeout(function(){location.replace(PAGE+'?_u='+Date.now())},300)}
function apply(){
 if(!pend)return;
 if(playing()){setTimeout(apply,2000);return}
 go()}

/* assinatura inicial (so grava a 1a vez de cada arquivo) */
function learn(){
 return batch(files,function(u){return head(u).then(function(s){if(s&&base[u]===undefined)base[u]=s})}).then(function(){ready=1})}

function check(urls){
 if(busy||pend||!ready)return Promise.resolve();
 busy=1;
 var ch=[];
 return batch(urls,function(u){
  return head(u).then(function(s){if(s&&base[u]&&s!==base[u])ch.push([u,s])})
 }).then(function(){
  if(!ch.length)return;
  /* confirma: espera um instante e confere de novo os arquivos que mudaram */
  return new Promise(function(r){setTimeout(r,1500)}).then(function(){
   return Promise.all(ch.map(function(c){return head(c[0]).then(function(s){return s===c[1]})}))
  }).then(function(oks){
   if(!oks.some(Boolean))return;
   if(Date.now()-lastUpd()<GAP){ch.forEach(function(c){base[c[0]]=c[1]});return}
   pend=1;apply()})
 }).then(function(){busy=0},function(){busy=0})}

/* a cada POLL: index.html + grupo rotativo de arquivos */
function tick(){
 if(document.hidden||files.length<2)return;
 var a=[files[0]],n=files.length-1;
 for(var k=0;k<PER&&k<n;k++){pos=pos%n;a.push(files[1+pos]);pos++}
 check(a)}
/* ao voltar para o jogo: confere tudo */
function full(){if(!document.hidden)check(files)}

files=list();
function start(){
 learn().then(function(){
  setInterval(tick,POLL);
  document.addEventListener('visibilitychange',full);
  addEventListener('focus',full);
  addEventListener('online',full)})}
if(document.readyState==='complete')setTimeout(start,1500);
else addEventListener('load',function(){setTimeout(start,1500)});

window.__autoUpd3={go:go,check:function(){return check(files)},base:base,files:files};
})();
