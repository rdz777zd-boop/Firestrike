
/* ===== ANTI-TRAVAMENTO (todos os bots): desliza no gelo em vez de empurrar, detecta travamento em 0.5s e escapa. Nao altera nenhum valor de velocidade ===== */
(function(){
const ai3=ai;
const iceHit=(x,y,r)=>{if(!G.iw)return 0;for(const w of G.iw){if(Math.abs(w.x-x)>230||Math.abs(w.y-y)>230)continue;for(const s of w.sg)if(segDist(x,y,s[0],s[1],s[2],s[3])[0]<ICE.th+r)return 1}return 0};
const blk=(x,y,r)=>wallAt(x,y)||wallAt(x+14,y)||wallAt(x-14,y)||wallAt(x,y+14)||wallAt(x,y-14)||iceHit(x,y,r+6);
function iceSlide(f){if(!G.iw||!G.iw.length)return;const sp=Math.hypot(f.vx,f.vy);if(sp<20)return;const ux=f.vx/sp,uy=f.vy/sp,ax=f.x+ux*62,ay=f.y+uy*62,m=ICE.th+f.r+16;
 for(const w of G.iw){if(Math.abs(w.x-f.x)>230||Math.abs(w.y-f.y)>230)continue;
  for(const s of w.sg){const [d,cx,cy]=segDist(ax,ay,s[0],s[1],s[2],s[3]);if(d>=m)continue;
   let nx=ax-cx,ny=ay-cy;const l=Math.hypot(nx,ny);if(l<.01){nx=-uy;ny=ux}else{nx/=l;ny/=l}
   const into=f.vx*nx+f.vy*ny;if(into>=0)continue;
   f.vx-=into*nx;f.vy-=into*ny;const tl=Math.hypot(f.vx,f.vy);
   if(tl<sp*.5){const sg=f.ss||1,q=sp*.75;if(tl>1){f.vx*=q/tl;f.vy*=q/tl}else{f.vx=-ny*q*sg;f.vy=nx*q*sg}}}}}
function freeDir(f){const h=Math.atan2(f.vy,f.vx);let b=null,bs=-1;
 for(let k=0;k<16;k++){const a=k/16*6.2832,dx=Math.cos(a),dy=Math.sin(a);let n=0;for(let r=24;r<=168;r+=24){if(blk(f.x+dx*r,f.y+dy*r,f.r))break;n++}
  const da=Math.abs(Math.atan2(Math.sin(a-h),Math.cos(a-h)));const sc=n*10+(da>.6?8:0)+(da>1.2&&da<2.2?4:0)+R();if(sc>bs){bs=sc;b=[dx,dy]}}
 return b}
function stuck(f,dt){
 if(f.hl||f.rt||f.icU>G.t||f.dash>0||(G.cs&&G.cs.ph!='fight'))return;
 if(f.esc){if(G.t>f.esc.u||f.hl){f.esc=null}else{const k=Math.min(1,dt*9);f.vx+=(f.esc.x*170-f.vx)*k;f.vy+=(f.esc.y*170-f.vy)*k;return}}
 f.sT=(f.sT||0)+dt;f.sV=(f.sV||0)+Math.hypot(f.vx,f.vy)*dt;
 if(f.sT<.5)return;
 const moved=Math.hypot(f.x-(f.sX==null?f.x:f.sX),f.y-(f.sY==null?f.y:f.sY)),cmd=f.sV;
 f.sT=0;f.sV=0;f.sX=f.x;f.sY=f.y;
 if(cmd>40&&moved<cmd*.3){f.stc=(f.stc||0)+1;
  const d=freeDir(f);if(d){f.esc={x:d[0],y:d[1],u:G.t+rr(.45,.8)};f.ss=-(f.ss||1)}
  f.np=null;f.wp=null;f.ls=null;f.lst=0;f.xq=null;
  if(f.stc>=4){try{unstick(f)}catch(e){}f.stc=0}}
 else f.stc=0}
/* desliza em QUALQUER parede/pedra/arvore (inclusive nos empurroes de retirada e peek), em vez de correr parado contra ela */
function wallSlide(f){const sp=Math.hypot(f.vx,f.vy);if(sp<20)return;const ux=f.vx/sp,uy=f.vy/sp;let q=null,ax=0,ay=0;
 for(const L of[26,48,70]){ax=f.x+ux*L;ay=f.y+uy*L;q=wallAt(ax,ay)||wallAt(ax-uy*14,ay+ux*14)||wallAt(ax+uy*14,ay-ux*14);if(q)break}
 if(!q)return;
 const dl=ax-q.x,dr=q.x+q.w-ax,dt2=ay-q.y,db=q.y+q.h-ay,mn=Math.min(dl,dr,dt2,db);
 const nx=mn==dl?-1:mn==dr?1:0,ny=mn==dt2?-1:mn==db?1:0;
 const into=f.vx*nx+f.vy*ny;if(into>=0)return;
 f.vx-=into*nx;f.vy-=into*ny;const tl=Math.hypot(f.vx,f.vy);
 if(tl<sp*.5){const g=f.wp||f.it||f.tg||f.ls;let sg=f.ss||1;
  if(f.wsG&&G.t<f.wsG.u)sg=f.wsG.sg;
  else{if(g){const tx=-ny,ty=nx;sg=((g.x-f.x)*tx+(g.y-f.y)*ty)>=0?1:-1}f.wsG={sg,u:G.t+.7}}
  const k=sp*.75;f.vx=-ny*k*sg;f.vy=nx*k*sg}}
/* alvo atras de parede de gelo: contorna pela ponta do gelo em vez de ficar parado/correndo no lugar */
const crs=(w,f,t)=>{for(const s of w.sg)if(segX(f.x,f.y,t.x,t.y,s[0],s[1],s[2],s[3]))return 1;return 0};
function flank(f,dt){
 /* lembra o ultimo inimigo da luta: quando o gelo corta a visao o alvo some, mas o bot nao esquece */
 if(f.tg&&!f.tg.dead&&f.lo)f.ft={e:f.tg,u:G.t+4};
 if(!G.iw||!G.iw.length||f.hl||f.rt||f.fle||f.ep||f.rtU>G.t||f.medG||f.icU>G.t||f.hp<MH*.35){f.hdT=0;return}
 const t=f.tg&&!f.tg.dead?f.tg:(f.ft&&G.t<f.ft.u&&!f.ft.e.dead&&f.ft.e.st=='ground'&&!(f.ft.e.dn>0)?f.ft.e:null);
 if(!t||dst(f,t)>750||!iceLos(f,t)){f.hdT=0;return}
 /* tempo escondido atras do PROPRIO gelo: depois de ~1s o bot sai e contorna (menos tempo parado atras do gelo) */
 f.hdT=G.iw.some(w=>w.tm===f.tm&&crs(w,f,t))?(f.hdT||0)+dt:0;
 let c=f.dtw;
 if(!c||G.t>c.u||dst(f,c)<40){c=null;let bs=1e9;
  for(const w of G.iw){if(w.tm===f.tm&&f.hdT<1)continue;if(!crs(w,f,t))continue;
   let mx=0,my=0;for(const s of w.sg){mx+=s[0]+s[2];my+=s[1]+s[3]}mx/=w.sg.length*2;my/=w.sg.length*2;
   for(const s of w.sg)for(let e=0;e<2;e++){const px=s[e*2],py=s[e*2+1],dx=px-mx,dy=py-my,l=Math.hypot(dx,dy)||1,x=px+dx/l*80,y=py+dy/l*80,p={x,y};
    if(x<130||y<130||x>S-130||y>S-130||blk(x,y,f.r)||!los(f,p))continue;
    const sc=dst(f,p)+Math.hypot(t.x-x,t.y-y);if(sc<bs){bs=sc;c={x,y,u:G.t+1.6}}}}
  f.dtw=c}
 if(!c)return;
 f.fa=Math.atan2(t.y-f.y,t.x-f.x);
 const d=dst(f,c)||1,k=Math.min(1,dt*8);f.vx+=((c.x-f.x)/d*175-f.vx)*k;f.vy+=((c.y-f.y)/d*175-f.vy)*k}
/* ===== MOVIMENTACAO BLOOD STRIKE / X1 (nivel 1 = bots, 2 = influencers, 3 = categoria Infinity) =====
   Base: strafe irregular (nunca parado, sem ritmo previsivel), jump-shot ao aparecer, pequenas paradas para atirar,
   entra e sai do alcance, slide em angulo (25-45 graus) cancelado com pulo, tecnica so a media/curta distancia e com vida,
   isca ate o aliado quando fraco (bait & trade). Sem buff: a velocidade final nunca passa da que o bot ja tinha. */
const jmp2=f=>{if((f.jh||0)==0&&G.t>(f.bjj||0)){f.jv=rr(270,320);f.bjj=G.t+rr(.7,1.3)}};
function bs(f,dt){
 const t=f.tg;if(!t||t.dead){f.loP=0;return}
 const L=(f.INF||f.leg2)?3:f.yt?2:1,lo=f.lo?1:0,reg=lo&&!f.loP;f.loP=lo;
 if(!lo||f.hl||f.rt||f.ep||f.fle||f.icU>G.t||(G.cs&&G.cs.ph!='fight')||f.pf>0||f.lgh>0)return;
 if(f.ws[0]==null&&f.ws[1]==null)return;
 const d=Math.max(1,f.td||dst(f,t)),ux=(t.x-f.x)/d,uy=(t.y-f.y)/d,px=-uy,py=ux,sc=f.ads&&(f.adsK||0)>.5,k=Math.min(1,dt*7);
 /* x1: um inimigo na vista e nenhum aliado perto -> duelo, movimento um pouco mais forte */
 let ne=0,al=0;for(const e of G.f){if(e.dead||e.dn>0||e.st!='ground')continue;if(e.tm!==f.tm){if(dst(f,e)<800&&los(f,e))ne++}else if(e!==f&&dst(f,e)<600)al++}
 const duel=ne==1&&al==0?1.25:1;
 /* COMBO MARCANTE: ao travar a mira no inimigo -> zigue-zague pulando de um lado pro outro (fase 0)
    -> slide/dash em angulo (fase 1) -> pulo cancelando o slide e volta ao zigue-zague. Todos os bots. */
 if(f.hp>MH*.4&&d>110&&d<650&&!(sc&&L<2)){
  let z=f.zz;if(!z||reg||G.t-(z.t||0)>1.5){z=f.zz={ph:0,u:G.t+rr(.9,1.7),sg:R()<.5?1:-1,fl:G.t+rr(.05,.15),t:G.t}}
  z.t=G.t;
  if(z.ph==0){
   if(G.t>=z.fl){z.sg=-z.sg;z.fl=G.t+rr(.22,.42);if((f.jh||0)==0)f.jv=rr(270,320)}
   const v=(165+L*5)*duel;f.vx+=(px*z.sg*v-f.vx)*k;f.vy+=(py*z.sg*v-f.vy)*k;
   if(G.t>=z.u&&!(f.dash>0)&&!(f.slc>0)&&!(f.hcd>0&&false)){
    const a=.55*z.sg,c=Math.cos(a),sn=Math.sin(a);
    f.vx=(ux*c-uy*sn)*170;f.vy=(ux*sn+uy*c)*170;slide(f);z.ph=1;z.u=G.t+.75}
   else if(G.t>=z.u+.5){z.u=G.t+rr(.5,1)}}
  else{
   if(f.dash>0&&f.dash<.22)jmp2(f);
   if(G.t>=z.u||!(f.dash>0)&&G.t>z.u-.55){z.ph=0;z.sg=-z.sg;z.u=G.t+rr(1.1,2);z.fl=G.t}}
  return}
 /* strafe irregular: tempos aleatorios, fintas rapidas e micro-paradas (parar para atirar) */
 if(!sc||L>=2){let sa=f.bsS;
  if(!sa||G.t>sa.u){const r=R(),sg=sa?(R()<.65?-sa.sg:sa.sg):(R()<.5?1:-1);
   f.bsS=sa={sg,z:L>=2&&r>=.22&&r<.34?1:0,u:G.t+(L>=2&&r<.22?rr(.07,.15):L>=2&&r<.34?rr(.1,.2):rr(.18,.6))}}
  if(sa.z){f.vx*=1-.6*k;f.vy*=1-.6*k}else{const v=(55+L*22)*duel*(sc?.5:1)*k;f.vx+=px*sa.sg*v;f.vy+=py*sa.sg*v}}
 /* entra e sai do alcance */
 if(L>=2){let q=f.bsI;if(!q||G.t>q.u)q=f.bsI={v:[-1,0,1][R()*3|0],u:G.t+rr(.4,1.1)};
  const v=q.v==1&&d<150?0:q.v==-1&&d>620?0:q.v;f.vx+=ux*v*45*k;f.vy+=uy*v*45*k}
 /* jump-shot: ao reaparecer na mira e em intervalos irregulares */
 if(reg&&L>=2&&d<650)jmp2(f);
 if(G.t>(f.bjc||0)){f.bjc=G.t+rr(.8,1.5);if(d<650&&R()<(L==1?.35:L==2?.6:.8))jmp2(f)}
 /* slide cancelado com pulo + slide em angulo na aproximacao (so media/curta distancia e com vida) */
 if(L>=2&&f.dash>0&&f.dash<.22)jmp2(f);
 if(L>=2&&!(f.dash>0)&&!(f.slc>0)&&G.t>(f.bsl||0)&&f.hp>MH*.4&&d>200&&d<450&&!sc&&WP[f.ws[f.cur]||0].rg<900){
  const a=.6*(f.bsS?f.bsS.sg:1),c=Math.cos(a),sn=Math.sin(a);
  f.vx=(ux*c-uy*sn)*170;f.vy=(ux*sn+uy*c)*170;f.bsl=G.t+(L==3?rr(1.6,2.8):rr(2.5,4.5));slide(f)}
 /* isca: com vida baixa recua ate o aliado mais proximo para lutarem juntos */
 if(L>=2&&f.hp<MH*.55&&d<500&&G.t>(f.bbC||0)){let a=null,ad=800;
  for(const o of G.teams[f.tm].m)if(o!==f&&!o.dead&&!(o.dn>0)&&o.st=='ground'){const q=dst(f,o);if(q>220&&q<ad){ad=q;a=o}}
  if(a){f.bb={a,u:G.t+rr(1,1.8)};f.bbC=G.t+rr(4,6)}}
 if(f.bb&&G.t<f.bb.u&&!f.bb.a.dead){const q=dst(f,f.bb.a)||1;f.vx+=(f.bb.a.x-f.x)/q*100*k;f.vy+=(f.bb.a.y-f.y)/q*100*k}}
ai=function(f,dt){ai3(f,dt);
 try{if(!f.isP&&!f.dead&&!(f.dn>0)&&f.st=='ground'){
  const m0=Math.hypot(f.vx,f.vy);bs(f,dt);
  const cap=Math.max(m0,180),m1=Math.hypot(f.vx,f.vy);if(m1>cap){f.vx*=cap/m1;f.vy*=cap/m1}
  flank(f,dt);stuck(f,dt);iceSlide(f);wallSlide(f)}}catch(e){}};
})();
