/* stil.js der Vorlage "Finanz App, drei Varianten": Kleinigkeiten, die bewegung.js nicht abdeckt. Ergänzt, ersetzt nichts.
   Ohne JavaScript und bei reduzierter Bewegung bleibt alles sichtbar und bedienbar. */
(() => {
  const reduziert = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 1. Videoplatzhalter: der Knopf zeigt nur den Hinweis, dass hier ein Video eingebunden wird
  document.querySelectorAll('[data-video-hinweis]').forEach((k) => k.addEventListener('click', () => {
    const h = document.getElementById(k.dataset.videoHinweis);
    if (h) h.hidden = !h.hidden;
  }));

  // 2. Reiter mit Pfeilknöpfen (Stimmenspur in Variante 3): Pfeile schieben um eine Karte, am Anfang und Ende gesperrt
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

  // 3. Hero-Karten (Variante 3): eine Karte offen, wechselt alle 5 Sekunden, bleibt bei Mauszeiger, Fokus und Klick stehen.
  //    Ohne JavaScript und bei reduzierter Bewegung sind alle Karten geöffnet bzw. nur per Klick umschaltbar.
  document.querySelectorAll('[data-karussell]').forEach((liste) => {
    const karten = [...liste.querySelectorAll('.k3')];
    let i = Math.max(0, karten.findIndex((k) => k.classList.contains('ist-aktiv'))), stopp = false, timer = null;
    const zeige = (n) => { i = n; karten.forEach((k, j) => { const an = j === n; k.classList.toggle('ist-aktiv', an); k.querySelector('button').setAttribute('aria-expanded', String(an)); }); };
    karten.forEach((k, j) => k.querySelector('button').addEventListener('click', () => { stopp = true; zeige(j); }));
    if (reduziert) return;
    ['mouseenter', 'focusin'].forEach((e) => liste.addEventListener(e, () => { stopp = true; }));
    timer = setInterval(() => { if (!stopp && !document.hidden) zeige((i + 1) % karten.length); }, 5000);
  });

  // 4. Reiter (Variante 3): Pfeiltasten wechseln, nur ein Feld sichtbar. Ohne JavaScript stehen beide Felder untereinander.
  document.querySelectorAll('[data-reiter-satz]').forEach((satz) => {
    const tabs = [...satz.querySelectorAll('[role="tab"]')], tafeln = tabs.map((t) => document.getElementById(t.getAttribute('aria-controls')));
    const waehle = (n, fokus) => { tabs.forEach((t, j) => { t.setAttribute('aria-selected', String(j === n)); t.tabIndex = j === n ? 0 : -1; tafeln[j].hidden = j !== n; }); if (fokus) tabs[n].focus(); };
    tabs.forEach((t, j) => {
      t.addEventListener('click', () => waehle(j, false));
      t.addEventListener('keydown', (e) => { if (e.key === 'ArrowRight') { e.preventDefault(); waehle((j + 1) % tabs.length, true); } if (e.key === 'ArrowLeft') { e.preventDefault(); waehle((j + tabs.length - 1) % tabs.length, true); } });
    });
    waehle(0, false);
  });

  // 5. Preisumschalter (Variante 3): tauscht die Zahlen zwischen monatlich und jährlich. Ohne JavaScript steht der Monatspreis im HTML.
  document.querySelectorAll('[data-preisschalter]').forEach((knopf) => {
    const lauf = () => {
      const jahr = knopf.getAttribute('aria-checked') === 'true';
      document.querySelectorAll('[data-monat]').forEach((e) => { e.textContent = jahr ? e.dataset.jahr : e.dataset.monat; });
    };
    knopf.addEventListener('click', () => { knopf.setAttribute('aria-checked', String(knopf.getAttribute('aria-checked') !== 'true')); lauf(); });
  });
})();
