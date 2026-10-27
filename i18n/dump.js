const {chromium}=require('playwright');const fs=require('fs');(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});
const p=await b.newPage();await p.goto('file://'+process.argv[2]);await p.addScriptTag({path:process.argv[3]});
const r=await p.evaluate(()=>{const seen=new Set(),out=[],els=[];for(const s of I18N_SEL)document.querySelectorAll(s).forEach(e=>{if(!els.includes(e))els.push(e)});
// nesting check
let nested=[];els.forEach(e=>{els.forEach(o=>{if(o!==e&&o.contains(e))nested.push(e.outerHTML.slice(0,80))})});
els.forEach(e=>{const k=e.innerHTML.replace(/\s+/g,' ').trim();if(k&&!seen.has(k)&&/[A-Za-z]/.test(k.replace(/<[^>]+>/g,''))){seen.add(k);out.push(k)}});return {out,nested}});
fs.writeFileSync(process.argv[4],JSON.stringify(r.out,null,1));console.log(r.out.length,'strings; nested:',r.nested.length,r.nested.slice(0,5));await b.close();})();
