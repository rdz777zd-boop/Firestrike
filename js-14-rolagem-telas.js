
/* Rolagem em tela cheia: Inventário (#arm), Loja (#shop) e Personagens (#chr).
   Deslizar em qualquer ponto do painel rola a lista principal (com inércia). */
(function(){
var SEL='.ivl,.smg,.cxg,.cxd,.ivd,.ivs';
function vis(e){return e.clientHeight>0&&e.offsetParent!==null}
function can(e){if(!e||!vis(e)||e.scrollHeight<=e.clientHeight+1)return false;var o=getComputedStyle(e).overflowY;return o=='auto'||o=='scroll'}
function ancestor(t,root){for(var e=t;e&&e!==root.parentNode;e=e.parentNode)if(e.nodeType==1&&can(e))return e;return null}
function primary(root){var best=null,ba=0,l=root.querySelectorAll(SEL);for(var i=0;i<l.length;i++){var e=l[i];if(!can(e))continue;var a=e.clientWidth*e.clientHeight;if(a>ba){ba=a;best=e}}return best}
function setup(root){
 var st=null,raf=0;
 function stop(){if(raf){cancelAnimationFrame(raf);raf=0}}
 root.addEventListener('touchstart',function(ev){
  stop();if(ev.touches.length!=1){st=null;return}
  var t=ev.touches[0],own=ancestor(ev.target,root);
  /* se o toque cai dentro de uma área que já rola sozinha, o navegador cuida; senão rolamos a lista principal */
  var tg=primary(root);
  st={x:t.clientX,y:t.clientY,ly:t.clientY,lt:ev.timeStamp,v:0,lock:0,tg:tg,own:own,man:!own||own===root.firstElementChild};
 },{passive:true,capture:true});
 root.addEventListener('touchmove',function(ev){
  if(!st||!st.tg||!st.man)return;
  var t=ev.touches[0],dx=t.clientX-st.x,dy=t.clientY-st.y;
  if(!st.lock){if(Math.abs(dx)<6&&Math.abs(dy)<6)return;st.lock=Math.abs(dy)>=Math.abs(dx)?1:2}
  if(st.lock!=1)return;
  var d=st.ly-t.clientY,dt=Math.max(1,ev.timeStamp-st.lt);
  st.tg.scrollTop+=d;st.v=d/dt*16;st.ly=t.clientY;st.lt=ev.timeStamp;
  if(ev.cancelable)ev.preventDefault();
 },{passive:false,capture:true});
 function end(){
  if(!st||!st.tg||!st.man||st.lock!=1){st=null;return}
  var tg=st.tg,v=st.v;st=null;
  (function f(){if(Math.abs(v)<.5)return;tg.scrollTop+=v;v*=.95;raf=requestAnimationFrame(f)})();
 }
 root.addEventListener('touchend',end,{passive:true,capture:true});
 root.addEventListener('touchcancel',end,{passive:true,capture:true});
 root.addEventListener('wheel',function(ev){
  var own=ancestor(ev.target,root);if(own&&own!==root.firstElementChild)return;
  var tg=primary(root);if(!tg)return;tg.scrollTop+=ev.deltaY;ev.preventDefault();
 },{passive:false});
}
['arm','shop','chr'].forEach(function(id){var r=document.getElementById(id);if(r)setup(r)});
})();
