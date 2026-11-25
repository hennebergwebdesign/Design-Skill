/* stil.js der Vorlage "Fitness Kobalt Kontrast": Reiter mit Pfeilknöpfen, Preisumschalter, Vorher-Nachher-Regler, Stapel der Stimmen (v2), Formularhinweis.
   Ergänzt bewegung.js, ersetzt nichts. Ohne JavaScript und bei reduzierter Bewegung bleibt alles sichtbar und bedienbar. */
(() => {
  const reduziert = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 1. Reiter: Pfeilknöpfe schieben um eine Karte, am Anfang und Ende gesperrt, ohne Überstand verborgen
  document.querySelectorAll('[data-reiter-gruppe]').forEach((gruppe) => {
    const spur = gruppe.querySelector('[data-reiter-spur]'), steuerung = gruppe.querySelector('[data-reiter-steuerung]');
    if (!spur || !steuerung) return;
    const zurueck = steuerung.querySelector('[data-reiter="zurueck"]'), weiter = steuerung.querySelector('[data-reiter="weiter"]');
    const stand = () => {
      steuerung.hidden = spur.scrollWidth - spur.clientWidth <= 4;
      zurueck.setAttribute('aria-disabled', String(spur.scrollLeft < 4));
      weiter.setAttribute('aria-disabled', String(spur.scrollLeft > spur.scrollWidth - spur.clientWidth - 4));
    };
    const schritt = (r) => {
      const k = spur.querySelector('li'), s = (k ? k.getBoundingClientRect().width : 300) + (parseFloat(getComputedStyle(spur).columnGap) || 16);
      spur.scrollBy({ left: r * s, behavior: reduziert ? 'auto' : 'smooth' });
    };
    zurueck.addEventListener('click', () => schritt(-1));
    weiter.addEventListener('click', () => schritt(1));
    spur.addEventListener('scroll', stand, { passive: true });
    addEventListener('resize', stand);
    stand();
  });

  // 2. Preisumschalter: Monat oder Jahr, der Wert steht in data-m und data-j, ohne JavaScript bleibt der Monatspreis
  document.querySelectorAll('[data-umschalter]').forEach((u) => {
    const bereich = u.closest('section'), knoepfe = [...u.querySelectorAll('button')];
    knoepfe.forEach((k) => k.addEventListener('click', () => {
      knoepfe.forEach((x) => x.setAttribute('aria-pressed', String(x === k)));
      bereich.querySelectorAll('[data-m]').forEach((w) => { w.textContent = k.dataset.modus === 'jahr' ? w.dataset.j : w.dataset.m; });
    }));
  });

  // 3. Vorher-Nachher-Regler: der Rangewert setzt --pos am Rahmen
  document.querySelectorAll('.vn').forEach((vn) => {
    const r = vn.querySelector('input[type="range"]');
    if (!r) return;
    const setze = () => vn.style.setProperty('--pos', r.value + '%');
    r.addEventListener('input', setze);
    setze();
  });

  // 4. Stapel der Stimmen (v2): Pfeile holen die nächste Karte nach vorn
  document.querySelectorAll('[data-stapel]').forEach((st) => {
    const karten = [...st.querySelectorAll('.stapel__karte')], knoepfe = st.parentElement.querySelectorAll('[data-stapel-richtung]');
    if (!karten.length) return;
    let vorn = 0;
    const zeige = () => karten.forEach((k, i) => { const p = (i - vorn + karten.length) % karten.length; k.dataset.pos = String(p); k.setAttribute('aria-hidden', String(p !== 0)); k.inert = p !== 0; });
    knoepfe.forEach((b) => b.addEventListener('click', () => { vorn = (vorn + (b.dataset.stapelRichtung === 'weiter' ? 1 : -1) + karten.length) % karten.length; zeige(); }));
    st.classList.add('aktiv');
    zeige();
  });

  // 5. Formulare ohne Versand: zeigen nur den Hinweis, dass die Vorlage nichts sendet
  document.querySelectorAll('[data-formular]').forEach((f) => f.addEventListener('submit', (e) => {
    e.preventDefault();
    const m = f.querySelector('[data-formular-meldung]');
    if (m) m.hidden = false;
  }));
})();
