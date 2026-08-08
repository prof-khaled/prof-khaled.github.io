
const body=document.body;
const search=document.getElementById('search');
const completed=new Set(JSON.parse(localStorage.getItem('corrosionComplete')||'[]'));

function updateProgress(){
  document.querySelectorAll('.progress-btn').forEach(btn=>{
    const id=btn.dataset.module;
    const done=completed.has(id);
    btn.classList.toggle('done',done);
    btn.setAttribute('aria-pressed',String(done));
    btn.textContent=done?'Completed ✓':'Mark complete';
  });
  const pct=(completed.size/10)*100;
  document.getElementById('courseProgress').style.width=pct+'%';
  document.getElementById('progressText').textContent=`${completed.size} of 10 modules complete`;
  localStorage.setItem('corrosionComplete',JSON.stringify([...completed]));
}
document.querySelectorAll('.progress-btn').forEach(btn=>btn.addEventListener('click',()=>{
  const id=btn.dataset.module;
  completed.has(id)?completed.delete(id):completed.add(id);
  updateProgress();
}));
updateProgress();

let langMode=0;
document.getElementById('langToggle').addEventListener('click',()=>{
  langMode=(langMode+1)%3;
  body.classList.remove('en-only','ar-only');
  if(langMode===1) body.classList.add('en-only');
  if(langMode===2) body.classList.add('ar-only');
});
let size=16;
document.getElementById('fontUp').addEventListener('click',()=>{size=Math.min(22,size+1);document.documentElement.style.setProperty('--base',size+'px')});
document.getElementById('fontDown').addEventListener('click',()=>{size=Math.max(13,size-1);document.documentElement.style.setProperty('--base',size+'px')});
document.getElementById('contrastToggle').addEventListener('click',()=>body.classList.toggle('high-contrast'));
document.getElementById('printBtn').addEventListener('click',()=>window.print());

search.addEventListener('input',()=>{
  const q=search.value.trim().toLowerCase();
  document.querySelectorAll('.searchable').forEach(el=>{
    el.classList.toggle('search-hidden',q && !el.innerText.toLowerCase().includes(q));
  });
});

function bindCalc(id,fn){
  document.getElementById(id).addEventListener('submit',e=>{
    e.preventDefault();
    const f=new FormData(e.currentTarget);
    try{ e.currentTarget.querySelector('output').textContent=fn(f); }
    catch(err){ e.currentTarget.querySelector('output').textContent='Check input values';}
  });
}
bindCalc('currentDensityCalc',f=>{
  const I=+f.get('I'),A=+f.get('A'); if(A<=0) throw 0;
  return `i = I/A = ${(I/A).toFixed(4)} mA/cm²`;
});
bindCalc('inhibitorCalc',f=>{
  const a=+f.get('cr0'),b=+f.get('cri'); if(a<=0) throw 0;
  return `IE = ${(((a-b)/a)*100).toFixed(2)}%`;
});
bindCalc('remainingLifeCalc',f=>{
  const tc=+f.get('tc'),tm=+f.get('tm'),cr=+f.get('cr'); if(cr<=0||tc<tm) throw 0;
  return `RL = ${((tc-tm)/cr).toFixed(2)} years`;
});
bindCalc('allowanceCalc',f=>{
  const cr=+f.get('cr'),life=+f.get('life'),sf=+f.get('sf'); if(cr<0||life<0||sf<=0) throw 0;
  return `CA = ${(cr*life*sf).toFixed(3)} mm`;
});
bindCalc('cpCalc',f=>{
  const area=+f.get('area'),id=+f.get('id'),fc=+f.get('fc'); if(area<0||id<0||fc<0) throw 0;
  return `Ireq = ${(area*id*fc/1000).toFixed(3)} A`;
});
bindCalc('pittingCalc',f=>{
  const max=+f.get('max'),avg=+f.get('avg'); if(avg<=0) throw 0;
  return `PF = ${(max/avg).toFixed(2)}`;
});
