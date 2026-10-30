/* js-47-alcance.js - fuzis, snipers e armas de longo alcance atiram MUITO mais longe (v1)

   O QUE FAZ:
   - Armas tipo FUZIL (ak 2: Rifle, AK-47, M4A1, SCAR, Famas, LMG, Minigun e as versoes Ouro) ganham alcance x1.8
     e bala um pouco mais rapida (x1.2).
   - Armas tipo SNIPER (ak 3: Sniper, DMR, AWM, Barrett, Besta e as versoes Ouro) ganham alcance x2.2.
   - NAO muda: punho, pistolas, submetralhadoras, escopetas, granadas e bazuca.
   - O alcance e o mesmo numero que o jogo usa para a vida da bala, para os bots, para a validacao de
     acerto no online e para a barra ALCANCE da loja/inventario, entao tudo fica coerente.
   - O som dos fuzis continua o de fuzil (sem isso eles passariam a soar como sniper).

   Para desligar: abra o jogo com ?alcance=0 */
(function(){
'use strict';
try{if(new URLSearchParams(location.search).get('alcance')==='0')return}catch(e){}
if(typeof WP==='undefined')return;

const MR={2:1.8,3:2.2};
for(const w of WP){
 if(!w||w.ex||w.al2)continue;
 const m=MR[w.ak];if(!m)continue;
 w.rg0=w.rg;
 w.rg=Math.round(w.rg*m);
 if(w.ak==2)w.sp=Math.round(w.sp*1.2);
 w.al2=1;
}

/* som: usa o alcance antigo so para escolher o tipo de som (senao fuzil soaria como sniper) */
if(typeof gunS==='function'){
 const g0=gunS;
 gunS=function(f,wi,w){
  if(w&&w.rg0&&w.rg0!==w.rg)w=w.sn||(w.sn=Object.assign({},w,{rg:w.rg0}));
  return g0.call(this,f,wi,w)
 }
}
})();
