/* ===== CONTAS SEPARADAS (v174) =====
   Bug: ao trocar de conta e criar outra, banner, perfil, skins, dinheiro e armas continuavam os da conta anterior,
   porque todo o progresso fica no aparelho (localStorage) e nao era separado por conta.
   Agora cada conta tem o seu proprio "pacote" de dados neste aparelho:
   - ao sair/trocar de conta, o pacote da conta atual e guardado (arr_snap:<usuario>) e os dados do jogo sao limpos;
   - ao entrar numa conta que ja tinha pacote, ele e restaurado; conta nova comeca limpa;
   - convidado tem o proprio pacote (~g).
   Identidade do aparelho, sessao, tokens e cache de contas NAO entram no pacote. */
(function(){
if(window.__acSplit)return;window.__acSplit=1;
const LS=window.localStorage,SP=Storage.prototype,sg=SP.getItem,ss=SP.setItem,sr=SP.removeItem;
const get=k=>{try{return sg.call(LS,k)}catch(e){return null}};
const set=(k,v)=>{try{ss.call(LS,k,v);return 1}catch(e){return 0}};
const rem=k=>{try{sr.call(LS,k)}catch(e){}};
const KEEP=new Set(['arr_sess','arr_uid','arr_dtk','arr_own','arr_pn','arr_dburl','arr_ban','arr_owner','arr_vers']);
const KP=['arr_tk:','arr_acc:','arr_uid:','arr_nk:','arr_snap:'];
const isGame=k=>typeof k==='string'&&(k.indexOf('arr_')===0||k.indexOf('fs_')===0)&&!KEEP.has(k)&&!KP.some(p=>k.indexOf(p)===0);
let lock=0,warned=0;
/* durante a troca, o jogo nao consegue regravar o progresso antigo por cima */
SP.setItem=function(k){if(lock&&this===LS&&isGame(String(k)))return;return ss.apply(this,arguments)};
SP.removeItem=function(k){if(lock&&this===LS&&isGame(String(k)))return;return sr.apply(this,arguments)};
function collect(){const o={};for(let i=0;i<LS.length;i++){const k=LS.key(i);if(k&&isGame(k))o[k]=get(k)}return o}
function swap(own,cur){
 const mine=collect();
 if(!set('arr_snap:'+(own||'~g'),JSON.stringify(mine))){
  if(!warned){warned=1;try{soon('Memória do aparelho cheia: não deu para separar os dados desta conta')}catch(e){}}
  return false}
 let tgt={};try{const s=get('arr_snap:'+(cur||'~g'));if(s)tgt=JSON.parse(s)||{}}catch(e){tgt={}}
 lock=1;
 for(const k of Object.keys(mine))rem(k);
 for(const k in tgt){if(isGame(k)&&typeof tgt[k]==='string')set(k,tgt[k])}
 if(!cur)rem('arr_pn');
 set('arr_own',cur);
 /* garante o pacote certo mesmo se algo gravar no ultimo instante */
 const fin=()=>{for(const k of Object.keys(mine))if(!(k in tgt))rem(k);for(const k in tgt){if(isGame(k)&&typeof tgt[k]==='string')set(k,tgt[k])}};
 addEventListener('pagehide',fin,true);addEventListener('beforeunload',fin,true);
 setTimeout(()=>location.reload(),60);
 return true}
let failK='';
function tick(){
 if(lock)return;
 const cur=String(window.ARR_USER||'').toLowerCase();
 if(!cur&&get('arr_sess'))return;/* sessao salva ainda entrando */
 const own=get('arr_own');
 if(own===null){set('arr_own',cur);return}/* primeira vez nesta versao: os dados atuais ficam com quem esta agora */
 if(own===cur)return;
 if(own===''&&cur&&!get('arr_snap:'+cur)){set('arr_own',cur);return}/* convidado que cria conta nova: leva o que jogou */
 const fk=own+'>'+cur;if(failK===fk)return;
 if(!swap(own,cur))failK=fk}
/* RESET GERAL (uma unica vez por aparelho, versao r1): apaga progresso, contas guardadas e sessao deste aparelho.
   O servidor apaga as contas e o ranking por conta propria na 1a vez que for publicado com RESET_EPOCH novo. */
const RST='r1';
function resetAll(){
 lock=2;
 const wipe=()=>{const ks=[];for(let i=0;i<LS.length;i++){const k=LS.key(i);if(k&&isWipe(k))ks.push(k)}ks.forEach(rem)};
 wipe();set('arr_rst',RST);
 try{sessionStorage.clear()}catch(e){}
 addEventListener('pagehide',()=>{wipe();set('arr_rst',RST)},true);addEventListener('beforeunload',()=>{wipe();set('arr_rst',RST)},true);
 setTimeout(()=>location.reload(),60)}
if(get('arr_rst')!==RST){resetAll();return}
setInterval(tick,300);
})();
