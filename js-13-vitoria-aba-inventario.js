
/* ===== VITORIA: aba no Inventario e na Loja + final "Vitoria Indolor" ===== */
(function(){
const VICS=[
 {id:0,n:'Comemoração',pr:0,sub:'Final clássico',d:'O time pula e comemora no palco, com confete e raios de luz.'},
 {id:1,n:'Vitória Indolor',pr:2000,sub:'Final especial',d:'Cutscene leve e sem partículas: quando você vence, você e seu time aparecem chutando, bem de leve, o último inimigo derrotado.'},
 {id:2,n:'Vitória Louca',pr:3500,sub:'Final especial',d:'Você e seus aliados fazem mágica: o último inimigo derrotado vira um pato e fica falando quack quack.'}];
const VT={arm:0,shop:0,sel:1,own:[0],eq:0};
try{const s=JSON.parse(localStorage.getItem('arr_vic2')||'null');if(s){VT.own=Array.from(new Set([0].concat(s.own||[])));VT.eq=VT.own.includes(s.eq)?s.eq:0}}catch(e){}
const sv=()=>{try{localStorage.setItem('arr_vic2',JSON.stringify({own:VT.own,eq:VT.eq}))}catch(e){}};
window.VICT=VT;
/* ---------- desenho do preview (2D) ---------- */
function bot(q,x,y,s,c,o){o=o||{};q.save();q.translate(x,y);if(o.rot)q.rotate(o.rot);
 const R=(a,b,w,h,col)=>{q.fillStyle=col;q.fillRect(a*s,b*s,w*s,h*s)};
 const leg=(dx,ang)=>{q.save();q.translate(dx*s,-1.6*s);q.rotate(ang||0);R(-.35,0,.7,1.6,'#2a3a6a');R(-.45,1.4,.9,.35,'#111');q.restore()};
 leg(-.4,o.l1);leg(.4,o.l2);
 R(-.8,-3.4,1.6,1.9,c);R(-.8,-3.4,1.6,.4,'rgba(255,255,255,.25)');
 const arm=(dx,ang)=>{q.save();q.translate(dx*s,-3.2*s);q.rotate(ang||0);R(-.3,0,.6,1.7,c);R(-.34,1.5,.68,.45,'#f5cd30');q.restore()};
 arm(-1.05,o.a1);arm(1.05,o.a2);
 R(-.7,-4.9,1.4,1.4,'#f5cd30');R(-.35,-4.3,.25,.3,'#111');R(.15,-4.3,.25,.3,'#111');
 if(o.x){q.strokeStyle='#111';q.lineWidth=s*.12;q.beginPath();q.moveTo(-.5*s,-4.4*s);q.lineTo(-.1*s,-4*s);q.moveTo(-.1*s,-4.4*s);q.lineTo(-.5*s,-4*s);q.moveTo(.1*s,-4.4*s);q.lineTo(.5*s,-4*s);q.moveTo(.5*s,-4.4*s);q.lineTo(.1*s,-4*s);q.stroke()}
 q.restore()}
function vicPrev(id,w,h,t){const c=document.createElement('canvas');c.width=w*2;c.height=h*2;vicDrw(c,id,t||.35);return c}
function vicDrw(c,id,t){const q=c.getContext('2d'),W=c.width,H=c.height,s=H/11;q.clearRect(0,0,W,H);
 let g=q.createLinearGradient(0,0,0,H);g.addColorStop(0,'#1a2a6c');g.addColorStop(.55,'#b21f6b');g.addColorStop(1,'#fdbb2d');q.fillStyle=g;q.fillRect(0,0,W,H);
 if(id==0){q.fillStyle='rgba(255,255,255,.12)';for(let i=0;i<12;i++){q.beginPath();q.moveTo(W/2,H*.5);q.arc(W/2,H*.5,W,i*.52+t*.2,i*.52+t*.2+.2);q.fill()}}
 q.fillStyle='#2b2150';q.fillRect(0,H*.82,W,H*.18);q.fillStyle='rgba(0,0,0,.25)';q.fillRect(0,H*.82,W,s*.15);
 const gy=H*.86;
 if(id==0){const cs=['#ffd93b','#ff5a5a','#7dff6a','#4aa3ff'];[.3,.5,.7].forEach((fx,i)=>{const j=Math.abs(Math.sin(t*5+i*1.1))*s*1.6;bot(q,W*fx,gy-j,s*.9,cs[i],{a1:-2.6,a2:2.6,l1:j>s?.2:0,l2:j>s?-.2:0})});
  for(let i=0;i<18;i++){q.fillStyle=cs[i%4];q.fillRect((i*53+t*60*(1+i%3))%W,(i*37+t*90)%(H*.8),s*.25,s*.14)}}
 else if(id==1){const vx=W*.52,vy=gy-s*.5;bot(q,vx,vy,s*.9,'#9aa7b8',{rot:-Math.PI/2,x:1,a1:.3,a2:-.3,l1:.2,l2:-.1});
  [[.27,0,-1],[.79,.5,1]].forEach(([fx,ph,d],i)=>{const k=Math.max(0,Math.sin(t*4+ph*6)),k2=Math.max(0,-Math.sin(t*4+ph*6));bot(q,W*fx,gy,s*.9,i?'#ff5a5a':'#ffd93b',{a1:.25,a2:-.25,l1:d*1.25*k,l2:d*1.25*k2})})}
 else{const cx=W*.5,pp=t%1.8,op=(pp<.16||(pp>.3&&pp<.46))?1:0;
  [[.2,0,1],[.8,.5,-1]].forEach(([fx,ph,d],i)=>{const j=Math.abs(Math.sin(t*9+ph*6))*s*.35,w=Math.sin(t*12+ph)*.2;
   bot(q,W*fx,gy-j,s*.9,i?'#ff5a5a':'#ffd93b',d>0?{a1:-2.6+w,a2:-1.5,l1:.1,l2:-.1}:{a1:1.5,a2:2.6+w,l1:.1,l2:-.1})});
  q.save();q.fillStyle='rgba(0,0,0,.25)';q.beginPath();q.ellipse(cx,gy,s*2.2,s*.35,0,0,7);q.fill();
  q.translate(cx,gy-Math.abs(Math.sin(t*7))*s*.15);
  q.fillStyle='#ffd62e';q.beginPath();q.moveTo(-s*1.8,-s*2);q.lineTo(-s*3.1,-s*3.1);q.lineTo(-s*1.5,-s*1);q.fill();
  q.beginPath();q.ellipse(0,-s*1.5,s*2,s*1.4,0,0,7);q.fill();
  q.fillStyle='#f2bd10';q.beginPath();q.ellipse(-s*.3,-s*1.5,s*1.1,s*.7,-.3+Math.sin(t*14)*.25*op,0,7);q.fill();
  q.fillStyle='#ffd62e';q.beginPath();q.arc(s*1.1,-s*3.3,s*1.05,0,7);q.fill();
  q.fillStyle='#ff8a1f';q.beginPath();q.ellipse(s*2.2,-s*3.5,s*.8,s*.3,0,0,7);q.fill();
  q.beginPath();q.ellipse(s*2.1,-s*3.1+op*s*.25,s*.65,s*.25,0,0,7);q.fill();
  q.fillRect(-s*.9,-s*.15,s*.9,s*.15);q.fillRect(s*.4,-s*.15,s*.9,s*.15);
  q.fillStyle='#111';q.beginPath();q.arc(s*1.5,-s*3.7,s*.17,0,7);q.fill();
  q.restore();
  ['#fff','#ff7ad9','#7dff6a','#4aa3ff','#ffd93b','#fff'].forEach((col,i)=>{const a=t*2+i*1.05,x=cx+Math.cos(a)*s*3.4,y=gy-s*3.6+Math.sin(a)*s*1.6,r=s*(.25+.12*Math.sin(t*8+i));q.fillStyle=col;q.beginPath();q.moveTo(x,y-r*1.6);q.lineTo(x+r,y);q.lineTo(x,y+r*1.6);q.lineTo(x-r,y);q.fill()});
  if(pp<.9){const tx=pp<.3?'QUACK!':'QUACK QUACK!';q.font='900 '+(s*.9)+'px Arial';const bw=q.measureText(tx).width+s*.9;q.fillStyle='#ffd93b';q.strokeStyle='#141211';q.lineWidth=s*.12;q.beginPath();q.roundRect(cx+s*.4-bw/2,s*1.3,bw,s*1.5,s*.5);q.fill();q.stroke();q.fillStyle='#3a2000';q.textAlign='center';q.textBaseline='middle';q.fillText(tx,cx+s*.4,s*2.05)}}}
function vicAnim(cv,id){const t0=performance.now();let lt=0;const f=ts=>{if(!cv.isConnected)return;if(!document.hidden&&cv.offsetParent!==null&&ts-lt>=30){lt=ts;vicDrw(cv,id,(performance.now()-t0)/1000)}requestAnimationFrame(f)};requestAnimationFrame(f)}
/* ---------- render comum (inventario / loja) ---------- */
const own=i=>VT.own.includes(i);
function equip(i){VT.eq=i;sv();snd(560,.08,'triangle',.05,200);soon(i?VICS[i].n+' equipada':'Vitória padrão equipada')}
function buyV(i){const v=VICS[i];if(own(i))return;if(coins<v.pr){soon('Moedas insuficientes');return}coins-=v.pr;try{svD()}catch(e){}try{$('coins').textContent=fmt(coins)}catch(e){}VT.own.push(i);VT.eq=i;sv();snd(700,.15,'triangle',.06,400);soon(v.n+' comprada e equipada!')}
function vicInfo(v,i,box){const V=VICS[i];ivInfo(v,'#ffd93b','#ffd93b44',V.n,'VITÓRIA • '+V.sub.toUpperCase(),V.d);const cv=document.createElement('canvas');cv.width=640;cv.height=300;cv.style.cssText='width:96%;height:auto;border-radius:10px;display:block;margin:auto;aspect-ratio:640/300';v.querySelector('.ivpv').appendChild(cv);vicDrw(cv,i,.35);vicAnim(cv,i)}
function arm(){$('ivc').textContent=fmt(coins);try{$('ivg').textContent=fmt(gems)}catch(e){}
 try{$('ivpn').textContent=PN;$('ivav').textContent=String(PN||'?').charAt(0).toUpperCase()}catch(e){}
 tabs('ivt',[['i-gun','ARMAS'],['i-parachute','PARAQUEDAS'],['i-sparkle','RASTROS']],i=>{ivT=i;VT.arm=0;if(i==0)ivK=EQ[ivS[0]]||0;ivJ=true;$('ivl').scrollTop=0;armR()},()=>{VT.arm=1;armR()},1);
 $('ivh').textContent='Finais de vitória';$('ivfl').style.display='none';$('ivwp').style.display='none';
 const L=$('ivl');L.innerHTML='';VICS.forEach(V=>{const o=own(V.id);L.appendChild(ivCard({cv:vicPrev(V.id,150,84),nm:V.n,col:'#ffd93b',chips:'<span class="ivch">'+(V.id?'ESPECIAL':'PADRÃO')+'</span>'+(o?'':'<span class="ivch pr"><svg class="ic"><use href="#i-coin"/></svg> '+fmt(V.pr)+'</span>'),pc:'#ffd93b',sel:VT.sel==V.id,lock:!o,eq:VT.eq==V.id,click:()=>{VT.sel=V.id;armR()}}))});
 $('ivpi').textContent='1/1';$('ivpp').disabled=true;$('ivpx').disabled=true;
 const i=VT.sel,V=VICS[i],o=own(i),e=VT.eq==i;vicInfo($('ivv'),i);
 $('ivr').innerHTML='<div class="ivmt"><span>Status:<b style="color:'+(e?'#7dff6a':o?'#fff':'#ff8a8a')+'">'+(e?'Equipado':o?'Disponível':'Bloqueado')+'</b></span></div>';
 const ap=$('ivap');ap.className='ivap';ap.disabled=false;ap.onclick=null;
 if(e&&i==0){ap.innerHTML='<svg class="ic"><use href="#i-check"/></svg> EQUIPADO';ap.disabled=true}
 else if(e){ap.innerHTML='DESEQUIPAR';ap.onclick=()=>{equip(0);armR()}}
 else if(o){ap.innerHTML='EQUIPAR';ap.onclick=()=>{equip(i);armR()}}
 else{ap.classList.add('sh');ap.innerHTML='<svg class="ic"><use href="#i-lock"/></svg> <svg class="ic"><use href="#i-coin"/></svg> '+fmt(V.pr);ap.onclick=()=>{$('arm').classList.add('hide');VT.shop=1;shopR();$('shop').classList.remove('hide')}}}
function shop(){$('shc').textContent=fmt(coins);try{$('shgm').textContent=fmt(gems)}catch(e){}
 tabs('sht',SMO.map(n=>[SMI[n],SMN[n],n]),n=>{shT=n;VT.shop=0;shJ=true;$('shg').scrollTop=0;shopR()},()=>{VT.shop=1;shopR()},2);
 $('shh').textContent='Finais de vitória - em destaque';
 const g=$('shg');g.innerHTML='';VICS.forEach(V=>{const o=own(V.id),e=VT.eq==V.id,d=document.createElement('div');d.className='smk'+(VT.sel==V.id?' sel':'');d.style.setProperty('--rc','#ffd93b');d.appendChild(vicPrev(V.id,160,90));
  d.insertAdjacentHTML('beforeend','<div class="smn">'+V.n+'</div><div class="sms2">'+V.sub+'</div><div class="smp">'+(e?'<b style="color:#7dff6a">EQUIPADO</b>':o?'<b style="color:#7dff6a">SEU</b>':'<svg class="ic"><use href="#i-coin"/></svg> <b>'+fmt(V.pr)+'</b>')+'</div>');
  const b=document.createElement('button');b.type='button';b.className='smbt';b.textContent=e?(V.id?'DESEQUIPAR':'EQUIPADO'):o?'EQUIPAR':'COMPRAR';b.disabled=e&&!V.id;b.onclick=ev=>{ev.stopPropagation();VT.sel=V.id;act(V.id)};d.appendChild(b);d.onclick=()=>{VT.sel=V.id;shopR()};g.appendChild(d)});
 $('shpi').textContent='1/1';$('shpp').disabled=true;$('shpx').disabled=true;
 const i=VT.sel,V=VICS[i],o=own(i),e=VT.eq==i;vicInfo($('shv'),i);$('shv').insertAdjacentHTML('afterbegin','<div class="smdt">Pré-visualização</div>');
 const r=$('shr');r.innerHTML=(!o?'<div class="smpr"><small>PREÇO:</small><div><svg class="ic"><use href="#i-coin"/></svg> <b>'+fmt(V.pr)+'</b> MOEDAS</div></div>':'<div class="smpr"><small>'+(i?'VOCÊ JÁ POSSUI ESTE FINAL':'FINAL INICIAL')+'</small></div>')+'<div class="ivmt"><span>Suas moedas:<b>'+fmt(coins)+'</b></span></div>';
 const bb=document.createElement('button');bb.type='button';bb.className='ivap smfull';bb.innerHTML=e?(i?'DESEQUIPAR':'EQUIPADO <svg class="ic"><use href="#i-check"/></svg>'):o?'EQUIPAR':'COMPRAR AGORA';bb.disabled=e&&!i;bb.onclick=()=>act(i);r.appendChild(bb)}
function act(i){if(!own(i))buyV(i);else if(VT.eq==i&&i)equip(0);else equip(i);shopR()}
function tabs(id,list,onOther,onMine,kind){const tb=$(id);tb.innerHTML='';list.forEach((n,i)=>{const b=document.createElement('button');b.type='button';b.className='ivtb';b.innerHTML='<i><svg class="ic"><use href="#'+n[0]+'"/></svg></i><span>'+n[1]+'</span>';b.onclick=()=>onOther(kind==2?n[2]:i);tb.appendChild(b)});addTab(tb,onMine,1)}
function addTab(tb,onMine,on){const b=document.createElement('button');b.type='button';b.className='ivtb'+(on?' on':'');b.innerHTML='<i><svg class="ic"><use href="#i-trophy"/></svg></i><span>VITÓRIA</span>';b.onclick=onMine;tb.appendChild(b)}
const _armR=armR;armR=function(){if(VT.arm){arm();return}_armR.apply(this,arguments);addTab($('ivt'),()=>{VT.arm=1;armR()},0)};
const _shopR=shopR;shopR=function(){if(VT.shop){shop();return}_shopR.apply(this,arguments);addTab($('sht'),()=>{VT.shop=1;shopR()},0)};
const _ivShop=ivShop;ivShop=function(){VT.shop=0;return _ivShop.apply(this,arguments)};
/* ---------- ultimo inimigo morto ---------- */
const _die=die;die=function(t,s){try{if(G&&s&&s!==t&&s.tm!==t.tm){(G.lastKl=G.lastKl||{})[s.tm]=t}}catch(e){}return _die.apply(this,arguments)};
/* ---------- cena 3D: Vitoria Indolor (leve, sem particulas) ---------- */
function indolor(T){const g=G,v=g.vic,rk=v.rk,n=rk.length,ti=g.teams.indexOf(T);
 let vk=g.lastKl&&g.lastKl[ti];if(!vk||vk.tm===ti)vk=g.f.find(o=>o.tm!==ti&&o.dead)||g.f.find(o=>o.tm!==ti);if(!vk)return 0;
 vicClear();vsc=new THREE.Scene();{const c=document.createElement('canvas');c.width=4;c.height=256;const q=c.getContext('2d'),gr=q.createLinearGradient(0,0,0,256);gr.addColorStop(0,'#2e2621');gr.addColorStop(.55,'#8a2a6a');gr.addColorStop(1,'#f0a02a');q.fillStyle=gr;q.fillRect(0,0,4,256);vsc.background=new THREE.CanvasTexture(c)}
 vsc.add(new THREE.HemisphereLight('#ffffff','#8a6fb0',.95));const dl=new THREE.DirectionalLight('#fff3d0',.9);dl.position.set(.4,1,.9);vsc.add(dl);
 const sp=new THREE.PointLight('#ffe9a0',1.1,500);sp.position.set(0,160,40);vsc.add(sp);
 const fl=new THREE.Mesh(new THREE.PlaneGeometry(2400,2400),new THREE.MeshLambertMaterial({color:'#2b2150'}));fl.rotation.x=-Math.PI/2;vsc.add(fl);
 const ring=new THREE.Mesh(new THREE.RingGeometry(78,86,48),new THREE.MeshBasicMaterial({color:T.col||'#ffd93b',side:THREE.DoubleSide}));ring.rotation.x=-Math.PI/2;ring.position.set(0,.6,30);vsc.add(ring);
 /* ultimo inimigo morto, deitado no chao */
 const vf=Object.assign({},vk);vf.dead=0;vf.hp=1;const vm=mkMesh(vf),vr=new THREE.Group();vr.add(vm);vr.rotation.set(-Math.PI/2,0,Math.PI/2);vr.position.set(0,9,30);vsc.add(vr);if(vf.gun)vf.gun.visible=false;if(vf.pc)vf.pc.visible=false;
 const vl=vicLbl(vicName(vk),'#ffffff','#5a1020e6',44);vl.position.set(0,52,30);vsc.add(vl);
 v.vic={vr,vf,vl};
 /* voce / seu time em volta (centro primeiro) */
 const order=[...Array(n).keys()].sort((a,b)=>Math.abs(a-(n-1)/2)-Math.abs(b-(n-1)/2)||a-b),slot=[];order.forEach((k,j)=>slot[k]=j);
 const step=n>1?Math.min(.75,2.4/(n-1)):0;v.ch=[];
 rk.forEach((o,i)=>{const f2=Object.assign({},o);f2.dead=0;const m=mkMesh(f2),root=new THREE.Group(),ph=slot[i]-(n-1)/2,a=Math.PI+ph*step,R=64+Math.abs(ph)*3;
  root.position.set(Math.sin(a)*R,0,30+Math.cos(a)*R);root.rotation.y=Math.atan2(-Math.sin(a),-Math.cos(a));root.add(m);vsc.add(root);if(f2.gun)f2.gun.visible=false;if(f2.pc)f2.pc.visible=false;const bx=root.position.x,bz=root.position.z;
  const L=vicLbl(vicName(o),'#ffffff','#181513e6',44);L.position.set(0,100,0);L.scale.set(52,13,1);root.add(L);
  v.ch.push({f:f2,root,m,ph:i*.23,last:-1,o:i,bx,bz})});
 vcam=new THREE.PerspectiveCamera(42,W/H,5,4000);
 $('vicT').textContent='VITÓRIA INDOLOR';$('vicS').textContent=(n>1?'Seu time':'Você')+(T.cl&&T.cl.n?'  •  '+(T.cl.tag?'['+T.cl.tag+'] ':'')+T.cl.n:'');
 v.indolor=1;return 1}
/* registro de cenas de vitoria 3D: para criar outra, e so adicionar aqui {id:funcao(T)} e em VICS (jogador) */
/* ---------- cena 3D: Vitoria Louca (ultimo inimigo vira pato) ---------- */
function mkDuck(){
 const d=new THREE.Group(),M=c=>new THREE.MeshLambertMaterial({color:c}),Y=M('#ffd62e'),Yd=M('#f2bd10'),O=M('#ff8a1f'),K=M('#111111'),Wh=M('#ffffff');
 const sph=new THREE.SphereGeometry(1,18,12),box=new THREE.BoxGeometry(1,1,1),con=new THREE.ConeGeometry(1,1,10);
 const P=(pa,g,m,x,y,z,sx,sy,sz)=>{const o=new THREE.Mesh(g,m);o.position.set(x,y,z);o.scale.set(sx,sy,sz);pa.add(o);return o},u={};
 P(d,sph,Y,0,18,0,14,12,18);
 P(d,con,Y,0,23,-19,4.5,11,4.5).rotation.x=-1.15;
 u.wl=P(d,sph,Yd,-14,19,-1,3,9,13);u.wr=P(d,sph,Yd,14,19,-1,3,9,13);
 u.fl=P(d,box,O,-6,.8,6,6,1.6,10);u.fr=P(d,box,O,6,.8,6,6,1.6,10);
 P(d,box,O,-6,3.6,2,2,5,2);P(d,box,O,6,3.6,2,2,5,2);
 const h=u.head=new THREE.Group();h.position.set(0,34,9);d.add(h);
 P(h,sph,Y,0,0,0,9.5,9.5,9.5);
 P(h,sph,K,-4.3,2,7.6,1.7,2.1,1.2);P(h,sph,K,4.3,2,7.6,1.7,2.1,1.2);
 P(h,sph,Wh,-4.6,2.9,8.4,.6,.6,.6);P(h,sph,Wh,4.0,2.9,8.4,.6,.6,.6);
 u.bu=P(h,sph,O,0,-1,10.5,5.5,1.8,6.5);u.bl=P(h,sph,O,0,-3,10,4.6,1.2,5.2);
 return {g:d,u};
}
function quackSnd(j){const f=j?430:500;snd(f,.13,'sawtooth',.05,-170);snd(f*1.9,.1,'square',.018,-300);snd(f*.5,.14,'triangle',.04,-60)}
function louca(T){
 if(!indolor(T))return 0;
 const g=G,v=g.vic,V=v.vic,vk=V.vf;
 const D=mkDuck(),dk=D.g;dk.scale.setScalar(1.35);dk.position.set(0,0,30);dk.visible=false;vsc.add(dk);
 const nl=vicLbl(vicName(vk),'#ffffff','#5a1020e6',44);nl.position.set(0,86,30);nl.visible=false;vsc.add(nl);
 const bub=vicLbl('QUACK QUACK!','#3a2000','#ffd93b',52);bub.scale.set(70,17.5,1);bub.position.set(0,108,30);bub.visible=false;vsc.add(bub);
 const pf=[],st=[],pc=['#ffffff','#ffd0f0','#fff3a0','#ffe6d0'];
 for(let i=0;i<12;i++){const m=new THREE.Mesh(new THREE.SphereGeometry(1,8,6),new THREE.MeshBasicMaterial({color:pc[i%4],transparent:true,opacity:1}));const a=i/12*6.283,e=rr(-.2,.9);m.userData={dx:Math.cos(a),dy:e,dz:Math.sin(a)};m.visible=false;vsc.add(m);pf.push(m)}
 const sc=['#ffffff','#ff7ad9','#7dff6a','#4aa3ff','#ffd93b','#ff9d2e','#ffffff','#ff7ad9'];
 for(let i=0;i<8;i++){const m=new THREE.Mesh(new THREE.OctahedronGeometry(2.4),new THREE.MeshBasicMaterial({color:sc[i]}));m.visible=false;vsc.add(m);st.push(m)}
 v.fx={dk,u:D.u,nl,bub,pf,st,done:0,qk:-1,m0:0};
 v.indolor=0;v.louca=1;
 $('vicT').textContent='VITÓRIA LOUCA';
 return 1}
function loucaDraw(v){
 const dt=gdt;v.t+=dt;const t=v.t;if(t>2&&!v.hint){v.hint=1;$('vicH').classList.add('on')}
 const V=v.vic,X=v.fx,u=X.u,TT=1.1,tf=t>=TT;
 if(V.vf.pc)V.vf.pc.visible=false;
 if(!X.m0){X.m0=1;snd(500,.6,'triangle',.04,1200)}
 if(tf&&!X.done){X.done=1;V.vr.visible=false;V.vl.visible=false;X.dk.visible=true;X.nl.visible=true;X.pf.forEach(m=>m.visible=true);X.st.forEach(m=>m.visible=true);snd(300,.35,'sine',.06,900);snd(900,.25,'triangle',.04,-500,.08)}
 let open=0;
 if(!tf){const j=Math.min(1,t/TT)*1.6;V.vr.position.set(rr(-1,1)*j,9+Math.abs(rr(0,1))*j,30)}
 else{
  const pop=Math.min(1,(t-TT)/.45),c1=1.70158,e=pop>=1?1:1+(c1+1)*Math.pow(pop-1,3)+c1*Math.pow(pop-1,2);
  const tt=t-TT-.2;
  if(tt>=0){const k=Math.floor(tt/1.8),p=tt-k*1.8;
   [0,.3].forEach((o,j)=>{if(p>=o&&p<o+.16){open=Math.sin((p-o)/.16*Math.PI);const key=k*2+j;if(X.qk!==key){X.qk=key;quackSnd(j)}}});
   X.bub.visible=p<.85;const bs=1+open*.15;X.bub.scale.set(70*bs,17.5*bs,1)}
  const sq=1+open*.06,S=1.35*Math.max(.001,e);
  X.dk.scale.set(S,S*sq,S);X.dk.position.y=Math.abs(Math.sin(t*7))*1.5+open*2;
  X.dk.rotation.y=Math.sin(t*2.3)*.55;X.dk.rotation.z=Math.sin(t*7)*.05;
  u.bl.position.y=-3-open*2.6;u.bl.rotation.x=open*.5;u.head.rotation.x=-open*.18;
  const fw=.15+Math.sin(t*14)*.35*(.3+open);u.wl.rotation.z=fw;u.wr.rotation.z=-fw;
  u.fl.position.z=6+Math.sin(t*7)*1.5;u.fr.position.z=6-Math.sin(t*7)*1.5;
  const a=t-TT;
  X.pf.forEach(m=>{const d=m.userData;if(a<1){m.position.set(d.dx*a*55,22+d.dy*a*45,30+d.dz*a*55);m.scale.setScalar(2+a*12);m.material.opacity=Math.max(0,1-a/.9)}else m.visible=false});
  X.st.forEach((m,i)=>{const an=t*2+i*.785;m.position.set(Math.cos(an)*40,34+Math.sin(t*3+i)*9,30+Math.sin(an)*40);m.rotation.y=t*3;m.scale.setScalar(.8+.3*Math.sin(t*8+i))})}
 for(const c of v.ch){const f=c.f,T2=t*10+c.ph*7,lb=Math.abs(Math.sin(T2)),w=Math.sin(t*12+c.ph)*.3;
  if(f.pc)f.pc.visible=false;
  c.root.position.set(c.bx,tf?lb*2.2:0,c.bz);
  if(!tf){if(f.a1){f.a1.rotation.x=-1.5+Math.sin(t*20+c.ph)*.1;f.a1.rotation.z=0}if(f.a2){f.a2.rotation.x=-1.5+Math.sin(t*20+c.ph)*.1;f.a2.rotation.z=0}}
  else{if(f.a1){f.a1.rotation.x=-1.5+Math.sin(t*6+c.ph)*.12;f.a1.rotation.z=0}if(f.a2){f.a2.rotation.x=0;f.a2.rotation.z=2.45-w}}
  if(f.l1)f.l1.rotation.x=0;if(f.l2)f.l2.rotation.x=0;
  c.m.rotation.x=tf?-.12-.1*Math.sin(T2):0}
 const fv=Math.tan(42*Math.PI/360),asp=W/H,need=(Math.max(120,(v.ch.length>1?100:80))/(fv*Math.min(asp,2)))*1.15,vn=75/fv,zoom=Math.min(1,t/1.2),e2=1-Math.pow(1-zoom,3),dist=Math.max(230,need,vn)*(1.5-.5*e2);
 vcam.aspect=asp;vcam.updateProjectionMatrix();vcam.position.set(Math.sin(t*.45)*24*e2,95+25*(1-e2),30+dist);vcam.lookAt(0,38,30);
 ren.render(vsc,vcam);if(t>=9&&!v.ok)vicEnd()}
const SCENES={1:indolor,2:louca};
/* bots tambem tem final de vitoria: cada bot recebe um (fixo por nome); ~45% usam o padrao */
function botVic(o){if(!o)return 0;if(o.vid==null){const ids=Object.keys(SCENES).map(Number);let h=0;const nm=String(o.cm||o.bn||o.name||o.i);for(let i=0;i<nm.length;i++)h=(h*31+nm.charCodeAt(i))>>>0;o.vid=(h%100)<45||!ids.length?0:ids[(h>>>8)%ids.length]}return o.vid}
window.botVic=botVic;
const _vs=vicStart;vicStart=function(T){_vs.apply(this,arguments);try{const g=G;let id=0;
 if(!g.room&&g.teams[g.p.tm]===T)id=own(VT.eq)?VT.eq:0;else id=botVic(g.vic&&g.vic.rk&&g.vic.rk[0]);
 if(id&&SCENES[id])SCENES[id](T)}catch(e){console.error('vic cena',e)}};
const _vd=vicDraw;vicDraw=function(){const v=G.vic;if(v&&v.louca&&vsc){return loucaDraw(v)}if(!v||!v.indolor||!vsc){return _vd.apply(this,arguments)}
 const dt=gdt;v.t+=dt;const t=v.t;if(t>2&&!v.hint){v.hint=1;$('vicH').classList.add('on')}
 const V=v.vic;let hit=0;
 if(V.vf.pc)V.vf.pc.visible=false;for(const c of v.ch){const f=c.f;if(f.pc)f.pc.visible=false;const T2=t*5+c.ph*6.28,ph=((T2/6.28)%1+1)%1,first=ph<.5,u=first?ph*2:(ph-.5)*2,kk=Math.sin(u*Math.PI),k1=first?kk:0,k2=first?0:kk;
  /* chute: uma perna por vez, para frente; bracos so ajudam no equilibrio */
  if(f.l1)f.l1.rotation.x=-1.35*k1;if(f.l2)f.l2.rotation.x=-1.35*k2;
  if(f.a1){f.a1.rotation.x=-.25+.5*k2;f.a1.rotation.z=0}if(f.a2){f.a2.rotation.x=-.25+.5*k1;f.a2.rotation.z=0}
  c.m.rotation.x=-.1*kk;
  const lg=.16*kk;c.root.position.set(c.bx+(0-c.bx)*lg,Math.abs(Math.sin(T2/2))*1.2,c.bz+(30-c.bz)*lg);
  const cyc=Math.floor(T2/3.1416-.5);if(cyc!==c.last&&t>.6){c.last=cyc;hit++;snd(140+Math.random()*50,.05,'square',.02,-60)}}
 /* inimigo recebendo leve */
 const sh=v.shake=Math.max(0,(v.shake||0)-dt*5);if(hit)v.shake=Math.min(.5,sh+.25*hit);
 const j=v.shake;V.vr.position.set(rr(-1,1)*j*2,9+Math.abs(rr(0,1))*j*1.5,30+rr(-1,1)*j*1.5);V.vr.rotation.z=Math.PI/2+rr(-1,1)*j*.06;
 if(V.vf.a1)V.vf.a1.rotation.z=Math.sin(t*6)*.3*(.3+j);if(V.vf.a2)V.vf.a2.rotation.z=-Math.sin(t*6+1)*.3*(.3+j);if(V.vf.l1)V.vf.l1.rotation.x=Math.sin(t*6)*.12*j;
 const fv=Math.tan(42*Math.PI/360),asp=W/H,need=(Math.max(120,(v.ch.length>1?100:80))/(fv*Math.min(asp,2)))*1.15,vn=75/fv,zoom=Math.min(1,t/1.2),e=1-Math.pow(1-zoom,3),dist=Math.max(230,need,vn)*(1.5-.5*e);
 vcam.aspect=asp;vcam.updateProjectionMatrix();vcam.position.set(Math.sin(t*.45)*24*e,95+25*(1-e),30+dist);vcam.lookAt(0,38,30);
 ren.render(vsc,vcam);if(t>=8&&!v.ok)vicEnd()};
/* anti-travamento (assistindo amigo): a tela de vitoria sempre termina e libera o menu, mesmo se uma cena der erro */
{const _vsA=vicStart;vicStart=function(T){const r=_vsA.apply(this,arguments);try{const v0=G&&G.vic;if(v0)setTimeout(()=>{try{if(G&&G.vic===v0&&!v0.ok)vicEnd()}catch(e){console.error(e)}},12000)}catch(e){}return r}}
{const _vdA=vicDraw;vicDraw=function(){try{return _vdA.apply(this,arguments)}catch(e){console.error('vicDraw',e);try{vicEnd()}catch(e2){console.error(e2)}}}}
{const _vbA=vicBoard;vicBoard=function(){try{return _vbA.apply(this,arguments)}catch(e){console.error('vicBoard',e);try{$('vsb').classList.add('hide');$('end').classList.remove('hide')}catch(e2){}}}}
})();

