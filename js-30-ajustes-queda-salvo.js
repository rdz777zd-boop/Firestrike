/* ===== Ajustes: personagem na queda + aviso de aliado salvo =====
   1) Na queda de paraquedas o jogador nao tinha o angulo atualizado (so os bots), entao o
      personagem ficava virado pra qualquer lado. Agora ele acompanha a camera (pra onde voce olha).
   2) Em partida online, aliado humano (f.mx) e revivido pelo evento 'rv' / sincronizacao de estado e
      o aviso "salvou" nunca era gerado na sua tela. Agora detectamos derrubado -> de pe e avisamos. */
(function(){
 if(typeof upd!=='function')return;
 const u0=upd,dnPrev=new WeakMap();
 upd=function(dt){
  const r=u0.apply(this,arguments);
  try{
   const g=G;if(!g||!g.p)return r;
   const p=g.p;
   /* 1) angulo na queda */
   if(p.st==='fall'&&!p.dead&&typeof cyaw==='number'&&!(typeof fl!=='undefined'&&fl&&fl.on))p.ang=cyaw;
   /* 2) aviso de aliado salvo (so aliados controlados remotamente; os locais ja avisam em revive()) */
   if(g.f&&g.feed&&!g.cs){
    for(const o of g.f){
     if(o===p||o.tm!==p.tm)continue;
     const was=dnPrev.get(o)||0,now=o.dn>0?1:0;
     if(o.mx&&was&&!now&&!o.dead){
      const by=(o.rvBy&&!o.rvBy.dead)?o.rvBy:null;
      g.feed.push(by&&by!==o?{ao:by,a:by.name,m:'salvou',bo:o,b:o.name,l:4}:{ao:o,a:o.name,m:'foi salvo!',b:'',l:4});
      try{tx(o.x,o.y-40,'SALVO!','#7dff6a')}catch(e){}
     }
     dnPrev.set(o,now);
    }
   }
  }catch(e){}
  return r;
 };
})();
