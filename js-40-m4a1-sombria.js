/* js-40-m4a1-sombria.js - EVOLUTIVA "M4A1 SOMBRIA" (exclusiva do Passe VIP, nivel 15 da aba VIP)
   - NAO entra na loja, NAO e comprada com gemas e os bots nunca usam (nao esta no EVW).
   - Visual da arma: preto/roxo com espinhos, veias e olhos das trevas, sombras flutuando em volta.
   - Nas costas (quando ela esta na mao): asas sombrias batendo + orbes de sombra girando.
   - Acerto no inimigo: fumaca das sombras.
   - Finalizacao: abre um buraco de sombras no chao que engole o corpo do inimigo.
   Tudo e so efeito visual / cosmetico: nenhum valor de dano, alcance ou cadencia foi alterado. */
(function(){
if(window.SOMBRIA_IDX!=null)return;
try{if(typeof SK==='undefined'||typeof THREE==='undefined'||typeof WP==='undefined')return}catch(e){return}

/* ---------- 0) skin ---------- */
var WID=15;for(var wi=0;wi<WP.length;wi++){if(WP[wi]&&WP[wi].n==='M4A1'){WID=wi;break}}
SK.push({n:'M4A1 Sombria',ev:1,vip:1,w:WID,ra:3,fx:'evShadow',gm:0,
 p:['#150b24','#6a2cff'],p2:['#07030d','#2a0f4a','#6a2cff','#b36bff'],b:'#7a2cff',m:15,
 d:'Evolutiva Mitica exclusiva do Passe VIP. M4A1 forjada nas trevas: corpo preto e roxo com espinhos, veias de sombra brilhando e olhos que observam o alvo, garras sob o cano e sombras flutuando em volta. Segurando: asas sombrias batendo nas costas e orbes de sombra girando. Tiros: fumaca das sombras ao acertar o inimigo. Ao eliminar: um buraco de sombras se abre no chao e engole o corpo do inimigo.'});
var IDX=SK.length-1;window.SOMBRIA_IDX=IDX;window.SOMBRIA_WID=WID;

/* ---------- 1) tabelas por efeito (icone 2D, asas/orbes, particulas) ---------- */
try{if(typeof EIT!=='undefined')EIT.evShadow=['#07040d','#2a0f4a','#a05cff']}catch(e){}
try{if(typeof MFX!=='undefined'&&!MFX.evShadow)MFX.evShadow={c:['#b36bff','#6a2cff','#ffffff'],m:'wisp',n:14,s:2.6}}catch(e){}
try{
 var P=[],LN=[18,16,14,11,8],YS=[16,11,6,1,-4],DK=['#0c0616','#160a28','#1f0d38'];
 [[-1,'wl'],[1,'wr']].forEach(function(S){var s=S[0],tg=S[1];
  P.push([16,1.6,1.4,'#07030d',s*10,19,-.5,0,tg]);
  for(var i=0;i<5;i++){var L=LN[i],cx=s*(4+L/2);
   P.push([L,3.2,.8,DK[i%3],cx,YS[i],0,0,tg]);
   P.push([L,.5,.5,'#9a4dff',cx,YS[i]+1.9,.3,1,tg])}});
 P.push([5,20,3,'#07030d',0,8,-.5]);
 P.push([2,2,1.4,'#b36bff',0,12,1.6,1]);
 P.push([2.2,2.2,2.2,'#7a2cff',0,0,0,1,'o']);
 P.push([2,2,2,'#c07bff',0,0,0,1,'o']);
 P.push([1.6,1.6,1.6,'#9a4dff',0,0,0,1,'o']);
 EVP.evShadow={s:1.45,x:0,y:36,z:-8,P:P};
}catch(e){}

/* ---------- 2) visual fisico da arma (acessorios 3D) ---------- */
if(typeof evoGun==='function'){
 var eg0=evoGun;
 evoGun=function(f,id,sk){
  if(!(sk&&SK[sk]&&SK[sk].fx==='evShadow'))return eg0.apply(this,arguments);
  var Pg=GP[id],top=-99,bot=99,i,s,q;
  for(i=0;i<Pg.length;i++){q=Pg[i];top=Math.max(top,q[5]+q[1]/2);bot=Math.min(bot,q[5]-q[1]/2)}
  var L=(typeof GM!=='undefined'&&GM[id])||30,mid=(top+bot)/2,
  d=function(w,h,l,c,x,y,z,gl){var o=new THREE.Mesh(BG,gl?fxMat(c):evM(c));o.scale.set(w,h,l);o.position.set(x,y,z);f.gun.add(o);return o};
  var U=f.gun.userData={sh:[]};
  for(i=0;i<7;i++)d(.9,2.6+(i%2)*1.2,1.2,'#07030d',0,top+1.6,L*(.08+.13*i));
  U.rail=d(.8,.7,L*.78,'#7a2cff',0,top+.4,L*.45,1);
  for(s=-1;s<=1;s+=2){
   d(.4,.7,L*.6,'#9a4dff',s*2.3,mid+.8,L*.5,1);
   d(.4,.4,L*.4,'#c07bff',s*2.35,mid-.8,L*.45,1);
   d(.5,1.3,1.8,'#d9a8ff',s*2.45,mid+.6,L*.22,1);
   d(.55,.6,.8,'#07030d',s*2.5,mid+.6,L*.22);
   d(.8,3.2,.8,'#07030d',s*1.1,bot-1.4,L*.9);
   d(.8,2,.8,'#07030d',s*1.1,bot-2.6,L*.97)}
  d(1,2.4,1,'#07030d',0,bot-1.5,L*.42);
  d(1,3.4,1,'#07030d',0,bot-2.2,L*.5);
  d(2.6,2.6,3,'#7a2cff',0,mid,L+3,1);
  for(i=0;i<4;i++){var o=d(1.3,1.3,1.3,i%2?'#9a4dff':'#d9a8ff',0,top+2,L*.3,1);o.userData={ph:i*1.57,k:i};U.sh.push(o)}
  U.top=top;U.L=L};
}
/* animacao: sombras flutuando em volta da arma + veia pulsando */
if(typeof evoPet==='function'){
 var ep0=evoPet;
 evoPet=function(f,t){
  ep0.apply(this,arguments);
  try{var U=f.gun&&f.gun.userData;
   if(U&&U.sh&&U.sh.length){
    for(var i=0;i<U.sh.length;i++){var o=U.sh[i],u=o.userData,a=t*2+u.ph;
     o.position.set(Math.cos(a)*2.8,U.top+2+Math.sin(a*1.3)*1.6,U.L*(.18+.18*u.k)+Math.sin(a)*3);
     o.scale.setScalar(1.1+.5*Math.sin(t*5+u.ph))}
    if(U.rail)U.rail.scale.y=.7*(1+.6*Math.sin(t*4+(f.i||0)))}
  }catch(e){}};
}

/* ---------- 3) acerto: fumaca das sombras ---------- */
function shHit(x,y){
 var g=G;if(!g||!g.pt)return;
 if(g.pt.length>(g.rk?40:300)&&(g.rk||R()<.6))return;
 var C=['#07030d','#140820','#2a0f4a','#4a1a8a','#6a2cff'],n=g.rk?3:8,H=g.hl||(g.hl=[]),i,a,v;
 for(i=0;i<n;i++){a=R()*6.283;v=rr(14,64);
  g.pt.push({x:x+rr(-4,4),y:y+rr(-4,4),vx:Math.cos(a)*v,vy:Math.sin(a)*v,l:rr(.6,1.15),m:1.15,c:C[R()*C.length|0],u:rr(22,52),h:rr(30,46),r:rr(3,6.5)})}
 if(!g.rk&&H.length<18)for(i=0;i<3;i++)
  H.push({p:[[x,28,y],[x+rr(-8,8),46,y+rr(-8,8)],[x+rr(-16,16),66,y+rr(-16,16)]],c:i?'#4a1a8a':'#9a4dff',l:.42,m:.42,w:2.4})}
if(typeof hitFx==='function'){
 var hf0=hitFx;
 hitFx=function(x,y,id,a,cp){
  if(SK[id]&&SK[id].fx==='evShadow'){try{shHit(x,y)}catch(e){}return}
  return hf0.apply(this,arguments)};
}

/* ---------- 4) finalizacao: buraco de sombras engole o corpo ---------- */
var CGm=null,RGm=null,ARm=null,CNm=null,CYm=null;
function geos(){if(CGm)return;CGm=new THREE.CircleGeometry(1,44);RGm=new THREE.RingGeometry(.9,1,56);ARm=new THREE.RingGeometry(.25,.92,30,1,0,1.7);CNm=new THREE.ConeGeometry(1,1,6);CYm=new THREE.CylinderGeometry(1,1,1,10)}
function shDeath(x,y,k,v){
 var g=G,PI=Math.PI,i;if(!g||typeof gw==='undefined'||!gw)return;
 geos();
 var grp=new THREE.Group(),ms=[],e={grp:grp,ms:ms,t:0,l:3.4};
 gw.add(grp);grp.position.set(x,0,y);(g.fx||(g.fx=[])).push(e);
 try{if(dst({x:x,y:y},g.p)<700)shk=Math.max(shk,7)}catch(_){}
 var RH=36;
 var O=function(t){return Math.max(0,Math.min(1,t/.25,(e.l-t)/.7))};
 var S=function(t){var q=Math.min(1,t/.38);q=1-Math.pow(1-q,3);var c=Math.max(0,Math.min(1,(e.l-t)/.8));return q*c*c*(3-2*c)};
 var A=function(geo,c,o,add,px,py,pz,f){var m=new THREE.Mesh(geo,new THREE.MeshBasicMaterial({color:c,transparent:true,opacity:o,depthWrite:false,side:THREE.DoubleSide,blending:add?THREE.AdditiveBlending:THREE.NormalBlending}));m.position.set(px,py,pz);m.userData={o:o,f:f};grp.add(m);ms.push(m);return m};
 var flat=function(m){m.rotation.x=-PI/2;return m};
 /* brilho roxo, buraco preto, fundo do poco, aro girando e bracos em espiral */
 flat(A(CGm,'#5a1fd0',.4,1,0,.8,0,function(m,t){var s=RH*1.9*S(t)+.01;m.scale.set(s,s,1);m.material.opacity=.38*O(t)}));
 flat(A(CGm,'#000000',1,0,0,1.4,0,function(m,t){var s=RH*S(t)+.01;m.scale.set(s,s,1);m.material.opacity=Math.min(1,O(t)*1.8)}));
 flat(A(CGm,'#1a0833',1,0,0,1.8,0,function(m,t){var s=RH*.72*S(t)+.01;m.scale.set(s,s,1);m.material.opacity=Math.min(1,O(t)*1.8)}));
 flat(A(RGm,'#9a4dff',.95,1,0,2.4,0,function(m,t){var s=RH*1.03*S(t)+.01;m.scale.set(s,s,1);m.rotation.z=t*2.2;m.material.opacity=.9*O(t)}));
 for(i=0;i<3;i++)(function(j){flat(A(ARm,j?'#6a2cff':'#b36bff',.55,1,0,2.8+j*.2,0,function(m,t){var s=RH*(.95-j*.2)*S(t)+.01;m.scale.set(s,s,1);m.rotation.z=-t*(3+j)+j*2.1;m.material.opacity=.55*O(t)}))})(i);
 /* garras/tentaculos de sombra saindo da borda e se curvando para dentro */
 for(i=0;i<9;i++)(function(i){var a=i/9*6.283+R()*.3,ph=R();
  A(CNm,'#07030d',1,0,0,0,0,function(m,t){var s=S(t),rise=Math.min(1,Math.max(0,(t-.15)/.5))*s,r=RH*.98*s,tl=.5+Math.sin(t*5+i)*.12;
   m.position.set(Math.cos(a)*r,9*rise,Math.sin(a)*r);m.scale.set(2.6*rise+.01,(16+ph*8)*rise+.01,2.6*rise+.01);
   m.rotation.set(-tl*Math.sin(a),0,tl*Math.cos(a));m.material.opacity=O(t)})})(i);
 /* colunas de fumaca escura subindo */
 for(i=0;i<6;i++)(function(i){var a=R()*6.283,rd=R()*RH*.7,ph=R();
  A(CYm,i%2?'#140820':'#07030d',.55,0,0,0,0,function(m,t){var q=(t*.6+ph)%1,w=6+q*12;m.position.set(Math.cos(a+t)*rd,q*70,Math.sin(a+t)*rd);m.scale.set(w,10+q*30,w);m.material.opacity=.5*(1-q)*O(t)})})(i);
 /* energia roxa sendo sugada para dentro do buraco */
 for(i=0;i<14;i++)(function(i){var a0=R()*6.283,r0=RH*(.5+R()*.9),ph=R();
  A(BG,i%3?'#9a4dff':'#d9a8ff',.9,1,0,0,0,function(m,t){var q=(t*.9+ph)%1,r=r0*(1-q),a=a0+t*3+q*4,s=3*(1-q*.8)+.01;
   m.position.set(Math.cos(a)*r,2+30*(1-q)*(1-q),Math.sin(a)*r);m.scale.set(s,s,s);m.rotation.set(t*3,t*2,0);m.material.opacity=.9*O(t)})})(i);
 /* silhueta do inimigo tremendo, girando e afundando no buraco */
 var body=new THREE.Group();grp.add(body);
 var bp=[[3.4,20,3.4,-2.6,10,0],[3.4,20,3.4,2.6,10,0],[10,14,5.4,0,27,0],[3,13,3,-6.8,27,0],[3,13,3,6.8,27,0],[6.6,6.6,6.6,0,38.5,0]];
 bp.forEach(function(p,n){
  var m=new THREE.Mesh(BG,new THREE.MeshBasicMaterial({color:n===5?'#2a1648':'#1a0f2e',transparent:true,opacity:1,depthWrite:false}));
  m.scale.set(p[0],p[1],p[2]);m.position.set(p[3],p[4],p[5]);
  m.userData={o:1,f:function(mm,t){
   if(n===0){var s=Math.max(0,(t-.35)/1.25),sk=Math.pow(Math.min(1,s),1.5),sc=1-.55*Math.min(1,s);
    body.position.set(t<.35?Math.sin(t*90)*1.2:0,-sk*62,0);body.rotation.y=t<.35?0:t*6;body.scale.set(sc,sc,sc);body.visible=t<1.7}
   mm.material.opacity=Math.min(1,O(t)*3)}};
  body.add(m);ms.push(m)});
 try{boom(x,y,['#07030d','#2a0f4a','#6a2cff','#b36bff'],22,200)}catch(_){}
}
if(typeof evoDeath==='function'){
 var ed0=evoDeath;
 evoDeath=function(x,y,k,v){
  if(SK[k]&&SK[k].fx==='evShadow'){try{shDeath(x,y,k,v)}catch(err){}return}
  return ed0.apply(this,arguments)};
}
if(typeof evKillS==='function'){
 var ek0=evKillS;
 evKillS=function(fx,x,y){
  if(fx!=='evShadow')return ek0.apply(this,arguments);
  try{var g=gv({x:x,y:y},1500);if(g<.04||!sxOk(1))return;
   snd(55,1.1,'sine',.22*g,-20);snd(90,.9,'sawtooth',.08*g,-60,.05);nz(.9,.1*g,380,0,.8,'lowpass');snd(180,.8,'sine',.05*g,-100,.2);
   for(var i=0;i<4;i++)nz(.05,.05*g,1800+i*400,.2+i*.12,2,'bandpass')}catch(e){}};
}

/* ---------- 5) icone 2D (inventario): espinhos, veia roxa, olho e asa ---------- */
if(typeof eiTop==='function'){
 var et0=eiTop;
 eiTop=function(q,W,H,id,sk){
  et0.apply(this,arguments);
  try{if(!SK[sk]||SK[sk].fx!=='evShadow')return;
   var B=evWB(id,W,H),l=B.l,r=B.r,t=B.t,b=B.b,cx=B.cx,cy=B.cy,hh=b-t,ww=r-l,u=Math.max(H*.07,hh*.7),i,x;
   q.save();q.lineJoin='round';
   q.fillStyle='#07030d';q.strokeStyle='#9a4dff';q.lineWidth=Math.max(1,u*.05);q.shadowColor='#9a4dff';q.shadowBlur=u*.3;
   q.beginPath();q.moveTo(l+ww*.08,cy-hh*.2);q.lineTo(l-u*.2,cy-u*1.0);q.lineTo(l-u*.35,cy-u*.35);q.lineTo(l-u*.8,cy-u*.5);q.lineTo(l-u*.6,cy+u*.05);q.lineTo(l-u*.95,cy+u*.15);q.lineTo(l+ww*.08,cy+hh*.1);q.closePath();q.fill();q.stroke();
   q.shadowBlur=0;q.fillStyle='#07030d';
   for(i=0;i<7;i++){x=l+ww*(.1+.13*i);q.beginPath();q.moveTo(x-u*.12,t+1);q.lineTo(x,t-u*.5);q.lineTo(x+u*.12,t+1);q.closePath();q.fill()}
   q.shadowColor='#9a4dff';q.shadowBlur=u*.4;q.strokeStyle='#b36bff';q.lineWidth=Math.max(1.5,u*.07);
   q.beginPath();q.moveTo(l+ww*.1,cy-hh*.1);q.lineTo(r-ww*.08,cy-hh*.1);q.stroke();
   q.fillStyle='#d9a8ff';q.beginPath();q.ellipse(l+ww*.45,cy-hh*.02,u*.2,u*.11,0,0,7);q.fill();
   q.shadowBlur=0;q.fillStyle='#07030d';q.beginPath();q.arc(l+ww*.45,cy-hh*.02,u*.06,0,7);q.fill();
   q.restore()}catch(e){}};
}

/* ---------- 6) exclusiva: fora da loja e nao compravel com gemas ---------- */
if(typeof shItems==='function'){
 var si0=shItems;
 shItems=function(t){return si0.apply(this,arguments).filter(function(o){return !(o.k&&o.k.vip)})};
}
if(typeof evBuy==='function'){
 var eb0=evBuy;
 evBuy=function(sk){
  if(SK[sk]&&SK[sk].vip){try{soon('Exclusiva do Passe VIP (nivel 15)')}catch(e){}return}
  return eb0.apply(this,arguments)};
}
})();
