/* js-36-loot-caixa.js - SISTEMA DE LOOT (v2: sincronizado online + IA dos bots)
   - Ao abater alguem (ou morrer) aparece uma caixinha pequena no chao com tudo que a pessoa tinha.
   - Ao chegar perto, aparece embaixo uma barra com SO o que existe por perto (caixa + itens soltos no chao).
     1 arma = 1 slot. 1 arma + 1 municao = 2 slots. Nada por perto = nada na tela.
   - Tocar no icone do item coleta ele. O botao PEGAR foi removido.
   - Seta verde no canto do slot = item melhor / util para voce.
   - ONLINE: quem controla o personagem que morreu cria a caixa (ele sabe o inventario real) e avisa todo mundo.
     Pegar item da caixa ou do chao tambem avisa todo mundo, entao a caixa e igual em todas as telas.
   - BOTS: procuram caixas (se tiver algo util para eles), vao ate la e pegam so o que querem.
     O resto fica na caixa para voce. */
(function(){
var RNG=64;            /* alcance para ver/pegar o loot */
var HIT=[],HT=0,LASTT=0;
var NM={b:'Bandagem',k:'Kit',v:'Colete',h:'Capacete'};

/* ---------- 0) ajudas de rede (so agem quando a partida online esta ativa) ---------- */
var CNT=0,TS={},TSN=0;
function MPx(){var m=window.MP;return(m&&m.on&&m.bus)?m:null}
function ev(m){var M=MPx();if(M){try{M.bus.send(m)}catch(e){}}}
function uid(p){var M=MPx();return p+(M?M.me:0)+'_'+(++CNT)}
function tomb(u){if(u==null)return;TS[u]=1;if(++TSN>800){TS={};TSN=0}}
function dsc(q){var o={u:q.u,t:q.t};if(q.id!=null)o.id=q.id;if(q.k!=null)o.k=q.k;if(q.n!=null)o.n=q.n;return o}
function bcRem(q,b){tomb(q.u);if(q.u==null)return;ev({t:'lbr',u:q.u,b:b?b.id:0,x:Math.round(b?b.x:q.x),y:Math.round(b?b.y:q.y),ty:q.t,i:q.id==null?-1:q.id})}
function spawn(q){if(!MPx())return;q.u=uid('d');ev({t:'lbi',u:q.u,x:Math.round(q.x),y:Math.round(q.y),o:dsc(q)})}
/* itens do mapa nascem iguais em todas as telas (mesma semente): marca cada um com um numero fixo */
function ensureTag(){var g=G;if(!g||g._lbt)return;g._lbt=1;
 if(MPx()){for(var i=0;i<g.items.length;i++)if(g.items[i].u==null)g.items[i].u='s'+i}}

/* ---------- 1) morte: os itens vao para uma caixa em vez de espalhar no chao ---------- */
var dI=dropI;
dropI=function(f,o){
 var b=G&&G._lbk;if(b&&b.f===f){b.it.push(o);return}
 var g=G,n=g?g.items.length:0,r=dI.apply(this,arguments);
 if(g&&f&&!f.mx&&g.items.length>n&&MPx())spawn(g.items[g.items.length-1]);
 return r};
var die0=die;
die=function(t,s){
 var g=G,b=null,M=MPx();
 if(g&&!g.cs&&t&&!t.dead){b={x:t.x,y:t.y,it:[],f:t};if(M&&t.mx)b.gh=1;g._lbk=b}   /* gh = fantasma: quem manda a caixa e o dono do personagem */
 try{return die0.apply(this,arguments)}
 finally{if(g)g._lbk=null;
  if(b){b.f=null;
   if(!b.gh&&b.it.length){
    b.id=uid('b');
    for(var i=0;i<b.it.length;i++)b.it[i].u=b.id+'_'+i;
    (g.lb||(g.lb=[])).push(b);
    if(M)ev({t:'lbn',b:b.id,x:Math.round(b.x),y:Math.round(b.y),it:b.it.map(dsc)})}}}
};

/* ---------- 2) o jogador nao pega mais nada sozinho (so moedas); bots continuam normais ---------- */
var pk0=pk;
pk=function(f){
 var g=G;
 if(f&&f.isP){
  var it=g.items;
  for(var i=it.length-1;i>=0;i--){var q=it[i];
   if(q.t!='c')continue;
   if(Math.abs(q.x-f.x)>f.r+20||Math.abs(q.y-f.y)>f.r+20)continue;
   f.mc=(f.mc|0)+q.n;it.splice(i,1);bcRem(q,null);try{pickS()}catch(e){}}
  return}
 if(f&&!f.mx&&MPx()){
  /* bot do dono da sala: o que ele pegar do chao some em todas as telas */
  var pre=[],its=g.items,j,qq;
  for(j=0;j<its.length;j++){qq=its[j];if(qq._cl)continue;if(Math.abs(qq.x-f.x)<=f.r+20&&Math.abs(qq.y-f.y)<=f.r+20)pre.push(qq)}
  var r=pk0.apply(this,arguments);
  for(j=0;j<pre.length;j++)if(its.indexOf(pre[j])<0)bcRem(pre[j],null);
  return r}
 return pk0.apply(this,arguments)};

/* ---------- 3) IA: bots vao ate a caixa e pegam so o que querem ---------- */
function wants(f,b){
 for(var i=0;i<b.it.length;i++){var q=b.it[i];
  if(q.t=='w'){if(f.ws[0]==null||f.ws[1]==null||WR[q.id]>Math.min(WR[f.ws[0]],WR[f.ws[1]]))return 1}
  else if(q.t=='a'){if((f.ws[0]!=null||f.ws[1]!=null)&&f.res&&f.res[q.k]<250)return 1}
  else if(q.t=='s'){if(q.k<3&&q.k>(f.sgk|0))return 1}
  else if(q.t=='v'){if(!(f.ar>0))return 1}
  else if(q.t=='h'){if(!(f.hm>0))return 1}
  else if(q.t=='k'){if(f.kt<3)return 1}
  else if(q.t=='b'){if(f.bd<5)return 1}
  else if(q.t=='c')return 1}
 return 0}
/* chamada pelo codigo da IA (js-04-jogo-4): devolve a caixa mais proxima que tenha algo util para o bot */
window.lbTarget=function(f){
 var g=G;if(!g||!g.lb||!g.lb.length||f.isP||f.mx||f.st!='ground')return null;
 var hasW=f.ws[0]!=null||f.ws[1]!=null,bd=hasW?520:1500,best=null,i,b,d,t;
 for(i=0;i<g.lb.length;i++){b=g.lb[i];
  if(!b.it.length)continue;
  if(Math.abs(b.x-f.x)>bd||Math.abs(b.y-f.y)>bd)continue;
  d=Math.hypot(b.x-f.x,b.y-f.y);if(d>=bd)continue;
  t=b.tgt||(b.tgt={x:b.x,y:b.y,lbx:b});
  if(f.bant>0&&t===f.ban)continue;
  try{if(f.lvU>g.t&&typeof inH==='function'&&inH(t,f.lvH))continue}catch(e){}
  if(!wants(f,b))continue;
  bd=d;best=t}
 return best};
/* o bot chegou na caixa: pega do jeito normal dele (troca de arma, municao, colete...) e o resto fica na caixa */
function lbLoot(f,b){
 var g=G,cl=[],i,q,c,k,j;
 for(i=0;i<b.it.length;i++){q=b.it[i];c=Object.assign({},q,{x:f.x,y:f.y,_cl:1,_src:q});cl.push(c);g.items.push(c)}
 try{pk(f)}
 finally{
  for(i=0;i<cl.length;i++){c=cl[i];k=g.items.indexOf(c);
   if(k>=0){g.items.splice(k,1)}                           /* nao quis: continua na caixa */
   else{j=b.it.indexOf(c._src);if(j>=0){b.it.splice(j,1);bcRem(c._src,b)}}}}
}
function lbBots(){
 var g=G;if(!g||!g.lb||!g.lb.length)return;
 for(var i=g.lb.length-1;i>=0;i--){var b=g.lb[i];
  if(!b.it.length)continue;
  for(var j=0;j<g.f.length;j++){var f=g.f[j];
   if(f.isP||f.mx||f.dead||f.dn>0||f.st!='ground')continue;
   if(Math.abs(f.x-b.x)<36&&Math.abs(f.y-b.y)<36&&wants(f,b)){lbLoot(f,b);if(!b.it.length)break}}}}

/* ---------- 3b) rede: receber caixa nova / item novo no chao / item removido ---------- */
var OKT={w:1,a:1,s:1,v:1,h:1,k:1,b:1,c:1};
function cleanIt(o){
 if(!o||typeof o!=='object'||!OKT[o.t])return null;
 var r={t:o.t,u:String(o.u==null?'':o.u).slice(0,40)};
 if(o.t=='w'){if(typeof o.id!=='number'||!WP[o.id])return null;r.id=o.id}
 if(o.k!=null)r.k=+o.k|0;
 if(o.n!=null)r.n=Math.max(0,Math.min(999,+o.n|0));
 if(o.t=='a'&&!(r.k>=0&&r.k<4))return null;
 if(o.t=='s'&&!(r.k>=0&&r.k<4))return null;
 return r}
function findBox(id){var g=G;if(!g||!g.lb)return null;for(var i=0;i<g.lb.length;i++)if(g.lb[i].id===id)return g.lb[i];return null}
function onLb(m){
 var g=G;if(!g||!MPx())return;ensureTag();
 var x=+m.x,y=+m.y,i,c,q;
 if(!isFinite(x)||!isFinite(y)||Math.abs(x)>1e6||Math.abs(y)>1e6)return;
 if(m.t=='lbn'){
  if(typeof m.b!=='string'||m.b.length>40||!Array.isArray(m.it)||findBox(m.b))return;
  var it=[];for(i=0;i<m.it.length&&i<12;i++){c=cleanIt(m.it[i]);if(c&&!TS[c.u])it.push(c)}
  if(it.length)(g.lb||(g.lb=[])).push({x:x,y:y,it:it,f:null,id:m.b})}
 else if(m.t=='lbi'){
  c=cleanIt(m.o);if(!c||TS[c.u])return;
  for(i=0;i<g.items.length;i++)if(g.items[i].u===c.u)return;
  c.x=x;c.y=y;g.items.push(c)}
 else if(m.t=='lbr'){
  tomb(m.u);
  if(m.b){var b=findBox(m.b);if(b)for(i=0;i<b.it.length;i++)if(b.it[i].u===m.u){b.it.splice(i,1);break}return}
  for(i=0;i<g.items.length;i++){q=g.items[i];
   if(q.u===m.u&&q.t===m.ty&&Math.hypot(q.x-x,q.y-y)<80){g.items.splice(i,1);break}}}}
/* liga o ouvinte de eventos de loot na conexao da sala (uma vez por conexao) */
function hook(){
 var M=window.MP,b=M&&M.bus;if(!b||!b.cb||b.cb.__lb)return;b.cb.__lb=1;
 var e0=b.cb.ev;
 b.cb.ev=function(from,m){
  if(m&&typeof m==='object'&&(m.t==='lbn'||m.t==='lbi'||m.t==='lbr')){try{onLb(m)}catch(e){}return}
  return e0.apply(this,arguments)}}
var u0=upd;
upd=function(dt){
 try{hook();ensureTag()}catch(e){}
 var r=u0.apply(this,arguments);try{lbBots()}catch(e){}return r};

/* ---------- 4) caixinha 3D (sprite pequeno) ---------- */
var BM=null;
function boxMat(){
 if(BM)return BM;
 var c=document.createElement('canvas');c.width=c.height=64;var x=c.getContext('2d');
 x.translate(32,34);x.lineJoin='round';x.lineWidth=4;x.strokeStyle='#1a0f05';
 x.fillStyle='#a8692a';x.beginPath();x.roundRect(-24,-14,48,34,4);x.fill();x.stroke();
 x.fillStyle='#c98a45';x.beginPath();x.roundRect(-24,-22,48,12,4);x.fill();x.stroke();
 x.strokeStyle='#5a3512';x.lineWidth=3;x.beginPath();x.moveTo(-24,4);x.lineTo(24,4);x.stroke();
 x.strokeStyle='#1a0f05';x.lineWidth=3;x.fillStyle='#ffd23b';x.fillRect(-5,-12,10,12);x.strokeRect(-5,-12,10,12);
 BM=new THREE.SpriteMaterial({map:new THREE.CanvasTexture(c)});return BM}
function lbSync(){
 var g=G;if(!g||!g.lb||typeof gw==='undefined'||!gw)return;
 for(var i=g.lb.length-1;i>=0;i--){var b=g.lb[i];
  if(!b.it.length){if(b.sp&&b.sg)b.sg.remove(b.sp);g.lb.splice(i,1);continue}
  if(!b.sp||b.sg!==gw){b.sp=new THREE.Sprite(boxMat());b.sp.scale.set(15,15,1);gw.add(b.sp);b.sg=gw}
  b.sp.position.set(b.x,9+Math.sin(g.t*2+b.x)*1.2,b.y)}}
var d3=draw3d;
draw3d=function(){var r=d3.apply(this,arguments);try{lbSync()}catch(e){}return r};

/* ---------- 5) o que existe por perto ---------- */
var TO={w:0,a:1,s:2,v:3,h:3,k:4,b:4,c:5};
function nearby(p){
 var L=[],g=G,i,q,d;
 for(i=0;i<g.items.length;i++){q=g.items[i];
  if(Math.abs(q.x-p.x)>RNG||Math.abs(q.y-p.y)>RNG)continue;
  d=Math.hypot(q.x-p.x,q.y-p.y);if(d>RNG)continue;
  L.push({q:q,b:null,d:d})}
 if(g.lb)for(i=0;i<g.lb.length;i++){var b=g.lb[i];
  if(Math.abs(b.x-p.x)>RNG||Math.abs(b.y-p.y)>RNG)continue;
  d=Math.hypot(b.x-p.x,b.y-p.y);if(d>RNG)continue;
  for(var k=0;k<b.it.length;k++)L.push({q:b.it[k],b:b,d:d})}
 L.sort(function(a,c){return (TO[a.q.t]-TO[c.q.t])||(a.d-c.d)});
 return L.slice(0,7)}
function better(p,q){
 if(q.t=='w'){var o0=p.ws[0],o1=p.ws[1];return o0==null||o1==null||WR[q.id]>Math.min(WR[o0],WR[o1])}
 if(q.t=='s')return q.k<3&&q.k>(p.sgk|0);
 if(q.t=='v')return p.ar<50;
 if(q.t=='h')return !(p.hm>=30);
 return false}

/* ---------- 6) barra de loot (substitui a antiga) ---------- */
pkBar=function(g,p){
 HIT=[];
 if(g)g.pk=null;                       /* sem botao PEGAR */
 if(!g||g.room||!p||p.dead||p.st!='ground'||p.dn>0||!g.items)return;
 var L=nearby(p),n=L.length;if(!n)return;
 var gp=8*U,sz=Math.min(46*U,(W*.92-(n-1)*gp)/n),y=H-10*U-sz/2,x0=W/2-(n*sz+(n-1)*gp)/2+sz/2;
 HT=performance.now();
 for(var i=0;i<n;i++){
  var e=L[i],q=e.q,x=x0+i*(sz+gp),lb='',up=better(p,q);
  X.save();X.translate(x,y);
  X.fillStyle='#000';X.strokeStyle='#8a8f98';X.lineWidth=2;X.beginPath();X.roundRect(-sz/2,-sz/2,sz,sz,5*U);X.fill();X.stroke();
  X.save();X.translate(0,-4*U);
  if(q.t=='w'){drawW(X,q.id,sz*.62);lb=WP[q.id].n}
  else if(q.t=='a'){icon(X,'a',0,0,sz*.2,AKC[q.k]);lb='+'+q.n}
  else if(q.t=='s'){var C=['#ff6b6b','#ff944d','#c07bff','#ffb43b'][q.k];X.strokeStyle=C;X.lineWidth=2.5;X.beginPath();X.arc(0,0,sz*.2,0,7);X.moveTo(-sz*.34,0);X.lineTo(-sz*.1,0);X.moveTo(sz*.1,0);X.lineTo(sz*.34,0);X.moveTo(0,-sz*.34);X.lineTo(0,-sz*.1);X.moveTo(0,sz*.1);X.lineTo(0,sz*.34);X.stroke();lb=['Ponto','2x','4x','Luneta'][q.k]}
  else if(q.t=='c'){X.fillStyle='#b86e00';X.beginPath();X.arc(0,0,sz*.26,0,7);X.fill();X.fillStyle='#ffc400';X.beginPath();X.arc(0,0,sz*.21,0,7);X.fill();lb='+'+q.n}
  else{icon(X,q.t,0,0,sz*.24,0);lb=NM[q.t]||''}
  X.restore();
  if(lb)Tx(lb,0,sz/2-7*U,7*U,'#fff');
  if(up){var r=6*U,ax=sz/2-9*U,ay=-sz/2+10*U;X.fillStyle='#2ee86b';X.strokeStyle='#000';X.lineWidth=1.5;X.beginPath();X.moveTo(ax,ay-r);X.lineTo(ax+r,ay+r*.3);X.lineTo(ax+r*.4,ay+r*.3);X.lineTo(ax+r*.4,ay+r);X.lineTo(ax-r*.4,ay+r);X.lineTo(ax-r*.4,ay+r*.3);X.lineTo(ax-r,ay+r*.3);X.closePath();X.fill();X.stroke()}
  X.restore();
  HIT.push({x:x,y:y,s:sz/2+3*U,e:e})}
};

/* ---------- 7) tocar no icone coleta ---------- */
function take(e){
 var g=G,p=g&&g.p;if(!g||!p||p.dead||p.st!='ground'||p.dn>0)return;
 var q=e.q,ok=0,i;
 if(e.b?e.b.it.indexOf(q)<0:g.items.indexOf(q)<0)return;      /* ja foi pego */
 if(q.t=='w'){
  i=p.ws[0]==null?0:p.ws[1]==null?1:-1;
  if(i>=0){p.ws[i]=q.id;p.mg[i]=WP[q.id].mag;p.cur=i;p.rl=0;ok=1}
  else{var o=p.ws[p.cur];
   if(o!=null){var dp={x:p.x+Math.cos(p.ang+3)*36,y:p.y+Math.sin(p.ang+3)*36,t:'w',id:o};g.items.push(dp);spawn(dp)}
   p.ws[p.cur]=q.id;p.mg[p.cur]=WP[q.id].mag;p.rl=0;ok=1}}
 else if(q.t=='a'){p.res[q.k]=Math.min(300,p.res[q.k]+q.n);ok=1}
 else if(q.t=='b'){if(p.bd<5){p.bd++;ok=1}}
 else if(q.t=='k'){if(p.kt<3){p.kt++;ok=1}}
 else if(q.t=='v'){if(p.ar<50){p.ar=50;ok=1}}
 else if(q.t=='h'){if(!(p.hm>=30)){p.hm=30;ok=1}}
 else if(q.t=='c'){p.mc=(p.mc|0)+q.n;ok=1}
 else if(q.t=='s'){if(q.k<3&&q.k!=(p.sgk|0)){p.sgk=q.k;ok=1;try{soon('Mira '+['Ponto vermelho','2x','4x','Luneta'][q.k]+' equipada')}catch(_){}}}
 if(!ok){try{soon(q.t=='s'?'Voce ja tem essa mira':'Ja esta cheio')}catch(_){}return}
 if(e.b){e.b.it.splice(e.b.it.indexOf(q),1);bcRem(q,e.b)}
 else{g.items.splice(g.items.indexOf(q),1);bcRem(q,null)}
 try{pickS()}catch(_){}
}
function pt(ev){
 var t=(ev.changedTouches&&ev.changedTouches[0])||ev,r=C.getBoundingClientRect();
 return[(t.clientX-r.left)*W/r.width,(t.clientY-r.top)*H/r.height]}
function onTap(ev){
 try{
  if(!HIT.length||performance.now()-HT>200)return;
  var xy=pt(ev),x=xy[0],y=xy[1];
  for(var i=0;i<HIT.length;i++){var h=HIT[i];
   if(Math.abs(x-h.x)<=h.s&&Math.abs(y-h.y)<=h.s){
    ev.stopImmediatePropagation();if(ev.cancelable)ev.preventDefault();
    var now=Date.now();if(now-LASTT>350){LASTT=now;take(h.e)}
    return}}
 }catch(e){}}
addEventListener('pointerdown',onTap,{capture:true,passive:false});
addEventListener('touchstart',onTap,{capture:true,passive:false});
addEventListener('mousedown',onTap,true);
})();
