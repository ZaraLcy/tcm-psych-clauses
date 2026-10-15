const D=window.DATA,$=s=>document.querySelector(s);
const KW={};D.cats.forEach(c=>c.kws.forEach(k=>KW[k.name]=Object.assign(k,{rx:new RegExp(k.re,'g'),cat:c.name})));
const esc=s=>s.replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const FORM={};D.clauses.forEach(c=>c.f.forEach(f=>(FORM[f]=FORM[f]||[]).push(c)));
const fnames=Object.keys(FORM).sort((a,b)=>a.localeCompare(b,'zh-Hant'));
$('#flist').innerHTML=fnames.map(f=>`<a href="#f=${encodeURIComponent(f)}" data-f="${esc(f)}">${esc(f)} <small>(${FORM[f].length})</small></a>`).join('');
$('#ff').oninput=e=>{const v=e.target.value.trim();document.querySelectorAll('#flist a').forEach(a=>a.hidden=v&&!a.dataset.f.includes(v))};
$('#side').innerHTML=D.cats.map(c=>`<h3>${esc(c.name)}</h3>`+c.kws.map(k=>`<a href="#kw=${encodeURIComponent(k.name)}" data-k="${esc(k.name)}">${esc(k.name)} <small>(${k.n})</small></a>`).join('')).join('')+`<h3><a href="#about">說明</a></h3>`;
function st(){const p=new URLSearchParams(location.hash.slice(1));return{kw:p.get('kw')||'',f:p.get('f')||'',q:p.get('q')||'',b:p.get('b')||'',about:location.hash==='#about'}}
function go(o){const p=new URLSearchParams();for(const k of['kw','f','q','b'])if(o[k])p.set(k,o[k]);location.hash=p.toString()}
function hl(t,kw,q){let s=esc(t);if(kw&&KW[kw])s=s.replace(new RegExp(KW[kw].re,'g'),m=>`<u>${m}</u>`);if(q)s=s.split(esc(q)).join(`<mark>${esc(q)}</mark>`);return s}
function render(){const s=st();$('#side').classList.remove('open');$('#fside').classList.remove('open');
 document.querySelectorAll('#flist a').forEach(a=>a.classList.toggle('on',a.dataset.f===s.f));
 document.querySelectorAll('#side a[data-k]').forEach(a=>a.classList.toggle('on',a.dataset.k===s.kw));
 $('#about').hidden=!s.about;$('#list').hidden=$('#info').hidden=$('#bar').hidden=s.about;if(s.about){window.scrollTo(0,0);return}
 $('#q').value=s.q;$('#book').value=s.b;
 let L=D.clauses.filter(c=>(!s.kw||c.k.includes(s.kw))&&(!s.f||c.f.includes(s.f))&&(!s.b||c.b===s.b)&&(!s.q||c.t.includes(s.q)||c.ch.includes(s.q)));
 let info=`共 <b>${L.length}</b> 條`;
 if(s.kw)info=`<b>${esc(KW[s.kw]?KW[s.kw].cat:'')}・${esc(s.kw)}</b>：`+info;
 if(s.f){const ks=[...new Set(L.flatMap(c=>c.k))];info=`方劑 <b>${esc(s.f)}</b>：`+info+`；相關關鍵詞：`+ks.map(k=>`<a href="#kw=${encodeURIComponent(k)}">${esc(k)}</a>`).join('、')}
 if(!s.kw&&!s.f&&!s.q&&!s.b)info='全部條文 '+info+'（點選左側關鍵詞以篩選並標示底線）';
 $('#info').innerHTML=info;
 $('#list').innerHTML=L.map(c=>`<div class="card"><p>${hl(c.t,s.kw,s.q)}</p><div class="cite">《${c.b}》・${esc(c.ch)}・${esc(c.c)}　<a href="${c.u}" target="_blank" rel="noopener">原文 ↗</a></div><div class="tags">${c.f.map(f=>`<a class="f" href="#f=${encodeURIComponent(f)}">${esc(f)}</a>`).join('')}${c.k.map(k=>`<a href="#kw=${encodeURIComponent(k)}">${esc(k)}</a>`).join('')}</div></div>`).join('')}
let tm;$('#q').oninput=e=>{clearTimeout(tm);tm=setTimeout(()=>{const s=st();s.q=e.target.value.trim();history.replaceState(null,'','#'+new URLSearchParams(Object.entries(s).filter(([k,v])=>v&&k!='about')).toString());render()},200)};
$('#book').onchange=e=>{const s=st();s.b=e.target.value;go(s)};
$('#fmenu').onclick=()=>{$('#side').classList.remove('open');$('#fside').classList.toggle('open')};
$('#clr').onclick=()=>go({});$('#menu').onclick=()=>{$('#fside').classList.remove('open');$('#side').classList.toggle('open')};
$('#about').innerHTML=`<h2>說明</h2><h3>來源</h3><ul><li>《傷寒論（宋本）》：<a href="${D.src['傷寒論']}">中醫笈成 jicheng.tw</a></li><li>《金匱要略方論》：<a href="${D.src['金匱要略']}">中醫笈成 jicheng.tw</a></li></ul>
<h3>方法</h3><p>以程式擷取上述網頁全文（採網站「今版」文字，雙行夾注以（）保留），以段落為單位逐篇掃描（序文除外），凡含所列症狀關鍵詞者收錄；方藥組成、煎服法段落不單獨收錄。條文原文照錄，不改寫。共六大類 ${D.cats.reduce((a,c)=>a+c.kws.length,0)} 個關鍵詞、${D.clauses.length} 條條文。方劑取自條文後附方名及條文中「某湯主之／宜／與某湯」等語。第六類「不欲飲食／不能食」僅收同條兼見神志症狀或屬少陽、百合病者。</p>
<h3>條號</h3><p>《傷寒論》用宋本通行398條序號；《金匱要略》用網站「篇.條」編號。網站未編號之段落（如辨脈法、平脈法、傷寒例、可與不可諸篇、金匱禁忌篇）標為「篇內未編號段N」，N 為該篇未編號段落之順序。</p>
<h3>注意事項</h3><ul><li>關鍵詞為機械比對（正規表示式），可能含少量語義較遠之條文（如「冒」含冒家、「氣上衝」含非情志之上衝）；「煩」不含「煩躁」「煩疼」。</li><li>「默默」與「嘿嘿」為異寫，已合併比對。</li><li>部分方名因原書異寫而並存（如赤小豆當歸散／赤豆當歸散）。</li><li>本站僅供研讀參考，不構成醫療建議。</li></ul>`;
window.onhashchange=render;render();
