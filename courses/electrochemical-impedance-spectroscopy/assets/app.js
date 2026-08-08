(() => {
  'use strict';
  const body = document.body;
  const sidebar = document.getElementById('sidebar');
  const menuToggle = document.getElementById('menuToggle');
  const langSelect = document.getElementById('langSelect');
  const searchInput = document.getElementById('courseSearch');
  const searchStatus = document.getElementById('searchStatus');
  const backTop = document.getElementById('backTop');
  const moduleButtons = [...document.querySelectorAll('.complete-btn')];
  const bookmarkButtons = [...document.querySelectorAll('.bookmark-btn')];
  const modules = moduleButtons.map(b => b.dataset.module);
  const progressFill = [...document.querySelectorAll('.progress-fill')];
  const progressText = [...document.querySelectorAll('.progress-text')];

  const safeStorage = {
    get(key, fallback) { try { const v = localStorage.getItem(key); return v === null ? fallback : JSON.parse(v); } catch { return fallback; } },
    set(key, value) { try { localStorage.setItem(key, JSON.stringify(value)); } catch {} }
  };

  const savedLang = safeStorage.get('eis-lang', 'both');
  body.dataset.lang = savedLang;
  if (langSelect) langSelect.value = savedLang;
  function applyLang(v){
    body.dataset.lang=v;
    document.documentElement.lang=v==='ar'?'ar':'en';
    document.documentElement.dir=v==='ar'?'rtl':'ltr';
    safeStorage.set('eis-lang',v);
  }
  langSelect?.addEventListener('change',()=>applyLang(langSelect.value));

  document.getElementById('fontUp')?.addEventListener('click',()=>{
    const current=parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--font-scale'))||1;
    document.documentElement.style.setProperty('--font-scale',Math.min(1.3,current+0.05));
  });
  document.getElementById('fontDown')?.addEventListener('click',()=>{
    const current=parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--font-scale'))||1;
    document.documentElement.style.setProperty('--font-scale',Math.max(0.85,current-0.05));
  });
  document.getElementById('contrastToggle')?.addEventListener('click',()=>body.classList.toggle('high-contrast'));
  document.getElementById('printBtn')?.addEventListener('click',()=>window.print());
  document.getElementById('pdfBtn')?.addEventListener('click',()=>window.print());

  menuToggle?.addEventListener('click',()=>{
    const open=sidebar.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded',String(open));
  });
  sidebar?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>sidebar.classList.remove('open')));

  const completed=new Set(safeStorage.get('eis-completed',[]));
  const bookmarks=new Set(safeStorage.get('eis-bookmarks',[]));
  function updateProgress(){
    moduleButtons.forEach(btn=>{
      const id=btn.dataset.module, done=completed.has(id);
      btn.classList.toggle('done',done); btn.setAttribute('aria-pressed',String(done));
      btn.textContent=done?'Complete ✓ · مكتملة':'Mark complete · أكمل الوحدة';
      const dot=document.querySelector(`[data-nav-module="${id}"] .status-dot`); if(dot) dot.textContent=done?'●':'○';
    });
    const pct=modules.length?Math.round(completed.size/modules.length*100):0;
    progressFill.forEach(el=>el.style.width=`${pct}%`);
    progressText.forEach(el=>el.textContent=`${completed.size} / ${modules.length} modules · ${pct}%`);
    safeStorage.set('eis-completed',[...completed]);
  }
  moduleButtons.forEach(btn=>btn.addEventListener('click',()=>{const id=btn.dataset.module;completed.has(id)?completed.delete(id):completed.add(id);updateProgress();}));
  function updateBookmarks(){
    bookmarkButtons.forEach(btn=>{const id=btn.dataset.module, active=bookmarks.has(id);btn.classList.toggle('bookmarked',active);btn.setAttribute('aria-pressed',String(active));btn.textContent=active?'★ Bookmarked · محفوظة':'☆ Bookmark · حفظ';});
    safeStorage.set('eis-bookmarks',[...bookmarks]);
  }
  bookmarkButtons.forEach(btn=>btn.addEventListener('click',()=>{const id=btn.dataset.module;bookmarks.has(id)?bookmarks.delete(id):bookmarks.add(id);updateBookmarks();}));
  updateProgress(); updateBookmarks();

  const searchable=[...document.querySelectorAll('.searchable')];
  searchInput?.addEventListener('input',()=>{
    const q=searchInput.value.trim().toLocaleLowerCase(); let visible=0;
    searchable.forEach(section=>{const hay=`${section.dataset.search||''} ${section.textContent}`.toLocaleLowerCase();const match=!q||hay.includes(q);section.classList.toggle('search-hidden',!match);if(match)visible++;});
    searchStatus.textContent=q?`${visible} matching sections · ${visible} أقسام مطابقة`:'';
  });

  document.querySelectorAll('.quiz-check').forEach(button=>button.addEventListener('click',()=>{
    const block=button.closest('.quiz-question'); const selected=block.querySelector('input[type="radio"]:checked'); const feedback=block.querySelector('.quiz-feedback');
    if(!selected){feedback.textContent='Choose an answer first · اختر إجابة أولاً';feedback.className='quiz-feedback incorrect';return;}
    const correct=selected.value===block.dataset.answer; feedback.textContent=correct?block.dataset.correct:block.dataset.incorrect; feedback.className=`quiz-feedback ${correct?'correct':'incorrect'}`;
  }));

  function num(id){const v=parseFloat(document.getElementById(id)?.value);return Number.isFinite(v)?v:NaN;}
  function out(id,text){const el=document.getElementById(id);if(el)el.textContent=text;}
  document.getElementById('calcComplex')?.addEventListener('submit',e=>{e.preventDefault();const re=num('complexRe'),im=num('complexIm');if(!Number.isFinite(re)||!Number.isFinite(im))return out('complexOut','Check inputs · راجع المدخلات');const mag=Math.hypot(re,im),ph=Math.atan2(im,re)*180/Math.PI;const den=re*re+im*im;const yr=den?re/den:NaN,yi=den?-im/den:NaN;out('complexOut',`|Z|=${mag.toPrecision(6)} Ω; φ=${ph.toFixed(2)}°; Y=${yr.toPrecision(5)} ${yi>=0?'+':'−'} j${Math.abs(yi).toPrecision(5)} S`);});
  document.getElementById('calcRc')?.addEventListener('submit',e=>{e.preventDefault();const r=num('rcR'),c=num('rcC')*1e-6;if(!(r>0)||!(c>0))return out('rcOut','Check inputs · راجع المدخلات');const tau=r*c,f=1/(2*Math.PI*tau);out('rcOut',`τ=${tau.toPrecision(5)} s; f₀=${f.toPrecision(5)} Hz`);});
  document.getElementById('calcCpe')?.addEventListener('submit',e=>{e.preventDefault();const q=num('cpeQ')*1e-6,a=num('cpeA'),f=num('cpeF');if(!(q>0)||!(a>0&&a<=1)||!(f>0))return out('cpeOut','Check inputs · راجع المدخلات');const w=2*Math.PI*f,mag=1/(q*Math.pow(w,a)),ph=-a*90;out('cpeOut',`|Z|=${mag.toPrecision(6)} Ω; φ=${ph.toFixed(2)}°`);});
  document.getElementById('calcDiff')?.addEventListener('submit',e=>{e.preventDefault();const l=num('diffL')*1e-6,d=num('diffD');if(!(l>0)||!(d>0))return out('diffOut','Check inputs · راجع المدخلات');const tau=l*l/d,f=1/(2*Math.PI*tau);out('diffOut',`τ_D=${tau.toPrecision(6)} s; f≈${f.toPrecision(6)} Hz`);});

  const C=(re,im=0)=>({re,im});
  const add=(a,b)=>C(a.re+b.re,a.im+b.im);
  const inv=a=>{const d=a.re*a.re+a.im*a.im;return C(a.re/d,-a.im/d);};
  const div=(a,b)=>{const d=b.re*b.re+b.im*b.im;return C((a.re*b.re+a.im*b.im)/d,(a.im*b.re-a.re*b.im)/d);};
  const mag=a=>Math.hypot(a.re,a.im);
  const phase=a=>Math.atan2(a.im,a.re)*180/Math.PI;
  const logspace=(lo,hi,n)=>Array.from({length:n},(_,i)=>Math.pow(10,Math.log10(lo)+(Math.log10(hi)-Math.log10(lo))*i/(n-1)));

  let simData=[];
  function simulate(){
    const model=document.getElementById('simModel').value;
    const rs=num('simRs'),r=num('simRct'),c=num('simC')*1e-6,q=num('simQ')*1e-6,a=num('simAlpha'),sigma=num('simSigma'),fmin=num('simFmin'),fmax=num('simFmax'),n=Math.max(20,Math.min(300,Math.round(num('simPoints'))));
    if(!(rs>=0)||!(r>0)||!(c>0)||!(q>0)||!(a>0&&a<=1)||!(sigma>=0)||!(fmin>0)||!(fmax>fmin)||!Number.isFinite(n)){out('simSummary','Check parameters · راجع المعلمات');return;}
    const freqs=logspace(fmin,fmax,n);
    simData=freqs.map(f=>{
      const w=2*Math.PI*f; let z;
      if(model==='rc'){
        const yc=C(0,w*c),yr=C(1/r,0); z=add(C(rs,0),inv(add(yr,yc)));
      }else if(model==='zarc'){
        const ang=a*Math.PI/2,pow=Math.pow(w,a);const ycpe=C(q*pow*Math.cos(ang),q*pow*Math.sin(ang)); z=add(C(rs,0),inv(add(C(1/r,0),ycpe)));
      }else if(model==='randles'){
        const zw=C(sigma/Math.sqrt(w),-sigma/Math.sqrt(w));const far=add(C(r,0),zw);const y=add(C(0,w*c),inv(far));z=add(C(rs,0),inv(y));
      }else{
        z=add(C(rs+r,0),C(0,-1/(w*c)));
      }
      return {f,re:z.re,im:z.im,mag:mag(z),phase:phase(z)};
    }).sort((a,b)=>b.f-a.f);
    drawNyquist(document.getElementById('nyquistCanvas'),simData,'Simulated Nyquist');
    drawBode(document.getElementById('bodeCanvas'),simData);
    const peak=simData.reduce((p,d)=>-d.im>-p.im?d:p,simData[0]);
    out('simSummary',`${n} points; HF Z′≈${simData[0].re.toPrecision(5)} Ω; max −Z″=${(-peak.im).toPrecision(5)} Ω at ${peak.f.toPrecision(4)} Hz. Educational simulation.`);
  }

  function prepCanvas(canvas,height=360){
    if(!canvas)return null;const rect=canvas.getBoundingClientRect();const dpr=window.devicePixelRatio||1;const w=Math.max(500,rect.width||canvas.width);canvas.width=w*dpr;canvas.height=height*dpr;canvas.style.height=`${height}px`;const ctx=canvas.getContext('2d');ctx.setTransform(dpr,0,0,dpr,0,0);ctx.clearRect(0,0,w,height);ctx.fillStyle='#fff';ctx.fillRect(0,0,w,height);return {ctx,w,h:height};
  }
  const nice=v=>{if(!Number.isFinite(v))return '—';const av=Math.abs(v);return (av>=1000||av<0.01&&av!==0)?v.toExponential(2):v.toFixed(av<10?2:1);};
  function drawNyquist(canvas,data,title){
    const p=prepCanvas(canvas,360);if(!p||!data.length)return;const {ctx,w,h}=p,pad={l:72,r:28,t:34,b:58};let xs=data.map(d=>d.re),ys=data.map(d=>-d.im);let xmin=Math.min(0,...xs),xmax=Math.max(...xs),ymin=Math.min(0,...ys),ymax=Math.max(...ys);if(xmax===xmin)xmax=xmin+1;if(ymax===ymin)ymax=ymin+1;const mx=(xmax-xmin)*.08,my=(ymax-ymin)*.12;xmin-=mx;xmax+=mx;ymin-=my;ymax+=my;const X=x=>pad.l+(x-xmin)/(xmax-xmin)*(w-pad.l-pad.r),Y=y=>h-pad.b-(y-ymin)/(ymax-ymin)*(h-pad.t-pad.b);
    ctx.strokeStyle='#d7dfe1';ctx.lineWidth=1;ctx.font='12px Segoe UI';ctx.fillStyle='#43505c';for(let i=0;i<=5;i++){const xv=xmin+(xmax-xmin)*i/5,yv=ymin+(ymax-ymin)*i/5;ctx.beginPath();ctx.moveTo(X(xv),pad.t);ctx.lineTo(X(xv),h-pad.b);ctx.stroke();ctx.fillText(nice(xv),X(xv)-12,h-pad.b+20);ctx.beginPath();ctx.moveTo(pad.l,Y(yv));ctx.lineTo(w-pad.r,Y(yv));ctx.stroke();ctx.fillText(nice(yv),8,Y(yv)+4);}
    ctx.strokeStyle='#092b3a';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(pad.l,pad.t);ctx.lineTo(pad.l,h-pad.b);ctx.lineTo(w-pad.r,h-pad.b);ctx.stroke();ctx.fillStyle='#092b3a';ctx.font='14px Segoe UI';ctx.fillText('Z′ / Ω',w/2,h-16);ctx.save();ctx.translate(18,h/2+20);ctx.rotate(-Math.PI/2);ctx.fillText('−Z″ / Ω',0,0);ctx.restore();ctx.font='bold 14px Segoe UI';ctx.fillText(title,pad.l,pad.t-10);
    ctx.strokeStyle='#0d7a72';ctx.lineWidth=3;ctx.beginPath();data.forEach((d,i)=>{const x=X(d.re),y=Y(-d.im);i?ctx.lineTo(x,y):ctx.moveTo(x,y)});ctx.stroke();
    data.forEach((d,i)=>{if(i===0||i===data.length-1||i%Math.max(1,Math.floor(data.length/12))===0){ctx.fillStyle=i===0?'#9f2e2e':i===data.length-1?'#c99032':'#0d7a72';ctx.beginPath();ctx.arc(X(d.re),Y(-d.im),3.5,0,Math.PI*2);ctx.fill();}});
    ctx.fillStyle='#596575';ctx.font='12px Segoe UI';ctx.fillText('red: highest f; gold: lowest f',w-220,pad.t-10);
  }
  function drawBode(canvas,data){
    const p=prepCanvas(canvas,420);if(!p||!data.length)return;const {ctx,w,h}=p,pad={l:75,r:35,t:35,b:45},gap=28,half=(h-pad.t-pad.b-gap)/2;const lf=data.map(d=>Math.log10(d.f)),lm=data.map(d=>Math.log10(d.mag)),ph=data.map(d=>d.phase);const xmin=Math.min(...lf),xmax=Math.max(...lf);let mmin=Math.min(...lm),mmax=Math.max(...lm),pmin=Math.min(-100,...ph),pmax=Math.max(20,...ph);if(mmax===mmin)mmax=mmin+1;const X=x=>pad.l+(x-xmin)/(xmax-xmin)*(w-pad.l-pad.r);const YM=y=>pad.t+half-(y-mmin)/(mmax-mmin)*half;const YP=y=>pad.t+half+gap+half-(y-pmin)/(pmax-pmin)*half;
    ctx.font='12px Segoe UI';ctx.strokeStyle='#d7dfe1';ctx.fillStyle='#43505c';for(let i=0;i<=6;i++){const x=xmin+(xmax-xmin)*i/6;ctx.beginPath();ctx.moveTo(X(x),pad.t);ctx.lineTo(X(x),h-pad.b);ctx.stroke();ctx.fillText(`10^${x.toFixed(1)}`,X(x)-18,h-pad.b+20);}for(let i=0;i<=4;i++){const mv=mmin+(mmax-mmin)*i/4;ctx.beginPath();ctx.moveTo(pad.l,YM(mv));ctx.lineTo(w-pad.r,YM(mv));ctx.stroke();ctx.fillText(mv.toFixed(2),15,YM(mv)+4);const pv=pmin+(pmax-pmin)*i/4;ctx.beginPath();ctx.moveTo(pad.l,YP(pv));ctx.lineTo(w-pad.r,YP(pv));ctx.stroke();ctx.fillText(`${pv.toFixed(0)}°`,18,YP(pv)+4);}ctx.strokeStyle='#092b3a';ctx.lineWidth=2;ctx.strokeRect(pad.l,pad.t,w-pad.l-pad.r,half);ctx.strokeRect(pad.l,pad.t+half+gap,w-pad.l-pad.r,half);ctx.fillStyle='#092b3a';ctx.font='14px Segoe UI';ctx.fillText('log₁₀ |Z / Ω|',pad.l,pad.t-12);ctx.fillText('Phase / °',pad.l,pad.t+half+gap-9);ctx.fillText('Frequency / Hz (log scale)',w/2-70,h-10);
    ctx.strokeStyle='#0d7a72';ctx.lineWidth=3;ctx.beginPath();data.forEach((d,i)=>{const x=X(Math.log10(d.f)),y=YM(Math.log10(d.mag));i?ctx.lineTo(x,y):ctx.moveTo(x,y)});ctx.stroke();ctx.strokeStyle='#c07818';ctx.beginPath();data.forEach((d,i)=>{const x=X(Math.log10(d.f)),y=YP(d.phase);i?ctx.lineTo(x,y):ctx.moveTo(x,y)});ctx.stroke();
  }
  document.getElementById('simForm')?.addEventListener('submit',e=>{e.preventDefault();simulate();});
  document.getElementById('downloadSim')?.addEventListener('click',()=>{if(!simData.length)simulate();const csv='frequency_Hz,Zreal_ohm,Zimag_ohm,|Z|_ohm,phase_deg\n'+simData.map(d=>[d.f,d.re,d.im,d.mag,d.phase].join(',')).join('\n');const blob=new Blob([csv],{type:'text/csv'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='eis_simulation.csv';a.click();URL.revokeObjectURL(a.href);});

  function parseData(text){const rows=[];text.split(/\r?\n/).forEach(line=>{const s=line.trim();if(!s||s.startsWith('#'))return;const parts=s.split(/[\t,; ]+/).filter(Boolean).map(Number);if(parts.length>=3&&parts.slice(0,3).every(Number.isFinite))rows.push({f:parts[0],re:parts[1],im:parts[2]});});return rows.filter(d=>d.f>0).sort((a,b)=>b.f-a.f);}
  function analyzeData(){const data=parseData(document.getElementById('dataInput').value);if(data.length<3){out('dataStatus','At least three numeric rows are required · يلزم ثلاثة صفوف رقمية');return;}drawNyquist(document.getElementById('dataCanvas'),data,'Imported data / بيانات مستوردة');const peak=data.reduce((p,d)=>-d.im>-p.im?d:p,data[0]);document.getElementById('kpiPoints').textContent=data.length;document.getElementById('kpiRs').textContent=`${nice(data[0].re)} Ω`;document.getElementById('kpiImag').textContent=`${nice(-peak.im)} Ω`;document.getElementById('kpiPeak').textContent=`${nice(peak.f)} Hz`;out('dataStatus','Descriptive estimates only. Validate sign convention, stability, frequency order, and model before interpretation. · تقديرات وصفية فقط؛ تحقق قبل التفسير.');}
  document.getElementById('plotData')?.addEventListener('click',analyzeData);
  document.getElementById('loadSample')?.addEventListener('click',()=>{document.getElementById('dataInput').value='100000,10.1,-0.2\n30000,10.5,-1.0\n10000,12.0,-4.5\n3000,18.0,-14.0\n1000,32.0,-30.0\n300,58.0,-45.0\n100,84.0,-40.0\n30,101.0,-25.0\n10,109.0,-16.0\n3,114.0,-15.0\n1,120.0,-20.0\n0.3,132.0,-32.0\n0.1,150.0,-50.0';analyzeData();});

  const navLinks=[...document.querySelectorAll('.sidebar a[href^="#"]')];
  const observed=navLinks.map(a=>document.querySelector(a.getAttribute('href'))).filter(Boolean);
  const observer=new IntersectionObserver(entries=>{const v=entries.filter(e=>e.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];if(!v)return;navLinks.forEach(a=>a.classList.toggle('active',a.getAttribute('href')===`#${v.target.id}`));},{rootMargin:'-25% 0px -65% 0px',threshold:[0,.1,.5]});
  observed.forEach(el=>observer.observe(el));
  window.addEventListener('scroll',()=>backTop?.classList.toggle('show',window.scrollY>700));
  backTop?.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));
  window.addEventListener('resize',()=>{if(simData.length){drawNyquist(document.getElementById('nyquistCanvas'),simData,'Simulated Nyquist');drawBode(document.getElementById('bodeCanvas'),simData);}const data=parseData(document.getElementById('dataInput')?.value||'');if(data.length>=3)drawNyquist(document.getElementById('dataCanvas'),data,'Imported data / بيانات مستوردة');});
  simulate(); analyzeData();
})();
