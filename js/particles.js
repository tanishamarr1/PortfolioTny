/* ===========================================================
   particles.js — lightweight canvas particle field
   =========================================================== */
(function(){
  const canvas = document.getElementById('particles');
  if(!canvas) return;
  const ctx = canvas.getContext('2d');
  let particles = [];
  let w, h;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function resize(){
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  const COUNT = window.innerWidth < 700 ? 36 : 70;

  function makeParticle(){
    return {
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.6 + 0.4,
      vx: (Math.random() - 0.5) * 0.18,
      vy: (Math.random() - 0.5) * 0.18,
      a: Math.random() * 0.5 + 0.15
    };
  }

  for(let i=0; i<COUNT; i++) particles.push(makeParticle());

  let mouseX = w/2, mouseY = h/2;
  window.addEventListener('mousemove', e => { mouseX = e.clientX; mouseY = e.clientY; });

  function tick(){
    ctx.clearRect(0,0,w,h);
    particles.forEach(p => {
      p.x += p.vx; p.y += p.vy;

      // gentle attraction toward cursor
      const dx = mouseX - p.x, dy = mouseY - p.y;
      const dist = Math.sqrt(dx*dx + dy*dy);
      if(dist < 220){
        p.x += dx * 0.0009;
        p.y += dy * 0.0009;
      }

      if(p.x < 0) p.x = w; if(p.x > w) p.x = 0;
      if(p.y < 0) p.y = h; if(p.y > h) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
      ctx.fillStyle = `rgba(255, 110, 199, ${p.a})`;
      ctx.fill();
    });
    if(!reduceMotion) requestAnimationFrame(tick);
  }
  tick();
})();
