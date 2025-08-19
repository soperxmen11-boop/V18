/* KIDS PRO UPGRADE (fallback) */
import { $, clamp } from './utils.js';
import { musicStart, musicStop, sfxClick } from './audio.js';
/* KIDS PRO UPGRADE: stats import removed */
import { getDuration } from './settings.js';
/* KIDS PRO UPGRADE: round seconds removed */ /* KIDS PRO UPGRADE */
const barFill = document.querySelector('.timer-bar__fill');
const popup = document.getElementById('endPopup');
const popupTitle = document.getElementById('endPopupTitle');
const popupSubtitle = document.getElementById('endPopupSubtitle');
let score=0, roundActive=false, startTs=0, rafId=null;
/* KIDS PRO UPGRADE: progress bar removed */
/* KIDS PRO UPGRADE: timer loop removed */
export function addScore(d=1){ if(!roundActive) return; score+=d; }
export function startRound(){ if(roundActive) return; ROUND_SECONDS=getDuration(); score=0; roundActive=true; /* KIDS PRO UPGRADE: setInGame call removed */ startTs=performance.now(); /* KIDS PRO UPGRADE: cancel RAF removed */ setBarProgress(ROUND_SECONDS); musicStart(); /* KIDS PRO UPGRADE: RAF removed */ 
  /* KIDS PRO UPGRADE: init circle timer */
  ROUND_SECONDS = (typeof getDuration==='function' ? getDuration() : 60);
  startTs = performance.now();
  cancelAnimationFrame(rafId);
  setCircleProgress(ROUND_SECONDS);
  rafId = requestAnimationFrame(loop);
}
function endRound(){ if(!roundActive) return; roundActive=false; /* KIDS PRO UPGRADE: setInGame call removed */ /* KIDS PRO UPGRADE: cancel RAF removed */ musicStop(); const passed=score>=10; if(popup){ popupTitle.textContent=passed?'Mission Passed':'Game Over'; popupSubtitle.textContent=`Score: ${score
  /* KIDS PRO UPGRADE: stop circle timer */
  try{ cancelAnimationFrame(rafId); }catch{}
  if (timerLabel) timerLabel.textContent = '0';
}`; popup.classList.remove('hidden'); } }
function closeEndPopup(){ popup?.classList.add('hidden'); }
document.addEventListener('DOMContentLoaded',()=>{ const btnStart=document.getElementById('btnStart'); const btnEndClose=document.getElementById('endPopupClose'); btnStart?.addEventListener('click',(e)=>{e.preventDefault(); sfxClick(); closeEndPopup(); startRound();}); btnEndClose?.addEventListener('click',(e)=>{e.preventDefault(); closeEndPopup();}); });

/* KIDS PRO UPGRADE: circle timer helpers */
function setCircleProgress(remaining){
  const total = ROUND_SECONDS || 60;
  const pct = Math.max(0, Math.min(1, remaining / total));
  const CIRC = 339.292; // 2*pi*54
  const offset = CIRC * (1 - pct);
  if (circleFg){ circleFg.style.strokeDashoffset = String(offset); }
  if (timerLabel){ timerLabel.textContent = String(Math.ceil(remaining)); }
}
function loop(now){
  const elapsed = (now - startTs)/1000;
  const rem = Math.max(0, ROUND_SECONDS - elapsed);
  setCircleProgress(rem);
  if (rem <= 0){ endRound(); return; }
  rafId = requestAnimationFrame(loop);
}
