import json,re,os,sys
d=os.path.dirname(os.path.abspath(__file__));site=os.path.join(d,'..','site','index.html')
s=open(site).read()
sel=open(os.path.join(d,'sel.js')).read();sel=sel[sel.index('['):sel.rindex(']')+1]
en=json.load(open(os.path.join(d,'en.json')))
data={}
for l in ['th','zh','de','ja','it']:
    f=os.path.join(d,l+'.json')
    if os.path.exists(f):
        t=json.load(open(f)); data[l]={k:v for k,v in t.items() if k in en and v}
ex=json.load(open(os.path.join(d,'extra.json')))
for l in ex: data.setdefault(l,{}).update(ex[l])
js=json.dumps(data,ensure_ascii=False).replace('</','<\\/')
rt=open(os.path.join(d,'runtime.js')).read().replace('__SEL__',sel)
block='<!--i18n:start-->\n<script type="application/json" id="i18n-data">'+js+'</script>\n'+rt+'<!--i18n:end-->'
if '<!--i18n:start-->' in s: s=re.sub(r'<!--i18n:start-->.*?<!--i18n:end-->',lambda m:block,s,flags=re.S)
else:
    i=s.rindex('</script>')+len('</script>'); s=s[:i]+'\n'+block+s[i:]
open(site,'w').write(s)
print({k:len(v) for k,v in data.items()})
