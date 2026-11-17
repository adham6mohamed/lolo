// Progress + settings storage (localStorage, fails safely). Stars are only removed by the adult reset.
const Progress=(()=>{
 const K='lolo_move_play_v1',DS={musicVol:15,sfxVol:40,mute:false,voiceOn:true,danceSec:14,freezeSec:7,rounds:3};
 let d={done:[false,false,false,false,false,false],unlocked:1,name:'',finishedAt:null,s:{...DS}};
 try{const j=JSON.parse(localStorage.getItem(K));if(j)d={...d,...j,s:{...DS,...j.s}}}catch(e){}
 const save=()=>{try{localStorage.setItem(K,JSON.stringify(d))}catch(e){}};
 return{get d(){return d},save,stars:()=>d.done.filter(Boolean).length,
  allDone:()=>d.done.every(Boolean),
  complete(i){d.done[i]=true;if(d.done.every(Boolean)&&!d.finishedAt)d.finishedAt=new Date().toISOString();d.unlocked=Math.max(d.unlocked,Math.min(6,i+2));save()},
  setUnlocked(n){d.unlocked=n;save()},
  reset(){d.done=d.done.map(()=>false);d.unlocked=1;d.finishedAt=null;d.name='';save()}};
})();
