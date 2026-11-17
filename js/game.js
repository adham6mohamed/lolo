// Game flow, UI and level engine. Movement steps are adult-confirmed (camera-free MVP);
// a future MediaPipe module can call the same next() path instead of the confirm button.
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const LOLO=`<svg viewBox="0 0 120 150" class="lolo-svg" aria-hidden="true"><ellipse cx="42" cy="30" rx="13" ry="30" fill="#FF9A3C"/><ellipse cx="42" cy="32" rx="6" ry="21" fill="#FFC9A0"/><ellipse cx="78" cy="30" rx="13" ry="30" fill="#FF9A3C"/><ellipse cx="78" cy="32" rx="6" ry="21" fill="#FFC9A0"/><ellipse cx="60" cy="118" rx="30" ry="28" fill="#FF9A3C"/><ellipse cx="60" cy="124" rx="18" ry="18" fill="#FFE3C6"/><circle cx="60" cy="78" r="34" fill="#FF9A3C"/><circle cx="48" cy="74" r="5" fill="#3B2F2F"/><circle cx="72" cy="74" r="5" fill="#3B2F2F"/><circle cx="49.5" cy="72" r="1.6" fill="#fff"/><circle cx="73.5" cy="72" r="1.6" fill="#fff"/><ellipse cx="60" cy="86" rx="5" ry="3.5" fill="#E0566B"/><path d="M52 92q8 8 16 0" stroke="#3B2F2F" stroke-width="3" fill="none" stroke-linecap="round"/><circle cx="38" cy="88" r="6" fill="#FFB38A" opacity=".7"/><circle cx="82" cy="88" r="6" fill="#FFB38A" opacity=".7"/></svg>`;
$$('[data-lolo]').forEach(e=>e.innerHTML=LOLO);
let run=0,paused=false,cur={i:0,k:0,lock:false,frozen:false},breakFrom='map',lastChoose=0,wrongN=0,lastRetry=0;
const vs=l=>(l||[]).forEach(v=>A.voice(v));
const sleep=async(ms,tok)=>{let t=0;while(t<ms){await new Promise(r=>setTimeout(r,100));if(tok!==run)return false;if(!paused)t+=100}return tok===run};
function show(id){$$('.screen').forEach(s=>s.hidden=s.id!==id)}
function cancelLevel(){run++;paused=false;A.stopVoice()}

// ---- Welcome
function toWelcome(){show('welcome');A.music('menu_gentle');A.voice('welcome')}
$('#startBtn').onclick=()=>{A.sfx('button_click');toMap(false);lastChoose=Date.now();vs(['start','choose_level'])};
document.addEventListener('pointerdown',e=>A.unlock(!!e.target.closest('#startBtn')),{once:true});

// ---- Map
function toMap(speak=true){cancelLevel();show('map');A.music('menu_gentle');const D=Progress.d;
 $('#forest').textContent='الغابة رجعت '+Progress.stars()+' من 6 نجوم';
 $('#certBtn').textContent=Progress.allDone()?'🏅 شهادتي':'🔒 الشهادة';
 $('#cards').innerHTML='';
 LEVELS.forEach((L,i)=>{const open=i<D.unlocked,b=document.createElement('button');b.className='card';b.setAttribute('aria-disabled',!open);
  b.innerHTML=`<span class="em">${open?L.em:'🔒'}</span><b>المرحلة ${i+1}: ${L.name}</b><small>${open?(D.done[i]?'تقدر تلعبها تاني':'يلا نلعب'):'اخلص اللي قبلها الأول'}</small><span class="st">${D.done[i]?'⭐':'☆'}</span>`;
  b.onclick=()=>{A.sfx('button_click');if(!open){A.stopVoice();return vs(['level_locked'])}startLevel(i,D.done[i]?['level_replay']:[])};$('#cards').append(b)});
 if(speak&&Date.now()-lastChoose>45000){lastChoose=Date.now();A.voice('choose_level')}}
$('#certBtn').onclick=()=>{A.sfx('button_click');if(Progress.allDone())openCert();else{A.stopVoice();vs(['level_locked'])}};

// ---- Level engine
function startLevel(i,pre=[]){cancelLevel();const tok=run,L=LEVELS[i];cur={i,k:0,lock:false,frozen:false};
 show('play');A.music(L.music);$('#lvlName').textContent='المرحلة '+(i+1)+': '+L.name;$('#story').textContent=L.story;stars();vs(pre);
 if(L.type==='dance')dance(tok);else{vs(L.intro);renderStep()}}
const stars=()=>$('#starCount').textContent='⭐ '+Progress.stars()+' / 6';
function dots(n,k){$('#dots').innerHTML=Array.from({length:n},(_,j)=>`<i class="${j<k?'on':''} ${j===k?'now':''}"></i>`).join('')}
function renderStep(){const s=LEVELS[cur.i].steps[cur.k],isCol=s.type==='color';cur.lock=false;
 $('#instr').textContent=s.text;$('#icon').textContent=s.icon;$('#icon').className='icon '+(s.anim||'');
 $('#playLolo').classList.toggle('hop',!!s.hop);dots(LEVELS[cur.i].steps.length,cur.k);
 $('#colors').hidden=!isCol;$('#confirm').hidden=isCol;if(isCol)buildColors(s.color);
 if(s.signal)A.sfx('freeze_signal');if(s.sfx)A.sfx(s.sfx);vs(s.voice)}
$('#replay').onclick=()=>{const L=LEVELS[cur.i];A.stopVoice();if(L.type==='dance')return A.voice(cur.frozen?'freeze':'dance');const s=L.steps[cur.k];vs(s.replay||s.voice)};
const WRONG=['color_wrong','try_again','you_can_do_it'];
function retryVoice(){const n=Date.now();if(n-lastRetry>6000){lastRetry=n;A.voice(WRONG[wrongN++%3])}}
function buildColors(t){const g=$('#colors');g.innerHTML='';
 Object.keys(COLORS).sort(()=>Math.random()-.5).forEach(k=>{const b=document.createElement('button');b.className='tile';b.dataset.k=k;b.style.background=COLORS[k].h;b.textContent=COLORS[k].e;b.setAttribute('aria-label',k);
  b.onclick=()=>{if(cur.lock)return;
   if(k===t){cur.lock=true;b.classList.add('ok');A.sfx('correct');setTimeout(()=>A.sfx('star_collect'),400);if(cur.k%2===0)A.voice('color_correct');setTimeout(next,1300)}
   else{A.sfx('try_again_gentle');retryVoice();const h=g.querySelector('[data-k="'+t+'"]');h.classList.add('hint');setTimeout(()=>h.classList.remove('hint'),2200)}};
  g.append(b)})}
$('#confirm').onclick=()=>{if(cur.lock)return;cur.lock=true;A.sfx('correct');setTimeout(next,700)};
function next(){const L=LEVELS[cur.i],s=L.steps[cur.k];
 if(s.success)A.voice(s.success);else if(cur.k%2===1&&Math.random()<.7)A.voice(Math.random()<.5?'praise_1':'praise_2');
 cur.k++;cur.k>=L.steps.length?finish():renderStep()}

// Level 5: dance -> music stops (signal + voice) -> freeze, adjustable timing, never interrupted quickly
async function dance(tok){const S=Progress.d.s;$('#colors').hidden=true;$('#confirm').hidden=true;
 for(let r=0;r<S.rounds;r++){dots(S.rounds,r);cur.frozen=false;A.music('freeze_dance');A.resumeMusic();
  $('#instr').textContent='يلا نرقص مع بعض!';$('#icon').textContent='💃';$('#icon').className='icon sway';vs(r===0?['music_start','dance']:['dance_again']);
  if(!await sleep(S.danceSec*1000,tok))return;
  cur.frozen=true;A.pauseMusic();A.sfx('freeze_signal');$('#instr').textContent='اثبت مكانك زي التمثال!';$('#icon').textContent='🗿';$('#icon').className='icon';
  if(!await sleep(900,tok))return;vs(['music_stop','freeze']);
  if(!await sleep(S.freezeSec*1000,tok))return;
  cur.frozen=false;A.sfx('correct');A.voice('freeze_success');if(!await sleep(900,tok))return}
 finish()}

// ---- Completion (voices already queued are allowed to finish)
function finish(){run++;paused=false;const i=cur.i,L=LEVELS[i];Progress.complete(i);stars();
 if(i===5){A.voice('mission_success');return showCelebrate()}
 show('done');A.music('victory',false);A.sfx('level_unlock');vs(L.done);
 $('#doneT').textContent='أحسنت! خلصت المرحلة '+(i+1);$('#doneMsg').textContent=L.reward;
 $('#nextBtn').onclick=()=>{A.sfx('button_click');startLevel(i+1)};
 $('#doneBreak').onclick=()=>{A.sfx('button_click');showBreak('map')};
 $('#doneMap').onclick=()=>{A.sfx('button_click');toMap()}}

// ---- Final celebration + certificate
function showCelebrate(){show('celebrate');A.music('victory');A.sfx('game_complete');vs(['celebration','game_complete']);
 const c=$('#confetti');if(!c.children.length){const col=['#FFB3C7','#FFE58A','#B8A6F0','#9ED8F5','#FFC59A','#A8E6C3'];
  for(let n=0;n<36;n++){const e=document.createElement('i');e.style.cssText=`left:${(n*97)%100}%;background:${col[n%6]};--d:${7+(n%5)}s;--w:-${(n*1.7)%9}s`;c.append(e)}}}
$('#getCert').onclick=()=>{A.sfx('button_click');A.stopVoice();openCert()};
let certTimer=null;const certOpt=()=>({name:Progress.d.name,date:Progress.d.finishedAt});
const drawCert=()=>Cert.draw($('#certCanvas'),certOpt());
function openCert(){if(!Progress.allDone())return;show('cert');A.music('menu_gentle');$('#childName').value=Progress.d.name||'';drawCert();A.stopVoice();vs(['forest_saved'])}
$('#childName').oninput=e=>{Progress.d.name=e.target.value.slice(0,24);Progress.save();clearTimeout(certTimer);certTimer=setTimeout(drawCert,120)};
const safeName=()=>((Progress.d.name||'').trim().replace(/[\\/:*?"<>|]/g,'').slice(0,24)||'Explorer');
function save(blob,ext){const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='Move-and-Play-Certificate-'+safeName()+'.'+ext;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(a.href),4000)}
async function busy(btn,fn){if(btn.disabled)return;const t=btn.textContent;btn.disabled=true;btn.textContent='⏳ …';try{await fn()}catch(e){console.error('[certificate]',e)}btn.disabled=false;btn.textContent=t}
$('#dlPdf').onclick=e=>{A.sfx('button_click');busy(e.currentTarget,async()=>save(await Cert.pdf(certOpt()),'pdf'))};
$('#dlImg').onclick=e=>{A.sfx('button_click');busy(e.currentTarget,async()=>save(await Cert.png(certOpt()),'png'))};
$('#printCert').onclick=e=>{A.sfx('button_click');busy(e.currentTarget,async()=>{const url=URL.createObjectURL(await Cert.jpeg(certOpt())),im=$('#printImg');im.src=url;await im.decode();window.print()})};
$('#certMap').onclick=()=>{A.sfx('button_click');toMap()};

// ---- Break / pause
function showBreak(from){breakFrom=from;show('break');A.music('menu_gentle');A.stopVoice();vs(['break','take_a_breath']);
 $('#contBtn').textContent=from==='play'?'▶ كمّل لعب':'▶ كمّل المغامرة'}
$('#pauseBtn').onclick=()=>{A.sfx('button_click');paused=true;showBreak('play')};
$('#contBtn').onclick=()=>{A.sfx('button_click');A.stopVoice();
 if(breakFrom==='play'){paused=false;show('play');const L=LEVELS[cur.i];if(!cur.frozen){A.music(L.music);if(L.type==='dance')A.resumeMusic()}vs(['ready_to_continue'])}
 else toMap()};
$('#toMap').onclick=()=>{A.sfx('button_click');toMap()};

// ---- Sound + adult settings
const M=$('#modal'),S=()=>Progress.d.s;
function openSettings(){const s=S();$('#musicVol').value=s.musicVol;$('#sfxVol').value=s.sfxVol;$('#mute').checked=s.mute;$('#voiceOn').checked=s.voiceOn;
 ['danceSec','freezeSec','rounds'].forEach(k=>$('#'+k).value=s[k]);$('#unlockSel').value=Progress.d.unlocked;$('#gateIn').value='';
 $('#gate').hidden=false;$('#adult').hidden=true;M.hidden=false;A.sfx('button_click')}
$('#soundBtn').onclick=openSettings;
$('#closeBtn').onclick=()=>{M.hidden=true;A.sfx('button_click')};
const bind=(id,key,fn)=>$('#'+id).oninput=e=>{const t=e.target,v=t.type==='checkbox'?t.checked:Number(t.value);
 if(t.type==='number'&&(isNaN(v)||v<+t.min||v>+t.max))return;S()[key]=v;Progress.save();A.refresh();if(fn)fn(v)};
bind('musicVol','musicVol');bind('sfxVol','sfxVol');bind('mute','mute',v=>{if(v)A.stopVoice();A.muteNow()});bind('voiceOn','voiceOn',v=>{if(!v)A.stopVoice()});
bind('danceSec','danceSec');bind('freezeSec','freezeSec');bind('rounds','rounds');
$('#unlockSel').oninput=e=>{const v=Number(e.target.value);if(v>=1&&v<=6){Progress.setUnlocked(v);if(!$('#map').hidden)toMap(false)}};
$('#gateBtn').onclick=()=>{const v=$('#gateIn').value.trim();if(v==='7'||v==='٧'){$('#gate').hidden=true;$('#adult').hidden=false;
 $('#doneList').textContent='المراحل المكتملة: '+(Progress.d.done.map((d,i)=>d?i+1:null).filter(Boolean).join('، ')||'لا يوجد')}};
$('#resetBtn').onclick=()=>{if(confirm('مسح كل التقدم؟')){Progress.reset();M.hidden=true;toMap(false)}};
toWelcome();
