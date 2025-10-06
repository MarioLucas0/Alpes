(function () {
  async function loadPartials() {
    const [header, content, footer] = await Promise.all([
      fetch('src/partials/header.html').then(r => r.text()),
      fetch('src/partials/contact.html').then(r => r.text()),
      fetch('src/partials/footer.html').then(r => r.text())
    ]);
    document.getElementById('partial-header').innerHTML = header;
    document.getElementById('partial-content').innerHTML = content + document.getElementById('partial-content').innerHTML;
    document.getElementById('partial-footer').innerHTML = footer;
  }

  function initUI() {
  const menuBtn = document.getElementById('menuBtn');
  const menuMobile = document.getElementById('menuMobile');
  const form = document.getElementById('contactForm');
  const statusEl = document.getElementById('formStatus');
  let modal = document.getElementById('successModal');
  if (!modal) {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = `
    <div id="successModal" class="invisible opacity-0 fixed inset-0 z-50 grid place-items-center bg-black/40 transition-opacity p-4" aria-hidden="true" role="dialog" aria-labelledby="successTitle" aria-modal="true">
      <div class="w-full max-w-[647px] bg-white rounded-2xl shadow-[0px_0px_15px_-2px_rgba(0,0,0,0.25)] p-5 md:p-8 flex items-center justify-center max-h-[85vh] overflow-y-auto">
        <div class="w-full md:w-[580px] inline-flex flex-col justify-start items-center gap-8 md:gap-12">
          <div class="p-2 rounded-3xl shadow-[0px_12px_28px_0px_rgba(0,0,0,0.04)] inline-flex justify-center items-center gap-2.5" style="background-color: #f6f6f6;">
            <div class="w-6 h-6 relative overflow-hidden">
              <img src="src/assets/images/check.png" alt="Sucesso" class="w-6 h-6" />
            </div>
          </div>
          <div class="self-stretch flex flex-col justify-start items-start gap-3 md:gap-5">
            <div id="successTitle" class="self-stretch text-center justify-start text-Defaults-Texts text-xl md:text-2xl font-bold font-['Poppins'] leading-7 tracking-tight">Olá. Sua Mensagem foi recebida com sucesso!</div>
            <div class="self-stretch text-center justify-start text-Defaults-Secondary-text text-sm md:text-base font-normal font-['Poppins'] leading-normal tracking-tight">Em breve entraremos em contato.</div>
          </div>
          <button id="closeModal" class="w-full sm:w-80 min-w-12 min-h-12 px-6 md:px-20 rounded-[3px] outline outline-1 outline-offset-[-1px] outline-bmw-gray04 inline-flex justify-center items-center overflow-hidden">
            <div class="flex justify-start items-center gap-1">
              <div class="inline-flex flex-col justify-start items-center">
                <div class="text-center justify-center text-bmw-gray04 text-sm md:text-base font-medium font-['Poppins'] leading-normal tracking-tight">Fechar</div>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>`;
    document.body.appendChild(wrapper.firstElementChild);
    modal = document.getElementById('successModal');
  }
  const closeModalBtn = document.getElementById('closeModal');
  let unavailableModal = document.getElementById('unavailableModal');
  if (!unavailableModal) {
    const wrapper2 = document.createElement('div');
    wrapper2.innerHTML = `
    <div id="unavailableModal" class="invisible opacity-0 fixed inset-0 z-50 grid place-items-center bg-black/40 transition-opacity p-4" aria-hidden="true" role="dialog" aria-labelledby="unavailableTitle" aria-modal="true">
      <div class="w-full max-w-[647px] bg-white rounded-2xl shadow-[0px_0px_15px_-2px_rgba(0,0,0,0.25)] p-5 md:p-8 flex items-center justify-center max-h-[85vh] overflow-y-auto">
        <div class="w-full md:w-[580px] inline-flex flex-col justify-start items-center gap-8 md:gap-12">
          <div class="p-2 rounded-3xl shadow-[0px_12px_28px_0px_rgba(0,0,0,0.04)] inline-flex justify-center items-center gap-2.5" style="background-color: #f6f6f6;">
            <div class="w-6 h-6 relative overflow-hidden">
              <img src="src/assets/images/check.png" alt="Indisponível" class="w-6 h-6" />
            </div>
          </div>
          <div class="self-stretch flex flex-col justify-start items-start gap-3 md:gap-5">
            <div id="unavailableTitle" class="self-stretch text-center justify-start text-Defaults-Texts text-xl md:text-2xl font-bold font-['Poppins'] leading-7 tracking-tight">Indisponível no momento</div>
            <div class="self-stretch text-center justify-start text-Defaults-Secondary-text text-sm md:text-base font-normal font-['Poppins'] leading-normal tracking-tight">Este recurso está temporariamente indisponível.</div>
          </div>
          <button id="closeUnavailable" class="w-full sm:w-80 min-w-12 min-h-12 px-6 md:px-20 rounded-[3px] outline outline-1 outline-offset-[-1px] outline-bmw-gray04 inline-flex justify-center items-center overflow-hidden">
            <div class="flex justify-start items-center gap-1">
              <div class="inline-flex flex-col justify-start items-center">
                <div class="text-center justify-center text-bmw-gray04 text-sm md:text-base font-medium font-['Poppins'] leading-normal tracking-tight">Fechar</div>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>`;
    document.body.appendChild(wrapper2.firstElementChild);
    unavailableModal = document.getElementById('unavailableModal');
  }
  const closeUnavailableBtn = document.getElementById('closeUnavailable');

  if (menuBtn && menuMobile) {
    menuBtn.addEventListener('click', () => {
      const expanded = menuBtn.getAttribute('aria-expanded') === 'true';
      menuBtn.setAttribute('aria-expanded', String(!expanded));
      menuMobile.classList.toggle('hidden');
    });
  }

  const phoneInput = document.getElementById('phone');
  if (phoneInput) {
    phoneInput.addEventListener('input', () => {
      let v = phoneInput.value.replace(/\D/g, '');
      if (v.length > 11) v = v.slice(0, 11);
      if (v.length > 10) {
        phoneInput.value = v.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
      } else if (v.length > 6) {
        phoneInput.value = v.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
      } else if (v.length > 2) {
        phoneInput.value = v.replace(/(\d{2})(\d{0,5})/, '($1) $2');
      } else {
        phoneInput.value = v.replace(/(\d{0,2})/, '($1');
      }
    });
  }

  function showError(id, hasError) {
    const p = document.querySelector(`[data-error-for="${id}"]`);
    if (!p) return;
    p.classList.toggle('hidden', !hasError);
  }

  function validateForm() {
    const fields = ['name', 'email', 'phone', 'subject', 'message', 'privacy'];
    let valid = true;
    fields.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      let error = false;
      if (el.type === 'checkbox') {
        error = !el.checked;
      } else if (el.tagName === 'SELECT') {
        error = !el.value || el.value === '';
      } else {
        error = !el.value || (el.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(el.value));
      }
      showError(id, error);
      el.classList.toggle('border-red-400', error);
      el.classList.toggle('focus:border-red-500', error);
      valid = valid && !error;
    });
    return valid;
  }

  function openModal() {
    modal.classList.add('modal-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('modal-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeModal);
  }
  modal?.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  function openUnavailable() {
    unavailableModal.classList.add('modal-open');
    unavailableModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
  function closeUnavailable() {
    unavailableModal.classList.remove('modal-open');
    unavailableModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
  if (closeUnavailableBtn) {
    closeUnavailableBtn.addEventListener('click', closeUnavailable);
  }
  unavailableModal?.addEventListener('click', (e) => {
    if (e.target === unavailableModal) closeUnavailable();
  });

  document.querySelectorAll('[data-open="unavailable"]').forEach((el) => {
    el.addEventListener('click', (ev) => {
      ev.preventDefault();
      openUnavailable();
    });
  });

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      statusEl.textContent = '';
      if (!validateForm()) {
        statusEl.textContent = 'Por favor, corrija os campos em destaque.';
        return;
      }

      statusEl.textContent = 'Enviando…';
      setTimeout(() => {
        form.reset();
        statusEl.textContent = '';
        openModal();
      }, 700);
    });
  }
  }

  
  loadPartials().then(initUI);
})();


