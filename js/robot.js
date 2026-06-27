/* ===========================================================
   robot.js — robot reacts to cursor: head turn, torso tilt, arm sway
   =========================================================== */
(function(){
  const stage = document.getElementById('robotStage');
  if(!stage) return;
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const head = document.getElementById('robotHead');
  const torso = document.getElementById('robotTorso');
  const armL = document.getElementById('robotArmL');
  const armR = document.getElementById('robotArmR');

  let targetX = 0, targetY = 0;
  let currentX = 0, currentY = 0;

  window.addEventListener('mousemove', (e) => {
    const rect = stage.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    // normalize -1 to 1, clamp so motion stays elegant, not exaggerated
    targetX = Math.max(-1, Math.min(1, (e.clientX - cx) / 420));
    targetY = Math.max(-1, Math.min(1, (e.clientY - cy) / 420));
  });

  function loop(){
    currentX += (targetX - currentX) * 0.06;
    currentY += (targetY - currentY) * 0.06;

    const headRotY = currentX * 10;
    const headRotX = -currentY * 8;
    const torsoRotY = currentX * 4;
    const armSway = currentX * 6;

    if(head) head.style.transform = `rotateY(${headRotY}deg) rotateX(${headRotX}deg) translateX(${currentX*4}px)`;
    if(torso) torso.style.transform = `rotateY(${torsoRotY}deg) translateX(${currentX*2}px)`;
    if(armL) armL.style.transform = `rotate(${armSway*0.6}deg)`;
    if(armR) armR.style.transform = `rotate(${-armSway*0.6}deg)`;

    requestAnimationFrame(loop);
  }
  loop();
})();
