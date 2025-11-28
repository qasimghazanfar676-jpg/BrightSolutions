// Shared utilities
document.addEventListener('DOMContentLoaded', () => {
  // set copyright years
  const y = new Date().getFullYear();
  ['year','year-2','year-3'].forEach(id=>{
    const el = document.getElementById(id);
    if(el) el.textContent = y;
  });

  // Mobile nav toggles (for each page header)
  ['mobile-nav-toggle','mobile-nav-toggle-2','mobile-nav-toggle-3'].forEach(id=>{
    const btn = document.getElementById(id);
    if(btn){
      btn.addEventListener('click', ()=> {
        const nav = btn.nextElementSibling || document.getElementById('main-nav');
        if(nav) {
          if(nav.style.display === 'block') { nav.style.display = ''; }
          else nav.style.display = 'block';
        }
      });
    }
  });

  // Theme toggle (persist in localStorage)
  const applyTheme = (theme) => {
    if(theme === 'dark') document.documentElement.setAttribute('data-theme','dark');
    else document.documentElement.removeAttribute('data-theme');
    localStorage.setItem('theme', theme);
  };
  const savedTheme = localStorage.getItem('theme') || 'light';
  applyTheme(savedTheme);

  ['theme-toggle','theme-toggle-2','theme-toggle-3'].forEach(id=>{
    const btn = document.getElementById(id);
    if(btn) btn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
      const next = current === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      btn.setAttribute('aria-pressed', next === 'dark');
    });
  });

  // Accordion FAQ
  document.querySelectorAll('.accordion-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const panel = btn.nextElementSibling;
      if(!panel) return;
      const opened = panel.style.maxHeight && panel.style.maxHeight !== '0px';
      // close all
      document.querySelectorAll('.accordion .panel').forEach(p => p.style.maxHeight = null);
      if(!opened){
        panel.style.maxHeight = panel.scrollHeight + 'px';
      } else {
        panel.style.maxHeight = null;
      }
    });
  });

  // Contact form validation (client-side)
  const form = document.getElementById('contact-form');
  if(form){
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = form.querySelector('#name').value.trim();
      const email = form.querySelector('#email').value.trim();
      const message = form.querySelector('#message').value.trim();
      const status = document.getElementById('form-status');

      if(!name || !email || !message){
        status.textContent = 'Please fill out all required fields.';
        status.style.color = 'var(--muted)';
        return;
      }
      // simple email regex
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if(!re.test(email)){
        status.textContent = 'Please enter a valid email address.';
        status.style.color = 'var(--muted)';
        return;
      }

      // simulate success (no backend)
      status.textContent = 'Thanks! Your message was received (demo).';
      status.style.color = 'green';
      form.reset();
    });
  }

  // Gallery modal
  const modal = document.getElementById('modal');
  const modalImg = document.getElementById('modal-img');
  const modalCaption = document.getElementById('modal-caption');
  const modalClose = document.getElementById('modal-close');

  document.querySelectorAll('.gallery-item').forEach(img => {
    img.addEventListener('click', () => {
      modal.style.display = 'flex';
      modalImg.src = img.src;
      modalImg.alt = img.alt || '';
      modalCaption.textContent = img.alt || '';
      modal.setAttribute('aria-hidden', 'false');
    });
  });
  if(modalClose) modalClose.addEventListener('click', closeModal);
  if(modal) modal.addEventListener('click', (e) => {
    if(e.target === modal) closeModal();
  });
  function closeModal(){
    if(modal){
      modal.style.display = 'none';
      modal.setAttribute('aria-hidden', 'true');
    }
  }

  // Tip calculator
  const calcBtn = document.getElementById('calc-btn');
  if(calcBtn){
    calcBtn.addEventListener('click', () => {
      const bill = parseFloat(document.getElementById('bill').value) || 0;
      const tip = parseFloat(document.getElementById('tip').value) || 0;
      const res = document.getElementById('calc-result');
      if(bill <= 0){ res.textContent = 'Enter a valid bill amount'; return; }
      const totalTip = (bill * (tip/100));
      const total = bill + totalTip;
      res.textContent = `Tip: ${totalTip.toFixed(2)} | Total: ${total.toFixed(2)}`;
    });
  }

  // close dropdown on outside click
  document.addEventListener('click', (e) => {
    document.querySelectorAll('.dropdown-content').forEach(dc => {
      if(!dc.parentElement.contains(e.target)) {
        dc.style.display = '';
      }
    });
  });

  // ensure dropdown toggles are accessible: allow keyboard open via enter
  document.querySelectorAll('.dropbtn').forEach(btn => {
    btn.addEventListener('keydown', (e)=> {
      if(e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const dc = btn.nextElementSibling;
        if(dc) dc.style.display = (dc.style.display === 'block' ? '' : 'block');
      }
    });
  });

});
