
/* ===== KIT MEDICO: bots so usam o kit com 40% de vida ou menos (se tiverem bandagem, usam ela antes) ===== */
(function(){const uh0=useHeal;
useHeal=function(f,k){if(f&&!f.isP&&k=='k'&&f.hp>MH*.4){if(f.bd>0&&f.hp<150)return uh0.call(this,f,'b');return}return uh0.apply(this,arguments)}})();
