
/* ===== NOVA TELA DE RANK: logica ===== */
(function(){
const lbl={k:'KILLS',w:'WINS',r:'RP',c:'VITÓRIAS'};
const val=(e,t)=>t=='k'?e.k:t=='w'?e.w:e.rp;
function av(canvas,col){canvas.style.borderRadius='50%';return canvas}
const myP=k=>{try{return localStorage.getItem(k)||''}catch(e){return ''}};
function pfa(e,cv){const src=e.me?myP('fs_pav'):(e.av||'');if(!src)return cv;const i=document.createElement('img');i.src=src;i.alt='';i.style.cssText=cv.style.cssText+';object-fit:cover;border-radius:50%;border:2px solid #ff6600';return i}
function bnStyle(e){const b=e.me?myP('fs_pbn'):(e.bn||'');return b?'linear-gradient(90deg,#0c0a09f2 0,#0c0a09b0 45%,#0c0a0970),url("'+b+'") center/cover no-repeat':''}
function row(rk,name,sub,value,unit,canvas,me,click,bg){
  const d=document.createElement('div');d.className='nrr'+(rk<=3?' r'+rk:'')+(me?' me':'');if(bg)d.style.background=bg;
  const p=document.createElement('div');p.className='pos';p.innerHTML=(rk<=3?'<svg class="ic"><use href="#i-crown"/></svg>':'')+rk;d.appendChild(p);
  const a=document.createElement('div');a.className='av';a.appendChild(canvas);if(rk<=3){const b=document.createElement('span');b.className='bd';b.textContent=rk==1?'#1':String(rk);a.appendChild(b)}d.appendChild(a);
  const t=document.createElement('div');t.className='tx';t.innerHTML='<div class="nm">'+name+'</div><div class="st">'+sub+'</div>';d.appendChild(t);
  const v=document.createElement('div');v.className='vl';v.innerHTML=fmt(value)+'<small>'+unit+'</small>';d.appendChild(v);
  if(click)d.onclick=click;return d}
prR=function(){
  const g=$('prlist'),me=$('prme');g.innerHTML='';me.innerHTML='';
  try{$('prsub').textContent=(typeof stText=='function')?stText().replace(/^Ranking /,''):'Atualizado agora'}catch(e){$('prsub').textContent='Atualizado agora'}
  $('prkc').textContent=fmt(coins);$('prkg').textContent=fmt(gems);
  document.querySelectorAll('#prkp .prtabs button').forEach(b=>b.classList.toggle('on',b.dataset.t==prT));
  if(prT=='c'){
    const L=clRank(),ur=L.slice(0,30);
    if(!ur.length)g.innerHTML='<div class="nrempty">Nenhum clã no ranking ainda</div>';
    ur.forEach((c,i)=>g.appendChild(row(i+1,'['+esc(c.tag)+'] '+esc(c.n),'Nível '+(Math.floor(clXp(c)/300)+1),cw(c),'VITÓRIAS',ecv(c,56),PC&&PC.id==c.id)));
    if(PC){const pi=L.findIndex(x=>x.id==PC.id);me.innerHTML='<div class="nrme"><div class="av"></div><div class="tx"><small>SEU CLÃ</small><b>['+esc(PC.tag)+'] '+esc(PC.n)+'</b><i>#'+(pi<0?'-':pi+1)+'</i></div><div class="vl">'+fmt(pi<0?0:cw(L[pi]))+' <small>VITÓRIAS</small></div></div>';me.querySelector('.av').appendChild(ecv(PC,52))}
    return {}}
  const S=prSort(prList(),prT);
  if(!S.length)g.innerHTML='<div class="nrempty">Ninguém no ranking ainda</div>';
  S.slice(0,30).forEach((e,i)=>{const sub=(e.c?'['+esc(e.c.tag)+'] '+esc(e.c.n):'Sem clã')+(prT=='r'?' • '+prTier(e.rp):'');
    g.appendChild(row(i+1,esc(e.n)+(e.me?' (você)':''),sub,val(e,prT),lbl[prT],pfa(e,av(prAv(e.c?e.c.col:'#8b9bb2',56,clHash(e.key)))),e.me,()=>{try{ppOpen(e.me?ppMe():e)}catch(x){}},bnStyle(e)))});
  const mi=S.findIndex(e=>e.me),m=mi>=0?S[mi]:null;
  if(m){const c=prAv(m.c?m.c.col:'#8b9bb2',52,clHash(m.key));av(c);
    me.innerHTML='<div class="nrme"><div class="av"></div><div class="tx"><small>VOCÊ</small><b>'+esc(m.n)+'</b><i>#'+(mi+1)+'</i></div><div class="vl">'+fmt(val(m,prT))+' <small>'+lbl[prT]+'</small></div><button class="btn" id="nrup">SUBIR DE RANK</button></div>';
    me.querySelector('.av').appendChild(pfa(m,c));{const bs=bnStyle(m),nm=me.querySelector('.nrme');if(bs&&nm)nm.style.background=bs}$('nrup').onclick=()=>{try{$('prkp').classList.add('hide');rnkOpen()}catch(e){}}}
  return {}};
document.querySelectorAll('#prkp .prtabs button').forEach(b=>b.onclick=()=>{prT=b.dataset.t;prR()});
})();
