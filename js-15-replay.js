
/* ===== SISTEMA DE REPLAY: grava a partida (3D + nomes/marcas) em video e reproduz na tela de resultado ===== */
(function(){
var RP={st:'idle',g:null,rec:null,stm:null,cv:null,cx:null,ch:[],by:0,t0:0,last:0,dur:0,url:'',mime:'',poster:'',
ok:false};
var MAXS=600,MAXB=130e6;
function pick(){var L=['video/webm;codecs=vp8','video/webm;codecs=vp9','video/webm','video/mp4;codecs=avc1','video/mp4'];for(var i=0;i<L.length;i++){try{if(MediaRecorder.isTypeSupported(L[i]))return L[i]}catch(e){}}return ''}
function fmt(s){s=Math.max(0,Math.round(s));return String(s/60|0).padStart(2,'0')+':'+String(s%60).padStart(2,'0')}
function cards(){return document.querySelectorAll('.rpc')}
function ui(){
 var ready=RP.st=='done'&&RP.url&&RP.dur>=3,wait=RP.st=='rec'||RP.st=='fin';
 cards().forEach(function(c){
  var b=c.querySelector('b'),s=c.querySelector('small');
  c.classList.toggle('off',!ready&&!wait);c.classList.toggle('wait',RP.st=='fin');
  c.style.backgroundImage=RP.poster&&(ready||RP.st=='fin')?'url('+RP.poster+')':'';
  if(ready){b.textContent='ASSISTIR REPLAY';s.textContent=fmt(RP.dur)}
  else if(RP.st=='fin'){b.textContent='SALVANDO REPLAY';s.textContent=''}
  else if(RP.st=='rec'){b.textContent='GRAVANDO';s.textContent=''}
  else{b.textContent='REPLAY INDISPONÍVEL';s.textContent=!RP.ok?'SEM SUPORTE':(RP.st=='done'?'MUITO CURTA':'')}
 })
}
function clean(){
 try{if(RP.stm)RP.stm.getTracks().forEach(function(t){t.stop()})}catch(e){}
 RP.stm=null;RP.rec=null;RP.cv=null;RP.cx=null
}
function drop(){
 var r=RP.rec;if(r){r.ondataavailable=null;r.onstop=null;try{if(r.state!='inactive')r.stop()}catch(e){}}
 clean();if(RP.url){try{URL.revokeObjectURL(RP.url)}catch(e){}}
 RP.st='idle';RP.g=null;RP.ch=[];RP.by=0;RP.url='';RP.poster='';RP.dur=0;
 closeV(true);ui()
}
function start(g){
 drop();if(!RP.ok||!C||!C.width||!C.height)return;
 try{
  var w=Math.min(720,C.width),h=Math.max(2,Math.round(w*C.height/C.width/2)*2);w=Math.round(w/2)*2;
  RP.cv=document.createElement('canvas');RP.cv.width=w;RP.cv.height=h;RP.cx=RP.cv.getContext('2d');
  RP.cx.fillStyle='#000';RP.cx.fillRect(0,0,w,h);
  RP.stm=RP.cv.captureStream(30);
  var m=pick(),o={videoBitsPerSecond:1600000};if(m)o.mimeType=m;
  RP.mime=m||'video/webm';
  var r=new MediaRecorder(RP.stm,o);
  r.ondataavailable=function(e){if(e.data&&e.data.size){RP.ch.push(e.data);RP.by+=e.data.size;if(RP.by>MAXB&&RP.st=='rec')stop()}};
  r.onstop=function(){
   if(RP.rec!==r)return;
   var t=RP.mime.split(';')[0];
   try{RP.url=URL.createObjectURL(new Blob(RP.ch,{type:t}))}catch(e){RP.url=''}
   RP.ch=[];clean();RP.st='done';ui()
  };
  RP.g=g;RP.rec=r;RP.t0=performance.now();RP.last=0;RP.st='rec';
  r.start(1000);ui()
 }catch(e){console.warn('replay:',e);drop();RP.ok=false;ui()}
}
function stop(){
 if(RP.st!='rec')return;
 RP.st='fin';RP.dur=(performance.now()-RP.t0)/1000;
 try{RP.poster=RP.cv.toDataURL('image/jpeg',.72)}catch(e){RP.poster=''}
 try{RP.rec.stop()}catch(e){RP.st='done';RP.url='';clean()}
 ui()
}
function shown(){return !$('end').classList.contains('hide')||!$('vsb').classList.contains('hide')}
window.rpCap=function(){
 try{
  if(!RP.ok)return;
  var g=G;
  if(g&&mode=='play'&&g!==RP.g&&!g.done&&!shown()){start(g);return}
  if(RP.st!='rec')return;
  if(!g||g!==RP.g||mode=='menu'){drop();return}
  var now=performance.now();
  if(now-RP.last>=32){
   RP.last=now;
   var w=RP.cv.width,h=RP.cv.height,x=RP.cx;
   x.fillStyle='#000';x.fillRect(0,0,w,h);
   try{if(ren&&ren.domElement)x.drawImage(ren.domElement,0,0,w,h)}catch(e){}
   x.drawImage(C,0,0,w,h)
  }
  if(shown()||(now-RP.t0)/1000>MAXS)stop()
 }catch(e){console.warn('replay:',e)}
};
/* viewer */
var V=document.getElementById('rpv'),vid=document.getElementById('rpVid');
function openV(){
 if(!(RP.st=='done'&&RP.url&&RP.dur>=3))return;
 V.classList.remove('hide');vid.playbackRate=1;
 V.querySelectorAll('[data-s]').forEach(function(b){b.classList.toggle('on',b.dataset.s=='1')});
 vid.onloadedmetadata=function(){
  vid.onloadedmetadata=null;
  if(vid.duration===Infinity||isNaN(vid.duration)){
   vid.currentTime=1e7;
   vid.addEventListener('timeupdate',function f(){vid.removeEventListener('timeupdate',f);vid.currentTime=0;var p=vid.play();if(p&&p.catch)p.catch(function(){})})
  }else{var p=vid.play();if(p&&p.catch)p.catch(function(){})}
 };
 vid.src=RP.url;vid.load()
}
function closeV(q){
 try{vid.pause();vid.onloadedmetadata=null;if(vid.getAttribute('src')){vid.removeAttribute('src');vid.load()}}catch(e){}
 V.classList.add('hide')
}
document.addEventListener('click',function(e){var c=e.target.closest&&e.target.closest('.rpc');if(c)openV()});
document.getElementById('rpX').onclick=function(){closeV()};
V.addEventListener('click',function(e){if(e.target===V)closeV()});
V.querySelectorAll('[data-s]').forEach(function(b){b.onclick=function(){vid.playbackRate=+b.dataset.s;V.querySelectorAll('[data-s]').forEach(function(o){o.classList.toggle('on',o===b)})}});
document.getElementById('rpDl').onclick=function(){
 if(!RP.url)return;var a=document.createElement('a');a.href=RP.url;a.download='replay-armada-royale.'+(/mp4/.test(RP.mime)?'mp4':'webm');document.body.appendChild(a);a.click();a.remove()
};
['touchstart','touchmove','mousedown','pointerdown','keydown','keyup'].forEach(function(t){V.addEventListener(t,function(e){e.stopPropagation()},{passive:true})});
addEventListener('keydown',function(e){if(e.key=='Escape'&&!V.classList.contains('hide'))closeV()});
/* formata o resultado em cards e define a cor (vitoria / derrota) */
function fmtRes(box,tEl,eEl,gEl){
 var t=(tEl.textContent||'').trim(),e=(eEl.textContent||'').trim(),sig=t+'|'+e;
 if(box._sig!==sig){
  box._sig=sig;
  var u=t.toUpperCase(),win=/VIT[OÓ]RIA|CAMPE[AÃ]O|BOOYAH/.test(u),lose=/DERROTA|LUGAR/.test(u);
  box.classList.toggle('w',win);box.classList.toggle('l',!win&&lose);
  gEl.textContent='';
  e.split(/\s{3,}/).map(function(s){return s.trim()}).filter(Boolean).forEach(function(p){
   var i=p.indexOf(':'),c=document.createElement('div'),v=document.createElement('b');c.className='rsc';
   if(i>0&&i<30){var l=document.createElement('small');l.textContent=p.slice(0,i);v.textContent=p.slice(i+1).trim();c.appendChild(l)}
   else{c.classList.add('n');v.textContent=p}
   c.appendChild(v);gEl.appendChild(c)
  })
 }
 ui()
}
var E=$('end'),B=$('vsb');
new MutationObserver(function(){if(!E.classList.contains('hide'))fmtRes(E,$('place'),$('est'),$('rsG'))}).observe(E,{attributes:true,attributeFilter:['class']});
new MutationObserver(function(){if(!B.classList.contains('hide'))fmtRes(B,$('vsbT'),$('vsbE'),$('rsG2'))}).observe(B,{attributes:true,attributeFilter:['class']});
ui()
})();
