// Level configuration. Step types: (default) adult-confirmed movement, 'color' auto-evaluated.
// voice: voice file names (no .mp3) played in order. sfx: optional effect (no sfx_ prefix / .wav). hop: Lolo hops.
const COLORS={blue:{h:'#4DA8F0',e:'🐳'},red:{h:'#EF5B5B',e:'🍎'},yellow:{h:'#FFD23F',e:'🍌'},green:{h:'#6CC46A',e:'🐸'}};
const col=(c,n)=>({type:'color',color:c,icon:'🎨',text:'دور على اللون '+n+'!',voice:['find_'+c]});
const LEVELS=[
{name:'صحّي لولو',em:'🌅',music:'adventure',story:'لولو لسه صاحي ومحتاج مساعدتك عشان يجهز للمغامرة.',reward:'جمعنا أول نجمة سحرية!',intro:['are_you_ready'],done:['level_complete','first_star'],steps:[
 {text:'صفق مرة واحدة!',icon:'👏',anim:'clap',voice:['clap']},
 {text:'ارفع إيدك لفوق!',icon:'🙌',anim:'up',voice:['hands_up']},
 {text:'حرك إيدك شمال ويمين!',icon:'↔️',anim:'sway',voice:['move_left','move_right']},
 {text:'المس راسك!',icon:'🤚',anim:'up',voice:['touch_your_head']}]},
{name:'مغامرة القفز',em:'🪨',music:'adventure',story:'لولو لازم يعدّي النهر السحري على الحجارة الطايرة.',reward:'فتحنا كوبري النهر السحري!',intro:['cross_river'],done:['level_complete','great_listening'],steps:[
 {text:'اقفز مرة واحدة!',icon:'🐇',anim:'jump',voice:['jump'],sfx:'jump',hop:1},
 {text:'اقفز مرتين!',icon:'🐇🐇',anim:'jump',voice:['jump_twice'],sfx:'jump',hop:1},
 {text:'اثبت زي التمثال!',icon:'🗿',voice:['freeze'],success:'freeze_success'},
 {text:'افرد دراعاتك زي العصفور!',icon:'🕊️',anim:'sway',voice:['stretch_arms']}]},
{name:'صيد الألوان',em:'🎨',music:'adventure',story:'الغابة السحرية فقدت ألوانها. اختار الحاجة الصح وهات الألوان تاني!',reward:'ألوان الغابة رجعت!',intro:['forest_colors'],done:['level_complete','amazing_job'],steps:[{...col('blue','الأزرق'),voice:['find_color','find_blue']},col('red','الأحمر'),col('yellow','الأصفر'),col('green','الأخضر')]},
{name:'قلّد حركاتي',em:'🗝️',music:'adventure',story:'لولو بيدور على صندوق الكنز السحري.',reward:'لقينا مفتاح الكنز السحري!',intro:['follow_sequence'],done:['sequence_success','level_complete'],steps:[
 {text:'ارفع إيدك لفوق، وبعدين صفق!',icon:'🙌👏',voice:['hands_up','clap']},
 {text:'اقفز، وبعدين اثبت!',icon:'🐇🗿',voice:['jump','freeze'],sfx:'jump',hop:1,success:'freeze_success'},
 {text:'حرك إيدك يمين، وبعدين شمال!',icon:'➡️⬅️',anim:'sway',voice:['move_right','move_left']},
 {text:'المس راسك، وبعدين كتفك!',icon:'🤚🙋',voice:['head_then_shoulders'],replay:['touch_your_head','touch_shoulders']}]},
{name:'رقصة التمثال',em:'💃',music:'freeze_dance',type:'dance',done:['level_complete'],story:'لولو بيحب يرقص، لكن لما الموسيقى تقف الكل بيتجمّد!',reward:'فتحنا بوابة الغابة السحرية!'},
{name:'المهمة الأخيرة',em:'🏆',music:'adventure',story:'لولو وصل للكنز الأخير، وفاضل مغامرة واحدة!',reward:'رجعنا النجوم الست!',intro:['final_mission'],steps:[
 {text:'صفق مرتين!',icon:'👏👏',anim:'clap',voice:[]},
 {text:'اقفز مرة واحدة!',icon:'🐇',anim:'jump',voice:['jump'],sfx:'jump',hop:1},
 col('blue','الأزرق'),
 {text:'ارفع إيدك لفوق!',icon:'🙌',anim:'up',voice:['hands_up']},
 {text:'اثبت لما تسمع الإشارة!',icon:'🧊',signal:true,voice:['freeze']}]}
];
