/* js-44-sala-apostada.js - SALA APOSTADA (junta o modo SALA com o modo APOSTADO) v1

   Antes eram dois cards no menu de MODOS:
   - SALA: lobby de 1x1 a 5x5 com bots, jogar ou assistir, salas online (nada contava);
   - MODO APOSTADO: duelo valendo gemas (aleatorio / formado, bot joga por voce, online jogador x jogador).

   Agora e UM modo so, "SALA APOSTADA", com as funcoes dos dois:
   1) Card unico no menu de MODOS (o card MODO APOSTADO some; a SALA virou SALA APOSTADA).
   2) No lobby da Sala aparece o quadro APOSTA:
      - TREINO (nada conta)  = a Sala de sempre;
      - VALENDO GEMAS        = aposta a partir de 10 gemas (50/100/250/500/1000/MAX ou valor livre),
                               formato 1 round / melhor de 3 / melhor de 5, vencedor leva o dobro, empate devolve.
      - Voce jogando (Equipe 1 ou 2): a aposta e no seu time.
      - Voce ESPECTADOR: aposta na Equipe 1 ou na Equipe 2 (equivale ao "bot joga por mim" do modo antigo),
        e escolhe AO VIVO ou RESULTADO RAPIDO (sorteio pela forca dos bots das duas equipes).
      - ALEATORIO / FORMADO = os botoes do proprio lobby (PREENCHER COM BOTS ou convidar bot por bot).
      - DUELO ONLINE jogador x jogador = botao que abre a fila do js-34.
   3) Sair da partida no meio (botao de menu) ou fechar o jogo no meio perde a aposta.
   4) Historico de vitorias/derrotas/saldo usa a mesma chave do modo apostado antigo (arr_bets).

   Aposta so vale em sala offline contra bots (gemas ficam salvas no aparelho).
   Para desligar e voltar aos dois modos antigos: abra o jogo com ?salaapostada=0 */
(function(){
'use strict';
try{if(new URLSearchParams(location.search).get('salaapostada')==='0')return}catch(e){}
if(typeof startCS!=='function'||typeof finish2!=='function'||typeof start!=='function'||typeof QMD==='undefined'||typeof QMN==='undefined'||typeof SALA==='undefined')return;
const $=id=>document.getElementById(id);
const P2=$('salap');if(!P2)return;
const MP=window.MP||{};
const say=t=>{try{soon(t)}catch(e){console.log('[sala-apostada]',t)}};
const BKEY='arr_bets',OKEY='arr_sbet_open',CKEY='arr_sapcfg',MIN=10,TTL=45000;
const TIERS=[50,100,250,500,1000],RDS=[[1,'1 ROUND'],[2,'MELHOR DE 3'],[3,'MELHOR DE 5']];
const hLoad=()=>{try{return JSON.parse(localStorage.getItem(BKEY)||'[]')}catch(e){return[]}};
const hSave=h=>{try{localStorage.setItem(BKEY,JSON.stringify(h.slice(-30)))}catch(e){}};
const gemUI=()=>{try{$('gemv').textContent=fmt(gems)}catch(e){}};
const CFG={on:0,stake:100,rd:2,side:'A',quick:0};
try{const c=JSON.parse(localStorage.getItem(CKEY)||'null');if(c){CFG.stake=Math.max(0,c.stake|0)||100;CFG.rd=[1,2,3].indexOf(+c.rd)>=0?+c.rd:2}}catch(e){}
const saveCfg=()=>{try{localStorage.setItem(CKEY,JSON.stringify({stake:CFG.stake,rd:CFG.rd}))}catch(e){}};
let PEND=null;
const fresh=b=>!!b&&Date.now()-b.t<TTL;

/* ---------- 1) um card so no menu de MODOS ---------- */
(function(){
 const i=QMD.findIndex(q=>q.t==5);if(i>=0)QMD.splice(i,1);
 for(const a of[QMN,QMS,QMC,typeof PVI!=='undefined'?PVI:[]])if(a.length>5)a.length=5;
 const m=QMD.find(q=>q.t==4);if(!m)return;
 const ic=n=>'<svg class="ic"><use href="#i-'+n+'"/></svg>';
 m.n='SALA APOSTADA';
 m.s='Contra Squad de 1x1 a 5x5 \u2022 treino ou valendo gemas';
 m.tg='Monte sua sala de 1x1 a 5x5, jogue ou assista os bots \u2022 e, se quiser, aposte gemas no resultado';
 m.b=[[ic('group'),'Escolha de 1x1 a 5x5, convide bots (com ou sem cl\u00e3) ou preencha com bots aleat\u00f3rios'],[ic('gem'),'Ative VALENDO GEMAS no lobby: aposte 10+ gemas, escolha 1, 3 ou 5 rounds e leve o dobro se vencer'],[ic('video'),'Como espectador voc\u00ea aposta numa das equipes: assista ao vivo ou veja o resultado r\u00e1pido']];
 m.tip='Dica: sair da partida no meio perde a aposta. Para apostar contra jogador de verdade use o DUELO ONLINE no lobby';
 QMN[4]=m.n;QMS[4]=m.s;QMC[4]='#ffc83a';
})();

/* ---------- utilidades da sala ---------- */
const lvOf=e=>{try{const q=window.frPl&&window.frPl(e.n);if(q&&q.lv)return q.lv}catch(x){}let h=0;for(const c of String(e.n))h=(h*31+c.charCodeAt(0))|0;return 8+Math.abs(h)%40};
const cnt=k=>{const l=SALA.L;return l?(l[k]||[]).length+(l.me==k?1:0):0};
const hum=()=>{try{return MP.bus&&MP.pr?Object.keys(MP.pr).filter(k=>MP.pr[k]&&MP.pr[k].s==='l').length:0}catch(e){return 0}};
function chanceA(){/* probabilidade da Equipe 1 ganhar (so conta os bots das listas) */
 const l=SALA.L;if(!l)return .5;const A=l.A||[],B=l.B||[];if(!A.length||!B.length)return .5;
 const a=A.reduce((s,e)=>s+lvOf(e),0)/A.length,b=B.reduce((s,e)=>s+lvOf(e),0)/B.length;
 return 1/(1+Math.exp(-((a-b)/14+Math.log(A.length/B.length)*1.5)))}

/* ---------- 2) quadro APOSTA dentro do lobby da Sala ---------- */
{const s=document.createElement('style');s.textContent='#salap .sapb{margin:10px 0 2px;padding:10px 12px;border-radius:12px;border:2px solid #ffc83a;background:radial-gradient(ellipse at 50% 0,#2f251f,#171311 80%)}#salap .sapb .sph{display:flex;align-items:center;gap:8px}#salap .sapb .sph b{flex:1;font:900 14px Trebuchet MS,Arial;letter-spacing:1px;color:#ffd96b}#salap .sapb .sph small{color:#ffd96b;font-weight:900}#salap .sapb .spt{font:800 11px Trebuchet MS,Arial;color:#7fcfdc;margin:6px 0 2px}#salap .sapb .spl{font:900 11px Trebuchet MS,Arial;color:#7fcfdc;letter-spacing:1px;margin:8px 0 3px}#salap .sapb .spr{display:flex;gap:6px;flex-wrap:wrap;align-items:center;margin:4px 0}#salap .sapb .spr button{flex:1;min-width:58px;padding:8px 8px;border-radius:9px;border:2px solid #ffc83a88;background:#1f1b19;color:#fff;font:900 13px Trebuchet MS,Arial}#salap .sapb .spr button.on{background:#ffc83a;color:#25211e;border-color:#fff}#salap .sapb input{width:100%;box-sizing:border-box;padding:9px 10px;border-radius:9px;border:2px solid #ffc83a88;background:#0e0d0c;color:#fff;font:800 15px Trebuchet MS,Arial}#salap .sapb .spsum{margin:8px 0 2px;padding:8px 10px;border-radius:10px;background:#00000055;font:700 12.5px Trebuchet MS,Arial;line-height:1.5}#salap .sapb .spsum b{color:#ffd96b}#salap .sapb .spsum b.g{color:#7dff8a}#salap .sapb .spsum b.r{color:#ff8a8a}'
 +'#sapres{position:fixed;inset:0;z-index:28;background:#000c;display:none;align-items:center;justify-content:center;padding:8px;box-sizing:border-box}#sapres.on{display:flex}#sapres .bx{width:min(520px,100%);max-height:100%;overflow:auto;border-radius:18px;border:2px solid #ffc83a;background:radial-gradient(ellipse at 50% 0,#2f251f,#171311 75%);padding:12px;color:#fff;font-family:Trebuchet MS,Arial}#sapres .hd{display:flex;align-items:center;gap:10px}#sapres .hd h3{margin:0;font-size:19px;letter-spacing:1px;flex:1}#sapres .x{width:36px;height:36px;border-radius:50%;border:2px solid #ffc83a;background:#1f1b19;color:#fff;font-weight:900}#sapres .res{text-align:center;padding:18px 8px;font:900 22px Trebuchet MS,Arial;border-radius:12px;margin:10px 0;background:#00000055}#sapres .res.W{color:#7dff8a}#sapres .res.L{color:#ff8a8a}#sapres .res.D{color:#ffd96b}#sapres .res small{display:block;font-size:13px;color:#e0f2ff;margin-top:6px}#sapres .go2 button{width:100%;padding:13px;border-radius:12px;border:2px solid #141211;font:900 16px Trebuchet MS,Arial;color:#25211e;background:linear-gradient(#ffe27a,#ff6600);box-shadow:0 4px 0 #b54800}';
 document.head.appendChild(s)}
const RS=document.createElement('div');RS.id='sapres';document.body.appendChild(RS);
RS.onclick=e=>{if(e.target===RS||e.target.closest('[data-rv]'))RS.classList.remove('on')};
function showRes(k,t,d){RS.innerHTML='<div class="bx"><div class="hd"><h3>RESULTADO DA APOSTA</h3><button class="x" data-rv="1">\u2715</button></div><div class="res '+k+'">'+t+'<small>'+d+'</small></div><div class="go2"><button data-rv="1">VOLTAR</button></div></div>';RS.classList.add('on')}

function stats(){const H=hLoad(),w=H.filter(x=>x.r=='W').length,l=H.filter(x=>x.r=='L').length,net=H.reduce((a,x)=>a+(x.r=='W'?x.a:x.r=='L'?-x.a:0),0);
 return w+' vit\u00f3rias \u2022 '+l+' derrotas \u2022 saldo '+(net>=0?'+':'')+fmt(net)+' gemas'}
const bt=(k,v,t,on)=>'<button data-sbk="'+k+'" data-sbv="'+v+'"'+(on?' class="on"':'')+'>'+t+'</button>';
function sumHtml(){
 const l=SALA.L||{me:'A'},spec=l.me=='S',a=CFG.stake|0;
 let s='Voc\u00ea aposta <b>'+fmt(a)+'</b> \u2022 Advers\u00e1rio aposta <b>'+fmt(a)+'</b><br>Se ganhar: <b class="g">+'+fmt(a)+' gemas</b> \u2022 Se perder: <b class="r">-'+fmt(a)+'</b> \u2022 Empate devolve';
 if(spec){const pA=chanceA(),p=Math.round((CFG.side=='A'?pA:1-pA)*100);s+='<br>Chance da EQUIPE '+(CFG.side=='A'?1:2)+': <b>'+p+'%</b>'}
 else s+='<br>Voc\u00ea joga e aposta no seu time.';
 return s+'<br>Sair da partida no meio perde a aposta.'}
function paint(d){
 const l=SALA.L||{me:'A',A:[],B:[]},spec=l.me=='S';
 let h='<div class="sph"><b>APOSTA</b><small>'+fmt(gems)+' GEMAS</small></div><div class="spr">'+bt('on',0,'TREINO \u2022 NADA CONTA',!CFG.on)+bt('on',1,'VALENDO GEMAS',CFG.on)+'</div>';
 if(CFG.on){
  h+='<div class="spt">'+stats()+'</div><div class="spl">VALOR DA APOSTA (GEMAS)</div><div class="spr">'+TIERS.map(v=>bt('st',v,v,CFG.stake==v)).join('')+bt('st','max','MAX',0)+'</div><div class="spr"><input id="sapamt" type="number" min="10" inputmode="numeric" value="'+CFG.stake+'"></div>'
  +'<div class="spl">FORMATO</div><div class="spr">'+RDS.map(q=>bt('rd',q[0],q[1],CFG.rd==q[0])).join('')+'</div>';
  if(spec)h+='<div class="spl">APOSTAR NA</div><div class="spr">'+bt('side','A','EQUIPE 1 ('+cnt('A')+')',CFG.side=='A')+bt('side','B','EQUIPE 2 ('+cnt('B')+')',CFG.side=='B')+'</div><div class="spl">COMO ASSISTIR</div><div class="spr">'+bt('quick',0,'AO VIVO',!CFG.quick)+bt('quick',1,'RESULTADO R\u00c1PIDO',CFG.quick)+'</div>';
  h+='<div class="spsum" id="sapsum">'+sumHtml()+'</div>'}
 h+='<div class="spr">'+bt('online','','DUELO ONLINE \u2022 JOGADOR x JOGADOR',0)+'</div>';
 d.innerHTML=h}
const repaint=()=>{const d=P2.querySelector('.sapb');if(d)paint(d)};
function inject(){
 const bx=P2.querySelector('.bx2');if(!bx||bx.querySelector('.sapb'))return;
 const go=bx.querySelector('.go2');if(!go)return;/* a tela de escolher bot nao tem .go2 */
 const h3=bx.querySelector('.hd h3');if(h3)h3.textContent='SALA APOSTADA \u2022 CONTRA SQUAD';
 const d=document.createElement('div');d.className='sapb';go.parentNode.insertBefore(d,go);paint(d)}
try{new MutationObserver(inject).observe(P2,{childList:true})}catch(e){console.error('[sala-apostada]',e)}

P2.addEventListener('click',e=>{
 const t=e.target.closest('[data-sbk]');if(!t)return;
 const k=t.dataset.sbk,v=t.dataset.sbv;
 if(k=='online'){goOnline();return}
 if(k=='on')CFG.on=+v?1:0;
 else if(k=='st')CFG.stake=v=='max'?Math.max(0,gems|0):+v;
 else if(k=='rd')CFG.rd=+v;
 else if(k=='side')CFG.side=v=='B'?'B':'A';
 else if(k=='quick')CFG.quick=+v?1:0;
 saveCfg();repaint()});
P2.addEventListener('input',e=>{
 if(e.target.id!=='sapamt')return;
 CFG.stake=Math.max(0,Math.floor(+e.target.value||0));saveCfg();
 const q=document.getElementById('sapsum');if(q)q.innerHTML=sumHtml();
 for(const x of P2.querySelectorAll('.sapb [data-sbk="st"]'))x.classList.toggle('on',+x.dataset.sbv==CFG.stake)});
function goOnline(){
 if(typeof window.betOnline!=='function'){say('Duelo online indispon\u00edvel agora');return}
 P2.classList.remove('on');try{$('modp').classList.add('hide')}catch(e){}
 window.betOnline()}

/* ---------- 3) INICIAR PARTIDA: valida a aposta antes da Sala comecar ---------- */
function prepare(){
 const l=SALA.L;if(!l||cnt('A')<1||cnt('B')<1)return{pass:1};/* a propria Sala avisa que faltam bots */
 if(MP.on||MP.arm||hum()>0)return{err:'Aposta s\u00f3 vale em sala offline contra bots. Para jogador de verdade use o DUELO ONLINE.'};
 const stake=CFG.stake|0;
 if(stake<MIN)return{err:'Aposta m\u00ednima: '+MIN+' gemas'};
 if(stake>(gems|0))return{err:'Gemas insuficientes'};
 const spec=l.me=='S',side=spec?CFG.side:'me';
 return{quick:spec&&CFG.quick,bet:{id:'S'+Date.now().toString(36),stake,rd:CFG.rd,spec,side,lbl:cnt('A')+'x'+cnt('B'),t:Date.now(),paid:0,teamTxt:spec?'EQUIPE '+(side=='A'?1:2):'SEU TIME'}}}
P2.addEventListener('click',e=>{
 if(!e.target.closest('[data-go]'))return;
 PEND=null;if(!CFG.on)return;
 const r=prepare();if(r.pass)return;
 if(r.err){e.stopPropagation();say(r.err);return}
 if(r.quick){e.stopPropagation();quick(r.bet);return}
 PEND=r.bet},true);

/* resultado rapido (espectador): sorteia pela forca dos bots, sem abrir partida */
function quick(b){
 const pA=chanceA(),winA=Math.random()<pA,ls=Math.floor(Math.random()*b.rd),sc=winA?[b.rd,ls]:[ls,b.rd];
 gems-=b.stake;try{svG()}catch(e){}
 const mine=b.side=='A'?winA:!winA,m=pay(b,mine?'W':'L');say(m);
 showRes(mine?'W':'L',m,'EQUIPE 1 '+sc[0]+' x '+sc[1]+' EQUIPE 2 \u2022 chance da sua aposta '+Math.round((b.side=='A'?pA:1-pA)*100)+'%');
 repaint()}

/* ---------- 4) partida: desconto, tela de carregamento e acerto ---------- */
function pay(b,res){
 if(!b||b.paid)return'';b.paid=1;let m;
 if(res=='W'){gems+=b.stake*2;m='VOCE GANHOU +'+fmt(b.stake)+' GEMAS'}
 else if(res=='D'){gems+=b.stake;m='EMPATE - aposta devolvida'}
 else m='VOCE PERDEU -'+fmt(b.stake)+' GEMAS';
 try{svG()}catch(e){}gemUI();try{localStorage.removeItem(OKEY)}catch(e){}
 const H=hLoad();H.push({r:res,a:b.stake,o:b.spec?b.teamTxt:'Sala '+b.lbl,t:Date.now(),s:1});hSave(H);
 return m}
{const s0=start;start=function(){
 try{if(fresh(PEND)&&TB==4&&MP.arm)MP.arm=0}catch(e){}/* aposta roda offline (mesma regra do js-33) */
 return s0.apply(this,arguments)}}
{const c0=startCS;startCS=function(room,n,sala){
 const b=PEND;PEND=null;
 if(!(sala&&fresh(b)&&SALA.L&&SALA.L.go))return c0.apply(this,arguments);
 const r=c0.apply(this,arguments);/* se falhar, nada foi descontado */
 try{
  if(MP.on||!G||!G.cs){say('Aposta cancelada: a partida abriu online.');return r}
  if((gems|0)<b.stake){say('Gemas insuficientes: partida de treino.');return r}
  gems-=b.stake;try{svG()}catch(e){}gemUI();
  G.sbet=b;G.cs.tgt=b.rd;
  try{localStorage.setItem(OKEY,JSON.stringify({id:b.id,stake:b.stake,t:Date.now()}))}catch(e){}
  say('APOSTA: '+fmt(b.stake)+' gemas '+(b.spec?'na '+b.teamTxt:'no seu time')+' \u2022 melhor de '+(b.rd*2-1))
 }catch(e){console.error('[sala-apostada]',e)}
 return r}}
try{if(typeof LD!=='undefined'&&LD&&typeof LD.open==='function'){const lo=LD.open;LD.open=function(a,c){
 const b=PEND;if(fresh(b)&&TB==4&&/^SALA/.test(String(a)))return lo.call(this,'SALA APOSTADA \u2022 '+fmt(b.stake)+' GEMAS',b.lbl+' \u2022 '+(b.spec?'apostando na '+b.teamTxt:'valendo gemas')+' \u2022 melhor de '+(b.rd*2-1));
 return lo.apply(this,arguments)}}}catch(e){}
function settle(){
 const g=G,b=g&&g.sbet,c=g&&g.cs;if(!b||b.paid||!c)return;
 let d=c.sc[0]-c.sc[1];if(b.spec&&b.side=='B')d=-d;/* equipe 1 = teams[0]; quem joga fica sempre em teams[0] */
 const res=d>0?'W':d<0?'L':(c.over?'D':'L'),m=pay(b,res);say(m);
 try{const e=$('est');e.textContent=e.textContent.replace(/\s*\(treino[^)]*\)/,'')+'   \u2022 APOSTA: '+m}catch(e){}}
{const f1=finish2;finish2=function(){const r=f1.apply(this,arguments);try{settle()}catch(e){console.error('[sala-apostada]',e)}return r}}
{const mb=$('menuBtn');if(mb)mb.addEventListener('click',()=>{
 try{const b=G&&G.sbet;if(b&&!b.paid){const m=pay(b,'L');say('Voc\u00ea saiu da partida: '+m)}}catch(e){}},true)}

/* aba CRIAR do card: abre direto o lobby da sala (antes so selecionava a aba) */
{const mp=$('modp');if(mp)mp.addEventListener('click',e=>{
 const b=e.target.closest&&e.target.closest('.salacfg .stb button[data-t="0"]');if(!b)return;
 e.stopPropagation();e.preventDefault();
 mp.classList.add('hide');
 try{window.salaOpen()}catch(x){console.error('[sala-apostada]',x);say('Erro ao abrir a sala')}},true)}

/* fechou/recarregou o jogo no meio de uma aposta: conta como derrota */
setTimeout(()=>{try{const o=JSON.parse(localStorage.getItem(OKEY)||'null');if(!o)return;localStorage.removeItem(OKEY);
 const H=hLoad();H.push({r:'L',a:o.stake,o:'Sala',t:Date.now(),s:1});hSave(H);say('Aposta anterior abandonada: -'+fmt(o.stake)+' gemas')}catch(e){}},2500);
})();
