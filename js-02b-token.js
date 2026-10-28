/* ===== TOKEN DE DONO (anti-trapaca) =====
   - Token do aparelho (X-Arr-Dev): aleatorio, guardado no aparelho. Protege players/<uid> e pics/<uid>.
   - Token da conta (X-Arr-Acc): derivado de usuario+senha (nunca sai do aparelho como senha). Protege a conta, nick e ID.
   O servidor reserva o registro no 1o token recebido; depois so aceita gravar/apagar com o mesmo token.
   Se o servidor ainda for a versao antiga (sem os cabecalhos), a gravacao e refeita sem token. */
(function(){
const BASE='https://armada-relay.rdz777zd.workers.dev/db';
const ls=(k,v)=>{try{if(v===undefined)return localStorage.getItem(k)||'';localStorage.setItem(k,v)}catch(e){}return''};
const OK=/^[a-f0-9]{64}$/;
let dev=ls('arr_dtk');
if(!OK.test(dev)){try{dev=Array.from(crypto.getRandomValues(new Uint8Array(32)),b=>b.toString(16).padStart(2,'0')).join('')}catch(e){dev=''}if(dev)ls('arr_dtk',dev)}
async function sh(s){try{const b=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(s));return[...new Uint8Array(b)].map(x=>x.toString(16).padStart(2,'0')).join('')}catch(e){return''}}
let pending='';
window.ARR_TK={
 /* chamado no inicio do login/cadastro, com usuario (minusculo) e senha */
 async set(k,p){pending=await sh('arrtk:'+String(k).toLowerCase()+':'+p);return pending},
 /* chamado quando o login deu certo: guarda o token da conta neste aparelho */
 commit(u){if(pending&&u)ls('arr_tk:'+String(u).toLowerCase(),pending);pending=''},
 clear(){pending=''},
 forget(u){try{localStorage.removeItem('arr_tk:'+String(u).toLowerCase())}catch(e){}}
};
const of=window.fetch.bind(window);
window.fetch=function(u,o){
 let o2=null;
 try{
  if(typeof u==='string'&&u.indexOf(BASE)===0&&o&&(o.method==='PUT'||o.method==='DELETE')){
   const h=Object.assign({},o.headers);
   if(dev)h['X-Arr-Dev']=dev;
   const a=pending||ls('arr_tk:'+String(window.ARR_USER||'').toLowerCase());
   if(a&&OK.test(a))h['X-Arr-Acc']=a;
   if(dev||h['X-Arr-Acc'])o2=Object.assign({},o,{headers:h})}
 }catch(e){}
 if(!o2)return of(u,o);
 /* servidor antigo (sem os cabecalhos no CORS): tenta de novo sem token */
 return of(u,o2).catch(e=>{if(e&&e.name==='AbortError')throw e;return of(u,o)})};
})();
