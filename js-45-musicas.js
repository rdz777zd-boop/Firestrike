/* js-45-musicas.js - musicas diferentes no jogo (v1)

   ANTES: so existiam 2 faixas (menu e vitoria) e nenhuma musica durante a partida.
   AGORA:
   - LOBBY: 4 faixas (a antiga + 3 novas). Sorteia uma ao entrar no lobby e troca sozinho
     a cada ~1 minuto, sempre no fim de um ciclo, sem repetir a anterior.
   - PARTIDA (mais baixinha, para nao cobrir tiros e passos):
       Battle Royale  -> 2 faixas (sorteia uma por partida)
       Contra Squad / Sala / Guerra de Cla (CS) -> 2 faixas
       Halloween City -> 1 faixa
     A musica da partida para quando a partida acaba (a de vitoria continua como era).
   - Tudo respeita o botao de MUSICA dos ajustes (MU.mu) - nao mexi nele.
   - Usa o mesmo sintetizador do jogo (sem arquivos de audio, nada para baixar).

   Para desligar: abra o jogo com ?musicas=0 */
(function(){
'use strict';
try{if(new URLSearchParams(location.search).get('musicas')==='0')return}catch(e){}
if(typeof TR==='undefined'||typeof mus!=='function'||typeof mstop!=='function'||typeof mt!=='function'||typeof mkick!=='function'||typeof mn!=='function')return;
const _=null;

/* ---------- bateria ---------- */
function dr(st,k,t){
 if(st=='four'){if(k%4==0)mkick(t,.5);if(k==4||k==12)mn(.12,.05,1800,t,'highpass');if(k%2==1)mn(.03,.016,7000,t,'highpass')}
 else if(st=='break'){if(k==0||k==6||k==10)mkick(t,.5);if(k==4||k==12)mn(.12,.055,1700,t,'highpass');if(k%2==1)mn(.03,.015,7000,t,'highpass')}
 else if(st=='half'){if(k==0||k==10)mkick(t,.42);if(k==8)mn(.15,.05,1500,t,'highpass');if(k%4==2)mn(.03,.012,7500,t,'highpass')}
 else if(st=='soft'){if(k==0||k==8)mkick(t,.3);if(k==4||k==12)mn(.08,.025,1400,t,'highpass');if(k%2==0)mn(.025,.01,8000,t,'highpass')}
}

/* ---------- montador de faixa: 4 acordes x 16 passos, 2 voltas por ciclo ---------- */
function mk(c){
 const N=c.ch.length,al=c.al||2,bl=c.bl||2.5;
 return{bpm:c.bpm,vol:c.vol||0,fn(i,t,s){
  const b=(i>>4)%N,k=i&15,ph=(((i>>4)/N)|0)&1,h=c.ch[b],rt=h[0],tr=h[1];
  const bo=c.bs[k];if(bo!=null)mt(rt+bo,t,s*bl,c.bw||'triangle',c.bv||.2);
  if(c.ar){const a=c.ar[k];if(a!=null)mt(tr[a%tr.length]+12*((a/tr.length)|0)+(c.ao||0),t,s*al,c.aw||'square',c.av||.03)}
  if(c.pad&&k==0)for(const n of tr)mt(n-12,t,s*15,'triangle',c.pad);
  const m=c.ml[b][k];if(m)mt(m,t,s*(c.mlen||3),ph?(c.w2||c.w1):c.w1,c.lv||.05);
  dr(c.dr,k,t);if(c.fx)c.fx(b,k,t,s,ph)
 }}
}

/* ---------- LOBBY ---------- */
/* chill / lo-fi: Fmaj7 - Em7 - Dm7 - Cmaj7 */
TR.menu2=mk({bpm:88,dr:'soft',pad:.035,
 ch:[[41,[60,64,65,69]],[40,[59,62,64,67]],[38,[57,60,62,65]],[36,[60,64,67,71]]],
 bs:[0,_,_,_,_,_,_,0,_,_,0,_,_,_,_,_],bw:'sine',bv:.26,bl:3,
 ar:[0,_,2,_,1,_,3,_,0,_,2,_,1,_,3,_],ao:12,aw:'triangle',av:.045,al:2,
 ml:[[0,0,0,0,76,0,0,72,0,0,77,0,0,0,0,0],[0,0,0,0,71,0,0,74,0,0,76,0,79,0,0,0],[0,0,0,0,77,0,0,74,0,0,72,0,0,0,0,0],[0,0,76,0,0,0,79,0,0,0,76,0,72,0,0,0]],
 w1:'triangle',lv:.085,mlen:2.4});
/* synthwave: Dm - Bb - F - C */
TR.menu3=mk({bpm:116,dr:'four',pad:.03,
 ch:[[38,[62,65,69]],[34,[58,62,65]],[41,[60,65,69]],[36,[60,64,67]]],
 bs:[0,0,12,0,0,0,12,0,0,0,12,0,0,0,12,0],bw:'sawtooth',bv:.085,bl:1.3,
 ar:[0,1,2,3,2,1,0,1,0,1,2,3,2,1,2,1],ao:12,aw:'square',av:.02,al:1.1,
 ml:[[74,0,0,77,0,0,81,0,79,0,0,0,77,0,0,0],[77,0,0,74,0,0,70,0,74,0,0,0,77,0,0,0],[81,0,0,0,77,0,0,72,0,0,77,0,81,0,0,0],[79,0,0,76,0,0,72,0,76,0,79,0,84,0,0,0]],
 w1:'sawtooth',w2:'square',lv:.045,mlen:3});
/* arcade animado: G - D - Em - C */
TR.menu4=mk({bpm:138,dr:'break',pad:.03,
 ch:[[43,[59,62,67]],[38,[57,62,66]],[40,[59,64,67]],[36,[60,64,67]]],
 bs:[0,_,12,_,0,_,12,_,0,_,12,_,0,_,12,_],bw:'triangle',bv:.2,bl:1.6,
 ar:[0,_,1,_,2,_,1,_,0,_,1,_,2,_,1,_],ao:12,aw:'square',av:.028,al:1.4,
 ml:[[79,0,83,0,86,0,83,0,79,0,0,0,83,0,0,0],[78,0,81,0,86,0,81,0,78,0,0,0,81,0,0,0],[76,0,79,0,83,0,79,0,76,0,0,0,79,0,83,0],[79,0,84,0,88,0,84,0,79,0,76,0,79,0,0,0]],
 w1:'square',w2:'sawtooth',lv:.045,mlen:2.2});

/* ---------- PARTIDA (volume menor) ---------- */
/* Battle Royale 1: tensa - Em - C - D - Bm */
TR.br1=mk({bpm:108,dr:'half',pad:.05,vol:.38,
 ch:[[40,[59,64,67]],[36,[60,64,67]],[38,[57,62,66]],[35,[59,62,66]]],
 bs:[0,_,_,_,0,_,_,_,0,_,_,_,0,_,0,_],bw:'triangle',bv:.22,bl:2,
 ar:[0,_,_,_,1,_,_,_,2,_,_,_,1,_,_,_],ao:12,aw:'triangle',av:.035,al:3,
 ml:[[0,0,0,0,0,0,0,0,76,0,0,0,0,0,74,0],[72,0,0,0,0,0,0,0,76,0,0,0,0,0,0,0],[74,0,0,0,0,0,78,0,0,0,0,0,81,0,0,0],[83,0,0,0,0,0,0,0,78,0,0,0,0,0,0,0]],
 w1:'sawtooth',lv:.03,mlen:5});
/* Battle Royale 2: aventura - Am - G - F - E */
TR.br2=mk({bpm:124,dr:'break',pad:.035,vol:.38,
 ch:[[45,[57,60,64]],[43,[55,59,62]],[41,[53,57,60]],[40,[56,59,64]]],
 bs:[0,_,0,_,0,_,0,_,0,_,0,_,0,_,12,_],bw:'triangle',bv:.2,bl:1.8,
 ar:[0,1,2,1,0,1,2,1,0,1,2,1,0,1,2,1],ao:12,aw:'square',av:.016,al:1.1,
 ml:[[81,0,0,0,76,0,0,0,81,0,84,0,83,0,0,0],[79,0,0,0,74,0,0,0,79,0,83,0,81,0,0,0],[77,0,0,0,72,0,0,0,77,0,81,0,79,0,0,0],[76,0,0,0,80,0,0,0,83,0,80,0,76,0,0,0]],
 w1:'sawtooth',w2:'square',lv:.04,mlen:3});
/* Contra Squad 1: ataque - Cm - Ab - Bb - G */
TR.cs1=mk({bpm:140,dr:'break',pad:.03,vol:.4,
 ch:[[48,[60,63,67]],[44,[60,63,68]],[46,[58,62,65]],[43,[59,62,67]]],
 bs:[0,0,12,0,0,0,12,0,0,0,12,0,0,12,0,0],bw:'sawtooth',bv:.08,bl:1.1,
 ar:[0,_,1,_,2,_,1,_,0,_,1,_,2,_,1,_],ao:12,aw:'square',av:.02,al:1.4,
 ml:[[72,0,0,72,0,0,75,0,0,0,0,0,74,0,72,0],[68,0,0,68,0,0,72,0,0,0,0,0,70,0,68,0],[70,0,0,70,0,0,74,0,0,0,0,0,72,0,70,0],[67,0,0,67,0,0,71,0,0,0,0,0,74,0,71,0]],
 w1:'sawtooth',w2:'square',lv:.04,mlen:1.6});
/* Contra Squad 2: furtivo - Gm - Eb - Bb - F */
TR.cs2=mk({bpm:112,dr:'half',pad:.045,vol:.38,
 ch:[[43,[58,62,67]],[39,[58,63,67]],[46,[58,62,65]],[41,[57,60,65]]],
 bs:[0,_,_,_,_,_,0,_,_,_,7,_,_,_,_,_],bw:'triangle',bv:.22,bl:2.2,
 ar:[0,_,1,_,2,_,1,_,0,_,2,_,1,_,2,_],ao:12,aw:'triangle',av:.04,al:2,
 ml:[[74,0,0,0,0,0,70,0,0,0,72,0,0,0,0,0],[75,0,0,0,0,0,70,0,0,0,72,0,0,0,0,0],[77,0,0,0,0,0,74,0,0,0,70,0,0,0,0,0],[72,0,0,0,0,0,69,0,0,0,72,0,74,0,0,0]],
 w1:'square',w2:'triangle',lv:.03,mlen:2.5});
/* Halloween City: sombria - Am - E - Am - Dm (caixinha de musica + vento) */
TR.hw=mk({bpm:100,dr:'soft',pad:.05,vol:.42,
 ch:[[45,[57,60,64]],[40,[56,59,64]],[45,[57,60,64]],[38,[57,62,65]]],
 bs:[0,_,_,_,_,_,_,_,0,_,_,_,_,_,7,_],bw:'triangle',bv:.22,bl:3,
 ar:[_,_,_,_,2,_,_,_,_,_,_,_,1,_,_,_],ao:12,aw:'sine',av:.035,al:2.5,
 ml:[[81,0,0,84,0,0,88,0,0,84,0,0,81,0,0,0],[80,0,0,83,0,0,88,0,0,83,0,0,80,0,0,0],[81,0,0,84,0,0,88,0,0,89,0,0,88,0,0,0],[86,0,0,89,0,0,86,0,0,81,0,0,77,0,0,0]],
 w1:'triangle',w2:'sine',lv:.06,mlen:2.2,
 fx:(b,k,t)=>{if(b==0&&k==0)mn(1.8,.018,700,t,'bandpass',.6)}});

/* ---------- escolha das faixas ---------- */
const LOB=['menu','menu2','menu3','menu4'],GP={br:['br1','br2'],cs:['cs1','cs2'],hw:['hw']},GAME=[].concat(GP.br,GP.cs,GP.hw),lastG={};
let lastL=null;
function pickLobby(){const p=LOB.filter(x=>x!==lastL&&x!==MU.cur);const n=p[Math.random()*p.length|0];lastL=n;return n}
function pickG(k){const a=GP[k],p=a.filter(x=>x!==lastG[k]),q=p.length?p:a,n=q[Math.random()*q.length|0];lastG[k]=n;return n}

const m0=mus;
function play(n){m0(n);try{const T=TR[n];if(MB&&T&&T.vol)MB.gain.value=T.vol}catch(e){}}

/* o jogo chama mus('menu') a cada toque no lobby: se ja tem faixa de lobby tocando, nao reinicia */
mus=function(n){
 if(n=='menu'){
  if(MB&&MU.tm&&LOB.includes(MU.cur))return;
  return play(pickLobby())
 }
 return m0.apply(this,arguments)
};

/* troca de faixa no lobby: depois de ~1 min, no fim de um ciclo */
let rotP=0;
for(const k of LOB){
 const o=TR[k],f=o.fn;
 o.fn=function(i,t,s){
  f.call(this,i,t,s);
  if(!rotP&&i>0&&i%128==0&&i*s>=60){
   rotP=1;
   setTimeout(()=>{rotP=0;try{if(MU.cur==k&&mode=='menu')play(pickLobby())}catch(e){}},0)
  }
 }
}

/* musica da partida: depois que a partida comeca */
function gmus(){
 if(typeof G==='undefined'||!G)return;
 play(pickG(G.hc?'hw':G.cs?'cs':'br'))
}
const st1=start;
start=function(){
 const r=st1.apply(this,arguments);
 try{gmus()}catch(e){}
 return r
};

/* partida acabou: para a musica da partida (a de vitoria nao e afetada) */
if(typeof finish2==='function'){
 const f1=finish2;
 finish2=function(){
  try{if(GAME.includes(MU.cur))mstop()}catch(e){}
  return f1.apply(this,arguments)
 }
}
})();
