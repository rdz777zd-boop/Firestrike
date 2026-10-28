/* ===== graficos/FPS: medidor, ajuste automatico e botoes ===== */
function qSz(){if(!ren)return;ren.setPixelRatio(qRP());ren.setSize(W,H,false)}
function qMeter(t){const b=$('fpsb');if(mode!='play'||!G){qN=0;qT0=0;qLow=qHigh=0;if(b)b.style.display='none';return}
if(!qT0){qT0=t;qN=0;return}qN++;const el=t-qT0;if(el<1000)return;const fps=qN*1000/el;qN=0;qT0=t;
if(QSHOW&&b){b.style.display='block';b.textContent=Math.round(fps)+' FPS'+(qDyn<.99?' · res '+Math.round(qDyn*100)+'%':'');b.style.color=fps>=QTG*.85?'#7dff6a':fps>=QTG*.6?'#ffd93b':'#ff5a4a'}else if(b)b.style.display='none';
if(!QAUTO||el>2500||!$('set').classList.contains('hide')){qLow=qHigh=0;return}
if(fps<QTG*.8){qHigh=0;if(++qLow>=2&&qDyn>.5){qDyn=Math.max(.5,+(qDyn-.1).toFixed(2));qLow=0;qSz()}}
else if(fps>QTG*.97){qLow=0;if(++qHigh>=6&&qDyn<1){qDyn=Math.min(1,+(qDyn+.1).toFixed(2));qHigh=0;qSz()}}else{qLow=qHigh=0}}
const QGD=['Menos detalhes, imagem mais leve e sem suavização de bordas. Melhor para celular fraco ou BR com lag.','Equilíbrio entre visual e desempenho. Recomendado para a maioria dos aparelhos.','Imagem nítida, bordas suaves e alcance máximo de visão. Pede um aparelho mais forte.'],QFD=['Limita em 30 quadros por segundo. Gasta menos bateria e esquenta menos; ideal se o jogo trava.','Limita em 60 quadros por segundo. Jogo mais fluido.','Sem limite: usa a taxa máxima da tela do aparelho (60, 90 ou 120).'];
function qRef(){document.querySelectorAll('#gqr .btn').forEach(b=>b.classList.toggle('on',+b.dataset.q==QG));document.querySelectorAll('#fqr .btn').forEach(b=>b.classList.toggle('on',+b.dataset.f==QF));$('gqd').textContent=QGD[QG];$('fqd').textContent=QFD[QF];$('fsbt').textContent=QSHOW?'SIM':'NAO';$('fabt').textContent=QAUTO?'SIM':'NAO';$('fsbt').classList.toggle('on',!!QSHOW);$('fabt').classList.toggle('on',!!QAUTO)}
function qSv(){try{localStorage.setItem('arr_gq',QG);localStorage.setItem('arr_fq',QF);localStorage.setItem('arr_fs',QSHOW?1:0);localStorage.setItem('arr_fa',QAUTO?1:0)}catch(e){}}
document.querySelectorAll('#gqr .btn').forEach(b=>b.onclick=()=>{const n=+b.dataset.q;if(n==QG)return;const aaOld=QG>0;QG=n;qDyn=1;qCalc();qSv();if(aaOld!=(QG>0))qMk();if(cam3){cam3.far=QFAR;cam3.updateProjectionMatrix()}rs();qRef()});
document.querySelectorAll('#fqr .btn').forEach(b=>b.onclick=()=>{QF=+b.dataset.f;qCalc();qLast=0;qT0=0;qDyn=1;qSv();qSz();qRef()});
$('fsbt').onclick=()=>{QSHOW=QSHOW?0:1;qSv();qRef();if(!QSHOW)$('fpsb').style.display='none'};
$('fabt').onclick=()=>{QAUTO=QAUTO?0:1;if(!QAUTO){qDyn=1;qSz()}qLow=qHigh=0;qSv();qRef()};
qRef();

function inReset(){aA.on=0;js.on=0;cm.on=0;fl.on=0;try{ads=0}catch(e){}try{if(fc){fc.k='';fc.hid=null}}catch(e){}try{for(const k in keys)keys[k]=0}catch(e){}}
function setClose(){inReset();$('set').classList.add('hide')}
$('setx').onclick=setClose;$('setxx').onclick=setClose;$('igb').onclick=()=>{inReset();$('set').classList.remove('hide')};
addEventListener('keydown',e=>{if(e.key=='Escape'&&mode=='play'&&!$('set').classList.contains('hide')&&!HE.on)setClose()});
$('menuBtn').onclick=()=>{$('cs').classList.remove('on');mus('menu');$('end').classList.add('hide');$('menu').classList.remove('hide');mode='menu';mref()};
mref();
function skCv(id,sk,w,h){const c=document.createElement('canvas');c.width=w*2;c.height=h*2;const q=c.getContext('2d'),E=sk&&SK[sk]&&SK[sk].ev;if(E)eiBg(q,c.width,c.height,sk);q.save();q.translate(c.width*.46,c.height*.45);drawW(q,id,c.width*.36,sk);q.restore();if(E)eiTop(q,c.width,c.height,id,sk);return c}
/* ===== icones 2D das evolutivas: fundo e detalhes no tema ===== */
const EIT={evDemon:['#2a0408','#7a0a12','#ff2a2a'],evDragon:['#03221a','#0b5a40','#2dffb0'],evAngel:['#4a6fb0','#cfe4ff','#fff3a0'],evReaper:['#070606','#0d2e20','#7dffb0'],evPumpkin:['#120628','#3a1470','#ff7a00'],evIce:['#1a0507','#5a0a10','#ff2a3a'],evGold:['#0a0906','#3b2a06','#ffc21a'],evToxic:['#050a05','#0c2a0c','#39ff14'],evArcane:['#120e0c','#2a1260','#b36bff']};
function evWB(id,W,H){const B=g2box(id);let x0=1e9,x1=-1e9,y0=1e9,y1=-1e9;for(const q of GP[id]){const l=q[2]/40,h=(q[7]=='c'?q[0]*2:q[1])/40,cx=(q[6]-10)/40,cy=-q[5]/40;x0=Math.min(x0,cx-l/2);x1=Math.max(x1,cx+l/2);y0=Math.min(y0,cy-h/2);y1=Math.max(y1,cy+h/2)}const S=W*.36,ox=W*.46+.12*S,oy=H*.45+.03*S,hw=(x1-x0)*B.sc/2*S,hh=(y1-y0)*B.sc/2*S;return{l:ox-hw,r:ox+hw,t:oy-hh,b:oy+hh,cx:ox,cy:oy}}
function eiImp(q,x,y,r,wing){q.save();q.lineJoin='round';q.strokeStyle='#1a0408';q.lineWidth=Math.max(1,r*.12);
if(wing){q.fillStyle='#5a0a14';for(const s of[-1,1]){q.beginPath();q.moveTo(x+s*r*.7,y);q.lineTo(x+s*r*2.2,y-r*1.2);q.lineTo(x+s*r*1.9,y-r*.1);q.lineTo(x+s*r*2.1,y+r*.5);q.lineTo(x+s*r*.8,y+r*.6);q.closePath();q.fill();q.stroke()}}
q.fillStyle='#1a0408';for(const s of[-1,1]){q.beginPath();q.moveTo(x+s*r*.35,y-r*.7);q.lineTo(x+s*r*.95,y-r*1.7);q.lineTo(x+s*r*.85,y-r*.4);q.closePath();q.fill();q.stroke()}
q.fillStyle='#e01c24';q.beginPath();q.arc(x,y,r,0,7);q.fill();q.stroke();
q.fillStyle='#ffe14a';q.shadowColor='#ffe14a';q.shadowBlur=r*.6;for(const s of[-1,1]){q.beginPath();q.ellipse(x+s*r*.4,y-r*.1,r*.2,r*.14,0,0,7);q.fill()}q.shadowBlur=0;
q.strokeStyle='#2a0008';q.lineWidth=Math.max(1,r*.1);q.beginPath();q.arc(x,y+r*.15,r*.4,.15,Math.PI-.15);q.stroke();q.restore()}
function eiSkull(q,x,y,r,c,g){q.save();q.fillStyle=c;q.strokeStyle='#05100a';q.lineWidth=Math.max(1,r*.1);q.beginPath();q.arc(x,y,r,0,7);q.fill();q.stroke();q.beginPath();q.roundRect(x-r*.55,y+r*.6,r*1.1,r*.7,r*.15);q.fill();q.stroke();q.fillStyle='#04120a';for(const s of[-1,1]){q.beginPath();q.ellipse(x+s*r*.38,y-r*.05,r*.26,r*.3,0,0,7);q.fill()}q.fillStyle=g;q.shadowColor=g;q.shadowBlur=r*.7;for(const s of[-1,1]){q.beginPath();q.arc(x+s*r*.38,y-r*.05,r*.1,0,7);q.fill()}q.restore()}
function eiStar(q,x,y,r,c){q.save();q.fillStyle=c;q.shadowColor=c;q.shadowBlur=r;q.beginPath();q.moveTo(x,y-r);q.quadraticCurveTo(x,y,x+r,y);q.quadraticCurveTo(x,y,x,y+r);q.quadraticCurveTo(x,y,x-r,y);q.quadraticCurveTo(x,y,x,y-r);q.fill();q.restore()}
function eiDHead(q,x,y,s,d){q.save();q.translate(x,y);q.scale(d*s,s);q.lineJoin='round';q.strokeStyle='#021a12';q.lineWidth=.09;
q.fillStyle='#ffd23b';q.beginPath();q.moveTo(-.3,-.5);q.lineTo(-1.1,-1.3);q.lineTo(-.1,-.7);q.closePath();q.fill();q.stroke();
q.fillStyle='#14b57a';q.beginPath();q.moveTo(-.9,-.1);q.lineTo(-.3,-.7);q.lineTo(.5,-.55);q.lineTo(1.5,-.15);q.lineTo(1.5,.15);q.lineTo(.6,.25);q.lineTo(.1,.8);q.lineTo(-.6,.5);q.closePath();q.fill();q.stroke();
q.fillStyle='#2dffb0';q.shadowColor='#2dffb0';q.shadowBlur=s*.5;q.beginPath();q.ellipse(.2,-.2,.2,.12,.3,0,7);q.fill();q.shadowBlur=0;q.fillStyle='#fff';q.fillRect(.9,.15,.12,.28);q.fillRect(1.2,.12,.12,.25);q.restore()}
function eiPump(q,x,y,r,hat){q.save();q.lineJoin='round';q.strokeStyle='#2a0a00';q.lineWidth=Math.max(1,r*.1);
q.fillStyle='#3a6a1a';q.fillRect(x-r*.12,y-r*1.25,r*.24,r*.4);q.strokeRect(x-r*.12,y-r*1.25,r*.24,r*.4);
q.fillStyle='#ff7a00';q.beginPath();q.ellipse(x,y,r,r*.82,0,0,7);q.fill();q.stroke();
q.strokeStyle='rgba(150,50,0,.8)';q.lineWidth=Math.max(1,r*.08);for(const k of[-.55,0,.55]){q.beginPath();q.ellipse(x+k*r*.55,y,r*(k?.38:.3),r*.8,0,0,7);q.stroke()}
q.fillStyle='#ffe14a';q.shadowColor='#ffb02e';q.shadowBlur=r*.8;for(const s of[-1,1]){q.beginPath();q.moveTo(x+s*r*.15,y-r*.05);q.lineTo(x+s*r*.55,y-r*.05);q.lineTo(x+s*r*.35,y-r*.42);q.closePath();q.fill()}
q.beginPath();q.moveTo(x-r*.5,y+r*.2);for(let i=0;i<=6;i++)q.lineTo(x-r*.5+i*r/6,y+r*(i%2?.2:.05));q.lineTo(x+r*.5,y+r*.4);q.lineTo(x-r*.5,y+r*.4);q.closePath();q.fill();q.shadowBlur=0;
if(hat){q.fillStyle='#2a1458';q.strokeStyle='#15100d';q.beginPath();q.ellipse(x,y-r*.78,r*1.1,r*.2,0,0,7);q.fill();q.stroke();q.beginPath();q.moveTo(x-r*.55,y-r*.8);q.lineTo(x+r*.1,y-r*2.1);q.lineTo(x+r*.55,y-r*.8);q.closePath();q.fill();q.stroke();q.fillStyle='#ff9a1f';q.fillRect(x-r*.5,y-r*1.0,r*1.0,r*.18)}
q.restore()}
function eiBat(q,x,y,s,c){q.save();q.fillStyle=c;q.beginPath();q.moveTo(x,y);q.quadraticCurveTo(x-s*.5,y-s*.7,x-s*1.4,y-s*.3);q.lineTo(x-s,y);q.lineTo(x-s*.8,y+s*.35);q.lineTo(x-s*.4,y+s*.1);q.lineTo(x,y+s*.45);q.lineTo(x+s*.4,y+s*.1);q.lineTo(x+s*.8,y+s*.35);q.lineTo(x+s,y);q.lineTo(x+s*1.4,y-s*.3);q.quadraticCurveTo(x+s*.5,y-s*.7,x,y);q.fill();q.restore()}
function eiWeb(q,x,y,r,sx,sy){q.save();q.strokeStyle='rgba(235,225,255,.45)';q.lineWidth=1.2;for(let i=0;i<=4;i++){const a=i/4*1.5708;q.beginPath();q.moveTo(x,y);q.lineTo(x+sx*Math.cos(a)*r,y+sy*Math.sin(a)*r);q.stroke()}for(let k=1;k<=4;k++){q.beginPath();for(let i=0;i<=4;i++){const a=i/4*1.5708,rr=r*k/4*(i%2?.9:1),px=x+sx*Math.cos(a)*rr,py=y+sy*Math.sin(a)*rr;i?q.lineTo(px,py):q.moveTo(px,py)}q.stroke()}q.restore()}
function eiOni(q,x,y,r,face,horn){face=face||'#fff2e6';horn=horn||'#ffead8';q.save();q.lineJoin='round';q.strokeStyle='#332821';q.lineWidth=Math.max(1,r*.1);
q.fillStyle=horn;for(const s of[-1,1]){q.beginPath();q.moveTo(x+s*r*.35,y-r*.6);q.quadraticCurveTo(x+s*r*1.35,y-r*.8,x+s*r*1.0,y-r*2.3);q.quadraticCurveTo(x+s*r*.7,y-r*1.1,x+s*r*.15,y-r*.55);q.closePath();q.fill();q.stroke()}
q.fillStyle=face;q.beginPath();q.arc(x,y,r,0,7);q.fill();q.stroke();
q.fillStyle='#15110e';for(const s of[-1,1]){q.beginPath();q.ellipse(x+s*r*.38,y-r*.05,r*.26,r*.28,0,0,7);q.fill()}
q.fillStyle='#ff954f';q.shadowColor='#ff954f';q.shadowBlur=r*.8;for(const s of[-1,1]){q.beginPath();q.ellipse(x+s*r*.38,y-r*.05,r*.17,r*.17,0,0,7);q.fill()}q.shadowBlur=0;
q.fillStyle='#ffffff';for(const s of[-1,1]){q.beginPath();q.arc(x+s*r*.34,y-r*.1,r*.05,0,7);q.fill()}
q.fillStyle='#15110e';q.beginPath();q.roundRect(x-r*.52,y+r*.34,r*1.04,r*.3,r*.08);q.fill();
q.fillStyle='#ffffff';for(const s of[-1,1]){q.beginPath();q.moveTo(x+s*r*.22,y+r*.34);q.lineTo(x+s*r*.4,y+r*.34);q.lineTo(x+s*r*.31,y+r*.04);q.closePath();q.fill();q.beginPath();q.moveTo(x+s*r*.06,y+r*.64);q.lineTo(x+s*r*.2,y+r*.64);q.lineTo(x+s*r*.13,y+r*.86);q.closePath();q.fill()}
q.restore()}
function eiFlake(q,x,y,r,c){q.save();q.strokeStyle=c;q.lineWidth=Math.max(1,r*.18);q.shadowColor=c;q.shadowBlur=r;for(let i=0;i<3;i++){const a=i*1.0472;q.beginPath();q.moveTo(x-Math.cos(a)*r,y-Math.sin(a)*r);q.lineTo(x+Math.cos(a)*r,y+Math.sin(a)*r);q.stroke()}q.restore()}
function eiBio(q,x,y,r){q.save();q.strokeStyle='#39ff14';q.fillStyle='#39ff14';q.lineWidth=Math.max(1.2,r*.16);q.shadowColor='#39ff14';q.shadowBlur=r*.5;for(let k=0;k<3;k++){const a=-Math.PI/2+k*2.0944,cx=x+Math.cos(a)*r*.55,cy=y+Math.sin(a)*r*.55;q.beginPath();q.arc(cx,cy,r*.55,0,7);q.stroke();const b=a+1.0472;q.beginPath();q.moveTo(x+Math.cos(b)*r*.15,y+Math.sin(b)*r*.15);q.lineTo(x+Math.cos(b)*r*1.05,y+Math.sin(b)*r*1.05);q.stroke()}q.beginPath();q.arc(x,y,r*.18,0,7);q.fill();q.restore()}
function eiBg(q,W,H,sk){const F=SK[sk].fx,T=EIT[F],cx=W*.46,cy=H*.45;q.save();q.beginPath();q.roundRect(0,0,W,H,H*.09);q.clip();
let g=q.createLinearGradient(0,0,0,H);g.addColorStop(0,T[0]);g.addColorStop(1,T[1]);q.fillStyle=g;q.fillRect(0,0,W,H);
g=q.createRadialGradient(cx,cy,0,cx,cy,W*.5);g.addColorStop(0,T[2]+'aa');g.addColorStop(1,T[2]+'00');q.fillStyle=g;q.fillRect(0,0,W,H);
if(F=='evDemon'){q.strokeStyle='rgba(255,60,40,.45)';q.lineWidth=H*.012;q.beginPath();q.arc(cx,cy,H*.42,0,7);q.stroke();q.beginPath();for(let j=0;j<5;j++){const a=-1.5708+j*2.5133,x=cx+Math.cos(a)*H*.42,y=cy+Math.sin(a)*H*.42;j?q.lineTo(x,y):q.moveTo(x,y)}q.closePath();q.stroke();
g=q.createLinearGradient(0,H*.7,0,H);g.addColorStop(0,'#ff3b1f');g.addColorStop(1,'#ffb02e');q.fillStyle=g;for(let i=0;i<=16;i++){const x=i*W/16,h=H*(.14+.1*Math.abs(Math.sin(i*2.1)));q.beginPath();q.moveTo(x-W/32,H);q.quadraticCurveTo(x-W/60,H-h*.5,x,H-h);q.quadraticCurveTo(x+W/60,H-h*.5,x+W/32,H);q.fill()}
q.fillStyle='#14040a';for(const s of[-1,1]){const x0=s<0?W*.02:W*.98;q.beginPath();q.moveTo(x0,H*.06);q.lineTo(x0-s*W*.1,H*.02);q.lineTo(x0-s*W*.17,H*.1);q.lineTo(x0-s*W*.13,H*.17);q.lineTo(x0-s*W*.16,H*.26);q.lineTo(x0-s*W*.08,H*.2);q.lineTo(x0-s*W*.05,H*.3);q.closePath();q.fill()}
q.fillStyle='#ffb02e';for(let i=0;i<20;i++){q.beginPath();q.arc(((i*53)%100)/100*W,((i*37)%75)/100*H,H*.008+(i%3)*H*.004,0,7);q.fill()}
eiImp(q,W*.1,H*.2,H*.085,1);eiImp(q,W*.9,H*.2,H*.07,0);eiImp(q,W*.88,H*.8,H*.075,1)}
else if(F=='evArcane'){{const gr=q.createRadialGradient(cx,cy,0,cx,cy,H*.75);gr.addColorStop(0,'rgba(179,107,255,.3)');gr.addColorStop(1,'rgba(179,107,255,0)');q.fillStyle=gr;q.fillRect(0,0,W,H)}
q.strokeStyle='rgba(224,176,255,.35)';q.lineWidth=Math.max(1,H*.008);q.beginPath();q.arc(cx,cy,H*.42,0,7);q.stroke();q.beginPath();q.arc(cx,cy,H*.36,0,7);q.stroke();q.beginPath();for(let k=0;k<6;k++){const a=-Math.PI/2+((k*2)%5)*1.2566,x=cx+Math.cos(a)*H*.36,y=cy+Math.sin(a)*H*.36;k?q.lineTo(x,y):q.moveTo(x,y)}q.stroke();
q.fillStyle='rgba(255,210,59,.7)';for(let i=0;i<18;i++){const x=W*((i*41%97)/97),y=H*((i*59%89)/89),r=H*(.006+.01*((i*7)%3)/3);q.beginPath();q.arc(x,y,r,0,7);q.fill()}}
else if(F=='evToxic'){{const gr=q.createRadialGradient(cx,cy,0,cx,cy,H*.75);gr.addColorStop(0,'rgba(57,255,20,.26)');gr.addColorStop(1,'rgba(57,255,20,0)');q.fillStyle=gr;q.fillRect(0,0,W,H)}
q.strokeStyle='rgba(125,255,58,.5)';q.lineWidth=Math.max(1,H*.008);for(let i=0;i<16;i++){const x=W*((i*37%97)/97),y=H*(.1+((i*53%89)/89)*.85),r=H*(.015+.03*((i*29%7)/7));q.beginPath();q.arc(x,y,r,0,7);q.stroke()}
q.fillStyle='rgba(57,255,20,.12)';for(let i=0;i<5;i++){q.beginPath();q.ellipse(W*(.1+.2*i),H*(.92+.03*(i%2)),W*.13,H*.08,0,0,7);q.fill()}
eiBio(q,W*.9,H*.2,H*.09);eiBio(q,W*.1,H*.8,H*.07)}
else if(F=='evGold'){q.strokeStyle='rgba(255,194,26,.18)';q.lineWidth=1.2;for(let r=0;r<9;r++)for(let c=0;c<22;c++){q.beginPath();q.arc(c*W/11+(r%2)*W/22,r*H/8,W/22,0,Math.PI);q.stroke()}
{const gr=q.createRadialGradient(cx,cy,0,cx,cy,H*.7);gr.addColorStop(0,'rgba(255,194,26,.28)');gr.addColorStop(1,'rgba(255,194,26,0)');q.fillStyle=gr;q.fillRect(0,0,W,H)}
q.strokeStyle='rgba(255,170,20,.6)';q.lineWidth=H*.015;q.shadowColor='#ffb81c';q.shadowBlur=H*.03;for(let i=0;i<3;i++){q.beginPath();q.moveTo(W*.04,H*(.5+i*.14));q.bezierCurveTo(W*.2,H*(.4+i*.14),W*.3,H*(.7+i*.1),W*.5,H*(.82+i*.04));q.stroke()}q.shadowBlur=0}
else if(F=='evDragon'){q.strokeStyle='rgba(45,255,176,.2)';q.lineWidth=1.2;for(let r=0;r<9;r++)for(let c=0;c<22;c++){q.beginPath();q.arc(c*W/11+(r%2)*W/22,r*H/8,W/22,0,Math.PI);q.stroke()}
q.strokeStyle='rgba(255,210,59,.7)';q.lineWidth=H*.012;for(const s of[-1,1])for(const v of[0,1]){const x0=s<0?W*.08:W*.92,y0=v?H*.86:H*.14;q.beginPath();for(let a=0;a<=14;a+=.4){const r=H*.07*(1-a/16),x=x0+s*Math.cos(a)*r+s*a*0,y=y0+Math.sin(a)*r;a?q.lineTo(x,y):q.moveTo(x,y)}q.stroke()}
q.strokeStyle='rgba(45,255,176,.5)';q.lineWidth=H*.015;q.shadowColor='#2dffb0';q.shadowBlur=H*.03;for(let i=0;i<3;i++){q.beginPath();q.moveTo(W*.04,H*(.5+i*.14));q.bezierCurveTo(W*.2,H*(.4+i*.14),W*.3,H*(.7+i*.1),W*.5,H*(.82+i*.04));q.stroke()}q.shadowBlur=0;
eiDHead(q,W*.12,H*.2,H*.09,1);eiDHead(q,W*.88,H*.2,H*.09,-1)}
else if(F=='evAngel'){q.fillStyle='rgba(255,255,255,.15)';for(let j=0;j<14;j++){const a=j*.4488;q.beginPath();q.moveTo(cx,cy);q.lineTo(cx+Math.cos(a)*W,cy+Math.sin(a)*W);q.lineTo(cx+Math.cos(a+.15)*W,cy+Math.sin(a+.15)*W);q.closePath();q.fill()}
for(const s of[-1,1])for(let j=0;j<6;j++){const a=-.3-j*.26,ln=H*(.62-j*.05);q.save();q.translate(cx+s*W*.1,H*.5);q.rotate(s>0?a:Math.PI-a);q.fillStyle=j%2?'rgba(255,255,255,.85)':'rgba(240,246,255,.9)';q.strokeStyle='rgba(224,184,74,.8)';q.lineWidth=1.2;q.beginPath();q.ellipse(ln/2,0,ln/2,H*.04,0,0,7);q.fill();q.stroke();q.restore()}
q.fillStyle='rgba(255,255,255,.7)';for(let i=0;i<9;i++){q.beginPath();q.arc(i*W/8,H*.97,H*(.09+.03*(i%2)),0,7);q.fill()}
eiStar(q,W*.08,H*.15,H*.06,'#fff3a0');eiStar(q,W*.92,H*.2,H*.05,'#ffffff');eiStar(q,W*.12,H*.82,H*.04,'#fff3a0');eiStar(q,W*.9,H*.75,H*.06,'#fff3a0')}
else if(F=='evPumpkin'){q.fillStyle='rgba(255,170,60,.22)';q.beginPath();q.arc(W*.8,H*.3,H*.3,0,7);q.fill();q.fillStyle='rgba(255,200,110,.5)';q.beginPath();q.arc(W*.8,H*.3,H*.22,0,7);q.fill();
eiWeb(q,0,0,H*.5,1,1);eiWeb(q,W,0,H*.5,-1,1);
q.fillStyle='rgba(181,123,255,.18)';for(let i=0;i<6;i++){q.beginPath();q.ellipse(i*W/5,H*(.92+.03*(i%2)),W*.13,H*.08,0,0,7);q.fill()}
q.fillStyle='#ffb02e';for(let i=0;i<18;i++){q.beginPath();q.arc(((i*47)%100)/100*W,((i*31)%80)/100*H,H*.008+(i%3)*H*.004,0,7);q.fill()}
eiBat(q,W*.62,H*.16,H*.06,'#15100d');eiBat(q,W*.32,H*.1,H*.045,'#15100d');eiBat(q,W*.92,H*.55,H*.05,'#15100d');
eiPump(q,W*.1,H*.82,H*.09,0);eiPump(q,W*.9,H*.84,H*.075,0);eiPump(q,W*.1,H*.24,H*.06,1)}
else if(F=='evIce'){q.fillStyle='rgba(246,78,78,.2)';q.beginPath();q.arc(W*.8,H*.3,H*.3,0,7);q.fill();q.fillStyle='rgba(247,98,98,.5)';q.beginPath();q.arc(W*.8,H*.3,H*.2,0,7);q.fill();
for(let j=0;j<3;j++){g=q.createLinearGradient(0,H*(.1+.1*j),W,H*(.3+.1*j));g.addColorStop(0,'rgba(243,18,18,0)');g.addColorStop(.5,'rgba(120,230,255,'+(.26-.06*j)+')');g.addColorStop(1,'rgba(243,18,18,0)');q.fillStyle=g;q.beginPath();q.moveTo(0,H*(.25+.12*j));q.bezierCurveTo(W*.3,H*(.05+.12*j),W*.6,H*(.45+.12*j),W,H*(.2+.12*j));q.lineTo(W,H*(.34+.12*j));q.bezierCurveTo(W*.6,H*(.58+.12*j),W*.3,H*(.2+.12*j),0,H*(.38+.12*j));q.closePath();q.fill()}
q.fillStyle='rgba(245,73,73,.85)';q.strokeStyle='rgba(234,123,123,.9)';q.lineWidth=1;for(let i=0;i<=14;i++){const x=i*W/14,h=H*(.14+.12*Math.abs(Math.sin(i*1.9)));q.beginPath();q.moveTo(x-W/36,H);q.lineTo(x,H-h);q.lineTo(x+W/36,H);q.closePath();q.fill();q.stroke()}
q.fillStyle='#ffffff';for(let i=0;i<26;i++){q.beginPath();q.arc(((i*43)%100)/100*W,((i*29)%90)/100*H,H*.006+(i%3)*H*.004,0,7);q.fill()}
eiFlake(q,W*.3,H*.14,H*.04,'#f76262');eiFlake(q,W*.62,H*.1,H*.03,'#f54949');eiFlake(q,W*.92,H*.6,H*.04,'#f76262');
eiOni(q,W*.1,H*.24,H*.075);eiOni(q,W*.9,H*.24,H*.06);eiOni(q,W*.88,H*.8,H*.05)}
else{q.fillStyle='rgba(246,87,87,.14)';q.beginPath();q.arc(W*.78,H*.3,H*.28,0,7);q.fill();q.fillStyle='rgba(243,36,36,.2)';for(let i=0;i<6;i++){q.beginPath();q.ellipse(i*W/5,H*(.9+.04*(i%2)),W*.12,H*.07,0,0,7);q.fill()}
q.fillStyle='rgba(243,36,36,.7)';q.shadowColor='#f32424';q.shadowBlur=H*.04;for(let i=0;i<7;i++){const x=W*(.1+.13*i),y=H*(.25+.5*((i*37)%10)/10),r=H*.025;q.beginPath();q.arc(x,y,r,0,7);q.moveTo(x-r,y);q.lineTo(x,y-r*3);q.lineTo(x+r,y);q.fill()}q.shadowBlur=0;
q.strokeStyle='rgba(219,36,36,.55)';q.lineWidth=H*.012;for(let i=0;i<22;i++){q.beginPath();q.ellipse(i*W/21,H*.03,W*.014,H*.018,i%2?0:1.5708,0,7);q.stroke()}
eiSkull(q,W*.09,H*.22,H*.085,'#e66464','#f32424');eiSkull(q,W*.91,H*.8,H*.075,'#e66464','#f32424')}
q.restore()}
function eiTop(q,W,H,id,sk){const F=SK[sk].fx,B=evWB(id,W,H),l=B.l,r=B.r,t=B.t,b=B.b,cx=B.cx,cy=B.cy,hh=b-t,ww=r-l,u=Math.max(H*.07,hh*.7);q.save();q.lineJoin='round';
if(F=='evDemon'){q.shadowColor='#da0b0b';q.shadowBlur=u*.5;q.strokeStyle='#e30c0c';q.lineWidth=Math.max(2,u*.1);q.beginPath();q.moveTo(l+ww*.12,t+hh*.22);q.lineTo(r-ww*.1,t+hh*.22);q.stroke();q.shadowBlur=0;
q.fillStyle='#1a0408';for(let i=0;i<7;i++){const x=l+ww*(.12+.12*i);q.beginPath();q.moveTo(x-u*.14,t+1);q.lineTo(x,t-u*.55);q.lineTo(x+u*.14,t+1);q.closePath();q.fill()}
for(const s of[-1,1]){q.beginPath();q.moveTo(r-ww*.08,cy+s*hh*.1);q.lineTo(r+u*.5,cy+s*hh*.65);q.lineTo(r-ww*.02,cy+s*hh*.3);q.closePath();q.fill()}
eiImp(q,cx,t-u*.75,u*.62,1);eiImp(q,r-ww*.14,b+u*.2,u*.5,0);eiImp(q,l+ww*.14,t-u*.3,u*.48,0)}
else if(F=='evArcane'){q.lineJoin='round';q.strokeStyle='#d8b25a';q.lineWidth=Math.max(1.2,u*.05);q.beginPath();q.moveTo(l+ww*.02,t+hh*.18);q.lineTo(l+ww*.6,t+hh*.18);q.stroke();q.beginPath();q.moveTo(l+ww*.02,b-hh*.18);q.lineTo(l+ww*.45,b-hh*.18);q.stroke();
q.shadowColor='#b36bff';q.shadowBlur=u*.3;q.fillStyle='#b36bff';q.beginPath();q.arc(r+u*.02,cy-hh*.1,u*.09,0,7);q.fill();q.beginPath();q.arc(r+u*.02,cy+hh*.1,u*.09,0,7);q.fill();q.shadowBlur=0;
{const ex=l+ww*.45,ey=cy-hh*.02;q.fillStyle='#f3e7ff';q.beginPath();q.ellipse(ex,ey,u*.2,u*.11,0,0,7);q.fill();q.fillStyle='#b36bff';q.beginPath();q.arc(ex,ey,u*.08,0,7);q.fill();q.fillStyle='#10051c';q.beginPath();q.arc(ex,ey,u*.035,0,7);q.fill()}
q.strokeStyle='#c07bff';q.lineWidth=Math.max(1,u*.035);for(let i=0;i<4;i++){const x=l+ww*(.2+.06*i);q.beginPath();q.moveTo(x,cy+hh*.12);q.lineTo(x+u*.04,cy+hh*.3);q.lineTo(x+u*.1,cy+hh*.12);q.stroke()}
q.fillStyle='#ffd23b';q.beginPath();q.moveTo(l+ww*.36,cy+hh*.35);q.quadraticCurveTo(l+ww*.38,cy+hh*.65,l+ww*.33,cy+hh*.75);q.quadraticCurveTo(l+ww*.42,cy+hh*.55,l+ww*.36,cy+hh*.35);q.fill()}
else if(F=='evToxic'){q.lineJoin='round';
q.shadowColor='#39ff14';q.shadowBlur=u*.3;q.strokeStyle='#39ff14';q.lineWidth=Math.max(1.5,u*.05);q.beginPath();q.moveTo(l+ww*.04,t+hh*.12);q.lineTo(r-ww*.02,t+hh*.12);q.stroke();q.shadowBlur=0;
q.strokeStyle='rgba(210,255,215,.75)';q.lineWidth=Math.max(2,u*.11);q.beginPath();q.moveTo(l+ww*.5,b-hh*.06);q.lineTo(l+ww*.5,cy+hh*.3);q.lineTo(l+ww*.72,cy+hh*.3);q.stroke();q.strokeStyle='#39ff14';q.lineWidth=Math.max(1,u*.06);q.stroke();
q.fillStyle='rgba(57,255,20,.6)';q.strokeStyle='#d8ffd8';q.lineWidth=Math.max(1,u*.04);q.beginPath();q.roundRect(l+ww*.3,cy+hh*.12,ww*.11,hh*.55,u*.05);q.fill();q.stroke();
q.fillStyle='#e8ffe0';for(let i=0;i<4;i++){q.beginPath();q.arc(l+ww*(.33+.045*(i%2)),cy+hh*(.22+.1*i),u*.035,0,7);q.fill()}
eiBio(q,l+ww*.58,cy-hh*.05,u*.2);
q.fillStyle='#100f0f';q.strokeStyle='#39ff14';q.lineWidth=Math.max(1,u*.05);q.beginPath();q.arc(l-u*.12,cy-hh*.1,u*.24,0,7);q.fill();q.stroke();
for(let i=0;i<5;i++){const a=Math.PI*(1.1+i*.2);q.strokeStyle=i<2?'#ff4040':i<3?'#ffd23b':'#39ff14';q.beginPath();q.arc(l-u*.12,cy-hh*.1,u*.17,a,a+.25);q.stroke()}
q.strokeStyle='#ff4040';q.lineWidth=Math.max(1.2,u*.04);q.beginPath();q.moveTo(l-u*.12,cy-hh*.1);q.lineTo(l-u*.12+u*.16,cy-hh*.1-u*.1);q.stroke();
q.fillStyle='#1b261b';q.strokeStyle='#39ff14';q.lineWidth=Math.max(1,u*.04);q.beginPath();q.roundRect(l+ww*.02,cy+hh*.18,ww*.12,hh*.42,u*.08);q.fill();q.stroke();
q.fillStyle='rgba(157,255,106,.45)';for(let i=0;i<3;i++){q.beginPath();q.arc(r-ww*(.12+.1*i),t-u*(.15+.18*i),u*(.1+.04*i),0,7);q.fill()}}
else if(F=='evGold'){q.fillStyle='#ffc21a';q.strokeStyle='#4a3200';q.lineWidth=1;
for(let i=0;i<6;i++){const x=l+ww*(.1+.14*i);q.beginPath();q.moveTo(x-u*.14,t+1);q.lineTo(x,t-u*.42);q.lineTo(x+u*.14,t+1);q.closePath();q.fill();q.stroke()}
q.strokeStyle='rgba(255,194,26,.75)';q.lineWidth=Math.max(1,u*.05);for(let i=0;i<6;i++){q.beginPath();q.arc(l+ww*(.15+.14*i),cy,hh*.28,0,Math.PI);q.stroke()}
q.fillStyle='#ff9a1a';q.shadowColor='#ffb81c';q.shadowBlur=u*.3;for(let i=0;i<3;i++){const x=l+ww*(.05+.05*i);q.beginPath();q.moveTo(x-u*.07,b-1);q.lineTo(x+u*.07,b-1);q.lineTo(x,b+u*(.3+.12*i));q.closePath();q.fill()}q.shadowBlur=0;
{const hx=r+u*.02,hy=cy;q.fillStyle='#ffc21a';q.strokeStyle='#4a3200';q.lineWidth=Math.max(1,u*.04);
q.beginPath();q.moveTo(hx-u*.1,hy-u*.22);q.lineTo(hx+u*.55,hy-u*.12);q.lineTo(hx+u*.72,hy-u*.02);q.lineTo(hx+u*.15,hy+u*.02);q.lineTo(hx-u*.1,hy+u*.18);q.closePath();q.fill();q.stroke();
q.beginPath();q.moveTo(hx,hy+u*.1);q.lineTo(hx+u*.6,hy+u*.34);q.lineTo(hx+u*.5,hy+u*.42);q.lineTo(hx-u*.05,hy+u*.26);q.closePath();q.fill();q.stroke();
q.beginPath();q.moveTo(hx-u*.05,hy-u*.2);q.lineTo(hx-u*.5,hy-u*.55);q.lineTo(hx+u*.05,hy-u*.3);q.closePath();q.fill();q.stroke();
q.fillStyle='#fff3c8';for(let i=0;i<4;i++){const x=hx+u*(.2+.12*i);q.beginPath();q.moveTo(x,hy-u*.04);q.lineTo(x+u*.04,hy+u*.08);q.lineTo(x+u*.08,hy-u*.03);q.fill()}
q.fillStyle='#ff7a00';q.shadowColor='#ffb81c';q.shadowBlur=u*.35;q.beginPath();q.arc(hx+u*.4,hy+u*.14,u*.09,0,7);q.fill();q.shadowBlur=0;
q.fillStyle='#ffffff';q.beginPath();q.arc(hx+u*.2,hy-u*.1,u*.045,0,7);q.fill()}}
else if(F=='evDragon'){q.fillStyle='#ffd23b';q.strokeStyle='#4a3a00';q.lineWidth=1;for(let i=0;i<6;i++){const x=l+ww*(.1+.14*i);q.beginPath();q.moveTo(x-u*.16,t+1);q.lineTo(x,t-u*.5);q.lineTo(x+u*.16,t+1);q.closePath();q.fill();q.stroke()}
q.strokeStyle='rgba(45,255,176,.6)';q.lineWidth=Math.max(1,u*.05);for(let i=0;i<6;i++){q.beginPath();q.arc(l+ww*(.15+.14*i),cy,hh*.28,0,Math.PI);q.stroke()}
q.strokeStyle='#ffd23b';q.lineWidth=Math.max(1.5,u*.08);for(let i=0;i<3;i++){const x=l+ww*(.3+.05*i);q.beginPath();q.moveTo(x,b);q.quadraticCurveTo(x+u*.1,b+u*.3,x-u*.1,b+u*.5);q.stroke()}
eiDHead(q,r+u*.1,cy-hh*.05,u*.75,1)}
else if(F=='evAngel'){for(const s of[-1,1])for(let j=0;j<5;j++){const a=-.5-j*.28,ln=u*(3.2-j*.35);q.save();q.translate(cx+s*ww*.04,t);q.rotate(s>0?a:Math.PI-a);q.fillStyle=j%2?'#ffffff':'#f0f6ff';q.strokeStyle='#e0b84a';q.lineWidth=1.2;q.beginPath();q.ellipse(ln/2,0,ln/2,u*.2,0,0,7);q.fill();q.stroke();q.restore()}
q.strokeStyle='#ffe27a';q.shadowColor='#ffe27a';q.shadowBlur=u*.6;q.lineWidth=Math.max(2,u*.14);q.beginPath();q.ellipse(cx,t-u*1.5,u*.9,u*.28,0,0,7);q.stroke();
q.strokeStyle='#ffd86b';q.lineWidth=Math.max(2,u*.1);q.beginPath();q.moveTo(l+ww*.55,cy-hh*.9);q.lineTo(l+ww*.55,cy+hh*.9);q.moveTo(l+ww*.55-u*.4,cy);q.lineTo(l+ww*.55+u*.4,cy);q.stroke();q.shadowBlur=0;eiStar(q,r+u*.3,cy,u*.45,'#ffffff')}
else if(F=='evPumpkin'){for(const s of[-1,1]){q.save();q.translate(cx+s*ww*.1,cy-hh*.1);q.scale(s,1);eiBat(q,ww*.12,-u*.7,u*.85,'#1a0a38');q.restore()}
q.strokeStyle='rgba(235,225,255,.8)';q.lineWidth=Math.max(1,u*.04);for(let i=0;i<4;i++){const x=l+ww*(.2+.2*i);q.beginPath();q.moveTo(x,t);q.quadraticCurveTo(x+ww*.1,cy+hh*.2,x+ww*.2,t);q.stroke()}
q.shadowColor='#ff9a1f';q.shadowBlur=u*.5;q.strokeStyle='#ff9a1f';q.lineWidth=Math.max(2,u*.1);q.beginPath();q.moveTo(l+ww*.1,t+hh*.25);q.lineTo(r-ww*.08,t+hh*.25);q.stroke();q.strokeStyle='#b57bff';q.beginPath();q.moveTo(l+ww*.1,b-hh*.2);q.lineTo(r-ww*.08,b-hh*.2);q.stroke();q.shadowBlur=0;
for(let i=0;i<3;i++){const x=l+ww*(.35+.07*i);q.fillStyle=i%2?'#fff':'#ff9a1f';q.beginPath();q.moveTo(x-u*.1,b);q.lineTo(x+u*.1,b);q.lineTo(x,b+u*.4);q.closePath();q.fill()}
eiPump(q,l+ww*.35,t-u*.45,u*.7,1);eiSkull(q,l+ww*.12,b+u*.2,u*.32,'#e8e0d0','#ff9a1f');eiPump(q,r+u*.15,cy-hh*.1,u*.34,0);
q.fillStyle='#b57bff';q.shadowColor='#b57bff';q.shadowBlur=u*.5;q.beginPath();q.arc(r+u*.3,cy-hh*.1-u*.5,u*.12,0,7);q.moveTo(r+u*.18,cy-hh*.1-u*.5);q.lineTo(r+u*.3,cy-hh*.1-u*1.1);q.lineTo(r+u*.42,cy-hh*.1-u*.5);q.fill();q.shadowBlur=0}
else if(F=='evIce'){q.shadowColor='#f42525';q.shadowBlur=u*.4;q.strokeStyle='#e20c0c';q.lineWidth=Math.max(2,u*.09);q.beginPath();q.moveTo(l+ww*.08,cy);for(let i=1;i<=9;i++)q.lineTo(l+ww*(.08+.09*i),cy+(i%2?-1:1)*hh*.16);q.stroke();q.shadowBlur=0;
q.fillStyle='rgba(246,93,93,.88)';q.strokeStyle='#ffffff';q.lineWidth=1;for(let i=0;i<6;i++){const x=l+ww*(.1+.15*i);q.beginPath();q.moveTo(x-u*.13,t+1);q.lineTo(x+u*.03*(i%2?1:-1),t-u*(.4+.14*(i%3)));q.lineTo(x+u*.13,t+1);q.closePath();q.fill();q.stroke()}
q.fillStyle='rgba(247,98,98,.95)';for(let i=0;i<6;i++){const x=l+ww*(.14+.15*i),h2=u*(.28+.2*(i%3));q.beginPath();q.moveTo(x-u*.07,b-1);q.lineTo(x,b+h2);q.lineTo(x+u*.07,b-1);q.closePath();q.fill();q.stroke()}
q.strokeStyle='#080707';q.lineWidth=Math.max(1.2,u*.035);for(let i=0;i<4;i++){const x=l+ww*(.2+.2*i);q.beginPath();q.moveTo(x,t+hh*.1);q.lineTo(x+u*.12,cy);q.lineTo(x-u*.05,b-hh*.1);q.stroke()}
eiOni(q,l+ww*.5,t-u*.42,u*.7,'#f1eee4','#f65757');
eiFlake(q,r+u*.35,cy-hh*.2,u*.3,'#f76262');eiFlake(q,l-u*.1,b,u*.22,'#f54949')}
else{eiSkull(q,l+ww*.3,t-u*.6,u*.62,'#e8f0e0','#7dffb0');q.strokeStyle='#e8f0e0';q.lineWidth=Math.max(1.5,u*.08);for(let i=0;i<4;i++){const x=l+ww*(.4+.1*i);q.beginPath();q.moveTo(x,b);q.lineTo(x+u*.05,b+u*.45);q.stroke()}
q.shadowColor='#7dffb0';q.shadowBlur=u*.6;q.strokeStyle='#bfffe0';q.lineWidth=Math.max(2,u*.14);q.beginPath();q.moveTo(l+ww*.55,b+u*.1);q.quadraticCurveTo(r,b+u*.2,r+u*.4,b+u*.9);q.stroke();
q.fillStyle='#7dffb0';q.beginPath();q.arc(r+u*.2,cy-hh*.1,u*.22,0,7);q.moveTo(r+u*.02,cy-hh*.1);q.lineTo(r+u*.25,cy-hh*.1-u*.8);q.lineTo(r+u*.4,cy-hh*.1);q.fill();q.shadowBlur=0}
q.restore();const T=EIT[F][2];q.strokeStyle=T;q.lineWidth=Math.max(2,H*.012);q.beginPath();q.roundRect(q.lineWidth/2,q.lineWidth/2,W-q.lineWidth,H-q.lineWidth,H*.09);q.stroke()}
function dots(k){return '<span class="dots">'+k.p2.map(c=>'<i style="background:'+c+'"></i>').join('')+'</span>'}
function shopW(){$('shc').textContent=fmt(coins);const g=$('shg');g.innerHTML='';
for(let i=1;i<SK.length;i++){const k=SK[i],d=document.createElement('div');d.className='cd';d.style.cursor='default';d.appendChild(skCv(14,i,150,80));
d.insertAdjacentHTML('beforeend','<div>'+k.n+'</div>'+rarT(k)+'<small>'+k.d+'</small>'+dots(k));const ow=OWN.includes(i),b=document.createElement('button');b.className='btn'+(ow?' sec':'');b.innerHTML=ow?'COMPRADA':'<svg class="ic"><use href="#i-coin"/></svg> '+fmt(k.pr);b.onclick=()=>buy(i);d.appendChild(b);g.appendChild(d)}}
let shT=0;
function dots2(k){return '<span class="dots">'+k.c.map(c=>'<i style="background:'+c+'"></i>').join('')+'</span>'}
function pqCv(k,w,h){const c=document.createElement('canvas');c.width=w*2;c.height=h*2;const q=c.getContext('2d'),W=c.width,H=c.height,cx=W/2,R=Math.min(W*.3,H*.42),cy=H*.52,c0=k?k.c[0]:'#4aa8ff',c1=k?k.c[1]:'#ffffff',c2=k?k.c[2]:'#f2f2f2';
let fill=c0;if(k&&k.fx=='rainbow'){const gr=q.createLinearGradient(cx-R,0,cx+R,0);['#ff3b3b','#ffb02e','#ffe83b','#3bff6a','#3ba8ff','#b03bff'].forEach((x,i)=>gr.addColorStop(i/5,x));fill=gr}
q.strokeStyle=c2;q.lineWidth=2;q.beginPath();for(const a of[-1,-.5,.5,1]){q.moveTo(cx+R*a,cy);q.lineTo(cx,H*.84)}q.stroke();
q.fillStyle='#e8e2c0';q.beginPath();q.arc(cx,H*.86,H*.05,0,6.3);q.fill();q.fillStyle='#3a4658';q.fillRect(cx-H*.04,H*.91,H*.08,H*.09);
if(k&&k.em){q.shadowColor=c0;q.shadowBlur=16}
q.fillStyle=fill;q.beginPath();q.ellipse(cx,cy,R,R*.75,0,Math.PI,0);q.closePath();q.fill();q.shadowBlur=0;
q.strokeStyle=c1;q.lineWidth=4;for(const a of[-.6,0,.6]){q.beginPath();q.moveTo(cx+R*a,cy);q.quadraticCurveTo(cx+R*a*1.02,cy-R*.6,cx,cy-R*.75);q.stroke()}
q.lineWidth=5;q.beginPath();q.moveTo(cx-R,cy);q.lineTo(cx+R,cy);q.stroke();return c}
function rsCv(k,w,h){const c=document.createElement('canvas');c.width=w*2;c.height=h*2;const q=c.getContext('2d'),W=c.width,H=c.height,cx=W/2;
if(k){for(let i=0;i<24;i++){const t=i/24,y=H*.8-t*H*.74,x=cx+Math.sin(i*2.3)*W*.07*(.5+t*1.6),s=(1-t*.65)*H*.075;q.globalAlpha=1-t*.8;q.fillStyle=k.rb?'hsl('+(i*17)%360+',90%,60%)':k.c[i%k.c.length];if(k.sh=='long')q.fillRect(x-s*.2,y-s*1.2,s*.4,s*2.4);else if(k.sh=='flat')q.fillRect(x-s*.7,y-s*.2,s*1.4,s*.4);else q.fillRect(x-s/2,y-s/2,s,s)}q.globalAlpha=1}
else{q.fillStyle='#6a7a70';q.font='bold '+(H*.14)+'px sans-serif';q.textAlign='center';q.fillText('sem rastro',cx,H*.3)}
q.strokeStyle='#f2f2f2';q.lineWidth=2;q.fillStyle='#4aa8ff';q.beginPath();q.ellipse(cx,H*.66,W*.09,H*.1,0,Math.PI,0);q.closePath();q.fill();q.beginPath();q.moveTo(cx-W*.09,H*.66);q.lineTo(cx,H*.82);q.lineTo(cx+W*.09,H*.66);q.stroke();
q.fillStyle='#e8e2c0';q.beginPath();q.arc(cx,H*.85,H*.05,0,6.3);q.fill();q.fillStyle='#3a4658';q.fillRect(cx-H*.04,H*.9,H*.08,H*.1);return c}
let shS=[0,0,0,0];
function shItems(t){const L=t==1?PQ:t==2?RS:SK;return L.map((k,i)=>({k,i})).filter(o=>t==0?(o.i>0&&!o.k.ev):t==3?!!(o.k&&o.k.ev):true)}
function shOwn(t,i){return t==0||t==3?OWN.includes(i):i==0||(t==1?OWNP:OWNR).includes(i)}
function shEq(t,i){if(t==3)return EQ[SK[i].w]==i;if(t==0){for(let id=1;id<WP.length;id++)if((EQ[id]||0)!=i)return false;return true}return (t==1?EQP:EQR)==i}
function shCv(t,k,i,w,h){return t==3?skCv(k.w,i,w,h):t==0?skCv(14,i,w,h):t==1?pqCv(k,w,h):rsCv(k,w,h)}
let shPg=[0,0,0,0],shJ=true;const SHPG=6,SMO=[3,0,1,2],SMN=['Skins de armas','Paraquedas','Rastros','Skins evolutivas'],SMI=['i-swords','i-parachute','i-sparkle','i-crown'];
function shopR(){const gmv=(()=>{try{return gems}catch(e){return 980}})();$('shc').textContent=fmt(coins);$('shgm').textContent=fmt(gmv);
const tb=$('sht');tb.innerHTML='';
SMO.forEach(n=>{const b=document.createElement('button');b.type='button';b.className='ivtb'+(n==shT?' on':'');b.innerHTML='<i><svg class="ic"><use href="#'+SMI[n]+'"/></svg></i><span>'+SMN[n]+'</span>';b.onclick=()=>{shT=n;shJ=true;$('shg').scrollTop=0;shopR()};tb.appendChild(b)});
const T=shT,gm=T==3,L=shItems(T);if(!L.some(o=>o.i==shS[T]))shS[T]=L[0].i;
$('shh').textContent=SMN[T]+' - em destaque';
const g=$('shg'),pc=Math.max(1,Math.ceil(L.length/SHPG));
if(shJ){const x=L.findIndex(o=>o.i==shS[T]);if(x>=0)shPg[T]=Math.floor(x/SHPG);shJ=false}
shPg[T]=Math.min(Math.max(0,shPg[T]),pc-1);const pg=shPg[T];g.innerHTML='';
L.slice(pg*SHPG,pg*SHPG+SHPG).forEach(({k,i})=>{const eq=shEq(T,i),ow=shOwn(T,i),d=document.createElement('div');
d.className='smk'+(shS[T]==i?' sel':'');d.style.setProperty('--rc',k?RCOL[k.ra]:'#8fa3b8');d.appendChild(shCv(T,k,i,160,90));
const nm=k?k.n:(T==1?'Padrão':'Sem rastro'),sub=T==3?WP[k.w].n:T==0?'Todas as armas':T==1?'Paraquedas':'Rastro';
d.insertAdjacentHTML('beforeend','<div class="smn">'+esc(nm)+'</div><div class="sms2">'+esc(sub)+'</div><div class="smp">'+(eq?'<b style="color:#7dff6a">EQUIPADO</b>':ow?'<b style="color:#7dff6a">SEU</b>':!k?'<b>Item inicial</b>':'<svg class="ic"><use href="#'+(gm?'i-gem':'i-coin')+'"/></svg> <b>'+fmt(gm?k.gm:k.pr)+'</b>')+'</div>');
const b=document.createElement('button');b.type='button';b.className='smbt';b.textContent=eq?'EQUIPADO':(ow||!k)?'EQUIPAR':'COMPRAR';b.disabled=eq;b.onclick=e=>{e.stopPropagation();shS[T]=i;shBuy(T,i)};d.appendChild(b);
d.appendChild(eyeB(()=>{if(T==0||T==3)pvOpen(i,T==0?14:SK[i].w,'shop');else simplePv(nm,sub,k?RCOL[k.ra]:'#8fa3b8',shCv(T,k,i,360,170),k?k.d:(T==1?'Paraquedas normal.':'Sem rastro durante a queda.'))}));d.onclick=()=>{shS[T]=i;shopR()};g.appendChild(d)});
$('shpi').textContent=(pg+1)+'/'+pc;$('shpp').disabled=pg<=0;$('shpx').disabled=pg>=pc-1;
$('shpp').onclick=()=>{shPg[T]--;g.scrollTop=0;shopR()};$('shpx').onclick=()=>{shPg[T]++;g.scrollTop=0;shopR()};
const i=shS[T],k=(T==1?PQ:T==2?RS:SK)[i],eq=shEq(T,i),ow=shOwn(T,i),v=$('shv'),nm=k?k.n:(T==1?'Padrão':'Sem rastro'),
sub=T==3?WP[k.w].n:T==0?'Todas as armas':T==1?'Paraquedas':'Rastro';
ivInfo(v,k?RCOL[k.ra]:'#8fa3b8',ivHx(k&&k.p?k.p[0]:null)+'55',esc(nm),'RARIDADE: '+(k?IVR[k.ra]:'BÁSICO')+' • '+esc(sub).toUpperCase(),k?esc(k.d):(T==1?'Paraquedas normal.':'Sem rastro durante a queda.'));
v.insertAdjacentHTML('afterbegin','<div class="smdt">Pré-visualização</div>');
const big=(T==0||T==3)?shCv(T,k,i,320,150):shCv(T,k,i,220,220);big.className=(T==0||T==3)?'ivwb':'ivbg';v.querySelector('.ivpv').appendChild(big);
const r=$('shr');r.innerHTML=(k&&!ow?'<div class="smpr"><small>PREÇO:</small><div><svg class="ic"><use href="#'+(gm?'i-gem':'i-coin')+'"/></svg> <b>'+fmt(gm?k.gm:k.pr)+'</b> '+(gm?'CRISTAIS':'MOEDAS')+'</div></div>':'<div class="smpr"><small>'+(ow?'VOCÊ JÁ POSSUI ESTE ITEM':'ITEM INICIAL')+'</small></div>')+'<div class="ivmt"><span>'+(gm?'Seus cristais':'Suas moedas')+':<b>'+fmt(gm?gmv:coins)+'</b></span>'+(T==0?'<span>Vale para todas as armas</span>':T==3?'<span>Somente na '+esc(sub)+'</span>':'')+'</div>';
const bb=document.createElement('button');bb.type='button';bb.className='ivap smfull'+(k&&!ow&&!eq?'':'');bb.innerHTML=eq?'EQUIPADO <svg class="ic"><use href="#i-check"/></svg>':(ow||!k)?'EQUIPAR':'COMPRAR AGORA';bb.disabled=eq;bb.onclick=()=>shBuy(T,i);r.appendChild(bb);
if(k&&(T==0||T==3)){const pb=document.createElement('button');pb.type='button';pb.className='ivbt smfull';pb.innerHTML='<svg class="ic"><use href="#i-eye"/></svg> PRÉ-VISUALIZAR EM 3D';pb.onclick=()=>pvOpen(i,T==0?14:SK[i].w,'shop');r.appendChild(pb)}}
function evBuy(i){const k=SK[i];if(!OWN.includes(i)){if(gems<k.gm){soon('Cristais insuficientes');return}gems-=k.gm;svG();$('gemv').textContent=fmt(gems);OWN.push(i);snd(700,.15,'triangle',.06,400);soon(k.n+' comprada e equipada!')}else{soon(k.n+' equipada');snd(560,.08,'triangle',.05,200)}EQ[k.w]=i;svD();shopR()}
function shBuy(T,i){if(T==3)return evBuy(i);const k=(T==1?PQ:T==2?RS:SK)[i];
if(k&&!shOwn(T,i)){if(coins<k.pr){soon('Moedas insuficientes');return}coins-=k.pr;(T==0?OWN:T==1?OWNP:OWNR).push(i);$('coins').textContent=fmt(coins);snd(700,.15,'triangle',.06,400);soon(k.n+' comprado e equipado!')}
else{soon((k?k.n:'Padr\u00e3o')+' equipado');snd(560,.08,'triangle',.05,200)}
if(T==0){for(let id=1;id<WP.length;id++){if(i)EQ[id]=i;else delete EQ[id]}}else if(T==1)EQP=i;else EQR=i;svD();shopR()}
function shopC(t){$('shc').textContent=fmt(coins);const g=$('shg');g.innerHTML='';const L=t==1?PQ:RS,own=t==1?OWNP:OWNR,eq=t==1?EQP:EQR,cv=t==1?pqCv:rsCv;
for(let i=0;i<L.length;i++){const k=L[i],d=document.createElement('div');d.className='cd'+(eq==i?' on':'');d.style.cursor='default';d.appendChild(cv(k,150,80));
d.insertAdjacentHTML('beforeend','<div>'+(k?k.n:'Padrao')+'</div>'+(k?rarT(k)+'<small>'+k.d+'</small>'+dots2(k):'<small>'+(t==1?'Paraquedas normal':'Sem rastro')+'</small>'));
const ow=i==0||own.includes(i),b=document.createElement('button');b.className='btn'+(ow?' sec':'');b.innerHTML=eq==i?'EQUIPADO':ow?'EQUIPAR':'<svg class="ic"><use href="#i-coin"/></svg> '+fmt(k.pr);b.onclick=()=>shAct(t,i);d.appendChild(b);g.appendChild(d)}}
function shAct(t,i){const L=t==1?PQ:RS,own=t==1?OWNP:OWNR,k=L[i];
if(i&&!own.includes(i)){if(coins<k.pr){soon('Moedas insuficientes');return}coins-=k.pr;own.push(i);$('coins').textContent=fmt(coins);snd(700,.15,'triangle',.06,400);soon((t==1?'Paraquedas':'Rastro')+' comprado e equipado!')}
else{soon(i?k.n+' equipado':'Padrao equipado');snd(560,.08,'triangle',.05,200)}
if(t==1)EQP=i;else EQR=i;svD();shopR()}
function buy(i){if(OWN.includes(i)){soon('Voce ja tem esta skin');return}if(coins<SK[i].pr){soon('Moedas insuficientes');return}coins-=SK[i].pr;OWN.push(i);svD();$('coins').textContent=fmt(coins);shopR();soon('Skin comprada! Equipe em ARMAS');snd(700,.15,'triangle',.06,400)}
let ivT=0,ivS=[1,0,0],ivK=0;
function wType(id){const b=WP[id].base||id;return SGS.includes(b)?'Escopeta':SMS.includes(b)?'Submetralhadora':PSS.includes(b)?'Pistola':SNS.includes(b)?'Sniper':EXS.includes(b)?'Explosivo':ARS.includes(b)?'Fuzil':'Arma'}
function ivMx(){let d=0,r=0,c=0,m=0;for(let i=1;i<WP.length;i++){const w=WP[i];d=Math.max(d,w.dm*(w.pel||1));r=Math.max(r,w.rg);c=Math.max(c,1/w.cd);m=Math.max(m,w.mag)}return{d,r,c,m}}
function ivShop(T,i){shT=T;shS[T]=i;shJ=true;$('arm').classList.add('hide');shopR();$('shop').classList.remove('hide')}
let ivF=0,ivJ=true,ivP=[0,0,0];const IVPG=12,IVR=['RARO','ÉPICO','LENDÁRIO','MÍTICO'],ivHx=c=>/^#[0-9a-f]{6}$/i.test(c||'')?c:'#ff7d27';
function ivSk(id){const b=WP[id].base||id,L=[0];for(let i=1;i<SK.length;i++){if(SK[i].ev&&SK[i].w!=b)continue;L.push(i)}return L}
function ivGrid(items,mk,sel){const L=$('ivl'),pc=Math.max(1,Math.ceil(items.length/IVPG));
if(ivJ&&sel>=0)ivP[ivT]=Math.floor(sel/IVPG);ivJ=false;
ivP[ivT]=Math.min(Math.max(0,ivP[ivT]),pc-1);const pg=ivP[ivT];L.innerHTML='';
items.slice(pg*IVPG,pg*IVPG+IVPG).forEach(it=>L.appendChild(mk(it)));
if(!items.length)L.innerHTML='<div class="ivem">Nenhuma skin aqui ainda.</div>';
$('ivpi').textContent=(pg+1)+'/'+pc;$('ivpp').disabled=pg<=0;$('ivpx').disabled=pg>=pc-1;
$('ivpp').onclick=()=>{ivP[ivT]--;L.scrollTop=0;armR()};$('ivpx').onclick=()=>{ivP[ivT]++;L.scrollTop=0;armR()}}
/* v32: olho de pre-visualizacao nos itens */
function eyeB(fn){const b=document.createElement('button');b.type='button';b.className='ivey';b.setAttribute('aria-label','Pré-visualizar');b.innerHTML='<svg class="ic"><use href="#i-eye"/></svg>';b.onclick=e=>{e.stopPropagation();fn()};return b}
function simplePv(nm,sub,col,cv,ds){let o=document.getElementById('spv');if(o)o.remove();o=document.createElement('div');o.id='spv';o.innerHTML='<div class="spx"><button type="button" class="spc"><svg class="ic"><use href="#i-close"/></svg></button><div class="spn"></div><div class="sps"></div><div class="spw"></div><div class="spd"></div></div>';const x=o.firstChild;x.style.setProperty('--rc',col||'#ff6600');x.querySelector('.spn').textContent=nm;x.querySelector('.sps').textContent=sub||'';x.querySelector('.spd').textContent=ds||'';if(cv){cv.className='spcv';x.querySelector('.spw').appendChild(cv)}o.onclick=e=>{if(e.target===o||e.target.closest('.spc'))o.remove()};document.body.appendChild(o)}
function ivCard(o){const d=document.createElement('div');d.className='ivk'+(o.sel?' sel':'')+(o.lock?' lock':'');
d.style.setProperty('--rc',o.col);d.style.background='radial-gradient(90% 70% at 50% 38%,'+ivHx(o.pc)+'55,#0000 72%),linear-gradient(#231e1a,#110e0c)';
d.appendChild(o.cv);
d.insertAdjacentHTML('beforeend',(o.eq?'<span class="ivet">EQUIPADO</span>':'')+(o.lock?'<span class="ivbd lk"><svg class="ic"><use href="#i-lock"/></svg></span>':o.eq?'<span class="ivbd ok"><svg class="ic"><use href="#i-check"/></svg></span>':'')+'<div class="ivki"><b>'+o.nm+'</b><div class="ivrw">'+o.chips+'</div></div>');
if(o.pv)d.appendChild(eyeB(o.pv));d.onclick=o.click;return d}
function ivInfo(v,col,gl,nm,sub,ds){v.style.setProperty('--rc',col);v.style.setProperty('--gl',gl);
v.innerHTML='<div class="ivpv"><div class="ivpt"></div></div><div class="ivin"><div class="ivnm">'+nm+'</div><div class="ivsb">'+sub+'</div><div class="ivds">'+ds+'</div></div>'}
function armR(){$('ivc').textContent=fmt(coins);$('ivg').textContent=fmt((()=>{try{return gems}catch(e){return 980}})());
try{$('ivpn').textContent=PN;$('ivav').textContent=String(PN||'?').charAt(0).toUpperCase()}catch(e){}
$('ivpc').textContent='Skins: '+OWN.filter(i=>SK[i]).length+'/'+(SK.length-1);
const tb=$('ivt');tb.innerHTML='';
[['i-gun','ARMAS'],['i-parachute','PARAQUEDAS'],['i-sparkle','RASTROS']].forEach((n,i)=>{const b=document.createElement('button');b.type='button';b.className='ivtb'+(i==ivT?' on':'');b.innerHTML='<i><svg class="ic"><use href="#'+n[0]+'"/></svg></i><span>'+n[1]+'</span>';b.onclick=()=>{ivT=i;if(i==0)ivK=EQ[ivS[0]]||0;ivJ=true;$('ivl').scrollTop=0;armR()};tb.appendChild(b)});
if(ivT==0)ivW();else ivC(ivT)}
function ivW(){const id=ivS[0],w=WP[id],eqk=EQ[id]||0,pk=ivK,K=pk?SK[pk]:null,mx=ivMx(),own=pk==0||OWN.includes(pk);
$('ivh').textContent='Skins de armas';
const F=$('ivfl');F.style.display='';F.innerHTML='';
['Todas','Evolutivas','Minhas'].forEach((n,i)=>{const b=document.createElement('button');b.type='button';b.className='ivfb'+(i==ivF?' on':'');b.textContent=n;b.onclick=()=>{ivF=i;ivP[0]=0;ivJ=true;armR()};F.appendChild(b)});
const W=$('ivwp'),ws=W.scrollLeft;W.style.display='';W.innerHTML='';
for(let i=1;i<WP.length;i++){const e=EQ[i]||0,d=document.createElement('div');d.className='ivwi'+(i==id?' sel':'');d.appendChild(skCv(i,e,90,44));d.insertAdjacentHTML('beforeend','<b style="color:'+TCOL[i]+'">'+WP[i].n+'</b>');d.onclick=()=>{ivS[0]=i;ivK=EQ[i]||0;ivP[0]=0;ivJ=true;armR()};W.appendChild(d)}
W.scrollLeft=ws;
const L=ivSk(id).filter(i=>ivF==0||(ivF==1?(i&&SK[i].ev):(i==0||OWN.includes(i))));
ivGrid(L,i=>{const S=i?SK[i]:null,o=i==0||OWN.includes(i);
return ivCard({cv:skCv(id,i,150,84),nm:S?S.n:'Padrão',col:S?RCOL[S.ra]:'#8fa3b8',chips:'<span class="ivch">'+(S?IVR[S.ra]:'PADRÃO')+'</span>'+(S&&S.ev?'<span class="ivch ev">EVO</span>':'')+(S?'<span class="ivsr"><svg class="ic"><use href="#i-star"/></svg></span>':''),pc:S?S.p[0]:null,sel:i==pk,lock:!o,eq:i==eqk,pv:()=>{if(S)pvOpen(i,id,'arm');else simplePv('Padrão',w.n,'#8fa3b8',skCv(id,0,360,170),'Sem efeitos especiais.')},click:()=>{ivK=i;armR()}})},L.indexOf(pk));
const v=$('ivv');
ivInfo(v,K?RCOL[K.ra]:'#8fa3b8',ivHx(K?K.p[0]:null)+'55',K?K.n:'Padrão',(K?(K.ev?'EVOLUTIVA • ':'')+IVR[K.ra]:'PADRÃO')+' • '+w.n.toUpperCase()+' • '+wType(id).toUpperCase(),K?K.d:'Sem efeitos especiais.');
const cv=skCv(id,pk,320,150);cv.className='ivwb';v.querySelector('.ivpv').appendChild(cv);
const rw=(l,val,txt,m)=>'<div class="ivb"><div class="rw"><span>'+l+'</span><b>'+txt+'</b></div><div class="bar"><i style="width:'+Math.min(100,val/m*100)+'%"></i></div></div>';
const r=$('ivr');r.innerHTML='<div class="ivst">'+rw('Dano',w.dm*(w.pel||1),w.dm+(w.pel?' x'+w.pel:''),mx.d)+rw('Alcance',w.rg,w.rg,mx.r)+rw('Cadência',1/w.cd,(1/w.cd).toFixed(1)+'/s',mx.c)+rw('Munição',w.mag,w.mag,mx.m)+'</div><div class="ivmt"><span>Recarga:<b>'+(w.rl?w.rl+'s':'—')+'</b></span>'+(w.ex?'<span>Explosão:<b>raio '+w.ex+'</b></span>':'')+'</div>';
const sc=document.createElement('div');sc.className='ivsc';
if(K){const pb=document.createElement('button');pb.type='button';pb.className='ivbt';pb.innerHTML='<svg class="ic"><use href="#i-eye"/></svg> PRÉ-VISUALIZAR';pb.onclick=()=>pvOpen(pk,id,'arm');sc.appendChild(pb)}
const b2=document.createElement('button');b2.type='button';b2.className='ivbt';b2.textContent=K?'EQUIPAR EM TODAS':'TODAS COM PADRÃO';b2.disabled=!own||!!(K&&K.ev);
b2.onclick=()=>{for(let k=1;k<WP.length;k++){if(pk)EQ[k]=pk;else delete EQ[k]}svD();armR();soon(K?K.n+' em todas as armas':'Skins removidas de todas as armas');snd(560,.08,'triangle',.05,200)};sc.appendChild(b2);r.appendChild(sc);
const ap=$('ivap');ap.className='ivap';ap.disabled=false;ap.onclick=null;
if(pk==eqk){ap.innerHTML='<svg class="ic"><use href="#i-check"/></svg> EQUIPADA';ap.disabled=true}
else if(own){ap.textContent='APLICAR';ap.onclick=()=>{if(pk)EQ[id]=pk;else delete EQ[id];svD();armR();soon(w.n+': '+(K?K.n:'Padrão'));snd(560,.08,'triangle',.05,200)}}
else{ap.classList.add('sh');ap.innerHTML='<svg class="ic"><use href="#i-lock"/></svg> '+(K.ev?'<svg class="ic"><use href="#i-gem"/></svg> '+fmt(K.gm):'<svg class="ic"><use href="#i-coin"/></svg> '+fmt(K.pr));ap.onclick=()=>ivShop(K.ev?3:0,pk)}}
function ivC(T){const Lst=T==1?PQ:RS,cv=T==1?pqCv:rsCv,eqi=T==1?EQP:EQR,i=ivS[T],k=Lst[i],ow=shOwn(T,i),eq=eqi==i,def=T==1?'Padrão':'Sem rastro',nm=k?k.n:def,kind=T==1?'PARAQUEDAS':'RASTRO';
$('ivh').textContent=T==1?'Skins de paraquedas':'Skins de rastros';$('ivfl').style.display='none';$('ivwp').style.display='none';
ivGrid(Lst.map((q,j)=>j),j=>{const q=Lst[j],o=shOwn(T,j);
return ivCard({cv:cv(q,150,84),nm:q?q.n:def,col:q?RCOL[q.ra]:'#8fa3b8',chips:'<span class="ivch">'+(q?IVR[q.ra]:'BÁSICO')+'</span>'+(o?'':'<span class="ivch pr"><svg class="ic"><use href="#i-coin"/></svg> '+fmt(q.pr)+'</span>'),pc:q&&q.p?q.p[0]:null,sel:j==i,lock:!o,eq:eqi==j,pv:()=>simplePv(q?q.n:def,(q?IVR[q.ra]:'BÁSICO')+' • '+kind,q?RCOL[q.ra]:'#8fa3b8',cv(q,360,170),q?q.d:(T==1?'Paraquedas normal.':'Sem rastro durante a queda.')),click:()=>{ivS[T]=j;armR()}})},i);
const v=$('ivv');
ivInfo(v,k?RCOL[k.ra]:'#8fa3b8','#ff7d2744',nm,(k?IVR[k.ra]:'BÁSICO')+' • '+kind,k?k.d:(T==1?'Paraquedas normal.':'Sem rastro durante a queda.'));
const big=cv(k,220,220);big.className='ivbg';v.querySelector('.ivpv').appendChild(big);
const r=$('ivr');r.innerHTML='<div class="ivmt"><span>Status:<b style="color:'+(eq?'#7dff6a':ow?'#fff':'#ff8a8a')+'">'+(eq?'Equipado':ow?'Disponível':'Bloqueado')+'</b></span></div>';
const ap=$('ivap');ap.className='ivap';ap.disabled=false;ap.onclick=null;
if(eq){ap.innerHTML='<svg class="ic"><use href="#i-check"/></svg> EQUIPADO';ap.disabled=true}
else if(ow){ap.textContent='APLICAR';ap.onclick=()=>{if(T==1)EQP=i;else EQR=i;svD();armR();soon(nm+' equipado');snd(560,.08,'triangle',.05,200)}}
else{ap.classList.add('sh');ap.innerHTML='<svg class="ic"><use href="#i-lock"/></svg> <svg class="ic"><use href="#i-coin"/></svg> '+fmt(k.pr);ap.onclick=()=>ivShop(T,i)}}
$('shvt').onclick=()=>{const c=document.querySelector('#shop .btn.cl');if(c)c.click();else $('shop').classList.add('hide')};
$('shopb').onclick=()=>{shJ=true;shopR();$('shop').classList.remove('hide')};
$('armb').onclick=()=>{ivS[0]=ivS[0]||1;ivK=EQ[ivS[0]]||0;ivS[1]=EQP;ivS[2]=EQR;ivJ=true;ivP=[0,0,0];armR();$('arm').classList.remove('hide');const W=$('ivwp'),q=W.querySelector('.sel');if(q&&W.offsetParent)W.scrollLeft=q.offsetLeft-W.clientWidth/2+q.clientWidth/2};
