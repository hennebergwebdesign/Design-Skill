/* stil.js der Vorlage "Vergütungssoftware, schwarz und Mint": Uhr im Kopf, Liste mit Bildwechsel, Stimmen als Wechsler,
   Pause für die Bänder, Formulare ohne Versand. Ergänzt bewegung.js, ersetzt nichts.
   Ohne JavaScript und bei reduzierter Bewegung bleibt alles sichtbar: Punkt 01 steht, die Stimmen stehen untereinander, die Uhr zeigt einen festen Beispielwert. */
(() => {
  const reduziert = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 1. Uhr im Kopf: läuft jede Sekunde, bei reduzierter Bewegung steht der Beispielwert aus dem HTML
  const uhr = document.querySelector('[data-uhr]');
  if (uhr && !reduziert) {
    const fmt = new Intl.DateTimeFormat('de-DE', { hour: '2-digit', minute: '2-digit', second: '2-digit', hourCycle: 'h23', timeZone: 'Europe/Berlin' });
    const tick = () => { uhr.textContent = fmt.format(new Date()); };
    tick();
    setInterval(tick, 1000);
  }

  // 2. Liste mit aktivem Punkt: Hover, Fokus und Klick wechseln Bild und Text, ohne JavaScript steht Punkt 01
  document.querySelectorAll('[data-schritte]').forEach((liste) => {
    const punkte = [...liste.querySelectorAll('li')];
    const bilder = [...document.querySelectorAll('.ablauf__bild')];
    const setze = (n) => {
      punkte.forEach((li, i) => {
        const an = i === n;
        li.classList.toggle('aktiv', an);
        const a = li.querySelector('.schritt');
        if (an) a.setAttribute('aria-current', 'step'); else a.removeAttribute('aria-current');
      });
      bilder.forEach((b, i) => b.classList.toggle('aktiv', i === n));
    };
    punkte.forEach((li, i) => {
      const a = li.querySelector('.schritt');
      a.addEventListener('mouseenter', () => setze(i));
      a.addEventListener('focus', () => setze(i));
      a.addEventListener('click', (e) => { e.preventDefault(); setze(i); });
    });
  });

  // 3. Stimmen als Wechsler: Pfeile, Fortschrittslinie, Zähler. Ohne JavaScript stehen alle Karten untereinander.
  document.querySelectorAll('[data-wechsler]').forEach((buehne) => {
    const abschnitt = buehne.closest('section');
    const karten = [...buehne.querySelectorAll('.zitat')];
    const steuerung = abschnitt.querySelector('[data-steuerung]');
    if (!steuerung || karten.length < 2) return;
    const zurueck = steuerung.querySelector('[data-zurueck]'), weiter = steuerung.querySelector('[data-weiter]');
    const zaehler = steuerung.querySelector('[data-zaehler]'), fuell = steuerung.querySelector('.linie__fuell');
    const wrap = buehne.querySelector('[data-karten]');
    let n = 0, bedient = false;
    steuerung.hidden = false;
    buehne.classList.add('wechsler');
    const zeige = (i) => {
      n = (i + karten.length) % karten.length;
      karten.forEach((k, j) => k.classList.toggle('aktiv', j === n));
      if (fuell) fuell.parentElement.style.setProperty('--p', ((n + 1) / karten.length).toFixed(4)), fuell.style.setProperty('--p', ((n + 1) / karten.length).toFixed(4));
      if (zaehler) zaehler.textContent = `${n + 1} von ${karten.length}`;
      if (bedient) wrap.setAttribute('aria-live', 'polite');
    };
    zurueck.addEventListener('click', () => { bedient = true; zeige(n - 1); });
    weiter.addEventListener('click', () => { bedient = true; zeige(n + 1); });
    buehne.addEventListener('keydown', (e) => { if (e.key === 'ArrowLeft') { bedient = true; zeige(n - 1); } if (e.key === 'ArrowRight') { bedient = true; zeige(n + 1); } });
    zeige(0);
  });

  // 4. Bänder anhalten (WCAG 2.2.2): Knopf erscheint erst mit JavaScript, Hover pausiert ohnehin
  document.querySelectorAll('[data-band-pause]').forEach((knopf) => {
    const band = (knopf.closest('section') || document).querySelector('.band');
    if (!band) return;
    if (reduziert) return; // statisch, kein Band in Bewegung
    knopf.hidden = false;
    knopf.addEventListener('click', () => {
      const halt = band.classList.toggle('band--halt');
      knopf.setAttribute('aria-pressed', String(halt));
      knopf.textContent = halt ? 'Band fortsetzen' : 'Band anhalten';
    });
  });

  // 5. Formulare ohne Versand: zeigen nur den Hinweis, dass die Vorlage nichts sendet
  document.querySelectorAll('[data-formular]').forEach((f) => f.addEventListener('submit', (e) => {
    e.preventDefault();
    const m = f.querySelector('[data-formular-meldung]');
    if (m) m.hidden = false;
  }));
})();
