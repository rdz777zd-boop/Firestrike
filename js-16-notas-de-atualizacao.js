
/* ===== NOTAS DE ATUALIZAÇÃO (aparecem em AVISOS) =====
   COMO USAR: a cada mudança no jogo, adicione UMA entrada NO TOPO da lista ARR_NOTAS
   com v = número seguinte. Todo jogador recebe um aviso novo em AVISOS automaticamente.
   Tipos: NOVO, CORRIGIDO, MELHORADO, REMOVIDO. */
var ARR_NOTAS=[
 {v:164,d:'30/10/2026',t:'Itens brilham no chão e nova queda de paraquedas',i:[
  ['MELHORADO','<b>Itens no chão brilham</b> conforme a raridade: branco (comum), verde (incomum), azul (raro), roxo (épico) e dourado (lendário/armas douradas), com coluna de luz para os melhores. As caixas de quem foi abatido também brilham. A forma de pegar continua igual.'],
  ['NOVO','<b>Mergulho no pulo do avião.</b> Empurre o direcional até o fim (ou segure Shift/Espaço no teclado) para MERGULHAR e cair bem mais rápido; solte para PLANAR e ir mais longe. O mergulho desacelera perto da altura de abrir o paraquedas.'],
  ['NOVO','<b>Paraquedas refeito:</b> só aparece depois de aberto, com animação de abertura (saco, enche de ar, balança) e copa maior. Um painel no topo mostra a altura, se está em queda livre, mergulhando ou com o paraquedas aberto.'],
  ['MELHORADO','<b>Queda livre com pose nova</b> (braços abertos e postura de mergulho), vento mais visível e câmera que abre um pouco o ângulo durante o mergulho.']]},
 {v:163,d:'30/10/2026',t:'Fuzis e snipers atiram bem mais longe',i:[
  ['MELHORADO','<b>Alcance das balas bem maior.</b> Fuzis (AK-47, M4A1, SCAR, Famas, LMG e outros) alcançam 80% mais longe, e snipers (Sniper, DMR, AWM, Barrett, Besta) mais que o dobro, inclusive as versões Ouro. Pistolas, submetralhadoras, escopetas e explosivos não mudaram. Os bots também atiram de mais longe com essas armas.']]},
 {v:162,d:'30/10/2026',t:'Músicas novas, gráficos melhores e ajustes do Contra Squad',i:[
  ['MELHORADO','<b>Gráficos melhores.</b> Qualidade ALTA por padrão (quem já escolheu uma qualidade nos ajustes continua com a dele), cores mais vivas e uma vinheta suave nas bordas durante a partida. Se o celular não aguentar, a resolução baixa sozinha.'],
  ['NOVO','<b>Músicas diferentes no jogo.</b> O lobby agora tem 4 músicas que se alternam sozinhas, e as partidas têm trilha própria (Battle Royale, Contra Squad e Halloween City). A trilha da partida fica baixinha para não cobrir tiros e passos. Dá para desligar no botão de música dos ajustes.'],
  ['CORRIGIDO','<b>Contra Squad e modos parecidos:</b> todo round começa com exatamente 1000 moedas.'],
  ['CORRIGIDO','<b>A SMG não vem mais de graça</b> na Sala: você começa só com a pistola e compra a SMG.']]},
 {v:161,d:'28/10/2026',t:'Contra Squad e Sala online com amigos',i:[
  ['CORRIGIDO','<b>Contra Squad com amigos agora \u00e9 na mesma partida.</b> Antes cada um entrava numa partida separada, s\u00f3 contra bots. Agora quem convidou e quem foi convidado jogam juntos: mesmo mapa, mesmos rounds, mesmo placar. O dono da equipe decide as fases (compra, luta, fim do round).'],
  ['CORRIGIDO','<b>Sala (2x2 ou mais) com amigos</b> tamb\u00e9m entra na mesma partida.'],
  ['CORRIGIDO','<b>Vit\u00f3ria e derrota no Contra Squad</b> agora contam para o seu time (quem joga no time 2 via sempre DERROTA).'],
  ['CORRIGIDO','<b>Halloween City com amigos na equipe</b> avisa que ainda \u00e9 solo, em vez de abrir uma partida separada para cada um.']]},
 {v:160,d:'28/10/2026',t:'Comando /online',i:[
  ['NOVO','<b>Comando do dono: /online</b> lista os jogadores online (no lobby ou em partida) com o ID verdadeiro de cada um. Use o ID com /verificar, /banir e /desbanir.']]},
 {v:159,d:'28/10/2026',t:'Anti-trapaça no multiplayer e correção do /verificar',i:[
  ['CORRIGIDO','<b>Parede de gelo agora aparece para todos</b> na partida online. Antes ela só existia na tela de quem jogou, e os tiros atravessavam.'],
  ['CORRIGIDO','<b>Acertos validados pelo dono da sala:</b> tiro através de parede ou gelo, fora do alcance da arma ou vindo de dentro de uma parede não dá mais dano.'],
  ['CORRIGIDO','<b>Jogador dentro de parede (noclip)</b> não se move mais para dentro dela e não consegue atirar de lá.'],
  ['CORRIGIDO','<b>Comando /verificar</b> volta a achar jogadores cujo ID não estava registrado ou cujo nick tem ponto ou hífen. O jogador precisa abrir o jogo uma vez.']]},
 {v:158,d:'28/10/2026',t:'Nova tela de atualização',i:[
  ['NOVO','<b>Tela ATUALIZANDO...</b> com barra de progresso. Quando sai uma versão nova, o jogo baixa os arquivos, a barra enche até 100% e só então reinicia. O contador de segundos saiu.']]},
 {v:157,d:'28/10/2026',t:'Oni de Sangue',i:[
  ['NOVO','<b>SPAS Oni de Sangue</b> e <b>traje Oni de Sangue</b>: as skins Oni de Gelo agora são de sangue. Arma, tiros, efeito de eliminação, armadura, chifres, cabelo e capa em vermelho-sangue.']]},
 {v:156,d:'27/10/2026',t:'Emblema no cartão e menu Personagens',i:[
  ['NOVO','<b>Emblema no cartão do menu.</b> Seu nome aparece com o emblema ao lado (dono ou verificado) e a cor do nome muda conforme o emblema.'],
  ['CORRIGIDO','<b>Menu de Personagens</b> não fica mais em tela preta.'],
  ['NOVO','<b>BR Ranqueado com tema de Halloween.</b> Entardecer roxo e laranja (mais claro), casas de bruxa com chapéu pontudo, lua, morcegos, abóboras e lápides. Mapa e efeitos mais leves (menos árvores, arbustos e pedras, resolução limitada).'],
  ['CORRIGIDO','<b>Paraquedas</b> não atravessa mais o teto e as paredes das casas: você cai ao lado delas.'],
  ['CORRIGIDO','<b>Foto e banner dos outros jogadores</b> agora são enviados separados do perfil (o servidor recusava por tamanho). Cada jogador precisa abrir esta versão uma vez para enviar a sua. Exige o Worker atualizado. Ao trocar a foto ou o banner, os outros veem a mudança em até ~10s (com o menu aberto), sem fechar o jogo. Worker atualizado de novo.']]},
 {v:155,d:'27/10/2026',t:'Cartão do menu, banimento e nova tela de notas',i:[
  ['NOVO','<b>Cartão do jogador no menu</b> agora mostra [TAG] do clã, o nome e o emblema. O emblema muda a cor do nome.'],
  ['NOVO','<b>Comandos do dono:</b> /banir ID motivo, /desbanir ID e /banidos.'],
  ['MELHORADO','<b>Nova tela de notas de atualização</b>, com lista de versões e botão X.'],
  ['CORRIGIDO','<b>Foto de perfil e banner dos outros jogadores:</b> imagens menores e mais confiáveis para enviar ao servidor. Cada jogador precisa abrir o jogo uma vez para reenviar as suas.']]},
 {v:154,d:'27/10/2026',t:'Selo corrigido, chat em janela e comando de clã',i:[
  ['CORRIGIDO','<b>Selo VERIFICADO e cor do nome</b> agora aparecem no seu perfil logo após coletar (antes o nome não casava com o nick).'],
  ['MELHORADO','<b>Chat global em janela pequena</b> com botão X para fechar, e histórico que rola.'],
  ['NOVO','<b>Comandos do dono:</b> /clas lista os clãs e /desfazercla TAG desfaz um clã. Os membros saem automaticamente.']]},
 {v:153,d:'27/10/2026',t:'Verificado por coleta + avisos',i:[
  ['NOVO','<b>Selo VERIFICADO agora é entregue em AVISOS.</b> Quando o dono concede, o jogador recebe um aviso e precisa tocar em COLETAR para ativar o selo.'],
  ['NOVO','<b>Notas de atualização em AVISOS.</b> Cada versão nova gera um aviso com botão LER. O botão flutuante NOVIDADES saiu.'],
  ['CORRIGIDO','<b>Botão que ficava em cima do menu.</b> Removido da barra superior.'],
  ['CORRIGIDO','<b>Comando /verificar</b> não dá mais "Falha ao salvar" quando o servidor bloqueia o caminho principal.']]},
 {v:152,d:'',t:'Versão LITE',i:[
  ['NOVO','<b>Atualização automática.</b> Quando uma versão nova do jogo for publicada, ele detecta sozinho e recarrega. Se você estiver em partida, espera terminar.'],
  ['MELHORADO','<b>Gravação de replay desligada.</b> Ela gravava a partida inteira em vídeo e era a maior causa de lag.'],
  ['MELHORADO','<b>Qualidade gráfica otimizada.</b> Resolução, distância de visão e partículas reduzidas nos 3 níveis.'],
  ['MELHORADO','<b>HUD, menus e carregamento mais leves.</b> Sem brilhos pesados, sem desfoque de fundo e com imagens menores.'],
  ['REMOVIDO','Botão e cartão de <b>Replay</b> na tela de resultado.']]}
];
(function(){
 var K='arr_cl_seen',n=document.getElementById('upn'),bd=document.getElementById('upbd'),vt=document.getElementById('upv');
 var COR={NOVO:'#00ff88',CORRIGIDO:'#4db8ff',MELHORADO:'#ffc400',REMOVIDO:'#ff6b6b'};
 function esc(t){return String(t).replace(/[&<>]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;'}[c]})}
 function render(v){
  var e=ARR_NOTAS.filter(function(x){return x.v===v})[0]||ARR_NOTAS[0];if(!e)return;
  vt.textContent='VERSÃO '+e.v+(e.d?' · '+e.d:'');document.getElementById('upt').textContent=e.t;
  var h='';e.i.forEach(function(it){h+='<div class="it" style="--c:'+(COR[it[0]]||'#00ff88')+'"><em>'+it[0]+'</em><br>'+it[1]+'</div>'});
  bd.innerHTML=h;bd.scrollTop=0;
  var L=document.getElementById('upl');L.innerHTML='';
  ARR_NOTAS.forEach(function(x){var b=document.createElement('button');b.type='button';b.className=x.v===e.v?'on':'';b.innerHTML='<b>v'+x.v+'</b><small>'+esc(x.t)+'</small>';b.onclick=function(){render(x.v)};L.appendChild(b)})
 }
 function open(v){render(v);n.classList.remove('hide')}
 function close(){n.classList.add('hide')}
 document.getElementById('upok').onclick=close;document.getElementById('upx').onclick=close;
 n.addEventListener('click',function(e){if(e.target===n)close()});
 addEventListener('keydown',function(e){if(e.key==='Escape'&&!n.classList.contains('hide'))close()});
 /* acao dos botoes de AVISOS (LER nota / COLETAR selo) */
 window.qxAct=function(nt,btn){
  if(nt.act==='upn'){open(nt.v);nt.cl=1;try{qxSv('arr_nt',QXN)}catch(e){}if(btn){btn.textContent='LIDO'}return}
  if(nt.act==='ver'){
   if(!window.arrVerClaim){soon('Indisponível agora');return}
   if(btn){btn.disabled=true;btn.textContent='...'}
   window.arrVerClaim().then(function(r){
    if(r&&r.ok){nt.cl=1;nt.m='Selo VERIFICADO coletado e ativo!';try{qxSv('arr_nt',QXN);qxNtR();qxBadge()}catch(e){}soon('Selo VERIFICADO ativado!')}
    else{if(btn){btn.disabled=false;btn.textContent='COLETAR'}soon((r&&r.e)||'Falha ao coletar')}
   }).catch(function(){if(btn){btn.disabled=false;btn.textContent='COLETAR'}soon('Falha ao coletar')})
  }
 };
 /* gera os avisos das versoes ainda nao vistas (jogador novo: so a mais recente) */
 function push(){
  try{
   if(typeof QXN==='undefined'||typeof qxAdd!=='function'||!ARR_NOTAS.length)return;
   var seen=parseInt(localStorage.getItem(K),10),top=ARR_NOTAS[0].v;
   if(isNaN(seen))seen=top-1;
   if(seen>=top)return;
   ARR_NOTAS.slice().reverse().forEach(function(e){
    if(e.v<=seen)return;
    qxAdd('Atualização v'+e.v+': '+e.t);var q=QXN[0];q.act='upn';q.al='LER';q.v=e.v
   });
   localStorage.setItem(K,String(top));qxSv('arr_nt',QXN);qxBadge()
  }catch(e){}
 }
 push();
})();
