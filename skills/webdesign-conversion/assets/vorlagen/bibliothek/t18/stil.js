/* stil.js der Vorlage "App Bühne": Bühne im Held, Schritte mit Telefon, Reiter, Beispielformular.
   Ergänzt bewegung.js, ersetzt nichts. Ohne JavaScript steht jeder Inhalt sichtbar im HTML. */
(() => {
  const reduziert = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Hilfsfunktion: eine Ansicht im Telefon aktivieren
  const zeige = (telefon, n) => {
    if (!telefon) return;
    telefon.querySelectorAll('.ansicht').forEach((a, i) => a.classList.toggle('ist-aktiv', i === n));
  };

  // 1. Held: --p (0 bis 1) über den Scrollweg, Telefon hebt sich, Text blendet aus (nur ohne reduzierte Bewegung)
  const held = document.querySelector('[data-buehne-scroll]');
  if (held && !reduziert) {
    let w8 = false;
    const lauf = () => {
      w8 = false;
      const p = Math.min(1, Math.max(0, scrollY / (held.offsetHeight * 0.75)));
      held.style.setProperty('--p', p.toFixed(3));
    };
    addEventListener('scroll', () => { if (!w8) { w8 = true; requestAnimationFrame(lauf); } }, { passive: true });
    lauf();
  }

  // 2. Schritte: der Schritt in der Bildschirmmitte schaltet die Ansicht im Telefon
  const story = document.querySelector('.story');
  if (story && 'IntersectionObserver' in window) {
    const telefon = story.querySelector('.telefon');
    const schritte = [...story.querySelectorAll('.schritt')];
    const io = new IntersectionObserver((es) => es.forEach((e) => {
      if (!e.isIntersecting) return;
      schritte.forEach((s) => s.classList.toggle('ist-aktiv', s === e.target));
      zeige(telefon, Number(e.target.dataset.ansicht));
    }), { rootMargin: '-45% 0px -45% 0px' });
    schritte.forEach((s) => io.observe(s));
  }

  // 3. Reiter: Pfeiltasten, Pos1, Ende, Klick. Ohne JavaScript stehen alle Texte untereinander.
  const reiter = document.querySelector('[data-reiter]');
  if (reiter) {
    const knoepfe = [...reiter.querySelectorAll('[role="tab"]')];
    const tafeln = knoepfe.map((k) => document.getElementById(k.getAttribute('aria-controls')));
    const telefon = reiter.querySelector('.telefon');
    const waehle = (n, fokus) => {
      knoepfe.forEach((k, i) => { k.setAttribute('aria-selected', String(i === n)); k.tabIndex = i === n ? 0 : -1; });
      tafeln.forEach((t, i) => { t.hidden = i !== n; });
      zeige(telefon, n);
      if (fokus) knoepfe[n].focus();
    };
    knoepfe.forEach((k, i) => {
      k.addEventListener('click', () => waehle(i, false));
      k.addEventListener('keydown', (e) => {
        const l = knoepfe.length;
        const ziel = { ArrowRight: (i + 1) % l, ArrowLeft: (i - 1 + l) % l, Home: 0, End: l - 1 }[e.key];
        if (ziel !== undefined) { e.preventDefault(); waehle(ziel, true); }
      });
    });
    waehle(0, false);
  }

  // 4. Beispielformular: sendet nichts, zeigt nur eine Meldung
  document.querySelectorAll('form.anfrage').forEach((f) => f.addEventListener('submit', (e) => {
    e.preventDefault();
    const m = document.querySelector('[data-anfrage-meldung]');
    if (m) m.textContent = f.querySelector('input[type="email"]').validity.valid && f.querySelector('input').value
      ? 'Danke, das ist ein Beispielformular. Es wurde nichts gesendet.' : 'Bitte gib eine gültige E-Mail-Adresse ein.';
  }));
})();
