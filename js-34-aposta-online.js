/* js-34-aposta-online.js - MODO APOSTADO ONLINE (jogador x jogador) v177

   O modo apostado (js-05) so rodava offline: o inimigo era sempre um bot. Este arquivo liga o modo ao
   multiplayer que ja existe (ARR_NET / MP / Sala 1x1 do js-33) para duelar contra OUTRO JOGADOR:

   1) FILA: cada valor de aposta + formato tem sua sala de espera (b<valor>r<rounds>a..d). Quem esta na fila
      e pareado em ordem de chegada (1o com 2o, 3o com 4o...). O 1o do par cria uma sala privada (z.....)
      e avisa o 2o ('bm'); os dois entram nela.
   2) PARTIDA: na sala privada os dois trocam 'bk' (confirmando que tem gemas). O dono inicia uma Sala 1x1
      (mesmo caminho do js-33: dono decide os rounds, convidado segue).
   3) GEMAS: o valor so e descontado quando a partida realmente comeca (nao trava gemas na fila).
      Vencedor leva o dobro, empate devolve. Se o adversario sair/cair no meio de uma luta, quem ficou leva
      a aposta. Se sair antes da 1a luta, as gemas sao devolvidas. Quem sai do menu no meio perde.
   4) Painel do modo APOSTADO ganhou o cartao ONLINE (js-05) que chama window.betOnline().

   Limite conhecido: as gemas ficam salvas no aparelho (nao ha carteira no servidor), entao o acerto e
   confiavel contra jogadores honestos, mas nao impede quem edita o proprio jogo.

   Para desligar: abra o jogo com ?betonline=0 */
(function(){
'use strict';
try{if(new URLSearchParams(location.search).get('betonline')==='0')return}catch(e){}
const MP=window.MP;
if(!MP||!window.ARR_NET||typeof startCS!=='function'||typeof finish2!=='function')return;
const $=id=>document.getElementById(id),N=()=>window.ARR_NET;
const say=t=>{try{soon(t)}catch(e){console.log('[aposta-online]',t)}};
const clean=s=>String(s||'').replace(/[<>&"'`]/g,'').slice(0,12);
const TIERS=[50,100,250,500,1000],RDS=[[1,'1 ROUND'],[2,'MELHOR DE 3'],[3,'MELHOR DE 5']];
const rdName=r=>(RDS.find(x=>x[0]==r)||RDS[1])[1];
const BKEY='arr_bets',OKEY='arr_beto_open';
const hLoad=()=>{try{return JSON.parse(localStorage.getItem(BKEY)||'[]')}catch(e){return[]}};
const hSave=h=>{try{localStorage.setItem(BKEY,JSON.stringify(h.slice(-30)))}catch(e){}};
const gemUI=()=>{try{$('gemv').textContent=fmt(gems)}catch(e){}};
const PING='https://armada-relay.rdz777zd.workers.dev/ping';
const CFG={stake:100,rd:2};
let ST=null,SNAP=null;

/* ---------- painel ---------- */
const css='#betop{position:fixed;inset:0;z-index:27;background:#000c;display:none;align-items:center;justify-content:center;padding:8px;box-sizing:border-box}#betop.on{display:flex}#betop .bx{width:min(520px,100%);max-height:100%;overflow:auto;border-radius:18px;border:2px solid #ffc83a;background:radial-gradient(ellipse at 50% 0,#2f251f,#171311 75%);padding:12px;color:#fff;font-family:Trebuchet MS,Arial}#betop .hd{display:flex;align-items:center;gap:10px}#betop .hd h3{margin:0;font-size:19px;letter-spacing:1px;flex:1}#betop .hd small{color:#ffd96b;font-weight:900}#betop .x{width:36px;height:36px;border-radius:50%;border:2px solid #ffc83a;background:#1f1b19;color:#fff;font-weight:900}#betop .stt{font:800 11px Trebuchet MS;color:#7fcfdc;margin:6px 0}#betop .row{display:flex;gap:6px;flex-wrap:wrap;margin:8px 0 3px}#betop .row span{width:100%;font:900 11px Trebuchet MS;color:#7fcfdc;letter-spacing:1px}#betop .row button{flex:1;min-width:58px;padding:9px 6px;border-radius:9px;border:2px solid #ffc83a88;background:#1f1b19;color:#fff;font:900 13px Trebuchet MS}#betop .row button.on{background:#ffc83a;color:#25211e;border-color:#fff}#betop .sum{margin:10px 0;padding:8px 10px;border-radius:10px;background:#00000055;font:700 12.5px Trebuchet MS;line-height:1.5}#betop .sum b{color:#ffd96b}#betop .sum b.g{color:#7dff8a}#betop .sum b.r{color:#ff8a8a}#betop .go button{width:100%;padding:13px;border-radius:12px;border:2px solid #141211;font:900 16px Trebuchet MS;color:#25211e;background:linear-gradient(#ffe27a,#ff6600);box-shadow:0 4px 0 #b54800;margin-top:6px}#betop .go button.c{color:#fff;background:#3a1218;box-shadow:0 4px 0 #1b0a0d}#betop .sr{text-align:center;padding:22px 8px}#betop .sr b{display:block;font-size:17px;margin:12px 0 4px}#betop .sr small{display:block;color:#bcd9e0;font-weight:700;line-height:1.4}#betop .sp{width:42px;height:42px;margin:0 auto;border-radius:50%;border:4px solid #ffc83a44;border-top-color:#ffc83a;animation:betopsp 1s linear infinite}@keyframes betopsp{to{transform:rotate(360deg)}}';
{const s=document.createElement('style');s.textContent=css;document.head.appendChild(s)}
const P=document.createElement('div');P.id='betop';document.body.appendChild(P);

function stats(){const H=hLoad(),w=H.filter(x=>x.r==='W').length,l=H.filter(x=>x.r==='L').length,net=H.reduce((a,x)=>a+(x.r==='W'?x.a:x.r==='L'?-x.a:0),0);
 return w+' vitórias • '+l+' derrotas • saldo '+(net>=0?'+':'')+fmt(net)+' gemas'}
function render(){
 if(ST){
  const fail=ST.state==='fail',el=Math.floor((Date.now()-ST.t0)/1000);
  P.innerHTML='<div class="bx"><div class="hd"><h3>APOSTA ONLINE</h3><small>'+fmt(gems)+' GEMAS</small></div>'
  +'<div class="sr">'+(fail?'':'<div class="sp"></div>')+'<b>'+(ST.msg||'')+'</b><small>'+fmt(ST.stake)+' gemas • '+rdName(ST.rd)+(fail?'':' • '+el+'s')+'</small>'
  +(!fail&&ST.state==='q'&&el>=30?'<small style="margin-top:8px">Ninguém na fila agora. Mantenha aberto ou use o modo ALEATÓRIO para jogar contra bot.</small>':'')+'</div>'
  +'<div class="go"><button class="c" data-cancel="1">'+(fail?'VOLTAR':'CANCELAR')+'</button></div></div>';return}
 const a=CFG.stake|0;
 P.innerHTML='<div class="bx"><div class="hd"><h3>APOSTA ONLINE • 1x1</h3><small>'+fmt(gems)+' GEMAS</small><button class="x" data-x="1">✕</button></div>'
 +'<div class="stt">'+stats()+'</div>'
 +'<div class="row"><span>VALOR DA APOSTA (GEMAS)</span>'+TIERS.map(v=>'<button data-st="'+v+'"'+(CFG.stake==v?' class="on"':'')+'>'+v+'</button>').join('')+'</div>'
 +'<div class="row"><span>FORMATO</span>'+RDS.map(q=>'<button data-rd="'+q[0]+'"'+(CFG.rd==q[0]?' class="on"':'')+'>'+q[1]+'</button>').join('')+'</div>'
 +'<div class="sum">Você aposta <b>'+fmt(a)+'</b> • Adversário aposta <b>'+fmt(a)+'</b><br>Se ganhar: <b class="g">+'+fmt(a)+' gemas</b> • Se perder: <b class="r">-'+fmt(a)+'</b><br>Você enfrenta outro jogador de verdade. Sair da luta no meio dá a aposta ao adversário.</div>'
 +'<div class="go"><button data-go="1">PROCURAR ADVERSÁRIO</button></div></div>'}
function openPanel(){
 try{const o=JSON.parse(localStorage.getItem(OKEY)||'null');if(o){localStorage.removeItem(OKEY);const H=hLoad();H.push({r:'L',a:o.stake,o:o.opp,t:Date.now(),on:1});hSave(H);say('Aposta online anterior abandonada: -'+fmt(o.stake)+' gemas')}}catch(e){}
 render();P.classList.add('on')}
window.betOnline=openPanel;
P.onclick=e=>{const t=e.target.closest('[data-x],[data-st],[data-rd],[data-go],[data-cancel]');if(!t)return;const d=t.dataset;
 if(d.x!==undefined){P.classList.remove('on');return}
 if(d.cancel!==undefined){cancel();return}
 if(d.st){CFG.stake=+d.st;render();return}
 if(d.rd){CFG.rd=+d.rd;render();return}
 if(d.go!==undefined)begin()};

/* ---------- fila ---------- */
const tag=()=>ST.stake+'/'+ST.rd;
function begin(){
 if(!window.ARR_USER){say('Entre na sua conta para apostar online');return}
 if(MP.on||MP.arm){say('Termine a partida atual primeiro');return}
 try{if(typeof LD!=='undefined'&&LD.busy){say('Aguarde o carregamento');return}}catch(e){}
 const stake=CFG.stake|0;if((gems|0)<stake){say('Gemas insuficientes');return}
 SNAP={tb:TB,ms:MS,rm:RM,sn:SALA.n,sw:SALA.w,sl:SALA.L};
 ST={stake,rd:CFG.rd,state:'conn',t0:Date.now(),i:0,msg:'Conectando...'};render();qConnect()}
async function qConnect(){
 const me=ST;if(!me)return;const code='b'+me.stake+'r'+me.rd+'abcd'[me.i];me.code=code;me.state='conn';me.msg='Conectando...';
 try{await N().connect(code)}catch(e){}
 if(ST!==me)return;
 if(!MP.bus||MP.code!==code){if(me.i<3){me.i++;qConnect()}else fail('Online indisponível agora. Tente de novo.');return}
 wrapBus(MP.bus);MP.bus.state({bq:tag()});me.state='q';me.t0=me.t0||Date.now();me.msg='Procurando adversário...'}
function fail(m){if(!ST)return;try{N().leave()}catch(e){}ST.state='fail';ST.msg=m;render()}
function requeue(m){if(!ST)return;ST.state='conn';ST.i=0;ST.peer=null;ST.fired=0;ST.ready=0;ST.msg=m;qConnect()}
function cancel(){const was=ST;ST=null;if(was){try{N().leave()}catch(e){}if(was.fired)restore();else SNAP=null}P.classList.remove('on')}
function restore(){
 try{if(SNAP){TB=SNAP.tb;MS=SNAP.ms;RM=SNAP.rm;SALA.n=SNAP.sn;SALA.w=SNAP.sw;if(SNAP.sl)SALA.L=SNAP.sl;else delete SALA.L}delete SALA.bo;try{mref()}catch(e){}}catch(e){console.error(e)}
 SNAP=null}
function wrapBus(b){
 if(!b||b._bo||!b.cb||typeof b.cb.ev!=='function')return;b._bo=1;const e0=b.cb.ev;
 b.cb.ev=function(from,m){
  try{if(m&&typeof m==='object'&&(m.t==='bm'||m.t==='bk'||m.t==='bx')){onBet(from,m);return}}catch(x){console.warn('[aposta-online]',x)}
  return e0.apply(this,arguments)}}
function onBet(from,m){
 const b=MP.bus,me=b&&b.me&&b.me();if(!ST||!b||!me)return;
 if(m.t==='bm'){
  if(ST.state!=='q'||m.to!==me||m.st!==ST.stake||m.rd!==ST.rd||!/^z[a-z0-9]{5}$/.test(String(m.c||'')))return;
  const o=MP.pr[from];if(!o||o.bq!==tag())return;
  ST.state='pm';ST.msg='Adversário encontrado!';goPriv(m.c)}
 else if(m.t==='bk'){if(ST.state==='priv'&&from!==me)ST.peer={id:from,ok:!!m.ok,t:Date.now()}}
 else if(m.t==='bx'){if(ST.state==='priv'&&!ST.fired)requeue(String(m.r||'Adversário cancelou').slice(0,60))}}
function waiting(){
 const b=MP.bus,me=b&&b.me&&b.me();if(!me)return[];const t=tag(),a=[{id:me,j:MP.t0||0}];
 for(const k in MP.pr){const o=MP.pr[k];if(k!==me&&o&&o.bq===t&&o.s==='l'&&typeof o.j==='number')a.push({id:k,j:o.j})}
 a.sort((x,y)=>(x.j-y.j)||(x.id<y.id?-1:x.id>y.id?1:0));return a}
function lead(p){
 const me=ST,b=MP.bus,c='z'+Math.random().toString(36).slice(2,7).padEnd(5,'0'),mm={t:'bm',to:p.id,c,st:me.stake,rd:me.rd},s=()=>{try{b.send(mm)}catch(e){}};
 me.state='pm';me.msg='Adversário encontrado!';me.pt=Date.now();s();setTimeout(s,350);setTimeout(s,900);
 setTimeout(()=>{if(ST===me&&me.state==='pm')goPriv(c)},1300)}
async function goPriv(c){
 const me=ST;me.state='priv';me.priv=c;me.pt=Date.now();me.peer=null;me.fired=0;me.ready=0;me.msg='Preparando partida...';
 try{await N().connect(c)}catch(e){}
 if(ST!==me)return;
 if(!MP.bus||MP.code!==c){requeue('Falha ao entrar na partida. Voltando para a fila...');return}
 wrapBus(MP.bus);me.ready=1}
function privTick(){
 const b=MP.bus;
 if(!ST.ready||!b||MP.code!==ST.priv){if(Date.now()-ST.pt>15000)requeue('Conexão falhou. Voltando para a fila...');return}
 wrapBus(b);const ok=(gems|0)>=ST.stake?1:0;
 try{b.send({t:'bk',ok,n:clean(PN)})}catch(e){}
 if(ST.fired){if(Date.now()-ST.ft>10000&&!(G&&G.bo)){const m=ST;restore();m.fired=0;requeue('A partida não iniciou. Voltando para a fila...')}return}
 if(Date.now()-ST.pt>20000){requeue('O adversário não chegou. Voltando para a fila...');return}
 if(ST.peer&&Date.now()-ST.peer.t<3000&&N().amHost()){
  if(!ok||!ST.peer.ok){try{b.send({t:'bx',r:ok?'Adversário sem gemas':'Adversário sem gemas suficientes'})}catch(e){}requeue(ok?'Adversário sem gemas suficientes':'Você não tem gemas suficientes');return}
  ST.fired=1;ST.ft=Date.now();ST.msg='Iniciando partida...';
  try{
   TB=4;MS=sMS;AL=sAL;SALA.n=1;SALA.w=0;
   SALA.L={me:'A',A:[],B:[{n:'Adversario',c:null}],id:'APOSTA',go:1,lbl:'1x1',pk:null,pq:'',pf:'a'};
   SALA.bo={id:ST.priv,stake:ST.stake,rd:ST.rd};
   try{mref()}catch(e){}
   N().hostGo()}
  catch(e){console.error('[aposta-online]',e);const m=ST;restore();m.fired=0;requeue('Erro ao iniciar. Voltando para a fila...')}}}
setInterval(()=>{
 if(!ST)return;
 try{
  if(ST.state==='q'){
   const b=MP.bus;
   if(!b||MP.code!==ST.code){if(ST.i<3){ST.i++;qConnect()}else fail('Online indisponível agora. Tente de novo.');return}
   wrapBus(b);const w=waiting(),pos=w.findIndex(x=>x.id===b.me());
   ST.msg='Procurando adversário... '+w.length+' na fila';
   if(pos>=0&&pos%2===0&&w[pos+1])lead(w[pos+1])}
  else if(ST.state==='priv')privTick();
  else if(ST.state==='pm'&&Date.now()-ST.pt>6000)requeue('Adversário não respondeu. Voltando para a fila...');
  if(P.classList.contains('on')&&ST)render()
 }catch(e){console.error('[aposta-online]',e)}},600);

/* ---------- partida: desconto, monitor de saida e acerto ---------- */
function pay(b,res){
 if(!b||b.paid)return'';b.paid=1;let m;
 if(res==='W'){gems+=b.stake*2;m='VOCE GANHOU +'+fmt(b.stake)+' GEMAS'}
 else if(res==='D'){gems+=b.stake;m='EMPATE - aposta devolvida'}
 else if(res==='R'){gems+=b.stake;m='APOSTA CANCELADA - gemas devolvidas'}
 else m='VOCE PERDEU -'+fmt(b.stake)+' GEMAS';
 try{svG()}catch(e){}gemUI();try{localStorage.removeItem(OKEY)}catch(e){}
 if(res!=='R'){const H=hLoad();H.push({r:res,a:b.stake,o:b.opp,t:Date.now(),on:1});hSave(H)}
 say(m);return m}
function arm(bo){
 const stake=bo.stake|0;
 if(!(stake>=10)||(gems|0)<stake){restore();ST=null;say('Gemas insuficientes para a aposta');try{N().leave()}catch(e){}setTimeout(()=>{try{$('menuBtn').onclick()}catch(e){}},400);return}
 gems-=stake;try{svG()}catch(e){}gemUI();
 let opp='Adversário';try{const o=G.f.find(q=>q!==G.p&&q.hum);if(o&&o.name)opp=String(o.name).replace(/^\[[^\]]*\]\s*/,'')}catch(e){}
 const rd=Math.max(1,Math.min(3,+bo.rd||2));
 G.bo={id:bo.id,stake,rd,opp,paid:0,seen:0,fought:0,gone:0,t:Date.now()};G.cs.tgt=rd;
 try{localStorage.setItem(OKEY,JSON.stringify({id:bo.id,stake,opp,t:Date.now()}))}catch(e){}
 restore();ST=null;P.classList.remove('on');say('APOSTA ONLINE: '+fmt(stake)+' gemas contra '+opp)}
{const c0=startCS;startCS=function(room,n2,sala){
 const bo=SALA&&SALA.bo?Object.assign({},SALA.bo):null;let r;
 try{r=c0.apply(this,arguments)}catch(err){if(bo){restore();ST=null}throw err}
 try{if(bo&&sala){if(MP.on&&G&&G.cs&&!G.bo)arm(bo);else if(!(G&&G.bo)){restore();ST=null;say('Partida online indisponível agora')}}}catch(e){console.error('[aposta-online]',e)}
 return r}}
function netOk(){return new Promise(ok=>{const t=setTimeout(()=>ok(false),4000);try{fetch(PING+'?'+Date.now(),{mode:'no-cors',cache:'no-store'}).then(()=>{clearTimeout(t);ok(true)}).catch(()=>{clearTimeout(t);ok(false)})}catch(e){clearTimeout(t);ok(false)}})}
function forfeit(b,why){
 if(b.chk||b.paid)return;b.chk=1;
 netOk().then(on=>{
  if(b.paid)return;
  if(!on){pay(b,b.fought?'L':'R');return}
  const m=pay(b,b.fought?'W':'R');
  try{$('est').textContent+='   • APOSTA: '+m}catch(e){}
  say(b.fought?'O adversário saiu da partida: você levou a aposta!':'O adversário não entrou: gemas devolvidas');
  setTimeout(()=>{try{N().leave()}catch(e){}try{$('menuBtn').onclick()}catch(e){}},2600)})}
setInterval(()=>{
 const g=G,b=g&&g.bo;if(!b||b.paid||b.chk||!MP.bus)return;
 try{
  const c=g.cs;if(c&&c.over)return;if(c&&c.ph==='fight')b.fought=1;
  const me=MP.bus.me&&MP.bus.me(),live=Object.keys(MP.pr).filter(k=>k!==me&&MP.pr[k]&&MP.pr[k].s==='g');
  if(live.length){b.seen=1;b.gone=0;return}
  if(!b.seen){if(Date.now()-b.t>25000)forfeit(b,'never');return}
  if(++b.gone>=6)forfeit(b,'left')
 }catch(e){console.error('[aposta-online]',e)}},500);
{const f0=finish2;finish2=function(){
 const r=f0.apply(this,arguments);
 try{const g=G,b=g&&g.bo,c=g&&g.cs;
  if(b&&!b.paid&&c){const mine=g.p&&g.p.tm===1?1:0,d=mine?c.sc[1]-c.sc[0]:c.sc[0]-c.sc[1],res=d>0?'W':d<0?'L':(c.over?'D':'L'),m=pay(b,res);
   try{$('est').textContent+='   • APOSTA: '+m}catch(e){}}
 }catch(e){console.error('[aposta-online]',e)}
 return r}}
{const mb=$('menuBtn');if(mb)mb.addEventListener('click',()=>{
 try{const b=G&&G.bo;
  if(b&&!b.paid){pay(b,b.fought?'L':'R')}
  else if(/^z[a-z0-9]{5}$/.test(String(MP.code||''))&&MP.bus&&!(ST&&ST.state!=='fail')){N().leave()}
 }catch(e){}},true)}
})();
