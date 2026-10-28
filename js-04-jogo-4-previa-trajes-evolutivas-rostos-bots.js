/* ===== PRE-VISUALIZACAO DE SKIN 3D: usa o personagem, arma, tiros e efeitos reais do jogo ===== */
const PVS=[{n:'Introdução',d:4,x:'O personagem entra em cena segurando a arma com a skin.'},{n:'Idle',d:4,x:'A arma parada, como fica na mão durante a partida, com os efeitos de "segurando" da skin.'},{n:'Tiro',d:5,x:'Os tiros da skin saindo da arma contra um alvo, com o efeito de impacto que aparece na partida.'},{n:'Recarga',d:5,x:'A mesma animação de recarga que acontece no meio da partida.'},{n:'Efeito Final',d:6,x:'O efeito de eliminação da skin: o que aparece quando você abate um inimigo.'}],PVT=24,PVO=[0,4,8,13,18];
let pv=null;
const pvE=v=>1-Math.pow(1-Math.min(1,Math.max(0,v)),3);
/* impacto: mesmos efeitos do hitFx do jogo, por skin (d=pontos s=estilhacos b=raio st=estrela r=anel f=chama sl=corte) */
const PVH={1:[['d',9,70,95,.55],['f']],2:[['s',6,18,34,'#fff2e6'],['d',5,60,20,.5]],3:[['b',40,3],['b',34,3],['d',6,90,30,.4]],4:[['st',6],['st',5],['d',7,70,70,.6]],5:[['d',9,40,35,.8]],6:[['d',9,90,-55,.55,38]],7:[['d',7,35,60,.8],['r',18,8,'#ffd2aa']],8:[['d',10,55,-22,1,44]],9:[['b',60,4],['b',50,4],['b',42,3],['d',5,110,10,.3,38,['#fff27a','#ffffff']]],10:[['d',9,90,60,.6]],11:[['d',9,50,-18,.9,44]],12:[['d',13,110,-10,.8,40]],13:[['d',10,80,15,.7,26]],14:[['sl'],['d',5,70,10,.4]],15:[['s',5,16,30,'#ffffff'],['st',6],['d',4,60,30,.5]],16:[['d',7,32,40,.9,34,['#c9ced8','#ffffff']],['r',14,6,'#e0b060']],17:[['st',6],['st',5],['st',4],['d',6,45,20,.8]],18:[['d',8,50,55,.7],['r',16,10]],19:[['d',9,60,105,.7],['f'],['f']],20:[['d',7,22,28,1.1,36]],21:[['d',8,40,20,.35],['s',3,14,26]],22:[['d',11,100,80,.7],['f'],['f'],['r',22,10,'#ff2a2a'],['sl','#ff3030']],23:[['d',8,90,40,.6,34,['#2dffb0','#ffd23b']],['s',5,18,34,'#2dffb0'],['r',18,10,'#ffd23b']],24:[['st',8],['st',6],['st',5],['r',20,12,'#fff3a0'],['d',9,50,-24,1,48,['#ffffff','#fff3a0','#ffca9a']]],25:[['sl','#7dffb0'],['sl','#ffffff'],['d',9,60,70,.9,36,['#7dffb0','#2a8a5a','#ffffff']],['r',16,8,'#7dffb0']],27:[['d',8,60,40,.8,34,['#7dffcf','#7a8cff','#d9a8ff']],['r',16,10,'#7dffcf'],['st',5]],28:[['b',30,4],['b',26,4],['d',8,80,10,.35,34]],29:[['d',12,95,30,.6,30],['r',12,4,'#ffe14a']],30:[['s',5,16,30,'#ffb02e'],['r',18,6,'#ff6a1f'],['st',6],['d',6,60,50,.7]]};
const pvMat=c=>pv.mc[c]||(pv.mc[c]=new THREE.MeshBasicMaterial({color:c}));
function pvP(x,y,z,vx,vy,vz,l,s,c){if(pv.pp.length>150)return;const m=new THREE.Mesh(BG,pvMat(c));m.position.set(x,y,z);m.scale.setScalar(s);pv.scn.add(m);pv.pp.push({m,vx,vy,vz,l,m0:l,s})}
function pvS(a,b,c,l,w){if(pv.pp.length>150)return;const m=new THREE.Mesh(BG,pvMat(c)),len=Math.hypot(b[0]-a[0],b[1]-a[1],b[2]-a[2])||1;m.position.set((a[0]+b[0])/2,(a[1]+b[1])/2,(a[2]+b[2])/2);m.scale.set(w,w,len);m.lookAt(b[0],b[1],b[2]);pv.scn.add(m);pv.pp.push({m,l,m0:l,s:w,seg:1})}
function pvHit(x,z,id){const P=SK[id].p2||['#fff'],R=Math.random,rr=(a,b)=>a+R()*(b-a),pick=()=>P[R()*P.length|0],S=(a,b,c,l)=>pvS(a,b,c,l,1.6);
const O={d:(n,sp,u,l,h0,cs)=>{for(let i=0;i<n;i++){const an=R()*6.283,v=rr(sp*.3,sp);pvP(x,h0||34,z,-Math.abs(Math.cos(an))*v,u*.6,Math.sin(an)*v,rr(l*.7,l),2.6,cs?cs[R()*cs.length|0]:pick())}},
f:()=>{const rx=x+rr(-10,10),rz=z+rr(-10,10);S([rx,24,rz],[rx+rr(-4,4),24+rr(26,44),rz+rr(-4,4)],pick(),.35)},
s:(n,l0,l1,c)=>{for(let k=0;k<n;k++){const an=R()*6.283,d0=rr(4,10),d1=rr(l0,l1),hh=rr(30,50);S([x+Math.cos(an)*d0,hh,z+Math.sin(an)*d0],[x+Math.cos(an)*d1,hh+rr(-6,10),z+Math.sin(an)*d1],c||pick(),.28)}},
b:(len,sg)=>{const an=R()*6.283,d=len/sg;let px=x,pz=z,ph=38,q=[x,ph,z];for(let k=0;k<sg;k++){const aa=an+rr(-.9,.9);px+=Math.cos(aa)*d;pz+=Math.sin(aa)*d;ph=Math.max(8,ph+rr(-9,9));S(q,[px,ph,pz],pick(),.22);q=[px,ph,pz]}},
st:r=>{const hh=rr(34,54),ox=x+rr(-14,14),oz=z+rr(-14,14);S([ox-r,hh,oz],[ox+r,hh,oz],pick(),.3);S([ox,hh-r,oz],[ox,hh+r,oz],pick(),.3)},
r:(r,n,c)=>{let q=null;for(let k=0;k<=n;k++){const an=k/n*6.283,w=[x+Math.cos(an)*r,26,z+Math.sin(an)*r];if(q)S(q,w,c||pick(),.3);q=w}},
sl:c=>{const an=R()*6.283,ca=Math.cos(an)*22,sa=Math.sin(an)*22;S([x-ca,62,z-sa],[x+ca,22,z+sa],c||'#ffffff',.25);S([x-sa,58,z+ca],[x+sa,26,z-ca],c||pick(),.25)}};
for(const o of (PVH[id]||[['d',8,90,50,.5]]))O[o[0]](...o.slice(1))}
function pvSw(fn){const p=pv,og=G,ow=gw,oc=cam3,os=shk;G=p.g;gw=p.gw;cam3=p.cam;try{fn()}catch(e){}finally{G=og;gw=ow;cam3=oc;shk=os}}
function pvShoot(){const p=pv,f=p.f,w=WP[p.id],E=!!SK[p.sk].ev,n=w.pel?3:1;f.cd=Math.max(.3,Math.min(.7,w.cd||.4));snd(170+Math.random()*50,.07,'square',.04,-90);
for(let i=0;i<n;i++){const c=new THREE.Mesh(BG,p.bc),o=new THREE.Mesh(BG,p.bh),IC=SK[p.sk].fx=='evIce',GDG=SK[p.sk].fx=='evGold',ts=2.6*(E?(IC?1.9:GDG?.9:SK[p.sk].fx=='evToxic'?1.2:1.5):1),L=30*(E?(IC?31.5/30:GDG?1.6:SK[p.sk].fx=='evToxic'?1.2:1.4):1);c.scale.set(ts,ts,L*.7);o.scale.set(ts*2.4,ts*2.4,L*1.2);c.rotation.y=o.rotation.y=Math.PI/2;p.scn.add(c);p.scn.add(o);p.bl.push({c,o,x:p.mz.x,y:p.mz.y,z:p.mz.z+(n>1?(i-1)*5:0)})}}
function pvKill(){const p=pv,k=SK[p.sk];p.bd.visible=false;if(k.ev&&k.fx)pvSw(()=>mythFx(p.tx,p.mz.z,p.sk));else for(let i=0;i<16;i++){const an=Math.random()*6.283,v=30+Math.random()*80;pvP(p.tx,p.mz.y,p.mz.z,Math.cos(an)*v,Math.random()*60,Math.sin(an)*v,.6,3,(k.p2||['#fff'])[i%(k.p2||[1]).length])}}
function pvFighter(id,sk){const f={ch:0,isP:false,col:'#ffd93b',i:0,bpq:null,brs:null,cl:null,ws:[id,0],cur:0,mg:[WP[id].mag,0],res:[99,99,99,99],vx:0,vy:0,jh:0,rl:0,rlw:0,cd:0,fl:0,hl:null,dn:0,st:'ground',rev:0,adsK:0,bsm:{}};f.bsm[id]=sk;f.mesh=mkMesh(f);return f}
function pvPose(dt){const p=pv,f=p.f;try{pose(f,p.g,dt,false,0)}catch(e){try{pose0(f,p.g,dt,false,0)}catch(e2){if(!f.gun.children.length)try{setGun(f,p.id,p.sk)}catch(e3){}}}
const q=f.gun.position;if(!isFinite(q.y+q.z+f.gun.rotation.x)){f.gun.position.set(7,35,12);f.gun.rotation.set(0,0,0);f.a1.rotation.set(-1.05,0,.45);f.a2.rotation.set(-1.5,0,-.15)}}
function pvCam(){const p=pv,s=p.sc,c=p.cam,tx=p.tx;let a;if(s==2){const cx=tx/2;a=[cx,60,Math.max(210,tx*1.25),cx,50,0]}else if(s==4){const cx=tx*.55;a=[cx,100,430,cx,78,0]}else a=[66,62,170,12,52,0];c.position.set(a[0],a[1],a[2]);c.lookAt(a[3],a[4],0)}
function pvGo(sc,t){const p=pv,f=p.f,k=SK[p.sk],w=WP[p.id];p.sc=sc;p.t=t;p.fk={};p.dirty=1;p.sh=0;f.rl=0;f.cd=0;f.kk=0;f.mt=0;f.fl=0;f.pcd=0;
if(sc==3){f.rl=Math.max(1.2,Math.min(2.6,w.rl||1.5));p.rp=0}
for(const e of p.pp)p.scn.remove(e.m);p.pp.length=0;for(const b of p.bl){p.scn.remove(b.c);p.scn.remove(b.o)}p.bl.length=0;for(const e of p.g.fx){p.gw.remove(e.grp);for(const m of e.ms)m.material.dispose()}p.g.fx.length=0;
p.bd.visible=sc==2||sc==4;p.bd.rotation.z=0;p.bw=0;pvCam();
document.querySelectorAll('#pvth button').forEach((b,i)=>b.classList.toggle('on',i==sc));
const d=$('pvdd');if(d)d.innerHTML='<b>'+(sc+1)+'. '+PVS[sc].n+'</b><br>'+PVS[sc].x;
$('pvov').innerHTML=[ '<div class="pvon" style="animation-delay:1.4s">'+esc(k.n.toUpperCase())+'</div><div class="pvos" style="animation-delay:1.7s;color:'+RCOL[k.ra]+'">'+RAR[k.ra]+' · '+w.n+'</div>','<div class="pvos">'+w.n+'</div>','<div class="pvos">Alvo de treino</div>','<div class="pvon">RECARREGANDO</div>',k.fx?'<div class="pvon">EFEITO DE ELIMINAÇÃO</div>':'<div class="pvos">Esta skin não tem efeito de eliminação</div>'][sc]}
function pvSim(dt){const p=pv,f=p.f,w=WP[p.id],t=p.t,sc=p.sc;p.clk+=dt;p.g.t=p.clk;f.cd=Math.max(0,f.cd-dt);
if(sc==0){const e=pvE(t/1.6);f.mesh.rotation.y=Math.PI/2-(1-e)*3.2;f.mesh.scale.setScalar(.4+.6*e)}else{f.mesh.rotation.y=Math.PI/2;f.mesh.scale.setScalar(1)}
if(sc==2||sc==4){p.sh-=dt;if(p.sh<=0&&(sc==2||(t>.2&&!p.fk.s))){p.fk.s=1;p.sh=Math.max(.3,Math.min(.7,w.cd||.4));pvShoot()}}
if(sc==3){const RL=Math.max(1.2,Math.min(2.6,w.rl||1.5));if(f.rl>0){f.rl-=dt;if(f.rl<=0)p.rp=.35}else{p.rp-=dt;if(p.rp<=0){f.rl=RL;snd(300,.05,'square',.03,120)}}}
pvPose(dt);if(sc==0)f.mesh.position.y+=(1-pvE(t/1.6))*45;try{gfxUpd(f,p.clk)}catch(e){}
for(let i=p.bl.length-1;i>=0;i--){const b=p.bl[i];b.x+=800*dt;b.c.position.set(b.x,b.y,b.z);b.o.position.copy(b.c.position);if(SK[p.sk].ev&&Math.random()<.6)pvP(b.x-10,b.y,b.z,0,Math.random()*20,0,.4,2,(SK[p.sk].p2||['#fff'])[i%2]);
if(b.x>=p.tx-3){p.scn.remove(b.c);p.scn.remove(b.o);p.bl.splice(i,1);pvHit(p.tx-3,b.z,p.sk);p.bw=1;snd(260,.06,'triangle',.04,-120);if(sc==4&&!p.fk.k){p.fk.k=1;pvKill()}}}
p.bd.rotation.z=Math.sin(p.clk*40)*p.bw*.08;p.bw=Math.max(0,p.bw-dt*4);
for(let i=p.pp.length-1;i>=0;i--){const e=p.pp[i];e.l-=dt;if(e.l<=0){p.scn.remove(e.m);p.pp.splice(i,1);continue}const k=e.l/e.m0;if(e.seg){e.m.scale.x=e.m.scale.y=e.s*k}else{const dg=Math.pow(.93,dt*60);e.vx*=dg;e.vz*=dg;e.m.position.x+=e.vx*dt;e.m.position.y=Math.max(1,e.m.position.y+e.vy*dt);e.m.position.z+=e.vz*dt;e.m.scale.setScalar(e.s*(.3+.7*k))}}
if(p.g.fx.length)pvSw(()=>fxUpd(dt))}
function pvTick(ts){const p=pv;if(!p)return;p.raf=requestAnimationFrame(pvTick);if(document.hidden)return;if(!p.last)p.last=ts-16.7;const d0=Math.min(.1,(ts-p.last)/1000);if(d0<=0)return;p.last=ts;const dt=p.dt=p.dt?p.dt*.75+Math.min(.05,d0)*.25:Math.min(.05,d0);
if(p.play||p.dirty){p.dirty=0;if(p.play){p.t+=dt;const d=PVS[p.sc].d;if(p.t>=d){if(p.loop)pvGo(p.sc,0);else if(p.sc<4)pvGo(p.sc+1,0);else{p.t=d;p.play=false}}}try{pvSim(p.play?dt:.001)}catch(e){}p.ren.render(p.scn,p.cam)}
const g=PVO[p.sc]+p.t,f=s=>Math.floor(s/60)+':'+String(Math.floor(s%60)).padStart(2,'0');const pc=(g/PVT*100).toFixed(1)+'%',tx=f(g)+' / '+f(PVT);if(p.pc!==pc){p.pc=pc;$('pvfi').style.width=pc;$('pvkn').style.left=pc}if(p.tx0!==tx){p.tx0=tx;$('pvtm').textContent=tx}}
function pvTh(){const T=$('pvth');T.innerHTML='';PVS.forEach((s,i)=>{const b=document.createElement('button');b.innerHTML='<i>'+['<svg class="ic"><use href="#i-sparkle"/></svg>','<svg class="ic"><use href="#i-gem"/></svg>','<svg class="ic"><use href="#i-target"/></svg>','<svg class="ic"><use href="#i-timer"/></svg>','<svg class="ic"><use href="#i-bolt"/></svg>'][i]+'</i><b>'+(i+1)+'</b><span>'+s.n+'</span>';b.onclick=()=>{pv.play=true;pvGo(i,0)};T.appendChild(b)})}
function pvIsEq(){const p=pv,k=SK[p.sk];return p.ctx=='arm'?EQ[p.id]==p.sk:k.ev?EQ[k.w]==p.sk:EQ[p.id]==p.sk}
function pvRef(){if(!$('arm').classList.contains('hide'))armR();if(!$('shop').classList.contains('hide'))shopR();pvUI()}
function pvUI(){const p=pv,k=SK[p.sk],id=p.id,w=WP[id],ev=!!k.ev,own=OWN.includes(p.sk),eq=pvIsEq(),mx=ivMx(),ra=RCOL[k.ra],oc=own?'#7dff6a':'#ff8a8a';
$('pvti').textContent='Pré-visualização - Skin '+k.n;$('pvsb').textContent=w.n+(ev?' · Evolutiva':'');
const bar=(l,v,m,tx)=>'<div class="pvst"><span>'+l+'</span><i><b style="width:'+Math.min(100,v/m*100)+'%"></b></i><em>'+tx+'</em></div>',L=$('pvl');L.innerHTML='';
const cv=skCv(id,p.sk,160,70);cv.style.cssText='width:100%;height:auto;border-radius:8px';L.appendChild(cv);
L.insertAdjacentHTML('beforeend','<div class="pvn">'+esc(k.n)+'</div><div class="pvbd" style="color:'+ra+';border-color:'+ra+'">&#9733; '+RAR[k.ra].toUpperCase()+'</div><div class="pvbd" style="color:'+oc+';border-color:'+oc+'">'+(own?'&#9679; DESBLOQUEADA':'<svg class="ic"><use href="#i-lock"/></svg> BLOQUEADA')+'</div><div class="pvsh">STATUS</div>'+bar('DANO',w.dm*(w.pel||1),mx.d,w.dm+(w.pel?' x'+w.pel:''))+bar('CADÊNCIA',1/w.cd,mx.c,(1/w.cd).toFixed(1)+'/s')+bar('ALCANCE',w.rg,mx.r,w.rg)+'<div class="pvsw"><i style="background:'+k.p[0]+'"></i><i style="background:'+k.p[1]+'"></i></div>');
const fx=(k.d||'').split(/\.\s+|\.$|(?=Segurando:|Tiros:|Ao eliminar:)/).map(s=>s.trim()).filter(Boolean).slice(ev?1:0,ev?7:6),R=$('pvr');
R.innerHTML='<h3>DETALHES DA CUTSCENE</h3><p id="pvdd"></p><h4>EFEITOS</h4><ul class="pvfx">'+fx.map(s=>'<li>'+esc(s)+'</li>').join('')+'</ul>';
const b1=document.createElement('button');b1.className='pvbt'+(p.loop?' on':'');b1.innerHTML='<svg class="ic"><use href="#i-timer"/></svg> REPETIR';b1.onclick=()=>{p.loop=!p.loop;b1.classList.toggle('on',p.loop);if(p.loop){p.play=true;pvGo(p.sc,0)}soon(p.loop?'Repetindo esta cutscene':'Repetição desligada')};
const b2=document.createElement('button');b2.className='pvbt p';
if(eq){b2.innerHTML='<svg class="ic"><use href="#i-check"/></svg> EQUIPADA';b2.disabled=true}
else if(own){b2.innerHTML='<svg class="ic"><use href="#i-check"/></svg> EQUIPAR SKIN';b2.onclick=()=>{if(p.ctx=='arm')EQ[id]=p.sk;else if(k.ev)EQ[k.w]=p.sk;else for(let i=1;i<WP.length;i++)EQ[i]=p.sk;svD();soon(k.n+' equipada');snd(560,.08,'triangle',.05,200);pvRef()}}
else{b2.innerHTML='COMPRAR · '+fmt(ev?k.gm:k.pr)+(ev?' cristais':'');b2.onclick=()=>{if(ev)evBuy(p.sk);else shBuy(0,p.sk);pvRef()}}
R.appendChild(b1);R.appendChild(b2);const d=$('pvdd');d.innerHTML='<b>'+(p.sc+1)+'. '+PVS[p.sc].n+'</b><br>'+PVS[p.sc].x}
function pvOpen(sk,id,ctx){if(pv)pvClose();const k=SK[sk],E=!!k.ev,p=pv={sk,id,ctx,sc:0,t:0,play:true,loop:false,last:0,clk:0,dirty:1,fk:{},pp:[],bl:[],mc:{},geo:[],mt:[],raf:0,sh:0,bw:0,rp:0};
try{
const ren=p.ren=new THREE.WebGLRenderer({antialias:true,powerPreference:'high-performance'});ren.setPixelRatio(Math.min(window.devicePixelRatio||1,1.1));ren.setSize(720,330,false);$('pvst').innerHTML='';$('pvst').appendChild(ren.domElement);
const scn=p.scn=new THREE.Scene();scn.background=new THREE.Color(k.b).multiplyScalar(.28);scn.add(new THREE.HemisphereLight('#ffffff','#6a5a90',.95));const dl=new THREE.DirectionalLight('#fff0d0',.9);dl.position.set(.7,1,.9);scn.add(dl);const pl=new THREE.PointLight(k.b,.9,300);pl.position.set(30,70,50);scn.add(pl);
const fg=new THREE.CircleGeometry(600,20),fm=new THREE.MeshLambertMaterial({color:new THREE.Color(k.b).multiplyScalar(.35)}),fl=new THREE.Mesh(fg,fm);fl.rotation.x=-Math.PI/2;scn.add(fl);
const rg=new THREE.RingGeometry(16,22,24),rm=new THREE.MeshBasicMaterial({color:k.b,side:THREE.DoubleSide}),rn=new THREE.Mesh(rg,rm);rn.rotation.x=-Math.PI/2;rn.position.y=.4;scn.add(rn);p.geo.push(fg,rg);p.mt.push(fm,rm);
p.cam=new THREE.PerspectiveCamera(30,576/264,5,3000);p.gw=new THREE.Group();scn.add(p.gw);p.g={fx:[],pt:[],hl:[],b:[],t:0,p:{x:0,y:0}};
p.bc=new THREE.MeshBasicMaterial({color:E?(k.p2[2]||'#ffffff'):'#fff6c8'});p.bh=new THREE.MeshBasicMaterial({color:E?k.p2[0]:'#ff6a00',transparent:true,opacity:.6,depthWrite:false});p.mt.push(p.bc,p.bh);
p.f=pvFighter(id,sk);p.f.mesh.rotation.y=Math.PI/2;scn.add(p.f.mesh);pvPose(.016);scn.updateMatrixWorld(true);
p.v3=new THREE.Vector3();if(p.f.mf&&p.f.mf.getWorldPosition)p.f.mf.getWorldPosition(p.v3);else p.v3.set(60,40,-7);p.mz={x:p.v3.x,y:p.v3.y,z:p.v3.z};p.tx=Math.round(p.mz.x+130);
const bd=p.bd=new THREE.Group(),bg=new THREE.BoxGeometry(4,60,60),bm=new THREE.MeshLambertMaterial({color:'#d9c9a0'});bd.add(new THREE.Mesh(bg,bm));p.geo.push(bg);p.mt.push(bm);
[[26,'#ffffff',2.2],[18,'#e33030',2.4],[10,'#ffffff',2.6],[4,'#e33030',2.8]].forEach(a=>{const g=new THREE.CircleGeometry(a[0],20),m=new THREE.MeshBasicMaterial({color:a[1]});const o=new THREE.Mesh(g,m);o.rotation.y=-Math.PI/2;o.position.x=-a[2];bd.add(o);p.geo.push(g);p.mt.push(m)});
bd.position.set(p.tx,p.mz.y,p.mz.z);scn.add(bd);
}catch(e){$('pvst').innerHTML='<div style="padding:30px;text-align:center;font-weight:800">Não foi possível iniciar a pré-visualização 3D neste aparelho.</div>';pvClose();soon('Pré-visualização 3D indisponível neste aparelho');return}
const w=$('pvw');w.style.setProperty('--pa',k.b);w.classList.remove('hide');pvUI();pvTh();pvGo(0,0);try{pvSim(.001);p.ren.render(p.scn,p.cam)}catch(e){}p.raf=requestAnimationFrame(pvTick)}
function pvClose(){const p=pv;if(!p){$('pvw').classList.add('hide');return}cancelAnimationFrame(p.raf);pv=null;try{for(const e of p.pp)p.scn.remove(e.m);for(const e of p.g.fx)for(const m of e.ms)m.material.dispose();for(const c in p.mc)p.mc[c].dispose();p.geo.forEach(g=>g.dispose());p.mt.forEach(m=>m.dispose());if(p.f&&p.f.ms)p.f.ms.forEach(m=>m.dispose());p.ren.dispose();if(p.ren.forceContextLoss)p.ren.forceContextLoss();p.ren.domElement.remove()}catch(e){}$('pvw').classList.add('hide')}
$('pvcl').onclick=pvClose;document.addEventListener('keydown',e=>{if(pv&&e.key=='Escape')pvClose()});
$('pvpl').onclick=()=>{if(!pv)return;if(pv.sc==4&&pv.t>=PVS[4].d-.01)pvGo(0,0);pv.play=true};$('pvpa').onclick=()=>{if(pv)pv.play=false};
$('pvcam').onclick=()=>{const p=pv;if(!p)return;p.ren.render(p.scn,p.cam);p.ren.domElement.toBlob(b=>{if(!b)return;const a=document.createElement('a');a.href=URL.createObjectURL(b);a.download='skin-'+SK[p.sk].n.replace(/\s+/g,'-')+'.png';a.click();setTimeout(()=>URL.revokeObjectURL(a.href),2000);soon('Imagem salva')})};
{const bar=$('pvbar'),sk=e=>{if(!pv)return;const r=bar.getBoundingClientRect(),g=Math.min(.999,Math.max(0,(e.clientX-r.left)/r.width))*PVT;let s=4;for(let i=0;i<5;i++)if(g<PVO[i]+PVS[i].d){s=i;break}pvGo(s,g-PVO[s])};bar.onpointerdown=e=>{bar.setPointerCapture(e.pointerId);bar._d=1;sk(e)};bar.onpointermove=e=>{if(bar._d)sk(e)};bar.onpointerup=()=>{bar._d=0}}

document.querySelectorAll('[data-close]').forEach(b=>b.onclick=()=>$(b.dataset.close).classList.add('hide'));
function applyNick(n){PN=n;try{localStorage.setItem('arr_pn',n)}catch(e){}pfShow()}
function pfShow(){$('pfn').textContent=PN;try{let e=$('pfu');if(!e){e=document.createElement('div');e.id='pfu';e.style.cssText='text-align:center;font-size:12px;opacity:.75;margin:4px 0';$('pfin').before(e)}e.textContent=window.ARR_USER?'Usuário de login: @'+window.ARR_USER+' (o nick abaixo é o que todos veem)':''}catch(x){}}
function pfSave(){const v=pnClean($('pfin').value);if(v.length<2){$('pfmsg').textContent='O nome precisa ter pelo menos 2 letras';return}if(v.toLowerCase()=='voce'){$('pfmsg').textContent='Nick indisponível';return}
if(window.ARR_USER){if(v===PN){$('pfmsg').textContent='';$('pfp').classList.add('hide');return}$('pfmsg').textContent='Salvando...';
window.arrSetNick(v).then(r=>{if(r==='taken')$('pfmsg').textContent='Esse nick já está em uso';else if(r){applyNick(v);$('pfmsg').textContent='';$('pfp').classList.add('hide');soon('Nick alterado para '+PN);try{window.ARR_NET&&window.ARR_NET.lbSend({k:'hi',n:PN,s:1})}catch(e){}try{window.arrPub&&window.arrPub()}catch(e){}}else $('pfmsg').textContent='Falha ao salvar. Tente de novo'});return}
PN=v;try{localStorage.setItem('arr_pn',PN)}catch(e){}pfShow();$('pfmsg').textContent='';$('pfp').classList.add('hide');soon('Nome alterado para '+PN)}
$('prof').onclick=()=>ppOpen(ppMe());
$('pfok').onclick=pfSave;$('pfin').onkeydown=e=>{if(e.key=='Enter')pfSave()};pfShow();
let CH=+(ls('arr_ch')||0);if(CH<0||CH>11)CH=0;
/* ===== SISTEMA DE TRAJES (trajes): conjunto que muda a aparencia do personagem ===== */
const TRAJES=[{id:'',n:'Padr\u00e3o',d:'Visual original do personagem.'},{id:'oni',n:'Oni de Sangue',d:'Armadura samurai de sangue, m\u00e1scara Oni cobrindo a metade de baixo do rosto, chifres de sangue coagulado, capa rasgada e gotas de sangue. Os olhos e o rosto do personagem continuam os dele.'},{id:'reaper',n:'Ceifador Espectral',d:'Capuz enorme rasgado com cr\u00e2nio de fogo azul, manto aberto mostrando as costelas com almas presas, bra\u00e7os de esqueleto e foice gigante nas costas. O cr\u00e2nio substitui o rosto do personagem.'},{id:'witch',n:'Bruxo/Bruxa',d:'Conjunto de bruxo: chap\u00e9u pontudo, capa e t\u00fanica roxa com detalhes dourados. Mant\u00e9m o rosto e a cor de pele do personagem.'},{id:"knight",n:"Cavaleiro Dourado",d:"Armadura dourada completa com elmo fechado e viseira, pluma vermelha, capa real, espada nas costas e ombreiras com espinhos. O elmo cobre todo o rosto do personagem."},{id:"dragon",n:"Drag\u00e3o Infernal",d:"M\u00e1scara e armadura de drag\u00e3o com chifres longos, asas de membrana em chamas, cauda espinhosa, garras e brasas no ar. A cabe\u00e7a de drag\u00e3o substitui o rosto do personagem."},{id:"astro",n:"Astronauta C\u00f3smico",d:"Traje espacial branco e laranja com capacete de vidro (o rosto aparece atr\u00e1s do vidro), mochila de oxig\u00eanio, painel luminoso no peito, antena e planetinhas girando ao redor."},{id:"cyber",n:"Cyber Neon",d:"Jaqueta tecnol\u00f3gica preta com linhas de neon ciano e rosa, viseira luminosa, m\u00e1scara com respiros, bra\u00e7o rob\u00f3tico, cabelo rosa neon e disco hologr\u00e1fico girando nas costas."}];
let TRX={};try{TRX=JSON.parse(localStorage.getItem('arr_skins')||'{}')||{}}catch(e){TRX={}}
const TJC={witch:{sh:'#4b2a7a',lc:'#39312b'},oni:{sh:'#191817',lc:'#191817'},reaper:{sh:'#100f0e',lc:'#100f0e'},knight:{sh:'#e9b824',lc:'#b8860b'},dragon:{sh:'#8c1a12',lc:'#4a0c0a'},astro:{sh:'#eef1f7',lc:'#e3e7ef'},cyber:{sh:'#161a30',lc:'#0f1222'}};
const TJFH={reaper:1,knight:1,dragon:1,astro:1,cyber:1};
const TJQ=[];function trajeReg(o,k,p){if(TJQ.length>400)TJQ.splice(0,100);TJQ.push(Object.assign({w:new WeakRef(o),k},p))}
setInterval(()=>{const t=performance.now()/1000;for(let i=TJQ.length-1;i>=0;i--){const e=TJQ[i],o=e.w.deref();if(!o){TJQ.splice(i,1);continue}
if(e.k=='pulse')o.opacity=.6+.4*Math.sin(t*2.4+e.ph);else if(e.k=='sway')o.rotation.z=Math.sin(t*1.8+e.ph)*e.a;else if(e.k=='flap')o.rotation.x=e.b+Math.sin(t*2+e.ph)*e.a;else if(e.k=='spin')o.rotation.y=t*e.a;else if(e.k=='rise'){const fr=(t*.35+e.ph)%1;o.position.y=e.y0+fr*e.r;o.material.opacity=.4*(1-fr)}else if(e.k=='fall'){const fr=(t*.5+e.ph)%1;o.position.y=e.y0-fr*e.r;o.material.opacity=.55*(1-fr)}else if(e.k=='bob')o.position.y=e.y0+Math.sin(t*2+e.ph)*e.a;else if(e.k=='vis')o.visible=((t*.25+e.ph)%1)<.5;else if(e.k=='wing')o.rotation.z=e.s*Math.sin(t*14)*.7}},45);
/* bots: chance de aparecerem com traje (sorteio fixo por bot na partida; nas salas online usa so o nome, igual para todos) */
const TJBOT=.28;
function trajeBot(f){try{const ok=TRAJES.filter(k=>k.id);if(!ok.length||f.pv)return '';const g=(typeof G!=='undefined'&&G)?G:null;let sd=0;if(g&&!g.room){if(g.__tjs==null)g.__tjs=Date.now()&0xffffff;sd=g.__tjs}
let h=2166136261;for(const c of String(f.name||'')+'|'+(f.i||0)+'|'+f.ch+'|'+sd){h^=c.charCodeAt(0);h=Math.imul(h,16777619)>>>0}
return (h%1000)<TJBOT*1000?ok[(h>>>10)%ok.length].id:''}catch(e){return ''}}
function trajeOf(ch){const q=TRX[ch]||'';return TRAJES.some(k=>k.id===q)?q:''}
function trajeSet(ch,id){if(id)TRX[ch]=id;else delete TRX[ch];try{localStorage.setItem('arr_skins',JSON.stringify(TRX))}catch(e){}}
const CHS=[{n:'Padrao',d:'Sem habilidade'},{n:'Keta',d:'Skatista. Dash com skate para frente e fica invencivel por 2s (recarga 22s). Tecla C ou botao DASH.'},{n:'Rose',d:'Florida. Lanca uma bola de espinhos: 10 de dano, veneno por 2s e lentidao no inimigo (recarga 12s). Tecla C ou botao ESPINHO.'},{n:'Healer',d:'Doutor maluco alquimista. Lanca 3 frascos de cura nos aliados mais proximos (20% da vida) e se cura tambem (recarga 18s). Tecla C ou botao CURA.'},{n:'Black',d:'Vampiro de terno. Lanca morcegos nos inimigos proximos: cada um perde 2 de vida (que voce rouba) e sofre 1 de dano por segundo durante 5s (recarga 16s). Tecla C ou botao MORCEGO.'},{n:'Rider',d:'Engenheiro apaixonado por maquinas. Cria um cachorro mecanico que corre ate o inimigo: causa 10 de dano e marca o inimigo no mapa por 10s, e seus aliados bots vao atras dele (recarga 14s). Tecla C ou botao CAO.'},{n:'Evan',d:'Curandeiro de roupa branca. Cria uma area de cura ao seu redor por 3s: voce e os aliados dentro dela recebem 10 de vida por segundo (recarga 20s). Tecla C ou botao AREA.'},{n:'Taijin',d:'Ninja. Fica invisivel por 5s: inimigos nao veem nem miram em voce. Se atirar, a invisibilidade termina (recarga 18s). Tecla C ou botao SUMIR.'},{n:'Clonos',d:'Robo super inteligente, criado em um experimento do Rider. Cria uma area circular de escudo por 4s: voce e os aliados dentro dela nao tomam dano (recarga 18s). Tecla C ou botao CLONO.'},{n:'Runer',d:'Velocista e corredor. Por 10s: velocidade de movimento +0.5x e o slide percorre o dobro da distancia (recarga 20s). Tecla C ou botao VELOZ.'},{n:'Pumpkin',d:'Fantasma de cabeca de abobora. Ressuscita um aliado caido para lutar ao seu lado com uma aura de Halloween. So pode ser usada 2 vezes por partida. Tecla C ou botao REVIVER.'},{n:'Storm',d:'Mago do trovao. Chama uma tempestade: raios caem do ceu sobre ate 3 inimigos proximos, causando 14 de dano cada (recarga 16s). Tecla C ou botao RAIO.'}];
function chCv2(id,sc){sc=sc||1;const c=document.createElement('canvas');c.width=c.height=240*sc;const q=c.getContext('2d');q.scale(sc,sc);q.lineWidth=5;q.strokeStyle='#0d1a13';const B=(x,y,w,h,f)=>{q.fillStyle=f;q.fillRect(x,y,w,h);q.strokeRect(x,y,w,h)};
if(id==2)B(80,48,78,74,'#ff7ad9');
if(id==1){B(146,96,26,100,'#ffcc00');B(172,106,10,16,'#eee');B(172,170,10,16,'#eee')}
const v4=id==4,nj=id==7,ev=id==6,rb=id==8,ru=id==9,lgc=ru?'#f5cd30':v4||nj?'#1a1a22':ev?'#e9edf5':rb?'#4a566b':'#3b5bdb';if(nj){q.save();q.translate(120,132);q.rotate(.6);B(-6,-92,12,130,'#2d2d38');B(-9,-102,18,16,'#e53935');B(-10,-86,20,6,'#c8a24a');q.restore()}if(ev){q.strokeStyle='#e0a82e';q.beginPath();q.ellipse(119,14,32,9,0,0,7);q.stroke();q.strokeStyle='#0d1a13';B(170,66,8,158,'#c8923a');q.fillStyle='#7dffb0';q.beginPath();q.arc(174,58,15,0,7);q.fill();q.stroke();q.fillStyle='#fff';q.beginPath();q.arc(169,53,4,0,7);q.fill()}B(88,160,28,64,lgc);B(122,160,28,64,lgc);B(78,98,82,66,v4?'#15151c':nj?'#1d1d26':ev?'#f7f9fc':rb?'#2d3b57':ru?'#ff7a1a':'#ffd93b');if(id==3){B(70,118,98,80,'#5b2fb5');B(70,150,98,12,'#6b4a2a');B(80,138,12,18,'#7dff6a');B(114,138,12,18,'#ff7ad9');B(146,138,12,18,'#ff944d')}B(88,40,62,62,v4?'#f1f1f4':rb?'#c9d3e0':'#f5cd30');q.fillStyle=v4?'#e00000':rb?'#ff6600':'#222';q.fillRect(104,66,7,12);q.fillRect(128,66,7,12);q.fillRect(108,86,22,5);
if(id==3){B(84,32,70,22,'#141414');B(88,18,12,18,'#141414');B(112,8,14,28,'#141414');B(138,18,12,18,'#141414');B(94,52,18,14,'#ffba7d');B(126,52,18,14,'#ffba7d')}
if(id==2){B(86,40,66,16,'#ff7ad9');B(84,22,70,26,'#4caf50');B(98,10,42,14,'#4caf50');B(112,2,14,14,'#ff4d8d');B(78,150,82,22,'#ffb3e6');B(94,108,14,14,'#ff4d8d');B(120,124,14,14,'#ff4d8d')}
if(id==1){B(84,24,70,30,'#e53935');B(84,50,70,10,'#fff');B(112,12,14,14,'#fff')}
if(id==4){B(100,100,38,56,'#ffffff');B(114,104,10,46,'#c1121f');B(84,30,70,24,'#ffffff');B(88,16,12,18,'#ffffff');B(112,6,14,28,'#ffffff');B(138,16,12,18,'#ffffff');q.fillStyle='#fff';q.fillRect(112,91,5,9);q.fillRect(122,91,5,9);q.strokeRect(112,91,5,9);q.strokeRect(122,91,5,9)}
if(id==5){B(78,98,82,66,'#e8e2d0');B(84,122,70,42,'#2b5fb5');B(96,100,10,26,'#2b5fb5');B(132,100,10,26,'#2b5fb5');B(100,126,38,22,'#1d4a96');B(112,130,14,8,'#c9ced8');B(78,148,82,14,'#6b4a2a');B(84,150,16,22,'#8a5a30');B(138,150,16,22,'#8a5a30');B(150,100,12,44,'#c9ced8');B(146,92,20,12,'#c9ced8');
B(84,26,70,28,'#ffcc00');B(78,50,82,9,'#ffb300');B(108,12,22,16,'#ffb300');B(110,30,18,10,'#fff');B(84,40,70,8,'#333');B(94,34,20,16,'#555');B(97,37,14,10,'#ffba7d');B(124,34,20,16,'#555');B(127,37,14,10,'#ffba7d');
B(168,190,44,22,'#aab3c0');B(204,174,28,24,'#8d97a4');B(208,164,6,12,'#6b7280');B(226,184,10,10,'#59616d');B(214,180,6,6,'#ff3b3b');B(172,210,8,16,'#444');B(198,210,8,16,'#444');B(158,188,12,6,'#c9ced8');B(180,180,14,12,'#ff8a1f')}
if(id==6){B(66,100,16,50,'#f7f9fc');B(156,100,16,50,'#f7f9fc');B(66,142,16,8,'#e0a82e');B(156,142,16,8,'#e0a82e');B(70,128,98,86,'#f7f9fc');B(70,206,98,8,'#e0a82e');B(70,194,98,6,'#e53935');B(70,166,98,8,'#e0a82e');B(113,136,14,42,'#e53935');B(99,149,42,14,'#e53935');B(88,214,28,10,'#c8923a');B(122,214,28,10,'#c8923a');B(82,24,74,34,'#f7f9fc');B(80,40,12,58,'#f7f9fc');B(146,40,12,58,'#f7f9fc');B(82,50,74,8,'#e53935');B(113,42,12,12,'#35d07f')}
if(id==8){q.fillStyle='rgba(255,186,125,.55)';q.beginPath();q.arc(119,40,28,Math.PI,0);q.fill();q.stroke();q.fillStyle='#ff6fb5';q.beginPath();q.arc(119,32,12,0,7);q.fill();q.stroke();B(140,4,6,26,'#8d97a4');q.fillStyle='#ff6600';q.beginPath();q.arc(143,4,7,0,7);q.fill();q.stroke();B(80,52,10,30,'#ffb36f');B(148,52,10,30,'#ffb36f');B(104,112,32,32,'#2c2825');B(112,120,16,16,'#ff6600');B(78,98,82,10,'#ffd93b');B(88,152,62,10,'#ffd93b')}
if(id==7){B(82,26,74,38,'#16161d');B(82,62,12,26,'#16161d');B(144,62,12,26,'#16161d');B(88,86,62,18,'#16161d');B(82,48,74,10,'#e53935');B(150,46,30,8,'#e53935');B(156,56,26,8,'#e53935');B(94,62,50,24,'#f2c27a');q.fillStyle='#fff';q.fillRect(100,66,14,12);q.fillRect(124,66,14,12);q.fillStyle='#111';q.fillRect(106,68,7,10);q.fillRect(125,68,7,10);B(98,58,18,6,'#16161d');B(122,58,18,6,'#16161d');B(84,98,70,12,'#e53935');B(78,150,82,10,'#e53935')}
if(id==9){B(78,98,14,34,'#f5cd30');B(146,98,14,34,'#f5cd30');B(78,134,14,10,'#ff3b3b');B(146,134,14,10,'#ff3b3b');B(84,148,70,16,'#37302c');B(88,160,28,26,'#37302c');B(122,160,28,26,'#37302c');B(80,212,40,16,'#ffffff');B(118,212,40,16,'#ffffff');B(80,226,40,8,'#ff3b3b');B(118,226,40,8,'#ff3b3b');
q.fillStyle='#ffd93b';q.beginPath();q.moveTo(126,102);q.lineTo(106,128);q.lineTo(119,128);q.lineTo(110,146);q.lineTo(134,118);q.lineTo(121,118);q.closePath();q.fill();q.stroke();
B(84,26,70,26,'#3a2410');B(148,18,24,16,'#3a2410');B(82,50,74,10,'#ff3b3b');B(150,52,28,8,'#ff3b3b');B(156,62,22,8,'#ff3b3b');
q.save();q.strokeStyle='#ffba7d';q.lineWidth=6;q.lineCap='round';for(const [y,x] of [[96,10],[130,0],[164,16]]){q.beginPath();q.moveTo(x,y);q.lineTo(x+46,y);q.stroke()}q.restore()}
if(id==10){B(78,98,82,66,'#3a2470');B(66,100,12,52,'#6a3ad0');B(160,100,12,52,'#6a3ad0');B(78,148,82,14,'#ff9a1f');
q.fillStyle='#2a1458';q.beginPath();q.moveTo(70,160);for(let i=0;i<=6;i++)q.lineTo(70+i*16.5,i%2?204:226);q.lineTo(169,160);q.closePath();q.fill();q.stroke();
q.fillStyle='#ff7a00';q.beginPath();q.roundRect(66,14,106,88,36);q.fill();q.stroke();
q.strokeStyle='#c94a00';q.lineWidth=4;for(const dx of[-30,0,30]){q.beginPath();q.ellipse(119+dx,58,dx?12:10,40,0,0,7);q.stroke()}q.strokeStyle='#0d1a13';q.lineWidth=5;B(112,0,14,18,'#3a6a1a');
q.fillStyle='#ffe14a';q.shadowColor='#ffb02e';q.shadowBlur=14;for(const s of[-1,1]){q.beginPath();q.moveTo(119+s*10,66);q.lineTo(119+s*36,66);q.lineTo(119+s*23,40);q.closePath();q.fill()}
q.beginPath();q.moveTo(86,78);for(let i=0;i<=8;i++)q.lineTo(86+i*8.25,i%2?72:82);q.lineTo(152,94);q.lineTo(86,94);q.closePath();q.fill();q.shadowBlur=0;
q.fillStyle='#b57bff';for(const [x,y,r] of[[40,60,5],[200,90,6],[50,170,4],[196,170,5],[30,120,3]]){q.beginPath();q.arc(x,y,r,0,7);q.fill()}
q.strokeStyle='#ff9a1f';q.lineWidth=4;q.beginPath();q.ellipse(119,228,76,9,0,0,7);q.stroke()}
if(id==11){B(88,160,28,64,'#232b5c');B(122,160,28,64,'#232b5c');B(84,208,36,16,'#241e1a');B(118,208,36,16,'#241e1a');B(78,98,82,66,'#1d3a8a');B(78,96,82,10,'#382e27');B(78,152,82,10,'#382e27');B(112,152,14,10,'#ffe14a');B(60,98,18,50,'#1d3a8a');B(160,98,18,50,'#1d3a8a');B(58,146,22,18,'#e8ecff');B(158,146,22,18,'#e8ecff');
q.fillStyle='#ffe14a';q.beginPath();q.moveTo(126,108);q.lineTo(104,132);q.lineTo(118,132);q.lineTo(108,150);q.lineTo(136,122);q.lineTo(121,122);q.closePath();q.fill();q.stroke();
B(88,40,62,62,'#f5cd30');B(88,52,62,8,'#ff954f');B(113,50,12,12,'#ffe14a');q.fillStyle='#222';q.fillRect(104,68,7,12);q.fillRect(128,68,7,12);q.fillRect(108,88,22,5);
B(86,28,66,20,'#dfe8ff');for(const [x,h] of[[92,22],[112,34],[134,24]]){q.fillStyle='#dfe8ff';q.beginPath();q.moveTo(x,30);q.lineTo(x+10,30-h);q.lineTo(x+20,30);q.closePath();q.fill();q.stroke()}
q.fillStyle='#fff27a';q.shadowColor='#ff954f';q.shadowBlur=14;q.beginPath();q.arc(184,138,10,0,7);q.fill();q.shadowBlur=0}
return c}
const CH3={};let CHR3=null;
function ch3(id,c,skn,ANG){const S=c.width,k=id+'|'+S+'|'+(skn||'')+(ANG===undefined?'':'|'+ANG);let im=(ANG===undefined?CH3[k]:null);if(!im){if(!CHR3){CHR3=new THREE.WebGLRenderer({antialias:false,alpha:true,preserveDrawingBuffer:true});CHR3.setClearColor(0,0)}const r=CHR3;r.setSize(S,S,false);const s=new THREE.Scene();s.add(new THREE.HemisphereLight('#ffffff','#7a6aa8',.95));const d=new THREE.DirectionalLight('#fff0d0',.95);d.position.set(.7,1,.9);s.add(d);const rm=new THREE.DirectionalLight('#b57bff',.55);rm.position.set(-1,.4,-.8);s.add(rm);
const f={ch:id,isP:true,col:'#ffd93b',i:0,bpq:null,cl:null,skn:skn||''},m=mkMesh(f);if(f.pc)f.pc.visible=false;f.a1.rotation.z=-.1;f.a2.rotation.z=.1;m.rotation.y=(ANG===undefined?-.55:ANG);s.add(m);const cm=new THREE.PerspectiveCamera(30,1,5,2000);cm.position.set(0,50,170);cm.lookAt(0,36,0);r.render(s,cm);im=document.createElement('canvas');im.width=im.height=S;im.getContext('2d').drawImage(r.domElement,0,0,S,S);if(ANG===undefined)CH3[k]=im}
let has=true;try{const dt=im.getContext('2d').getImageData(0,0,S,S).data;has=false;for(let i=3;i<dt.length;i+=64)if(dt[i]>8){has=true;break}}catch(e){has=true}
if(!has){delete CH3[k];return}
const q=c.getContext('2d');q.setTransform(1,0,0,1,0,0);q.clearRect(0,0,S,S);q.drawImage(im,0,0)}
function chCv(id,sc,skn){if(skn===undefined)skn=trajeOf(id);const c=chCv2(id,sc);try{ch3(id,c,skn)}catch(e){setTimeout(()=>{try{ch3(id,c,skn)}catch(e2){}},500)}return c}
const CHM=[{c:'Soldado',i:'<svg class="ic"><use href="#i-medal"/></svg>',a:'Sem habilidade',e:'Personagem básico, sem habilidade especial.',cd:0},
{c:'Skatista',i:'<svg class="ic"><use href="#i-skate"/></svg>',a:'Dash',e:'Dash de skate para frente e fica invencível por 2s.',cd:22},
{c:'Florista',i:'<svg class="ic"><use href="#i-rose"/></svg>',a:'Espinhos',e:'Bola de espinhos: 10 de dano, veneno por 2s e lentidão no inimigo.',cd:12},
{c:'Alquimista',i:'<svg class="ic"><use href="#i-flask"/></svg>',a:'Cura',e:'Frascos curam 20% da vida dos 3 aliados mais próximos e a sua.',cd:18},
{c:'Vampiro',i:'<svg class="ic"><use href="#i-bat"/></svg>',a:'Morcegos',e:'Morcegos roubam 2 de vida e causam 1 de dano por segundo durante 5s.',cd:16},
{c:'Engenheiro',i:'<svg class="ic"><use href="#i-paw"/></svg>',a:'Cão mecânico',e:'Causa 10 de dano e marca o inimigo no mapa por 10s; aliados bots vão atrás dele.',cd:14},
{c:'Curandeiro',i:'<svg class="ic"><use href="#i-plus"/></svg>',a:'Área de cura',e:'Você e os aliados na área recebem 10 de vida por segundo durante 3s.',cd:20},
{c:'Ninja',i:'<svg class="ic"><use href="#i-shuriken"/></svg>',a:'Sumir',e:'Fica invisível por 5s. Se atirar, a invisibilidade termina.',cd:18},
{c:'Robô',i:'<svg class="ic"><use href="#i-shield"/></svg>',a:'Escudo clono',e:'Área de escudo por 4s: você e os aliados dentro dela não tomam dano.',cd:18},
{c:'Velocista',i:'<svg class="ic"><use href="#i-bolt"/></svg>',a:'Velocidade',e:'Por 10s: +0.5x de velocidade e o slide percorre o dobro da distância.',cd:20},
{c:'Fantasma Abóbora',i:'<svg class="ic"><use href="#i-skull"/></svg>',a:'Ressurreição',e:'Ressuscita um aliado caído para lutar ao seu lado com aura de Halloween. Só pode ser usada 2 vezes por partida.',cd:0},
{c:'Mago do Trovão',i:'<svg class="ic"><use href="#i-bolt"/></svg>',a:'Tempestade',e:'Raios caem do céu sobre até 3 inimigos próximos, causando 14 de dano cada.',cd:16}];
let chLz=0;
function chCvSafe(id,sc,skn){let c;try{c=chCv2(id,sc)}catch(e){c=document.createElement('canvas');c.width=c.height=240*sc}
if(skn===undefined)skn=trajeOf(id);const dl=(chLz++%14)*40+60;setTimeout(()=>{try{ch3(id,c,skn)}catch(e){}},dl);return c}
let chS=CH,chSk='',chV='l';
function chR(){try{chR0()}catch(e){const g=$('cxgl');if(g)g.innerHTML='<div style="grid-column:1/-1;color:#ff8080;font-size:11px;padding:8px;text-align:left">Erro no menu: '+esc(e&&e.message||e)+'</div>'}}
function chR0(){const gmv=(()=>{try{return gems}catch(e){return 980}})();$('chc2').textContent=fmt(coins);$('chg2').textContent=fmt(gmv);
const L=chV=='l';$('cxl').classList.toggle('hide',!L);$('cxs').classList.toggle('hide',L);
if(L){const g=$('cxgl'),st=g.scrollTop;g.innerHTML='';
CHS.forEach((k,i)=>{const d=document.createElement('button');d.type='button';d.className='cxc'+(i===CH?' eq':'');
d.appendChild(chCvSafe(i,.8));d.insertAdjacentHTML('beforeend','<span class="cxnm">'+esc(i==0?'Padrão':k.n)+'</span>'+(i===CH?'<em class="cxok">✓</em>':''));
d.onclick=()=>{chS=i;chSk=trajeOf(i);chV='s';chR();$('cxt').scrollTop=0;snd(560,.08,'triangle',.05,200)};g.appendChild(d)});g.scrollTop=st;return}
const nm=chS==0?'Padrão':CHS[chS].n,m=CHM[chS],cur=trajeOf(chS);if(!TRAJES.some(k=>k.id===chSk))chSk=cur;
const sk=TRAJES.find(k=>k.id===chSk)||TRAJES[0],eq=CH===chS&&cur===chSk;
$('cxn').textContent=nm;
const pv=$('cxv');pv.innerHTML='';const big=chCvSafe(chS,1.2,chSk);big.className='cxbig';pv.appendChild(big);
$('cxi').innerHTML='<div class="cxh">'+esc(sk.n)+'</div><div class="cxa">'+m.i+' <b>'+esc(m.a||'Sem habilidade')+'</b> · '+esc(m.c)+'</div><div>'+esc(m.e||'')+'</div><div class="cxs2">'+esc(sk.d)+' Só troca a roupa, não altera habilidades.</div>';
const t=$('cxt'),ts=t.scrollTop;t.innerHTML='';
TRAJES.forEach(k=>{const d=document.createElement('button');d.type='button';d.className='cxc'+(k.id===chSk?' sel':'')+(k.id===cur&&CH===chS?' eq':'');
d.appendChild(chCvSafe(chS,.8,k.id));d.insertAdjacentHTML('beforeend','<span class="cxnm">'+esc(k.n)+'</span>'+(k.id===cur&&CH===chS?'<em class="cxok">✓</em>':''));
d.onclick=()=>{chSk=k.id;chR();snd(560,.08,'triangle',.05,200)};t.appendChild(d)});t.scrollTop=ts;
const b=$('cxe');b.innerHTML=eq?'EQUIPADO <svg class="ic"><use href="#i-check"/></svg>':'EQUIPAR';b.disabled=eq;
b.onclick=()=>{CH=chS;try{localStorage.setItem('arr_ch',CH)}catch(e){}trajeSet(chS,chSk);menuChar();chR();soon(nm+(chSk?' · '+sk.n:'')+' equipado');snd(560,.08,'triangle',.05,200)}}
$('cxb').onclick=()=>{chV='l';chR()};
$('chb').onclick=()=>{chS=CH;chSk=trajeOf(chS);chV='l';chR();$('chr').classList.remove('hide')};
let MANG=-.55,MDRAG=null,MRAF=0;
function menuDraw(){MRAF=0;const el=document.querySelector('#stage .char');if(!el)return;const c=el.querySelector('canvas');if(!c)return;try{ch3(CH,c,trajeOf(CH),MANG)}catch(e){}}
function menuChar(){const el=document.querySelector('#stage .char');if(!el)return;el.innerHTML='';MANG=-.55;el.appendChild(chCv(CH,3));
el.style.pointerEvents='auto';el.style.cursor='grab';el.style.touchAction='none';
if(!el.__rot){el.__rot=1;
el.addEventListener('pointerdown',e=>{MDRAG={x:e.clientX,a:MANG};try{el.setPointerCapture(e.pointerId)}catch(_){}el.style.cursor='grabbing';e.preventDefault()});
el.addEventListener('pointermove',e=>{if(!MDRAG)return;MANG=MDRAG.a+(e.clientX-MDRAG.x)*.012;if(!MRAF)MRAF=requestAnimationFrame(menuDraw)});
const end=e=>{MDRAG=null;el.style.cursor='grab'};
el.addEventListener('pointerup',end);el.addEventListener('pointercancel',end);
el.addEventListener('dblclick',()=>{MANG=-.55;menuDraw()})}}
menuChar();


function startL(){if(LD.busy)return;if(TB==2&&!window.frWN&&window.frWarBad){const bad=frWarBad();if(bad.length){soon('Guerra de Cl\u00e3s: s\u00f3 membros do mesmo cl\u00e3 podem jogar. Remova da equipe: '+bad.map(n=>'@'+n).join(', '));return}}LD.busy=1;const n=window.frWN?['ASSISTINDO @'+window.frWN,'C\u00e2mera livre \u00b7 40 jogadores']:TB==4?['SALA \u00b7 '+(SALA.w?'ASSISTINDO':'TREINO'),(SALA.L&&SALA.L.go?SALA.L.lbl:SALA.n+'x'+SALA.n)+' \u00b7 Contra Squad \u00b7 nada conta']:TB==3?['HALLOWEEN CITY','Ondas de zumbis \u00b7 time de 4']:TB==1?['CONTRA SQUAD','4x4 \u00b7 4 rounds para vencer']:TB==2?['GUERRA DE CL\u00c3S',(RM==1?'Contra Squad':'Battle Royale')+' \u00b7 c\u00e2mera livre']:['BR RANQUEADO',MN[MS]+' \u00b7 40 jogadores'];LD.open(n[0],n[1]);LD.set(.04,'Preparando a partida');LD.go(.4,450);setTimeout(()=>{LD.set(.45,'Gerando o mapa');setTimeout(()=>{try{start()}catch(e){LD.busy=0;LD.close();throw e}LD.set(.7,'Posicionando jogadores');setTimeout(()=>LD.st('Preparando o \u00f4nibus'),500);LD.go(1,1100,()=>{LD.set(1,'Pronto!');setTimeout(()=>{LD.close();LD.busy=0},250)})},60)},120)}
$('play').onclick=startL;$('again').onclick=startL;

/* ---------- bots ---------- */
const NDX=[1,-1,0,0,1,1,-1,-1],NDY=[0,0,1,-1,1,-1,1,-1];
function navBuild(){const NC=Math.round(S/50),bl=new Uint8Array(NC*NC),cz=20;
for(const q of G.walls){const i0=Math.max(0,Math.floor((q.x-cz)/50)),i1=Math.min(NC-1,Math.floor((q.x+q.w+cz)/50)),j0=Math.max(0,Math.floor((q.y-cz)/50)),j1=Math.min(NC-1,Math.floor((q.y+q.h+cz)/50));
for(let i=i0;i<=i1;i++){const cx=i*50+25;if(cx<q.x-cz||cx>q.x+q.w+cz)continue;for(let j=j0;j<=j1;j++){const cy=j*50+25;if(cy<q.y-cz||cy>q.y+q.h+cz)continue;bl[j*NC+i]=1}}}
for(let k=0;k<NC;k++){bl[k]=1;bl[(NC-1)*NC+k]=1;bl[k*NC]=1;bl[k*NC+NC-1]=1}
return{NC,bl,gs:new Float32Array(NC*NC),par:new Int32Array(NC*NC),mk:new Int32Array(NC*NC),cs:new Int32Array(NC*NC),st:0}}
function navFree(N,x,y){const NC=N.NC,bl=N.bl,ci=Math.max(0,Math.min(NC-1,Math.floor(x/50))),cj=Math.max(0,Math.min(NC-1,Math.floor(y/50)));if(!bl[cj*NC+ci])return cj*NC+ci;
for(let r=1;r<=10;r++){let best=-1,bd=1e18;for(let di=-r;di<=r;di++)for(let dj=-r;dj<=r;dj++){if(Math.max(Math.abs(di),Math.abs(dj))!=r)continue;const i=ci+di,j=cj+dj;if(i<0||j<0||i>=NC||j>=NC||bl[j*NC+i])continue;const d=(i*50+25-x)*(i*50+25-x)+(j*50+25-y)*(j*50+25-y);if(d<bd){bd=d;best=j*NC+i}}if(best>=0)return best}return -1}
function navClear(N,a,b){const NC=N.NC,bl=N.bl,dx=b.x-a.x,dy=b.y-a.y,n=Math.ceil(Math.hypot(dx,dy)/20);for(let k=1;k<=n;k++){const i=Math.floor((a.x+dx*k/n)/50),j=Math.floor((a.y+dy*k/n)/50);if(i<0||j<0||i>=NC||j>=NC||bl[j*NC+i])return false}return true}
function navPath(x0,y0,x1,y1){const N=G.nav||(G.nav=navBuild()),NC=N.NC,bl=N.bl,s=navFree(N,x0,y0),g=navFree(N,x1,y1);if(s<0||g<0)return null;
const gs=N.gs,par=N.par,mk=N.mk,cs=N.cs,st=++N.st,gx=g%NC,gy=(g/NC)|0;
const H=c=>{const dx=Math.abs((c%NC)-gx),dy=Math.abs(((c/NC)|0)-gy);return dx+dy-.586*Math.min(dx,dy)};
const hc=[],hf=[];const push=(c,f)=>{let i=hc.length;hc.push(c);hf.push(f);while(i>0){const p=(i-1)>>1;if(hf[p]<=f)break;hc[i]=hc[p];hf[i]=hf[p];i=p}hc[i]=c;hf[i]=f};
const pop=()=>{const top=hc[0],lc=hc.pop(),lf=hf.pop(),n=hc.length;if(n>0){let i=0;for(;;){let l=2*i+1;if(l>=n)break;if(l+1<n&&hf[l+1]<hf[l])l++;if(hf[l]>=lf)break;hc[i]=hc[l];hf[i]=hf[l];i=l}hc[i]=lc;hf[i]=lf}return top};
mk[s]=st;gs[s]=0;par[s]=-1;push(s,H(s));let best=s,bh=H(s),ex=0,end=-1;
while(hc.length&&ex<14000){const c=pop();if(cs[c]===st)continue;cs[c]=st;ex++;if(c===g){end=c;break}const h=H(c);if(h<bh){bh=h;best=c}const ci=c%NC,cj=(c/NC)|0;
for(let d=0;d<8;d++){const di=NDX[d],dj=NDY[d],i=ci+di,j=cj+dj;if(i<0||j<0||i>=NC||j>=NC)continue;const n=j*NC+i;if(bl[n]||cs[n]===st)continue;if(di&&dj&&(bl[cj*NC+i]||bl[j*NC+ci]))continue;const ng=gs[c]+(di&&dj?1.414:1);if(mk[n]!==st||ng<gs[n]){mk[n]=st;gs[n]=ng;par[n]=c;push(n,ng+H(n))}}}
if(end<0)end=best;const cells=[];for(let c=end;c!==s&&c>=0;c=par[c])cells.push(c);cells.reverse();
const pts=cells.map(c=>({x:(c%NC)*50+25,y:((c/NC)|0)*50+25})),out=[];let a={x:x0,y:y0},i=0;
while(i<pts.length){let j=Math.min(i+14,pts.length-1);while(j>i&&!navClear(N,a,pts[j]))j--;out.push(pts[j]);a=pts[j];i=j+1}return out}
function navDir(f,gx,gy){const dx=gx-f.x,dy=gy-f.y,d=Math.hypot(dx,dy)||1,N=G.nav||(G.nav=navBuild());
if(!(f.nvF>0)&&d<900&&navClear(N,f,{x:gx,y:gy}))return[dx/d,dy/d];
if(!f.np||G.t>f.npT||(Math.hypot(f.npG.x-gx,f.npG.y-gy)>150&&G.t>f.npR)){f.np=navPath(f.x,f.y,gx,gy)||[];f.npi=0;f.npT=G.t+3;f.npR=G.t+.4;f.npG={x:gx,y:gy}}
const p=f.np;while(f.npi<p.length&&Math.hypot(p[f.npi].x-f.x,p[f.npi].y-f.y)<45)f.npi++;
if(f.npi>=p.length)return[dx/d,dy/d];const q=p[f.npi],qd=Math.hypot(q.x-f.x,q.y-f.y)||1;return[(q.x-f.x)/qd,(q.y-f.y)/qd]}
function unstick(f){const N=G.nav||(G.nav=navBuild()),NC=N.NC;let c=-1;for(let k=0;k<14&&c<0;k++){const x=f.x+rr(-170,170),y=f.y+rr(-170,170),n=navFree(N,x,y);if(n>=0&&Math.hypot((n%NC)*50+25-f.x,((n/NC)|0)*50+25-f.y)>60)c=n}if(c<0)c=navFree(N,f.x,f.y);if(c<0)return;
f.x=(c%NC)*50+25;f.y=((c/NC)|0)*50+25;f.vx=0;f.vy=0;f.np=null;f.wt=0;f.nvF=6;boom(f.x,f.y,'#e8e2c0',6,90)}
function steer(f,mx,my){const m=Math.hypot(mx,my);if(m<.05)return[mx,my];const ux=mx/m,uy=my/m,fr=a=>{const c=Math.cos(a),s=Math.sin(a),dx=ux*c-uy*s,dy=ux*s+uy*c;return wallAt(f.x+dx*54,f.y+dy*54)||wallAt(f.x+dx*28,f.y+dy*28)||wallAt(f.x+dx*34-dy*17,f.y+dy*34+dx*17)||wallAt(f.x+dx*34+dy*17,f.y+dy*34-dx*17)?null:[dx,dy]};
let r=fr(0);if(r)return[r[0]*m,r[1]*m];const sg=f.ss||1;for(const a of[.6,1.2,1.9,2.6]){r=fr(a*sg);if(r)break;r=fr(-a*sg);if(r){f.ss=-sg;break}}return r?[r[0]*m,r[1]*m]:[mx,my]}
function downAI(f,dt){f.fa=null;f.rt=null;f.at-=dt;if(f.at<=0){f.at=rr(.2,.4);let b=null,bd=900;for(const o of G.teams[f.tm].m)if(o!==f&&!o.dead&&!(o.dn>0)&&o.st=='ground'){const d=dst(f,o);if(d<bd){bd=d;b=o}}f.cw=b}
let mx=0,my=0;const b=f.cw;if(b&&!b.dead&&!(b.dn>0)){const dx=b.x-f.x,dy=b.y-f.y,d=Math.hypot(dx,dy);if(d>110){mx=dx/d;my=dy/d}}
[mx,my]=steer(f,mx,my);const k=Math.min(1,dt*6);f.vx+=(mx*40-f.vx)*k;f.vy+=(my*40-f.vy)*k}
const SGS=[3,11,12,13],SMS=[2,8,9,10],ARS=[4,14,15,16,17,18,25],PSS=[1,6,7],SNS=[5,19,20,21,22],EXS=[23,24];
const PREF=[[...SGS,...SMS,...ARS,...PSS,...EXS,...SNS,0],[...ARS,...SMS,...EXS,...SGS,...PSS,...SNS,0],[...SNS,...ARS,...EXS,...SMS,...PSS,...SGS,0]];
const inH=(q,h)=>h&&q.x>h.x&&q.x<h.x+h.w&&q.y>h.y&&q.y<h.y+h.h;
function houseExit(h,f){const cx=h.x+h.w/2,cy=h.y+h.h/2,o=[[cx,h.y+12,cx,h.y-140],[cx,h.y+h.h-12,cx,h.y+h.h+140],[h.x+12,cy,h.x-140,cy],[h.x+h.w-12,cy,h.x+h.w+140,cy]];let b=null,bd=1e9;for(const q of o){if(wallAt(q[0],q[1]))continue;const d=Math.hypot(q[0]-f.x,q[1]-f.y);if(d<bd){bd=d;b=q}}if(!b)return[{x:cl(cx+rr(-60,60),100,S-100),y:cl(h.y-160,100,S-100)}];return[{x:b[0],y:b[1]},{x:cl(b[2],100,S-100),y:cl(b[3],100,S-100)}]}
function tpG(n){const r=14,gap=34,cols=Math.min(n,5),rows=Math.ceil(n/cols),by=Math.min(H*.5+148,H-20),R=W-80-134,w=cols*gap+12,h=rows*gap+12,bt=by+14;return{r,gap,cols,rows,R,w,h,l:R-w,t:bt-h,b:bt}}
function tbtn(i,n){const g=tpG(n),c=i%g.cols,rw=(i/g.cols)|0;return{x:g.R-6-g.gap/2-(g.cols-1-c)*g.gap,y:g.b-6-g.gap/2-rw*g.gap,r:g.r}}
function teamHit(x,y){if(!fc.tp)return false;const n=G.teams.length,g=tpG(n);if(x<g.l||x>g.R||y<g.t||y>g.b)return false;for(let i=0;i<n;i++){const b=tbtn(i,n);if(Math.hypot(x-b.x,y-b.y)<b.r*1.4){const m=G.teams[i].m.find(o=>!o.dead);if(m){G.spec=m;fc.x=m.x;fc.y=m.y;snd(560,.08,'triangle',.05,200)}return true}}return true}

function pick(a){return a[R()*a.length|0]}
function mateOf(o){const c=G.teams[o.tm].m.filter(a=>a!==o&&!a.isP&&!a.dead&&!(a.dn>0)&&a.st=='ground');return c.length?c[R()*c.length|0]:null}
const DLG=[["{n}, tu almoçou hoje?","Só um pastel, mas tô a mil!","Então corre, que eu tô na farofa."],["Pô {n}, esqueci meu colete em casa.","Mano, aqui é guerra, não é pelada!","Ué, achei que fosse o racha de domingo."],["Se eu morrer, avisa minha mãe.","Ela tá ligando pra ti agora.","Não atende! Finge que tá sem sinal."],["Tá sentindo cheiro de churrasco?","Mano, é a zona queimando!","Eita, eu achei que era almoço de domingo."],["Meu sonho é ganhar e tomar um açaí.","Com granola e leite condensado?","Aí já é premiação demais, véi."],["{n}, viu aquele cara correndo?","Vi, parecia o Bolt de chinelo.","Hahaha, de Havaianas e tudo!"],["Uai, {n}, tá ouvindo uns tiro?","Tô, mas finjo que não pra ficar de boa.","Boa tática, mineiro raiz."],["Quando acabar eu vou dormir três dias.","Sonha alto, segunda tem boleto.","Para, {n}, não me lembra disso!"],["Tá me dando uma fome de pão de queijo.","Com um cafezinho, ô beleza!","Para, senão eu largo tudo e vou lá."],["Eu sou o melhor atirador do bairro.","Do bairro ou do prédio?","Do meu quarto, mas conta."],["Se a gente vencer, eu faço um churrasco.","Com picanha ou só linguiça?","Linguiça. Picanha só em campeonato."],["Meu vizinho joga melhor que a gente.","Aquele que grita de madrugada?","Esse mesmo, ele joga e narra."],["{n}, empresta uma bala?","Bala de bala ou bala de doce?","Dos dois, tô precisando."],["Aqui tá mais perigoso que buzão lotado.","Pior, o buzão pelo menos tem ar.","Tem nada, mano, é só calor."],["Tô suando mais que torcedor em final.","Hahaha, respira e mira!","Respiro, mas o gol continua longe."],["Quem é o craque do time?","Eu, claro, o camisa 10.","Camisa 10 que só perde pênalti."],["Mano, aquele ali parece meu primo.","Vai lá perguntar se é ele.","Tá doido, eu atiro e pergunto depois!"],["{n}, bora dar um rolê aqui perto?","Rolê armado? Gosto disso.","Só leva a coragem, o resto eu pego."],["Minha mira hoje tá na promoção.","Promoção de quê?","Leve dois, acerte nenhum."],["Será que tem Wi-Fi nessa ilha?","Mano, é uma guerra!","Então só 5G pro tiro chegar rápido."],["Eu tô calmo, tô calmo, tô calmo.","Tu tá tremendo, mano.","É o frio. Tô calmo."],["{n}, o que cê vai fazer depois da partida?","Chorar de alegria ou de raiva.","Bora ver qual dos dois vem."],["Meu Deus, olha a quantidade de loot!","Calma, é só uma caixa velha.","Pra mim é o baú do tesouro."],["Se me matarem, eu viro assombração.","Vai assombrar quem, véi?","O cara que me acertar, ué."],["Tu já jogou bola descalço?","Já, e quebrei o dedo.","É a mesma coisa que correr aqui."],["Meu pai disse: cuida da mira, filho.","E tu cuida?","Cuido, mas ela não me escuta."],["Vamos combinar um codinome?","Eu sou a Águia Dourada.","Eu sou o Pão com Ovo."],["Nossa, que sede de guaraná gelado.","Bota na lista de pós-vitória.","Aí eu acerto tudo, pode crer."],["{n}, tô com pressa, tenho novela.","Novela? No meio da guerra?","É a final, mano, não posso perder."],["Qual a senha do Wi-Fi do inimigo?","Mano, não existe Wi-Fi inimigo.","Então por que ele me deu lag?"],["Hoje eu acordei com a corda toda.","Que corda, véi?","Não sei, minha vó que fala."],["Sinto cheiro de vitória no ar.","É o café da tua mãe, rapaz.","Ah, então tá, é de hoje."],["{n}, se eu cair, cuida da minha arma.","Cuido, já gostei dela.","Para de olhar com essa cara!"],["Meu sonho é fazer um ace.","Eu quero só um abate.","Então vamos de metas realistas."],["Hoje o mapa tá mais bonito que feriado.","Feriado de verdade ou emendado?","Emendado, o melhor de todos."],["Ontem fiz uma jogada que nem eu entendi.","Foi sorte ou habilidade?","Foi susto mesmo."],["Eu tô no modo avião.","Como assim, mano?","Não escuto nada, só atiro."],["Aquele cara tá me olhando torto.","Atira primeiro, pergunta depois.","Já atirei, ele nem tava me olhando."],["Cuidado com a grama alta.","Por quê, tem cobra?","Tem inimigo, que é pior."],["Quando eu era criança brincava de polícia e ladrão.","E agora?","Agora é de squad e squad."],["{n}, tu confia em mim?","Confio, mas confio mais na mira.","Ai, essa doeu."],["Tô com saudade da minha cama.","Eu tô com saudade de pão na chapa.","Para, agora deu fome e sono."],["E se a gente perder?","Culpa o lag, ué.","E o lag culpa quem?","O vizinho baixando série, sempre."],["Alguém viu minha coragem?","Deixa lá no último loot.","Vou buscar, me cobre."],["Sabe qual é meu golpe secreto?","Qual?","Correr e rezar."],["Isso aqui tá mais quente que fogão de vó.","Só falta o pão de queijo.","Pronto, de novo a fome!"],["Eu amo ganhar, mas amo mais comemorar.","Comemora com o quê?","Brigadeiro no pote."],["{n}, tu sabe dançar?","Sei, mas só quando ganho.","Então vamo vencer pra ter forró."],["Quem inventou essa zona, hein?","Gente com pouca paciência.","E muita maldade, né?"],["Acho que perdi o foco.","Onde deixou?","Esqueci, mas era azul."],["Tô com cara de quem vai ganhar, né?","Tá com cara de quem comeu coxinha.","Também, e foi das boas."],["{n}, para de rir, vão escutar a gente.","Não tô rindo, o capacete apertou.","Capacete que ri? Que tecnologia!"],["Vou abrir uma barraquinha de tapioca.","Aqui, no meio do campo?","Cliente é o que não falta."],["Aprendi uma coisa hoje.","O quê?","Correr de bala emagrece rápido."],["Esse jogo tem mais drama que novela das nove.","Pior, ninguém combina o final.","O final é: quem sobrar, ganha."],["Já ouviu falar do Super Bot?","Quem é esse?","Sou eu, só falta a capa."],["Não se mexe, que vão te ver.","Mas tô com cócegas!","Aguenta firme, soldado."],["{n}, empresta a mira?","Mira não é de empréstimo.","Poxa, vou ter que acertar sozinho."],["Chegou a hora de ser herói.","Quem vai ser o herói?","Tu, que eu fico olhando."],["Se isso fosse filme, eu seria o protagonista.","Tu seria o figurante que cai no início.","Respeita meu espaço, véi!"]];
const KLL=["Peguei um!","Caiu mais um!","Boa, derrubei!","Acertei em cheio!","Mais um pro saco!","Eliminei, bora!","Esse não atira mais!","Tá no chão!","Show de bola!","Derrubei o cara!","Um a menos!","Foi fácil demais!","Agora só falta o resto!","Tô on fire!","Quem é o próximo?"];
const HLL=["Me curando, cobre aí!","Usando kit, segura!","Tô me curando!","Bandagem rápida, cobre!","Preciso de vida, já volto!","Só um minuto, curando!","Cobre meu flanco que tô curando!","Curando, não me deixa sozinho!","Tô quase morrendo, curando!","Vida baixa, cuidando disso!","Já tô melhorando!","Quase lá, curando!"];
const ZNL=["A zona tá fechando, bora!","Corre pra zona!","A zona tá me queimando!","Entra na zona, gente!","Vamos pro centro!","Cuidado com a zona!","A zona vai pegar a gente!","Rápido, zona chegando!","Bora pra dentro da zona!","Tô fora da zona, me espera!","Corre que a zona avança!","Zona fechando, vamos!"];
const LWL=["Tô quase morrendo!","Pouca vida, cobre!","Preciso de cura!","Tô no vermelho!","Vida crítica aqui!","Tô fraco, me ajuda!","Tomei muito dano!","Cuidado, tô no limite!","Quase fui, hein!","Segura eles que eu me curo!"];

function bnm(o){return (o.ctg&&o.cl&&o.bn)?o.bn:o.name}
function chatT(dt){try{const g=G;if(!g||g.cs||!g.teams||!g.p)return;const D=g.dlg;
if(D){if(g.t<D.t0)return;const sp=D.i%2?D.B:D.A,ot=D.i%2?D.A:D.B;
if(D.i>=D.L.length||!sp||sp.dead||sp.dn>0||sp.st!='ground'||sp.tg||ot.dead||ot.dn>0||ot.st!='ground'){g.dlg=null;D.T.chT=g.t+rr(12,26);return}
const q={o:sp,t:D.L[D.i].split('{n}').join(bnm(ot)),a:g.t,b:g.t+4.6,amb:1};q.cb=()=>{if(g.dlg===D)D.t0=Math.min(D.t0,G.t+.3);q.b=Math.max(q.a+1.8,G.t+.5)};
(g.say||(g.say=[])).push(q);D.t0=g.t+4;D.i++;return}
g.cht=(g.cht||0)-dt;if(g.cht>0)return;g.cht=rr(2,4);
const c=cfo(),T=g.teams[c.tm];if(!T||T.m.length<2||g.t<(T.chT||0))return;
const ok=T.m.filter(o=>!o.isP&&!o.dead&&!(o.dn>0)&&o.st=='ground'&&!o.tg&&dst(o,c)<1100);if(ok.length<2)return;
const a=ok[R()*ok.length|0];let b=null,bd=650;for(const o of ok){if(o===a)continue;const d=dst(o,a);if(d<bd){bd=d;b=o}}if(!b)return;
let k=R()*DLG.length|0;if(k===g.lastD)k=(k+1)%DLG.length;g.lastD=k;a.sayB=b.sayB=g.t+9;
g.dlg={A:a,B:b,T,L:DLG[k],i:0,t0:g.t}}catch(e){}}
function say(o,t,d){if(!G||G.cs||!o||o.isP||o.dead||o.dn>0)return;const T=G.teams[o.tm];if(!T||T.m.length<2||G.t<(o.sayB||0))return;o.sayB=G.t+rr(5,9);d=d||0;(G.say||(G.say=[])).push({o,t,a:G.t+d,b:G.t+d+3.2})}
function sayEv(t,s,kn){if(!G||G.cs)return;const m=mateOf(t);if(m)say(m,kn?pick(['Derrubaram o parceiro!','Caiu um nosso!','Vou levantar ele!','Segura, vou reviver!','Cobre que eu vou levantar!','Aguenta aí, parceiro!','Tô indo te levantar!','Não morre, eu chego!','Derrubaram ele, cobre!','Vou buscar ele!']):pick(['Perdemos um, véi!','Caiu o mano!','Droga, perdemos um!','Vamos vingar ele!','Fica esperto que tem cara aí!','Perdemos o parceiro...','Poxa, caiu um!','Vingança nele!','Agora somos menos, cuidado!','Mataram o mano, bora!']),.6);
if(s&&s!==t&&s.tm!==t.tm&&!s.isP){say(s,kn?pick(['Deitei um!','Derrubei!','Caiu um deles!','Já foi um!','Tomei um!']):pick(['Mandei pro lobby!','Já foi um!','Deitei!','Mais um pro chão!','Foi de base!']));const m2=mateOf(s);if(m2&&R()<.6)say(m2,pick(['Boa, pai!','Lindo!','Boa!','É isso!','Jogou muito!','Amassou!']),1.3)}}
function assistAl(s,t){const n=G.t;if(s.asT>n)return;s.asT=n+.6;const a=G.teams[s.tm].m.filter(o=>o!==s&&!o.isP&&!o.dead&&!(o.dn>0)&&o.st=='ground'&&dst(o,s)<1300).slice(0,3);for(const o of a){o.ast=t;o.astU=n+10}if(a.length&&n>(s.asS||0)&&R()<.3){s.asS=n+9;say(a[0],pick(['Tô indo te ajudar!','Mira nele, tô chegando!','Vou te dar suporte!','Tô chegando pra ajudar!','Segura que eu tô indo!','Vou na cobertura!','Bora juntos!','Te cubro daqui!','Segura ele que eu vou!']),1)}}
function alertAl(t,s){const n=G.t;if(t.alT>n)return;t.alT=n+.5;const a=G.teams[t.tm].m.filter(o=>o!==t&&!o.isP&&!o.dead&&!(o.dn>0)&&o.st=='ground'&&dst(o,t)<1300).sort((p,q)=>dst(p,t)-dst(q,t)).slice(0,3);for(const o of a){if(o.hlp!==s||o.hlpU<n)o.hlp=s;o.hlpU=n+10}if(a.length){if(!t.isP)say(t,pick(['Tomei tiro!','Tô tomando!','Me ajuda aqui!','Tô sendo focado!','Eita, tão atirando em mim!']));say(a[0],pick(['Segura que tô indo!','Tô te cobrindo!','Aguenta!','Tô chegando!','Fica atrás que eu cubro!']),1)}}
function reviverOf(o){const P=G.p;if(P&&P.rt===o&&!P.dead)return P;
const v=o.rvr;if(v&&o.rvrU>G.t&&!v.dead&&!(v.dn>0)&&v.st=='ground'&&!v.isP&&(v.rvx||0)<=G.t&&!(v.vs&&G.t<v.vsU))return v;
let b=null,bd=1100;for(const m of G.teams[o.tm].m){if(m.isP||m===o||m.dead||m.dn>0||m.st!='ground'||(m.rvx||0)>G.t||(m.vs&&G.t<m.vsU))continue;const d=dst(m,o);if(d<bd&&o.dn>d/190){bd=d;b=m}}
o.rvr=b;o.rvrU=G.t+.6;return b}
function jdg(b,e){if(b.pj!==e){b.pj=e;b.pm=R()<(b.o.isP?.2:.4)}return b.pm}
function aiLod(f,dt){const g=G;if(g.rk&&!g.cs){const c=(g.room&&!fc.w)?{x:fc.x,y:fc.y}:cfo();if(c&&f!==c&&!f.isP){const d=Math.hypot(f.x-c.x,f.y-c.y);if(d>QV+400){f._ad=(f._ad||0)+dt;f._an=((f._an||0)+1)%(f.tg&&!f.tg.dead?2:3);if(f._an)return;dt=f._ad;f._ad=0}else f._ad=0}}ai(f,dt)}
function ai(f,dt){if(f.dn>0){downAI(f,dt);return}
const wi=f.ws[f.cur]||0,w=WP[wi],has=f.ws[0]!=null||f.ws[1]!=null,Z=G.Z,zt=Z.nx||Z;f.at-=dt;f.lt=(f.lt||0)+dt;f.lst-=dt;f.bant-=dt;f.adsK=(f.adsK||0)+((f.ads?1:0)-(f.adsK||0))*Math.min(1,dt*(w.sc?5:9));
if(f.at<=0){f.at=f.INF?rr(.05,.1):f.yt?rr(.08,.16):rr(.15,.3);
{const hh=G.houses.find(h=>f.x>h.x&&f.x<h.x+h.w&&f.y>h.y&&f.y<h.y+h.h);if(hh){if(!f.inS)f.inS=G.t;if(G.t-f.inS>9&&!f.xq&&!f.tg&&!f.rt&&!(f.dn>0)){f.lvH=hh;f.lvU=G.t+35;f.xq=houseExit(hh,f)}}else f.inS=0;
if(f.xq){if(f.xq.length&&dst(f,f.xq[0])<75)f.xq.shift();if(!f.xq.length)f.xq=null}}
f.tg=nearEnemy(f,w.sc?950:(f.sk>.7?800:650));if(f.vs&&!f.vs.dead&&f.vs.st=='ground'&&!(f.vs.invis>0)&&G.t<f.vsU)f.tg=f.vs;else f.vs=null;if(!f.vs){const oka=q=>q&&!q.dead&&!(q.dn>0)&&q.st=='ground'&&!(q.invis>0)&&q.tm!==f.tm&&dst(f,q)<1600;let hp=null;if(f.ast&&f.astU>G.t&&oka(f.ast))hp=f.ast;else if(f.hlp&&f.hlpU>G.t&&oka(f.hlp))hp=f.hlp;if(hp&&(!f.tg||f.tg===hp||dst(f,hp)<dst(f,f.tg)))f.tg=hp}if(f.tg!==f.pt){f.pt=f.tg;f.lk=rr(.12,.45)*(1.3-f.sk)}f.td=f.tg?dst(f,f.tg):1e9;f.lo=f.tg?los(f,f.tg):0;if(f.tg&&f.lo){f.ls={x:f.tg.x,y:f.tg.y};f.lst=2.5}{if(f.adsT!==f.tg){f.adsT=f.tg;f.adsW=w.sc?1:(R()<.4+f.sk*.55?1:0)}const mn=w.sc?330:230;f.ads=(f.tg&&f.lo&&f.adsW&&wi>0&&!w.pel&&!w.ex&&!f.fle&&!f.hl&&!(f.rl>0)&&f.mg[f.cur]>0&&f.jh==0&&!(f.dash>0)&&!(f.hp<MH*.3&&f.td<450)&&f.td<=w.rg*1.02&&f.td>=(f.ads?mn*.75:mn))?1:0}
let it=null,bd=has?450:1500;for(const q of G.items){if(!has&&q.t!='w')continue;if(f.bant>0&&q===f.ban)continue;if(f.lvU>G.t&&inH(q,f.lvH))continue;if(q.t=='w'&&f.ws[0]!=null&&f.ws[1]!=null&&WR[q.id]<=Math.min(WR[f.ws[0]],WR[f.ws[1]]))continue;if(q.t=='s'&&q.k<=(f.sgk|0))continue;if(q.t=='v'&&f.ar>0)continue;if(q.t=='h'&&f.hm>0)continue;if(Math.abs(q.x-f.x)>bd||Math.abs(q.y-f.y)>bd)continue;const d=dst(f,q);if(d<bd){bd=d;it=q}}f.it=it;f.medG=0;{const nd=f.hp<MH*.85||f.kt+f.bd<2;if(nd&&(!f.tg||f.td>420||f.fle)){let mb=f.fle?4000:f.hp<MH*.5?2200:1400,mi=null;for(const q of G.items){if(q.t!='k'&&q.t!='b')continue;if(q.t=='k'&&f.kt>=3)continue;if(q.t=='b'&&f.bd>=5)continue;if(f.bant>0&&q===f.ban)continue;if(f.lvU>G.t&&inH(q,f.lvH))continue;const d=dst(f,q);if(d<mb){mb=d;mi=q}}if(mi){f.it=mi;f.medG=1}}}if(!f.it&&!f.tg&&has){let cb=1100,ci=null;for(const q of G.items){if(q.t!='c')continue;const d=dst(f,q);if(d<cb){cb=d;ci=q}}if(ci)f.it=ci}if(!f.it&&!f.tg&&!(WP[f.ws[0]||0].gold||WP[f.ws[1]||0].gold)){let ab=null,ad=1600;for(const a of G.ad)if(a.st&&a.has&&a.t<50&&!(a===f.ban&&f.bant>0)){const d=dst(f,a);if(d<ad&&d>30){ad=d;ab=a}}if(ab)f.it={x:ab.x,y:ab.y,fk:ab}}
if(R()<.25)f.sd*=-1;f.rdn=null;f.cvA=null;f.cvT=null;{const T=G.teams[f.tm].m,cvd=o=>T.some(m=>m!==f&&!m.dead&&!(m.dn>0)&&m.st=='ground'&&dst(m,o)<900);
if(!f.isP&&f.rt&&enNear(f,cvd(f.rt)?260:600)){f.rt=null;f.rp=0}
let rd=1100,cd=1200;for(const o of T){if(o===f||o.dead||!(o.dn>0)||o.st!='ground')continue;const v=reviverOf(o);if(!v)continue;const d=dst(f,o);
if(v===f){if(!f.vs&&!enNear(f,cvd(o)?300:600)&&d<rd){rd=d;f.rdn=o}}else if(d<cd){cd=d;f.cvA=o}}
if(f.cvA){let ce=null,ed=900;for(const e of G.f){if(e.tm===f.tm||e.dead||e.dn>0||e.st!='ground')continue;const d=dst(e,f.cvA);if(d<ed){ed=d;ce=e}}f.cvT=ce}}
if(f.INF)infIce(f);else if(f.ic>0&&!(f.icd>0)&&f.dmgT>G.t-.7&&f.dmgS&&!f.dmgS.dead&&!f.hl&&!f.rt&&!(f.icU>G.t)&&R()<.55+f.sk*.45){f.dmgT=-9;throwIce(f,f.dmgS)}
if(f.icU>G.t){if(!f.hl&&(f.kt>0||f.bd>0)&&f.hp<MH*.92)useHeal(f,f.hp<MH*.7&&f.kt>0?'k':'b');if(wi)reload(f)}
if(f.ch==10&&f.hcd<=0&&(f.pxu===undefined||f.pxu>0)&&R()<.04&&G.teams[f.tm].m.some(o=>o!==f&&!o.isP&&o.dead))ability(f);if(f.ch==9&&f.hcd<=0&&((f.tg&&f.td>200&&f.td<900&&R()<.2)||(f.tg&&f.hp<MH*.4&&R()<.5)||(!f.tg&&f.rn>2&&R()<.03)))ability(f);if(f.ch==8&&f.hcd<=0&&f.tg&&f.lo&&f.td<650&&R()<.3)ability(f);if(f.ch==5&&f.hcd<=0&&f.tg&&f.td>180&&f.td<900&&R()<.3)ability(f);if(f.ch==2&&f.hcd<=0&&f.tg&&f.lo&&f.td<550&&R()<.3)ability(f);if(f.ch==4&&f.hcd<=0&&f.tg&&f.td<650&&R()<.3)ability(f);if(f.ch==3&&f.hcd<=0&&(f.hp<MH*.7||G.teams[f.tm].m.some(o=>o!==f&&!o.dead&&!(o.dn>0)&&o.hp<MH*.65&&dst(f,o)<700)))ability(f);if(f.ch==1&&f.hcd<=0&&((f.tg&&f.lo&&f.td<600&&R()<.25)||(f.hp<80&&f.tg&&R()<.5)))ability(f);if(f.ch==6&&f.hcd<=0&&(f.hp<MH*.6||G.teams[f.tm].m.some(o=>!o.dead&&!(o.dn>0)&&o.st=='ground'&&o.hp<MH*.65&&dst(f,o)<200)))ability(f);if(f.ch==7&&f.hcd<=0&&f.tg&&((f.td>260&&f.td<800&&R()<.2)||(f.hp<MH*.4&&R()<.5)))ability(f);if(f.ch==11&&f.hcd<=0&&f.tg&&f.lo&&f.td<600&&R()<.3)ability(f);if(!f.rdn&&((f.tg&&f.hp<MH*.4&&R()<.3)||(!f.tg&&f.rn>2.5&&R()<.04)))slide(f);if(R()<.05&&!f.tg&&!f.rdn)f.pz=rr(.4,.9);if(!f.tg&&!f.it&&f.lst<=0&&has){for(const s of G.sp){if(s.o.tm===f.tm||dst(f,s)>900)continue;f.ls={x:s.x,y:s.y};f.lst=2;break}}
f.sv=null;if(!f.tg&&G.sv&&G.sv.length&&G.teams[f.tm].m.some(o=>o!==f&&(o.dead||o.dn>0))){let b=null,bd=3600;for(const s of G.sv){if(s.cd>0||(s.tm>=0&&s.tm!==f.tm&&s.pg>1))continue;const d=dst(f,s);if(d<bd){bd=d;b=s}}f.sv=b}
f.shp=null;if((!f.tg||f.fle)&&(!f.sv||f.fle)&&G.shops){const mc=f.mc|0,dd=G.teams[f.tm].m.some(o=>o!==f&&(o.dead||o.dn>0));if((dd&&mc>=PR.r)||(f.kt<2&&mc>=PR.k)||(f.bd<2&&f.hp<MH*.8&&mc>=PR.b)){let b=null,bd=4500;for(const s of G.shops){const d=dst(f,s);if(d<bd){bd=d;b=s}}f.shp=b;if(b&&bd<b.r*.8)botBuy(f)}}
if(f.hp<MH*.35&&(f.kt>0||f.bd>0))f.rtr=1;else if(f.hp>=MH*.75||(f.kt<=0&&f.bd<=0))f.rtr=0;
if(G.sala){if(f.hp<MH*.4){if(!f.hurtOn){f.hurtOn=1;if(f.sk0==null)f.sk0=f.sk;f.sk0=Math.min(.95,f.sk0+.04)}f.sk=Math.min(1,f.sk0+.3)}else if(f.hurtOn&&f.hp>=MH*.75){f.hurtOn=0;f.sk=f.sk0}f.fle=0}else if(f.hp<MH*.4&&f.kt+f.bd<=0)f.fle=1;else if(f.hp>=MH*.75||f.kt+f.bd>0)f.fle=0;
if(!f.hl&&(f.td>350||!f.lo)){if(f.hp<135&&f.kt>0)useHeal(f,'k');else if(f.hp<160&&f.bd>0)useHeal(f,'b')}
if(f.rt&&f.tg&&f.lo&&f.td<320){f.rt=null;f.rp=0}
if(!f.wp||dst(f,f.wp)<90||R()<.03){f.wp={x:cl(zt.cx+rr(-1,1)*zt.r*.6,100,S-100),y:cl(zt.cy+rr(-1,1)*zt.r*.6,100,S-100)};if(G.cs){const en=G.f.filter(e=>!e.dead&&e.tm!==f.tm&&e.st=='ground');if(en.length&&R()<.75){const e=en[R()*en.length|0];f.wp={x:e.x+rr(-160,160),y:e.y+rr(-160,160)}}else f.wp={x:CX+rr(-1,1)*AS*.4,y:CY+rr(-1,1)*AS*.4}}}
const L=lead(f);f.fw=0;if(L&&!f.tg&&!f.it){f.fw=1;if(!f.of||R()<.04)f.of={x:rr(-190,190),y:rr(-190,190)};f.wp={x:cl(L.x+f.of.x,100,S-100),y:cl(L.y+f.of.y,100,S-100)}}
if(f.ws[0]!=null&&f.ws[1]!=null&&f.rl<=0&&((f.swt=(f.swt||0)-.25)<=0)){const dd=f.tg?f.td:300,P=PREF[dd<180?0:dd<450?1:2],r=i=>{const k=P.indexOf(WP[f.ws[i]].base||f.ws[i]);return k<0?9:k},b=r(0)<=r(1)?0:1;if(f.cur!=b&&f.cd<=0){swap(f);f.swt=1.2}}
if(!f.tg&&wi&&f.mg[f.cur]<w.mag*.4)reload(f)}
let mx=0,my=0;const zd=Math.hypot(zt.cx-f.x,zt.cy-f.y)||1,out=Math.hypot(Z.cx-f.x,Z.cy-f.y)>Z.r-70||(zd>zt.r-100&&(Z.st=='shr'||Z.wait-Z.t<20));f.fa=null;if(out&&G.t>(f.znT||0)){f.znT=G.t+rr(12,22);if(R()<.4)say(f,pick(ZNL),0)}
if(f.lt>.8){if(f.mv&&!f.rt&&!f.hl&&Math.hypot(f.x-f.lx,f.y-f.ly)<14){f.sc=(f.sc||0)+1;f.nvF=5;f.np=null;if(f.sc<3){f.wd=rr(0,6.28);f.wt=rr(.5,1)}if(f.sc>=5){unstick(f);f.sc=0}f.ban=f.it?(f.it.fk||f.it):null;f.bant=8;f.wp=null;f.ls=null;f.lst=0;if(f.xq){f.xq=null;f.inS=G.t-5}}if(Math.hypot(f.x-f.lx,f.y-f.ly)>=14||!f.mv)f.sc=0;f.lx=f.x;f.ly=f.y;f.lt=0}
if(f.icU>G.t&&!out&&!f.rt){mx=0;my=0;f.fa=f.icA;f.wt=0}
else if(f.wt>0){f.wt-=dt;mx=Math.cos(f.wd);my=Math.sin(f.wd)}
else if(out&&!(f.sv&&!f.tg&&!f.rt)&&!(f.rdn&&!f.vs)&&!f.rt&&!(f.tg&&!f.tg.dead&&f.lo&&f.td<450&&f.hp>=MH*.4&&has)){[mx,my]=navDir(f,zt.cx,zt.cy);if(f.tg&&!f.tg.dead&&has){const t=f.tg,dx=t.x-f.x,dy=t.y-f.y,d=Math.hypot(dx,dy)||1;f.fa=Math.atan2(dy,dx);const da=Math.abs(wr(f.fa-f.ang));if(f.lo&&da<.35&&d<Math.min(w.rg*.95,f.ads?1250:720)&&f.cd<=0&&f.rl<=0&&f.lk<=0&&(!f.ads||f.adsK>.8)&&(!(f.invis>0)||d<320||f.invis<1)&&R()<(f.mvF>0?.9:f.INF?.6:f.yt?.4:(.13+f.sk*.12)*(f.ads?1.7:1))){const lt=d/w.sp;shoot(f,Math.atan2(t.y+(t.vy||0)*lt-f.y,t.x+(t.vx||0)*lt-f.x)+(R()-.5)*(1.1-f.sk)*.18*(1-.85*(f.adsK||0)));callout(f,t)}}}
else if(f.bko>0&&!f.lo){const bl=Math.hypot(f.bkx,f.bky)||1;mx=f.bkx/bl-f.bky/bl*f.sd*.4;my=f.bky/bl+f.bkx/bl*f.sd*.4;f.fa=Math.atan2(-f.bky,-f.bkx)}
else if(f.fle&&((f.medG&&f.it)||f.shp||(f.tg&&!f.tg.dead&&f.td<750))){const q=(f.medG&&f.it)||f.shp;if(q){const dx=q.x-f.x,dy=q.y-f.y,d=Math.hypot(dx,dy)||1;if(q===f.shp&&d<=f.shp.r*.5){mx=0;my=0}else{mx=dx/d;my=dy/d;if(d>110)[mx,my]=navDir(f,q.x,q.y)}}else{const e=f.tg,dx=f.x-e.x,dy=f.y-e.y,d=Math.hypot(dx,dy)||1;mx=dx/d-dy/d*f.sd*.3;my=dy/d+dx/d*f.sd*.3}}
else if(f.rtr){const e=f.tg&&!f.tg.dead?f.tg:null;if(f.hl||!e||f.td>700){mx=0;my=0}else{const dx=f.x-e.x,dy=f.y-e.y,d=Math.hypot(dx,dy)||1;mx=dx/d-dy/d*f.sd*.3;my=dy/d+dx/d*f.sd*.3}}
else if(f.rdn&&!f.vs){const t=f.rdn,dx=t.x-f.x,dy=t.y-f.y,d=Math.hypot(dx,dy)||1;if(d>55){mx=dx/d;my=dy/d;if(d>150)[mx,my]=navDir(f,t.x,t.y)}if(d<=100&&!f.rt){f.rt=t;f.rp=0}f.fa=Math.atan2(dy,dx)}
else if(f.tg&&!f.tg.dead&&has&&!(f.medG&&f.hp<MH*.5&&f.td>300)){const t=f.tg,dx=t.x-f.x,dy=t.y-f.y,d=Math.hypot(dx,dy)||1,ux=dx/d,uy=dy/d,want=w.rg*(w.pel?.4:w.rg>900?.8:.6);let k=d>want+40?1:d<want-60?-1:0;const ib=G.iw&&G.iw.length&&iceLos(f,t);if(!f.lo)k=ib?0:1;if(f.bko>0&&f.lo)k=-1;
const sw=f.lo?1:.25;mx=ux*k-uy*f.sd*sw;my=uy*k+ux*f.sd*sw;if(!f.lo&&!ib&&d>140)[mx,my]=navDir(f,t.x,t.y);if(f.hp<60&&d<400&&f.lo){mx=-ux;my=-uy}
f.fa=Math.atan2(dy,dx);const da=Math.abs(wr(f.fa-f.ang));
if(f.lo&&da<.35&&d<Math.min(w.rg*.95,f.ads?1250:720)&&f.cd<=0&&f.rl<=0&&f.lk<=0&&(!f.ads||f.adsK>.8)&&(!(f.invis>0)||d<320||f.invis<1)&&R()<(f.mvF>0?.9:f.INF?.6:f.yt?.4:(.13+f.sk*.12)*(f.ads?1.7:1))){const lt=d/w.sp;shoot(f,Math.atan2(t.y+(t.vy||0)*lt-f.y,t.x+(t.vx||0)*lt-f.x)+(R()-.5)*(1.1-f.sk)*.18*(1-.85*(f.adsK||0)));callout(f,t)}}
else if(f.cvA&&!f.tg&&!f.rt&&has){const a=f.cvA,e=f.cvT,ax=a.x-f.x,ay=a.y-f.y,ad=Math.hypot(ax,ay)||1;
if(e&&ad<700){const dx=e.x-f.x,dy=e.y-f.y,d=Math.hypot(dx,dy)||1;if(d>140){mx=dx/d;my=dy/d}f.fa=Math.atan2(dy,dx)}
else if(ad>240){mx=ax/ad;my=ay/ad;if(ad>300)[mx,my]=navDir(f,a.x,a.y);f.fa=Math.atan2(ay,ax)}}
else if(f.sv&&!f.tg&&!f.rt){const dx=f.sv.x-f.x,dy=f.sv.y-f.y,d=Math.hypot(dx,dy)||1;if(d>f.sv.r*.4){mx=dx/d;my=dy/d;if(d>200)[mx,my]=navDir(f,f.sv.x,f.sv.y)}else{mx=0;my=0}f.fa=Math.atan2(dy,dx)}
else if(f.shp&&!f.tg&&!f.rt){const dx=f.shp.x-f.x,dy=f.shp.y-f.y,d=Math.hypot(dx,dy)||1;if(d>f.shp.r*.5){mx=dx/d;my=dy/d;if(d>200)[mx,my]=navDir(f,f.shp.x,f.shp.y)}else{mx=0;my=0}f.fa=Math.atan2(dy,dx)}
else if(f.lst>0&&f.ls&&has&&!f.medG&&!(G.iw&&G.iw.length&&iceLos(f,f.ls))){const dx=f.ls.x-f.x,dy=f.ls.y-f.y,d=Math.hypot(dx,dy)||1;if(d>70){mx=dx/d;my=dy/d;if(d>140)[mx,my]=navDir(f,f.ls.x,f.ls.y)}else f.lst=0;f.fa=Math.atan2(dy,dx)}
else{const q=(f.xq&&f.xq[0])||f.it||f.wp||f,dx=q.x-f.x,dy=q.y-f.y,d=Math.hypot(dx,dy)||1;mx=dx/d;my=dy/d;if(d>110&&q!==f)[mx,my]=navDir(f,q.x,q.y);if(f.fw&&!f.it&&d<55){mx=0;my=0}}
if(f.pz>0)f.pz-=dt;f.lk-=dt;if(f.nvF>0)f.nvF-=dt;if(f.hit){f.hit=0;if(!f.tg&&R()<.35){f.wd=rr(0,6.28);f.wt=rr(.3,.7)}else{f.sd*=-1;if(f.tg&&!f.hl&&!f.rt&&(f.jh||0)==0&&R()<.45+f.sk*.3)f.jv=rr(270,320)}}
f.dc=(f.dc||0)-dt;if(f.dg>0)f.dg-=dt;if(f.dc<=0){f.dc=.05;if(!(f.dg>0)&&!(f.icU>G.t)&&f.st=='ground')for(const b of G.b){if(b.o.tm===f.tm||b.ex)continue;const bx=f.x-b.x,by=f.y-b.y;if(bx*bx+by*by>90000)continue;const bs=Math.hypot(b.vx,b.vy)||1,ux=b.vx/bs,uy=b.vy/bs;if(bx*ux+by*uy<0)continue;const cr=bx*uy-by*ux;if(Math.abs(cr)<46&&R()<.3+f.sk*.6){f.dg=.4;if(!f.hl&&!f.rt&&(f.jh||0)==0&&R()<.4+f.sk*.3)f.jv=rr(270,320);f.dgx=-uy*(cr>0?-1:1);f.dgy=ux*(cr>0?-1:1);break}}}
if(f.dg>0){mx+=f.dgx*1.6;my+=f.dgy*1.6}
if(f.tg&&f.lo&&!f.rt&&!f.hl&&!(f.dn>0)){f.sdt=(f.sdt||0)-dt;if(f.sdt<=0){f.sdt=rr(.25,.7)*(1.25-f.sk*.5);if(R()<.85)f.sd*=-1;if(R()<.12)f.sdt=rr(.06,.14)}f.jcd=(f.jcd||0)-dt;if(f.jcd<=0&&(f.jh||0)==0&&f.td<650&&R()<dt*(1.2+f.sk*1.8)){f.jv=rr(270,320);f.jcd=rr(.7,1.6)}}
if(!f.isP&&!f.iq&&f.tg&&f.lo&&!f.rt&&!f.hl&&!(f.dn>0)&&f.st=='ground'&&has&&!f.ads&&!(f.icU>G.t)&&f.td>110&&f.td<900){
if(f.stm==null){f.stm=100;f.bsp=0;f.bst=rr(.2,.8);f.bsn=0}
f.bst-=dt;f.mvF=(f.mvF||0)-dt;if(!(f.dash>0)&&!((f.jh||0)>0))f.stm=Math.min(100,f.stm+16*dt);
if(f.bsp==0){if(f.bst<=0&&f.stm>=40&&!(f.slc>0)){const t=f.tg,ex=t.x-f.x,ey=t.y-f.y,el=Math.hypot(ex,ey)||1,ux=ex/el,uy=ey/el;let s=f.mvS||(f.mvS=R()<.5?1:-1);
const fa=f.td>420?.8:f.td>220?.35:-.2,la=f.td>420?.6:f.td>220?.9:.95;
const dir=sg=>{const dx=ux*fa-uy*sg*la,dy=uy*fa+ux*sg*la,l=Math.hypot(dx,dy)||1;return[dx/l,dy/l]};
let d=dir(s);if(wallAt(f.x+d[0]*80,f.y+d[1]*80)){s=-s;d=dir(s)}f.mvS=R()<.6?-s:s;
slide(f,d[0],d[1]);if(f.dash>0){f.slc=.8;f.stm-=30;f.bsn++;f.bsp=1;f.bst=rr(.12,.3);f.mvF=.5}else f.bst=.3}}
else if(f.bsp==1){if(f.bst<=0||!(f.dash>0)){if((f.jh||0)==0&&f.stm>=8&&R()<.55+f.sk*.35){f.jv=rr(270,320);f.stm-=8;f.mvF=.6}f.bsp=2;f.bst=1}}
else if(((f.jh||0)==0&&!(f.dash>0)&&f.bst<.9)||f.bst<=0){const more=f.bsn<2+(f.sk>.5?1:0)&&f.stm>=32&&R()<.5+f.sk*.4;f.bsp=0;if(more)f.bst=0;else{f.bsn=0;f.bst=rr(.5,1.3)*(1.3-f.sk*.6)}}}
else{f.bsp=0;if(f.mvF>0)f.mvF=0}
if(f.iq){const q=f.iq,t=q.ref&&!q.ref.dead?q.ref:(f.tg&&!f.tg.dead?f.tg:null);q.T+=dt;
if(!t||f.dn>0||f.st!='ground'||f.hl||f.rt||q.T>3.2)f.iq=null;
else{const ex=t.x-f.x,ey=t.y-f.y,el=Math.hypot(ex,ey)||1,ux=ex/el,uy=ey/el;f.fa=Math.atan2(ey,ex);f.ads=0;
const lo=los(f,t);f.lo=lo;f.td=el;
/* tiro garantido no inimigo durante a manobra (so quando o gelo nao esta na frente) */
const iqS=()=>{if(lo&&f.cd<=0&&f.rl<=0&&f.mg[f.cur]>0){const lt=el/w.sp;shoot(f,Math.atan2(t.y+(t.vy||0)*lt-f.y,t.x+(t.vx||0)*lt-f.x)+(R()-.5)*(1.1-f.sk)*.18)}};
if(q.s==1){/* 1) dash curto pro lado */
if(!q.d){q.d=1;let sg=f.mvS||(f.mvS=R()<.5?1:-1);let dx=-uy*sg*.95-ux*.1,dy=ux*sg*.95-uy*.1;if(wallAt(f.x+dx*70,f.y+dy*70)){sg=-sg;dx=-uy*sg*.95-ux*.1;dy=ux*sg*.95-uy*.1}f.mvS=-sg;f.slc=0;f.dash=0;slide(f,dx,dy);if(f.dash>0){f.dash=Math.min(f.dash,.4);f.slc=.5}else q.s=2}
else{iqS();if(!(f.dash>0))q.s=2}}
else if(q.s==2){/* 2) pula */
if((f.jh||0)==0)f.jv=rr(270,320);q.s=3;q.t=0;iqS()}
else if(q.s==3){/* 3) atira no ar */
q.t+=dt;f.mvF=.7;iqS();if(q.t>=.5&&(f.jh||0)==0)q.s=4}
else if(q.s==4){/* 4) dash na direcao do inimigo */
iqS();if(el<=140)f.iq=null;else if(!(f.slc>0)&&!(f.dash>0)){slide(f,ux,uy);if(f.dash>0){f.slc=.8;q.s=5}else f.iq=null}}
else{iqS();if(!(f.dash>0))f.iq=null}}}
if(f.bko>0)f.bko-=dt;
if(f.jv||f.jh){f.jv=(f.jv||0)-900*dt;f.jh=(f.jh||0)+f.jv*dt;if(f.jh<=0){f.jh=0;f.jv=0;f.jsc=0}}
if(f.INF){const r=infSteer(f,mx,my);mx=r[0];my=r[1]}
[mx,my]=steer(f,mx,my);
const m=Math.hypot(mx,my)||1,mv=Math.hypot(mx,my)>.05;if(mv&&!f.hl&&!(f.pz>0)&&!f.rt)f.rn=(f.rn||0)+dt;else f.rn=0;const run=(f.rn>=.3&&!f.hl&&!((f.adsK||0)>.5))||(out&&f.rsU>G.t&&mv&&!f.hl),slow=f.hl||f.pz>0||f.rt,sp=!mv?0:(f.hl?80:f.pz>0?30:f.rt?0:f.tg&&f.lo&&!f.fle?180:190)*(slow?1:(run?1.5:1)*(f.rb>0?1.5:1)*(Math.hypot(Z.cx-f.x,Z.cy-f.y)<=Z.r?1.5:1))*(1-.4*(f.adsK||0))*(f.INF?1.12:f.yt?1.06:1),k=Math.min(1,dt*7);if(run&&mv&&R()<.05&&dst(f,G.p)<900)boom(f.x,f.y,'#e8e2c0',1,70);f.mv=mv&&sp>20;
f.vx+=(mx/m*sp-f.vx)*k;f.vy+=(my/m*sp-f.vy)*k;if(f.fa==null&&sp>40)f.fa=Math.atan2(f.vy,f.vx)}


/* ---------- INFINITY: bot lendario (sem cla, so entra se for convidado) ---------- */
function ytApply(f){try{let n=0;for(const o of f){if(o.isP||o.INF)continue;if(isInfl(String(o.cm||o.bn||o.name||'').replace(/^\*/,''))){o.yt=1;o.sk=Math.max(o.sk||0,1);o.bf=(o.bf||0)+.15;n++}}}catch(e){}}
function infApply(teams,f,room){
const clanI=clHasInf(),t0=teams[0];
let o=f.find(q=>!q.isP&&(q.bn||q.name)===INFN);
if(!o){const mates=t0?t0.m.filter(q=>!q.isP&&!q.fr):[];
if(clanI&&mates.length)o=mates[0];
else{const oth=f.filter(q=>!q.isP&&!q.fr&&!(t0&&t0.m.includes(q)));o=oth.length?oth[Math.random()*oth.length|0]:f.find(q=>!q.isP)}}
if(!o)return;
if(clanI&&PC){o.icl=PC;o.cl=PC;o.ctg=PC.tag;o.bn=INFN;o.name='['+PC.tag+'] '+INFN;o.bf=clBuff(PC)}
else{o.icl=null;o.cl=null;o.ctg=undefined;o.bn=undefined;o.name=INFN;o.bf=0}
o.cm=INFN;o.INF=1;o.yt=1;o.sk=1.1;o.bf+=.3;o.ic=2;o.ict=0;
try{NU.add(INFN)}catch(e){}}
function iceNear(a,b,own,tm){if(!G.iw||!G.iw.length)return null;const T=tm==null?a.tm:tm;
for(const w of G.iw){if(own!=null&&((w.tm===T)!==!!own))continue;
if(Math.min(a.x,b.x)>w.x+160||Math.max(a.x,b.x)<w.x-160||Math.min(a.y,b.y)>w.y+160||Math.max(a.y,b.y)<w.y-160)continue;
for(const s of w.sg)if(segX(a.x,a.y,b.x,b.y,s[0],s[1],s[2],s[3]))return w}return null}
function infThreat(f){let best=null,bd=1e9;
for(const b of G.b){if(b.o.tm===f.tm)continue;const bx=f.x-b.x,by=f.y-b.y,d2=bx*bx+by*by;if(d2>490000)continue;
const bs=Math.hypot(b.vx,b.vy)||1,ux=b.vx/bs,uy=b.vy/bs;if(bx*ux+by*uy<0)continue;
const cr=bx*uy-by*ux;if(Math.abs(cr)<80&&d2<bd){bd=d2;best=b.o}}
if(!best&&f.dmgT>G.t-.8&&f.dmgS&&!f.dmgS.dead)best=f.dmgS;return best}
/* gelo de pro: cobre antes de curar/recarregar/reviver, bloqueia tiro vindo, divide luta 1vX e protege aliado caido */
function infIce(f){const n=G.t;if(f.icl&&(f.cl!==f.icl||!f.ctg||!f.bn||f.name.charAt(0)!='[')){f.cl=f.icl;f.ctg=f.icl.tag;f.bn=INFN;f.name='['+f.icl.tag+'] '+INFN}if(f.dn>0||f.dead||f.st!='ground')return;
const wi=f.ws[f.cur],tg=f.tg&&!f.tg.dead?f.tg:null,own=tg?iceNear(f,tg,1):null;
if(own&&!f.lo&&!f.hl&&own.t>1.1){
if(f.hp<MH*.9&&(f.kt>0||f.bd>0))useHeal(f,f.hp<MH*.65&&f.kt>0?'k':'b');
else if(wi!=null&&f.rl<=0&&f.mg[f.cur]<WP[wi].mag*.7)reload(f)}
if(f.ic<=0||f.icd>0||f.icU>n||f.pf>0||f.lgh>0||n<(f.iceN||0))return;
const th=infThreat(f);let tgt=null,w=0;
const busy=f.hl||f.rt||f.rl>0||(wi!=null&&f.mg[f.cur]<=0);
if(th&&!th.dead&&!iceNear(f,th,1)){tgt=th;w=1}
else if(tg&&f.lo&&f.td<800&&!own){
if(busy||(f.hp<MH*.5&&(f.kt>0||f.bd>0))){tgt=tg;w=2}
else if(f.ic>=2){let c=0;for(const e of G.f)if(e.tm!==f.tm&&!e.dead&&e.st=='ground'&&!(e.dn>0)&&dst(f,e)<800&&los(f,e))c++;if(c>=2){tgt=tg;w=3}}}
else if(f.cvA&&f.cvT&&f.ic>=2&&dst(f,f.cvA)<320&&!iceNear(f.cvA,f.cvT,1)){tgt=f.cvT;w=4}
if(tgt){throwIce(f,tgt);f.iceN=n+(w==1?2.2:4)}}
/* movimentacao de pro: espera atras do proprio gelo e sai pela lateral quando ele esta acabando; contorna o gelo inimigo */
function infSteer(f,mx,my){const tg=f.tg&&!f.tg.dead?f.tg:null;if(!tg||f.hl||f.rt||f.dn>0||f.fle)return[mx,my];
const d=f.td||1,ux=(tg.x-f.x)/d,uy=(tg.y-f.y)/d;if(!f.fsd||R()<.004)f.fsd=R()<.5?1:-1;
const own=iceNear(f,tg,1);
if(own&&!f.lo){
if(f.mg[f.cur]<=0&&f.rl<=0)reload(f);
if(G.t<(f.ipk||0)||(f.mg[f.cur]>0&&(own.t<2.2||(f.hp>=MH*.75&&own.t<2.6&&f.rl<=0&&R()<.05)))){
if(!(f.ipk>G.t))f.ipk=G.t+.8;
return[-uy*f.fsd*1.5+ux*.4,ux*f.fsd*1.5+uy*.4]}
return[-uy*f.fsd*.8+ux*.6,ux*f.fsd*.8+uy*.6]}
if(!f.lo&&!own&&iceNear(f,tg,0))return[-uy*f.fsd*1.3+ux*.5,ux*f.fsd*1.3+uy*.5];
return[mx,my]}
/* ---------- GRANADA DE GELO ---------- */
const ICE={max:3,rc:7,life:3,hold:.1,hp:400,hw:48,hd:7,th:3.5,h:58,cd:.6};
function iceT(f,dt){if(f.icd>0)f.icd-=dt;if(f.ic<ICE.max){f.ict+=dt;if(f.ict>=(f.INF?9:ICE.rc)){f.ict=0;f.ic++;if(f.isP){tx(f.x,f.y-52,'+1 GELO','#ffba7d');snd(900,.1,'triangle',.05,400)}}}else f.ict=0}
(function(){const o=throwIce;throwIce=function(f,t){const c=f?f.ic:0;const r=o.apply(this,arguments);try{if(f&&!f.isP&&f.ic<c){const ref=t&&!t.dead?t:(f.tg&&!f.tg.dead?f.tg:null);if(ref)f.iq={s:1,T:0,t:0,d:0,ref}}}catch(e){}return r}})();
function throwIce(f,tgt){if(!G||!f||f.dead||f.st!='ground'||f.dn>0||f.pf>0||f.lgh>0||f.ic<=0||f.icd>0)return;if(G.cs&&G.cs.ph!='fight')return;if(G.room&&f.isP)return;
let a=f.ang,d=52;if(f.isP){a=aimP()}else{const T0=tgt&&!tgt.dead?tgt:f.tg;if(T0&&!T0.dead)a=Math.atan2(T0.y-f.y,T0.x-f.x)}
const ux=Math.cos(a),uy=Math.sin(a);let mx=d;for(let s=40;s<=d+ICE.hd;s+=10){if(wallAt(f.x+ux*s,f.y+uy*s)){mx=Math.max(34,s-ICE.hd-14);break}}d=Math.min(d,mx);
f.ic--;f.icd=ICE.cd;f.ang=a;f.rev=1.2;if(!G.ig)G.ig=[];
if(!G.iw)G.iw=[];iceMake({tx:f.x+ux*d,ty:f.y+uy*d,a,o:f,tm:f.tm});if(!f.isP){f.icU=G.t+ICE.hold;f.icA=a;f.wt=0;f.vx=0;f.vy=0}
tx(f.x,f.y-44,'GELO!','#ffba7d');if(f.isP||dst(f,G.p)<900)snd(520,.18,'triangle',.05,-250)}
function iceMake(q){const g=G,f=q.o,ux=Math.cos(q.a),uy=Math.sin(q.a),sx=-uy,sy=ux,{hw,hd}=ICE;
const P=(u,v)=>[q.tx+ux*u+sx*v,q.ty+uy*u+sy*v],bl=P(hd,-hw),br=P(hd,hw),fl=P(-hd,-hw),fr=P(-hd,hw);
g.iw.push({x:q.tx,y:q.ty,a:q.a,t:ICE.life,hp:ICE.hp,mhp:ICE.hp,fl:0,tm:q.tm,o:f,sg:[[bl[0],bl[1],br[0],br[1]],[bl[0],bl[1],fl[0],fl[1]],[br[0],br[1],fr[0],fr[1]]]});
boom(q.tx,q.ty,['#ffddbf','#ffffff','#ffba7d'],16,180);if(dst({x:q.tx,y:q.ty},g.p)<900)snd(300,.25,'sawtooth',.04,-120)}
function iceBreak(w,hit){const g=G;for(const s of w.sg)boom((s[0]+s[2])/2,(s[1]+s[3])/2,['#ffddbf','#ffffff','#ffba7d'],hit?14:6,hit?240:120);if(dst(w,g.p)<1000){snd(hit?200:420,.3,'sawtooth',.05,-150);snd(1600,.1,'square',.025,-900,.03)}}
function iceUpd(dt){const g=G;if(!g.iw){g.iw=[];g.ig=[]}
for(let i=g.ig.length-1;i>=0;i--){const q=g.ig[i];q.t+=dt;const k=Math.min(1,q.t/q.T);q.x=q.sx+(q.tx-q.sx)*k;q.y=q.sy+(q.ty-q.sy)*k;if(R()<.7)g.pt.push({x:q.x,y:q.y,vx:rr(-25,25),vy:rr(-25,25),l:.3,m:.3,c:'#ffddbf',r:3});if(k>=1){iceMake(q);g.ig.splice(i,1)}}
for(let i=g.iw.length-1;i>=0;i--){const w=g.iw[i];w.t-=dt;if(w.fl>0)w.fl-=dt;if(w.t<=0||w.hp<=0){iceBreak(w,w.hp<=0);g.iw.splice(i,1)}}}
function segDist(px,py,x1,y1,x2,y2){const dx=x2-x1,dy=y2-y1,l=dx*dx+dy*dy;let t=l?((px-x1)*dx+(py-y1)*dy)/l:0;t=t<0?0:t>1?1:t;const cx=x1+dx*t,cy=y1+dy*t;return[Math.hypot(px-cx,py-cy),cx,cy]}
function segX(ax,ay,bx,by,cx,cy,dx,dy){const r1=(bx-ax)*(cy-ay)-(by-ay)*(cx-ax),r2=(bx-ax)*(dy-ay)-(by-ay)*(dx-ax),r3=(dx-cx)*(ay-cy)-(dy-cy)*(ax-cx),r4=(dx-cx)*(by-cy)-(dy-cy)*(bx-cx);return r1*r2<0&&r3*r4<0}
function iceBul(b){const px=b.lx==null?b.x:b.lx,py=b.ly==null?b.y:b.ly;for(const w of G.iw){if(Math.abs(w.x-b.x)>160||Math.abs(w.y-b.y)>160)continue;for(const s of w.sg){if(segDist(b.x,b.y,s[0],s[1],s[2],s[3])[0]<ICE.th+(b.r||5)*.4||segX(px,py,b.x,b.y,s[0],s[1],s[2],s[3])){w.hp-=(b.dm||10);w.fl=.12;boom(b.x,b.y,['#ffddbf','#ffffff'],4,110);if(dst(b,G.p)<700)snd(1500,.04,'square',.025,-700);return 1}}}return 0}
function iceLos(a,b){for(const w of G.iw){if(Math.min(a.x,b.x)>w.x+160||Math.max(a.x,b.x)<w.x-160||Math.min(a.y,b.y)>w.y+160||Math.max(a.y,b.y)<w.y-160)continue;for(const s of w.sg)if(segX(a.x,a.y,b.x,b.y,s[0],s[1],s[2],s[3]))return 1}return 0}
function iceCol(f){if(!G.iw||!G.iw.length)return;for(const w of G.iw){if(Math.abs(w.x-f.x)>170||Math.abs(w.y-f.y)>170)continue;for(const s of w.sg){const [d,cx,cy]=segDist(f.x,f.y,s[0],s[1],s[2],s[3]),m=ICE.th+f.r;if(d<m){if(f.dash>0){f.dash=0;f.vx=0;f.vy=0}let nx=f.x-cx,ny=f.y-cy;const l=Math.hypot(nx,ny);if(l<.01){nx=-(s[3]-s[1]);ny=s[2]-s[0];const q=Math.hypot(nx,ny)||1;nx/=q;ny/=q}else{nx/=l;ny/=l}f.x+=nx*(m-d);f.y+=ny*(m-d)}}}}

/* ---------- update ---------- */
function upd(dt){const g=G,pl=g.pl;g.t+=dt;kcRec(dt);pre(dt);chatT(dt);
if(pl.t<1.05){pl.t+=dt/48;const k=Math.min(1,pl.t);pl.x=pl.ax+(pl.bx-pl.ax)*k;pl.y=pl.ay+(pl.by-pl.ay)*k}
zupd(dt);adUpd(dt);svUpd(dt);if(g.cs)csUpd(dt);const Z=g.Z;
if(!g.rj&&g.t>=10){g.rj=1;for(const T of g.teams){const bots=T.m.filter(o=>!o.isP&&!o.al&&o.st=='plane');if(!bots.length)continue;const k=rr(Math.min(.9,pl.t+.04),.96),px=pl.ax+(pl.bx-pl.ax)*k,py=pl.ay+(pl.by-pl.ay)*k,pa=Math.atan2(pl.by-pl.ay,pl.bx-pl.ax),off=rr(-1,1)*(bots[0].jd||2500)*.8,Px=px-Math.sin(pa)*off,Py=py+Math.cos(pa)*off;bots.forEach((o,i)=>{const sa=i/bots.length*6.2832+rr(-.35,.35),sr=rr(170,270);o.tp={x:cl(Px+Math.cos(sa)*sr,150,S-150),y:cl(Py+Math.sin(sa)*sr,150,S-150)}})}}
for(const f of g.f){if(f.dead)continue;if(f.mx&&window.MPT(f,dt))continue;if(g.cs&&g.cs.ph!='fight'){f.vx=0;f.vy=0;if(f.lgh>0&&g.cs.ph=='end')f.lgh-=dt;continue}
if(f.st=='plane'){f.x=pl.x;f.y=pl.y;if(f.isP){if(pl.t>=1)jump(f)}else if(f.al){if(g.t>=10&&(pl.t>.9||(g.p.st!='plane'&&(f.jt+=dt)>f.jw)))jump(f)}else if(g.t>=10&&(dst(pl,f.tp)<f.jd||pl.t>.9))jump(f);continue}
if(f.st=='fall'){let mx=0,my=0,sp=500;if(f.isP){mx=(keys.KeyD?1:0)-(keys.KeyA?1:0);my=(keys.KeyS?1:0)-(keys.KeyW?1:0);if(js.on){const dx=js.x-js.ox,dy=js.y-js.oy,l=Math.hypot(dx,dy);if(l>6){const k=Math.min(1,l/(46*U));mx=dx/l*k;my=dy/l*k}}}
else{const q=f.al?{x:g.p.x+f.ox,y:g.p.y+f.oy}:f.tp,dx=q.x-f.x,dy=q.y-f.y,d=Math.hypot(dx,dy);if(!f.al)sp=Math.min(500,Math.max(150,d/Math.max(.8,f.ft)*1.3));else sp=Math.min(500,d*2.2+40);if(d>20){mx=dx/d;my=dy/d;if(d>150){const w=Math.sin(g.t*1.1+(f.i||0)*2.1)*.35*Math.min(1,d/500);mx+=-dy/d*w;my+=dx/d*w}f.ang=Math.atan2(my,mx)}}
if(f.isP)[mx,my]=rel2w(mx,my);if(!isFinite(mx+my)){mx=0;my=0}const m=Math.hypot(mx,my);if(m>1){mx/=m;my/=m}{const kv=Math.min(1,dt*2.6);f.fvx=(f.fvx||0)+(mx*sp-(f.fvx||0))*kv;f.fvy=(f.fvy||0)+(my*sp-(f.fvy||0))*kv;f.x=cl(f.x+f.fvx*dt,20,S-20);f.y=cl(f.y+f.fvy*dt,20,S-20)}f.ft-=dt;try{fallHouse(f)}catch(e){}if(f.isP)fallS(f,dt);
if(f.ft<=0){f.st='ground';if(f.ws[0]==null){f.ws[0]=1;f.mg[0]=WP[1].mag;f.cur=f.ws[1]==null||f.isP?0:f.cur;f.res[0]=Math.max(f.res[0],24)}if(!isFinite(f.x+f.y)){f.x=S/2;f.y=S/2}f.jh=0;f.jv=0;f.vx=0;f.vy=0;for(let k=0;k<4;k++)col(f,f.r);f.bush=G.bs.has((f.x/T|0)*512+(f.y/T|0));boom(f.x,f.y,'#e8e2c0',14,160);if(f.isP)landS(1.2);else if(dst(f,G.p)<600)landS(.6)}continue}
if(f.bat>0){f.bat-=dt;f.batT-=dt;if(R()<.4)G.pt.push({x:f.x+rr(-12,12),y:f.y+rr(-12,12),vx:0,vy:0,l:.5,m:.5,c:'#a64dff',r:3});if(f.batT<=0&&!f.dead){f.batT=1;hurt(f,1,f.batO,1)}}f.cd-=dt;f.rev-=dt;f.fl-=dt;f.inv-=dt;f.sk2-=dt;f.hcd-=dt;iceT(f,dt);if(f.rb>0){f.rb-=dt;if(R()<.5&&Math.hypot(f.vx,f.vy)>40)G.pt.push({x:f.x+rr(-8,8),y:f.y+rr(-8,8),vx:0,vy:0,l:.4,m:.4,c:'#ffb347',r:3})}if(f.invis>0){if(f.dn>0)f.invis=0;else{f.invis-=dt;if(f.invis<=0)revealN(f,1)}}if(f.mk>0)f.mk-=dt;if(f.dash>0){f.dash-=dt;if(f.slf&&R()<.8)boom(f.x,f.y,'#e8e2c0',1,80)}else f.slf=0;if(f.slc>0)f.slc-=dt;f.r=f.slf?12:20;if(f.pois>0){f.pois-=dt;if(R()<.4)G.pt.push({x:f.x+rr(-12,12),y:f.y+rr(-12,12),vx:0,vy:0,l:.5,m:.5,c:'#7dff6a',r:3})}
if(f.dn>0){f.rvt=Math.max(0,(f.rvt||0)-dt);if(f.rvt<=0)f.dn-=dt;if(f.dn<=0){die(f,f.dk);continue}}
else if(f.rt){const t=f.rt,dd=dst(f,t);if(t.dead||!(t.dn>0)||dd>200){f.rt=null;f.rp=0}else if(dd<=125){f.rp+=dt;t.rvt=.15;t.rpg=f.rp/5;if(f.rp>=5){revive(t,f);f.rt=null;f.rp=0}}}
if(f.rl>0){f.rl-=dt;if(f.rl<=0){const w=WP[f.ws[f.rlw]];if(w){const need=w.mag-f.mg[f.rlw],tk=f.inf?need:Math.min(need,f.res[w.ak]);f.mg[f.rlw]+=tk;if(!f.inf)f.res[w.ak]-=tk}}}
if(f.bq){f.bq.t-=dt;if(f.bq.t<=0){const q=f.bq;if(q.n<q.w.burst)gunS(f,f.ws[f.cur]||0,q.w);let qa=q.a;if(f.isP&&!f.dead){const na=aimP();if(lastT){qa=na;f.ang=na}}g.b.push(mkB(f,qa+rr(-1,1)*(f.isP?pSp(f,q.w):.16*(1-.6*(f.adsK||0))),q.w));q.n--;q.t=.07;if(q.n<=0)f.bq=null}}
if(f.hl){f.hl.t-=dt;if(f.hl.t<=0){if(f.hl.k=='b'){f.bd--;f.hp=Math.min(150,f.hp+50)}else{f.kt--;f.hp=MH}tx(f.x,f.y-36,'+','#7dff6a');f.hl=null}}
if(f.isP){let mx=(keys.KeyD?1:0)-(keys.KeyA?1:0),my=(keys.KeyS?1:0)-(keys.KeyW?1:0);
if(js.on){const dx=js.x-js.ox,dy=js.y-js.oy,l=Math.hypot(dx,dy);if(l>6){const k=Math.min(1,l/(46*U));mx=dx/l*k;my=dy/l*k}}
const m=Math.hypot(mx,my);if(m>1){mx/=m;my/=m}if(m>.5)f.rn=(f.rn||0)+dt;else f.rn=0;const run=f.rn>=1&&!(f.dn>0)&&!f.rt&&!f.hl&&adsK<.2;if(run&&R()<.25)boom(f.x,f.y,'#e8e2c0',1,70);const sp=f.dn>0?42:f.rt?95:f.hl?100:(run?1.5:1)*(f.rb>0?1.5:1)*(1-.4*adsK)*205,[wx,wy]=rel2w(mx,my);const sb=f.sk2>0?1.4:1;f.vx=wx*sp*sb;f.vy=wy*sp*sb;if(f.dash>0){f.vx=f.dax*(f.slf?400:560);f.vy=f.day*(f.slf?400:560)}if(!fl.on)f.ang=cyaw}else{aiLod(f,dt);if(f.fa!=null)f.ang+=wr(f.fa-f.ang)*Math.min(1,dt*10);if(f.tg&&!f.tg.dead&&f.tg.st=='ground'&&f.lo&&f.cd>0&&f.cd>=(WP[f.ws[f.cur]||0].cd||.2)-.12)f.ang=Math.atan2(f.tg.y-f.y,f.tg.x-f.x);if(f.tg&&!f.tg.dead&&f.tg.st=='ground'&&specLock()&&f===cfo())f.ang+=wr(Math.atan2(f.tg.y-f.y,f.tg.x-f.x)-f.ang)*Math.min(1,dt*12);if(f.dash>0){const _sv=f.slf?250+120*Math.min(1,f.dash/.6):560;f.vx=f.dax*_sv;f.vy=f.day*_sv}}
if(f.pf>0){f.pf-=dt;f.vx=0;f.vy=0}if(f.lgh>0){f.lgh-=dt;f.vx=0;f.vy=0}{const sl=f.pois>0?.5:1;f.x+=f.vx*dt*sl;f.y+=f.vy*dt*sl}iceCol(f);col(f,f.r);if(!isFinite(f.x+f.y+f.vx+f.vy)){f.x=isFinite(f.lx)?f.lx:S/2;f.y=isFinite(f.ly)?f.ly:S/2;f.vx=0;f.vy=0;f.np=null;f.tg=null;f.wp=null;f.it=null;f.xq=null;f.fa=null}f.bush=g.bs.has((f.x/T|0)*512+(f.y/T|0));
if(Math.hypot(f.x-Z.cx,f.y-Z.cy)>Z.r){f.gt+=dt;if(f.gt>1){f.gt=0;hurt(f,PH[Math.max(0,Z.ph)].d,null)}}
if(!(f.dn>0)&&(f.isP||f.at<.05))pk(f)}
{if(g.cz&&g.cz.length)for(let i=g.cz.length-1;i>=0;i--){const z=g.cz[i];z.t-=dt;if(R()<.12){const an=R()*6.2832;g.pt.push({x:z.x+Math.cos(an)*z.r,y:z.y+Math.sin(an)*z.r,vx:0,vy:0,l:.7,m:.7,c:'#ffba7d',r:3})}if(z.t<=0)g.cz.splice(i,1)}}
{if(g.ev&&g.ev.length)for(let i=g.ev.length-1;i>=0;i--){const z=g.ev[i],o=z.o;if(o.dead||o.dn>0||o.st!='ground'||(g.cs&&g.cs.ph!='fight')){g.ev.splice(i,1);continue}
const hd=Math.min(dt,z.t);z.t-=dt;z.tk+=dt;const tick=z.tk>=1;if(tick)z.tk-=1;
for(const a of g.teams[o.tm].m){if(a.dead||a.dn>0||a.st!='ground'||dst(a,o)>z.r)continue;if(a.hp<MH){a.hp=Math.min(MH,a.hp+10*hd);if(tick)tx(a.x,a.y-44,'+10','#7dff6a')}if(R()<.04)g.pt.push({x:a.x+rr(-10,10),y:a.y+rr(-10,10),vx:0,vy:0,l:.6,m:.6,c:'#b8ff9a',r:3})}
if(R()<.25)for(let k=0;k<1;k++){const an=R()*6.2832,rd=z.r*(k?1:Math.sqrt(R()));g.pt.push({x:o.x+Math.cos(an)*rd,y:o.y+Math.sin(an)*rd,vx:0,vy:0,l:.8,m:.8,c:k?'#ffffff':'#7dff6a',r:3})}
if(z.t<=0)g.ev.splice(i,1)}}
const p=g.p;g.pk=null;if(p.st=='ground'&&!p.dead&&p.ws[0]!=null&&p.ws[1]!=null){let bd=55;for(const q of g.items)if(q.t=='w'&&Math.abs(q.x-p.x)<60&&Math.abs(q.y-p.y)<60){const d=dst(p,q);if(d<bd){bd=d;g.pk=q}}}
iceUpd(dt);
for(let i=g.b.length-1;i>=0;i--){const b=g.b[i];let dead=0;const sp=Math.hypot(b.vx,b.vy),n=Math.ceil(sp*dt/18);
for(let s=0;s<n&&!dead;s++){const k=dt/n;b.lx=b.x;b.ly=b.y;b.x+=b.vx*k;b.y+=b.vy*k;b.l-=sp*k;if(b.l<=0){dead=1;break}
if(wallAt(b.x,b.y)){boom(b.x,b.y,b.sk?SK[b.sk].p2:'#fff',b.sk?7:3,100);dead=1;break}
if(g.iw&&g.iw.length&&iceBul(b)){dead=1;break}
const bz=(b.z0||44)+(b.kz||0)*Math.hypot(b.x-b.sx,b.y-b.sy),pb=b.o.isP&&!b.ex;if(pb&&bz<0){boom(b.x,b.y,'#c9b27a',3,90);dead=1;break}if(b.kz&&bz>700){dead=1;break}
for(const e of g.f)if(!e.dead&&e.st=='ground'&&e.tm!==b.o.tm&&((e.x-b.x)*(e.x-b.x)+(e.y-b.y)*(e.y-b.y))<(e.r+b.r+(pb?8:0))*(e.r+b.r+(pb?8:0))&&(!pb||b.lt===e||(bz>=(e.jh||0)-16&&bz<=(e.jh||0)+80))&&!(e.jh>20&&jdg(b,e))){const hd=pb?bz>=(e.jh||0)+46:0,cpa=pb?(hd?(b.dm>=56?3:2.5):0):b.cp;if(b.ps&&!(e.inv>0)){e.pois=2;tx(e.x,e.y-50,'VENENO','#9cff4a')}if(!b.ex){if(b.ps)hurt(e,b.dm,b.o);else hitD(e,b.dm*(b.o.isP?1:.85),b.o,cpa)}boom(b.x,b.y,'#ff6a6a',b.sk?3:4,b.sk?110:130);if(b.sk)hitFx(b.x,b.y,b.sk,b.a,cpa);dead=1;break}}
if(!dead&&b.sk&&SK[b.sk].ev)evoTrail(b);if(!dead&&b.ps&&R()<.8)g.pt.push({x:b.x,y:b.y,vx:rr(-25,25),vy:rr(-25,25),l:rr(.2,.35),m:.35,c:R()<.5?'#9cff4a':'#ff7ad9',r:3});if(dead){if(b.ex)explode(b);g.b.splice(i,1)}}
for(const q of g.fl){const t=q.t;if(!t||t.dead||t.dn>0){q.done=1;continue}const dx=t.x-q.x,dy=t.y-q.y,d=Math.hypot(dx,dy),st=520*dt;if(d<=st+14){if(q.o)batHit(q.o,t);else healF(t,MH*.2);q.done=1}else{q.x+=dx/d*st;q.y+=dy/d*st}q.h=44+Math.sin(Math.min(1,Math.max(0,1-d/q.d0))*3.14)*50}g.fl=g.fl.filter(q=>!q.done);
if(g.dg){for(const q of g.dg){q.l-=dt;const t=q.t;if(q.l<=0||!t||t.dead||t.st!='ground'){q.done=1;boom(q.x,q.y,['#ffb300','#c9ced8'],4,140);continue}
const dx=t.x-q.x,dy=t.y-q.y,d=Math.hypot(dx,dy)||1,stp=520*dt;q.a=Math.atan2(dy,dx);
if(d<=stp+t.r+8){dogHit(q.o,t);q.done=1}else{q.x+=dx/d*stp;q.y+=dy/d*stp;if(R()<.15)g.pt.push({x:q.x,y:q.y,vx:rr(-30,30),vy:rr(-30,30),l:.3,m:.3,c:R()<.5?'#ffb300':'#c9ced8',r:3})}}g.dg=g.dg.filter(q=>!q.done)}
{const a=g.pt;let j=0;for(let i=0;i<a.length;i++){const q=a[i];q.x+=q.vx*dt;q.y+=q.vy*dt;q.vx*=.93;q.vy*=.93;q.l-=dt;if(q.l>0)a[j++]=q}a.length=j;if(g.rk){const cp=Math.min(QP,60);if(j>cp)a.splice(0,j-cp)}}if(g.hl){for(const q of g.hl)q.l-=dt;g.hl=g.hl.filter(q=>q.l>0)}
if(g.fx)fxUpd(dt);for(const t of g.tx){t.y-=40*dt;t.l-=dt}g.tx=g.tx.filter(t=>t.l>0);for(const f of g.feed)f.l-=dt;g.feed=g.feed.filter(f=>f.l>0);for(const s of g.sp)s.l-=dt;g.sp=g.sp.filter(s=>s.l>0);
if(g.endT>0&&!(g.kc&&g.kc.on)){g.endT-=dt;if(g.endT<=0&&!g.done)finish()}}
function adUpd(dt){const g=G,Z=g.Z,zz=Z.nx||Z;
if(g.pl.t>.45&&g.ad.length<4){g.adT-=dt;if(g.adT<=0){g.adT=rr(42,58);const an=R()*6.28,d=Math.sqrt(R())*zz.r*.8,x=cl(zz.cx+Math.cos(an)*d,200,S-200),y=cl(zz.cy+Math.sin(an)*d,200,S-200);g.ad.push({x,y,h:700,st:0,t:0,has:1});g.feed.push({a:'AIRDROP',b:'suprimentos',m:'chegando:',l:6});snd(880,.3,'triangle',.06,-300)}}
for(const a of g.ad){if(!a.st){a.h-=85*dt;if(a.h<=0){a.h=0;a.st=1;const L=(t,o)=>g.items.push(Object.assign({x:a.x+rr(-32,32),y:a.y+rr(-32,32),t,ad:a},o));
const i1=WG0+(R()*GB.length|0);let i2=WG0+(R()*GB.length|0);if(i2==i1)i2=WG0+((i1-WG0+1)%GB.length);L('w',{id:i1});L('w',{id:i2});for(let k=0;k<4;k++)L('a',{k,n:[90,30,90,30][k]});L('v');L('h');L('k');L('b');boom(a.x,a.y,'#ffd93b',40,260);snd(120,.4,'sawtooth',.08,-40)}}
else{a.t+=dt;a.has=g.items.some(q=>q.ad===a)}}}
/* ---------- pontos de salvacao (Battle Royale) ---------- */
function spreadPts(n,others,noH){const pts=[];for(let i=0;i<n;i++){let best=null,bd=-1;for(let k=0;k<120;k++){const x=rr(300,S-300),y=rr(300,S-300);let ok=true;for(let j=0;j<12&&ok;j++){const an=j/12*6.2832;for(const rd of[0,70,130])if(wallAt(x+Math.cos(an)*rd,y+Math.sin(an)*rd)){ok=false;break}}if(!ok)continue;if(noH&&G.houses.some(h=>x>h.x-140&&x<h.x+h.w+140&&y>h.y-140&&y<h.y+h.h+140))continue;let d=1e9;for(const q of pts)d=Math.min(d,Math.hypot(q.x-x,q.y-y));for(const q of others)d=Math.min(d,Math.hypot(q.x-x,q.y-y));if(d>bd){bd=d;best={x,y}}}if(!best)best={x:rr(600,S-600),y:rr(600,S-600)};pts.push(best)}return pts}
function mkSvPts(){return spreadPts(10,[],1).map(p=>({x:p.x,y:p.y,r:110,pg:0,tm:-1,cd:0}))}
function mkShops(sv){const hs=(G.houses||[]).filter(h=>h.w>=420&&h.h>=380).map(h=>({x:h.x+h.w/2,y:h.y+h.h/2})).filter(p=>![[0,0],[60,0],[-60,0],[0,60],[0,-60]].some(o=>wallAt(p.x+o[0],p.y+o[1])));const out=[];for(let i=0;i<14&&hs.length;i++){let bi=0,bd=-1;hs.forEach((p,k)=>{let d=1e9;for(const q of out)d=Math.min(d,Math.hypot(q.x-p.x,q.y-p.y));for(const q of sv)d=Math.min(d,Math.hypot(q.x-p.x,q.y-p.y));if(d>bd){bd=d;bi=k}});const p=hs.splice(bi,1)[0];out.push({x:p.x,y:p.y,r:90})}return out.length?out:spreadPts(14,sv).map(p=>({x:p.x,y:p.y,r:120}))}
function mkCoins(){const out=[];for(let i=0;i<260;i++){let x,y,t=0;do{if(R()<.5&&G.towns&&G.towns.length){const tw=G.towns[R()*G.towns.length|0];x=tw.x+rr(-450,450);y=tw.y+rr(-450,450)}else{x=rr(200,S-200);y=rr(200,S-200)}x=cl(x,150,S-150);y=cl(y,150,S-150)}while(wallAt(x,y)&&++t<20);if(!wallAt(x,y))out.push({x,y,t:'c',n:5+(R()*11|0)})}return out}
function rertun(f,L){const g=G,T=g.teams[f.tm];L.forEach((o,k)=>{if(o.dead){o.dead=0;g.alive++;T.alive++;o.place=null;o.ws=[1,null];o.mg=[WP[1].mag,0];o.res=[24,0,0,0];o.ar=0;o.hm=0;o.bd=0;o.kt=0;o.cur=0}
const an=k/Math.max(1,L.length)*6.2832+g.t;o.x=f.x+Math.cos(an)*60;o.y=f.y+Math.sin(an)*60;o.dn=0;o.hp=100;o.rvt=0;o.rpg=0;o.dk=null;o.rt=null;o.rp=0;o.hl=null;o.bq=null;o.rl=0;o.cd=.4;o.vx=0;o.vy=0;o.st='ground';o.jh=0;o.jv=0;o.fl=0;o.pois=0;o.inv=2.5;o.tg=null;o.wp=null;o.it=null;o.xq=null;boom(o.x,o.y,'#7dff6a',22,200)});
if(f.tm===g.p.tm){snd(520,.15,'triangle',.07,300);snd(780,.2,'triangle',.07,300,.12)}}
function buy1(f,k){const mc=f.mc|0;if(k=='r'){const L=G.teams[f.tm].m.filter(o=>o!==f&&(o.dead||o.dn>0));if(!L.length||mc<PR.r)return 0;f.mc=mc-PR.r;rertun(f,L);return 1}if(k=='k'){if(f.kt>=3||mc<PR.k)return 0;f.mc=mc-PR.k;f.kt++;return 1}if(k=='b'){if(f.bd>=5||mc<PR.b)return 0;f.mc=mc-PR.b;f.bd++;return 1}return 0}
function botBuy(f){const m0=f.mc|0;buy1(f,'r');while(buy1(f,'k'));while(f.hp<MH*.8&&buy1(f,'b'));const m1=f.mc|0;if(m1<m0)tx(f.x,f.y-44,'-'+(m0-m1)+' LOJA','#ffd93b')}
function svGo(s,tm){const g=G,T=g.teams[tm],L=T.m.filter(o=>o.dead||o.dn>0);L.forEach((o,k)=>{if(o.dead){o.dead=0;g.alive++;T.alive++;o.place=null;o.ws=[1,null];o.mg=[WP[1].mag,0];o.res=[24,0,0,0];o.ar=0;o.hm=0;o.bd=0;o.kt=0;o.cur=0}
const an=k/Math.max(1,L.length)*6.2832+g.t;o.x=s.x+Math.cos(an)*s.r*.55;o.y=s.y+Math.sin(an)*s.r*.55;o.dn=0;o.hp=100;o.rvt=0;o.rpg=0;o.dk=null;o.rt=null;o.rp=0;o.hl=null;o.bq=null;o.rl=0;o.cd=.4;o.vx=0;o.vy=0;o.st='ground';o.jh=0;o.jv=0;o.fl=0;o.pois=0;o.inv=2.5;o.tg=null;o.wp=null;o.it=null;o.xq=null;boom(o.x,o.y,'#7dff6a',22,200)});
if(tm===g.p.tm){snd(520,.15,'triangle',.07,300);snd(780,.2,'triangle',.07,300,.12)}s.cd=90;s.pg=0;s.tm=-1}
function svUpd(dt){const g=G;if(!g.sv||g.cs)return;for(const s of g.sv){if(s.cd>0){s.cd-=dt;s.pg=0;s.tm=-1;continue}
let tm=-1,ok=1,n=0;for(const f of g.f){if(f.dead||f.st!='ground'||f.dn>0||Math.hypot(f.x-s.x,f.y-s.y)>s.r)continue;n++;if(tm<0)tm=f.tm;else if(tm!==f.tm){ok=0;break}}
if(n&&ok&&g.teams[tm].m.some(o=>o.dead||o.dn>0)){if(s.tm!==tm){s.tm=tm;s.pg=0}s.pg+=dt;if(s.pg>=10)svGo(s,tm)}else{s.pg=Math.max(0,s.pg-dt*1.5);if(s.pg<=0)s.tm=-1}}}
function drawShops(g){for(const s of (g.shops||[])){if(!s.m){const m=new THREE.Group(),bx=(w,h,d,c,x,y,z)=>{const o=new THREE.Mesh(BG,new THREE.MeshBasicMaterial({color:c}));o.scale.set(w,h,d);o.position.set(x,y,z);m.add(o)};
bx(80,22,36,'#7a4a24',0,11,0);for(const sx of[-36,36])bx(5,60,5,'#4a2c14',sx,30,-14);for(let i=0;i<4;i++)bx(20,5,44,i%2?'#ffffff':'#e53935',-30+i*20,62,-6);bx(34,14,4,'#ffd93b',0,42,-16);
const rg=new THREE.Mesh(new THREE.RingGeometry(s.r-8,s.r,40),new THREE.MeshBasicMaterial({color:'#ffd93b',transparent:true,opacity:.8,side:THREE.DoubleSide,depthWrite:false}));rg.rotation.x=-1.5708;rg.position.y=4.5;m.add(rg);
const bm=new THREE.Mesh(new THREE.CylinderGeometry(11,11,1800,12,1,true),new THREE.MeshBasicMaterial({color:'#ffc400',transparent:true,opacity:.32,depthWrite:false,side:THREE.DoubleSide,fog:false}));bm.position.y=900;m.add(bm);const cn=new THREE.Group(),cm0=new THREE.Mesh(new THREE.CylinderGeometry(15,15,4,20),new THREE.MeshBasicMaterial({color:'#ffd93b'})),cm1=new THREE.Mesh(new THREE.CylinderGeometry(9,9,5,20),new THREE.MeshBasicMaterial({color:'#e8a800'}));cm0.rotation.x=cm1.rotation.x=1.5708;cn.add(cm0,cm1);m.add(cn);gw.add(m);s.m=m;s.cn=cn}s.m.position.set(s.x,0,s.y);if(s.cn){s.cn.rotation.y=g.t*2.2;s.cn.position.y=100+Math.sin(g.t*2.4)*5}}}
function drawSV(g){for(const s of (g.sv||[])){if(!s.m){const m=new THREE.Group(),bm0=c=>new THREE.MeshBasicMaterial({color:c,transparent:true,opacity:.8,side:THREE.DoubleSide,depthWrite:false}),rg=new THREE.Mesh(new THREE.RingGeometry(s.r-10,s.r,40),bm0('#7dff6a'));rg.rotation.x=-1.5708;rg.position.y=2;m.add(rg);
const di=new THREE.Mesh(new THREE.CircleGeometry(s.r-10,40),bm0('#7dff6a'));di.material.opacity=.18;di.rotation.x=-1.5708;di.position.y=1.5;m.add(di);
const bm=new THREE.Mesh(new THREE.CylinderGeometry(s.r*.5,s.r*.5,1800,16,1,true),new THREE.MeshBasicMaterial({color:'#7dff6a',transparent:true,opacity:.22,depthWrite:false,side:THREE.DoubleSide,fog:false}));bm.position.y=900;m.add(bm);
const cr=new THREE.Group(),c1=new THREE.Mesh(BG,new THREE.MeshBasicMaterial({color:'#ffffff'})),c2=new THREE.Mesh(BG,new THREE.MeshBasicMaterial({color:'#ffffff'}));c1.scale.set(18,6,58);c2.scale.set(58,6,18);cr.add(c1,c2);cr.position.y=14;m.add(cr);gw.add(m);s.m=m;s.rg=rg;s.di=di;s.bm=bm;s.cr=cr}
const rd=s.cd<=0,col=rd?'#7dff6a':'#7a8a80';s.m.position.set(s.x,0,s.y);s.rg.material.color.set(col);s.di.material.color.set(col);s.bm.material.color.set(col);s.bm.visible=rd;s.di.material.opacity=.18+.35*cl(s.pg/10,0,1);s.cr.rotation.y=g.t*.9;s.cr.position.y=14+Math.sin(g.t*2)*3}}
function svHUD(g,p){const c=g.room?cfo():p;if(!c||c.dead||!g.sv)return;for(const s of g.sv){if(s.pg>0&&s.tm===c.tm&&Math.hypot(c.x-s.x,c.y-s.y)<s.r+30){const bw=180,bx=W/2-bw/2,by=72;hPan(bx-8,by-16,bw+16,42,10);Tx('SALVANDO A EQUIPE '+Math.ceil(10-s.pg)+'s',W/2,by-4,12,'#7dff6a');X.fillStyle='rgba(255,255,255,.2)';X.fillRect(bx,by+8,bw,8);X.fillStyle='#7dff6a';X.fillRect(bx,by+8,bw*cl(s.pg/10,0,1),8);break}}}

/* ===== CUTSCENE DE VITORIA + PLACAR ===== */
let vsc=null,vcam=null;
function vicName(o){return o.ctg&&o.cl&&o.bn?'['+o.ctg+'] '+o.bn:o.name}
function vicWinner(){const g=G;if(g.cs){const c=g.cs;return c.sc[0]==c.sc[1]?null:g.teams[c.sc[0]>c.sc[1]?0:1]}const al=g.teams.filter(t=>t.alive>0);return al.length==1?al[0]:null}
function vicRank(T){return T.m.slice().sort((a,b)=>(b.kills||0)-(a.kills||0)||(b.assists||0)-(a.assists||0)||(a.dead?1:0)-(b.dead?1:0))}
function vicLbl(txt,col,bg,fs){const c=document.createElement('canvas');c.width=512;c.height=128;const q=c.getContext('2d');q.font='900 '+fs+'px "Trebuchet MS",Arial';const w=Math.min(496,q.measureText(txt).width+44);q.fillStyle=bg;q.strokeStyle='#0d1a13';q.lineWidth=8;q.beginPath();q.roundRect(256-w/2,14,w,100,26);q.fill();q.stroke();q.fillStyle=col;q.textAlign='center';q.textBaseline='middle';q.fillText(txt,256,66);const sp=new THREE.Sprite(new THREE.SpriteMaterial({map:new THREE.CanvasTexture(c),transparent:true,depthTest:false}));sp.renderOrder=10;sp.scale.set(64,16,1);return sp}
function vicCrown(){const g=new THREE.Group(),M=c=>new THREE.MeshLambertMaterial({color:c,emissive:'#6a4a00'}),pt=(w,h,d,x,y)=>{const o=new THREE.Mesh(BG,M('#ffd93b'));o.scale.set(w,h,d);o.position.set(x,y,0);g.add(o)};pt(22,5,10,0,0);for(const x of[-8,0,8])pt(5,x?9:13,5,x,x?6:8);return g}
function vicStart(T){const g=G;g.vic={t:0,T,ok:0,sk:0};if($('cs'))$('cs').classList.remove('on');
const rk=vicRank(T),mvp=rk[0];g.vic.rk=rk;g.vic.mvp=mvp;
vsc=new THREE.Scene();{const c=document.createElement('canvas');c.width=4;c.height=256;const q=c.getContext('2d'),gr=q.createLinearGradient(0,0,0,256);gr.addColorStop(0,'#1a2a6c');gr.addColorStop(.5,'#b21f6b');gr.addColorStop(1,'#fdbb2d');q.fillStyle=gr;q.fillRect(0,0,4,256);vsc.background=new THREE.CanvasTexture(c)}
vsc.add(new THREE.HemisphereLight('#ffffff','#8a6fb0',.95));const dl=new THREE.DirectionalLight('#fff3d0',.9);dl.position.set(.4,1,.9);vsc.add(dl);
const col=T.col||mvp.col||'#ffd93b';
/* raios de luz girando */
{const c=document.createElement('canvas');c.width=c.height=512;const q=c.getContext('2d');q.translate(256,256);for(let i=0;i<16;i++){q.fillStyle='rgba(255,255,255,.22)';q.beginPath();q.moveTo(0,0);q.arc(0,0,256,i*Math.PI/8,i*Math.PI/8+Math.PI/16);q.closePath();q.fill()}const rg=q.createRadialGradient(0,0,0,0,0,256);rg.addColorStop(0,'rgba(0,0,0,0)');rg.addColorStop(1,'rgba(0,0,0,1)');q.globalCompositeOperation='destination-out';q.fillStyle=rg;q.fillRect(-256,-256,512,512);
const ry=new THREE.Mesh(new THREE.PlaneGeometry(900,900),new THREE.MeshBasicMaterial({map:new THREE.CanvasTexture(c),transparent:true,depthWrite:false}));ry.position.set(0,90,-160);vsc.add(ry);g.vic.ry=ry}
/* palco */
const n=rk.length,span=Math.max(1,Math.ceil((n-1)/2))*66*2;
const fl=new THREE.Mesh(new THREE.PlaneGeometry(2000,2000),new THREE.MeshLambertMaterial({color:'#2b2150'}));fl.rotation.x=-Math.PI/2;vsc.add(fl);
const pw=Math.max(150,span+110),pl=new THREE.Mesh(BG,new THREE.MeshLambertMaterial({color:col}));pl.scale.set(pw,8,110);pl.position.set(0,4,10);vsc.add(pl);
const pt2=new THREE.Mesh(BG,new THREE.MeshLambertMaterial({color:'#ffffff'}));pt2.scale.set(pw+8,2,118);pt2.position.set(0,8.6,10);vsc.add(pt2);
const gb=new THREE.Mesh(BG,new THREE.MeshLambertMaterial({color:'#ffd93b',emissive:'#5a4300'}));gb.scale.set(60,22,60);gb.position.set(0,11,32);vsc.add(gb);
/* personagens */
g.vic.ch=[];rk.forEach((o,i)=>{const f2=Object.assign({},o),m=mkMesh(f2),isM=i==0,k=Math.ceil(i/2),side=i%2?1:-1,x=isM?0:side*k*64,z=isM?32:(8-k*3),by=isM?22:9;
const sc2=isM?1.2:1;const root=new THREE.Group();root.position.set(x,by,z);root.scale.set(sc2,sc2,sc2);root.add(m);m.rotation.y=isM?0:-side*.25;vsc.add(root);
const L=vicLbl(vicName(o),'#ffffff','#181513e6',44);L.position.set(0,92,0);root.add(L);
if(isM){const M2=vicLbl('MVP','#2b1700','#ffd93b',72);M2.position.set(0,112,0);M2.scale.set(40,10,1);root.add(M2);g.vic.mvpL=M2;const cr=vicCrown();cr.position.set(0,73,0);m.add(cr)}
g.vic.ch.push({f:f2,m,root,ph:i*1.1,base:by,isM,sc:sc2})});
g.vic.span=span;
/* confete */
g.vic.cf=[];const cc=['#ff5a5a','#ffd93b','#7dff6a','#4aa3ff','#ff7ad9','#ffffff'];for(let i=0;i<110;i++){const o=new THREE.Mesh(BG,new THREE.MeshBasicMaterial({color:cc[i%6]}));o.scale.set(4,2,.6);o.position.set(rr(-260,260),rr(0,300),rr(-60,120));o.userData={vy:rr(40,90),rx:rr(-6,6),rz:rr(-6,6),sx:rr(-14,14)};vsc.add(o);g.vic.cf.push(o)}
vcam=new THREE.PerspectiveCamera(42,W/H,5,4000);
$('vicT').textContent=T.m.length>1?'VENCEDORES':'VENCEDOR';
$('vicT').style.animation='none';$('vicS').style.animation='none';void $('vicT').offsetWidth;$('vicT').style.animation='';$('vicS').style.animation='';
$('vicS').textContent=T.cl&&T.cl.n?(T.cl.tag?'['+T.cl.tag+'] ':'')+T.cl.n:'';
$('vicH').classList.remove('on');$('vic').classList.add('on');
$('vic').onclick=()=>{if(G.vic&&G.vic.t>1.6)vicEnd()};
if(G.teams[G.p.tm]===T||G.room){G.vicMus=1;mus('win')}}
function vicDraw(){const v=G.vic;if(!v||!vsc)return;const dt=gdt;v.t+=dt;const t=v.t;
if(t>2&&!v.hint){v.hint=1;$('vicH').classList.add('on')}
for(const c of v.ch){const T2=t*5+c.ph,jp=Math.abs(Math.sin(T2))*(c.isM?26:18),sq=1+Math.max(0,.06-Math.abs(Math.sin(T2))*.06);c.root.position.y=c.base+jp;const f=c.f;
const w=Math.sin(t*9+c.ph)*.35;if(f.a1)f.a1.rotation.z=-(2.45+w);if(f.a2)f.a2.rotation.z=2.45-w;
if(f.l1)f.l1.rotation.x=Math.sin(T2)>.5?0:-.35;if(f.l2)f.l2.rotation.x=Math.sin(T2)>.5?0:.35;
c.m.rotation.y=c.isM?Math.sin(t*2)*.22:c.m.rotation.y*.98+Math.sin(t*2+c.ph)*.004;
if(f.gun)f.gun.visible=false;if(f.pc)f.pc.visible=false}
if(v.mvpL){const s=1+Math.sin(t*6)*.07;v.mvpL.scale.set(40*s,10*s,1)}
v.ry.rotation.z=t*.25;
for(const o of v.cf){const u=o.userData;o.position.y-=u.vy*dt;o.position.x+=Math.sin(t*2+u.sx)*10*dt;o.rotation.x+=u.rx*dt;o.rotation.z+=u.rz*dt;if(o.position.y<0){o.position.y=300;o.position.x=rr(-260,260)}}
const fv=Math.tan(42*Math.PI/360),asp=W/H,need=(v.span/2+75)/(fv*Math.min(asp,2)),zoom=Math.min(1,t/1.4),e=1-Math.pow(1-zoom,3),dist=Math.max(400,need*1.25)*(1.6-.6*e);
vcam.aspect=asp;vcam.updateProjectionMatrix();vcam.position.set(Math.sin(t*.5)*28*e,80+22*(1-e),dist+10);vcam.lookAt(0,108,20);
ren.render(vsc,vcam);
if(t>=7.5&&!v.ok)vicEnd()}
function vicClear(){if(!vsc)return;vsc.traverse(o=>{if(o.material){const m=Array.isArray(o.material)?o.material:[o.material];for(const x of m){if(x.map&&o.isSprite)x.map.dispose();x.dispose()}}});vsc=null}
function vicEnd(){const v=G.vic;if(!v||v.ok)return;v.ok=1;G.vic=null;$('vic').classList.remove('on');vicClear();vicBoard(v)}
function vicBoard(v){finish2();$('end').classList.add('hide');$('vsbT').textContent=$('place').textContent||'RESULTADO';$('vsbE').textContent=$('est').textContent;const L=$('vsbL');L.innerHTML='';const mk=(cls,a,b,c,d,i)=>{const r=document.createElement('div');r.className='vr '+cls;if(i!=null)r.style.animationDelay=(i*.09)+'s';const n=document.createElement('span');n.className='nm';n.textContent=a;if(d){const m=document.createElement('span');m.className='mt';m.textContent='MVP';n.appendChild(m)}r.appendChild(n);for(const x of[b,c]){const s=document.createElement('span');s.textContent=x;r.appendChild(s)}L.appendChild(r);return r};
mk('hd','JOGADOR','KILLS','ASSIST.');let k=0,a=0;v.rk.forEach((o,i)=>{const kk=o.kills||0,aa=o.assists||0;k+=kk;a+=aa;const r=mk((o===v.mvp?'mv ':'')+(o.isP?'me':''),vicName(o),kk,aa,o===v.mvp,i)});
if(v.rk.length>1)mk('tt','TOTAL DA EQUIPE',k,a,0,v.rk.length);
$('vsb').classList.remove('hide');
$('vsbA').onclick=()=>{$('vsb').classList.add('hide');$('again').onclick()};$('vsbM').onclick=()=>{$('vsb').classList.add('hide');$('menuBtn').onclick()}}
function finish(){G.done=1;mode='end';const WT=vicWinner();if(WT){vicStart(WT);return}vicBoard({rk:vicRank(G.teams[G.p.tm]),mvp:null})}
function finish2(){if(G.cs){const c=G.cs,win=c.sc[0]>c.sc[1],p=G.p;if(G.room){$('cs').classList.remove('on');mus('win');const WT=c.sc[0]==c.sc[1]?null:G.teams[c.sc[0]>c.sc[1]?0:1],wc=WT&&clOf(WT),CM=clAcc(WT);if(wc&&!G.wf){clWin(wc.id);}$('place').textContent=G.wf?'PARTIDA ENCERRADA':'GUERRA DE CLÃS ENCERRADA';$('est').textContent='Contra Squad - Placar final: '+c.sc[0]+' x '+c.sc[1]+'  ('+(c.sc[0]>c.sc[1]?'Equipe 1 venceu':c.sc[1]>c.sc[0]?'Equipe 2 venceu':'Empate')+')'+(wc?'   Clã vencedor: ['+wc.tag+'] '+wc.n+' (+1 vitória)':'')+clSum(CM);$('end').classList.remove('hide');return}$('cs').classList.remove('on');const WT=c.sc[0]>c.sc[1]?G.teams[0]:c.sc[1]>c.sc[0]?G.teams[1]:null,CM=clAcc(WT);if(win)mus('win');else loseS();const gain=p.kills*40+(win?500:100);coins+=gain;svD();$('coins').textContent=fmt(coins);$('place').textContent=win?'VITORIA!':'DERROTA';$('est').textContent='Modo: CONTRA SQUAD   Placar: '+c.sc[0]+' x '+c.sc[1]+'   Eliminacoes: '+p.kills+'   Moedas: +'+gain+clSum(CM);$('end').classList.remove('hide');return}if(G.room){mus('win');const w=G.teams.find(t=>t.alive>0),wc=w&&clOf(w),CM=clAcc(w);if(wc&&!G.wf){clWin(wc.id);}$('place').textContent=G.wf?'PARTIDA ENCERRADA':'GUERRA DE CLÃS ENCERRADA';$('est').textContent='Vencedores: '+(w?w.m.map(o=>o.name).join(', '):'ninguem')+(wc?'   Clã vencedor: ['+wc.tag+'] '+wc.n+' (+1 vitória)':'')+clSum(CM);$('end').classList.remove('hide');return}const p=G.p,PT=G.teams[p.tm],win=PT.alive>0;let WT=PT;if(!win){const al=G.teams.filter(t=>t.alive>0&&t!==PT);WT=al.length?al[Math.random()*al.length|0]:null}const CM=clAcc(WT);if(win)mus('win');else loseS();
$('place').textContent=win?(MS>1?'BOOYAH!':'CAMPEAO'):'#'+p.place+' LUGAR';const tk=PT.m.reduce((a,o)=>a+o.kills,0),gain=p.kills*40+(win?500:Math.max(0,100-(p.place||40)*2));coins+=gain;svD();$('coins').textContent=fmt(coins);$('est').textContent='Modo: '+MN[MS]+(MS>1&&PT.m.length==1?' (sozinho)':'')+'   Eliminacoes: '+p.kills+(PT.m.length>1?'   Equipe: '+tk:'')+'   Jogadores: 40   Moedas: +'+gain+clSum(CM);$('end').classList.remove('hide')}

/* ---------- render ---------- */
function clLum(c){const m=/^#([0-9a-f]{6})$/i.exec(c);if(!m)return .5;const n=parseInt(m[1],16);return(.299*(n>>16)+.587*(n>>8&255)+.114*(n&255))/255}
function clMix(a,b,t){const ma=/^#([0-9a-f]{6})$/i.exec(a),mb=/^#([0-9a-f]{6})$/i.exec(b);if(!ma||!mb)return a;const x=parseInt(ma[1],16),y=parseInt(mb[1],16),k=i=>Math.round((x>>i&255)*(1-t)+(y>>i&255)*t);return'#'+((1<<24)|(k(16)<<16)|(k(8)<<8)|k(0)).toString(16).slice(1)}
function tagCol(c){return clLum(c)<.4?clMix(c,'#ffffff',.38):c}
function TxS(sg,x,y,sz,al){X.font='900 '+sz+'px Trebuchet MS,Arial,sans-serif';X.textBaseline='middle';X.textAlign='left';X.lineWidth=sz/4;X.lineJoin='round';X.strokeStyle='#0d1a13';const ws=sg.map(q=>X.measureText(q[0]).width),tw=ws.reduce((a,b)=>a+b,0);let px=al=='left'?x:al=='right'?x-tw:x-tw/2;const xs=ws.map(w=>{const r=px;px+=w;return r});sg.forEach((q,i)=>{X.strokeStyle=q[3]==2?'#ff1a1a':'#0d1a13';X.strokeText(q[0],xs[i],y)});sg.forEach((q,i)=>{X.fillStyle=q[1];if(q[3]){X.save();X.shadowColor=q[3]==2?'rgba(255,30,30,.95)':'rgba(255,160,20,.95)';X.shadowBlur=sz*.55;X.fillText(q[0],xs[i],y);X.restore()}else X.fillText(q[0],xs[i],y);if(q[2]=='yt'){if(VBIMG.complete&&VBIMG.naturalWidth){const gp=.5+.5*Math.sin(Date.now()/280),d=sz*1.2;X.save();X.imageSmoothingEnabled=false;X.shadowColor='rgba(255,170,30,'+(.5+.4*gp)+')';X.shadowBlur=sz*(.2+.4*gp);X.drawImage(VBIMG,xs[i]+sz*.02,y-sz*.02-d/2,d,d);X.restore()}}if(q[2]=='ow'){if(!window.OWI){window.OWI=new Image();window.OWI.src=(OWB('x').match(/href="([^"]+)"/)||[])[1]||''}const r=sz*.5,bx=xs[i]+sz*.1+r,by=y-sz*.02;X.save();X.shadowColor='rgba(255,30,30,.9)';X.shadowBlur=sz*.4;X.fillStyle='#ff1a1a';X.beginPath();X.arc(bx,by,r,0,6.2832);X.fill();X.shadowBlur=0;X.fillStyle='#fff';X.beginPath();X.arc(bx,by,r*.88,0,6.2832);X.fill();if(window.OWI.complete&&window.OWI.naturalWidth){X.imageSmoothingEnabled=false;X.drawImage(window.OWI,bx-r*.72,by-r*.72,r*1.44,r*1.44)}X.restore()}if(q[2]=='sk'){const r=sz*.5,cx=xs[i]+sz*.1+r,cy=y-sz*.06;X.save();X.lineWidth=Math.max(1.5,sz/7);X.strokeStyle='#0d1a13';X.fillStyle='#ff2a2a';X.beginPath();X.arc(cx,cy-r*.12,r*.92,0,6.2832);X.fill();X.stroke();X.beginPath();X.roundRect(cx-r*.5,cy+r*.5,r*1,r*.62,r*.18);X.fill();X.stroke();X.beginPath();X.arc(cx,cy-r*.12,r*.9,0,6.2832);X.fill();X.fillStyle='#0d1a13';X.beginPath();X.arc(cx-r*.38,cy-r*.1,r*.26,0,6.2832);X.arc(cx+r*.38,cy-r*.1,r*.26,0,6.2832);X.fill();X.beginPath();X.moveTo(cx,cy+r*.12);X.lineTo(cx-r*.12,cy+r*.36);X.lineTo(cx+r*.12,cy+r*.36);X.closePath();X.fill();X.fillRect(cx-r*.22,cy+r*.62,r*.09,r*.4);X.fillRect(cx+r*.13,cy+r*.62,r*.09,r*.4);X.restore()}});if(sg.mic){const e=xs[xs.length-1]+ws[ws.length-1]+4,m=sz*.5,cx=e+m*.7;X.save();X.globalAlpha=.7+.3*Math.sin(Date.now()/130);X.fillStyle=X.strokeStyle='#7dff6a';X.lineWidth=Math.max(1,m*.28);X.lineCap='round';X.beginPath();X.roundRect(e+m*.2,y-m*1.15,m*1.0,m*1.6,m*.5);X.fill();X.beginPath();X.arc(cx,y-m*.15,m*.85,.1,Math.PI-.1);X.stroke();X.beginPath();X.moveTo(cx,y+m*.7);X.lineTo(cx,y+m*1.1);X.stroke();X.restore()}}
function spk(o){const g=G;return !!(g&&g.say&&o&&!o.isP&&!o.dead&&g.say.some(q=>q.o===o&&g.t>=q.a&&g.t<=q.b))}
function nmSgM(o,pre,suf){const a=nmSg(o,pre,suf);if(spk(o))a.mic=1;return a}
function goldNm(){const k=.5+.5*Math.sin(Date.now()/260);return 'rgb('+((246+9*k)|0)+','+((168+62*k)|0)+','+((28+74*k)|0)+')'}
function nmSg(o,pre,suf){const a=[],OW=!!isOwner(String(o.cm||o.bn||o.name||'').replace(/^\*/,'').replace(/^\[[^\]]*\]\s*/,'')),IF=!OW&&!!(o.yt||(!o.isP&&(o.INF||isInfl(String(o.cm||o.bn||o.name||'').replace(/^\*/,'').replace(/^\[[^\]]*\]\s*/,'')))));if(pre)a.push([pre,'#fff']);if(o.ctg&&o.cl&&o.bn){a.push(['['+o.ctg+'] ',tagCol(o.cl.col)]);a.push([o.bn,OW?'#050505':IF?goldNm():'#fff',0,OW?2:IF])}else a.push([o.name,OW?'#050505':IF?goldNm():'#fff',0,OW?2:IF]);if(OW)a.push(['\u00a0\u00a0\u00a0\u00a0','#fff','ow']);if(IF)a.push(['\u00a0\u00a0\u00a0\u00a0','#fff','yt']);if(suf)a.push(suf);return a}
function hPan(x,y,w,h,r){X.save();const g=X.createLinearGradient(0,y,0,y+h);g.addColorStop(0,'rgba(40,33,28,.9)');g.addColorStop(1,'rgba(18,14,12,.9)');X.fillStyle=g;X.strokeStyle='rgba(255,102,0,.7)';X.lineWidth=1.5;X.beginPath();X.roundRect(x,y,w,h,[4,r,4,r]);X.fill();X.stroke();X.restore()}
function hBar(x,y,w,h,p,c1,c2){X.save();X.fillStyle='rgba(19,15,13,.88)';X.strokeStyle='rgba(255,102,0,.6)';X.lineWidth=1.5;X.beginPath();X.roundRect(x,y,w,h,h/2);X.fill();X.stroke();const iw=Math.max(0,(w-4)*p);if(iw>2){const g=X.createLinearGradient(0,y,0,y+h);g.addColorStop(0,c1);g.addColorStop(1,c2);X.fillStyle=g;X.beginPath();X.roundRect(x+2,y+2,iw,h-4,(h-4)/2);X.fill();X.fillStyle='rgba(255,255,255,.3)';X.beginPath();X.roundRect(x+3,y+3,Math.max(0,iw-2),(h-4)/3,2);X.fill()}X.restore()}
function Tx(s,x,y,sz,c,al='center'){X.font='900 '+sz+'px Trebuchet MS,Arial,sans-serif';X.textAlign=al;X.textBaseline='middle';X.lineWidth=sz/4;X.lineJoin='round';X.strokeStyle='#0d1a13';X.strokeText(s,x,y);X.fillStyle=c;X.fillText(s,x,y)}
/* ---------- 3D ---------- */
const BG=new THREE.BoxGeometry(1,1,1),mat=(c,o)=>new THREE.MeshLambertMaterial(Object.assign({color:c},o)),flat=g=>{const n=g.toNonIndexed();n.computeVertexNormals();return n};
const GS=[0,[18,6,'#d3d8e2'],[26,7,'#4a4f63'],[38,7,'#8a5a30'],[42,7,'#4a5568'],[58,7,'#3d4a63']],IT={};
function qMk(){const old=ren,nr=new THREE.WebGLRenderer({antialias:QG>0,stencil:false,powerPreference:'high-performance'}),e=nr.domElement;e.addEventListener('webglcontextrestored',()=>{try{sc.traverse(o=>{const a=o.material?(Array.isArray(o.material)?o.material:[o.material]):[];for(const m of a){m.needsUpdate=true;if(m.map)m.map.needsUpdate=true}})}catch(_){}});e.style.cssText='position:fixed;inset:0;width:100%;height:100%;display:block;touch-action:none';document.body.insertBefore(e,C);ren=nr;if(old){try{old.dispose();old.forceContextLoss();old.domElement.remove()}catch(_){}}}
function init3(){qMk();
sc=new THREE.Scene();{const sk=document.createElement('canvas');sk.width=4;sk.height=256;const sq=sk.getContext('2d'),sg=sq.createLinearGradient(0,0,0,256);sg.addColorStop(0,'#4aa8f0');sg.addColorStop(.35,'#8fcdfb');sg.addColorStop(.6,'#d4ecff');sg.addColorStop(1,'#d4ecff');sq.fillStyle=sg;sq.fillRect(0,0,4,256);sc.background=new THREE.CanvasTexture(sk)}sc.fog=new THREE.Fog('#d4ecff',1200,5600);cam3=new THREE.PerspectiveCamera(65,W/H,5,QFAR);
sc.add(new THREE.HemisphereLight('#dcefff','#6f9a52',.82));const dl=new THREE.DirectionalLight('#fff0d2',.88);dl.position.set(.6,1,.35);sc.add(dl);
const oc=new THREE.Mesh(new THREE.PlaneGeometry(30000,30000),mat('#2f7fd1'));oc.rotation.x=-1.5708;oc.material.color.set('#dc712a');oc.position.set(CX,-3,CY);sc.add(oc);{const bc=new THREE.Mesh(new THREE.PlaneGeometry(S+700,S+700),mat('#e9d9a6'));bc.rotation.x=-1.5708;bc.position.set(CX,-1.2,CY);sc.add(bc);const sh=new THREE.Mesh(new THREE.PlaneGeometry(S+1500,S+1500),mat('#eeb37f',{transparent:true,opacity:.55}));sh.rotation.x=-1.5708;sh.position.set(CX,-2.2,CY);sc.add(sh)}
let cv=document.createElement('canvas');cv.width=cv.height=256;let q=cv.getContext('2d');q.fillStyle='#58ad5c';q.fillRect(0,0,256,256);for(let i=0;i<46;i++){const x=Math.random()*256,y=Math.random()*256,r=14+Math.random()*34;q.fillStyle=Math.random()<.5?'rgba(40,120,60,.16)':'rgba(150,215,100,.16)';for(const ox of[-256,0,256])for(const oy of[-256,0,256]){q.beginPath();q.arc(x+ox,y+oy,r,0,7);q.fill()}}for(let i=0;i<900;i++){const x=Math.random()*256,y=Math.random()*256;q.fillStyle=Math.random()<.5?'#4a9a50':'#6cc26c';q.fillRect(x,y,1.5,3+Math.random()*3)}
const gt=new THREE.CanvasTexture(cv);gt.wrapS=gt.wrapT=THREE.RepeatWrapping;gt.repeat.set(S/320,S/320);gt.anisotropy=Math.min(QG>0?8:2,(ren&&ren.capabilities&&ren.capabilities.getMaxAnisotropy?ren.capabilities.getMaxAnisotropy():4));
const gr=new THREE.Mesh(new THREE.PlaneGeometry(S,S),mat('#fff',{map:gt}));gr.rotation.x=-1.5708;gr.position.set(CX,0,CY);sc.add(gr);
cv=document.createElement('canvas');cv.width=cv.height=64;q=cv.getContext('2d');{const g=q.createLinearGradient(0,0,0,64);g.addColorStop(0,'#ffe36a');g.addColorStop(1,'#eab91c');q.fillStyle=g;q.fillRect(0,0,64,64);q.fillStyle='rgba(255,110,80,.38)';q.fillRect(6,40,10,6);q.fillRect(48,40,10,6);for(const x of[12,38]){q.fillStyle='#fff';q.fillRect(x,18,14,16);q.fillStyle='#3b2412';q.fillRect(x+4,20,8,13);q.fillStyle='#0a0a0a';q.fillRect(x+6,23,4,8);q.fillStyle='#fff';q.fillRect(x+9,21,3,3);q.fillStyle='#b88a14';q.fillRect(x,34,14,1)}q.fillStyle='#6b4a12';q.fillRect(10,11,18,4);q.fillRect(36,11,18,4);q.fillStyle='#c98f12';q.fillRect(30,36,4,3);q.lineWidth=3;q.lineCap='round';q.strokeStyle='#6b2a12';q.beginPath();q.arc(32,41,10,.3,2.84);q.stroke();q.fillStyle='#fff';q.fillRect(26,48,12,2)}FT=new THREE.CanvasTexture(cv);{const c4=document.createElement('canvas');c4.width=c4.height=32;const q4=c4.getContext('2d');q4.fillStyle='#eeeef2';q4.fillRect(0,0,32,32);q4.fillStyle='#e00000';q4.fillRect(9,10,3,5);q4.fillRect(20,10,3,5);q4.fillStyle='#fff';q4.fillRect(9,10,1,1);q4.fillRect(20,10,1,1);q4.fillStyle='#555';q4.fillRect(8,8,5,1);q4.fillRect(19,8,5,1);q4.lineWidth=1.5;q4.strokeStyle='#222';q4.beginPath();q4.moveTo(11,20);q4.lineTo(21,20);q4.stroke();q4.fillStyle='#fff';q4.strokeStyle='#777';q4.lineWidth=1;for(const fx of[12,18]){q4.beginPath();q4.moveTo(fx,20);q4.lineTo(fx+2,20);q4.lineTo(fx+1,24);q4.closePath();q4.fill();q4.stroke()}FT4=new THREE.CanvasTexture(c4)}
const cg=new THREE.CylinderGeometry(1,1,900,64,1,true);cg.translate(0,450,0);zc=new THREE.Mesh(cg,new THREE.MeshBasicMaterial({color:'#3c6eff',transparent:true,opacity:.28,side:THREE.DoubleSide,depthWrite:false,fog:false}));sc.add(zc);
const pp=[];for(let i=0;i<64;i++){const a=i/64*6.2832;pp.push(new THREE.Vector3(Math.cos(a),0,Math.sin(a)))}zn=new THREE.LineLoop(new THREE.BufferGeometry().setFromPoints(pp),new THREE.LineBasicMaterial({color:'#fff'}));sc.add(zn);
const pg=new THREE.BufferGeometry();pg.setAttribute('position',new THREE.BufferAttribute(new Float32Array(1200),3));pg.setAttribute('color',new THREE.BufferAttribute(new Float32Array(1200),3));pts=new THREE.Points(pg,new THREE.PointsMaterial({size:7,vertexColors:true}));pts.frustumCulled=false;sc.add(pts);
bus=new THREE.Group();{const bm=(c)=>new THREE.MeshBasicMaterial({color:c}),bx=(w,h,d,m,x,y,z,p)=>{const o=new THREE.Mesh(BG,m);o.scale.set(w,h,d);o.position.set(x,y,z);(p||bus).add(o);return o},BL='#2f7be8',WH='#f4f6fa',YE='#ffd93b',GL='#ffddbf',RD='#e53935',GR='#8d97a4';
bx(60,36,150,mat(BL),0,0,0);bx(62,6,152,mat(YE),0,-6,0);bx(56,6,140,mat(WH),0,21,0);bx(58,4,148,mat('#1e57b8'),0,-17,0);
for(let i=0;i<6;i++)for(const sx of[-1,1])bx(1.2,12,17,bm(GL),sx*30.4,6,-54+i*21.5);
bx(50,15,1.2,bm(GL),0,5,75.4);bx(50,13,1.2,bm(GL),0,5,-75.4);bx(58,5,4,mat(RD),0,-14,76);bx(58,5,4,mat(RD),0,-14,-76);
for(const sx of[-1,1]){bx(9,6,2,bm('#fff6b0'),sx*19,-8,76.2);bx(5,4,2,bm(RD),sx*22,-8,-76.2)}
bx(22,7,32,mat(RD),-10,27,28);bx(18,6,26,mat(YE),12,26.5,-20);bx(6,5,6,bm('#ff3b3b'),0,26,60);
const wl=new THREE.CylinderGeometry(8,8,6,14);for(const sx of[-1,1])for(const sz of[-48,48]){const w=new THREE.Mesh(wl,mat('#222'));w.rotation.z=Math.PI/2;w.position.set(sx*28,-22,sz);bus.add(w);bx(2,2,2,mat('#bbb'),sx*31.5,-22,sz)}
const fl=[];for(const sx of[-1,1]){bx(110,3,38,mat(WH),sx*85,-2,-4);bx(10,3.4,38,mat(RD),sx*137,-2,-4);bx(110,3.2,6,mat(BL),sx*85,-2,-20);
const en=new THREE.Mesh(new THREE.CylinderGeometry(8,8,32,12),mat(GR));en.rotation.x=Math.PI/2;en.position.set(sx*78,-11,-4);bus.add(en);
const nz=new THREE.Mesh(new THREE.ConeGeometry(7,10,12),mat('#444'));nz.rotation.x=Math.PI/2;nz.position.set(sx*78,-11,16);bus.add(nz);
const f1=new THREE.Mesh(new THREE.ConeGeometry(6,30,10),bm('#ff9d2e'));f1.rotation.x=-Math.PI/2;f1.position.set(sx*78,-11,-35);bus.add(f1);fl.push(f1);
const f2=new THREE.Mesh(new THREE.ConeGeometry(3,22,8),bm('#fff3b0'));f2.rotation.x=-Math.PI/2;f2.position.set(sx*78,-11,-31);bus.add(f2);fl.push(f2)}
bx(5,38,28,mat(BL),0,36,-68);bx(5,8,30,mat(RD),0,55,-68);bx(64,3,20,mat(WH),0,14,-72);bx(10,3.2,20,mat(RD),-32,14,-72);bx(10,3.2,20,mat(RD),32,14,-72);
const nose=new THREE.Mesh(new THREE.SphereGeometry(6,10,8),mat(YE));nose.position.set(0,-2,80);bus.add(nose);
const prop=new THREE.Group();prop.position.set(0,-2,85);bx(52,5,1.6,bm('#dfe6ee'),0,0,0,prop);bx(5,52,1.6,bm('#dfe6ee'),0,0,0,prop);bus.add(prop);
const cl=new THREE.Group();const cm=new THREE.MeshBasicMaterial({color:'#ffffff',transparent:true,opacity:.92});for(let i=0;i<70;i++){const cx=Math.random()*9000-500,cz=Math.random()*9000-500,cy=380+Math.random()*420,k=.8+Math.random()*1.3;for(let j=0;j<4;j++){const o=new THREE.Mesh(BG,cm);o.scale.set((120+Math.random()*120)*k,(26+Math.random()*20)*k,(90+Math.random()*100)*k);o.position.set(cx+(j-1.5)*90*k+Math.random()*40,cy+Math.random()*18,cz+Math.random()*80-40);cl.add(o)}}cl.visible=false;sc.add(cl);
bus.scale.set(1.5,1.5,1.5);bus.userData={prop,fl,cl}}sc.add(bus)}
const MC={},mc=c=>MC[c]||(MC[c]=mat(c)),GM=[0,19,36,38,50,78],GP=[0,
[[5,6,18,'#c9ced8',0,0,8],[5,9,6,'#5a3a1f',0,-7,2],[3,3,3,'#222',0,1,18]],
[[6,8,24,'#4a4f63',0,0,10],[4,12,5,'#2d3040',0,-9,8],[3,3,10,'#b9bfcd',0,1,25],[5,8,5,'#2d3040',0,-7,0],[3,3,6,'#e05555',0,5,12]],
[[4,4,34,'#b9bfcd',0,1.5,24],[6,7,18,'#8a5a30',0,0,6],[5,9,12,'#6b4a2a',0,-1,-8],[6,5,10,'#5c6275',0,-3,20]],
[[6,8,28,'#4a5568',0,0,10],[3,3,18,'#b9bfcd',0,1.5,34],[5,10,14,'#6b4a2a',0,-2,-8],[5,13,6,'#222',0,-10,10],[4,4,10,'#222',0,6,10],[5,8,5,'#222',0,-7,0]],
[[6,8,30,'#3d4a63',0,0,8],[3,3,30,'#b9bfcd',0,1.5,40],[6,11,16,'#6b4a2a',0,-2,-10],[5,5,18,'#111',0,7,10],[4,4,1,'#ff944c',0,7,19.5]]];
for(let id=6;id<WL.length;id++){const arr=[];let mx=0;for(const k of WL[id]){let x,y,w,h,c;if(k[0]=='Q'){x=k[1];y=k[2];w=k[3];h=k[4];c=k[5]}else if(k[0]=='C'){x=k[1]-k[3];y=k[2]-k[3];w=h=k[3]*2;c=k[4]}else{const xs=k[1].map(p=>p[0]),ys=k[1].map(p=>p[1]);x=Math.min(...xs);y=Math.min(...ys);w=Math.max(...xs)-x;h=Math.max(...ys)-y;c=k[2]}
arr.push([cl(3+h*14,3,8),Math.max(2,h*40),Math.max(2,w*40),c,0,-(y+h/2)*40,(x+w/2)*40+10]);mx=Math.max(mx,x+w)}GP[id]=arr;GM[id]=mx*40+10}
/* ===== ARMAS REALISTAS v2: modelos 3D detalhados (canos cilindricos, metal polido, miras, carregadores) ===== */
const GCG=(()=>{const g=new THREE.CylinderGeometry(1,1,1,14);g.rotateX(Math.PI/2);return g})(),GMT={};
const gmat=(c,m)=>{const k=c+(m?'m':'');return GMT[k]||(GMT[k]=m?new THREE.MeshPhongMaterial({color:c,specular:'#aab8cc',shininess:70}):new THREE.MeshLambertMaterial({color:c}))};
function gpart(q,sk){const m=new THREE.Mesh(q[7]=='c'?GCG:BG,gmat(sk?skc(q[3],sk):q[3],q[8]));m.scale.set(q[0],q[1],q[2]);m.position.set(q[4],q[5],q[6]);if(q[9])m.rotation.set(q[9][0],q[9][1],q[9][2]);return m}
const gB=(w,h,d,c,x,y,z,m,r)=>[w,h,d,c,x,y,z,'b',m?1:0,r],gC=(r,l,c,x,y,z,m,r2)=>[r,r,l,c,x,y,z,'c',m?1:0,r2];
const K1='#2b2f36',ST='#98a3b2',DK='#181716',PL='#23262c',WD='#7a4a28',WD2='#5c371c',LN='#ff944c',BR='#c9a24a';
const GD=[];
function pistolG(L,sl,fr,gr,sil){const P=[gB(5,5,L,sl,0,3.2,L/2-3,1),gB(4.6,3,L-4,fr,0,-.3,L/2-5,1),gB(4.4,12,6.5,gr,0,-6.5,-.5,0,[.22,0,0]),gB(4.7,1,7,DK,0,-12.7,-1.8,0,[.22,0,0]),gB(1,2.6,1,DK,0,-1.8,3.5),gB(1,1,6.5,fr,0,-3.6,6.5,1),gB(1,2.4,1,fr,0,-2.5,9.5,1),gB(2.6,1.3,1.4,DK,0,6.2,-1.6),gB(1,1.5,1.2,DK,0,6.3,L-5.5),gC(1.15,3,ST,0,3.4,L-1,1)];for(let i=0;i<3;i++)P.push(gB(5.3,3.6,.5,DK,0,3.6,-.5-i*1.3));P.push(gB(.5,1.6,6,DK,2.55,4,L*.45));if(sil)P.push(gC(1.9,15,DK,0,3.4,L+6,1));GD[0]=sil?L+14:L+1;return P}
GD[1]=pistolG(20,'#3b3f48','#2a2d34',PL);let g1=GD[0];
GD[7]=pistolG(26,'#d3d8e2','#9aa1b0','#5c371c');let g7=GD[0];GD[7].push(gB(2.6,1,20,'#8d93a3',0,5.9,16,1));
function revG(){const P=[gB(4.6,6.4,14,'#6b7280',0,1.6,5,1),gC(3.9,8,'#8d93a3',0,2.6,9,1),gC(1.6,22,'#5a6270',0,4.4,24,1),gB(2,1,22,'#4a505c',0,6.3,24,1),gC(.7,13,'#8d93a3',0,1.3,20,1),gB(4.6,12,6,WD,0,-6.5,-1.5,0,[.3,0,0]),gB(1.2,3,2,DK,0,5.5,-2,0,[-.5,0,0]),gB(1,1,6,'#6b7280',0,-3,6,1),gB(1,1.5,1.2,DK,0,6.9,34),gB(2.4,1,1.5,DK,0,6.4,0),gC(2.1,2,'#8d93a3',0,4.4,35,1)];for(let i=0;i<6;i++){const a=i*1.047;P.push(gC(.7,8.4,DK,Math.cos(a)*2.7,2.6+Math.sin(a)*2.7,9))}return P}
GD[6]=revG();
function smgG(c,o){const P=[gB(5.4,6.4,24,c,0,2.4,6,1),gB(5,1.2,24,DK,0,5.9,6,1),gB(4,9,5,PL,0,-6,-1,0,[.3,0,0]),gB(1,2.6,1,DK,0,-2,6),gB(1,1,6,c,0,-3.2,8,1),gB(2.4,1.6,1.5,DK,0,7,-3),gB(.8,2,1,DK,0,6.6,o.mz-4),gC(1.1,o.bl||10,ST,0,2.8,o.mz-(o.bl||10)/2,1),gB(.5,2,5,'#090808',2.75,3.4,4)];
if(o.cv){P.push(gB(3.4,6,5.4,o.mc||DK,0,-6.5,9.5,0,[-.1,0,0]),gB(3.4,6,5.4,o.mc||DK,0,-11.5,11.5,0,[-.35,0,0]))}else P.push(gB(3.4,o.m||11,5.4,o.mc||DK,0,-5-(o.m||11)/2+1,o.mx||9.5,0,[-.12,0,0]));
if(o.hg)P.push(gB(5,5.4,11,o.hg,0,1.8,24,1),gB(3,6,3,PL,0,-3.2,25));if(o.st)P.push(gB(3.4,1.4,13,DK,0,3,-12,1),gB(3.4,1.4,13,DK,0,0,-12,1),gB(4,6.5,1.6,PL,0,1.4,-19));if(o.sil)P.push(gC(2,16,DK,0,2.8,o.mz+4,1));if(o.dot)P.push(gB(3,3,5,DK,0,8,6,1),gB(2.4,2.4,.5,'#ffb06a',0,8,8.8));GD[0]=o.mz+(o.sil?12:1);return P}
GD[2]=smgG('#2f333c',{mz:38,bl:10,hg:'#2f333c',st:1,sil:0});let g2=GD[0];
GD[8]=smgG('#3a3f52',{mz:30,bl:7,m:15,mx:-1,mc:'#2d3040',st:1});let g8=GD[0];
GD[9]=smgG('#2a2e36',{mz:40,bl:12,hg:'#232120',st:1,cv:1,mc:'#232120'});let g9=GD[0];
GD[10]=smgG('#5f656f',{mz:36,bl:8,hg:'#4a4f58',cv:0,m:12,mx:2,mc:DK,sil:1,dot:1});let g10=GD[0];
function shG(o){const P=[gB(5.4,7,18,o.rc,0,2,4,1),gC(1.6,36,ST,0,3.8,31,1),gC(1.5,28,ST,0,.8,27,1),gB(5.6,4.4,13,o.fo,0,.6,27,o.pl?1:0),gB(.8,1,.8,'#ffcf45',0,6,48.5),gB(1.4,.8,32,DK,0,5.6,30),gB(4.4,6,6,o.st,0,-3,-3,0,[.3,0,0]),gB(.5,2,5,'#090808',2.75,3.4,4)];if(o.fold){P.push(gB(3,1.4,18,o.rc,0,2.2,-14,1),gB(4.6,7,2,o.st,0,-1,-23),gB(3.8,9,4.6,PL,0,-6,-1,0,[.35,0,0]),gB(2,1.2,22,DK,0,7,8,1))}else{P.push(gB(5,9,17,o.st,0,-.5,-14,0,[.1,0,0]),gB(5.2,9.4,1.5,DK,0,-.8,-22.6,0,[.1,0,0]))}if(o.pl)P.push(gC(2.3,28,o.rc,0,3.8,26,1));GD[0]=50;return P}
GD[3]=shG({rc:'#4a4f58',fo:WD2,st:WD});let g3=50;
GD[12]=shG({rc:'#3a4152',fo:WD,st:WD2});let g12=50;
GD[13]=shG({rc:'#2a2e36',fo:PL,st:PL,fold:1,pl:1});let g13=50;
GD[11]=(()=>{const P=[gB(6,7.5,12,'#6b7280',0,2.2,7,1),gB(6.2,3.6,12,WD,0,-.2,24),gB(5,9,18,WD,0,-.5,-14,0,[.1,0,0]),gB(5.2,9.4,1.5,DK,0,-.8,-22.6,0,[.1,0,0]),gB(1,.8,38,DK,0,5.4,32,1),gB(.8,1,.8,'#ffcf45',0,6,50),gB(4.4,6,6,WD,0,-3,-3,0,[.3,0,0]),gB(1.4,1,6,'#6b7280',0,-3,6,1)];for(const s of[-1,1]){P.push(gC(1.65,40,ST,s*1.8,3,31,1),gB(.8,2.6,1.4,ST,s*1.8,5.2,-.5,1,[-.4,0,0]))}return P})();let g11=52;
function arG(o){const P=[gB(5,5.5,26,o.b,0,3,6,1),gB(4.6,4.2,16,o.b,0,-1.2,4,1),o.rh?gC(3.1,17,o.hg,0,2.8,27,1):gB(5.2,5.4,17,o.hg,0,2.6,27,o.wood?0:1),gC(1.1,o.bl||14,ST,0,3,35+(o.bl||14)/2,1),gC(1.6,4,DK,0,3,35+(o.bl||14)+1.5,1),gB(1.6,3.5,1.6,DK,0,6,35),gB(3.8,9.5,4.6,o.gr||PL,0,-6,-3,0,[.4,0,0]),gB(1,1,7,o.b,0,-3.4,6,1),gB(1,2.6,1,DK,0,-2.2,5),gB(2.4,.9,22,DK,0,6.2,5,1),gB(2,1,2.5,DK,0,6.6,-6),gB(.5,2.2,5,'#090808',2.55,3.6,5),gC(1.5,10,DK,0,2.5,-12,1),gB(4.2,8,13,o.st,0,0,-17,0,[.12,0,0]),gB(4.4,8.6,1.5,DK,0,-.2,-24)];
if(o.mag=='cv')P.push(gB(3.4,6,5.8,o.mc,0,-6.5,10,0,[-.1,0,0]),gB(3.4,6,5.8,o.mc,0,-12,12.5,0,[-.4,0,0]));else P.push(gB(3.4,11,5.8,o.mc,0,-8.5,9.5,0,[-.1,0,0]));
if(o.opt=='dot')P.push(gB(3.4,3.4,6,DK,0,8.4,6,1),gB(2.6,2.6,.6,'#ffb06a',0,8.4,9.2),gB(2,1.5,3,DK,0,7,6,1));else if(o.opt=='scope')P.push(gC(2,15,DK,0,9,6,1),gC(2.4,3,DK,0,9,14,1),gC(2.3,3,DK,0,9,-2,1),gC(2.2,.5,LN,0,9,15.6,0),gB(1.6,2.4,1.8,DK,0,7,2,1),gB(1.6,2.4,1.8,DK,0,7,10,1));else P.push(gB(3,1.2,1.2,DK,0,7,-3),gB(.8,2.6,.8,DK,0,8,35));
if(o.gas)P.push(gC(1.2,16,ST,0,6.3,27,1),gB(2.4,1.2,6,DK,0,6.8,10));GD[0]=35+(o.bl||14)+4;return P}
GD[4]=arG({b:'#3a4152',hg:'#2d3040',st:'#2d3040',mc:DK,mag:'st',opt:'iron'});let g4=GD[0];
GD[14]=arG({b:'#3a3f4a',hg:WD,st:WD,gr:WD2,wood:1,gas:1,mc:'#2d3040',mag:'cv',opt:'iron',bl:12});let g14=GD[0];
GD[15]=arG({b:'#2a2e36',hg:'#2a2e36',st:'#23262c',rh:1,mc:DK,mag:'st',opt:'dot',bl:12});let g15=GD[0];
GD[16]=arG({b:'#9a8a60',hg:'#9a8a60',st:'#8a7b52',mc:'#6b5e3c',mag:'st',opt:'dot',bl:14});let g16=GD[0];
GD[19]=arG({b:'#4a5568',hg:'#3a4152',st:WD2,mc:DK,mag:'st',opt:'scope',bl:22});let g19=GD[0];
GD[17]=(()=>{const P=[gB(5.6,8,42,'#5a6a4a',0,2,2,1),gB(2,2,26,DK,0,7.5,0,1),gC(1.1,16,ST,0,3.4,30,1),gC(1.5,2.5,DK,0,3.4,39,1),gB(3.8,9,4.6,PL,0,-6,-3,0,[.3,0,0]),gB(3.4,9,4,PL,0,-5,13,0,[.2,0,0]),gB(3.4,10,5.6,DK,0,-6.5,-11,0,[.12,0,0]),gB(1,1,6,'#5a6a4a',0,-3.4,5),gB(1,2.4,1,DK,0,-2.2,4),gB(4.8,8.4,1.6,PL,0,2,-19.5),gB(2.4,1.5,1.5,DK,0,8.4,-8),gB(.9,2,1,DK,0,8.4,12),gB(.5,2,5,'#090808',2.85,3.4,2)];return P})();GD[0]=40;let g17=40;
GD[18]=(()=>{const P=[gB(6,7,28,'#3d4a3a',0,2.4,6,1),gB(5.6,5,16,'#3d4a3a',0,-2,4,1),gC(2.9,20,'#2d3a2d',0,3,28,1),gC(1.5,24,ST,0,3.4,50,1),gC(2.2,4,DK,0,3.4,63,1),gB(8,9.5,11,'#34402e',0,-8,8,0),gB(.7,.7,9,BR,3.4,-2.5,8),gB(2,1.6,12,DK,0,8.2,6,1),gB(2.4,4,2.4,DK,0,6.2,6),gB(1.4,2.8,1.4,DK,0,7,10),gB(3.8,9.5,4.6,PL,0,-6,-4,0,[.4,0,0]),gB(4.4,8,14,'#2d3a2d',0,0,-17,0,[.1,0,0]),gB(4.6,8.6,1.5,DK,0,-.2,-24.5),gB(.5,2.2,5,'#090808',3.05,3.6,5),gB(2.4,1.3,1.3,DK,0,6.2,-3),gB(.8,3,.8,DK,0,7,56)];for(const s of[-1,1])P.push(gB(.9,11,.9,DK,s*3.4,-4,40,0,[.45,0,-s*.25]));return P})();GD[0]=65;let g18=65;
function boltG(sc,sk){const P=[gB(4.8,9,22,sc,0,-1,-13,0,[.05,0,0]),gB(5,9.4,1.6,DK,0,-1.3,-24.2,0,[.05,0,0]),gB(4.8,5.6,22,'#4a5568',0,2.6,6,1),gC(1.15,sk.bl,ST,0,3.2,17+sk.bl/2,1),gC(1.6,3.5,DK,0,3.2,17+sk.bl+1,1),gC(2.2,16,DK,0,8.4,6,1),gC(2.7,3.5,DK,0,8.4,15.5,1),gC(2.4,2.4,DK,0,8.4,-3,1),gC(2.4,.5,LN,0,8.4,17.4,0),gB(1.8,2.6,2,DK,0,6,2,1),gB(1.8,2.6,2,DK,0,6,11,1),gB(3.4,1,1,ST,3.2,4,-3,1),gB(1.8,1.8,1.8,DK,5.2,3.4,-3),gB(3.4,3,6,DK,0,-2.6,7),gB(1,1,6.5,'#4a5568',0,-3.5,6,1),gB(1,2.5,1,DK,0,-2,4),gB(4,6,4,sc,0,-4,-2,0,[.35,0,0]),gB(.5,2,6,'#090808',2.55,4.4,4)];if(sk.bp)for(const s of[-1,1])P.push(gB(.8,8,.8,DK,s*2.6,-1.5,sk.bl*.6+14,0,[.5,0,-s*.2]));GD[0]=17+sk.bl+3;return P}
GD[5]=boltG(WD,{bl:36,bp:1});let g5=GD[0];
GD[20]=boltG('#3a5a3a',{bl:44,bp:1});let g20=GD[0];
GD[21]=(()=>{const P=[gB(6,8,44,'#3a3f52',0,2.6,6,1),gC(1.9,32,ST,0,3.6,44,1),gC(3,8,DK,0,3.6,64,1),gB(3.2,.8,6,'#090808',0,3.6,64,0),gC(2.8,24,DK,0,10.4,8,1),gC(3.3,4,DK,0,10.4,21,1),gC(2.9,3,DK,0,10.4,-4,1),gC(3,.5,LN,0,10.4,23.3,0),gB(2,3.4,2.4,DK,0,7.4,2,1),gB(2,3.4,2.4,DK,0,7.4,14,1),gB(5,9.5,14,DK,0,-6.6,8),gB(5.4,8,10,PL,0,-1,-21),gB(5.6,3,8,PL,0,4.6,-18),gB(4,9,4.6,PL,0,-6,-3,0,[.3,0,0]),gB(2,1.4,2,DK,4,4,-4),gB(1.6,1.6,4,ST,3.8,3.6,-7)];for(const s of[-1,1])P.push(gB(1.1,15,1.1,DK,s*4,-5.5,42,0,[.25,0,-s*.35]));GD[0]=68;return P})();let g21=68;
GD[22]=(()=>{const P=[gB(4.4,7,34,WD,0,-1,4,0,[.03,0,0]),gB(3,1.6,32,'#4a3a22',0,3.2,12),gC(1.2,9,DK,0,6,10,1),gB(1,2.6,1,DK,0,-1.8,3),gC(.45,26,'#d9d2c0',0,4.5,14,1),gB(1.2,.6,3.4,ST,0,4.5,28.5),gB(5,.9,.9,ST,0,1.2,26,1),gB(3.4,4,3,'#4a3a22',0,-2.5,-8,0,[.3,0,0])];for(const s of[-1,1])P.push(gB(17,1.8,2.4,'#a9743c',s*9,3.4,24,0,[0,-s*.32,0]),gB(1.3,1.3,3.4,'#222',s*17,3.4,29,0,[0,-s*.5,0]),gB(15,.35,.35,'#e8e8e8',s*7.5,3.4,23.5,0,[0,s*.45,0]));GD[0]=30;return P})();let g22=30;
GD[23]=(()=>{const P=[gC(3.8,12,'#3d4452',0,2.6,8,1),gC(2.7,26,'#4a5568',0,3,28,1),gC(3.1,2,DK,0,3,41,1),gB(4.4,8,16,PL,0,0,-14,0,[.1,0,0]),gB(4.4,8.4,1.4,DK,0,-.2,-22),gB(4,10,4.6,PL,0,-6.5,-1,0,[.3,0,0]),gB(3.4,9,3.4,PL,0,-6,22,0,[.2,0,0]),gB(1,6,1,DK,0,8.5,16),gB(3,.8,.8,DK,0,11.5,16),gB(2.4,.9,18,DK,0,6,6,1),gB(1,1,6,'#4a5568',0,-3.4,5,1),gB(1,2.6,1,DK,0,-2.2,4)];for(let i=0;i<6;i++){const a=i*1.047;P.push(gC(.8,12.4,DK,Math.cos(a)*2.9,2.6+Math.sin(a)*2.9,8))}GD[0]=42;return P})();let g23=42;
GD[24]=(()=>{const P=[gC(5,56,'#4a6a3d',0,5.4,12,1),gC(6.4,6,'#2f4a2a',0,5.4,-17,1),gC(6.4,5,'#2f4a2a',0,5.4,40,1),gC(5.4,2,DK,0,5.4,0,1),gC(5.4,2,DK,0,5.4,22,1),gC(3,7,'#e23b3b',0,5.4,44,0),gB(4,9,4.6,PL,0,-3,0,0,[.25,0,0]),gB(3.4,8,3.4,PL,0,-2.4,22,0,[.15,0,0]),gB(5,3,12,PL,0,-.6,-9),gB(1,4,1,DK,0,12,14),gB(3,.8,.8,DK,0,14,14),gB(1,1,5,'#2f4a2a',0,10.8,-8),gB(1.6,1.6,1.6,'#e23b3b',2,4,-15)];GD[0]=47;return P})();let g24=47;
GD[25]=(()=>{const P=[gC(5,14,'#3a3f48',0,3,0,1),gC(5.6,2,DK,0,3,18,1),gC(5.6,2,DK,0,3,34,1),gC(5.6,2,DK,0,3,51,1),gB(2,6,2,DK,0,10,8),gB(9,1.4,1.4,DK,0,13.2,8),gB(4,9,4.6,PL,0,-6,2,0,[.3,0,0]),gB(9,9,12,'#4a5a3a',0,-6.5,-10),gB(1.4,1.4,11,BR,3,-1.5,-1),gB(1.4,2.2,5,'#24282f',0,-1.4,16)];for(let i=0;i<6;i++){const a=i*1.047;P.push(gC(1,38,ST,Math.cos(a)*3.9,3+Math.sin(a)*3.9,35,1))}GD[0]=54;return P})();let g25=54;
{const GZ={1:g1,2:g2,3:g3,4:g4,5:g5,6:35,7:g7,8:g8,9:g9,10:g10,11:g11,12:g12,13:g13,14:g14,15:g15,16:g16,17:g17,18:g18,19:g19,20:g20,21:g21,22:g22,23:g23,24:g24,25:g25};
for(let id=1;id<=25;id++){GP[id]=GD[id];GM[id]=GZ[id]}
for(let id=WG0;id<WP.length;id++){const b=WP[id].base;if(!GD[b])continue;let i=0;GP[id]=GD[b].map(q=>{const o=q.slice();if(o[3]!==LN&&o[3]!=='#ffb06a'&&o[3]!=='#090808'){o[3]=GO[(i++)%4];o[8]=1}return o});GM[id]=GM[b]}}
const MFX={neon:{c:['#c07bff','#39ff9c','#ff4dd2'],m:'orbit',n:11,s:3},gold:{c:['#ffd23b','#fff3a0','#ffb02e'],m:'rise',n:12,s:3.2},bolt:{c:['#fff27a','#6ab8ff','#ffffff'],m:'zap',n:9,s:2.4},galaxy:{c:['#8a6bff','#ff8ad6','#ffffff'],m:'orbit',n:14,s:2.6},dragon:{c:['#2dffb0','#ffd23b','#ffffff'],m:'spiral',n:14,s:2.8},phoenix:{c:['#ff3b1f','#ffb02e','#fff3a0'],m:'rise',n:14,s:3.2},ghost:{c:['#c9b8ff','#6a4cff','#ffffff'],m:'wisp',n:10,s:3.4},void:{c:['#7a00ff','#ff2dc4','#2a0044'],m:'suck',n:14,s:3}},FXM={},fxMat=c=>FXM[c]||(FXM[c]=new THREE.MeshBasicMaterial({color:c}));

/* ===== EVOLUTIVAS: skins miticas por cristais (pet nas costas, arma detalhada, projetil, morte) ===== */
Object.assign(MFX,{evDemon:{c:['#ff2a2a','#ff8a1f','#ffd23b'],m:'rise',n:16,s:3.2},evDragon:{c:['#2dffb0','#ffd23b','#ffffff'],m:'spiral',n:16,s:2.8},evAngel:{c:['#fff3a0','#ffffff','#ffca9a'],m:'orbit',n:14,s:2.4},evReaper:{c:['#7dffb0','#2a8a5a','#ffffff'],m:'wisp',n:12,s:3.4},evPumpkin:{c:['#ff7a00','#b57bff','#ffb02e'],m:'wisp',n:14,s:3.1},evIce:{c:['#ff9a9a','#ff3a3a','#a80010'],m:'wisp',n:14,s:2.8},evGold:{c:['#ffd23b','#ffb81c','#fff3a0'],m:'orbit',n:12,s:1.7},evToxic:{c:['#39ff14','#9dff6a','#d8ffd0'],m:'wisp',n:12,s:2.2}});
const EVM={},evM=c=>EVM[c]||(EVM[c]=new THREE.MeshLambertMaterial({color:c}));let EVT=null,TXT=null,TXV=null;
const ARC_MAX=50;let ARCN=0;try{ARCN=+localStorage.getItem('arr_arc')||0}catch(e){}
const ARM={},arcM=c=>ARM[c]||(ARM[c]=new THREE.MeshBasicMaterial({color:c})),arcMat=(c,o)=>new THREE.MeshBasicMaterial({color:c,transparent:true,opacity:o,depthWrite:false,side:THREE.DoubleSide,blending:THREE.AdditiveBlending});
function arcMax(f){return !!f&&((f.isP||(typeof pv!='undefined'&&pv&&pv.f===f))?ARCN>=ARC_MAX:!!f.arcMax)}
const ARG=[[[[0,-1],[0,1]],[[-.8,-.3],[0,.4],[.8,-.3]]],[[[-.8,-1],[-.8,1]],[[-.8,1],[.7,.45],[-.8,-.1]]],[[[-.8,-1],[.8,1]],[[.8,-1],[-.8,1]],[[0,-1],[0,1]]],[[[-.8,1],[0,-1],[.8,1]],[[-.5,.25],[.5,.25]]],[[[-.8,-1],[.8,-1],[.8,0],[-.8,0]],[[-.8,0],[.8,1]]],[[[0,-1],[.8,0],[0,1],[-.8,0],[0,-1]],[[0,-.4],[0,.4]]]];
function arcGlyph(x,y,h,life,s,rot){const g=G;if(!g)return;const H=g.hl||(g.hl=[]);if(H.length>(g.rk?3:26))return;const T=ARG[Math.random()*ARG.length|0],c=Math.random()<.5?'#b36bff':'#ffd23b',ca=Math.cos(rot||0),sa=Math.sin(rot||0);for(const pl of T)H.push({p:pl.map(q=>[x+(q[0]*ca-q[1]*sa)*s,h,y+(q[0]*sa+q[1]*ca)*s]),c,l:life,m:life,w:1.5})}
function arcMuzzle(f,a){const g=G;if(!g||!g.fx||g.fx.length>(g.rk?4:14)||!f.gun)return;f.gun.updateWorldMatrix(true,false);if(!TXV)TXV=new THREE.Vector3();if(!TXT)TXT=new THREE.TorusGeometry(1,.16,6,32);f.gun.localToWorld(TXV.set(0,3,54));
const grp=new THREE.Group(),ms=[],e={grp,ms,t:0,l:.2};gw.add(grp);grp.position.copy(TXV);grp.rotation.y=Math.PI/2-a;g.fx.push(e);
const pm=arcMat('#b36bff',.9),gm=arcMat('#ffd23b',.9),sp=new THREE.Group();grp.add(sp);
const ring=(m,s)=>{const o=new THREE.Mesh(TXT,m);o.scale.set(s,s,s);sp.add(o);return o},bar=(m,w,h,px,py,rz)=>{const o=new THREE.Mesh(BG,m);o.scale.set(w,h,.4);o.position.set(px,py,0);o.rotation.z=rz;sp.add(o)};
const r1=ring(pm,10),r2=ring(gm,6.5);for(let i=0;i<6;i++){const an=i*1.0472;bar(gm,1.2,3,Math.cos(an)*13,Math.sin(an)*13,an-1.5708)}for(let i=0;i<3;i++)bar(pm,17,.5,0,0,i*1.0472);
r1.userData={o:.9,f:(m,t,k)=>{const q=Math.min(1,t/.06);grp.scale.setScalar((.5+.5*q)*(1+.25*t/.2));sp.rotation.z=t*18;pm.opacity=.9*k;gm.opacity=.9*k}};r2.userData={o:.9,f:()=>{}};ms.push(r1,r2)}
function arcPenta(f){const g=G;if(!g||!g.fx||g.fx.length>(g.rk?4:14))return;const a=f.ang||0,r=24;const grp=new THREE.Group(),ms=[],e={grp,ms,t:0,l:1.9};gw.add(grp);grp.position.set(f.x+Math.cos(a)*75,68,f.y+Math.sin(a)*75);grp.rotation.y=Math.PI/2-a;g.fx.push(e);if(!TXT)TXT=new THREE.TorusGeometry(1,.16,6,32);
const pm=arcMat('#b36bff',.95),gm=arcMat('#ffd23b',.95),sp=new THREE.Group();grp.add(sp);
const ring=(m,s)=>{const o=new THREE.Mesh(TXT,m);o.scale.set(s,s,s);sp.add(o);return o};const r1=ring(pm,r+4),r2=ring(gm,r+9);
for(let i=0;i<5;i++){const j=(i+2)%5,a1=-Math.PI/2+i*1.2566,a2=-Math.PI/2+j*1.2566,x1=Math.cos(a1)*r,y1=Math.sin(a1)*r,x2=Math.cos(a2)*r,y2=Math.sin(a2)*r,o=new THREE.Mesh(BG,i%2?gm:pm);o.scale.set(Math.hypot(x2-x1,y2-y1),1.3,.5);o.position.set((x1+x2)/2,(y1+y2)/2,0);o.rotation.z=Math.atan2(y2-y1,x2-x1);sp.add(o);const v=new THREE.Mesh(BG,gm);v.scale.set(3.2,3.2,.6);v.position.set(x1,y1,0);v.rotation.z=.785;sp.add(v);if(g.pt&&g.pt.length<(g.rk?40:330))for(let q=0;q<2;q++)g.pt.push({x:grp.position.x+rr(-6,6),y:grp.position.z+rr(-6,6),vx:rr(-20,20),vy:rr(-20,20),l:rr(.5,.9),m:.9,c:q?'#ffd23b':'#b36bff',u:50,h:68+y1})}
r1.userData={o:.95,f:(m,t,k)=>{const q=Math.min(1,t/.25),s=.3+.7*q;sp.scale.setScalar(s);sp.rotation.z=t*.8;const op=.95*k*Math.min(1,t/.2);pm.opacity=op;gm.opacity=op}};r2.userData={o:.95,f:()=>{}};ms.push(r1,r2)}
function arcHit(x,y,a,cp){const g=G;if(!g||!g.fx||g.fx.length>(g.rk?4:14))return;const cf=cfo();if(cf&&Math.hypot(cf.x-x,cf.y-y)>900)return;if(g.arcHT&&g.t-g.arcHT.t<.07&&Math.hypot(g.arcHT.x-x,g.arcHT.y-y)<34&&!cp)return;g.arcHT={t:g.t,x,y};if(!TXT)TXT=new THREE.TorusGeometry(1,.16,6,32);
const grp=new THREE.Group(),ms=[],e={grp,ms,t:0,l:cp?.8:.4};gw.add(grp);grp.position.set(x,0,y);g.fx.push(e);
const pm=arcMat('#b36bff',.95),gm=arcMat('#ffd23b',.95),sg=new THREE.Group(),sp=new THREE.Group();sg.position.y=56;sg.rotation.y=Math.PI/2-a;grp.add(sg);sg.add(sp);
const ring=(m,s)=>{const o=new THREE.Mesh(TXT,m);o.scale.set(s,s,s);sp.add(o);return o},bar=(m,w,h,px,py,rz)=>{const o=new THREE.Mesh(BG,m);o.scale.set(w,h,.5);o.position.set(px,py,0);o.rotation.z=rz;sp.add(o)};
const r1=ring(pm,15),r2=ring(gm,10);for(let i=0;i<8;i++){const an=i*.7854;bar(gm,2,5,Math.cos(an)*19,Math.sin(an)*19,an-1.5708)}for(let i=0;i<3;i++)bar(pm,26,1,0,0,i*1.0472);
r1.userData={o:.95,f:(m,t)=>{const q=Math.min(1,t/.08),op=Math.max(0,1-t/.36)*.95;sg.scale.setScalar(.4+.9*q);sp.rotation.z=t*14;pm.opacity=op;gm.opacity=op}};r2.userData={o:.95,f:()=>{}};ms.push(r1,r2);
if(cp){const pc=arcMat('#b36bff',.95),gc=arcMat('#ffd23b',.95),cg=new THREE.Group();cg.position.y=102;grp.add(cg);const rg=new THREE.Mesh(TXT,gc);rg.scale.set(15,15,15);rg.rotation.x=1.5708;rg.position.y=-5;cg.add(rg);
for(let i=0;i<7;i++){const an=i*.8976,o=new THREE.Mesh(BG,i%2?pc:gc);o.scale.set(3.2,i%2?10:14,1.6);o.position.set(Math.cos(an)*15,i%2?0:2,Math.sin(an)*15);o.rotation.y=-an;cg.add(o)}
const dm=new THREE.Mesh(BG,pc);dm.scale.setScalar(.01);dm.userData={o:1,f:(m,t)=>{const q=Math.min(1,t/.12),op=.95*Math.max(0,Math.min(1,(.8-t)/.25));cg.scale.setScalar(.3+.7*q);cg.rotation.y=t*5;cg.position.y=102+t*14;pc.opacity=op;gc.opacity=op}};grp.add(dm);ms.push(dm);rg.userData={o:1,f:()=>{}};ms.push(rg)}
if(g.pt&&g.pt.length<(g.rk?40:330))for(let i=0;i<9;i++)g.pt.push({x:x+rr(-7,7),y:y+rr(-7,7),vx:rr(-22,22),vy:rr(-22,22),l:rr(.4,.8),m:.8,c:i%2?'#b36bff':'#ffd23b',u:rr(60,100),h:46})}
function evShotFx(f,wi,a,w){const k=fsk(f,wi);if(!k||!SK[k]||SK[k].fx!='evArcane')return;const g=G,n=w.pel||0;if(n>=6&&g.b.length>=n){g.b[g.b.length-n+2].rune=1;g.b[g.b.length-n+5].rune=1}const cf=cfo();if(cf&&Math.hypot(cf.x-f.x,cf.y-f.y)>1100)return;arcMuzzle(f,a)}

const EVP={
evDemon:{s:1.5,x:11,y:56,z:-17,P:[[8,9,6,'#b3121a',0,0,0],[5,6,1,'#ff6a2a',0,0,3.2,1],[9,8,8,'#d01a22',0,9,.5],[2,6,2,'#1a0408',-3.6,15,0],[2,6,2,'#1a0408',3.6,15,0],[1.4,3,1.4,'#ffd23b',-3.6,19,0,1],[1.4,3,1.4,'#ffd23b',3.6,19,0,1],[2.2,1.8,1,'#ffe14a',-2.2,10,4.6,1,'e'],[2.2,1.8,1,'#ffe14a',2.2,10,4.6,1,'e'],[4,1,1,'#2a0008',0,6.6,4.6],[2.4,6,2.4,'#b3121a',-5.4,1,1.5],[2.4,6,2.4,'#b3121a',5.4,1,1.5],[3,5,3,'#8a0e14',-2,-7,0],[3,5,3,'#8a0e14',2,-7,0],[12,1.2,8,'#5a0a14',-10,6,-3,0,'wl'],[12,1.2,8,'#5a0a14',10,6,-3,0,'wr'],[8,.8,5,'#ff3a1a',-10,6,-3,1,'wl'],[8,.8,5,'#ff3a1a',10,6,-3,1,'wr'],[2,2,3,'#b3121a',0,-5,-4,0,'t'],[2,2,3,'#b3121a',0,-5,-7,0,'t'],[2,2,3,'#b3121a',0,-5,-10,0,'t'],[3.4,3.4,1.6,'#ff2a2a',0,-5,-13,1,'t'],[3,5,3,'#ff8a1f',0,23,0,1,'f']]},
evDragon:{s:1.5,x:11,y:56,z:-19,P:[[6,6,12,'#0e8a5f',0,0,0],[4,2,10,'#ffd23b',0,-3,.2],[4,4,4,'#0e8a5f',0,3,7],[6,5,7,'#14b57a',0,5,11],[4,3,4,'#14b57a',0,4,15.5],[1.2,1.2,5,'#ffd23b',-2,8,9,1],[1.2,1.2,5,'#ffd23b',2,8,9,1],[1.4,1.4,1,'#2dffb0',-2.8,6,13.5,1,'e'],[1.4,1.4,1,'#2dffb0',2.8,6,13.5,1,'e'],[14,1,9,'#0b6b4f',-9,5,-1,0,'wl'],[14,1,9,'#0b6b4f',9,5,-1,0,'wr'],[14,1.4,1.4,'#ffd23b',-9,5.6,-4,1,'wl'],[14,1.4,1.4,'#ffd23b',9,5.6,-4,1,'wr'],[2,3,2,'#0e8a5f',-2.5,-4,4],[2,3,2,'#0e8a5f',2.5,-4,4],[2,3,2,'#0e8a5f',-2.5,-4,-4],[2,3,2,'#0e8a5f',2.5,-4,-4],[1.2,2.4,1.6,'#ffd23b',0,3.8,-4,1],[1.2,2.4,1.6,'#ffd23b',0,3.8,-1,1],[1.2,2.4,1.6,'#ffd23b',0,3.8,2,1],[1.2,2.4,1.6,'#ffd23b',0,3.8,5,1],[4,4,4,'#0e8a5f',0,0,-8,0,'t'],[3,3,4,'#0e8a5f',0,0,-12,0,'t'],[2,2,4,'#14b57a',0,0,-16,0,'t'],[3,3,2,'#ffd23b',0,0,-19.5,1,'t'],[2,2,2,'#2dffb0',0,4,18.5,1,'f']]},
evToxic:{s:1.5,x:11,y:56,z:-15,P:[[5,13,5,'#16231a',-3.5,0,0],[5,13,5,'#16231a',3.5,0,0],[5.4,1.6,5.4,'#39ff14',-3.5,3,0,1],[5.4,1.6,5.4,'#39ff14',3.5,3,0,1],[5.4,1.6,5.4,'#39ff14',-3.5,-3,0,1],[5.4,1.6,5.4,'#39ff14',3.5,-3,0,1],[3,1.5,3,'#8a948c',-3.5,7.2,0],[3,1.5,3,'#8a948c',3.5,7.2,0],[2,2,2,'#39ff14',-3.5,9.5,0,1,'f'],[2,2,2,'#9dff6a',3.5,9.5,0,1,'f'],[1,1,7,'#143a14',0,6,2],[9,7,.8,'#0c0f0c',0,0,-3.2],[3.4,3.4,.6,'#39ff14',0,0,-3.7,1,'h'],[2.6,2.6,2.6,'#39ff14',12,10,-2,1,'o'],[2,2,2,'#9dff6a',-12,10,-2,1,'o'],[2.2,2.2,2.2,'#d8ffd0',0,16,-12,1,'o']]},
evArcane:{s:1.5,x:0,y:57,z:-17,P:[[9.8,12.8,0.8,'#5b3a1e',-24,4,0.8,0],[8.8,11.6,0.5,'#f3e7c6',-24,4,0.2,0],[9.8,0.6,1,'#c9a24a',-24,10.5,0.8,0],[9.8,0.6,1,'#c9a24a',-24,-2.5,0.8,0],[5.6,0.4,0.2,'#6a4aa0',-24,7.2,-0.1,0],[5.6,0.4,0.2,'#6a4aa0',-24,4.9,-0.1,0],[5.6,0.4,0.2,'#6a4aa0',-24,2.6000000000000005,-0.1,0],[9.8,12.8,0.8,'#5b3a1e',-14,4,0.8,0],[8.8,11.6,0.5,'#f3e7c6',-14,4,0.2,0],[9.8,0.6,1,'#c9a24a',-14,10.5,0.8,0],[9.8,0.6,1,'#c9a24a',-14,-2.5,0.8,0],[5.6,0.4,0.2,'#6a4aa0',-14,7.2,-0.1,0],[5.6,0.4,0.2,'#6a4aa0',-14,4.9,-0.1,0],[5.6,0.4,0.2,'#6a4aa0',-14,2.6000000000000005,-0.1,0],[1.2,12.8,1,'#3d2410',-19,4,0.8,0],[2.6,2.6,0.2,'#c07bff',-14,1.2,-0.2,1,'h'],[4.4,11,0.3,'#fff6d8',-16.8,4,-0.5,0,'pg'],[4.4,11,0.3,'#fff6d8',-16.8,4,-0.5,0,'pg'],[9.8,12.8,0.8,'#5b3a1e',14,4,0.8,0],[8.8,11.6,0.5,'#f3e7c6',14,4,0.2,0],[9.8,0.6,1,'#c9a24a',14,10.5,0.8,0],[9.8,0.6,1,'#c9a24a',14,-2.5,0.8,0],[5.6,0.4,0.2,'#6a4aa0',14,7.2,-0.1,0],[5.6,0.4,0.2,'#6a4aa0',14,4.9,-0.1,0],[5.6,0.4,0.2,'#6a4aa0',14,2.6000000000000005,-0.1,0],[9.8,12.8,0.8,'#5b3a1e',24,4,0.8,0],[8.8,11.6,0.5,'#f3e7c6',24,4,0.2,0],[9.8,0.6,1,'#c9a24a',24,10.5,0.8,0],[9.8,0.6,1,'#c9a24a',24,-2.5,0.8,0],[5.6,0.4,0.2,'#6a4aa0',24,7.2,-0.1,0],[5.6,0.4,0.2,'#6a4aa0',24,4.9,-0.1,0],[5.6,0.4,0.2,'#6a4aa0',24,2.6000000000000005,-0.1,0],[1.2,12.8,1,'#3d2410',19,4,0.8,0],[2.6,2.6,0.2,'#c07bff',24,1.2,-0.2,1,'h'],[4.4,11,0.3,'#fff6d8',21.2,4,-0.5,0,'pg'],[4.4,11,0.3,'#fff6d8',21.2,4,-0.5,0,'pg'],['T',8,0,'#b36bff',0,6,-1.2,1,'cr'],['T',5.6,0,'#ffd23b',0,6,-1.2,1,'cr'],[2,2,0.6,'#e0b0ff',0,6,-1.2,1,'h'],[1.4,1.4,0.4,'#ffd23b',0,6,-1.2,1,'rn'],[1.4,1.4,0.4,'#ffd23b',0,6,-1.2,1,'rn'],[1.4,1.4,0.4,'#ffd23b',0,6,-1.2,1,'rn'],[1.4,1.4,0.4,'#ffd23b',0,6,-1.2,1,'rn'],[1.4,1.4,0.4,'#ffd23b',0,6,-1.2,1,'rn'],[1.4,1.4,0.4,'#ffd23b',0,6,-1.2,1,'rn']]},
evGold:{s:1.5,x:11,y:56,z:-19,P:[[6,6,12,'#17130d',0,0,0],[4,2,10,'#ffd23b',0,-3,.2],[4,4,4,'#17130d',0,3,7],[6,5,7,'#2b2415',0,5,11],[4,3,4,'#2b2415',0,4,15.5],[1.2,1.2,5,'#ffd23b',-2,8,9,1],[1.2,1.2,5,'#ffd23b',2,8,9,1],[1.4,1.4,1,'#ffb81c',-2.8,6,13.5,1,'e'],[1.4,1.4,1,'#ffb81c',2.8,6,13.5,1,'e'],[14,1,9,'#1c1709',-9,5,-1,0,'wl'],[14,1,9,'#1c1709',9,5,-1,0,'wr'],[14,1.4,1.4,'#ffd23b',-9,5.6,-4,1,'wl'],[14,1.4,1.4,'#ffd23b',9,5.6,-4,1,'wr'],[2,3,2,'#17130d',-2.5,-4,4],[2,3,2,'#17130d',2.5,-4,4],[2,3,2,'#17130d',-2.5,-4,-4],[2,3,2,'#17130d',2.5,-4,-4],[1.2,2.4,1.6,'#ffd23b',0,3.8,-4,1],[1.2,2.4,1.6,'#ffd23b',0,3.8,-1,1],[1.2,2.4,1.6,'#ffd23b',0,3.8,2,1],[1.2,2.4,1.6,'#ffd23b',0,3.8,5,1],[4,4,4,'#17130d',0,0,-8,0,'t'],[3,3,4,'#17130d',0,0,-12,0,'t'],[2,2,4,'#2b2415',0,0,-16,0,'t'],[3,3,2,'#ffd23b',0,0,-19.5,1,'t'],[2,2,2,'#ffb81c',0,4,18.5,1,'f']]},
evAngel:{s:1.5,x:11,y:58,z:-17,P:[[7,8,5,'#f2f5ff',0,0,0],[7.2,1.6,5.2,'#ffd86b',0,-1,0,1],[7,7,7,'#ffe3cc',0,8.5,0],[7.4,2,7.4,'#ffd86b',0,12.5,0,1],['T',4.5,0,'#ffe27a',0,19,0,1,'h'],[1.2,1.2,1,'#3a6aff',-1.8,8.8,3.6,1],[1.2,1.2,1,'#3a6aff',1.8,8.8,3.6,1],[12,10,1.4,'#ffffff',-9,4,-3,0,'wl'],[12,10,1.4,'#ffffff',9,4,-3,0,'wr'],[12,1.2,1.6,'#ffd86b',-9,9.6,-3,1,'wl'],[12,1.2,1.6,'#ffd86b',9,9.6,-3,1,'wr'],[8,6,1.4,'#e6efff',-13,-1,-3.6,0,'wl'],[8,6,1.4,'#e6efff',13,-1,-3.6,0,'wr'],[2,5,2,'#f2f5ff',-5,0,1.5],[2,5,2,'#f2f5ff',5,0,1.5],[2.6,4,2.6,'#ffe3cc',-2,-6,0],[2.6,4,2.6,'#ffe3cc',2,-6,0]]},
evReaper:{s:1.5,x:11,y:58,z:-17,P:[[9,13,7,'#141210',0,-1,0],[11,4,8,'#090808',0,-8,0],[10,9,9,'#211d1b',0,9,0],[6,5,2,'#000000',0,9,4.3],[1.6,1.6,1,'#7dffb0',-1.8,9.5,5.4,1,'e'],[1.6,1.6,1,'#7dffb0',1.8,9.5,5.4,1,'e'],[2.2,2.2,2.2,'#e8f0e0',-6,2,3],[2.2,2.2,2.2,'#e8f0e0',6,2,3],[1.2,24,1.2,'#5a3a22',8,6,3],[1.6,1.6,11,'#7dffb0',8,17.5,8.5,1],[1,1,6,'#e8fff0',8,17.5,15.5,1],[4,3,4,'#141210',0,-12,-1,0,'t'],[2.6,2.6,3,'#141210',0,-15,-2,0,'t'],[3,3,3,'#7dffb0',12,10,-2,1,'o'],[3,3,3,'#7dffb0',-12,10,-2,1,'o'],[2.4,2.4,2.4,'#bfffe0',0,16,-12,1,'o']]},
evIce:{s:1.5,x:11,y:57,z:-17,P:[[9,10,6,'#ed3f3f',0,0,0],[5,6,1,'#f76262',0,1,3.2,1,'h'],[10,2,7,'#221c18',0,-5.6,0],[3,2,1,'#e20c0c',0,-5.6,3.6,1],[10,9,8,'#f75f5f',0,9.5,.5],[10.6,1.2,8.6,'#e32b2b',0,13.4,.5],[1.8,4,1.8,'#f65757',-3.4,15.8,0],[1.8,4,1.8,'#f65757',3.4,15.8,0],[1.5,4,1.5,'#f76262',-4.3,19.4,0],[1.5,4,1.5,'#f76262',4.3,19.4,0],[1.2,3.6,1.2,'#f76262',-4.6,22.8,0],[1.2,3.6,1.2,'#f76262',4.6,22.8,0],[.7,3,.7,'#f42525',-4.2,25.8,0,1],[.7,3,.7,'#f42525',4.2,25.8,0,1],[2.2,1.8,1,'#ef0d0d',-2.4,10.6,4.6,1,'e'],[2.2,1.8,1,'#ef0d0d',2.4,10.6,4.6,1,'e'],[4.6,1.1,1,'#15110e',0,6.8,4.6],[.9,2.4,.9,'#ffffff',-1.8,7.6,4.8],[.9,2.4,.9,'#ffffff',1.8,7.6,4.8],[2.6,6,2.6,'#ed3f3f',-5.8,1.5,1.5],[2.6,6,2.6,'#ed3f3f',5.8,1.5,1.5],[3.6,3,3.6,'#f65757',-5.4,5,1],[3.6,3,3.6,'#f65757',5.4,5,1],[3,5,3,'#e32b2b',-2,-9.5,0],[3,5,3,'#e32b2b',2,-9.5,0],[1.8,17,1.8,'#e32b2b',8,5,3.5],[2.8,2.8,2.8,'#f76262',8,11,3.5,1],[2.8,2.8,2.8,'#f76262',8,7,3.5,1],[1,3,1,'#f76262',-2.5,-13,0],[1,3,1,'#f76262',2.5,-13,0],[1.2,4,1.2,'#f54949',-2.5,13.5,-5,0,'f'],[1.2,5,1.2,'#f54949',0,14.5,-5,0,'f'],[1.2,4,1.2,'#f54949',2.5,13.5,-5,0,'f'],[2,3,2,'#f54949',0,0,0,1,'o'],[1.6,2.4,1.6,'#f43737',0,0,0,1,'o'],[2,3,2,'#ffffff',0,0,0,1,'o']]},
evPumpkin:{s:1.5,x:11,y:57,z:-17,P:[[8,8,6,'#2a1458',0,-1,0],[9,2,7,'#6a3ad0',0,-6,0,1],[10,9,9,'#ff7a00',0,9,0],[3,9.4,9.4,'#c94a00',-3.4,9,0],[3,9.4,9.4,'#c94a00',3.4,9,0],[2.2,2.2,1,'#ffe14a',-2.4,10,4.8,1,'e'],[2.2,2.2,1,'#ffe14a',2.4,10,4.8,1,'e'],[5,1.2,1,'#ffe14a',0,6.4,4.8,1],[1,1.5,1.1,'#2a1458',-1.6,6.4,4.9],[1,1.5,1.1,'#2a1458',1.6,6.4,4.9],[13,1,13,'#2a1458',0,14,0],[7,5,7,'#3a1a80',0,17,0],[3.4,4,3.4,'#3a1a80',.8,21,0],[7.2,1,7.2,'#ff9a1f',0,15,0,1],[12,1.2,8,'#1a0a38',-10,6,-3,0,'wl'],[12,1.2,8,'#1a0a38',10,6,-3,0,'wr'],[12,.8,1.4,'#ff9a1f',-10,6.7,-6.6,1,'wl'],[12,.8,1.4,'#ff9a1f',10,6.7,-6.6,1,'wr'],[1,1,7,'#b57bff',-10,6.8,-1,1,'wl'],[1,1,7,'#b57bff',10,6.8,-1,1,'wr'],[2.4,6,2.4,'#6a3ad0',-5.6,1,1.5],[2.4,6,2.4,'#6a3ad0',5.6,1,1.5],[1,3,1,'#fff0d0',6.8,4,3.4],[1.4,2,1.4,'#ffb02e',6.8,6.6,3.4,1,'f'],[3,3,4,'#2a1458',0,-8,-3,0,'t'],[2.4,2.4,3,'#5a3aa0',0,-10,-6,0,'t'],[2,2,2,'#ff9a1f',0,-11,-9,1,'t'],[2.6,2.6,2.6,'#ff9a1f',12,10,-2,1,'o'],[2.2,2.2,2.2,'#b57bff',-12,10,-2,1,'o'],[2,2,2,'#ffb02e',0,16,-12,1,'o']]}};
function evoBuild(f,k){const e=f.ev,sp=EVP[SK[k].fx];while(e.children.length)e.remove(e.children[0]);const u=e.userData={y:sp.y,wl:[],wr:[],e:[],f:[],t:[],o:[],h:[],pg:[],cr:[],rn:[]};if(!EVT)EVT=new THREE.TorusGeometry(1,.14,6,24);
for(const p of sp.P){let m;if(p[0]=='T'){m=new THREE.Mesh(EVT,fxMat(p[3]));m.scale.setScalar(p[1]);m.rotation.x=1.5708}else{m=new THREE.Mesh(BG,p[7]?fxMat(p[3]):evM(p[3]));m.scale.set(p[0],p[1],p[2])}
m.position.set(p[4],p[5],p[6]);m.userData={sx:m.scale.x,sy:m.scale.y,sz:m.scale.z};e.add(m);if(p[8])u[p[8]].push(m)}
e.scale.setScalar(sp.s);e.position.set(sp.x,sp.y,sp.z)}
function evArcaneAnim(f,t){try{const U=f.gun&&f.gun.userData;if(!U||U.mx===undefined)return;
if(U.mx!==arcMax(f)&&f.gid!=null){setGun(f,f.gid,f.gsk);return}
const ph=f.i||0,rl=f.rl>0?1:0,aim=f.isP?(typeof adsK!='undefined'?adsK:0):(f.adsK||0);
if(U.gp)U.gp.forEach((m,i)=>{const s=m.userData,q=1+.18*Math.sin(t*5+i*.9+ph);m.scale.set(s.sx*q,s.sy*q,s.sz)});
if(U.rb){const on=aim>.3;for(const m of U.rb)m.visible=on}
if(U.ey)U.ey.forEach((E,i)=>{const cy=(t*.33+ph*.1+i*.07)%1,o=cy<.7?1:.5+.5*Math.cos((cy-.7)/.3*6.2832),c=2.2;E.sc.scale.y=2.6*o+.02;E.ir.scale.y=1.9*o+.02;E.pu.scale.y=.9*o+.01;E.lt.position.y=c+1.3*o+.65;E.lb.position.y=c-1.3*o-.65});
if(U.gx)U.gx.forEach(m=>{const s=m.userData;if(s.k!==undefined){const a=t*1.6+s.k*3.14+ph;m.position.x=s.bx+Math.cos(a)*.65;m.position.y=3+Math.sin(a)*.65}else m.scale.setScalar(s.s*(.5+.9*Math.abs(Math.sin(t*2.4+s.ph))))});
const e=f.ev,u=e&&e.userData;if(u&&u.pg){u.pg.forEach((m,i)=>{const s=m.userData,sp=(m.position.x<0?-19:19),p=((t*.55+i*.27)%1)*Math.PI,cf=Math.cos(p);m.scale.x=Math.max(.05,s.sx*Math.abs(cf));m.position.x=sp+(s.sx/2)*cf;m.position.z=-.5-Math.sin(p)*s.sx*.5});
u.cr.forEach((m,i)=>{m.rotation.x=0;m.rotation.z=t*.6*(i?-1:1)});u.rn.forEach((m,i)=>{const a=t*.7+i*1.0472;m.position.set(Math.cos(a)*7,6+Math.sin(a)*7,-1.2);m.rotation.z=a})}
if(rl&&!f._arl&&f.mg&&f.mg[f.cur]===0)arcPenta(f);f._arl=rl;
if(typeof G=='undefined'||!G)return;const cf=cfo();if(cf&&Math.hypot(cf.x-f.x,cf.y-f.y)>700)return;
if(!TXV)TXV=new THREE.Vector3();
if(e&&G.pt&&G.pt.length<(G.rk?40:330)&&Math.random()<.3){e.getWorldPosition(TXV);G.pt.push({x:TXV.x+rr(-26,26),y:TXV.z+rr(-6,6),vx:rr(-5,5),vy:rr(-5,5),l:rr(.8,1.2),m:1.2,c:Math.random()<.7?'#ffd23b':'#fff3a0',u:-34,h:TXV.y+rr(-6,10)})}
const sp2=Math.hypot(f.vx||0,f.vy||0);if(sp2>110&&f.st=='ground'&&!f.dead&&t-(f._art||0)>.14){f._art=t;arcGlyph(f.x+rr(-4,4),f.y+rr(-4,4),1.6,1,9,Math.random()*6.28)}}catch(e){}}
function evToxicAnim(f,t){try{const U=f.gun&&f.gun.userData;if(!U||!U.gv)return;const ph=f.i||0,rl=f.rl>0?1:0;
if(U.gp)U.gp.forEach((m,i)=>{const s=m.userData,q=1+.35*Math.sin(t*5+i*.8+ph);m.scale.set(s.sx*q,s.sy*q,s.sz)});
if(U.gb)U.gb.forEach(m=>{const s=m.userData,p=((t*s.sp*(1+rl*3)+s.ph)%1+1)%1;m.position[s.ax]=s.a0+(s.a1-s.a0)*p;m.scale.setScalar(s.s*(.5+.9*Math.sin(p*3.1416)))});
if(U.liq){const s=U.liq.userData,q=1+(rl?.08:.03)*Math.sin(t*(rl?22:5)+ph);U.liq.scale.set(s.sx,s.sy*q,s.sz)}
if(U.gn)U.gn.rotation.z=U.gn.userData.base+.07*Math.sin(t*9+ph)+.04*Math.sin(t*23);
const cf=cfo();if(cf&&Math.hypot(cf.x-f.x,cf.y-f.y)>800)return;if(typeof G=='undefined'||!G||!G.pt||G.pt.length>(G.rk?40:330))return;
if(!TXV)TXV=new THREE.Vector3();const C=['#39ff14','#9dff6a','#c8ffa0'];
U.gv.forEach(m=>{if(Math.random()<(rl?.3:.1)){m.getWorldPosition(TXV);G.pt.push({x:TXV.x+rr(-1,1),y:TXV.z+rr(-1,1),vx:rr(-9,9),vy:rr(-9,9),l:rr(.6,1.1),m:1.1,c:rl&&Math.random()<.5?'#e8ffe0':C[Math.random()*3|0],u:rl?45:28,h:TXV.y})}});
if(Math.random()<.07){f.gun.getWorldPosition(TXV);G.pt.push({x:TXV.x+rr(-6,6),y:TXV.z+rr(-6,6),vx:rr(-8,8),vy:rr(-8,8),l:rr(.6,.9),m:.9,c:C[Math.random()*3|0],u:-38,h:TXV.y+6})}}catch(e){}}
function evGoldAnim(f,t){try{const U=f.gun&&f.gun.userData;if(!U)return;const ph=f.i||0,rl=f.rl>0?1:0;
if(U.gp)U.gp.forEach((m,i)=>{const s=m.userData,q=1+.35*Math.sin(t*6+i*.7+ph);m.scale.set(s.sx*q,s.sy*q,s.sz)});
if(U.gh)U.gh.forEach((m,i)=>{const s=m.userData,q=1+rl*1.1+.12*Math.sin(t*9+i+ph);m.scale.set(s.sx*q,s.sy*q,s.sz*q)});
if(U.gd)U.gd.forEach((m,i)=>{const s=m.userData;m.scale.y=s.sy*(.8+.35*Math.sin(t*3+i*1.3+ph))});
if(rl&&G&&G.pt&&G.pt.length<(G.rk?40:330)&&Math.random()<.5){const a=f.ang||0;G.pt.push({x:f.x+Math.cos(a)*34+rr(-4,4),y:f.y+Math.sin(a)*34+rr(-4,4),vx:rr(-40,40),vy:rr(-40,40),l:rr(.3,.6),m:.6,c:['#ffd23b','#ff9a1f','#fff3a0'][Math.random()*3|0],u:60,h:48+rr(-4,6)})}}catch(e){}}
function evoPet(f,t){if(!f.ev)return;const wi=f.ws[f.cur]||0,ks=wi?fsk(f,wi):0,K=ks&&SK[ks].ev?ks:0;if(f.evk!==K){f.evk=K;if(K)evoBuild(f,K)}const e=f.ev;e.visible=!!K;if(!K)return;if(SK[K].fx=='evGold')evGoldAnim(f,t);else if(SK[K].fx=='evToxic')evToxicAnim(f,t);else if(SK[K].fx=='evArcane')evArcaneAnim(f,t);
const u=e.userData,ph=f.i||0,fl=Math.sin(t*10+ph)*.5;e.position.y=u.y+Math.sin(t*2.4+ph)*2.4;e.rotation.y=Math.sin(t*1.3+ph)*.2;
for(const m of u.wl)m.rotation.z=.35+fl;for(const m of u.wr)m.rotation.z=-.35-fl;
u.t.forEach((m,i)=>{m.position.x=Math.sin(t*4-i*.8+ph)*(1+i*.8)});
for(const m of u.e)m.scale.y=m.userData.sy*(.5+.5*Math.abs(Math.sin(t*3+ph)));
u.f.forEach((m,i)=>{const s=m.userData,q=1+.3*Math.sin(t*14+i*2+ph);m.scale.set(s.sx*q,s.sy*(1.1+.4*Math.sin(t*11+i)),s.sz*q)});
for(const m of u.h)m.scale.setScalar(m.userData.sx*(1+.08*Math.sin(t*4)));
u.o.forEach((m,i)=>{const a=t*2+i*2.1+ph;m.position.set(Math.cos(a)*13,10+Math.sin(t*3+i)*2.5,Math.sin(a)*9-2)})}
function evoImp(par,x,y,z,s,ry){const g=new THREE.Group(),b=(w,h,l,c,px,py,pz,gl)=>{const o=new THREE.Mesh(BG,gl?fxMat(c):evM(c));o.scale.set(w,h,l);o.position.set(px,py,pz);g.add(o)};
b(8,9,6,'#c4161c',0,0,0);b(5,6,1,'#ff6a2a',0,0,3.2,1);b(9,8,8,'#e01c24',0,9,.5);b(2,6,2,'#1a0408',-3.6,15,0);b(2,6,2,'#1a0408',3.6,15,0);b(1.4,3,1.4,'#ffd23b',-3.6,19,0,1);b(1.4,3,1.4,'#ffd23b',3.6,19,0,1);b(2.2,1.8,1,'#ffe14a',-2.2,10,4.6,1);b(2.2,1.8,1,'#ffe14a',2.2,10,4.6,1);b(4,1,1,'#2a0008',0,6.6,4.6);b(2.4,6,2.4,'#c4161c',-5.4,1,1.5);b(2.4,6,2.4,'#c4161c',5.4,1,1.5);b(3,5,3,'#8a0e14',-2,-7,0);b(3,5,3,'#8a0e14',2,-7,0);b(10,1,6,'#5a0a14',-8,6,-3);b(10,1,6,'#5a0a14',8,6,-3);b(2,2,8,'#c4161c',0,-5,-6);b(3,3,1.6,'#ff2a2a',0,-5,-11,1);
g.scale.setScalar(s);g.position.set(x,y,z);g.rotation.y=ry||0;par.add(g);return g}
const EVIM={};function evIceM(c,o){const k=c+o;return EVIM[k]||(EVIM[k]=new THREE.MeshPhongMaterial({color:c,transparent:true,opacity:o,shininess:100,specular:'#ffffff',depthWrite:false}))}
function evoGun(f,id,sk){const F=SK[sk].fx,P=GP[id];let top=-99,bot=99;for(const q of P){top=Math.max(top,q[5]+q[1]/2);bot=Math.min(bot,q[5]-q[1]/2)}const L=GM[id]||30,mid=(top+bot)/2,
d=(w,h,l,c,x,y,z,gl)=>{const o=new THREE.Mesh(BG,gl?fxMat(c):evM(c));o.scale.set(w,h,l);o.position.set(x,y,z);f.gun.add(o);return o};
if(!EVT)EVT=new THREE.TorusGeometry(1,.14,6,24);
f.gun.userData={};
if(F=='evDemon'){
for(const s of[-1,1]){d(1.6,1.6,7,'#1a0408',s*2.6,top+2.5,L*.78);d(1.2,1.2,3,'#ffd23b',s*2.6,top+4.2,L*.78+4,1);d(.5,1,L*.6,'#ff6a2a',s*2.3,mid+1,L*.5,1);d(.5,.5,L*.5,'#ffd23b',s*2.35,mid-1,L*.5,1);d(1,2.6,1,'#fff0d0',s*1.3,bot-1.2,L*.97);d(.4,2,2,'#ffe14a',s*2.4,mid+1,L*.18,1)}
d(1.4,1.4,L*.7,'#ff2a2a',0,top+.9,L*.45,1);d(3.2,3.2,3.2,'#ffe14a',0,top+2,L*.12,1);d(5,1.6,2,'#ff8a1f',0,bot-1.2,L*.92,1);d(2.4,2.4,3,'#ff8a1f',0,mid,L+3,1);
for(let i=0;i<6;i++)d(1,2.4,1.2,'#1a0408',0,top+1.7,L*(.1+.14*i));
evoImp(f.gun,0,top+3.4,L*.42,.36,0);evoImp(f.gun,2.9,mid+.5,L*.86,.3,1.5708);evoImp(f.gun,-2.9,mid+.5,L*.16,.3,-1.5708)}
else if(F=='evArcane'){
const U=f.gun.userData,PU='#b36bff',GD='#c9a24a',gp=U.gp=[],gx=U.gx=[],ey=U.ey=[],rb=U.rb=[],MX=arcMax(f);U.mx=MX;
const ud=(o,l)=>{o.userData={sx:o.scale.x,sy:o.scale.y,sz:o.scale.z};l.push(o);return o},
ad=(w,h,l,c,x,y,z,gl)=>{const o=new THREE.Mesh(BG,gl?fxMat(c):evM(c));o.scale.set(w,h,l);o.position.set(x,y,z);f.gun.add(o);return o};
for(const c of f.gun.children.slice()){if(c.geometry===GCG&&c.scale.z>35){const bx=c.position.x,bz=c.position.z;
if(MX){c.material=evIceM('#c9a8ff',.4);c.scale.x=c.scale.y=1.78;const nb=new THREE.Mesh(GCG,arcM('#332821'));nb.scale.set(1.3,1.3,38.5);nb.position.copy(c.position);f.gun.add(nb);
for(let k=0;k<2;k++){const sw=new THREE.Mesh(GCG,arcM(k?'#ff9d5c':'#ff5cd6'));sw.scale.set(.3,.3,34);sw.position.set(bx,3,bz);sw.userData={bx,k};f.gun.add(sw);gx.push(sw)}
for(let k=0;k<12;k++){const st=new THREE.Mesh(BG,arcM(k%3?'#ffffff':k%2?'#ffd23b':'#ff9ae6'));st.scale.setScalar(.35);st.position.set(bx+rr(-.8,.8),3+rr(-.8,.8),bz+rr(-17,17));st.userData={ph:rr(0,6.28),s:.35};f.gun.add(st);gx.push(st)}}
else c.material=evM('#0e0d0c');
ud(ad(2.9,2.9,.3,PU,bx,3,51.3,1),gp);ud(ad(1.6,1.6,.35,'#e0b0ff',bx,3,51.5,1),gp)}}
for(const s of[-1,1]){ad(.35,.5,12.4,GD,s*3.05,5.8,7);ad(.35,.5,12.4,GD,s*3.05,-1.5,7);ad(.35,.5,12.4,GD,s*3.2,1.6,24);ad(.35,.5,12.4,GD,s*3.2,-1.8,24);ad(.35,.5,18,GD,s*2.55,4.3,-14);ad(.35,.5,18,GD,s*2.55,-4.8,-14);ad(.3,3,10,'#efe2bd',s*3.18,-.2,24)}
const gl=(s,x,z,y,ty)=>{for(const bright of[0,1]){const c=bright?'#c07bff':'#4a2c78',arr=[];const a1=ad(.18,1.8,.3,c,x,y,z,bright),a2=ty==0?ad(.18,.3,1.3,c,x,y+.9,z,bright):ty==1?ad(.18,.3,1.1,c,x,y-.2,z+.4,bright):ad(.18,1.3,.3,c,x,y,z+.7,bright);arr.push(a1,a2);if(bright)for(const o of arr){o.visible=false;rb.push(o)}}};
for(const s of[-1,1]){[[3.2,2.8,0],[5.6,1.6,1],[8,2.8,2],[10.4,1.6,0]].forEach(q=>gl(s,s*3.08,q[0],q[1],q[2]));[[-9,1.2,1],[-12,2.2,0],[-15,1.2,2]].forEach(q=>gl(s,s*2.58,q[0],q[1],q[2]))}
for(const s of[-1,1]){const sc=ad(.3,2.6,4.6,'#f3e7ff',s*3.12,2.2,7,1),ir=ad(.35,1.9,1.9,PU,s*3.16,2.2,7,1),pu=ad(.4,.9,.9,'#10051c',s*3.2,2.2,7),lt=ad(.4,1.3,5,GD,s*3.22,4.4,7),lb=ad(.4,1.3,5,GD,s*3.22,0,7);ey.push({sc,ir,pu,lt,lb})}
{const st=ad(.3,3.4,.5,'#d9b24a',0,-2.4,5.4);st.rotation.x=.3;ad(1.1,2.6,.2,'#ffd23b',.45,-2.6,5.4,1);ad(1.1,2.6,.2,'#c9a24a',-.45,-2.6,5.4)}
}
else if(F=='evToxic'){
const U=f.gun.userData,GR='#39ff14',gp=U.gp=[],gb=U.gb=[],gv=U.gv=[];U.gn=null;
const ud=(o,l)=>{o.userData={sx:o.scale.x,sy:o.scale.y,sz:o.scale.z};l.push(o);return o},
add=(P,w,h,l,c,x,y,z,gl)=>{const o=new THREE.Mesh(BG,gl?fxMat(c):evM(c));o.scale.set(w,h,l);o.position.set(x,y,z);P.add(o);return o},
tr=(P,w,h,l,x,y,z)=>{const o=new THREE.Mesh(BG,evIceM('#bfffc0',.3));o.scale.set(w,h,l);o.position.set(x,y,z);P.add(o);return o},
bub=(P,ax,a0,a1,x,y,z,ph,sp,s)=>{const o=new THREE.Mesh(BG,fxMat('#d8ffd0'));o.scale.setScalar(s);o.position.set(x,y,z);o.userData={ax,a0,a1,ph,sp,s};P.add(o);gb.push(o);return o};
for(const s of[-1,1]){ud(add(f.gun,.35,.5,22,GR,s*2.78,4.9,6,1),gp);ud(add(f.gun,.35,.5,22,GR,s*2.78,.1,6,1),gp);ud(add(f.gun,.35,.5,10,GR,s*2.55,3.8,24,1),gp);ud(add(f.gun,.35,.5,10,GR,s*2.55,-.2,24,1),gp)}
ud(add(f.gun,.8,.4,20,GR,0,6.62,6,1),gp);
for(let i=0;i<3;i++)add(f.gun,2.7,2.7,.5,GR,0,2.8,30+i*2.4,1);
for(const s of[-1,1]){tr(f.gun,1.3,1.3,15,s*1.4,5.6,24);add(f.gun,.9,.9,14.4,GR,s*1.4,5.6,24,1);add(f.gun,1.5,1.5,.8,'#0e0d0d',s*1.4,5.6,16.6);add(f.gun,1.5,1.5,.8,'#0e0d0d',s*1.4,5.6,31.6);const vv=add(f.gun,.9,.9,1.2,GR,s*1.4,5.6,32.4,1);gv.push(vv);for(let i=0;i<3;i++)bub(f.gun,'z',17.5,31,s*1.4,5.6,0,i*.33+(s>0?.15:0),.35,.55)}
tr(f.gun,1.3,10.8,1.3,0,-9.2,13.5);add(f.gun,.8,10,.8,GR,0,-9.2,13.5,1);add(f.gun,1.6,.9,1.6,'#0e0d0d',0,-14.8,13.5);add(f.gun,1.6,.9,1.6,'#0e0d0d',0,-3.5,13.5);
tr(f.gun,1.3,1.3,10.8,0,-2.2,18.4);add(f.gun,.8,.8,10,GR,0,-2.2,18.4,1);add(f.gun,1.8,1.8,1.8,'#0e0d0d',0,-2.2,13.5);gv.push(add(f.gun,1.2,1.2,1.2,GR,0,-2.2,24.2,1));
for(let i=0;i<4;i++)bub(f.gun,'y',-14,-4,0,0,13.5,i*.25,.5,.55);for(let i=0;i<3;i++)bub(f.gun,'z',14,23.5,0,-2.2,0,i*.33,.45,.5);
const mg=new THREE.Group();mg.position.set(0,-9.5,9.5);mg.rotation.x=-.12;f.gun.add(mg);
for(const c of f.gun.children.slice()){if(c.scale.x>3.3&&c.scale.x<3.5&&c.scale.z>5.3&&c.scale.z<5.5&&c.position.y<-4&&c.position.y>-12)f.gun.remove(c)}
tr(mg,3.7,11.2,5.7,0,0,0);U.liq=add(mg,3,9.4,4.6,GR,0,0,0,1);U.liq.userData={sx:3,sy:9.4,sz:4.6};add(mg,3.9,.8,5.9,'#0e0d0d',0,5.6,0);add(mg,3.9,.8,5.9,'#0e0d0d',0,-5.6,0);
for(let i=0;i<6;i++){const b=bub(mg,'y',-4.5,4.5,(i%3-1)*.8,0,(i%2?.9:-.9),i*.17,.55,.6)}
for(const s of[-1,1]){const bg=new THREE.Group();bg.position.set(s*2.84,2.4,8);bg.rotation.y=Math.PI/2;f.gun.add(bg);
const rg=(sc,px,py)=>{const o=new THREE.Mesh(EVT,fxMat(GR));o.scale.setScalar(sc);o.position.set(px,py,0);bg.add(o)};rg(.5,0,0);for(let k=0;k<3;k++){const a=Math.PI/2+k*2.0944;rg(1.2,Math.cos(a)*1.35,Math.sin(a)*1.35)}}
add(f.gun,5.4,5.4,.5,'#100f0f',0,1.4,-20.6);{const o=new THREE.Mesh(EVT,fxMat(GR));o.scale.setScalar(2.5);o.position.set(0,1.4,-20.95);f.gun.add(o)}
for(let i=0;i<7;i++){const a=Math.PI*(.88-i*.126),col=i<2?'#ff4040':i<3?'#ffd23b':GR;add(f.gun,.5,.5,.3,col,Math.cos(a)*1.8,1.4+Math.sin(a)*1.8,-21,1)}
{const nd=new THREE.Group();nd.position.set(0,1.4,-21.2);const nn=add(nd,.28,1.9,.25,'#ff3030',0,.95,0,1);nd.rotation.z=-.7;f.gun.add(nd);nd.userData={base:-.7};U.gn=nd;add(f.gun,.9,.9,.5,'#ffffff',0,1.4,-21.4)}
{const bt=new THREE.Mesh(GCG,evM('#1b261b'));bt.scale.set(1.5,1.5,8);bt.position.set(3.6,.6,-12);f.gun.add(bt);
for(const z of[-9.4,-14.6]){const bd=new THREE.Mesh(GCG,fxMat(GR));bd.scale.set(1.58,1.58,.9);bd.position.set(3.6,.6,z);f.gun.add(bd)}
const nk=new THREE.Mesh(GCG,evM('#8a948c'));nk.scale.set(.6,.6,1.8);nk.position.set(3.6,.6,-7.2);f.gun.add(nk);
add(f.gun,2.4,.7,.9,'#232120',3,.6,-9.8);gv.push(add(f.gun,1.4,1.4,.6,GR,3.6,.6,-6.2,1));add(f.gun,.5,.5,3.4,'#143a14',3.1,.9,-4.4)}
}
else if(F=='evGold'){
const gp=f.gun.userData.gp=[],gh=f.gun.userData.gh=[],gd=f.gun.userData.gd=[],ud=(o,l,a)=>{o.userData={sx:o.scale.x,sy:o.scale.y,sz:o.scale.z};l.push(o);return o};
for(const s of[-1,1]){d(.5,.6,L*.95,'#ffc21a',s*2.5,top-.1,L*.5,1);d(.5,.6,L*.95,'#ffc21a',s*2.5,bot+.1,L*.5,1);ud(d(.35,.5,L*.62,'#ffd23b',s*2.62,mid+.3,L*.55,1),gp)}
d(.8,.6,L*.95,'#ffc21a',0,top+.3,L*.5,1);ud(d(1.2,.5,L*.6,'#ffd23b',0,top+.65,L*.55,1),gp);
for(let i=0;i<7;i++)for(const s of[-1,1]){const o=d(.7,2.2,L*.1,i%2?'#1e1a12':'#2a2416',s*2.55,mid+(i%2?.9:-.2),L*(.07+.13*i));o.rotation.x=.5;d(.5,.5,.7,'#ffc21a',s*2.95,mid+(i%2?1.6:.5),L*(.07+.13*i)+.6,1)}
for(let i=0;i<5;i++)d(1,2.4,1.6,'#ffc21a',0,top+1.3,L*(.12+.17*i),1).rotation.x=-.25;
d(.5,1.4,L*.16,'#ff8a00',-2.55,mid-.4,L*.08,1);d(.5,1.4,L*.16,'#ff8a00',2.55,mid-.4,L*.08,1);
for(let i=0;i<5;i++)ud(d(1,2.6,1,i%2?'#ffb81c':'#ff8a00',(i-2)*.75,bot-1.3,L*(.03+.045*i),1),gd);
d(2.6,.8,L*.14,'#ffb81c',0,bot-.2,L*.07,1);
d(3.8,1.6,5.2,'#e0a010',0,mid+.9,L+2.8);d(4.6,3,3.4,'#c98a0a',0,mid+.7,L+.2);
d(3,1,4.8,'#b87a08',0,mid-1.8,L+2.8).rotation.x=.38;
for(const x of[-1.3,-.45,.45,1.3]){d(.5,1.2,.5,'#fff3c8',x,mid-.3,L+4.9);d(.5,1.1,.5,'#fff3c8',x*.9,mid-1.3,L+4.9)}
for(const s of[-1,1]){d(.8,.8,4.4,'#ffc21a',s*1.8,mid+2.9,L-.4,1).rotation.x=-.5;d(.5,.5,2.4,'#ffc21a',s*2.5,mid+.3,L+.9,1);ud(d(.9,.9,.5,'#fff3a0',s*1.6,mid+1.7,L+2.3,1),gh)}
ud(d(1.8,1.2,1.2,'#ff9a1f',0,mid-.4,L+4.6,1),gh);ud(d(1.1,.7,.8,'#ffd23b',0,mid-1.5,L+4.2,1),gh)}
else if(F=='evDragon'){
for(let i=0;i<5;i++)d(1.2,2.6,1.6,'#ffd23b',0,top+1.4,L*(.12+.17*i),1);
for(let i=0;i<6;i++)for(const s of[-1,1])d(.5,1.6,L*.1,i%2?'#14b57a':'#0e8a5f',s*2.3,mid+1,L*(.1+.14*i));
for(let i=0;i<3;i++)d(1,3,1,'#ffd23b',0,bot-1.8,L*(.22+.07*i),1).rotation.x=.4;
d(3.6,1.6,5,'#14b57a',0,mid+.9,L+2.5);d(3,1,4,'#0e8a5f',0,mid-1,L+2);d(.7,1.6,.7,'#ffffff',-1.2,mid-.2,L+4.5);d(.7,1.6,.7,'#ffffff',1.2,mid-.2,L+4.5);d(1.6,1.2,1.4,'#2dffb0',0,mid-.1,L+4.2,1);
for(const s of[-1,1]){d(1.2,1.2,4,'#ffd23b',s*1.6,mid+2.6,L,1);d(.9,.9,.9,'#2dffb0',s*1.9,mid+1,L+1,1);d(.6,.6,.6,'#0b3d2e',s*.8,mid+1.2,L+5)}
for(const s of[-1,1])d(.6,4,4,'#0b6b4f',s*2.9,mid+2.2,L*.12).rotation.z=s*.7}
else if(F=='evAngel'){
for(const s of[-1,1])for(let j=0;j<4;j++){d(.6,1.1,10-j*1.6,j%2?'#ffffff':'#e6efff',s*(3.2+j*.9),mid+1.8+j*1.5,L*.3).rotation.z=s*(.5+j*.12);d(.6,.6,10-j*1.6,'#ffd86b',s*(3.5+j*.9),mid+2.4+j*1.5,L*.3,1).rotation.z=s*(.5+j*.12)}
d(7,.8,.8,'#ffd86b',0,mid,L*.58,1);d(.8,6,.8,'#ffd86b',0,mid,L*.58,1);d(1.6,1.6,1.6,'#ffffff',0,mid,L*.58,1);
const h=new THREE.Mesh(EVT,fxMat('#ffe27a'));h.scale.setScalar(4.5);h.rotation.x=1.5708;h.position.set(0,top+5.5,L*.5);f.gun.add(h);
const r=new THREE.Mesh(EVT,fxMat('#ffffff'));r.scale.setScalar(2.4);r.position.set(0,mid,L+1);f.gun.add(r);d(2.4,2.4,2.4,'#ffffff',0,mid,L+3,1);
for(let i=0;i<3;i++)d(.6,1,5,'#ffffff',(i-1)*1.4,mid+1,-2.5).rotation.y=(i-1)*.4;
for(const s of[-1,1])d(.8,.8,.8,'#ffd86b',s*1.6,top+1,L*.2,1)}
else if(F=='evPumpkin'){const pz=L*.36;
d(5,4.4,5,'#ff7a00',0,top+2.6,pz);for(const s of[-1,0,1])d(1.2,4.6,5.2,'#c94a00',s*1.6,top+2.6,pz);
d(2.2,1.8,2.2,'#3a6a1a',0,top+5.5,pz);
for(const s of[-1,1]){d(.5,.9,.9,'#ffe14a',s*2.55,top+3.2,pz-1,1);d(.5,.9,.9,'#ffe14a',s*2.55,top+3.2,pz+1,1);d(.5,.7,2.4,'#ffe14a',s*2.55,top+1.8,pz,1)}
d(6.4,.6,6.4,'#2a1458',0,top+4.6,pz);d(3.4,2.4,3.4,'#3a1a80',0,top+6,pz);d(3.5,.5,3.5,'#ff9a1f',0,top+5,pz,1);
for(const s of[-1,1]){d(.5,.5,L*.6,'#ff9a1f',s*2.3,mid+1,L*.5,1);d(.5,.5,L*.5,'#b57bff',s*2.35,mid-1,L*.5,1);
d(1.6,1.6,1.6,'#e8e0d0',s*2,bot-1,L*.9);d(.4,.4,.4,'#ff9a1f',s*2.4,bot-.7,L*.9+.8,1);
d(.6,3.4,6,'#1a0a38',s*2.8,mid+2,L*.1).rotation.z=s*.6;d(.5,.5,6.4,'#ff9a1f',s*3.6,mid+3.4,L*.1,1).rotation.z=s*.6;
for(let i=0;i<4;i++)d(.3,.3,5,'#e8e0ff',s*2.4,mid+.5+i*.4,L*(.2+.16*i)).rotation.y=s*.5}
for(let i=0;i<3;i++)d(.9,2,.9,i%2?'#ffffff':'#ff9a1f',0,bot-1.6,L*(.35+.08*i),1);
d(3,4,4,'#cfc4ff',0,bot-1,2,1);d(2.6,2.4,2.6,'#ff7a00',0,mid,L+3,1);d(.8,.8,.5,'#2a1458',-.7,mid+.3,L+4.4);d(.8,.8,.5,'#2a1458',.7,mid+.3,L+4.4);d(1.2,2.2,1.2,'#b57bff',0,mid+2.4,L+3,1);d(.7,1.2,.7,'#ffb02e',.4,mid+3.6,L+3.2,1)}
else if(F=='evIce'){
const ic=(w,h,l,x,y,z,o,c)=>{const m=new THREE.Mesh(BG,evIceM(c||'#f65252',o||.7));m.scale.set(w,h,l);m.position.set(x,y,z);f.gun.add(m);return m},pz=L*.42,sy=top+3.8,ty=top-4.2;
for(let i=0;i<5;i++)ic(6.2-(i%2)*.4,7.6+(i%2)*.6,L*.2-.7,0,ty+(i%2)*.2,L*(.12+.2*i),.74);
for(let i=0;i<6;i++){const s=i%2?1:-1,c=ic(1.1,4.2+(i%3),1.1,s*(1.2+(i%3)*.5),top+1.6,L*(.05+.17*i),.8,'#f76262');c.rotation.z=s*(.3+(i%3)*.12);c.rotation.x=(i%3-1)*.25}
for(const s of[-1,1])for(let i=0;i<8;i++){const v=d(.45,.45,L*.11,'#e20c0c',s*3.2,ty+((i%2)?1.2:-1.2),L*(.07+.12*i),1);v.rotation.x=(i%2?1:-1)*.55}
d(.8,.5,L*.75,'#e20c0c',0,top+.7,L*.5,1);
for(let i=0;i<4;i++){const c=d(.3,.3,3,'#080707',(i%2?3.15:-3.15),ty+(i%3-1)*1.5,L*(.2+.2*i));c.rotation.x=(i%2?.6:-.6)}
d(5.6,5,5.4,'#f1eee4',0,sy,pz);d(4.6,1.8,5,'#e35656',0,sy-3.2,pz+.2);
const fp=(n,isX,o,lat,y,tN,h2,tL,c,gl)=>{isX?d(tN,h2,tL,c,n*o,y,pz+lat,gl):d(tL,h2,tN,c,lat,y,pz+n*o,gl)};
for(const [n,isX] of[[1,1],[-1,1],[1,0],[-1,0]]){const off=isX?2.85:2.75,lw=isX?1.2:1.35;
for(const e of[-1,1]){fp(n,isX,off,e*lw,sy+.5,.5,1.8,1.7,'#14100d');fp(n,isX,off+.12,e*lw,sy+.5,.4,1.1,1.1,'#e60c0c',1);fp(n,isX,off+.2,e*lw,sy+.7,.3,.4,.4,'#ffffff',1)}
fp(n,isX,off,0,sy-1.9,.45,1.1,4.4,'#14100d');
for(const e of[-1,1]){fp(n,isX,off+.25,e*1.5,sy-1.5,.6,2.4,.8,'#ffffff');fp(n,isX,off+.2,e*.6,sy-2.5,.5,1.2,.6,'#ffffff')}}
for(const s of[-1,1]){let hx=s*2.3,hy=sy+2.1;[[1.05,3.4,1.9],[.55,3.8,1.6],[.1,4,1.3],[-.35,3.4,.95],[-.7,2.6,.55]].forEach(([a,len,th],i)=>{const dx=s*Math.sin(a),dy=Math.cos(a),cx=hx+dx*len/2,cy=hy+dy*len/2;const c=ic(th,len,th,cx,cy,pz,.8,i>2?'#f76262':'#f54949');c.rotation.z=-s*a;const g=d(th*.35,len*.95,th*.35,'#e20c0c',cx,cy,pz,1);g.rotation.z=-s*a;
if(i<3){ic(.7,2.4-i*.4,.7,cx,cy-th*.5-1.2,pz,.9,'#f76262');ic(.35,1.2,.35,cx,cy-th*.5-2.9+i*.3,pz,.9,'#ffffff')}
hx+=dx*len;hy+=dy*len})}
for(let i=0;i<7;i++){const h2=1.8+(i*5%3)*1.1;ic(.7,h2,.7,((i%3)-1)*1.4,ty-3.9-h2/2,L*(.1+.13*i),.88,'#f76262');ic(.35,1.1,.35,((i%3)-1)*1.4,ty-3.9-h2-.5,L*(.1+.13*i),.9,'#ffffff')}
ic(3.4,3.4,3.4,0,ty+1,L+2.2,.85,'#f76262');const mc=ic(1.3,5,1.3,0,ty+3.6,L+2.2,.85,'#ffffff');mc.rotation.x=.35;d(1.2,1.2,1.2,'#e20c0c',0,ty+1,L+2.2,1)}
else{
for(let i=0;i<4;i++)for(const s of[-1,1])d(.6,3.6,.6,'#e66464',s*1.7,bot-.8,L*(.32+.14*i)).rotation.z=s*.2;
for(let i=0;i<5;i++)d(.9,1.2,2.4,'#f32424',0,bot-1.2-i*.5,L*(.55+i*.09),1);d(.6,.6,2,'#f76161',0,bot-3.6,L*1.02,1);
d(3.4,3,3.4,'#e66464',0,top+2.6,L*.2);d(3,1.2,2.6,'#e24b4b',0,top+1.3,L*.2+.3);d(.9,.9,.5,'#c20a0a',-.9,top+2.8,L*.2+1.8,1);d(.9,.9,.5,'#c20a0a',.9,top+2.8,L*.2+1.8,1);d(4,3.2,4,'#221e1c',0,top+3.4,L*.4);d(5,1,5,'#090808',0,top+1.6,L*.4);
for(let i=0;i<4;i++)d(.7,.7,.7,'#d22222',.8*(i%2?1:-1),bot-.5-i*.9,-1.6-i*.4);
d(2,2,3,'#f32424',0,mid,L+3,1);d(1.2,1.2,1.2,'#f32424',1.6,mid+1,L+5,1);
for(const s of[-1,1])d(.4,.4,L*.5,'#f32424',s*2.3,mid,L*.5,1)}}
function evoTrail(b){const g=G;if(b.rune&&SK[b.sk]&&SK[b.sk].fx=='evArcane'&&Math.random()<.1)arcGlyph(b.x,b.y,b.z0||44,.55,7,Math.random()*6.28);if(g.pt.length>(g.rk?40:330)||R()<(g.rk?.9:.4))return;const k=SK[b.sk],P=k.p2,F=k.fx,u=F=='evDemon'?70:F=='evIce'?-30:F=='evPumpkin'?45:F=='evReaper'?50:F=='evAngel'?-22:18;g.pt.push({x:b.x+rr(-3,3),y:b.y+rr(-3,3),vx:rr(-22,22)-b.vx*.03,vy:rr(-22,22)-b.vy*.03,l:rr(.3,.55),m:.55,c:P[R()*P.length|0],u,h:(b.z0||44)+rr(-4,4)})}
function evoDeath(x,y,k,v){const g=G,F=SK[k].fx,grp=new THREE.Group(),ms=[],e={grp,ms,t:0,l:3.5},Z=Math.PI;gw.add(grp);grp.position.set(x,0,y);(g.fx||(g.fx=[])).push(e);if(dst({x,y},g.p)<700)shk=Math.max(shk,7);
if(F=='evAngel'||F=='evReaper'||F=='evPumpkin'||F=='evIce')grp.rotation.y=Math.atan2(cam3.position.x-x,cam3.position.z-y);
const O=t=>Math.max(0,Math.min(1,t/.3,(e.l-t)/.8)),
A=(geo,c,o,s,p,f,nb)=>{const m=new THREE.Mesh(geo,new THREE.MeshBasicMaterial({color:c,transparent:true,opacity:o,depthWrite:false,side:THREE.DoubleSide,blending:nb?THREE.NormalBlending:THREE.AdditiveBlending}));m.scale.set(s[0],s[1],s[2]);m.position.set(p[0],p[1],p[2]);m.userData={o,f};grp.add(m);ms.push(m);return m},
RG=(c,r,o)=>{A(mythRG,c,o,[r,r,1],[0,2,0],(m,t)=>{const s=r*Math.min(1,t/.5+.05);m.scale.set(s,s,1);m.material.opacity=o*O(t)}).rotation.x=-Z/2},
MT=(geo,cs,n,s0,sp,rad,dn)=>{for(let i=0;i<n;i++){const a=rr(0,6.28),r0=rr(8,rad),ph=rr(0,1),s=s0*rr(.6,1.2);A(geo,cs[i%cs.length],1,[s,s,s],[0,0,0],(m,t)=>{const q=(t*sp/300+ph)%1,aa=a+t*1.2;m.position.set(Math.cos(aa)*r0,dn?300*(1-q):q*300,Math.sin(aa)*r0);m.scale.setScalar(s*(dn?1:1-q)*O(t)+.01);if(dn)m.rotation.set(t*3+ph,t*2,0)})}};
if(F=='evDemon'){e.l=3.4;RG('#da0b0b',175,.7);RG('#d30b0b',110,.6);
for(let j=0;j<5;j++){const a1=-Z/2+j*2*Z/5,a2=-Z/2+((j+2)%5)*2*Z/5,x1=Math.cos(a1)*78,z1=Math.sin(a1)*78,x2=Math.cos(a2)*78,z2=Math.sin(a2)*78,mx=(x1+x2)/2,mz=(z1+z2)/2,len=Math.hypot(x2-x1,z2-z1),th=Math.atan2(z2-z1,x2-x1);
A(BG,'#da0b0b',.95,[len,1.6,3.5],[0,4,0],(m,t)=>{const a=t*.9,c=Math.cos(a),s=Math.sin(a);m.position.set(mx*c-mz*s,4,mx*s+mz*c);m.rotation.y=-(th+a);m.scale.set(len*Math.min(1,t*4)+.01,1.6,3.5);m.material.opacity=.95*O(t)})}
for(const [px,pz,r] of[[0,0,26],[-50,28,15],[50,28,15]]){A(mythYG,'#d10b0b',.5,[r,1,r],[px,0,pz],(m,t)=>{const h=Math.max(1,280*Math.min(1,t*2.2)*O(t)),w=r*(1+.15*Math.sin(t*20+px));m.scale.set(w,h,w);m.position.y=h/2});A(mythYG,'#e30c0c',.75,[r*.45,1,r*.45],[px,0,pz],(m,t)=>{const h=Math.max(1,220*Math.min(1,t*2.2)*O(t));m.scale.set(r*.45,h,r*.45);m.position.y=h/2})}
for(const s of[-1,1])for(let j=0;j<4;j++)A(mythYG,'#2a0008',1,[9-j*2,1,9-j*2],[s*(24+j*8),0,0],(m,t)=>{const h=Math.max(1,24*Math.min(1,t*2)*O(t));m.scale.y=h;m.position.y=j*22+h/2;m.rotation.z=-s*.4},1);
MT(mythSG,['#da0b0b','#d30b0b','#e30c0c'],34,5,150,85)}
else if(F=='evArcane'){e.l=4.8;
const PU='#b36bff',PL='#e0b0ff',GD='#ffd23b',mt=(c,o,ad)=>new THREE.MeshBasicMaterial({color:c,transparent:true,opacity:o,depthWrite:false,side:THREE.DoubleSide,blending:ad?THREE.AdditiveBlending:THREE.NormalBlending}),fl=t=>8+3*Math.sin(t*3)+Math.min(t,1.4)*9;
if(!TXT)TXT=new THREE.TorusGeometry(1,.16,6,32);
let piv=null;if(v&&v.mesh){try{piv=new THREE.Group();const cl=v.mesh.clone(true);cl.visible=true;cl.rotation.set(0,0,0);cl.position.set(0,v.mesh.position.y,0);piv.rotation.y=v.mesh.rotation.y;piv.add(cl);grp.add(piv)}catch(_){piv=null}}
const bk=new THREE.Group();bk.rotation.y=Math.atan2(cam3.position.x-x,cam3.position.z-y);grp.add(bk);
const mB=mt('#6b3f1d',1),mG=mt('#d8b25a',1),mP=mt('#f3e7c6',1),mE=mt(PU,.9,1),bx=(P,m,w,h,l,px,py,pz)=>{const o=new THREE.Mesh(BG,m);o.scale.set(w,h,l);o.position.set(px,py,pz);P.add(o);return o},reg=o=>{o.userData={o:1,f:()=>{}};ms.push(o);return o};
const back=bx(bk,mB,62,134,4,0,67,-16);bx(bk,mP,56,124,6,0,67,-12);reg(bx(bk,mG,62,3,5,0,134,-16));bx(bk,mG,62,3,5,0,0,-16);bx(bk,mG,3,134,5,-30,67,-16);bx(bk,mB,5,138,38,31,67,0);
const fp=new THREE.Group();fp.position.set(31,0,16);bk.add(fp);bx(fp,mB,62,134,4,-31,67,0);reg(bx(fp,mP,56,124,6,-31,67,-5));bx(fp,mG,62,3,5,-31,134,0);bx(fp,mG,62,3,5,-31,0,0);bx(fp,mG,3,134,5,-62,67,0);
const em=new THREE.Mesh(TXT,mE);em.scale.set(20,20,20);em.position.set(-31,67,3);fp.add(em);for(let i=0;i<3;i++){const o=new THREE.Mesh(BG,mE);o.scale.set(34,1.6,.6);o.position.set(-31,67,3);o.rotation.z=i*1.0472;fp.add(o)}reg(em);
let sl=0;back.userData={o:1,f:(m,t)=>{const s=t<.2?.3+.7*t/.2:1;bk.scale.setScalar(s);const p=Math.min(1,Math.max(0,(t-.2)/.42));fp.rotation.y=2.2*(1-p*p*p);const yy=fl(t);bk.position.y=yy;let jx=0,jz=0;if(t>.62&&t<1.45){jx=rr(-1.5,1.5);jz=rr(-1.5,1.5);if(!sl){sl=1;shk=Math.max(shk,9)}}bk.position.x=jx;bk.position.z=jz;mE.opacity=t<.62?.5:.6+.4*Math.sin(t*20);bk.visible=t<1.45;if(piv){piv.visible=t<.56;piv.position.y=yy}
if(t>.62&&t<1.6&&g.pt&&g.pt.length<(g.rk?40:330))for(let i=0;i<2;i++)g.pt.push({x:x+rr(-14,14),y:y+rr(-14,14),vx:rr(-16,16),vy:rr(-16,16),l:rr(.6,1),m:1,c:[PU,PL,GD][R()*3|0],u:55,h:rr(30,110)})}};ms.push(back);
for(let i=0;i<16;i++){const dx=rr(-1,1),dy=rr(.1,1),dz=rr(-1,1),sp=rr(60,130),ph=rr(0,6.28);A(BG,'#f3e7c6',1,[10,14,.4],[0,60,0],(m,t)=>{const tt=t-.62;if(tt<0||tt>1.2){m.visible=false;return}m.visible=true;m.position.set(dx*tt*sp,60+dy*tt*sp*.7-tt*tt*40,dz*tt*sp);m.rotation.set(tt*6+ph,tt*5,tt*4);m.material.opacity=Math.max(0,1-tt/1.2)},1)}
for(let i=0;i<26;i++){const a=rr(0,6.28),r0=rr(6,34),ph=rr(0,1),s=rr(3,6),col=[PU,PL,GD][i%3];A(mythSG,col,1,[s,s,s],[0,0,0],(m,t)=>{const tt=t-.62;if(tt<0||tt>1.8){m.scale.setScalar(.01);return}const q=(tt*.55+ph)%1,aa=a+tt*2.2;m.position.set(Math.cos(aa)*r0*(1-q*.4),20+q*130,Math.sin(aa)*r0*(1-q*.4));m.scale.setScalar(s*(1-q)*Math.min(1,tt*4)+.01);m.material.opacity=1})}
for(let i=0;i<24;i++){const an=rr(0,6.28),el=rr(-.3,1),sp=rr(70,150),ph=rr(0,6.28);A(BG,[PL,GD,PU][i%3],1,[5,7,.5],[0,75,0],(m,t)=>{const tt=t-1.45;if(tt<0||tt>1.3){m.visible=false;return}m.visible=true;const d=sp*tt*(1-tt*.35);m.position.set(Math.cos(an)*d,75+el*d*.6,Math.sin(an)*d);m.rotation.set(ph+tt*7,tt*5,tt*6);m.material.opacity=Math.max(0,1-tt/1.3)})}
A(mythRG,PU,.8,[1,1,1],[0,4,0],(m,t)=>{const tt=t-1.45;if(tt<0){m.scale.setScalar(.01);return}const s=30+tt*260;m.scale.set(s,s,1);m.material.opacity=.8*Math.max(0,1-tt/.6)}).rotation.x=-Z/2;
const gp=t=>Math.min(1,Math.max(0,(t-.3)/.45));
A(mythCG,'#10041c',.6,[70,70,1],[0,1.5,0],(m,t)=>{const p=gp(t);m.scale.set(70*p+.01,70*p+.01,1);m.material.opacity=.6*O(t)*p},1).rotation.x=-Z/2;
A(mythTG,PU,.9,[66,66,3],[0,2.2,0],(m,t)=>{const p=gp(t);m.scale.set(66*p+.01,66*p+.01,3);m.material.opacity=(.7+.25*Math.sin(t*5))*O(t)*p}).rotation.x=-Z/2;
A(mythTG,GD,.8,[54,54,3],[0,2.3,0],(m,t)=>{const p=gp(t);m.scale.set(54*p+.01,54*p+.01,3);m.material.opacity=.75*O(t)*p}).rotation.x=-Z/2;
for(let i=0;i<16;i++)A(BG,i%2?GD:PU,.9,[6,1.2,3],[0,2.4,0],(m,t)=>{const p=gp(t),aa=-t*.35+i*.3927;m.position.set(Math.cos(aa)*58,2.4,Math.sin(aa)*58);m.rotation.y=-aa;m.scale.set(6*p+.01,1.2,3*p+.01);m.material.opacity=.9*O(t)*p});
for(let i=0;i<5;i++){const j=(i+2)%5;A(BG,PL,.8,[1,1,1],[0,2.4,0],(m,t)=>{const p=gp(t),rot=t*.3,a1=-Math.PI/2+i*1.2566+rot,a2=-Math.PI/2+j*1.2566+rot,x1=Math.cos(a1)*46,z1=Math.sin(a1)*46,x2=Math.cos(a2)*46,z2=Math.sin(a2)*46,len=Math.hypot(x2-x1,z2-z1);m.position.set((x1+x2)/2,2.4,(z1+z2)/2);m.rotation.y=-Math.atan2(z2-z1,x2-x1);m.scale.set(len*p+.01,1.1,2.4);m.material.opacity=.8*O(t)*p})}
A(mythTG,GD,.9,[12,12,3],[0,2.6,0],(m,t)=>{const p=gp(t);m.scale.set(12*p+.01,12*p+.01,3);m.material.opacity=(.6+.4*Math.sin(t*6))*O(t)*p}).rotation.x=-Z/2;
for(let i=0;i<2;i++)A(BG,'#ffffff',.9,[1,1,1],[0,2.8,0],(m,t)=>{const p=gp(t);m.scale.set(24*p+.01,1.2,2);m.rotation.y=i*Math.PI/2+t*.5;m.material.opacity=(.5+.5*Math.sin(t*6+i))*O(t)*p})}
else if(F=='evToxic'){e.l=3.6;
const GR='#39ff14',GL='#9dff6a',GP3=[GR,GL,'#c8ffa0'];if(!TXT)TXT=new THREE.TorusGeometry(1,.16,6,32);
if(v&&v.mesh){try{const piv=new THREE.Group(),tl=new THREE.Group(),gm=new THREE.MeshBasicMaterial({color:GR,transparent:true,opacity:.92,depthWrite:false}),cl=v.mesh.clone(true);
cl.traverse(o=>{if(o.isMesh)o.material=gm});const y0=v.mesh.position.y;piv.rotation.y=v.mesh.rotation.y;cl.rotation.set(0,0,0);cl.position.set(0,y0,0);cl.visible=true;tl.add(cl);piv.add(tl);grp.add(piv);
const dm=new THREE.Mesh(BG,gm);dm.scale.setScalar(.01);
dm.userData={o:1,f:(m,t)=>{let q=0;if(t<.5){gm.color.set((t*30|0)%2?GR:GL);gm.opacity=.92}else{q=Math.min(1,(t-.5)/.55);gm.color.set(GR);gm.opacity=Math.max(0,.92*(1-(t-.5)/1.1));tl.rotation.x=-q*1.45;tl.position.y=-q*14;tl.scale.y=Math.max(.05,1-(t-.5)*.6)}
if(gm.opacity<=0)piv.visible=false;
if(t<1.6&&g.pt&&g.pt.length<(g.rk?40:330))for(let i=0;i<2;i++)g.pt.push({x:x+rr(-12,12),y:y+rr(-12,12),vx:rr(-18,18),vy:rr(-18,18),l:rr(.5,.9),m:.9,c:GP3[R()*3|0],u:40,h:t<.5?rr(20,90):rr(4,50)*(1-q*.6)})}};
grp.add(dm);ms.push(dm)}catch(_){}}
RG(GR,120,.28);
A(mythCG,GR,.22,[70,70,1],[0,2,0],(m,t)=>{const p=Math.min(1,Math.max(0,(t-.45)/.5));m.scale.set(70*p+.01,70*p+.01,1);m.material.opacity=.22*O(t)*p}).rotation.x=-Z/2;
for(let i=0;i<9;i++){const a=i*2.4,r0=i?rr(10,44):0,hh=rr(26,64),s0=rr(34,54);A(mythSG,i%2?GR:'#7dff3a',.2,[1,1,1],[Math.cos(a)*r0,hh,Math.sin(a)*r0],(m,t)=>{const p=Math.min(1,Math.max(0,(t-.45)/.5)),w=s0*(.15+.85*p)*(1+.08*Math.sin(t*3+i));m.scale.set(w,w*.8,w);m.position.set(Math.cos(a+t*.25)*r0,hh+Math.sin(t*1.6+i)*4+p*8,Math.sin(a+t*.25)*r0);m.material.opacity=.24*O(t)*p},1)}
MT(mythSG,[GR,GL,'#d8ffd0'],22,4,90,60);
{const bm=new THREE.MeshBasicMaterial({color:'#7dff3a',transparent:true,opacity:.95,depthWrite:false,blending:THREE.AdditiveBlending,side:THREE.DoubleSide}),bg=new THREE.Group();bg.position.set(0,92,0);bg.visible=false;grp.add(bg);
const tr=(s,px,py)=>{const o=new THREE.Mesh(TXT,bm);o.scale.set(s,s,s);o.position.set(px,py,0);bg.add(o);return o},main=tr(8,0,0);tr(6,0,0);
for(let k=0;k<3;k++){const a=Math.PI/2+k*2.0944,c=Math.cos(a),s=Math.sin(a);tr(24,c*22,s*22);tr(21.5,c*22,s*22);tr(19,c*22,s*22);const b2=a+1.0472,bar=new THREE.Mesh(BG,bm);bar.scale.set(3,20,2);bar.position.set(Math.cos(b2)*16,Math.sin(b2)*16,0);bar.rotation.z=b2-Math.PI/2;bg.add(bar)}
main.userData={o:1,f:(m,t)=>{const p=Math.min(1,Math.max(0,(t-.6)/.35));bg.visible=p>0&&(t<1||Math.sin(t*13)>-.15);const s=(2+.1*Math.sin(t*7))*p+.01;bg.scale.set(s,s,s);bg.rotation.y=Math.atan2(cam3.position.x-x,cam3.position.z-y);bm.opacity=.95*O(t)}};ms.push(main)}}
else if(F=='evGold'){e.l=3.6;RG('#ffb81c',185,.55);RG('#fff3a0',95,.5);
const E2=(w,l,x,z,ro,c)=>{const k0=1.4;A(BG,c,.9,[w,1.2,l],[x*k0,3,z*k0],(m,t)=>{const p=Math.min(1,t*3.5);m.scale.set(w*k0*p+.01,1.2,l*k0*p+.01);m.material.opacity=.9*O(t)*(.75+.25*Math.sin(t*9+x))}).rotation.y=ro};
E2(14,34,0,26,0,'#ffc21a');E2(30,24,0,-2,0,'#ffb81c');E2(8,14,0,38,0,'#ff7a1a');E2(6,6,-9,6,0,'#ffffff');E2(6,6,9,6,0,'#ffffff');
for(const s of[-1,1]){E2(6,36,s*20,-24,-s*.55,'#fff3a0');E2(64,8,s*46,-8,s*.35,'#ffc21a');E2(50,6,s*42,-22,s*.5,'#ff9a1f');E2(36,5,s*34,-34,s*.65,'#ffc21a');E2(5,24,s*20,8,s*.9,'#ffd23b')}
for(let i=0;i<14;i++)A(BG,'#ffd23b',.9,[8,1.2,3],[0,3,0],(m,t)=>{const a=t*.8+i*Math.PI*2/14;m.position.set(Math.cos(a)*105,3,Math.sin(a)*105);m.rotation.y=-a;m.material.opacity=.9*O(t)});
A(mythYG,'#ffb81c',.5,[18,1,18],[0,0,0],(m,t)=>{const h=Math.max(1,240*Math.min(1,t*2.2)*O(t)),w=18*(1+.12*Math.sin(t*20));m.scale.set(w,h,w);m.position.y=h/2});
A(mythYG,'#fff3a0',.75,[7,1,7],[0,0,0],(m,t)=>{const h=Math.max(1,190*Math.min(1,t*2.2)*O(t));m.scale.set(7,h,7);m.position.y=h/2});
MT(mythSG,['#ffd23b','#ff9a1f','#fff3a0'],28,4,130,80)}
else if(F=='evDragon'){e.l=3.6;RG('#2dffb0',175,.6);RG('#ffd23b',105,.55);
for(let d=0;d<2;d++)for(let i=0;i<18;i++){const hd=i==0,sz=hd?16:12.5-i*.5,c=hd?'#ffd23b':i%3?'#2dffb0':'#ffd23b';A(mythSG,c,.92,[sz,sz,sz],[0,0,0],(m,t)=>{const tt=t*1.15-i*.06,a=tt*5+d*Z,r=60*(1-Math.min(1,Math.max(0,tt-1.8)*.5));m.position.set(Math.cos(a)*r,Math.max(6,10+tt*75)+Math.sin(tt*9)*5,Math.sin(a)*r);m.scale.setScalar(tt<0?.01:sz*O(t)+.01)})}
A(mythRG,'#ffd23b',.9,[1,1,1],[0,150,0],(m,t)=>{const p=Math.max(0,(t-1.9)/1.2);m.rotation.x=-Z/2;m.scale.set(p*240+.01,p*240+.01,1);m.material.opacity=p>0&&p<1?.9*(1-p):0});
MT(mythSG,['#2dffb0','#ffd23b','#ffffff'],22,4,120,80)}
else if(F=='evAngel'){e.l=3.8;RG('#fff3a0',165,.6);RG('#ffffff',95,.7);
A(mythYG,'#ffe9a0',.33,[40,1400,40],[0,700,0],(m,t)=>{m.material.opacity=.33*O(t)*(.85+.15*Math.sin(t*14))});
A(mythYG,'#ffffff',.7,[15,1400,15],[0,700,0],(m,t)=>{m.material.opacity=.7*O(t)});
A(mythTG,'#ffe27a',1,[30,30,30],[0,30,0],(m,t)=>{const p=Math.min(1,t/1.6);m.rotation.x=Z/2;m.position.y=30+p*190;m.scale.setScalar(26+p*10);m.material.opacity=O(t)});
for(const s of[-1,1])for(let j=0;j<6;j++){const ln=62-j*6;A(BG,j%2?'#ffffff':'#fff3a0',.85,[ln,4,10],[0,0,0],(m,t)=>{const o=Math.min(1,t/.8),fp=.9-j*.28+.12*Math.sin(t*6),w=ln*o;m.scale.x=w+.01;m.rotation.z=s*fp;m.position.set(s*(10+Math.cos(fp)*w/2),125+j*3+Math.sin(fp)*w/2,-4);m.material.opacity=.85*O(t)})}
MT(BG,['#ffffff','#fff3a0','#ffca9a'],26,5,70,95,1);MT(mythSG,['#fff3a0','#ffffff'],14,4,120,60)}
else if(F=='evPumpkin'){e.l=3.7;RG('#ff7a00',175,.7);RG('#b57bff',110,.6);
const rise=(w,h,l,c,px,py,pz)=>A(BG,c,1,[w,h,l],[px,py,pz],(m,t)=>{const p=Math.min(1,t/.5);m.position.y=py+p*55+Math.sin(t*3)*4;m.scale.set(w*p+.01,h*p+.01,l*p+.01);m.material.opacity=O(t)},1);
rise(60,52,52,'#ff7a00',0,70,0);rise(10,52,54,'#c94a00',-18,70,0);rise(10,52,54,'#c94a00',18,70,0);rise(10,52,54,'#c94a00',0,70,0);rise(10,14,10,'#3a6a1a',0,102,0);
rise(12,12,4,'#ffe14a',-14,76,27);rise(12,12,4,'#ffe14a',14,76,27);rise(36,8,4,'#ffe14a',0,56,27);rise(5,9,4.5,'#2a1458',-8,57,27.5);rise(5,9,4.5,'#2a1458',8,57,27.5);
rise(84,5,84,'#2a1458',0,98,0);rise(40,30,40,'#3a1a80',0,114,0);rise(42,5,42,'#ff9a1f',0,100,0);
for(const [px,pz,r,c] of[[0,0,30,'#ff7a00'],[-60,30,16,'#b57bff'],[60,30,16,'#b57bff']]){A(mythYG,c,.5,[r,1,r],[px,0,pz],(m,t)=>{const h=Math.max(1,300*Math.min(1,t*2.2)*O(t)),w=r*(1+.15*Math.sin(t*20+px));m.scale.set(w,h,w);m.position.y=h/2});A(mythYG,'#ffe14a',.7,[r*.4,1,r*.4],[px,0,pz],(m,t)=>{const h=Math.max(1,230*Math.min(1,t*2.2)*O(t));m.scale.set(r*.4,h,r*.4);m.position.y=h/2})}
for(let j=0;j<8;j++){const a=j*.785;A(BG,'#1a0a38',.95,[16,3,30],[0,0,0],(m,t)=>{const k=Math.min(1,t/.6),d=40+k*120,aa=a+t*1.6;m.position.set(Math.cos(aa)*d,60+Math.sin(t*5+j)*20+k*60,Math.sin(aa)*d);m.rotation.y=-aa;m.rotation.z=Math.sin(t*14+j)*.6;m.scale.set(16*O(t)+.01,3,30*O(t)+.01)},1)}
MT(BG,['#ff7a00','#ffe14a','#b57bff'],26,6,120,90);MT(mythSG,['#ff9a1f','#ffd23b','#b57bff','#ffffff'],30,5,150,85)}
else if(F=='evIce'){e.l=4.1;RG('#f42525',185,.65);RG('#ffffff',112,.7);const TS=2.5;
A(mythCG,'#f65252',.4,[150,150,1],[0,1.5,0],(m,t)=>{m.rotation.x=-Z/2;const s=160*Math.min(1,t/.45+.05);m.scale.set(s,s,1);m.material.opacity=.42*O(t)});
for(let j=0;j<10;j++){const a=j*.6283+.3,r0=64+(j%3)*26,H0=70+(j*37%60),w0=7+(j%3)*2;A(mythYG,j%2?'#f54949':'#f76262',.85,[w0,1,w0],[Math.cos(a)*r0,0,Math.sin(a)*r0],(m,t)=>{const p=Math.min(1,Math.max(0,(t-j*.03)*3.2)),sh=t>TS+.5?Math.max(0,1-(t-TS-.5)*2.6):1,h=Math.max(.5,H0*p*sh);m.scale.y=h;m.position.y=h/2;m.rotation.z=Math.sin(j*5)*.28;m.material.opacity=.85*O(t)},1)}
const P=(w,h,l,c,px,py,pz,rz)=>{const vx=rr(-1,1),vz=rr(-.4,1),vy=rr(.4,1.5),m=A(BG,c,1,[w,h,l],[px,py,pz],(m,t)=>{if(t<TS){const p=Math.min(1,t/1.05),q=1-Math.pow(1-p,3);m.position.set(px,py-(1-q)*235+(p>=1?Math.sin(t*3)*1.2:0),pz);m.scale.set(w,h,l);m.material.opacity=O(t)}else{const q=t-TS,sc=Math.max(.01,1-q*1.3);m.position.set(px+vx*q*210,py+vy*q*170-q*q*280,pz+vz*q*210);m.scale.set(w*sc,h*sc,l*sc);m.rotation.set(q*vx*7,q*vz*6,q*5);m.material.opacity=O(t)}},1);if(rz)m.rotation.z=rz;return m};
P(22,52,24,'#dc2525',-15,26,0);P(22,52,24,'#dc2525',15,26,0);P(26,8,34,'#bb1e1e',-15,4,6);P(26,8,34,'#bb1e1e',15,4,6);
P(60,12,36,'#221c18',0,58,0);P(63,5,38,'#f76262',0,65,0);P(12,12,4,'#e20c0c',0,58,19);for(let i=0;i<5;i++)P(4,12+(i%2)*6,4,'#f76262',-24+i*12,48,18);
P(56,52,34,'#ed3e3e',0,92,0);P(22,22,4,'#f65757',-13,100,18);P(22,22,4,'#f65757',13,100,18);P(8,26,3,'#e20c0c',0,86,18.5);
P(22,20,26,'#f65757',-38,114,0);P(22,20,26,'#f65757',38,114,0);P(5,16,5,'#f76262',-40,130,0);P(5,16,5,'#f76262',40,130,0);
P(16,48,18,'#ed3e3e',-43,86,4);P(16,48,18,'#ed3e3e',43,86,4);P(20,18,20,'#f65757',-43,58,6);P(20,18,20,'#f65757',43,58,6);
P(12,104,12,'#e32b2b',54,104,16);for(let i=0;i<5;i++)P(19,19,19,'#f76262',54,66+i*20,16);
P(42,36,36,'#f75f5f',0,134,0);P(34,10,32,'#f65252',0,113,2);P(44,7,38,'#e32b2b',0,147,2);
P(9,8,3,'#e20c0c',-10,138,18.5);P(9,8,3,'#e20c0c',10,138,18.5);P(3,3,3.2,'#ffffff',-10,138,19.8);P(3,3,3.2,'#ffffff',10,138,19.8);
P(26,8,3,'#15110e',0,122,18.5);P(4,13,3.4,'#ffffff',-9,127,19.8);P(4,13,3.4,'#ffffff',9,127,19.8);P(3.4,8,3.4,'#ffffff',-4,118,19.8);P(3.4,8,3.4,'#ffffff',4,118,19.8);
for(const s of[-1,1]){let hx=s*13,hy=152;[[.9,22,10],[.45,24,8],[0,24,6.5],[-.4,20,5],[-.75,14,3]].forEach(([a,len,th],i)=>{const dx=s*Math.sin(a),dy=Math.cos(a);P(th,len,th,i>2?'#ffffff':'#f76161',hx+dx*len/2,hy+dy*len/2,0,-s*a);if(i<3)P(3,12+i*3,3,'#f76262',hx+dx*len/2,hy+dy*len/2-th/2-6-i*1.5,0);hx+=dx*len;hy+=dy*len})}
for(let i=0;i<34;i++){const vx=rr(-1,1),vz=rr(-1,1),vy=rr(.5,1.7),sz=rr(5,13);A(BG,i%3?'#f54949':'#ffffff',1,[sz,sz*1.8,sz],[0,100,0],(m,t)=>{const q=t-TS;if(q<0){m.visible=false;return}m.visible=true;m.position.set(vx*q*240,100+vy*q*200-q*q*320,vz*q*240);m.rotation.set(q*vx*9,q*5,q*vz*9);m.material.opacity=Math.min(1,O(t)*1.5)},1)}
A(mythRG,'#ffffff',.9,[1,1,1],[0,70,0],(m,t)=>{const p=Math.max(0,(t-TS)/.5);m.rotation.x=-Z/2;m.scale.set(p*260+.01,p*260+.01,1);m.material.opacity=p>0&&p<1?.9*(1-p):0});
MT(BG,['#ffffff','#f54949','#f42525'],34,5,70,110,1);MT(mythSG,['#f54949','#ffffff'],20,4,110,80)}
else{e.l=3.4;RG('#7dffb0',170,.65);
A(BG,'#d8ffe8',.92,[26,22,22],[0,0,0],(m,t)=>{const p=Math.min(1,t/.5);m.position.y=40+p*60+Math.sin(t*3)*4;m.scale.set(26*p+.01,22*p+.01,22*p+.01);m.material.opacity=.92*O(t)});
A(BG,'#d8ffe8',.8,[20,7,18],[0,0,0],(m,t)=>{const p=Math.min(1,t/.5);m.position.y=24+p*60-Math.abs(Math.sin(t*4))*5;m.scale.set(20*p+.01,7*p+.01,18*p+.01);m.material.opacity=.8*O(t)});
for(const s of[-1,1])A(BG,'#00140a',1,[7,7,3],[s*7,0,12],(m,t)=>{const p=Math.min(1,t/.5);m.position.y=44+p*60;m.scale.set(7*p+.01,7*p+.01,3);m.material.opacity=O(t)},1);
for(let j=0;j<4;j++)A(BG,j?'#7dffb0':'#ffffff',.9,[220,5,3],[0,80,0],(m,t)=>{const p=Math.min(1,Math.max(0,(t-j*.05)/.35));m.rotation.z=1.3-p*2.6;m.material.opacity=(t<.9&&p>0?1:0)*.9/(1+j*.6)});
MT(mythSG,['#7dffb0','#bfffe0','#2a8a5a'],20,7,110,75)}}

function gfxUpd(f,t){const a=f.gfx;if(!a||!f.gun.visible)return;const th=f.gfxT,L=GM[f.gid]||30,cz=L*.5+4,md=th.m,s0=th.s;
for(let i=0;i<a.length;i++){const m=a[i],u=m.userData,ph=u.ph;let x=0,y=0,z=cz,sx=s0,sy=s0,sz=s0,vis=true;
if(md=='orbit'){const an=t*u.sp*2.2+ph,r=7+u.x*2.5;x=Math.cos(an)*r;y=Math.sin(an)*r;z=cz+Math.sin(t*u.sp*1.1+ph)*L*.45;sx=sy=sz=s0*(.75+.45*Math.sin(t*5+ph))}
else if(md=='rise'){const k=(t*.55*u.sp+ph)%1;x=u.x*6+Math.sin(k*7+ph)*2;y=3+k*26;z=L*.1+u.z*L*.9;sx=sy=sz=s0*(1-k)*1.3}
else if(md=='spiral'){const q=(t*u.sp*18+ph*20)%(L+24);z=q-8;const an=z*.32+ph;x=Math.cos(an)*6.5;y=Math.sin(an)*6.5;sx=sy=sz=s0*(.8+.3*Math.sin(t*6+ph))}
else if(md=='wisp'){x=Math.sin(t*u.sp+ph*3)*10;y=4+(Math.sin(t*u.sp*.7+ph)*.5+.5)*18;z=cz+Math.cos(t*u.sp*.8+ph*2)*L*.55;sx=sy=sz=s0*(1+.5*Math.sin(t*4+ph))}
else if(md=='suck'){const k=(t*.8*u.sp+ph)%1,an=ph*6.28+k*3.2,r=(1-k)*17;x=Math.cos(an)*r;y=Math.sin(an)*r;z=cz+(u.z-.5)*L*.8;sx=sy=sz=s0*(1.2-k*.9)}
else{const q=Math.floor(t*13+i*2.3),h1=Math.abs(Math.sin(q*12.9898+i*7.1)*43758.5453)%1,h2=Math.abs(Math.sin(q*78.233+i*3.3)*43758.5453)%1,h3=Math.abs(Math.sin(q*39.346+i*5.9)*43758.5453)%1;x=(h1-.5)*18;y=(h2-.5)*18;z=cz+(h3-.5)*L*1.3;sx=sy=s0*.8;sz=s0*3.6;m.rotation.set(h1*3,h2*3,h3*3);vis=h1>.2}
m.visible=vis&&sx>.05;m.position.set(x,y,z);m.scale.set(sx,sy,sz)}}
function setGun(f,id,sk){f.gid=id;while(f.gun.children.length)f.gun.remove(f.gun.children[0]);f.mf={visible:false};f.gfx=null;const k=GP[id];if(!k)return;for(const q of k)f.gun.add(gpart(q,sk));if(sk&&SK[sk].ev)evoGun(f,id,sk);const m=new THREE.Group(),fc=sk?SK[sk].b:'#ffd45a',fb=(a,b,c,col)=>{const o=new THREE.Mesh(BG,fxMat(col));o.scale.set(a,b,c);m.add(o)};fb(3,3,14,'#ffffff');fb(6.5,6.5,9,fc);fb(18,1.4,1.4,'#ffb02e');fb(1.4,18,1.4,'#ffb02e');fb(12,1.2,1.2,'#ffe27a');m.rotation.z=.4;m.position.z=GM[id]+6;m.visible=false;if(sk&&SK[sk].fx=='evGold'){const ff=(a,b,c,z,col)=>{const o=new THREE.Mesh(BG,fxMat(col));o.scale.set(a,b,c);o.position.z=z;m.add(o)};ff(3,3,34,14,'#ffd23b');ff(7,7,20,8,'#ff9a1f');ff(2,2,48,22,'#fff3a0');ff(11,2,10,6,'#ffb81c');ff(2,11,10,6,'#ffb81c')}if(sk&&SK[sk].fx=='evArcane'){const ff=(a,b,c,z,col,x,y)=>{const o=new THREE.Mesh(BG,fxMat(col));o.scale.set(a,b,c);o.position.set(x||0,y||0,z);m.add(o)};ff(3,3,26,12,'#b36bff');ff(8,8,14,8,'#e0b0ff');ff(2,2,36,18,'#ffd23b');ff(11,2,8,6,'#b36bff');ff(2,11,8,6,'#b36bff');for(const q of[[4,2,16],[-4,3,22],[2,-3,12],[-3,-2,26]])ff(1.6,1.6,1.6,q[2],'#ffd23b',q[0],q[1])}
if(sk&&SK[sk].fx=='evToxic'){const ff=(a,b,c,z,col,x,y)=>{const o=new THREE.Mesh(BG,fxMat(col));o.scale.set(a,b,c);o.position.set(x||0,y||0,z);m.add(o)};ff(3,3,30,13,'#39ff14');ff(8,8,16,9,'#9dff6a');ff(2,2,40,20,'#e8ffd0');ff(11,2,10,6,'#39ff14');ff(2,11,10,6,'#39ff14');for(const q of[[3,2,18],[-3,3,24],[2,-3,14],[-2,-2,28],[4,-1,32]])ff(1.6,1.6,1.6,q[2],'#d8ffd0',q[0],q[1])}f.gun.add(m);f.mf=m;{const kk=sk?SK[sk]:null;if(kk&&(kk.ra==3||kk.fx=='evGold')&&kk.fx&&MFX[kk.fx]){const th=MFX[kk.fx],arr=[];for(let i=0;i<th.n;i++){const pm=new THREE.Mesh(BG,fxMat(th.c[i%th.c.length]));pm.userData={ph:Math.random()*6.283,sp:.8+Math.random()*1.4,z:Math.random(),x:Math.random()*2-1};f.gun.add(pm);arr.push(pm)}f.gfx=arr;f.gfxT=th}}}
function pqOf(f){if(f.isP)return PQ[EQP]||null;if(f.bpq===undefined)f.bpq=Math.random()<.3?PQ[1+(Math.random()*(PQ.length-1)|0)]:null;return f.bpq}
function rsOf(f){if(f.isP)return RS[EQR]||null;if(f.brs===undefined)f.brs=Math.random()<.3?RS[1+(Math.random()*(RS.length-1)|0)]:null;return f.brs}
let XTG=null,XTP=[],XTI=0,XTN=0;
function trailFx(f,g,dt,fall,c){if(!fall){f.trT=0;return}const k=rsOf(f);if(!k)return;if(!(f.isP||f===c||dst(f,c)<(g.rk?900:1500)))return;
if(XTG!==gw){XTG=gw;XTP=[];XTI=0;XTN=0}
const iv=(g.rk?2.2:1)/k.rt;f.trT=(f.trT||0)+dt;let n=0;while(f.trT>=iv&&n<4){f.trT-=iv;n++;trailAdd(f,k,g)}if(f.trT>iv*4)f.trT=0}
function trailAdd(f,k,g){let o=XTP[XTI];if(!o){const m=new THREE.Mesh(BG,new THREE.MeshBasicMaterial({color:'#ffffff',transparent:true,depthWrite:false}));m.visible=false;gw.add(m);o=XTP[XTI]={m,l:0,L:1,s:1,k:null,vx:0,vy:0,vz:0,sp:0};XTN=Math.max(XTN,XTI+1)}XTI=(XTI+1)%(g.rk?90:260);
const alt=altF(f.ft/FT0),a=Math.random()*6.2832,r=Math.random()*14;o.k=k;o.l=o.L=k.lf*(.75+Math.random()*.5);o.s=k.sz*(.7+Math.random()*.6);
o.m.position.set(f.x+Math.cos(a)*r,alt+10+Math.random()*50,f.y+Math.sin(a)*r);o.vx=(Math.random()-.5)*k.sp;o.vz=(Math.random()-.5)*k.sp;o.vy=k.vy+(Math.random()-.5)*k.sp*.5;o.sp=k.spin?(Math.random()-.5)*8:0;
o.m.material.color.set(k.rb?new THREE.Color().setHSL((g.t*.6+Math.random()*.15)%1,.95,.6):k.c[Math.random()*k.c.length|0]);o.m.rotation.set(Math.random()*3,Math.random()*3,Math.random()*3);o.m.visible=true}
function trailUpd(dt){if(XTG!==gw)return;for(let i=0;i<XTN;i++){const o=XTP[i];if(!o||o.l<=0)continue;o.l-=dt;if(o.l<=0){o.m.visible=false;continue}
const t=o.l/o.L,p=o.m.position,s=o.s*(.35+.65*t),sh=o.k.sh;p.x+=o.vx*dt;p.y+=o.vy*dt;p.z+=o.vz*dt;
if(o.sp){o.m.rotation.x+=o.sp*dt;o.m.rotation.y+=o.sp*dt*.7}
if(sh=='long')o.m.scale.set(s*.4,s*2.6,s*.4);else if(sh=='flat')o.m.scale.set(s*1.5,s*.3,s);else o.m.scale.set(s,s,s);
o.m.material.opacity=Math.min(1,t*1.6)*.9}}
function windFx(f,g,dt,fall,show){if(fall&&f.pcM){const h=(g.t*.3+(f.i||0)*.13)%1;f.pcM[0].color.setHSL(h,.9,.55);f.pcM[0].emissive.setHSL(h,.9,.3);f.pcM[1].color.setHSL((h+.5)%1,.9,.75);f.pcM[2].color.setHSL((h+.5)%1,.9,.75)}if(fall){f.pcO=f.ft/FT0<FTO?Math.min(1,(f.pcO||0)+dt*2.6):0;const e=1-Math.pow(1-f.pcO,3);f.pc.scale.setScalar(.35+.65*e);f.pc.rotation.z=Math.sin(g.t*2+f.i)*.07+(f.tlz||0)*.4;f.pc.rotation.x=Math.cos(g.t*1.7+f.i)*.05+(f.tlx||0)*.4}else f.pcO=0;
if(!fall||!show||f.ft/FT0<FTO||f.st!='fall'){if(f.wd)f.wd.visible=false;return}
if(!f.wd){const gr=new THREE.Group(),wm=new THREE.MeshBasicMaterial({color:'#ffffff',transparent:true,opacity:.55,depthWrite:false}),ws=[];for(let i=0;i<9;i++){const o=new THREE.Mesh(BG,wm);o.userData={a:i/9*6.2832+Math.random()*.5,r:22+Math.random()*34,ph:Math.random(),sp:1.1+Math.random()*.9,L:60+Math.random()*90};gr.add(o);ws.push(o)}f.wd=gr;f.wds=ws;f.mesh.add(gr)}
f.wd.visible=true;for(const o of f.wds){const u=o.userData,k=(u.ph+g.t*u.sp)%1,e=Math.sin(k*Math.PI);o.position.set(Math.cos(u.a)*u.r,-60+k*330,Math.sin(u.a)*u.r);o.scale.set(1.3,u.L*e+.01,1.3)}}
function pose(f,g,dt,fall,alt){pose0(f,g,dt,fall,alt);
if(f.fl>(f.pfl||0)+.01)f.fh=1;f.pfl=f.fl;f.fh=Math.max(0,(f.fh||0)-dt*5);
if(f.fh>0&&!(f.dn>0)&&!fall){f.bg.rotation.x-=f.fh*.28;f.a1.rotation.x+=f.fh*.55;f.a2.rotation.x+=f.fh*.55;f.bg.rotation.z+=Math.sin(f.fh*8)*.1*f.fh}
{const A=f.a1.rotation,B=f.a2.rotation;if(f.dn>0||fall||!f.asm)f.asm=[A.x,A.y,A.z,B.x,B.y,B.z];else{const m=f.asm,k=Math.min(1,dt*22);m[0]+=(A.x-m[0])*k;m[1]+=(A.y-m[1])*k;m[2]+=(A.z-m[2])*k;m[3]+=(B.x-m[3])*k;m[4]+=(B.y-m[4])*k;m[5]+=(B.z-m[5])*k;A.set(m[0],m[1],m[2]);B.set(m[3],m[4],m[5])}}
plantPose(f,g,fall);laughPose(f,g,fall);
const on=f.slf&&f.dash>0&&!fall&&!(f.dn>0)&&f.st=='ground';f.slw=(f.slw||0)+((on?1:0)-(f.slw||0))*Math.min(1,dt*(on?16:9));const k=f.slw;if(k<.02)return;
const L=(o,p,v)=>{o[p]+=(v-o[p])*k};
L(f.bg.rotation,'x',-1.1);L(f.bg.position,'z',12);L(f.bg.position,'y',-1);L(f.bg.rotation,'y',0);L(f.bg.rotation,'z',0);
L(f.l1.rotation,'x',-.3);L(f.l2.rotation,'x',-.42);L(f.l1.scale,'y',1);L(f.l2.scale,'y',1);
L(f.a1.rotation,'x',1.9);L(f.a1.rotation,'z',.45);L(f.a2.rotation,'x',-.6);L(f.a2.rotation,'z',-.45);
f.mesh.position.y-=1.5*k;if(k>.4){f.gun.visible=false;f.mf.visible=false}}
function pose0(f,g,dt,fall,alt){const wi=f.ws[f.cur]||0,t=g.t;const gsk=fsk(f,wi);if(f.gid!=wi||f.gsk!==gsk){f.gsk=gsk;setGun(f,wi,gsk)}if(f.skt){const on=f.sk2>0;f.skt.position.set(0,on?3:36,on?0:-9);f.skt.rotation.x=on?0:1.5708}
f.l1.scale.y=f.l2.scale.y=1;f.bg.scale.set(1,1,1);f.bg.rotation.y=0;f.bg.rotation.z=0;
{const bi=f.ws[f.cur^1]||0,bs=bi?fsk(f,bi):0;if(f.bid!==bi||f.bsk!==bs){f.bid=bi;f.bsk=bs;const bk=f.bk;while(bk.children.length)bk.remove(bk.children[0]);const k=GP[bi];if(k)for(const q of k)bk.add(gpart(q,bs))}f.bk.visible=!!bi&&!!GP[bi];f.bk.position.set(-9,22,f.ch==5?-14:f.ch==4?-11:-9.5);f.bk.rotation.set(-1.75,.45,0)}
evoPet(f,t);try{pumpAura(f,t)}catch(e){}
if(f.dn>0){f.pc.visible=false;f.sh.position.y=.6;f.gun.visible=false;f.mf.visible=false;f.mesh.position.y=alt;f.bg.rotation.x=1.45;f.bg.position.set(0,6,-26);const cw=Math.sin(t*5+f.i)*.5*Math.min(1,Math.hypot(f.vx,f.vy)/30);f.a1.rotation.set(-2.6+cw,0,.3);f.a2.rotation.set(-2.6-cw,0,-.3);f.l1.rotation.x=cw*.6;f.l2.rotation.x=-cw*.6;return}
const v=fall?0:Math.hypot(f.vx,f.vy),mv=Math.min(1,v/150),air=f.jh>0;f.ph=(f.ph||0)+dt*(6+v*.035)*(v>8?1:0);
const vm=f.vmx=Math.max(f.vmx||150,v),rn=cl((v/vm-.6)/.4,0,1)*(v>20?1:0);
{const k0=f.ws[0],k1=f.ws[1];if(f.pw===undefined){f.pw=[k0,k1];f.pcu=f.cur}else{const pk=(k0!=null&&k0!==f.pw[0])||(k1!=null&&k1!==f.pw[1]);if(pk&&!fall)f.pu=1;else if(f.cur!==f.pcu&&!fall)f.sw=1;f.pw=[k0,k1];f.pcu=f.cur}}
{const wa=f.wa||0;if(air&&!wa)f.tk=1;if(!air&&wa&&!fall)f.ld=1;f.wa=air?1:0}
f.pu=Math.max(0,(f.pu||0)-dt*2.1);f.sw=Math.max(0,(f.sw||0)-dt*4);f.tk=Math.max(0,(f.tk||0)-dt*8);f.ld=Math.max(0,(f.ld||0)-dt*5.5);
if(f.cd>(f.pcd||0)+.01){f.kk=1;f.mt=.07}f.pcd=f.cd;f.kk=Math.max(0,(f.kk||0)-dt*7);f.mt=(f.mt||0)-dt;
const aim=f.rev>.3||(f.isP&&(ads||aA.on))||(!f.isP&&(f.adsK||0)>.4);f.ak=(f.ak||0)+((aim?1:0)-(f.ak||0))*Math.min(1,dt*12);const ak=f.ak,gl=(a,b)=>b,sw=Math.sin(f.ph)*.9*mv,kk=f.kk;
f.pc.visible=fall&&f.ft/FT0<FTO&&(f.dv||0)<.6;f.sh.position.y=.6-alt;f.gun.visible=!f.hl&&wi>0;f.mf.visible=f.mt>0&&wi>0;
f.mesh.position.y=alt+Math.abs(Math.sin(f.ph))*(2+2.4*rn)*mv-f.ld*4.5;
f.bg.rotation.x=.08*mv+.2*rn-kk*.07-Math.max(0,f.fl)*1.2+(air?.1:0)+f.ld*.22+f.sw*.1+Math.sin(f.pu>0?(1-f.pu)*3.1416:0)*.55;
f.bg.rotation.y=Math.sin(f.ph)*.1*mv*(1+rn)*(1-ak*.85);f.bg.rotation.z=Math.sin(f.ph)*.05*mv;
f.bg.position.y=Math.sin(t*2+f.i)*.4*(1-mv)-(f.pu>0?Math.sin((1-f.pu)*3.1416)*3:0);f.bg.position.z=-kk*2.2;
{const sq=f.ld*.14-f.tk*.1;f.bg.scale.set(1+sq*.5,1-sq,1+sq*.5)}f.bg.position.x=Math.sin(f.ph)*.8*mv*(1+rn);
if(fall){f.l1.rotation.x=Math.sin(t*9)*.4;f.l2.rotation.x=-Math.sin(t*9)*.4;f.a1.rotation.set(3,0,.4);f.a2.rotation.set(3,0,-.4);return}
if(air){const rs=cl((f.jv||0)/300,-1,1);f.l1.rotation.x=-.95+rs*.15;f.l2.rotation.x=.45-rs*.25;f.l1.scale.y=.88;f.l2.scale.y=.9}
else{const sx=Math.sin(f.ph)*(.9+.3*rn)*mv,lf=(.12+.1*rn)*mv;f.l1.rotation.x=sx-f.ld*.5;f.l2.rotation.x=-sx-f.ld*.5;f.l1.scale.y=1-lf*Math.max(0,-Math.cos(f.ph))-f.ld*.18;f.l2.scale.y=1-lf*Math.max(0,Math.cos(f.ph))-f.ld*.18}
if(f.hl){const kt=f.hl.k=='k',hq=1-f.hl.t/(f.hl.tt||(kt?4:2));f.bg.rotation.x+=kt?.24:.12;f.mesh.position.y-=kt?2:1;
if(kt){f.a1.rotation.set(-1.4+Math.sin(t*9)*.1,0,.65);f.a2.rotation.set(-1.4-Math.sin(t*9)*.1,0,-.65)}else{f.a1.rotation.set(-.95,0,1.15);f.a2.rotation.set(-.75+Math.sin(t*13)*.4,0,-.25)}
if(hq>.88){const e=(hq-.88)/.12;f.a1.rotation.x-=e*.5;f.a2.rotation.x-=e*.5}return}
if(wi){const rl=f.rl>0;
f.a2.rotation.set(-gl(1,1.5)-kk*.22+Math.sin(f.ph*2)*.04*rn,0,-gl(.15,.35));
const rq=rl?cl(1-f.rl/(WP[wi].rl||1),0,1):0,smt=x=>x*x*(3-2*x);f.a1.rotation.set(rl?(rq<.3?-1.2+.7*smt(rq/.3):rq<.68?-.5-.75*smt((rq-.3)/.38)+Math.sin((rq-.3)*34)*.04:-1.25):-gl(1.05,1.5)-kk*.18+Math.sin(f.ph*2+1)*.04*rn,0,rl?(rq<.3?.95-.65*smt(rq/.3):rq<.68?.3+.65*smt((rq-.3)/.38):.95):gl(.45,.6));
const rc=WP[wi].ak==3?1.7:WP[wi].ak==1?1.4:WP[wi].ak==2?1:.85;f.gun.position.set(gl(7,5),gl(35,45)+Math.sin(f.ph*2)*(.8+.9*rn)*mv-(rl?5:0)+kk*1.2*rc,12-kk*6.5*rc);f.gun.rotation.set((rl?.7:gl(.5,0))-kk*.2*rc,Math.sin(f.ph)*.03*mv*(1-ak)+(kk>.2?Math.sin(t*90)*.012*kk:0),rl?.35:0);
if(rl){f.gun.rotation.x+=Math.sin(rq*3.1416)*.25;f.bg.rotation.x+=Math.sin(rq*3.1416)*.07;if(rq>.72&&rq<.92)f.a2.rotation.x+=.35*Math.sin((rq-.72)/.2*3.1416)}
{const spr=0*rn*(1-ak)*(rl?0:1)*(air?0:1),idl=0*(1-mv)*(1-ak)*(rl?0:1)*(air?0:1);if(spr>0){f.a1.rotation.x+=spr*.45+Math.sin(f.ph)*.22*spr;f.a2.rotation.x+=spr*.55-Math.sin(f.ph)*.22*spr;f.gun.rotation.x+=spr*.55;f.gun.position.y-=spr*4;f.gun.position.z-=spr*2;f.bg.rotation.x+=spr*.1}
if(idl>0){const b=Math.sin(t*1.6+f.i)*.03;f.a1.rotation.x+=idl*.32+b;f.a2.rotation.x+=idl*.28-b;f.gun.rotation.x+=idl*.3;f.gun.position.y-=idl*2}}}
else{const as=sw*(1+.4*rn),pn=Math.sin(cl(f.cd/.45,0,1)*3.14);if(air){f.a1.rotation.set(-2.2+Math.sin(t*10)*.1,0,.7);f.a2.rotation.set(-2.2-1.7*pn,0,-.7)}else{f.a1.rotation.set(-as,0,.15*rn);f.a2.rotation.set(as-1.7*pn,0,-.15*rn)}}
if(f.sw>0&&wi){const e=f.sw*f.sw;f.gun.position.y-=e*20;f.gun.position.z-=e*6;f.gun.rotation.x+=e*1.1;f.gun.rotation.z+=e*.5;f.a1.rotation.x+=Math.sin(f.sw*3.14)*.5;f.a2.rotation.x+=e*.4}
if(f.pu>0){const q=1-f.pu,b=Math.sin(Math.min(1,q/.8)*3.1416);for(const a of[f.a1,f.a2]){a.rotation.x+=(-.45-a.rotation.x)*b;a.rotation.z+=(.1-a.rotation.z)*b*.7}f.l1.rotation.x-=b*.35;f.l2.rotation.x-=b*.35;if(wi){if(q<.42){f.gun.visible=false;f.mf.visible=false}else{const r=1-(q-.42)/.58;f.gun.position.y-=r*r*18;f.gun.rotation.x+=r*r*.9}}}
{/* v150: modo Sala (treino Contra Squad 1x1-5x5, assistir bots) */
/* v149: animacoes extras */
const hf=Math.max(0,1-(g.t-(f.dmgT||-99))/.2);if(hf>0){f.bg.rotation.x-=hf*.1;f.bg.rotation.z+=Math.sin(g.t*40)*.03*hf}
if(f.kk>(f.pkk||0)+.05)f.rcb=Math.min(1,(f.rcb||0)+.2);f.pkk=f.kk;f.rcb=Math.max(0,(f.rcb||0)-dt*2.4);
f.bg.rotation.z+=Math.sin(t*1.3+f.i)*.012*(1-mv);f.bg.rotation.x+=rn*.06;
if(wi){if(f.rcb>0){f.bg.rotation.x-=f.rcb*.05;f.gun.rotation.x-=f.rcb*.08;f.a1.rotation.x-=f.rcb*.06;f.a2.rotation.x-=f.rcb*.06;f.bg.rotation.y+=Math.sin(t*55)*.006*f.rcb}
if(air){f.a1.rotation.x-=.12;f.a2.rotation.x-=.1;f.gun.position.y+=1.5}}
/* bot correndo sem lutar guarda a arma nas costas; ao entrar em combate saca de novo */
const fgt=(f.tg&&!f.tg.dead)||(f.dmgT||-99)>g.t-3||f.rl>0||f.cd>.02||f.rev>.3||f.sw>0||f.pu>0;if(f.isP||fgt)f.fgT=g.t;
const hT=(!f.isP&&wi&&(f.rn||0)>=.3&&v>60&&g.t-(f.fgT||-99)>1.4)?1:0;
f.hs=(f.hs||0)+(hT-(f.hs||0))*Math.min(1,dt*(hT?7:13));if(Math.abs(f.hs-hT)<.01)f.hs=hT;
const hh=f.hs;if(hh>0&&wi){const sm=hh*hh*(3-2*hh),as2=sw*(1+.4*rn)*1.15,bmp=Math.sin(hh*3.1416)*(hT?.5:1),lp=(o,p,x)=>{o[p]+=(x-o[p])*sm};
lp(f.a1.rotation,'x',-as2-.05);lp(f.a1.rotation,'z',.15+.1*rn);lp(f.a2.rotation,'x',as2-.05);lp(f.a2.rotation,'z',-.15-.1*rn);
lp(f.gun.position,'x',9);lp(f.gun.position,'y',24);lp(f.gun.position,'z',-10);lp(f.gun.rotation,'x',-1.75);lp(f.gun.rotation,'y',-.45);lp(f.gun.rotation,'z',0);
f.a1.rotation.x-=bmp*1.1;f.a1.rotation.z+=bmp*.5;if(hh>.25)f.mf.visible=false}
}
}
let FT8;function ft8(){if(!FT8){const c=document.createElement('canvas');c.width=c.height=32;const q=c.getContext('2d');q.fillStyle='#2c2825';q.fillRect(0,0,32,32);q.fillStyle='#ff6600';q.fillRect(7,10,6,6);q.fillRect(19,10,6,6);q.fillStyle='#fff';q.fillRect(8,11,2,2);q.fillRect(20,11,2,2);q.fillStyle='#ff6600';q.fillRect(10,22,12,2);FT8=new THREE.CanvasTexture(c)}return FT8}
const CST={};let PG0;
function clShirt(f,g,part,M){const c=f.cl,base=c.col,lum=clLum(base),full=!(f.ch==4||f.ch==6||f.ch==7||f.ch==8||f.ch==9||f.ch==11),
tr=f.isP&&lum<.8?'#ffd93b':lum>.62?'#282523':'#ffffff',hi=lum>.5?clMix(base,'#000000',.35):clMix(base,'#ffffff',.5);
if(!PG0)PG0=new THREE.PlaneGeometry(1,1);
const pl=(map,w,h,x,y,z,ry,po)=>{const m=mat('#ffffff',{map,alphaTest:.4,polygonOffset:true,polygonOffsetFactor:po||-4,polygonOffsetUnits:po||-4});f.ms.push(m);const o=new THREE.Mesh(PG0,m);o.scale.set(w,h,1);o.position.set(x,y,z);o.rotation.y=ry||0;g.add(o)};
if(full){
g.add(part(22.6,2.4,11.6,M(hi),0,42.8,0),part(9,1.6,.8,M(tr),0,43.4,5.8),part(22.5,3,11.5,M(tr),0,30,0),part(22.6,.8,11.6,M(hi),0,32.2,0),part(22.6,.8,11.6,M(hi),0,27.8,0),part(22.5,1.8,11.5,M(tr),0,22.9,0));
for(const a of[f.a1,f.a2])a.add(part(10.9,2.2,11.4,M(tr),0,-6,0),part(10.9,.9,11.4,M(hi),0,-8.7,0),part(10.9,.9,11.4,M(hi),0,-3.3,0))}
if(full){const pt=clPatTex(c,tr);if(pt){pl(pt,22,22,0,33,5.62,0,-2);pl(pt,22,22,0,33,-5.62,Math.PI,-2)}}
pl(emTex(c.col,c.sym),5.6,5.6,-5.2,38.6,full?5.85:6.9,0);
if(!full){const bz={4:-8.75,6:-6.2,7:-6.4,8:-11.3,9:-6.5}[f.ch]||-6.4,bs=f.ch==8?6.5:11;pl(emTex(c.col,c.sym),bs,bs,0,f.ch==8?34:35,bz,Math.PI)}
if(full){const num=f.isP?10:((f.i*17+5)%98)+1,k=tr+'|'+c.col+'|'+c.sym+'|'+num+'|v2';let t=CST[k];if(!t){const cv=document.createElement('canvas');cv.width=cv.height=128;const q=cv.getContext('2d');q.textAlign='center';q.textBaseline='middle';q.lineJoin='round';emb(q,64,38,40,c.col,c.sym);q.fillStyle=tr;q.strokeStyle='rgba(19,17,15,.85)';q.lineWidth=6;q.font='900 36px Trebuchet MS,Arial,sans-serif';q.strokeText(String(num),64,108);q.fillText(String(num),64,108);t=CST[k]=new THREE.CanvasTexture(cv)}
pl(t,17,17,0,34,-5.9,Math.PI)}}
const CPT={};
function clPatTex(c,tr){const h=[...String(c.id)].reduce((x,ch)=>(x*31+ch.charCodeAt(0))|0,7),pt=Math.abs(h+(c.sym|0)*3)%5;if(!pt)return null;const k=pt+'|'+tr;if(CPT[k])return CPT[k];const cv=document.createElement('canvas');cv.width=cv.height=128;const q=cv.getContext('2d');q.fillStyle=tr;
if(pt==1){q.fillRect(34,0,13,128);q.fillRect(81,0,13,128)}else if(pt==2){q.fillRect(0,34,128,26)}else if(pt==3){q.beginPath();q.moveTo(0,18);q.lineTo(0,52);q.lineTo(128,112);q.lineTo(128,78);q.closePath();q.fill()}else{q.fillRect(48,0,32,128)}
return CPT[k]=new THREE.CanvasTexture(cv)}
function NZT(){if(NZT.t)return NZT.t;const c=document.createElement('canvas');c.width=c.height=16;const q=c.getContext('2d');for(let y=0;y<16;y++)for(let x=0;x<16;x++){const v=238+(Math.random()*17|0);q.fillStyle='rgb('+v+','+v+','+v+')';q.fillRect(x,y,1,1)}q.fillStyle='#ffffff';q.fillRect(0,0,16,1);q.fillRect(0,0,1,16);q.fillStyle='#bdbdbd';q.fillRect(0,15,16,1);q.fillRect(15,0,1,16);const t=new THREE.CanvasTexture(c);t.minFilter=t.magFilter=THREE.NearestFilter;t.generateMipmaps=false;return NZT.t=t}
function mkMesh(f){if(f.skn===undefined)f.skn=f.isP?trajeOf(f.ch):trajeBot(f);const SKN=!!TJC[f.skn],g0=new THREE.Group(),g=new THREE.Group(),sk=f.ch==4?'#eeeef2':f.ch==8?'#c9d3e0':'#f5cd30',sh=SKN?TJC[f.skn].sh:f.ch==11?'#1d3a8a':f.ch==10?'#3a2470':f.ch==9?'#f5cd30':f.ch==4?'#15151c':f.ch==8?'#2d3b57':f.ch==7?'#222120':f.ch==6?'#f4f6fa':f.cl?f.cl.col:f.isP?'#ffd93b':f.col;f.ms=[];f.gid=-1;f.gho=false;
const M=c=>{const m=mat(c,{map:NZT()});f.ms.push(m);return m},part=(w,h,d,m,x,y,z)=>{const o=new THREE.Mesh(BG,m);o.scale.set(w,h,d);o.position.set(x,y,z);return o};
const pv=(x,y,c)=>{const p=new THREE.Group();p.position.set(x,y,0);p.add(part(10.5,22,11,M(c),0,-11,0));g.add(p);return p};
const lc=SKN?TJC[f.skn].lc:f.ch==11?'#232b5c':f.ch==10?'#3a2470':f.ch==9?'#f5cd30':f.ch==4||f.ch==7?'#1a1a22':f.ch==6?'#e9edf5':f.ch==8?'#4a566b':'#3b5bdb';f.l1=pv(-5.5,22,lc);f.l2=pv(5.5,22,lc);f.a1=pv(-16.5,44,sh);f.a2=pv(16.5,44,sh);f.gun=new THREE.Group();f.gun.position.set(7,35,12);g.add(f.gun);
g.add(part(22,22,11,M(sh),0,33,0));const hm=M(sk),fm=mat('#fff',{map:f.skn=='reaper'?ftSkull():f.ch==4?FT4:f.ch==8?ft8():ftx(f.ch)});f.ms.push(fm);g.add(part(16,16,16,[hm,hm,hm,hm,fm,hm],0,52,0));const N0=g.children.length;
if(f.ch==4){const wh='#ffffff',tc=f.isP?'#ffd93b':f.col,bk='#100f0f';g.add(part(17.5,6,17.5,M(wh),0,60,0),part(3.5,6,3.5,M(wh),-6,65,2),part(3.5,8,3.5,M(wh),0,66,-1),part(3.5,6,3.5,M(wh),6,65,3),part(3,5,3,M(wh),-9.5,58,0),part(3,5,3,M(wh),9.5,58,0),part(17,10,4,M(wh),0,52,-9),part(17.5,3,2,M(wh),0,58.8,8.8),
part(8,17,.7,M('#ffffff'),0,34,5.8),part(3,13,1.2,M(tc),0,33,6.3),part(3,2.6,1,M(tc),6.5,40,6),part(22,5,2.5,M(bk),0,46,-5.5),part(22,32,2,M(bk),0,31,-7.5),part(20,29,.8,M(tc),0,31,-6.4),part(5,10,.8,M(bk),-4.5,38,5.9),part(5,10,.8,M(bk),4.5,38,5.9))}
if(f.ch==3){const bk='#141414';g.add(part(17.5,6,17.5,M(bk),0,60,0),part(3.5,6,3.5,M(bk),-6,65,2),part(3.5,8,3.5,M(bk),0,66,-1),part(3.5,6,3.5,M(bk),6,65,3),part(3,5,3,M(bk),-9.5,58,0),part(3,5,3,M(bk),9.5,58,0),part(17,10,4,M(bk),0,52,-9),
part(17.5,2.2,2,M('#8a5a30'),0,59,8.8),part(5,4.5,2,M('#ffba7d'),-4,59,9.6),part(5,4.5,2,M('#ffba7d'),4,59,9.6),part(24,14,13,M('#5b2fb5'),0,15,0),part(24,3,13,M('#6b4a2a'),0,22.5,0),part(3,5,3,M('#7dff6a'),-7,22,6.9),part(3,5,3,M('#ff7ad9'),0,22,6.9),part(3,5,3,M('#ff944d'),7,22,6.9))}
if(f.ch==2){const pk='#ff7ad9',gn='#4caf50';g.add(part(17,12,4,M(pk),0,50,-9),part(3,10,15,M(pk),-9.3,50,-1),part(3,10,15,M(pk),9.3,50,-1),part(16.5,3,2.5,M(pk),0,57.2,8.7),
part(17.5,7,17.5,M(gn),0,60.5,0),part(2.2,7.2,17.8,M('#2e7d32'),-4,60.5,0),part(2.2,7.2,17.8,M('#2e7d32'),4,60.5,0),part(6,5,6,M(gn),0,66,0),part(4,4,4,M('#ff4d8d'),0,70,0),part(1.8,1.8,1.8,M('#ffd93b'),0,70,2.2),part(23,6,12.5,M('#ffb3e6'),0,20,0));
const fl=(x,y,z)=>{g.add(part(4.5,4.5,1.6,M('#ff4d8d'),x,y,z),part(1.8,1.8,2,M('#ffd93b'),x,y,z+.3))};fl(-5,37,6.4);fl(4,31,6.4);fl(6,38,6.4);fl(-3,20,6.6)}
if(f.ch==1){g.add(part(17.5,7,17.5,M('#e53935'),0,60.5,0),part(18,2.6,18,M('#ffffff'),0,57.8,0),part(5,5,5,M('#ffffff'),0,65.5,0));
const sk=new THREE.Group();sk.add(part(11,2.5,34,M('#ffcc00'),0,0,0),part(11.5,.6,10,M('#222222'),0,1.3,0));for(const zx of[-10,10])for(const xx of[-4.5,4.5])sk.add(part(2.5,3,2.5,M('#eeeeee'),xx,-2.8,zx));g.add(sk);f.skt=sk}
if(f.ch==5){const yl='#ffcc00',or='#ffb300',bl='#2b5fb5',bd='#1d4a96',mt='#c9ced8',br='#6b4a2a';g.add(part(17.5,7,17.5,M(yl),0,60.5,0),part(18.5,1.6,19.5,M(or),0,57.6,.8),part(4,3,18,M(or),0,64.6,0),part(6,3.5,2,M('#ffffff'),0,61,9.2),part(3.6,2,1,M('#ffee88'),0,61,10.3),part(18,2,18.2,M('#333333'),0,58.8,0),part(5,3.4,1.2,M('#ffba7d'),-3.8,58.8,9.3),part(5,3.4,1.2,M('#ffba7d'),3.8,58.8,9.3),
part(14,12,.8,M(bl),0,35,5.9),part(3,17,.8,M(bl),-5.2,38.5,5.9),part(3,17,.8,M(bl),5.2,38.5,5.9),part(6,4,.8,M(bd),0,34,6.4),part(1.4,6,.8,M(mt),-1,36.6,6.5),part(1.2,5,.8,M('#e53935'),1.4,36.4,6.5),part(22.4,10,.8,M(bl),0,30,-5.9),
part(15,17,6,M('#8a8f99'),0,38,-9),part(9,9,1.6,M('#e0a030'),0,40,-12.6),part(3,3,1.8,M('#333333'),0,40,-13.2),part(1,12,1,M('#ff4d4d'),5,52,-10),part(2.4,2.4,2.4,M('#ff4d4d'),5,58.6,-10),part(3,3,12,M('#6b7280'),-6,34,-12),
part(22.5,3,12,M(br),0,23,0),part(4.5,5.5,2,M('#8a5a30'),-7,21,6.9),part(4.5,5.5,2,M('#8a5a30'),7,21,6.9),part(1.8,9,1.6,M(mt),9,20,6.5),part(4,2.5,1.6,M(mt),9,25,6.5))}
if(f.ch==6){const W='#f7f9fc',W2='#e6ebf5',gd='#e0a82e',rd='#e53935',gm='#35d07f',tc=f.isP?'#ffd93b':f.col;
g.add(part(17.5,6,17.5,M(W),0,60,0),part(17.8,2.6,17.8,M(rd),0,57.3,0),part(2.6,15,13,M(W),-8.8,52,-1),part(2.6,15,13,M(W),8.8,52,-1),part(17.5,16,3,M(W),0,53,-8.6),part(4.4,4.4,1,M(gd),0,58.4,8.9),part(3.4,3.4,1.6,M(gm),0,58.4,9.3),
part(24,15,13,M(W),0,14.5,0),part(24.6,2,13.6,M(gd),0,7.6,0),part(24.3,1.4,13.3,M(rd),0,10.5,0),part(22.6,2.4,11.8,M(gd),0,24,0),
part(3,11,.8,M(rd),0,36.5,5.9),part(9,3,.8,M(rd),0,38.5,5.9),part(25,3.4,13,M(W2),0,42.5,0),part(25.4,.9,13.4,M(gd),0,40.8,0),part(2.4,13,.8,M(tc),-7,31,5.9),
part(22,26,2,M(W2),0,31,-6.8),part(22.4,1.6,2.4,M(gd),0,18.4,-6.8));
f.a1.add(part(11.6,3,12,M(gd),0,-19.5,0));f.a2.add(part(11.6,3,12,M(gd),0,-19.5,0));
const hl=new THREE.Mesh(new THREE.TorusGeometry(7.5,.8,6,18),new THREE.MeshBasicMaterial({color:'#ffe27a'}));hl.rotation.x=Math.PI/2;hl.position.set(0,72,0);g.add(hl)}
if(f.ch==8){const ac=f.isP?'#ffd93b':f.col,gl=c=>new THREE.MeshBasicMaterial({color:c}),ds=new THREE.Mesh(new THREE.SphereGeometry(7.5,12,8,0,6.2832,0,1.5708),new THREE.MeshBasicMaterial({color:'#ffcc9f',transparent:true,opacity:.45})),br=new THREE.Mesh(new THREE.SphereGeometry(4.2,10,8),new THREE.MeshBasicMaterial({color:'#ff6fb5'}));ds.position.set(0,60,0);br.position.set(0,62,0);g.add(ds,br);
g.add(part(1.4,8,1.4,M('#8d97a4'),6,64,-3),part(3,3,3,gl('#ff6600'),6,69,-3),part(2.4,6,6,M('#ffb36f'),-9.2,52,0),part(2.4,6,6,M('#ffb36f'),9.2,52,0),part(17.8,2.4,17.8,M(ac),0,58.4,0),
part(11,11,.6,M('#2c2825'),0,34,5.7),part(6,6,1,gl('#ff6600'),0,34,6),part(23,3,12.4,M(ac),0,43.4,0),part(22.6,2.4,11.8,M(ac),0,25,0),part(9,15,5,M('#ffb36f'),0,34,-8.5),part(4,10,3,gl('#ff6fb5'),0,34,-8.8));
f.l1.add(part(11,4,11.6,M('#8d97a4'),0,-18,0));f.l2.add(part(11,4,11.6,M('#8d97a4'),0,-18,0));f.a1.add(part(11,3.4,11.6,M('#ffb36f'),0,-19,0));f.a2.add(part(11,3.4,11.6,M('#ffb36f'),0,-19,0))}
if(f.ch==7){const bk='#16161d',rd=f.isP?'#ffd93b':f.col,sd='#f2c27a',wr='#dcdce6';
g.add(part(17.6,17.6,17.6,M(bk),0,52,0),part(18.2,2.6,18.2,M(rd),0,56.6,0),part(13.8,3.8,.8,M(sd),0,52.6,8.9),part(4,2.4,.6,M('#ffffff'),-3.4,52.8,9.4),part(4,2.4,.6,M('#ffffff'),3.4,52.8,9.4),part(1.7,2.4,.6,M('#111111'),-3.4,52.8,9.8),part(1.7,2.4,.6,M('#111111'),3.4,52.8,9.8),part(5,1.2,.6,M(bk),-3.4,55.2,9.5),part(5,1.2,.6,M(bk),3.4,55.2,9.5),
part(2.2,7,1.6,M(rd),-3,52,-9.6),part(2.2,8,1.6,M(rd),3,49.5,-10.2),part(23,3.6,12.4,M(rd),0,43.2,0),part(22.6,3,11.8,M(rd),0,25,0),part(2,24,.8,M('#2c2c38'),-4,33,5.9),part(2,24,.8,M('#2c2c38'),4,33,5.9));
const kt=new THREE.Group();kt.add(part(3,30,2.2,M('#2d2d38'),0,0,0),part(3.4,9,2.8,M(rd),0,19,0),part(7,1.6,3.6,M('#c8a24a'),0,14.8,0));kt.position.set(0,33,-8.4);kt.rotation.z=.65;g.add(kt);
f.l1.add(part(11,4,11.6,M(wr),0,-18,0));f.l2.add(part(11,4,11.6,M(wr),0,-18,0));f.a1.add(part(11,3.4,11.6,M(wr),0,-19,0));f.a2.add(part(11,3.4,11.6,M(wr),0,-19,0))}
if(f.ch==10){const og='#ff7a00',dk='#c94a00',gl=c=>fxMat(c);
g.add(part(21,19,20,M(og),0,53,0),part(3.2,19.4,20.4,M(dk),-6.5,53,0),part(3.2,19.4,20.4,M(dk),6.5,53,0),part(3.2,19.4,20.4,M(dk),0,53,0),part(3.4,5,3.4,M('#3a6a1a'),0,65,0),part(2,3,2,M('#3a6a1a'),2,68,0),
part(4.4,4.4,1,gl('#ffe14a'),-4.8,55,10.4),part(4.4,4.4,1,gl('#ffe14a'),4.8,55,10.4),part(10,2.2,1,gl('#ffe14a'),0,48,10.4),part(1.8,2.6,1.1,M('#2a1458'),-2.6,48,10.5),part(1.8,2.6,1.1,M('#2a1458'),2.6,48,10.5),
part(24,9,13,M('#2a1458'),0,21,0),part(24,2,13.2,gl('#ff9a1f'),0,17,0),part(22.4,2.4,11.4,gl('#ff9a1f'),0,25,0),part(22.4,2,11.4,gl('#b57bff'),0,40,0),
part(22,4,2,M('#1a0a38'),0,38,-6.4),part(4,10,2,M('#1a0a38'),-9,30,-6.4),part(4,10,2,M('#1a0a38'),9,30,-6.4))}
if(f.ch==9){const og='#ff7a1a',nv='#37302c',rd='#ff3b3b',hr='#3a2410',wh='#ffffff',yl='#ffd93b';
g.add(part(22.6,17.5,11.8,M(og),0,35,0),part(22.8,3,11.9,M(nv),0,25,0),part(3,7,.8,M(yl),-1,38,-6.3),part(3,7,.8,M(yl),1,32,-6.3),part(6,2,.8,M(yl),0,35,-6.3),
part(16.8,2.4,16.8,M(rd),0,56.8,0),part(16.7,4.2,16.7,M(hr),0,60,0),part(2.2,6,1.6,M(rd),-3,55,-9.6),part(2.2,7,1.6,M(rd),3,52.5,-10.2),part(3.4,3.4,6,M(hr),0,60,-10.5),part(2.6,7,2.6,M(hr),0,56,-13));
if(!f.cl)g.add(part(3,7,.8,M(yl),-1,38,6.3),part(3,7,.8,M(yl),1,32,6.3),part(6,2,.8,M(yl),0,35,6.3));
for(const l of[f.l1,f.l2])l.add(part(11.4,9,11.8,M(nv),0,-4.5,0),part(11.4,5,14,M(wh),0,-19.5,1.4),part(11.6,1.6,14.2,M(rd),0,-21.4,1.4),part(11.6,1.2,4,M(yl),0,-18.5,7.6));
for(const a of[f.a1,f.a2])a.add(part(11.2,3,11.8,M(rd),0,-17,0))}
if(f.ch==11){const nv='#1d3a8a',dn='#382e27',hr='#dfe8ff',yl='#ffe14a',cy='#ff954f',gl=c=>fxMat(c);
g.add(part(17.6,5,17.6,M(hr),0,60.5,0),part(17.6,10,2.4,M(hr),0,55,-9.2),part(2,6,12,M(hr),-8.9,56,-1),part(2,6,12,M(hr),8.9,56,-1),
part(4,8,4,M(hr),-5,66,0),part(4,11,4,M(hr),0,68.5,-1),part(4,8,4,M(hr),5,66,1),part(3.5,6,3.5,M(hr),-3,65,-5),part(3.5,6,3.5,M(hr),3,65,-5),
part(2,2,2,gl(cy),-5,70.5,0),part(2,2,2,gl(cy),0,74.5,-1),part(2,2,2,gl(cy),5,70.5,1),
part(17.4,2.2,17.4,gl(cy),0,57.4,0),part(3.4,3.4,1,gl(yl),0,57.4,8.9),
part(23,3.4,12,M(dn),0,43.2,0),part(12,3.6,12.2,M(dn),-16.5,45.6,0),part(12,3.6,12.2,M(dn),16.5,45.6,0),
part(22.6,2.6,11.8,M(dn),0,24.2,0),part(4.4,3.2,.8,gl(yl),0,24.2,6.1),
part(5,2.6,.8,gl(yl),1.8,40.5,6.1),part(4,2.6,.8,gl(yl),-.4,37.8,6.1),part(5,2.6,.8,gl(yl),1,35.1,6.1),part(3.2,2.6,.8,gl(yl),-1.4,32.4,6.1),
part(3.2,3.2,3.2,gl('#fff27a'),-25,52,0),part(3.2,3.2,3.2,gl('#fff27a'),25,56,0));
if(!f.cl)g.add(part(5,2.6,.8,gl(yl),1.8,40.5,-6.1),part(4,2.6,.8,gl(yl),-.4,37.8,-6.1),part(5,2.6,.8,gl(yl),1,35.1,-6.1),part(3.2,2.6,.8,gl(yl),-1.4,32.4,-6.1));
for(const a of[f.a1,f.a2])a.add(part(11.2,7,11.8,M('#e8ecff'),0,-18.5,0),part(11.4,1.4,12,gl(cy),0,-14.4,0));
for(const l of[f.l1,f.l2])l.add(part(11.4,1.6,11.6,gl(cy),0,-8,0))}
if(f.ch!=6&&f.ch!=7&&f.ch!=8)for(const a of[f.a1,f.a2])a.add(part(10.6,3.4,11.2,M(sk),0,-20.3,0));
if(f.ch!=7&&f.ch!=8&&f.ch!=9){const bc=f.ch==6?'#c8923a':f.ch==10?'#1a0a38':f.ch==1?'#f2f2f2':f.ch==4?'#100f0f':'#2b2b34';for(const l of[f.l1,f.l2])l.add(part(11,5,12.6,M(bc),0,-19.5,.8))}
if(f.ch==0||f.ch==1||f.ch==5)g.add(part(1.6,4,3,M(sk),-8.7,51,0),part(1.6,4,3,M(sk),8.7,51,0));
if(f.ch==0||f.ch==1)g.add(part(22.6,2.6,11.8,M('#3a2a1a'),0,24.2,0),part(4.4,3.2,.8,M('#e0b43a'),0,24.2,6.1));
if(f.ch==0)g.add(part(17.8,5.2,17.8,M('#4f6b3a'),0,60.6,0),part(18,1.4,19.4,M('#3d5230'),0,58.4,.8),part(3,2,.8,M('#e0b43a'),0,60.6,9.1),part(2.6,22.2,11.4,M('#3f4f35'),-6.5,33,0),part(2.6,22.2,11.4,M('#3f4f35'),6.5,33,0),part(5.4,4.6,.8,M('#3f4f35'),-5,32,6),part(5.4,4.6,.8,M('#3f4f35'),5,32,6));
if(SKN){for(const c of g.children.slice(N0))if(TJFH[f.skn]||!(c.position.y>44&&c.position.y<59))g.remove(c);for(const l of[f.l1,f.l2,f.a1,f.a2])while(l.children.length>1)l.remove(l.children[1]);({witch:skinWitch,oni:skinOni,reaper:skinReaper,knight:skinKnight,dragon:skinDragon,astro:skinAstro,cyber:skinCyber})[f.skn](f,g,part,M,sk)}
if(f.cl)clShirt(f,g,part,M);
f.bk=new THREE.Group();g.add(f.bk);f.ev=new THREE.Group();g.add(f.ev);f.pc=new THREE.Group();f.pc.position.y=112;{const pq=pqOf(f),pqE=pq&&pq.em?{emissive:pq.c[0],emissiveIntensity:pq.em}:{},R0=46,dm=new THREE.Mesh(new THREE.SphereGeometry(R0,16,8,0,6.2832,0,1.5708),new THREE.MeshLambertMaterial(Object.assign({color:pq?pq.c[0]:f.col,side:THREE.DoubleSide},pqE)));dm.scale.y=.75;f.pc.add(dm);const stm=new THREE.MeshLambertMaterial(Object.assign({color:pq?pq.c[1]:'#ffffff',side:THREE.DoubleSide},pq&&pq.em?{emissive:pq.c[1],emissiveIntensity:pq.em*.5}:{}));for(let i=0;i<4;i++){const st=new THREE.Mesh(new THREE.SphereGeometry(R0+.7,6,8,i*1.5708,.5236,0,1.5708),stm);st.scale.y=.75;f.pc.add(st)}const rim=new THREE.Mesh(new THREE.TorusGeometry(R0,1.7,5,28),new THREE.MeshLambertMaterial({color:pq?pq.c[1]:'#ffffff'}));rim.rotation.x=Math.PI/2;f.pc.add(rim);const lp=[];for(let i=0;i<8;i++){const a=i/8*6.2832;lp.push(new THREE.Vector3(Math.cos(a)*R0,0,Math.sin(a)*R0),new THREE.Vector3(Math.cos(a)*3,-66,Math.sin(a)*3))}f.pc.add(new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints(lp),new THREE.LineBasicMaterial({color:pq?pq.c[2]:'#f2f2f2'})));f.pcM=pq&&pq.fx=='rainbow'?[dm.material,stm,rim.material]:null}g.add(f.pc);
f.sh=new THREE.Mesh(new THREE.CircleGeometry(17,12),new THREE.MeshBasicMaterial({color:0,transparent:true,opacity:.3}));f.sh.rotation.x=-1.5708;g0.add(f.sh);g0.add(g);f.bg=g;addClanIcon(f,g0);return g0}
/* skin Bruxo/Bruxa: substitui os detalhes do personagem por chapeu, capa, tunica e botas de bruxo */
function skinWitch(f,g,part,M,sk){const pu='#5b2f9a',pd='#3a1f66',vi='#7a4fd0',gd='#ffd93b',dk='#39312b',gl=c=>fxMat(c);
g.add(part(25,3.4,13,M(pd),0,42.8,0),part(23,2.6,12.4,M(dk),0,28,0),part(4.4,3.4,.8,M(gd),0,28,6.3),part(4,4,.8,gl('#ffe27a'),0,36,6.1),
part(25,11,14,M(pu),0,17.5,0),part(25.6,1.8,14.6,M(gd),0,12.6,0),part(22,32,2,M(pd),0,28,-7.2),part(19,26,.8,M(vi),0,29,-6.1),part(3,3,1,M(gd),-8,41,-7.8),part(3,3,1,M(gd),8,41,-7.8),

part(27,2,27,M(dk),0,60.8,0),part(17,5,17,M(pd),0,63.8,0),part(13.5,5,13.5,M(pd),0,68.8,0),part(10,5,10,M(pd),0,73.8,0),part(6.5,5,6.5,M(pd),1,78.8,0),part(3.5,4,3.5,M(pd),3,83,0),
part(17.6,2.4,17.6,M(vi),0,62.4,0),part(4,3.4,.8,M(gd),0,62.4,8.9),part(2.6,2.6,2.6,gl('#ffe27a'),3.6,86.4,0));
for(const a of[f.a1,f.a2])a.add(part(11.2,3.2,11.8,M(gd),0,-17,0),part(10.6,3.4,11.2,M(sk),0,-20.3,0));
for(const l of[f.l1,f.l2])l.add(part(11,5,12.6,M('#241f1c'),0,-19.5,.8),part(11.6,1.6,12,M(gd),0,-16.5,.4))}
/* ===== ROSTOS UNICOS: cada personagem tem a propria carinha (Vampiro e Robo ja tinham) ===== */
const FTX={};
function ftx(ch){if(FTX[ch])return FTX[ch];try{const c=document.createElement('canvas');c.width=c.height=64;const q=c.getContext('2d');
const g=q.createLinearGradient(0,0,0,64);g.addColorStop(0,'#ffe36a');g.addColorStop(1,'#eab91c');q.fillStyle=g;q.fillRect(0,0,64,64);q.lineCap='round';q.lineJoin='round';
const dot=(col,x,y,w,h)=>{q.fillStyle=col;q.fillRect(x,y,w,h)},
arc=(col,w,x,y,r,a,b)=>{q.strokeStyle=col;q.lineWidth=w;q.beginPath();q.arc(x,y,r,a,b);q.stroke()},
poly=(col,...p)=>{q.fillStyle=col;q.beginPath();q.moveTo(p[0],p[1]);for(let i=2;i<p.length;i+=2)q.lineTo(p[i],p[i+1]);q.closePath();q.fill()},
ell=(col,x,y,rx,ry,r)=>{q.fillStyle=col;q.beginPath();q.ellipse(x,y,rx,ry,r||0,0,7);q.fill()},
eye=(x,y,w,h,ir)=>{dot('#fff',x,y,w,h);dot(ir||'#3b2412',x+w*.25,y+h*.12,w*.55,h*.76);dot('#0a0a0a',x+w*.4,y+h*.28,w*.28,h*.5);dot('#fff',x+w*.6,y+h*.14,w*.2,h*.2)},
cheek=(col,a)=>{q.globalAlpha=a;dot(col,5,38,12,7);dot(col,47,38,12,7);q.globalAlpha=1},
ln=(col,w,...p)=>{q.strokeStyle=col;q.lineWidth=w;q.beginPath();q.moveTo(p[0],p[1]);for(let i=2;i<p.length;i+=2)q.lineTo(p[i],p[i+1]);q.stroke()};
switch(ch){
case 0:/* Soldado: serio, cicatriz e barba por fazer */eye(12,22,13,9);eye(39,22,13,9);poly('#4a3010',10,17,27,21,27,25,10,22);poly('#4a3010',54,17,37,21,37,25,54,22);dot('#c98f12',30,34,4,6);dot('#6b2a12',21,46,22,3);for(let i=0;i<22;i++)dot('#a07a14',14+(i*13)%36,50+(i*7)%9,1,1);ln('#c0603a',2,48,24,55,46);for(let k=0;k<3;k++)ln('#c0603a',1.5,46+k*3,32+k*5,53+k*3,29+k*5);break;
case 1:/* Skatista: sorriso de lado e sardas */eye(11,18,15,14);eye(38,18,15,14);dot('#6b4a12',9,8,17,4);poly('#6b4a12',37,14,54,10,54,14,37,17);for(const [x,y] of[[9,36],[13,39],[17,36],[47,36],[51,39],[55,36]])dot('#b8741a',x,y,2,2);ln('#6b2a12',3,18,46,34,53,48,41);dot('#fff',33,49,7,3);cheek('#ff6e50',.35);break;
case 2:/* Florista: cilios longos, olhos verdes e bochechas rosadas */eye(11,20,15,14,'#2f9a4a');eye(38,20,15,14,'#2f9a4a');for(const [a,b,x,y] of[[10,22,6,17],[12,19,9,13],[54,22,58,17],[52,19,55,13]])ln('#2a1a0a',2,a,b,x,y);arc('#7a4a1a',2,18,17,8,Math.PI*1.15,Math.PI*1.85);arc('#7a4a1a',2,46,17,8,Math.PI*1.15,Math.PI*1.85);cheek('#ff7ad9',.5);arc('#d63a7a',3,32,42,7,.25,2.9);dot('#ff4d8d',50,44,3,3);break;
case 3:/* Alquimista: oculos de laboratorio, sobrancelhas grossas e fuligem */dot('#6b4a2a',0,24,64,4);q.fillStyle='rgba(125,255,106,.4)';q.beginPath();q.arc(20,27,10,0,7);q.fill();q.beginPath();q.arc(45,27,12,0,7);q.fill();arc('#6b4a2a',4,20,27,10,0,7);arc('#6b4a2a',4,45,27,12,0,7);dot('#fff',17,24,6,7);dot('#0a0a0a',19,26,3,4);dot('#fff',42,23,8,9);dot('#0a0a0a',45,25,4,5);dot('#2a1a0a',8,10,22,5);dot('#2a1a0a',34,8,24,5);q.fillStyle='rgba(40,30,20,.35)';q.beginPath();q.arc(13,46,5,0,7);q.fill();ln('#6b2a12',3,20,47,32,54,46,42);dot('#fff',30,49,4,3);break;
case 5:/* Engenheiro: bigodao, olhar cansado e dente de prata */eye(13,23,11,8);eye(40,23,11,8);dot('#b88a14',13,23,11,3);dot('#b88a14',40,23,11,3);dot('#3a2410',10,16,17,4);dot('#3a2410',37,16,17,4);dot('#c98f12',30,34,4,5);ell('#3a2410',24,42,10,4.5,.15);ell('#3a2410',40,42,10,4.5,-.15);arc('#6b2a12',3,32,50,6,.3,2.84);dot('#dfe8ff',34,50,3,3);q.fillStyle='rgba(60,45,30,.3)';q.beginPath();q.arc(50,30,4,0,7);q.fill();break;
case 6:/* Curandeiro: olhos fechados serenos e marca dourada na testa */arc('#3b2412',3.5,19,31,7,Math.PI,2*Math.PI);arc('#3b2412',3.5,45,31,7,Math.PI,2*Math.PI);arc('#8a6a22',2,19,22,8,Math.PI*1.15,Math.PI*1.85);arc('#8a6a22',2,45,22,8,Math.PI*1.15,Math.PI*1.85);ell('#ff7a1a',32,11,3,3);dot('#fff',31,10,1,1);arc('#8a3a22',3,32,42,8,.4,2.74);cheek('#ff9a8a',.5);break;
case 7:/* Ninja: olhos estreitos e pano escuro no rosto */dot('#16161d',0,38,64,26);dot('#2c2c38',0,38,64,2);dot('#fff',11,22,16,6);dot('#fff',37,22,16,6);dot('#0a0a0a',17,22,6,6);dot('#0a0a0a',43,22,6,6);poly('#111',9,13,28,19,28,22,9,16);poly('#111',55,13,36,19,36,22,55,16);break;
case 9:/* Velocista: olhos arregalados, sorrisao, gota de suor e raio */eye(11,16,15,15,'#2a6ad0');eye(38,16,15,15,'#2a6ad0');poly('#6b4a12',9,14,27,6,27,10,9,18);poly('#6b4a12',55,14,37,6,37,10,55,18);q.fillStyle='#4a1208';q.beginPath();q.moveTo(15,41);q.quadraticCurveTo(32,62,49,41);q.closePath();q.fill();dot('#fff',19,41,26,4);ell('#ff6a8a',32,53,7,3);poly('#ffba7d',57,10,60,16,54,16);poly('#ff6a00',50,32,56,32,52,40,57,40,49,52,51,43,46,43);break;
case 10:/* Fantasma Abobora: rosto de lanterna */dot('#ff7a00',0,0,64,64);for(const x of[10,24,40,54])dot('#c94a00',x,0,4,64);poly('#ffe14a',10,18,26,18,18,32);poly('#ffe14a',38,18,54,18,46,32);poly('#ffe14a',32,34,28,42,36,42);q.fillStyle='#ffe14a';q.beginPath();q.moveTo(12,46);q.lineTo(20,52);q.lineTo(26,46);q.lineTo(32,54);q.lineTo(38,46);q.lineTo(44,52);q.lineTo(52,46);q.lineTo(52,56);q.lineTo(12,56);q.closePath();q.fill();break;
case 11:/* Mago do Trovao: olhos de raio, sobrancelhas e bigode brancos */dot('#fff',11,20,16,10);dot('#fff',37,20,16,10);dot('#ff954f',15,20,8,10);dot('#ff954f',41,20,8,10);dot('#0a0a0a',18,23,3,5);dot('#0a0a0a',44,23,3,5);poly('#dfe8ff',7,18,28,10,30,16,10,22);poly('#dfe8ff',57,18,36,10,34,16,54,22);poly('#ff954f',31,2,37,2,34,8,38,8,30,18,32,10,28,10);ell('#dfe8ff',22,43,11,4,.35);ell('#dfe8ff',42,43,11,4,-.35);poly('#dfe8ff',24,46,40,46,36,60,28,60);dot('#b88a14',8,32,6,1);dot('#b88a14',50,32,6,1);break;
default:return FT}
return FTX[ch]=new THREE.CanvasTexture(c)}catch(e){return FT}}
/* rosto do Ceifador: craneo branco com fogo azul dentro do capuz */
let FTK;function ftSkull(){if(FTK)return FTK;try{const c=document.createElement('canvas');c.width=c.height=64;const q=c.getContext('2d');q.fillStyle='#0a0908';q.fillRect(0,0,64,64);q.fillStyle='#ece6d4';q.beginPath();q.ellipse(32,32,21,26,0,0,7);q.fill();q.fillStyle='rgba(80,70,50,.25)';q.fillRect(10,40,8,10);q.fillRect(46,40,8,10);
q.fillStyle='#080707';for(const x of[22,42]){q.beginPath();q.ellipse(x,28,7,8,0,0,7);q.fill()}
for(const x of[22,42]){q.fillStyle='#1f6bff';q.beginPath();q.moveTo(x-4,34);q.quadraticCurveTo(x-6,27,x-1,21);q.quadraticCurveTo(x,27,x+3,24);q.quadraticCurveTo(x+6,28,x+4,34);q.closePath();q.fill();q.fillStyle='#ffcc9f';q.beginPath();q.moveTo(x-2,34);q.quadraticCurveTo(x-3,29,x,26);q.quadraticCurveTo(x+1,30,x+2,34);q.closePath();q.fill()}
q.fillStyle='#080707';q.beginPath();q.moveTo(32,37);q.lineTo(28,45);q.lineTo(36,45);q.closePath();q.fill();q.fillRect(19,50,26,7);q.fillStyle='#ece6d4';for(let i=0;i<6;i++){const x=20+i*4.2;q.beginPath();q.moveTo(x,50);q.lineTo(x+4,50);q.lineTo(x+2,56);q.closePath();q.fill();q.beginPath();q.moveTo(x,57);q.lineTo(x+4,57);q.lineTo(x+2,52);q.closePath();q.fill()}
return FTK=new THREE.CanvasTexture(c)}catch(e){return FT}}
/* skin Ceifador Espectral: capuz enorme, costelas com almas, bracos de esqueleto, foice gigante nas costas */
function skinReaper(f,g,part,M,sk){const BK='#100f0e',BK2='#1b1a19',BN='#ece6d4',IR='#6b7280',BL='#4aa8ff',
IM=(c,o)=>{const m=mat(c,{transparent:true,opacity:o==null?.8:o});f.ms.push(m);return m},
GL=(c,pu)=>{const m=new THREE.MeshBasicMaterial({color:c,transparent:true,opacity:1});if(pu)trajeReg(m,'pulse',{ph:Math.random()*6});return m},P=part;
/* capuz grande e rasgado com correntes de osso na borda */
g.add(P(21,6,22,M(BK),0,60.5,-.5),P(23,6,24,M(BK2),0,63,-1.5),P(17,6,17,M(BK),0,67.5,-4.5),P(11,5,12,M(BK2),0,72,-8),P(6,4,8,M(BK),0,75,-12.5),
P(2.8,19,20,M(BK),-9.4,52.5,-.5),P(2.8,19,20,M(BK),9.4,52.5,-.5),P(21,19,3.4,M(BK),0,52.5,-9.7),P(21,3.4,3,M(BK),0,58.4,9.2),P(3,12,12,M(BK2),-11,47.5,-3),P(3,12,12,M(BK2),11,47.5,-3),
P(3,3,2,M(BK),-8,43,-10),P(3,4.5,2,M(BK),-3,42,-10.6),P(3,3.5,2,M(BK),3,42.4,-10.6),P(3,3,2,M(BK),8,43,-10));
[[-9.6,58,10.4,0],[-6.6,57,10.6,1.3],[6.6,57,10.6,2.1],[9.6,58,10.4,.7]].forEach(([x,y,z,ph])=>{const ch=new THREE.Group();ch.position.set(x,y,z);for(let k=0;k<4;k++)ch.add(P(1.2,2,1.2,M(BN),0,-k*2.3,k%2?.5:-.5));g.add(ch);trajeReg(ch,'sway',{a:.3,ph})});
/* torso: manto aberto, costelas, almas azuis presas, correntes cruzadas com pingente de foice */
g.add(P(26,4,14,M(BK),0,43,0),P(5.6,22,1.8,M(BK),-8.8,33,6.4),P(5.6,22,1.8,M(BK),8.8,33,6.4),P(15,14,.8,M('#080707'),0,35,5.7),P(1.8,15,1,M(BN),0,35,6.1));
for(let k=0;k<5;k++){const y=41-k*2.8,w=15-(k>2?(k-2)*2.2:0);g.add(P(w,1.2,1.2,M(BN),0,y,6.6),P(1.2,2.4,2,M(BN),-w/2,y-.6,5.9),P(1.2,2.4,2,M(BN),w/2,y-.6,5.9))}
[[-3.6,38,0],[3.6,34.4,1.7],[0,30.4,3.3]].forEach(([x,y,ph])=>{const so=new THREE.Group();so.position.set(x,y,6.2);so.add(P(2.6,3.2,2,GL('#7fc4ff',1),0,0,0),P(1.2,1.8,1.4,GL('#ffddbf'),0,-2.4,0));g.add(so);trajeReg(so,'bob',{y0:y,a:1.2,ph})});
for(let k=0;k<=8;k++){const t=k/8,x=-9+18*t,y=42.5-17*t;g.add(P(2.2,2.2,1.4,M(IR),x,y,7.2),P(2.2,2.2,1.4,M(IR),-x,y,7.4))}
g.add(P(1.2,5,1,M('#2a1f14'),0,31,7.9),P(5.2,1.4,1,GL(BL),2.4,34.4,7.9),P(2,1.4,1,GL(BL),5.6,33.2,7.9));
/* manto longo sempre em movimento */
const hs=[20,24,17,22,19,23,18];
for(let k=0;k<7;k++){const h=hs[k],sg=new THREE.Group();sg.position.set(-12.6+k*4.2,24,-6.8);sg.add(P(4.4,h,1.6,M(BK2),0,-h/2,0));g.add(sg);trajeReg(sg,'flap',{b:0,a:.1,ph:k*.9})}
for(const sx of[-1,1]){for(let k=0;k<3;k++){const h=[18,22,16][k],sg=new THREE.Group();sg.position.set(sx*12.2,24,-4.5+k*4.8);sg.add(P(1.6,h,4.8,M(BK),0,-h/2,0));g.add(sg);trajeReg(sg,'sway',{a:.1,ph:k*1.1+sx})}
const h=[20,16][sx>0?1:0],sg=new THREE.Group();sg.position.set(sx*9.4,24,6.9);sg.add(P(5.6,h,1.6,M(BK),0,-h/2,0));g.add(sg);trajeReg(sg,'flap',{b:0,a:.08,ph:sx*2})}
/* bracos de esqueleto com aneis de caveira e pulseiras com caveirinhas */
[f.a1,f.a2].forEach((a,i)=>{a.children[0].visible=false;
a.add(P(13,9,13.6,M(BK),0,-4.5,0),P(4,5,13,M(BK2),-4.5,-11.5,0),P(4,7,13,M(BK2),0,-12.5,0),P(4,4,13,M(BK2),4.5,-10.5,0),P(3.6,16,3.6,M(BN),0,-14.5,0),P(5.6,3,5.6,M(BN),0,-21.5,0),P(4.6,1,4.6,M(IR),0,-19.6,0));
for(const xx of[-2,-.7,.7,2])a.add(P(.9,3.2,.9,M(BN),xx,-24,1.2));
a.add(P(1.7,1.7,1.7,M(BN),2.1,-23.6,1.4),P(.5,.5,.4,M(BK),1.8,-23.4,2.4),P(.5,.5,.4,M(BK),2.6,-23.4,2.4));
const bc=new THREE.Group();bc.position.set(0,-20,2.6);for(let k=0;k<3;k++)bc.add(P(.9,.9,.9,M(IR),k*1.6-1.6,-.5-k*.2,0),P(1.8,1.8,1.8,M(BN),k*1.6-1.6,-2.4,0));a.add(bc);trajeReg(bc,'sway',{a:.3,ph:i*2.1})});
/* pernas: calca larga rasgada, joelhos de osso, botas pontudas com correntes */
for(const l of[f.l1,f.l2])l.add(P(12.8,13,12.8,M(BK2),0,-8,0),P(4.2,5,12.8,M(BK),-4.2,-16.5,0),P(4.2,3.4,12.8,M(BK),0,-15.7,0),P(4.2,6,12.8,M(BK),4.2,-17,0),P(5.4,4.6,3,M(BN),0,-11,6.2),P(11,5,12.6,M('#171615'),0,-19.5,.8),P(6,2.6,7,M('#171615'),0,-19.8,8.4),P(11.6,1,13,M(IR),0,-17.6,.8),P(11.8,1,13.2,M(IR),0,-20.4,.8),P(2,4,2,M(BN),-4,-17.5,-5.4),P(2,4,2,M(BN),4,-17.5,-5.4));
/* foice gigante de 2 metros presa nas costas por correntes, lamina azul pingando fumaca */
const sy=new THREE.Group();sy.position.set(0,34,-11.5);sy.rotation.z=-.5;sy.add(P(2,84,2.2,M('#2a1f14'),0,6,0),P(3,3,3,M(IR),0,-34,0),P(3.2,6,3.2,M(IR),0,38,0));
const bl=new THREE.Group();bl.position.set(0,46,0);sy.add(bl);
[[-3.5,1,8,2.8],[-9,-.4,6,2.6],[-13.4,-3.2,4.6,2.4],[-16.2,-6.8,3,2.2],[-17.4,-9.8,1.8,2]].forEach(([x,y,w,h])=>bl.add(P(w,h,1.4,GL(BL,1),x,y,0),P(w+1.6,h+1.6,2.4,IM('#2a6aff',.25),x,y,0)));
[[-6,0],[-10,.25],[-13.5,.5],[-16,.75]].forEach(([x,ph])=>{const v=P(2.4,2.4,2.4,IM('#6fa8ff',.5),x,-1,0);bl.add(v);trajeReg(v,'fall',{y0:-1,r:12,ph})});
g.add(sy);for(let k=0;k<=6;k++){const t=k/6;g.add(P(2,2,1.4,M(IR),-8+16*t,40-14*t,-8.5),P(2,2,1.4,M(IR),8-16*t,40-14*t,-8.7))}
/* vapor azul escuro no chao e morceguinhos de fumaca ao redor do capuz */
g.add(P(32,.5,32,IM('#1a2a6a',.35),0,.9,0));
for(let k=0;k<6;k++){const a=k/6*6.2832,v=P(5,5,5,IM('#2a4a9a',.4),Math.cos(a)*10,2,Math.sin(a)*10);g.add(v);trajeReg(v,'rise',{y0:1,r:14,ph:k*.17})}
for(let k=0;k<3;k++){const pv=new THREE.Group();pv.position.set(0,62,0);const bt=new THREE.Group();bt.position.set(18+k*2,k*2,0);const sm=IM('#1a2a55',.8),w1=new THREE.Group(),w2=new THREE.Group();w1.position.set(-1,0,0);w2.position.set(1,0,0);bt.add(P(2,1.6,3,sm,0,0,0));w1.add(P(5,.6,2.4,sm,-2.5,0,0));w2.add(P(5,.6,2.4,sm,2.5,0,0));bt.add(w1,w2);pv.add(bt);g.add(pv);trajeReg(pv,'spin',{a:.8+k*.25});trajeReg(pv,'vis',{ph:k*.33});trajeReg(w1,'wing',{s:1});trajeReg(w2,'wing',{s:-1})}}
/* ===== NOVOS TRAJES: Cavaleiro Dourado, Dragao Infernal, Astronauta Cosmico, Cyber Neon ===== */
function skinKit(f,part){
const IM=(c,o)=>{const m=mat(c,{transparent:true,opacity:o==null?.8:o});m.__op=o==null?.8:o;f.ms.push(m);return m},
GL=(c,pu)=>{const m=new THREE.MeshBasicMaterial({color:c,transparent:true,opacity:1});if(pu)trajeReg(m,'pulse',{ph:Math.random()*6});return m},
P=part,
R=(w,h,d,m,x,y,z,rx,ry,rz)=>{const o=part(w,h,d,m,x,y,z);o.rotation.set(rx||0,ry||0,rz||0);return o};
return{IM,GL,P,R}}
/* skin Cavaleiro Dourado: armadura dourada completa, elmo fechado com pluma, capa real e espada nas costas */
function skinKnight(f,g,part,M,sk){const{IM,GL,P,R}=skinKit(f,part),
GD='#e9b824',GE='#b8860b',GH='#fff0a0',RD='#b8141c',RE='#7a0d12',DK='#1a1410',SV='#dfe6f2';
/* elmo fechado: viseira em T, crista dourada e pluma vermelha */
g.add(P(18.2,17.4,18.2,M(GD),0,52,0),P(18.8,2.4,18.8,M(GE),0,60.6,0),P(14.6,2.4,.8,M(DK),0,53.4,9.3),P(2.4,9,.8,M(DK),0,48.6,9.3),
P(2.6,.9,.5,GL('#bfe8ff',1),-4.6,53.4,9.7),P(2.6,.9,.5,GL('#bfe8ff',1),4.6,53.4,9.7),
P(1,1,.6,M(DK),-5,47,9.3),P(1,1,.6,M(DK),-5,49,9.3),P(1,1,.6,M(DK),5,47,9.3),P(1,1,.6,M(DK),5,49,9.3),
P(2.4,3,17,M(GE),0,62.6,-.4),P(3.2,1.4,19,M(GH),0,64.4,-.4),P(1.2,10,10,M(GE),-9.4,52,-1),P(1.2,10,10,M(GE),9.4,52,-1),
P(15.4,3,14.4,M(GE),0,43.6,0),P(1.6,5,3,M(GE),-9.4,46,6.8),P(1.6,5,3,M(GE),9.4,46,6.8));
const pl=new THREE.Group();pl.position.set(0,63,-1);
[[3,4,5,6],[6.4,-2,4.4,7],[8.4,-7,3.8,7.4],[8.4,-12.4,3.2,6.8],[6.2,-16.6,2.6,5.6]].forEach(([y,z,h,d])=>pl.add(P(3,h,d,M(RD),0,y,z)));
g.add(pl);trajeReg(pl,'flap',{b:0,a:.1,ph:0});
/* peitoral com cruz vermelha, cintura em laminas e saiote de placas */
g.add(P(22.8,9,12,M(GD),0,38,0),P(22.8,2.4,12,M(GE),0,32.2,0),P(22.8,1.4,12,M(GE),0,29.6,0),P(22.8,1.4,12,M(GD),0,27.2,0),
P(4,11,.8,M(RD),0,35.6,6.2),P(11,3.6,.8,M(RD),0,37.6,6.2),P(2.6,2.6,.8,GL('#7fd8ff',1),0,37.6,6.7),
P(23.6,4.6,12.8,M(GE),0,24.4,0),P(4.4,3.2,.8,M(GH),0,24.4,6.5),P(22.8,1,12.2,M(GH),0,41.8,0));
/* capa real vermelha com barra dourada */
const cp=new THREE.Group();cp.position.set(0,43.5,-7);cp.rotation.x=.12;
cp.add(P(19,29,1.2,M(RD),0,-14.5,0),P(2.2,29.4,1.6,M(RE),-8.4,-14.5,0),P(2.2,29.4,1.6,M(RE),8.4,-14.5,0),P(19.6,1.6,1.8,M(GD),0,-29,0),P(19,1.6,1.8,M(GD),0,-1,0));
g.add(cp);trajeReg(cp,'flap',{b:.12,a:.06,ph:0});
/* espada nas costas */
const sw=new THREE.Group();sw.position.set(3,35,-9.4);sw.rotation.z=-.6;
sw.add(P(2.8,30,.9,M(SV),0,17,0),P(.8,26,1.1,M('#8fa0b8'),0,16,0),P(2,3,.8,M(SV),0,33.4,0),P(10,2.2,2.4,M(GE),0,0,0),P(2.4,6,2.4,M(RE),0,-4,0),P(3.6,3.6,3.6,M(GD),0,-8,0));g.add(sw);
/* ombreiras grandes com espinhos */
for(const sx of[-1,1])g.add(P(13.4,5,14.6,M(GD),sx*16.5,45.6,0),P(14.2,1.6,15.4,M(GE),sx*16.5,42.8,0),P(14,1.4,15,M(GH),sx*16.5,48.4,0),P(2.6,6,2.6,M(GH),sx*21,51,0),P(2.4,4,2.4,M(GH),sx*21.6,47.5,5.2),P(2.4,4,2.4,M(GH),sx*21.6,47.5,-5.2));
/* bracos e pernas com manoplas, cotoveleiras, joelheiras e botas */
[f.a1,f.a2].forEach(a=>a.add(P(11.6,7,12.2,M(GD),0,-5,0),P(12.4,3.4,13,M(GH),0,-9.4,0),P(11.8,8.2,12.4,M(GE),0,-15.6,0),P(12.2,1.6,12.8,M(GD),0,-19.6,0),P(10,2.8,11,M(GD),0,-21.6,0)));
for(const l of[f.l1,f.l2])l.add(P(11.8,8,12.4,M(GD),0,-6,.2),P(12.4,4,13.8,M(GH),0,-10.4,.9),P(11.8,6,12.6,M(GD),0,-14.6,.4),P(11.6,5,13.4,M(GE),0,-19.5,1),P(9,2.6,3,M(GE),0,-20.2,8.2));
/* brilhos dourados subindo */
for(let k=0;k<4;k++){const v=P(1.6,1.6,1.6,IM('#fff0a0',.6),(k%2?1:-1)*(12+k*1.5),30+k*5,k%2?5:-5);g.add(v);trajeReg(v,'rise',{y0:28+k*4,r:22,ph:k*.25})}}
/* skin Dragao Infernal: mascara de dragao, chifres, asas de membrana em chamas, cauda e garras */
function skinDragon(f,g,part,M,sk){const{IM,GL,P,R}=skinKit(f,part),
RD='#8c1a12',DR='#4a0c0a',BK='#170909',OR='#ff7a1a',YL='#ffd23b',BN='#eadcb8',SC='#e0782a';
/* cabeca de dragao: focinho, presas, olhos de fogo */
g.add(P(17.8,17.6,17.8,M(RD),0,52,0),P(18.4,3,18.4,M(DR),0,60.6,0),
R(7,1.6,2,M(DR),-4.4,55.9,9.4,0,0,-.35),R(7,1.6,2,M(DR),4.4,55.9,9.4,0,0,.35),
R(4,1.8,.6,GL(YL,1),-4.6,53.6,9.4,0,0,-.3),R(4,1.8,.6,GL(YL,1),4.6,53.6,9.4,0,0,.3),P(.8,1.8,.7,M(BK),-4.6,53.6,9.7),P(.8,1.8,.7,M(BK),4.6,53.6,9.7),
P(11,6.4,7,M(DR),0,48.4,11.6),P(1.2,1.2,.6,M(BK),-2.4,50,15.2),P(1.2,1.2,.6,M(BK),2.4,50,15.2),P(9.4,2.4,6.4,M(DR),0,43,11.4));
for(let k=0;k<4;k++)g.add(P(1.2,2.2,1,M(BN),-3.9+k*2.6,44.6,14.2));
/* chifres longos curvados para tras, espinhos de bochecha e nadadeiras */
for(const sx of[-1,1]){for(const[y,z,w,h]of[[61.4,3,3.8,5.4],[64.4,.5,3.4,5.2],[67.2,-3,3,5],[69.4,-7.2,2.6,4.6],[70.6,-11.6,2,4],[70.8,-15.4,1.4,3.6]])g.add(P(w,h,w,M(BN),sx*5.6,y,z));
g.add(P(2.6,2.6,6.4,M(BN),sx*9.8,49,-2),P(1.4,7,5.6,IM(OR,.75),sx*10.2,54.5,-6.5))}
/* espinhos nas costas */
g.add(P(2.4,4,3,M(DR),0,62.6,-5),P(2.4,4,3,M(DR),0,59,-9.4));
for(let k=0;k<4;k++)g.add(P(2.4,4,3.4,M(DR),0,41-k*4.2,-7.4));
/* torso: placa de barriga alaranjada com costelas e nucleo de brasa */
g.add(P(22.6,1.6,11.8,M(DR),0,43,0),P(15,16,1.2,M(SC),0,34.4,6.1),P(1.6,16,1.6,M(DR),0,34.4,6.5));
for(let k=0;k<5;k++)g.add(P(15.4,.9,1.5,M(DR),0,28.4+k*3.4,6.2));
g.add(P(4,4,1.2,GL(OR,1),0,39,7.1),P(23.2,3,12.6,M(BK),0,26.2,0),P(3.6,3.6,.8,GL(YL,1),0,26.2,6.5));
/* ombreiras com espinhos */
for(const sx of[-1,1])g.add(P(13,4,14,M(DR),sx*16.5,45.4,0),P(2.8,7,2.8,M(BN),sx*19.6,50.4,0),P(2.4,5,2.4,M(BN),sx*14,49.6,0),P(2.4,4,2.4,M(BN),sx*21.6,46.4,5));
/* bracos com garras, pernas com garras */
[f.a1,f.a2].forEach((a,i)=>{const sx=i?1:-1;a.add(P(11.4,9,12,M(DR),0,-7,0),P(11.8,2,12.4,M(BK),0,-12,0),P(11.8,7,12.4,M(RD),0,-16.4,0),P(5,2,2,M(BN),sx*7.4,-8,0),P(8,.8,.5,GL(OR,1),0,-9,6.2));
for(const xx of[-3.6,0,3.6])a.add(P(1.3,1.3,5,M(BN),xx,-21.6,7.2))});
for(const l of[f.l1,f.l2]){l.add(P(11.6,12,12.2,M(DR),0,-8,0),P(2.4,2.4,4,M(BN),0,-8,7.4),P(11.8,2,12.8,M(BK),0,-14.4,0),P(11,5.6,12.8,M(BK),0,-19.4,.8));
for(const xx of[-3.2,0,3.2])l.add(P(1.6,1.6,4.4,M(BN),xx,-20.6,7.8))}
/* asas de membrana em chamas com ossos e dedos */
const fb=(x0,y0,x1,y1,t,m)=>R(t,Math.hypot(x1-x0,y1-y0),t,m,(x0+x1)/2,(y0+y1)/2,0,0,0,Math.atan2(x1-x0,-(y1-y0)));
const bt=x=>x<11?-4+(x-4)*(-8/7):x<19?-12+(x-11)*(-2/8):-14+(x-19)*(4/7),tp=x=>x<=18?5:5-(x-18)*(15/8);
for(const sx of[-1,1]){const wg=new THREE.Group();wg.position.set(sx*5,42,-7.6);wg.rotation.y=sx*.5;
wg.add(P(19,2.2,2.2,M(DR),sx*9.5,6,0),P(2.6,2.6,2.6,M(BN),sx*19,6,0),fb(sx*18,6,sx*26,-10,1.8,M(DR)),fb(sx*18,6,sx*19,-14,1.8,M(DR)),fb(sx*18,6,sx*11,-12,1.8,M(DR)));
for(let x=4.8;x<26;x+=2.4){const t=tp(x),b=bt(x),h=t-b;if(h>.6)wg.add(P(2.5,h,.5,IM('#ff5a1a',.72),sx*x,(t+b)/2,0))}
g.add(wg);trajeReg(wg,'sway',{a:.2,ph:sx>0?0:Math.PI})}
/* cauda espinhosa */
const tl=new THREE.Group();tl.position.set(0,25,-6);
[[7,-1,-3,6],[5.8,-3,-8.5,6],[4.6,-4.6,-13.5,5.6],[3.4,-5.6,-18,5]].forEach(([w,y,z,d])=>tl.add(P(w,w,d,M(DR),0,y,z),P(1.6,2.4,2,M(BN),0,y+w/2+.8,z)));
tl.add(P(2,2,5,M(BN),0,-6,-22),P(2.4,2.4,2.4,GL(OR,1),0,-6,-24.6));g.add(tl);trajeReg(tl,'flap',{b:.15,a:.12,ph:0});
/* brasas subindo */
for(let k=0;k<6;k++){const v=P(1.8,1.8,1.8,IM('#ff8a2a',.5),(k%2?1:-1)*(9+k*1.2),24+k*3,(k%3-1)*7);g.add(v);trajeReg(v,'rise',{y0:24+k*3,r:30,ph:k*.17})}}
/* skin Astronauta Cosmico: traje branco, capacete de vidro (rosto visivel), mochila, painel luminoso e planetinhas */
function skinAstro(f,g,part,M,sk){const{IM,GL,P,R}=skinKit(f,part),
W='#f4f6fb',W2='#cdd3e1',W3='#aab3c8',OR='#ff7a1a',DK='#262b3a',BL='#2f6bff';
/* capacete: casco branco com vidro transparente na frente */
g.add(P(17.6,3,17.6,M(W2),0,43.2,0),P(22,4.2,22,M(W),0,61.8,0),P(2.8,15.6,22,M(W),-9.8,52,0),P(2.8,15.6,22,M(W),9.8,52,0),P(22,15.6,2.8,M(W),0,52,-9.8),
P(22,2.6,3,M(W),0,59.8,10),P(22,3.6,3,M(W),0,45.2,10),P(22.4,1.2,22.4,M(OR),0,57.8,0),
P(17.6,11.6,.7,IM('#7ad0ff',.3),0,52.4,11.4),R(1.6,9,.4,IM('#ffffff',.5),-5.4,53,11.9,0,0,.25),R(.9,5,.4,IM('#ffffff',.45),-2.8,52,11.9,0,0,.25),
P(.8,9,.8,M(DK),7,67,-6),P(2.2,2.2,2.2,GL('#ff3a3a',1),7,72,-6),P(3.2,3.2,3.2,M(DK),-11.8,58,5),P(2,2,.6,GL('#fff6c0',1),-11.8,58,6.9));
/* torso: painel de controle com botoes, conectores, cinto e mochila de oxigenio */
g.add(P(18,2,12.4,M(W2),0,42.2,0),P(12.6,8.4,1.4,M(DK),0,37.6,6.1),P(2,2,.6,GL('#ff4d4d',1),-3.5,39.2,6.9),P(2,2,.6,GL('#3dff8a',1),0,39.2,6.9),P(2,2,.6,GL('#4aa8ff',1),3.5,39.2,6.9),P(8,1.2,.6,GL('#7ad0ff',1),0,36,6.9),P(8,1,.6,GL(OR,1),0,34.4,6.9),
P(3,3,2.2,M(OR),-8,31,6.4),P(3,3,2.2,M(BL),8,31,6.4),P(23,2.8,12.2,M(DK),0,25.6,0),P(4.6,3.4,.9,M(OR),0,25.6,6.3),
P(16.6,19.6,7.4,M(W2),0,35,-9.2),P(16.8,1.4,7.6,M(OR),0,43.6,-9.2),P(4.2,14,4.2,M(W),-4.6,33.6,-14),P(4.2,14,4.2,M(W),4.6,33.6,-14),P(4.6,2,4.6,M(DK),-4.6,41,-14),P(4.6,2,4.6,M(DK),4.6,41,-14));
for(const sx of[-1,1])g.add(P(12.4,4.2,13.2,M(W2),sx*16.5,45.4,0),P(12.6,1.2,13.4,M(OR),sx*16.5,46.8,0));
[f.a1,f.a2].forEach(a=>a.add(P(11.4,2,12,M(DK),0,-9,0),P(11.4,1.4,12,M(OR),0,-5,0),P(11.8,2,12.4,M(W3),0,-13,0),P(12,7,12.6,M(W2),0,-17,0),P(10.6,3,11.2,M(W3),0,-21.2,0)));
for(const l of[f.l1,f.l2])l.add(P(11.4,2.4,12.2,M(DK),0,-9,0),P(11.6,1.2,12.2,M(OR),0,-5.4,0),P(11.8,2,12.4,M(W3),0,-14,0),P(11.8,6.6,13.8,M(W2),0,-18.6,1.1),P(12,1.6,14.2,M(DK),0,-21.4,1.1));
/* planetinhas orbitando e estrelas piscando */
const ob=new THREE.Group();ob.position.set(0,40,0);
[['#8ad0ff',0],['#ff9a3a',1.57],['#ff7ad9',3.14],['#ffffff',4.71]].forEach(([c,an],k)=>ob.add(P(2.4,2.4,2.4,GL(c),Math.cos(an)*21,-12+k*8,Math.sin(an)*21)));
g.add(ob);trajeReg(ob,'spin',{a:1.1});
for(let k=0;k<4;k++){const v=P(1.4,1.4,1.4,GL('#ffffff',1),(k%2?1:-1)*(12+k*2),58+k*3,(k-1.5)*5);g.add(v);trajeReg(v,'bob',{y0:58+k*3,a:1.5,ph:k})}}
/* skin Cyber Neon: jaqueta tecnologica com neon ciano e rosa, viseira luminosa, braco robotico e disco holografico */
function skinCyber(f,g,part,M,sk){const{IM,GL,P,R}=skinKit(f,part),
BK='#0e1122',B2='#1a1f38',B3='#2a3350',MT='#8c97b8',CY='#19f2ff',MG='#ff2bd6',PU='#8a4cff',HR='#e01fb8';
/* cabelo rosa neon espetado, viseira, mascara com respiros e fones */
g.add(P(17.4,3.4,17.4,M(HR),0,60.4,0),P(17.2,2.6,1.6,M(HR),0,58.6,8.6),P(17.4,11,2.8,M(HR),0,55,-8.8),P(2.2,7,9.4,M(HR),-8.8,56.5,-1.6),P(2.2,7,9.4,M(HR),8.8,56.5,-1.6),
R(3.2,6,3.2,M(MG),-5.4,64,.4,0,0,.25),P(3.2,7.4,3.2,M(MG),0,65.2,-1),R(3.2,6,3.2,M(MG),5.4,64,.8,0,0,-.25),P(3,4,3,M(MG),-2.6,63,-6),
P(17.6,.9,1.8,M(BK),0,55.7,8.6),P(17.6,.9,1.8,M(BK),0,51.3,8.6),P(.9,5.2,1.8,M(BK),-8.8,53.5,8.6),P(.9,5.2,1.8,M(BK),8.8,53.5,8.6),P(16.6,3.8,1,IM(CY,.55),0,53.5,8.9),P(14,.6,.5,GL(CY,1),0,53.5,9.5),
P(16.8,6,1.4,M(BK),0,47.4,8.6),P(14.4,.7,.4,GL(CY,1),0,49.8,9.4),
P(2.6,5,3,M(BK),-9.2,52,0),P(2.6,5,3,M(BK),9.2,52,0),P(2.8,1,3.2,GL(CY,1),-9.4,54.4,0),P(2.8,1,3.2,GL(CY,1),9.4,54.4,0));
for(let k=0;k<4;k++)g.add(P(.8,3.4,.4,GL(MG,1),-3.9+k*2.6,47,9.4));
/* gola alta, linhas de neon no peito e nas costas, cinto */
g.add(P(17,4,13.4,M(BK),0,43,0),P(17.2,.6,13.6,GL(MG),0,41.1,0),P(.8,13,.6,GL(CY),-5.6,35,6),P(.8,13,.6,GL(CY),5.6,35,6),P(11.4,.8,.6,GL(CY),0,41,6),R(4.4,4.4,.6,GL(MG,1),0,35,6.1,0,0,.785),
P(.8,18,.6,GL(CY),-10.6,33,5.9),P(.8,18,.6,GL(CY),10.6,33,5.9),P(.8,16,.6,GL(CY),0,34,-5.9),
P(23.2,3.2,12.6,M(B2),0,25.8,0),P(4.4,2.2,.6,GL(CY),0,25.8,6.5),P(23.4,.6,12.8,GL(MG),0,27.6,0));
/* disco holografico girando nas costas */
const hd=new THREE.Group();hd.position.set(0,54,-13);for(let k=0;k<12;k++){const an=k/12*6.2832;hd.add(R(3.2,1,.8,GL(k%2?CY:MG),Math.cos(an)*12,Math.sin(an)*12,0,0,0,an+1.5708))}
g.add(hd);trajeReg(hd,'spin',{a:1.2});
/* ombreiras com LED */
for(const sx of[-1,1])g.add(P(12.4,3.6,13.4,M(B3),sx*16.5,45.4,0),P(12.6,.7,13.6,GL(sx>0?MG:CY),sx*16.5,47.4,0),P(2.4,5,2.4,M(B2),sx*20.6,48.6,0));
/* braco esquerdo robotico (metal + luz) e braco direito com dispositivo no pulso */
f.a1.add(P(11.8,6,12.2,M(MT),0,-5,0),P(12,1,12.4,GL(CY),0,-8.6,0),P(11.4,5,11.8,M(B3),0,-12,0),P(.8,9,.5,GL(CY),-3.4,-12,6.1),P(.8,9,.5,GL(CY),0,-12,6.1),P(.8,9,.5,GL(CY),3.4,-12,6.1),
P(11.8,7,12.4,M('#59627f'),0,-17.6,0),P(8,.8,.5,GL(CY),0,-20,6.3),P(10,3,11,M(MT),0,-21.6,0));
f.a2.add(P(11.2,2,11.8,M(B2),0,-11,0),P(7,4,1.2,M(B3),0,-7,6.2),P(5,2,.5,GL(CY,1),0,-7,6.9),P(11.8,8,12.4,M(BK),0,-17,0),P(11.9,.8,12.5,GL(MG),0,-13.6,0),P(10,3,11,M(BK),0,-21.4,0));
/* pernas: joelheiras, faixa de neon, botas com sola rosa */
[f.l1,f.l2].forEach((l,i)=>{const sx=i?1:-1;l.add(P(11.8,4,12.8,M(B3),0,-6,.4),P(.8,12,.6,GL(CY),sx*3.8,-13,6.2),P(11.4,6,13,M(BK),0,-18.8,.9),P(11.8,1.2,13.4,GL(MG),0,-21.6,.9),P(9,1,.6,GL(CY),0,-17.6,7.5))});
/* pixels de dados caindo */
for(let k=0;k<6;k++){const v=P(1.4,1.4,1.4,IM(k%2?CY:MG,.6),(k%2?1:-1)*(13+k),50,(k%3-1)*6);g.add(v);trajeReg(v,'fall',{y0:55,r:30,ph:k*.17})}}
/* skin Oni de Sangue: samurai de sangue com mascara Oni (so a metade de baixo do rosto), chifres, capa rasgada e nevasca */
function skinOni(f,g,part,M,sk){const ICE='#f42e2e',ICL='#f65252',BK='#0d0c0b',BN='#ede6d6',CY='#ee0d0d',HR='#f65959',
IM=(c,o)=>{const m=mat(c,{transparent:true,opacity:o==null?.8:o});f.ms.push(m);return m},
GL=(c,pu)=>{const m=new THREE.MeshBasicMaterial({color:c,transparent:true,opacity:1});if(pu)trajeReg(m,'pulse',{ph:Math.random()*6});return m};
const P=(w,h,d,m,x,y,z)=>part(w,h,d,m,x,y,z);
/* cabeca: mascara so na metade de baixo, o rosto original fica de fora */
g.add(P(16.6,8,1.2,M(BN),0,48,8.5),P(16.8,.9,1.5,GL(CY),0,52.2,8.6),P(10,.9,.4,M('#2a2a34'),0,46.4,9.2),P(1.6,2.6,.6,M('#ffffff'),-3.4,45.6,9.3),P(1.6,2.6,.6,M('#ffffff'),3.4,45.6,9.3),P(1.4,3.4,1,M('#ffffff'),-6.6,46.4,9),P(1.4,3.4,1,M('#ffffff'),6.6,46.4,9),
P(.6,1.8,2.4,GL(CY,1),-8.3,54,5),P(.6,1.8,2.4,GL(CY,1),8.3,54,5));
/* cabelo vermelho-sangue longo com pontas pingando */
g.add(P(17,1.4,15,M(HR),0,60.2,-1),P(17.6,24,3,M(HR),0,48,-8.8),P(2,16,10,M(HR),-8.9,52,-3),P(2,16,10,M(HR),8.9,52,-3),P(3.2,4,2.4,IM(ICE,.9),-6,35,-9.2),P(2.6,6,2.4,IM(ICE,.9),0,33.5,-9.2),P(3.2,4,2.4,IM(ICE,.9),6,35,-9.2),
P(2.4,2.4,.8,GL('#ffffff'),-9.7,57,1),P(2.4,2.4,.8,GL('#ffffff'),9.7,55,-2),P(2,2,.8,GL('#ffffff'),-5,60.9,-6),P(2,2,.8,GL('#ffffff'),6,60.9,-4));
/* chifres longos de gelo curvados para tras */
for(const sx of[-1,1])for(const [y,z,w,h] of[[60.5,.5,3.8,5],[63.5,-1.8,3.4,5],[66.4,-4.8,3,4.6],[68.9,-8.6,2.6,4.4],[70.6,-12.6,2,4],[71.6,-16.2,1.4,3.6]])g.add(P(w,h,w,IM(ICE,.85),sx*5.4,y,z));
/* torso: armadura de gelo translucida sobre placas pretas */
g.add(P(22.4,1.6,11.8,M('#262633'),0,38,0),P(22.4,1.6,11.8,M('#262633'),0,31,0),P(19,14,1.4,IM(ICE,.5),0,36,6.4),P(1.6,14,12.6,IM(ICE,.5),-10.8,36,0),P(1.6,14,12.6,IM(ICE,.5),10.8,36,0),P(20,16,1.4,IM(ICE,.5),0,36,-6.4),
P(6.4,9,2.4,GL(CY,1),0,37,7.5),P(2.6,5,2,IM(ICL,.9),-5.8,33,7.3),P(2.6,5,2,IM(ICL,.9),5.8,34,7.3),P(24,3,12.6,M(BK),0,43.4,0));
/* ombreiras pontudas com estalactites */
for(const sx of[-1,1])g.add(P(12.4,3.4,13,IM(ICE,.85),sx*16.5,45.6,0),P(3.6,7,3.6,IM(ICE,.9),sx*19,50,0),P(2.6,5,2.6,IM(ICE,.9),sx*14,49,0),P(1.4,4.5,1.4,IM(ICL,.9),sx*22.4,41.5,3),P(1.4,3.6,1.4,IM(ICL,.9),sx*22.4,41,-3),P(1.4,4,1.4,IM(ICL,.9),sx*13.6,42,5.2));
/* cinto de couro com sinos de gelo e leque fechado */
g.add(P(23.2,3.2,12.6,M(BK),0,26.5,0),P(5,3.6,.8,IM(ICE,.95),0,26.5,6.5),P(2.4,2.8,2.4,IM(ICL,.95),-8.4,23.8,6.6),P(2.4,2.8,2.4,IM(ICL,.95),-4.2,23.6,6.6),P(2.4,2.8,2.4,IM(ICL,.95),4.2,23.6,6.6),P(2.4,2.8,2.4,IM(ICL,.95),8.4,23.8,6.6),
P(2.2,3,3,M(BK),-12.4,27,1),P(1.6,13,3.2,IM(ICL,.9),-12.8,19.5,1),P(1.8,2,3.4,IM(ICE,.95),-12.8,12.8,1));
/* bracos: faixas pretas, manoplas com garras, tatuagem de floco, correntes soltas */
[f.a1,f.a2].forEach((a,i)=>{const sx=i?1:-1;a.add(P(11.2,2,11.8,M('#262633'),0,-3,0),P(11.2,2,11.8,M('#262633'),0,-7,0),P(11.2,2,11.8,M('#262633'),0,-11,0),P(11.8,8,12.4,IM(ICE,.85),0,-17,0),P(5,1,.9,GL(CY,1),0,-8.5,6.1),P(1,5,.9,GL(CY,1),0,-8.5,6.1),P(3.4,1,.9,GL(CY,1),0,-8.5,6.1));
for(const xx of[-3.6,0,3.6])a.add(P(1.3,1.3,4.6,IM(ICL,.95),xx,-21.6,7.4));
const ch=new THREE.Group();ch.position.set(sx*6.2,-1,0);for(let k=0;k<6;k++)ch.add(P(1.6,1.6,1.6,IM(ICL,.95),0,-3.4*k,k%2?.9:-.9));a.add(ch);trajeReg(ch,'sway',{a:.22,ph:i*1.7})});
/* pernas: hakama preta, joelheiras pontudas, botas com sola de gelo */
for(const l of[f.l1,f.l2])l.add(P(11.6,13,12,M('#100f0f'),0,-8,0),P(12,6,12.8,IM(ICE,.8),0,-11,.6),P(3.2,4,3.2,IM(ICE,.95),0,-11,7.4),P(11,5,12.6,M(BK),0,-18.5,.8),P(11.8,1.6,13.4,IM(ICE,.95),0,-21.2,.8));
g.add(P(24,.5,34,IM('#f54949',.35),0,.9,-8));
/* capa curta rasgada de tecido branco com bordas congeladas */
const cg=new THREE.Group();cg.position.set(0,43,-7.4);cg.rotation.x=.16;
for(const [x,cy,w,h] of[[-7.4,-11,7,22],[0,-12.5,7.4,25],[7.4,-10.5,7,21]])cg.add(P(w,h,1.4,M('#f76666'),x,cy,0),P(w+.4,2.2,1.8,IM(ICE,.85),x,cy-h/2+1,0));
cg.add(P(22,2.4,2,M('#e76d6d'),0,-1,0));g.add(cg);trajeReg(cg,'flap',{b:.16,a:.06,ph:0});
/* gotas de sangue ao redor e vapor rubro */
const sn=new THREE.Group();sn.position.set(0,40,0);for(let k=0;k<10;k++){const an=k/10*6.2832,r=17+(k%3)*3;sn.add(P(1.4,1.4,1.4,GL('#e5192b'),Math.cos(an)*r,-14+(k*3.1)%30,Math.sin(an)*r))}g.add(sn);trajeReg(sn,'spin',{a:.9});
for(let k=0;k<4;k++){const v=P(3,3,3,IM('#f76161',.4),(k%2?1:-1)*(7+k),56,6);g.add(v);trajeReg(v,'rise',{y0:50+k*2,r:16,ph:k*.27})}}
var dgp=[],evp=[],czq=[],icp=[],igp=[];
function mkCzZone(){const g=new THREE.Group(),bm=(c,o)=>new THREE.MeshBasicMaterial({color:c,transparent:true,opacity:o,depthWrite:false,side:THREE.DoubleSide});const d=new THREE.Mesh(new THREE.CircleGeometry(1,20),bm('#ffba7d',.2));d.rotation.x=-Math.PI/2;const r=new THREE.Mesh(new THREE.RingGeometry(.94,1,28),bm('#ffffff',.9));r.rotation.x=-Math.PI/2;r.position.y=.5;const dm=new THREE.Mesh(new THREE.SphereGeometry(1,12,5,0,6.2832,0,1.5708),bm('#ffba7d',.1));g.add(d,r,dm);g.userData={d,dm};return g}
function mkEvZone(){const g=new THREE.Group(),bm=(c,o)=>new THREE.MeshBasicMaterial({color:c,transparent:true,opacity:o,depthWrite:false,side:THREE.DoubleSide});const d=new THREE.Mesh(new THREE.CircleGeometry(1,20),bm('#7dffb0',.2));d.rotation.x=-Math.PI/2;const r=new THREE.Mesh(new THREE.RingGeometry(.94,1,28),bm('#ffffff',.9));r.rotation.x=-Math.PI/2;r.position.y=.5;const cr=new THREE.Group();cr.position.y=1;const c1=new THREE.Mesh(BG,bm('#ffffff',.7)),c2=new THREE.Mesh(BG,bm('#ffffff',.7));c1.scale.set(.5,1.2,.14);c2.scale.set(.14,1.2,.5);cr.add(c1,c2);g.add(d,r,cr);g.userData={d,cr};return g}
function mkDog(){const g=new THREE.Group(),b=new THREE.Group(),P=(w,h,d,c,x,y,z)=>{const o=new THREE.Mesh(BG,mc(c));o.scale.set(w,h,d);o.position.set(x,y,z);return o};g.add(b);b.scale.set(1.5,1.5,1.5);
b.add(P(9,8,19,'#aab3c0',0,12,0),P(7,2,14,'#7d8794',0,16.8,-1),P(8,7,8,'#8d97a4',0,15.5,12),P(5,3.4,4,'#59616d',0,14,17),P(1.8,1.8,1,'#ff3b3b',-2.4,17,16.2),P(1.8,1.8,1,'#ff3b3b',2.4,17,16.2),P(1.4,6,1.4,'#6b7280',-3,21,10),P(1.4,6,1.4,'#6b7280',3,21,10),P(5,5,5,'#ff8a1f',0,19.5,-4),P(2,5,2,'#444444',0,23.5,-4));
const lg=[];for(const [x,z] of [[-3.5,7],[3.5,7],[-3.5,-7],[3.5,-7]]){const l=new THREE.Group();l.position.set(x,9,z);l.add(P(2.6,9,2.6,'#444444',0,-4.5,0),P(3.2,1.6,4,'#222222',0,-9,.6));b.add(l);lg.push(l)}
const tl=new THREE.Group();tl.position.set(0,14,-10);tl.add(P(1.6,1.6,7,'#c9ced8',0,2,-3.2));b.add(tl);g.userData={lg,tl};return g}
function build3(g){if(gw)sc.remove(gw);gw=new THREE.Group();sc.add(gw);spl=[];bp=[];fp=[];bh=[];hp=[];dgp=[];evp=[];icp=[];igp=[];
const inst=(a,c,h,cf)=>{const m=new THREE.InstancedMesh(BG,mat(cf?'#ffffff':c,{side:THREE.DoubleSide}),a.length),o=new THREE.Object3D(),cc=new THREE.Color();a.forEach((q,i)=>{o.position.set(q.x+q.w/2,h/2+.5,q.y+q.h/2);o.scale.set(q.w,h,q.h);o.updateMatrix();m.setMatrixAt(i,o.matrix);if(cf){cc.set(cf(q));m.setColorAt(i,cc)}});m.frustumCulled=false;gw.add(m)};
inst(g.floors,'#9b6b43',3,q=>q.c);inst(g.walls.filter(w=>!w.rk&&!w.tr),'#e0cfa8',WH,q=>q.hc);{const rk=g.walls.filter(w=>w.rk),o=new THREE.Object3D(),cc=new THREE.Color(),m=new THREE.InstancedMesh(flat(new THREE.DodecahedronGeometry(1,0)),mat('#ffffff'),rk.length);rk.forEach((q,i)=>{o.position.set(q.x+q.w/2,18,q.y+q.h/2);o.rotation.set(rr(-.15,.15),rr(0,6.28),rr(-.15,.15));o.scale.set(q.w*.56,30,q.h*.56);o.updateMatrix();m.setMatrixAt(i,o.matrix);cc.setHSL(.6,.06,rr(.4,.58));m.setColorAt(i,cc)});m.frustumCulled=false;gw.add(m)}
{const bb=g.bushes,o=new THREE.Object3D(),cc=new THREE.Color(),m=new THREE.InstancedMesh(flat(new THREE.IcosahedronGeometry(1,1)),mat('#ffffff'),bb.length);bb.forEach((b,i)=>{const z=rr(.92,1.15);o.position.set(b.x+T/2,16,b.y+T/2);o.rotation.set(0,rr(0,6.28),0);o.scale.set(31*z,19*z,31*z);o.updateMatrix();m.setMatrixAt(i,o.matrix);cc.setHSL(.3+rr(-.02,.05),.58,rr(.24,.36));m.setColorAt(i,cc)});m.frustumCulled=false;gw.add(m)}
{const n=Math.round(1800*(S/12000)*(S/12000)*1.2),o=new THREE.Object3D(),cc=new THREE.Color(),PCL=['#ffffff','#ffe14d','#ff8fb8','#ff6b6b','#b69cff','#ffbb7f'],m=new THREE.InstancedMesh(new THREE.OctahedronGeometry(1,0),mat('#ffffff'),n);for(let i=0;i<n;i++){o.position.set(rr(60,S-60),3,rr(60,S-60));o.rotation.set(0,rr(0,6),0);o.scale.set(3,2.4,3);o.updateMatrix();m.setMatrixAt(i,o.matrix);cc.set(PCL[i%6]);m.setColorAt(i,cc)}m.frustumCulled=false;gw.add(m)}
{const n=Math.round(220*(S/12000)*(S/12000)*1.3),o=new THREE.Object3D(),cc=new THREE.Color(),cg=new THREE.CircleGeometry(1,16);cg.rotateX(-1.5708);const m=new THREE.InstancedMesh(cg,new THREE.MeshBasicMaterial({color:'#ffffff',transparent:true,opacity:.22,depthWrite:false,polygonOffset:true,polygonOffsetFactor:-2,polygonOffsetUnits:-2}),n);for(let i=0;i<n;i++){const r=rr(110,420);o.position.set(rr(0,S),.4,rr(0,S));o.scale.set(r,1,r*rr(.6,1));o.rotation.set(0,rr(0,3),0);o.updateMatrix();m.setMatrixAt(i,o.matrix);cc.set(i%2?'#2f8a4c':'#a6dd78');m.setColorAt(i,cc)}m.frustumCulled=false;gw.add(m)}
const dm=mat('#c9b283'),rm0=mat('#b79f70'),rm1=mat('#8c7650');
for(const t of g.towns){const m=new THREE.Mesh(new THREE.CircleGeometry(620,32),dm);m.rotation.x=-1.5708;m.position.set(t.x,.6,t.y);gw.add(m);const rg2=new THREE.Mesh(new THREE.RingGeometry(596,628,56),rm1);rg2.rotation.x=-1.5708;rg2.position.set(t.x,.7,t.y);gw.add(rg2)}
for(const r of g.roads){const dx=r.b.x-r.a.x,dz=r.b.y-r.a.y,L=Math.hypot(dx,dz),m=new THREE.Mesh(BG,rm0);m.scale.set(L,.4,100);m.position.set((r.a.x+r.b.x)/2,.8,(r.a.y+r.b.y)/2);m.rotation.y=-Math.atan2(dz,dx);gw.add(m);const ed=new THREE.Mesh(BG,rm1);ed.scale.set(L,.4,132);ed.position.set(m.position.x,.7,m.position.z);ed.rotation.y=m.rotation.y;gw.add(ed)}
{const all=g.trees,pn=all.filter((_,i)=>i%3!=0),rd=all.filter((_,i)=>i%3==0),o=new THREE.Object3D(),cc=new THREE.Color(),tr=new THREE.InstancedMesh(new THREE.CylinderGeometry(1,1.3,1,6),mat('#5e3f24'),all.length),lp=new THREE.InstancedMesh(flat(new THREE.ConeGeometry(1,1,8)),mat('#ffffff'),pn.length*3),lr=new THREE.InstancedMesh(flat(new THREE.IcosahedronGeometry(1,1)),mat('#ffffff'),rd.length*3);
all.forEach((q,i)=>{const s=q.s;o.rotation.set(0,0,0);o.position.set(q.x,28*s,q.y);o.scale.set(7*s,56*s,7*s);o.updateMatrix();tr.setMatrixAt(i,o.matrix)});
pn.forEach((q,i)=>{const s=q.s,L=[[62,40,64],[92,31,56],[120,21,46]];cc.setHSL(.37+rr(-.02,.03),.5,.2+rr(0,.09));L.forEach((l,k)=>{o.rotation.set(0,rr(0,6),0);o.position.set(q.x,l[0]*s,q.y);o.scale.set(l[1]*s,l[2]*s,l[1]*s);o.updateMatrix();lp.setMatrixAt(i*3+k,o.matrix);lp.setColorAt(i*3+k,cc)})});
rd.forEach((q,i)=>{const s=q.s,L=[[0,90,0,34],[15,76,7,24],[-13,80,-8,25]];if(R()<.14)cc.setHSL(.07+rr(0,.05),.75,.5);else cc.setHSL(.27+rr(0,.06),.6,.34+rr(0,.08));L.forEach((l,k)=>{o.rotation.set(0,rr(0,6),0);o.position.set(q.x+l[0]*s,l[1]*s,q.y+l[2]*s);o.scale.set(l[3]*s,l[3]*.85*s,l[3]*s);o.updateMatrix();lr.setMatrixAt(i*3+k,o.matrix);lr.setColorAt(i*3+k,cc)})});
tr.frustumCulled=lp.frustumCulled=lr.frustumCulled=false;gw.add(tr,lp,lr)}
const CG=new THREE.ConeGeometry(1,1,4,1);CG.rotateY(Math.PI/4);const sm=mat('#5a4636');
for(const h of g.houses){const rg=new THREE.Group(),w=h.w+36,d=h.h+36;
const sl=new THREE.Mesh(BG,sm);sl.scale.set(w,8,d);sl.position.y=WH+4;rg.add(sl);
const cn=new THREE.Mesh(CG,mat(h.rc,{side:THREE.DoubleSide}));cn.scale.set(w*.707,RH,d*.707);cn.position.y=WH+8+RH/2;rg.add(cn);const chm=new THREE.Mesh(BG,mat('#8a6350'));chm.scale.set(26,64,26);chm.position.set(w*.2,WH+RH*.62,-d*.12);rg.add(chm);const cht=new THREE.Mesh(BG,mat('#3b2b24'));cht.scale.set(32,6,32);cht.position.set(w*.2,WH+RH*.62+34,-d*.12);rg.add(cht);
rg.position.set(h.x+h.w/2,0,h.y+h.h/2);gw.add(rg);h.rm=rg}

{const HW=[],HG=[],HF=[],HS=[],HT=[],HD=[],HK=[],HL=[],HC=[];
const ad=(a,x,y,z,sx,sy,sz,c)=>a.push({x,y,z,sx,sy,sz,c});
for(const h of g.houses){
const ws=g.walls.filter(q=>!q.rk&&!q.tr&&q.x<h.x+h.w+6&&q.x+q.w>h.x-6&&q.y<h.y+h.h+6&&q.y+q.h>h.y-6);
const wl=(px,py)=>ws.some(q=>px>=q.x&&px<=q.x+q.w&&py>=q.y&&py<=q.y+q.h);
const cx=h.x+h.w/2,cz=h.y+h.h/2,sc=h.rc;
// fundação de pedra e cornija
ad(HT,cx,6,h.y+10,h.w+6,12,26,'#8d8478');ad(HT,cx,6,h.y+h.h-10,h.w+6,12,26,'#8d8478');ad(HT,h.x+10,6,cz,26,12,h.h+6,'#8d8478');ad(HT,h.x+h.w-10,6,cz,26,12,h.h+6,'#8d8478');
ad(HC,cx,WH-3,h.y+10,h.w+8,7,28,'#f3ead6');ad(HC,cx,WH-3,h.y+h.h-10,h.w+8,7,28,'#f3ead6');ad(HC,h.x+10,WH-3,cz,28,7,h.h+8,'#f3ead6');ad(HC,h.x+h.w-10,WH-3,cz,28,7,h.h+8,'#f3ead6');
// lados: [horizontal?, coordenada fixa da face externa, sentido p/ fora, inicio, comprimento]
const sides=[[1,h.y,-1,h.x,h.w],[1,h.y+h.h,1,h.x,h.w],[0,h.x,-1,h.y,h.h],[0,h.x+h.w,1,h.y,h.h]];
for(const[hz,fx,dir,st,L]of sides){
const P=(u,off)=>hz?[st+u,fx+dir*off]:[fx+dir*off,st+u],inn=(u)=>{const q=P(u,-10);return wl(q[0],q[1])};
// portas: trechos sem parede
let gs=-1;const gaps=[];for(let u=14;u<=L-14;u+=6){const o=!inn(u);if(o&&gs<0)gs=u;if(!o&&gs>=0){gaps.push([gs,u]);gs=-1}}
const dz=[];for(const[a,b]of gaps){const len=b-a;if(len>60&&len<170){const c=(a+b)/2;dz.push(c);
const put=(arr,u,y,off,al,hh,th,col)=>{const q=P(u,off);hz?ad(arr,q[0],y,q[1],al,hh,th,col):ad(arr,q[0],y,q[1],th,hh,al,col)};
put(HD,a-4,46,0,10,92,28,'#6b4a2f');put(HD,b+4,46,0,10,92,28,'#6b4a2f');put(HD,c,90,0,len+20,12,28,'#6b4a2f');
put(HS,c,2,dir*0+0,len+30,4,0,'#b9b2a4');const q=P(c,dir*17);hz?ad(HS,q[0],2,q[1],len+30,4,36,'#b9b2a4'):ad(HS,q[0],2,q[1],36,4,len+30,'#b9b2a4');
const ql=P(b+16,4);ad(HL,ql[0],68,ql[1],8,11,8,'#ffd36b')}}
// janelas
for(let u=64;u<=L-64;u+=78){if(dz.some(c=>Math.abs(c-u)<86))continue;if(!(inn(u-24)&&inn(u)&&inn(u+24)))continue;
const put=(arr,uu,y,off,al,hh,th,col)=>{const q=P(uu,off*dir);hz?ad(arr,q[0],y,q[1],al,hh,th,col):ad(arr,q[0],y,q[1],th,hh,al,col)};
put(HF,u,62,0.5,40,44,1.4,'#f7f3ea');put(HG,u,62,1.3,30,34,1.4,'#ffc48f');put(HF,u,62,1.6,3,34,1.4,'#f7f3ea');put(HF,u,62,1.7,30,3,1.4,'#f7f3ea');
put(HF,u,41,3,46,4,7,'#e8dfcc');put(HK,u-24,62,1.6,10,44,1.6,sc);put(HK,u+24,62,1.6,10,44,1.6,sc)}}
}
const bi=(a,c,em)=>{if(!a.length)return;const m=new THREE.InstancedMesh(BG,mat('#ffffff',em?{emissive:em}:{}),a.length),o=new THREE.Object3D(),cc=new THREE.Color();a.forEach((q,i)=>{o.position.set(q.x,q.y,q.z);o.scale.set(q.sx,q.sy,q.sz);o.updateMatrix();m.setMatrixAt(i,o.matrix);cc.set(q.c);m.setColorAt(i,cc)});m.frustumCulled=false;gw.add(m)};
bi(HT);bi(HC);bi(HD);bi(HS);bi(HF);bi(HG,'#1d4d6e');bi(HK);bi(HL,'#ffb300')}
for(const f of g.f){f.mesh=mkMesh(f);f.ry=null;gw.add(f.mesh)}}
function drawAD(g){for(const a of g.ad){if(!a.m){const m=new THREE.Group(),bx=new THREE.Mesh(BG,mat('#ffcf2e'));bx.scale.set(46,36,46);bx.position.y=18;m.add(bx);const st=new THREE.Mesh(BG,mat('#8a4b00'));st.scale.set(48,8,48);st.position.y=18;m.add(st);
const pc=new THREE.Mesh(new THREE.SphereGeometry(70,14,8,0,6.2832,0,1.5708),new THREE.MeshLambertMaterial({color:'#ff5a5a',side:THREE.DoubleSide}));pc.position.y=130;m.add(pc);
const bm=new THREE.Mesh(new THREE.CylinderGeometry(6,6,2400,8,1,true),new THREE.MeshBasicMaterial({color:'#ffd93b',transparent:true,opacity:.35,depthWrite:false,fog:false}));bm.position.y=1200;m.add(bm);a.m=m;a.pc=pc;a.bm=bm;gw.add(m)}
a.m.position.set(a.x,a.h,a.y);a.m.rotation.y=g.t*.3;a.pc.visible=!a.st;a.bm.visible=!!a.st&&!!a.has}}
function itTex(q){const k=q.t=='w'?'w'+q.id:q.t=='a'?'a'+q.k:q.t=='s'?'s'+q.k:q.t;if(IT[k])return IT[k];const c=document.createElement('canvas');c.width=c.height=64;const x=c.getContext('2d');x.translate(32,32);if(q.t=='w'){x.fillStyle=TCOL[q.id]+'66';x.beginPath();x.arc(0,0,30,0,7);x.fill();drawW(x,q.id,34)}else if(q.t=='c'){x.fillStyle='#b86e00';x.beginPath();x.arc(0,0,22,0,7);x.fill();x.fillStyle='#ffc400';x.beginPath();x.arc(0,0,18,0,7);x.fill();x.fillStyle='#fff3a0';x.beginPath();x.arc(-6,-6,6,0,7);x.fill();x.fillStyle='#b86e00';x.font='900 22px Arial';x.textAlign='center';x.textBaseline='middle';x.fillText('$',0,2)}else if(q.t=='s'){const C=['#ff6b6b','#ff944d','#c07bff','#ffb43b'][q.k];x.fillStyle=C+'88';x.beginPath();x.arc(0,0,30,0,7);x.fill();x.strokeStyle='#fff';x.lineWidth=4;x.beginPath();x.arc(0,0,17,0,7);x.stroke();x.lineWidth=2.5;x.beginPath();x.moveTo(-26,0);x.lineTo(-8,0);x.moveTo(8,0);x.lineTo(26,0);x.moveTo(0,-26);x.lineTo(0,-8);x.moveTo(0,8);x.lineTo(0,26);x.stroke();x.fillStyle='#fff';x.font='900 15px Arial';x.textAlign='center';x.textBaseline='middle';x.fillText(['\u2022','2x','4x','SN'][q.k],0,1)}else icon(x,q.t,0,0,20,q.t=='a'?AKC[q.k]:0);return IT[k]=new THREE.SpriteMaterial({map:new THREE.CanvasTexture(c)})}
function draw3d(){const g=G,p=g.p,pl=g.pl,Z=g.Z,dt=gdt,RV=g.room&&!fc.w,c=RV?Object.assign(Object.create(cfo()),{x:fc.x,y:fc.y}):cfo();if(!gw)return;fr++;
for(const q of g.items){if(Math.abs(q.x-c.x)>QV||Math.abs(q.y-c.y)>QV)continue;if(!q.sp){q.sp=new THREE.Sprite(itTex(q));q.sp.scale.set(30,30,1);gw.add(q.sp);spl.push(q)}q.sp.position.set(q.x,24+Math.sin(g.t*3+q.x)*3,q.y);q.seen=fr}
for(let i=spl.length-1;i>=0;i--){const q=spl[i];if(q.seen!=fr){gw.remove(q.sp);q.sp=null;spl.splice(i,1)}}
const FPc=RV?null:FPV(),inHs=!RV&&c.st=='ground'&&g.houses.some(h=>c.x>h.x-4&&c.x<h.x+h.w+4&&c.y>h.y-4&&c.y<h.y+h.h+4),pa=!RV&&c.st=='plane',pf=!RV&&c.st=='fall',tx0=pa?pl.x:c.x,tz=pa?pl.y:c.y,ty=pa?BH:pf?altF(c.ft/FT0)+40:c.jh*.5+40,dd0=pa?560:pf?260:FPc?4:(ads||SA())?105:150,dd=(cdist+=(dd0-cdist)*.2);
const dx=Math.cos(cyaw),dz=Math.sin(cyaw),cp=Math.cos(.27),sp=Math.sin(.27),sh=0;shk*=.88;
let ce=cdist;const el=(cpit-.25)+(FPc?0:.12),cel=Math.cos(el),sel=Math.sin(el);
if(!pa&&!pf)csh+=((camHit(tx0-dz*sh,tz+dx*sh,10)?0:1)-csh)*.2;else csh=1;
const sh2=sh*csh;camSh=sh2;
if(!pa&&!pf){const hx=tx0-dz*sh2,hz=tz+dx*sh2,px=-dz,pz=dx;let lim=cdist;for(let s=12;s<=cdist;s+=6){const bx=hx-dx*cel*s,bz=hz-dz*cel*s;if(camHit(bx,bz,8)||camHit(bx+px*8,bz+pz*8,5)||camHit(bx-px*8,bz-pz*8,5)){lim=Math.max(28,s-14);break}}ccl=lim<ccl?ccl+(lim-ccl)*.5:ccl+(lim-ccl)*.1;ce=Math.max(FPc?2:28,Math.min(cdist,ccl))}else ccl=cdist;
if(pa||pf){cam3.position.set(tx0-dx*cp*ce+rr(-shk,shk)*.5,ty+30+sp*ce+rr(-shk,shk)*.5,tz-dz*cp*ce);cam3.lookAt(tx0+dx*100,ty+10+(.25-cpit)*260,tz+dz*100)}
else{cam3.position.set(tx0-dz*sh2-dx*cel*ce+rr(-shk,shk)*.5,Math.max(10,FPc?(FPc.jh||0)+46:ty+36+sel*ce)+rr(-shk,shk)*.5,tz+dx*sh2-dz*cel*ce);aimTan=-Math.tan(cpit-.25);cam3.lookAt(cam3.position.x+dx*cel*300,cam3.position.y-sel*300,cam3.position.z+dz*cel*300);camAimD=ce}if(RV){const cd=Math.cos(cpit);cam3.position.set(fc.x,fc.h,fc.y);cam3.lookAt(fc.x+dx*cd*100,fc.h-Math.sin(cpit)*100,fc.y+dz*cd*100)}
{const so_=cfo(),tf=((ads&&so_===p)||SA())?sgFov(so_):65;if(Math.abs(cam3.fov-tf)>.1){cam3.fov+=(tf-cam3.fov)*.25;cam3.updateProjectionMatrix()}}bus.visible=pl.t<1.05;bus.position.set(pl.x,BH+Math.sin(g.t*1.6)*7,pl.y);bus.rotation.y=Math.PI/2-pl.ang;bus.rotation.z=Math.sin(g.t*1.2)*.045;{const u=bus.userData;u.prop.rotation.z=g.t*38;for(let i=0;i<u.fl.length;i++)u.fl[i].scale.y=.75+.35*Math.sin(g.t*45+i*1.7);u.cl.visible=pa||pf}
{const gx=c.st=='ground',cxp=cam3.position.x,czp=cam3.position.z;for(const h of g.houses){if(!h.rm)continue;if(RV){h.rm.visible=false;continue}const a=gx&&c.x>h.x-6&&c.x<h.x+h.w+6&&c.y>h.y-6&&c.y<h.y+h.h+6,b=gx&&cxp>h.x-20&&cxp<h.x+h.w+20&&czp>h.y-20&&czp<h.y+h.h+20&&cam3.position.y<WH+40;if(a||b)h.rh=.4;else h.rh=Math.max(0,(h.rh||0)-dt);h.rm.visible=!(a||b||h.rh>0)}}
zc.position.set(Z.cx,0,Z.cy);zc.scale.set(Z.r,1,Z.r);zn.visible=!!Z.nx;if(Z.nx){zn.position.set(Z.nx.cx,3,Z.nx.cy);zn.scale.set(Z.nx.r,1,Z.nx.r)}
for(const f of g.f){const m=f.mesh;if(f.dead||f.st=='plane'||(f.bush&&f.tm!=c.tm&&f.rev<=0&&dst(f,c)>140)||(f!==c&&dst(f,c)>QV)||(f.invis>0&&f.tm!=c.tm&&!RV)){m.visible=false;continue}m.visible=true;
if(f===c&&!RV&&c.st=='ground'&&!c.dead&&!(c.dn>0)&&sgFP(c)&&(c.isP?(ads&&adsK>.55):((c.adsK||0)>.55)))m.visible=false;
const fall=f.st=='fall',alt=fall?altF(f.ft/FT0):f.isP?f.jh:((f.dead||f.dn>0)?0:(f.jh||0));m.position.set(f.x,alt,f.y);const th=Math.PI/2-((f.slf&&f.dash>0)?Math.atan2(f.day,f.dax):f.ang);f.ry=f.ry==null?th:f.ry+wr(th-f.ry)*Math.min(1,dt*14);m.rotation.y=f.ry;m.scale.set(1,1,1);
pose(f,g,dt,fall,alt);
if(fall){const sp0=Math.hypot(f.fvx||0,f.fvy||0),k=Math.min(1,sp0/500)*.42;let tf=0,ts=0;if(sp0>1){const ux=f.fvx/sp0,uy=f.fvy/sp0,sn=Math.sin(f.ry),cs=Math.cos(f.ry);tf=(ux*sn+uy*cs)*k;ts=(ux*cs-uy*sn)*k}const kk=Math.min(1,dt*3.2);f.tlx=(f.tlx||0)+(tf-(f.tlx||0))*kk;f.tlz=(f.tlz||0)+(-ts-(f.tlz||0))*kk;
const dvT=f.ft/FT0>=FTO?1:0;f.dv=(f.dv||0)+(dvT-(f.dv||0))*Math.min(1,dt*(dvT?6:3.5));const dv=f.dv,th2=2.3*dv;f.bg.rotation.x=f.tlx+th2;f.bg.rotation.z=f.tlz;f.bg.position.y+=30-30*Math.cos(th2);f.bg.position.z+=-30*Math.sin(th2);if(dv>.01){const Lr=(o,x,y,z)=>{o.rotation.x+=(x-o.rotation.x)*dv;o.rotation.y+=(y-o.rotation.y)*dv;o.rotation.z+=(z-o.rotation.z)*dv};Lr(f.a1,-.5,0,-1.1);Lr(f.a2,-.5,0,1.1);Lr(f.l1,.35,0,-.3);Lr(f.l2,.35,0,.3)}if(f.pc){f.pc.rotation.order='XYZ';f.pc.position.set(0,112,0)}}
else{if(f.dv>.001){f.a1.rotation.z=f.a2.rotation.z=f.l1.rotation.z=f.l2.rotation.z=0}f.dv=0;if(f.tlx||f.tlz){f.tlx=f.tlz=0;if(f.pc){f.pc.rotation.order='XYZ';f.pc.position.set(0,112,0)}}}
windFx(f,g,dt,fall,f.isP||f===c||dst(f,c)<900);trailFx(f,g,dt,fall,c);if(f.gfx)gfxUpd(f,g.t);
const e=f.fl>0?.9:0,iv=f.inv>0?.25+.2*Math.sin(g.t*20):0,pv=f.pois>0?.3+.15*Math.sin(g.t*14):0;{const gh=f.invis>0;if(gh!==!!f.gho){f.gho=gh;for(const t of f.ms){t.transparent=gh||!!t.__op;t.opacity=gh?.3:(t.__op||1);t.needsUpdate=true}}}for(const t of f.ms){/* anti-skin-preta: guarda a cor/textura originais e restaura se ficarem pretas ou sem textura */
if(!t.__o)t.__o={c:t.color.getHex(),m:t.map};else{if(t.color.getHex()===0&&t.__o.c!==0)t.color.setHex(t.__o.c);if(t.__o.m&&!t.map){t.map=t.__o.m;t.needsUpdate=true}}
const er=e+iv*.3,eg=e+iv*1.2+pv,eb=e+iv*1.4;t.emissive.setRGB(isFinite(er)?er:0,isFinite(eg)?eg:0,isFinite(eb)?eb:0)}}
let i=0;for(const b of g.b){let m=bp[i],h=bh[i];if(!m){m=new THREE.Mesh(BG,new THREE.MeshBasicMaterial({color:'#fff6c8'}));h=new THREE.Mesh(BG,new THREE.MeshBasicMaterial({color:'#ff6a00',transparent:true,opacity:.6,depthWrite:false}));gw.add(h);gw.add(m);bp[i]=m;bh[i]=h}m.visible=true;h.visible=true;const E=b.sk&&SK[b.sk].ev?SK[b.sk]:null,plain=!b.ex&&!b.ps&&!E&&!(b.r>8);m.material.color.set(b.ps?'#d8ff9a':E?E.p2[2]||'#fff':plain?'#fff4c9':'#fff6c8');h.material.color.set(b.ps?'#2fa000':E?E.p2[0]:plain?'#ffb04a':'#ff6a00');h.material.opacity=plain?.3:.6;const L=b.ex?24:b.r>8?20:Math.min(64,Math.hypot(b.vx,b.vy)/24),t=b.ex?12:b.r>8?10:5;{const ts=t*.5*(E?(E.fx=='evIce'?1.9:E.fx=='evGold'?.9:E.fx=='evToxic'?1.2:1.5):1),Ls=L*.7*(E?(E.fx=='evIce'?1.05:E.fx=='evGold'?1.6:E.fx=='evToxic'?1.2:1.4):1);if(plain){const sp=Math.hypot(b.vx,b.vy),lc=Math.max(18,Math.min(46,sp/32));m.scale.set(1.3,1.3,lc);h.scale.set(3,3,lc*2.6)}else if(b.rune&&E&&E.fx=='evArcane'){m.scale.set(26,26,.8);h.scale.set(38,38,.5)}else{m.scale.set(ts,ts,Ls);h.scale.set(ts*2.4,ts*2.4,Ls*1.2)}}m.position.set(b.x,Math.max(2,(b.z0||44)+(b.kz||0)*Math.hypot(b.x-(b.sx||b.x),b.y-(b.sy||b.y))),b.y);h.position.copy(m.position);if(plain){const o=(h.scale.z-m.scale.z)/2;h.position.x-=Math.cos(b.a)*o;h.position.z-=Math.sin(b.a)*o}m.rotation.y=Math.PI/2-b.a;h.rotation.y=m.rotation.y;m.rotation.z=(E&&E.fx=='evIce')?g.t*14+i*1.7:(b.rune&&E&&E.fx=='evArcane')?g.t*7+i:0;h.rotation.z=(b.rune&&E&&E.fx=='evArcane')?-g.t*5+.785:0;i++}for(;i<bp.length;i++){bp[i].visible=false;bh[i].visible=false}{let j=0;for(const q of (g.hl||[])){const A0=q.p;for(let k=0;k<A0.length-1&&j<(g.rk?30:100);k++){let m=hp[j];if(!m){m=new THREE.Mesh(BG,new THREE.MeshBasicMaterial({color:'#ffffff',transparent:true,depthWrite:false}));gw.add(m);hp[j]=m}const A=A0[k],B=A0[k+1],len=Math.hypot(B[0]-A[0],B[1]-A[1],B[2]-A[2])||1;m.visible=true;m.material.color.set(q.c);m.material.opacity=Math.min(1,q.l/q.m*2);m.position.set((A[0]+B[0])/2,(A[1]+B[1])/2,(A[2]+B[2])/2);m.lookAt(B[0],B[1],B[2]);m.scale.set(q.w,q.w,len);j++}}for(;j<hp.length;j++)hp[j].visible=false}
{let j=0;for(const q of g.fl){let m=fp[j];if(!m){m=new THREE.Mesh(BG,new THREE.MeshBasicMaterial({color:'#7dff6a'}));m.scale.set(8,12,8);gw.add(m);fp[j]=m}m.material.color.set(q.o?'#3a1050':'#7dff6a');if(q.o)m.scale.set(18,3+Math.abs(Math.sin(g.t*32+j))*7,7);else m.scale.set(8,12,8);m.visible=true;m.position.set(q.x,q.h,q.y);m.rotation.y=g.t*8;j++}for(;j<fp.length;j++)fp[j].visible=false}
{let j=0;for(const w of (g.iw||[])){let m=icp[j];if(!m){m=new THREE.Group();m.userData.s=[];for(let k=0;k<3;k++){const o=new THREE.Mesh(BG,new THREE.MeshBasicMaterial({color:'#ffcc9f',transparent:true,opacity:.75,depthWrite:false}));const e=new THREE.Mesh(BG,new THREE.MeshBasicMaterial({color:'#fff4ea',transparent:true,opacity:.9}));m.add(o);m.add(e);m.userData.s.push([o,e])}gw.add(m);icp[j]=m}
m.visible=true;const fade=w.t<1?(Math.sin(g.t*30)>0?1:.35):1,cr=.45+.55*Math.max(0,w.hp/w.mhp),gl=w.fl>0?1:0;
w.sg.forEach((s,k)=>{const dx=s[2]-s[0],dz=s[3]-s[1],L=Math.hypot(dx,dz)+ICE.th*2,[o,e]=m.userData.s[k],ry=-Math.atan2(dz,dx);o.position.set((s[0]+s[2])/2,ICE.h/2,(s[1]+s[3])/2);o.scale.set(L,ICE.h,ICE.th*2);o.rotation.y=ry;o.material.opacity=.78*cr*fade;o.material.color.set(gl?'#ffffff':'#ffc48f');e.position.set(o.position.x,ICE.h+1.5,o.position.z);e.scale.set(L,3,ICE.th*2+2);e.rotation.y=ry;e.material.opacity=.9*fade});j++}for(;j<icp.length;j++)icp[j].visible=false}
{let j=0;for(const q of (g.ig||[])){let m=igp[j];if(!m){m=new THREE.Mesh(new THREE.SphereGeometry(8,10,8),new THREE.MeshBasicMaterial({color:'#ffba7d'}));gw.add(m);igp[j]=m}const k=Math.min(1,q.t/q.T);m.visible=true;m.position.set(q.x,34+Math.sin(k*3.14159)*95,q.y);m.rotation.y=g.t*9;j++}for(;j<igp.length;j++)igp[j].visible=false}
{let j=0;for(const z of (g.ev||[])){let m=evp[j];if(!m){m=mkEvZone();gw.add(m);evp[j]=m}const k=Math.min(1,(3-z.t)/.3,z.t/.3+.15),s=z.r*Math.max(.05,k);m.visible=true;m.position.set(z.o.x,1.8,z.o.y);m.scale.set(s,1,s);const u=m.userData;u.d.material.opacity=.16+.07*Math.sin(g.t*6);u.cr.rotation.y=g.t*1.5;j++}for(;j<evp.length;j++)evp[j].visible=false}
{let j=0;for(const z of (g.cz||[])){let m=czq[j];if(!m){m=mkCzZone();gw.add(m);czq[j]=m}const k=Math.min(1,(4-z.t)/.25,z.t/.25+.15),s=z.r*Math.max(.05,k);m.visible=true;m.position.set(z.x,1.8,z.y);m.scale.set(s,s*.5,s);m.userData.d.material.opacity=.16+.07*Math.sin(g.t*6);j++}for(;j<czq.length;j++)czq[j].visible=false}
{let j=0;for(const q of (g.dg||[])){let m=dgp[j];if(!m){m=mkDog();gw.add(m);dgp[j]=m}m.visible=true;m.position.set(q.x,Math.abs(Math.sin(g.t*11+j))*2,q.y);m.rotation.y=Math.PI/2-q.a;const u=m.userData,w=Math.sin(g.t*22+j*2)*.8;for(let i=0;i<4;i++)u.lg[i].rotation.x=i%2?w:-w;u.tl.rotation.y=Math.sin(g.t*30)*.7;j++}for(;j<dgp.length;j++)dgp[j].visible=false}
const pc=pts.geometry.attributes.position.array,ca=pts.geometry.attributes.color.array,cc=new THREE.Color();let n=0;const _rk=g.rk,_lim=_rk?Math.min(QP,60):QP;for(const q of g.pt){if(n>=_lim)break;if(_rk&&(Math.abs(q.x-c.x)>700||Math.abs(q.y-c.y)>700))continue;pc[n*3]=q.x;pc[n*3+1]=Math.max(3,(q.h||30)+(q.m-q.l)*(q.u===undefined?50:q.u));pc[n*3+2]=q.y;let _k=PCC.get(q.c);if(!_k){cc.set(q.c);_k=[cc.r,cc.g,cc.b];PCC.set(q.c,_k)}ca[n*3]=_k[0];ca[n*3+1]=_k[1];ca[n*3+2]=_k[2];n++}pts.geometry.setDrawRange(0,n);pts.geometry.attributes.position.needsUpdate=true;pts.geometry.attributes.color.needsUpdate=true;
drawAD(g);drawSV(g);drawShops(g);drawFlags(g,c);drawBand(g,c);trailUpd(dt);ren.render(sc,cam3)}

/* ===== conversa entre bots + bandeirao de equipe eliminada ===== */
function callout(f,t){if(!G||G.cs||!t||t.dead||t.dn>0||t.st!='ground')return;const T=G.teams[f.tm];if(T.m.length<2||G.t<(T.sayT||0))return;T.sayT=G.t+rr(5,9);
const dx=t.x-f.x,dy=t.y-f.y,d=Math.hypot(dx,dy),DR=['leste','sudeste','sul','sudoeste','oeste','noroeste','norte','nordeste'],dir=DR[((Math.round(Math.atan2(dy,dx)/(Math.PI/4))%8)+8)%8],inH=G.houses.some(h=>t.x>h.x&&t.x<h.x+h.w&&t.y>h.y&&t.y<h.y+h.h),
pl=inH?'numa casa ao '+dir:d<350?'bem perto, ao '+dir:d>800?'longe, ao '+dir:'ao '+dir,M=['Inimigo!','Tem cara!','Olha o cara!','Achei um!','Opa, tem gente!','Avistei!','Tem doido!','Cuidado, tem cara '+pl+'!','Inimigo '+pl+'!','Vi um '+pl+'!','Tem gente '+pl+', cuidado!','Cara '+pl+', fica esperto!','Contato '+pl+'!','Tô vendo alguém '+pl+'!','Olha lá, '+pl+'!','Um inimigo '+pl+'!','Visual no alvo!','Alvo na mira!','Tem um fominha aí!','Opa, apareceu um!'];
const L=G.say||(G.say=[]);L.push({o:f,t:M[R()*M.length|0],a:G.t,b:G.t+3.2});
let r=null,bd=1300;for(const a of T.m){if(a===f||a.isP||a.dead||a.dn>0||a.st!='ground')continue;const q=dst(f,a);if(dst(f,a)<=1500){a.vs=t;a.vsU=G.t+10}if(q<bd){bd=q;r=a}}
if(r){const RP=['Fechou!','Tô indo!','Deixa comigo!','Tô colando aí!','Bora nele!','Visado!','Tô contigo!','Já vi, bora!','Bora lá!','Cobrindo você!','Já tô indo!','Pode deixar!','Tô na cola!','Vai que eu cubro!','Na minha mira também!','Atirando junto!','Vamo pra cima!','Tô chegando, segura!','Fica tranquilo!','Eu vi também!'];L.push({o:r,t:RP[R()*RP.length|0],a:G.t+1,b:G.t+3.2})}}
function plantFlag(s){const T=G.teams[s.tm];s.pf=2.6;s.pfc={col:T.col||s.col,sym:T.sym||0};s.vx=0;s.vy=0;s.hl=null;s.bq=null;s.rt=null;s.dash=0;let fx=s.x+Math.cos(s.ang)*52,fy=s.y+Math.sin(s.ang)*52;if(wallAt(fx,fy)){fx=s.x;fy=s.y}(G.fg||(G.fg=[])).push({x:fx,y:fy,col:s.pfc.col,sym:s.pfc.sym,t0:G.t+1,fade:G.t+51,landed:0,o:s});tx(s.x,s.y-62,'BANDEIRA!','#ffd93b')}
const BNT={};function bannerTex(col,sym){const k=col+'|'+sym;if(BNT[k])return BNT[k];const c=document.createElement('canvas');c.width=256;c.height=360;const x=c.getContext('2d'),sh=()=>{x.beginPath();x.moveTo(0,0);x.lineTo(256,0);x.lineTo(256,360);x.lineTo(128,306);x.lineTo(0,360);x.closePath()};sh();x.fillStyle='#241f1b';x.fill();x.save();sh();x.clip();x.fillStyle=col;x.fillRect(0,0,256,26);x.fillRect(0,0,22,360);x.fillRect(234,0,22,360);x.globalAlpha=.16;x.fillStyle='#ffffff';for(let i=0;i<6;i++)x.fillRect(0,40+i*50,256,14);x.globalAlpha=1;x.restore();x.lineWidth=8;x.strokeStyle='#141211';sh();x.stroke();emb(x,128,150,105,col,sym);return BNT[k]=new THREE.CanvasTexture(c)}
function mkFlag(q){const g0=new THREE.Group(),m=c=>new THREE.MeshLambertMaterial({color:c});const base=new THREE.Mesh(new THREE.CylinderGeometry(22,28,8,14),m('#4b3a2a'));base.position.y=4;g0.add(base);
const rg=new THREE.Mesh(new THREE.RingGeometry(34,42,28),new THREE.MeshBasicMaterial({color:q.col,transparent:true,opacity:.7,side:THREE.DoubleSide,depthWrite:false}));rg.rotation.x=-Math.PI/2;rg.position.y=1.2;g0.add(rg);
const pole=new THREE.Mesh(new THREE.CylinderGeometry(3,4,310,8),m('#d9dde4'));pole.position.y=155;g0.add(pole);const ball=new THREE.Mesh(new THREE.SphereGeometry(7,10,8),new THREE.MeshBasicMaterial({color:'#ffd93b'}));ball.position.y=314;g0.add(ball);
const bn=new THREE.Group();bn.position.set(3,296,0);const pl=new THREE.Mesh(new THREE.PlaneGeometry(150,210),new THREE.MeshBasicMaterial({map:bannerTex(q.col,q.sym),transparent:true,alphaTest:.5,side:THREE.DoubleSide}));pl.position.set(75,-105,0);bn.add(pl);g0.add(bn);q.bn=bn;return g0}
function drawFlags(g,c){const L=g.fg;if(!L||!L.length)return;for(let i=L.length-1;i>=0;i--){const q=L[i];if(g.t>q.fade){if(q.m)gw.remove(q.m);L.splice(i,1);continue}if(g.t<q.t0)continue;const a=g.t-q.t0;
if(a>=.35&&!q.landed){q.landed=1;boom(q.x,q.y,['#e8e2c0',q.col,'#ffffff'],20,210);if(dst(q,c)<700){shk=Math.max(shk,5);snd(110,.3,'sawtooth',.07,-40)}}
if(Math.abs(q.x-c.x)>2600||Math.abs(q.y-c.y)>2600){if(q.m)q.m.visible=false;continue}
if(!q.m){q.m=mkFlag(q);gw.add(q.m)}q.m.visible=true;const dp=Math.min(1,a/.35),y=a<.35?170*(1-dp*dp):Math.abs(Math.sin((a-.35)*9))*14*Math.exp(-(a-.35)*4);q.m.position.set(q.x,y,q.y);
const u=Math.min(1,Math.max(0,(a-.35)/.8)),e=1-Math.pow(1-u,3);q.bn.scale.x=.05+.95*e;q.bn.rotation.y=Math.sin(g.t*3+q.x)*.14;q.m.rotation.z=a<.35?(1-dp)*.7:Math.sin(g.t*1.3+q.y)*.02;
const left=q.fade-g.t;q.m.scale.setScalar(left<3?Math.max(.01,left/3):1)}}
function plantPose(f,g,fall){if(!(f.pf>0)||fall||f.dn>0||f.dead){if(f.hf)f.hf.visible=false;return}const u=2.6-f.pf;let ax,lean;
if(u<.7){ax=-.4-2.5*(u/.7);lean=-.18*(u/.7)}else if(u<1){const k=(u-.7)/.3;ax=-2.9+2.5*k;lean=-.18+.7*k}else{ax=-.4;lean=.52*Math.max(0,1-(u-1)/.5)}
f.gun.visible=false;f.mf.visible=false;if(u<1){f.a1.rotation.set(ax,0,.12);f.a2.rotation.set(ax,0,-.12)}else{f.a1.rotation.set(-2.7+Math.sin(g.t*9)*.25,0,.3);f.a2.rotation.set(-.3,0,-.15)}f.bg.rotation.x=lean;
if(f.pfc){if(!f.hf){const gr=new THREE.Group(),po=new THREE.Mesh(BG,mat('#cfd3da'));po.scale.set(2.2,66,2.2);gr.add(po);const bn=new THREE.Mesh(new THREE.PlaneGeometry(32,44),new THREE.MeshBasicMaterial({map:bannerTex(f.pfc.col,f.pfc.sym),transparent:true,alphaTest:.5,side:THREE.DoubleSide}));bn.position.set(17,18,0);gr.add(bn);f.hf=gr;f.bg.add(gr)}f.hf.position.set(0,76,10);f.hf.visible=u<1}}

/* ===== BANDEIRAO (bandeira pirata) + RISADA: bot que elimina um inimigo no modo SALA ===== */
var PIRTX=null,BGP=null,BGB=null;
function pirTex(){if(PIRTX)return PIRTX;const c=document.createElement('canvas');c.width=256;c.height=176;const x=c.getContext('2d');
x.fillStyle='#0f0e0e';x.fillRect(0,0,256,176);x.strokeStyle='#2a2a36';x.lineWidth=6;x.strokeRect(3,3,250,170);
x.save();x.translate(128,88);x.strokeStyle='#f1efe6';x.fillStyle='#f1efe6';x.lineCap='round';x.lineWidth=11;
for(const sg of[-1,1]){x.save();x.rotate(sg*.62);x.beginPath();x.moveTo(-74,0);x.lineTo(74,0);x.stroke();for(const e of[-1,1])for(const o of[-1,1]){x.beginPath();x.arc(e*76,o*6,8,0,7);x.fill()}x.restore()}
x.beginPath();x.ellipse(0,-12,34,31,0,0,7);x.fill();x.fillRect(-19,8,38,22);
x.fillStyle='#0f0e0e';x.beginPath();x.ellipse(-13,-12,9,11,0,0,7);x.ellipse(13,-12,9,11,0,0,7);x.fill();
x.beginPath();x.moveTo(0,0);x.lineTo(-5,10);x.lineTo(5,10);x.closePath();x.fill();
x.lineWidth=2.5;x.strokeStyle='#0f0e0e';for(let i=-2;i<=2;i++){x.beginPath();x.moveTo(i*7.5,16);x.lineTo(i*7.5,30);x.stroke()}
x.restore();PIRTX=new THREE.CanvasTexture(c);return PIRTX}
function mkBand(q){const g0=new THREE.Group();
if(!BGP){BGP=new THREE.CylinderGeometry(2.2,2.7,120,8);BGB=new THREE.SphereGeometry(4.5,10,8)}
const pole=new THREE.Mesh(BGP,new THREE.MeshLambertMaterial({color:'#8a6a3a'}));pole.position.y=56;g0.add(pole);
const ball=new THREE.Mesh(BGB,new THREE.MeshBasicMaterial({color:'#ffd93b'}));ball.position.y=118;g0.add(ball);
const cg=new THREE.PlaneGeometry(92,62,14,6),cl=new THREE.Mesh(cg,new THREE.MeshBasicMaterial({map:pirTex(),side:THREE.DoubleSide}));
cl.position.set(48,84,0);g0.add(cl);q.cl=cl;q.ox=Float32Array.from(cg.attributes.position.array.filter((v,i)=>i%3==0));
const mound=new THREE.Mesh(new THREE.CylinderGeometry(9,13,4,10),new THREE.MeshLambertMaterial({color:'#5a4630'}));mound.position.y=2;g0.add(mound);return g0}
function bandLaugh(s){if(!G||(s.lgT||0)>G.t||s.dead||s.dn>0||s.st!='ground')return;
for(const e of G.f){if(!e.dead&&e.tm!==s.tm&&e.st=='ground'&&dst(e,s)<520)return}
s.lgT=G.t+8;s.lgh=s.lgd=3.2;s.vx=0;s.vy=0;s.hl=null;s.bq=null;s.rt=null;s.dash=0;
let fx=s.x+Math.cos(s.ang)*32,fy=s.y+Math.sin(s.ang)*32;if(wallAt(fx,fy)){fx=s.x;fy=s.y}
(G.bfl||(G.bfl=[])).push({x:fx,y:fy,ang:s.ang,t0:G.t+.4,fade:G.t+9,landed:0,o:s,sd:Math.random()*6.28});
tx(s.x,s.y-62,'HAHAHA!','#ffd93b');
if(dst(s,G.p)<1500){for(let i=0;i<6;i++){snd(560-i*26,.08,'square',.03,-140,.5+i*.14);snd(280-i*12,.09,'triangle',.04,-60,.5+i*.14)}}}
function laughPose(f,g,fall){if(!(f.lgh>0)||fall||f.dn>0||f.dead)return;const u=f.lgd-f.lgh,t=g.t;f.gun.visible=false;f.mf.visible=false;
if(u<.4){const k=u/.4;f.a1.rotation.set(-2.7*k,0,.15);f.a2.rotation.set(-2.7*k,0,-.15);f.bg.rotation.x=-.12*k;if(u>.3){f.bg.rotation.x=-.12-.2*(u-.3)/.1*.5}return}
const lk=Math.min(1,(u-.4)/.2)*Math.min(1,f.lgh/.35),sh=Math.sin(t*26),bn=Math.abs(Math.sin(t*13));
f.bg.rotation.x=-.34*lk+sh*.045*lk;f.bg.rotation.z=Math.sin(t*13)*.07*lk;f.bg.position.y+=bn*3.4*lk;
f.a1.rotation.set(-.95+sh*.12*lk,0,.55*lk);f.a2.rotation.set(-1.45,0,-.2+Math.sin(t*13)*.05);
f.l1.rotation.x=Math.sin(t*13)*.16*lk;f.l2.rotation.x=-Math.sin(t*13)*.16*lk}
function drawBand(g,c){const L=g.bfl;if(!L||!L.length)return;const clr=g.cs&&g.cs.ph=='buy';
for(let i=L.length-1;i>=0;i--){const q=L[i];if(clr||g.t>q.fade){if(q.m){gw.remove(q.m);if(q.cl)q.cl.geometry.dispose()}L.splice(i,1);continue}if(g.t<q.t0)continue;const a=g.t-q.t0;
if(a>=.35&&!q.landed){q.landed=1;boom(q.x,q.y,['#e8e2c0','#2d2a28','#ffffff'],20,210);if(dst(q,c)<800){shk=Math.max(shk,5);snd(110,.3,'sawtooth',.07,-40)}}
if(Math.abs(q.x-c.x)>2600||Math.abs(q.y-c.y)>2600){if(q.m)q.m.visible=false;continue}
if(!q.m){q.m=mkBand(q);gw.add(q.m)}q.m.visible=true;const dp=Math.min(1,a/.35),rem=q.fade-g.t;
let y=a<.35?190*(1-dp*dp):Math.abs(Math.sin((a-.35)*9))*10*Math.exp(-(a-.35)*4);if(rem<1)y-=(1-rem)*135;
q.m.position.set(q.x,y,q.y);q.m.rotation.y=Math.PI/2-q.ang;q.m.rotation.z=a<.35?(1-dp)*.5:Math.sin(g.t*1.4+q.sd)*.015;
const pa=q.cl.geometry.attributes.position;for(let k=0;k<pa.count;k++){const ox=q.ox[k];pa.setZ(k,Math.sin(ox*.12-g.t*8+q.sd)*((ox+46)/92)*8)}pa.needsUpdate=true}}
function mvpTag(x,y){const w=34,h=14;X.save();X.fillStyle='#ffd93b';X.strokeStyle='#0d1a13';X.lineWidth=2;X.beginPath();X.roundRect(x-w/2,y-h/2,w,h,4);X.fill();X.stroke();
X.beginPath();X.moveTo(x-9,y-h/2);X.lineTo(x-9,y-h/2-7);X.lineTo(x-4.5,y-h/2-3);X.lineTo(x,y-h/2-9);X.lineTo(x+4.5,y-h/2-3);X.lineTo(x+9,y-h/2-7);X.lineTo(x+9,y-h/2);X.closePath();X.fill();X.stroke();X.restore();Tx('MVP',x,y+.5,11,'#0d1a13')}
function overlay(){const g=G,p=g.p,Z=g.Z,RV=g.room&&!fc.w,c=RV?Object.assign(Object.create(cfo()),{x:fc.x,y:fc.y}):cfo();X.setTransform(D,0,0,D,0,0);if(!RV&&c.st=='fall'){X.save();X.strokeStyle='#ffffff';X.lineWidth=2;for(let i=0;i<24;i++){const r0=((i*97.3)%100)/100,sx=(i%2?r0*.3:1-r0*.3)*W,sp=.6+((i*31)%7)/10,k=(g.t*sp+i*.137)%1,y0=H*(1.05-k*1.3),ln=H*(.12+((i*13)%5)*.03);X.globalAlpha=Math.sin(k*3.1416)*.5;X.beginPath();X.moveTo(sx,y0);X.lineTo(sx,y0+ln);X.stroke()}X.restore()}
const pp=g.room?c:p;if(pp.st=='ground'&&!pp.dead&&Math.hypot(pp.x-Z.cx,pp.y-Z.cy)>Z.r){X.fillStyle='rgba(60,110,255,.22)';X.fillRect(0,0,W,H)}
const v=new THREE.Vector3(),P=(x,y,z)=>{v.set(x,y,z).project(cam3);return v.z<1?[(v.x+1)/2*W,(1-v.y)/2*H]:null};
const aimNow=(c===p&&!RV&&adsK>.3)||SA();
for(const f of g.f){if(f.dead||f.st!='ground'||!f.mesh.visible||f===c||dst(f,c)>(f.tm==c.tm||g.room?1400:650))continue;if(aimNow&&f.tm!==c.tm)continue;const s=P(f.x,f.dn>0?44:78+(f.jh||0),f.y);if(!s)continue;const bw=44,sx=s[0],sy=s[1];if(!(f.tm===c.tm&&!g.room)){X.fillStyle='#0d1a13';X.fillRect(sx-bw/2-2,sy-2,bw+4,9);X.fillStyle='#ff5a5a';X.fillRect(sx-bw/2,sy,bw*cl(f.hp/MH,0,1),5);if(f.ar>0){X.fillStyle='#4aa3ff';X.fillRect(sx-bw/2,sy-5,bw*f.ar/50,3)}}if(f.tm===c.tm)TxS(nmSg(f),sx,sy-10,11,'center');if(f===g.mvp&&f.kills>0)mvpTag(sx,sy-26);
if(f.dn>0){X.fillStyle='#0d1a13';X.fillRect(sx-bw/2-2,sy+8,bw+4,7);X.fillStyle='#ffb43b';X.fillRect(sx-bw/2,sy+10,bw*cl(f.dn/10,0,1),3);Tx('CAIDO '+Math.ceil(f.dn)+'s',sx,sy+24,10,'#ff8a8a');if(f.rvt>0){X.fillStyle='#0d1a13';X.fillRect(sx-bw/2-2,sy+31,bw+4,8);X.fillStyle='#7dff6a';X.fillRect(sx-bw/2,sy+33,bw*cl(f.rpg,0,1),4)}}}
if(g.say&&g.say.length){for(let i=g.say.length-1;i>=0;i--){const q=g.say[i];if(g.t>q.b||q.o.dead){g.say.splice(i,1);continue}if(g.t<q.a)continue;const o=q.o;if(q.amb&&(o.tg||o.dn>0)){g.say.splice(i,1);g.dlg=null;continue}if(o.st!='ground'||!o.mesh.visible||o.tm!==c.tm||(o!==c&&dst(o,c)>1500))continue;if(!q.vz){q.vz=1;botVoice(o,q.t,c,q.cb)}if(!VZ.bl)continue;const s=P(o.x,78+(o.jh||0),o.y);if(!s)continue;X.save();X.font='900 12px Trebuchet MS,Arial,sans-serif';const tw=X.measureText(q.t).width+18,bh=22,bx=s[0]-tw/2,by=s[1]-50-bh;X.globalAlpha=Math.min(1,(g.t-q.a)*8,(q.b-g.t)*3);X.fillStyle='rgba(255,255,255,.84)';X.strokeStyle=o.col;X.lineWidth=3;X.beginPath();X.roundRect(bx,by,tw,bh,9);X.fill();X.stroke();X.beginPath();X.moveTo(s[0]-6,by+bh-1);X.lineTo(s[0]+6,by+bh-1);X.lineTo(s[0],by+bh+7);X.closePath();X.fill();X.fillStyle='#0d1a13';X.textAlign='center';X.textBaseline='middle';X.fillText(q.t,s[0],by+bh/2+1);X.restore()}}
if(!g.room&&!c.dead){for(const f of g.f){if(f===c||f.dead||f.tm!==c.tm)continue;const d=dst(f,c);if(d<=1400)continue;const s=P(f.x,f.dn>0?44:96,f.y);if(!s||s[0]<20||s[0]>W-20||s[1]<40||s[1]>H-40)continue;const sx=s[0],sy=s[1];X.save();X.globalAlpha=.95;X.fillStyle='#4cd964';X.strokeStyle='#0d1a13';X.lineWidth=2;X.beginPath();X.moveTo(sx,sy+2);X.lineTo(sx-6,sy-7);X.lineTo(sx+6,sy-7);X.closePath();X.fill();X.stroke();X.restore();TxS(nmSg(f),sx,sy-18,11,'center');Tx(Math.round(d/10)+'m',sx,sy-31,11,f.dn>0?'#ffb43b':'#7dff6a')}}
{const mv=g.mvp;if(mv&&mv.kills>0&&mv===g.p&&!g.room&&!mv.dead&&mv.st=='ground'){const q=P(mv.x,mv.dn>0?60:86,mv.y);if(q)mvpTag(q[0],q[1])}}
for(const f of g.f){if(f.dead||!(f.mk>0)||f.st!='ground')continue;if(!g.room&&f.mkTm!==g.p.tm)continue;const s=P(f.x,112,f.y);if(!s)continue;X.save();X.translate(s[0],s[1]);X.fillStyle='#ff3b3b';X.strokeStyle='#fff';X.lineWidth=2;X.beginPath();X.moveTo(0,0);X.lineTo(-9,-14);X.lineTo(9,-14);X.closePath();X.fill();X.stroke();X.restore();Tx('MARCADO '+Math.ceil(f.mk)+'s',s[0],s[1]-24,11,'#ff8a8a')}
for(const q of g.tx){const s=P(q.x,80+(.8-q.l)*60,q.y);if(s){if(q.cr&&HSI.complete&&HSI.naturalWidth){const sz=q.sz||15,is=sz*1.15;Tx(q.t,s[0]-is/2,s[1],sz,q.c);const w=X.measureText(String(q.t)).width;X.drawImage(HSI,s[0]-is/2+w/2+2,s[1]-is/2,is,is)}else Tx(q.t,s[0],s[1],q.sz||15,q.c)}}
xhair(P);specAim(P,c)}
function SA(){const c=G&&cfo();return !!c&&specLock()&&!c.isP&&!c.dead&&(c.adsK||0)>.3}

var lastShot=0,pFP=0,SGB=[],aimTan=0,lockPit=.25,AR0=0,_blt=null,_bkz=0,_blk=0;
function sgOf(f){const wi=f.ws[f.cur]||0,w=WP[wi];if(!wi)return 0;if(w.sc)return 3;return Math.min(2,f.sgk|0)}
function sgFov(f){const k=sgOf(f),w=WP[f.ws[f.cur]||0];return k==0?60:k==1?52:k==2?42:30}
function sgFP(f){return sgOf(f)>=1}
function sgSet(k){const p=G&&G.p;if(!p||p.dead||G.room)return;const wi=p.ws[p.cur]||0;if(!wi)return;if(!p.sgs)p.sgs=[null,null];p.sgs[p.cur]={w:wi,k:k};snd(700,.06,'triangle',.05,200)}
function sgTap(x,y){if(!G||G.room||G.p.dead||G.p.st!='ground')return 0;for(const b of SGB)if(Math.hypot(x-b.x,y-b.y)<b.r*1.4){sgSet(b.i);return 1}return 0}
function FPV(){if(!G||(G.room&&!fc.w))return null;const c=cfo();if(!c||c.dead||c.st!='ground'||c.dn>0)return null;if(c===G.p)return(ads&&adsK>.2&&sgFP(c))?c:null;return(specLock()&&(c.adsK||0)>.2&&sgFP(c))?c:null}
function sgChips(){SGB=[];const p=G.p;if(G.room||p.dead||p.st!='ground'||!(p.ws[p.cur]))return;const q=BT.ads(),k=sgOf(p),fx=!!WP[p.ws[p.cur]].sc;Tx('Mira: '+['Ponto','2x','4x','Luneta'][k]+(fx?' (fixa)':''),q.x,q.y-q.r-10*U,10*U,'#ffd93b')}
function sgDraw(k,a){const cx=Math.round(W/2),cy=Math.round(H/2),m=Math.min(W,H);X.save();
if(k==3){X.globalAlpha=cl((a-.2)/.5,0,1);const r=m*.4;X.fillStyle='rgba(0,0,0,.92)';X.beginPath();X.rect(0,0,W,H);X.arc(cx,cy,r,0,7);X.fill('evenodd');X.strokeStyle='#000';X.lineWidth=3;X.beginPath();X.arc(cx,cy,r,0,7);X.moveTo(cx-r,cy);X.lineTo(cx+r,cy);X.moveTo(cx,cy-r);X.lineTo(cx,cy+r);X.stroke();X.strokeStyle='#fff';X.lineWidth=1.5;X.beginPath();X.arc(cx,cy,3,0,7);X.stroke()}
else if(k==2){X.globalAlpha=cl((a-.2)/.5,0,1);const r=m*.5;X.fillStyle='rgba(0,0,0,.45)';X.beginPath();X.rect(0,0,W,H);X.arc(cx,cy,r,0,7);X.fill('evenodd');X.strokeStyle='#111';X.lineWidth=4;X.beginPath();X.arc(cx,cy,r,0,7);X.stroke();X.lineWidth=1.6;X.beginPath();for(const[ux,uy]of[[1,0],[-1,0],[0,1],[0,-1]]){X.moveTo(cx+ux*10,cy+uy*10);X.lineTo(cx+ux*r*.55,cy+uy*r*.55)}X.stroke();X.fillStyle='#ff2a2a';X.beginPath();X.arc(cx,cy,2.2,0,7);X.fill()}
else if(k==1){X.globalAlpha=cl((a-.2)/.5,0,1);const gr=X.createRadialGradient(cx,cy,m*.3,cx,cy,Math.max(W,H)*.7);gr.addColorStop(0,'rgba(0,0,0,0)');gr.addColorStop(1,'rgba(0,0,0,.6)');X.fillStyle=gr;X.fillRect(0,0,W,H);X.strokeStyle='#ff3b3b';X.lineWidth=1.8;X.beginPath();X.arc(cx,cy,13,0,7);X.stroke();X.fillStyle='#ff2a2a';X.beginPath();X.arc(cx,cy,2,0,7);X.fill()}
else{const gr=X.createRadialGradient(cx,cy,m*.34,cx,cy,Math.max(W,H)*.78);gr.addColorStop(0,'rgba(0,0,0,0)');gr.addColorStop(1,'rgba(0,0,0,'+(.5*cl(a,0,1)).toFixed(3)+')');X.fillStyle=gr;X.fillRect(0,0,W,H);X.fillStyle='#ff2a2a';X.beginPath();X.arc(cx,cy,1.9,0,7);X.fill()}
X.restore()}
function specAim(P,c){if(!specLock()||!c||c.isP||c.dead||c.st!='ground')return;const cx=Math.round(W/2),cy=Math.round(H/2),ak=c.adsK||0,k=sgOf(c);X.save();const on=k==0?ak>.05:ak>.2;if(on)sgDraw(k,ak);if(k==0||!on){X.strokeStyle='rgba(0,0,0,.45)';X.lineWidth=3.2;X.beginPath();X.arc(cx,cy,7,0,7);X.stroke();X.strokeStyle='#fff';X.lineWidth=1.4;X.beginPath();X.arc(cx,cy,7,0,7);X.stroke();X.fillStyle='#fff';X.beginPath();X.arc(cx,cy,1.3,0,7);X.fill()}X.restore()}
function xhair(P){const g=G,p=g.p;if(g.room||p.st!='ground'||p.dead||p.dn>0)return;aimP();const T=lastT,cx=Math.round(W/2),cy=Math.round(H/2);const w=WP[p.ws[p.cur]||0],mv=Math.hypot(p.vx,p.vy)>20;kick=Math.max(kick*.88,p.cd>pcd+.01?12:0);pcd=p.cd;const c=T?'#ff3b3b':'#fff',rd=()=>{if(T){const s=P(T.x,38,T.y);if(s){X.fillStyle='#ff2a2a';X.strokeStyle='#fff';X.lineWidth=1;X.beginPath();X.arc(s[0],s[1],3.5,0,7);X.fill();X.stroke();X.strokeStyle='#ff2a2a';X.lineWidth=2;X.beginPath();X.arc(s[0],s[1],11,0,7);X.stroke()}}};
if(adsK>.2&&sgOf(p)>=1){sgDraw(sgOf(p),adsK);rd();return}
if(adsK>.05&&sgOf(p)==0){const gr=X.createRadialGradient(cx,cy,Math.min(W,H)*.34,cx,cy,Math.max(W,H)*.78);gr.addColorStop(0,'rgba(0,0,0,0)');gr.addColorStop(1,'rgba(0,0,0,'+(.5*adsK).toFixed(3)+')');X.fillStyle=gr;X.fillRect(0,0,W,H)}
const sp=(4-2*adsK)+(mv?3:0)+kick*.5+(w.pel?5:0);X.strokeStyle='rgba(0,0,0,.45)';X.lineWidth=3.2;X.beginPath();X.arc(cx,cy,sp+2,0,7);X.stroke();X.strokeStyle=c;X.lineWidth=1.4;X.beginPath();X.arc(cx,cy,sp+2,0,7);X.stroke();X.fillStyle=c;X.beginPath();X.arc(cx,cy,1.3,0,7);X.fill();if(adsK>.3){X.globalAlpha=Math.min(1,adsK);X.strokeStyle='#fff';X.lineWidth=1.6;X.beginPath();for(const[ux,uy]of[[1,0],[-1,0],[0,1],[0,-1]]){X.moveTo(cx+ux*(sp+5),cy+uy*(sp+5));X.lineTo(cx+ux*(sp+13),cy+uy*(sp+13))}X.stroke();X.fillStyle='#ff2a2a';X.beginPath();X.arc(cx,cy,1.9,0,7);X.fill();X.globalAlpha=1}rd()}
function team2(){const g=G,p=g.p,T=g.teams[p.tm],m=12,u=Math.min(U,1.2);X.setTransform(D,0,0,D,0,0);
if(T.m.length>1){const _n0=TRW.length;hudB('tm');let y=Math.max(m+120,H*.36);{const lb=T.cl?T.nm:'EQUIPE';Tx(lb,m+2,y-8,11,p.col,'left');emb(X,m+2+X.measureText(lb).width+12,y-8,8,T.col,T.sym)}
for(const o of T.m){if(o===p)continue;const w=140*u,h=20*u;TRW.push({x:m,y,w,h,T});hPan(m,y,w,h,6);
if(o.dead){X.save();X.globalAlpha=.6;TxS(nmSgM(o,0,[' (fora)','#9aa8a0']),m+6,y+h/2,11*u,'left');X.restore()}
else if(o.dn>0){X.fillStyle='#4a1f1f';X.fillRect(m+4,y+h-6*u,w-8,4*u);X.fillStyle='#ffb43b';X.fillRect(m+4,y+h-6*u,(w-8)*cl(o.dn/10,0,1),4*u);TxS(nmSgM(o,0,[' CAIDO '+Math.ceil(o.dn)+'s','#ff8a8a']),m+6,y+h/2-3*u,10*u,'left')}
else{X.fillStyle='#2a4a35';X.fillRect(m+4,y+h-6*u,w-8,4*u);X.fillStyle='hsl('+Math.round(cl(o.hp/MH,0,1)*120)+',72%,50%)';X.fillRect(m+4,y+h-6*u,(w-8)*cl(o.hp/MH,0,1),4*u);TxS(nmSgM(o),m+6,y+h/2-3*u,11*u,'left')}y+=h+3}hudA();hudTR('tm',_n0)}
if(p.dn>0&&!p.dead){Tx('VOCE CAIU! Espere um aliado ('+Math.ceil(p.dn)+'s)',W/2,m+56,16,'#ff8a8a');if(p.rvt>0)Tx('Sendo reanimado '+Math.round(p.rpg*100)+'%',W/2,m+78,14,'#7dff6a')}
if(p.rt){const bw=Math.min(240,W*.4),bx=W/2-bw/2,by=H*.55;X.fillStyle='rgba(19,15,13,.85)';X.fillRect(bx-3,by-3,bw+6,18);X.fillStyle='#7dff6a';X.fillRect(bx,by,bw*cl(p.rp/5,0,1),12);TxS(nmSg(p.rt,'Reanimando ',['...','#fff']),W/2,by-14,14,'center')}
if(p.hl&&!p.dead&&!p.rt){const k=p.hl.k=='k',pg=cl(1-p.hl.t/(p.hl.tt||(k?4:2)),0,1),bw=Math.min(110,W*.22),bx=W/2-bw/2,by=H*.58;X.fillStyle='rgba(19,15,13,.85)';X.fillRect(bx-2,by-2,bw+4,10);X.fillStyle=k?'#ff6a8a':'#7dff6a';X.fillRect(bx,by,bw*pg,6);Tx(k?'KIT':'BANDAGEM',W/2,by-9,10,'#fff')}
if(p.dead){const c=cfo();specHeal(c);Tx('Voce foi eliminado',W/2,m+56,16,'#ff8a8a');
if(c!==p){const q=BT.spc();X.fillStyle='rgba(19,15,13,.65)';X.strokeStyle='#ffd93b';X.lineWidth=4;X.beginPath();X.arc(q.x,q.y,q.r,0,7);X.fill();X.stroke();Tx('TROCAR',q.x,q.y,q.r*.36,'#fff');TxS(nmSg(c,'Assistindo '),W/2,H-14,14,'center')}}}
let MMc=null;
function buildMM(g){const n=300,c=document.createElement('canvas');c.width=c.height=n;const q=c.getContext('2d'),k=n/MSZ;
const gr=q.createLinearGradient(0,0,n,n);gr.addColorStop(0,'#41904c');gr.addColorStop(1,'#2b6638');q.fillStyle=gr;q.fillRect(0,0,n,n);q.save();q.translate(-MX0*k,-MY0*k);
q.fillStyle='rgba(15,55,28,.4)';for(const t of g.trees)q.fillRect(t.x*k-1,t.y*k-1,2,2);
q.fillStyle='rgba(196,172,118,.6)';for(const t of g.towns){q.beginPath();q.arc(t.x*k,t.y*k,620*k,0,7);q.fill()}
q.strokeStyle='rgba(214,194,146,.9)';q.lineWidth=2.4;for(const r of g.roads){q.beginPath();q.moveTo(r.a.x*k,r.a.y*k);q.lineTo(r.b.x*k,r.b.y*k);q.stroke()}
q.fillStyle='rgba(125,130,146,.95)';for(const w of g.walls)if(w.rk)q.fillRect(w.x*k,w.y*k,Math.max(1.5,w.w*k),Math.max(1.5,w.h*k));
for(const h of g.houses){q.fillStyle=h.rc;q.fillRect(h.x*k,h.y*k,Math.max(2.6,h.w*k),Math.max(2.6,h.h*k));q.strokeStyle='rgba(0,0,0,.45)';q.lineWidth=1;q.strokeRect(h.x*k,h.y*k,Math.max(2.6,h.w*k),Math.max(2.6,h.h*k))}
q.restore();q.strokeStyle='rgba(255,255,255,.13)';q.lineWidth=1;for(let i=1;i<4;i++){q.beginPath();q.moveTo(i*n/4,0);q.lineTo(i*n/4,n);q.moveTo(0,i*n/4);q.lineTo(n,i*n/4);q.stroke()}
MMc=c}
function drawMM(g,p,Z,pl,m){const ms=Math.min(g.room?105:150,W*(g.room?.24:.32)),mx=W-ms-m,my=m,k=ms/MSZ,ox=mx-MX0*k,oy=my-MY0*k,hot=g.sp.some(s=>s.l>2.1);MMR={mx,my,ms};
X.save();X.shadowColor='rgba(0,0,0,.55)';X.shadowBlur=12;X.shadowOffsetY=3;X.fillStyle='#0d1a13';X.beginPath();X.roundRect(mx-5,my-5,ms+10,ms+10,18);X.fill();X.restore();
X.save();X.beginPath();X.roundRect(mx,my,ms,ms,14);X.clip();
if(MMc)X.drawImage(MMc,mx,my,ms,ms);else{X.fillStyle='#2f6e3a';X.fillRect(mx,my,ms,ms)}
const zx=ox+Z.cx*k,zy=oy+Z.cy*k,zr=Math.max(.5,Z.r*k);
X.fillStyle='rgba(70,110,255,.32)';X.beginPath();X.rect(mx,my,ms,ms);X.moveTo(zx+zr,zy);X.arc(zx,zy,zr,0,6.2832);X.fill('evenodd');
X.strokeStyle='#7aa2ff';X.lineWidth=2;X.beginPath();X.arc(zx,zy,zr,0,6.2832);X.stroke();
if(Z.nx){X.strokeStyle='#fff';X.lineWidth=1.5;X.beginPath();X.arc(ox+Z.nx.cx*k,oy+Z.nx.cy*k,Z.nx.r*k,0,6.2832);X.stroke()}
if(pl.t<1){X.strokeStyle='#ffd93b';X.lineWidth=1.5;X.setLineDash([4,4]);X.beginPath();X.moveTo(ox+pl.ax*k,oy+pl.ay*k);X.lineTo(ox+pl.bx*k,oy+pl.by*k);X.stroke();X.setLineDash([]);X.fillStyle='#fff';X.strokeStyle='#0d1a13';X.lineWidth=1.5;X.beginPath();X.arc(ox+pl.x*k,oy+pl.y*k,4,0,6.2832);X.fill();X.stroke()}
if(g.room){for(const o of g.f){if(o.dead)continue;const bl=o.dn>0&&((g.t*4|0)&1),sp0=o===g.spec;X.fillStyle=o.col;X.strokeStyle=bl?'#ff3b3b':sp0?'#ffffff':'rgba(8,16,12,.85)';X.lineWidth=sp0?1.4:1;X.beginPath();X.arc(ox+o.x*k,oy+o.y*k,sp0?3:2.2,0,6.2832);X.fill();X.stroke()}}else for(const o of g.teams[p.tm].m)if(o!==p&&!o.dead){X.fillStyle=o.dn>0&&((g.t*4|0)&1)?'#ff3b3b':o.col;X.strokeStyle='#fff';X.lineWidth=1.5;X.beginPath();X.arc(ox+o.x*k,oy+o.y*k,3.6,0,6.2832);X.fill();X.stroke()}
for(const s of g.sp){const a=cl(s.l/2.5,0,1),px=ox+s.x*k,py=oy+s.y*k,pr=3+(1-a)*10;X.globalAlpha=a;X.strokeStyle='#ff2d2d';X.lineWidth=1.6;X.beginPath();X.arc(px,py,pr,0,6.2832);X.stroke();X.fillStyle='#ff2d2d';X.beginPath();X.arc(px,py,3.4,0,6.2832);X.fill();X.strokeStyle='#fff';X.lineWidth=1;X.beginPath();X.arc(px,py,3.4,0,6.2832);X.stroke()}X.globalAlpha=1;
for(const e of g.f){if(e.dead||!(e.mk>0)||e.st!='ground')continue;if(!g.room&&e.mkTm!==p.tm)continue;const ex=ox+e.x*k,ey=oy+e.y*k,pr=4+(g.t*6%1)*8;X.strokeStyle='#ff3b3b';X.lineWidth=1.6;X.globalAlpha=1-(pr-4)/8*.7;X.beginPath();X.arc(ex,ey,pr,0,6.2832);X.stroke();X.globalAlpha=1;X.fillStyle='#ff3b3b';X.beginPath();X.arc(ex,ey,3.8,0,6.2832);X.fill();X.strokeStyle='#fff';X.lineWidth=1.2;X.beginPath();X.moveTo(ex-3,ey-3);X.lineTo(ex+3,ey+3);X.moveTo(ex+3,ey-3);X.lineTo(ex-3,ey+3);X.stroke()}
for(const s of (g.shops||[])){const sx=ox+s.x*k,sy=oy+s.y*k;X.fillStyle='#ffd93b';X.strokeStyle='#0d1a13';X.lineWidth=1;X.beginPath();X.moveTo(sx,sy-3.8);X.lineTo(sx+3.8,sy);X.lineTo(sx,sy+3.8);X.lineTo(sx-3.8,sy);X.closePath();X.fill();X.stroke()}
for(const s of (g.sv||[])){const sx=ox+s.x*k,sy=oy+s.y*k,rd=s.cd<=0;X.fillStyle=rd?'#2fbf3f':'#59656b';X.strokeStyle='#fff';X.lineWidth=1;X.beginPath();X.arc(sx,sy,3.8,0,6.2832);X.fill();X.stroke();X.fillStyle='#fff';X.fillRect(sx-.9,sy-2.5,1.8,5);X.fillRect(sx-2.5,sy-.9,5,1.8);if(s.pg>0){X.strokeStyle='#ffd93b';X.lineWidth=1.5;X.beginPath();X.arc(sx,sy,5.6,-1.5708,-1.5708+6.2832*cl(s.pg/10,0,1));X.stroke()}}
for(const a of g.ad){if(a.st&&!a.has)continue;const ax=ox+a.x*k,ay=oy+a.y*k;X.fillStyle='#ffd93b';X.strokeStyle='#0d1a13';X.lineWidth=1.5;X.beginPath();X.rect(ax-4,ay-4,8,8);X.fill();X.stroke();if(!a.st){X.strokeStyle='#ff5a5a';X.beginPath();X.arc(ax,ay,7,0,6.2832);X.stroke()}}
const px=ox+(g.room?fc.x:p.x)*k,py=oy+(g.room?fc.y:p.y)*k;X.save();X.translate(px,py);X.fillStyle='rgba(255,255,255,.22)';X.beginPath();X.moveTo(0,0);X.arc(0,0,26,cyaw-.55,cyaw+.55);X.closePath();X.fill();
X.rotate(g.room?cyaw:p.ang);X.fillStyle=g.room?'#ffffff':'#ffd93b';X.strokeStyle='#0d1a13';X.lineWidth=1.6;X.beginPath();X.moveTo(7,0);X.lineTo(-4.5,4.6);X.lineTo(-2,0);X.lineTo(-4.5,-4.6);X.closePath();X.fill();X.stroke();X.restore();
X.restore();
X.strokeStyle=hot?'#ff3b3b':'#ff6600';X.lineWidth=3;X.beginPath();X.roundRect(mx,my,ms,ms,14);X.stroke();
Tx('N',mx+ms/2,my+10,10,'#fff')}
function roomHUD(g){const c=cfo(),T=g.teams[c.tm],m=12;X.setTransform(D,0,0,D,0,0);if(!fc.hide)Tx(g.sala?(fc.w?'SALA - ASSISTINDO':'SALA - CAMERA LIVRE'):(fc.w?'GUERRA DE CLÃS - ASSISTINDO':'GUERRA DE CLÃS - CAMERA LIVRE'),W/2,g.cs?m+104:m+36,13,'#fff');
let y=Math.max(m+120,H*.36);{const lb=T.cl?T.nm:'EQUIPE';Tx(lb,m+2,y-8,11,c.col,'left');if(T.cl)emb(X,m+2+X.measureText(lb).width+12,y-8,8,T.col,T.sym)}
for(const o of T.m){const w=140,h=20;TRW.push({x:m,y,w,h,T});hPan(m,y,w,h,6);if(o.dead){X.save();X.globalAlpha=.6;TxS(nmSgM(o,0,[' (fora)','#9aa8a0']),m+6,y+h/2,11,'left');X.restore()}else{X.fillStyle='#2a4a35';X.fillRect(m+4,y+h-6,w-8,4);X.fillStyle=o.col;X.fillRect(m+4,y+h-6,(w-8)*cl(o.hp/MH,0,1),4);TxS(nmSgM(o,0,o.dn>0?[' (caido)','#ff8a8a']:null),m+6,y+h/2-3,11,'left')}y+=h+3}

const q=BT.spc(),rr=q.r*(fc.hide?.6:1);X.save();X.shadowColor='#ff6600';X.shadowBlur=12;X.fillStyle='rgba(18,15,13,.82)';X.strokeStyle='#ff6600';X.lineWidth=fc.hide?3:4;X.beginPath();X.arc(q.x,q.y,rr,0,7);X.fill();X.stroke();X.restore();Tx('TROCAR',q.x,q.y,rr*(fc.hide?.5:.36),'#fff');
const bw=Math.min(240,W*.4),bx=W/2-bw/2,by=H-38;X.fillStyle='rgba(19,15,13,.85)';X.fillRect(bx-2,by-2,bw+4,14);X.fillStyle='#7dff6a';X.fillRect(bx,by,bw*cl(c.hp/MH,0,1),10);if(c.ar>0){X.fillStyle='#4aa3ff';X.fillRect(bx,by-5,bw*c.ar/50,3)}TxS(nmSg(c,'Assistindo ',[(c.ch?' - '+CHS[c.ch].n:'')+'  ('+c.kills+' elim.)','#fff']),W/2,H-14,14,'center');if(fc.w){specHeal(c);specInv(c)}roomExtra()}
function specHeal(c){if(!c||c.dead||!c.hl)return;const k=c.hl.k=='k',tot=c.hl.tt||(k?4:2),pg=cl(1-c.hl.t/tot,0,1),bw=Math.min(240,W*.4),bx=W/2-bw/2,by=H*.55;X.setTransform(D,0,0,D,0,0);X.fillStyle='rgba(19,15,13,.85)';X.fillRect(bx-3,by-3,bw+6,18);X.fillStyle=k?'#ff6a8a':'#7dff6a';X.fillRect(bx,by,bw*pg,12);TxS(nmSg(c,k?'Usando KIT MEDICO: ':'Usando bandagem: ',['  '+Math.round(pg*100)+'%','#fff']),W/2,by-14,14,'center')}
function specInv(c){if(!c)return;const bx=12,byb=H-24*U,ar=c.ar||0,hm=c.hm||0;X.setTransform(D,0,0,D,0,0);
hPan(bx,byb-2,176*U,16*U,6);X.fillStyle='#7dff6a';X.fillRect(bx+2,byb,172*U*cl(c.hp/MH,0,1),12*U);Tx(Math.max(0,Math.ceil(c.hp)),bx+88*U,byb+7*U,11*U,'#fff');
hPan(bx,byb-20*U,176*U,12*U,6);X.fillStyle='#4aa3ff';X.fillRect(bx+2,byb-18*U,172*U*cl(ar/50,0,1),8*U);icon(X,'v',bx+10*U,byb-14*U,8*U);Tx(ar>0?'Colete '+Math.ceil(ar):'Sem colete',bx+88*U,byb-14*U,8*U,'#fff');
hPan(bx+182*U,byb-20*U,76*U,12*U,6);icon(X,'h',bx+192*U,byb-14*U,8*U);X.fillStyle='#ffb43b';X.fillRect(bx+204*U,byb-18*U,52*U*cl(hm/30,0,1),8*U);Tx(hm>0?Math.ceil(hm):'Sem',bx+230*U,byb-14*U,8*U,'#fff');
for(let i=0;i<2;i++){const sx=bx+i*90*U,sy=byb-72*U,w=c.ws[i];X.fillStyle=c.cur==i?'rgba(255,102,0,.3)':'rgba(19,15,13,.84)';X.strokeStyle=c.cur==i?'#ff6600':(w!=null?TCOL[w]:'#b54800');X.lineWidth=3;X.beginPath();X.roundRect(sx,sy,84*U,46*U,8);X.fill();X.stroke();
if(w!=null){X.save();X.translate(sx+24*U,sy+23*U);drawW(X,w,34*U,skinOf(c,w));X.restore();Tx(c.mg[i],sx+62*U,sy+14*U,14*U,'#fff');if(WP[w].ak>=0)Tx(c.inf?'\u221e':c.res[WP[w].ak],sx+62*U,sy+33*U,11*U,AKC[WP[w].ak]);Tx(WP[w].n,sx+42*U,sy-6*U,9*U,TCOL[w])}else Tx('vazio',sx+42*U,sy+23*U,10*U,'#6a7a70')}
[['b',c.bd],['k',c.kt]].forEach((q,i)=>{const sx=bx+184*U+i*40*U,sy=byb-72*U;X.fillStyle='rgba(19,15,13,.84)';X.strokeStyle='#b54800';X.lineWidth=3;X.beginPath();X.roundRect(sx,sy,36*U,46*U,8);X.fill();X.stroke();icon(X,q[0],sx+18*U,sy+16*U,12*U);Tx(q[1]||0,sx+18*U,sy+36*U,13*U,'#fff')})}
function roomExtra(){
for(const b of RBL()){const id=b[0],x=b[1],y=b[2],on=fc.k==id;
if(id=='tg'){X.save();X.shadowColor='#ff6600';X.shadowBlur=9;if(fc.hide)X.globalAlpha=.3;X.fillStyle='rgba(19,15,13,.84)';X.strokeStyle='#ff6600';X.lineWidth=2.5;X.beginPath();X.roundRect(x-34,y-14,68,28,10);X.fill();X.stroke();Tx(fc.hide?'MOSTRAR':'OCULTAR',x,y,10,'#fff');X.restore();continue}
if(id=='tm'){X.save();X.shadowColor='#ff6600';X.shadowBlur=9;X.fillStyle=fc.tp?'rgba(255,102,0,.9)':'rgba(19,15,13,.84)';X.strokeStyle='#ff6600';X.lineWidth=2.5;X.beginPath();X.roundRect(x-34,y-14,68,28,10);X.fill();X.stroke();Tx('TIMES',x,y,10,fc.tp?'#15100d':'#fff');X.restore();continue}
if(id=='wt'){if(fc.hide)continue;X.save();X.shadowColor='#ff6600';X.shadowBlur=9;X.fillStyle=fc.w?'rgba(255,102,0,.9)':'rgba(19,15,13,.84)';X.strokeStyle='#ff6600';X.lineWidth=2.5;X.beginPath();X.roundRect(x-44,y-14,88,28,10);X.fill();X.stroke();Tx(fc.w?'CAM LIVRE':'ASSISTIR',x,y,10,fc.w?'#15100d':'#fff');X.restore();continue}
if(fc.hide||fc.w)continue;
X.save();X.shadowColor='#ff6600';X.shadowBlur=10;X.fillStyle=on?'rgba(255,102,0,.6)':'rgba(18,15,13,.8)';X.strokeStyle='#ff6600';X.lineWidth=3;X.beginPath();X.arc(x,y,20,0,7);X.fill();X.stroke();X.restore();X.fillStyle='#fff';X.beginPath();
if(id=='up'){X.moveTo(x-8,y+5);X.lineTo(x+8,y+5);X.lineTo(x,y-8)}else if(id=='dn'){X.moveTo(x-8,y-5);X.lineTo(x+8,y-5);X.lineTo(x,y+8)}else if(id=='lf'){X.moveTo(x+5,y-8);X.lineTo(x+5,y+8);X.lineTo(x-8,y)}else{X.moveTo(x-5,y-8);X.lineTo(x-5,y+8);X.lineTo(x+8,y)}X.fill()}
if(fc.tp){const gg=G,c=cfo(),n=gg.teams.length,pg=tpG(n);X.save();X.fillStyle='rgba(19,15,13,.88)';X.strokeStyle='#ff6600';X.lineWidth=2;X.beginPath();X.roundRect(pg.l,pg.t,pg.w,pg.h,10);X.fill();X.stroke();for(let i=0;i<n;i++){const t=gg.teams[i],b=tbtn(i,n),al=t.alive>0,on=c.tm==i;X.globalAlpha=al?1:.35;X.fillStyle=t.m[0].col;X.strokeStyle=on?'#ffffff':'#0d1a13';X.lineWidth=on?4:2.5;X.beginPath();X.arc(b.x,b.y,b.r,0,7);X.fill();X.stroke();X.globalAlpha=1;Tx(al?t.alive:'x',b.x,b.y,b.r*.95,'#fff')}X.restore()}
if(js.on){X.save();X.globalAlpha=hudAl();X.fillStyle='rgba(255,255,255,.12)';X.strokeStyle='rgba(255,255,255,.5)';X.lineWidth=3;X.beginPath();X.arc(js.ox,js.oy,46*U,0,7);X.fill();X.stroke();const l=Math.hypot(js.x-js.ox,js.y-js.oy),kk=Math.min(1,46*U/(l||1));X.fillStyle='rgba(255,255,255,.55)';X.beginPath();X.arc(js.ox+(js.x-js.ox)*kk,js.oy+(js.y-js.oy)*kk,22*U,0,7);X.fill();X.restore()}}
function lbTeams(g,m){if(!MMR)return;const ts=g.teams,my=g.room?cfo().tm:g.p.tm,n=g.room?3:5;
let L=g._lbC;if(!L||!g._lbT||g.t-g._lbT>.3||g._lbC.length!=ts.length){L=ts.map(t=>({t,k:t.m.reduce((a,o)=>a+(o.kills||0),0)}));L.sort((a,b)=>b.k-a.k||b.t.alive-a.t.alive||a.t.id-b.t.id);g._lbC=L;g._lbT=g.t}
const rows=L.slice(0,n).map((e,i)=>({e,r:i+1}));
if(!rows.some(q=>q.e.t.id==my)){const i=L.findIndex(e=>e.t.id==my);if(i>=0&&rows.length)rows[rows.length-1]={e:L[i],r:i+1}}
const w=Math.min(84,W*.15),rh=10,hh=10,bx=MMR.mx-8-w,by=m,hg=hh+rows.length*rh+3;
X.save();X.fillStyle='rgba(19,15,13,.5)';X.beginPath();X.roundRect(bx,by,w,hg,6);X.fill();
Tx('TOP TIMES',bx+w/2,by+6,7,'#ffba7d');
rows.forEach((q,i)=>{const y=by+hh+i*rh+5,t=q.e.t,al=t.alive>0,c=q.r==1?'#ffd93b':t.id==my?'#7dff6a':'#ffffff',nm=t.m.length==1?t.m[0].name:(t.cl?t.nm:'EQUIPE'),lb=q.r+'. '+nm;
X.globalAlpha=al?1:.5;Tx(lb,bx+4,y,7,c,'left');
if(t.m.length>1){const tw=X.measureText(lb).width;emb(X,bx+4+tw+8,y,5,t.col,t.sym)}
Tx(q.e.k,bx+w-4,y,7,c,'right')});
X.restore()}
let shOpen=null;
const shNear=()=>{const p=G&&G.p;if(!p||G.room||G.cs||p.dead||p.st!='ground'||p.dn>0||!G.shops)return null;for(const s of G.shops)if(Math.hypot(p.x-s.x,p.y-s.y)<s.r)return s;return null};
function shRender(msg){const p=G.p;$('shco').textContent='$ '+(p.mc|0);const L=$('shl');L.innerHTML='';const T=G.teams[p.tm].m.filter(o=>o!==p&&(o.dead||o.dn>0));
const IT2=[['k','Kit medico','Cura completa - voce tem '+p.kt+'/3',PR.k,p.kt>=3],['b','Bandagem','Cura rapida - voce tem '+p.bd+'/5',PR.b,p.bd>=5],['r','Rertun','Revive todos os aliados mortos ('+T.length+')',PR.r,!T.length]];
for(const [k,n,d,pr,off] of IT2){const r=document.createElement('div');r.className='it';r.innerHTML='<div>'+n+'<small>'+d+'</small></div>';const b=document.createElement('button');b.textContent='$ '+pr;b.disabled=off||(p.mc|0)<pr;b.onclick=()=>{if(shNear()&&buy1(p,k)){snd(620,.08,'triangle',.05,300);shRender(n+' comprado')}};r.appendChild(b);L.appendChild(r)}$('shm').textContent=msg||''}
function shClose(){shOpen=null;$('shp').style.display='none'}
function shToggle(){const s=shNear();if(!s||shOpen){shClose();return}shOpen=s;$('shp').style.display='block';shRender('')}
function shUI(){const b=$('shb'),sb=$('slb');domHud();{const ig=$('igb');if(ig)ig.style.display=(G&&mode=='play'&&!HE.on)?'block':'none'}if(!G||mode!='play'){b.style.display='none';sb.style.display='none';if(shOpen)shClose();return}{const q=G.p,ok=!G.room&&q&&!q.dead&&q.st=='ground'&&!(q.dn>0);sb.style.display='none';if(ok){sb.textContent=q.slc>0?Math.ceil(q.slc):'SLIDE';sb.style.opacity=q.slc>0?.5:1}}const s=shNear();b.style.display=s&&!shOpen?'block':'none';if(shOpen&&!s)shClose()}
$('slb').addEventListener('pointerdown',e=>{e.preventDefault();e.stopPropagation();if(G&&mode=='play'&&!G.room)slide(G.p)});$('shb').onclick=shToggle;$('shx').onclick=shClose;

/* ===== mini placar (kills/assistencias) ao tocar nos nomes da equipe ===== */
const TRW=[];let TRP=null;
function trHit(x,y){if(!G)return false;if(TRP&&G.kp&&x>=TRP.x&&x<=TRP.x+TRP.w&&y>=TRP.y&&y<=TRP.y+TRP.h){G.kp=null;return true}for(const r of TRW)if(x>=r.x&&x<=r.x+r.w&&y>=r.y&&y<=r.y+r.h){G.kp=G.kp===r.T?null:r.T;return true}return false}
function kaPanel(){const T=G.kp;if(!T)return;const f=TRW.find(r=>r.T===T);if(!f){G.kp=null;return}
const u=Math.max(.85,Math.min(1.2,W/700)),rh=19*u,pw=176*u,ph=rh*(T.m.length+1)+10*u,px=f.x+f.w+8,py=f.y;
TRP={x:px,y:py,w:pw,h:ph};X.save();X.fillStyle='rgba(19,15,13,.9)';X.strokeStyle='#ffd93b';X.lineWidth=2;X.beginPath();X.roundRect(px,py,pw,ph,10);X.fill();X.stroke();
let y=py+5*u+rh/2;Tx('JOGADOR',px+8*u,y,9*u,'#ffd93b','left');Tx('K',px+pw-52*u,y,9*u,'#ffd93b');Tx('A',px+pw-20*u,y,9*u,'#ffd93b');y+=rh;
for(const o of T.m){let n=(o.ctg&&o.cl&&o.bn?'['+o.ctg+'] '+o.bn:o.name)||'';if(n.length>11)n=n.slice(0,10)+'.';Tx(n,px+8*u,y,11*u,o.dead?'#9aa8a0':((o.yt||o.INF)?goldNm():'#fff'),'left');if(o.yt||o.INF){X.font='900 '+(11*u)+'px Trebuchet MS,Arial,sans-serif';TxS([['\u00a0\u00a0\u00a0\u00a0','#fff','yt']],px+8*u+X.measureText(n).width,y,11*u,'left')}Tx(o.kills||0,px+pw-52*u,y,12*u,'#ff8a8a');Tx(o.assists||0,px+pw-20*u,y,12*u,'#ffba7d');y+=rh}
X.restore()}
function render(){shUI();X.setTransform(D,0,0,D,0,0);X.clearRect(0,0,W,H);TRW.length=0;TRP=null;if(!G||mode=='menu')return;
if(G.vic){vicDraw();return}
const g=G,p=g.p,pl=g.pl,Z=g.Z;draw3d();overlay();if(!g.room)team2();
/* HUD */
X.setTransform(D,0,0,D,0,0);const m=12;hudB('st');
hPan(m,m,86,32,10);icon(X,'skull',m+19,m+16,10);Tx(g.alive,m+58,m+17,20,'#fff');
hPan(m+92,m,70,32,10);icon(X,'aim',m+112,m+16,10);Tx((g.room?cfo():p).kills,m+142,m+17,20,'#fff');if(!g.room&&!g.cs){hPan(m,m+38,92,28,10);X.fillStyle='#ffc400';X.strokeStyle='#b86e00';X.lineWidth=2;X.beginPath();X.arc(m+14,m+52,7,0,6.2832);X.fill();X.stroke();Tx(p.mc|0,m+56,m+53,16,'#ffd93b')}if(g.teams.length<g.f.length&&!g.cs){hPan(m+168,m,76,32,10);Tx('EQ '+g.ta,m+206,m+17,18,'#7dff6a')}
let fy=m+50;for(const f of g.feed.slice(-3)){X.globalAlpha=Math.min(1,f.l)*.92;TxS([].concat(f.ao?nmSg(f.ao):[[f.a,'#fff']],[[' '+(f.m||'eliminou')+' ','#fff']],f.hs?[['\u00a0\u00a0\u00a0\u00a0','#fff','sk'],[' ','#fff']]:[],f.bo?nmSg(f.bo):[[f.b,'#fff']]),m,fy,12,'left');fy+=17}X.globalAlpha=1;hudA();
hudB('mm');drawMM(g,g.room?cfo():p,Z,pl,m);if(!g.cs)lbTeams(g,m);hudA();hudMM();
const zt=Z.st=='wait'?'Zona fecha em '+Math.ceil(Z.wait-Z.t)+'s':Z.st=='shr'?'Zona fechando':'Zona final';if(g.cs)csHUD(g);else{hudB('zn');Tx(zt,W/2,m+14,14,'#cfe0ff');hudA()}
svHUD(g,p);if(g.room){roomHUD(g);kaPanel();return}kaPanel();
if(p.st=='plane'&&!p.dead)Tx('Toque em PULAR para saltar do onibus',W/2,m+36,13,'#fff');
/* bottom left: bars and slots */
const spv=p.dead?cfo():null;if(spv&&spv!==p){hudB('hp');specInv(spv);hudA()}else{hudB('hp');
const bx=m,byb=H-24*U;hBar(bx,byb-2,176*U,16*U,cl(p.hp/MH,0,1),'#a8ffbc','#14b54a');Tx(Math.max(0,Math.ceil(p.hp)),bx+88*U,byb+7*U,11*U,'#fff');
hBar(bx,byb-21*U,176*U,13*U,cl(p.ar/50,0,1),'#ffca9b','#1f78ff');hBar(bx+182*U,byb-21*U,76*U,13*U,cl((p.hm||0)/30,0,1),'#ffe08a','#ff9a1f');icon(X,'h',bx+192*U,byb-14.5*U,8*U);
for(let i=0;i<2;i++){const sx=bx+i*90*U,sy=byb-72*U;X.fillStyle=p.cur==i?'rgba(255,102,0,.28)':'rgba(19,15,13,.85)';X.strokeStyle=p.cur==i?'#ff6600':(p.ws[i]!=null?TCOL[p.ws[i]]:'#b54800');X.lineWidth=3;X.beginPath();X.roundRect(sx,sy,84*U,46*U,12);X.save();if(p.cur==i){X.shadowColor='#ff6600';X.shadowBlur=14}X.fill();X.stroke();X.restore();
const w=p.ws[i];if(w!=null){X.save();X.translate(sx+24*U,sy+23*U);drawW(X,w,34*U,skinOf(p,w));X.restore();Tx(p.mg[i],sx+62*U,sy+14*U,14*U,'#fff');if(WP[w].ak>=0)Tx(p.res[WP[w].ak],sx+62*U,sy+33*U,11*U,AKC[WP[w].ak]);Tx(WP[w].n,sx+42*U,sy-6*U,9*U,TCOL[w])}}
hudA()}
/* controls */
if(js.on){X.save();X.globalAlpha=hudAl();X.fillStyle='rgba(255,255,255,.12)';X.strokeStyle='rgba(255,255,255,.5)';X.lineWidth=3;X.beginPath();X.arc(js.ox,js.oy,46*U,0,7);X.fill();X.stroke();X.strokeStyle='rgba(255,255,255,.25)';X.lineWidth=1.5;X.beginPath();X.arc(js.ox,js.oy,30*U,0,7);X.stroke();const l=Math.hypot(js.x-js.ox,js.y-js.oy),kk=Math.min(1,46*U/(l||1));X.fillStyle='rgba(255,255,255,.55)';X.beginPath();X.arc(js.ox+(js.x-js.ox)*kk,js.oy+(js.y-js.oy)*kk,22*U,0,7);X.fill();X.restore()}
const btn=(b,fn,on)=>{X.save();X.globalAlpha=hudAl();btn0(b,fn,on);X.restore()};
const btn0=(b,fn,on)=>{const q=BT[b]();X.save();X.shadowColor=on?'rgba(255,102,0,.95)':'rgba(255,102,0,.55)';X.shadowBlur=on?24:14;X.shadowOffsetY=0;
const g1=X.createRadialGradient(q.x-q.r*.25,q.y-q.r*.35,q.r*.05,q.x,q.y,q.r);if(on){g1.addColorStop(0,'rgba(255,239,225,.96)');g1.addColorStop(1,'rgba(235,94,0,.92)')}else{g1.addColorStop(0,'rgba(55,44,37,.92)');g1.addColorStop(1,'rgba(14,11,9,.95)')}
X.fillStyle=g1;X.beginPath();X.arc(q.x,q.y,q.r,0,7);X.fill();X.restore();
X.strokeStyle=on?'#ffffff':'#ff6600';X.lineWidth=3;X.beginPath();X.arc(q.x,q.y,q.r,0,7);X.stroke();
X.save();X.strokeStyle=on?'rgba(255,255,255,.75)':'rgba(255,102,0,.5)';X.lineWidth=2;X.setLineDash([q.r*.3,q.r*.15]);X.beginPath();X.arc(q.x,q.y,q.r*.8,0,7);X.stroke();X.restore();
if(b=='rld'&&p.rl>0){const tot=WP[p.ws[p.rlw]||0].rl||1;X.strokeStyle='#7dff6a';X.lineWidth=5;X.beginPath();X.arc(q.x,q.y,q.r+6,-1.5708,-1.5708+6.2832*(1-cl(p.rl/tot,0,1)));X.stroke()}
if(b=='atk'&&p.cd>.05){const tot=WP[p.ws[p.cur]||0].cd||1;X.strokeStyle='#ff9d3b';X.lineWidth=5;X.beginPath();X.arc(q.x,q.y,q.r+6,-1.5708,-1.5708+6.2832*(1-cl(p.cd/tot,0,1)));X.stroke()}
X.save();X.translate(q.x,q.y);if(b=='hab')X.scale(.7,.7);fn(q.r);X.restore()};
if(p.st=='plane'&&!p.dead)btn('jmp',r=>{icon(X,'plane',0,-r*.15,r*.3,0);Tx('PULAR',0,r*.45,r*.3,'#fff')},0);
else if(!p.dead&&!(p.dn>0)){const wi=p.ws[p.cur]||0;btn('atk',r=>drawW(X,wi,r*1.1,skinOf(p,wi)),aA.on);
btn('rld',r=>{X.strokeStyle='#fff';X.lineWidth=4;X.beginPath();X.arc(0,0,r*.42,.6,5.4);X.stroke();X.fillStyle='#fff';X.beginPath();X.moveTo(r*.42,-r*.45);X.lineTo(r*.75,-r*.1);X.lineTo(r*.2,-r*.1);X.fill()},p.rl>0);
btn('swp',r=>{X.strokeStyle='#fff';X.lineWidth=4;X.beginPath();X.moveTo(-r*.5,-r*.2);X.lineTo(r*.5,-r*.2);X.moveTo(r*.5,r*.2);X.lineTo(-r*.5,r*.2);X.stroke();X.fillStyle='#fff';X.beginPath();X.moveTo(r*.5,-r*.5);X.lineTo(r*.8,-r*.2);X.lineTo(r*.5,.1);X.fill();X.beginPath();X.moveTo(-r*.5,r*.5);X.lineTo(-r*.8,r*.2);X.lineTo(-r*.5,-r*.1);X.fill()},0);
if(p.ch==3)btn('hab',r=>{X.fillStyle='#7dff6a';X.strokeStyle='#0d1a13';X.lineWidth=3;X.beginPath();X.arc(0,r*.12,r*.34,0,7);X.fill();X.stroke();X.fillStyle='#ddd';X.fillRect(-r*.1,-r*.5,r*.2,r*.28);X.strokeRect(-r*.1,-r*.5,r*.2,r*.28);if(p.hcd>0)Tx(Math.ceil(p.hcd),0,r*.1,r*.6,'#fff');else Tx('CURA',0,r*.62,r*.25,'#fff')},0);
if(p.ch==2)btn('hab',r=>{X.fillStyle='#9cff4a';X.strokeStyle='#0d1a13';X.lineWidth=3;X.beginPath();for(let i=0;i<16;i++){const a=i/16*6.2832,rd=i%2?r*.3:r*.55;X.lineTo(Math.cos(a)*rd,Math.sin(a)*rd)}X.closePath();X.fill();X.stroke();if(p.hcd>0)Tx(Math.ceil(p.hcd),0,0,r*.7,'#fff');else Tx('ESPINHO',0,r*.62,r*.24,'#fff')},0);
if(p.ch==4)btn('hab',r=>{X.fillStyle='#2a1030';X.strokeStyle='#c07bff';X.lineWidth=3;X.beginPath();X.moveTo(0,r*.2);X.quadraticCurveTo(-r*.3,-r*.5,-r*.6,-r*.1);X.lineTo(-r*.4,r*.05);X.lineTo(-r*.2,-r*.05);X.lineTo(0,r*.25);X.lineTo(r*.2,-r*.05);X.lineTo(r*.4,r*.05);X.lineTo(r*.6,-r*.1);X.quadraticCurveTo(r*.3,-r*.5,0,r*.2);X.fill();X.stroke();if(p.hcd>0)Tx(Math.ceil(p.hcd),0,0,r*.7,'#fff');else Tx('MORCEGO',0,r*.62,r*.2,'#fff')},0);
if(p.ch==5)btn('hab',r=>{X.fillStyle='#aab3c0';X.strokeStyle='#0d1a13';X.lineWidth=3;X.beginPath();X.roundRect(-r*.5,-r*.3,r*.7,r*.32,r*.06);X.fill();X.stroke();X.beginPath();X.roundRect(r*.1,-r*.5,r*.4,r*.34,r*.06);X.fill();X.stroke();X.fillStyle='#ff3b3b';X.fillRect(r*.32,-r*.4,r*.1,r*.1);X.fillStyle='#444';X.fillRect(-r*.42,0,r*.12,r*.22);X.fillRect(r*.04,0,r*.12,r*.22);X.fillStyle='#ffb300';X.fillRect(-r*.3,-r*.42,r*.22,r*.14);if(p.hcd>0)Tx(Math.ceil(p.hcd),0,0,r*.7,'#fff');else Tx('CAO',0,r*.62,r*.3,'#fff')},0);
if(p.ch==6)btn('hab',r=>{X.fillStyle='#f7f9fc';X.strokeStyle='#0d1a13';X.lineWidth=3;X.beginPath();X.arc(0,-r*.05,r*.42,0,7);X.fill();X.stroke();X.fillStyle='#e53935';X.fillRect(-r*.09,-r*.3,r*.18,r*.5);X.fillRect(-r*.28,-r*.14,r*.56,r*.18);if(p.hcd>0)Tx(Math.ceil(p.hcd),0,0,r*.7,'#0d1a13');else Tx('AREA',0,r*.66,r*.28,'#fff')},(G.ev||[]).some(z=>z.o===p));
if(p.ch==10)btn('hab',r=>{X.fillStyle='#ff7a00';X.strokeStyle='#0d1a13';X.lineWidth=3;X.beginPath();X.ellipse(0,r*.02,r*.5,r*.42,0,0,7);X.fill();X.stroke();X.fillStyle='#ffe14a';X.beginPath();X.moveTo(-r*.28,-r*.1);X.lineTo(-r*.1,-r*.1);X.lineTo(-r*.19,-r*.28);X.fill();X.beginPath();X.moveTo(r*.1,-r*.1);X.lineTo(r*.28,-r*.1);X.lineTo(r*.19,-r*.28);X.fill();X.fillRect(-r*.24,r*.08,r*.48,r*.1);X.fillStyle='#3a6a1a';X.fillRect(-r*.05,-r*.55,r*.1,r*.14);const u=p.pxu===undefined?2:p.pxu;if(p.hcd>0)Tx(Math.ceil(p.hcd),0,0,r*.7,'#fff');else Tx(u>0?'x'+u:'ZERO',0,r*.66,r*.28,'#fff')},0);
if(p.ch==11)btn('hab',r=>{X.fillStyle='#ffe14a';X.strokeStyle='#0d1a13';X.lineWidth=3;X.beginPath();X.moveTo(r*.14,-r*.52);X.lineTo(-r*.3,r*.06);X.lineTo(-r*.04,r*.06);X.lineTo(-r*.16,r*.5);X.lineTo(r*.32,-r*.1);X.lineTo(r*.06,-r*.1);X.closePath();X.fill();X.stroke();if(p.hcd>0)Tx(Math.ceil(p.hcd),0,0,r*.7,'#fff');else Tx('RAIO',0,r*.66,r*.26,'#fff')},0);
if(p.ch==9)btn('hab',r=>{X.fillStyle='#ffb347';X.strokeStyle='#0d1a13';X.lineWidth=3;X.beginPath();X.moveTo(r*.12,-r*.52);X.lineTo(-r*.28,r*.06);X.lineTo(-r*.02,r*.06);X.lineTo(-r*.14,r*.5);X.lineTo(r*.3,-r*.1);X.lineTo(r*.04,-r*.1);X.closePath();X.fill();X.stroke();if(p.rb>0)Tx(Math.ceil(p.rb),0,0,r*.7,'#fff');else if(p.hcd>0)Tx(Math.ceil(p.hcd),0,0,r*.7,'#fff');else Tx('VELOZ',0,r*.66,r*.24,'#fff')},p.rb>0);
if(p.ch==8)btn('hab',r=>{X.fillStyle='rgba(255,186,125,.3)';X.strokeStyle='#ffba7d';X.lineWidth=3;X.beginPath();X.arc(0,0,r*.5,0,7);X.fill();X.stroke();X.fillStyle='#ff6600';X.fillRect(-r*.12,-r*.12,r*.24,r*.24);const ac=(G.cz||[]).find(z=>z.o===p);if(ac)Tx(Math.ceil(ac.t),0,0,r*.7,'#fff');else if(p.hcd>0)Tx(Math.ceil(p.hcd),0,0,r*.7,'#fff');else Tx('CLONO',0,r*.66,r*.24,'#fff')},(G.cz||[]).some(z=>z.o===p));
if(p.ch==7)btn('hab',r=>{X.fillStyle='#2a2a33';X.strokeStyle='#cfd3ff';X.lineWidth=3;X.beginPath();for(let i=0;i<8;i++){const a=i/8*6.2832-1.5708,rd=i%2?r*.2:r*.55;X.lineTo(Math.cos(a)*rd,Math.sin(a)*rd)}X.closePath();X.fill();X.stroke();X.fillStyle='#cfd3ff';X.beginPath();X.arc(0,0,r*.08,0,7);X.fill();if(p.invis>0)Tx(Math.ceil(p.invis),0,0,r*.7,'#fff');else if(p.hcd>0)Tx(Math.ceil(p.hcd),0,0,r*.7,'#fff');else Tx('SUMIR',0,r*.66,r*.24,'#fff')},p.invis>0);
if(p.ch==1)btn('hab',r=>{X.save();X.rotate(-.35);X.fillStyle='#ffcc00';X.strokeStyle='#0d1a13';X.lineWidth=3;X.beginPath();X.roundRect(-r*.6,-r*.14,r*1.2,r*.28,r*.14);X.fill();X.stroke();X.fillStyle='#fff';X.beginPath();X.arc(-r*.38,r*.3,r*.1,0,7);X.arc(r*.38,r*.3,r*.1,0,7);X.fill();X.restore();if(p.hcd>0)Tx(Math.ceil(p.hcd),0,0,r*.7,'#fff');else Tx('DASH',0,r*.6,r*.3,'#fff')},p.sk2>0);
btn('ban',r=>{icon(X,'b',0,-2,r*.5,0);Tx(p.bd,r*.55,r*.55,r*.5,'#fff')},p.hl&&p.hl.k=='b');
btn('kit',r=>{icon(X,'k',0,-2,r*.5,0);Tx(p.kt,r*.55,r*.55,r*.5,'#fff')},p.hl&&p.hl.k=='k');
btn('ice',r=>{X.save();if(p.ic<=0)X.globalAlpha=.5;X.strokeStyle='#ffddbf';X.lineWidth=3.5;X.lineCap='round';for(let i=0;i<3;i++){const a=i/3*Math.PI+.3;X.beginPath();X.moveTo(Math.cos(a)*r*.52,Math.sin(a)*r*.52);X.lineTo(-Math.cos(a)*r*.52,-Math.sin(a)*r*.52);X.stroke()}X.restore();X.strokeStyle='#ffba7d';X.lineWidth=5;X.beginPath();X.arc(0,0,r+6,-1.5708,-1.5708+6.2832*(p.ic>=3?1:cl(p.ict/ICE.rc,0,1)));X.stroke();Tx(p.ic,r*.55,r*.55,r*.5,'#fff')},p.icd>0);
btn('eye',r=>{X.strokeStyle='#fff';X.lineWidth=3;X.beginPath();X.ellipse(0,0,r*.65,r*.38,0,0,7);X.stroke();X.fillStyle='#fff';X.beginPath();X.arc(0,0,r*.2,0,7);X.fill()},fl.on);btn('ads',r=>{X.strokeStyle='#fff';X.lineWidth=4;X.beginPath();X.arc(0,0,r*.42,0,7);X.moveTo(-r*.7,0);X.lineTo(-r*.2,0);X.moveTo(r*.7,0);X.lineTo(r*.2,0);X.moveTo(0,-r*.7);X.lineTo(0,-r*.2);X.moveTo(0,r*.7);X.lineTo(0,r*.2);X.stroke()},ads);sgChips();btn('hop',r=>{X.fillStyle='#fff';X.beginPath();X.moveTo(0,-r*.55);X.lineTo(r*.6,r*.15);X.lineTo(-r*.6,r*.15);X.fill();X.fillRect(-r*.2,r*.1,r*.4,r*.4)},p.jh>0);if(!g.room)btn('sld',r=>{if(p.slc>0){Tx(Math.ceil(p.slc),0,0,r*.7,'#fff');return}X.strokeStyle='#fff';X.lineWidth=3;X.lineCap='round';X.beginPath();X.moveTo(-r*.55,-r*.12);X.lineTo(-r*.15,-r*.12);X.moveTo(-r*.65,r*.05);X.lineTo(-r*.25,r*.05);X.stroke();X.fillStyle='#fff';X.beginPath();X.roundRect(-r*.1,-r*.3,r*.6,r*.32,r*.12);X.fill();Tx('SLIDE',0,r*.62,r*.26,'#fff')},p.slc>0);if(g.pk)btn('pik',r=>{drawW(X,g.pk.id,r*1.1)},0);
if(p.rt||nearDown(p))btn('rev',r=>{icon(X,'k',0,-r*.12,r*.42,0);Tx(p.rt?(5-p.rp).toFixed(1)+'s':'REVIVER',0,r*.55,r*.27,'#fff')},!!p.rt)}}
let lt=performance.now();function loop(t){requestAnimationFrame(loop);if(QI&&t-qLast<QI-2)return;qLast=t;const dt=Math.min(QDT,Math.max(0,(t-lt)/1000))||.016;lt=t;gdt=dt;try{qMeter(t)}catch(_){}try{const pz_=(mode=='play'&&(HE.on||!$('set').classList.contains('hide')))||(pv&&mode!='play');if(G&&(mode=='play'||mode=='end')&&!pz_&&!G.vic)upd(dt);if(G&&G.kc&&G.kc.on&&!pz_&&!G.vic)kcStep(dt);const kv=G&&G.kc&&G.kc.on?kcApply():null;try{if(!pz_){render();window.rpCap&&window.rpCap()}}finally{if(kv)kcRestore(kv)}if(kv)kcBanner()}catch(err){console.error(err);X.setTransform(D,0,0,D,0,0);X.fillStyle='#fff';X.font='12px monospace';X.textAlign='left';X.fillText('Erro: '+err.message,10,H-10)}}

/* botao X no cabecalho fixo dos paineis */
document.querySelectorAll('.pn').forEach(pn=>{const ph=pn.querySelector('.ph'),cb=pn.querySelector('[data-close]');if(!ph||!cb)return;const b=document.createElement('button');b.className='xb2';b.type='button';b.innerHTML='<svg class="ic"><use href="#i-close"/></svg>';b.onclick=()=>cb.click();ph.appendChild(b)});
init3();rs();$('rec').textContent='Vitorias: '+wins;$('coins').textContent=fmt(coins);requestAnimationFrame(loop);
