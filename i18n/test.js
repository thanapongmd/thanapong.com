const {chromium,devices}=require('playwright');(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});
const errs=[];
for(const [l,w] of [['th',1300],['zh',1300],['de',1300],['ja',390],['it',390],['th',390],['de',390]]){
 const c=await b.newContext(w<500?{...devices['iPhone 13']}:{viewport:{width:w,height:900}});const p=await c.newPage();p.on('pageerror',e=>errs.push(l+':'+e.message));
 await p.goto('file://'+process.argv[2]);
 await p.click('#lang-btn');await p.click(`#lang-menu button[data-lang="${l}"]`);await p.waitForTimeout(400);
 const sw=await p.evaluate(()=>document.documentElement.scrollWidth-innerWidth);
 const left=await p.evaluate(()=>{const re=/\b(the|and|with|your|for)\b/i;return [...document.querySelectorAll('h1,h2,h3,p,li,a,b,span,caption,summary')].filter(e=>e.children.length===0&&re.test(e.textContent)&&!e.closest('#publications')&&!e.closest('#honors .pubs')).slice(0,6).map(e=>e.textContent.slice(0,60))});
 console.log(l,w,'overflow',sw,'english-left',JSON.stringify(left));
 await p.screenshot({path:process.argv[3]+`/shot-${l}-${w}.png`});
 if(w<500){await p.evaluate(()=>{document.documentElement.style.scrollBehavior='auto';document.querySelector('#clinics').scrollIntoView()});await p.waitForTimeout(300);await p.screenshot({path:process.argv[3]+`/clin-${l}-${w}.png`})}
 await c.close();}
console.log('errors',errs);await b.close();})();
