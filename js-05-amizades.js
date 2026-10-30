
/* ===== SISTEMA DE AMIZADES (jogadores simulados, salvo no aparelho) ===== */
(function(){
const rosterOf=c=>{try{return(c.own?(c.mem||[]):clRoster(c)).map(String)}catch(e){return[]}};
function poolMap(){const m=new Map();if(window.ARR_USER){try{for(const p of(window.arrPlayers?window.arrPlayers():[])){if(!p.n||p.n===PN||p.n.toLowerCase()=='voce'||m.has(p.n))continue;m.set(p.n,p.c||null)}}catch(e){}return m}try{for(const c of allCl())for(const n of rosterOf(c)){if(n===PN||n.toLowerCase()=='voce')continue;if(!m.has(n))m.set(n,c)}}catch(e){}try{if(PC&&!PC.own&&PC.xm)for(const n of PC.xm)if(!m.has(n))m.set(n,PC)}catch(e){}if(!m.has(INFN))m.set(INFN,null);return m}
const poolNames=()=>[...poolMap().keys()];
const esc=t=>String(t).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
const MAXP=3;
const tr=(k,d)=>{try{const j=JSON.parse(localStorage.getItem(k));return j==null?d:j}catch(e){return d}};
const seed=()=>{let cl=[];try{cl=allCl()}catch(e){}const pk=(i,k)=>{const c=cl[i%Math.max(1,cl.length)];return c?rosterOf(c)[k]:null};
const fr=[pk(1,0),pk(2,1),pk(3,0),pk(4,2)],rq=[pk(5,0),pk(6,1),pk(7,2)];const u=a=>[...new Set(a.filter(Boolean))];return{v:2,fr:u(fr),rq:u(rq).filter(n=>!fr.includes(n)),sent:[]}};
let S=tr('arr_fr',null);if(!S||!Array.isArray(S.fr)||S.v!==2){S=seed();try{localStorage.removeItem('arr_fp')}catch(e){}}S.rq=S.rq||[];S.sent=S.sent||[];
S.fr=S.fr.filter(n=>true);let FRP=(tr('arr_fp',[])||[]).filter(n=>S.fr.includes(n)).slice(0,MAXP);
const PND=new Set();
let SK0='arr_fr';const sv=()=>{try{localStorage.setItem(SK0,JSON.stringify(S))}catch(e){}};
const svP=()=>{try{localStorage.setItem('arr_fp',JSON.stringify(FRP))}catch(e){}};
const hs=n=>clHash(String(n).toLowerCase());
function pl(n){const h=hs(n),c=poolMap().get(n);let lv=1,tier='BRONZE';try{const q=(window.ARR_USER&&window.arrPlayerByName&&window.arrPlayerByName(n))||PRS[(c?c.id+'|'+n:'b|'+n)]||{};lv=Math.min(99,Math.floor(prPts({k:q.k||0,w:q.w||0})/800)+1);tier=prTier(q.rp||0)}catch(e){}if(isLeg(n))lv=legLv(n);let ch=h%10,tj='',eq=null,ep=0,er=0,real=0;try{const r=window.arrPlayerByName&&window.arrPlayerByName(n);if(r&&r.ch>=0){ch=r.ch;tj=r.tj||'';eq=r.eq||null;ep=r.ep||0;er=r.er||0;real=1}}catch(e){}return{n,lv,c,ch,tj,eq,ep,er,real,tier}}
const tl=p=>'N\u00edvel '+p.lv+' \u2022 '+p.tier+(p.c?' \u2022 ['+p.c.tag+']':'');
/* 0 offline, 1 online no lobby, 2 na sua equipe, 3 em partida */
function st(n){if(FRP.includes(n))return 2;{const L=window.ARR_LB;if(L&&L.has(n))return L.get(n)==3?3:1}if(window.ARR_USER)return 0;if(n===INFN)return 1;const h=clHash(n+'#'+Math.floor(Date.now()/90000));if(h%100>=62)return 0;return((h>>7)%5==0)?3:1}
const ORD=[3,1,0,2],STT=['offline','online \u2022 no lobby','na sua equipe','online \u2022 em partida'],STC=['','g','y','o'];
const list=()=>S.fr.slice().sort((a,b)=>ORD[st(a)]-ORD[st(b)]);
const rel=n=>S.fr.includes(n)?'f':S.rq.includes(n)?'r':S.sent.some(x=>x.n==n)?'s':null;
const inMenu=()=>{const m=$('menu');return m&&!m.classList.contains('hide')};
const sfx=()=>{try{snd(700,.15,'triangle',.06,400)}catch(e){}};
function note(m,q){try{qxAdd(m)}catch(e){}if(inMenu()){soon(m);if(!q)sfx()}}
const P=$('frp'),B=$('frbody');
let tab=0,srch=null,sel=null,SG=[],rmT=0,rmN=null,typed='';
const isOpen=()=>!P.classList.contains('hide');
function fillSG(){SG=SG.filter(n=>rel(n)!='f'&&rel(n)!='r');const pool=poolNames().filter(n=>n!==PN&&!rel(n)&&!SG.includes(n));while(SG.length<2&&pool.length)SG.push(pool.splice(Math.random()*pool.length|0,1)[0]);if(!window.ARR_USER&&!rel(INFN)&&!SG.includes(INFN))SG.unshift(INFN)}
/* badges */
const em=document.createElement('em');em.id='frbn';$('frb2').appendChild(em);
function badge(){const n=S.rq.length;em.textContent=n>9?'9+':n;em.style.display=n?'':'none';$('frb').classList.toggle('pend',n>0)}
/* ---- linhas ---- */
function act(n){const r=rel(n),e=esc(n);
if(r=='f')return'<button class="frg sm" disabled>AMIGO</button>';
if(r=='s')return'<button class="frg sm" disabled>ENVIADO</button>';
if(r=='r')return'<button class="fry sm" data-a="acc" data-n="'+e+'">ACEITAR</button>';
return'<button class="fry sm" data-a="add" data-n="'+e+'">+ ADICIONAR</button>'}
function fcd(n,o){const r=(window.ARR_USER&&window.arrPlayerByName&&window.arrPlayerByName(n))||{},ow=isOwner(n),vf=!ow&&isInfl(n),e=esc(n),p=pl(n),ab=r.av?'background-image:url(&quot;'+r.av+'&quot;)':'background:hsl('+(hs(n)%360)+',55%,38%)';
return'<div class="frr'+(o.cls||'')+(ow?' ow':vf?' vf':'')+'"'+(o.attr||'')+'>'+(r.bn?'<i class="fcb" style="background-image:url(&quot;'+r.bn+'&quot;)"></i>':'')+'<div class="fca" style="'+ab+'" data-a="prof" data-n="'+e+'">'+(r.av?'':esc(String(n).charAt(0).toUpperCase()))+(o.dot!=null?'<i class="dt '+STC[o.dot]+'"></i>':'')+'</div><div class="frn"><b data-a="prof" data-n="'+e+'">'+legTg(n,p.c)+'@'+e+ytB(n)+'</b><small class="'+(o.sc||'')+'">'+o.sub+'</small></div>'+(o.right||'')+'</div>'}
function prow(n){return fcd(n,{sub:tl(pl(n)),right:act(n)})}
function frow(n,big){const s=st(n),e=esc(n),c=big?'sm':'sq';let b='';
if(s==2)b='<button class="frg '+c+'" data-a="kick" data-n="'+e+'">'+(big?'SAIR DA EQUIPE':'\u2013')+'</button>';
else if(PND.has(n))b='<button class="fry '+c+'" disabled>'+(big?'ENVIANDO...':'\u2026')+'</button>';
else if(s==1)b='<button class="fry '+c+'" data-a="inv" data-n="'+e+'">'+(big?'+ CONVIDAR':'+')+'</button>';
else if(s==3)b='<button class="fry '+c+'" data-a="watch" data-n="'+e+'">'+(big?'\u25B6 ASSISTIR':'\u25B6')+'</button>';
else if(big)b='<button class="frg sm" disabled>OFFLINE</button>';
return fcd(n,{cls:' fsl'+(sel==n?' sel':''),attr:' data-a="sel" data-n="'+e+'"',dot:s,sc:STC[s],sub:(big?tl(pl(n))+' \u2022 ':'')+STT[s],right:b})}
function rrow(n){const e=esc(n);return fcd(n,{sub:tl(pl(n)),right:'<div class="rqb2"><button class="fry sm" data-a="acc" data-n="'+e+'">ACEITAR</button><button class="frg sm" data-a="dec" data-n="'+e+'">RECUSAR</button></div>'})}
/* ---- telas ---- */
function v0(){const sg=srch?srch.res.slice(0,3):SG;
const L='<div class="frc2"><div class="frl">BUSCAR JOGADOR</div><div class="frsr"><input id="frin" list="frdl" maxlength="14" placeholder="Digite o nick ou @usuário" autocomplete="off" autocapitalize="off" spellcheck="false" value="'+esc(typed)+'"><button type="button" class="fry" data-a="srch">BUSCAR</button></div><div class="frl s2">'+(srch?'RESULTADOS <a data-a="clr">limpar</a>':'SUGEST\u00d5ES')+'</div>'+(sg.length?sg.map(prow).join(''):'<div class="fre">Nenhum jogador</div>')+'</div>';
const r0=S.rq[0],p0=r0&&pl(r0);
const rq=r0?rrow(r0)+(S.rq.length>1?'<small class="frmo">+'+(S.rq.length-1)+' outra(s) em ACEITAR</small>':''):'<div class="fre">Nenhuma solicita\u00e7\u00e3o</div>';
const on=list().filter(n=>st(n)>0).slice(0,2);
const R='<div class="frc2"><div class="frl">SOLICITA\u00c7\u00d5ES</div>'+rq+'<div class="frl s2">AMIGOS ONLINE</div>'+(on.length?on.map(n=>frow(n,0)).join(''):'<div class="fre">Nenhum amigo online</div>')+'</div>';
return'<div class="frgrid">'+L+R+'</div>'}
function v1(){return'<div class="frc2">'+(S.rq.length?S.rq.map(rrow).join(''):'<div class="fre">Nenhuma solicita\u00e7\u00e3o pendente</div>')+'</div>'}
function v2(){const l=list();return'<div class="frc2"><div class="frcnt">Equipe: '+FRP.length+'/'+MAXP+' \u2022 toque em um amigo para selecion\u00e1-lo</div>'+(l.length?l.map(n=>frow(n,1)).join(''):'<div class="fre">Voc\u00ea ainda n\u00e3o tem amigos. Use ADICIONAR.</div>')+'</div>'}
function btns(){const r=$('frrm');r.textContent=rmN?'CONFIRMAR: @'+rmN:'REMOVER AMIGO';r.className=rmN?'fry':'frg';$('frall').textContent='CONVIDAR TODOS'}
function render(){const a=document.activeElement;if(a&&a.id=='frin')typed=a.value;
$('frta').textContent='ACEITAR - '+S.rq.length;$('frto').textContent='ONLINES - '+S.fr.filter(n=>st(n)>0).length;
P.querySelectorAll('.frtb').forEach(b=>b.classList.toggle('on',+b.dataset.t==tab));
B.innerHTML=tab==0?v0():tab==1?v1():v2();btns();badge();try{if(window.arrEnsure)S.fr.concat(S.rq).slice(0,14).forEach(n=>window.arrEnsure(n,()=>{if(isOpen())render()}))}catch(e){}
const dl=$('frdl');if(!dl.firstChild)dl.innerHTML=poolNames().map(n=>'<option value="'+n+'">').join('')}
/* ---- acoes ---- */
function addReq(n){n=String(n||'').replace(/^@/,'');if(!n||n===PN){soon(n?'Esse \u00e9 voc\u00ea!':'Jogador inv\u00e1lido');return}
if(rel(n)=='r'){accept(n);return}if(rel(n)=='f'){soon('@'+n+' j\u00e1 \u00e9 seu amigo');return}if(rel(n)=='s'){soon('Pedido j\u00e1 enviado');return}
if(window.ARR_USER){if(!(window.arrPlayerByName&&window.arrPlayerByName(n))){soon('Jogador não encontrado');return}S.sent.push({n,t:9e15});sv();if(isOpen())render();(window.arrFrSend?window.arrFrSend(n,'req'):Promise.reject()).then(()=>{soon('Pedido enviado para @'+n);sfx()}).catch(()=>{S.sent=S.sent.filter(x=>x.n!=n);sv();soon('Falha ao enviar o pedido. Tente de novo');if(isOpen())render()});return}
S.sent.push({n,t:Date.now()+3500+Math.random()*7000});sv();soon('Pedido enviado para @'+n);sfx();if(isOpen())render()}
function accept(n){if(!S.rq.includes(n))return;S.rq=S.rq.filter(x=>x!=n);if(!S.fr.includes(n))S.fr.push(n);sv();if(window.ARR_USER&&window.arrFrSend)window.arrFrSend(n,'acc').catch(()=>{});soon('@'+n+' agora \u00e9 seu amigo!');sfx();fillSG();if(isOpen())render();else badge()}
function decline(n){if(window.ARR_USER&&window.arrFrSend)window.arrFrSend(n,'dec').catch(()=>{});S.rq=S.rq.filter(x=>x!=n);sv();soon('Solicita\u00e7\u00e3o recusada');if(isOpen())render();else badge()}
function search(){const i=$('frin'),q=(i?i.value:typed).trim().replace(/^@/,'').replace(/^\[[^\]]*\]\s*/,'').replace(/^\*/,'').trim();typed=q;if(!q){soon('Digite o nick do jogador');return}
const lq=q.toLowerCase();if(lq==String(PN).toLowerCase()){soon('Esse \u00e9 voc\u00ea!');return}
const sc=n=>{const l=n.toLowerCase();return l==lq?0:l.startsWith(lq)?1:2};
if(window.ARR_USER&&window.arrFind){soon('Buscando...');(async()=>{let nn='';try{if(window.arrAccNick&&/^[A-Za-z0-9_]{3,12}$/.test(q))nn=await window.arrAccNick(q)}catch(e){}
if(nn&&nn.toLowerCase()===String(PN).toLowerCase()&&lq!==String(PN).toLowerCase()){srch=null;soon('Esse é você!');render();return}
await Promise.all([window.arrFind(q).catch(()=>[]),nn&&nn!==PN?window.arrFind(nn).catch(()=>[]):null]);
const r2=poolNames().filter(n=>n.toLowerCase().includes(lq)&&n!==PN).sort((a,b)=>sc(a)-sc(b)).slice(0,5);
if(nn&&nn!==PN&&poolNames().includes(nn)){const i=r2.indexOf(nn);if(i>=0)r2.splice(i,1);r2.unshift(nn)}
if(!r2.length){srch=null;soon('Jogador não encontrado');render();return}srch={q,res:r2.slice(0,5)};render()})();return}
const res=poolNames().filter(n=>n.toLowerCase().includes(lq)&&n!==PN&&n.toLowerCase()!='voce').sort((a,b)=>sc(a)-sc(b)).slice(0,5);
if(!res.length){srch=null;soon('Jogador n\u00e3o encontrado');render();return}
srch={q,res};render()}
function fit(){const n=FRP.length;if(TB!=0||!n)return false;const need=n>=2?4:2;if(MS<need){MS=sMS=need;try{localStorage.setItem('arr_ms',MS)}catch(e){}try{mref()}catch(e){}return true}return false}
function menuParty(){const c=$('fpty');if(!c)return;c.innerHTML='';const SL=[-245,245,-445];
FRP.forEach((n,i)=>{const p=pl(n),d=document.createElement('div');d.className='fpm';d.style.left='calc(var(--u)*'+(SL[i]-190)+')';d.style.animationDelay=(-i*.5)+'s';
d.appendChild(chCv(p.ch,2,p.tj||''));const l=document.createElement('div');l.className='fpl';l.innerHTML='<i class="dt"></i><span>'+(p.c&&p.c.tag?'<em style="font-style:normal;color:'+p.c.col+'">['+esc(p.c.tag)+']</em> ':'')+esc(n)+ytB(n)+'</span><button type="button" data-n="'+esc(n)+'" aria-label="Remover da equipe">\u2715</button>';d.appendChild(l);c.appendChild(d)})}
function invite(n,q){if(!S.fr.includes(n)||FRP.includes(n)||PND.has(n))return false;
if(TB==2){const c=pl(n).c;if(!PC||!c||c.id!==PC.id){if(!q)soon('Guerra de Cl\u00e3s: s\u00f3 membros do seu cl\u00e3');return false}}
if(FRP.length+PND.size>=MAXP){if(!q)soon('Equipe cheia (m\u00e1x. '+MAXP+' amigos)');return false}
const s=st(n);if(s==0){if(!q)soon('@'+n+' est\u00e1 offline');return false}if(s==3){if(!q)soon('@'+n+' est\u00e1 em partida');return false}
if(window.ARR_REAL&&window.ARR_LB&&window.ARR_LB.has(n)){PND.add(n);if(!q)soon('Convite enviado para @'+n);if(isOpen())render();window.ARR_REAL(n);return true}
PND.add(n);if(!q)soon('Convite enviado para @'+n);if(isOpen())render();
setTimeout(()=>{PND.delete(n);if(!S.fr.includes(n)){if(isOpen())render();return}
if(Math.random()<.93&&FRP.length<MAXP){FRP.push(n);svP();const ch=fit();menuParty();note('@'+n+' entrou na sua equipe!'+(ch?' Modo: '+MN[MS]:''))}else note('@'+n+' recusou o convite');
if(isOpen())render()},1100+Math.random()*1700);return true}
function inviteAll(){const slots=MAXP-FRP.length-PND.size;if(slots<=0){soon('Sua equipe j\u00e1 est\u00e1 cheia');return}
const c=list().filter(n=>st(n)==1&&!PND.has(n));if(!c.length){soon('Nenhum amigo dispon\u00edvel para convidar');return}
const k=c.slice(0,slots);k.forEach(n=>invite(n,1));soon('Convite enviado para '+k.length+' amigo(s)');sfx()}
function kick(n){if(!FRP.includes(n))return;FRP=FRP.filter(x=>x!=n);svP();try{window.ARR_KICK&&window.ARR_KICK(n)}catch(e){}menuParty();soon('@'+n+' saiu da equipe');if(isOpen())render()}
function removeSel(){if(!sel||!S.fr.includes(sel)){soon('Toque em um amigo para selecion\u00e1-lo');return}
if(rmN!==sel){rmN=sel;clearTimeout(rmT);rmT=setTimeout(()=>{rmN=null;btns()},3000);btns();return}
const n=sel;S.fr=S.fr.filter(x=>x!=n);FRP=FRP.filter(x=>x!=n);PND.delete(n);sv();svP();menuParty();sel=null;rmN=null;clearTimeout(rmT);soon('@'+n+' removido dos amigos');fillSG();render()}
/* ---- eventos ---- */
B.addEventListener('click',e=>{const t=e.target.closest('[data-a]');if(!t||t.disabled)return;const a=t.dataset.a,n=t.dataset.n;
if(a=='prof')openProf(n);else if(a=='add')addReq(n);else if(a=='acc')accept(n);else if(a=='dec')decline(n);else if(a=='inv')invite(n);else if(a=='kick')kick(n);else if(a=='watch')watch(n);
else if(a=='sel'){sel=sel==n?null:n;rmN=null;render()}else if(a=='srch')search();else if(a=='clr'){srch=null;typed='';render()}});
B.addEventListener('keydown',e=>{if(e.target.id=='frin'&&e.key=='Enter'){e.preventDefault();search()}});
B.addEventListener('input',e=>{if(e.target.id=='frin')typed=e.target.value});
P.querySelectorAll('.frtb').forEach(b=>b.onclick=()=>{tab=+b.dataset.t;rmN=null;render()});
$('frall').onclick=inviteAll;$('frrm').onclick=removeSel;
$('frcl').onclick=()=>P.classList.add('hide');P.addEventListener('click',e=>{if(e.target===P)P.classList.add('hide')});
$('fpty').addEventListener('click',e=>{const b=e.target.closest('button');if(b)kick(b.dataset.n)});
window.frProf=n=>openProf(n);function openProf(n){try{const p=pl(n),c=p.c||null,key=c?c.id+'|'+n:'b|'+n,q=(window.ARR_USER&&window.arrPlayerByName&&window.arrPlayerByName(n))||PRS[key]||{};ppOpen({n,key,c,k:q.k||0,w:q.w||0,rp:q.rp||0,g:q.g||0,rt:q.rt||0,rg:q.rg||0,rw:q.rw||0})}catch(e){soon('Perfil indisponível')}}
window.frInfo=n=>({f:S.fr.includes(n),t:FRP.includes(n),s:st(n)});
window.frInv=n=>invite(n);window.frKick=n=>kick(n);
window.frJoin=n=>{PND.delete(n);if(!FRP.includes(n)&&FRP.length<MAXP){FRP.push(n);svP();const ch=fit();menuParty();note('@'+n+' entrou na sua equipe!'+(ch?' Modo: '+MN[MS]:''))}if(isOpen())render()};
window.frNo=n=>{PND.delete(n);note('@'+n+' n\u00e3o aceitou o convite');if(isOpen())render()};
window.frDel=n=>{if(!S.fr.includes(n))return;S.fr=S.fr.filter(x=>x!=n);FRP=FRP.filter(x=>x!=n);PND.delete(n);sv();svP();menuParty();soon('@'+n+' removido dos amigos');fillSG();if(isOpen())render()};
try{const _i=PRS['b|'+INFN];if(!_i||(_i.k==24800&&_i.w==1120&&_i.rp==9990)){PRS['b|'+INFN]={k:0,w:0,rp:0,g:0,rg:0,rw:0,rt:0};prSave()}}catch(e){}
function openFr(){tab=0;srch=null;typed='';sel=null;rmN=null;fillSG();P.classList.remove('hide');render();sfx()}
$('frb').classList.remove('soon');$('frb2').classList.remove('soon');
$('frb').onclick=$('frb2').onclick=openFr;
/* ---- simulacao: respostas, novos pedidos, status online ---- */
function tick(){const now=Date.now();let ch=0;
S.sent=S.sent.filter(x=>{if(x.t>now)return true;ch=1;if(Math.random()<.88){if(!S.fr.includes(x.n))S.fr.push(x.n);note('@'+x.n+' aceitou seu pedido de amizade!')}else note('@'+x.n+' n\u00e3o aceitou seu pedido.');return false});
if(ch){sv();fillSG();if(isOpen())render();else badge()}}
setInterval(tick,1500);
setInterval(()=>{if(isOpen()){const a=document.activeElement;if(!(a&&a.id=='frin'))render()}},15000);
function incoming(){if(!window.ARR_USER&&inMenu()&&S.rq.length<8){const pool=poolNames().filter(n=>n!==PN&&!rel(n));if(pool.length){const n=pool[Math.random()*pool.length|0];S.rq.push(n);sv();note('@'+n+' enviou um pedido de amizade');if(isOpen())render();else badge()}}
setTimeout(incoming,50000+Math.random()*70000)}
setTimeout(incoming,35000);
/* ---- partidas simuladas dos bots "em partida": contam no ranking mesmo sem voce assistir ---- */
const BKT=90000,stB=(n,b)=>{const h=clHash(n+'#'+b);if(h%100>=62)return 0;return((h>>7)%5==0)?3:1};
function botMatch(c,n){const e=prE(c.id+'|'+n),r=Math.random(),pc=1+Math.floor(39.99*r),win=pc==1;
const kills=win?4+(Math.random()*11|0):Math.max(0,Math.round((1-pc/40)*Math.random()*9));
e.k+=kills;e.g=(e.g||0)+1;e.rg=(e.rg||0)+1;if(win){e.w++;e.rw=(e.rw||0)+1}if(pc<=10)e.rt=(e.rt||0)+1;
e.rp=Math.max(0,(e.rp||0)+prDelta(pc,kills,win))}
function botSim(){if(window.ARR_USER)return;const now=Math.floor(Date.now()/BKT);let last=+tr('arr_pbk',0)||0;if(!last||last>now)last=now-1;if(now-1<=last){return}
const from=Math.max(last+1,now-40);let did=0;
try{for(let b=from;b<=now-1;b++)for(const c of allCl())for(const n0 of rosterOf(c)){const n=String(n0);if(n===PN||n.toLowerCase()=='voce')continue;if(FRP.includes(n))continue;if(stB(n,b)==3){botMatch(c,n);did++}}}catch(e){}
try{localStorage.setItem('arr_pbk',String(now-1))}catch(e){}if(did)try{prSave()}catch(e){}}
setInterval(botSim,5000);setTimeout(botSim,1500);
/* ---- ganchos usados pelo jogo ---- */
window.arrFrLogin=u=>{try{SK0='arr_fr:'+String(u).toLowerCase();let x=tr(SK0,null);if(!x||!Array.isArray(x.fr))x={v:2,fr:[],rq:[],sent:[]};S=x;S.rq=S.rq||[];S.sent=S.sent||[];S.sent.forEach(z=>{if(z.t<9e14)z.t=9e15});FRP=FRP.filter(n=>S.fr.includes(n));PND.clear();SG=[];fillSG();try{menuParty()}catch(e){}badge();if(isOpen())render();frRes()}catch(e){}};
function frRes(){if(!window.ARR_USER||!window.arrFind)return;const miss=[...new Set(S.fr.concat(S.rq,S.sent.map(x=>x.n)))].filter(n=>!(window.arrPlayerByName&&window.arrPlayerByName(n)));miss.slice(0,6).forEach(n=>window.arrFind(n).then(()=>{if(isOpen())render()}).catch(()=>{}))}
setInterval(frRes,60000);
window.arrFrIn=(n,k)=>{n=String(n||'');if(!n||n===PN)return;
if(k==='req'){if(S.fr.includes(n)){if(window.arrFrSend)window.arrFrSend(n,'acc').catch(()=>{});return}
if(S.sent.some(x=>x.n==n)){S.sent=S.sent.filter(x=>x.n!=n);S.fr.push(n);if(window.arrFrSend)window.arrFrSend(n,'acc').catch(()=>{});note('@'+n+' agora é seu amigo!')}
else if(!S.rq.includes(n)){S.rq.push(n);note('@'+n+' enviou um pedido de amizade')}}
else if(k==='acc'){S.sent=S.sent.filter(x=>x.n!=n);S.rq=S.rq.filter(x=>x!=n);if(!S.fr.includes(n)){S.fr.push(n);note('@'+n+' aceitou seu pedido de amizade!')}}
sv();fillSG();if(isOpen())render();else badge()};
window.frN=()=>FRP.length;
window.frFitMS=()=>{fit()};
window.frAdd=n=>addReq(n);
window.frPoolMap=poolMap;window.frPl=pl;window.frApply=function(teams,f,room){if(!FRP.length)return;const t=teams[0];
FRP.forEach((n,i)=>{const o=t&&t.m[i+(room?0:1)];if(!o)return;try{for(const q of f)if(q!==o&&!t.m.includes(q)&&(q.bn||q.name)==n){const nn=nmNext();q.name=(q.ctg?'['+q.ctg+'] ':'')+nn;if(q.ctg)q.bn=nn;q.cm=nn}}catch(e){}const p=pl(n);o.ch=p.ch;o.cm=n;o.fr=1;try{NU.add(n)}catch(e){}const fcl=p.c||null;o.cl=fcl;try{o.bf=fcl?clBuff(fcl):0}catch(e){}o.ctg=fcl?fcl.tag:undefined;if(fcl){o.bn=n;o.name='['+fcl.tag+'] '+n}else{o.bn=undefined;o.name=n}})};
function watch(n){if(!inMenu()||(typeof LD!='undefined'&&LD.busy))return;if(st(n)!=3){soon('@'+n+' j\u00e1 saiu da partida');if(isOpen())render();return}window.frWP={TB,RM,MS,AL};window.frWN=n;TB=2;RM=0;MS=4;AL=false;P.classList.add('hide');startL()}
window.frWatch=watch;
window.frWatchSet=function(n){const wp=window.frWP;if(wp){TB=wp.TB;RM=wp.RM;MS=wp.MS;AL=wp.AL;window.frWP=null;try{mref()}catch(e){}}
const p=pl(n),f=G.f,fcl=p.c||null;let pool=f.filter(q=>!q.isP);const tm=fcl&&G.teams.find(t=>t.cl&&t.cl.id===fcl.id);if(tm&&tm.m.length)pool=tm.m;const o=pool[Math.random()*pool.length|0];
for(const q of f)if(q!==o&&(q.cm===n||q.bn===n||q.name===n)){const nn=nmNext();q.name=(q.ctg?'['+q.ctg+'] ':'')+nn;if(q.ctg)q.bn=nn;q.cm=nn}
o.cm=n;o.fr=1;try{NU.add(n)}catch(e){}o.cl=fcl;try{o.bf=fcl?clBuff(fcl):0}catch(e){}if(fcl){o.ctg=fcl.tag;o.bn=n;o.name='['+fcl.tag+'] '+n}else{o.ctg=undefined;o.bn=undefined;o.name=n}
G.spec=o;G.wf=n;fc.w=1;fc.k='';fc.hid=null;CPL=[-.25,.55];cpit=.25;if(o.ang!=null)cyaw=o.ang};
window.frWarBad=()=>FRP.filter(n=>{const c=pl(n).c;return !PC||!c||c.id!==PC.id});
badge();menuParty();
})();
/* ===== HALLOWEEN CITY ===== */
(function(){
const ic=n=>'<svg class="ic"><use href="#i-'+n+'"/></svg>';
QMD.push({t:3,i:ic('skull'),n:'HALLOWEEN CITY',s:'Cidade assombrada • Time de 4 • Ondas de zumbis',tg:'Defenda a cidade assombrada com seu time contra ondas de zumbis e junte doces',b:[[ic('group'),'Voce e 3 aliados contra ondas cada vez maiores de zumbis'],[ic('target'),'Cada zumbi derrubado solta doces para o time'],[ic('trophy'),'Gaste os doces na loja: kit medico, colete e a evolutiva Vector Abobora']],tip:'Dica: um zumbi gigante aparece a cada 5 ondas'});
let H0=null,GRP=null,SKY=null,ZG=null,UI=null,bats=[];
const mcache={};
const hm=(c,b)=>mcache[c+b]||(mcache[c+b]=b?new THREE.MeshBasicMaterial({color:c}):new THREE.MeshLambertMaterial({color:c}));
const BXG=new THREE.BoxGeometry(1,1,1);
const HS={h:0,s:0,l:0};
let LGT=0;
function tc(c){c.getHSL(HS);let h=HS.h,s=HS.s,l=HS.l;if(h>.17&&h<.47){h=l>.28?(LGT?.09:.075):(LGT?.74:.78);s=LGT?.55:.6;l=LGT?Math.min(.72,l*1.15+.06):l*.85}else{h=h*.4+.456;s=Math.min(.5,s*.7+(LGT?.2:.15));l=LGT?Math.min(.78,l*.95+.06):l*.62}c.setHSL(h,s,l)}
const white=k=>k.r>.98&&k.g>.98&&k.b>.98;
function theme(on){
 if(!H0){H0={bg:sc.background,fog:sc.fog,L:[],P:[],on:0};sc.traverse(o=>{if(o.isHemisphereLight||o.isDirectionalLight)H0.L.push([o,o.color.clone(),o.groundColor?o.groundColor.clone():null,o.intensity]);if(o.isMesh&&o.parent===sc&&o.geometry&&o.geometry.type=='PlaneGeometry'&&o.material&&o.material.color)H0.P.push([o.material,o.material.color.clone(),o.material.map])})}
 if(!on){if(!H0.on)return;H0.on=0;sc.background=H0.bg;sc.fog=H0.fog;for(const l of H0.L){l[0].color.copy(l[1]);if(l[2])l[0].groundColor.copy(l[2]);l[0].intensity=l[3]}for(const p of H0.P){p[0].color.copy(p[1]);p[0].map=p[2];p[0].needsUpdate=true}
  if(GRP){sc.remove(GRP);GRP=null}if(SKY){sc.remove(SKY);SKY=null}if(ZG){sc.remove(ZG);ZG=null}return}
 H0.on=1;
 const c=document.createElement('canvas');c.width=4;c.height=256;const q=c.getContext('2d'),g=q.createLinearGradient(0,0,0,256);
 [[0,'#110d0b'],[.4,'#1d0a40'],[.7,'#5a1f6b'],[.9,'#c4501f'],[1,'#ff8a1f']].forEach(s=>g.addColorStop(s[0],s[1]));q.fillStyle=g;q.fillRect(0,0,4,256);
 sc.background=new THREE.CanvasTexture(c);sc.fog=new THREE.Fog('#2a1040',500,4000);
 for(const l of H0.L){const o=l[0];if(o.isHemisphereLight){o.color.set('#8d78ff');o.groundColor.set('#ff7a2a');o.intensity=.8}else{o.color.set('#b9c4ff');o.intensity=.7}}
 const gc=document.createElement('canvas');gc.width=gc.height=256;const gq=gc.getContext('2d');gq.fillStyle='#2b1740';gq.fillRect(0,0,256,256);
 const GC=['#3a1f58','#1f1030','#4a2a2a','#2a3a22','#5a2e0f'];for(let i=0;i<900;i++){gq.fillStyle=GC[i%5];gq.fillRect(Math.random()*256,Math.random()*256,2,2+Math.random()*4)}
 const gt=new THREE.CanvasTexture(gc);gt.wrapS=gt.wrapT=THREE.RepeatWrapping;gt.repeat.set(S/320,S/320);
 for(const p of H0.P){if(p[2]){p[0].map=gt;p[0].color.set('#ffffff')}else tc(p[0].color);p[0].needsUpdate=true}
}
function recolor(){
 const CO=new THREE.Color();
 gw.traverse(o=>{
  if(o.isInstancedMesh&&o.instanceColor){const a=o.instanceColor.array;for(let i=0;i<a.length;i+=3){CO.setRGB(a[i],a[i+1],a[i+2]);tc(CO);a[i]=CO.r;a[i+1]=CO.g;a[i+2]=CO.b}o.instanceColor.needsUpdate=true}
  if(o.material&&o.material.color&&!Array.isArray(o.material)){o.material=o.material.clone();if(!white(o.material.color))tc(o.material.color)}
 });
}
function decor(m){
 GRP=new THREE.Group();sc.add(GRP);
 const k=(S/12000)*(S/12000)*(m?.5:1),O=new THREE.Object3D(),CO=new THREE.Color();
 const put=(geo,mat,n,fn)=>{const m=new THREE.InstancedMesh(geo,mat,n);let i=0,t=0;
  while(i<n&&t<n*12){t++;const x=rr(80,S-80),y=rr(80,S-80);if(wallAt(x,y)||wallAt(x+34,y)||wallAt(x-34,y)||wallAt(x,y+34)||wallAt(x,y-34))continue;
   O.position.set(x,0,y);O.rotation.set(0,rr(0,6.28),0);O.scale.set(1,1,1);fn(O,CO);O.updateMatrix();m.setMatrixAt(i,O.matrix);m.setColorAt(i,CO);i++}
  m.count=i;m.frustumCulled=false;GRP.add(m)};
 put(new THREE.SphereGeometry(1,10,8),new THREE.MeshLambertMaterial({color:'#ffffff',emissive:'#ff5a00',emissiveIntensity:.5}),Math.round(500*k+120),(o,c)=>{const s=rr(10,22);o.scale.set(s,s*.8,s);o.position.y=s*.8;c.setHSL(.07+rr(0,.03),.9,.5)});
 put(BXG,hm('#ffffff'),Math.round(260*k+60),(o,c)=>{const h=rr(26,44);o.scale.set(rr(16,24),h,8);o.position.y=h/2;o.rotation.z=rr(-.15,.15);c.setHSL(.72,.12,rr(.3,.45))});
 put(new THREE.CylinderGeometry(.5,1.2,1,5),hm('#ffffff'),Math.round(160*k+40),(o,c)=>{const h=rr(90,170);o.scale.set(7,h,7);o.position.y=h/2;c.set('#1b1020')});
 put(new THREE.SphereGeometry(1,8,6),new THREE.MeshBasicMaterial({color:'#ffffff'}),Math.round(200*k+40),(o,c)=>{o.scale.set(7,7,7);o.position.y=rr(40,70);c.set('#ffb02e')});
 if(!m)put(new THREE.SphereGeometry(1,8,6),new THREE.MeshBasicMaterial({color:'#ffffff',transparent:true,opacity:.7}),Math.round(120*k+30),(o,c)=>{const s=rr(7,11);o.scale.set(s,s*1.4,s);o.position.y=rr(90,160);c.set('#b57bff')});
}
function sky(m){
 SKY=new THREE.Group();sc.add(SKY);
 const moon=new THREE.Mesh(new THREE.SphereGeometry(420,24,16),new THREE.MeshBasicMaterial({color:'#ffd9a0',fog:false}));moon.position.set(-2600,3400,-7200);SKY.add(moon);
 const halo=new THREE.Mesh(new THREE.SphereGeometry(640,24,16),new THREE.MeshBasicMaterial({color:'#ff9a3a',transparent:true,opacity:.18,fog:false,depthWrite:false}));halo.position.copy(moon.position);SKY.add(halo);
 const n=m?300:700,pa=new Float32Array(n*3);for(let i=0;i<n;i++){const a=Math.random()*6.2832,e=Math.random()*1.3+.15,r=9500;pa[i*3]=Math.cos(a)*Math.cos(e)*r;pa[i*3+1]=Math.sin(e)*r;pa[i*3+2]=Math.sin(a)*Math.cos(e)*r}
 const sg=new THREE.BufferGeometry();sg.setAttribute('position',new THREE.BufferAttribute(pa,3));const st=new THREE.Points(sg,new THREE.PointsMaterial({color:'#ffffff',size:2.5,sizeAttenuation:false,fog:false}));st.frustumCulled=false;SKY.add(st);
 bats=[];const bm=new THREE.MeshBasicMaterial({color:'#0e0c0a',side:THREE.DoubleSide,fog:false}),bg=new THREE.PlaneGeometry(46,16);
 for(let i=0;i<(m?7:14);i++){const b=new THREE.Group(),w1=new THREE.Mesh(bg,bm),w2=new THREE.Mesh(bg,bm);w1.position.z=-23;w2.position.z=23;b.add(w1,w2);b.scale.setScalar(2.2);SKY.add(b);bats.push({b,w1,w2,a:Math.random()*6.28,r:rr(500,1300),h:rr(450,1100),s:rr(.15,.4)})}
}
function soft(){
 const c=document.createElement('canvas');c.width=4;c.height=256;const q=c.getContext('2d'),g=q.createLinearGradient(0,0,0,256);
 [[0,'#3b2a78'],[.4,'#7b4fb0'],[.72,'#e0788a'],[.92,'#ffb26a'],[1,'#ffd08a']].forEach(a=>g.addColorStop(a[0],a[1]));q.fillStyle=g;q.fillRect(0,0,4,256);
 sc.background=new THREE.CanvasTexture(c);sc.fog=new THREE.Fog('#8a5a9a',700,5000);
 for(const l of H0.L){const o=l[0];if(o.isHemisphereLight){o.color.set('#e6d6ff');o.groundColor.set('#ffb878');o.intensity=1.15}else{o.color.set('#ffe6c8');o.intensity=.95}}
 const gc=document.createElement('canvas');gc.width=gc.height=256;const gq=gc.getContext('2d');gq.fillStyle='#5f4f7c';gq.fillRect(0,0,256,256);
 const GC2=['#74609a','#4f6a45','#a8692f','#6a4f86','#8a7ab0'];for(let i=0;i<700;i++){gq.fillStyle=GC2[i%5];gq.fillRect(Math.random()*256,Math.random()*256,2,2+Math.random()*4)}
 const gt=new THREE.CanvasTexture(gc);gt.wrapS=gt.wrapT=THREE.RepeatWrapping;gt.repeat.set(S/320,S/320);
 for(const p of H0.P){if(p[2]){p[0].map=gt;p[0].color.set('#ffffff');p[0].needsUpdate=true}}
}
const WCOL=['#5b2a86','#3f2a7a','#7a2a7a','#2f6a55','#6a2f5a'];
function witch(){
 const g=G;if(!g||!g.houses)return;
 const cg=new THREE.ConeGeometry(1,1,8,1),bg=new THREE.CylinderGeometry(1,1,1,14),bm=new THREE.MeshLambertMaterial({color:'#2a1a3a'}),gm=new THREE.MeshBasicMaterial({color:'#ffb02e'}),ms=WCOL.map(c=>new THREE.MeshLambertMaterial({color:c}));
 for(const h of g.houses){const rg=h.rm;if(!rg)continue;const w=h.w+36,d=h.h+36,ch=RH*1.9,cm=ms[Math.abs((h.x*31+h.y*17)|0)%ms.length];
  rg.children.slice().forEach(o=>{if(o.geometry&&o.geometry.type=='ConeGeometry'){o.geometry=cg;o.material=cm;o.scale.set(w*.6,ch,d*.6);o.position.y=WH+8+ch/2}});
  const br=new THREE.Mesh(bg,bm);br.scale.set(w*.78,5,d*.78);br.position.y=WH+8;rg.add(br);
  const bd=new THREE.Mesh(bg,gm);bd.scale.set(w*.5,9,d*.5);bd.position.y=WH+8+ch*.2;rg.add(bd)}
}
function zMesh(c){
 const g=new THREE.Group(),part=(w,h,d,x,y,z,col,bs)=>{const m=new THREE.Mesh(BXG,hm(col,bs));m.scale.set(w,h,d);m.position.set(x,y,z);g.add(m);return m};
 const L1=part(8,22,9,0,11,-6,c.pa),L2=part(8,22,9,0,11,6,c.pa);part(12,24,22,0,34,0,c.sh);
 if(c.boss){part(22,20,22,1,58,0,'#ff7a00');part(4,8,4,1,72,0,'#3a7a2a')}else part(14,14,14,1,54,0,c.sk);
 const A1=part(22,6,6,12,40,-14,c.sk),A2=part(22,6,6,12,40,14,c.sk);
 part(2,3,3,c.boss?12:8.5,c.boss?60:55,-4,'#ffec3b',1);part(2,3,3,c.boss?12:8.5,c.boss?60:55,4,'#ffec3b',1);
 g.scale.setScalar(c.s);return{g,L1,L2,A1,A2}
}
const ZP=w=>({
 n:{hp:50+10*w,dm:8+w,sp:Math.min(135,80+4*w),r:20,cn:3,s:1,sk:'#6f9a52',sh:'#4a3a6a',pa:'#343230'},
 r:{hp:30+6*w,dm:6+w*.5,sp:Math.min(200,150+4*w),r:17,cn:4,s:.9,sk:'#9ab8a0',sh:'#c4501f',pa:'#3a2a1a'},
 t:{hp:220+35*w,dm:18+1.5*w,sp:62,r:30,cn:15,s:1.5,sk:'#3f6a3a',sh:'#2a1a1a',pa:'#1a1a1a'},
 b:{hp:1400+250*Math.floor(w/5),dm:35,sp:78,r:46,cn:80,s:2.6,sk:'#ff7a00',sh:'#2a1458',pa:'#150a2a',boss:1}});
const free=(x,y)=>!(wallAt(x,y)||wallAt(x+22,y)||wallAt(x-22,y)||wallAt(x,y+22)||wallAt(x,y-22));
function spawn(h,tp){
 const al=G.teams[0].m.filter(o=>!o.dead),c=al.length?al[R()*al.length|0]:G.p;let x=0,y=0,ok=0;
 for(let i=0;i<40&&!ok;i++){const a=R()*6.2832,d=rr(750,1300);x=cl(c.x+Math.cos(a)*d,60,S-60);y=cl(c.y+Math.sin(a)*d,60,S-60);ok=free(x,y)}
 if(!ok)return;const P=ZP(h.w)[tp],m=zMesh(P);m.g.position.set(x,0,y);ZG.add(m.g);
 h.zb.push(Object.assign({x,y,mh:P.hp,ang:0,ac:0,fl:0,ph:R()*6.28,m,tp},P));
}
function nextWave(h){
 h.w++;const w=h.w,n=6+3*w;h.q=[];for(let i=0;i<n;i++)h.q.push(w>=2&&R()<.25?'r':'n');
 for(let i=0;i<(w>=3?Math.floor(w/3):0);i++)h.q.push('t');if(w%5==0)h.q.push('b');h.q.sort(()=>R()-.5);
 h.st='fight';h.sp=0;h.ban={t:3,x:'ONDA '+w};snd(120,.5,'sawtooth',.08,-40)
}
function hitZ(h,z,d,by){
 z.hp-=d;z.fl=.12;dmgTx(z.x,z.y-34,Math.round(d),'#ffd93b',0);if(z.hp>0)return;
 ZG.remove(z.m.g);h.zb.splice(h.zb.indexOf(z),1);h.candy+=z.cn;h.tot+=z.cn;h.kills++;if(by)by.kills=(by.kills|0)+1;
 tx(z.x,z.y-44,'+'+z.cn+' DOCES','#ff9a1f');boom(z.x,z.y,['#ff7a00','#b57bff','#7dff6a'],z.boss?40:14,z.boss?300:180);if(by&&by.isP)snd(700,.08,'triangle',.05,300)
}
function zUpd(h,dt){
 const tg=G.teams[0].m.filter(o=>!o.dead&&o.st=='ground');
 for(const z of h.zb){
  let t=null,bd=1e9;for(const o of tg){const d=Math.hypot(o.x-z.x,o.y-z.y)*(o.dn>0?1.6:1);if(d<bd){bd=d;t=o}}
  z.fl=Math.max(0,z.fl-dt);z.ac-=dt;
  if(t){const dx=t.x-z.x,dy=t.y-z.y,d=Math.hypot(dx,dy)||1;z.ang=Math.atan2(dy,dx);
   if(d>z.r+t.r+10){const sp=z.sp*dt,vx=dx/d*sp,vy=dy/d*sp;let mv=0;
    if(!wallAt(z.x+vx+Math.sign(vx)*z.r*.6,z.y)){z.x+=vx;mv=1}
    if(!wallAt(z.x,z.y+vy+Math.sign(vy)*z.r*.6)){z.y+=vy;mv=1}
    if(!mv){z.x+=-vy*1.2;z.y+=vx*1.2}}
   else if(z.ac<=0){z.ac=1;hurt(t,z.dm,null,1);boom(t.x,t.y,'#ff4a4a',5,120)}}
  for(const o of h.zb)if(o!==z){const dx=z.x-o.x,dy=z.y-o.y,d=Math.hypot(dx,dy),m=z.r+o.r-6;if(d>0&&d<m){const p=(m-d)*.25;z.x+=dx/d*p;z.y+=dy/d*p}}
  z.x=cl(z.x,40,S-40);z.y=cl(z.y,40,S-40);
  const m=z.m,ph=h.t*(z.sp/10)+z.ph,sw=Math.sin(ph);
  m.g.position.set(z.x,Math.abs(sw)*2,z.y);m.g.rotation.y=-z.ang;m.L1.rotation.z=sw*.7;m.L2.rotation.z=-sw*.7;m.A1.rotation.z=sw*.15;m.A2.rotation.z=-sw*.15;m.g.scale.setScalar(z.s*(1+z.fl*3));
 }
}
function bulletsHit(h,dt){
 for(let i=G.b.length-1;i>=0&&h.zb.length;i--){const b=G.b[i];if(!b.o||b.o.tm!==0||b.ex)continue;
  const x1=b.x,y1=b.y,x0=x1-b.vx*dt,y0=y1-b.vy*dt,sx=x1-x0,sy=y1-y0,L=sx*sx+sy*sy||1;
  for(const z of h.zb){let t=((z.x-x0)*sx+(z.y-y0)*sy)/L;t=t<0?0:t>1?1:t;
   if(Math.hypot(x0+sx*t-z.x,y0+sy*t-z.y)<z.r+(b.r||5)){hitZ(h,z,b.dm*(b.o.isP?1:.85),b.o);boom(b.x,b.y,'#9cff6a',3,110);G.b.splice(i,1);break}}}
}
function bot0(f,dt){
 const h=G.hc;f.fa=null;f.vx=0;f.vy=0;if(!h||f.dn>0||f.st!='ground')return;
 const P=G.p,tm=G.teams[0].m;let z=null,zd=1e9;for(const q of h.zb){const d=Math.hypot(q.x-f.x,q.y-f.y);if(d<zd){zd=d;z=q}}
 const dn=tm.find(o=>o!==f&&!o.dead&&o.dn>0&&Math.hypot(o.x-f.x,o.y-f.y)<1000);
 const go=(x,y,s)=>{const dx=x-f.x,dy=y-f.y,d=Math.hypot(dx,dy)||1;f.vx=dx/d*s;f.vy=dy/d*s;f.ang=Math.atan2(dy,dx)};
 if(dn&&(!z||zd>230)){f.rt=dn;if(Math.hypot(dn.x-f.x,dn.y-f.y)>95)go(dn.x,dn.y,200);else f.ang=Math.atan2(dn.y-f.y,dn.x-f.x);return}
 if(z&&zd<900&&los(f,z)){const a=Math.atan2(z.y-f.y,z.x-f.x);f.ang=a;
  if(zd<260){f.vx=-Math.cos(a)*190;f.vy=-Math.sin(a)*190}else{const s=Math.sin(h.t*1.3+(f.i||0));f.vx=-Math.sin(a)*s*90;f.vy=Math.cos(a)*s*90}
  if(f.mg[f.cur]<=0&&f.rl<=0)reload(f);else shoot(f,a);return}
 if(z&&zd<900){go(z.x,z.y,170);return}
 if(Math.hypot(P.x-f.x,P.y-f.y)>260)go(P.x,P.y,200)
}
function bot(f,dt){bot0(f,dt);const m=Math.hypot(f.vx,f.vy);if(m<1){f.stT=0;return}
f.stT=(f.stT||0)+dt;if(f.stT>.5){const mv=Math.hypot(f.x-(f.stX==null?f.x:f.stX),f.y-(f.stY==null?f.y:f.stY));f.stX=f.x;f.stY=f.y;f.stT=0;if(mv<m*.075){f.dtT=1.2;f.dtS=Math.random()<.5?1:-1}}
if((f.dtT||0)>0){f.dtT-=dt;const k=f.dtS||1;[f.vx,f.vy]=[-f.vy*k,f.vx*k]}
[f.vx,f.vy]=steer(f,f.vx,f.vy)}
const ai0=ai;ai=function(f,dt){if(G&&G.hc)return bot(f,dt);return ai0(f,dt)};
const fk0=fsk;fsk=function(f,id){const h=G&&G.hc;if(h&&h.evo&&f.tm===0&&(WP[id].base||id)==10&&EVW[10])return EVW[10];return fk0(f,id)};
const fin0=finish;finish=function(){if(G&&G.hc){over();return}return fin0.apply(this,arguments)};
function over(){
 const h=G&&G.hc;if(!h||h.over)return;h.over=1;
 let best=Math.max(h.w,+(ls('arr_hcbest')||0));try{localStorage.setItem('arr_hcbest',best)}catch(e){}
 const gain=h.w*40+h.kills*4;coins+=gain;try{svD();$('coins').textContent=fmt(coins)}catch(e){}
 const d=document.createElement('div');d.style.cssText='position:fixed;inset:0;z-index:80;display:flex;flex-direction:column;align-items:center;justify-content:center;background:rgba(15,4,30,.88);color:#fff;font-family:sans-serif;text-align:center';
 d.innerHTML='<div style="font-size:30px;font-weight:900;color:#ff9a1f">A CIDADE CAIU</div><div style="margin:14px;font-size:16px;line-height:1.7">Onda alcancada: '+h.w+'<br>Zumbis eliminados: '+h.kills+'<br>Doces coletados: '+h.tot+'<br>Melhor onda: '+best+'<br>Moedas ganhas: +'+gain+'</div><button style="padding:12px 26px;font-size:16px;font-weight:800;border:0;border-radius:12px;background:#ff7a00;color:#1a0a2a">VOLTAR AO MENU</button>';
 document.body.appendChild(d);d.querySelector('button').onclick=()=>{d.remove();$('menuBtn').onclick()}
}
const u0=upd;upd=function(dt){
 const h=G&&G.hc;if(!h)return u0(dt);if(h.over)return;
 try{if(typeof zc!='undefined'&&zc)zc.visible=false;if(typeof zn!='undefined'&&zn)zn.visible=false}catch(e){}
 h.t+=dt;const tm=G.teams[0].m;
 if(h.st=='prep'){h.pt-=dt;if(h.pt<=0)nextWave(h)}
 else{h.sp-=dt;if(h.sp<=0&&h.q.length&&h.zb.length<45){spawn(h,h.q.pop());h.sp=Math.max(.25,.9-.04*h.w)}
  if(!h.q.length&&!h.zb.length){h.st='prep';h.pt=9;h.ban={t:3,x:'ONDA '+h.w+' COMPLETA'};h.candy+=5*h.w;h.tot+=5*h.w;
   for(const o of tm){if(o.dead)continue;if(o.dn>0)revive(o,G.p);o.hp=Math.min(MH,o.hp+MH*.5)}}}
 u0(dt);zUpd(h,dt);bulletsHit(h,dt);
 if(SKY){SKY.position.copy(cam3.position);for(const q of bats){q.a+=dt*q.s;q.b.position.set(Math.cos(q.a)*q.r,q.h,Math.sin(q.a)*q.r);q.b.rotation.y=-q.a;const f=Math.sin(h.t*9+q.r)*.7;q.w1.rotation.x=-1.5708+f;q.w2.rotation.x=-1.5708-f}}
 if(!tm.some(o=>!o.dead))over();
};
const r0=render;render=function(){
 r0();const h=G&&G.hc;if(!h||mode!='play')return;
 X.setTransform(D,0,0,D,0,0);const m=12;
 X.fillStyle='#1e0a32';X.beginPath();X.roundRect(W/2-120,m,240,60,12);X.fill();
 Tx('HALLOWEEN CITY',W/2,m+13,12,'#ff9a1f');
 Tx(h.st=='prep'?'Proxima onda em '+Math.ceil(Math.max(0,h.pt))+'s':'ONDA '+h.w+'  |  Zumbis: '+(h.zb.length+h.q.length),W/2,m+33,14,'#fff');
 X.fillStyle='#ff7a00';X.beginPath();X.arc(W/2-42,m+49,6,0,6.2832);X.fill();Tx(h.candy+' doces',W/2+6,m+49,13,'#ffd93b');
 if(h.ban&&h.ban.t>0){h.ban.t-=gdt;X.globalAlpha=Math.min(1,h.ban.t);Tx(h.ban.x,W/2,H*.3,34,'#ff9a1f');X.globalAlpha=1}
 const v=new THREE.Vector3();
 for(const z of h.zb){if(z.hp>=z.mh&&!z.boss)continue;v.set(z.x,70*z.s,z.y).project(cam3);if(v.z>1)continue;const sx=(v.x+1)/2*W,sy=(1-v.y)/2*H,w=z.boss?80:40;X.fillStyle='rgba(0,0,0,.6)';X.fillRect(sx-w/2,sy,w,5);X.fillStyle=z.boss?'#ff7a00':'#7dff6a';X.fillRect(sx-w/2,sy,w*Math.max(0,z.hp)/z.mh,5)}
};
const IT=[['Kit Medico',40,'Cura e revive o time',(h,tm)=>{for(const o of tm){if(o.dead)continue;if(o.dn>0)revive(o,G.p);o.hp=MH}}],
 ['Colete',60,'+50 de armadura no time',(h,tm)=>{for(const o of tm)if(!o.dead)o.ar=50}],
 ['Vector Abobora',250,'Evolutiva Mitica para o time',(h,tm)=>{h.evo=1;for(const o of tm){if(o.dead)continue;o.ws[0]=10;o.mg[0]=WP[10].mag;o.cur=0;o.rl=0}}]];
function ui(){
 if(UI)return;UI=document.createElement('div');UI.style.cssText='position:fixed;left:8px;top:42%;z-index:60;display:none;font-family:sans-serif;width:190px';
 const bs='padding:9px 10px;border:0;border-radius:10px;font-weight:800;font-size:13px;color:#1a0a2a;background:#ff9a1f;width:100%;margin-top:6px;text-align:left';
 UI.innerHTML='<button id="hcB" style="'+bs+'">LOJA DE DOCES</button><div id="hcP" style="display:none"></div>';document.body.appendChild(UI);
 const P=UI.querySelector('#hcP');IT.forEach((it,i)=>{const b=document.createElement('button');b.style.cssText=bs+';background:#b57bff';b.onclick=()=>{const h=G&&G.hc;if(!h||h.over||h.candy<it[1]||(i==2&&h.evo))return;h.candy-=it[1];it[3](h,G.teams[0].m);soon('Comprado: '+it[0]);snd(900,.12,'triangle',.06,300)};P.appendChild(b)});
 UI.querySelector('#hcB').onclick=()=>{P.style.display=P.style.display=='none'?'block':'none'};
 UI.addEventListener('pointerdown',e=>e.stopPropagation());UI.addEventListener('touchstart',e=>e.stopPropagation(),{passive:true});
 setInterval(()=>{const h=G&&G.hc,on=h&&mode=='play'&&!h.over;UI.style.display=on?'block':'none';if(!on)return;[...P.children].forEach((b,i)=>{const it=IT[i],own=i==2&&h.evo;b.innerHTML=it[0]+' - '+(own?'COMPRADA':it[1]+' doces')+'<br><small style="font-weight:600">'+it[2]+'</small>';b.style.opacity=own||h.candy<it[1]?.45:1})},300)
}
function startHC(){
 nmReset();MX0=0;MY0=0;MSZ=S;mstop();$('menu').classList.add('hide');$('end').classList.add('hide');
 const M=genMap(),f=[];for(let i=0;i<4;i++)f.push(mkF(i,i==0));f[0].ch=CH;for(let i=1;i<4;i++)f[i].ch=1+(R()*11|0);
 const teams=mkTeams(f,4,false),tw=(M.towns||[]).slice().sort((a,b)=>Math.hypot(a.x-CX,a.y-CY)-Math.hypot(b.x-CX,b.y-CY))[0]||{x:CX,y:CY};
 f.forEach((o,i)=>{const a=i/4*6.2832;o.x=tw.x+Math.cos(a)*80;o.y=tw.y+Math.sin(a)*80;o.ang=0;o.st='ground';o.vx=0;o.vy=0;o.jh=0;o.jv=0;o.hp=MH;o.ws=[2,1];o.mg=[WP[2].mag,WP[1].mag];o.cur=0;o.res=[0,0,0,0];o.inf=1;o.dead=0;o.dn=0;o.kills=0});
 const pl={ax:CX,ay:CY,bx:CX,by:CY,dx:1,dy:0,t:2,x:CX,y:CY,ang:0};
 G=Object.assign(M,{f,teams,ta:1,spec:null,p:f[0],b:[],pt:[],tx:[],feed:[],sp:[],t:0,alive:4,endT:0,win:0,done:0,pl,pk:null,ad:[],adT:1e9,room:false,fl:[],Z:{cx:CX,cy:CY,r:30000,ph:0,t:0,st:'end',wait:1e9,nx:null,s:null},
  hc:{w:0,st:'prep',pt:6,q:[],zb:[],sp:0,candy:0,tot:0,evo:0,kills:0,t:0,over:0,ban:{t:4,x:'HALLOWEEN CITY'}}});
 G.items=[];G.sv=[];G.shops=[];
 shk=0;aA.on=0;js.on=0;cm.on=0;fl.on=0;build3(G);buildMM(G);
 theme(1);recolor();decor();sky();ZG=new THREE.Group();sc.add(ZG);ui();
 CPL=[-.25,.55];cyaw=0;cpit=.25;fc={x:CX,y:CY,h:700,k:'',hid:null,hide:0};mode='play';cam.x=CX;cam.y=CY;startS()
}
const st0=start;
let rkT=0;
start=function(){if(TB==3){window.__HWM=0;window.__rkH=0;LGT=0;try{frFitMS()}catch(e){}window.frWN=null;return startHC()}
 theme(0);const rkm=TB==0;window.__HWM=rkm?1:0;window.__rkH=0;LGT=rkm?1:0;
 const r=st0.apply(this,arguments);window.__HWM=0;
 if(rkm&&G&&!G.cs&&!G.room&&!G.hc&&typeof gw!='undefined'&&gw){try{theme(1);recolor();decor(1);sky(1);soft();witch();window.__rkH=1;try{qSz()}catch(e){}}catch(e){console.error('tema ranqueada',e);window.__rkH=0}}
 return r};
{const q0=qRP;qRP=function(){const v=q0();return window.__rkH?Math.min(v,1):v}}
{const u1=upd;upd=function(dt){if(window.__rkH&&SKY&&G&&!G.hc){rkT+=dt;try{SKY.position.copy(cam3.position);for(const q of bats){q.a+=dt*q.s;q.b.position.set(Math.cos(q.a)*q.r,q.h,Math.sin(q.a)*q.r);q.b.rotation.y=-q.a;const f=Math.sin(rkT*9+q.r)*.7;q.w1.rotation.x=-1.5708+f;q.w2.rotation.x=-1.5708-f}}catch(e){}}return u1(dt)}}
const qs0=qmSel;qmSel=function(t){if(t==3){TB=3;MS=4;AL=true;mref();qmR();soon('Modo: HALLOWEEN CITY - toque em JOGAR');return}return qs0(t)};
{const m1=mref;mref=function(){m1();if(TB==3){$('subm').style.display='none';const al=$('alone');if(al)al.style.display='none'}}}
mref();
})();

/* ===== NOVO MENU v137 ===== */
(function(){const st=$('stage');if(!st)return;
const SV=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 1040" preserveAspectRatio="xMidYMid slice"><defs><linearGradient id="sk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#17120f"/><stop offset=".5" stop-color="#2a1458"/><stop offset=".8" stop-color="#6a2f86"/><stop offset="1" stop-color="#c4601f"/></linearGradient><linearGradient id="sp" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffb060" stop-opacity=".55"/><stop offset="1" stop-color="#ffb060" stop-opacity=".05"/></linearGradient><radialGradient id="mg"><stop offset=".4" stop-color="#ffe9b0" stop-opacity=".5"/><stop offset="1" stop-color="#ffe9b0" stop-opacity="0"/></radialGradient></defs><rect width="2048" height="1040" fill="url(#sk)"/><circle cx="1710" cy="190" r="150" fill="url(#mg)"/><circle cx="1710" cy="190" r="52" fill="#f6f1de"/><g fill="#27201b" opacity=".7"><ellipse cx="1500" cy="150" rx="260" ry="50"/><ellipse cx="1900" cy="270" rx="240" ry="50"/><ellipse cx="300" cy="140" rx="300" ry="45"/></g><polygon points="1000,0 1500,0 1650,860 850,860" fill="url(#sp)"/><g fill="#150a26"><polygon points="330,340 560,240 760,340 760,830 330,830"/><rect x="600" y="170" width="50" height="120"/><polygon points="770,370 860,160 950,370 950,800 770,800"/><polygon points="1580,430 1760,340 1960,430 1960,840 1580,840"/><polygon points="1370,410 1420,260 1470,410 1470,800 1370,800"/></g><g fill="#ffb02e"><rect x="400" y="420" width="36" height="52"/><rect x="480" y="560" width="36" height="52"/><rect x="620" y="440" width="36" height="52"/><rect x="400" y="640" width="36" height="52"/><rect x="840" y="400" width="26" height="40"/><rect x="840" y="560" width="26" height="40"/><rect x="1650" y="500" width="36" height="52"/><rect x="1780" y="640" width="36" height="52"/><rect x="1860" y="500" width="36" height="52"/><rect x="1405" y="460" width="22" height="36"/></g><g stroke="#0d0618" stroke-width="10" fill="none"><path d="M60 830 L90 520 L40 420 M90 520 L160 440"/><path d="M1990 840 L1950 540 L2010 450 M1950 540 L1880 470"/></g><rect y="740" width="2048" height="300" fill="#c46a3a" opacity=".25"/><polygon points="0,840 2048,840 2048,1040 0,1040" fill="#1a0c2a"/><g fill="#ff7a00"><ellipse cx="430" cy="880" rx="34" ry="27"/><ellipse cx="960" cy="850" rx="26" ry="21"/><ellipse cx="1560" cy="870" rx="30" ry="24"/><ellipse cx="1700" cy="890" rx="36" ry="29"/><ellipse cx="200" cy="900" rx="30" ry="24"/></g></svg>`;
$('nbg').insertAdjacentHTML('beforeend','<div id="nsvg">'+SV+'</div>');
const mk=(id,h)=>{const d=document.createElement('div');d.id=id;d.innerHTML=h||'';st.insertBefore(d,$('pcoin'));return d};
mk('tbar');mk('bbar');mk('sqp','<h3>SQUAD</h3><div id="sqs"></div><button id="sqi"><b>+</b>CONVIDAR</button>');
$('sqi').onclick=()=>$('frb').click();
const pb=$('play').querySelector('b');if(pb)pb.textContent='JOGAR';
function r(){const L=[typeof PN!='undefined'?PN:'Voce'],s=$('sqs');document.querySelectorAll('#fpty .fpl button').forEach(e=>L.push(e.dataset.n));s.textContent='';
 for(let i=0;i<4;i++){const d=document.createElement('div'),a=document.createElement('i'),n=document.createElement('em'),p=document.createElement('b');d.className='sl';if(i&&L[i]){let pp=null;try{pp=window.frPl(L[i])}catch(e){}n.innerHTML=(pp&&pp.c&&pp.c.tag?'<span style="color:'+pp.c.col+'">['+esc(pp.c.tag)+']</span> ':'')+esc(L[i])+ytB(L[i])}else n.textContent=L[i]||'ABERTO';p.textContent=L[i]?(i?'\u2715':''):'+';d.append(a,n,p);
  if(!L[i])d.onclick=()=>$('frb').click();else if(i)p.onclick=e=>{e.stopPropagation();const x=[...document.querySelectorAll('#fpty .fpl button')].find(k=>k.dataset.n===L[i]);if(x)x.click()};s.appendChild(d)}}
r();try{new MutationObserver(r).observe($('fpty'),{childList:true,subtree:true})}catch(e){}setInterval(()=>{if(!$('menu').classList.contains('hide'))r()},700);
})();
/* ===== MENU INICIAL v26: cenario ciano (skyline neon + piso em grade) ===== */
(function(){const n=document.getElementById('nsvg');if(!n)return;
let sd=11;const R=()=>(sd=(sd*16807)%2147483647)/2147483647;
let s='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 1040" preserveAspectRatio="xMidYMid slice"><defs><linearGradient id="csk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#080706"/><stop offset=".55" stop-color="#201915"/><stop offset="1" stop-color="#382d25"/></linearGradient><linearGradient id="cfl" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2d231d"/><stop offset="1" stop-color="#130f0c"/></linearGradient><radialGradient id="chg"><stop offset="0" stop-color="#ff7d27" stop-opacity=".45"/><stop offset="1" stop-color="#ff7d27" stop-opacity="0"/></radialGradient></defs><rect width="2048" height="1040" fill="url(#csk)"/>';
for(let i=0;i<90;i++)s+='<circle cx="'+(R()*2048|0)+'" cy="'+(R()*520|0)+'" r="'+(.7+R()*1).toFixed(1)+'" fill="#ffddbf" opacity="'+(.25+R()*.55).toFixed(2)+'"/>';
s+='<ellipse cx="1024" cy="800" rx="1200" ry="160" fill="url(#chg)"/>';
const sky=(fill,hmin,hmax,wmin,wmax,wc,wo)=>{let x=-20,o='<g fill="'+fill+'">',w='<g fill="'+wc+'" opacity="'+wo+'">';
while(x<2080){const bw=wmin+R()*(wmax-wmin),bh=hmin+R()*(hmax-hmin),y=800-bh;o+='<rect x="'+x.toFixed(0)+'" y="'+y.toFixed(0)+'" width="'+bw.toFixed(0)+'" height="'+bh.toFixed(0)+'"/>';
if(R()<.35)o+='<rect x="'+(x+bw*.42).toFixed(0)+'" y="'+(y-40-R()*60).toFixed(0)+'" width="'+(bw*.16).toFixed(0)+'" height="'+(60+R()*60).toFixed(0)+'"/>';
const cols=Math.floor(bw/26),rows=Math.floor(bh/46);for(let a=0;a<cols;a++)for(let b=0;b<rows;b++)if(R()<.18)w+='<rect x="'+(x+8+a*26).toFixed(0)+'" y="'+(y+12+b*46).toFixed(0)+'" width="12" height="18"/>';
x+=bw+R()*10}
return o+'</g>'+w+'</g>'};
s+=sky('#211b17',160,460,70,150,'#ff7d27',.45)+sky('#110e0c',70,300,60,140,'#ffba7d',.35);
s+='<g stroke="#ff7d27" opacity=".35" stroke-width="3"><path d="M330 0V560M820 0V500M1320 0V520M1760 0V480"/></g>';
s+='<rect y="800" width="2048" height="240" fill="url(#cfl)"/><g stroke="#ff7d27" fill="none" opacity=".4" stroke-width="2">';
for(let i=0;i<9;i++){const y=800+Math.pow(i/8,2)*236;s+='<path d="M0 '+y.toFixed(0)+'H2048"/>'}
for(let k=-16;k<=16;k++)s+='<path d="M1024 800L'+(1024+k*260)+' 1040"/>';
s+='</g><rect y="796" width="2048" height="6" fill="#ff7d27" opacity=".55"/></svg>';
n.innerHTML=s})();



/* ===== MODO SALA v150 ===== */
(function(){
const ic=n=>'<svg class="ic"><use href="#i-'+n+'"/></svg>',sv=()=>{try{localStorage.setItem('arr_sala',JSON.stringify(SALA))}catch(e){}};
QMN.push('SALA');QMS.push('Treino \u2022 Contra Squad de 1x1 a 5x5');QMC.push('#2ecc71');PVI.push(PVI[1]);
QMD.push({t:4,i:ic('group'),n:'SALA APOSTADA',s:'Contra Squad de 1x1 a 5x5 \u2022 treino ou valendo gemas',tg:'Monte sua sala de 1x1 a 5x5, jogue ou assista os bots \u2022 e, se quiser, aposte gemas no resultado',b:[[ic('group'),'Escolha 1x1, 2x2, 3x3, 4x4 ou 5x5'],[ic('video'),'Jogue ou assista os bots lutando entre si com c\u00e2mera livre'],[ic('trophy'),'Nada conta: sem moedas, vit\u00f3rias, abates ou rank']],tip:'Dica: todos usam o Runer e s\u00f3 h\u00e1 5 armas: Escopeta, MP5, SMG, Cano Duplo e SPAS'});
const st=document.createElement('style');st.textContent='.salacfg{margin:8px 0 4px;display:flex;flex-direction:column;gap:8px}.salacfg h4{margin:0;font:900 12px Trebuchet MS,Arial;color:#7fb9c4;letter-spacing:1px}.salacfg .sz{display:flex;gap:6px;flex-wrap:wrap}.salacfg .sz button{flex:1;min-width:46px;padding:8px 4px;border-radius:10px;border:2px solid #00ff8888;background:#0d1a13;color:#fff;font:900 15px Trebuchet MS,Arial}.salacfg .sz button.on{background:#00ff88;color:#032a18;border-color:#fff}.salacfg .go{display:flex;gap:8px}.salacfg .go button{flex:1;padding:12px 6px;border-radius:12px;border:2px solid #141211;font:900 15px Trebuchet MS,Arial;color:#fff;background:linear-gradient(#ff6600,#b54800);box-shadow:0 4px 0 #4d392b}.salacfg .go button.w{background:linear-gradient(#ff6600,#b54800);box-shadow:0 4px 0 #4d392b}';document.head.appendChild(st);
let STAB=0,STM=0;
const SX=t=>String(t).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
{const sst=document.createElement('style');sst.textContent='.stb{display:flex;gap:6px}.stb button{flex:1;padding:10px 4px;border-radius:10px;border:2px solid #ff660088;background:#1f1b19;color:#fff;font:900 14px Trebuchet MS,Arial;letter-spacing:1px}.stb button.on{background:linear-gradient(#ff6600,#b54800);border-color:#fff}.srl{display:flex;flex-direction:column;gap:4px;max-height:210px;overflow:auto}.srl button{display:flex;justify-content:space-between;align-items:center;gap:8px;padding:10px;border-radius:8px;border:0;background:#1f1b19;color:#fff;font:900 13px Trebuchet MS,Arial;text-align:left}.srl button small{color:#ff6600;font-size:11px;white-space:nowrap}.sre{color:#8a96b4;padding:8px;font:700 13px Trebuchet MS,Arial}';document.head.appendChild(sst)}
function salaRq(){try{const n=window.ARR_NET;if(!n)return;if(n.lbOn())n.lbSend({k:'rq'});else n.lbOpen()}catch(e){}}
function SALAUI(d){
 const draw=()=>{let h='<div class="stb"><button data-t="0"'+(STAB==0?' class="on"':'')+'>CRIAR</button><button data-t="1"'+(STAB==1?' class="on"':'')+'>SALAS</button></div>';
  if(STAB==0){/* o botao CRIAR fica na barra de cima */}
  else{const me=(window.MP&&window.MP.code)||'',rl=window.ARR_USER?(window.ARR_RL||[]).filter(r=>r&&r[0]!==me&&(+r[2]||1)<8):[];
   h+='<h4>SALAS ONLINE ('+rl.length+')</h4><div class="srl">'+(!window.ARR_USER?'<div class="sre">Entre na sua conta para ver as salas online</div>':rl.length?rl.map(r=>'<button data-j="'+SX(r[0])+'"><span>Sala de '+SX(r[1])+'</span><small>'+(+r[2]||1)+'/8 \u2022 ENTRAR</small></button>').join(''):'<div class="sre">Nenhuma sala online agora</div>')+'</div>'}
  d.innerHTML=h};
 d.onclick=e=>{const t=e.target.closest('button');if(!t)return;const k=t.dataset;
  if(k.t!==undefined){STAB=+k.t;if(STAB==1)salaRq();draw();return}
  if(k.c){$('modp').classList.add('hide');salaOpen();window.ARR_SALA&&window.ARR_SALA();return}
  if(k.w!==undefined){$('modp').classList.add('hide');salaOpen();return}
  if(k.r){salaRq();draw();return}
  if(k.j){$('modp').classList.add('hide');window.ARR_JOIN&&window.ARR_JOIN(k.j)}};
 window.ARR_RLU=()=>{if(STAB==1&&d.isConnected)draw()};
 clearInterval(STM);STM=setInterval(()=>{if(!d.isConnected){clearInterval(STM);return}const m=$('modp');if(STAB==1&&m&&!m.classList.contains('hide'))salaRq()},4000);
 draw();if(STAB==1)salaRq()}
const q0=qmR;qmR=function(){q0();const g=$('modg'),c=g&&g.children[4];if(c&&!c.querySelector('.mnv')){const n=document.createElement('span');n.className='mnv';n.textContent='NOVO';c.appendChild(n)}
if(TB!=4)return;const d=document.createElement('div');d.className='salacfg';d.innerHTML='<h4>SALA PERSONALIZADA</h4><div class="go"><button data-w="0">CRIAR SALA</button></div>';SALAUI(d);

$('mdc').appendChild(d)};

/* ===== LOBBY DA SALA v153: bots reais do jogo (com cla/tag ou sem cla) ===== */
const esc=t=>String(t).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
function SL(){if(!SALA.L)SALA.L={me:'A',A:[],B:[],id:String(100000+(Math.random()*899999|0)),go:0,lbl:'',pk:null,pq:'',pf:'a'};return SALA.L}
const sc=k=>{const l=SL();return l[k].length+(l.me==k?1:0)};
const lbl=e=>(e.c?'['+e.c.tag+'] ':'')+e.n;
const inf=e=>{try{const q=frPl(e.n);return 'NV '+q.lv+' \u2022 '+q.tier}catch(x){return 'BOT'}};
const used=()=>{const l=SL(),u=new Set();for(const e of l.A.concat(l.B))u.add(e.n);return u};
function bots(){const pm=frPoolMap(),tk=new Set();try{for(const n of clTaken())tk.add(n)}catch(e){}const a=[],b=[],c=[];for(const [n,cl] of pm){if(n===INFN)a.push({n,c:null});else b.push({n,c:cl||null})}for(const n of NMP){const k=n.toLowerCase();if(k=='voce'||n===PN||pm.has(n)||tk.has(k))continue;c.push({n,c:null})}b.sort((x,y)=>x.c&&y.c?(x.c.tag<y.c.tag?-1:x.c.tag>y.c.tag?1:0):0);return a.concat(b,c)}
const avail=(f,q)=>{const u=used(),Q=(q||'').toLowerCase();return bots().filter(e=>!u.has(e.n)&&(f=='c'?!!e.c:f=='n'?!e.c:true)&&(!Q||lbl(e).toLowerCase().includes(Q)))};
let PKR=[];
const lst=document.createElement('style');lst.textContent='#salap{position:fixed;inset:0;z-index:25;background:#000c;display:none;align-items:center;justify-content:center;padding:8px;box-sizing:border-box}#salap.on{display:flex}#salap .bx2{width:min(760px,100%);max-height:100%;overflow:auto;border-radius:18px;border:2px solid #00ff88;background:radial-gradient(ellipse at 50% 0,#1f1b19,#0e0d0c 75%);padding:10px 12px 12px;color:#fff;font-family:Trebuchet MS,Arial}#salap .hd{display:flex;align-items:center;gap:10px}#salap .hd h3{margin:0;font-size:20px;letter-spacing:1px;flex:1}#salap .hd small{color:#ffba7d;font-weight:900}#salap .x{width:36px;height:36px;border-radius:50%;border:2px solid #00ff88;background:#0d1a13;color:#fff;font-weight:900}#salap .row{display:flex;gap:6px;flex-wrap:wrap;align-items:center;margin:8px 0}#salap .row span{font:900 11px Trebuchet MS;color:#7fb9c4;letter-spacing:1px}#salap .row button{padding:7px 10px;border-radius:9px;border:2px solid #00ff8888;background:#0d1a13;color:#fff;font:900 13px Trebuchet MS}#salap .row button.on{background:#00ff88;color:#032a18;border-color:#fff}#salap .row input{flex:1;min-width:120px;padding:8px 10px;border-radius:9px;border:2px solid #00ff8888;background:#171311;color:#fff;font:700 14px Trebuchet MS}#salap .cols{display:flex;gap:8px}#salap .sc{flex:1;min-width:0;border-radius:12px;border:1px solid #ffffff22;background:#171311;padding:6px}#salap .sc h5{margin:0 0 6px;font-size:13px;letter-spacing:1px;display:flex;justify-content:space-between}#salap .sc h5 i{font-style:normal;color:#ffba7d}#salap .sl{display:flex;align-items:center;gap:6px;min-height:34px;margin-bottom:4px;padding:4px 8px;border-radius:8px;background:#1f1b19;font-weight:900;font-size:13px}#salap .sl em{flex:1;font-style:normal;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}#salap .sl b{font-size:10px;color:#ff6600;white-space:nowrap}#salap .sl.me{background:#2f251f;border:1px solid #ff6600}#salap .sl button{border:0;background:#3a1218;color:#fff;border-radius:6px;width:24px;height:24px;font-weight:900}#salap .sl.e{border:1px dashed #00ff8899;background:transparent;color:#ffba7d;cursor:pointer;justify-content:center}#salap .go2{display:flex;gap:8px;margin-top:8px}#salap .go2 button{flex:1;padding:12px 6px;border-radius:12px;border:2px solid #141211;font:900 15px Trebuchet MS;color:#fff;background:linear-gradient(#ff6600,#b54800);box-shadow:0 4px 0 #4d392b}#salap .go2 button.st{flex:2;background:linear-gradient(#ff6600,#b54800);box-shadow:0 4px 0 #4d392b}#salapl{max-height:230px;overflow:auto;display:flex;flex-direction:column;gap:4px}#salapl button{display:flex;justify-content:space-between;gap:8px;padding:8px 10px;border-radius:8px;border:0;background:#1f1b19;color:#fff;font:900 13px Trebuchet MS;text-align:left}#salapl button small{color:#ff6600;font-size:10px;white-space:nowrap}';document.head.appendChild(lst);
const P2=document.createElement('div');P2.id='salap';document.body.appendChild(P2);
function salaOpen(){const l=SL();l.pk=null;salaR();P2.classList.add('on')}window.salaOpen=salaOpen;
function plist(){const l=SL(),r=avail(l.pf,l.pq);PKR=r.slice(0,40);const e=document.getElementById('salapl');if(e)e.innerHTML=PKR.length?PKR.map((x,i)=>'<button data-pick="'+i+'"><span>'+esc(lbl(x))+ytB(x.n)+'</span><small>'+inf(x)+(x.c?'':' \u2022 SEM CL\u00c3')+'</small></button>').join('')+(r.length>40?'<div style="text-align:center;color:#8a96b4;font-size:11px;padding:4px">'+(r.length-40)+' bots a mais - use os filtros</div>':''):'<div style="color:#8a96b4;padding:8px">Nenhum bot encontrado</div>'}
function salaR(){const l=SL(),n=SALA.n;
if(l.pk){P2.innerHTML='<div class="bx2"><div class="hd"><h3>CONVIDAR BOT \u2022 EQUIPE '+(l.pk=='A'?1:2)+'</h3><button class="x" data-back="1">\u2715</button></div><div class="row">'+[['a','TODOS'],['c','COM CL\u00c3'],['n','SEM CL\u00c3']].map(q=>'<button data-pf="'+q[0]+'"'+(l.pf==q[0]?' class="on"':'')+'>'+q[1]+'</button>').join('')+'<button data-rand="1">ALEAT\u00d3RIO</button></div><div id="salapl"></div></div>';plist();return}
const col=(k,t)=>{const it=[];if(l.me==k)it.push('<div class="sl me"><em>'+esc(PN)+'</em><b>ANFITRI\u00c3O</b></div>');l[k].forEach((e,i)=>it.push('<div class="sl"><em>'+esc(lbl(e))+ytB(e.n)+'</em><b>'+inf(e)+'</b><button data-rm="'+k+i+'">\u2715</button></div>'));while(it.length<n)it.push('<div class="sl e" data-add="'+k+'">+ CONVIDAR BOT</div>');return '<div class="sc"><h5>'+t+'<i>'+sc(k)+'/'+n+'</i></h5>'+it.join('')+'</div>'};
P2.innerHTML='<div class="bx2"><div class="hd"><h3>SALA \u2022 CONTRA SQUAD</h3><small>ID '+l.id+'</small><button class="x" data-x="1">\u2715</button></div>'
+'<div class="row"><span>PERSONAGEM: RUNER (FIXO) \u2022 ARMAS: ESCOPETA, MP5, SMG, CANO DUPLO, SPAS</span></div><div class="row"><span>VAGAS POR EQUIPE</span>'+[1,2,3,4,5].map(q=>'<button data-n="'+q+'"'+(n==q?' class="on"':'')+'>'+q+'</button>').join('')+'</div>'
+'<div class="row"><span>VOC\u00ca</span>'+[['A','EQUIPE 1'],['B','EQUIPE 2'],['S','ESPECTADOR']].map(q=>'<button data-me="'+q[0]+'"'+(l.me==q[0]?' class="on"':'')+'>'+q[1]+'</button>').join('')+'</div>'
+'<div class="cols">'+col('A','EQUIPE 1')+col('B','EQUIPE 2')+'</div>'
+'<div class="go2"><button data-fill="1">PREENCHER COM BOTS</button><button data-clr="1">LIMPAR</button><button class="st" data-go="1">INICIAR PARTIDA</button></div></div>'}
P2.oninput=e=>{if(e.target.id=='salaq'){SL().pq=e.target.value;plist()}};
P2.onclick=e=>{const t=e.target.closest('[data-x],[data-n],[data-me],[data-add],[data-rm],[data-fill],[data-clr],[data-go],[data-pick],[data-back],[data-rand],[data-pf]');if(!t)return;const l=SL(),d=t.dataset;
if(d.x){P2.classList.remove('on');return}
if(d.back){l.pk=null}
else if(d.pf){l.pf=d.pf}
else if(d.pick!==undefined){const x=PKR[+d.pick];if(x&&sc(l.pk)<SALA.n&&!used().has(x.n)){l[l.pk].push(x);soon(lbl(x)+' entrou na sala')}l.pk=null}
else if(d.rand){const r=avail(l.pf,l.pq);if(r.length&&sc(l.pk)<SALA.n){const x=r[Math.random()*r.length|0];l[l.pk].push(x);soon(lbl(x)+' entrou na sala')}l.pk=null}
else if(d.n){SALA.n=+d.n;sv();for(const k of['A','B'])while(sc(k)>SALA.n&&l[k].length)l[k].pop();if(sc('A')>SALA.n||sc('B')>SALA.n)l.me='S'}
else if(d.me){if(d.me!='S'&&sc(d.me)>=SALA.n&&l.me!=d.me){soon('Equipe cheia');return}l.me=d.me}
else if(d.add){if(sc(d.add)<SALA.n){l.pk=d.add;l.pq='';l.pf='a'}}
else if(d.rm){const k=d.rm[0],i=+d.rm.slice(1);l[k].splice(i,1)}
else if(d.fill){for(const k of['A','B'])while(sc(k)<SALA.n){const r=avail('a','');if(!r.length)break;l[k].push(r[Math.random()*r.length|0])}}
else if(d.clr){l.A=[];l.B=[]}
else if(d.go){if(sc('A')<1||sc('B')<1){soon('Convide bots para as duas equipes');return}
l.go=1;l.lbl=sc('A')+'x'+sc('B');SALA.w=l.me=='S'?1:0;sv();TB=4;MS=sMS;AL=sAL;mref();P2.classList.remove('on');$('modp').classList.add('hide');startL();return}
salaR()};
const f0=finish2;finish2=function(){if(!(G&&G.sala&&G.cs))return f0.apply(this,arguments);const c=G.cs,w=c.sc[0]==c.sc[1]?-1:c.sc[0]>c.sc[1]?0:1,N=G.teams[0].m.length+'x'+G.teams[1].m.length,tt=' (treino \u2022 nada conta)';
$('cs').classList.remove('on');
if(G.room){mus('win');$('place').textContent='PARTIDA ENCERRADA';$('est').textContent='Sala '+N+' - Placar final: '+c.sc[0]+' x '+c.sc[1]+'  ('+(w<0?'Empate':'Equipe '+(w+1)+' venceu')+')'+tt}
else{const win=w==0;if(win)mus('win');else loseS();$('place').textContent=win?'VITORIA!':w<0?'EMPATE':'DERROTA';$('est').textContent='Modo: SALA '+N+'   Placar: '+c.sc[0]+' x '+c.sc[1]+'   Eliminacoes: '+(G.p.kills||0)+tt}
$('end').classList.remove('hide')};

/* ===== MODO APOSTA: 1x1 valendo gemas contra jogadores/bots (ou um bot joga por voce) ===== */
const BKEY='arr_bets',bLoad=()=>{try{return JSON.parse(localStorage.getItem(BKEY)||'[]')}catch(e){return[]}},bSave=h=>{try{localStorage.setItem(BKEY,JSON.stringify(h.slice(-30)))}catch(e){}};
const lvOf=e=>{try{const q=frPl(e.n);if(q&&q.lv)return q.lv}catch(x){}let h=0;for(const c of String(e.n))h=(h*31+c.charCodeAt(0))|0;return 8+Math.abs(h)%40};
const BT={opp:null,proxy:null,amt:100,me:'me',rd:2,live:1,pk:null,pq:'',pf:'a',res:null,mode:null};let BTL=[];
QMN.push('MODO APOSTADO');QMS.push('Aleatorio ou formado \u2022 valendo gemas');QMC.push('#ffc83a');PVI.push(PVI[1]);
QMD.push({t:5,i:ic('gem'),n:'MODO APOSTADO',s:'Aleatorio ou formado \u2022 duelo 1x1 valendo gemas',tg:'Aposte gemas em um duelo 1x1. Quem vencer leva a aposta do outro',b:[[ic('gem'),'ALEATORIO: voce aposta e escolhe so o seu time - o inimigo e um bot sorteado quando a partida comeca'],[ic('swords'),'FORMADO: voce escolhe o time inimigo e o seu time'],[ic('user'),'Seu time pode ser voce jogando ou um bot jogando por voce']],tip:'Dica: se sair da partida no meio, a aposta e perdida'});
const qs0=qmSel;qmSel=function(t){if(t==5){$('modp').classList.add('hide');betOpen();return}return qs0.apply(this,arguments)};
const q2=qmR;qmR=function(){q2();const g=$('modg'),c=g&&g.children[5];if(c&&!c.querySelector('.mnv')){const n=document.createElement('span');n.className='mnv';n.textContent='NOVO';c.appendChild(n)}};
const bst=document.createElement('style');bst.textContent='#betp{position:fixed;inset:0;z-index:26;background:#000c;display:none;align-items:center;justify-content:center;padding:8px;box-sizing:border-box}#betp.on{display:flex}#betp .bx2{width:min(540px,100%);max-height:100%;overflow:auto;border-radius:18px;border:2px solid #ffc83a;background:radial-gradient(ellipse at 50% 0,#2f251f,#171311 75%);padding:10px 12px 12px;color:#fff;font-family:Trebuchet MS,Arial}#betp .hd{display:flex;align-items:center;gap:10px}#betp .hd h3{margin:0;font-size:19px;letter-spacing:1px;flex:1}#betp .hd small{color:#ffd96b;font-weight:900}#betp .x{width:36px;height:36px;border-radius:50%;border:2px solid #ffc83a;background:#1f1b19;color:#fff;font-weight:900}#betp .stt{font:800 11px Trebuchet MS;color:#7fcfdc;margin:4px 0}#betp .row{display:flex;gap:6px;flex-wrap:wrap;align-items:center;margin:7px 0 3px}#betp .row span{font:900 11px Trebuchet MS;color:#7fcfdc;letter-spacing:1px}#betp .row button{flex:1;min-width:58px;padding:8px 8px;border-radius:9px;border:2px solid #ffc83a88;background:#1f1b19;color:#fff;font:900 13px Trebuchet MS}#betp .row button.on{background:#ffc83a;color:#25211e;border-color:#fff}#betp input{width:100%;box-sizing:border-box;padding:9px 10px;border-radius:9px;border:2px solid #ffc83a88;background:#0e0d0c;color:#fff;font:800 15px Trebuchet MS}#betp .pkb{display:flex;flex-direction:column;align-items:flex-start;width:100%;padding:9px 12px;border-radius:11px;border:2px dashed #ffc83a99;background:#1f1b19;color:#fff;font:900 14px Trebuchet MS;margin-top:4px}#betp .pkb small{color:#7fcfdc;font-weight:700}#betp .sum{margin:8px 0;padding:8px 10px;border-radius:10px;background:#00000055;font:700 12.5px Trebuchet MS;line-height:1.5}#betp .sum b{color:#ffd96b}#betp .sum b.g{color:#7dff8a}#betp .sum b.r{color:#ff8a8a}#betp .go2{margin-top:8px}#betp .go2 button{width:100%;padding:13px;border-radius:12px;border:2px solid #141211;font:900 16px Trebuchet MS;color:#25211e;background:linear-gradient(#ffe27a,#ff6600);box-shadow:0 4px 0 #b54800}#betp .bl{display:flex;justify-content:space-between;align-items:center;width:100%;padding:9px 10px;margin:3px 0;border-radius:10px;border:1px solid #ffffff22;background:#1f1b19;color:#fff;font:900 13px Trebuchet MS;text-align:left}#betp .bl small{color:#7fcfdc;font-weight:700;margin-left:8px}#betp .res{text-align:center;padding:18px 8px;font:900 22px Trebuchet MS;border-radius:12px;margin:10px 0;background:#00000055}#betp .res.W{color:#7dff8a}#betp .res.L{color:#ff8a8a}#betp .res.D{color:#ffd96b}#betp .res small{display:block;font-size:13px;color:#e0f2ff;margin-top:6px}';document.head.appendChild(bst);
const bst2=document.createElement('style');bst2.textContent='#betp .mdc{display:flex;flex-direction:column;align-items:flex-start;gap:4px;width:100%;margin:10px 0;padding:14px 14px;border-radius:14px;border:2px solid #ffc83a;background:linear-gradient(135deg,#27201c,#1f1b19);color:#fff;font-family:Trebuchet MS,Arial;text-align:left}#betp .mdc b{font-size:20px;letter-spacing:2px;color:#ffd96b}#betp .mdc small{font-size:12px;color:#bcd9e0;font-weight:700;line-height:1.35}#betp .pkb.rnd{border-style:solid;cursor:default}';document.head.appendChild(bst2);
const P3=document.createElement('div');P3.id='betp';document.body.appendChild(P3);
const bAvail=(f,q,ex)=>{const Q=(q||'').toLowerCase();return bots().filter(e=>!ex.has(e.n)&&(f=='c'?!!e.c:f=='n'?!e.c:true)&&(!Q||lbl(e).toLowerCase().includes(Q)))};
const bChance=()=>{if(!BT.opp||!BT.proxy)return 0;return Math.round(100/(1+Math.exp(-(lvOf(BT.proxy)-lvOf(BT.opp))/14)))};
function betSum(){const a=BT.amt|0;return 'Voc\u00ea aposta <b>'+fmt(a)+'</b> \u2022 Adversario aposta <b>'+fmt(a)+'</b><br>Se ganhar: <b class="g">+'+fmt(a)+' gemas</b> \u2022 Se perder: <b class="r">-'+fmt(a)+'</b>'+(BT.me=='bot'&&!BT.live&&BT.opp&&BT.proxy?'<br>Chance do seu bot: <b>'+bChance()+'%</b>':'')}
function betPL(){const e=document.getElementById('betpl');if(!e)return;const ex=new Set();if(BT.opp)ex.add(BT.opp.n);if(BT.proxy)ex.add(BT.proxy.n);const r=bAvail(BT.pf,BT.pq,ex);BTL=r.slice(0,40);e.innerHTML=BTL.length?BTL.map((x,i)=>'<button class="bl" data-pick="'+i+'"><span>'+esc(lbl(x))+ytB(x.n)+'</span><small>'+inf(x)+(x.c?'':' \u2022 SEM CL\u00c3')+'</small></button>').join('')+(r.length>40?'<div style="text-align:center;color:#b8a064;font-size:11px;padding:4px">'+(r.length-40)+' a mais - use os filtros</div>':''):'<div style="color:#b8a064;padding:8px">Ningu\u00e9m encontrado</div>'}
function betR(){let h='';
if(BT.res){const r=BT.res;h='<div class="bx2"><div class="hd"><h3>RESULTADO DA APOSTA</h3><button class="x" data-rv="1">\u2715</button></div><div class="res '+r.r+'">'+r.m+'<small>'+r.d+'</small></div><div class="go2"><button data-rv="1">VOLTAR</button></div></div>';P3.innerHTML=h;return}
if(BT.pk){h='<div class="bx2"><div class="hd"><h3>'+(BT.pk=='opp'?'ESCOLHER TIME INIMIGO':'ESCOLHER SEU TIME')+'</h3><button class="x" data-back="1">\u2715</button></div><div class="row">'+[['a','TODOS'],['c','COM CL\u00c3'],['n','SEM CL\u00c3']].map(q=>'<button data-pf="'+q[0]+'"'+(BT.pf==q[0]?' class="on"':'')+'>'+q[1]+'</button>').join('')+'<button data-rand="1">ALEAT\u00d3RIO</button></div><div id="betpl"></div></div>';P3.innerHTML=h;betPL();return}
const H=bLoad(),w=H.filter(x=>x.r=='W').length,l=H.filter(x=>x.r=='L').length,net=H.reduce((a,x)=>a+(x.r=='W'?x.a:x.r=='L'?-x.a:0),0),o=BT.opp,px=BT.proxy;
if(!BT.mode){h='<div class="bx2"><div class="hd"><h3>MODO APOSTADO</h3><small>'+fmt(gems)+' GEMAS</small><button class="x" data-x="1">\u2715</button></div><div class="stt">'+w+' vit\u00f3rias \u2022 '+l+' derrotas \u2022 saldo '+(net>=0?'+':'')+fmt(net)+' gemas</div><button class="mdc" data-mode="rand"><b>ALEAT\u00d3RIO</b><small>Voc\u00ea aposta suas gemas e escolhe s\u00f3 o seu time. O inimigo \u00e9 um bot aleat\u00f3rio do jogo, sorteado quando a partida come\u00e7a.</small></button><button class="mdc" data-mode="form"><b>FORMADO</b><small>Voc\u00ea escolhe o time inimigo e o seu time.</small></button><button class="mdc" data-mode="online"><b>ONLINE • JOGADOR x JOGADOR</b><small>Duelo 1x1 valendo gemas contra outro jogador de verdade. Você entra na fila e é pareado com alguém que apostou o mesmo valor.</small></button></div>';P3.innerHTML=h;return}
h='<div class="bx2"><div class="hd"><h3>'+(BT.mode=='rand'?'ALEAT\u00d3RIO':'FORMADO')+' \u2022 1x1</h3><small>'+fmt(gems)+' GEMAS</small><button class="x" style="display:none" data-mode="">\u2039</button><button class="x" data-x="1">\u2715</button></div><div class="stt">'+w+' vit\u00f3rias \u2022 '+l+' derrotas \u2022 saldo '+(net>=0?'+':'')+fmt(net)+' gemas</div>'
+'<div class="row"><span>TIME INIMIGO</span></div>'+(BT.mode=='rand'?'<div class="pkb rnd"><b>SORTEADO NO IN\u00cdCIO</b><small>Um bot aleat\u00f3rio do jogo ser\u00e1 o seu inimigo</small></div>':'<button class="pkb" data-pk="opp">'+(o?'<b>'+esc(lbl(o))+'</b><small>'+inf(o)+'</small>':'<b>+ ESCOLHER TIME INIMIGO</b>')+'</button>')
+'<div class="row"><span>VALOR DA APOSTA (GEMAS)</span></div><div class="row">'+[50,100,250,500,1000].map(v=>'<button data-amt="'+v+'"'+(BT.amt==v?' class="on"':'')+'>'+v+'</button>').join('')+'<button data-amt="max">MAX</button></div><div class="row"><input id="betamt" type="number" min="10" inputmode="numeric" value="'+BT.amt+'"></div><div class="sum" id="betsum">'+betSum()+'</div>'
+'<div class="row"><span>FORMATO</span></div><div class="row">'+[[1,'1 ROUND'],[2,'MELHOR DE 3'],[3,'MELHOR DE 5']].map(q=>'<button data-rd="'+q[0]+'"'+(BT.rd==q[0]?' class="on"':'')+'>'+q[1]+'</button>').join('')+'</div>'
+'<div class="row"><span>SEU TIME</span></div><div class="row"><button data-me="me"'+(BT.me=='me'?' class="on"':'')+'>EU JOGO</button><button data-me="bot"'+(BT.me=='bot'?' class="on"':'')+'>BOT JOGA POR MIM</button></div>'
+(BT.me=='bot'?'<button class="pkb" data-pk="proxy">'+(px?'<b>'+esc(lbl(px))+'</b><small>'+inf(px)+'</small>':'<b>+ ESCOLHER O BOT DO SEU TIME</b>')+'</button><div class="row"><button data-live="1"'+(BT.live?' class="on"':'')+'>ASSISTIR AO VIVO</button><button data-live="0"'+(!BT.live?' class="on"':'')+'>RESULTADO R\u00c1PIDO</button></div>':'')
+'<div class="go2"><button data-go="1">APOSTAR E JOGAR</button></div></div>';P3.innerHTML=h}
function betOpen(){try{const o=JSON.parse(localStorage.getItem('arr_bet_open')||'null');if(o){localStorage.removeItem('arr_bet_open');const H=bLoad();H.push({r:'L',a:o.stake,o:o.opp,t:Date.now()});bSave(H);soon('Aposta anterior abandonada: -'+fmt(o.stake)+' gemas')}}catch(e){}
BT.pk=null;BT.res=null;BT.mode=null;betR();P3.classList.add('on')}
window.betOpen=betOpen;
function betPay(b,res){let net;if(res=='W'){gems+=b.stake*2;net=b.stake}else if(res=='D'){gems+=b.stake;net=0}else net=-b.stake;svG();try{$('gemv').textContent=fmt(gems)}catch(e){}try{localStorage.removeItem('arr_bet_open')}catch(e){}
const H=bLoad();H.push({r:res,a:b.stake,o:b.opp.n,t:Date.now()});bSave(H);const m=res=='W'?'VOCE GANHOU +'+fmt(b.stake)+' GEMAS':res=='D'?'EMPATE - aposta devolvida':'VOCE PERDEU -'+fmt(b.stake)+' GEMAS';soon(m);return m}
function betLaunch(){try{if(typeof LD!='undefined'&&LD.busy){soon('Aguarde o carregamento');return}}catch(e){}
const stake=BT.amt|0,rnd=BT.mode=='rand';if(!rnd&&!BT.opp){soon('Escolha o time inimigo');return}if(stake<10){soon('Aposta minima: 10 gemas');return}if(stake>gems){soon('Gemas insuficientes');return}
if(BT.me=='bot'&&!BT.proxy){soon('Escolha o bot do seu time');return}
let opp=BT.opp;if(rnd){const ex=new Set();if(BT.me=='bot'&&BT.proxy)ex.add(BT.proxy.n);const r=bAvail('a','',ex);if(!r.length){soon('Nenhum bot disponivel');return}opp=r[Math.random()*r.length|0]}
if(BT.me=='bot'&&BT.proxy.n===opp.n){soon('Escolha outro bot');return}
gems-=stake;svG();try{$('gemv').textContent=fmt(gems)}catch(e){}
const b={id:'B'+Date.now().toString(36),stake,opp:opp,proxy:BT.me=='bot'?BT.proxy:null,tgt:BT.rd,pending:1,paid:0,sub:BT.me=='bot'};
try{localStorage.setItem('arr_bet_open',JSON.stringify({id:b.id,stake,opp:b.opp.n}))}catch(e){}
if(b.sub&&!BT.live){const lp=lvOf(b.proxy),lo=lvOf(b.opp),p=1/(1+Math.exp(-(lp-lo)/14)),win=Math.random()<p,ls=Math.floor(Math.random()*b.tgt),sc=win?[b.tgt,ls]:[ls,b.tgt];b.paid=1;const m=betPay(b,win?'W':'L');BT.res={r:win?'W':'L',m:m,d:lbl(b.proxy)+' '+sc[0]+' x '+sc[1]+' '+lbl(b.opp)+' \u2022 chance '+Math.round(p*100)+'%'};betR();return}
window.__BET=b;b.restore={oldL:SALA.L,oldW:SALA.w,oldN:SALA.n,oldTB:TB};
SALA.L={me:b.sub?'S':'A',A:b.sub?[b.proxy]:[],B:[b.opp],id:'APOSTA',go:1,lbl:'1x1',pk:null,pq:'',pf:'a'};SALA.w=b.sub?1:0;SALA.n=1;TB=4;
P3.classList.remove('on');$('modp').classList.add('hide');startL()}
P3.oninput=e=>{const t=e.target;if(t.id=='betq'){BT.pq=t.value;betPL()}else if(t.id=='betamt'){BT.amt=Math.max(0,Math.floor(+t.value||0));const q=document.getElementById('betsum');if(q)q.innerHTML=betSum();for(const x of P3.querySelectorAll('[data-amt]'))x.classList.toggle('on',+x.dataset.amt==BT.amt)}};
P3.onclick=e=>{const t=e.target.closest('[data-x],[data-back],[data-mode],[data-pk],[data-pf],[data-pick],[data-rand],[data-amt],[data-rd],[data-me],[data-live],[data-go],[data-rv]');if(!t)return;const d=t.dataset;
if(d.x!==undefined){P3.classList.remove('on');return}
if(d.rv!==undefined){BT.res=null}
else if(d.back!==undefined){BT.pk=null}
else if(d.pk){BT.pk=d.pk;BT.pq='';BT.pf='a'}
else if(d.pf){BT.pf=d.pf;betR();return}
else if(d.pick!==undefined){const x=BTL[+d.pick];if(x){if(BT.pk=='opp')BT.opp=x;else BT.proxy=x}BT.pk=null}
else if(d.rand!==undefined){const ex=new Set();if(BT.opp)ex.add(BT.opp.n);if(BT.proxy)ex.add(BT.proxy.n);const r=bAvail(BT.pf,BT.pq,ex);if(r.length){const x=r[Math.random()*r.length|0];if(BT.pk=='opp')BT.opp=x;else BT.proxy=x}BT.pk=null}
else if(d.amt){BT.amt=d.amt=='max'?Math.max(0,gems|0):+d.amt}
else if(d.rd){BT.rd=+d.rd}
else if(d.me){BT.me=d.me}
else if(d.live!==undefined){BT.live=+d.live}
else if(d.mode!==undefined){BT.mode=d.mode||null;BT.pk=null}
else if(d.go!==undefined){betLaunch();return}
betR()};
const sc0=startCS;startCS=function(room,N,sala){const b=window.__BET;if(!(b&&b.pending&&sala))return sc0.apply(this,arguments);b.pending=0;let r;try{r=sc0.apply(this,arguments)}catch(err){const q0=b.restore;SALA.L=q0.oldL;SALA.w=q0.oldW;SALA.n=q0.oldN;TB=q0.oldTB;b.paid=1;gems+=b.stake;svG();try{$('gemv').textContent=fmt(gems);localStorage.removeItem('arr_bet_open')}catch(e){}throw err}
const q=b.restore;SALA.L=q.oldL;SALA.w=q.oldW;SALA.n=q.oldN;TB=q.oldTB;try{mref()}catch(e){}G.bet=b;G.cs.tgt=b.tgt;soon('APOSTA: '+fmt(b.stake)+' gemas contra '+lbl(b.opp));return r};
try{if(typeof LD!='undefined'&&LD&&LD.open){const lo=LD.open;LD.open=function(a,c){const bt=window.__BET;if(bt&&bt.pending)return lo.call(this,'MODO APOSTADO \u2022 '+fmt(bt.stake)+' GEMAS',(bt.lbl||'1x1')+' \u2022 vs '+bt.opp.n+' \u2022 melhor de '+(bt.tgt*2-1));return lo.apply(this,arguments)}}}catch(e){}
function betEnd(){const g=G;if(!g||!g.bet||g.bet.paid||!g.cs)return;const b=g.bet,c=g.cs,d=c.sc[0]-c.sc[1],res=d>0?'W':d<0?'L':(c.over?'D':'L');b.paid=1;const m=betPay(b,res);try{$('est').textContent+='   \u2022 APOSTA: '+m}catch(e){}}
const fb0=finish2;finish2=function(){const r=fb0.apply(this,arguments);try{betEnd()}catch(e){console.error(e)}return r};

})();
