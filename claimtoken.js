const selects = document.querySelectorAll('.net-select');
const fromAmount = document.getElementById('fromAmount');
const toAmount = document.getElementById('toAmount');
const swapBtn = document.getElementById('swapBtn');
const maxBtn = document.getElementById('maxBtn');
const feeEl = document.getElementById('fee');

function closeAll() {
  selects.forEach(s => {
    s.classList.remove('open');
    const btn = s.querySelector('.net-btn');
    if (btn) btn.setAttribute('aria-expanded', 'false');
  });
}

selects.forEach(sel => {
  const btn = sel.querySelector('.net-btn');
  const menu = sel.querySelector('.net-menu');

  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = sel.classList.contains('open');
    closeAll();
    if (!isOpen) {
      sel.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
    }
  });

  menu.querySelectorAll('.net-item').forEach(item => {
    item.addEventListener('click', () => {
      const name = item.dataset.net;
      const icon = item.dataset.icon;
      const badge = item.dataset.badge;

      const nameEl = sel.querySelector('[data-name]');
      const icoSlot = sel.querySelector('[data-ico]');

      nameEl.textContent = name;

      if (icon) {
        // swap to image icon
        if (icoSlot.tagName.toLowerCase() !== 'img') {
          const img = document.createElement('img');
          img.className = 'net-ico net-ico--img';
          img.setAttribute('data-ico', '');
          img.alt = name;
          icoSlot.replaceWith(img);
        }
        const img = sel.querySelector('img[data-ico]');
        img.src = icon;
        img.alt = name;
        img.className = 'net-ico net-ico--img';
      } else {
        // swap to badge
        if (icoSlot.tagName.toLowerCase() === 'img') {
          const span = document.createElement('span');
          span.className = 'net-ico net-ico--badge';
          span.setAttribute('data-ico', '');
          icoSlot.replaceWith(span);
        }
        const span = sel.querySelector('span[data-ico]');
        span.textContent = badge || (name || '').slice(0,4).toUpperCase();
        span.className = 'net-ico net-ico--badge';
      }

      closeAll();
      updateEstimate();
    });
  });
});

document.addEventListener('click', closeAll);

function updateEstimate(){
  const val = parseFloat(fromAmount.value || '0');
  if (!isFinite(val)) return;
  toAmount.value = val ? (val * 100.000).toFixed(4) : '';
  feeEl.textContent = val ? '~0.5%' : '~0.00';
}

fromAmount.addEventListener('input', updateEstimate);

maxBtn.addEventListener('click', () => {
  fromAmount.value = '1.0';
  updateEstimate();
});

swapBtn.addEventListener('click', () => {
  // swap selected networks (FROM <-> TO)
  const fromSel = document.querySelector('.net-select[data-select="from"]');
  const toSel = document.querySelector('.net-select[data-select="to"]');

  const fromName = fromSel.querySelector('[data-name]').textContent;
  const toName = toSel.querySelector('[data-name]').textContent;

  // swap names
  fromSel.querySelector('[data-name]').textContent = toName;
  toSel.querySelector('[data-name]').textContent = fromName;

  // swap icons/badges by swapping outerHTML of ico slots (simple and robust)
  const fromIco = fromSel.querySelector('[data-ico]');
  const toIco = toSel.querySelector('[data-ico]');

  const a = fromIco.outerHTML;
  const b = toIco.outerHTML;

  fromIco.outerHTML = b;
  toIco.outerHTML = a;

  updateEstimate();
});
