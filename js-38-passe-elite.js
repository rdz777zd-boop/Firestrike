/* js-38-passe-elite.js - PASSE DE ELITE (tela aberta pelo banner do menu)
   - 100 recompensas na coluna GRATUITO e 100 na coluna ELITE (VIP)
   - Passe VIP (ELITE) comprado com 5000 gemas
   - As recompensas ficam em rw() logo abaixo: moedas e gemas ja funcionam; os ITENS ficam reservados ("EM BREVE")
     nos niveis terminados em 5 e entram depois e so trocar o retorno de rw() para esses niveis.
   - XP do passe: ganho ao terminar partidas (veja addXp). 100 XP = 1 nivel.  */
(function(){
'use strict';
const MAXL=100,XPL=100,PRECO=5000,SEASON=30*864e5,KEY='arr_passe';
const $=id=>document.getElementById(id);
const F=n=>{try{return fmt(n)}catch(e){return String(n)}};
const say=t=>{try{soon(t)}catch(e){console.log('[passe]',t)}};
const sfx=()=>{try{snd(700,.15,'triangle',.06,400)}catch(e){}};

/* ---------- recompensas (edite aqui) ---------- */
function rw(t,l){
 if(l%10===5)return{k:'item'};                         /* item a adicionar depois */
 if(l%10===0)return{k:'gem',a:t==='v'?100+l:20};        /* gemas */
 return{k:'coin',a:t==='v'?150+l*30:50+l*10}}           /* moedas */

/* ---------- progresso salvo ---------- */
let P=(function(){const d={lv:1,xp:0,vip:0,cf:{},cv:{},s0:Date.now()};try{const j=JSON.parse(localStorage.getItem(KEY));if(j&&typeof j==='object')return Object.assign(d,j)}catch(e){}return d})();
const sv=()=>{try{localStorage.setItem(KEY,JSON.stringify(P))}catch(e){}};
sv();
function addXp(n){let up=0;P.xp+=n;while(P.xp>=XPL&&P.lv<MAXL){P.xp-=XPL;P.lv++;up++}if(P.lv>=MAXL)P.xp=0;sv();return up}

/* ---------- moedas / gemas do jogo ---------- */
const cur=()=>{let g=0,c=0;try{g=gems|0}catch(e){}try{c=coins|0}catch(e){}return[g,c]};
function give(r){
 if(r.k==='coin'){try{coins+=r.a;try{svD()}catch(e){}$('coins').textContent=F(coins)}catch(e){}}
 else if(r.k==='gem'){try{gems+=r.a;try{svG()}catch(e){}$('gemv').textContent=F(gems)}catch(e){}}}

/* ---------- regras ---------- */
const M=t=>t==='f'?P.cf:P.cv;
const can=(t,l)=>{const r=rw(t,l);if(r.k==='item'||l>P.lv||(t==='v'&&!P.vip))return 0;return !M(t)[l]};
function claim(t,l,q){if(!can(t,l))return 0;const r=rw(t,l);give(r);M(t)[l]=1;sv();if(!q){sfx();say('+'+F(r.a)+(r.k==='gem'?' gemas!':' moedas!'))}return r}

/* ---------- visual ---------- */
const ART={coin:'<svg class="ic"><use href="#i-coin"/></svg>',gem:'<svg class="ic"><use href="#i-gem"/></svg>',item:'<svg class="ic it"><use href="#i-gift"/></svg>'};
const NAME=r=>r.k==='coin'?F(r.a)+' MOEDAS':r.k==='gem'?F(r.a)+' GEMAS':'ITEM<br>EM BREVE';
const LOCK='<span class="pk"><svg viewBox="0 0 24 24"><path fill-rule="evenodd" d="M7 10V8a5 5 0 0 1 10 0v2h2v11H5V10zm2 0h6V8a3 3 0 0 0-6 0z"/></svg></span>';
const CHECK='<span class="pk" style="color:#7dff8a"><svg viewBox="0 0 24 24"><path class="pe-ck" d="M4 12l5 5L20 6"/></svg></span>';
let T='v',pg=0,cf=0,cfT=0,iv=0;

function card(t,l,sm){
 const r=rw(t,l),done=M(t)[l],ok=can(t,l),lk=!done&&(l>P.lv||(t==='v'&&!P.vip));
 return'<div class="pc'+(sm?' sm':'')+(done?' cl':'')+(ok?' ok':'')+(l===P.lv?' cur':'')+(lk?' lk':'')+'" data-a="c" data-t="'+t+'" data-l="'+l+'">'
 +'<i class="pb">'+l+'</i><div class="pa">'+ART[r.k]+'</div><b class="pn">'+NAME(r)+'</b>'
 +(done?CHECK:lk?LOCK:'')+(ok?'<span class="pcl">COLETAR</span>':'')+'</div>'}

function render(){
 const g=cur();
 $('peg').textContent=F(g[0]);$('pec').textContent=F(g[1]);
 const pct=P.lv>=MAXL?100:Math.min(99,Math.floor(((P.lv-1)+P.xp/XPL)/(MAXL-1)*100));
 const gw=P.lv>=MAXL?100:(P.lv-1)/(MAXL-1)*100,pw=P.lv>=MAXL?0:P.xp/XPL/(MAXL-1)*100;
 $('pelv').innerHTML='<div><h2>N\u00cdVEL '+P.lv+'</h2><small>'+P.lv+' / '+MAXL+(P.lv<MAXL?' \u2022 XP '+P.xp+' / '+XPL:'')+'</small></div>'
 +'<button type="button" class="pca" data-a="all"><svg class="ic"><use href="#i-gift"/></svg>COLETAR TUDO</button>'
 +'<div class="pbr"><div class="pbt"><i class="pbg" style="width:'+gw+'%"></i><i class="pbp" style="width:'+pw+'%"></i></div><b>'+pct+'%</b></div>';
 $('petb').innerHTML='<button type="button" data-a="tab" data-t="v" class="'+(T==='v'?'on':'')+'"><svg class="ic"><use href="#i-crown"/></svg>ELITE</button>'
 +'<button type="button" data-a="tab" data-t="f" class="'+(T==='f'?'on':'')+'">GRATUITO</button>';
 const b=$('peby');
 if(P.vip){b.className='pby on';b.innerHTML='<b><svg class="ic"><use href="#i-crown"/></svg>PASSE PREMIUM ATIVO</b><small>RECOMPENSAS EXCLUSIVAS LIBERADAS</small>'}
 else if(cf){b.className='pby cf';b.innerHTML='<b>TOQUE DE NOVO PARA CONFIRMAR</b><small>'+F(PRECO)+' GEMAS</small>'}
 else{b.className='pby';b.innerHTML='<b><svg class="ic"><use href="#i-crown"/></svg>COMPRAR PASSE PREMIUM</b><small>'+F(PRECO)+' GEMAS \u2022 RECOMPENSAS EXCLUSIVAS</small>'}
 const a=pg*10+1,z=a+9;
 $('pepg').innerHTML='<button type="button" data-a="pp" data-d="-1"'+(pg<=0?' disabled':'')+'>\u2039</button><span>RECOMPENSAS DO PASSE \u2014 N\u00cdVEIS '+a+' A '+z+'</span><button type="button" data-a="pp" data-d="1"'+(z>=MAXL?' disabled':'')+'>\u203A</button>';
 let h='';for(let l=a;l<=z;l++)h+=card(T,l);$('pegd').innerHTML=h;
 let n='',c=0;for(let l=P.lv+1;l<=MAXL&&c<5;l++){if(l%5===0){n+=card(T,l,1);c++}}
 $('penx').innerHTML=n||'<p class="pds" style="grid-column:1/-1">Voc\u00ea chegou ao n\u00edvel m\u00e1ximo!</p>';
 tick()}

function tick(){
 const rem=SEASON-((Date.now()-P.s0)%SEASON),d=Math.floor(rem/864e5),h=Math.floor(rem%864e5/36e5),m=Math.floor(rem%36e5/6e4);
 const e=$('pess');if(e)e.textContent='Encerra em: '+d+'d '+String(h).padStart(2,'0')+'h '+String(m).padStart(2,'0')+'m'}

/* ---------- abrir / fechar ---------- */
function mk(){
 const d=document.createElement('div');d.id='pe';
 d.innerHTML='<div class="pw"><div class="ph"><button type="button" class="px" data-a="x" aria-label="Fechar">\u2715</button>'
 +'<div class="pt"><svg class="ic"><use href="#i-crown"/></svg><b>PASSE DE ELITE</b></div>'
 +'<div class="pcu"><span class="pg"><svg class="ic"><use href="#i-gem"/></svg><b id="peg">0</b></span><span class="pco"><svg class="ic"><use href="#i-coin"/></svg><b id="pec">0</b></span></div></div>'
 +'<div class="pm"><div class="pl"><div class="pss"><b>TEMPORADA 1 \u2014 SOMBRAS DO ABISMO</b><small id="pess"></small></div>'
 +'<div class="plv" id="pelv"></div><div class="ptb" id="petb"></div>'
 +'<button type="button" class="pby" id="peby" data-a="buy"></button>'
 +'<p class="pds">Desbloqueie recompensas exclusivas nos '+MAXL+' n\u00edveis da coluna ELITE.</p></div>'
 +'<div class="pr"><div class="pst" id="pepg"></div><div class="pgd" id="pegd"></div>'
 +'<div class="pst"><span>PR\u00d3XIMAS RECOMPENSAS</span></div><div class="pgd" id="penx"></div></div></div>'
 +'<div class="pnv"><button type="button" data-a="nav" data-n="m"><svg class="ic"><use href="#i-target"/></svg>MISS\u00d5ES</button>'
 +'<button type="button" class="on" data-a="nav" data-n="p"><svg class="ic"><use href="#i-crown"/></svg>PASSE</button>'
 +'<button type="button" data-a="nav" data-n="l"><svg class="ic"><use href="#i-box"/></svg>LOJA</button></div></div>';
 document.body.appendChild(d);
 d.addEventListener('click',onClick);return d}
let root=null;
function open(){if(!root)root=mk();pg=Math.floor((P.lv-1)/10);cf=0;root.classList.add('on');render();clearInterval(iv);iv=setInterval(()=>{if(root.classList.contains('on'))tick();else clearInterval(iv)},20000)}
function close(){if(root)root.classList.remove('on');clearTimeout(cfT);cf=0}
window.passeAbrir=open;window.passeAddXp=addXp;

function buy(){
 if(P.vip){say('Voc\u00ea j\u00e1 tem o Passe Premium');return}
 if(!cf){cf=1;render();clearTimeout(cfT);cfT=setTimeout(()=>{cf=0;if(root&&root.classList.contains('on'))render()},3500);return}
 clearTimeout(cfT);cf=0;
 let g=0;try{g=gems|0}catch(e){}
 if(g<PRECO){say('Gemas insuficientes: faltam '+F(PRECO-g));render();return}
 try{gems-=PRECO;try{svG()}catch(e){}$('gemv').textContent=F(gems)}catch(e){say('N\u00e3o foi poss\u00edvel comprar agora');render();return}
 P.vip=1;sv();sfx();say('Passe Premium desbloqueado!');render()}

function onClick(e){
 const el=e.target.closest('[data-a]');if(!el)return;const a=el.dataset.a;
 if(a==='x'){close();return}
 if(a==='tab'){T=el.dataset.t;render();return}
 if(a==='pp'){pg=Math.max(0,Math.min(MAXL/10-1,pg+(+el.dataset.d)));render();return}
 if(a==='buy'){buy();return}
 if(a==='c'){const t=el.dataset.t,l=+el.dataset.l,r=rw(t,l);
  if(can(t,l)){claim(t,l);render()}
  else if(M(t)[l])say('Recompensa j\u00e1 coletada');
  else if(r.k==='item')say('Item em breve!');
  else if(t==='v'&&!P.vip)say('Compre o Passe Premium para liberar a coluna ELITE');
  else say('Alcance o n\u00edvel '+l+' para coletar');
  return}
 if(a==='all'){let co=0,ge=0;for(const t of['f','v'])for(let l=1;l<=P.lv;l++){const r=claim(t,l,1);if(r){if(r.k==='gem')ge+=r.a;else co+=r.a}}
  if(!co&&!ge){say(P.vip?'Nada para coletar agora':'Nada para coletar. Compre o Passe Premium para liberar a coluna ELITE')}
  else{sfx();say('Coletado:'+(co?' +'+F(co)+' moedas':'')+(ge?' +'+F(ge)+' gemas':''))}
  render();return}
 if(a==='nav'){const n=el.dataset.n;if(n==='p')return;close();const b=$(n==='m'?'misb':'shopb');if(b)b.click();return}
}

/* ---------- liga o banner do menu ---------- */
{const b=$('elitepb');if(b){b.classList.remove('soon');
 /* banner = a imagem (estilos inline com !important vencem qualquer CSS do menu) */
 const S=(k,v)=>b.style.setProperty(k,v,'important');
 b.innerHTML='<img src="banner-passe-t1.webp?v=1" alt="Passe Elite - Sombras do Abismo" draggable="false" style="position:absolute;left:0;top:0;width:100%;height:100%;object-fit:fill;display:block;pointer-events:none;border-radius:inherit">';
 S('background','#0a0716');S('border','0');S('padding','0');S('overflow','hidden');S('font-size','0');S('opacity','1');S('box-shadow','0 0 14px #8a3cff88');
 const im=b.firstChild;
 if(im)im.onerror=()=>{b.innerHTML='<span style="display:block;font:900 22px Arial;color:#ffd25a;text-align:center;line-height:1.2;padding:14px">SOMBRAS DO ABISMO - TEMPORADA 1<br><small style="font-size:16px;color:#fff">TOQUE PARA ABRIR</small></span>';S('font-size','16px')}}}
addEventListener('keydown',e=>{if(e.key==='Escape')close()});
document.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('#elitepb');if(!b)return;e.stopImmediatePropagation();e.preventDefault();open()},true);

/* ---------- XP ao terminar partida ---------- */
function gx(){try{const g=G;if(!g||g._pxp||!g.p)return;g._pxp=1;const k=(g.p.kills|0),xp=50+k*10,up=addXp(xp);say('+'+xp+' XP do Passe'+(up?' \u2022 N\u00edvel '+P.lv+'!':''))}catch(e){}}
try{if(typeof finish==='function'){const f0=finish;finish=function(){const r=f0.apply(this,arguments);gx();return r}}}catch(e){}
try{if(typeof finish2==='function'){const f1=finish2;finish2=function(){const r=f1.apply(this,arguments);gx();return r}}}catch(e){}
})();
