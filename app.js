function splash(){
 CUR=null;dr(0);
 app.innerHTML=`<div class='spl'><div class='logo'>EduMAS ²⁰²⁶</div><div class='pre'>تقدم لكم</div><h1 class='h1s'>منهج الرياضيات الإلكتروني<br>للصف الثالث الإعدادي</h1><div class='term'>الفصل الدراسي الأول</div><div class='auth'><div class='nm'>أستاذ / محمود عادل صالح</div><div class='role'>معلم رياضيات</div><div>مدرسة الزهور الإعدادية بنين</div><div>إدارة المحمودية التعليمية</div></div><button class='go' onclick="location.hash='#/home'">ابدأ التعلم ←</button></div>`;
}

function home(){
 CUR=null;dr(0);
 app.innerHTML=`<div class='topbar'><div class='tbrow'><button class='ib' onclick='dr(1)'>☰</button><div class='ttl'>📐 EduMAS ²⁰²⁶ — رياضيات 3 إعدادي</div><button class='ib' onclick="document.getElementById('settings').classList.toggle('open')" title='الإعدادات'>⚙️</button></div></div>`+UNITS.map(u=>`<details class='card' open><summary>${u.n}</summary><div class='chips'>${u.l.map(([k,t])=>`<a href='#/l/${k}'><b>${k}</b> ${t}</a>`).join('')}</div></details>`).join('');
 window.scrollTo(0,0);
}

function lesson(k,t,g){
 const d=LES[k];if(!d)return home();
 const nm=UNITS.flatMap(u=>u.l).find(x=>x[0]===k)[1];
 t=t||'explain';
 CUR={k,t,g};dr(0);
 
 const tabsHtml = `<div class='tabs' style='margin-top:6px; margin-bottom: 10px;'>
    <button class='${t=="explain"?"on":""}' onclick='location.hash="#/l/${k}/explain"'>الشرح</button>
    <button class='${t=="cw"?"on":""}' onclick='location.hash="#/l/${k}/cw"'>الأداء الصفي</button>
    <button class='${t=="hw"?"on":""}' onclick='location.hash="#/l/${k}/hw"'>الواجب</button>
    <button class='${t=="wk"?"on":""}' onclick='location.hash="#/l/${k}/wk"'>التقييم</button>
 </div>`;

 let bodyHtml = '';
 if (t === 'explain') {
    bodyHtml = d.explain ? d.explain : `<div class='card'><p>لا يوجد محتوى.</p></div>`;
 } else if (t === 'wk') {
    g = g || 'أ';
    let subTabs = `<div class='tabs' style='margin-bottom:8px'>
      <button class='${g==="أ"?"on":""}' onclick='location.hash="#/l/${k}/wk/أ"'>نموذج أ</button>
      <button class='${g==="ب"?"on":""}' onclick='location.hash="#/l/${k}/wk/ب"'>نموذج ب</button>
      <button class='${g==="ج"?"on":""}' onclick='location.hash="#/l/${k}/wk/ج"'>نموذج ج</button>
    </div>`;
    bodyHtml = subTabs + (d.wk && d.wk[g] ? d.wk[g] : `<div class='card'><p>لا توجد أسئلة مضافة بعد.</p></div>`);
 } else {
    bodyHtml = d[t] ? d[t] : `<div class='card'><p>لا توجد أسئلة مضافة بعد.</p></div>`;
 }

 app.innerHTML=`<div class='topbar'><div class='tbrow'><button class='ib' onclick='dr(1)'>☰</button><div class='ttl'>${k} ${nm}</div><button class='ib' onclick="document.getElementById('settings').classList.toggle('open')" title='الإعدادات'>⚙️</button><button class='ib' onclick="document.getElementById('settings').classList.toggle('open')" title='الإعدادات'>⚙️</button><button class='ib' onclick="location.hash='#/home'" title='الرئيسية'>🏠</button></div>${tabsHtml}</div>${bodyHtml}`;
 window.scrollTo(0,0);
}

function route(){
 const h = decodeURIComponent(location.hash);
 const m = h.match(/#\/l\/([\w-]+)(?:\/([a-zA-Z]+))?(?:\/(.))?/);
 if(m) lesson(m[1], m[2]);
 else if(h=='#/home') home();
 else splash();
}
window.addEventListener('hashchange',route);route();
// Initialize animation on load if needed
setTimeout(() => updateAnim(), 500);
