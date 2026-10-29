/* js-43-passe-vip-extras.js - MAIS ITENS EXCLUSIVOS DO PASSE VIP (tema: Sombras do Abismo)
   - 3 skins de arma e 2 paraquedas novos, adicionados no FIM das listas do js-42 (indices sk 9-11, pq 6-7).
   - Carrega DEPOIS do js-42 e ANTES do js-41. */
(function(){
var X=window.PASS_X;if(!X||X.__x2)return;X.__x2=1;
try{if(typeof SK==='undefined'||typeof PQ==='undefined')return}catch(e){return}
function addSk(n,ra,p,p2,b,fx,d){var o={n:n,ra:ra,pr:0,pass:1,p:p,p2:p2,b:b,m:12,d:d+' Exclusiva do Passe de Elite.'};if(fx)o.fx=fx;SK.push(o);X.sk.push(SK.length-1)}
addSk('Lamina Umbral',2,['#0a1230','#5ad0ff'],['#5ad0ff','#9a6bff','#ffffff'],'#5ad0ff',0,'Faiscas azul-gelo cortando a escuridao.');
addSk('Furia Carmesim',3,['#1a0508','#ff3b5c'],['#ff3b5c','#ffd23b','#ffffff'],'#ff3b5c','abyss','Segurando: energia do abismo orbitando a arma, com tiros carmesim.');
addSk('Senhor das Sombras',3,['#050309','#ffd23b'],['#b36bff','#ffd23b','#ffffff'],'#ffd23b','abyss','Preto absoluto com ouro e energia do abismo orbitando a arma.');
function addPq(n,ra,c,em,d){var o={n:n,ra:ra,pr:0,pass:1,c:c,d:d+' Exclusivo do Passe de Elite.'};if(em)o.em=em;PQ.push(o);X.pq.push(PQ.length-1)}
addPq('Asa Negra',2,['#0a0612','#9a4dff','#e0d0ff'],.2,'Preto profundo com listras violeta e brilho suave.');
addPq('Coroa Celeste',3,['#1a0f3d','#ffd23b','#ffffff'],.7,'Dossel dourado e violeta brilhando como uma coroa.');
})();
