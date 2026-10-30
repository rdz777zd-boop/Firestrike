/* js-32-menu-modos.js - deixa o menu de MODOS mais detalhado
   Acrescenta etiquetas em cada card e um quadro de numeros no painel de detalhes.
   Nao altera a logica dos modos. Para desligar: abra o jogo com ?menuvelho=1 */
(function(){
'use strict';
try{if(new URLSearchParams(location.search).get('menuvelho')==='1')return}catch(e){}
const $=id=>document.getElementById(id);
const DATA={
 'MODO APOSTADO':{cat:'APOSTA \u2022 CONTRA SQUAD',chips:['IGUAL \u00c0 SALA','VALE GEMAS','1x1 A 5x5'],
  st:[['FORMATO','Igual \u00e0 Sala'],['APOSTA','a partir de 10 gemas'],['MELHOR DE','1, 3 ou 5 rounds'],['PR\u00caMIO','Leva a aposta do outro']]},
 'BR RANQUEADO':{cat:'RANQUEADO',chips:['40 JOGADORES','SOLO • DUO • SQUAD','VALE RP'],
  st:[['JOGADORES','40'],['FORMATO','Solo / Duo / Squad'],['MAPA','Vila Assombrada'],['TOP 1','+60 RP']]},
 'CONTRA SQUAD':{cat:'TÁTICO 4x4',chips:['8 JOGADORES','4 ROUNDS','COMPRAS'],
  st:[['JOGADORES','8 (4x4)'],['VITÓRIA','4 rounds'],['ROUND','até 2:30'],['COMPRA','15s parados']]},
 'GUERRA DE CLÃS':{cat:'ESPECTADOR',chips:['CLÃS','CÂMERA LIVRE','+1 VITÓRIA E XP'],
  st:[['MODO','Espectador'],['CÂMERA','Livre ou seguir'],['TROCAR','Tecla TAB'],['PRÊMIO','+1 vitória e XP']]},
 'HALLOWEEN CITY':{cat:'EVENTO • PvE',chips:['TIME DE 4','ONDAS DE ZUMBIS','EVENTO'],
  st:[['TIME','4 jogadores'],['TIPO','Sobrevivência PvE'],['CHEFE','Gigante a cada 5 ondas'],['LOJA','Gaste os doces']]},
 'SALA APOSTADA':{cat:'SALA \u2022 APOSTA',chips:['1x1 A 5x5','JOGUE OU ASSISTA','VALE GEMAS'],
  st:[['TAMANHO','1x1 a 5x5'],['APOSTA','a partir de 10 gemas'],['MELHOR DE','1, 3 ou 5 rounds'],['PR\u00caMIO','O dobro da aposta']]},
 'SALA':{cat:'TREINO • SALA',chips:['1x1 A 5x5','JOGUE OU ASSISTA','NADA CONTA'],
  st:[['TAMANHO','1x1 a 5x5'],['EQUIPES','2 equipes de bots'],['ARMAS','5 armas'],['RANK','Nada conta']]},
 'MODO APOSTADO_OLD':{cat:'APOSTA • 1x1',chips:['1x1','VALE GEMAS','ALEATÓRIO OU FORMADO'],
  st:[['FORMATO','Duelo 1x1'],['APOSTA','a partir de 10 gemas'],['MELHOR DE','1, 3 ou 5 rounds'],['PRÊMIO','Leva a aposta do outro']]}
};
function dress(){try{
 const p=$('modp'),g=$('modg'),mdc=$('mdc');if(!p||!g)return;
 p.classList.add('mv2');
 let sel='';
 g.querySelectorAll('.mdk').forEach(d=>{
  const mn=d.querySelector('.mn'),k=mn&&mn.childNodes[0]?mn.childNodes[0].textContent.trim():'',x=DATA[k];
  if(d.classList.contains('on'))sel=k;
  const t=d.querySelector('.mt2');if(!x||!t||d.querySelector('.mv2c'))return;
  const c=document.createElement('div');c.className='mv2c';
  c.innerHTML=x.chips.map(s=>'<i>'+s+'</i>').join('');t.appendChild(c)});
 const x=DATA[sel];if(!x||!mdc)return;
 const pv=mdc.querySelector('.pv');
 if(pv&&!pv.querySelector('.mv2tt')){const o=document.createElement('div');o.className='mv2tt';o.innerHTML='<b>'+sel+'</b><span>'+x.cat+'</span>';pv.appendChild(o)}
 const tgl=mdc.querySelector('.tgl');
 if(tgl&&!mdc.querySelector('.mv2s')){const s=document.createElement('div');s.className='mv2s';
  s.innerHTML=x.st.map(a=>'<div><small>'+a[0]+'</small><b>'+a[1]+'</b></div>').join('');tgl.insertAdjacentElement('afterend',s)}
}catch(e){console.warn('[menu-modos]',e)}}
if(typeof qmR==='function'){const q0=qmR;qmR=function(){const r=q0.apply(this,arguments);dress();return r}}
dress();
})();
