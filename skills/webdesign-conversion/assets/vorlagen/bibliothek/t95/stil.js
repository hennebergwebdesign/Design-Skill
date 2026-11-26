/* stil.js der Vorlage "Gadget Szenen": Chips schalten durch (mit Selbstlauf, der beim ersten Eingriff endet), Sprachenliste mit Wortlicht,
   Gerät dreht leicht beim Scrollen, ein Knopf pausiert alles, was sich von selbst bewegt, Formulare ohne Versand. Ergänzt bewegung.js.
   Ohne JavaScript und bei reduzierter Bewegung bleibt alles sichtbar: Chips und Pause Knopf erscheinen erst mit JavaScript, ohne sie stehen
   alle Beispielantworten untereinander. */
(() => {
  const reduziert = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const root = document.documentElement;
  const pausiert = () => root.classList.contains('pausiert');

  // 1. Pause Knopf (nur ohne reduzierte Bewegung sichtbar, dort bewegt sich ohnehin nichts)
  const pause = document.querySelector('[data-pause]');
  if (pause) {
    const text = pause.querySelector('[data-pause-text]');
    pause.addEventListener('click', () => {
      const an = root.classList.toggle('pausiert');
      pause.setAttribute('aria-pressed', String(an));
      if (text) text.textContent = an ? 'Bewegung fortsetzen' : 'Bewegung anhalten';
    });
  }

  // 2. Sichtbarkeit merken, damit Selbstläufe nur laufen, wenn man sie sieht
  const sichtbar = new WeakMap();
  const beob = 'IntersectionObserver' in window ? new IntersectionObserver((es) => es.forEach((e) => sichtbar.set(e.target, e.isIntersecting)), { threshold: 0.25 }) : null;

  // 3. Chips: Beispielantwort wechselt, Selbstlauf alle 4,5 s, endet bei Klick, Fokus oder Pause
  document.querySelectorAll('[data-chips]').forEach((szene) => {
    const leiste = szene.querySelector('[data-chips-leiste]');
    const knoepfe = leiste ? [...leiste.querySelectorAll('[data-chip]')] : [];
    const panels = [...szene.querySelectorAll('[data-panel]')];
    if (!knoepfe.length || knoepfe.length !== panels.length) return;
    leiste.hidden = false;
    let aktiv = 0, selbst = !reduziert;
    const setze = (i) => {
      aktiv = i;
      knoepfe.forEach((k, j) => k.setAttribute('aria-pressed', String(j === i)));
      panels.forEach((p, j) => { p.hidden = j !== i; });
    };
    knoepfe.forEach((k, i) => {
      k.addEventListener('click', () => { selbst = false; setze(i); });
      k.addEventListener('focus', () => { selbst = false; });
    });
    setze(0);
    if (beob) beob.observe(szene);
    if (!reduziert) {
      setInterval(() => {
        if (!selbst || pausiert() || !sichtbar.get(szene)) return;
        setze((aktiv + 1) % knoepfe.length);
      }, 4500);
    }
  });

  // 4. Sprachenliste: ein Licht wandert durch die Liste, Überfahren setzt es dorthin
  document.querySelectorAll('[data-sprachen]').forEach((liste) => {
    const eintraege = [...liste.querySelectorAll('li')];
    if (!eintraege.length) return;
    let i = -1;
    const an = (n) => { eintraege.forEach((e, j) => e.classList.toggle('an', j === n)); i = n; };
    eintraege.forEach((e, n) => { e.addEventListener('mouseenter', () => an(n)); });
    if (beob) beob.observe(liste);
    if (!reduziert) {
      setInterval(() => {
        if (pausiert() || !sichtbar.get(liste)) return;
        an((i + 1) % eintraege.length);
      }, 1100);
    }
  });

  // 5. Gerät dreht leicht beim Scrollen (Spanne etwa minus 16 bis plus 16 Grad), nur Transform über Eigenschaften
  const geraet = document.querySelector('[data-dreh]');
  if (geraet && !reduziert) {
    let w8 = false;
    const lauf = () => {
      w8 = false;
      const r = geraet.getBoundingClientRect(), h = innerHeight;
      const p = Math.min(1, Math.max(0, (h - r.top) / (h + r.height)));
      geraet.style.setProperty('--dreh', ((p - 0.5) * 32).toFixed(2));
      geraet.style.setProperty('--kipp', ((0.5 - p) * 8).toFixed(2));
    };
    addEventListener('scroll', () => { if (!w8) { w8 = true; requestAnimationFrame(lauf); } }, { passive: true });
    lauf();
  }

  // 6. Formulare ohne Versand: Hinweis zeigen
  document.querySelectorAll('[data-formular]').forEach((f) => f.addEventListener('submit', (e) => {
    e.preventDefault();
    const m = f.querySelector('[data-formular-meldung]');
    if (m) m.hidden = false;
  }));
})();
