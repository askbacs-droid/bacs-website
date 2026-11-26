(function(){
var r=document.documentElement;
/* day / night */
var tg=document.getElementById('tg');
function cur(){return r.getAttribute('data-theme')||(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light')}
function paint(){if(tg)tg.textContent=cur()==='dark'?'\u2600':'\u263e'}
try{var s=localStorage.getItem('bacs-theme');if(s==='dark'||s==='light')r.setAttribute('data-theme',s)}catch(e){}
paint();
if(tg)tg.addEventListener('click',function(){var n=cur()==='dark'?'light':'dark';r.setAttribute('data-theme',n);try{localStorage.setItem('bacs-theme',n)}catch(e){}paint()});
/* contact form -> email */
var f=document.getElementById('f');
if(f)f.addEventListener('submit',function(e){e.preventDefault();var d=new FormData(f);
var body='Name: '+d.get('name')+'\nEmail: '+d.get('email')+'\nService: '+d.get('service')+'\n\n'+d.get('msg');
document.getElementById('note').textContent='Opening your email app\u2026';
location.href='mailto:ask.bacs@gmail.com?subject='+encodeURIComponent('New enquiry: '+d.get('service'))+'&body='+encodeURIComponent(body)});
/* work gallery */
var cards=[].slice.call(document.querySelectorAll('.wc')),fl=document.getElementById('flt');
var names={video:'Videos',post:'Social posts',event:'Events'};
function mk(l,k){var b=document.createElement('button');b.type='button';b.textContent=l;b.dataset.f=k;if(k==='all')b.className='on';fl.appendChild(b)}
if(fl){mk('All','all');['video','post','event'].forEach(function(t){if(cards.some(function(c){return c.dataset.t===t}))mk(names[t],t)});
fl.addEventListener('click',function(e){var b=e.target.closest('button');if(!b)return;[].forEach.call(fl.children,function(x){x.classList.remove('on')});b.classList.add('on');cards.forEach(function(c){c.hidden=b.dataset.f!=='all'&&c.dataset.t!==b.dataset.f})})}
var md=document.getElementById('md'),mf=document.getElementById('mf'),mt=document.getElementById('mt'),i=0;
function vis(){return cards.filter(function(c){return !c.hidden})}
function show(c){mf.textContent='';
if(c.dataset.video){var v=document.createElement('video');v.controls=true;v.autoplay=true;v.playsInline=true;v.preload='metadata';if(c.dataset.poster)v.poster=c.dataset.poster;v.src=c.dataset.video;mf.appendChild(v)}
else{var im=document.createElement('img');im.src=c.dataset.full;im.alt=c.dataset.cap;mf.appendChild(im)}
mt.textContent=c.dataset.cap;md.classList.add('on')}
function close(){md.classList.remove('on');mf.textContent=''}
function step(d){var v=vis();if(!v.length)return;i=(v.indexOf(cards[i])+d+v.length)%v.length;i=cards.indexOf(v[i]);show(cards[i])}
cards.forEach(function(c,n){c.addEventListener('click',function(){i=n;show(c)})});
if(md){document.getElementById('mx').addEventListener('click',close);
document.getElementById('pv').addEventListener('click',function(){step(-1)});
document.getElementById('nx').addEventListener('click',function(){step(1)});
md.addEventListener('click',function(e){if(e.target===md)close()});
document.addEventListener('keydown',function(e){if(!md.classList.contains('on'))return;if(e.key==='Escape')close();if(e.key==='ArrowLeft')step(-1);if(e.key==='ArrowRight')step(1)})}
})();
