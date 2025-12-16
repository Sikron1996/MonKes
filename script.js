
(() => {
  const btn = document.getElementById('copyContract');
  const hint = document.getElementById('copyHint');

  function setHint(text){
    hint.textContent = text;
    hint.style.opacity = 1;
    clearTimeout(setHint._t);
    setHint._t = setTimeout(() => { hint.textContent = 'Tap to copy'; hint.style.opacity = .8; }, 1300);
  }

  if (btn) {
    btn.addEventListener('click', async () => {
      const value = btn.getAttribute('data-contract') || '';
      try {
        await navigator.clipboard.writeText(value);
        setHint('Copied ✅');
      } catch (e) {
        // Fallback
        const ta = document.createElement('textarea');
        ta.value = value;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        ta.remove();
        setHint('Copied ✅');
      }
    });
  }

  // Smooth anchor scroll
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (!id || id === '#') return;
      const el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      el.scrollIntoView({behavior:'smooth', block:'start'});
    });
  });
})();
