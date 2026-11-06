'use strict';

const DROP_CLASSES=['9b','8b','8c','Year 3','6b','6c','Year 1'];
const DROP_SLUG={'9b':'9b','8b':'8b','8c':'8c','Year 3':'Year-3','6b':'6b','6c':'6c','Year 1':'Year-1'};
const DROP_MAX_BYTES=50*1024*1024;
const DROP_MAX_FILES=8;
const DROP_MIME={
  'image/png':['png'],
  'image/jpeg':['jpg','jpeg'],
  'image/webp':['webp'],
  'image/gif':['gif'],
  'application/pdf':['pdf'],
  'video/mp4':['mp4'],
  'application/msword':['doc'],
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document':['docx']
};
const DROP_ACCEPT=Object.keys(DROP_MIME).join(',')+',.png,.jpg,.jpeg,.webp,.gif,.pdf,.mp4,.doc,.docx';
const NSFW_LIMITS={Porn:0.5,Hentai:0.5,Sexy:0.75};
const TF_SRC='https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@4.22.0/dist/tf.min.js';
const NSFW_SRC='https://cdn.jsdelivr.net/npm/nsfwjs@2.4.2/dist/nsfwjs.min.js';
const BANNED_NICK=[
  'fuck','shit','bitch','asshole','arsehole','cunt','dick','pussy','faggot','nigger','nigga',
  'retard','whore','slut','porn','xxx','penis','vagina','anal','rape','nazi','cock',
  'blyat','blyad','suka','pidor','pidar','mudak','nahui','nahuy',
  'хуй','хуя','хуе','пизд','блять','бляд','сука','ебал','ебат','ёба','ебан','нахуй','пидор','пидар','мудак','залуп','гандон',
  'dirsa','pimpis','pizda','nahuj','mahuj','huja'
];

function dropClient(){
  const cfg=window.AGS_SUPABASE;
  if(!cfg||!window.supabase)return null;
  if(!dropClient._sb)dropClient._sb=window.supabase.createClient(cfg.url,cfg.anonKey,{auth:{persistSession:false,autoRefreshToken:false}});
  return dropClient._sb;
}

function normNick(raw){
  return String(raw||'').toLowerCase()
    .replace(/[@4]/g,'a').replace(/1/g,'i').replace(/3/g,'e').replace(/0/g,'o').replace(/[$5]/g,'s').replace(/7/g,'t')
    .replace(/[^a-zа-яёāčēģīķļņšūž]+/gi,'');
}
function nickIsBanned(raw){
  const n=normNick(raw);
  if(!n)return true;
  return BANNED_NICK.some(w=>n.includes(w));
}
function slugNick(raw){
  const cleaned=String(raw||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^A-Za-z0-9._-]+/g,'-').replace(/^-+|-+$/g,'').slice(0,40);
  return cleaned||'student';
}
function safeFileName(name){
  const base=String(name||'file').split(/[/\\]/).pop()||'file';
  return base.replace(/[^A-Za-z0-9._-]+/g,'-').replace(/^-+|-+$/g,'').slice(0,80)||'file';
}
function resolveMime(file){
  const ext=(String(file.name||'').split('.').pop()||'').toLowerCase();
  if(file.type==='image/jpg'&&(ext==='jpg'||ext==='jpeg'))return 'image/jpeg';
  if(file.type&&DROP_MIME[file.type]&&DROP_MIME[file.type].includes(ext))return file.type;
  for(const [mime,exts] of Object.entries(DROP_MIME)){
    if(exts.includes(ext))return mime;
  }
  return '';
}
function loadScriptOnce(src){
  return new Promise((resolve,reject)=>{
    const found=[...document.scripts].find(s=>s.src===src);
    if(found&&found.dataset.loaded==='1'){resolve();return}
    const s=found||document.createElement('script');
    const done=()=>{s.dataset.loaded='1';resolve()};
    s.addEventListener('load',done,{once:true});
    s.addEventListener('error',()=>reject(Error('Could not load the image safety check.')),{once:true});
    if(!found){s.src=src;document.head.appendChild(s)}
  });
}
async function ensureNsfw(){
  if(window.nsfwjs)return window.nsfwjs;
  await loadScriptOnce(TF_SRC);
  await loadScriptOnce(NSFW_SRC);
  if(!window.nsfwjs)throw Error('Could not load the image safety check.');
  return window.nsfwjs;
}
function fileToImage(file){
  return new Promise((resolve,reject)=>{
    const url=URL.createObjectURL(file);
    const img=new Image();
    img.onload=()=>{URL.revokeObjectURL(url);resolve(img)};
    img.onerror=()=>{URL.revokeObjectURL(url);reject(Error('Could not read this image.'))};
    img.src=url;
  });
}
async function classifyImage(img){
  if(typeof window.AGS_NSFW_CLASSIFY==='function')return window.AGS_NSFW_CLASSIFY(img);
  const nsfwjs=await ensureNsfw();
  if(!classifyImage._model)classifyImage._model=await nsfwjs.load();
  return classifyImage._model.classify(img);
}
function nsfwHit(preds){
  const list=Array.isArray(preds)?preds:[];
  return list.find(p=>{
    const limit=NSFW_LIMITS[p.className];
    return typeof limit==='number'&&Number(p.probability)>=limit;
  })||null;
}
function setStatus(el,kind,text){
  if(!el)return;
  el.className='drop-status '+(kind||'');
  el.textContent=text||'';
}

async function scanFile(file,mime){
  if(file.size<=0)return 'This file is empty.';
  if(file.size>DROP_MAX_BYTES)return file.name+' is over 50 MB.';
  if(!mime)return file.name+' must be PNG, JPEG, WebP, GIF, PDF, DOC/DOCX or MP4.';
  if(!mime.startsWith('image/'))return '';
  try{
    const img=await fileToImage(file);
    const preds=await classifyImage(img);
    if(nsfwHit(preds))return file.name+' did not pass the image safety check. Choose another file.';
  }catch(err){
    return (err&&err.message)||'Could not check this image.';
  }
  return '';
}

async function sendFiles({klass,nickname,files,onProgress}){
  const sb=dropClient();
  if(!sb)throw Error('Upload is not ready. Refresh the page and try again.');
  const slug=DROP_SLUG[klass];
  if(!slug)throw Error('Choose your class.');
  const nick=String(nickname||'').trim();
  if(nick.length<2||nick.length>40)throw Error('Write a nickname of 2 to 40 characters.');
  if(/[/\\<>]/.test(nick))throw Error('The nickname cannot contain slashes or brackets.');
  if(nickIsBanned(nick))throw Error('Please choose another nickname.');
  const list=[...files];
  if(!list.length)throw Error('Choose at least one file.');
  if(list.length>DROP_MAX_FILES)throw Error('You can send up to '+DROP_MAX_FILES+' files at once.');
  const prepared=[];
  for(const file of list){
    const mime=resolveMime(file);
    const problem=await scanFile(file,mime);
    if(problem)throw Error(problem);
    prepared.push({file,mime});
  }
  const sent=[];
  for(let i=0;i<prepared.length;i++){
    const {file,mime}=prepared[i];
    const path=slug+'/'+slugNick(nick)+'/'+Date.now()+'-'+Math.random().toString(36).slice(2,8)+'-'+safeFileName(file.name);
    if(onProgress)onProgress('Uploading '+(i+1)+' of '+prepared.length+': '+file.name);
    const up=await sb.storage.from('l4-submissions').upload(path,file,{contentType:mime,upsert:false});
    if(up.error)throw Error(up.error.message||'Could not upload '+file.name);
    const payload={class:klass,nickname:nick,path,mime,size:file.size,flagged:false};
    const row=await sb.from('submissions').insert(payload);
    if(row.error){
      const cfg=window.AGS_SUPABASE;
      const res=await fetch(cfg.url+'/rest/v1/submissions',{
        method:'POST',
        headers:{apikey:cfg.anonKey,Authorization:'Bearer '+cfg.anonKey,'Content-Type':'application/json',Prefer:'return=minimal'},
        body:JSON.stringify(payload)
      });
      if(!res.ok)throw Error(row.error.message||'File uploaded, but the note for Mr. Oleg failed. Try again.');
    }
    sent.push(path);
  }
  return sent;
}

function dropHTML(){
  const saved=(()=>{try{return JSON.parse(localStorage.getItem('ags-drop-meta')||'{}')}catch{return {}}})();
  const classOpts=DROP_CLASSES.map(c=>`<option value="${c}" ${saved.class===c?'selected':''}>${c}</option>`).join('');
  return `<section class="work-drop" id="workDrop" aria-labelledby="workDropTitle">
    <h3 id="workDropTitle">Send your work to Mr. Oleg</h3>
    <p class="drop-lead">Upload screenshots, your pitch deck (PDF or Word) or a short trailer. Images are checked before upload. Files go to a private folder that only Mr. Oleg can see. Use a nickname, not your real full name.</p>
    <form id="workDropForm" class="grid">
      <div class="field"><label for="dropClass">Class</label>
        <select id="dropClass" required><option value="">Choose your class</option>${classOpts}</select>
      </div>
      <div class="field"><label for="dropNick">Nickname (no real full name)</label>
        <input id="dropNick" type="text" maxlength="40" autocomplete="off" required value="${String(saved.nickname||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}">
      </div>
      <div class="field wide"><label for="dropFiles">Your files</label>
        <input id="dropFiles" type="file" multiple accept="${DROP_ACCEPT}">
        <p class="file-hint">PNG, JPEG, WebP, GIF, PDF, DOC/DOCX or MP4. Up to 50 MB each, 8 files at a time.</p>
      </div>
      <div class="field wide"><button type="submit" class="primary" id="dropSend">Send files</button></div>
    </form>
    <p class="drop-status" id="dropStatus" role="status"></p>
  </section>`;
}

window.mountWorkDrop=function({lesson,step,isLast,root}){
  if(lesson!==4||!isLast||!root)return;
  if(root.querySelector('#workDrop'))return;
  root.insertAdjacentHTML('beforeend',dropHTML());
  const form=root.querySelector('#workDropForm');
  const status=root.querySelector('#dropStatus');
  form.addEventListener('submit',async e=>{
    e.preventDefault();
    const klass=form.querySelector('#dropClass').value;
    const nickname=form.querySelector('#dropNick').value;
    const files=form.querySelector('#dropFiles').files;
    const btn=form.querySelector('#dropSend');
    btn.disabled=true;
    setStatus(status,'busy','Checking files...');
    try{
      try{localStorage.setItem('ags-drop-meta',JSON.stringify({class:klass,nickname:String(nickname||'').trim()}))}catch{}
      const sent=await sendFiles({
        klass,nickname,files,
        onProgress:msg=>setStatus(status,'busy',msg)
      });
      form.querySelector('#dropFiles').value='';
      setStatus(status,'ok','Sent '+sent.length+' file'+(sent.length===1?'':'s')+' to Mr. Oleg. He can see them in the private folder.');
    }catch(err){
      setStatus(status,'bad',(err&&err.message)||'Could not send the files.');
    }finally{
      btn.disabled=false;
    }
  });
};

window.AGS_UPLOAD={sendFiles,scanFile,nickIsBanned,resolveMime,slugNick,DROP_CLASSES,DROP_MAX_BYTES};
