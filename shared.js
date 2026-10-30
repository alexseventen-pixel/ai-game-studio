// Shared image handling is local-only: never fetch, probe or wait for an image.
const IMAGE_KEYS=new Set(['common','epic','legendary','heroImage','bossNormal','bossPhase2','arenaImage','cover','logo']);
function cleanImageURL(raw){
 let text=String(raw||'').trim().replace(/[\u200B-\u200D\uFEFF]/g,'');
 const match=text.match(/<img\b[^>]*\bsrc\s*=\s*["']([^"']+)["']/i)||text.match(/\[img\]\s*([^\[]+)\s*\[\/img\]/i)||text.match(/!\[[^\]]*\]\((https?:\/\/[^\s)]+)\)/i);
 if(match)text=match[1].trim().replace(/&amp;/g,'&');
 text=text.replace(/^["']|["']$/g,'').replace(/[\r\n\t]/g,'').trim();
 let m;
 if((m=text.match(/^https?:\/\/(?:www\.|m\.)?imgur\.com\/([A-Za-z0-9]{5,8})(?:[?#].*)?$/)))return `https://i.imgur.com/${m[1]}.png`;
 if((m=text.match(/^https?:\/\/drive\.google\.com\/(?:file\/d\/([\w-]{20,})|(?:open|uc)\?(?:.*&)?id=([\w-]{20,}))/)))return `https://lh3.googleusercontent.com/d/${m[1]||m[2]}`;
 return text;
}
function isDirectImageURL(raw){let u;try{u=new URL(cleanImageURL(raw))}catch{return false}
 if(u.protocol!=='https:'&&u.protocol!=='http:')return false;
 if(/^(i\.ibb\.co|i\.postimg\.cc|i\.imgur\.com|lh3\.googleusercontent\.com)$/.test(u.hostname))return true;
 return /\.(png|jpe?g|webp|gif)$/i.test(u.pathname);
}
const DIRECT_HINT='Not a direct image link. imgbb → Embed codes → Direct links (starts with https://i.ibb.co/ and ends with .png/.jpg).';
function imageLinkWarning(raw){const text=cleanImageURL(raw);if(!text)return '';return ''}
// No link validation or image probing (removed: glitchy). URLs are only cleaned silently.
function livePreview(){}
const IMAGE_RULES=`\n\n[IMAGES — USE EXACTLY]\nUse the exact image URLs above as src of real <img> elements. Do not change the URLs. Never draw, generate or substitute characters or artwork of your own. If an image fails to load, show a clear "Image failed to load" placeholder in its place.\n`;
const ENHANCE_RULES=`\n[ART ENHANCEMENT — ALLOWED]\nThe uploaded image is the centerpiece and must stay fully visible and recognizable; never replace it. You MAY enhance around and over it with CSS/SVG/canvas effects: animated frame, glowing aura, element-themed particles, a background scene in the same art style, light rays and sparks.\n`;
const SHORT_A11Y='Responsive, no horizontal overflow on phones, alt text on images.';
const UPLOAD_HELP='<div class="note">To get URLs for your generated images, use <a href="https://imgbb.com" target="_blank" rel="noopener noreferrer">ImgBB ↗</a> or <a href="https://postimages.org" target="_blank" rel="noopener noreferrer">Postimages ↗</a>. On imgbb choose <strong>Embed codes → Direct links</strong>; the link must start with https://i.ibb.co/ and end with .png or .jpg.</div>';
const QWEN_HELP='<div class="note"><strong>Before sending in Qwen:</strong> enable <strong>Thinking mode</strong> and <strong>Web Dev mode</strong> when available in your account. Then paste the prompt. For fixes, stay in the same web project.</div>';

async function copyWithFeedback(button,textarea,onMessage){
 const original=button.textContent;button.textContent='Copying…';button.classList.add('is-copying');button.setAttribute('aria-busy','true');
 let copied=false;
 try{if(navigator.clipboard?.writeText){await Promise.race([navigator.clipboard.writeText(textarea.value),new Promise((_,reject)=>setTimeout(()=>reject(Error('Clipboard timeout')),1500))]);copied=true}}catch{}
 if(!copied){try{textarea.focus();textarea.select();copied=document.execCommand('copy')}catch{}}
 button.classList.remove('is-copying');button.removeAttribute('aria-busy');button.classList.toggle('copied',copied);button.textContent=copied?'✓ Copied!':'Select & copy';
 onMessage(copied?'Prompt copied — paste it into your AI chat':'Text selected. Press Ctrl+C or ⌘C to copy.');
 if(!copied){textarea.focus();textarea.select()}
 setTimeout(()=>{if(button.isConnected){button.textContent=original;button.classList.remove('copied')}},2200);
}

const MODE_TEXT={text:['💬','Regular chat — turn OFF Web Dev (text only)'],image:['🎨','Image generation — turn OFF Web Dev'],video:['🎬','Video generation (image-to-video) — turn OFF Web Dev'],web:['🌐','Turn ON Web Dev in Qwen']};
function modeBadge(tool){const m=MODE_TEXT[tool]||MODE_TEXT.text;return `<div class="mode-badge mode-${tool in MODE_TEXT?tool:'text'}" role="note"><span class="mode-icon">${m[0]}</span><span><small>MODE</small><strong>${m[1]}</strong></span></div>`}
