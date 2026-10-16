// Shared image handling is local-only: never fetch, probe or wait for an image.
const IMAGE_KEYS=new Set(['common','epic','legendary','heroImage','bossNormal','bossPhase2','arenaImage','cover','logo']);
function cleanImageURL(raw){
 let text=String(raw||'').trim().replace(/[\u200B-\u200D\uFEFF]/g,'');
 const match=text.match(/<img\b[^>]*\bsrc\s*=\s*["']([^"']+)["']/i)||text.match(/\[img\]\s*([^\[]+)\s*\[\/img\]/i)||text.match(/!\[[^\]]*\]\((https?:\/\/[^\s)]+)\)/i);
 if(match)text=match[1].trim().replace(/&amp;/g,'&');
 return text.replace(/^["']|["']$/g,'').replace(/[\r\n\t]/g,'').trim();
}
function imageLinkWarning(raw){const text=cleanImageURL(raw);if(!text)return '';let u;try{u=new URL(text)}catch{return 'This does not look like a complete URL. Copy the Direct link from your image host. Copying is still available.'}
 if(!['http:','https:'].includes(u.protocol))return 'Use a public HTTPS image URL, not a local file. This warning does not block copying.';
 if(/^(ibb\.co|imgbb\.com|postimg\.cc|postimages\.org|postimages\.com|imgur\.com|www\.imgur\.com|drive\.google\.com)$/.test(u.hostname))return 'This looks like a viewing page. Choose Direct link or copy the image address itself. Copying is still available.';
 return 'Link saved. No network check is performed. Open the link yourself to confirm it displays only the picture.';
}
const UPLOAD_HELP='<div class="note">To get URLs for your generated images, use <a href="https://imgbb.com" target="_blank" rel="noopener noreferrer">ImgBB ↗</a> or <a href="https://postimages.org" target="_blank" rel="noopener noreferrer">Postimages ↗</a>.</div>';
const QWEN_HELP='<div class="note"><strong>Before sending in Qwen:</strong> enable <strong>Thinking mode</strong> and <strong>Web Dev mode</strong> when available in your account. Then paste the prompt. For fixes, stay in the same web project.</div>';
const IMAGE_RULES=`\n\n[ORIGINAL IMAGE ASSETS — REQUIRED]\nUse the exact supplied image URLs as runtime src values in real HTML img elements (and the exact arena URL as the background where specified). Keep them in one named asset map. Preserve capitalization, file names, path, query strings and signatures. Do not shorten, rewrite, translate or replace URLs, add thumbnail parameters, or route them through an image optimizer. Escape URLs correctly in HTML; do not add whitespace inside them.\nThe original images are the character artwork. Do not redraw, approximate, regenerate or replace them with CSS shapes, emoji, SVG, canvas illustrations, stock art or invented characters. You do not need to understand the picture to embed its URL.\nPreserve the source files and resolution. Do not recompress, downsample or convert them to low-resolution data URLs. Render large artwork: on the hero card allow a 320–520px tall artwork region on larger screens and a generous responsive region on phones; in the boss intro allow a 360–600px tall region on larger screens; in the fight use generous responsive character panels. These are layout targets, not forced dimensions. Use object-fit: contain and preserve the natural aspect ratio. Never force both width and height to distort the picture, crop the character or squash it into a tiny square. On narrow screens resize the layout or stack panels before shrinking artwork excessively.\nIf an image fails to load, show a clear Image could not load message and a retry or open-original-link control. Keep the original URL available. Do not silently invent substitute artwork. Avoid broken-image icons. Check each rarity and boss phase uses the matching asset.\n`;
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
