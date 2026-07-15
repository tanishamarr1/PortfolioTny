/* ===========================================================
   animations.js — scroll reveal, tilt cards, counters, progress, loader
   =========================================================== */
(function(){

  /* ===== loading screen ===== */
  const loader = document.getElementById('loader');
  const loaderFill = document.getElementById('loaderFill');
  const loaderLetters = document.querySelectorAll('.loader-mark span');

  let progress = 0;
  loaderLetters.forEach((l, i) => setTimeout(() => l.classList.add('is-on'), 120 * i));

  const loaderInterval = setInterval(() => {
    progress += Math.random() * 18;
    if(progress >= 100){
      progress = 100;
      clearInterval(loaderInterval);
      if(loaderFill) loaderFill.style.width = '100%';
      setTimeout(() => loader && loader.classList.add('is-done'), 350);
    } else if(loaderFill){
      loaderFill.style.width = progress + '%';
    }
  }, 180);

  window.addEventListener('load', () => {
    setTimeout(() => loader && loader.classList.add('is-done'), 600);
  });

  /* ===== scroll progress bar ===== */
  const progressBar = document.getElementById('scrollProgress');
  function updateProgress(){
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    if(progressBar) progressBar.style.width = pct + '%';
  }
  window.addEventListener('scroll', updateProgress, { passive:true });
  updateProgress();

  /* ===== scroll reveal with stagger ===== */
  const revealEls = document.querySelectorAll('[data-reveal]');
  revealEls.forEach(el => {
    const delay = el.getAttribute('data-reveal-delay');
    if(delay) el.style.setProperty('--reveal-delay', delay + 'ms');
  });

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

  revealEls.forEach(el => revealObserver.observe(el));

  /* ===== animated stat counters ===== */
  const counters = document.querySelectorAll('[data-count]');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-count'), 10);
        let current = 0;
        const step = Math.max(1, Math.round(target / 40));
        const tick = () => {
          current += step;
          if(current >= target){ el.textContent = target; return; }
          el.textContent = current;
          requestAnimationFrame(tick);
        };
        tick();
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(el => counterObserver.observe(el));

  /* ===== animated skill bars ===== */
  const skillBars = document.querySelectorAll('.skill-bar-fill');
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        const el = entry.target;
        el.style.width = el.getAttribute('data-level') + '%';
        skillObserver.unobserve(el);
      }
    });
  }, { threshold: 0.4 });
  skillBars.forEach(el => skillObserver.observe(el));

  /* ===== tilt cards ===== */
  const tiltCards = document.querySelectorAll('.tilt-card');
  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      const rotX = (0.5 - py) * 8;
      const rotY = (px - 0.5) * 8;
      card.style.transform = `perspective(700px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-4px)`;
      card.style.setProperty('--glow-x', (px * 100) + '%');
      card.style.setProperty('--glow-y', (py * 100) + '%');
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(700px) rotateX(0) rotateY(0) translateY(0)';
    });
  });

  /* ===== glass card shine sweep on hover ===== */
  document.querySelectorAll('.glass-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.classList.remove('shine');
      requestAnimationFrame(() => card.classList.add('shine'));
    });
  });

  /* ===== nav background on scroll ===== */
  const nav = document.getElementById('nav');
  function toggleNav(){
    if(window.scrollY > 40) nav.classList.add('is-scrolled');
    else nav.classList.remove('is-scrolled');
  }
  window.addEventListener('scroll', toggleNav, { passive:true });
  toggleNav();

  /* ===== subtle parallax on hero orbs ===== */
  window.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5);
    const y = (e.clientY / window.innerHeight - 0.5);
    const orbOne = document.querySelector('.bg-orb--one');
    const orbTwo = document.querySelector('.bg-orb--two');
    if(orbOne) orbOne.style.transform = `translate(${x * 30}px, ${y * 30}px)`;
    if(orbTwo) orbTwo.style.transform = `translate(${x * -24}px, ${y * -24}px)`;
  });

})();

