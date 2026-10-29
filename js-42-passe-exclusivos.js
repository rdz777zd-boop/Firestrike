/* js-42-passe-exclusivos.js - ITENS EXCLUSIVOS DO PASSE DE ELITE (tema: Sombras do Abismo)
   - 9 skins de arma, 6 paraquedas e 5 rastros NOVOS que so existem no passe (nao aparecem na loja e nao se compram).
   - 1 traje NOVO "Soberano do Abismo" (VIP nivel 30): armadura obsidiana roxa com ouro, coroa de chifres de cristal,
     mascara de sombras com runas, capa rasgada, asas das trevas batendo, ombreiras com espinhos, orbes girando,
     halo de eclipse atras da cabeca, circulo de runas girando no chao e brasas subindo.
   - O traje so aparece no menu PERSONAGENS depois de resgatado no passe; bots nunca usam.
   - A ordem dos itens abaixo e usada pelo js-41 (PI('sk',0) = 1a skin, etc). Nao mude a ordem. Novos itens: so no FIM de cada lista.
   - Este arquivo precisa carregar ANTES do js-41 e DEPOIS do js-04. */
(function(){
if(window.PASS_X)return;
try{if(typeof SK==='undefined'||typeof PQ==='undefined'||typeof RS==='undefined'||typeof TRAJES==='undefined'||typeof THREE==='undefined')return}catch(e){return}
var ID='abismo',KT='arr_tjown';
var X=window.PASS_X={sk:[],pq:[],rs:[],tj:ID};

/* ---------- 1) skins de arma exclusivas ---------- */
try{if(typeof MFX!=='undefined'&&!MFX.abyss)MFX.abyss={c:['#b57bff','#ffd23b','#ffffff'],m:'orbit',n:11,s:2.8}}catch(e){}
function addSk(n,ra,p,p2,b,fx,d){var o={n:n,ra:ra,pr:0,pass:1,p:p,p2:p2,b:b,m:12,d:d+' Exclusiva do Passe de Elite.'};if(fx)o.fx=fx;SK.push(o);X.sk.push(SK.length-1)}
addSk('Penumbra',1,['#241446','#9a6bff'],['#7a4aff','#b57bff','#ffffff'],'#9a6bff',0,'Fumaca violeta nos tiros.');
addSk('Veu Ametista',1,['#3a1a80','#d9a8ff'],['#d9a8ff','#9a4dff','#ffffff'],'#d9a8ff',0,'Cristais de ametista nos tiros.');
addSk('Eclipse Dourado',2,['#150b24','#ffd23b'],['#ffd23b','#fff3a0','#9a4dff'],'#ffd23b',0,'Brilho dourado sobre o roxo da noite.');
addSk('Aurora Sombria',2,['#1a0a38','#ff7ad9'],['#ff7ad9','#b36bff','#ffffff'],'#ff7ad9',0,'Rastro rosa e violeta nos tiros.');
addSk('Cacador de Almas',2,['#0e0820','#7dffb0'],['#7dffb0','#b36bff','#ffffff'],'#7dffb0',0,'Almas verdes escapando dos tiros.');
addSk('Rubi Abissal',2,['#2a0a1a','#ff4a7a'],['#ff4a7a','#9a4dff','#ffd2e0'],'#ff4a7a',0,'Faiscas de rubi nos tiros.');
addSk('Coroa Sombria',3,['#120a24','#ffd23b'],['#ffd23b','#b36bff','#ffffff'],'#ffd23b','abyss','Segurando: cristais de sombra e ouro orbitando a arma.');
addSk('Olho do Abismo',3,['#07030d','#b36bff'],['#b36bff','#e0b0ff','#ffd23b'],'#b36bff','abyss','Segurando: orbes violeta orbitando a arma.');
addSk('Trono Sombrio',3,['#0b0614','#ffd23b'],['#9a4dff','#ffd23b','#ffffff'],'#9a4dff','abyss','Preto e dourado com energia do abismo orbitando a arma.');

/* ---------- 2) paraquedas exclusivos ---------- */
function addPq(n,ra,c,em,d){var o={n:n,ra:ra,pr:0,pass:1,c:c,d:d+' Exclusivo do Passe de Elite.'};if(em)o.em=em;PQ.push(o);X.pq.push(PQ.length-1)}
addPq('Veu da Noite',1,['#2a1458','#b57bff','#e0d0ff'],0,'Roxo noturno com listras claras.');
addPq('Manto Ametista',1,['#5a2fb0','#d9a8ff','#f3e7ff'],0,'Ametista com detalhes lilas.');
addPq('Lua Dourada',2,['#1d0f3d','#ffd23b','#fff3a0'],.25,'Noite profunda com listras de ouro.');
addPq('Corvo Sombrio',2,['#0e0820','#7a4aff','#c9b8ff'],0,'Preto de corvo com listras violeta.');
addPq('Portal do Abismo',3,['#150b24','#9a4dff','#ffd23b'],.5,'Brilha como um portal roxo e dourado.');
addPq('Eclipse Real',3,['#07030d','#ffd23b','#b36bff'],.6,'Dossel de eclipse com brilho real.');

/* ---------- 3) rastros exclusivos ---------- */
function addRs(n,ra,o,d){o.n=n;o.ra=ra;o.pr=0;o.pass=1;o.d=d+' Exclusivo do Passe de Elite.';RS.push(o);X.rs.push(RS.length-1)}
addRs('Nevoa Abissal',1,{c:['#7a4aff','#b57bff','#4a1a9a'],sz:13,lf:1.7,rt:34,sp:16,vy:-4},'Nevoa roxa escura.');
addRs('Almas Perdidas',2,{c:['#d9a8ff','#ffffff','#9a4dff'],sz:9,lf:1.6,rt:38,sp:28,vy:12},'Almas subindo atras de voce.');
addRs('Brasas Sombrias',2,{c:['#ffd23b','#9a4dff','#2a0f4a'],sz:10,lf:1.5,rt:40,sp:30,vy:16},'Brasas douradas e violeta.');
addRs('Raios Violeta',3,{c:['#fff27a','#b36bff','#ffffff'],sz:8,lf:1,rt:50,sp:40,vy:0,sh:'long',spin:1},'Raios girando no ar.');
addRs('Estrelas do Abismo',3,{c:['#ffd23b','#ffffff','#b36bff'],sz:9,lf:1.8,rt:40,sp:34,vy:-8,sh:'long',spin:1},'Estrelas cadentes douradas.');

/* ---------- 4) fora da loja (so aparecem la depois de resgatados) ---------- */
if(typeof shItems==='function'&&typeof shOwn==='function'&&!shItems.__pass){
 var si0=shItems;
 shItems=function(t){var a=si0.apply(this,arguments);return a.filter(function(o){return !(o.k&&o.k.pass)||shOwn(t,o.i)})};
 shItems.__pass=1}

/* ---------- 5) traje exclusivo: dono, menu e bots ---------- */
function own(){
 try{var a=JSON.parse(localStorage.getItem(KT)||'[]');if(a.indexOf(ID)>=0)return true}catch(e){}
 try{var c=JSON.parse(localStorage.getItem('arr_pecl')||'{}');if(c&&c.v30)return true}catch(e){}
 return false}
function give(id){
 try{var a=JSON.parse(localStorage.getItem(KT)||'[]');if(a.indexOf(id)<0){a.push(id);localStorage.setItem(KT,JSON.stringify(a))}}catch(e){}
 try{if(typeof chR==='function')chR()}catch(e){}}
TRAJES.push({id:ID,n:'Soberano do Abismo',pass:1,d:'Traje exclusivo do Passe de Elite (nivel 30 VIP). Armadura de obsidiana roxa com detalhes dourados, coroa de chifres de cristal, mascara de sombras com runas brilhando, capa rasgada ao vento, asas das trevas batendo, ombreiras com espinhos, orbes de sombra girando, halo de eclipse atras da cabeca, circulo de runas girando no chao e brasas subindo. Mantem os olhos e a cor de pele do personagem.'});
try{TJC[ID]={sh:'#1a0d38',lc:'#120a2a'}}catch(e){}
if(typeof chR0==='function'&&!chR0.__pe){
 var c0=chR0;
 chR0=function(){var i=-1,rm=null;
  try{if(!own()){i=TRAJES.findIndex(function(k){return k.id===ID});if(i>=0)rm=TRAJES.splice(i,1)[0]}}catch(e){}
  try{return c0.apply(this,arguments)}finally{if(rm)TRAJES.splice(i,0,rm)}};
 chR0.__pe=1}
if(typeof trajeBot==='function'&&!trajeBot.__pe){
 var tb0=trajeBot;
 trajeBot=function(f){var r=tb0.apply(this,arguments);return r===ID?'':r};
 trajeBot.__pe=1}

/* ---------- 6) visual do traje: Soberano do Abismo ---------- */
function build(f,g0){
 var g=f.bg;if(!g||!f.a1||!f.a2||!f.l1||!f.l2)return;
 var K='#120a24',K2='#1d0f3d',V='#4a1a9a',V2='#6a3ad0',L='#b57bff',LL='#e0d0ff',GD='#ffd23b',GD2='#d4a52a',MC={};
 var M=function(c){if(MC[c])return MC[c];var m=mat(c,{map:NZT()});f.ms.push(m);MC[c]=m;return m};
 var P=function(w,h,d,m,x,y,z){var o=new THREE.Mesh(BG,m);o.scale.set(w,h,d);o.position.set(x,y,z);return o};
 var GL=function(c){return fxMat(c)};
 var reg=function(o,k,p){try{trajeReg(o,k,p)}catch(e){}};
 var pm=function(c,ph){var m=new THREE.MeshBasicMaterial({color:c,transparent:true,opacity:.9});reg(m,'pulse',{ph:ph||0});return m};
 var rot=function(o,x,y,z){o.rotation.set(x||0,y||0,z||0);return o};
 var i,s;

 /* capa rasgada nas costas */
 var cape=new THREE.Group();cape.position.set(0,44,-6.6);g.add(cape);
 cape.add(P(21,32,1.5,M(K2),0,-16,0),P(18.6,29,.6,M(V),0,-15.6,.9),P(1,28,.5,GL(L),0,-15,-.9));
 cape.add(rot(P(4.6,4.6,.5,GL(GD),0,-11,-.9),0,0,.785),rot(P(3,3,.5,GL(L),0,-20,-.9),0,0,.785));
 cape.add(P(1.2,32,1.7,M(GD2),-10.2,-16,0),P(1.2,32,1.7,M(GD2),10.2,-16,0),P(21,1.4,1.7,M(GD2),0,-.6,0));
 for(i=0;i<6;i++){var len=5+((i*5)%3)*2.4,st=P(3.2,len,1.5,M(i%2?K:K2),-8.4+i*3.36,-31-len/2,0);cape.add(st);reg(st,'sway',{ph:i*.9,a:.1})}
 reg(cape,'flap',{ph:0,b:.07,a:.05});

 /* asas das trevas (batem devagar) */
 [-1,1].forEach(function(sd){
  var w=new THREE.Group();w.position.set(sd*4,41,-9);w.rotation.y=sd*.5;g.add(w);
  var wi=new THREE.Group();w.add(wi);
  var LN=[24,22,19,15,10];
  wi.add(rot(P(21,2,1.6,M(K),sd*10.5,5.6,0),0,0,sd*.14));
  for(var j=0;j<5;j++){var y=3.2-j*4.4,cx=sd*(2+LN[j]/2);
   wi.add(P(LN[j],3.4,.9,M(j%2?K:K2),cx,y,0),P(LN[j]-1,.55,.5,GL(L),cx,y+1.75,.3),P(1.8,3.6,1,GL(GD),sd*(2+LN[j]),y,0))}
  wi.add(P(3.4,3.4,2.4,GL(L),sd*2.5,4,0));
  reg(wi,'sway',{ph:sd<0?Math.PI:0,a:.3})});

 /* peitoral de obsidiana com ouro, gema e runas */
 g.add(P(23.4,15,12.6,M(K2),0,35.5,0),P(23.8,1.8,12.9,M(GD2),0,43.3,0),P(23.8,1.4,12.9,M(GD2),0,28.3,0));
 g.add(P(1,15,12.9,M(GD2),-11.2,35.5,0),P(1,15,12.9,M(GD2),11.2,35.5,0));
 g.add(rot(P(7.4,7.4,.9,M(GD2),0,37.5,6.4),0,0,.785),rot(P(4.2,4.2,1,pm(L,0),0,37.5,6.8),0,0,.785));
 g.add(rot(P(5,.7,.5,GL(L),-6,40,6.4),0,0,.35),rot(P(5,.7,.5,GL(L),6,40,6.4),0,0,-.35),rot(P(5,.7,.5,GL(L),-6,34.8,6.4),0,0,-.35),rot(P(5,.7,.5,GL(L),6,34.8,6.4),0,0,.35));
 g.add(P(23.4,3,12.4,M(K),0,24.4,0),P(5.6,4.4,1,M(GD),0,24.4,6.4),rot(P(2.2,2.2,.8,GL(L),0,24.4,6.9),0,0,.785));

 /* ombreiras com espinhos + braceletes */
 [[f.a1,-1],[f.a2,1]].forEach(function(q){var a=q[0],sd=q[1];
  a.add(P(13.4,4.4,13.8,M(K2),0,1.4,0),P(13.8,1.2,14.2,M(GD2),0,-1,0),P(10.6,2.6,11,M(K),sd*.6,4.4,0));
  a.add(rot(P(2.8,9,2.8,M(V2),sd*3.6,9,0),0,0,-sd*.4),rot(P(2,6,2,GL(L),sd*6.2,6.4,0),0,0,-sd*.8),P(3,3,1,GL(GD),0,2,7.2));
  a.add(P(11.8,7,12.2,M(K2),0,-14,0),P(12.2,1.4,12.6,M(GD2),0,-10.6,0),P(4.4,.8,.6,GL(L),0,-14,6.2));
  a.add(P(11.4,4.4,11.8,M(K),0,-20.2,0),P(11.8,1.2,12.2,M(GD2),0,-18.2,0))});

 /* pernas: coxote, joelheira com gema, canela e bota */
 [f.l1,f.l2].forEach(function(l){
  l.add(P(11.2,8,12,M(K2),0,-5,0),P(11.6,1.2,12.4,M(GD2),0,-9.4,0),P(9.8,4.4,2.2,M(V2),0,-11,6.8),rot(P(2.2,2.2,.6,GL(L),0,-11,8),0,0,.785));
  l.add(P(11.2,6.4,12,M(K2),0,-14.6,0),P(11.6,1.2,12.4,M(GD2),0,-17.6,0),P(11.6,4.4,13.8,M(K),0,-19.8,.9),P(11.8,1.2,3,GL(GD),0,-20.4,7.4))});

 /* cabeca: aro dourado com gema, coroa de espinhos, chifres de cristal, mascara e placas */
 g.add(P(17.6,2.2,17.6,M(GD2),0,58.9,0),rot(P(3,3,1,pm(L,1),0,58.9,9),0,0,.785));
 [[0,8,7.2],[-5.6,5.6,7.2],[5.6,5.6,7.2],[-7.4,4.8,0],[7.4,4.8,0],[0,8,-7.2],[-5.6,5.6,-7.2],[5.6,5.6,-7.2]].forEach(function(c){g.add(P(2,c[1],2,M(GD),c[0],59.8+c[1]/2,c[2]))});
 [-1,1].forEach(function(sd){
  [[3.6,6.4,6.6,63.4,.28],[3,6.4,9.1,68.4,.55],[2.2,5.6,12,73,.85],[1.4,4.4,15,76.4,1.15]].forEach(function(h,j){
   g.add(rot(P(h[0],h[1],h[0],j===3?GL(L):M(j%2?V:V2),sd*h[2],h[3],0),0,0,-sd*h[4]))});
  g.add(P(4.2,2,4.2,M(GD2),sd*6,60.6,0))});
 g.add(P(16.6,6.2,.9,M(K),0,46.9,8.1),P(16.6,.8,.9,M(GD2),0,50.2,8.1),P(11,.6,.4,GL(L),0,47.9,8.65),P(1,2.4,.4,GL(LL),-2.6,46,8.65),P(1,2.4,.4,GL(LL),2.6,46,8.65));
 [-1,1].forEach(function(sd){g.add(P(1.2,7.4,10.6,M(K2),sd*8.5,47.6,-1.4),P(1.3,.7,10.8,M(GD2),sd*8.5,51.2,-1.4),P(1.4,.5,6,GL(L),sd*8.6,48.6,-1.4))});
 g.add(P(17,9,1.6,M(K2),0,55.5,-8.6),P(12,.6,.4,GL(L),0,57.5,-9.5),P(9,.6,.4,GL(L),0,54,-9.5));

 /* halo de eclipse atras da cabeca */
 var hl=new THREE.Group();hl.position.set(0,57,-12.4);g.add(hl);
 hl.add(new THREE.Mesh(new THREE.CircleGeometry(12.5,32),new THREE.MeshBasicMaterial({color:'#0a0614',side:THREE.DoubleSide})));
 var r1=new THREE.Mesh(new THREE.TorusGeometry(12.6,.7,6,36),GL(GD));r1.position.z=.4;hl.add(r1);
 var r2=new THREE.Mesh(new THREE.TorusGeometry(15,.4,6,36),pm(L,2));r2.position.z=.2;hl.add(r2);
 var tk=new THREE.Group();hl.add(tk);
 for(i=0;i<12;i++){var an=i/12*6.2832;tk.add(rot(P(1.2,i%3?2.2:3.6,.6,GL(i%3?L:GD),Math.cos(an)*17.6,Math.sin(an)*17.6,.2),0,0,an-1.5708))}
 reg(tk,'sway',{ph:0,a:.5});

 /* cristais girando em volta da cabeca e orbes de sombra em volta do corpo */
 var ob=new THREE.Group();ob.position.set(0,57,0);g.add(ob);
 for(i=0;i<4;i++){var a4=i*1.5708;ob.add(rot(P(2.4,4.6,2.4,GL(i%2?L:LL),Math.cos(a4)*15.5,Math.sin(i*2)*2,Math.sin(a4)*15.5),.5,i,.6))}
 reg(ob,'spin',{a:1.3});
 var bo=new THREE.Group();bo.position.set(0,30,0);g.add(bo);
 for(i=0;i<3;i++){var a3=i*2.0944,orb=new THREE.Group();orb.position.set(Math.cos(a3)*22,Math.sin(i*2.3)*3,Math.sin(a3)*22);
  orb.add(P(2.6,2.6,2.6,GL(LL),0,0,0),P(5.2,5.2,5.2,pm('#6a3ad0',i),0,0,0),P(1.6,1.6,1.6,GL(GD),2.8,2.8,0));bo.add(orb)}
 reg(bo,'spin',{a:-.9});

 /* brasas e almas subindo */
 for(i=0;i<10;i++){var aw=i*2.4,rd=12+(i%3)*4,sz=1.4+(i%3)*.6,wm=new THREE.MeshBasicMaterial({color:i%3?L:GD,transparent:true,opacity:.4,depthWrite:false}),wo=P(sz,sz*1.6,sz,wm,Math.cos(aw)*rd,6,Math.sin(aw)*rd);g.add(wo);reg(wo,'rise',{ph:i*.1,y0:4+(i%4)*3,r:42})}

 /* circulo de runas girando no chao */
 var gc=new THREE.Group();gc.position.set(0,.9,0);g0.add(gc);
 var c1=new THREE.Mesh(new THREE.TorusGeometry(22,.55,6,44),pm(L,0));c1.rotation.x=Math.PI/2;gc.add(c1);
 var c2=new THREE.Mesh(new THREE.TorusGeometry(15.5,.4,6,36),GL(GD));c2.rotation.x=Math.PI/2;gc.add(c2);
 var rt=new THREE.Group();gc.add(rt);
 for(i=0;i<8;i++){var ar=i/8*6.2832,tb=P(2.2,.5,6,GL(i%2?GD:L),Math.cos(ar)*18.8,0,Math.sin(ar)*18.8);tb.rotation.y=1.5708-ar;rt.add(tb)}
 reg(rt,'spin',{a:.8})}

if(typeof mkMesh==='function'&&!mkMesh.__pe){
 var mk0=mkMesh;
 mkMesh=function(f){var m=mk0.apply(this,arguments);try{if(f&&f.skn===ID)build(f,m)}catch(e){}return m};
 mkMesh.__pe=1}

/* ---------- 7) icone do traje no passe + api ---------- */
window.PE_TJ={id:ID,name:'SOBERANO DO ABISMO',own:own,give:give,
 icon:function(){try{return chCvSafe(0,.8,ID)}catch(e){try{return chCv2(0,.8)}catch(e2){return null}}}};
})();
