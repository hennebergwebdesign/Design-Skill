/* stil.js der Vorlage "Haushaltsbuch App Marine und Koralle": Wischspur mit Pfeilen, Suche im Postenband, Schrittwechsel am Handy,
   Wortmarke im Fuß, Formular ohne Versand. Ergänzt bewegung.js, ersetzt nichts. Ohne JavaScript bleibt alles sichtbar und bedienbar. */
(() => {
  const reduziert = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 1. Wischspur mit Pfeilknöpfen
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

  // 2. Suche im Postenband: Treffer leuchten, Summe und Anzahl stehen in der Statuszeile (Beispielwerte aus data-n und data-eur)
  const eingabe = document.querySelector('[data-suche]'), ergebnis = document.querySelector('[data-suche-ergebnis]');
  if (eingabe && ergebnis) {
    const abschnitt = eingabe.closest('.suche'), start = ergebnis.textContent;
    const posten = [...abschnitt.querySelectorAll('.posten')];
    const zahl = (t) => parseFloat(t.replace('.', '').replace(',', '.'));
    eingabe.addEventListener('input', () => {
      const q = eingabe.value.trim().toLowerCase();
      let n = 0, summe = 0; const gesehen = new Set();
      posten.forEach((p) => {
        const treffer = q.length > 1 && p.textContent.toLowerCase().includes(q);
        p.classList.toggle('treffer', treffer);
        if (treffer && !gesehen.has(p.textContent)) { gesehen.add(p.textContent); n += Number(p.dataset.n); summe += zahl(p.dataset.eur); }
      });
      abschnitt.classList.toggle('sucht', q.length > 1 && gesehen.size > 0);
      if (q.length < 2) ergebnis.textContent = start;
      else if (!gesehen.size) ergebnis.textContent = 'Keine Buchung zu diesem Begriff gefunden (Beispieldaten).';
      else ergebnis.textContent = n + (n === 1 ? ' Buchung' : ' Buchungen') + ', zusammen ' + summe.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' € in diesem Monat. Beispielwerte.';
    });
  }

  // 3. Schrittwechsel: aus dem Scrollweg der Sektion ergibt sich Schritt 1 bis 3
  document.querySelectorAll('[data-schritte]').forEach((sek) => {
    sek.dataset.schritt = '1';
    if (reduziert) return;
    let w8 = false;
    const lauf = () => {
      w8 = false;
      const r = sek.getBoundingClientRect(), s = Math.min(1, Math.max(0, -r.top / Math.max(1, r.height - innerHeight)));
      sek.dataset.schritt = s < 0.34 ? '1' : s < 0.67 ? '2' : '3';
    };
    addEventListener('scroll', () => { if (!w8) { w8 = true; requestAnimationFrame(lauf); } }, { passive: true });
    lauf();
  });

  // 4. Wortmarke im Fuß fährt ein, sobald sie sichtbar wird
  document.querySelectorAll('.fuss__marke').forEach((m) => {
    if (reduziert || !('IntersectionObserver' in window)) { m.classList.add('ist-da'); return; }
    const io = new IntersectionObserver((e) => { if (e.some((x) => x.isIntersecting)) { m.classList.add('ist-da'); io.disconnect(); } }, { threshold: 0.05 });
    io.observe(m);
  });

  // 5. Formular ohne Versand
  document.querySelectorAll('[data-formular]').forEach((f) => f.addEventListener('submit', (e) => {
    e.preventDefault();
    const m = f.querySelector('[data-formular-meldung]');
    if (m) m.hidden = false;
  }));
})();
