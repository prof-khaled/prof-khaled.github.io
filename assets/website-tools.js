(()=>{
'use strict';
const d=document, html=d.documentElement, cfg=window.PK_SITE_CONFIG||{};
const q=(s,c=d)=>c.querySelector(s), qa=(s,c=d)=>[...c.querySelectorAll(s)];
const lang=()=>html.lang==='ar'||html.dataset.lang==='ar'||html.dataset.view==='ar'?'ar':'en';
const t=(en,ar)=>lang()==='ar'?ar:en;
// Apply the stored/requested language before generating localized interface elements.
const requestedLang=new URLSearchParams(location.search).get('lang');
const initialLang=(requestedLang&&['en','ar'].includes(requestedLang))?requestedLang:localStorage.getItem('pk-language');
if(initialLang&&['en','ar'].includes(initialLang)){html.lang=initialLang;html.dir=initialLang==='ar'?'rtl':'ltr';html.dataset.view=initialLang}
const toast=(msg)=>{const e=d.createElement('div');e.className='pk-status-toast';e.setAttribute('role','status');e.textContent=msg;d.body.append(e);setTimeout(()=>e.remove(),2600)};
// Skip link and main landmark
let main=q('main'); if(main&&!main.id) main.id='main-content';
if(main&&!q('.pk-skip-link')){const a=d.createElement('a');a.className='pk-skip-link';a.href='#'+main.id;a.textContent='Skip to main content / تخطَّ إلى المحتوى';d.body.prepend(a)}
// Reading progress
const progress=d.createElement('div');progress.className='pk-reading-progress';progress.setAttribute('aria-hidden','true');d.body.append(progress);
const updateProgress=()=>{const max=d.documentElement.scrollHeight-innerHeight;progress.style.width=(max>0?Math.min(100,scrollY/max*100):0)+'%'};addEventListener('scroll',updateProgress,{passive:true});updateProgress();
// Preferences
const prefs=JSON.parse(localStorage.getItem('pk-accessibility')||'{}');
const apply=()=>{html.classList.toggle('pk-high-contrast',!!prefs.contrast);html.classList.toggle('pk-reduce-motion',!!prefs.motion);html.classList.remove('pk-text-large','pk-text-xlarge');if(prefs.text==='large')html.classList.add('pk-text-large');if(prefs.text==='xlarge')html.classList.add('pk-text-xlarge')};apply();
const launcher=d.createElement('button');launcher.className='pk-tools-launcher';launcher.type='button';launcher.setAttribute('aria-label','Website tools and accessibility / أدوات الموقع وإتاحة الوصول');launcher.setAttribute('aria-expanded','false');launcher.textContent='Aa';
const panel=d.createElement('aside');panel.className='pk-tools-panel';panel.id='pk-tools-panel';panel.setAttribute('aria-hidden','true');panel.innerHTML=`<h2>Website tools · أدوات الموقع</h2><div class="pk-tools-grid">
<button class="pk-tool-btn" data-pk="text" type="button">Text size · حجم النص</button>
<button class="pk-tool-btn" data-pk="contrast" type="button">High contrast · تباين عالٍ</button>
<button class="pk-tool-btn" data-pk="motion" type="button">Reduce motion · تقليل الحركة</button>
<button class="pk-tool-btn" data-pk="theme" type="button">Dark mode · الوضع الداكن</button>
<button class="pk-tool-btn" data-pk="print" type="button">Print · طباعة</button>
<button class="pk-tool-btn" data-pk="share" type="button">Share · مشاركة</button>
<button class="pk-tool-btn" data-pk="copy" type="button">Copy link · نسخ الرابط</button>
<a class="pk-tool-btn pk-admin-link" href="${cfg.cmsAdminPath||'admin/'}">CMS · إدارة المحتوى</a>
<button class="pk-tool-btn pk-tool-wide" data-pk="reset" type="button">Reset preferences · إعادة الضبط</button></div>
<p class="pk-tools-note">Preferences are saved on this device. تُحفظ التفضيلات على هذا الجهاز.</p>`;
d.body.append(panel,launcher);
const syncButtons=()=>{q('[data-pk="contrast"]',panel)?.setAttribute('aria-pressed',String(!!prefs.contrast));q('[data-pk="motion"]',panel)?.setAttribute('aria-pressed',String(!!prefs.motion));};syncButtons();
const save=()=>{localStorage.setItem('pk-accessibility',JSON.stringify(prefs));apply();syncButtons()};
launcher.onclick=()=>{const open=panel.getAttribute('aria-hidden')==='true';panel.setAttribute('aria-hidden',String(!open));launcher.setAttribute('aria-expanded',String(open));if(open)q('button,a',panel)?.focus()};
d.addEventListener('keydown',e=>{if(e.key==='Escape'&&panel.getAttribute('aria-hidden')==='false'){panel.setAttribute('aria-hidden','true');launcher.setAttribute('aria-expanded','false');launcher.focus()}});
panel.addEventListener('click',async e=>{const key=e.target.closest('[data-pk]')?.dataset.pk;if(!key)return;
 if(key==='text'){prefs.text=prefs.text==='large'?'xlarge':prefs.text==='xlarge'?'normal':'large';save();toast(t('Text size updated','تم تحديث حجم النص'))}
 if(key==='contrast'){prefs.contrast=!prefs.contrast;save()}
 if(key==='motion'){prefs.motion=!prefs.motion;save()}
 if(key==='theme'){q('[data-v4-theme]')?.click()}
 if(key==='print')print();
 if(key==='copy'){await navigator.clipboard.writeText(location.href);toast(t('Link copied','تم نسخ الرابط'))}
 if(key==='share'){if(navigator.share)await navigator.share({title:d.title,url:location.href});else{await navigator.clipboard.writeText(location.href);toast(t('Link copied','تم نسخ الرابط'))}}
 if(key==='reset'){Object.keys(prefs).forEach(k=>delete prefs[k]);save();localStorage.removeItem('pk-theme');d.body.classList.remove('v4-dark');toast(t('Preferences reset','تمت إعادة ضبط التفضيلات'))}
});
// Reading time and page actions
if(main){const words=(main.innerText||'').trim().split(/\s+/).length;const mins=Math.max(1,Math.round(words/220));const bar=d.createElement('div');bar.className='pk-page-tools';bar.setAttribute('aria-label','Page tools');bar.innerHTML=`<button type="button" data-page-tool="print">${t('Print page','طباعة الصفحة')}</button><button type="button" data-page-tool="share">${t('Share','مشاركة')}</button><button type="button" data-page-tool="copy">${t('Copy link','نسخ الرابط')}</button><span aria-label="Estimated reading time">${mins} ${t('min read','دقيقة قراءة')}</span>`;
 const anchor=q('.breadcrumb, .breadcrumbs, h1',main); if(anchor)anchor.insertAdjacentElement(anchor.matches('h1')?'afterend':'afterend',bar); else main.prepend(bar);
 bar.onclick=async e=>{const k=e.target.dataset.pageTool;if(k==='print')print();if(k==='copy'){await navigator.clipboard.writeText(location.href);toast(t('Link copied','تم نسخ الرابط'))}if(k==='share'){if(navigator.share)navigator.share({title:d.title,url:location.href});else navigator.clipboard.writeText(location.href)}};
 // On this page generated from section headings. Keep both languages in the DOM so switching language never leaves an English-only title.
 const heads=qa('section h2, main>h2',main).filter(h=>!h.closest('.contact-section')&&(h.textContent||'').trim()).slice(0,12);
 if(heads.length>=3){
   heads.forEach((h,i)=>{if(!h.id)h.id='section-'+(i+1)});
   const nav=d.createElement('nav');nav.className='pk-on-this-page';nav.setAttribute('aria-label',t('On this page','في هذه الصفحة'));
   const title=d.createElement('h2');
   const titleEn=d.createElement('span');titleEn.className='en';titleEn.textContent='On this page';
   const titleAr=d.createElement('span');titleAr.className='ar';titleAr.textContent='في هذه الصفحة';
   title.append(titleEn,titleAr);nav.append(title);
   const list=d.createElement('ol');
   heads.forEach(h=>{
     const li=d.createElement('li'),a=d.createElement('a');a.href='#'+h.id;
     const enSource=h.querySelector('.en,[data-lang-inline="en"],[data-lang="en"]');
     const arSource=h.querySelector('.ar,[data-lang-inline="ar"],[data-lang="ar"]');
     if(enSource||arSource){
       const en=d.createElement('span');en.className='en';en.textContent=(enSource?.textContent||h.textContent||'').trim();
       const ar=d.createElement('span');ar.className='ar';ar.textContent=(arSource?.textContent||en.textContent).trim();
       a.append(en,ar);
     }else a.textContent=(h.textContent||'').trim();
     li.append(a);list.append(li);
   });
   nav.append(list);bar.insertAdjacentElement('afterend',nav);
   const updateOnPageLabel=()=>nav.setAttribute('aria-label',t('On this page','في هذه الصفحة'));
   window.addEventListener('kfk:language',updateOnPageLabel);updateOnPageLabel();
 }
}
// Preserve language preference when existing controls switch language.
d.addEventListener('click',e=>{const b=e.target.closest('[data-lang],[data-language],[data-kfk-lang],#language-toggle');if(!b)return;setTimeout(()=>{const l=html.lang==='ar'||html.dataset.view==='ar'?'ar':'en';localStorage.setItem('pk-language',l)},0)});
// Analytics, loaded only after owner configures a domain
if(cfg.plausibleDomain){const s=d.createElement('script');s.defer=true;s.dataset.domain=cfg.plausibleDomain;s.src='https://plausible.io/js/script.js';d.head.append(s);window.plausible=window.plausible||function(){(window.plausible.q=window.plausible.q||[]).push(arguments)};d.addEventListener('click',e=>{const a=e.target.closest('a');if(!a)return;const event=a.href.includes('doi.org')?'DOI Click':a.hasAttribute('download')?'File Download':a.href.includes('orcid.org')?'ORCID Click':null;if(event)window.plausible(event,{props:{url:a.href,page:location.pathname}})})}
// Turnstile injected only when configured
if(cfg.turnstileSiteKey){const forms=qa('form');if(forms.length){const s=d.createElement('script');s.src='https://challenges.cloudflare.com/turnstile/v0/api.js';s.async=true;s.defer=true;d.head.append(s);forms.forEach(f=>{const x=d.createElement('div');x.className='cf-turnstile';x.dataset.sitekey=cfg.turnstileSiteKey;const submit=q('[type="submit"]',f);submit?submit.before(x):f.append(x)})}}
})();
