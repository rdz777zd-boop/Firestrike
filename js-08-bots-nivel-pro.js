
/* ===== BOTS NIVEL PRO (Free Fire / Blood Strike): SO jogabilidade, sem buff de vida, dano, velocidade ou mira ===== */
(function(){
/* bots lendarios novos: mesma categoria do Infinity (nome + tag do YouTube + IA de pro), sem nenhum buff */
const LG2=['Nexus','Zenith','Apex','Vexor','Solaris','Kairos'];
LG2.forEach(n=>{if(!LEGS.includes(n))LEGS.push(n);if(!INFLS.includes(n))INFLS.push(n)});
const ia0=infApply;
infApply=function(teams,f,room){
 const r=ia0.apply(this,arguments);
 try{
  const t0=teams&&teams[0],cands=f.filter(q=>!q.isP&&!q.INF&&!q.fr&&!(t0&&t0.m.includes(q)));
  const n=Math.min(cands.length,f.length>=20?3:f.length>=8?1:0),pool=LG2.slice().sort(()=>Math.random()-.5);
  for(let i=0;i<n;i++){const o=cands.splice(Math.random()*cands.length|0,1)[0];
   o.icl=null;o.cl=null;o.ctg=undefined;o.bn=undefined;o.name=pool[i];o.cm=pool[i];o.leg2=1;try{NU.add(pool[i])}catch(e){}}
 }catch(e){}
 return r};
/* a tag do YouTube nao pode virar buff: o ytApply ignora os lendarios novos */
const ya0=ytApply;
ytApply=function(f){const L=(f||[]).filter(o=>o&&o.leg2&&!o.INF);L.forEach(o=>o.INF=1);try{return ya0.apply(this,arguments)}finally{L.forEach(o=>{o.INF=0})}};

const ai1=ai;
const steerTo=(f,dx,dy,s,dt)=>{const k=Math.min(1,dt*7);f.vx+=(dx*s-f.vx)*k;f.vy+=(dy*s-f.vy)*k};
const nudge=(f,dx,dy,s,dt)=>{const k=Math.min(1,dt*7);f.vx+=dx*s*k;f.vy+=dy*s*k};
const jumpF=(f,cd)=>{if((f.jh||0)==0&&G.t>(f.ffJ||0)){f.jv=rr(270,320);f.ffJ=G.t+rr(cd*.8,cd*1.4)}};

function pro(f,dt){
 if(!G||G.hc||f.isP||f.dead||f.dn>0||f.st!='ground'||f.rt||f.hl||f.icU>G.t)return;
 if(G.cs&&G.cs.ph!='fight')return;
 const P=(f.INF||f.leg2||f.yt)?1:.7,wi=f.ws[f.cur]||0,w=WP[wi],m0=Math.hypot(f.vx,f.vy);
 /* ---- decisoes a cada ~0.3s ---- */
 f.ptT=(f.ptT||0)-dt;
 if(f.ptT<=0){f.ptT=rr(.22,.4);
  if(!f.vs){/* foco: ataca quem esta fraco ou quem o time ja esta atacando */
   const T=G.teams[f.tm].m,c=f.tg;let best=c,bs=c&&!c.dead&&f.lo?f.td-(c.hp<MH*.4?150:0):1e9;
   for(const e of G.f){if(e.tm===f.tm||e.dead||e.dn>0||e.st!='ground'||e.invis>0)continue;const d=dst(f,e);if(d>750||!los(f,e))continue;
    let s=d;if(e.hp<MH*.4)s-=150;if(T.some(o=>o!==f&&!o.dead&&o.tg===e))s-=120;if(s<bs-60){bs=s;best=e}}
   if(best&&best!==c){f.tg=best;f.td=dst(f,best);f.lo=1;f.ls={x:best.x,y:best.y};f.lst=2.5}}
  /* desvantagem: 2+ inimigos na vista, sem aliado perto e vida nao cheia -> sai da luta (nao luta em desvantagem) */
  if(G.t>(f.rtC||0)){let n=0,cx=0,cy=0;for(const e of G.f){if(e.tm===f.tm||e.dead||e.dn>0||e.st!='ground'||e.invis>0)continue;if(dst(f,e)<650&&los(f,e)){n++;cx+=e.x;cy+=e.y}}
   let m=0;for(const o of G.teams[f.tm].m)if(o!==f&&!o.dead&&!(o.dn>0)&&o.st=='ground'&&dst(f,o)<500)m++;
   if(n>=2&&m==0&&f.hp<MH*.75&&R()<.6*P){f.rtU=G.t+rr(1.4,2.2);f.rtC=f.rtU+3;f.rtX=cx/n;f.rtY=cy/n}}}
 const t=f.tg;
 /* troca de arma em vez de recarregar quando o pente acaba perto do inimigo (swap cancel) */
 if(wi&&f.rl<=0&&f.mg[f.cur]<=0){const o=f.cur^1;if(f.ws[o]!=null&&f.mg[o]>0&&t&&f.td<550&&f.cd<=0){swap(f);return}}
 /* recarrega cedo, fora da vista */
 if(wi&&f.rl<=0&&f.mg[f.cur]<w.mag*.3&&(!t||!f.lo||f.td>450))reload(f);
 /* influenciadores/lendarios usam o proprio gelo com inteligencia */
 if((f.yt||f.leg2)&&!f.INF&&f.ic>0){f.ffI2=(f.ffI2||0)-dt;if(f.ffI2<=0){f.ffI2=.12;try{infIce(f)}catch(e){}}}
 const busy=f.fle||f.medG||f.rdn||f.cvA||f.sv||f.shp;
 /* ---- saindo de uma luta em desvantagem ---- */
 if(f.rtU>G.t&&!busy){const dx=f.x-f.rtX,dy=f.y-f.rtY,d=Math.hypot(dx,dy)||1,px=-dy/d,py=dx/d,z=Math.sin(G.t*6+(f.i||0));
  steerTo(f,dx/d+px*z*.6,dy/d+py*z*.6,175,dt);jumpF(f,1);return}
 /* ---- segura o angulo e da "peek" de ombro em vez de entrar correndo ---- */
 const Z=G.Z;
 if(t&&!t.dead&&!f.lo&&f.td<650&&f.hp>MH*.35&&!busy&&wi>0&&f.mg[f.cur]>0&&Z&&Math.hypot(Z.cx-f.x,Z.cy-f.y)<Z.r-90){
  let s=f.pk;if(!s||s.tg!==t){s=f.pk={tg:t,on:R()<P,ph:0,u:G.t+rr(.5,1),n:0,dir:R()<.5?1:-1}}
  if(s.on&&s.n<3){if(G.t>=s.u){s.ph^=1;if(!s.ph)s.n++;s.u=G.t+(s.ph?rr(.28,.45):rr(.45,1));s.dir=R()<.5?1:-1}
   const d=f.td||1,ux=(t.x-f.x)/d,uy=(t.y-f.y)/d;
   if(!s.ph)steerTo(f,0,0,0,dt);else steerTo(f,-uy*s.dir+ux*.25,ux*s.dir+uy*.25,150,dt);
   return}}
 else if(f.lo)f.pk=null;
 if(!t||t.dead||!f.lo)return;
 /* ---- em combate com linha de tiro ---- */
 const d=f.td||1,ux=(t.x-f.x)/d,uy=(t.y-f.y)/d,px=-uy,py=ux;f.ffT=(f.ffT||0)+dt;
 const scoped=f.ads&&(f.adsK||0)>.5,close=w.rg<520;
 if(f.hp<MH*.45&&(f.kt+f.bd)>0&&t.hp>f.hp*1.3&&d<450){nudge(f,-ux,-uy,150,dt);nudge(f,px,py,f.sd*90,dt);jumpF(f,.9)}
 else if(d>150&&f.rl<=0&&f.mg[f.cur]>0&&f.hp>MH*.4&&(t.rl>0||t.hp<MH*.35)&&d<(close?650:900)){nudge(f,ux,uy,110,dt);if(d>260)jumpF(f,1.1)}
 else if(f.rl>0&&d<600){nudge(f,-ux,-uy,70,dt);nudge(f,px,py,f.sd*110,dt);jumpF(f,.8)}
 else if(!scoped){nudge(f,px,py,Math.sin(f.ffT*(5+(f.i||0)%3)+(f.i||0))*(60+f.sk*30),dt)}
 /* flanco: dois aliados no mesmo alvo abrem lados opostos */
 {let mate=null;for(const o of G.teams[f.tm].m){if(o!==f&&!o.dead&&!(o.dn>0)&&o.st=='ground'&&o.tg===t){mate=o;break}}
  if(mate)nudge(f,px,py,((f.i||0)<(mate.i||0)?1:-1)*80,dt)}
 /* arma curta: desliza para dentro da distancia de combate */
 if(close&&d>170&&d<430&&G.t>(f.ffS||0)&&f.hp>MH*.35&&R()<dt*1.4){f.ffS=G.t+rr(3.5,7);slide(f)}
}
ai=function(f,dt){ai1(f,dt);
 try{const m0=Math.hypot(f.vx,f.vy);pro(f,dt);
  /* trava de velocidade: nunca passa do que o bot ja podia andar */
  const cap=Math.max(m0,180),m1=Math.hypot(f.vx,f.vy);if(m1>cap){f.vx*=cap/m1;f.vy*=cap/m1}}catch(e){}};
})();
