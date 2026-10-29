'use strict';
const banner=document.querySelector('.banner'),hero=document.querySelector('.hero'),car=hero.querySelector('img'),small=banner.classList.contains('w320');
const base='https://servicios.elpais.com.uy/coleccionables/mercedes-300x600_/assets/',boxes=[[30, 75, 567, 314], [109, 40, 489, 357], [28, 70, 583, 318], [15, 132, 595, 286], [19, 117, 596, 333], [102, 63, 509, 341], [17, 98, 590, 320], [15, 125, 589, 279]];let scheduled=[],rotation=null,rotationStart=null,copyTimer=null,index=3;
const reduced=matchMedia('(prefers-reduced-motion:reduce)').matches;
document.querySelector('.cta').onclick=function(){this.href=window.clickTag;};
function render(i){index=i;const b=boxes[i],w=hero.clientWidth,h=hero.clientHeight,s=Math.min(w/(b[2]-b[0]),h/(b[3]-b[1]));car.src=base+'car-'+String(i).padStart(2,'0')+'.png';Object.assign(car.style,{width:612*s+'px',height:408*s+'px',left:((w-(b[2]-b[0])*s)/2-b[0]*s)+'px',top:((h-(b[3]-b[1])*s)/2-b[1]*s)+'px'});}
function clearMotion(){clearInterval(rotation);clearTimeout(rotationStart);clearInterval(copyTimer);rotation=null;}
function setFrame(n){clearMotion();banner.dataset.frame=String(n);banner.querySelectorAll('.phase-one').forEach(el=>el.setAttribute('aria-hidden',String(n===2)));document.querySelector('.copy').setAttribute('aria-hidden',String(n!==2));render(3);banner.querySelectorAll('.mini-line').forEach((el,j)=>el.classList.toggle('visible',j===0));if(n===2&&!reduced){rotationStart=setTimeout(()=>{render(3);rotation=setInterval(()=>render((index+1)%8),650);},700);if(small&&banner.querySelector('.mini-line')){let c=0;copyTimer=setInterval(()=>{c=(c+1)%3;banner.querySelectorAll('.mini-line').forEach((el,j)=>el.classList.toggle('visible',j===c));},2300);}}}
function stop(){scheduled.forEach(clearTimeout);scheduled=[];clearMotion();}
function replay(){stop();setFrame(1);if(reduced){setFrame(2);return;}scheduled.push(setTimeout(()=>setFrame(2),3500));scheduled.push(setTimeout(()=>{clearMotion();if(small)banner.classList.add('copy-complete');},27000));}
window.addEventListener('message',e=>{if(e.source!==parent||e.origin!==location.origin)return;if(e.data?.type==='mercedes-frame'){stop();banner.classList.remove('copy-complete');setFrame(e.data.frame);}if(e.data?.type==='mercedes-replay'){banner.classList.remove('copy-complete');replay();}});
window.addEventListener('resize',()=>render(index));document.addEventListener('visibilitychange',()=>{if(document.hidden)stop();});
for(let i=0;i<8;i++){const im=new Image();im.src=base+'car-'+String(i).padStart(2,'0')+'.png';}replay();
