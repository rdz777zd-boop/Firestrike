/* js-31-assistir.js  (EXPERIMENTAL)
   Assistir uma partida que ja comecou. So fica ativo com ?assistir=1 na URL
   (guarda em localStorage 'arr_assistir'; ?assistir=0 desliga). Sem isso nao faz nada.
   Nao altera nenhum outro arquivo: so envolve MP.bus.send / MP.bus.cb.ev.

   Como funciona:
   - Quem quer assistir entra na sala pelo codigo e marca presenca as:1.
   - O dono da partida (MP.host) reenvia o 'go' com uma vaga extra: um slot de bot que ja morreu.
   - O espectador comeca a partida normalmente, morre em silencio (sem stats) e fica na camera de espectador.
   Limitacao: so da pra assistir quando ja existe um bot morto na partida. */
(function(){
'use strict';
let ON=false;
try{const q=new URLSearchParams(location.search).get('assistir');if(q==='1')localStorage.setItem('arr_assistir','1');if(q==='0')localStorage.removeItem('arr_assistir');ON=localStorage.getItem('arr_assistir')==='1'}catch(e){}
if(!ON)return;
const MP=window.MP;if(!MP)return;
const say=t=>{try{soon(t)}catch(e){console.log('[assistir]',t)}};
let LAST=null,SPEC=null;const used={};

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

/* dono: da uma vaga (bot ja morto) a quem pediu pra assistir */
setInterval(()=>{try{
 const b=MP.bus;if(!b)return;wrap(b);
 if(!(MP.on&&MP.host&&LAST&&typeof G!=='undefined'&&G&&G.f))return;
 const sl=LAST.m.sl||{};
 for(const id in MP.pr){const o=MP.pr[id];if(!o||!o.as||sl[id]!=null||id===b.me())continue;
  const idx=G.f.findIndex((f,i)=>f.dead&&!f.hum&&!f.isP&&!used[i]);if(idx<0)continue;
  used[idx]=1;
  const m2=Object.assign({},LAST.m,{sl:Object.assign({},sl,{[id]:idx}),pl:Object.assign({},LAST.m.pl,{[idx]:[String(o.n||'Espectador').slice(0,12),0]}),as:id});
  LAST={m:m2};b.send(m2);setTimeout(()=>b.send(m2),500);setTimeout(()=>b.send(m2),1300);
  console.log('[assistir] vaga',idx,'para',id)}
}catch(e){console.warn('[assistir]',e)}},700);

/* espectador: morre em silencio e segue os outros jogadores */
setInterval(()=>{try{
 if(!MP.on){SPEC=null;return}
 if(!SPEC||typeof G==='undefined'||!G||!G.f)return;
 const me=G.f[SPEC.idx];if(!me)return;
 if(G.p===me&&!me.dead&&!SPEC.k){SPEC.k=1;me.mpd=1;
  const d0=typeof PST!=='undefined'?PST.d:0;
  die(me,null);
  if(typeof PST!=='undefined'){PST.d=d0;try{pstSv()}catch(e){}}}
 if(me.dead&&(!G.spec||G.spec.dead||G.spec===me)){G.spec=G.f.find(o=>o!==me&&!o.dead&&o.hum)||G.f.find(o=>o!==me&&!o.dead)||null}
}catch(e){console.warn('[assistir]',e)}},250);

/* botao ASSISTIR no menu */
function btn(){
 let d=document.getElementById('asbtn');
 if(!d){d=document.createElement('button');d.id='asbtn';d.type='button';d.textContent='ASSISTIR';
  d.style.cssText="position:fixed;left:10px;bottom:calc(10px + env(safe-area-inset-bottom));z-index:100000;font:800 15px 'Rajdhani',Arial,sans-serif;letter-spacing:1.5px;padding:8px 14px;border-radius:4px 12px 4px 12px;border:0;background:linear-gradient(#ffd93b,#ff7a1a);color:#1a0f05;box-shadow:0 0 12px #ff7a1a99;display:none";
  d.onclick=async()=>{
   const c=(prompt('Codigo da sala para assistir:')||'').trim().toLowerCase();if(!c)return;
   if(!window.ARR_NET){say('Online indisponivel');return}
   try{await window.ARR_NET.connect(c);if(!MP.bus){say('Nao consegui entrar na sala');return}
    MP.bus.state({as:1});say('Na sala. Aguardando uma vaga de espectador...')}catch(e){say('Nao consegui entrar na sala')}};
  document.body.appendChild(d)}
 return d}
setInterval(()=>{try{const d=btn();d.style.display=(!MP.on&&!MP.arm&&typeof mode!=='undefined'&&mode!=='play')?'block':'none'}catch(e){}},500);
})();
