/* js-46-graficos.js - graficos melhores (v1)

   O QUE FAZ (nao mexe na logica do jogo, so no visual):
   1) Qualidade de graficos ALTA por padrao para quem nunca escolheu nos ajustes
      (resolucao maior, mais distancia de visao, mais particulas, texturas mais nitidas).
      O ajuste automatico de FPS do jogo continua ligado e baixa a resolucao sozinho se o celular nao aguentar.
      Quem ja escolheu uma qualidade nos ajustes continua com a escolha dele.
   2) Cores mais vivas (contraste e saturacao levemente maiores) no 3D, exceto na qualidade BAIXA.
   3) Vinheta suave nas bordas da tela durante a partida, para dar foco no centro.

   Para desligar: abra o jogo com ?graficos=0 */
(function(){
'use strict';
try{if(new URLSearchParams(location.search).get('graficos')==='0')return}catch(e){}
if(typeof qCalc!=='function'||typeof rs!=='function'||typeof QG==='undefined')return;

/* 1) qualidade ALTA como padrao (so se a pessoa nunca escolheu) */
try{
 if(localStorage.getItem('arr_gq')===null&&QG<2){
  QG=2;qCalc();rs();
  try{if(typeof cam3!=='undefined'&&cam3){cam3.far=QFAR;cam3.updateProjectionMatrix()}}catch(e){}
 }
}catch(e){}

/* 2) e 3) cores vivas + vinheta */
const vg=document.createElement('div');
vg.id='gfxvg';
vg.style.cssText='position:fixed;left:0;top:0;right:0;bottom:0;pointer-events:none;display:none;background:radial-gradient(ellipse at 50% 45%,rgba(0,0,0,0) 58%,rgba(8,12,24,.3) 100%)';
function place(){
 try{
  const c3=typeof ren!=='undefined'&&ren&&ren.domElement,play=typeof mode!=='undefined'&&mode=='play';
  if(c3){
   const f=QG>=1?'contrast(1.07) saturate(1.16)':'';
   if(c3.style.filter!==f)c3.style.filter=f;
   /* a vinheta fica logo depois do canvas 3D e antes do canvas da interface */
   if(vg.parentNode!==document.body||vg.previousElementSibling!==c3)document.body.insertBefore(vg,C)
  }
  const d=play&&QG>=1?'block':'none';
  if(vg.style.display!==d)vg.style.display=d
 }catch(e){}
}
setInterval(place,700);
place();
})();
