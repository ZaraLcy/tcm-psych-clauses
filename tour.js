(function(){
const M=()=>matchMedia('(max-width:760px)').matches;
const S=[
 {t:null,h:'歡迎來到水豚教授的條文館！',b:'這裡彙編《傷寒論》《金匱要略》中與精神、情志、睡眠及身心相關的原文條文，可依症狀關鍵詞與方劑瀏覽。花 30 秒認識一下吧～',img:true},
 {t:()=>M()?'#menu':'#side',h:'分類樹',b:()=>(M()?'點左上「☰」打開分類樹。':'')+'大類 ▸ 關鍵詞 ▸ 子類，可展開收合；點選即篩選條文，關鍵詞會在原文中畫上底線。'},
 {t:'#q',h:'全文搜尋',b:'輸入任何字詞，即時搜尋所有條文。'},
 {t:'#book',h:'書名篩選',b:'只看《傷寒論》或《金匱要略》。'},
 {t:()=>M()?'#fmenu':'#fside',h:'方劑列表',b:()=>(M()?'點右上「方」打開方劑索引。':'右側為方劑索引，可輸入篩選。')+'點方名即顯示相關條文與關鍵詞。'},
 {t:'.card',h:'條文卡片',b:'卡片上的方名與關鍵詞標籤都可以點；「原文 ↗」連到中醫笈成原書頁面。'},
 {t:'.ab',h:'分享與說明',b:'網址會記住目前篩選（如 #kw=煩），可直接分享；「說明」頁介紹來源與方法。隨時可按「導覽」重看。'}];
let i=0,sp,pop;
function q(s){return typeof s==='function'?s():s}
function end(){sp&&sp.remove();pop&&pop.remove();sp=pop=null;localStorage.tourDone='1';document.removeEventListener('keydown',key);removeEventListener('resize',show)}
function key(e){if(e.key==='Escape')end();if(e.key==='ArrowRight')go(1);if(e.key==='ArrowLeft')go(-1)}
function go(d){i+=d;if(i>=S.length)return end();if(i<0)i=0;show()}
function show(){const s=S[i];const sel=q(s.t);let el=sel&&document.querySelector(sel);
 if(el&&!el.offsetParent&&el!==document.body)el=null;
 if(el){el.scrollIntoView({block:'nearest'})}
 const r=el?el.getBoundingClientRect():null;
 if(r){const p=6;Object.assign(sp.style,{display:'block',left:r.left-p+'px',top:r.top-p+'px',width:Math.min(r.width,innerWidth)+2*p+'px',height:Math.min(r.height,innerHeight-r.top)+2*p+'px'})}else sp.style.display='none';
 sp.classList.toggle('full',!r);
 pop.innerHTML=(s.img?'<img src="assets/capybara.png" alt="水豚教授" class="tour-img">':'')+`<div class="tour-n">${i+1} / ${S.length}</div><h4>${s.h}</h4><p>${q(s.b)}</p><div class="tour-btn"><button data-a="skip">略過</button><span></span>${i?'<button data-a="prev">上一步</button>':''}<button data-a="next" class="pri">${i==S.length-1?'開始使用':'下一步'}</button></div>`;
 const W=Math.min(340,innerWidth-24);pop.style.width=W+'px';const H=pop.offsetHeight;
 let x,y;if(!r){x=(innerWidth-W)/2;y=(innerHeight-H)/2}else{
  if(r.width>innerWidth*.5&&r.height>innerHeight*.5){x=r.left+(r.width-W)/2;y=Math.min(r.top+40,innerHeight-H-12)}
  else if(r.bottom+H+16<innerHeight){x=r.left;y=r.bottom+12}else if(r.top-H-16>0){x=r.left;y=r.top-H-12}
  else if(r.right+W+16<innerWidth){x=r.right+12;y=r.top}else{x=r.left-W-12;y=r.top}}
 pop.style.left=Math.max(12,Math.min(x,innerWidth-W-12))+'px';pop.style.top=Math.max(12,Math.min(y,innerHeight-H-12))+'px';
 pop.querySelector('[data-a=next]').focus()}
function start(n){end();localStorage.removeItem('tourDone');i=n||0;
 sp=document.createElement('div');sp.className='tour-sp';pop=document.createElement('div');pop.className='tour-pop';pop.setAttribute('role','dialog');
 document.body.append(sp,pop);pop.onclick=e=>{const a=e.target.dataset.a;if(a==='next')go(1);if(a==='prev')go(-1);if(a==='skip')end()};
 sp.onclick=end;document.addEventListener('keydown',key);addEventListener('resize',show);setTimeout(show,50);setTimeout(()=>sp&&show(),400)}
document.getElementById('tourbtn').onclick=()=>start(0);
const m=location.search.match(/tourstep=(\d+)/);
if(m)start(+m[1]-1);else if(!localStorage.tourDone)setTimeout(()=>start(0),400);
})();
