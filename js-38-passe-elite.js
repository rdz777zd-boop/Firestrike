/* js-38-passe-elite.js - tela PASSE DE ELITE (so a estrutura: colunas de niveis + botao do passe VIP por 5000 gemas; SEM itens ainda)
   - botao PASSE ELITE do menu abre a tela (#pe, estilo no css-23)
   - botao X (e tecla ESC) sempre fecha a tela
   - colunas: cada nivel tem 1 espaco GRATIS (em cima) e 1 espaco VIP (embaixo), todos vazios por enquanto
   - COMPRAR PASSE VIP: 5000 gemas, pede confirmacao (toque 2x), salva em localStorage 'arr_vip' */
(function(){
var PRICE=5000,KV='arr_vip',KL='arr_pelv',NIV=30,cf=0,cft=0;
var $$=function(id){return document.getElementById(id)};
function G0(){try{return +gems||0}catch(e){return 0}}
function F(n){try{if(typeof fmt==='function')return fmt(n)}catch(e){}return Number(n).toLocaleString('pt-BR')}
function toast(m){try{if(typeof soon==='function')soon(m)}catch(e){}}
function sfx(a,b,c,d,e){try{if(typeof snd==='function')snd(a,b,c,d,e)}catch(x){}}
function ls(k,v){try{if(v===undefined)return localStorage.getItem(k)||'';localStorage.setItem(k,v)}catch(e){}return''}
function vip(){return ls(KV)==='1'}
function lvl(){var n=parseInt(ls(KL),10);return n>=1&&n<=NIV?n:1}

/* ---------- estilo (so o que o css-23 nao cobre) ---------- */
if(!$$('pq-css')){var st=document.createElement('style');st.id='pq-css';st.textContent=
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
'#pe .pql{height:calc(var(--s)*20);display:flex;align-items:center;justify-content:center;border-radius:calc(var(--s)*1.4);font:800 calc(var(--s)*4)/1 Rajdhani,Arial,sans-serif;letter-spacing:calc(var(--s)*.3);background:#16102a;border:1px solid var(--bd);color:#b99aff}'+
'#pe .pql.v{color:var(--g1);border-color:#6a5421}'+
'#pe .pqf,#pe .pqv{position:relative;height:calc(var(--s)*20);border-radius:calc(var(--s)*1.6);background:#110b23;border:2px dashed #3b2f63}'+
'#pe .pqv{border-color:#6a5421;background:#150f1f}'+
'#pe .pqv .lk{position:absolute;right:calc(var(--s)*1);top:calc(var(--s)*1);width:calc(var(--s)*4.2);height:calc(var(--s)*4.2);color:var(--g2)}'+
'#pe.own .pqv .lk{display:none}'+
'#pe.own .pqv{border-style:solid}';
document.head.appendChild(st)}

/* ---------- html da tela ---------- */
var LK='<svg class="lk" viewBox="0 0 24 24" fill="currentColor"><path d="M7 10V7a5 5 0 0 1 10 0v3h1.5A1.5 1.5 0 0 1 20 11.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 20.5v-9A1.5 1.5 0 0 1 5.5 10zm2 0h6V7a3 3 0 0 0-6 0z"/></svg>';
var cols='';for(var i=1;i<=NIV;i++)cols+='<div class="pqc" data-n="'+i+'"><div class="pqn">'+i+'</div><div class="pqf"></div><div class="pqv">'+LK+'</div></div>';
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
 if(o){b.disabled=true;b.innerHTML='PASSE VIP ATIVO<small>Voc&ecirc; j&aacute; tem o passe VIP</small>'}
 else{b.disabled=false;b.innerHTML=(cf?'CONFIRMAR COMPRA?':'COMPRAR PASSE VIP')+'<span class="pqp"><svg class="ic"><use href="#i-gem"/></svg>'+F(PRICE)+'</span><small>'+(cf?'Toque de novo para confirmar':'Pague com gemas')+'</small>'}
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
 toast('Passe VIP ativado!');upd()
}
function open(){cf=0;upd();pe.classList.add('on');var s=$$('peS');if(s)s.scrollLeft=0}
function close(){cf=0;clearTimeout(cft);pe.classList.remove('on')}
$$('pex').onclick=close;
$$('pevip').onclick=buy;
addEventListener('keydown',function(e){if(e.key==='Escape'&&pe.classList.contains('on'))close()});
var eb=$$('elitepb');
if(eb){eb.classList.remove('soon');eb.onclick=open}
window.peOpen=open;window.peClose=close;
})();
