'use strict';
// Shared helpers. Image links are cleaned silently; no under-field hints or network checks.
const IMAGE_KEYS=new Set(['common','epic','legendary','heroImage','bossNormal','bossPhase2','arenaImage','cover','logo']);

function cleanImageURL(raw){
  let text=String(raw||'').trim().replace(/[\u200B-\u200D\uFEFF]/g,'');
  const match=text.match(/<img\b[^>]*\bsrc\s*=\s*["']([^"']+)["']/i)
    ||text.match(/\[img\]\s*([^\[]+)\s*\[\/img\]/i)
    ||text.match(/!\[[^\]]*\]\((https?:\/\/[^\s)]+)\)/i)
    ||text.match(/(https?:\/\/i\.ibb\.co\/[^\s"'<>]+)/i)
    ||text.match(/(https?:\/\/i\.postimg\.cc\/[^\s"'<>]+)/i)
    ||text.match(/(https?:\/\/i\.imgur\.com\/[^\s"'<>]+)/i);
  if(match)text=match[1].trim().replace(/&amp;/g,'&');
  text=text.replace(/^["']|["']$/g,'').replace(/[\r\n\t]/g,'').trim();
  let m;
  if((m=text.match(/^https?:\/\/(?:www\.|m\.)?imgur\.com\/([A-Za-z0-9]{5,8})(?:[?#].*)?$/)))
    return `https://i.imgur.com/${m[1]}.png`;
  if((m=text.match(/^https?:\/\/drive\.google\.com\/(?:file\/d\/([\w-]{20,})|(?:open|uc)\?(?:.*&)?id=([\w-]{20,}))/)))
    return `https://lh3.googleusercontent.com/d/${m[1]||m[2]}`;
  return text;
}

// Kept for compatibility; never shows UI text under URL fields.
function isDirectImageURL(){return true}
function imageLinkWarning(){return ''}
function linkAdvice(){return null}
function livePreview(){}

const IMAGE_RULES=`\n\n[IMAGES - LINKS MAY LOOK MESSY]\nStudents may paste any of these for each image slot:\n1) a direct file link such as https://i.ibb.co/.../file.png\n2) an ImgBB viewer page such as https://ibb.co/xxxxx\n3) raw HTML embed / BBCode that contains an image URL\n\nYou MUST:\n- If they pasted HTML or embed code, extract the real image URL (prefer https://i.ibb.co/... or https://i.postimg.cc/... found inside the HTML).\n- If they pasted an ibb.co viewer page, still use it: put that URL in <img src>, and also try the usual ImgBB full-size / open-graph image when you can resolve it. Do not refuse the build.\n- Use the student images only. Never invent, redraw, or replace the character art.\n- Keep natural proportions (object-fit: contain or cover as fits the layout). Never stretch faces.\n- If an image fails to load, show a clear "Image failed to load" placeholder in that slot and KEEP BUILDING the rest of the page. Do not stop, error out, or leave the page unfinished.\n`;

const ENHANCE_RULES=`\n[ART ENHANCEMENT - ALLOWED]\nThe uploaded image is the centerpiece and must stay fully visible and recognizable; never replace it. You MAY enhance around and over it with CSS/SVG/canvas effects: animated frame, glowing aura, element-themed particles, a background scene in the same art style, light rays and sparks.\n`;

const SHORT_A11Y='Responsive, no horizontal overflow on phones, alt text on images.';

const UPLOAD_HELP='<p class="upload-tip">Upload your photo to <a href="https://imgbb.com" target="_blank" rel="noopener noreferrer">imgbb</a> to get a URL.</p>';

const QWEN_NOTE='Use Thinking + Web Dev mode';

function guideShots(items){
  if(!items||!items.length)return '';
  return `<div class="guide-shots">${items.map(({src,caption})=>`
    <figure class="guide-shot">
      <img src="${src}" alt="${escapeGuide(caption||'Example')}" loading="lazy" width="160" height="120">
      ${caption?`<figcaption>${escapeGuide(caption)}</figcaption>`:''}
    </figure>`).join('')}</div>`;
}
function escapeGuide(s){return String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}

async function copyWithFeedback(button,textarea,onMessage){
  const original=button.textContent;button.textContent='Copying…';button.classList.add('is-copying');button.setAttribute('aria-busy','true');
  let copied=false;
  try{if(navigator.clipboard?.writeText){await Promise.race([navigator.clipboard.writeText(textarea.value),new Promise((_,reject)=>setTimeout(()=>reject(Error('Clipboard timeout')),1500))]);copied=true}}catch{}
  if(!copied){try{textarea.focus();textarea.select();copied=document.execCommand('copy')}catch{}}
  button.classList.remove('is-copying');button.removeAttribute('aria-busy');button.classList.toggle('copied',copied);button.textContent=copied?'Copied!':'Select & copy';
  onMessage(copied?'Prompt copied - paste it into your AI chat':'Text selected. Press Ctrl+C or Cmd+C to copy.');
  if(!copied){textarea.focus();textarea.select()}
  setTimeout(()=>{if(button.isConnected){button.textContent=original;button.classList.remove('copied')}},2200);
}

function modeBadge(){return ''}
function toolLaunch(tool){
  if(tool==='video')return `<div class="launch"><a href="https://www.vidu.com" target="_blank" rel="noopener noreferrer">Open Vidu</a><span class="sub launch-note">Image to Video mode</span></div>`;
  if(tool==='image')return `<div class="launch"><a href="https://gemini.google.com" target="_blank" rel="noopener noreferrer">Open Gemini</a><span class="sub launch-note">Or paste into another image tool</span></div>`;
  if(tool==='web')return `<div class="launch"><a href="https://chat.qwen.ai" target="_blank" rel="noopener noreferrer">Open Qwen</a><span class="sub launch-note">${QWEN_NOTE}</span></div>`;
  return `<div class="launch"><a href="https://chat.qwen.ai" target="_blank" rel="noopener noreferrer">Open Qwen</a><span class="sub launch-note">Regular chat (text only)</span></div>`;
}

document.addEventListener('click',e=>{
  const shot=e.target.closest('.guide-shot');
  document.querySelectorAll('.guide-shot.is-open').forEach(el=>{if(el!==shot)el.classList.remove('is-open')});
  if(shot)shot.classList.toggle('is-open');
});
