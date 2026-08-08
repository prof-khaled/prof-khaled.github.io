(()=>{
 const script=document.currentScript; const configUrl=new URL('data/course-ai-assistants.json',script.src);
 const body=document.body;
 function setMode(mode){
   if(!['en','ar','both'].includes(mode)) mode='en';
   body.dataset.courseLang=mode;
   document.documentElement.lang=mode==='ar'?'ar':'en';
   document.documentElement.dir=mode==='ar'?'rtl':'ltr';
   document.querySelectorAll('[data-course-lang-btn]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.courseLangBtn===mode)));
 }
 // Requirement: every page starts in English, independent of previous site preference.
 setMode('en');
 document.querySelectorAll('[data-course-lang-btn]').forEach(btn=>btn.addEventListener('click',()=>setMode(btn.dataset.courseLangBtn)));
 fetch(configUrl,{credentials:'omit'}).then(r=>r.ok?r.json():Promise.reject()).then(cfg=>{
   document.querySelectorAll('[data-course-ai]').forEach(a=>{
     const d=cfg[a.dataset.courseAi]; if(!d) return;
     a.href=d.url; a.target='_blank'; a.rel='noopener noreferrer';
     a.setAttribute('aria-label',`Open the ${d.course} AI Course Assistant in NotebookLM (opens in a new tab)`);
   });
 }).catch(()=>{});
})();
