/* ===========================================================
   contact.js — client-side validation for the contact form
   =========================================================== */
(function(){
  const form = document.getElementById('contactForm');
  if(!form) return;
  const status = document.getElementById('formStatus');
  const submitBtn = document.getElementById('contactSubmit');

  const rules = {
    name: v => v.trim().length >= 2 || 'Escribe tu nombre completo.',
    email: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) || 'Ingresa un email válido.',
    subject: v => v.trim().length >= 3 || 'Cuéntame brevemente el asunto.',
    message: v => v.trim().length >= 10 || 'Tu mensaje debe tener al menos 10 caracteres.'
  };

  function showError(field, msg){
    const el = form.querySelector(`[data-error="${field}"]`);
    if(el) el.textContent = msg || '';
  }

  function validateField(field){
    const input = form.elements[field];
    const result = rules[field](input.value);
    if(result === true){ showError(field, ''); return true; }
    showError(field, result);
    return false;
  }

  Object.keys(rules).forEach(field => {
    const input = form.elements[field];
    if(!input) return;
    input.addEventListener('blur', () => validateField(field));
    input.addEventListener('input', () => {
      if(form.querySelector(`[data-error="${field}"]`).textContent) validateField(field);
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const fields = Object.keys(rules);
    const allValid = fields.map(validateField).every(Boolean);

    if(!allValid){
      status.textContent = 'Revisa los campos marcados antes de enviar.';
      status.style.color = '#ff6b6b';
      return;
    }

    submitBtn.querySelector('.btn-label').textContent = 'Enviando...';
    submitBtn.style.pointerEvents = 'none';

    // Simulated send — replace with a real endpoint (e.g. fetch to your backend
    // or a service like Formspree) when you deploy this site.
    setTimeout(() => {
      status.textContent = '¡Mensaje enviado! Te responderé pronto.';
      status.style.color = 'var(--pink-soft)';
      submitBtn.querySelector('.btn-label').textContent = 'Enviar mensaje';
      submitBtn.style.pointerEvents = 'auto';
      form.reset();
    }, 1200);
  });
})();
