/* js-48-queda-loot.js - ITENS BRILHANTES NO CHAO + QUEDA COM MERGULHO + PARAQUEDAS NOVO (v1)

   O QUE FAZ:
   1) LOOT (visual): cada item no chao ganha halo de luz, anel pulsando e tamanho conforme a raridade
      (comum branco, incomum verde, raro azul, epico roxo, lendario dourado). Armas epicas/lendarias/douradas
      soltam uma coluna de luz. As caixas dos abatidos tambem brilham. NAO muda como se pega nem a rede.
   2) QUEDA: o jogador escolhe entre PLANAR (cai normal, vai longe) e MERGULHAR (empurrar o direcional ao maximo
      no celular, ou segurar Shift/Espaco no teclado): cai ate 1.75x mais rapido e voa mais rapido para os lados.
      O mergulho para sozinho perto da altura do paraquedas. Com o paraquedas aberto a velocidade lateral e menor.
      Quem pula herda o impulso do aviao. So afeta o jogador local (bots e rede continuam iguais).
   3) VISUAL: pose de queda livre (bracos abertos / mergulho), paraquedas so aparece depois de aberto, com animacao
      de abertura (saco, enche de ar, balanca), copa maior, solavanco na tela, FOV maior no mergulho, linhas de vento
      mais longas e painel de altura no topo da tela.

   Para desligar a queda: abra o jogo com ?queda=0
   Carrega por ultimo (depois do js-47). Todo codigo e protegido por try/catch para nunca travar o jogo. */
(function(){
if(window.__q48)return;window.__q48=1;
var OFF=0;try{OFF=new URLSearchParams(location.search).get('queda')==='0'}catch(e){}
if(typeof upd!=='function'||typeof draw3d!=='function'||typeof THREE==='undefined')return;

var cl01=function(v){return v<0?0:v>1?1:v};

/* ======================================================================
   1) ITENS NO CHAO: brilho por raridade
   ====================================================================== */
var RC=['#ffffff','#7dff6a','#4db8ff','#c07bff','#ffb43b'];
var ISZ=[30,32,35,38,42],HSZ=[34,42,52,60,70];
function rar(q){
 if(q.t==='w'){var w=WP[q.id]||{};if(w.gold)return 4;var r=(typeof WR!=='undefined'?WR[q.id]:0)|0;return r<=2?0:r===3?1:r===4?2:r===5?3:4}
 if(q.t==='s')return q.k>=3?3:q.k>=2?2:1;
 if(q.t==='v'||q.t==='h')return 2;
 if(q.t==='k'||q.t==='c')return 1;
 return 0}
function colr(q,r){
 if(q.t==='a'){try{return AKC[q.k]||'#ffd36b'}catch(e){return '#ffd36b'}}
 if(q.t==='c')return '#ffc400';
 if(q.t==='k')return '#ff6b6b';
 if(q.t==='b')return '#ffffff';
 if(q.t==='v'||q.t==='h')return '#4db8ff';
 return RC[r]}
var GT=null,MC={},RG=null,BGm=null;
function glowTex(){
 if(GT)return GT;
 var c=document.createElement('canvas');c.width=c.height=64;
 var x=c.getContext('2d'),g=x.createRadialGradient(32,32,0,32,32,32);
 g.addColorStop(0,'rgba(255,255,255,.95)');g.addColorStop(.35,'rgba(255,255,255,.45)');g.addColorStop(1,'rgba(255,255,255,0)');
 x.fillStyle=g;x.fillRect(0,0,64,64);GT=new THREE.CanvasTexture(c);return GT}
function hmat(c){var k='h'+c;return MC[k]||(MC[k]=new THREE.SpriteMaterial({map:glowTex(),color:c,transparent:true,opacity:.8,blending:THREE.AdditiveBlending,depthWrite:false}))}
function rmat(c){var k='r'+c;return MC[k]||(MC[k]=new THREE.MeshBasicMaterial({color:c,transparent:true,opacity:.6,blending:THREE.AdditiveBlending,depthWrite:false,side:THREE.DoubleSide}))}
function bmat(c){var k='b'+c;return MC[k]||(MC[k]=new THREE.MeshBasicMaterial({color:c,transparent:true,opacity:.2,blending:THREE.AdditiveBlending,depthWrite:false,side:THREE.DoubleSide}))}
function rgeo(){return RG||(RG=new THREE.RingGeometry(11,14,32))}
function bgeo(){if(!BGm){BGm=new THREE.CylinderGeometry(2.5,7,110,10,1,true);BGm.translate(0,55,0)}return BGm}

var FXL=[],fr2=0;
function build(owner,r,c){
 var grp=new THREE.Group(),h=new THREE.Sprite(hmat(c)),ring=null,beam=null,hi=(typeof QG!=='undefined'?QG|0:1)>0;
 h.renderOrder=-1;grp.add(h);
 if((r>=1&&hi)||r>=2){ring=new THREE.Mesh(rgeo(),rmat(c));ring.rotation.x=-Math.PI/2;grp.add(ring)}
 if(r>=3&&hi){beam=new THREE.Mesh(bgeo(),bmat(c));grp.add(beam)}
 return{grp:grp,halo:h,ring:ring,beam:beam,r:r,owner:owner,gw:gw,seen:0}}
function fx(o,x,z,y,r,c,t,hs){
 var F=o._fx;
 if(!F||F.gw!==gw){F=o._fx=build(o,r,c);gw.add(F.grp);FXL.push(F)}
 F.seen=fr2;
 var pul=.5+.5*Math.sin(t*2.2+x*.013),s=hs*(1+.12*pul);
 F.halo.position.set(x,y,z);F.halo.scale.set(s,s,1);
 if(F.ring){F.ring.position.set(x,1.6,z);F.ring.scale.setScalar(1+.2*pul)}
 if(F.beam)F.beam.position.set(x,0,z)}
function lootFx(){
 var g=G;if(!g||!g.items||typeof gw==='undefined'||!gw)return;
 fr2++;var t=g.t||0,i,q,r,c,F;
 for(i=0;i<g.items.length;i++){q=g.items[i];
  if(!q.sp||q.seen!==fr)continue;
  r=rar(q);c=colr(q,r);
  fx(q,q.x,q.y,24+Math.sin(t*3+q.x)*3,r,c,t,HSZ[r]);
  var k=ISZ[r]*(1+.05*(.5+.5*Math.sin(t*2.2+q.x*.013)));q.sp.scale.set(k,k,1)}
 if(g.lb)for(i=0;i<g.lb.length;i++){q=g.lb[i];
  if(!q.sp||!q.it||!q.it.length)continue;
  fx(q,q.x,q.y,10+Math.sin(g.t*2+q.x)*1.2,2,'#ffd23b',t,48)}
 for(i=FXL.length-1;i>=0;i--){F=FXL[i];
  if(F.seen!==fr2||F.gw!==gw){try{F.gw.remove(F.grp)}catch(e){}F.owner._fx=null;FXL.splice(i,1)}}}

/* ======================================================================
   2) QUEDA: planar / mergulhar (so jogador local)
   ====================================================================== */
var SPG=460,SPD=700,SPC=330,KDIVE=.75;
function ino(){
 var K=(typeof keys!=='undefined'&&keys)||{},mx=(K.KeyD?1:0)-(K.KeyA?1:0),my=(K.KeyS?1:0)-(K.KeyW?1:0),full=0;
 if(K.ShiftLeft||K.ShiftRight||K.Space)full=1;
 try{if(typeof js!=='undefined'&&js&&js.on){var dx=js.x-js.ox,dy=js.y-js.oy,l=Math.hypot(dx,dy);if(l>6){var k=Math.min(1,l/(46*U));mx=dx/l*k;my=dy/l*k;if(k>=.88)full=1}}}catch(e){}
 var w=rel2w(mx,my);mx=w[0];my=w[1];
 if(!isFinite(mx+my)){mx=0;my=0}
 var m=Math.hypot(mx,my);if(m>1){mx/=m;my/=m}
 return{mx:mx,my:my,dive:!!full}}
function prep(p){return{x:p.x,y:p.y,ft:p.ft,vx:p.fvx||0,vy:p.fvy||0,i:ino()}}
function post(p,s,dt){
 if(p.st!=='fall'||!(dt>0&&dt<.5))return;           /* pousou neste quadro: fica como o jogo fez */
 var r0=s.ft/FT0,open=r0<FTO,want=(!open&&r0>FTO+.1&&s.i.dive)?1:0;
 p._dv=(p._dv||0)+(want-(p._dv||0))*Math.min(1,dt*(want?4:3));
 var dv=p._dv,sp=open?SPC:SPG+(SPD-SPG)*dv,
  kv=Math.min(1,dt*(open?1.8:2.2+dv*1.6)),
  vx=s.vx+(s.i.mx*sp-s.vx)*kv,vy=s.vy+(s.i.my*sp-s.vy)*kv;
 p.fvx=vx;p.fvy=vy;
 p.x=cl(s.x+vx*dt,20,S-20);p.y=cl(s.y+vy*dt,20,S-20);
 p.ft=s.ft-dt*(1+KDIVE*dv);
 if(!(p.ft>.02))p.ft=.02;
 try{fallHouse(p)}catch(e){}}
function hint(){try{soon('Empurre o direcional até o fim (ou segure Shift) para MERGULHAR')}catch(e){}}

var u0=upd;
upd=function(dt){
 var g=G,p=g&&g.p,s=null;
 if(!OFF){try{
  if(p&&p.isP&&!p.mx&&p.st==='fall'&&!p.dead&&!g.room&&!g.cs){s=prep(p);if(!p._q48){p._q48=1;hint()}}
 }catch(e){s=null}}
 var r=u0.apply(this,arguments);
 try{if(s)post(p,s,dt)}catch(e){}
 return r};

if(typeof jump==='function'){
 var j0=jump;
 jump=function(f){
  var was=f&&f.st,r=j0.apply(this,arguments);
  try{if(!OFF&&was==='plane'&&f.st==='fall'){
   var pl=G.pl,dx=pl.bx-pl.ax,dy=pl.by-pl.ay,l=Math.hypot(dx,dy)||1;
   f.fvx=dx/l*240;f.fvy=dy/l*240;f._pT=0;f._dv=0;f._fps=null;
   if(f.isP&&!f.mx)shk=Math.max(shk,5)}}catch(e){}
  return r}}

/* ======================================================================
   3) VISUAL: pose, paraquedas, camera, painel
   ====================================================================== */
function fPose(f,g,dt){
 var open=f.ft/FT0<FTO,dvT=0;
 if(!open){if(f.isP&&!f.mx)dvT=f._dv||0;else dvT=cl01((Math.hypot(f.fvx||0,f.fvy||0)-420)/200)}
 var S0=f._fps||(f._fps={bx:1.25,by:6,bz:-26,ax:-.4,az:1.3,lz:.35,dv:0}),k=Math.min(1,dt*7);
 S0.dv+=(dvT-S0.dv)*k;
 var d=S0.dv,t=g.t+(f.i||0)*1.7,
  T=open?{bx:0,by:0,bz:0,ax:-2.65,az:.28,lz:.07}:{bx:1.2+.25*d,by:6,bz:-26,ax:-.4-2.3*d,az:1.3-1.18*d,lz:.35-.3*d};
 for(var n in T)S0[n]+=(T[n]-S0[n])*k;
 f.bg.rotation.x=S0.bx;f.bg.position.set(0,S0.by,S0.bz);
 var fl=Math.sin(t*(open?2.2:16))*(open?.12:.06+.05*(1-d)),lg=open?.25*Math.sin(t*1.9):fl*1.5;
 f.a1.rotation.set(S0.ax+(open?fl*.5:fl),0,S0.az);f.a2.rotation.set(S0.ax-(open?fl*.5:fl),0,-S0.az);
 f.l1.rotation.set(lg,0,S0.lz);f.l2.rotation.set(-lg,0,-S0.lz);
 if(f.pc)f.pc.visible=open}
if(typeof pose==='function'){
 var p0=pose;
 pose=function(f,g,dt,fall,alt){
  var r=p0.apply(this,arguments);
  try{if(!OFF&&f&&f.st==='fall'&&!(f.dn>0)&&f.bg&&f.a1&&f.a2&&f.l1&&f.l2)fPose(f,g,dt)}catch(e){}
  return r}}

function chute(f,g,dt){
 var open=f.ft/FT0<FTO;
 if(!open){
  f.pc.visible=false;f._pT=0;
  if(f.wd&&f.wd.visible){var dd=f._fps?f._fps.dv:0;f.wd.scale.set(1+dd*.5,1+dd*1.1,1+dd*.5)}
  return}
 f.pc.visible=true;
 var t=f._pT=(f._pT||0)+dt,sx,sy,w;
 if(t<=dt*1.5&&f.isP&&!f.mx)shk=Math.max(shk,6);
 if(t<.2){var a=t/.2;sx=.16+.1*a;sy=.5+.6*a}
 else if(t<.55){var b=(t-.2)/.35,e=1-Math.pow(1-b,3);sx=.26+1*e;sy=1.1-.08*e}
 else{w=t-.55;var ex=Math.exp(-w*3);sx=1+ex*.26*Math.cos(w*10);sy=1+ex*(.02*Math.cos(w*10)-.09*Math.sin(w*10))}
 var br=Math.sin(g.t*2.6+(f.i||0))*.02,C=1.18;
 f.pc.scale.set((sx+br)*C,(sy-br)*C,(sx+br)*C);
 f.pc.rotation.z+=Math.exp(-Math.max(0,t-.2)*2)*Math.sin(t*9)*.2}
if(typeof windFx==='function'){
 var w0=windFx;
 windFx=function(f,g,dt,fall,show){
  var r=w0.apply(this,arguments);
  try{if(!OFF&&fall&&f.st==='fall'&&f.pc)chute(f,g,dt)}catch(e){}
  return r}}

var fvB=null,fvS=null;
function camFx(p){
 if(typeof cam3==='undefined'||!cam3)return;
 var inF=!OFF&&p&&p.st==='fall'&&p.isP&&!p.mx&&G&&!G.cs&&!G.room;
 if(inF){
  if(fvB===null||fvS===null||Math.abs(cam3.fov-fvS)>.01)fvB=cam3.fov;
  var tg=fvB+(p._dv||0)*14;
  if(Math.abs(cam3.fov-tg)>.01){cam3.fov=tg;cam3.updateProjectionMatrix()}
  fvS=cam3.fov}
 else if(fvB!==null){
  if(fvS!==null&&Math.abs(cam3.fov-fvS)<=.01){cam3.fov=fvB;cam3.updateProjectionMatrix()}
  fvB=null;fvS=null}}

var hud=null,hA=null,hB=null,hShow=0;
function hudEl(){
 if(hud)return hud;
 hud=document.createElement('div');hud.id='qd48';
 hud.style.cssText='position:fixed;left:50%;top:calc(env(safe-area-inset-top,0px) + 74px);transform:translateX(-50%);z-index:6;pointer-events:none;display:none;font:900 12px Trebuchet MS,Arial,sans-serif;color:#fff;text-shadow:0 1px 3px #000,0 0 8px #000;text-align:center;letter-spacing:.5px;white-space:nowrap';
 hA=document.createElement('div');hA.style.cssText='font-size:22px;line-height:1.1';
 hB=document.createElement('div');
 hud.appendChild(hA);hud.appendChild(hB);document.body.appendChild(hud);return hud}
function hudUp(p){
 var on=!OFF&&p&&p.st==='fall'&&p.isP&&!p.mx&&G&&!G.cs&&!G.room&&!p.dead;
 if(!on){if(hShow&&hud){hud.style.display='none'}hShow=0;return}
 var h=hudEl(),r=p.ft/FT0,open=r<FTO,dv=p._dv||0,
  m=Math.max(0,Math.round(altF(r)/3.2)),ma=Math.round(altF(FTO)/3.2);
 h.style.display='block';hShow=1;
 hA.textContent=m+' m';
 hA.style.color=open?'#7dff6a':dv>.5?'#ff944d':'#ffffff';
 hB.textContent=open?'PARAQUEDAS ABERTO • escolha onde pousar':(dv>.5?'MERGULHANDO':'QUEDA LIVRE')+' • abre aos '+ma+' m • empurre o direcional ao máximo para mergulhar'}

var d30=draw3d;
draw3d=function(){
 var r=d30.apply(this,arguments);
 try{lootFx()}catch(e){}
 try{var p=G&&G.p;camFx(p);hudUp(p)}catch(e){}
 return r};
})();
