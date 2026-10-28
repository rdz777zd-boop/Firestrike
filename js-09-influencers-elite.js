
/* ===== INFLUENCERS ELITE: SO jogabilidade (cobertura, peek, curar/recarregar escondido, retirada inteligente). Nenhum valor de vida, dano, velocidade, mira ou cadencia foi alterado ===== */
(function(){
const ai2=ai,isE=f=>f.INF||f.leg2||f.yt;
const mv=(f,x,y,s,dt)=>{const d=Math.hypot(x-f.x,y-f.y)||1,k=Math.min(1,dt*8);let ux=(x-f.x)/d,uy=(y-f.y)/d;if(d>38)[ux,uy]=steer(f,ux,uy);f.vx+=(ux*s-f.vx)*k;f.vy+=(uy*s-f.vy)*k};
const jmp=f=>{if((f.jh||0)==0&&G.t>(f.ejc||0)){f.jv=rr(270,320);f.ejc=G.t+rr(.8,1.4)}};
/* ponto de cobertura: livre, no caminho sem parede, escondido do alvo e de outros inimigos, dentro da zona */
function cover(f,t){let b=null,bd=1e9;const Z=G.Z;
 for(let k=0;k<16;k++){const a=k/16*6.2832+(f.i||0)*.7;
  for(const r of[80,140,210]){const x=f.x+Math.cos(a)*r,y=f.y+Math.sin(a)*r;
   if(x<130||y<130||x>S-130||y>S-130||Math.hypot(Z.cx-x,Z.cy-y)>Z.r-70)continue;
   if(wallAt(x,y)||wallAt(x+24,y)||wallAt(x-24,y)||wallAt(x,y+24)||wallAt(x,y-24))continue;
   const p={x,y};if(!los(f,p)||los(p,t))continue;
   const dt=Math.hypot(t.x-x,t.y-y);if(dt<130)continue;
   let bad=0;for(const e of G.f)if(e.tm!==f.tm&&!e.dead&&!(e.dn>0)&&e.st=='ground'&&e!==t&&dst(e,p)<700&&los(p,e)){bad=1;break}
   if(bad)continue;
   const sc=r+(dt<dst(f,t)?70:0);if(sc<bd){bd=sc;b=p}break}}
 return b}
function elite(f,dt){
 if(!G||G.hc||f.isP||f.dead||f.dn>0||f.st!='ground'||f.rt||f.icU>G.t)return;
 if(G.cs&&G.cs.ph!='fight')return;
 if(f.ws[0]==null&&f.ws[1]==null)return;
 const t=f.tg&&!f.tg.dead?f.tg:null,e=f.ep;
 if(e){
  if(G.t>e.u||f.hp<=0){f.ep=null;if(e.why!='heal')jmp(f);return}
  if(e.why=='heal'&&!f.hl&&f.hp>=MH*.92){f.ep=null;return}
  const d=dst(f,e.p);
  if(d>38){if(f.hl&&f.lo)f.hl=null;mv(f,e.p.x,e.p.y,175,dt);if(d>110)jmp(f);
   if(d>160&&t&&f.lo&&G.t>(f.ffS||0)&&R()<dt*2){f.ffS=G.t+5;slide(f)}}
  else{mv(f,f.x,f.y,0,dt);const q=t||f.ls;if(q)f.fa=Math.atan2(q.y-f.y,q.x-f.x);
   if(e.why=='heal'){if(!f.hl){if(f.hp<MH&&(f.kt>0||f.bd>0))useHeal(f,f.kt>0&&f.hp<=MH*.4?'k':'b');if(!f.hl)f.ep=null}}
   else if(!f.hl&&f.rl<=0&&f.mg[f.cur]<WP[f.ws[f.cur]||0].mag*.7)reload(f);
   if(f.lo&&t&&(e.n=(e.n||0)+1)<3){const c=cover(f,t);if(c)e.p=c;else f.ep=null}}
  return}
 if(G.t<(f.epC||0))return;
 let why=null,tt=t;
 if(f.rtU>G.t&&!t)tt={x:f.rtX,y:f.rtY};
 if(f.rtU>G.t)why='rt';
 else if(t&&f.lo&&f.td>130&&f.td<700){
  const o=f.cur^1,otherOk=f.ws[o]!=null&&f.mg[o]>0;
  if(f.hl||(f.hp<MH*.55&&f.bd>0)||(f.hp<=MH*.4&&f.kt>0))why='heal';
  else if(f.rl>0&&!otherOk)why='rl';
  else if(f.dmgT>G.t-.35&&f.hp<MH*.85&&t.hp>=f.hp*.9&&t.hp>=MH*.3&&R()<.75)why='peek'}
 if(why&&tt){const c=cover(f,tt);f.epC=G.t+(why=='peek'?3.5:2);
  if(c){if(why=='heal'&&f.hl)f.hl=null;f.ep={p:c,why,n:0,u:G.t+(why=='heal'?7:why=='rl'?(f.rl||1)+.5:why=='rt'?(f.rtU-G.t)+1:rr(.7,1.2))}}}
}
ai=function(f,dt){ai2(f,dt);
 try{if(!f.isP&&isE(f)){const m0=Math.hypot(f.vx,f.vy);elite(f,dt);
  const cap=Math.max(m0,180),m1=Math.hypot(f.vx,f.vy);if(m1>cap){f.vx*=cap/m1;f.vy*=cap/m1}}}catch(e){}};
})();
