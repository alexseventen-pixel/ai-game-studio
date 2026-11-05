'use strict';
const courseMenus={
weakness:['Low strength','Low health','Low speed','Limited range','Slow recovery','Fear of darkness','Cannot see invisible enemies','Shield can break','Ability takes time to recharge','Depends on a power source','Weak against ice','Weak against fire'],
look:['A giant made of stone','A ghostly shadow figure','A mechanical colossus','A dragon serpent','A horned demon','An ice golem','A fire spirit','A many-armed guardian','A skeleton warrior','A plant monster','A crystal beast','A giant insect','An armored titan','A cosmic creature','A floating eye','A storm elemental','A clockwork beast','A deep-sea leviathan','A living fortress','A magnetic robot','A sand guardian','A spectral knight','A volcanic turtle','A mirror creature'],
power:['Crushes everything with its fists','Fires energy blasts','Controls shadows','Freezes enemies','Burns with fire','Summons lightning','Poisons with toxic clouds','Drains life energy','Breaks any shield','Cracks open the ground','Summons minions','Turns invisible','Controls gravity','Creates illusions','Reflects attacks','Manipulates time','Creates crystal barriers','Commands metal','Absorbs magic','Summons sandstorms'],
bossColor:['Red','Blue','Green','Purple','Gold','Icy blue','Orange','Black & silver','Toxic green','White & silver','Stone grey','Molten red'],
bossElement:['Fire','Ice','Lightning','Nature','Shadow / smoke','Light','Water','Metal / tech','Cosmic','Poison','Earth / rock','Crystals'],
weakSpot:['Glowing chest core','Crystal on the forehead','Cracked armor on the back','Exposed power cell','Glowing eye','Energy gem in the palm','Frozen joint','Broken shield center','Glowing tail tip','Crystal crown','Exposed shoulder reactor','Rune on the chest'],
effect:['Armor cracks and glows with energy','Lightning surges across its body','An energy aura explodes outward','The eyes blaze brighter and brighter','Cracks of molten light spread over it','Swirling particles gather and ignite','Ice shards spiral around its armor','Shadows swirl into a glowing storm','Crystals grow across its shoulders','Metal plates shift and lock into place'],
mood:['Epic and cinematic','Mysterious and tense','Heroic and hopeful','Dark and dramatic','Energetic and playful','Cosmic and majestic','Stormy and powerful','Magical and dreamlike'],
arena:['Volcanic arena','Frozen fortress','Ancient forest ruins','Neon rooftop','Crystal cavern','Space station','Desert temple','Underwater palace','Storm mountain','Floating island','Abandoned robot factory','Moonlit castle courtyard','Giant clock tower','Magical library','Overgrown city','Sky bridge'],
balance:['Too easy','Too difficult','Too long','Needs more variety'],
mechanic:['Timed weak-spot attacks','Defend and counterattack','Manage the super cooldown','Survive the second phase','Choose between defense and damage','Use elemental powers strategically']};
Object.assign(courseMenus,{"heroClass": ["Tank", "Ninja", "Elemental mage", "Inventor-mechanic", "Healer", "Hunter", "Guardian robot", "Pilot", "Storm rider", "Crystal guardian", "Portal explorer", "Beast tamer", "Rune knight", "Sound mage", "Gravity engineer", "Time keeper", "Dream weaver", "Alchemist", "Sky captain", "Mirror mage"], "heroAbility": ["Fire blast", "Ice wall", "Double jump", "Shield barrier", "Teleport", "Summon drone", "Time slow", "Lightning strike", "Invisibility", "Healing aura", "Gravity trap", "Chain lightning", "Meteor dash", "Sonic wave", "Portal jump", "Time rewind", "Mirror clone", "Vine snare", "Starfall", "Magnetic pull", "Shadow step", "Healing rain"], "style": ["bold mobile game cartoon, thick outlines, vivid colors",
"cute 3D animated render, soft lighting, volumetric",
"anime style, cel shading, expressive eyes",
"16-bit pixel art sprite, crisp pixels",
"comic book style, bold ink outlines, halftone dots",
"chibi, super-deformed, big head, cute",
"cyberpunk, neon glow, dark background",
"steampunk, brass, gears, leather",
"painterly fantasy concept art",
"low poly 3D, geometric, faceted",
"flat 2D cartoon, simple shapes, flat colors",
"semi-realistic hero shooter render",
"dark gothic fantasy, moody",
"sci-fi mecha, metallic techno suit",
"watercolor illustration, soft washes",
"street graffiti spray art",
"retro 80s synthwave, pink-purple neon",
"vinyl collectible toy figure, glossy",
"claymation, clay figure",
"papercraft cutout, layered paper",
"classic hand-drawn animation",
"black and white manga, screentones",
"gritty dark game art",
"cosmic hero, stars, nebula, glow",
"crystal / ice translucent",
"flame elemental, glowing embers",
"nature spirit, leaves and vines",
"stained glass mosaic",
"holographic glitch, translucent",
"blocky brick figure, toy bricks",
"celestial ink illustration, deep blue washes, luminous gold linework",
"retro space comic, vivid flat colors, screenprint texture",
"soft pastel 3D character, matte materials, gentle studio lighting",
"carved wooden toy character, painted surfaces, visible wood grain",
"embroidered character patch, visible stitching, bold silhouette",
"neon vector illustration, crisp shapes, glowing edges",
"storybook gouache painting, rich pigment, textured brushwork",
"handcrafted clay character with translucent crystal details",
"limited-palette retro handheld pixel art, clean readable sprite",
"sculpted paper character, folded surfaces, soft cast shadows",
"art deco character design, geometric ornament, gold accents",
"risograph print illustration, layered inks, grain texture",
"painted porcelain character figure, glossy ceramic finish",
"felt plush character, soft fibers, stitched details",
"digital mosaic character, angular colored tiles, clear silhouette",
"bioluminescent fantasy character, organic shapes, glowing details",
"retro space explorer collectible, rounded forms, painted plastic",
"monochrome etched illustration, fine crosshatching, bold silhouette"], "attack": ["Flame Strike", "Frost Shard", "Thunder Bolt", "Crystal Shot", "Shadow Slash", "Solar Spark", "Vine Whip", "Water Pulse", "Stone Fist", "Wind Cutter", "Star Dart", "Sonic Burst", "Plasma Punch", "Rune Blast", "Moon Arrow", "Magnetic Bolt", "Ember Kick", "Comet Jab", "Light Disc", "Sand Spike"], "super": ["Meteor Storm", "Frozen Nova", "Thunder Crown", "Crystal Overdrive", "Shadow Eclipse", "Solar Flare", "Forest Awakening", "Tidal Wave", "Earthquake", "Sky Tornado", "Cosmic Collapse", "Sonic Boom", "Plasma Surge", "Rune Awakening", "Moonfall", "Magnetic Vortex", "Phoenix Rise", "Comet Shower", "Radiant Shield", "Time Fracture"], "victory": ["The arena is safe again!", "Light wins this round!", "Never underestimate a hero!", "One battle. One legend.", "The storm is over!", "A new legend begins!", "Your power ends here!", "Small hero. Huge victory!", "The future is ours!", "Back to the shadows!", "Courage beats fear!", "The stars are on our side!", "That is how legends rise!", "Victory unlocked!", "The final phase is ours!", "A hero never gives up!"], "heroLook": ["An armored guardian with a glowing shield", "A nimble ninja with a flowing scarf", "An elemental mage with a crystal staff", "A compact robot with bright energy eyes", "A sky explorer with mechanical wings", "A forest ranger with leafy armor", "A cosmic knight with a star cape", "A frost warrior with icy gauntlets", "A cheerful inventor with a companion drone", "A mysterious shadow dancer with twin blades", "A water protector with a flowing cloak", "A tiny hero carrying an oversized tool"], "trailerColors": ["Gold and purple", "Blue and orange", "Red and black", "Emerald and gold", "Icy blue and silver", "Pink and turquoise", "Violet and electric blue", "Amber and charcoal", "White and sapphire", "Lime and purple", "Crimson and silver", "Midnight blue and gold", "Teal and coral", "Molten orange and stone grey", "Mint and lavender", "Rainbow neon"], "tagline": ["One hero. One impossible battle.", "Face the boss. Find your power.", "Your next legend starts here.", "Master the moves. Defeat the darkness.", "Small hero. Epic showdown.", "Every weakness hides a winning move.", "Survive the storm. Become the legend.", "Think fast. Strike smart. Win big.", "The final phase is only the beginning.", "One arena. Endless courage."], "gameDescription": ["A hero faces a powerful boss in a turn-based arena. Choose attacks, defend and use your super ability to win.", "Battle a boss that grows stronger halfway through the fight. Watch its weak spot and choose your actions carefully.", "Enter a short tactical boss fight with your own hero. Manage your abilities and survive the final phase.", "Build your strategy one turn at a time. Defeat the boss and try again to improve your approach."], "feature1": ["Turn-based tactical combat", "A boss with two battle phases", "A hero created by our studio", "A short fight with a clear goal", "Four actions to choose from", "A colorful fantasy arena"], "feature2": ["A powerful super ability with a cooldown", "A weak spot that appears every third turn", "Defend to reduce incoming damage", "Animated health bars and a battle log", "A transformation at half boss health", "Original hero and boss artwork"], "feature3": ["Play on your phone", "Restart and try another strategy", "A short challenge to share with friends", "Clear victory and defeat screens", "Large touch-friendly controls", "No download required"]});

const FREE_TEXT_KEYS=new Set(['releaseText','heroLook','lore','partnerFeedback','finalEdit','bug1','bug2','bug3','expected1','expected2','expected3','localTrailer']);
const F=(key,label,kind='text',optional=false)=>({key,label,kind:(courseMenus[key]&&['text','textarea'].includes(kind)&&!FREE_TEXT_KEYS.has(key))?'menu':kind,optional});
const commonFields={heroName:F('heroName','Hero name'),heroClass:F('heroClass','Hero class'),heroAbility:F('heroAbility','Hero ability'),style:F('style','Art style (from Lesson 1)'),bossName:F('bossName','Boss name'),gameTitle:F('gameTitle','Game title'),weakSpot:F('weakSpot','Boss weak spot','menu'),arena:F('arena','Arena','menu'),mood:F('mood','Mood','menu')};
const f=k=>commonFields[k];
const asset=(key,label,optional=false)=>F(key,label,'url',optional);
const check=(...items)=>items;
const RELEASE_PLACEHOLDER=`Tagline: One hero. One impossible battle.
Description: A short turn-based boss fight. Manage attacks, defense and your super ability to win.
Features:
1. Turn-based tactical combat
2. A boss with two battle phases
3. Play on your phone
Call to action: PLAY NOW`;

const courses={
2:{name:'THE BOSS',title:'Meet your<br>greatest rival.',intro:'Create a boss, animate its transformation and build its story.',steps:[
{title:'Design your rival',desc:'Build a boss around your hero weakness. Art style comes from Lesson 1 (you can still change it).',fields:[f('heroName'),f('style'),f('bossName'),F('weakness','Hero weakness','menu'),F('look','Boss appearance','menu'),F('power','Boss power','menu'),F('bossColor','Boss color','menu'),F('bossElement','Boss element','menu'),f('weakSpot')],note:'Use English. Your boss details carry into Lessons 3 and 4.'},
{title:'Make boss art',desc:'Stay in ONE image chat. Copy the three prompts in order and save each image.',required:['style','bossName','weakness','look','power','bossColor','bossElement','weakSpot'],tool:'image',
 prompts:[
  {label:'PROMPT 1 - BASE BOSS',text:v=>`A single epic video-game BOSS villain, full body, powerful menacing pose, facing the camera. Character large and centered on a clean solid-color background. Only ONE character. Original design; do not copy existing game bosses. No text, letters, logos or watermark.\n\nStyle: ${v('style')}\nMain color: ${v('bossColor')}\nElement/theme: ${v('bossElement')}\nName: ${v('bossName')}\nBorn from the hero's weakness: ${v('weakness')}\nBody / creature: ${v('look')}\nWeapon / power: ${v('power')}\n\nBoss-tier armor, glowing eyes and a strong silhouette. Epic and intimidating, without gore or horror.`},
  {label:'PROMPT 2 - PHASE 2 (same chat)',text:()=>`Take the SAME boss from the previous image. Keep the style, face, body and silhouette. Make its PHASE 2 - the enraged final form: bigger, cracked overcharged armor, brighter glowing eyes, an exploding aura and energy. Same character, just powered-up. No text, no watermark, no gore.`},
  {label:'PROMPT 3 - WEAK SPOT (same chat)',text:v=>`Take the SAME boss. Keep everything identical. Reveal its WEAK SPOT: ${v('weakSpot')}. Show exactly one glowing weak point that pulses with light, the only place it can be hit. Everything else stays the same. No text, no watermark.`}
 ],checks:check('I saved the base boss, Phase 2 and weak-spot images.')},
{title:'Animate the transformation',desc:'Upload the base boss as the first frame and Phase 2 as the last frame in Vidu (Image to Video). Start rendering, then continue.',fields:[F('effect','Transformation effect','menu'),f('mood')],tool:'video',required:['effect','mood'],prompt:v=>`Animate a 5-second epic BOSS TRANSFORMATION between the two supplied frames. Frame 1 is the normal form; Frame 2 is the powered-up final form. The boss powers up and transforms: ${v('effect')}. Keep the SAME character throughout: same face, body and colors. Mood: ${v('mood')}. Focus on the transformation, without sudden camera changes. No text, logos, watermark or gore.`,checks:check('I started rendering the transformation video.')},
{title:'Lore and boss intro',desc:'Generate short lore, paste it below, add image links, then build the intro page in Qwen.',fields:[F('lore','Lore passport','textarea'),asset('bossNormal','Base boss image URL'),asset('bossPhase2','Phase 2 image URL'),asset('bossIntro','Published boss intro URL (optional)',true)],tool:'web',required:['bossName','weakness','look','bossElement','power','weakSpot','bossPhase2','lore'],
 prompts:[
  {label:'PROMPT A - WRITE LORE (text chat)',tool:'text',text:v=>`You are a game lore writer. Write a short epic boss lore passport in English. Heroic fantasy, dramatic and engaging, without gore or horror.\nBoss: ${v('bossName')}\nBorn from the hero's weakness: ${v('weakness')}\nAppearance: ${v('look')}\nElement: ${v('bossElement')}\nPower: ${v('power')}\nEstablished weak spot: ${v('weakSpot')}\n\nOutput exactly four sections, each 1-2 sentences: 1. Origin. 2. Powers. 3. Weak spot - preserve the established weak spot. 4. Entrance line.`},
  {label:'PROMPT B - BUILD INTRO PAGE (Qwen Web Dev)',tool:'web',text:v=>`Build a single-page game BOSS INTRO screen (like the screen right before a boss fight) in HTML, CSS and JavaScript.\nMobile-first, responsive.\n\n[BOSS IMAGE]\nUse this image as the boss art (embed with <img src="URL">):\n${v('bossPhase2')}\nShow the boss large, centered and dramatic.${IMAGE_RULES}${ENHANCE_RULES}\n[INTRO SEQUENCE]\nOn load, play a short cinematic intro:\n1) a dark screen,\n2) the boss NAME flies in with a glow: "${v('bossName')}",\n3) a red BOSS HEALTH BAR fills up under the name,\n4) the boss image fades in with a colored ${v('bossColor')||'red'} glow.\n\n[LORE]\nBelow, show the lore passport text:\n${v('lore')}\n\n[STYLE]\nDark game background, red / orange danger glow, bold game typography, a cinematic feel. All on-page text in English. No watermark. ${SHORT_A11Y}\n\n[IMPORTANT]\nDeploy the page and give a PUBLIC link that opens on a phone without signing in. The Published boss intro URL field above is optional - paste the link later if you have it.`}
 ],checks:check('The intro opens on my phone.','I saved the public intro link (optional).')},
{title:'Bonus: Versus poster',desc:'Optional homework. Upload your hero and boss images as references.',fields:[F('heroLook','Short hero appearance')],tool:'image',required:['heroName','heroLook','bossName','look'],prompt:v=>`Use the uploaded images as exact character references. Create an epic VERSUS game battle poster split in two halves. LEFT: ${v('heroName')}, ${v('heroLook')}. RIGHT: ${v('bossName')}, ${v('look')}. A large glowing VS in the middle. Shared art style: ${v('style')}. Dark cinematic lighting, energy sparks, both characters facing each other. No watermark.`}
]},
3:{name:'FIRST BOSS FIGHT',title:'Your rules.<br>Your first battle.',intro:'Turn characters into a playable game. Test and publish.',steps:[
{title:'Define the fight',desc:'Plan a short turn-based fight. Rules are fixed so you can focus on building.',fields:[f('gameTitle'),f('heroName'),f('bossName'),F('attack','Normal attack name'),F('super','Super ability name'),f('weakSpot'),F('victory','Victory line')],note:'Hero: 100 HP. Boss: 140 HP. Attack: 12-18 damage. Super: 30 damage, 3-turn cooldown. Weak spot: every third turn. Phase 2: at 50% boss HP.'},
{title:'Prepare the arena',desc:'Required. Generate a wide empty arena background in the same art style as your hero.',fields:[f('style'),f('arena')],tool:'image',required:['style','arena'],prompt:v=>`Create a wide 16:9 video game boss arena background. Art style: ${v('style')}. Environment: ${v('arena')}. Clear space on the left for the hero and on the right for the boss. No characters, text, interface, logos or watermark.`,checks:check('I saved my arena image.')},
{title:'Build the playable game',desc:'Add your Legendary hero and both boss forms. Paste into Qwen Web Dev.',fields:[asset('heroImage','Legendary hero image URL'),asset('bossNormal','Base boss image URL'),asset('bossPhase2','Phase 2 image URL'),asset('arenaImage','Arena image URL')],tool:'web',required:['gameTitle','heroName','bossName','attack','super','weakSpot','victory','heroImage','bossNormal','bossPhase2','arenaImage'],prompt:v=>`Build a complete single-page playable turn-based BOSS FIGHT game in HTML, CSS and JavaScript.\nIt must work inside the preview and be mobile-first. Do not create extra pages.\n\n[GAME DATA]\nGame title: ${v('gameTitle')}\nHero name: ${v('heroName')}\nBoss name: ${v('bossName')}\nHero normal attack: ${v('attack')}\nHero super ability: ${v('super')}\nBoss weak spot: ${v('weakSpot')}\nVictory line: ${v('victory')}\n\n[IMAGES]\nHero image: ${v('heroImage')}\nBoss normal image: ${v('bossNormal')}\nBoss Phase 2 image: ${v('bossPhase2')}\nArena background: ${v('arenaImage')}\nUse each URL in a real <img> element. Keep images contained and never stretched.${IMAGE_RULES}\n[CORE GAMEPLAY]\nShow the hero on the left and the boss on the right, each with name and animated HP bar.\nHero starts with 100 HP. Boss starts with 140 HP.\nButtons: ATTACK, SUPER, DEFEND and HIT WEAK SPOT.\nATTACK deals a random 12-18 damage. 15% chance of a CRITICAL hit (x1.5, big CRIT! text).\nSUPER deals 30 damage, then has a 3-turn cooldown shown on the button.\nDEFEND reduces the next boss attack by 60%.\nThe boss counterattacks after every player action for a random 10-16 damage.\nEvery third player turn, reveal a glowing weak-spot target for one turn.\nHIT WEAK SPOT is disabled at other times; when active it deals 2x normal damage.\nAt 50% boss HP, switch to the Phase 2 image, show PHASE 2, shake the screen once,\nand increase boss damage to 15-22. This transition happens only once.\nHP never goes below 0.\n\n[COMBAT EFFECTS - make every hit feel powerful]\n- Attack lunge: the attacker dashes toward the target and springs back.\n- Hit flash: the target flashes white/red and recoils.\n- Screen shake on every hit (stronger on SUPER, crits and boss hits).\n- Floating damage numbers rise and fade above the target (crits bigger and gold).\n- Particles: impact sparks on hero hits; dark energy on boss hits.\n- SUPER cinematic: screen dims, hero zooms in with the super name in huge letters, energy beam/explosion, then big damage.\n- Boss idle animation: slow breathing/floating bob and a pulsing aura.\n- Weak spot: pulsing glowing target over the boss.\n- Phase 2 transformation: flash to white, boss image swaps with a burst of particles, red aura, PHASE 2 banner, one strong shake.\n- DEFEND: a visible shield bubble around the hero.\n- HP bars drain smoothly with a lagging ghost bar.\nKeep effects fast (under ~1 s) so the turn rhythm stays snappy.\n\n[SCREENS AND FEEDBACK]\nStart screen with title and a large PLAY button.\nDuring battle show a short battle log: who attacked and how much damage.\nDisable action buttons while animations play so actions cannot be clicked twice.\nAt 0 boss HP show VICTORY, confetti, the victory line and PLAY AGAIN.\nAt 0 hero HP show DEFEAT and TRY AGAIN.\nRestart must reset every value, cooldown, phase, image and button state.\n\n[STYLE]\nCinematic game UI, dark background, strong contrast, large touch buttons.\nAll interface text must be in English, including the game title and action button labels.\nOn a phone nothing may overflow horizontally. Add alt text to all images.\nNo gore, no real weapons.\n\n[IMPORTANT]\nDeploy the finished game and give a PUBLIC link that opens on a phone without signing in.`,checks:check('The game builds and PLAY starts the fight.')},
{title:'Playtest and optional fixes',desc:'Play the game. Bug notes are optional - if everything works, skip the fix prompts.',fields:[F('bug1','Problem 1 (optional)','textarea',true),F('expected1','Expected result 1 (optional)','textarea',true),F('bug2','Problem 2 (optional)','textarea',true),F('expected2','Expected result 2 (optional)','textarea',true),F('balance','Optional balance tweak','menu',true)],tool:'web',
 prompts:[
  {label:'OPTIONAL - FIX PROMPT',text:v=>(!v('bug1')&&!v('bug2'))?`No bugs were listed. Keep the current game unchanged. Do a quick sanity check that PLAY, ATTACK, SUPER, DEFEND, weak spot, Phase 2, victory, defeat and restart still work.`:`Keep the current game and design. Fix ONLY the problems below. Do not remove working features or rename existing buttons.\n\nBUG 1: ${v('bug1')||'(none)'}\nEXPECTED: ${v('expected1')||'(none)'}\n\nBUG 2: ${v('bug2')||'(none)'}\nEXPECTED: ${v('expected2')||'(none)'}\n\nAfter fixing, verify start, Phase 2, victory, defeat and restart states. Keep all combat effects.`},
  {label:'OPTIONAL - BALANCE PROMPT',text:v=>{const b={'Too easy':'Increase boss HP to 170 and Phase 2 damage to 18-25. Trigger Phase 2 at 85 HP.','Too difficult':'Reduce Phase 1 boss damage to 8-13; keep Phase 2 harder, and heal the hero by 15 when Phase 2 starts (max 100 HP).','Too long':'Reduce boss HP to 115, trigger Phase 2 at half its maximum HP and reduce SUPER cooldown to 2 complete turns.','Needs more variety':'Add one random boss event every 4 turns, clearly announced in the log.'};const pick=v('balance');return pick?`Keep the current game. Make only this balance change:\n${b[pick]||pick}\nPreserve working controls, art, restart and end states. Retest the complete fight.`:`Optional: choose a balance tweak in the menu above, then copy this prompt.\n(If you leave balance empty, skip this prompt.)`}}
 ],checks:check('PLAY starts the game.','Victory, defeat and restart work.','The game fits my phone screen.')},
{title:'Publish and share',desc:'Publish the game, test the public link on a phone, and optionally ask a partner for feedback.',fields:[asset('gameURL','Public playable game URL'),F('partnerFeedback','Partner feedback','textarea',true),F('finalEdit','Any change you made','textarea',true)],checks:check('The public link opens without signing in.','I completed a fight on my phone.','Restart works after victory or defeat.')}
]},
4:{name:'GAME RELEASE',title:'Ready for<br>the premiere.',intro:'Create a cover, trailer and release page. Share a finished game.',steps:[
{title:'Prepare the release brief',desc:'Describe the game you built. Copy the prompt into a text chat to get release copy.',fields:[f('gameTitle'),F('studio','Studio name'),f('heroName'),f('heroClass'),f('heroAbility'),f('bossName'),F('power','Boss power','menu'),f('weakSpot'),F('mechanic','Main mechanic','menu'),f('mood'),asset('gameURL','Public game URL')],tool:'text',required:['gameTitle','heroName','heroClass','heroAbility','bossName','power','weakSpot','mechanic','mood','studio'],prompt:v=>`You are an editor at a small game studio. Prepare clear, honest release copy in English.\nGame: ${v('gameTitle')}\nHero: ${v('heroName')}, ${v('heroClass')}, ${v('heroAbility')}\nBoss: ${v('bossName')}, ${v('power')}, weak spot: ${v('weakSpot')}\nMechanic: ${v('mechanic')}\nMood: ${v('mood')}\nOutput exactly 4 blocks: 1. Tagline, at most 8 words. 2. Game description, 2 short sentences. 3. Three features, one line each. 4. Call to action, 3-5 words ending in PLAY. Do not invent features or promise the best game in the world.`},
{title:'Cover and trailer',desc:'Make the cover in Gemini, upload to imgbb, then start a 5-second Vidu trailer from that cover.',fields:[f('arena'),f('mood'),F('trailerColors','Main trailer colors')],tool:'image',required:['gameTitle','arena','mood','trailerColors'],
 prompts:[
  {label:'PROMPT 1 - COVER (Gemini)',tool:'image',text:v=>`Use the uploaded HERO and BOSS images as exact character references. Create a cinematic 16:9 video game key art image for ${v('gameTitle')}. Hero left, boss right, facing each other before the final battle. Preserve designs, colors and the SAME art style: ${v('style')}. Environment: ${v('arena')}. Strong diagonal energy, dramatic center light, clear silhouettes. Leave clean dark space near the top for a title added on the website. No text, letters, logos, watermark or gore.`},
  {label:'PROMPT 2 - TRAILER (Vidu Image to Video)',tool:'video',text:v=>`Animate this game key art into a 5-second cinematic launch teaser. Preserve hero and boss designs exactly. Hero powers up left; boss enters Phase 2 right. Energy gathers between them and collides in one bright flash. Hold a dramatic final face-off for the last second. Slow push-in, subtle parallax, no sudden cuts or character morphing. Mood: ${v('mood')}. Colors: ${v('trailerColors')}. No text, logo, extra characters, watermark or gore.`}
 ],afterTitle:'After the cover',afterNote:'Upload the cover to imgbb, paste any link or HTML embed below, then start the Vidu render. When Vidu finishes, download the .mp4. You can later upload it to YouTube (Unlisted) or Google Drive (Anyone with the link).',afterFields:[asset('cover','Cover image URL')]},
{title:'Build the release page',desc:'Paste the full release text from your AI chat into the box. Add links. Build the page in Qwen.',fields:[F('releaseText','Paste your release text from AI here','textarea'),F('studio','Studio name'),asset('cover','Cover image URL'),asset('gameURL','Public game URL'),asset('heroCard','Public hero card URL'),asset('bossIntro','Public boss intro URL',true),asset('logo','Studio logo URL',true)],tool:'web',required:['gameTitle','releaseText','studio','cover','gameURL','heroCard'],prompt:v=>`Build a polished single-page GAME RELEASE website in HTML, CSS and JavaScript. Mobile-first, responsive, fast. No extra pages.\n\n[RELEASE COPY - use exactly]\n${v('releaseText')}\n\nGame title: ${v('gameTitle')}\nStudio: ${v('studio')}\n\n[ASSETS AND LINKS]\nKey art: ${v('cover')}\nPLAY GAME: ${v('gameURL')}\nMEET THE HERO: ${v('heroCard')}\nMEET THE BOSS: ${v('bossIntro')||'NONE - hide this button or show Coming soon'}\nStudio logo: ${v('logo')||'NONE'}\nTrailer will be added later. Initially show WATCH TRAILER as a clearly disabled control labeled Coming soon, not a broken link.\n\n[SECTIONS IN ORDER]\n1. Full-screen hero using cover with dark overlay, title, tagline, PLAY GAME.\n2. About: description and three feature cards from the release copy.\n3. Character showdown: hero and boss cards with their links.\n4. Trailer section: cover thumbnail and trailer placeholder.\n5. Final PLAY GAME CTA and A game by ${v('studio')}.\n\n[BEHAVIOR]\nExternal links open in a new tab with noopener noreferrer. PLAY GAME is strongest. Subtle glow matching ${v('bossElement')||v('element')||'the cover'} and fade-in on scroll. No autoplay sound, signup, shop, pricing or fake reviews. English text throughout. ${SHORT_A11Y}${IMAGE_RULES}${ENHANCE_RULES.replace('The uploaded image is','The key art and logo are')}\n\n[IMPORTANT]\nDeploy the page and give a PUBLIC link that opens on a phone without signing in.`},
{title:'Check your release page',desc:'Open your public release page while signed out. Check it on a phone.',fields:[asset('releaseURL','Public release page URL')],required:['releaseURL'],checks:check('PLAY GAME opens the fight.','Hero and boss links work.','The page fits a phone.')},
{title:'Your 60-second premiere',desc:'Make a short pitch deck from screenshots of your own work. Upload the screenshots into Canva, paste the prompt, then rehearse for 60 seconds.',note:'Backup if Canva is blocked: Gemini Canvas at gemini.google.com (Tools > Canvas > create a presentation), then Export to Google Slides.',actionLink:'https://www.canva.com',actionLabel:'Open Canva',fields:[asset('pitchDeckURL','Presentation link',true)],tool:'text',required:['gameTitle','heroName','bossName','studio'],
prompt:v=>{const release=(v('releaseText')||'').trim();const tag=release.split(/\n/)[0]||'';return `Create a 5 or 6 slide pitch deck for a 60-second game premiere talk. I will upload my own screenshots. Use those screenshots as the main visuals. Do not invent new characters.

Project data:
- Studio: ${v('studio')}
- Game: ${v('gameTitle')}
- Hero: ${v('heroName')} (${v('heroClass')||'hero'})
- Boss: ${v('bossName')}
- Main mechanic: ${v('mechanic')||'boss fight'}
- Art style: ${v('style')||'same as my screenshots'}
${tag?`- From my release copy: ${tag}`:''}
${release?`\nFull release copy (use short lines only):\n${release.slice(0,900)}`:''}

Slide plan:
1. Title: game name, studio name, one short tagline
2. Meet the hero (hero card screenshot)
3. Meet the boss (boss or boss intro screenshot)
4. How to play (game screenshot; 3 short bullet rules)
5. Cover and release (cover + release page screenshots)
6. Call to action: PLAY + thank you (optional if only 5 slides)

Keep text large and short so I can speak for about 60 seconds. English only. No personal student data, no watermarks with real names or emails.`},
checks:check('Screenshot: hero card','Screenshot: boss or boss intro','Screenshot: playable game','Screenshot: cover / key art','Screenshot: release page','I rehearsed my 60-second pitch')}
]}};

const lesson=Number(document.body.dataset.lesson), config=courses[lesson], STORE='hero-lab-course-v1';
const $=id=>document.getElementById(id);
const escapeHTML=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let project={values:{},steps:{},checks:{}},hero={};
try{const p=JSON.parse(localStorage.getItem(STORE)||'null');if(p?.values&&p.steps&&p.checks)project=p;hero=JSON.parse(localStorage.getItem('hero-lab-v1')||'{}').data||{}}catch{}
const heroValue=k=>hero[k]==='__custom'?hero[k+'_custom']:hero[k];
const links={heroName:'name',heroClass:'class',heroAbility:'ability',style:'style',heroImage:'legendary'};
for(const [k,h] of Object.entries(links))if(!project.values[k]&&heroValue(h))project.values[k]=heroValue(h);
if(!project.values.element&&heroValue('element'))project.values.element=heroValue('element');
// Always sync art style from Lesson 1 so all 48 styles + custom stay locked in by default
(function syncStyleFromHero(){
  const hs=heroValue('style');
  if(!hs)return;
  if(courseMenus.style.includes(hs)){project.values.style=hs}
  else{project.values.style='__custom';project.values.style_custom=hs}
})();
let step=Math.max(0,Math.min(config.steps.length-1,Number(project.steps[lesson])||0));
function v(k){if(IMAGE_KEYS.has(k))return cleanImageURL(project.values[k]);return project.values[k]==='__custom'?String(project.values[k+'_custom']||'').trim():typeof project.values[k]==='boolean'?project.values[k]:String(project.values[k]||'').trim()}
function persist(){project.steps[lesson]=step;try{localStorage.setItem(STORE,JSON.stringify(project));$('saveState').textContent='Saved on this device'}catch{$('saveState').textContent='Storage unavailable - export your project'}}
function notify(t){$('toast').textContent=t;$('toast').classList.add('show');clearTimeout(notify.timer);notify.timer=setTimeout(()=>$('toast').classList.remove('show'),3000)}
function input(field){
  const {key:k,label,kind,optional}=field;
  if(kind==='menu'&&project.values[k]&&project.values[k]!=='__custom'&&!(courseMenus[k]||[]).includes(project.values[k])){project.values[k+'_custom']=project.values[k];project.values[k]='__custom'}
  const val=project.values[k];
  const attr=`data-key="${k}" id="${k}"`;
  const title=escapeHTML(label)+(optional?' <span class="optional">Optional</span>':'');
  if(kind==='checkbox')return `<label class="check wide"><input ${attr} type="checkbox" ${val?'checked':''}>${title}</label>`;
  let control;
  if(kind==='menu'){
    control=`<select ${attr}><option value="">Choose ${escapeHTML(label.toLowerCase())}</option>${(courseMenus[k]||[]).map(s=>`<option value="${escapeHTML(s)}" ${val===s?'selected':''}>${escapeHTML(s)}</option>`).join('')}<option value="__custom" ${val==='__custom'?'selected':''}>Custom - write your own</option></select><input aria-label="Custom ${escapeHTML(label.toLowerCase())}" data-key="${k}_custom" value="${escapeHTML(project.values[k+'_custom']||'')}" maxlength="2000" ${val==='__custom'?'':'hidden'}>`;
  }else if(kind==='textarea'){
    control=`<textarea ${attr} rows="${k==='releaseText'?10:4}" maxlength="12000" ${k==='releaseText'?'data-placeholder="1"':''}>${escapeHTML(val||'')}</textarea>`;
  }else control=`<input ${attr} type="${kind==='url'?'url':'text'}" value="${escapeHTML(val||'')}" maxlength="2000" autocomplete="off">`;
  return `<div class="field ${['textarea','url'].includes(kind)?'wide':''}"><label for="${k}">${title}</label>${control}</div>`;
}
const allFields=Object.values(courses).flatMap(c=>c.steps.flatMap(s=>[...(s.fields||[]),...(s.afterFields||[])]));
const fieldMap=Object.fromEntries(allFields.map(f=>[f.key,f]));
function issues(s){
  const hasPrompt=!!(s.prompt||s.prompts);
  const keys=[...new Set([...(s.required||[]),...(hasPrompt?(s.fields||[]).filter(f=>!f.optional).map(f=>f.key):[])])];
  return keys.filter(k=>!v(k)).map(k=>`Complete: ${fieldMap[k]?.label||k}`);
}
function fillPrompts(s){
  if(s.prompts){
    const problems=issues(s);
    s.prompts.forEach((p,i)=>{
      const ta=$('promptText'+i); if(!ta)return;
      ta.value=p.text(v);
      const btn=document.querySelector(`[data-copy="${i}"]`);
      if(btn){btn.disabled=problems.length>0}
    });
    const issuesEl=$('issues'); if(issuesEl)issuesEl.textContent=problems.join(' · ');
    return;
  }
  if(!s.prompt)return;
  const problems=issues(s);
  if($('issues'))$('issues').textContent=problems.join(' · ');
  if($('copy'))$('copy').disabled=problems.length>0;
  if($('promptText'))$('promptText').value=s.prompt(v);
  if(s.extraPrompt&&$('extraPrompt'))$('extraPrompt').value=s.extraPrompt(v);
}
function launchesFor(s){
  const tools=new Set();
  if(s.tool)tools.add(s.tool);
  (s.prompts||[]).forEach(p=>tools.add(p.tool||s.tool||'text'));
  if(!tools.size)tools.add('text');
  return [...tools].map(toolLaunch).join('');
}
function promptHTML(s){
  if(s.prompts){
    const blocks=s.prompts.map((p,i)=>`<div class="prompt"><div class="prompthead"><span>${escapeHTML(p.label)}</span><button class="copy" data-copy="${i}">Copy prompt</button></div>${i===0?'<p id="issues" class="missing" role="status"></p>':''}<textarea id="promptText${i}" aria-label="${escapeHTML(p.label)}" readonly rows="9" spellcheck="false"></textarea></div>`).join('');
    return blocks+launchesFor(s);
  }
  if(!s.prompt)return '';
  return `<div class="prompt"><div class="prompthead"><span>YOUR READY-TO-USE PROMPT</span><button class="copy" id="copy">Copy prompt</button></div><p id="issues" class="missing" role="status"></p><textarea id="promptText" aria-label="Generated prompt" readonly rows="11" spellcheck="false"></textarea>${toolLaunch(s.tool||'text')}</div>`;
}
function update(){fillPrompts(config.steps[step])}
function render(){
  const s=config.steps[step];
  $('steps').innerHTML=config.steps.map((s,i)=>`<button data-step="${i}" class="${step===i?'active':''}" ${step===i?'aria-current="step"':''}><span class="number">${String(i+1).padStart(2,'0')}</span>${escapeHTML(s.title)}</button>`).join('');
  $('count').textContent=`STEP ${step+1} OF ${config.steps.length}`;
  $('progress').style.width=`${100*(step+1)/config.steps.length}%`;
  $('content').innerHTML=`<h2>${escapeHTML(s.title)}</h2><p class="sub">${escapeHTML(s.desc)}</p>${s.actionLink?`<p class="upload-tip"><a href="${escapeHTML(s.actionLink)}" target="_blank" rel="noopener noreferrer">${escapeHTML(s.actionLabel||'Open tool')}</a> <span class="launch-note">Free Magic Design / AI presentation. Upload your screenshots, then paste the prompt.</span></p>`:''}${(s.fields||[]).some(f=>IMAGE_KEYS.has(f.key))||(s.afterFields||[]).some(f=>IMAGE_KEYS.has(f.key))?UPLOAD_HELP:''}${s.fields?`<div class="grid">${s.fields.map(input).join('')}</div>`:''}${s.note?`<div class="note">${escapeHTML(s.note)}</div>`:''}${s.expect?`<div class="expect"><strong>Expected result:</strong> ${escapeHTML(s.expect)}</div>`:''}${promptHTML(s)}${s.extraPrompt&&!s.prompts?'<div class="prompt"><div class="prompthead"><span>OPTIONAL FOLLOW-UP PROMPT</span><button id="copyExtra">Copy follow-up</button></div><textarea id="extraPrompt" aria-label="Optional follow-up prompt" readonly rows="5"></textarea></div>':''}${s.afterFields?`<div class="after-task"><h3>${escapeHTML(s.afterTitle||'Follow-up task')}</h3>${s.afterNote?`<div class="note" style="white-space:pre-line">${escapeHTML(s.afterNote)}</div>`:''}<div class="grid">${s.afterFields.map(input).join('')}</div></div>`:''}${(s.checks||[]).map((t,i)=>{const k=`${lesson}-${step}-${i}`;return `<label class="check"><input type="checkbox" data-check="${k}" ${project.checks[k]?'checked':''}>${escapeHTML(t)}</label>`}).join('')}`;
  $('back').disabled=step===0;
  $('next').textContent=step===config.steps.length-1?'Export project ↓':'Continue →';
  update();
  const rt=$('releaseText');
  if(rt&&!rt.value){rt.placeholder=RELEASE_PLACEHOLDER}
}
function go(n){step=n;persist();render()}
function download(){let heroProject={};try{heroProject=JSON.parse(localStorage.getItem('hero-lab-v1')||'{}')}catch{};const b=new Blob([JSON.stringify({version:2,data:heroProject.data||{},step:heroProject.step||0,course:project},null,2)],{type:'application/json'});const a=document.createElement('a');a.href=URL.createObjectURL(b);a.download='ai-game-studio-project.json';a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000);notify('Project exported - includes all four lessons')}
$('content').addEventListener('input',e=>{if(e.target.dataset.check){project.checks[e.target.dataset.check]=e.target.checked;persist();return}const k=e.target.dataset.key;if(!k)return;project.values[k]=e.target.type==='checkbox'?e.target.checked:e.target.value;if(e.target.tagName==='SELECT'&&e.target.nextElementSibling)e.target.nextElementSibling.hidden=e.target.value!=='__custom';persist();update()});
$('content').addEventListener('click',async e=>{
  const btn=e.target.closest('[data-copy],#copy,#copyExtra');
  if(!btn)return;
  if(btn.id==='copyExtra'){await copyWithFeedback(btn,$('extraPrompt'),notify);return}
  if(btn.id==='copy'){update();if(btn.disabled)return;await copyWithFeedback(btn,$('promptText'),notify);return}
  const i=Number(btn.dataset.copy);update();if(btn.disabled)return;await copyWithFeedback(btn,$('promptText'+i),notify);
});
$('content').addEventListener('change',e=>{const k=e.target.dataset.key;if(!IMAGE_KEYS.has(k))return;project.values[k]=cleanImageURL(project.values[k]);e.target.value=project.values[k];persist();update()});
$('steps').onclick=e=>{const b=e.target.closest('[data-step]');if(b)go(Number(b.dataset.step))};
$('back').onclick=()=>go(Math.max(0,step-1));
$('next').onclick=()=>{if(step===config.steps.length-1){download();return}const s=config.steps[step];const problems=[...issues(s)];for(const f of (s.fields||[])){if(!f.optional&&!v(f.key))problems.push('Complete: '+f.label)}const uniq=[...new Set(problems)];if(uniq.length&&!confirm(uniq.join('\n')+'\n\nContinue anyway?'))return;go(step+1)};
$('export').onclick=download;$('importButton').onclick=()=>$('import').click();
$('import').onchange=async e=>{try{const file=e.target.files[0];if(!file)return;if(file.size>300000)throw Error();const p=JSON.parse(await file.text());if(![1,2].includes(p.version)||!p.data||typeof p.data!=='object'||Array.isArray(p.data))throw Error();if(!confirm('Replace the saved project with this imported project?'))return;const h={};for(const [k,val] of Object.entries(p.data))if(/^[a-zA-Z0-9_]+$/.test(k)&&k!=='__proto__'&&['string','number','boolean'].includes(typeof val))h[k]=typeof val==='string'?val.slice(0,12000):val;localStorage.setItem('hero-lab-v1',JSON.stringify({data:h,step:Math.max(0,Math.min(2,Number(p.step)||0))}));const clean={values:{},steps:{},checks:{}};if(p.course){if(!p.course.values||!p.course.steps||!p.course.checks)throw Error();for(const [k,val] of Object.entries(p.course.values))if((fieldMap[k]||k.endsWith('_custom')&&fieldMap[k.slice(0,-7)]||k==='element'||k==='releaseText')&&['string','boolean','number'].includes(typeof val))clean.values[k]=typeof val==='string'?val.slice(0,12000):val;for(const l of [2,3,4])clean.steps[l]=Math.max(0,Math.min(courses[l].steps.length-1,Number(p.course.steps[l])||0));for(const [k,val] of Object.entries(p.course.checks))if(/^[234]-\d+-\d+$/.test(k))clean.checks[k]=!!val}for(const [k,hkey] of Object.entries(links))if(!clean.values[k])clean.values[k]=h[hkey]==='__custom'?h[hkey+'_custom']||'':h[hkey]||'';project=clean;hero=h;if(heroValue('style')){const hs=heroValue('style');if(courseMenus.style.includes(hs))project.values.style=hs;else{project.values.style='__custom';project.values.style_custom=hs}}step=project.steps[lesson]||0;persist();render();notify('Project imported')}catch{notify('Could not import this project file')}finally{e.target.value=''}};
$('lessonName').textContent=`LESSON 0${lesson} / ${config.name}`;$('courseTitle').innerHTML=config.title;$('courseIntro').textContent=config.intro;persist();render();
