'use strict';

const TEACHER_EMAIL='olegmiisrael@gmail.com';

function teacherClient(){
  const cfg=window.AGS_SUPABASE;
  if(!cfg||!window.supabase)return null;
  if(!teacherClient._sb)teacherClient._sb=window.supabase.createClient(cfg.url,cfg.anonKey,{
    auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true}
  });
  return teacherClient._sb;
}

function fmtWhen(iso){
  try{
    return new Date(iso).toLocaleString('en-GB',{timeZone:'Europe/Riga',dateStyle:'medium',timeStyle:'short'})+' (Europe/Riga)';
  }catch{
    return String(iso||'');
  }
}
function fmtSize(n){
  const x=Number(n)||0;
  if(x<1024)return x+' B';
  if(x<1024*1024)return (x/1024).toFixed(1)+' KB';
  return (x/(1024*1024)).toFixed(1)+' MB';
}
function escapeHTML(s){
  return String(s??'').replace(/[&<>"']/g,c=>({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[c]));
}

function showPanel(id){
  document.querySelectorAll('[data-panel]').forEach(el=>{el.hidden=el.dataset.panel!==id});
}

function setAuthMsg(text,kind){
  const el=document.getElementById('authMsg');
  if(!el)return;
  el.className='drop-status '+(kind||'');
  el.textContent=text||'';
}

async function requestLink(email){
  const sb=teacherClient();
  if(!sb)throw Error('Teacher view is not ready.');
  const clean=String(email||'').trim().toLowerCase();
  if(clean!==TEACHER_EMAIL)throw Error('This page is only for the teacher account.');
  const redirectTo=window.location.origin+window.location.pathname;
  const {error}=await sb.auth.signInWithOtp({
    email:clean,
    options:{emailRedirectTo:redirectTo,shouldCreateUser:true}
  });
  if(error)throw Error(error.message||'Could not send the sign-in link.');
}

async function loadRows(){
  const sb=teacherClient();
  const {data:{session}}=await sb.auth.getSession();
  if(!session)return {session:null,rows:[]};
  const email=(session.user&&session.user.email||'').toLowerCase();
  if(email!==TEACHER_EMAIL){
    await sb.auth.signOut();
    throw Error('This page is only for the teacher account.');
  }
  const {data,error}=await sb.from('submissions').select('id,created_at,class,nickname,path,mime,size,flagged').order('created_at',{ascending:false});
  if(error)throw Error(error.message||'Could not load submissions.');
  const rows=[];
  for(const row of data||[]){
    const signed=await sb.storage.from('l4-submissions').createSignedUrl(row.path,60*60);
    rows.push({
      ...row,
      url:signed.data&&signed.data.signedUrl||'',
      signError:signed.error?signed.error.message:''
    });
  }
  return {session,rows};
}

function renderRows(rows){
  const box=document.getElementById('fileList');
  const empty=document.getElementById('emptyList');
  if(!rows.length){
    box.innerHTML='';
    empty.hidden=false;
    return;
  }
  empty.hidden=true;
  box.innerHTML=rows.map(row=>{
    const name=String(row.path||'').split('/').pop();
    const flag=row.flagged?'<span class="flag">Flagged</span>':'';
    const link=row.url
      ?`<a class="btn-link" href="${escapeHTML(row.url)}" target="_blank" rel="noopener noreferrer">Open</a>
         <a class="btn-link" href="${escapeHTML(row.url)}" download="${escapeHTML(name)}">Download</a>`
      :`<span class="file-hint">${escapeHTML(row.signError||'No download link')}</span>`;
    const preview=row.mime&&row.mime.startsWith('image/')&&row.url
      ?`<img class="teacher-thumb" src="${escapeHTML(row.url)}" alt="">`
      :'';
    return `<article class="teacher-card">
      ${preview}
      <div>
        <p class="teacher-meta"><strong>${escapeHTML(row.class)}</strong> · ${escapeHTML(row.nickname)} ${flag}</p>
        <p class="file-hint">${escapeHTML(name)} · ${escapeHTML(row.mime)} · ${fmtSize(row.size)}</p>
        <p class="file-hint">${escapeHTML(fmtWhen(row.created_at))}</p>
        <p class="teacher-actions">${link}</p>
      </div>
    </article>`;
  }).join('');
}

async function refresh(){
  const who=document.getElementById('who');
  try{
    const {session,rows}=await loadRows();
    if(!session){
      showPanel('signin');
      return;
    }
    who.textContent='Signed in as '+session.user.email;
    showPanel('inbox');
    renderRows(rows);
  }catch(err){
    showPanel('signin');
    setAuthMsg((err&&err.message)||'Could not open the inbox.','bad');
  }
}

document.addEventListener('DOMContentLoaded',()=>{
  const sb=teacherClient();
  if(!sb){
    setAuthMsg('Teacher view is not ready. Check supabase-config.js.','bad');
    return;
  }
  document.getElementById('signInForm').addEventListener('submit',async e=>{
    e.preventDefault();
    const email=document.getElementById('teacherEmail').value;
    const btn=document.getElementById('sendLink');
    btn.disabled=true;
    setAuthMsg('Sending a sign-in link...','busy');
    try{
      await requestLink(email);
      setAuthMsg('If this is the teacher inbox, open the email and use the sign-in link. It may take a minute.','ok');
    }catch(err){
      setAuthMsg((err&&err.message)||'Could not send the sign-in link.','bad');
    }finally{
      btn.disabled=false;
    }
  });
  document.getElementById('signOut').addEventListener('click',async()=>{
    await sb.auth.signOut();
    showPanel('signin');
    setAuthMsg('Signed out.','ok');
  });
  document.getElementById('reload').addEventListener('click',refresh);
  sb.auth.onAuthStateChange(()=>{refresh()});
  refresh();
});
