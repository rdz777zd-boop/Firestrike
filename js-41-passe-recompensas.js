/* js-41-passe-recompensas.js - RECOMPENSAS DO PASSE DE ELITE (moedas, gemas e a M4A1 SOMBRIA)
   - Recompensas: moedas, gemas, skins de arma, paraquedas e rastros. Preenche as colunas 1-30 da aba GRATIS e da aba VIP (edite as tabelas FREE e VIP abaixo).
   - VIP nivel 15 = M4A1 SOMBRIA (evolutiva exclusiva, vem do js-40). VIP nivel 1 = emblema (js-38).
   - Toque numa recompensa liberada para resgatar; botao RESGATAR TUDO na lateral.
   - XP do passe: ganho ao fim de cada partida (60 + 20 por abate + 100 se vencer). 200 XP = 1 nivel.
   - Salva em localStorage: arr_pexp (xp), arr_pelv (nivel), arr_pecl (resgatados). */
(function(){
var pe=document.getElementById('pe');if(!pe||window.PE_REW)return;window.PE_REW=1;
var NIV=30,NEED=200,KV='arr_vip',KL='arr_pelv',KX='arr_pexp',KC='arr_pecl';
var C=function(n){return{c:n}},Gm=function(n){return{g:n}};
/* ---------- TABELAS DE RECOMPENSA (indice 0 = nivel 1) ---------- */
var I=function(t,i,o){o=o||{};o.it={t:t,i:i};return o};
/* it: item (sk = skin de arma, pq = paraquedas, rs = rastro). Os itens do passe sao EXCLUSIVOS (criados no js-42, nao existem na loja).
   PI('sk',0) = 1a skin exclusiva do passe, PI('pq',2) = 3o paraquedas exclusivo, etc. (ordem definida no js-42). tj = traje exclusivo. */
var X=window.PASS_X||{sk:[],pq:[],rs:[]};
var PI=function(t,n,o){var i=X[t]&&X[t][n];return i==null?C(1000):I(t,i,o)};
var FREE=[C(500),C(800),Gm(20),PI('rs',0),Gm(30),C(1200),C(1500),PI('pq',0),C(1800),PI('sk',0),
 C(2000),Gm(50),PI('rs',1),C(2500),{c:5000,g:100,big:1},C(2800),PI('pq',1),C(3000),C(3200),PI('sk',1),
 C(3500),Gm(70),Gm(90),C(4000),PI('sk',2),C(5000),PI('pq',2),C(5500),C(6000),PI('sk',3,{c:10000,g:200,big:1})];
var VIP=[null,C(1500),Gm(50),PI('pq',3),Gm(80),C(2500),PI('sk',4),Gm(100),C(3500),PI('rs',2),
 C(4000),PI('sk',5),C(4500),C(5000),{sk:1,big:1},C(5500),Gm(150),PI('pq',4),PI('rs',3),Gm(200),
 PI('sk',6),C(7500),PI('pq',5),C(8000),PI('sk',7),PI('rs',4),Gm(300),C(9000),PI('sk',8),{tj:'abismo',c:25000,g:500,big:1}];

var $$=function(id){return document.getElementById(id)};
function ls(k,v){try{if(v===undefined)return localStorage.getItem(k)||'';localStorage.setItem(k,v)}catch(e){}return''}
function F(n){try{if(typeof fmt==='function')return fmt(n)}catch(e){}return Number(n).toLocaleString('pt-BR')}
function toast(m){try{if(typeof soon==='function')soon(m)}catch(e){}}
function sfx(a,b,c,d,e){try{if(typeof snd==='function')snd(a,b,c,d,e)}catch(x){}}
function own(){return ls(KV)==='1'}
function lvl(){var n=parseInt(ls(KL),10);return n>=1&&n<=NIV?n:1}
function xp(){var n=parseInt(ls(KX),10);return n>0?n:0}
function cl(){try{return JSON.parse(ls(KC)||'{}')||{}}catch(e){return{}}}
function svCl(o){ls(KC,JSON.stringify(o))}

/* ---------- estilo ---------- */
var st=document.createElement('style');st.id='pr-css';st.textContent=
'#pe .rw{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:calc(var(--s)*.8);padding:calc(var(--s)*1) calc(var(--s)*.6) calc(var(--s)*4);cursor:pointer}'+
'#pe .rw .ri{font-size:calc(var(--s)*8);line-height:1;display:flex;gap:calc(var(--s)*.6)}'+
'#pe .rw .ri svg{width:1em;height:1em}'+
'#pe .rw .rt{font:800 calc(var(--s)*3.8)/1 Rajdhani,Arial,sans-serif;color:#fff;text-align:center}'+
'#pe .rw .rt i{display:block;font-style:normal;color:#7fd6ff}'+
'#pe .rw .rt i.k{color:#ffd45a}'+
'#pe .rw .rt b{display:block;font-weight:800;font-size:calc(var(--s)*3.1);line-height:1.1}'+
'#pe .rw .rt u{display:block;text-decoration:none;font-size:calc(var(--s)*2.5);color:#9d93b8;letter-spacing:calc(var(--s)*.1)}'+
'#pe .rw canvas{width:92%;height:auto;display:block;filter:drop-shadow(0 0 calc(var(--s)*1.4) #9a4dff)}'+
'#pe .rw .rb{position:absolute;left:0;right:0;bottom:0;padding:calc(var(--s)*.7) 0;text-align:center;font:900 calc(var(--s)*2.9)/1 Rajdhani,Arial,sans-serif;letter-spacing:calc(var(--s)*.2)}'+
'#pe .rw.ok .rb{background:linear-gradient(#f6d77a,#c9962f);color:#3a2308}'+
'#pe .rw.cl .rb{background:#14442a;color:#7dff8a}'+
'#pe .rw.cl .ri,#pe .rw.cl .rt,#pe .rw.cl canvas{opacity:.45}'+
'#pe .rw.lk .rb{background:#1d1635;color:#8a82a6}'+
'#pe .rw.lk .ri,#pe .rw.lk .rt,#pe .rw.lk canvas{opacity:.6}'+
'#pe .pqf.ok,#pe .pqv.ok{border-style:solid;border-color:var(--g2);box-shadow:0 0 calc(var(--s)*3) #f6d77a99;animation:pepl 1.6s ease-in-out infinite}'+
'#pe .pqv.som{border-color:#9a4dff;background:radial-gradient(circle at 50% 40%,#3a1670,#0e0820 75%)}'+
'#pe .pqall{margin-top:calc(var(--s)*1);width:100%;padding:calc(var(--s)*1.8) calc(var(--s)*2);border:2px solid #f8e39a;border-radius:calc(var(--s)*1.4);background:linear-gradient(#f9df8c,#e4b84e 55%,#c9962f);color:#2a1608;font:900 calc(var(--s)*4.6)/1 Rajdhani,Arial,sans-serif;letter-spacing:calc(var(--s)*.2)}'+
'#pe .pqall[disabled]{background:#1d1635;border-color:#3b2f63;color:#8a82a6}';
document.head.appendChild(st);

/* ---------- dados ---------- */
function rewOf(k,n){return k==='f'?FREE[n-1]:VIP[n-1]}
function stOf(k,n,C0){
 if(C0[k+n])return'cl';
 if(lvl()>=n&&(k==='f'||own()))return'ok';
 return'lk'}
function skIcon(){
 try{var i=window.SOMBRIA_IDX,w=window.SOMBRIA_WID;if(i!=null&&typeof skCv==='function')return skCv(w,i,150,80)}catch(e){}
 return null}
var TN={sk:'SKIN',pq:'PARAQUEDAS',rs:'RASTRO'};
function itObj(it){try{return(it.t==='sk'?SK:it.t==='pq'?PQ:RS)[it.i]||null}catch(e){return null}}
function itIcon(it){
 try{var o=itObj(it);if(!o)return null;
  return it.t==='sk'?skCv(14,it.i,150,80):it.t==='pq'?pqCv(o,150,80):rsCv(o,150,80)}catch(e){return null}}
function cell(k,n,r,C0){
 var s=stOf(k,n,C0),el=pe.querySelector('.pqc[data-n="'+n+'"] '+(k==='f'?'.pqf':'.pqv'));if(!el)return;
 el.classList.remove('ok');if(s==='ok')el.classList.add('ok');
 el.classList.toggle('som',!!r.sk);
 el.innerHTML='';
 var w=document.createElement('div');w.className='rw '+s;
 if(r.sk){
  var cv=skIcon();if(cv)w.appendChild(cv);
  var t=document.createElement('div');t.className='rt';t.innerHTML='<b style="color:#fff">M4A1 SOMBRIA</b><i class="k" style="color:#c07bff">EVOLUTIVA</i>';w.appendChild(t)}
 else{
  var it=r.it,io=it&&itObj(it),ic=io&&itIcon(it),h='';
  if(ic)w.appendChild(ic);
  else if(!io){h+='<div class="ri">';
   if(r.c)h+='<svg class="ic"><use href="#i-coin"/></svg>';
   if(r.g)h+='<svg class="ic"><use href="#i-gem"/></svg>';
   h+='</div>'}
  h+='<div class="rt">';
  if(io){var rc='#fff';try{rc=RCOL[io.ra]||'#fff'}catch(e){}h+='<b style="color:'+rc+'">'+io.n+'</b><u>'+TN[it.t]+'</u>'}
  h+=(r.c?'<i class="k">'+F(r.c)+'</i>':'')+(r.g?'<i>'+F(r.g)+'</i>':'')+'</div>';
  w.innerHTML=h;if(ic)w.insertBefore(ic,w.firstChild)}
 var lab=s==='cl'?'RESGATADO':s==='ok'?'RESGATAR':(k==='v'&&!own()&&lvl()>=n?'VIP':'NIVEL '+n);
 var bar=document.createElement('div');bar.className='rb';bar.textContent=lab;w.appendChild(bar);
 w.onclick=function(){claim(k,n)};
 el.appendChild(w)}

/* ---------- entrega ---------- */
function give(r){
 if(r.c){try{coins+=r.c;svD();var e=$$('coins');if(e)e.textContent=F(coins)}catch(x){}}
 if(r.g){try{gems+=r.g;svG();var g=$$('gemv');if(g)g.textContent=F(gems)}catch(x){}}
 if(r.sk)ensureSk(1);
 if(r.it)giveIt(r.it)}
function giveIt(it){
 try{var L=it.t==='sk'?OWN:it.t==='pq'?OWNP:OWNR;if(L.indexOf(it.i)<0){L.push(it.i);svD()}}catch(e){}}
function ensureSk(eq){
 try{var i=window.SOMBRIA_IDX;if(i==null)return false;
  if(OWN.indexOf(i)<0)OWN.push(i);
  if(eq&&SK[i])EQ[SK[i].w]=i;
  svD();return true}catch(e){return false}}
function flush(){try{if(typeof flushAll==='function')flushAll()}catch(e){}}
function claim(k,n,quiet){
 var r=rewOf(k,n),C0=cl();if(!r)return false;
 var s=stOf(k,n,C0);
 if(s==='cl'){if(!quiet)toast('Ja resgatado');return false}
 if(s!=='ok'){if(!quiet)toast(k==='v'&&!own()&&lvl()>=n?'Exclusivo do Passe VIP':'Alcance o nivel '+n);if(!quiet)sfx(180,.12,'sawtooth',.04,-60);return false}
 if(r.sk&&window.SOMBRIA_IDX==null){if(!quiet)toast('M4A1 SOMBRIA indisponivel: atualize o jogo');return false}
 give(r);C0[k+n]=1;svCl(C0);flush();
 if(!quiet){sfx(700,.15,'triangle',.06,400);sfx(1000,.12,'triangle',.05,300);
  toast(r.sk?'M4A1 SOMBRIA desbloqueada e equipada!':(r.it&&itObj(r.it)?itObj(r.it).n+' desbloqueado! ':'')+(r.c||r.g?'+ ':'')+(r.c?F(r.c)+' moedas ':'')+(r.g?F(r.g)+' gemas':''));render()}
 return true}
function pending(){var C0=cl(),n=0;for(var i=1;i<=NIV;i++){if(stOf('f',i,C0)==='ok')n++;if(VIP[i-1]&&stOf('v',i,C0)==='ok')n++}return n}
function claimAll(){
 var t=0,c=0,g=0,sk=0,ni=0,C0;
 for(var i=1;i<=NIV;i++){['f','v'].forEach(function(k){
  var r=rewOf(k,i);if(!r)return;C0=cl();
  if(stOf(k,i,C0)==='ok'&&claim(k,i,1)){t++;c+=r.c||0;g+=r.g||0;if(r.sk)sk=1;if(r.it||r.tj)ni++}})}
 if(!t){toast('Nada para resgatar agora');return}
 sfx(700,.15,'triangle',.06,400);sfx(1000,.15,'triangle',.05,300);
 toast('Resgatado: '+(c?F(c)+' moedas ':'')+(g?F(g)+' gemas ':'')+(ni?ni+' item(ns) ':'')+(sk?'+ M4A1 SOMBRIA':''));render()}

/* ---------- tela ---------- */
var allB=null;
function render(){
 var C0=cl(),i;
 for(i=1;i<=NIV;i++){cell('f',i,FREE[i-1],C0);if(VIP[i-1])cell('v',i,VIP[i-1],C0)}
 var n=lvl(),x=n>=NIV?0:xp(),p=n>=NIV?100:Math.min(100,Math.round(((n-1)+x/NEED)/(NIV-1)*100));
 var bar=$$('pebar'),pt=$$('pept');
 if(bar)bar.style.width=p+'%';
 if(pt)pt.textContent=n>=NIV?'MAX':x+'/'+NEED+' XP';
 if(allB){var q=pending();allB.disabled=!q;allB.textContent=q?'RESGATAR TUDO ('+q+')':'NADA PARA RESGATAR'}}
var pl=pe.querySelector('.pl');
if(pl){allB=document.createElement('button');allB.type='button';allB.className='pqall';allB.onclick=claimAll;pl.appendChild(allB)}

function goTo(){
 try{var s=$$('peS'),C0=cl(),t=lvl(),i;
  for(i=1;i<=NIV;i++){if(stOf('f',i,C0)==='ok'||(VIP[i-1]&&stOf('v',i,C0)==='ok')){t=i;break}}
  var c=pe.querySelector('.pqc[data-n="'+t+'"]'),k=pe.querySelector('.pqk');
  if(s&&c)s.scrollLeft=Math.max(0,c.getBoundingClientRect().left-s.getBoundingClientRect().left+s.scrollLeft-(k?k.offsetWidth:0)-6)}catch(e){}}

var eb=$$('elitepb');
if(eb){var o0=eb.onclick;eb.onclick=function(){if(o0)o0.apply(this,arguments);render();goTo()}}
var vb=$$('pevip');
if(vb&&window.MutationObserver){var busy=0;new MutationObserver(function(){if(busy)return;busy=1;try{render()}finally{busy=0}}).observe(vb,{childList:true})}

/* ---------- XP ao fim da partida ---------- */
function addXp(a){
 var n=lvl(),x=xp()+a,up=0;
 while(n<NIV&&x>=NEED){x-=NEED;n++;up++}
 if(n>=NIV)x=0;
 ls(KX,String(x));ls(KL,String(n));return up?n:0}
if(typeof finish2==='function'&&!finish2.__pe){
 var f0=finish2;
 finish2=function(){
  var a=0;
  try{var g=G;
   if(g&&g.p&&!g.room&&!g.hc&&!g.wf&&!g.__pexp){
    g.__pexp=1;var k=+g.p.kills||0,win;
    if(g.cs)win=g.cs.sc[0]>g.cs.sc[1];else win=!!(g.teams&&g.teams[g.p.tm]&&g.teams[g.p.tm].alive>0);
    a=60+20*k+(win?100:0)}}catch(e){a=0}
  var r=f0.apply(this,arguments);
  if(a){try{var up=addXp(a);flush();setTimeout(function(){toast(up?'PASSE DE ELITE: nivel '+up+'! (+'+a+' XP)':'Passe de Elite: +'+a+' XP')},1500)}catch(e){}}
  return r};
 finish2.__pe=1}

/* ---------- garante itens e a SOMBRIA no inventario se ja foram resgatados ---------- */
function heal(){try{var C0=cl(),i;
 for(i=1;i<=NIV;i++){['f','v'].forEach(function(k){var r=rewOf(k,i);if(!r||!C0[k+i])return;
  if(r.sk&&window.SOMBRIA_IDX!=null&&OWN.indexOf(window.SOMBRIA_IDX)<0)ensureSk(0);
  if(r.it)giveIt(r.it)})}}catch(e){}}
heal();setTimeout(heal,1500);
render();
window.peRewards={claim:claim,claimAll:claimAll,addXp:addXp,render:render};
})();
