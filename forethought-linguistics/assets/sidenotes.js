/* Margin notes, as on the live site.
   Forethought's own build does this in React: it hides the footnote <ol> and
   absolutely positions one note per reference in the right-hand column, faded
   to 30% and clamped to 90px until you hover it. This is the same behaviour in
   plain JS, so the static pages get real sidenotes.
   Below the article-tablet breakpoint (1280px) the column is hidden and the
   ordinary footnote list at the foot of the article takes over. */
(function () {
  'use strict';

  var BREAKPOINT = 1280;
  var CLAMP = 90;   // collapsed note height, matching max-h-[90px]
  var GAP = 8;      // minimum vertical gap between stacked notes

  var column = document.querySelector('[data-component="SideNotes"]');
  var article = document.getElementById('article');
  if (!column || !article) return;

  var refs = [].slice.call(article.querySelectorAll('sup a[id^="fnref-"]'));
  var notes = [];

  function build() {
    column.innerHTML = '';
    notes = refs.map(function (ref, i) {
      var key = ref.id.slice('fnref-'.length);
      var source = document.getElementById('fn-' + key);
      if (!source) return null;

      var body = source.cloneNode(true);
      // the "back to content" arrow belongs to the printed list, not the margin
      var back = body.querySelector('a[href^="#fnref-"]');
      if (back) back.parentNode.removeChild(back);

      var note = document.createElement('div');
      note.className = 'ft-sidenote';
      note.setAttribute('data-note', key);

      var num = document.createElement('sup');
      num.className = 'ft-sidenote-num font-sans font-[500] text-[11px] leading-[103%]';
      num.textContent = ref.textContent;

      var content = document.createElement('div');
      content.className = 'ft-sidenote-body font-serif font-[300] text-[16px] leading-[140%]';
      content.innerHTML = body.innerHTML;

      note.appendChild(num);
      note.appendChild(content);
      column.appendChild(note);
      return { el: note, ref: ref };
    }).filter(Boolean);
  }

  function layout() {
    if (window.innerWidth < BREAKPOINT || !notes.length) return;
    var columnTop = column.getBoundingClientRect().top;
    var floor = 0;
    notes.forEach(function (n) {
      n.el.style.height = 'auto';
      n.el.style.maxHeight = 'none';
      var natural = n.el.offsetHeight;
      var height = Math.min(natural, CLAMP);
      var wanted = n.ref.getBoundingClientRect().top - columnTop;
      var top = Math.max(wanted, floor);
      n.el.style.top = top + 'px';
      n.el.style.height = height + 'px';
      n.el.style.maxHeight = height + 'px';
      n.el.dataset.clamped = natural > CLAMP ? 'true' : 'false';
      floor = top + height + GAP;
    });
    column.style.minHeight = floor + 'px';
  }

  // Clicking a reference on desktop opens its margin note rather than jumping
  // to a list that is hidden at this width.
  function wireRefs() {
    refs.forEach(function (ref) {
      ref.addEventListener('click', function (e) {
        if (window.innerWidth < BREAKPOINT) return;   // let the anchor work
        e.preventDefault();
        var key = ref.id.slice('fnref-'.length);
        var note = column.querySelector('[data-note="' + CSS.escape(key) + '"]');
        if (!note) return;
        notes.forEach(function (n) { n.el.classList.remove('is-open'); });
        note.classList.add('is-open');
        note.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      });
    });
  }

  function init() {
    build();
    wireRefs();
    layout();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Positions depend on where the reference lands, so recompute once webfonts
  // and images have settled, and on resize.
  window.addEventListener('load', layout);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(layout);

  var pending;
  window.addEventListener('resize', function () {
    clearTimeout(pending);
    pending = setTimeout(layout, 120);
  });
})();
