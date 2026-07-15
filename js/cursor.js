/* ===========================================================
   cursor.js — custom cursor + magnetic buttons
   =========================================================== */
(function(){
  if(window.matchMedia('(hover: none)').matches) return;

  /* ===== magnetic buttons ===== */
  const magnets = document.querySelectorAll('.magnetic');
  magnets.forEach(el => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const relX = e.clientX - rect.left - rect.width/2;
      const relY = e.clientY - rect.top - rect.height/2;
      el.style.transform = `translate(${relX * 0.28}px, ${relY * 0.45}px)`;
    });
    el.addEventListener('mouseleave', () => {
      el.style.transform = 'translate(0,0)';
    });
  });
})();
