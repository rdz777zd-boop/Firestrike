/* js-38-passe-elite.js - tela PASSE DE ELITE (estrutura + emblema VIP; SEM os outros itens ainda)
   - botao PASSE ELITE do menu abre a tela (#pe, estilo no css-23). X (e ESC) sempre fecha.
   - colunas de nivel: espaco GRATIS (em cima) e VIP (embaixo)
   - coluna 1 (VIP) = EMBLEMA VIP azul (ganha ao comprar o passe)
   - colunas 2-14: reservadas p/ ouro, gemas etc (vazias por enquanto)
   - a cada 15 colunas (15, 30...) = recompensa boa (destacada, vazia por enquanto)
   - COMPRAR PASSE VIP: 5000 gemas, confirmacao com 2 toques, salva em localStorage 'arr_vip' */
(function(){
var PRICE=5000,KV='arr_vip',KL='arr_pelv',NIV=30,STEP=15,cf=0,cft=0;
var EMB='data:image/webp;base64,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';
var $$=function(id){return document.getElementById(id)};
function G0(){try{return +gems||0}catch(e){return 0}}
function F(n){try{if(typeof fmt==='function')return fmt(n)}catch(e){}return Number(n).toLocaleString('pt-BR')}
function toast(m){try{if(typeof soon==='function')soon(m)}catch(e){}}
function sfx(a,b,c,d,e){try{if(typeof snd==='function')snd(a,b,c,d,e)}catch(x){}}
function ls(k,v){try{if(v===undefined)return localStorage.getItem(k)||'';localStorage.setItem(k,v)}catch(e){}return''}
function vip(){return ls(KV)==='1'}
function lvl(){var n=parseInt(ls(KL),10);return n>=1&&n<=NIV?n:1}

/* ---------- emblema VIP (azul): usado na tela do passe e ao lado do nome do jogador ---------- */
function vipBadge(){return '<img class="ytb vipb" src="'+EMB+'" alt="VIP" aria-label="Passe VIP" draggable="false">'}
function isMe(n){
 n=String(n||'').replace(/^\*/,'').replace(/^\[[^\]]*\]\s*/,'').toLowerCase();if(!n)return false;
 var a='';try{a=String(PN||'').toLowerCase()}catch(e){}
 var u='';try{u=String(window.ARR_USER||'').toLowerCase()}catch(e){}
 return n===a||(!!u&&n===u)}
/* se ytB (insignia de dono/verificado) puder ser trocada, o VIP entra nela (so para voce) */
try{if(typeof ytB==='function'&&!ytB.__vip){var y0=ytB;ytB=function(n){var r=y0.apply(this,arguments);if(r)return r;try{if(vip()&&isMe(n))return vipBadge()}catch(e){}return r};ytB.__vip=1}}catch(e){}

/* ---------- estilo (so o que o css-23 nao cobre) ---------- */
if(!$$('pq-css')){var st=document.createElement('style');st.id='pq-css';st.textContent=
'img.vipb{width:1.15em;height:1.15em;vertical-align:-.25em;margin-left:.25em;object-fit:contain;image-rendering:pixelated}'+
'#pe .pqvip{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:calc(var(--s)*1);padding:calc(var(--s)*2.4) calc(var(--s)*2);border:2px solid var(--g2);border-radius:calc(var(--s)*1.8);background:linear-gradient(120deg,#4a2a9a,#1d1238 80%);box-shadow:0 0 calc(var(--s)*4) #9b6bff55;font:800 calc(var(--s)*5)/1.1 Rajdhani,Arial,sans-serif;letter-spacing:calc(var(--s)*.2);color:#fff;text-align:center;width:100%}'+
'#pe .pqvip small{display:block;font:600 calc(var(--s)*3.4)/1.1 Rajdhani,Arial,sans-serif;color:#cdbcff;letter-spacing:0}'+
'#pe .pqvip .pqp{display:flex;align-items:center;justify-content:center;gap:calc(var(--s)*1.2);color:#ffd45a;font-size:calc(var(--s)*5.4)}'+
'#pe .pqvip .pqp svg{width:calc(var(--s)*5.6);height:calc(var(--s)*5.6)}'+
'#pe .pqvip:active{transform:scale(.97)}'+
'#pe .pqvip.cf{border-color:#ff8a3d;background:linear-gradient(120deg,#8a3a10,#2a120a 80%)}'+
'#pe .pqvip.own{border-color:#5bd68a;background:linear-gradient(120deg,#14442a,#0b1d14 80%);box-shadow:none;cursor:default}'+
'#pe .pqvip.own .pqp{display:none}'+
'#pe .pqs{display:flex;gap:calc(var(--s)*1.2);overflow-x:auto;overflow-y:hidden;-webkit-overflow-scrolling:touch;padding-bottom:calc(var(--s)*1.5)}'+
'#pe .pqk,#pe .pqc{flex:none;display:flex;flex-direction:column;gap:calc(var(--s)*1.2)}'+
'#pe .pqk{position:sticky;left:0;z-index:2;width:calc(var(--s)*15);background:#0f0a20;padding-right:calc(var(--s)*.8)}'+
'#pe .pqc{width:calc(var(--s)*17)}'+
'#pe .pqn{height:calc(var(--s)*6);display:flex;align-items:center;justify-content:center;font:800 calc(var(--s)*4)/1 Rajdhani,Arial,sans-serif;color:#8a82a6;border-bottom:2px solid #2a2148}'+
'#pe .pqc.cur .pqn{color:var(--g1);border-bottom-color:var(--g2)}'+
'#pe .pqc.bg .pqn{color:var(--g1)}'+
'#pe .pql{height:calc(var(--s)*20);display:flex;align-items:center;justify-content:center;border-radius:calc(var(--s)*1.4);font:800 calc(var(--s)*4)/1 Rajdhani,Arial,sans-serif;letter-spacing:calc(var(--s)*.3);background:#16102a;border:1px solid var(--bd);color:#b99aff}'+
'#pe .pql.v{color:var(--g1);border-color:#6a5421}'+
'#pe .pqf,#pe .pqv{position:relative;height:calc(var(--s)*20);border-radius:calc(var(--s)*1.6);background:#110b23;border:2px dashed #3b2f63;overflow:hidden}'+
'#pe .pqv{border-color:#6a5421;background:#150f1f}'+
'#pe .pqv .lk{position:absolute;right:calc(var(--s)*1);top:calc(var(--s)*1);width:calc(var(--s)*4.2);height:calc(var(--s)*4.2);color:var(--g2)}'+
'#pe.own .pqv .lk{display:none}'+
'#pe.own .pqv{border-style:solid}'+
/* recompensa boa (a cada 15 colunas) */
'#pe .pqf.big,#pe .pqv.big{border:2px solid var(--g2);box-shadow:inset 0 0 calc(var(--s)*3) #e0b64f44}'+
'#pe .pqf.big:before,#pe .pqv.big:before{content:"\\2605";position:absolute;left:calc(var(--s)*1);top:calc(var(--s)*.4);font:700 calc(var(--s)*4)/1 Arial;color:var(--g1)}'+
/* emblema VIP na coluna 1 */
'#pe .pqv .em{display:flex;align-items:center;justify-content:center;padding-top:calc(var(--s)*2.2)}'+
'#pe .pqv .em img{display:block;width:calc(var(--s)*11.5);height:calc(var(--s)*11.5);object-fit:contain;image-rendering:pixelated;filter:grayscale(.85) brightness(.65)}'+
'#pe.own .pqv .em img{filter:none;drop-shadow:none}'+
'#pe .pqv .ec{position:absolute;left:0;right:0;bottom:calc(var(--s)*1.2);text-align:center;font:800 calc(var(--s)*2.9)/1 Rajdhani,Arial,sans-serif;letter-spacing:calc(var(--s)*.2);color:#9fd0ff}'+
'#pe .pqv .ok{display:none;position:absolute;right:calc(var(--s)*1);top:calc(var(--s)*.6);font:800 calc(var(--s)*4.2)/1 Arial;font-style:normal;color:#5bd68a}'+
'#pe.own .pqv .ok{display:block}';
document.head.appendChild(st)}

/* ---------- html da tela ---------- */
var LK='<svg class="lk" viewBox="0 0 24 24" fill="currentColor"><path d="M7 10V7a5 5 0 0 1 10 0v3h1.5A1.5 1.5 0 0 1 20 11.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 20.5v-9A1.5 1.5 0 0 1 5.5 10zm2 0h6V7a3 3 0 0 0-6 0z"/></svg>';
var EM='<div class="em"><img src="'+EMB+'" alt="Emblema VIP" draggable="false"></div><span class="ec">EMBLEMA VIP</span><i class="ok">&#10003;</i>';
var cols='';for(var i=1;i<=NIV;i++){
 var b=(i%STEP===0)?' big':'';
 cols+='<div class="pqc'+(b?' bg':'')+'" data-n="'+i+'"><div class="pqn">'+i+'</div><div class="pqf'+b+'"></div><div class="pqv'+b+'">'+LK+(i===1?EM:'')+'</div></div>'}
var pe=$$('pe');if(pe)pe.remove();
pe=document.createElement('div');pe.id='pe';
pe.innerHTML=
'<div class="pw">'+
 '<div class="ph"><button type="button" class="px" id="pex" aria-label="Fechar">&#10005;</button>'+
  '<div class="pt"><svg class="ic"><use href="#i-crown"/></svg><b>PASSE DE ELITE</b></div>'+
  '<div class="pcu"><span class="pg"><svg class="ic"><use href="#i-gem"/></svg><b id="peg">0</b></span><span class="pco"><svg class="ic"><use href="#i-coin"/></svg><b id="pec">0</b></span></div></div>'+
 '<div class="pm">'+
  '<div class="pl">'+
   '<div class="pss"><b>TEMPORADA 1</b><small>PASSE DE ELITE</small></div>'+
   '<div class="plv"><div><h2 id="pelv">1</h2><small>N&Iacute;VEL</small></div><div></div>'+
    '<div class="pbr"><div class="pbt"><div class="pbp" id="pebar" style="width:0%"></div></div><b id="pept">0%</b></div></div>'+
   '<button type="button" class="pqvip" id="pevip"></button>'+
  '</div>'+
  '<div class="pr"><div class="pqs" id="peS">'+
   '<div class="pqk"><div class="pqn">&nbsp;</div><div class="pql">GR&Aacute;TIS</div><div class="pql v">VIP</div></div>'+cols+
  '</div></div>'+
 '</div>'+
'</div>';
document.body.appendChild(pe);

/* ---------- logica ---------- */
function upd(){
 var o=vip(),n=lvl(),b=$$('pevip');
 pe.classList.toggle('own',o);
 $$('peg').textContent=F(G0());
 try{$$('pec').textContent=F(+coins||0)}catch(e){$$('pec').textContent='0'}
 $$('pelv').textContent=n;
 var p=Math.round((n-1)/(NIV-1)*100);$$('pebar').style.width=p+'%';$$('pept').textContent=p+'%';
 [].forEach.call(pe.querySelectorAll('.pqc'),function(c){c.classList.toggle('cur',+c.dataset.n===n)});
 b.classList.toggle('own',o);b.classList.toggle('cf',!o&&!!cf);
 if(o){b.disabled=true;b.innerHTML='PASSE VIP ATIVO<small>Emblema VIP desbloqueado</small>'}
 else{b.disabled=false;b.innerHTML=(cf?'CONFIRMAR COMPRA?':'COMPRAR PASSE VIP')+'<span class="pqp"><svg class="ic"><use href="#i-gem"/></svg>'+F(PRICE)+'</span><small>'+(cf?'Toque de novo para confirmar':'Ganhe o emblema VIP')+'</small>'}
}
function buy(){
 if(vip())return;
 if(!cf){
  if(G0()<PRICE){toast('Gemas insuficientes: faltam '+F(PRICE-G0()));sfx(180,.15,'sawtooth',.05,-60);return}
  cf=1;clearTimeout(cft);cft=setTimeout(function(){cf=0;upd()},3500);upd();return}
 cf=0;clearTimeout(cft);
 if(G0()<PRICE){toast('Gemas insuficientes');upd();return}
 try{gems-=PRICE}catch(e){return}
 ls(KV,'1');
 try{svG()}catch(e){}
 try{var gv=$$('gemv');if(gv)gv.textContent=F(G0())}catch(e){}
 try{if(typeof flushAll==='function')flushAll()}catch(e){}
 sfx(700,.15,'triangle',.06,400);sfx(1000,.15,'triangle',.05,300);
 toast('Passe VIP ativado! Emblema VIP desbloqueado');upd()
}
function open(){cf=0;upd();pe.classList.add('on');var s=$$('peS');if(s)s.scrollLeft=0}
function close(){cf=0;clearTimeout(cft);pe.classList.remove('on')}
$$('pex').onclick=close;
$$('pevip').onclick=buy;
addEventListener('keydown',function(e){if(e.key==='Escape'&&pe.classList.contains('on'))close()});
var eb=$$('elitepb');
if(eb){eb.classList.remove('soon');eb.onclick=open}
window.peOpen=open;window.peClose=close;window.vipBadge=vipBadge;
})();
