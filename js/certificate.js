// Certificate of Achievement: drawn on a canvas (A4 landscape, 1123x794 design units) so that the
// on-screen preview, PNG, PDF and print all come from the same artwork. No external libraries.
const Cert=(()=>{
 const W=1123,H=794,HF='"Fredoka","Baloo 2","Trebuchet MS","Segoe UI",Verdana,sans-serif',SF='Georgia,"Times New Roman",serif',AF='"Cairo","Tajawal","Segoe UI","Noto Sans Arabic","DejaVu Sans",Tahoma,sans-serif';
 const NAVY='#4A3B7A',ORANGE='#E07B1F',PURPLE='#8E5BC8',MINT='#3E9B7A';
 let loloImg=null;
 const seeded=s=>()=>(s=(s*16807)%2147483647)/2147483647;
 function rr(c,x,y,w,h,r){c.beginPath();c.roundRect?c.roundRect(x,y,w,h,r):c.rect(x,y,w,h)}
 function star(c,x,y,R,r,rot=-Math.PI/2){c.beginPath();for(let i=0;i<10;i++){const a=rot+i*Math.PI/5,d=i%2?r:R;c.lineTo(x+Math.cos(a)*d,y+Math.sin(a)*d)}c.closePath()}
 function sparkle(c,x,y,s,col){c.fillStyle=col;c.beginPath();c.moveTo(x,y-s);c.quadraticCurveTo(x,y,x+s,y);c.quadraticCurveTo(x,y,x,y+s);c.quadraticCurveTo(x,y,x-s,y);c.quadraticCurveTo(x,y,x,y-s);c.fill()}
 function gold(c,x0,y0,x1,y1){const g=c.createLinearGradient(x0,y0,x1,y1);g.addColorStop(0,'#F2B53A');g.addColorStop(.35,'#FFE58A');g.addColorStop(.65,'#F5BE3C');g.addColorStop(1,'#D58A17');return g}
 function fit(c,txt,max,px,wt,fam){let s=px;do{c.font=`${wt} ${s}px ${fam}`;s-=2}while(c.measureText(txt).width>max&&s>14)}
 function text(c,t,x,y,col,font,align='center'){c.fillStyle=col;c.font=font;c.textAlign=align;c.fillText(t,x,y)}
 function balloon(c,x,y,rx,ry,col,dx){c.strokeStyle='rgba(120,100,160,.55)';c.lineWidth=2;c.beginPath();c.moveTo(x,y+ry+6);c.bezierCurveTo(x+dx,y+ry+40,x-dx,y+ry+70,x+dx*.4,y+ry+120);c.stroke();
  c.fillStyle=col;c.beginPath();c.ellipse(x,y,rx,ry,0,0,7);c.fill();c.beginPath();c.moveTo(x-6,y+ry+9);c.lineTo(x,y+ry-2);c.lineTo(x+6,y+ry+9);c.fill();
  c.fillStyle='rgba(255,255,255,.55)';c.beginPath();c.ellipse(x-rx*.38,y-ry*.35,rx*.17,ry*.3,.5,0,7);c.fill()}
 function tree(c,x,y,s){c.fillStyle='#C9A27A';c.fillRect(x-4*s,y-30*s,8*s,32*s);[['#9ED9AE',0,-48],['#B5E6C0',-18,-36],['#A6DEB5',18,-36]].forEach(([col,dx,dy])=>{c.fillStyle=col;c.beginPath();c.arc(x+dx*s,y+dy*s,26*s,0,7);c.fill()})}
 function trophy(c,cx,y){const g=gold(c,cx-60,0,cx+60,0);
  const glow=c.createRadialGradient(cx,y+90,10,cx,y+90,150);glow.addColorStop(0,'rgba(255,229,138,.7)');glow.addColorStop(1,'rgba(255,229,138,0)');c.fillStyle=glow;c.fillRect(cx-160,y-70,320,320);
  c.strokeStyle=g;c.lineWidth=12;c.lineCap='round';
  [-1,1].forEach(m=>{c.beginPath();c.moveTo(cx+m*52,y+22);c.bezierCurveTo(cx+m*100,y+20,cx+m*92,y+85,cx+m*40,y+90);c.stroke()});
  c.fillStyle=g;c.beginPath();c.moveTo(cx-58,y);c.lineTo(cx+58,y);c.bezierCurveTo(cx+58,y+75,cx+30,y+105,cx+10,y+110);c.lineTo(cx-10,y+110);c.bezierCurveTo(cx-30,y+105,cx-58,y+75,cx-58,y);c.fill();
  c.fillStyle='#FFF1B0';rr(c,cx-65,y-9,130,17,8);c.fill();c.fillStyle=g;c.fillRect(cx-9,y+108,18,40);rr(c,cx-44,y+146,88,20,8);c.fill();c.fillStyle='#C9831A';rr(c,cx-58,y+164,116,24,10);c.fill();
  c.fillStyle='#FFF6D0';star(c,cx,y+50,25,10);c.fill();c.fillStyle='rgba(255,255,255,.38)';c.beginPath();c.ellipse(cx-32,y+42,7,30,.2,0,7);c.fill();
  sparkle(c,cx+88,y-10,14,'#fff');sparkle(c,cx-92,y+120,10,'#FFE58A');sparkle(c,cx+80,y+130,9,'#fff')}
 function scene(c){
  const bg=c.createLinearGradient(0,0,0,H);bg.addColorStop(0,'#CDEBFA');bg.addColorStop(.45,'#E6DDFA');bg.addColorStop(1,'#D7F5E3');c.fillStyle=bg;c.fillRect(0,0,W,H);
  c.fillStyle='rgba(255,255,255,.75)';[[130,120,70,26],[210,100,50,22],[950,130,80,28],[880,108,48,20],[540,40,90,22]].forEach(([x,y,rx,ry])=>{c.beginPath();c.ellipse(x,y,rx,ry,0,0,7);c.fill()});
  [['#BDEBC8',640],['#A5DDB3',676],['#8FD0A0',716]].forEach(([col,y0])=>{c.fillStyle=col;c.beginPath();c.moveTo(0,H);c.lineTo(0,y0);c.bezierCurveTo(W*.25,y0-44,W*.5,y0+30,W*.75,y0-24);c.bezierCurveTo(W*.88,y0-44,W*.95,y0,W,y0-10);c.lineTo(W,H);c.fill()});
  [[330,716,.6],[470,722,.5],[640,725,.45],[760,716,.55]].forEach(([x,y,s])=>tree(c,x,y,s));
  const r=seeded(7);const pal=['#FFB3C7','#FFE58A','#B8A6F0','#9ED8F5','#FFC59A','#A8E6C3'];
  for(let i=0;i<70;i++){const x=r()*W,y=r()*H,t=r();if(x>190&&x<935&&y>150&&y<650)continue;c.save();c.translate(x,y);c.rotate(r()*6);c.fillStyle=pal[i%6];
   if(t<.4)c.fillRect(-5,-3,10,6);else if(t<.75){c.beginPath();c.arc(0,0,4,0,7);c.fill()}else{c.beginPath();c.moveTo(0,-6);c.lineTo(6,5);c.lineTo(-6,5);c.fill()}c.restore()}
  [[125,340,34,44,'#FFB3C7',18],[185,300,32,42,'#B8A6F0',-14],[92,282,30,40,'#FFE58A',10],[1000,340,34,44,'#9ED8F5',-18],[940,300,32,42,'#FFC59A',14],[1033,282,30,40,'#A8E6C3',-10]].forEach(a=>balloon(c,...[a[0],a[1],a[2],a[3],a[4],a[5]]));
  for(let i=0;i<5;i++){const x=300+i*135,y=732+(i%2)*10;c.fillStyle='#fff';c.fillRect(x-3,y-8,6,14);c.fillStyle=['#FFB3C7','#B8A6F0','#FFE58A'][i%3];c.beginPath();c.arc(x,y-10,8,0,7);c.fill();c.fillStyle='#fff';c.beginPath();c.arc(x,y-10,3,0,7);c.fill()}
 }
 function frame(c){
  c.lineWidth=10;c.strokeStyle=gold(c,0,0,W,H);rr(c,18,18,W-36,H-36,34);c.stroke();
  c.lineWidth=3;c.strokeStyle='#B9A6E8';rr(c,34,34,W-68,H-68,24);c.stroke();
  c.save();c.setLineDash([.1,9]);c.lineCap='round';c.lineWidth=4;c.strokeStyle='#F2B53A';rr(c,44,44,W-88,H-88,18);c.stroke();c.restore();
  [[52,52,1],[W-52,52,-1]].forEach(([x,y,m])=>{c.fillStyle='#A8E6C3';[[-1,.4],[1,1.2]].forEach(([d,a])=>{c.beginPath();c.ellipse(x+m*26*d*.3,y+26,8,18,m*a*d,0,7);c.fill()});c.fillStyle=gold(c,x-20,y-20,x+20,y+20);star(c,x,y,20,9);c.fill()});
  [[52,H-52],[W-52,H-52]].forEach(([x,y])=>{c.fillStyle=gold(c,x-20,y-20,x+20,y+20);star(c,x,y,20,9);c.fill()});
 }
 function banner(c){const cx=W/2,y=70,h=64,hw=330;
  c.fillStyle='#D58A17';c.beginPath();c.moveTo(cx-hw-10,y+14);c.lineTo(cx-hw+30,y+h+8);c.lineTo(cx-hw+30,y+h-6);c.fill();c.beginPath();c.moveTo(cx+hw+10,y+14);c.lineTo(cx+hw-30,y+h+8);c.lineTo(cx+hw-30,y+h-6);c.fill();
  c.fillStyle=gold(c,0,y,0,y+h);c.beginPath();c.moveTo(cx-hw-55,y+14);c.lineTo(cx-hw-10,y+14);c.lineTo(cx-hw-10,y+h+14);c.lineTo(cx-hw-55,y+h+14);c.lineTo(cx-hw-30,y+h/2+14);c.fill();
  c.beginPath();c.moveTo(cx+hw+55,y+14);c.lineTo(cx+hw+10,y+14);c.lineTo(cx+hw+10,y+h+14);c.lineTo(cx+hw+55,y+h+14);c.lineTo(cx+hw+30,y+h/2+14);c.fill();
  c.shadowColor='rgba(120,80,0,.25)';c.shadowBlur=10;c.shadowOffsetY=4;rr(c,cx-hw,y,hw*2,h,14);c.fill();c.shadowColor='transparent';
  c.strokeStyle='rgba(255,255,255,.7)';c.lineWidth=2;rr(c,cx-hw+7,y+7,hw*2-14,h-14,9);c.stroke();
  c.letterSpacing='2px';fit(c,'CERTIFICATE OF ACHIEVEMENT',hw*2-50,32,700,HF);c.fillStyle=NAVY;c.textAlign='center';c.textBaseline='middle';c.fillText('CERTIFICATE OF ACHIEVEMENT',cx,y+h/2+2);c.letterSpacing='0px';c.textBaseline='alphabetic'}
 function body(c,name,date){const cx=W/2;
  c.fillStyle='#FFE58A';star(c,cx-262,176,10,4.5);c.fill();star(c,cx+262,176,10,4.5);c.fill();
  c.letterSpacing='3px';text(c,'MOVE & PLAY ADVENTURE',cx,188,MINT,`700 28px ${HF}`);c.letterSpacing='0px';
  text(c,'This certificate is proudly awarded to',cx,236,'#6a5a8e',`italic 22px ${SF}`);
  fit(c,name,620,66,'bold italic',SF);c.save();c.lineJoin='round';c.lineWidth=8;c.strokeStyle='rgba(255,255,255,.9)';c.textAlign='center';c.strokeText(name,cx,312);c.restore();text(c,name,cx,312,ORANGE,c.font);
  const g=c.createLinearGradient(cx-250,0,cx+250,0);g.addColorStop(0,'rgba(242,181,58,0)');g.addColorStop(.5,'#F2B53A');g.addColorStop(1,'rgba(242,181,58,0)');c.fillStyle=g;c.fillRect(cx-250,328,500,4);sparkle(c,cx,330,9,'#fff');
  text(c,'For successfully completing all 6 exciting levels!',cx,376,NAVY,`600 24px ${HF}`);
  text(c,'You are an amazing little explorer!',cx,414,PURPLE,`700 27px ${HF}`);
  for(let i=0;i<6;i++){const x=cx+(i-2.5)*84,y=468;c.save();c.shadowColor='rgba(150,100,0,.3)';c.shadowBlur=6;c.shadowOffsetY=3;c.fillStyle=gold(c,x-30,y-30,x+30,y+30);star(c,x,y,31,14);c.fill();c.restore();c.strokeStyle='#C9831A';c.lineWidth=2;star(c,x,y,31,14);c.stroke();text(c,String(i+1),x,y+7,'#8A5A0B',`700 20px ${HF}`)}
  // Lolo's congratulations
  c.save();c.shadowColor='rgba(80,60,140,.2)';c.shadowBlur=8;c.shadowOffsetY=3;c.fillStyle='rgba(255,255,255,.96)';rr(c,300,528,252,96,22);c.fill();c.beginPath();c.moveTo(302,590);c.lineTo(272,606);c.lineTo(304,566);c.fill();c.restore();
  c.strokeStyle='#CDBDF3';c.lineWidth=2;rr(c,300,528,252,96,22);c.stroke();
  text(c,'Congratulations!',426,562,ORANGE,`700 26px ${HF}`);c.direction='rtl';text(c,'مبروك يا بطل الغابة!',426,592,NAVY,`800 21px ${AF}`);c.direction='ltr';text(c,'Lolo is so proud of you!',426,613,'#6a5a8e',`italic 15px ${SF}`);
  // date + signature
  c.strokeStyle=NAVY;c.lineWidth=2;c.beginPath();c.moveTo(585,690);c.lineTo(765,690);c.moveTo(790,690);c.lineTo(900,690);c.stroke();
  text(c,date,675,680,NAVY,`600 21px ${HF}`);text(c,'DATE',675,712,'#6a5a8e',`600 13px ${HF}`);
  text(c,'Lolo',845,678,ORANGE,`italic bold 32px ${SF}`);text(c,'LOLO THE RABBIT · FOREST GUIDE',845,712,'#6a5a8e',`600 12px ${HF}`);
  trophy(c,1000,512);sparkle(c,560,260,0,'#fff');
 }
 function loadLolo(){if(loloImg)return Promise.resolve(loloImg);return new Promise(res=>{const svg=LOLO.replace('<svg ','<svg xmlns="http://www.w3.org/2000/svg" width="240" height="300" '),i=new Image();i.onload=()=>res(loloImg=i);i.onerror=()=>res(null);i.src='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(svg)})}
 const fontsReady=()=>Promise.race([Promise.all(['700 30px Fredoka','800 20px Cairo'].map(f=>document.fonts.load(f))),new Promise(r=>setTimeout(r,1200))]).catch(()=>{});
 let ready=null;const prep=()=>ready||(ready=Promise.all([loadLolo(),fontsReady()]));
 async function draw(canvas,opt={}){await prep();const c=canvas.getContext('2d');c.setTransform(1,0,0,1,0,0);c.clearRect(0,0,canvas.width,canvas.height);c.scale(canvas.width/W,canvas.height/H);
  const name=(opt.name||'').trim()||'Little Explorer',date=(opt.date?new Date(opt.date):new Date()).toLocaleDateString('en-GB',{day:'numeric',month:'long',year:'numeric'});
  c.textBaseline='alphabetic';c.direction='ltr';scene(c);frame(c);if(loloImg)c.drawImage(loloImg,62,505,200,250);banner(c);body(c,name,date);return canvas}
 async function hi(opt){const k=document.createElement('canvas');k.width=3508;k.height=2480;return draw(k,opt)}
 const blob=(cv,type,q)=>new Promise(r=>cv.toBlob(r,type,q));
 async function pdf(opt){const cv=await hi(opt),jb=await blob(cv,'image/jpeg',.95),jpg=new Uint8Array(await jb.arrayBuffer()),enc=new TextEncoder(),parts=[],off=[];let pos=0;
  const put=x=>{const b=typeof x==='string'?enc.encode(x):x;parts.push(b);pos+=b.length},obj=(n,s)=>{off[n]=pos;put(`${n} 0 obj\n${s}\nendobj\n`)};
  put('%PDF-1.4\n');obj(1,'<< /Type /Catalog /Pages 2 0 R >>');obj(2,'<< /Type /Pages /Kids [3 0 R] /Count 1 >>');
  obj(3,'<< /Type /Page /Parent 2 0 R /MediaBox [0 0 841.89 595.28] /Resources << /XObject << /Im0 5 0 R >> >> /Contents 4 0 R >>');
  const cs='q 841.89 0 0 595.28 0 0 cm /Im0 Do Q';obj(4,`<< /Length ${cs.length} >>\nstream\n${cs}\nendstream`);
  off[5]=pos;put(`5 0 obj\n<< /Type /XObject /Subtype /Image /Width ${cv.width} /Height ${cv.height} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${jpg.length} >>\nstream\n`);put(jpg);put('\nendstream\nendobj\n');
  const xr=pos;put('xref\n0 6\n0000000000 65535 f \n'+[1,2,3,4,5].map(n=>String(off[n]).padStart(10,'0')+' 00000 n \n').join(''));put(`trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n${xr}\n%%EOF`);
  return new Blob(parts,{type:'application/pdf'})}
 async function png(opt){return blob(await hi(opt),'image/png')}
 async function jpeg(opt){return blob(await hi(opt),'image/jpeg',.95)}
 return{draw,pdf,png,jpeg,W,H};
})();
