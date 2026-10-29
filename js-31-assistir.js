/* js-31-assistir.js  (EXPERIMENTAL)
   Entrar numa partida que ja comecou: jogar CONTRA, jogar NA EQUIPE ou ASSISTIR.
   So fica ativo com ?assistir=1 na URL (guarda em localStorage 'arr_assistir'; ?assistir=0 desliga).
   Sem isso nao faz nada. Nao altera nenhum outro arquivo: so envolve MP.bus.send / MP.bus.cb.ev.

   Como funciona:
   - Quem quer entrar escolhe o codigo da sala e o modo; marca presenca as:1 e jm:'C' | 'T' | 'S'.
   - O dono da partida (MP.host) reenvia o 'go' com uma vaga extra:
       S (assistir)  -> slot de um bot que ja morreu; o espectador morre em silencio e segue os jogadores
       T (equipe)    -> um bot vivo do mesmo time do dono vira o jogador
       C (contra)    -> um bot vivo de outro time vira o jogador
   - Todos recebem 'asj' e passam a tratar aquele slot como humano.
   Limitacao: precisa existir uma vaga (bot morto ou bot vivo no time certo). */
(function(){
'use strict';
let ON=false;
try{const q=new URLSearchParams(location.search).get('assistir');if(q==='1')localStorage.setItem('arr_assistir','1');if(q==='0')localStorage.removeItem('arr_assistir');ON=localStorage.getItem('arr_assistir')==='1'}catch(e){}
if(!ON)return;
const MP=window.MP;if(!MP)return;
const say=t=>{try{soon(t)}catch(e){console.log('[assistir]',t)}};
let LAST=null,SPEC=null,PLAY=null;const used={};

/* todos: um bot vira jogador humano (entrada no meio da partida) */
function applyJ(a){try{
 if(!MP.on||typeof G==='undefined'||!G||!G.f)return;
 const f=G.f[a.idx];if(!f||f.dead||f.isP)return;
 MP.slots[a.id]=a.idx;MP.pl[a.idx]=[a.n,a.c];
 f.name=a.n;f.bn=a.n;f.ch=a.c;f.hum=1;f.al=0;f.mx=1;f.mi=0
}catch(e){console.warn('[assistir]',e)}}

/* quem entrou como jogador: assume a posicao e a vida do bot, com 3s de protecao */
function playTick(){
 const me=G.f[PLAY.idx];if(!me||G.p!==me||PLAY.k)return;
 const t=MP.bs[PLAY.idx];if(!t&&Date.now()-PLAY.t<4000)return;
 PLAY.k=1;
 if(t&&!t.d){me.x=t.x;me.y=t.y;if(t.hp>0)me.hp=t.hp;me.ar=t.ar||0}
 me.st='ground';me.jh=0;me.jv=0;me.vx=0;me.vy=0;me.dn=0;me.inv=Math.max(me.inv||0,3)}

/* liga os ganchos em cada conexao nova */
function wrap(b){
 if(!b._as){b._as=1;const s0=b.send;
  b.send=function(m){if(m&&typeof m==='object'&&m.t==='go')LAST={m:Object.assign({},m)};return s0.apply(this,arguments)}}
 if(!b._asw&&b.cb&&b.cb.ev){b._asw=1;const e0=b.cb.ev;
  b.cb.ev=function(from,m){try{
   if(m&&m.t==='go'&&m.as&&m.as===b.me()&&!MP.on&&!MP.arm&&m.sl&&m.sl[m.as]!=null){
    if(m.jm==='T'||m.jm==='C'){PLAY={idx:m.sl[m.as],k:0,t:Date.now()};SPEC=null}else{SPEC={idx:m.sl[m.as],k:0};PLAY=null}}
   if(m&&m.t==='asj'&&from===MP.hpid)applyJ(m)
  }catch(x){}return e0.apply(this,arguments)}}}

/* dono: da uma vaga a quem pediu pra entrar */
setInterval(()=>{try{
 const b=MP.bus;if(!b)return;wrap(b);
 if(!(MP.on&&MP.host&&LAST&&typeof G!=='undefined'&&G&&G.f))return;
 const sl=LAST.m.sl||{};
 for(const id in MP.pr){const o=MP.pr[id];if(!o||!o.as||sl[id]!=null||id===b.me())continue;
  const jm=o.jm==='T'||o.jm==='C'?o.jm:'S',ht=G.p?G.p.tm:0;
  const idx=G.f.findIndex((f,i)=>{if(f.hum||f.isP||used[i])return false;
   if(jm==='S')return !!f.dead;
   if(f.dead||f.dn>0)return false;
   return jm==='T'?f.tm===ht:f.tm!==ht});
  if(idx<0)continue;
  used[idx]=1;
  const nm=String(o.n||'Jogador').slice(0,12),ch=+o.c||0;
  const m2=Object.assign({},LAST.m,{sl:Object.assign({},sl,{[id]:idx}),pl:Object.assign({},LAST.m.pl,{[idx]:[nm,jm==='S'?0:ch]}),as:id,jm});
  LAST={m:m2};b.send(m2);setTimeout(()=>b.send(m2),500);setTimeout(()=>b.send(m2),1300);
  if(jm!=='S'){const a={t:'asj',id,idx,n:nm,c:ch};applyJ(a);b.send(a);setTimeout(()=>b.send(a),500);setTimeout(()=>b.send(a),1300)}
  console.log('[assistir] vaga',idx,jm,'para',id)}
}catch(e){console.warn('[assistir]',e)}},700);

/* quem entrou: espectador morre em silencio e segue os outros; jogador assume o bot */
setInterval(()=>{try{
 if(!MP.on){SPEC=null;PLAY=null;return}
 if(typeof G==='undefined'||!G||!G.f)return;
 if(PLAY)playTick();
 if(!SPEC)return;
 const me=G.f[SPEC.idx];if(!me)return;
 if(G.p===me&&!me.dead&&!SPEC.k){SPEC.k=1;me.mpd=1;
  const d0=typeof PST!=='undefined'?PST.d:0;
  die(me,null);
  if(typeof PST!=='undefined'){PST.d=d0;try{pstSv()}catch(e){}}}
 if(me.dead&&(!G.spec||G.spec.dead||G.spec===me)){G.spec=G.f.find(o=>o!==me&&!o.dead&&o.hum)||G.f.find(o=>o!==me&&!o.dead)||null}
}catch(e){console.warn('[assistir]',e)}},250);

/* botao ENTRAR NA PARTIDA no menu */
function btn(){
 let d=document.getElementById('asbtn');
 if(!d){d=document.createElement('button');d.id='asbtn';d.type='button';d.textContent='ENTRAR NA PARTIDA';
  d.style.cssText="position:fixed;left:10px;bottom:calc(10px + env(safe-area-inset-bottom));z-index:100000;font:800 15px 'Rajdhani',Arial,sans-serif;letter-spacing:1.5px;padding:8px 14px;border-radius:4px 12px 4px 12px;border:0;background:linear-gradient(#ffd93b,#ff7a1a);color:#1a0f05;box-shadow:0 0 12px #ff7a1a99;display:none";
  d.onclick=async()=>{
   const c=(prompt('Codigo da sala:')||'').trim().toLowerCase();if(!c)return;
   if(!window.ARR_NET){say('Online indisponivel');return}
   const o=(prompt('1 = Jogar CONTRA\n2 = Jogar NA EQUIPE\n3 = ASSISTIR','3')||'').trim(),jm=o==='1'?'C':o==='2'?'T':'S';
   try{await window.ARR_NET.connect(c);if(!MP.bus){say('Nao consegui entrar na sala');return}
    MP.bus.state({as:1,jm});say('Na sala. Aguardando uma vaga...');
    setTimeout(()=>{if(!MP.on&&!MP.arm)say('Ainda sem vaga: tente de novo mais tarde')},25000)}catch(e){say('Nao consegui entrar na sala')}};
  document.body.appendChild(d)}
 return d}
setInterval(()=>{try{const d=btn();d.style.display=(!MP.on&&!MP.arm&&typeof mode!=='undefined'&&mode!=='play')?'block':'none'}catch(e){}},500);
})();
