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
/* ===== NUVEM (v3): o pacote de cada conta tambem fica guardado no Cloudflare (armada-relay /db/snaps) =====
   - id e acesso vem do token da conta (usuario+senha): so quem tem a senha le ou grava o proprio pacote;
   - sobe sozinho a cada ~15s quando algo muda, ao esconder o app e ao trocar de conta;
   - ao entrar numa conta, se a nuvem tem uma versao diferente da que este aparelho conhece, a nuvem vence
     e o pacote local antigo vai para o backup arr_bak:<usuario>;
   - imagens grandes (foto/banner) ficam fora: elas ja sincronizam por /db/pics. */
const CB='https://armada-relay.rdz777zd.workers.dev/db/snaps/',OKT=/^[a-f0-9]{64}$/,BIG=25000;
const tkOf=u=>{const t=get('arr_tk:'+u);return t&&OKT.test(t)?t:''};
const baseT=u=>+get('arr_cloudt:'+u)||0;
async function sha(s){const b=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(s));return[...new Uint8Array(b)].map(x=>x.toString(16).padStart(2,'0')).join('')}
async function gz(s){const cs=new CompressionStream('gzip'),w=cs.writable.getWriter();w.write(new TextEncoder().encode(s));w.close();const u=new Uint8Array(await new Response(cs.readable).arrayBuffer());let r='';for(let i=0;i<u.length;i+=8192)r+=String.fromCharCode.apply(null,u.subarray(i,i+8192));return btoa(r)}
async function ungz(b){const bin=atob(b),u=new Uint8Array(bin.length);for(let i=0;i<bin.length;i++)u[i]=bin.charCodeAt(i);const ds=new DecompressionStream('gzip'),w=ds.writable.getWriter();w.write(u);w.close();return await new Response(ds.readable).text()}
async function pk(o){const s=JSON.stringify(o);if(window.CompressionStream){try{return 'g1:'+await gz(s)}catch(e){}}return 'j1:'+s}
async function upk(d){try{if(typeof d!=='string')return null;if(d.indexOf('g1:')===0)return JSON.parse(await ungz(d.slice(3)));if(d.indexOf('j1:')===0)return JSON.parse(d.slice(3))}catch(e){}return null}
const slim=o=>{const r={};for(const k in o){const v=o[k];if(typeof v==='string'&&v.length<=BIG)r[k]=v}return r};
const cid=async tok=>'sn'+(await sha('snap:'+tok)).slice(0,30);
/* envia o pacote da conta u. Devolve: ok | conflict | err | notok | empty | big */
async function up(u,obj,keep){
 const tok=tkOf(u);if(!tok)return 'notok';
 const o=slim(obj);if(!Object.keys(o).length)return 'empty';
 let d=await pk(o),n=0;
 while(d.length>100000&&n++<40){let bk='',bl=0;for(const k in o)if(o[k].length>bl){bl=o[k].length;bk=k}if(!bk)break;delete o[bk];d=await pk(o)}
 if(d.length>100000)return 'big';
 const body=JSON.stringify({d:d,b:baseT(u)});
 try{
  const r=await fetch(CB+await cid(tok),{method:'PUT',headers:{'Content-Type':'application/json','X-Arr-Snap':tok},body:body,keepalive:!!keep&&body.length<60000});
  if(r.status===409)return 'conflict';
  if(!r.ok)return 'err';
  const j=await r.json();if(j&&j.t){set('arr_cloudt:'+u,String(j.t));return 'ok'}
 }catch(e){}
 return 'err'}
/* busca o pacote da conta u: {d,t} | null (nada na nuvem) | undefined (falhou) */
async function pull(u){
 const tok=tkOf(u);if(!tok)return undefined;
 try{const r=await fetch(CB+await cid(tok),{headers:{'X-Arr-Snap':tok},cache:'no-store'});
  if(!r.ok)return undefined;
  const j=await r.json();return j&&typeof j.d==='string'&&j.t?j:null}catch(e){return undefined}}
let cloudBusy=0,cloudU='',cloudWait=0,lastSent='',lastUp=0;
async function apply(u,j){
 const o=await upk(j.d);
 if(!o||typeof o!=='object'||!set('arr_cloudt:'+u,String(j.t))){cloudWait=Date.now()+60000;return}
 const mine=collect();
 if(Object.keys(mine).length)set('arr_bak:'+u,JSON.stringify(mine));
 lock=1;
 const fin=()=>{for(const k of Object.keys(mine))if(!(k in o)&&String(mine[k]).length<=BIG)rem(k);for(const k in o)if(isGame(k)&&typeof o[k]==='string')set(k,o[k])};
 fin();
 addEventListener('pagehide',fin,true);addEventListener('beforeunload',fin,true);
 setTimeout(()=>location.reload(),60)}
async function cloud(keep){
 if(lock||cloudBusy||Date.now()<cloudWait)return;
 const cur=String(window.ARR_USER||'').toLowerCase();
 if(!cur||get('arr_own')!==cur||!tkOf(cur)||!window.crypto||!crypto.subtle)return;
 cloudBusy=1;
 try{
  if(cloudU!==cur){
   const j=await pull(cur);
   if(j===undefined){cloudWait=Date.now()+60000;return}
   if(j&&String(j.t)!==String(baseT(cur))){await apply(cur,j);return}
   cloudU=cur;lastSent=''}
  const o=slim(collect());if(!Object.keys(o).length)return;
  const sig=JSON.stringify(o);
  if(sig===lastSent||(!keep&&Date.now()-lastUp<15000))return;
  const r=await up(cur,o,keep);
  if(r==='ok'){lastSent=sig;lastUp=Date.now()}
  else if(r==='conflict'){const j=await pull(cur);if(j)await apply(cur,j);else cloudWait=Date.now()+60000}
  else if(r==='err')cloudWait=Date.now()+30000;
 }finally{cloudBusy=0}}
window.__acCloud=cloud;
const RST='r1';
const isWipe=k=>typeof k==='string'&&(k.indexOf('arr_')===0||k.indexOf('fs_')===0)&&k!=='arr_rst';
function resetAll(){
 lock=2;
 const wipe=()=>{const ks=[];for(let i=0;i<LS.length;i++){const k=LS.key(i);if(k&&isWipe(k))ks.push(k)}ks.forEach(rem)};
 wipe();set('arr_rst',RST);
 try{sessionStorage.clear()}catch(e){}
 addEventListener('pagehide',()=>{wipe();set('arr_rst',RST)},true);addEventListener('beforeunload',()=>{wipe();set('arr_rst',RST)},true);
 setTimeout(()=>location.reload(),60)}
/* v2: o reset geral NAO roda mais (ele apagaria o progresso atual do aparelho ao ativar este arquivo) */
if(get('arr_rst')!==RST)set('arr_rst',RST);
setInterval(tick,300);
})();
