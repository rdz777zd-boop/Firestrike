
/* ===== VITORIA HD: supersampling, rotulos nitidos, raios em alta resolucao, filtro anisotropico ===== */
(function(){
const vPR=()=>Math.min(2,Math.max(1.5,devicePixelRatio||1));
function vHD(){
  try{ren.setPixelRatio(vPR());ren.setSize(W,H,false)}catch(e){}
  if(!vsc)return;
  let an=1;try{an=ren.capabilities.getMaxAnisotropy()||1}catch(e){}
  vsc.traverse(o=>{const ms=o.material?(Array.isArray(o.material)?o.material:[o.material]):[];for(const m of ms){const t=m.map;if(t&&!t.__hd){t.__hd=1;if(t.generateMipmaps===false||t.minFilter===THREE.NearestFilter)continue;t.anisotropy=an;if(!(o.isSprite||m.transparent&&t.image&&t.image.width<=8)){t.minFilter=THREE.LinearMipmapLinearFilter}t.needsUpdate=true}}});
  const v=G&&G.vic;
  if(v&&v.ry&&v.ry.material&&!v.ry.__hd){
    v.ry.__hd=1;const c=document.createElement('canvas');c.width=c.height=1024;const q=c.getContext('2d');q.translate(512,512);
    for(let i=0;i<16;i++){q.fillStyle='rgba(255,255,255,.22)';q.beginPath();q.moveTo(0,0);q.arc(0,0,512,i*Math.PI/8,i*Math.PI/8+Math.PI/16);q.closePath();q.fill()}
    const rg=q.createRadialGradient(0,0,0,0,0,512);rg.addColorStop(0,'rgba(0,0,0,0)');rg.addColorStop(1,'rgba(0,0,0,1)');q.globalCompositeOperation='destination-out';q.fillStyle=rg;q.fillRect(-512,-512,1024,1024);
    const tx=new THREE.CanvasTexture(c);tx.anisotropy=an;const old=v.ry.material.map;v.ry.material.map=tx;v.ry.material.needsUpdate=true;if(old)old.dispose();
  }
}
/* rotulos 2x mais nitidos (1024x256) */
vicLbl=function(txt,col,bg,fs){const c=document.createElement('canvas');c.width=1024;c.height=256;const q=c.getContext('2d');q.scale(2,2);
 q.font='900 '+fs+'px "Trebuchet MS",Arial';const w=Math.min(496,q.measureText(txt).width+44);
 q.fillStyle=bg;q.strokeStyle='#0d1a13';q.lineWidth=8;q.lineJoin='round';q.beginPath();q.roundRect(256-w/2,14,w,100,26);q.fill();q.stroke();
 q.fillStyle=col;q.textAlign='center';q.textBaseline='middle';q.fillText(txt,256,66);
 const tx=new THREE.CanvasTexture(c);tx.anisotropy=8;tx.minFilter=THREE.LinearMipmapLinearFilter;tx.magFilter=THREE.LinearFilter;tx.__hd=1;
 const sp=new THREE.Sprite(new THREE.SpriteMaterial({map:tx,transparent:true,depthTest:false}));sp.renderOrder=10;sp.scale.set(64,16,1);return sp};
const _vs2=vicStart;vicStart=function(){_vs2.apply(this,arguments);vHD()};
const _vb=vicBoard;vicBoard=function(){try{qSz()}catch(e){}return _vb.apply(this,arguments)};
})();
