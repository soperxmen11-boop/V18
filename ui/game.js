/* KIDS PRO UPGRADE (fallback) */
import { $, clamp } from './utils.js';
import { musicStart, musicStop, sfxClick } from './audio.js';
/* KIDS PRO UPGRADE: stats import removed */
import { getDuration } from './settings.js';
/* KIDS PRO UPGRADE: round seconds removed */ /* KIDS PRO UPGRADE */
const barFill = document.querySelector('.timer-bar__fill');
/* KIDS PRO UPGRADE: end popup ref removed */
/* KIDS PRO UPGRADE: end popup ref removed */
/* KIDS PRO UPGRADE: end popup ref removed */
let score=0, roundActive=false, startTs=0, rafId=null;
/* KIDS PRO UPGRADE: progress bar removed */
/* KIDS PRO UPGRADE: timer loop removed */
export function addScore(d=1){ if(!roundActive) return; score+=d; }
export function startRound(){ if(roundActive) return; ROUND_SECONDS=getDurati/* KIDS PRO UPGRADE: endPopupClose listener removed */
btnStart?.addEventListener('click',(e)=>{e.preventDefault(); sfxClick(); closeEndPopup(); startRound();}); btnEndClose?.addEventListener('click',(e)=>{e.preventDefault(); closeEndPopup();}); });

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
