/* ===========================================================
   contact.js — client-side validation + EmailJS sending
   =========================================================== */
(function(){
  const form = document.getElementById('contactForm');
  if(!form) return;
  const status = document.getElementById('formStatus');
  const submitBtn = document.getElementById('contactSubmit');

  /* ------------------------------------------------------------
     EmailJS config — reemplaza estos 3 valores con los tuyos:
     1. PUBLIC_KEY  -> Account > General > Public Key
     2. SERVICE_ID  -> Email Services > tu servicio conectado
     3. TEMPLATE_ID -> Email Templates > tu plantilla
     Guía: https://www.emailjs.com/docs/
     ------------------------------------------------------------ */
  const EMAILJS_PUBLIC_KEY = 'EQY3cMzeYUqFvpJuO';
  const EMAILJS_SERVICE_ID = 'service_nu0ylcl';
  const EMAILJS_TEMPLATE_ID = 'template_98m529f';

  if (window.emailjs) {
    emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
  }

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

    if (!window.emailjs) {
      status.textContent = 'No se pudo cargar el servicio de envío. Intenta de nuevo más tarde.';
      status.style.color = '#ff6b6b';
      submitBtn.querySelector('.btn-label').textContent = 'Enviar mensaje';
      submitBtn.style.pointerEvents = 'auto';
      return;
    }

    const templateParams = {
      name: form.elements.name.value.trim(),
      email: form.elements.email.value.trim(),
      subject: form.elements.subject.value.trim(),
      message: form.elements.message.value.trim()
    };

    emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
      .then(() => {
        status.textContent = '¡Mensaje enviado! Te responderé pronto.';
        status.style.color = 'var(--pink-soft)';
        form.reset();
      })
      .catch((err) => {
        console.error('EmailJS error:', err);
        status.textContent = 'Hubo un error al enviar. Intenta de nuevo o escríbeme directo por correo.';
        status.style.color = '#ff6b6b';
      })
      .finally(() => {
        submitBtn.querySelector('.btn-label').textContent = 'Enviar mensaje';
        submitBtn.style.pointerEvents = 'auto';
      });
  });
})();
