/* js-33-multiplayer-modos.js - CONTRA SQUAD e SALA online com amigos (v176)

   PROBLEMA: o multiplayer (js-06) so ligava os humanos (MPH) e as sementes (MPS) no Battle Royale.
   No Contra Squad / Sala o jogo entrava em modo online (MP.on=1) mas cada jogador abria a SUA
   partida, sozinho contra bots, e o amigo convidado nunca aparecia na mesma partida.

   O QUE ESTE ARQUIVO FAZ (nao mexe em nenhum outro arquivo, so envolve funcoes):
   - semeia o mapa igual para todos (MPS) e coloca cada humano no seu slot (MPH) no Contra Squad/Sala;
   - o DONO da sala decide os rounds (compra -> luta -> fim) e manda o estado ('csr') para os convidados;
     o convidado so conta o tempo na tela e segue o dono (round, fase, placar, fim da partida);
   - ao comecar cada round limpa a marca de morte (senao a 2a morte nao era avisada) e ignora a
     morte velha que ainda chega da rede durante a fase de compra;
   - quem joga no time 2 ve VITORIA/DERROTA e missoes do ponto de vista do proprio time;
   - modos que nao tem sincronizacao (Halloween City, espectador, aposta) rodam offline, sem poluir
     a partida; Halloween com amigos na equipe avisa em vez de abrir uma partida separada.

   Para desligar: abra o jogo com ?mpmodos=0 */
(function(){
'use strict';
try{if(new URLSearchParams(location.search).get('mpmodos')==='0')return}catch(e){}
const MP=window.MP;
if(!MP||typeof start!=='function'||typeof startCS!=='function'||typeof build3!=='function'||typeof csUpd!=='function'||typeof csRound!=='function'||typeof csEnd!=='function')return;
const $=id=>document.getElementById(id);
const say=t=>{try{soon(t)}catch(e){console.log('[mp-modos]',t)}};
const party=()=>/^p[a-z0-9]{3,7}$/.test(String(MP.code||''));
const hum=()=>MP.bus?Object.keys(MP.pr).filter(k=>MP.pr[k]&&MP.pr[k].s==='l').length:0;

/* 1) modos sem sincronizacao rodam offline (nao liga o multiplayer nem o 'dd'/'sh' que contaminava a partida) */
{const s0=start;start=function(){
 try{if(MP.arm){const bt=window.__BET&&window.__BET.pending;
  if(TB==3||bt||(TB==4&&SALA&&SALA.w)||(TB==2&&RM==1))MP.arm=0}}catch(e){}
 return s0.apply(this,arguments)}}

/* 2) mesmo mapa para todos (a semente precisa estar ligada antes do mapa ser gerado) */
{const c0=startCS;startCS=function(room,N,sala){
 try{if(MP.on&&room)MP.on=0;if(MP.on&&typeof window.MPS==='function')window.MPS(1)}catch(e){}
 return c0.apply(this,arguments)}}

/* 3) coloca os humanos nos slots (MPH) assim que a partida existe, antes do 1o round */
{const b0=build3;build3=function(g){
 try{
  if(MP.on&&g&&g.cs&&!g._mpm){
   g._mpm=1;
   const mx=Math.max.apply(null,Object.keys(MP.slots||{}).map(k=>+MP.slots[k]||0).concat([0]));
   if(g.room||mx>=g.f.length){MP.on=0;window.__mpR=null;say('A sala n\u00e3o tem vagas para todos. Jogando offline.')}
   else{window.MPH&&window.MPH();if(g.sala)for(const o of g.f)o.ch=9}
  }
 }catch(e){console.error('[mp-modos]',e);try{window.__mpR=null}catch(x){}}
 return b0.apply(this,arguments)}}

/* 4) rounds: o dono manda, o convidado segue */
{const r0=csRound;csRound=function(){
 const r=r0.apply(this,arguments);
 try{if(G&&G.cs){G.cs.w=-1;if(MP.on)for(const o of G.f)o.mpd=0}}catch(e){}
 return r}}
{const e0=csEnd;csEnd=function(w){try{if(G&&G.cs)G.cs.w=w}catch(e){}return e0.apply(this,arguments)}}

let lastK='',lastT=0;
function sendCs(){try{const g=G,c=g&&g.cs;if(!c||!MP.on||!MP.host||!MP.bus||g.room)return;
 MP.bus.send({t:'csr',rd:c.rd,ph:c.ph,tt:+c.t.toFixed(2),rt:+c.rt.toFixed(2),sc:[c.sc[0],c.sc[1]],ov:c.over?1:0,w:c.w==null?-1:c.w})}catch(e){}}
{const u0=csUpd;csUpd=function(dt){
 const g=G,c=g&&g.cs;
 if(c&&MP.on&&!g.room&&!MP.host){
  /* convidado: so conta o tempo na tela; fase, round e placar vem do dono */
  if(c.ph==='buy'||c.ph==='end')c.t=Math.max(0,c.t-dt);else if(c.ph==='fight')c.rt=Math.max(0,c.rt-dt);
  return}
 const r=u0.apply(this,arguments);
 try{if(c&&MP.on&&MP.host&&MP.bus&&!g.room){
  const k=c.rd+'|'+c.ph+'|'+(c.over?1:0),now=performance.now();
  if(k!==lastK){lastK=k;lastT=now;sendCs();setTimeout(sendCs,150);setTimeout(sendCs,600)}
  else if(now-lastT>250){lastT=now;sendCs()}}}catch(e){}
 return r}}

function applyCs(m){
 const g=G,c=g&&g.cs;if(!c||g.room||!MP.on||MP.host)return;
 if(!(m.rd>=1)||!Array.isArray(m.sc))return;
 let n=0;while(c.rd<m.rd&&n++<8&&!c.over)csRound();
 if(c.rd!==m.rd)return;
 if(c.ph!==m.ph){
  if(c.ph==='buy'&&(m.ph==='fight'||m.ph==='end')){
   c.ph='fight';c.t=0;
   try{$('cs').classList.remove('on')}catch(e){}
   try{snd(440,.12,'square',.06,300);snd(660,.2,'square',.06,300,.12)}catch(e){}}
  if(c.ph==='fight'&&m.ph==='end')csEnd(m.w==null?-1:+m.w)}
 c.sc[0]=m.sc[0]|0;c.sc[1]=m.sc[1]|0;
 if(c.ph===m.ph){if(Math.abs(c.t-m.tt)>.35)c.t=+m.tt||0;if(Math.abs(c.rt-m.rt)>.35)c.rt=+m.rt||0}
 if(m.ov&&!c.over){c.over=1;if(!(g.endT>0))g.endT=3.4}}

function wrap(b){
 if(!b||b._mpm||!b.cb||typeof b.cb.ev!=='function')return;
 b._mpm=1;const e0=b.cb.ev;
 b.cb.ev=function(from,m){
  try{if(m&&m.t==='csr'){if(MP.on&&!MP.host&&from===MP.hpid)applyCs(m);return}}catch(x){console.warn('[mp-modos]',x)}
  return e0.apply(this,arguments)}}
setInterval(()=>{try{wrap(MP.bus)}catch(e){}},300);

/* 5) morte velha vinda da rede: na fase de compra ninguem morre, entao ignora (senao o jogador renasce e morre de novo) */
{const m0=window.MPT;if(typeof m0==='function')window.MPT=function(f,dt){
 try{if(MP.on&&G&&G.cs&&G.cs.ph!=='fight'&&f&&f.mx){const t=(MP.st&&MP.st[f.i])||(MP.bs&&MP.bs[f.i]);if(t&&t.d)t.d=0}}catch(e){}
 return m0.apply(this,arguments)}}

/* 6) resultado do ponto de vista do meu time (quem joga no time 2 antes via sempre DERROTA) */
if(typeof finish2==='function'){const f0=finish2;finish2=function(){
 let c=null;
 try{if(G&&G.cs&&MP.on&&!G.room&&G.p&&G.p.tm===1){c=G.cs;const a=c.sc[0];c.sc[0]=c.sc[1];c.sc[1]=a}else c=null}catch(e){c=null}
 try{return f0.apply(this,arguments)}finally{if(c){const a=c.sc[0];c.sc[0]=c.sc[1];c.sc[1]=a}}}}

/* 7) Halloween City ainda nao tem multiplayer: com amigos na equipe avisa em vez de abrir uma partida separada */
if(typeof window.startL==='function'){const l0=window.startL;window.startL=function(){
 try{if(!MP.arm&&typeof TB!=='undefined'&&TB==3&&party()&&hum()>0){say('Halloween City ainda \u00e9 s\u00f3 solo. Saia da equipe para jogar.');return}}catch(e){}
 return l0.apply(this,arguments)};
 const p=$('play'),a=$('again');if(p)p.onclick=window.startL;if(a)a.onclick=window.startL}
})();
