<script>
// Translations are keyed by the English HTML of each element. Edit English text in the page as usual;
// any element whose English changes falls back to English until its translation in #i18n-data is updated.
(function(){
  var SEL=__SEL__;
  var data={};try{data=JSON.parse(document.getElementById('i18n-data').textContent)}catch(e){}
  var names={en:'EN',th:'TH',zh:'中文',de:'DE',ja:'日本語'};
  var els=[];
  SEL.forEach(function(s){document.querySelectorAll(s).forEach(function(e){if(els.indexOf(e)<0)els.push(e)})});
  els.forEach(function(e){e._en=e.innerHTML;e._k=e.innerHTML.replace(/\s+/g,' ').trim()});
  var btn=document.getElementById('lang-btn'),menu=document.getElementById('lang-menu');
  function apply(l){
    if(l!=='en'&&!data[l])l='en';
    var d=data[l]||{};
    els.forEach(function(e){var t=l!=='en'&&d[e._k];e.innerHTML=t||e._en});
    document.documentElement.lang=l;
    document.querySelectorAll('.week td[data-day]').forEach(function(td){var th=document.querySelector('.week th[data-d="'+td.getAttribute('data-d')+'"]');if(th)td.setAttribute('data-day',th.textContent)});
    btn.querySelector('.lang-cur').textContent=names[l];
    menu.querySelectorAll('button').forEach(function(b){b.setAttribute('aria-current',b.getAttribute('data-lang')===l?'true':'false')});
    try{localStorage.setItem('lang',l)}catch(e){}
  }
  function close(){menu.hidden=true;btn.setAttribute('aria-expanded','false')}
  btn.addEventListener('click',function(e){e.stopPropagation();var open=menu.hidden;menu.hidden=!open;btn.setAttribute('aria-expanded',open?'true':'false');if(open){var c=menu.querySelector('[aria-current="true"]')||menu.querySelector('button');c.focus()}});
  menu.addEventListener('click',function(e){var b=e.target.closest('button[data-lang]');if(!b)return;apply(b.getAttribute('data-lang'));close();btn.focus()});
  document.addEventListener('click',function(e){if(!menu.hidden&&!e.target.closest('.lang'))close()});
  document.addEventListener('keydown',function(e){if(e.key==='Escape'&&!menu.hidden){close();btn.focus()}});
  var start='en';
  try{var q=new URLSearchParams(location.search).get('lang');if(q&&names[q])start=q;else{var s=localStorage.getItem('lang');if(s&&names[s])start=s}}catch(e){}
  apply(start);
})();
</script>
