/* ===== efeitos visuais de acerto por skin (nao afetam jogabilidade) ===== */
function hitFx(x,y,id,a,cp){try{const g=G,s=SK[id];if(!s||!g)return;const cf=cfo();if(cf&&Math.hypot(cf.x-x,cf.y-y)>(g.rk?600:1100))return;if(g.pt.length>(g.rk?40:300)&&(g.rk||R()<.6))return;
const P=s.p2,pick=()=>P[R()*P.length|0],H=g.hl||(g.hl=[]);
const dots=(n,sp,u,l,h0,cs)=>{if(g.rk)n=Math.ceil(n*.3);for(let i=0;i<n;i++){const an=R()*6.283,v=rr(sp*.3,sp);g.pt.push({x,y,vx:Math.cos(an)*v,vy:Math.sin(an)*v,l:rr(l*.7,l),m:l,c:cs?cs[R()*cs.length|0]:pick(),u,h:h0||34})}};
const line=(pts,col,l,w)=>{if(H.length<(g.rk?3:20))H.push({p:pts,c:col,l,m:l,w:w||2.2})};
const bolt=(len,seg,col)=>{const an=R()*6.283,d=len/seg;let px=x,py=y,ph=38;const pts=[[x,ph,y]];for(let k=0;k<seg;k++){const aa=an+rr(-.9,.9);px+=Math.cos(aa)*d;py+=Math.sin(aa)*d;ph=Math.max(8,ph+rr(-9,9));pts.push([px,ph,py])}line(pts,col||pick(),.22,2.4)};
const shard=(n,l0,l1,col)=>{for(let k=0;k<n;k++){const an=R()*6.283,d0=rr(4,10),d1=rr(l0,l1),hh=rr(30,50);line([[x+Math.cos(an)*d0,hh,y+Math.sin(an)*d0],[x+Math.cos(an)*d1,hh+rr(-6,10),y+Math.sin(an)*d1]],col||pick(),.28,2.2)}};
const star=r=>{const hh=rr(34,54),ox=x+rr(-14,14),oy=y+rr(-14,14);line([[ox-r,hh,oy],[ox+r,hh,oy]],pick(),.3,1.8);line([[ox,hh-r,oy],[ox,hh+r,oy]],pick(),.3,1.8)};
const ring=(r,n,col)=>{const pts=[];for(let k=0;k<=n;k++){const an=k/n*6.283;pts.push([x+Math.cos(an)*r,26,y+Math.sin(an)*r])}line(pts,col||pick(),.3,2)};
const slash=col=>{const an=R()*6.283,ca=Math.cos(an)*22,sa=Math.sin(an)*22;line([[x-ca,62,y-sa],[x+ca,22,y+sa]],col||'#ffffff',.25,2.4);line([[x-sa,58,y+ca],[x+sa,26,y-ca]],col||pick(),.25,2)};
const flame=()=>{const rx=x+rr(-10,10),ry=y+rr(-10,10);line([[rx,24,ry],[rx+rr(-4,4),24+rr(26,44),ry+rr(-4,4)]],pick(),.35,3)};
switch(id){
case 1:dots(9,70,95,.55);flame();break;
case 2:shard(6,18,34,'#fff2e6');dots(5,60,20,.5);break;
case 3:bolt(40,3);bolt(34,3);dots(6,90,30,.4);break;
case 4:star(6);star(5);dots(7,70,70,.6);break;
case 5:dots(9,40,35,.8);break;
case 6:dots(9,90,-55,.55,38);break;
case 7:dots(7,35,60,.8);ring(18,8,'#ffd2aa');break;
case 8:dots(10,55,-22,1,44);break;
case 9:bolt(60,4);bolt(50,4);bolt(42,3);dots(5,110,10,.3,38,['#fff27a','#ffffff']);break;
case 10:dots(9,90,60,.6);break;
case 11:dots(9,50,-18,.9,44);break;
case 12:dots(13,110,-10,.8,40);break;
case 13:dots(10,80,15,.7,26);break;
case 14:slash();dots(5,70,10,.4);break;
case 15:shard(5,16,30,'#ffffff');star(6);dots(4,60,30,.5);break;
case 16:dots(7,32,40,.9,34,['#c9ced8','#ffffff']);ring(14,6,'#e0b060');break;
case 17:star(6);star(5);star(4);dots(6,45,20,.8);break;
case 18:dots(8,50,55,.7);ring(16,10);break;
case 19:dots(9,60,105,.7);flame();flame();break;
case 20:dots(7,22,28,1.1,36);break;
case 21:{for(let i=0;i<(g.rk?2:8);i++){const an=R()*6.283,d=rr(30,46);g.pt.push({x:x+Math.cos(an)*d,y:y+Math.sin(an)*d,vx:-Math.cos(an)*d*2.6,vy:-Math.sin(an)*d*2.6,l:.35,m:.35,c:pick(),u:20,h:34})}shard(3,14,26)}break;
case 22:dots(11,100,80,.7);flame();flame();ring(22,10,'#ff2a2a');slash('#ff3030');break;
case 23:dots(8,90,40,.6,34,['#2dffb0','#ffd23b']);shard(5,18,34,'#2dffb0');ring(18,10,'#ffd23b');break;
case 24:star(8);star(6);star(5);ring(20,12,'#fff3a0');dots(9,50,-24,1,48,['#ffffff','#fff3a0','#ffca9a']);break;
case 25:slash('#7dffb0');slash('#ffffff');dots(9,60,70,.9,36,['#7dffb0','#2a8a5a','#ffffff']);ring(16,8,'#7dffb0');break;
case 27:dots(8,60,40,.8,34,['#7dffcf','#7a8cff','#d9a8ff']);ring(16,10,'#7dffcf');star(5);break;
case 28:bolt(30,4);bolt(26,4);dots(8,80,10,.35,34);break;
case 29:dots(12,95,30,.6,30);ring(12,4,'#ffe14a');break;
case 30:shard(5,16,30,'#ffb02e');ring(18,6,'#ff6a1f');star(6);dots(6,60,50,.7);break;
default:if(s.fx=='evGold'){dots(10,95,45,.6,36);flame();bolt(30,3)}else if(s.fx=='evToxic'){dots(9,60,40,.7,36,['#39ff14','#9dff6a','#d8ffd0']);ring(14,6,'#39ff14')}else if(s.fx=='evArcane'){arcHit(x,y,a,cp)}else dots(8,90,50,.5)}}catch(e){}}
function boom(x,y,c,n,s){const g0=G;if(ABF&&n>3)n=Math.max(3,Math.round(n*.35));if(g0.rk){const cf=cfo();if(cf&&(Math.abs(cf.x-x)>650||Math.abs(cf.y-y)>650))return;if(g0.pt.length>=Math.min(QP,60))return;n=n>1?Math.max(1,Math.round(n*.25)):(R()<.25?1:0)}for(let i=0;i<n;i++){const a=R()*6.28,v=rr(30,s);G.pt.push({x,y,vx:Math.cos(a)*v,vy:Math.sin(a)*v,l:rr(.25,.6),m:.6,c:Array.isArray(c)?c[R()*c.length|0]:c,r:rr(2,4)})}}
function hurt(t,d,s,nc){if(t.dead||t.st!='ground'||t.inv>0)return;if(t.lgh>0)t.lgh=0;if(s&&s.isP&&t!==s&&s.tm!==t.tm&&PST.sid&&PST.sid!==PST.lh&&!G.room&&!G.sala){PST.lh=PST.sid;PST.ht++}if(!t.isP&&s&&s!==t&&s.tm!==t.tm){t.dmgT=G.t;t.dmgS=s}if(s&&s!==t&&s.bf)d*=1+s.bf;if(t.bf)d/=1+t.bf;if(G.cz&&G.cz.length)for(const z of G.cz)if(z.tm===t.tm&&Math.hypot(t.x-z.x,t.y-z.y)<z.r)return;if(t.hm>0){const a=Math.min(t.hm,d*(_crit?.6:.35));t.hm-=a;d-=a}if(t.ar>0){const a=Math.min(t.ar,d*.6);t.ar-=a;d-=a}
t.hp-=d;t.fl=.1;if(s&&!nc&&!(t.hl&&t.hl.k=='k'))t.hl=null;if(!t.isP&&t.hp>0&&t.hp<MH*.3&&G.t>(t.lwT||0)){t.lwT=G.t+rr(10,18);if(R()<.55)say(t,pick(LWL),.3)}if(s&&s!==t&&s.tm!==t.tm)(t.dmgBy||(t.dmgBy=new Map)).set(s,G.t);if(!t.isP&&(t.rt||t.rdn)&&s&&s!==t&&s.tm!==t.tm&&!s.dead){t.rvx=G.t+8;t.rdn=null;t.bko=.9;t.bkx=t.x-s.x;t.bky=t.y-s.y;t.vs=s;t.vsU=G.t+10;t.rt=null;t.rp=0}if(t.rt&&s&&!nc){t.rp=0;if(!t.isP&&s&&s!==t&&s.tm!==t.tm&&!s.dead){t.rt=null;t.vs=s;t.vsU=G.t+10}}if(s&&s!==t)s.rev=1.2;if(s&&s!==t&&s.tm!==t.tm&&!s.dead)alertAl(t,s); if(s&&s!==t&&s.tm!==t.tm&&!s.dead&&t.hp>0&&G.teams[s.tm]&&G.teams[s.tm].m.length>1)assistAl(s,t);
if(s&&s!==t&&s.tm!==t.tm&&specDmg(s)){const cr=_crit;dmgTx(t.x,t.y-32,''+Math.max(1,Math.round(d)),cr?'#ff1a1a':'#ffd93b',cr);if(cr&&s.isP)snd(1200,.08,'square',.05,200)}
if(t.isP)shk=Math.max(shk,6);hitS(t,s,d);
if(!t.isP&&t.hp>0&&t.hp<MH*.3&&G.t>(t.lowT||0)){t.lowT=G.t+15;say(t,pick(['Tô miado!','Tô na capa da gaita!','Tô com nada de vida!','Vou cair, me ajuda!','Tô fraco, me cobre!']))}
t.hsK=_crit?1:0;if(t.hp<=0){if(t.dn>0||!canDown(t))die(t,s);else knock(t,s)}}
function dropI(f,o){G.items.push(Object.assign({x:f.x+rr(-26,26),y:f.y+rr(-26,26)},o))}
function canDown(t){const T=G.teams[t.tm];return T.m.length>1&&T.m.some(o=>o!==t&&!o.dead&&!(o.dn>0))}
function wipe(tm){const T=G.teams[tm];if(T.m.some(o=>!o.dead&&!(o.dn>0)))return;for(const o of T.m)if(!o.dead&&o.dn>0)die(o,o.dk)}
function knock(t,s){t.dn=10;t.hp=100;t.dk=s&&s!==t?s:null;t.hl=null;t.bq=null;t.rl=0;t.rt=null;t.rp=0;t.rvt=0;t.rpg=0;t.cd=0;t.vx=0;t.vy=0;
if(t.isP){ads=0;aA.on=0;shk=10;snd(110,.3,'sawtooth',.08,-40)}
sayEv(t,s,1);boom(t.x,t.y,'#ff8a8a',12,150);wipe(t.tm)}
function revive(t,by){if(!by.isP)by.rsU=G.t+10;t.dn=0;t.hp=100;t.rvt=0;t.rpg=0;t.dk=null;t.fl=0;t.cd=.4;boom(t.x,t.y,'#7dff6a',16,170);if(t.isP||by.isP)snd(660,.2,'triangle',.06,300)}
function nearDown(p){let b=null,bd=110;for(const o of G.teams[p.tm].m)if(o!==p&&!o.dead&&o.dn>0&&o.st=='ground'){const d=dst(p,o);if(d<bd){bd=d;b=o}}return b}
function toggleRev(p){if(p.dead||p.dn>0||p.st!='ground')return;if(p.rt){p.rt=null;p.rp=0;return}const t=nearDown(p);if(t){p.rt=t;p.rp=0;p.hl=null}}
var mythRG=null,mythSG,mythCG,mythYG,mythTG;
function mythFx(x,y,k,v){const g=G;if(typeof gw=='undefined'||!gw)return;const fx=g.fx||(g.fx=[]);if(fx.length>3)return;
if(!mythRG){mythRG=new THREE.RingGeometry(.6,1,40);mythSG=new THREE.SphereGeometry(1,10,8);mythCG=new THREE.CircleGeometry(1,32);mythYG=new THREE.CylinderGeometry(1,1,1,12);mythTG=new THREE.TorusGeometry(1,.07,6,48)}
if(SK[k].ev)return evoDeath(x,y,k,v);
const F=SK[k].fx,grp=new THREE.Group(),ms=[];grp.position.set(x,0,y);gw.add(grp);
const mk=(c,o)=>new THREE.MeshBasicMaterial({color:c,transparent:true,opacity:o,depthWrite:false,side:THREE.DoubleSide}),
add=(geo,c,o,sx,sy,sz,px,py,pz,f)=>{const m=new THREE.Mesh(geo,mk(c,o));m.scale.set(sx,sy,sz);m.position.set(px,py,pz);m.userData={o,s0:sx,f};grp.add(m);ms.push(m);return m},
glow=m=>{m.material.blending=THREE.AdditiveBlending;return m},
ring=(c,o,sz,py)=>{const m=add(mythRG,c,o,sz,sz,1,0,py,0);m.rotation.x=-1.5708;m.userData.ex=1;return m},
e={grp,ms,t:0,l:2},E=(t,a,b)=>Math.max(0,Math.min(1,t/a,(e.l-t)/b)),P0=Math.PI;
if(dst({x,y},g.p)<700)shk=Math.max(shk,F=='void'||F=='bolt'?8:5);
/* ===== GALAXIA ESTELAR: nasce uma galaxia espiral onde o inimigo caiu ===== */
if(F=='galaxy'){e.l=3.8;const H=95,TL=.38,W=['#8a6bff','#ff8ad6','#ffffff','#ffb97a'],S=t=>Math.min(1,t/.7)*Math.max(0,Math.min(1,(e.l-t)/.7));
for(const [r,c,o,i] of [[205,'#5a2fd0',.24,0],[150,'#ff5fc4',.17,1],[105,'#ffb06a',.15,2]]){glow(add(mythCG,c,o,r,r,1,0,H,0,(m,t)=>{const s=S(t);m.scale.set(r*s+.01,r*s+.01,1);m.rotation.set(-1.5708+TL,0,t*(.25+i*.12));m.material.opacity=o*s}))}
for(let i=0;i<96;i++){const arm=i%2,r0=rr(14,178),sz=rr(2.6,6.5),c=W[i%4],ph=rr(0,6.28),of=rr(-.3,.3);glow(add(mythSG,c,1,sz,sz,sz,0,H,0,(m,t)=>{const s=S(t),a=arm*P0+r0*.034+of+t*(1.1-r0/230),r=r0*s*(1+.05*Math.sin(t*3+ph)),tw=.55+.45*Math.sin(t*9+ph);m.position.set(Math.cos(a)*r,H+Math.sin(a)*r*Math.sin(TL),-Math.sin(a)*r*Math.cos(TL));m.scale.setScalar(sz*.6*s*tw*(r0<40?1.3:1)+.01)}))}
glow(add(mythSG,'#ffffff',1,12,12,12,0,H,0,(m,t)=>{m.scale.setScalar(12*S(t)*(1+.12*Math.sin(t*8))+.01)}));
glow(add(mythSG,'#ff8ad6',.5,26,26,26,0,H,0,(m,t)=>{m.scale.setScalar(26*S(t)*(1+.15*Math.sin(t*6))+.01)}));
glow(add(mythSG,'#8a6bff',.28,54,54,54,0,H,0,(m,t)=>{m.scale.setScalar(54*S(t)+.01)}));
for(let i=0;i<5;i++){const t0=rr(.5,2.4),a=rr(0,6.28),hy=rr(-20,30);glow(add(BG,'#ffffff',1,2,2,30,0,H,0,(m,t)=>{const p=(t-t0)/.8;if(p<0||p>1){m.visible=false;return}m.visible=true;const r=30+p*270;m.position.set(Math.cos(a)*r,H+hy-p*30,Math.sin(a)*r);m.rotation.y=P0/2-a;m.material.opacity=1-p}))}
ring('#8a6bff',.8,200,2);ring('#ff8ad6',.6,120,3);
glow(add(mythSG,'#ffffff',0,20,20,20,0,H,0,(m,t)=>{const q=(t-(e.l-.55))/.55;if(q<0){m.visible=false;return}m.visible=true;m.scale.setScalar(20+q*100);m.material.opacity=.9*(1-q)}));
boom(x,y,W,60,420)}
/* ===== NEON COSMICO: portal neon que engole o corpo ===== */
else if(F=='neon'){e.l=2.7;const C=['#c07bff','#39ff9c','#ff4dd2'],H=68,face=rr(0,6.28),O=t=>E(t,.35,.45),ax=[Math.cos(face),-Math.sin(face)],nz=[Math.sin(face),Math.cos(face)];
[[62,0],[50,1],[38,2]].forEach(([r,i])=>{glow(add(mythTG,C[i],.95,r,r,r,0,H,0,(m,t)=>{m.scale.setScalar(r*O(t)+.01);m.rotation.set(0,face,(i%2?-1:1)*t*(1.5+i))}))});
add(mythCG,'#12002a',.9,58,58,1,0,H,0,(m,t)=>{const s=O(t);m.scale.set(58*s+.01,58*s+.01,1);m.rotation.set(0,face,0)});
for(let j=0;j<3;j++)glow(add(BG,C[j],.8,3,54,1,0,H,0,(m,t)=>{const s=O(t);m.scale.set(3,54*s+.01,1);m.rotation.set(0,face,t*3+j*2.09);m.position.set(nz[0]*1.5,H,nz[1]*1.5)}));
for(let i=0;i<30;i++){const t0=rr(.2,1.6),a0=rr(0,6.28),zo=rr(60,140)*(R()<.5?-1:1),c=C[i%3],sz=rr(3,7);glow(add(BG,c,1,sz,sz,sz,0,H,0,(m,t)=>{const p=(t-t0)/.9;if(p<0||p>1){m.visible=false;return}m.visible=true;const q=p*p,r=70*(1-q)+2,a=a0+p*5,lz=zo*(1-q);m.position.set(Math.cos(a)*r*ax[0]+lz*nz[0],H+Math.sin(a)*r,Math.cos(a)*r*ax[1]+lz*nz[1]);m.scale.setScalar(sz*(1-p*.7)+.01);m.rotation.set(t*6,t*5,0)}))}
for(let i=0;i<3;i++){const m=add(mythRG,C[i],.8,1,1,1,0,2+i,0,(m,t)=>{const p=(t-i*.35)/1.1;if(p<0||p>1){m.visible=false;return}m.visible=true;const s=30+p*210;m.scale.set(s,s,1);m.material.opacity=.9*(1-p)});m.rotation.x=-1.5708;glow(m)}
glow(add(BG,C[1],.5,8,420,8,0,210,0,(m,t)=>{const s=O(t);m.scale.set(8*s+.01,420*s+.01,8*s+.01);m.position.set(0,210*s,0)}));
glow(add(mythSG,'#ffffff',0,20,20,20,0,H,0,(m,t)=>{const q=(t-(e.l-.45))/.45;if(q<0){m.visible=false;return}m.visible=true;m.scale.setScalar(20+q*80);m.material.opacity=.9*(1-q)}));
boom(x,y,C,45,380)}
/* ===== OURO REAL: coroa real, raios de sol e chuva de moedas ===== */
else if(F=='gold'){e.l=3.4;const O=t=>E(t,.2,.7);
glow(add(BG,'#ffd23b',.35,80,1300,80,0,650,0,(m,t)=>{const s=O(t);m.scale.set(80*s+.01,1300,80*s+.01);m.material.opacity=.35*s}));
glow(add(BG,'#fff3a0',.85,26,1300,26,0,650,0,(m,t)=>{const s=O(t);m.scale.set(26*s+.01,1300,26*s+.01);m.material.opacity=.85*s}));
for(let i=0;i<10;i++){const a0=i*P0/5;glow(add(BG,'#fff3a0',.5,5,1.5,230,0,150,0,(m,t)=>{const a=a0+t*.6,s=O(t);m.position.set(Math.cos(a)*120,150,Math.sin(a)*120);m.rotation.y=P0/2-a;m.scale.set(5*s+.01,1.5,230*s+.01);m.material.opacity=.5*s*(.6+.4*Math.sin(t*5+i))}))}
const cy=t=>230+Math.sin(t*2)*6-Math.max(0,t-.4)*8,cs=t=>E(t,.4,.7);
for(let i=0;i<8;i++){const a0=i*P0/4,ps=(m,t,rd,dy,w,h,d)=>{const a=a0+t*1.6,s=cs(t);m.position.set(Math.cos(a)*rd*s,cy(t)+dy*s,Math.sin(a)*rd*s);m.rotation.y=P0/2-a;m.scale.set(w*s+.01,h*s+.01,d*s+.01)};
add(BG,'#ffd23b',1,12,9,4,0,0,0,(m,t)=>ps(m,t,24,0,12,9,4));
add(BG,'#ffe27a',1,5,16,5,0,0,0,(m,t)=>ps(m,t,24,12,5,16,5));
add(mythSG,i%2?'#ffffff':'#ff3b5c',1,3.6,3.6,3.6,0,0,0,(m,t)=>ps(m,t,24,22,3.6,3.6,3.6));
if(i%3==0)add(mythSG,i%2?'#ff893b':'#ff3b5c',1,3.2,3.2,3.2,0,0,0,(m,t)=>ps(m,t,26.5,0,3.2,3.2,3.2))}
for(let i=0;i<40;i++){const d=rr(.15,1.9),a=rr(0,6.28),r=rr(8,175),sp=rr(5,11);add(mythYG,'#ffd23b',1,6,1.4,6,0,0,0,(m,t)=>{const tau=t-d;if(tau<0){m.visible=false;return}m.visible=true;const g0=450,y0=700,tl=Math.sqrt((y0-4)/g0);let yy;if(tau<tl)yy=y0-g0*tau*tau;else{const b=tau-tl;yy=4+Math.abs(Math.sin(b*5))*50*Math.exp(-b*2.2)}m.position.set(Math.cos(a)*r,yy,Math.sin(a)*r);m.rotation.set(tau<tl?tau*sp:0,tau*sp*.6,0);const fo=Math.min(1,(e.l-t)/.6);m.scale.set(6*fo+.01,1.4*fo+.01,6*fo+.01)})}
for(let i=0;i<16;i++){const m=add(mythYG,'#ffd23b',1,8,2,8,0,20,0),a=R()*6.28,v=rr(100,360);m.rotation.x=1.2;m.userData.v=[Math.cos(a)*v,rr(420,820),Math.sin(a)*v]}
for(let i=0;i<30;i++){const a=rr(0,6.28),r=rr(20,170),h=rr(30,320),ph=rr(0,6.28);glow(add(BG,i%2?'#ffffff':'#ffe27a',1,5,5,5,Math.cos(a)*r,h,Math.sin(a)*r,(m,t)=>{const tw=Math.max(0,Math.sin(t*6+ph));m.scale.setScalar(6*tw*O(t)+.01);m.rotation.set(t,t*2,t*3)}))}
ring('#ffd23b',.8,150,2);ring('#fff3a0',.6,90,3);ring('#ffb02e',.5,230,4);boom(x,y,['#ffd23b','#fff3a0','#ffb02e'],60,380)}
/* ===== TROVAO ELETRICO: tempestade com tres raios, cratera e arcos ===== */
else if(F=='bolt'){e.l=3.1;const T=[.25,.75,1.3],Z3=new THREE.Vector3(0,0,1),flash=t=>T.some(b=>t>b&&t<b+.13);
for(let i=0;i<14;i++){const a=rr(0,6.28),r=rr(0,85),bc=['#262b4d','#343a66','#2f2a26'][i%3],sz=rr(38,62);add(mythSG,bc,.92,sz,sz*.6,sz,Math.cos(a)*r,470+rr(-15,25),Math.sin(a)*r,(m,t)=>{const s=E(t,.4,.6);m.scale.set(sz*s+.1,sz*.6*s+.1,sz*s+.1);m.material.color.set(flash(t)?'#8fa6ff':bc)})}
const seg=(a,b,wd,tb,dur)=>{const d=new THREE.Vector3(b[0]-a[0],b[1]-a[1],b[2]-a[2]),len=d.length()||1,q=new THREE.Quaternion().setFromUnitVectors(Z3,d.clone().normalize());
for(const [w,c,o] of [[wd,'#ffffff',1],[wd*3.4,'#6ab8ff',.35]]){const m=glow(add(BG,c,o,w,w,len,(a[0]+b[0])/2,(a[1]+b[1])/2,(a[2]+b[2])/2,(m,t)=>{const p=t-tb,on=p>0&&p<dur;m.visible=on&&(p<.07||Math.sin(p*90)>-.3);m.material.opacity=o*Math.max(0,1-p/dur)}));m.quaternion.copy(q)}};
const mkBolt=(tb,px,pz,wd,dur)=>{let a=[px+rr(-40,40),470,pz+rr(-40,40)];const N=8;for(let i=1;i<=N;i++){const b=i==N?[px,0,pz]:[px+rr(-70,70)*(1-i/N),470-i*470/N,pz+rr(-70,70)*(1-i/N)];seg(a,b,wd,tb,dur);if(i==3&&wd>6){let f=a;const dx=rr(-1,1)*50,dz=rr(-1,1)*50;for(let j=1;j<=3;j++){const fb=[f[0]+dx*.5+rr(-14,14),f[1]-60,f[2]+dz*.5+rr(-14,14)];seg(f,fb,wd*.45,tb,dur*.8);f=fb}}a=b}
glow(add(mythSG,'#ffffff',0,30,30,30,px,25,pz,(m,t)=>{const p=(t-tb)/.35;if(p<0||p>1){m.visible=false;return}m.visible=true;m.scale.setScalar(30+p*(wd>10?120:60));m.material.opacity=.9*(1-p)}));
const rm=add(mythRG,'#6ab8ff',.8,1,1,1,px,3,pz,(m,t)=>{const p=(t-tb)/.8;if(p<0||p>1){m.visible=false;return}m.visible=true;const s=20+p*(wd>10?230:130);m.scale.set(s,s,1);m.material.opacity=.85*(1-p)});rm.rotation.x=-1.5708;glow(rm)};
mkBolt(T[0],rr(60,100),rr(-80,80),5,.2);mkBolt(T[1],-rr(60,100),rr(-80,80),8,.3);mkBolt(T[2],0,0,16,.45);
const sc=add(mythCG,'#0c0b0a',.65,1,1,1,0,1,0,(m,t)=>{const s=Math.min(1,Math.max(0,(t-T[2])/.3));m.scale.set(90*s+.1,90*s+.1,1);m.material.opacity=.65*Math.min(1,(e.l-t)/.6)});sc.rotation.x=-1.5708;
for(let i=0;i<16;i++){const a=rr(0,6.28),r=rr(30,100),c=i%2?'#ffffff':'#6ab8ff';glow(add(BG,c,1,24,2,3,0,3,0,(m,t)=>{const q=Math.floor(t*14+i*3),h=Math.abs(Math.sin(q*12.98+i)*43758.5)%1;m.visible=t>T[2]&&t<e.l-.3&&h>.5;m.position.set(Math.cos(a+h)*r,3,Math.sin(a+h)*r);m.rotation.y=h*6.28}))}
for(let i=0;i<50;i++){const rx=rr(-220,220),rz=rr(-220,220),off=rr(0,520);add(BG,'#9fc8ff',.5,1,18,1,rx,0,rz,(m,t)=>{m.position.set(rx,500-((t*720+off)%520),rz);m.scale.set(1,18*E(t,.3,.5)+.01,1)})}
boom(x,y,['#fff27a','#6ab8ff','#ffffff'],55,420)}
/* ===== DRAGAO CELESTIAL: dragao de jade espirala ate o ceu ===== */
else if(F=='dragon'){e.l=3.9;const Pd=u=>{const th=u*3.8,R2=Math.min(1,u*1.3)*(62+8*Math.sin(u*3)),yy=8+90*Math.pow(Math.max(u,0),1.3);return[Math.cos(th)*R2,yy,Math.sin(th)*R2]},N=30,UH=t=>t*1.05,FO=t=>Math.min(1,Math.max(0,(e.l-t)/.7));
const fr=u=>{const a=Pd(u),b=Pd(u+.03);let fx_=b[0]-a[0],fy_=b[1]-a[1],fz_=b[2]-a[2];const l=Math.hypot(fx_,fy_,fz_)||1;fx_/=l;fy_/=l;fz_/=l;let rx=fz_,rz=-fx_;const rl=Math.hypot(rx,rz)||1;rx/=rl;rz/=rl;return{a,f:[fx_,fy_,fz_],r:[rx,0,rz],u:[fy_*rz,fz_*rx-fx_*rz,-fy_*rx]}};
for(let i=1;i<N;i++){const sz=15*(1-i/N*.62)+3,c=i%4==0?'#ffd23b':i%2?'#2dffb0':'#14b27d';
add(mythSG,c,1,sz,sz,sz,0,0,0,(m,t)=>{const u=UH(t)-i*.055;if(u<0){m.visible=false;return}m.visible=true;const p=Pd(u);m.position.set(p[0],p[1],p[2]);m.scale.setScalar(sz*Math.min(1,u*5)*FO(t)+.01)});
if(i%3==0)add(BG,'#ffd23b',1,3,sz*.9,5,0,0,0,(m,t)=>{const u=UH(t)-i*.055;if(u<0){m.visible=false;return}m.visible=true;const p=Pd(u);m.position.set(p[0],p[1]+sz*.8,p[2]);const s=FO(t)*Math.min(1,u*5);m.scale.set(3*s+.01,sz*.9*s+.01,5*s+.01)})}
const head=add(BG,'#2dffb0',1,17,14,22,0,0,0,(m,t)=>{const F0=fr(UH(t)),s=FO(t);m.position.set(F0.a[0],F0.a[1],F0.a[2]);m.lookAt(grp.position.x+F0.a[0]+F0.f[0],F0.a[1]+F0.f[1],grp.position.z+F0.a[2]+F0.f[2]);m.scale.set(17*s+.01,14*s+.01,22*s+.01)});
const hp=(geo,c,sx,sy,sz,lx,ly,lz)=>add(geo,c,1,sx,sy,sz,0,0,0,(m,t)=>{const F0=fr(UH(t)),s=FO(t);m.position.set(F0.a[0]+F0.r[0]*lx+F0.u[0]*ly+F0.f[0]*lz,F0.a[1]+F0.r[1]*lx+F0.u[1]*ly+F0.f[1]*lz,F0.a[2]+F0.r[2]*lx+F0.u[2]*ly+F0.f[2]*lz);m.quaternion.copy(head.quaternion);m.scale.set(sx*s+.01,sy*s+.01,sz*s+.01)});
hp(BG,'#14b27d',11,8,12,0,-3,15);
for(const sd of [-1,1]){hp(BG,'#ffd23b',3,3,16,sd*5,9,-8);hp(mythSG,'#ffffff',3.2,3.2,3.2,sd*6.5,3,8);hp(mythSG,'#ff3b3b',1.6,1.6,1.6,sd*6.9,3,10);hp(BG,'#ffd23b',24,1,1,sd*12,-2,14)}
glow(add(mythSG,'#ffe27a',1,9,9,9,0,0,0,(m,t)=>{const p=Pd(UH(t)+.3);m.position.set(p[0],p[1],p[2]);m.scale.setScalar(9*FO(t)+.01)}));
glow(add(mythSG,'#fff3a0',.3,22,22,22,0,0,0,(m,t)=>{const p=Pd(UH(t)+.3);m.position.set(p[0],p[1],p[2]);m.scale.setScalar(22*FO(t)+.01)}));
for(let i=0;i<24;i++){const ofs=rr(.1,1.6),jx=rr(-14,14),jy=rr(-10,14),jz=rr(-14,14),c=i%2?'#ffcc9f':'#ffffff';glow(add(BG,c,1,3,3,3,0,0,0,(m,t)=>{const u=UH(t)-ofs;if(u<0){m.visible=false;return}m.visible=true;const p=Pd(u);m.position.set(p[0]+jx,p[1]+jy,p[2]+jz);m.scale.setScalar(3.4*(1-ofs/1.8)*FO(t)+.01);m.rotation.set(t*3,t*2,0)}))}
for(let i=0;i<3;i++){const m=add(mythCG,'#2dffb0',.2,1,1,1,0,3+i*2,0,(m,t)=>{const s=(60+i*45)*E(t,.4,.8)*(1+.06*Math.sin(t*2+i));m.scale.set(s+.01,s+.01,1);m.rotation.set(-1.5708,0,t*(.4+i*.2))});glow(m)}
ring('#2dffb0',.85,190,2);ring('#ffd23b',.7,110,3);boom(x,y,['#2dffb0','#ffd23b','#ffffff'],55,400)}
/* ===== FENIX SOLAR: fenix de fogo renasce e voa para o ceu ===== */
else if(F=='phoenix'){e.l=3.7;const Bf=t=>{const R2=25+Math.max(t,0)*55;return[Math.cos(t*1.5)*R2,30+Math.pow(Math.max(t,0),1.6)*72,Math.sin(t*1.5)*R2]},FO=t=>Math.min(1,Math.max(0,(e.l-t)/.7))*Math.min(1,t/.3+.15),
bs=t=>{const a=Bf(t),b=Bf(t+.03),h=Math.atan2(b[2]-a[2],b[0]-a[0]);return{a,h,c:Math.cos(h),s:Math.sin(h)}};
const pt=(geo,c,w,hh,d,lx,ly,lz,mot)=>glow(add(geo,c,1,w,hh,d,0,0,0,(m,t)=>{const B=bs(t),f=FO(t),mv=mot?mot(t):[0,0,0,0],X0=lx+mv[0],Z0=lz+mv[2];m.position.set(B.a[0]+B.c*Z0+B.s*X0,B.a[1]+ly+mv[1],B.a[2]+B.s*Z0-B.c*X0);m.rotation.set(0,P0/2-B.h,mv[3]);m.scale.set(w*f+.01,hh*f+.01,d*f+.01)}));
pt(BG,'#ff7a1f',10,10,34,0,0,0);pt(BG,'#ffb02e',8,7,16,0,-2,8);pt(BG,'#ffd23b',8,8,9,0,6,22);pt(BG,'#ffffff',3,3,8,0,5,29);
['#ff3b1f','#ff7a1f','#ffb02e'].forEach((c,i)=>pt(BG,c,1.6,10-i*2,1.6,0,11+i,18-i*3));
const WC=['#ff3b1f','#ff5a1f','#ff7a1f','#ff9a1f','#ffb02e','#ffd23b'];
for(const s of [-1,1])for(let j=0;j<6;j++)pt(BG,WC[j],12,1.6,22-j*1.5,s*(9+j*11),0,-j*3,t=>[0,Math.sin(t*10)*(j+1)*5,0,s*Math.sin(t*10)*.09*(j+1)]);
for(let i=0;i<6;i++){const len=30+i*3;pt(BG,WC[i],2.6,1.6,len,(i-2.5)*3.2,-1-i*.4,-22-len/2,t=>[Math.sin(t*4+i)*3,Math.sin(t*5+i)*2,0,0])}
glow(add(mythSG,'#ffb02e',.22,80,80,80,0,0,0,(m,t)=>{const B=bs(t);m.position.set(B.a[0],B.a[1],B.a[2]);m.scale.setScalar(80*FO(t)*(1+.08*Math.sin(t*9))+.01)}));
for(let i=0;i<70;i++){const ts=rr(0,3),pos=Bf(ts),jx=rr(-8,8),jy=rr(-8,8),jz=rr(-8,8),sz=rr(2,5),c=['#ff3b1f','#ffb02e','#fff3a0'][i%3];glow(add(BG,c,1,sz,sz,sz,0,0,0,(m,t)=>{const tau=t-ts;if(tau<0||tau>1.2){m.visible=false;return}m.visible=true;m.position.set(pos[0]+jx+Math.sin(tau*6+jx)*4,pos[1]+jy-tau*28,pos[2]+jz);m.scale.setScalar(sz*(1-tau/1.2)+.01);m.rotation.set(tau*4,tau*3,0)}))}
for(let i=0;i<12;i++){const ts=rr(.2,2.6),pos=Bf(ts),ph=rr(0,6.28),c=i%2?'#ff7a1f':'#ffd23b';glow(add(BG,c,.9,5,.8,14,0,0,0,(m,t)=>{const tau=t-ts;if(tau<0||tau>2){m.visible=false;return}m.visible=true;m.position.set(pos[0]+Math.sin(tau*3+ph)*16,pos[1]-tau*22,pos[2]+Math.cos(tau*3+ph)*16);m.rotation.set(tau*3,tau*2+ph,tau*4);m.scale.setScalar(1-tau/2+.01);m.scale.set(5*(1-tau/2)+.01,.8,14*(1-tau/2)+.01)}))}
for(let i=0;i<10;i++){const a=i*P0/5;glow(add(BG,i%2?'#ff7a1f':'#ffd23b',.8,10,1,10,Math.cos(a)*48,0,Math.sin(a)*48,(m,t)=>{const h=(20+30*Math.abs(Math.sin(t*7+i)))*E(t,.3,1.2);m.scale.set(10,h+.01,10);m.position.y=h/2}))}
glow(add(BG,'#ffb02e',.7,40,1,40,0,0,0,(m,t)=>{const p=t/.9;if(p>1){m.visible=false;return}m.scale.set(40*(1-p*.6),700*p+.01,40*(1-p*.6));m.position.y=350*p;m.material.opacity=.7*(1-p)}));
glow(add(mythSG,'#ffffff',0,30,30,30,0,40,0,(m,t)=>{const p=t/.4;if(p>1){m.visible=false;return}m.scale.setScalar(30+p*90);m.material.opacity=.9*(1-p)}));
ring('#ff7a1f',.8,170,2);ring('#ffd23b',.6,100,3);boom(x,y,['#ff3b1f','#ffb02e','#fff3a0'],60,400)}
/* ===== FANTASMA SOMBRIO: alma sobe, almas penadas e pentagrama ===== */
else if(F=='ghost'){e.l=3.7;const O=t=>E(t,.5,.8),cy=t=>12+t*42+Math.sin(t*3)*5,sw=t=>Math.sin(t*2.2)*9,yaw=()=>Math.atan2(cam3.position.x-x,cam3.position.z-y);
const gp=(geo,c,o,w,h,d,lx,ly,lz,mot,gl)=>{const m=add(geo,c,o,w,h,d,0,0,0,(m,t)=>{const yw=yaw(),s=O(t),mv=mot?mot(t):[0,0,0],X0=lx+mv[0]+sw(t),Y0=ly+mv[1],Z0=lz+mv[2];m.position.set(Math.cos(yw)*X0+Math.sin(yw)*Z0,cy(t)+Y0,-Math.sin(yw)*X0+Math.cos(yw)*Z0);m.rotation.y=yw;m.scale.set(w*s+.01,h*s+.01,d*s+.01);m.material.opacity=o*s});return gl?glow(m):m};
gp(mythSG,'#b9a5ff',.2,80,90,80,0,40,0,null,1);
gp(mythSG,'#e8e0ff',.8,16,16,15,0,62,0);gp(mythSG,'#d9d0ff',.75,24,34,20,0,36,0);
for(let i=0;i<6;i++){const a=i*1.047;gp(mythSG,'#d9d0ff',.7,11,13,11,Math.cos(a)*15,8,Math.sin(a)*13,t=>[0,Math.sin(t*5+i)*3,0])}
for(const sd of [-1,1]){gp(mythSG,'#d9d0ff',.7,8,24,8,sd*26,48,2,t=>[0,Math.sin(t*3+sd)*3,Math.sin(t*3)*3]);gp(mythSG,'#26211d',1,3.4,5.5,2,sd*5,64,13)}
gp(mythSG,'#26211d',1,4.5,7,2,0,53,14);
for(let i=0;i<8;i++){const a0=i*.785,ph=rr(0,6);for(let j=0;j<3;j++){glow(add(mythSG,j?'#a58cff':'#ffffff',j?.45:.85,5,5,5,0,0,0,(m,t)=>{const tt=t-j*.09,a=a0+tt*1.6,r=48+Math.sin(tt*2+ph)*10,yy=12+Math.max(0,tt)*(50+i*3)+ph*3;m.position.set(Math.cos(a)*r,yy,Math.sin(a)*r);m.scale.setScalar((j?5-j:8)*O(t)+.01)}))}}
const pr=add(mythRG,'#8a5aff',.8,1,1,1,0,2,0,(m,t)=>{const s=O(t)*95;m.scale.set(s+.01,s+.01,1)});pr.rotation.x=-1.5708;glow(pr);
for(let i=0;i<5;i++)glow(add(BG,'#a58cff',.85,1.2,1,1,0,2,0,(m,t)=>{const rot=t*.35,a1=rot+i*P0*2/5,a2=rot+((i+2)%5)*P0*2/5,s=O(t)*95,p1=[Math.cos(a1)*s,Math.sin(a1)*s],p2=[Math.cos(a2)*s,Math.sin(a2)*s],dx=p2[0]-p1[0],dz=p2[1]-p1[1];m.position.set((p1[0]+p2[0])/2,2,(p1[1]+p2[1])/2);m.rotation.y=P0/2-Math.atan2(dz,dx);m.scale.set(2.4,1.2,Math.hypot(dx,dz)+.01)}));
for(let i=0;i<6;i++){const m=add(mythCG,'#6a4cff',.2,1,1,1,0,3+i*2,0,(m,t)=>{const s=(130+i*8)*O(t)*(1+.08*Math.sin(t*2+i));m.scale.set(s+.01,s+.01,1);m.position.set(Math.cos(t+i)*8,3+i*2+Math.sin(t*2+i)*2,Math.sin(t+i)*8)});m.rotation.x=-1.5708}
for(let i=0;i<16;i++){const a=rr(0,6.28),r=rr(20,100),ph=rr(0,3);glow(add(mythSG,'#9ad1ff',.7,3,3,3,0,0,0,(m,t)=>{const p=((t*.5+ph)%1);m.position.set(Math.cos(a+p*2)*r,4+p*150,Math.sin(a+p*2)*r);m.scale.setScalar(3.5*(1-p)*O(t)+.01)}))}
boom(x,y,['#c9b8ff','#6a4cff','#ffffff'],45,360)}
/* ===== VAZIO ABISSAL: buraco negro, rachaduras e implosao ===== */
else if(F=='void'){e.l=3.5;const H=72,TL=.45,O=t=>E(t,.5,.55),hs=t=>{const q=(t-(e.l-.5))/.5;return O(t)*(q>0?Math.max(0,1-q*q):1)};
add(mythSG,'#000000',1,22,22,22,0,H,0,(m,t)=>{m.scale.setScalar(22*hs(t)+.01)});
glow(add(mythSG,'#ff2dc4',.3,34,34,34,0,H,0,(m,t)=>{m.scale.setScalar(34*hs(t)*(1+.05*Math.sin(t*9))+.01)}));
glow(add(mythSG,'#7a00ff',.18,60,60,60,0,H,0,(m,t)=>{m.scale.setScalar(60*hs(t)+.01)}));
for(const [r,c,o] of [[58,'#ff2dc4',.9],[44,'#7a00ff',.8],[74,'#4a0088',.5]])glow(add(mythTG,c,o,r,r,r,0,H,0,(m,t)=>{m.scale.setScalar(r*hs(t)+.01);m.rotation.set(-1.5708+TL,0,0)}));
glow(add(mythRG,'#ff2dc4',.35,70,70,1,0,H,0,(m,t)=>{const s=70*hs(t);m.scale.set(s+.01,s+.01,1);m.rotation.set(-1.5708+TL,0,t)}));
for(let i=0;i<40;i++){const r0=rr(30,95),ph=rr(0,1),c=['#ff2dc4','#7a00ff','#ffffff'][i%3];glow(add(mythSG,c,1,2.4,2.4,2.4,0,H,0,(m,t)=>{const p=(t*.6+ph)%1,r=r0*(1-p*.85)*hs(t),a=ph*6.28+t*(2.2+60/Math.max(r,8));m.position.set(Math.cos(a)*r,H+Math.sin(a)*r*Math.sin(TL),-Math.sin(a)*r*Math.cos(TL));m.scale.setScalar(2.6*(1-p*.5)*hs(t)+.01)}))}
glow(add(mythRG,'#ffd0f5',.6,34,34,1,0,H,0,(m,t)=>{const s=34*hs(t)*(1+.05*Math.sin(t*10));m.scale.set(s+.01,s+.01,1);m.lookAt(cam3.position)}));
for(let i=0;i<36;i++){const t0=rr(.1,1.8),a0=rr(0,6.28),sz=rr(3,8),c=i%2?'#08000f':'#ff2dc4';add(BG,c,1,sz,sz,sz,0,0,0,(m,t)=>{const p=(t-t0)/1.4;if(p<0||p>1){m.visible=false;return}m.visible=true;const a=a0+p*6,r=140*(1-p*p);m.position.set(Math.cos(a)*r,6+(H-6)*p*p,Math.sin(a)*r);m.scale.setScalar(sz*(1-p*.6)+.01);m.rotation.set(t*5,t*4,0)})}
for(let i=0;i<9;i++){const ca=i*P0*2/9+rr(-.2,.2);for(let j=0;j<3;j++){const ja=ca+rr(-.15,.15);glow(add(BG,'#ff2dc4',.9,3.2,1.2,36,0,2,0,(m,t)=>{const p=Math.min(1,Math.max(0,(t-.15-i*.07-j*.05)/.25)),f=Math.min(1,(e.l-t)/.5);m.visible=p>0;m.position.set(Math.cos(ja)*(j*34+17),2,Math.sin(ja)*(j*34+17));m.rotation.y=P0/2-ja;m.scale.set(3.2*f+.01,1.2,36*p+.01)}))}}
for(let ti=0;ti<4;ti++){const ta=ti*P0/2+.5;for(let j=0;j<7;j++)glow(add(mythSG,j>=5?'#ff2dc4':'#2a0044',.95,7,7,7,0,H,0,(m,t)=>{const a=ta+Math.sin(t*2+j*.5+ti)*.5,d=10+j*13;m.position.set(Math.cos(a)*d,H+Math.sin(t*1.5+ti+j*.6)*14-j*1.5,Math.sin(a)*d);m.scale.setScalar((7-j*.6)*hs(t)+.01)}))}
const sw=add(mythRG,'#ff2dc4',.9,1,1,1,0,3,0,(m,t)=>{const p=(t-(e.l-.5))/.5;if(p<0){m.visible=false;return}m.visible=true;const s=20+p*330;m.scale.set(s,s,1);m.material.opacity=.9*(1-p)});sw.rotation.x=-1.5708;glow(sw);
glow(add(mythSG,'#ff9be8',0,20,20,20,0,H,0,(m,t)=>{const q=(t-(e.l-.4))/.4;if(q<0){m.visible=false;return}m.visible=true;m.scale.setScalar(20+q*110);m.material.opacity=.9*(1-q)}));
for(let i=0;i<20;i++){const a=rr(0,6.28),up=rr(-.4,.8),sz=rr(4,8),c=i%2?'#ff2dc4':'#7a00ff';glow(add(BG,c,1,sz,sz,sz,0,H,0,(m,t)=>{const q=(t-(e.l-.5))/.5;if(q<=0){m.visible=false;return}m.visible=true;m.position.set(Math.cos(a)*q*280,H+up*q*90-q*q*70,Math.sin(a)*q*280);m.scale.setScalar(sz*(1-q)+.01);m.rotation.set(q*8,q*6,0)}))}
ring('#7a00ff',.7,150,2);boom(x,y,['#7a00ff','#ff2dc4','#ffffff'],50,350)}
else{const C=(MFX[F]||MFX.neon).c;add(BG,C[0],.4,70,1300,70,0,650,0);add(BG,C[1],.8,20,1300,20,0,650,0);ring(C[0],.85,130,2);ring(C[1],.85,80,3);ring(C[2],.85,40,4);boom(x,y,C,55,420);e.l=2}
fx.push(e)}
function fxUpd(dt){const g=G;for(let i=g.fx.length-1;i>=0;i--){const e=g.fx[i];e.t+=dt;const k=Math.max(0,1-e.t/e.l);
for(const m of e.ms){const u=m.userData;if(u.f)u.f(m,e.t,k,dt);else if(u.v){const v=u.v,p=m.position;p.x+=v[0]*dt;p.y+=v[1]*dt;p.z+=v[2]*dt;v[1]-=900*dt;if(p.y<2){p.y=2;v[0]=v[1]=v[2]=0}m.rotation.y+=10*dt;m.material.opacity=k<.3?k/.3:1}else m.material.opacity=u.o*k;
if(u.ex){const sc=u.s0*(1+(1-k)*5);m.scale.set(sc,sc,1)}}
if(e.t>=e.l){gw.remove(e.grp);for(const m of e.ms)m.material.dispose();g.fx.splice(i,1)}}}
/* ===== KILLCAM: replay da morte do jogador na camera de quem matou ===== */
const KCF=['x','y','vx','vy','ang','jh','jv','hp','ar','hm','dead','dn','st','inv','invis','rl','rlw','cd','fl','rev','bush','rt','rp','hl','cur','dash','dax','day','pois','bat','rn','pz','ads','adsK','sk2','slc','slf','pf','rdn','fa','ft'];let kcAcc=0;
function kcRec(dt){const g=G;if(!g||g.room||g.p.dead||g.kc&&g.kc.on)return;kcAcc+=dt;if(kcAcc<.05)return;kcAcc=0;if(!g.kcB)g.kcB=[];const pv=g.kcB.length?g.kcB[g.kcB.length-1].f:null;g._kn=((g._kn||0)+1)%4;const F=g.f.map((e,i)=>{if(g._kn&&pv&&pv[i]){const dx=e.x-g.p.x,dy=e.y-g.p.y;if(dx*dx+dy*dy>3240000)return pv[i]}const o={};for(const k of KCF)o[k]=e[k];return o});g.kcB.push({f:F,b:g.b.map(b=>Object.assign({},b))});if(g.kcB.length>80)g.kcB.shift()}
function kcStart(t,s){const g=G,B=g.kcB;if(!B||B.length<8)return;const ti=g.f.indexOf(t),ki=g.f.indexOf(s);if(ti<0||ki<0)return;const fr=B.slice(),L=fr[fr.length-1],E={f:L.f.map((o,i)=>i===ti?Object.assign({},o,{dead:1,hp:0,dn:0}):o),b:L.b};for(let i=0;i<4;i++)fr.push(E);g.kc={on:1,fr,t:0,k:s,ki,ti,dur:(fr.length-1)*.05+.6}}
function kcStep(dt){const K=G.kc;K.t+=dt;if(K.t>=K.dur)K.on=0}
function kcApply(){const g=G,K=g.kc,fr=K.fr,x=Math.min(K.t/.05,fr.length-1),i=Math.floor(x),a=x-i,A=fr[i],B=fr[Math.min(i+1,fr.length-1)],sv={f:[],b:g.b,pt:g.pt,tx:g.tx,yaw:cyaw,pit:cpit,ads:ads,adsK:adsK};
for(let j=0;j<g.f.length;j++){const e=g.f[j],sa=A.f[j],sb=B.f[j];if(!sa){sv.f.push(null);continue}const o={};for(const k of KCF)o[k]=e[k];sv.f.push(o);for(const k of KCF)e[k]=sa[k];e.x=sa.x+(sb.x-sa.x)*a;e.y=sa.y+(sb.y-sa.y)*a;e.jh=sa.jh+(sb.jh-sa.jh)*a;e.ang=sa.ang+wr(sb.ang-sa.ang)*a}
g.b=A.b.map(b=>{const c=Object.assign({},b);c.x+=b.vx*a*.05;c.y+=b.vy*a*.05;return c});g.pt=[];g.tx=[];const k=g.f[K.ki];cyaw=k.ang;cpit=.25;ads=0;adsK=0;return sv}
function kcRestore(sv){const g=G;for(let j=0;j<g.f.length;j++)if(sv.f[j])Object.assign(g.f[j],sv.f[j]);g.b=sv.b;g.pt=sv.pt;g.tx=sv.tx;cyaw=sv.yaw;cpit=sv.pit;ads=sv.ads;adsK=sv.adsK}
function kcBanner(){const K=G.kc;if(!K||!K.on)return;X.setTransform(D,0,0,D,0,0);X.fillStyle='rgba(0,0,0,.5)';X.fillRect(0,0,W,52);Tx('REPLAY DA SUA MORTE',W/2,18,16,'#ff8a8a');Tx('Visto por '+K.k.name+'  -  toque para pular',W/2,38,11,'#ffffff');X.fillStyle='#ff5a5a';X.fillRect(0,50,W*Math.min(1,K.t/K.dur),2)}
function die(t,s){if(t.isP&&s&&s!==t&&!t.dead&&!G.room)kcStart(t,s);if(!t.dead&&!G.room&&!G.sala){if(t.isP){PST.d++;pstSv()}if(s&&s!==t&&s.isP){if(TB<2){const _e=prE('me');_e.k++;G.kc=(G.kc||0)+1;prSave()}PST.k++;const _w=s.ws[s.cur]||0;PST.wk[_w]=(PST.wk[_w]||0)+1}}if(t.dmgBy){if(s&&s!==t)for(const[o,tm]of t.dmgBy)if(o!==s&&o.tm!==t.tm&&G.t-tm<=10)o.assists=(o.assists||0)+1;t.dmgBy=null}t.dn=0;t.rt=null;t.dead=1;G.alive--;{const T=G.teams[t.tm];T.alive--;if(T.alive<=0){for(const o of T.m)o.place=G.ta;G.ta--;if(T.m.length>1&&s&&s!==t&&!s.isP&&!s.dead&&s.tm!==t.tm&&s.st=='ground'&&!G.cs)plantFlag(s)}}if(s&&s!==t){s.kills++;if(G.sala&&!s.isP&&s.tm!==t.tm){try{bandLaugh(s)}catch(_){}}if(!G.mvp||s.kills>G.mvp.kills)G.mvp=s;{const ks=fsk(s,s.ws[s.cur]||0);if(ks&&SK[ks].ev&&SK[ks].fx)mythFx(t.x,t.y,ks,t);if(ks&&SK[ks].ev)evKillS(SK[ks].fx,t.x,t.y);if(s.isP&&ks&&SK[ks].fx=='evArcane'){ARCN++;try{localStorage.setItem('arr_arc',ARCN)}catch(_){}if(ARCN==ARC_MAX)soon('Grimório Arcano: nível máximo!')}}s.rk=(s.rk||0)+1;if(!s.isP&&s.tm!==t.tm&&R()<.7)say(s,pick(KLL),.5);if(s.isP){snd(880,.09,'triangle',.07,300);snd(1320,.14,'triangle',.07,300,.09)}}sayEv(t,s,0);G.feed.push({a:s&&s!==t?s.name:'A zona',ao:s&&s!==t?s:null,b:t.name,bo:t,l:3.5,hs:s&&s!==t&&t.hsK?1:0});t.hsK=0;
if(!G.cs){for(const w of t.ws)if(w!=null)dropI(t,{t:'w',id:w});if(t.ar>0)dropI(t,{t:'v'});if(R()<.7)dropI(t,{t:'a',k:[0,1,2,3][R()*4|0],n:20});if((t.sgk|0)>0&&t.sgk<3)dropI(t,{t:'s',k:t.sgk});if(t.bd)dropI(t,{t:'b'});if(t.kt)dropI(t,{t:'k'});dropI(t,{t:'c',n:(t.mc|0)+10});t.mc=0}
boom(t.x,t.y,t.col,26,240);snd(90,.4,'sawtooth',.09,-40);
if(t.isP)shk=12;wipe(t.tm);if(G.endT<=0&&!G.cs){const PT=G.teams[G.p.tm];if(PT.alive<=0&&!G.room)G.endT=1.8;else if(G.ta==1){G.win=1;G.endT=1.5}}}
function explode(b){const x=b.lx==null?b.x:b.lx,y=b.lx==null?b.y:b.ly,E=b.ex;boom(x,y,'#ffb43b',34,300);boom(x,y,'#ff5a2a',20,200);
for(const e of G.f){if(e.dead||e.st!='ground'||e.tm===b.o.tm)continue;const d=Math.hypot(e.x-x,e.y-y);if(d<E+e.r&&los({x,y},e))hurt(e,b.dm*(1-.6*d/(E+e.r))*(b.o.isP?1:.85),b.o)}
{const dd=dst({x,y},G.p);if(dd<500)shk=Math.max(shk,9);if(dd<1500)explS(1-dd/1500)}}
function bsp(f,an){const c=Math.cos(an),s=Math.sin(an);for(let d=6;d<=24;d+=6)if(wallAt(f.x+c*d,f.y+s*d))return 0;return 24}
function mkB(f,an,w,o){return Object.assign({x:f.x+Math.cos(an)*bsp(f,an),y:f.y+Math.sin(an)*bsp(f,an),vx:Math.cos(an)*w.sp,vy:Math.sin(an)*w.sp,a:an,l:w.rg,dm:w.dm,r:w.br||5,ex:w.ex||0,o:f,c:f.col,sk:fsk(f,f.ws[f.cur]||0),sx:f.x,sy:f.y,kz:f.isP?_bkz:0,lt:f.isP?_blt:null,lk:f.isP?_blk:0,cp:f.isP?0:(f.jcp===G.t?(R()<.7?2.5:0):(R()<.1?2.5:0)),z0:44+(f.jh||0)},o||{})}
function shoot(f,a){if(G.cs&&G.cs.ph!='fight')return;const wi=f.ws[f.cur]||0,w=WP[wi];if(f.cd>0||f.rl>0||f.st!='ground'||f.dn>0||f.pf>0||f.lgh>0||(f.hl&&f.hl.k=='k'))return;
if(wi&&f.mg[f.cur]<=0){reload(f);return}
f.cd=w.cd;if(!f.isP&&(f.yt||f.INF)&&(f.jh||0)>0){f.jsc=(f.jsc||0)+1;if(f.jsc<=2)f.jcp=G.t}if(f.isP){if(!G.room&&!G.sala){if(wi){PST.sh++;PST.sid=PST.sh}else PST.sid=0}lastShot=performance.now();if(!G.room)cpit=cl(cpit-.003,CPL[0],CPL[1])}f.rt=null;f.rp=0;if(wi)f.mg[f.cur]--;f.ang=a;f.rev=1.2;f.hl=null;if(f.invis>0)revealN(f);
if(f.tm!==G.p.tm&&dst(f,G.p)<1700){const s=G.sp.find(q=>q.o===f);if(s){s.x=f.x;s.y=f.y;s.l=2.5}else G.sp.push({x:f.x,y:f.y,l:2.5,o:f})}
if(w.pel){for(let i=0;i<w.pel;i++)G.b.push(mkB(f,a+(i/(w.pel-1)-.5)*w.spr*(f.isP?1-.4*adsK:1)+rr(-.04,.04),w,{sp:0,l:w.rg*rr(.85,1)}))}
else if(w.burst>1)f.bq={n:w.burst,t:0,a,w};else G.b.push(mkB(f,f.isP?a+rr(-1,1)*pSp(f,w):a,w));
if(fsk(f,wi)){const k=SK[fsk(f,wi)];boom(f.x+Math.cos(a)*32,f.y+Math.sin(a)*32,k.p2,k.m,170)}
gunS(f,wi,w);whizS(f,a,w);try{evShotFx(f,wi,a,w)}catch(e){}
if(wi&&f.mg[f.cur]<=0)reload(f)}
function reload(f){const wi=f.ws[f.cur];if(wi==null||f.rl>0||f.dn>0)return;const w=WP[wi];if(f.mg[f.cur]>=w.mag)return;if(!f.inf&&f.res[w.ak]<=0){return}f.rl=w.rl;f.rlw=f.cur;f.hl=null;if(f.isP)ads=0;if(!f.isP&&R()<.25)say(f,pick(['Tô recarregando, segura!','Calma, recarregando!','Pera, recarregando!','Recarregando, me dá cover!']));reloadS(f,w)}
function swap(f){if(f.st!='ground'||f.dn>0)return;f.cur^=1;f.rl=0;if(f.isP)ads=0;f.bq=null;f.cd=Math.max(f.cd,.25);swapS(f)}
function useHeal(f,k){if(f.hl||f.st!='ground'||f.dn>0)return;if(k=='b'&&f.bd>0&&f.hp<150)f.hl={t:2,k:'b'};else if(k=='k'&&f.kt>0&&f.hp<MH){const T=G.sala?2.5:4;f.hl={t:T,tt:T,k:'k'}};if(f.hl&&!f.isP&&R()<.65)say(f,pick(HLL),0)}
function doPick(p){const q=G.pk;if(!q||p.st!='ground'||p.dn>0)return;const o=p.ws[p.cur];if(o!=null)G.items.push({x:p.x+Math.cos(p.ang+3)*36,y:p.y+Math.sin(p.ang+3)*36,t:'w',id:o});p.ws[p.cur]=q.id;p.mg[p.cur]=WP[q.id].mag;p.rl=0;G.items.splice(G.items.indexOf(q),1);snd(600,.08,'triangle',.05,300)}
function healF(t,a){t.hp=Math.min(MH,t.hp+a);tx(t.x,t.y-40,'+'+Math.round(a),'#7dff6a');boom(t.x,t.y,['#7dff6a','#ffffff','#b8ff9a'],14,150)}
function healer(f){const a=G.teams[f.tm].m.filter(o=>o!==f&&!o.dead&&!(o.dn>0)&&o.st=='ground'&&dst(f,o)<900).sort((p,q)=>dst(f,p)-dst(f,q)).slice(0,3);f.hcd=18;healF(f,MH*.2);for(const o of a)G.fl.push({x:f.x,y:f.y,h:44,t:o,d0:Math.max(30,dst(f,o))});tx(f.x,f.y-58,'CURA!','#7dff6a');if(f.isP)snd(520,.3,'triangle',.06,300)}
function rose(f){f.hcd=12;let a=f.ang;if(f.isP)a=aimP();else if(f.tg)a=Math.atan2(f.tg.y-f.y,f.tg.x-f.x);f.ang=a;G.b.push(mkB(f,a,{sp:650,rg:650,dm:10,br:12},{ps:1,sk:0}));f.cd=Math.max(f.cd,.3);tx(f.x,f.y-44,'ESPINHOS!','#9cff4a');boom(f.x+Math.cos(a)*30,f.y+Math.sin(a)*30,['#9cff4a','#ff7ad9','#ffffff'],10,160);if(f.isP)snd(240,.25,'triangle',.06,300)}
function bats(f){const a=G.f.filter(e=>e.tm!==f.tm&&!e.dead&&e.st=='ground'&&!(e.dn>0)&&!(e.invis>0)&&dst(f,e)<750).sort((p,q)=>dst(f,p)-dst(f,q)).slice(0,8);if(!a.length){if(f.isP)tx(f.x,f.y-50,'Sem alvos','#ff8a8a');return}f.hcd=16;for(const e of a)G.fl.push({x:f.x,y:f.y,h:50,t:e,d0:Math.max(30,dst(f,e)),o:f});boom(f.x,f.y,['#6a1b9a','#1a0a20','#c07bff'],16,200);tx(f.x,f.y-58,'MORCEGOS!','#c07bff');if(f.isP){snd(200,.4,'sawtooth',.05,400);snd(1500,.12,'square',.03,-600,.05);nz(.4,.05,2500,0,1,'bandpass')}}
function batHit(o,t){if(t.dead||t.st!='ground')return;const b=t.hp;hurt(t,2,o);const g=Math.max(0,b-t.hp);if(g>0&&!o.dead)healF(o,g);t.bat=5;t.batT=1;t.batO=o;boom(t.x,t.y,['#6a1b9a','#c07bff','#fff'],10,150);if(o.isP)snd(700,.1,'triangle',.05,-300)}
function dogCall(f){let t=null;if(f.isP){aimP();t=lastT}else t=f.tg;
if(!t||t.dead||t.st!='ground'||t.tm===f.tm||t.invis>0){t=null;let bd=1100;for(const e of G.f){if(e.tm===f.tm||e.dead||e.st!='ground'||e.invis>0||(e.bush&&e.rev<=0&&dst(f,e)>140))continue;const d=dst(f,e);if(d<bd){bd=d;t=e}}}
if(!t){if(f.isP)tx(f.x,f.y-50,'Sem alvos','#ff8a8a');return}
f.hcd=14;if(!G.dg)G.dg=[];G.dg.push({x:f.x+Math.cos(f.ang)*24,y:f.y+Math.sin(f.ang)*24,o:f,t,l:6,a:Math.atan2(t.y-f.y,t.x-f.x)});
tx(f.x,f.y-58,'CAO MECANICO!','#ffb300');boom(f.x,f.y,['#ffb300','#c9ced8','#ffffff'],14,170);if(f.isP)snd(420,.2,'square',.05,200)}
function dogHit(o,t){hurt(t,10,o);t.mk=10;t.mkTm=o.tm;tx(t.x,t.y-56,'MARCADO!','#ff3b3b');boom(t.x,t.y,['#ffb300','#ff3b3b','#ffffff'],16,200);
for(const a of G.teams[o.tm].m){if(a.isP||a.dead||a.dn>0||a.st!='ground')continue;a.vs=t;a.vsU=G.t+10}
if(o.isP||t.isP)snd(180,.2,'square',.06,-100)}
function clonoDome(f){f.hcd=18;if(!G.cz)G.cz=[];G.cz=G.cz.filter(z=>z.o!==f);G.cz.push({o:f,tm:f.tm,x:f.x,y:f.y,t:4,r:230});tx(f.x,f.y-58,'ESCUDO CLONO!','#ffba7d');boom(f.x,f.y,['#ffffff','#ffba7d','#ff6600'],22,230);if(f.isP){snd(420,.35,'triangle',.06,300);snd(840,.3,'sine',.04,200,.12)}}
function evanArea(f){f.hcd=20;if(!G.ev)G.ev=[];G.ev=G.ev.filter(z=>z.o!==f);G.ev.push({o:f,t:3,tk:0,r:230});tx(f.x,f.y-58,'AREA DE CURA!','#bfffd0');boom(f.x,f.y,['#ffffff','#7dff6a','#b8ff9a'],22,230);if(f.isP){snd(520,.35,'triangle',.06,300);snd(780,.3,'sine',.04,200,.12)}}
function revealN(f,t){f.invis=0;boom(f.x,f.y,['#222222','#777777','#dddddd'],16,200);if(f.tm===G.p.tm)tx(f.x,f.y-50,t?'VISIVEL':'REVELADO!','#ff8a8a');if(f.isP)snd(200,.2,'square',.05,-100)}
function runerBoost(f){f.hcd=20;f.rb=10;boom(f.x,f.y,['#ff7a1a','#ffd93b','#ffffff'],22,220);if(f.tm===G.p.tm)tx(f.x,f.y-58,'VELOCIDADE!','#ffb347');if(f.isP)snd(520,.35,'sawtooth',.05,600)}
function ninjaVeil(f){f.hcd=18;f.invis=5;boom(f.x,f.y,['#222222','#666666','#dddddd'],22,220);if(f.tm===G.p.tm)tx(f.x,f.y-58,'INVISIVEL!','#c9d1ff');if(f.isP)snd(260,.4,'sawtooth',.05,-200)}
function slide(f,ox,oy){if(!f||f.st!='ground'||f.dead||f.dn>0||f.dash>0||f.slc>0||f.rt)return;let dx,dy;const m=Math.hypot(f.vx||0,f.vy||0);if(m>30){dx=f.vx/m;dy=f.vy/m}else{dx=Math.cos(f.ang);dy=Math.sin(f.ang)}if(ox!=null&&!f.isP){dx=ox;dy=oy}f.slc=1.6;f.slf=1;f.dash=f.rb>0?1.2:.6;f.dax=dx;f.day=dy;f.rt=null;f.rp=0;boom(f.x,f.y,'#e8e2c0',10,150);if(f.isP)snd(240,.3,'sawtooth',.05,-200)}
function pumpRes(f){if(f.pxu===undefined)f.pxu=2;
if(f.pxu<=0){if(f.isP)tx(f.x,f.y-50,'SEM USOS','#ff8a8a');return}
const T=G.teams[f.tm].m.filter(o=>o!==f),dd=(a,b)=>dst(f,a)-dst(f,b);
let t=T.filter(o=>o.dead&&(f.isP||!o.isP)).sort(dd)[0],dead=1;
if(!t){t=T.filter(o=>!o.dead&&o.dn>0&&o.st=='ground').sort(dd)[0];dead=0}
if(!t){if(f.isP)tx(f.x,f.y-50,'SEM ALIADO CAIDO','#ff8a8a');return}
f.pxu--;f.hcd=3;
if(dead){t.dead=0;G.alive++;G.teams[t.tm].alive++;t.dn=0;t.hp=MH;t.rt=null;t.rp=0;t.rvt=0;t.rpg=0;t.dk=null;t.hl=null;t.rl=0;t.cd=.5;t.bq=null;t.fl=0;t.st='ground';t.vx=0;t.vy=0;t.jh=0;t.jv=0;t.inv=3;t.place=0;
const a=rr(0,6.28);let nx=f.x+Math.cos(a)*70,ny=f.y+Math.sin(a)*70;if(wallAt(nx,ny)){nx=f.x;ny=f.y}t.x=nx;t.y=ny;
if(!t.ws.some(w=>w!=null)){t.ws=[10,null];t.cur=0;t.mg=[35,0];t.res=[0,0,0,0]}t.res[0]=Math.max(t.res[0]||0,90)}else revive(t,f);
t.au=1;boom(t.x,t.y,['#ff7a00','#b57bff','#ffe14a'],34,260);boom(f.x,f.y,['#ff9a1f','#b57bff'],16,180);
tx(f.x,f.y-58,'RESSURREICAO!','#ff9a1f');tx(t.x,t.y-50,t.name+' VOLTOU!','#b57bff');
if(f.isP||t.isP){snd(160,.5,'sawtooth',.07,300);snd(520,.4,'triangle',.06,400,.15);snd(880,.3,'triangle',.05,300,.3)}}
function pumpAura(f,t){if(!f.au&&!f.au3)return;const par=f.ev&&f.ev.parent;if(!par)return;
if(f.au3&&f.au3.parent!==par)par.add(f.au3);
if(!f.au3){const gp=new THREE.Group(),TG=new THREE.TorusGeometry(1,.1,6,28),mk=(c,y)=>{const m=new THREE.Mesh(TG,fxMat(c));m.rotation.x=1.5708;m.position.y=y;gp.add(m);return m};
gp.userData={r:[mk('#ff7a00',4),mk('#b57bff',30),mk('#ffb02e',58)],o:[],b:[20,26,16]};
for(let i=0;i<8;i++){const m=new THREE.Mesh(BG,fxMat(i%2?'#ff9a1f':'#b57bff'));m.scale.set(3,i%2?5:3,3);gp.add(m);gp.userData.o.push(m)}
par.add(gp);f.au3=gp}
const gp=f.au3,u=gp.userData;gp.visible=!!f.au&&!f.dead;if(!gp.visible)return;
u.r.forEach((m,i)=>{m.rotation.z=t*(1+i*.6)*(i%2?-1:1);m.scale.setScalar(u.b[i]*(1+.06*Math.sin(t*4+i)))});
u.o.forEach((m,i)=>{const a=t*2.2+i*.785;m.position.set(Math.cos(a)*24,12+i*6+Math.sin(t*3+i)*3,Math.sin(a)*24);m.rotation.y=a})}
function storm(f){const T=G.f.filter(e=>e.tm!==f.tm&&!e.dead&&e.st=='ground'&&!(e.dn>0)&&!(e.invis>0)&&(!e.bush||e.rev>0||dst(f,e)<140)&&dst(f,e)<650&&los(f,e)).sort((p,q)=>dst(f,p)-dst(f,q)).slice(0,3);if(!T.length){if(f.isP)tx(f.x,f.y-50,'Sem alvos','#ff8a8a');return}f.hcd=16;const H=G.hl||(G.hl=[]);
for(const e of T){let px=e.x+rr(-40,40),py=e.y+rr(-40,40),ph=420;const pts=[[px,ph,py]];for(let k=1;k<=7;k++){const b=k==7;px=b?e.x:e.x+rr(-30,30)*(1-k/7);py=b?e.y:e.y+rr(-30,30)*(1-k/7);ph=b?0:420-k*60;pts.push([px,ph,py])}H.push({p:pts,c:'#ff954f',l:.45,m:.45,w:4.5});boom(e.x,e.y,['#fff27a','#ff954f','#ffffff'],16,230);hurt(e,14,f)}
tx(f.x,f.y-58,'TEMPESTADE!','#fff27a');boom(f.x,f.y,['#fff27a','#ff954f','#ffffff'],18,210);if(f.isP){snd(160,.45,'sawtooth',.07,-80);snd(1400,.1,'square',.04,-900,.04)}}
var ABF=0;function ability(f){ABF=1;try{ability0(f)}finally{ABF=0}}
function ability0(f){if(G.cs&&G.cs.ph!='fight')return;if(!f.ch||f.dead||f.st!='ground'||f.dn>0||f.hcd>0)return;if(f.ch==4){bats(f);return}if(f.ch==2){rose(f);return}if(f.ch==3){healer(f);return}if(f.ch==5){dogCall(f);return}if(f.ch==6){evanArea(f);return}if(f.ch==7){ninjaVeil(f);return}if(f.ch==8){clonoDome(f);return}if(f.ch==9){runerBoost(f);return}if(f.ch==10){pumpRes(f);return}if(f.ch==11){storm(f);return}f.hcd=22;f.inv=2;f.sk2=2;f.dash=.7;f.dax=Math.cos(f.ang);f.day=Math.sin(f.ang);f.hl=null;f.rt=null;f.rp=0;boom(f.x,f.y,['#ffcc00','#fff','#ffba7d'],18,220);tx(f.x,f.y-44,'DASH!','#ffba7d');if(f.isP)snd(300,.35,'sawtooth',.06,500)}
function jump(f){if(f.st!='plane')return;f.st='fall';f.ft=f.isP?FT0:rr(FT0*.81,FT0);f.x=G.pl.x;f.y=G.pl.y;f.chOp=0;f.wnT=0;f.fvx=0;f.fvy=0;if(f.isP)doorS();else if(dst(f,G.p)<900)nz(.5,.04,1800,0,.6,'bandpass')}
function pk(f){const it=G.items;for(let i=it.length-1;i>=0;i--){const q=it[i];if(Math.abs(q.x-f.x)>f.r+20||Math.abs(q.y-f.y)>f.r+20)continue;let ok=0;
if(q.t=='a'){f.res[q.k]=Math.min(300,f.res[q.k]+q.n);ok=1}
else if(q.t=='b'&&f.bd<5){f.bd++;ok=1}else if(q.t=='k'&&f.kt<3){f.kt++;ok=1}else if(q.t=='v'&&f.ar<50){f.ar=50;ok=1}else if(q.t=='h'&&!(f.hm>=30)){f.hm=30;ok=1}else if(q.t=='c'){f.mc=(f.mc|0)+q.n;ok=1}
else if(q.t=='s'&&q.k<3){if(f.isP?(q.k!=(f.sgk|0)):(q.k>(f.sgk|0))){f.sgk=q.k;ok=1;if(f.isP)soon('Mira '+['Ponto vermelho','2x','4x','Luneta'][q.k]+' equipada'+(WP[f.ws[f.cur]||0].sc?' (sniper usa Luneta fixa)':''))}}
else if(q.t=='w'){const e=f.ws[0]==null?0:f.ws[1]==null?1:-1;if(e>=0){f.ws[e]=q.id;f.mg[e]=WP[q.id].mag;if(f.isP||f.ws[f.cur]==null)f.cur=e;ok=1}
else if(!f.isP){const m=WR[f.ws[0]]<=WR[f.ws[1]]?0:1;if(WR[q.id]>WR[f.ws[m]]){dropI(f,{t:'w',id:f.ws[m]});f.ws[m]=q.id;f.mg[m]=WP[q.id].mag;ok=1}}}
if(ok){it.splice(i,1);if(f.isP)pickS()}}}
function los(a,b){if(G.iw&&G.iw.length&&iceLos(a,b))return 0;const dx=b.x-a.x,dy=b.y-a.y,n=Math.ceil(Math.hypot(dx,dy)/10);for(let i=1;i<n;i++)if(wallAt(a.x+dx*i/n,a.y+dy*i/n))return 0;return 1}
function enNear(f,r){for(const e of G.f)if(e.tm!==f.tm&&!e.dead&&!(e.dn>0)&&e.st=='ground'&&dst(f,e)<r)return 1;return 0}
function nearEnemy(f,rg){let b=null,bd=rg,db=null,dd=Math.min(rg,320);for(const e of G.f)if(e.tm!==f.tm&&!e.dead&&e.st=='ground'&&!(e.invis>0)&&(!e.bush||e.rev>0||dst(f,e)<140)){const d=dst(f,e);if(e.dn>0){if(d<dd&&los(f,e)){dd=d;db=e}}else if(d<bd&&los(f,e)){bd=d;b=e}}return b||db}
/* ---------- input ---------- */
const keys={},js={on:0,id:-1,ox:0,oy:0,x:0,y:0},aA={on:0,id:-1,x:0,y:0,m:0};
const BT={atk:()=>({x:W-100*U,y:H-100*U,r:56*U}),hab:()=>({x:W-300*U,y:H-235*U,r:30*U}),rld:()=>({x:W-205*U,y:H-60*U,r:28*U}),swp:()=>({x:W-196*U,y:H-125*U,r:28*U}),ban:()=>({x:W-60*U,y:H-200*U,r:26*U}),ice:()=>({x:W-95*U,y:H-278*U,r:28*U}),kit:()=>({x:W-130*U,y:H-205*U,r:26*U}),pik:()=>({x:W-285*U,y:H-95*U,r:32*U}),jmp:()=>({x:W/2,y:H-100*U,r:50*U}),eye:()=>({x:W-330*U,y:H-150*U,r:26*U}),hop:()=>({x:W-250*U,y:H-165*U,r:26*U}),sld:()=>({x:W-350*U,y:H-55*U,r:28*U}),ads:()=>({x:W-195*U,y:H-215*U,r:26*U}),rev:()=>({x:W/2,y:H-105*U,r:46*U}),spc:()=>({x:W/2,y:H-52-34*U,r:34*U})};
/* Editor de HUD: posicao (fx,fy = fracao da tela) e tamanho (s) de cada botao, salvo em localStorage */
BT.shb=()=>({x:W/2,y:H*.58+22,r:34*U});BT.igb=()=>({x:W-15,y:15,r:17});
const HK=['atk','rld','swp','hab','ban','kit','ice','hop','sld','ads','eye','pik','jmp','rev','spc','shb','igb'],HN={atk:'ATIRAR',rld:'RECARREGAR',swp:'TROCAR ARMA',hab:'HABILIDADE',ice:'GRANADA DE GELO',ban:'BANDAGEM',kit:'KIT',hop:'PULAR',sld:'SLIDE',ads:'MIRA',eye:'OLHAR',pik:'PEGAR',jmp:'SALTAR DO ONIBUS',rev:'REANIMAR',spc:'TROCAR ESPECTADOR',shb:'LOJA',igb:'CONFIGURACOES'},HB={};
let HUDC={};try{HUDC=JSON.parse(localStorage.getItem('arr_hud')||'{}')||{}}catch(e){HUDC={}}
HK.forEach(k=>{HB[k]=BT[k];BT[k]=()=>{const q=HB[k](),o=HUDC[k];if(!o)return q;const r=q.r*cl(o.s||1,.6,1.8);return{x:cl(q.x+(o.fx||0)*W,r,W-r),y:cl(q.y+(o.fy||0)*H,r,H-r),r}}});
const HI={atk:(c,r)=>drawW(c,0,r*1.1),
rld:(c,r)=>{c.strokeStyle='#fff';c.lineWidth=4;c.beginPath();c.arc(0,0,r*.42,.6,5.4);c.stroke();c.fillStyle='#fff';c.beginPath();c.moveTo(r*.42,-r*.45);c.lineTo(r*.75,-r*.1);c.lineTo(r*.2,-r*.1);c.fill()},
swp:(c,r)=>{c.strokeStyle='#fff';c.lineWidth=4;c.beginPath();c.moveTo(-r*.5,-r*.2);c.lineTo(r*.5,-r*.2);c.moveTo(r*.5,r*.2);c.lineTo(-r*.5,r*.2);c.stroke();c.fillStyle='#fff';c.beginPath();c.moveTo(r*.5,-r*.5);c.lineTo(r*.8,-r*.2);c.lineTo(r*.5,.1);c.fill();c.beginPath();c.moveTo(-r*.5,r*.5);c.lineTo(-r*.8,r*.2);c.lineTo(-r*.5,-r*.1);c.fill()},
hab:(c,r)=>{const h=CH>0?CH:3;c.lineWidth=3;c.strokeStyle='#0d1a13';
if(h==3){c.fillStyle='#7dff6a';c.beginPath();c.arc(0,r*.12,r*.34,0,7);c.fill();c.stroke();c.fillStyle='#ddd';c.fillRect(-r*.1,-r*.5,r*.2,r*.28);c.strokeRect(-r*.1,-r*.5,r*.2,r*.28)}
else if(h==2){c.fillStyle='#9cff4a';c.beginPath();for(let i=0;i<16;i++){const a=i/16*6.2832,rd=i%2?r*.3:r*.55;c.lineTo(Math.cos(a)*rd,Math.sin(a)*rd)}c.closePath();c.fill();c.stroke()}
else if(h==4){c.fillStyle='#2a1030';c.strokeStyle='#c07bff';c.beginPath();c.moveTo(0,r*.2);c.quadraticCurveTo(-r*.3,-r*.5,-r*.6,-r*.1);c.lineTo(-r*.4,r*.05);c.lineTo(-r*.2,-r*.05);c.lineTo(0,r*.25);c.lineTo(r*.2,-r*.05);c.lineTo(r*.4,r*.05);c.lineTo(r*.6,-r*.1);c.quadraticCurveTo(r*.3,-r*.5,0,r*.2);c.fill();c.stroke()}
else if(h==6){c.fillStyle='#f7f9fc';c.beginPath();c.arc(0,0,r*.42,0,7);c.fill();c.stroke();c.fillStyle='#e53935';c.fillRect(-r*.09,-r*.3,r*.18,r*.6);c.fillRect(-r*.3,-r*.09,r*.6,r*.18)}
else if(h==7){c.fillStyle='#2a2a33';c.strokeStyle='#cfd3ff';c.beginPath();for(let i=0;i<8;i++){const a=i/8*6.2832-1.5708,rd=i%2?r*.2:r*.55;c.lineTo(Math.cos(a)*rd,Math.sin(a)*rd)}c.closePath();c.fill();c.stroke()}
else if(h==5){c.fillStyle='#aab3c0';c.beginPath();c.roundRect(-r*.5,-r*.3,r*.7,r*.32,r*.06);c.fill();c.stroke();c.beginPath();c.roundRect(r*.1,-r*.5,r*.4,r*.34,r*.06);c.fill();c.stroke();c.fillStyle='#ff3b3b';c.fillRect(r*.32,-r*.4,r*.1,r*.1);c.fillStyle='#444';c.fillRect(-r*.42,0,r*.12,r*.22);c.fillRect(r*.04,0,r*.12,r*.22);c.fillStyle='#ffb300';c.fillRect(-r*.3,-r*.42,r*.22,r*.14)}
else{c.save();c.rotate(-.35);c.fillStyle='#ffcc00';c.beginPath();c.roundRect(-r*.6,-r*.14,r*1.2,r*.28,r*.14);c.fill();c.stroke();c.fillStyle='#fff';c.beginPath();c.arc(-r*.38,r*.3,r*.1,0,7);c.arc(r*.38,r*.3,r*.1,0,7);c.fill();c.restore()}},
ban:(c,r)=>icon(c,'b',0,0,r*.5,0),kit:(c,r)=>icon(c,'k',0,0,r*.5,0),ice:(c,r)=>{c.strokeStyle='#ffddbf';c.lineWidth=3;for(let i=0;i<3;i++){const a=i/3*Math.PI;c.beginPath();c.moveTo(Math.cos(a)*r*.5,Math.sin(a)*r*.5);c.lineTo(-Math.cos(a)*r*.5,-Math.sin(a)*r*.5);c.stroke()}},
eye:(c,r)=>{c.strokeStyle='#fff';c.lineWidth=3;c.beginPath();c.ellipse(0,0,r*.65,r*.38,0,0,7);c.stroke();c.fillStyle='#fff';c.beginPath();c.arc(0,0,r*.2,0,7);c.fill()},
ads:(c,r)=>{c.strokeStyle='#fff';c.lineWidth=4;c.beginPath();c.arc(0,0,r*.42,0,7);c.moveTo(-r*.7,0);c.lineTo(-r*.2,0);c.moveTo(r*.7,0);c.lineTo(r*.2,0);c.moveTo(0,-r*.7);c.lineTo(0,-r*.2);c.moveTo(0,r*.7);c.lineTo(0,r*.2);c.stroke()},
sld:(c,r)=>{c.strokeStyle='#fff';c.lineWidth=3;c.lineCap='round';c.beginPath();c.moveTo(-r*.55,-r*.12);c.lineTo(-r*.15,-r*.12);c.moveTo(-r*.65,r*.05);c.lineTo(-r*.25,r*.05);c.stroke();c.fillStyle='#fff';c.beginPath();c.roundRect(-r*.1,-r*.3,r*.6,r*.32,r*.12);c.fill();c.font='900 '+Math.round(r*.26)+'px Trebuchet MS,Arial';c.textAlign='center';c.textBaseline='middle';c.fillText('SLIDE',0,r*.62)},
hop:(c,r)=>{c.fillStyle='#fff';c.beginPath();c.moveTo(0,-r*.55);c.lineTo(r*.6,r*.15);c.lineTo(-r*.6,r*.15);c.fill();c.fillRect(-r*.2,r*.1,r*.4,r*.4)},
pik:(c,r)=>drawW(c,1,r*1.1),jmp:(c,r)=>icon(c,'plane',0,0,r*.4,0),
rev:(c,r)=>{c.fillStyle='#7dff6a';c.fillRect(-r*.14,-r*.45,r*.28,r*.9);c.fillRect(-r*.45,-r*.14,r*.9,r*.28)},
spc:(c,r)=>{c.fillStyle='#fff';c.font='900 '+Math.round(r*.3)+'px Trebuchet MS,Arial';c.textAlign='center';c.textBaseline='middle';c.fillText('TROCAR',0,0)},
shb:(c,r)=>{c.fillStyle='#fff';c.font='900 '+Math.round(r*.4)+'px Trebuchet MS,Arial';c.textAlign='center';c.textBaseline='middle';c.fillText('LOJA',0,0)},
igb:(c,r)=>{c.strokeStyle='#ff6600';c.lineWidth=3;c.beginPath();c.arc(0,0,r*.38,0,7);c.stroke();for(let i=0;i<8;i++){const a=i/8*6.2832;c.beginPath();c.moveTo(Math.cos(a)*r*.5,Math.sin(a)*r*.5);c.lineTo(Math.cos(a)*r*.72,Math.sin(a)*r*.72);c.stroke()}}};
/* botoes HTML (loja e engrenagem): aplicam a posicao e o tamanho escolhidos no editor */
function domHud(){for(const k of ['shb','igb']){const el=$(k);if(!el)continue;el.style.opacity=hudAl()<1?hudAl():'';const o=HUDC[k];if(!o){el.style.translate='';el.style.scale='';continue}const q=BT[k](),b=HB[k]();el.style.translate=(q.x-b.x)+'px '+(q.y-b.y)+'px';el.style.scale=cl(o.s||1,.6,1.8)}}
const HE={on:0,sel:'atk',drag:null,bk:null,id:-1};
/* Paineis do HUD que tambem podem ser movidos/redimensionados no editor */
const HPK=['st','mm','tm','hp','zn'],HPS={st:'PLACAR',mm:'MAPA',tm:'EQUIPE',hp:'VIDA E ARMAS',zn:'ZONA'};
Object.assign(HN,{st:'PLACAR (vivos, abates, moedas)',mm:'MAPA + TOP TIMES',tm:'PAINEL DA EQUIPE',hp:'VIDA E ARMAS',zn:'AVISO DA ZONA'});
function HPR(k){const m=12,u=Math.min(U,1.2),rm=!!(G&&G.room);
if(k=='st')return{x:m,y:m,w:250,h:98,ax:m,ay:m};
if(k=='mm'){const ms=Math.min(rm?105:150,W*(rm?.24:.32)),tw=Math.min(112,W*.2);return{x:W-ms-m-12-tw,y:m,w:ms+12+tw,h:ms,ax:W-m,ay:m}}
if(k=='tm'){const y=Math.max(m+120,H*.36)-16;return{x:m,y,w:140*u,h:3*(20*u+3)+16,ax:m,ay:y}}
if(k=='hp'){const b=H-24*U;return{x:m,y:b-82*U,w:262*U,h:98*U,ax:m,ay:b+14*U}}
return{x:W/2-80,y:m+2,w:160,h:24,ax:W/2,ay:m+2}}
function hudOff(k){const o=HUDC[k];if(!o)return{dx:0,dy:0,s:1};const s=cl(o.s||1,.6,1.8),r=HPR(k);let dx=(o.fx||0)*W,dy=(o.fy||0)*H;
const x0=r.ax+dx+(r.x-r.ax)*s,y0=r.ay+dy+(r.y-r.ay)*s,x1=x0+r.w*s,y1=y0+r.h*s;
if(x0<0)dx-=x0;if(x1>W)dx-=x1-W;if(y0<0)dy-=y0;if(y1>H)dy-=y1-H;return{dx,dy,s}}
function hudRect(k){const f=hudOff(k),r=HPR(k);return{x:r.ax+f.dx+(r.x-r.ax)*f.s,y:r.ay+f.dy+(r.y-r.ay)*f.s,w:r.w*f.s,h:r.h*f.s}}
function hudB(k){const f=hudOff(k),r=HPR(k);X.save();X.translate(r.ax+f.dx,r.ay+f.dy);X.scale(f.s,f.s);X.translate(-r.ax,-r.ay)}
function hudA(){X.restore()}
function hudTR(k,n0){const f=hudOff(k),r=HPR(k);for(let i=n0;i<TRW.length;i++){const q=TRW[i];q.x=r.ax+f.dx+(q.x-r.ax)*f.s;q.y=r.ay+f.dy+(q.y-r.ay)*f.s;q.w*=f.s;q.h*=f.s}}
function hudMM(){if(!MMR)return;const f=hudOff('mm'),r=HPR('mm');MMR={mx:r.ax+f.dx+(MMR.mx-r.ax)*f.s,my:r.ay+f.dy+(MMR.my-r.ay)*f.s,ms:MMR.ms*f.s}}
function hudDraw(){if(!HE.on)return;const cv=$('hudc');if(cv.width!=W||cv.height!=H){cv.width=W;cv.height=H}const c=cv.getContext('2d');c.setTransform(1,0,0,1,0,0);c.clearRect(0,0,W,H);
HPK.forEach(k=>{const r=hudRect(k),on=HE.sel==k;c.save();c.fillStyle=on?'rgba(255,102,0,.2)':'rgba(19,15,13,.72)';c.strokeStyle=on?'#ffd4ae':'#ff6600';c.lineWidth=on?4:2.5;c.setLineDash(on?[]:[7,5]);c.beginPath();c.roundRect(r.x,r.y,r.w,r.h,10);c.fill();c.stroke();c.setLineDash([]);c.fillStyle=on?'#ffd4ae':'#ff6600';c.font='900 '+Math.round(Math.max(10,Math.min(15,Math.min(r.h*.32,r.w*.14))))+'px Trebuchet MS,Arial';c.textAlign='center';c.textBaseline='middle';c.fillText(HPS[k],r.x+r.w/2,r.y+r.h/2);c.restore()});
c.fillStyle='rgba(255,255,255,.45)';c.font='900 11px Arial';c.textAlign='center';c.textBaseline='middle';c.beginPath();c.arc(W*.16,H*.62,46*U,0,7);c.strokeStyle='rgba(255,255,255,.35)';c.lineWidth=2;c.stroke();c.fillText('JOYSTICK (fixo)',W*.16,H*.62);
HK.forEach(k=>{const q=BT[k](),on=HE.sel==k;c.save();c.globalAlpha=hudAl();c.save();c.shadowColor='rgba(0,0,0,.5)';c.shadowBlur=9;c.shadowOffsetY=3;const g1=c.createRadialGradient(q.x-q.r*.3,q.y-q.r*.4,q.r*.1,q.x,q.y,q.r);if(on){g1.addColorStop(0,'rgba(255,238,130,.9)');g1.addColorStop(1,'rgba(240,150,10,.9)')}else{g1.addColorStop(0,'rgba(44,64,102,.94)');g1.addColorStop(1,'rgba(17,15,13,.94)')}c.fillStyle=g1;c.beginPath();c.arc(q.x,q.y,q.r,0,7);c.fill();c.restore();c.strokeStyle=on?'#ffd4ae':'#ff6600';c.lineWidth=on?5:3.5;c.beginPath();c.arc(q.x,q.y,q.r,0,7);c.stroke();if(on){c.strokeStyle='#fff';c.lineWidth=2;c.beginPath();c.arc(q.x,q.y,q.r+6,0,7);c.stroke()}c.save();c.translate(q.x,q.y);try{HI[k](c,q.r)}catch(_){}c.restore();c.restore()});
$('hudn').textContent=HN[HE.sel]+' - tamanho '+Math.round(cl((HUDC[HE.sel]||{}).s||1,.6,1.8)*100)+'% - transparencia dos botoes '+Math.round((1-hudAl())*100)+'%';requestAnimationFrame(hudDraw)}
function hudOpen(){HE.bk=JSON.stringify(HUDC);HE.on=1;$('set').classList.add('hide');$('hude').classList.remove('hide');hudDraw()}
function hudClose(){HE.on=0;HE.drag=null;$('hude').classList.add('hide');$('set').classList.remove('hide')}
const hudGet=k=>HUDC[k]||(HUDC[k]={fx:0,fy:0,s:1});
const hudAl=()=>{const a=HUDC._a;return typeof a=='number'?cl(a,.15,1):1};const hudAlSet=d=>{HUDC._a=cl(Math.round((hudAl()+d)*20)/20,.15,1)};
const hudSz=d=>{const o=hudGet(HE.sel);o.s=cl(Math.round(((o.s||1)+d)*10)/10,.6,1.8)};
$('hudb').onclick=hudOpen;$('hm').onclick=()=>hudSz(-.1);$('hp').onclick=()=>hudSz(.1);$('hom').onclick=()=>hudAlSet(-.1);$('hop').onclick=()=>hudAlSet(.1);
$('hrs').onclick=()=>{HUDC={}};
$('hsv').onclick=()=>{try{localStorage.setItem('arr_hud',JSON.stringify(HUDC))}catch(e){}hudClose();soon('HUD salvo!')};
$('hcx').onclick=()=>{try{HUDC=JSON.parse(HE.bk)}catch(e){HUDC={}}hudClose()};
$('hudc').addEventListener('pointerdown',e=>{try{$('hudc').setPointerCapture(e.pointerId)}catch(_){}let b=null,bd=1e9;const tie=[];HK.forEach(k=>{const q=BT[k](),d=Math.hypot(e.clientX-q.x,e.clientY-q.y);if(d<q.r*1.1){tie.push([k,d]);if(d<bd){bd=d;b=k}}});{const t=tie.filter(z=>z[1]<bd+4).map(z=>z[0]);if(t.length>1&&t.includes(HE.sel))b=t[(t.indexOf(HE.sel)+1)%t.length]}if(!b){for(const k of HPK.slice().reverse()){const r=hudRect(k);if(e.clientX>=r.x&&e.clientX<=r.x+r.w&&e.clientY>=r.y&&e.clientY<=r.y+r.h){HE.sel=k;const o=hudGet(k);HE.drag={k,pn:1,sx:e.clientX,sy:e.clientY,f0:o.fx||0,g0:o.fy||0};HE.id=e.pointerId;break}}}if(b){HE.sel=b;const q=BT[b]();HE.drag={k:b,ox:e.clientX-q.x,oy:e.clientY-q.y};HE.id=e.pointerId}});
$('hudc').addEventListener('pointermove',e=>{const d=HE.drag;if(!d||e.pointerId!=HE.id)return;if(d.pn){const o=hudGet(d.k);o.fx=d.f0+(e.clientX-d.sx)/W;o.fy=d.g0+(e.clientY-d.sy)/H;const f=hudOff(d.k);o.fx=f.dx/W;o.fy=f.dy/H;return}const b=HB[d.k](),o=hudGet(d.k);o.fx=(e.clientX-d.ox-b.x)/W;o.fy=(e.clientY-d.oy-b.y)/H});
const hudUp=e=>{if(HE.drag&&e.pointerId==HE.id)HE.drag=null};$('hudc').addEventListener('pointerup',hudUp);$('hudc').addEventListener('pointercancel',hudUp);
var camAimD=170,camSh=0,CPL=[-.25,.55],MMR=null,fc={x:0,y:0,h:700,k:'',hid:null,hide:0},SN=1,SNC=1,SNA=1,SNM=1,ads=0,adsK=0,kick=0,pcd=0,lastT=null,cdist=170,ccl=170,capA=.27,csh=1,cyaw=0,cpit=.25,cm={on:0,id:-1,x:0,y:0},fl={on:0,id:-1,x:0,y:0};
function FR(){return lastT&&G&&!G.room&&!G.p.dead?.28:1}
function wr(a){while(a>Math.PI)a-=6.2832;while(a<-Math.PI)a+=6.2832;return a}
const RBL=()=>{const y=H*.5,x=W-80;return[['up',x,y-48],['dn',x,y+48],['lf',x-48,y],['rt',x+48,y],['tg',x,y+112],['wt',x-82,y+112],['tm',x,Math.min(y+148,H-20)]]};
function rbHit(x,y){for(const b of RBL())if(Math.hypot(x-b[1],y-b[2])<(b[0]=='tg'?34:b[0]=='wt'?44:b[0]=='tm'?30:26))return b[0];return ''}
function mmTap(x,y){const r=MMR;if(r&&x>=r.mx&&x<=r.mx+r.ms&&y>=r.my&&y<=r.my+r.ms){const wx=cl(MX0+(x-r.mx)/r.ms*MSZ,0,S),wy=cl(MY0+(y-r.my)/r.ms*MSZ,0,S);if(fc.w){let b=null,bd=1e9;for(const o of G.f){if(o.dead)continue;const d=Math.hypot(o.x-wx,o.y-wy);if(d<bd){bd=d;b=o}}if(b){G.spec=b;fc.x=b.x;fc.y=b.y}return 1}fc.x=wx;fc.y=wy;return 1}return 0}
function toggleWatch(){if(!G||!G.room)return;fc.w=fc.w?0:1;fc.k='';fc.hid=null;if(fc.w){const s=cfo();fc.x=s.x;fc.y=s.y;CPL=[-.25,.55];cpit=cl(cpit,-.25,.55);if(s.ang!=null)cyaw=s.ang}else{CPL=[-.45,1.45];cpit=.6}}
function roomCam(dt){let mx=(keys.KeyD?1:0)-(keys.KeyA?1:0),my=(keys.KeyS?1:0)-(keys.KeyW?1:0);
if(js.on){const dx=js.x-js.ox,dy=js.y-js.oy,l=Math.hypot(dx,dy);if(l>6){const k=Math.min(1,l/(46*U));mx=dx/l*k;my=dy/l*k}}
const m=Math.hypot(mx,my);if(m>1){mx/=m;my/=m}
const sp=(300+fc.h*.9)*(keys.ShiftLeft||keys.ShiftRight?2.2:1),w=rel2w(mx,my);
fc.x=cl(fc.x+w[0]*sp*dt,0,S);fc.y=cl(fc.y+w[1]*sp*dt,0,S);
const hv=(keys.KeyE||keys.Space||fc.k=='up'?1:0)-(keys.KeyQ||keys.KeyC||fc.k=='dn'?1:0);
fc.h=cl(fc.h+hv*(250+fc.h*.8)*dt,40,3000);cyaw+=((fc.k=='rt'?1:0)-(fc.k=='lf'?1:0))*2.2*dt}
C.addEventListener('wheel',e=>{if(mode=='play'&&G&&G.room){fc.h=cl(fc.h*(e.deltaY>0?1.12:.89),40,3000);e.preventDefault()}},{passive:false});
function specLock(){return !!G&&(G.room?!!fc.w:!!G.p.dead)}
function rel2w(mx,my){const c=Math.cos(cyaw),n=Math.sin(cyaw);return[-my*c-mx*n,-my*n+mx*c]}
const _av=new THREE.Vector3();
function adsSens(){if(!ads)return 1;return Math.max(.15,Math.min(.75,sgFov(G.p)/65))*SNM}
function pSp(f,w){const mv=Math.hypot(f.vx||0,f.vy||0)>20;return(.03+(mv?.022:0))*(w.sc?2:1)*(1-.9*adsK)}
function aimP(){const p=G.p,w=WP[p.ws[p.cur]||0],sh=camSh||0,ca=Math.cos(cyaw),sa=Math.sin(cyaw);
let b=null,bs=1e9;const R0=Math.min(W,H)*(ads?.14:.24);
for(const e of G.f){if(e.tm==p.tm||e.dead||e.st!='ground'||e.invis>0)continue;
const dx=e.x-p.x,dy=e.y-p.y,d=Math.hypot(dx,dy);
if(d>w.rg*1.05||(e.bush&&e.rev<=0&&d>140))continue;
_av.set(e.x,40,e.y).project(cam3);if(_av.z>=1)continue;
const sx=(_av.x)*W/2,sy=(-_av.y)*H/2;
if(Math.abs(sy)>H*.46||Math.abs(sx)>W*.46)continue;
let pd=Math.hypot(sx,sy);
if(pd>R0*(e===lastT&&aA.on?1.6:1)||!los(p,e))continue;
const sc=pd+d*.02;if(sc<bs){bs=sc;b=e}}
{const nw=performance.now();if(nw-lastShot>350||b!==lastT)lockPit=cpit}lastT=b;AR0=R0;
if(b){const d=Math.hypot(b.x-p.x,b.y-p.y);{const pull=Math.max(0,lockPit-cpit);let hh=30+pull/.05*34;if(hh>=42)hh=56+Math.min(hh-56,34)*.15;_blt=b;_bkz=(hh+(b.jh||0)-(44+(p.jh||0)))/Math.max(40,d);_blk=pull>.012?1:0}const t=w.sp>0?Math.min(.5,d/w.sp):0,k=w.pel?0:.8;
return Math.atan2(b.y+(b.vy||0)*t*k-p.y,b.x+(b.vx||0)*t*k-p.x)}
_bkz=cl(aimTan,-.1,.1);_blk=0;_blt=null;return cyaw}
function hop(p){if(p.st=='ground'&&p.jh==0&&!p.dead&&!(p.dn>0)){p.jv=300;jumpS()}}
let stT=0,hbT=0;function pre(dt){const p=G.p;if(G.room){if(fc.w){const s=cfo();fc.x=s.x;fc.y=s.y}else roomCam(dt)}else{if(p.st=='ground'&&!p.dead&&!(p.dn>0)&&p.jh==0&&Math.hypot(p.vx||0,p.vy||0)>60){stT-=dt;if(stT<=0){stT=(p.rn||0)>=1&&!p.rt&&!p.hl?.24:.34;stepS(p,stT<.3)}}else stT=0;if(p.st=='ground'&&!p.dead&&p.hp<35){hbT-=dt;if(hbT<=0){hbT=.85;hb()}}else hbT=0}sndBots(dt);sndAmb(dt,p);if(p.st!='ground'||p.dead)ads=0;{const fp=!!ads&&sgFP(p);if(fp&&!pFP)cpit=.25;pFP=fp}adsK+=((ads?1:0)-adsK)*Math.min(1,dt*(WP[p.ws[p.cur]||0].sc?6:10));if(specLock()){const s=cfo();if(s&&s.ang!=null){cyaw+=wr(s.ang-cyaw)*Math.min(1,dt*8);cpit+=(.25-cpit)*Math.min(1,dt*6)}}else cyaw+=((keys.ArrowRight?1:0)-(keys.ArrowLeft?1:0))*2.2*dt;if(aA.on&&!p.dead&&p.st=='ground'){const a_=aimP();if(lastT&&!specLock())cyaw+=wr(a_-cyaw)*Math.min(1,dt*4);shoot(p,a_)};p.jv-=900*dt;{const air=p.jh>0;p.jh+=p.jv*dt;if(p.jh<=0){p.jh=0;p.jv=0;if(air&&p.st=='ground')landS(.6)}}}
const PTS=new Set();addEventListener('pointerdown',e=>{PTS.add(e.pointerId)},{capture:true,passive:true});['pointerup','pointercancel'].forEach(t=>addEventListener(t,e=>{PTS.delete(e.pointerId)},{capture:true,passive:true}));
C.addEventListener('contextmenu',e=>e.preventDefault());C.addEventListener('pointerup',e=>{if(e.button==2)ads=0});
C.addEventListener('pointerdown',e=>{if(mode!='play')return;if(G&&G.kc&&G.kc.on){if(G.kc.t>.6)G.kc.on=0;return}try{C.setPointerCapture(e.pointerId)}catch(_){}const x=e.clientX,y=e.clientY,p=G.p;if(e.button==2&&!p.dead&&!G.room&&p.st=='ground'){ads=1;return}if(trHit(x,y))return;if(p.dead||G.room){const q=BT.spc();if(G.room){const ab=rbHit(x,y);if(ab=='tg'){fc.hide^=1;fc.k='';return}if(ab=='tm'){fc.tp^=1;fc.k='';snd(560,.08,'triangle',.05,200);return}if(teamHit(x,y))return;if(ab=='wt'&&!fc.hide){toggleWatch();return}if(mmTap(x,y))return;if(!fc.hide){if(ab&&!fc.w){fc.k=ab;fc.hid=e.pointerId;return}}}if(Math.hypot(x-q.x,y-q.y)<q.r*(G.room&&fc.hide?.8:1.3))cycleSpec();else if(G.room&&!fc.w&&e.pointerType!='mouse'&&x<W*.45&&!js.on){js.on=1;js.id=e.pointerId;js.ox=js.x=x;js.oy=js.y=y}else if(!cm.on){cm.on=1;cm.id=e.pointerId;cm.x=x;cm.y=y}return}
if(e.pointerType=='mouse'){if(p.st=='plane'){jump(p);return}if(e.button==0){aA.on=1;aA.id=e.pointerId;aA.lx=x;aA.ly=y}else{cm.on=1;cm.id=e.pointerId;cm.x=x;cm.y=y}return}
const hit=b=>{const q=BT[b]();return Math.hypot(x-q.x,y-q.y)<q.r*1.2};
if(p.st=='plane'){if(hit('jmp'))jump(p);else{cm.on=1;cm.id=e.pointerId;cm.x=x;cm.y=y}return}
if(sgTap(x,y))return;
if(hit('atk')&&p.st=='ground'){aA.on=1;aA.id=e.pointerId;aA.lx=x;aA.ly=y;shoot(p,aimP())}
else if(hit('rev')&&(p.rt||nearDown(p)))toggleRev(p);else if(hit('hab')&&p.ch>0)ability(p);else if(hit('ice'))throwIce(p);else if(hit('rld'))reload(p);else if(hit('swp'))swap(p);else if(hit('ban'))useHeal(p,'b');else if(hit('kit'))useHeal(p,'k');else if(hit('pik'))doPick(p);else if(hit('hop'))hop(p);else if(hit('sld'))slide(p);else if(hit('ads'))ads^=1;else if(hit('eye')){fl.on=1;fl.id=e.pointerId;fl.x=x;fl.y=y}
else if(x<W*.45&&(!js.on||!PTS.has(js.id))){js.on=1;js.id=e.pointerId;js.ox=js.x=x;js.oy=js.y=y}
else if(x>=W*.45&&(!cm.on||!PTS.has(cm.id))){cm.on=1;cm.id=e.pointerId;cm.x=x;cm.y=y}});
C.addEventListener('pointermove',e=>{if(aA.on&&aA.id==e.pointerId){if(!specLock()){const k=.0035*SN*SNA*FR();cyaw+=(e.clientX-aA.lx)*k*adsSens();cpit=cl(cpit+(e.clientY-aA.ly)*k*(FR()<1?2.3:1)*.4*adsSens(),CPL[0],CPL[1])}aA.lx=e.clientX;aA.ly=e.clientY}if(cm.on&&cm.id==e.pointerId){if(!specLock()){const k=.0035*SN*SNC*FR();cyaw+=(e.clientX-cm.x)*k*adsSens();cpit=cl(cpit+(e.clientY-cm.y)*k*(FR()<1?2.3:1)*.4*adsSens(),CPL[0],CPL[1])}cm.x=e.clientX;cm.y=e.clientY}if(fl.on&&fl.id==e.pointerId){if(!specLock()){cyaw+=(e.clientX-fl.x)*.0045*SN*SNC;cpit=cl(cpit+(e.clientY-fl.y)*.0015*SN*SNC,CPL[0],CPL[1])}fl.x=e.clientX;fl.y=e.clientY}if(js.on&&js.id==e.pointerId){js.x=e.clientX;js.y=e.clientY}});
function up(e){if(mode!='play'){if(cm.on&&cm.id==e.pointerId)cm.on=0;if(js.on&&js.id==e.pointerId)js.on=0;if(aA.on&&aA.id==e.pointerId)aA.on=0;return}if(fc.hid==e.pointerId){fc.k='';fc.hid=null}if(aA.on&&aA.id==e.pointerId)aA.on=0;if(js.on&&js.id==e.pointerId)js.on=0;if(cm.on&&cm.id==e.pointerId)cm.on=0;if(fl.on&&fl.id==e.pointerId){fl.on=0;cyaw=G.p.ang}}
C.addEventListener('pointerup',up);C.addEventListener('pointercancel',up);C.addEventListener('lostpointercapture',up);addEventListener('pointerup',up,{passive:true});addEventListener('pointercancel',up,{passive:true});addEventListener('blur',()=>{aA.on=0;js.on=0;cm.on=0});
(function(){const ro={passive:false},clr=()=>{PTS.clear();aA.on=0;js.on=0;cm.on=0;if(fl.on&&fl.id!=-9){fl.on=0;if(G&&G.p)cyaw=G.p.ang}fc.k='';fc.hid=null};
['gesturestart','gesturechange','gestureend'].forEach(t=>document.addEventListener(t,e=>e.preventDefault(),ro));
['touchstart','touchmove'].forEach(t=>document.addEventListener(t,e=>{if(mode=='play'&&(e.target===C||e.target===ren.domElement))e.preventDefault()},ro));
['touchend','touchcancel'].forEach(t=>document.addEventListener(t,e=>{if(e.touches.length==0)clr()},{passive:true,capture:true}));
document.addEventListener('visibilitychange',()=>{if(document.hidden)clr()});})();
addEventListener('keydown',e=>{keys[e.code]=1;if(mode!='play')return;const p=G.p;if(p.dead||G.room){if(G.room){if(e.code=='Tab'||e.code=='KeyT'){cycleSpec();e.preventDefault()}else if(e.code=='KeyV')toggleWatch();else if(e.code=='Space')e.preventDefault()}else if(e.code=='KeyE'||e.code=='Space')cycleSpec();return}
if(e.code=='Space'){if(p.st=='plane')jump(p);else hop(p);e.preventDefault()}else if(e.code=='KeyV'&&!fl.on){fl.on=1;fl.id=-9}else if(e.code=='KeyZ')ads^=1;else if(e.code=='KeyX')toggleRev(p);else if(e.code=='KeyC')ability(p);else if(e.code=='KeyR')reload(p);else if(e.code=='KeyQ')swap(p);else if(e.code=='KeyE')doPick(p);else if(e.code=='KeyG')useHeal(p,'b');else if(e.code=='KeyF')useHeal(p,'k');else if(e.code=='KeyB')shToggle();else if(e.code=='KeyH')throwIce(p);else if(e.code=='ShiftLeft')slide(p)});
addEventListener('keyup',e=>{keys[e.code]=0;if(e.code=='KeyV'&&fl.on&&fl.id==-9){fl.on=0;if(G)cyaw=G.p.ang}});
const snUI=()=>{$('sv').textContent=Math.round(SN*100)+'%';$('sv2').textContent=Math.round(SNC*100)+'%';$('sv3').textContent=Math.round(SNA*100)+'%';$('sv4').textContent=Math.round(SNM*100)+'%'},snSv=()=>{try{localStorage.setItem('arr_sens',JSON.stringify({g:SN,c:SNC,a:SNA,m:SNM}))}catch(e){}},snR=v=>cl(Math.round(v*10)/10,.3,2);
try{const o=JSON.parse(localStorage.getItem('arr_sens')||'{}');if(o.g)SN=snR(o.g);if(o.c)SNC=snR(o.c);if(o.a)SNA=snR(o.a);if(o.m)SNM=snR(o.m)}catch(e){}
const snB=(a,get,set)=>{$('sm'+a).onclick=()=>{set(snR(get()-.1));snUI();snSv()};$('sp'+a).onclick=()=>{set(snR(get()+.1));snUI();snSv()}};
snB('',()=>SN,v=>SN=v);snB('2',()=>SNC,v=>SNC=v);snB('3',()=>SNA,v=>SNA=v);snB('4',()=>SNM,v=>SNM=v);
$('snr').onclick=()=>{SN=SNC=SNA=SNM=1;snUI();snSv()};snUI();
function mref(){document.querySelectorAll('.tb').forEach(b=>b.classList.toggle('on',+b.dataset.t==TB));
document.querySelectorAll('.mb').forEach(b=>b.classList.toggle('on',+b.dataset.m==MS));
$('subm').style.display=TB==0||TB==2?'':'none';document.querySelectorAll('.mb').forEach(b=>b.style.display=b.classList.contains('rmb')?(TB==2?'':'none'):(TB==2?'none':''));
const al=$('alone');al.style.display=TB==0&&MS>1?'':'none';al.classList.toggle('on',AL);al.textContent=AL?'COMECAR SOZINHO: SIM':'COMECAR SOZINHO: NAO'}
let tt=0;function soon(m){const t=$('toast');t.textContent=m||'Em breve';t.classList.add('show');clearTimeout(tt);tt=setTimeout(()=>t.classList.remove('show'),1400);snd(420,.08,'triangle',.04,60)}
document.querySelectorAll('.soon').forEach(b=>b.onclick=()=>{if(b.id=='gear')$('set').classList.remove('hide');else soon()});
document.querySelectorAll('.tb').forEach(b=>b.onclick=()=>{const t=+b.dataset.t;TB=t;if(t==1){MS=4;AL=true}else if(t==2){MS=4;AL=false}else{MS=sMS;AL=sAL}mref()});
const svPC=()=>{try{localStorage.setItem('arr_pc',JSON.stringify(PC))}catch(e){}};
const allCl=()=>(PC&&PC.own?[PC]:[]).concat(TP.map((p,i)=>({id:'p'+i,n:p[2],tag:p[3],col:p[1],sym:i,m:12+(i*7)%18,w:0})));
function clPool(teams){const pool=clShuf(allCl().filter(c=>!PC||c.id!=PC.id));teams.forEach((t,i)=>{const c=i==0?PC:pool[(i-1)%pool.length];t.cl=c||null;if(c){t.col=c.col;t.sym=c.sym;t.nm=c.n;t.tag=c.tag}})}
const cw=c=>(c.w||0)+(CW[c.id]||0);
const clBuff=c=>{const w=cw(c);return w>=10?Math.floor(w/10)*.05:0};
function clWin(id){CW[id]=(CW[id]||0)+1;try{localStorage.setItem('arr_cw2',JSON.stringify(CW))}catch(e){}}
const CLT_MS=300000;let clLast=0;
function clRandWin(){const L=allCl();if(!L.length)return;clWin(L[Math.random()*L.length|0].id);try{const p=$('cln');if(p&&!p.classList.contains('hide'))clRender()}catch(e){}}
function clSync(){const now=Date.now();if(!clLast){try{clLast=+localStorage.getItem('arr_cwt')||0}catch(e){}if(!clLast||clLast>now)clLast=now}
const k=Math.floor((now-clLast)/CLT_MS);if(k>0){clLast=k>288?now:clLast+k*CLT_MS}
try{localStorage.setItem('arr_cwt',String(clLast))}catch(e){}}
setTimeout(()=>{clSync();setInterval(clSync,10000);document.addEventListener('visibilitychange',()=>{if(!document.hidden)clSync()})},0);
function clOf(t){return t.cl||(t.m.find(o=>o.cl)||{}).cl||null}
function clAcc(WT){const M=new Map();if(!G)return M;for(const T of G.teams){const c=clOf(T);if(!c)continue;let e=M.get(c.id);if(!e){e={c,k:0,w:0,pk:{}};M.set(c.id,e)}if(T===WT)e.w=1;for(const o of T.m){const n=o.kills||0;e.k+=n;if(n>0){const key=o.cm||o.bn||o.name;e.pk[key]=(e.pk[key]||0)+n}}}
for(const e of M.values()){e.xp=Math.round((20+e.k*5+(e.w?100:0))*(PC&&e.c.id==PC.id&&clBonus()?1.15:1));const q=CS[e.c.id]||(CS[e.c.id]={g:0,k:0,xp:0});q.pk=q.pk||{};q.g++;q.k+=e.k;q.xp+=e.xp;for(const n in e.pk)q.pk[n]=(q.pk[n]||0)+e.pk[n]}
try{localStorage.setItem('arr_cs',JSON.stringify(CS))}catch(e){}return M}
function clSum(M){const e=M&&PC&&M.get(PC.id);return e?'   Clã: +'+e.k+' elim. / +'+e.xp+' XP':''}
function clTopK(c){const pk=(CS[c.id]||{}).pk||{};let b=null;for(const n in pk)if(!b||pk[n]>b[1])b=[n,pk[n]];return b}
function clBtn(){const c=$('clc').getContext('2d');c.clearRect(0,0,64,64);emb(c,32,28,26,PC?PC.col:TP[0][1],PC?PC.sym:0)}
function ecv(c,n){const e=document.createElement('canvas');e.width=e.height=n;emb(e.getContext('2d'),n/2,n*.44,n*.41,c.col,c.sym);e.style.cssText='width:'+n/2+'px;height:'+n/2+'px;background:none;border:0;max-width:none';return e}
function clXp(c){return 0+((CS[c.id]||{}).xp||0)}
function clRank(){return allCl().sort((a,b)=>cw(b)-cw(a)||clXp(b)-clXp(a)||String(a.n).localeCompare(String(b.n)))}
function clLdr(c){return c.own?PN:clRoster(c)[0]}
function clBonus(){return (+ls('arr_clbx')||0)>Date.now()}
const CLX={q:'',s:'w',o:0};
function clList(L){const q=CLX.q.trim().toLowerCase();let a=L.map((c,i)=>[c,i]);if(q)a=a.filter(([c])=>(c.n+' '+c.tag).toLowerCase().includes(q));if(CLX.o)a=a.filter(([c])=>c.m<30);if(CLX.s=='l')a.sort((x,y)=>clXp(y[0])-clXp(x[0]));else if(CLX.s=='m')a.sort((x,y)=>y[0].m-x[0].m);return a}
function clRow(c,rk,cls){const d=document.createElement('div'),xp=clXp(c),mine=PC&&PC.id==c.id,lv=Math.floor(xp/300)+1,mm=c.m+(mine&&!c.own?1:0);d.className='cxc'+(cls=='me'?' me':mine?' mine':'');
const em=document.createElement('div');em.className='cxe';em.appendChild(ecv(c,128));const rb=document.createElement('i');rb.className='cxr';rb.textContent='#'+rk;em.appendChild(rb);d.appendChild(em);
const b=document.createElement('div');b.className='cxi';
b.innerHTML='<div class="cxn"><span class="tg2" style="color:'+c.col+'">['+esc(c.tag)+']</span><b>'+esc(c.n)+'</b>'+(cls=='me'?'<span class="cxme">SEU CL\u00c3</span>':'')+'</div><div class="cxm"><svg class="ic"><use href="#i-group"/></svg> '+mm+'/30</div><div class="cxs2"><span><svg class="ic"><use href="#i-trophy"/></svg> Vit\u00f3rias <b>'+fmt(cw(c))+'</b></span><span class="lv2"><svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" style="vertical-align:-2px"><path d="M12 22a7 7 0 0 0 7-7c0-4-3-6-4-10-2 1-3 3-3 5-1-1-2-2-2-4C7 8 5 11 5 15a7 7 0 0 0 7 7z"/></svg> NV. '+lv+'</span></div>';
d.appendChild(b);const j=document.createElement('button');j.type='button';j.className='cxj'+(mine?' on':'');j.textContent=mine?'MEU CL\u00c3':'ENTRAR';
j.onclick=e=>{e.stopPropagation();if(mine){$('cln').classList.add('hide');clMy();$('cmy').classList.remove('hide')}else clJoin(c)};d.appendChild(j);d.onclick=()=>clInfo(c);return d}
function clRst(){const e=$('rkc');if(!e)return;const n=new Date(),m=new Date(n);m.setHours(24,0,0,0);const s=Math.max(0,Math.floor((m-n)/1000));e.textContent=String(s/3600|0).padStart(2,'0')+'h '+String((s%3600)/60|0).padStart(2,'0')+'m '+String(s%60).padStart(2,'0')+'s'}
function clRender(){const L=clRank(),me=$('clme'),g=$('clg'),R=$('rkr');me.innerHTML='';g.innerHTML='';$('clmy2').classList.toggle('off',!PC);
const pi=PC?L.findIndex(x=>x.id==PC.id):-1;
if(PC&&pi>=0)me.appendChild(clRow(L[pi],pi+1,'me'));else{const d=document.createElement('div');d.className='rkno';d.textContent='Voc\u00ea n\u00e3o est\u00e1 em nenhum cl\u00e3. Toque em um cl\u00e3 para entrar ou crie o seu!';me.appendChild(d)}
{const A=clList(L);A.forEach(([c,i])=>g.appendChild(clRow(c,i+1)));if(!A.length){const d=document.createElement('div');d.className='rkno';d.textContent='Nenhum cl\u00e3 encontrado';g.appendChild(d)}}
const RW=[['<svg class="ic"><use href="#i-gem"/></svg>','500 Cristais'],['<svg class="ic"><use href="#i-box"/></svg>','Caixa \u00c9pica do Cl\u00e3 <small>+2.000 moedas</small>'],['<svg class="ic"><use href="#i-medal"/></svg>','B\u00f4nus XP +15% por 3 dias']];
R.innerHTML='<div class="rkh"><svg class="ic"><use href="#i-chart"/></svg> Seu Posicionamento</div><div class="rkb"><span class="e"><svg class="ic"><use href="#i-trophy"/></svg></span><div>'+(PC&&pi>=0?'Posi\u00e7\u00e3o Atual: #'+(pi+1)+'<small>Cl\u00e3 '+esc(PC.n)+' \u00b7 '+fmt(clXp(PC))+' XP</small>':'Sem cl\u00e3<small>Entre em um cl\u00e3 para competir</small>')+'</div></div><hr><div class="rkh"><svg class="ic"><use href="#i-gift"/></svg> Recompensas Di\u00e1rias (Top 3)</div>'
+RW.map((q,i)=>'<div class="rkb"><span class="n">'+(i+1)+'</span><span class="e">'+q[0]+'</span><div>'+q[1]+'</div></div>').join('')
+'<hr><div class="rkh"><svg class="ic"><use href="#i-clock"/></svg> Reset em:</div><div class="rkc" id="rkc"></div><small>Todo dia os 3 melhores cl\u00e3s ganham. A recompensa chega nas <svg class="ic"><use href="#i-bell"/></svg> notifica\u00e7\u00f5es: toque em COLETAR.</small>';clRst()}
let fc_=TP[0][1],fs_=0;
function clJoin(c){PC={id:c.id,n:c.n,tag:c.tag,col:c.col,sym:c.sym};svPC();clBtn();mref();$('clinf').classList.add('hide');clRender();$('cln').classList.add('hide');clMy();$('cmy').classList.remove('hide');soon('Voc\u00ea entrou em '+c.n)}
function clInfo(c){const I=$('cli'),on=PC&&PC.id==c.id,L=clRank(),r=clRoster(c),own=!!c.own;I.innerHTML='';I.appendChild(ecv(c,120));
const add=(h,cls)=>{const d=document.createElement('div');if(cls)d.className=cls;d.innerHTML=h;I.appendChild(d);return d};
add('<span style="color:'+c.col+'">'+c.n+'</span>','nm');add('['+c.tag+'] &middot; Posi\u00e7\u00e3o #'+(L.findIndex(x=>x.id==c.id)+1));
add('<svg class="ic"><use href="#i-trophy"/></svg> '+cw(c)+' vit\u00f3rias &middot; '+(c.m+(on&&!own?1:0))+' membros');{const q=CS[c.id]||{k:0,xp:0},tk=clTopK(c);add('<svg class="ic"><use href="#i-skull"/></svg> '+q.k+' kills &middot; XP '+clXp(c)+' &middot; N\u00edvel '+(Math.floor(clXp(c)/300)+1));if(tk)add('Jogador com mais kills: <b style="color:#ffd93b">'+esc(tk[0])+'</b> ('+tk[1]+')')}
{const bf=clBuff(c);if(bf>0)add('Buff: <b style="color:#7dff6a">+'+Math.round(bf*100)+'% dano e vida</b>')}add('Dono do cl\u00e3: <b style="color:#ffd93b"><svg class="ic"><use href="#i-star"/></svg> '+(own?PN:r[0])+'</b>');
add('Integrantes:');const ro=add('','ro');clMembers(c).forEach(m=>{const s=document.createElement('span');const pa=m.me?(function(){try{return localStorage.getItem('fs_pav')||''}catch(e){return ''}})():(window.arrAvByName?window.arrAvByName(m.n,c.id):'');s.innerHTML=(pa?'<img src="'+pa+'" alt="" style="width:20px;height:20px;border-radius:50%;object-fit:cover;vertical-align:middle;margin-right:4px;border:1px solid #ff6600">':'')+(m.leader?'<svg class="ic"><use href="#i-star"/></svg> ':'')+esc(m.n)+ytB(m.n)+(m.me?' (voc\u00ea)':'');ro.appendChild(s)});
const j=$('cljoin');j.textContent=on?'SAIR DO CL\u00c3':'ENTRAR';j.onclick=()=>{if(on){PC=null;svPC();clBtn();mref();$('clinf').classList.add('hide');clRender();soon('Voc\u00ea saiu do cl\u00e3')}else clJoin(c)};$('clinf').classList.remove('hide')}
function clMembers(c){const on=PC&&PC.id==c.id;if(c.own)return[{n:PN,leader:1,me:1}].concat((c.mem||[]).map(n=>({n})));return clRoster(c).map((n,i)=>({n,leader:i==0})).concat(on?[{n:PN,me:1}]:[]).concat(on?(PC.xm||[]).map(n=>({n})):[])}
const esc=t=>String(t).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
function clMy(){const c=PC,B=$('cmb');if(!c)return;B.innerHTML='';if(c.own)clClean();
const st=CS[c.id]||{g:0,k:0,xp:0},w=cw(c),L=clRank(),pos=L.findIndex(x=>x.id==c.id)+1,lv=Math.floor(clXp(c)/300)+1,xp=clXp(c)%300,bf=clBuff(c),mem=clMembers(c),col=c.col,MAXM=30,tk=clTopK(c),nx=10-w%10,kpg=st.g?(st.k/st.g).toFixed(1):'0.0';
const ST=[['<svg class="ic"><use href="#i-trophy"/></svg>','Vitórias',w],['<svg class="ic"><use href="#i-game"/></svg>','Partidas',st.g],['<svg class="ic"><use href="#i-skull"/></svg>','Eliminações',st.k],['<svg class="ic"><use href="#i-swords"/></svg>','Abates/partida',kpg],['<svg class="ic"><use href="#i-star"/></svg>','XP total',clXp(c)],['<svg class="ic"><use href="#i-group"/></svg>','Membros',mem.length+'/'+MAXM]];
B.innerHTML='<div class="cyl" style="--cc:'+col+';background:radial-gradient(circle at 50% 0,'+col+'55,transparent 70%),#1e1916"><div class="cye" id="cyem"></div><div class="cyn" style="color:'+col+'">'+esc(c.n)+'</div><div class="cyb"><span class="tg">['+esc(c.tag)+']</span><span><svg class="ic"><use href="#i-star"/></svg> Nível '+lv+'</span><span><svg class="ic"><use href="#i-medal"/></svg> #'+pos+' de '+L.length+'</span></div><div class="cyld">Líder: <b><svg class="ic"><use href="#i-star"/></svg> '+esc(mem[0]?mem[0].n:PN)+'</b>'+(c.own?' · clã criado por você':'')+'</div><div class="cyxp"><i style="width:'+(xp/3)+'%;background:'+col+'"></i></div><small>XP '+xp+' / 300 · faltam '+(300-xp)+' para o nível '+(lv+1)+'</small></div>'
+'<div class="cyr"><div class="cyh"><svg class="ic"><use href="#i-chart"/></svg> Estatísticas</div><div class="cyg">'+ST.map(q=>'<div><i>'+q[0]+'</i><b>'+q[2]+'</b><small>'+q[1]+'</small></div>').join('')+'</div>'
+'<div class="cyf"><div><h4><svg class="ic"><use href="#i-medal"/></svg> Jogador com mais kills</h4><div class="v">'+(tk?esc(tk[0])+'<small>· '+tk[1]+' kills</small>':'<small>Ainda sem eliminações</small>')+'</div></div><div><h4><svg class="ic"><use href="#i-shield"/></svg> Buff do clã</h4><div class="bf'+(bf>0?' on':'')+'">'+(bf>0?'+'+Math.round(bf*100)+'% dano e vida':'Nenhum buff ativo ainda')+'</div><small style="font-size:9px;opacity:.8">Próximo buff em '+nx+' vitória'+(nx>1?'s':'')+' ('+(10-nx)+'/10)</small></div></div></div>'
+'<details class="cym" open><summary><svg class="ic"><use href="#i-group"/></svg> Integrantes ('+mem.length+') ▾</summary><div class="cmadd"><small>Toque no ✕ de um membro para remover</small><button type="button" class="cminv" id="cminv">+ CONVIDAR</button></div><div class="mgrid" id="cyro"></div></details>';
$('cyem').appendChild(ecv(c,100));$('cminv').onclick=clInvOpen;
const ro=$('cyro');mem.forEach(m=>{const h=clHash(m.n+c.id),nv=m.me?lv:isLeg(m.n)?legLv(m.n):1+h%30,d=document.createElement('div');d.className='mc'+(m.me?' me':'')+(m.leader?' ld':'');const role=m.leader?'LÍDER':m.me?'VOCÊ':'MEMBRO';
const pa=m.me?(function(){try{return localStorage.getItem('fs_pav')||''}catch(e){return ''}})():(window.arrAvByName?window.arrAvByName(m.n,c.id):'');
d.innerHTML='<div class="av" style="background:'+(pa?'url(&quot;'+pa+'&quot;) center/cover no-repeat':'radial-gradient(circle at 35% 30%,#fff6,transparent 55%),'+col)+'">'+(pa?'':esc(m.n.charAt(0).toUpperCase()))+(m.leader?'<u><svg class="ic"><use href="#i-crown"/></svg></u>':'')+'</div><div class="mi"><b><span style="color:'+col+'">['+esc(c.tag)+']</span> '+esc(m.n)+ytB(m.n)+'</b><small>'+(m.me&&m.leader?'LÍDER · VOCÊ':role)+' · Nv '+nv+'</small></div>';try{const pb=m.me?(localStorage.getItem('fs_pbn')||''):(window.arrBnByName?window.arrBnByName(m.n):'');if(pb)d.style.setProperty('background-image','linear-gradient(90deg,#171311f5,#171311b0),url("'+pb+'")','important'),d.style.setProperty('background-size','cover','important'),d.style.setProperty('background-position','center','important');if(isOwner(m.n))d.classList.add('ow');else if(isInfl(m.n))d.classList.add('vf');if(!m.me&&window.arrEnsure)window.arrEnsure(m.n,()=>{try{if(!$('cmy').classList.contains('hide'))clMy()}catch(e){}})}catch(e){}d.style.cursor='pointer';d.onclick=e=>{if(e.target.closest('.cmx'))return;if(m.me){try{$('prof').click()}catch(_){}}else if(window.frProf)window.frProf(m.n)};if(isLeg(m.n)){d.classList.add('inf');const sm=d.querySelector('small');if(sm&&!m.leader&&!m.me)sm.textContent='MEMBRO · Nv '+nv}if(!m.me&&!m.leader&&(c.own||(PC.xm||[]).includes(m.n))){const x=document.createElement('button');x.type='button';x.className='cmx';x.innerHTML='<svg class="ic"><use href="#i-close"/></svg>';x.title='Remover do clã';x.onclick=e=>{e.stopPropagation();clRemove(m.n,x)};d.appendChild(x)}ro.appendChild(d)});
const j=$('cmleave');j.textContent=c.own?'DESFAZER CLÃ':'SAIR DO CLÃ';j.onclick=()=>{PC=null;svPC();clBtn();mref();$('cmy').classList.add('hide');clRender();$('cln').classList.remove('hide');soon('Você saiu do clã');qxAdd('Você saiu do clã')}}
/* ---------- adicionar / remover pessoas do cla ---------- */
const INV=new Set();let cmRk=null,cmRt=0;
const clInvL=()=>PC?(PC.own?(PC.mem||(PC.mem=[])):(PC.xm||(PC.xm=[]))):[];
const clHasInf=()=>!!PC&&clInvL().includes(INFN);
function clInvRefresh(){try{if(!$('cmy').classList.contains('hide'))clMy()}catch(e){}try{if(!$('cinv').classList.contains('hide'))clInvList()}catch(e){}}
function clInvite(n){if(!PC){soon('Entre ou crie um clã primeiro');return}
const L=clInvL(),max=PC.own?29:5,low=String(n).toLowerCase();
if(L.some(x=>String(x).toLowerCase()==low)){soon('@'+n+' já está no clã');return}
if(n!==INFN&&clTaken().has(low)){soon('@'+n+' já está em outro clã');return}
if(L.length>=max){soon('Clã cheio. Remova alguém primeiro');return}
if(INV.has(n)){soon('Convite já enviado');return}
INV.add(n);soon('Convite enviado para @'+n);clInvRefresh();
setTimeout(()=>{INV.delete(n);if(!PC)return;const L2=clInvL();if(L2.includes(n)||L2.length>=max){clInvRefresh();return}
if(n!==INFN&&Math.random()<.12){clNotify(n+' recusou o convite do clã');qxAdd(n+' recusou o convite do clã');clInvRefresh();return}
L2.push(n);if(PC.rm)PC.rm=PC.rm.filter(x=>x!==n);if(PC.own)PC.m=L2.length+1;svPC();
clNotify(n+' entrou no clã '+PC.n);qxAdd(n+' entrou no clã '+PC.n);clInvRefresh()},1000+Math.random()*1500)}
function clRemove(n,b){if(!PC)return;
if(cmRk!==n){cmRk=n;b.textContent='CONFIRMAR';b.classList.add('on');clearTimeout(cmRt);cmRt=setTimeout(()=>{cmRk=null;if(b.isConnected){b.innerHTML='<svg class="ic"><use href="#i-close"/></svg>';b.classList.remove('on')}},3000);return}
cmRk=null;clearTimeout(cmRt);const L=clInvL(),i=L.indexOf(n);if(i<0)return;L.splice(i,1);
if(PC.own){PC.m=L.length+1;(PC.rm||(PC.rm=[])).push(n)}
svPC();soon('@'+n+' removido do clã');qxAdd('@'+n+' foi removido do clã '+PC.n);clInvRefresh()}
function clInvOpen(){if(!PC){soon('Entre ou crie um clã primeiro');return}$('cinvq').value='';clInvList();$('cinv').classList.remove('hide')}
function clInvList(){const q=($('cinvq').value||'').trim().toLowerCase(),L=clInvL().map(x=>String(x).toLowerCase()),tk=clTaken(),me=String(PN).toLowerCase();
let pool=NMP.filter(n=>{const l=n.toLowerCase();return !tk.has(l)&&!L.includes(l)&&l!=me&&l!='voce'}).sort((a,b)=>clHash(a)-clHash(b));
const names=(L.includes(INFN.toLowerCase())?[]:[INFN]).concat(pool).filter(n=>!q||n.toLowerCase().includes(q)).slice(0,q?12:8);
const box=$('cinvl');box.innerHTML=names.length?'':'<div class="fre">Nenhum jogador sem clã encontrado</div>';
names.forEach(n=>{const inf=isLeg(n),d=document.createElement('div');d.className='cir'+(inf?' inf':'');
d.innerHTML='<div class="cn"><b>'+(inf?'∞ ':'')+esc(n)+ytB(n)+'</b><small>'+(inf?'Sem clã · Nv '+legLv(n):'Sem clã · Nv '+(1+clHash(n+'x')%30))+'</small></div>';
const b=document.createElement('button');b.type='button';b.dataset.n=n;const sent=INV.has(n);b.textContent=sent?'ENVIADO':'+ CONVIDAR';b.disabled=sent;d.appendChild(b);box.appendChild(d)})}
$('cinvl').onclick=e=>{const b=e.target.closest('button[data-n]');if(b&&!b.disabled)clInvite(b.dataset.n)};
$('cinvq').oninput=clInvList;$('cinvx').onclick=$('cinvc').onclick=()=>$('cinv').classList.add('hide');
function clNotify(m){const C=$('cnf'),d=document.createElement('div');d.className='cn';d.textContent=m;C.appendChild(d);setTimeout(()=>d.classList.add('out'),3200);setTimeout(()=>d.remove(),3700);while(C.children.length>4)C.firstChild.remove()}
let jt=0;function clSched(ms){clearTimeout(jt);jt=setTimeout(clTick,ms||6000+Math.random()*9000)}
function clTaken(){const t=new Set();for(const c of allCl()){if(c.own)continue;for(const n of clRoster(c))t.add(String(n).toLowerCase())}return t}
function clFree(used){const tk=clTaken(),ex=new Set((used||[]).map(n=>String(n).toLowerCase()));ex.add('voce');ex.add(String(PN).toLowerCase());if(PC&&PC.rm)PC.rm.forEach(n=>ex.add(String(n).toLowerCase()));const p=NMP.filter(n=>!tk.has(n.toLowerCase())&&!ex.has(n.toLowerCase()));if(!p.length)return null;let n=p[Math.random()*p.length|0];return n}
function clClean(){if(!PC||!PC.own||!PC.mem)return;const tk=clTaken(),keep=[],bad=[];for(const n of PC.mem){const k=String(n).toLowerCase();if(tk.has(k)||keep.some(x=>x.toLowerCase()==k))bad.push(n);else keep.push(n)}if(!bad.length)return;for(let i=0;i<bad.length;i++){const n=clFree(keep);if(n)keep.push(n)}PC.mem=keep;PC.m=keep.length+1;svPC()}
function clTick(){if(PC&&PC.own&&mode=='menu'){clClean();const mem=PC.mem||(PC.mem=[]);if(mem.length<27){const n=clFree(mem);if(!n){clSched();return}mem.push(n);PC.m=mem.length+1;svPC();clNotify(n+' entrou no clã '+PC.n);if(!$('cmy').classList.contains('hide'))clMy();if(!$('cln').classList.contains('hide'))clRender()}}clSched()}
function clForm(){const C=$('cln_c'),S=$('cln_s');C.innerHTML='';S.innerHTML='';CCOL.forEach(p=>{const b=document.createElement('button');b.className='sw'+(p==fc_?' on':'');b.style.background=p;b.onclick=()=>{fc_=p;clForm()};C.appendChild(b)});{const ci=document.createElement('input');ci.type='color';ci.className='cc'+(CCOL.includes(fc_)?'':' on');ci.value=/^#[0-9a-f]{6}$/i.test(fc_)?fc_:'#ffffff';ci.title='Cor personalizada';ci.onchange=()=>{fc_=ci.value;clForm()};C.appendChild(ci)}
for(let i=0;i<SYM.length;i++){const b=document.createElement('button');b.className='sy'+(i==fs_?' on':'');const e=document.createElement('canvas');e.width=e.height=64;emb(e.getContext('2d'),32,28,26,fc_,i);e.style.cssText='width:100%;height:100%;display:block';b.appendChild(e);b.onclick=()=>{fs_=i;clForm()};S.appendChild(b)}}
$('clnew').onclick=()=>{$('clf').classList.toggle('hide');clForm()};$('clno').onclick=()=>$('clf').classList.add('hide');
$('clok').onclick=()=>{const n=$('cln_n').value.trim(),t=$('cln_t').value.trim().toUpperCase().replace(/[^A-Z0-9]/g,'');if(n.length<3)return soon('Nome com 3+ letras');if(t.length<2)return soon('TAG com 2 ou 3 letras');PC={id:'u'+Date.now(),n,tag:t,col:fc_,sym:fs_,own:1,m:1,mem:[]};svPC();clBtn();mref();$('clf').classList.add('hide');clRender();soon('Clã criado!');qxAdd('Você criou o clã '+n+' ['+t+']');clSched(2500);clMy();$('cmy').classList.remove('hide')};
$('clb').onclick=()=>{$('clf').classList.add('hide');if(PC){clMy();$('cmy').classList.remove('hide')}else{clRender();$('cln').classList.remove('hide')}};$('clmy2').onclick=()=>{if(!PC)return;$('cln').classList.add('hide');clMy();$('cmy').classList.remove('hide')};$('cmrk').onclick=()=>{$('cmy').classList.add('hide');$('clf').classList.add('hide');clRender();$('cln').classList.remove('hide')};clBtn();if(PC&&PC.own){clClean();clSched(8000)}
{const q=$('clq'),fb=$('clfb'),fl=$('clfl');q.oninput=()=>{CLX.q=q.value;clRender()};fb.onclick=()=>{fl.classList.toggle('hide');fb.classList.toggle('on')};
fl.querySelectorAll('button').forEach(b=>b.onclick=()=>{if(b.dataset.s)CLX.s=b.dataset.s;else CLX.o=CLX.o?0:1;fl.querySelectorAll('button').forEach(x=>x.classList.toggle('on',x.dataset.s?x.dataset.s==CLX.s:!!CLX.o));clRender()});
$('clmy2').onclick=()=>{if(!PC)return soon('Voc\u00ea ainda n\u00e3o est\u00e1 em um cl\u00e3');$('cln').classList.add('hide');clMy();$('cmy').classList.remove('hide')}}
document.querySelectorAll('.rmb').forEach(b=>b.onclick=()=>{RM=+b.dataset.r;TB=2;startL()});
document.querySelectorAll('.mb:not(.rmb)').forEach(b=>b.onclick=()=>{MS=sMS=+b.dataset.m;try{localStorage.setItem('arr_ms',MS)}catch(e){}mref()});
$('alone').onclick=()=>{AL=sAL=!AL;try{localStorage.setItem('arr_al',AL?1:0)}catch(e){}mref()};
function auRef(){$('mubt').textContent=MU.mu?'SIM':'NAO';$('sfbt').textContent=MU.sf?'SIM':'NAO';$('vzbt').textContent=!VZ.ok&&VZ.m!='bab'&&VZ.m!='rob'?'N/D':VZ.on?'SIM':'NAO';$('blbt').textContent=VZ.bl?'SIM':'NAO'}auRef();
$('vzbt').onclick=()=>{if(!VZ.ok&&VZ.m!='bab'&&VZ.m!='rob'){alert('Seu navegador nao suporta voz. Escolha Resmungo ou Robo em Tipo de voz.');return}VZ.on=!VZ.on;try{localStorage.setItem('arr_vz',VZ.on?1:0)}catch(e){}if(VZ.on){VZ.ul=1;vzSay(null,'Voz dos bots ligada!',1)}else{try{speechSynthesis.cancel()}catch(e){}VZ.q=0}auRef()};
vzFill();$('vzsel').onchange=()=>{VZ.m=$('vzsel').value;try{localStorage.setItem('arr_vm',VZ.m)}catch(e){}if(window.speechSynthesis)try{speechSynthesis.cancel()}catch(e){}VZ.busy=0;VZ.q=0;VZ.ul=1;if(!VZ.on){VZ.on=1;try{localStorage.setItem('arr_vz',1)}catch(e){}auRef()}vzSay({name:'Teste'},'Beleza, vamos nessa!',1)};
$('blbt').onclick=()=>{VZ.bl=!VZ.bl;try{localStorage.setItem('arr_bl',VZ.bl?1:0)}catch(e){}auRef()};
$('mubt').onclick=()=>{MU.mu=!MU.mu;try{localStorage.setItem('arr_mu',MU.mu?1:0)}catch(e){}ac();if(MG)MG.gain.value=MU.mu?.55:0;auRef()};
$('sfbt').onclick=()=>{MU.sf=!MU.sf;try{localStorage.setItem('arr_sf',MU.sf?1:0)}catch(e){}ac();if(SG)SG.gain.value=MU.sf?1:0;auRef()};