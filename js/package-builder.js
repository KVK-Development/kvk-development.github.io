// Vanilla-JS port of the websites.html "Build Your Package" pricing
// calculator (originally a React component with local state). Reads addon
// config straight from data-* attributes already in the markup, so the HTML
// stays the single source of truth for names/prices/descriptions.
(function () {
  var root = document.querySelector('[data-package-builder]');
  if (!root) return;

  var BASE_PRICE = 500;
  var addonEls = Array.prototype.slice.call(root.querySelectorAll('.pkg-addon'));
  var resetBtn = root.querySelector('[data-reset]');
  var receiptList = root.querySelector('[data-receipt-list]');
  var receiptEmpty = root.querySelector('[data-receipt-empty]');
  var totalAmountEl = root.querySelector('[data-total-amount]');
  var totalFlashEl = root.querySelector('[data-total-flash]');
  var mailtoCta = root.querySelector('[data-mailto-cta]');

  var addons = addonEls.map(function (cardEl) {
    return {
      el: cardEl,
      id: cardEl.getAttribute('data-addon'),
      kind: cardEl.getAttribute('data-kind'),
      price: parseInt(cardEl.getAttribute('data-price'), 10),
      max: parseInt(cardEl.getAttribute('data-max') || '99', 10),
      name: cardEl.querySelector('.pkg-addon-name').textContent.trim(),
      count: 0,
    };
  });

  var currentDisplayTotal = BASE_PRICE;
  var countUpRaf = null;

  function computeTotal() {
    return addons.reduce(function (sum, a) {
      return sum + a.count * a.price;
    }, BASE_PRICE);
  }

  function animateTotal(to) {
    if (countUpRaf) cancelAnimationFrame(countUpRaf);
    var from = currentDisplayTotal;
    var start = null;
    var duration = 280;

    function step(ts) {
      if (start === null) start = ts;
      var t = Math.min(1, (ts - start) / duration);
      var eased = 1 - Math.pow(1 - t, 3);
      var value = Math.round(from + (to - from) * eased);
      totalAmountEl.textContent = '$' + value.toLocaleString();
      if (t < 1) {
        countUpRaf = requestAnimationFrame(step);
      } else {
        currentDisplayTotal = to;
      }
    }
    countUpRaf = requestAnimationFrame(step);
  }

  function flashTotal() {
    if (!totalFlashEl) return;
    totalFlashEl.classList.remove('flash');
    // force reflow so the animation can retrigger
    void totalFlashEl.offsetWidth;
    totalFlashEl.classList.add('flash');
  }

  function buildMailto(selected, total) {
    var lines = ['• Starter Website — $' + BASE_PRICE].concat(
      selected.map(function (a) {
        return '• ' + a.name + ' ×' + a.count + ' — $' + a.count * a.price;
      })
    );
    var body =
      'Hi Red Mesa,\n\nI’d like to start a website build:\n\n' +
      lines.join('\n') +
      '\n\n' +
      'Estimated total: $' + total + ' one-time (plus domain renewal ~$10–20/yr).\n\n' +
      'Here’s a bit about my business:';
    var subject = 'Website Build — $' + total;
    return (
      'mailto:contact@redmesa.dev?subject=' +
      encodeURIComponent(subject) +
      '&body=' +
      encodeURIComponent(body)
    );
  }

  function render() {
    var total = computeTotal();
    var selected = addons.filter(function (a) {
      return a.count > 0;
    });
    var hasAddons = selected.length > 0;

    addons.forEach(function (a) {
      var active = a.count > 0;
      a.el.classList.toggle('active', active);

      if (a.kind === 'qty') {
        var countEl = a.el.querySelector('.pkg-stepper .count');
        var minusBtn = a.el.querySelector('.pkg-stepper .minus');
        var plusBtn = a.el.querySelector('.pkg-stepper .plus');
        if (countEl) countEl.textContent = a.count;
        if (minusBtn) minusBtn.disabled = a.count <= 0;
        if (plusBtn) plusBtn.disabled = a.count >= a.max;
      } else {
        var toggle = a.el.querySelector('.pkg-toggle');
        if (toggle) toggle.classList.toggle('on', active);
      }
    });

    if (resetBtn) resetBtn.classList.toggle('visible', hasAddons);
    if (receiptEmpty) receiptEmpty.style.display = hasAddons ? 'none' : '';

    if (receiptList) {
      receiptList.innerHTML = '';
      selected.forEach(function (a) {
        var li = document.createElement('li');
        var left = document.createElement('span');
        left.style.display = 'flex';
        left.style.alignItems = 'baseline';
        left.style.gap = '0.5rem';
        left.style.minWidth = '0';

        var qty = document.createElement('span');
        qty.className = 'qty';
        qty.textContent = a.count + '×';

        var name = document.createElement('span');
        name.className = 'name';
        name.textContent = a.name;

        left.appendChild(qty);
        left.appendChild(name);

        var amt = document.createElement('span');
        amt.className = 'amt';
        amt.textContent = '$' + a.count * a.price;

        li.appendChild(left);
        li.appendChild(amt);
        receiptList.appendChild(li);
      });
    }

    if (mailtoCta) mailtoCta.setAttribute('href', buildMailto(selected, total));

    animateTotal(total);
    flashTotal();
  }

  addons.forEach(function (a) {
    if (a.kind === 'qty') {
      var minusBtn = a.el.querySelector('.pkg-stepper .minus');
      var plusBtn = a.el.querySelector('.pkg-stepper .plus');
      if (minusBtn) {
        minusBtn.addEventListener('click', function () {
          a.count = Math.max(0, a.count - 1);
          render();
        });
      }
      if (plusBtn) {
        plusBtn.addEventListener('click', function () {
          a.count = Math.min(a.max, a.count + 1);
          render();
        });
      }
    } else {
      a.el.addEventListener('click', function () {
        a.count = a.count > 0 ? 0 : 1;
        render();
      });
    }
  });

  if (resetBtn) {
    resetBtn.addEventListener('click', function () {
      addons.forEach(function (a) {
        a.count = 0;
      });
      render();
    });
  }

  render();
})();
