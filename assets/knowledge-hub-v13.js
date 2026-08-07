(()=>{
  'use strict';
  const grid=document.querySelector('#hub-resource-grid');
  if(!grid)return;
  const search=document.querySelector('#hub-search');
  const type=document.querySelector('#hub-type');
  const topic=document.querySelector('#hub-topic');
  const access=document.querySelector('#hub-access');
  const empty=document.querySelector('#hub-empty');
  let items=[];

  const language=()=>document.documentElement.lang==='ar'?'ar':'en';
  const clear=element=>{while(element.firstChild)element.removeChild(element.firstChild)};
  const safeHref=value=>{
    const href=String(value||'').trim();
    if(/^(?:[a-zA-Z0-9][a-zA-Z0-9._/-]*(?:\.html)?(?:[?#][^\s]*)?|#[a-zA-Z][\w:-]*)$/.test(href))return href;
    return 'knowledge-hub.html';
  };
  const tag=text=>{const span=document.createElement('span');span.className='hub-tag';span.textContent=String(text||'');return span};

  function createCard(item,lang){
    const title=item[`title_${lang}`]||item.title_en||'';
    const description=item[`description_${lang}`]||item.description_en||'';
    const protectedAccess=false;
    const card=document.createElement('article');
    card.className='hub-card';
    card.dataset.resource=String(item.id||'');

    const meta=document.createElement('div');
    meta.className='hub-card-meta';
    meta.append(
      tag(item[`type_${lang}`]||item.type_en||''),
      tag(item[`topic_${lang}`]||item.topic_en||''),
      tag(item[`level_${lang}`]||item.level_en||'')
    );

    const heading=document.createElement('h3');
    heading.textContent=title;
    const paragraph=document.createElement('p');
    paragraph.textContent=description;

    const actions=document.createElement('div');
    actions.className='hub-card-actions';
    const link=document.createElement('a');
    link.className='primary';
    link.href=safeHref(item.url);
    link.textContent=(lang==='ar'?'فتح المقرر':'Open Course');

    const status=document.createElement('span');
    status.className=`v13-status-pill ${item.access==='public'?'v13-status-public':item.access==='registered'?'v13-status-registered':'v13-status-enrolled'}`;
    status.textContent=`${protectedAccess?'🔒 ':''}${item[`access_${lang}`]||item.access_en||''}`;
    actions.append(link,status);
    card.append(meta,heading,paragraph,actions);
    return card;
  }

  function render(){
    const lang=language();
    const query=(search.value||'').trim().toLocaleLowerCase(lang==='ar'?'ar':'en');
    const typeValue=type.value;
    const topicValue=topic.value;
    const accessValue=access.value;
    const filtered=items.filter(item=>{
      const haystack=[item.title_en,item.title_ar,item.description_en,item.description_ar,item.topic_en,item.topic_ar,item.type_en,item.type_ar]
        .filter(Boolean).join(' ').toLocaleLowerCase(lang==='ar'?'ar':'en');
      return(!query||haystack.includes(query))&&(!typeValue||item.type===typeValue)&&(!topicValue||item.topic===topicValue)&&(!accessValue||item.access===accessValue);
    });
    clear(grid);
    filtered.forEach(item=>grid.append(createCard(item,lang)));
    empty.hidden=filtered.length>0;
  }

  fetch('assets/data/knowledge-hub-resources.json',{credentials:'same-origin'})
    .then(response=>{if(!response.ok)throw new Error('Resource catalogue unavailable');return response.json()})
    .then(data=>{items=Array.isArray(data)?data:[];render()})
    .catch(()=>{empty.hidden=false});
  [search,type,topic,access].forEach(element=>element.addEventListener(element===search?'input':'change',render));
  window.addEventListener('kfk:language',render);
})();
