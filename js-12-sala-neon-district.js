
/* ===== SALA: cenario Neon District (cidade cyberpunk noturna, chuva e hologramas) ===== */
(function(){
let N0=null,GR=null,RN=null,raf=0,rings=[],TX={};
const NEO='#ff7519';
function cvs(w,h){const c=document.createElement('canvas');c.width=w;c.height=h;return[c,c.getContext('2d')]}
function rep(t,x,y){t.wrapS=t.wrapT=THREE.RepeatWrapping;t.repeat.set(x,y);t.anisotropy=4;return t}
function texSky(){if(TX.sky)return TX.sky;const[c,q]=cvs(4,256),g=q.createLinearGradient(0,0,0,256);
 [[0,'#070504'],[.4,'#1a1410'],[.7,'#322720'],[.9,'#524034'],[1,'#b0571b']].forEach(s=>g.addColorStop(s[0],s[1]));q.fillStyle=g;q.fillRect(0,0,4,256);return TX.sky=new THREE.CanvasTexture(c)}
function texAsphalt(){if(TX.as)return TX.as;const[c,q]=cvs(256,256);q.fillStyle='#120f0d';q.fillRect(0,0,256,256);
 const P=['#1c1815','#0d0b0a','#181412','#231e1a'];for(let i=0;i<1100;i++){q.fillStyle=P[i%4];q.fillRect(Math.random()*256,Math.random()*256,1+Math.random()*2,1+Math.random()*3)}
 for(let i=0;i<7;i++){const x=Math.random()*256,y=Math.random()*256,r=14+Math.random()*26;const g=q.createRadialGradient(x,y,1,x,y,r);g.addColorStop(0,'rgba(255,117,25,.16)');g.addColorStop(1,'rgba(255,117,25,0)');q.fillStyle=g;for(const ox of[-256,0,256])for(const oy of[-256,0,256]){q.beginPath();q.arc(x+ox,y+oy,r,0,7);q.fill()}}
 return TX.as=rep(new THREE.CanvasTexture(c),S/320,S/320)}
function texGrid(){if(TX.gr)return TX.gr;const[c,q]=cvs(256,256);q.fillStyle='#000';q.fillRect(0,0,256,256);
 q.fillStyle='#ff7519';q.fillRect(0,0,256,4);q.fillRect(0,0,4,256);
 q.fillStyle='#574335';q.fillRect(0,126,256,2);q.fillRect(126,0,2,256);
 q.fillStyle='#ff7519';q.fillRect(0,0,14,14);q.fillRect(120,120,14,14);
 q.fillStyle='#a6490b';for(let i=0;i<256;i+=32){q.fillRect(i,2,2,10);q.fillRect(2,i,10,2)}
 return TX.gr=rep(new THREE.CanvasTexture(c),S/320,S/320)}
function texWin(){if(TX.wn)return TX.wn;const[c,q]=cvs(128,256);q.fillStyle='#080605';q.fillRect(0,0,128,256);
 for(let y=0;y<16;y++)for(let x=0;x<8;x++){const r=Math.random();q.fillStyle=r<.38?'#ffffff':r<.5?'#ffcc9f':'#14110f';q.fillRect(x*16+3,y*16+3,10,9)}
 return TX.wn=new THREE.CanvasTexture(c)}
function snap(){if(N0)return;N0={bg:sc.background,fog:sc.fog,L:[],P:[],on:0};
 sc.traverse(o=>{if(o.isHemisphereLight||o.isDirectionalLight)N0.L.push([o,o.color.clone(),o.groundColor?o.groundColor.clone():null,o.intensity]);
  if(o.isMesh&&o.parent===sc&&o.geometry&&o.geometry.type=='PlaneGeometry'&&o.material&&o.material.color)N0.P.push([o.material,o.material.color.clone(),o.material.map,o.material.emissive?o.material.emissive.clone():null,o.material.emissiveMap||null,o.material.emissiveIntensity,o.material.opacity])})}
function nc(c){const h={h:0,s:0,l:0};c.getHSL(h);
 if(h.l>=.55&&h.s>=.5){c.setHSL(.5+((h.h*7)%1)*.3,.95,.55)}
 else c.setHSL(.52+h.h*.2,.5,Math.min(.3,h.l*.28+.06))}
function recolor(){const g=G,CO=new THREE.Color();
 gw.traverse(o=>{
  if(o.isInstancedMesh&&o.instanceColor){const a=o.instanceColor.array;for(let i=0;i<a.length;i+=3){CO.setRGB(a[i],a[i+1],a[i+2]);nc(CO);a[i]=CO.r;a[i+1]=CO.g;a[i+2]=CO.b}o.instanceColor.needsUpdate=true}
  if(o.material&&o.material.color&&!Array.isArray(o.material)){o.material=o.material.clone();const k=o.material.color;if(!(k.r>.98&&k.g>.98&&k.b>.98))nc(k)}});
 try{const fl=gw.children.find(o=>o.isInstancedMesh&&o.count==g.floors.length&&o.instanceColor);
  if(fl){g.teams.slice(0,2).forEach((t,i)=>{if(i<g.floors.length){CO.set(t.col).multiplyScalar(.5);fl.setColorAt(i,CO)}});fl.instanceColor.needsUpdate=true}}catch(e){}}
function decor(){GR=new THREE.Group();sc.add(GR);rings=[];
 const AX1=AX0+AS,AY1=AY0+AS,O=new THREE.Object3D(),CO=new THREE.Color();
 /* skyline */
 {const n=90,m=new THREE.InstancedMesh(new THREE.BoxGeometry(1,1,1),new THREE.MeshBasicMaterial({map:texWin(),color:'#ffffff'}),n),C=['#ff9f5f','#ff4fd8','#6a8cff','#ffcc9f','#2fa8ff'];
  for(let i=0;i<n;i++){const a=i/n*6.2832+rr(-.03,.03),d=rr(2000,3800),w=rr(220,360),h=rr(700,2800);
   O.position.set(CX+Math.cos(a)*d,h/2,CY+Math.sin(a)*d);O.rotation.set(0,rr(0,3),0);O.scale.set(w,h,w);O.updateMatrix();m.setMatrixAt(i,O.matrix);CO.set(C[i%5]);m.setColorAt(i,CO)}
  m.frustumCulled=false;GR.add(m)}
 /* pilares de neon */
 {const n=34,m=new THREE.InstancedMesh(new THREE.BoxGeometry(1,1,1),new THREE.MeshBasicMaterial({color:'#ffffff'}),n);let i=0;
  for(let t=0;t<400&&i<n;t++){const x=rr(AX0+120,AX1-120),y=rr(AY0+120,AY1-120);if(wallAt(x,y)||wallAt(x+30,y)||wallAt(x-30,y)||wallAt(x,y+30)||wallAt(x,y-30))continue;
   const h=rr(120,260);O.position.set(x,h/2,y);O.rotation.set(0,0,0);O.scale.set(7,h,7);O.updateMatrix();m.setMatrixAt(i,O.matrix);CO.set(i%3?'#ff7519':'#ff3ed8');m.setColorAt(i,CO);i++}
  m.count=i;m.frustumCulled=false;GR.add(m)}
 /* faixa neon na borda da arena */
 {const bm=new THREE.MeshBasicMaterial({color:NEO}),L=(x,z,w,d)=>{const b=new THREE.Mesh(new THREE.BoxGeometry(1,1,1),bm);b.scale.set(w,3,d);b.position.set(x,2,z);GR.add(b)};
  L(CX,AY0+8,AS,10);L(CX,AY1-8,AS,10);L(AX0+8,CY,10,AS);L(AX1-8,CY,10,AS)}
 /* aneis holograficos (spawns e centro) */
 {const rm=new THREE.MeshBasicMaterial({color:NEO,transparent:true,opacity:.85,side:THREE.DoubleSide,depthWrite:false}),rd=new THREE.MeshBasicMaterial({color:'#ff3ed8',transparent:true,opacity:.7,side:THREE.DoubleSide,depthWrite:false});
  for(const[x,z,mm]of[[AX0+300,CY,rm],[AX1-300,CY,rd],[CX,CY,rm]])for(const[r0,r1,seg]of[[200,208,64],[150,154,18],[250,262,10]]){const g=new THREE.Mesh(new THREE.RingGeometry(r0,r1,seg),mm);g.rotation.x=-1.5708;g.position.set(x,2.5,z);GR.add(g);rings.push([g,r0>240?-1:1])}}
 /* luzes de cor */
 {const a=new THREE.PointLight('#ff7519',1.1,1900);a.position.set(AX0+300,260,CY);const b=new THREE.PointLight('#ff3ed8',1,1900);b.position.set(AX1-300,260,CY);GR.add(a,b)}
 /* chuva */
 {const n=650,p=new Float32Array(n*6),v=new Float32Array(n);for(let i=0;i<n;i++){const x=rr(-900,900),z=rr(-900,900),y=rr(0,900);p[i*6]=x;p[i*6+1]=y;p[i*6+2]=z;p[i*6+3]=x+3;p[i*6+4]=y-34;p[i*6+5]=z;v[i]=rr(700,1100)}
  const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.BufferAttribute(p,3));RN=new THREE.LineSegments(g,new THREE.LineBasicMaterial({color:'#ffd1a8',transparent:true,opacity:.32,fog:false,depthWrite:false}));RN.frustumCulled=false;RN.userData.v=v;GR.add(RN);
  let t0=performance.now();const loop=t=>{if(!RN)return;const dt=Math.min(.05,(t-t0)/1000);t0=t;const a=RN.geometry.attributes.position.array,V=RN.userData.v;
   for(let i=0;i<n;i++){const d=V[i]*dt;a[i*6+1]-=d;a[i*6+4]-=d;if(a[i*6+4]<0){a[i*6+1]+=900;a[i*6+4]+=900}}
   RN.geometry.attributes.position.needsUpdate=true;try{if(cam3)RN.position.set(cam3.position.x,0,cam3.position.z)}catch(e){}
   for(const r of rings)r[0].rotation.z+=r[1]*dt*.5;raf=requestAnimationFrame(loop)};raf=requestAnimationFrame(loop)}}
function stop(){cancelAnimationFrame(raf);raf=0;RN=null;if(GR){sc.remove(GR);GR.traverse(o=>{if(o.geometry)o.geometry.dispose()});GR=null}rings=[]}
function neon(on){
 if(!on){if(!N0||!N0.on)return;N0.on=0;sc.background=N0.bg;sc.fog=N0.fog;
  for(const l of N0.L){l[0].color.copy(l[1]);if(l[2])l[0].groundColor.copy(l[2]);l[0].intensity=l[3]}
  for(const p of N0.P){const m=p[0];m.color.copy(p[1]);m.map=p[2];if(p[3]&&m.emissive)m.emissive.copy(p[3]);m.emissiveMap=p[4];if(p[5]!=null)m.emissiveIntensity=p[5];m.opacity=p[6];m.needsUpdate=true}
  stop();return}
 snap();stop();N0.on=1;
 sc.background=texSky();sc.fog=new THREE.Fog('#29211b',600,5200);
 for(const l of N0.L){const o=l[0];if(o.isHemisphereLight){o.color.set('#ffb36f');o.groundColor.set('#1d1815');o.intensity=.85}else{o.color.set('#ffcc9f');o.intensity=.45}}
 for(const p of N0.P){const m=p[0];if(p[2]){m.map=texAsphalt();m.color.set('#ffffff');if(m.emissive){m.emissive.set('#ffffff');m.emissiveMap=texGrid();m.emissiveIntensity=.9}}
  else{m.color.set(p[6]<1?'#201914':'#0b0907')}m.needsUpdate=true}
 recolor();decor()}
window.neonSala=neon;
const _cs=startCS;startCS=function(room,N,sala){try{neon(0)}catch(e){}const r=_cs.apply(this,arguments);return r};
const _st=start;start=function(){try{neon(0)}catch(e){}return _st.apply(this,arguments)};
})();

