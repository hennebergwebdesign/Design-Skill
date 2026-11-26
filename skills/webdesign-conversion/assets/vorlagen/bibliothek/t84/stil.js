/* stil.js t84: nur Spezialbewegung. Vorzugsliste (aktiver Punkt wechselt beim Überfahren und beim Fokus), Formulare ohne Versand. */
(() => {
  // 1. Vorzugsliste: der Punkt unter dem Zeiger oder mit Fokus wird aktiv, der letzte bleibt aktiv
  const liste = document.querySelector('.vorteile__liste');
  if (liste) {
    const punkte = [...liste.querySelectorAll('.vorzug')];
    const aktiv = (p) => punkte.forEach((x) => x.classList.toggle('ist-aktiv', x === p));
    punkte.forEach((p) => {
      p.addEventListener('pointerenter', () => aktiv(p));
      p.addEventListener('focusin', () => aktiv(p));
    });
  }

  // 2. Wortmarke im Fuß: fährt ein, sobald sie zu sehen ist (eigener Beobachter, weil sie ganz am Seitenende liegt). Ohne Beobachter bleibt sie sichtbar.
  const wort = document.querySelector('.fuss__wort');
  if (wort && 'IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const io = new IntersectionObserver((e) => { if (e.some((x) => x.isIntersecting)) { wort.classList.add('ist-da'); io.disconnect(); } }, { threshold: 0.1 });
    io.observe(wort);
  } else if (wort) wort.classList.add('ist-da');

  // 3. Formulare ohne Versand: zeigen nur den Hinweis, dass die Vorlage nichts sendet
  document.querySelectorAll('[data-formular]').forEach((f) => f.addEventListener('submit', (e) => {
    e.preventDefault();
    const m = f.querySelector('[data-formular-meldung]');
    if (m) m.hidden = false;
  }));
})();
