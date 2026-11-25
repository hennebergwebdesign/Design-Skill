/* stil.js der Vorlage "Restaurant ruhig und eckig": Pfeile für die Stimmenspur, Zähler bis zur Veranstaltung, Formulare ohne Versand.
   Ergänzt bewegung.js, ersetzt nichts. Ohne JavaScript bleibt alles sichtbar und bedienbar (der Zähler zeigt dann Striche). */
(() => {
  const reduziert = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 1. Spur: Pfeile schieben um eine Karte, am Anfang und Ende gesperrt, ohne Überstand verborgen
  document.querySelectorAll('[data-spur-gruppe]').forEach((gruppe) => {
    const spur = gruppe.querySelector('[data-spur]'), steuerung = gruppe.querySelector('[data-spur-steuerung]');
    if (!spur || !steuerung) return;
    const zurueck = steuerung.querySelector('[data-spur-knopf="zurueck"]'), weiter = steuerung.querySelector('[data-spur-knopf="weiter"]');
    const stand = () => {
      steuerung.hidden = spur.scrollWidth - spur.clientWidth <= 4;
      zurueck.setAttribute('aria-disabled', String(spur.scrollLeft < 4));
      weiter.setAttribute('aria-disabled', String(spur.scrollLeft > spur.scrollWidth - spur.clientWidth - 4));
    };
    const schritt = (r) => spur.scrollBy({ left: r * spur.firstElementChild.getBoundingClientRect().width, behavior: reduziert ? 'auto' : 'smooth' });
    zurueck.addEventListener('click', () => schritt(-1));
    weiter.addEventListener('click', () => schritt(1));
    spur.addEventListener('scroll', stand, { passive: true });
    addEventListener('resize', stand);
    stand();
  });

  // 2. Zähler bis zum Termin (data-ziel, ISO Datum). Liegt der Termin hinter uns, bleiben die Werte bei Strichen.
  const zaehler = document.querySelector('[data-ziel]');
  if (zaehler) {
    const ziel = new Date(zaehler.dataset.ziel).getTime();
    const felder = { h: zaehler.querySelector('[data-z="h"]'), m: zaehler.querySelector('[data-z="m"]'), s: zaehler.querySelector('[data-z="s"]') };
    const zwei = (n) => String(n).padStart(2, '0');
    const tick = () => {
      const rest = ziel - Date.now();
      if (!(rest > 0)) return false;
      const s = Math.floor(rest / 1000);
      felder.h.textContent = String(Math.floor(s / 3600));
      felder.m.textContent = zwei(Math.floor(s / 60) % 60);
      felder.s.textContent = zwei(s % 60);
      return true;
    };
    if (tick() && !reduziert) { const t = setInterval(() => { if (!tick()) clearInterval(t); }, 1000); }
  }

  // 3. Formulare ohne Versand: zeigen nur den Hinweis, dass die Vorlage nichts sendet
  document.querySelectorAll('[data-formular]').forEach((f) => f.addEventListener('submit', (e) => {
    e.preventDefault();
    const m = f.querySelector('[data-formular-meldung]') || f.parentElement.querySelector('[data-formular-meldung]');
    if (m) m.hidden = false;
  }));
})();
