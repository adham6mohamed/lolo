// Single audio manager. Exact filenames under assets/audio/ ; missing files are logged, never fatal.
const A=(()=>{
 const B='assets/audio/',S=()=>Progress.d.s;
 let mu=null,mn=null,ducks=0,gen=0,vel=null,endCur=null,q=Promise.resolve(),fade=null,blocked=null;const warned={};
 const log=f=>{if(!warned[f]){warned[f]=1;console.warn('[audio] missing or blocked:',B+f)}};
 const tgt=()=>S().mute?0:Math.min(1,S().musicVol/100)*(ducks?.35:1);
 function ramp(){clearInterval(fade);fade=setInterval(()=>{if(!mu)return clearInterval(fade);const t=tgt(),d=t-mu.volume;
  if(Math.abs(d)<.01){mu.volume=t;clearInterval(fade)}else mu.volume=Math.max(0,Math.min(1,mu.volume+d*.25))},50)}
 function music(n,loop=true){if(mn===n&&mu&&!mu.paused)return;if(mu)mu.pause();mn=n;const f='music_'+n+'.wav';
  mu=new Audio(B+f);mu.loop=loop;mu.volume=tgt();mu.onerror=()=>log(f);mu.play().catch(()=>log(f))}
 function sfx(n){const f='sfx_'+n+'.wav',a=new Audio(B+f);a.volume=S().mute?0:Math.min(1,S().sfxVol/100);a.onerror=()=>log(f);a.play().catch(()=>log(f))}
 function voice(n){const g=gen;
  q=q.then(()=>new Promise(res=>{
   if(g!==gen||!S().voiceOn||S().mute)return res();
   const f='voice/'+n+'.mp3',a=new Audio(B+f);vel=a;ducks++;ramp();let done=0;
   const wd=setTimeout(()=>end(),9000);
   const end=()=>{if(done)return;done=1;clearTimeout(wd);ducks=Math.max(0,ducks-1);ramp();setTimeout(res,350)};
   endCur=end;a.onended=end;a.onerror=()=>{log(f);end()};
   a.play().catch(err=>{if(err&&err.name==='NotAllowedError'){blocked=n}else log(f);end()})}));
  return q}
 function stopVoice(){gen++;blocked=null;if(vel)vel.pause();if(endCur)endCur()}
 return{music,sfx,voice,stopVoice,refresh:ramp,
  pauseMusic(){if(mu)mu.pause()},resumeMusic(){if(mu)mu.play().catch(()=>{})},
  unlock(skipVoice){if(mu&&mu.paused)mu.play().catch(()=>{});if(blocked&&!skipVoice){const n=blocked;blocked=null;voice(n)}},
  muteNow(){if(vel)vel.volume=S().mute?0:1}};
})();
