
(function(){const el=document.getElementById('ldr'),bar=el.querySelector('.ldbar i'),pc=el.querySelector('.ldpc'),st=el.querySelector('.ldst'),tp=el.querySelector('.ldt span'),md=el.querySelector('.ldm'),sb=el.querySelector('.lds');
const TIPS=['Domine o recuo para dar capa.','Fique dentro da zona segura: fora dela voc\u00ea perde vida.','Abra o paraquedas perto do ch\u00e3o e escolha bem onde cair.','Pegue colete e capacete antes de entrar em combate.','Reanime seu aliado ca\u00eddo em at\u00e9 10 segundos.','Use bandagem e kit m\u00e9dico quando estiver em seguran\u00e7a.','Cada personagem tem uma habilidade especial. Use a tecla C.','Influenciadores t\u00eam a ins\u00edgnia dourada ao lado do nome. O Infinity \u00e9 um deles.','O Storm derruba raios do c\u00e9u em at\u00e9 3 inimigos de uma vez.','Armas de longo alcance dominam espa\u00e7os abertos.','Pontos de salva\u00e7\u00e3o podem reviver o time inteiro.','Vencer partidas sobe o seu cl\u00e3 no ranking.'];
let v=0,raf=0,hT=0,tI=0,closing=0;
function put(p,t){v=Math.max(0,Math.min(1,p));bar.style.transform='scaleX('+v+')';pc.textContent=Math.round(v*100)+'%';if(t)st.textContent=t}
function set(p,t){cancelAnimationFrame(raf);put(p,t)}
function go(to,ms,done){cancelAnimationFrame(raf);const a=v,t0=performance.now();const f=t=>{const k=Math.min(1,(t-t0)/ms),e=1-Math.pow(1-k,2.2);put(a+(to-a)*e);if(k<1)raf=requestAnimationFrame(f);else if(done)done()};raf=requestAnimationFrame(f)}
function tip(){tp.textContent=TIPS[Math.random()*TIPS.length|0];tp.classList.remove('f');void tp.offsetWidth;tp.classList.add('f')}
function open(m,s){clearTimeout(hT);clearInterval(tI);closing=0;el.classList.remove('out','hid');md.textContent=m;sb.textContent=s;tip();tI=setInterval(tip,3200);set(0)}
/* A tela so some quando a barra chega em 100%: se for chamada antes, completa a barra e so entao fecha */
function close(){if(closing)return;closing=1;const fin=()=>{put(1);clearInterval(tI);el.classList.add('out');hT=setTimeout(()=>{el.classList.add('hid');closing=0},500)};if(v>=1)fin();else go(1,500,fin)}
window.LD={set,go,open,close,busy:0,st:t=>{st.textContent=t}};
open('BEM-VINDO','Preparando o jogo...');set(0,'Carregando recursos');
const t0=performance.now();let ready=0;addEventListener('load',()=>{ready=1});go(.88,2600);
const M=[[.25,'Carregando recursos'],[.5,'Montando personagens'],[.75,'Preparando os mapas']];
const iv=setInterval(()=>{const n=performance.now()-t0,m=M.filter(x=>v>=x[0]).pop();if(m)st.textContent=m[1];if((ready&&n>1900)||n>7000){clearInterval(iv);go(1,350,()=>{st.textContent='Pronto!';setTimeout(close,200)})}},120);
})();
