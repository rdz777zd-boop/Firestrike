
/* ===== ATUALIZAÇÃO AUTOMÁTICA: detecta arquivo novo no GitHub e recarrega o jogo ===== */
(function(){
 if(!/^https?:/.test(location.protocol))return;
 var U=location.origin+location.pathname,SELF=location.href.split('#')[0],T=45000,pend=0,run=0,sig0=null,bar=document.getElementById('aup'),tx=document.getElementById('aut'),bt=document.getElementById('aub');
 function hs(t){var h=2166136261>>>0;for(var i=0;i<t.length;i++){h^=t.charCodeAt(i);h=Math.imul(h,16777619)>>>0}return h+':'+t.length}
 function sg(r){return(r.headers.get('etag')||'')+'|'+(r.headers.get('last-modified')||'')+'|'+(r.headers.get('content-length')||'')}
 function head(){return fetch(U+'?_h='+Date.now(),{method:'HEAD',cache:'no-store'}).then(function(r){return r.ok?sg(r):null}).catch(function(){return null})}
 function changed(){return Promise.all([fetch(SELF,{cache:'force-cache'}).then(function(r){return r.text()}),fetch(U+'?_c='+Date.now(),{cache:'no-store'}).then(function(r){return r.text()})]).then(function(a){return hs(a[0])!==hs(a[1])}).catch(function(){return false})}
 function playing(){try{return typeof mode!=='undefined'&&mode==='play'}catch(e){return false}}
 function go(){
  try{var l=+sessionStorage.getItem('arr_upd_t')||0;if(Date.now()-l<20000)return;sessionStorage.setItem('arr_upd_t',Date.now())}catch(e){}
  tx.textContent='Atualizando o jogo...';bt.style.display='none';bar.classList.remove('hide');
  setTimeout(function(){location.replace(U+'?_u='+Date.now())},500)
 }
 function apply(){
  if(!pend)return;
  if(!playing()){go();return}
  tx.textContent='Atualização pronta! Será aplicada ao fim da partida.';bt.style.display='';bar.classList.remove('hide');
  setTimeout(apply,2000)
 }
 bt.onclick=go;
 function check(){
  if(run||pend||document.hidden)return;run=1;
  head().then(function(sg1){
   if(sg1&&sig0&&sg1===sig0){run=0;return}
   return changed().then(function(c){run=0;if(sg1)sig0=sg1;if(c){pend=1;apply()}})
  }).catch(function(){run=0})
 }
 head().then(function(x){sig0=x;return changed()}).then(function(c){if(c){pend=1;apply()}}).catch(function(){});
 setInterval(check,T);
 document.addEventListener('visibilitychange',function(){if(!document.hidden)check()});
 addEventListener('focus',check);addEventListener('online',check);
})();
