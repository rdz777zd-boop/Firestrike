/* js-37-menu-posicoes.js - tira o botao CHAT de dentro do painel SQUAD e coloca na coluna da esquerda do menu (css-22) */
(function(){let n=0;const iv=setInterval(()=>{
 const b=document.getElementById('gchb'),s=document.getElementById('stage');
 if(b&&s){if(b.parentNode!==s)s.appendChild(b);clearInterval(iv)}
 else if(++n>150)clearInterval(iv)},300)})();
