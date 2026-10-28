'use strict';
// Change assetBase to an absolute HTTPS directory after hosting the images.
const assetBase = 'assets/';
const frames = Array.from({length:10},(_,i)=>`${assetBase}car-${String(i).padStart(2,'0')}.png`);
const car=document.getElementById('car'),viewer=document.getElementById('viewer');
const descriptions=['tres cuartos frontal','frente','tres cuartos frontal opuesto','lateral','tres cuartos trasero','atrás','tres cuartos trasero opuesto','lateral opuesto','arriba','abajo'];
let current=0,mode='spin',anchor=null,autoTimer=null,autoSteps=0;
function show(i){current=(i+8)%8;const n=mode==='top'?8:mode==='bottom'?9:current;car.src=frames[n];viewer.classList.toggle('lateral',mode==='spin'&&(current===3||current===7));car.alt=`Réplica del Mercedes: ${descriptions[n]}`;for(const id of ['spin','top','bottom'])document.getElementById(id).setAttribute('aria-pressed',String(mode===id));}
function stop(){clearInterval(autoTimer);autoTimer=null;document.querySelector('.rotate-hint').classList.add('interacted');}
function step(n){mode='spin';show(current+n);}
for(const id of ['spin','top','bottom'])document.getElementById(id).addEventListener('click',()=>{stop();mode=mode===id?'spin':id;show(current);});
viewer.addEventListener('pointerdown',e=>{if(e.button!==0)return;stop();anchor=e.clientX;viewer.setPointerCapture(e.pointerId);});
viewer.addEventListener('pointermove',e=>{if(anchor===null)return;const delta=e.clientX-anchor;if(Math.abs(delta)>=22){step(delta>0?-1:1);anchor=e.clientX;}});
for(const event of ['pointerup','pointercancel','lostpointercapture'])viewer.addEventListener(event,()=>{anchor=null;});
viewer.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();stop();step(e.key==='ArrowRight'?1:-1);}});
document.getElementById('cta').addEventListener('click',function(){this.href=window.clickTag;});
frames.forEach(src=>{const image=new Image();image.src=src;});
show(0);
// Two turns only (10.4 s); interaction and hidden tabs stop animation.
if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches){autoTimer=setInterval(()=>{step(1);if(++autoSteps===16){stop();show(0);}},650);}
document.addEventListener('visibilitychange',()=>{if(document.hidden)stop();});
