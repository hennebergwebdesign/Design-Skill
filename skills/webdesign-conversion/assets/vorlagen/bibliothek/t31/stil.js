/* stil.js der Vorlage "Gebäudeservice, Flächenwechsel": Stimmenwahl, Bereiche mit Sticky, Rundung des Abschlussbilds, Formularhinweis.
   Ergänzt bewegung.js, ersetzt nichts. Ohne JavaScript und bei reduzierter Bewegung bleibt alles sichtbar und bedienbar. */
(() => {
  const reduziert = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const breit = matchMedia('(min-width: 62rem)');

  // 1. Stimmen: die Porträts wählen die Stimme, die anderen werden verborgen. Ohne JavaScript stehen alle sechs untereinander.
  const gruppe = document.querySelector('[data-stimmen]');
  if (gruppe) {
    const links = [...gruppe.querySelectorAll('.stimmen__wahl a')];
    const stimmen = links.map((a) => gruppe.querySelector(a.getAttribute('href')));
    const waehle = (i) => {
      stimmen.forEach((s, k) => { s.hidden = k !== i; });
      links.forEach((a, k) => a.setAttribute('aria-current', String(k === i)));
    };
    links.forEach((a, i) => a.addEventListener('click', (e) => { e.preventDefault(); waehle(i); }));
    waehle(0);
  }

  // 2. Bereiche: ab 62rem bleibt die Bühne stehen, der Scrollweg wechselt den Bereich. Sonst stehen alle vier untereinander.
  const sek = document.querySelector('[data-bereiche]');
  if (sek) {
    const artikel = [...sek.querySelectorAll('.bereich')], punkte = [...sek.querySelectorAll('.bereiche__punkte a')];
    let sticky = false, tick = false, aktuell = -1;
    const zeige = (i) => {
      if (i === aktuell) return; aktuell = i;
      artikel.forEach((a, k) => a.classList.toggle('aktiv', k === i));
      punkte.forEach((p, k) => p.setAttribute('aria-current', String(k === i)));
    };
    const messen = () => {
      tick = false;
      const nun = breit.matches && !reduziert;
      if (nun !== sticky) { sticky = nun; sek.classList.toggle('ist-sticky', nun); aktuell = -1; }
      if (!sticky) { artikel.forEach((a) => a.classList.add('aktiv')); punkte.forEach((p) => p.removeAttribute('aria-current')); aktuell = -2; return; }
      if (aktuell === -2) aktuell = -1;
      const r = sek.getBoundingClientRect(), weg = Math.max(1, r.height - innerHeight), p = Math.min(0.999, Math.max(0, -r.top / weg));
      zeige(Math.floor(p * artikel.length));
    };
    punkte.forEach((p, i) => p.addEventListener('click', (e) => {
      if (!sticky) return; e.preventDefault();
      const weg = sek.offsetHeight - innerHeight, y = sek.getBoundingClientRect().top + scrollY + ((i + 0.5) / artikel.length) * weg;
      scrollTo({ top: y, behavior: 'smooth' });
    }));
    addEventListener('scroll', () => { if (!tick) { tick = true; requestAnimationFrame(messen); } }, { passive: true });
    addEventListener('resize', messen);
    messen();
  }

  // 3. Abschlussbild: die obere Rundung öffnet sich mit dem Scrollweg (--rund von groß nach 0)
  const bild = document.querySelector('[data-rund]');
  if (bild && !reduziert) {
    let tick = false;
    const lauf = () => {
      tick = false;
      const r = bild.getBoundingClientRect(), h = innerHeight, p = Math.min(1, Math.max(0, (h - r.top) / (h * 0.8)));
      const start = breit.matches ? 16 : 7;
      bild.style.setProperty('--rund', (start * (1 - p)).toFixed(2) + 'rem');
    };
    addEventListener('scroll', () => { if (!tick) { tick = true; requestAnimationFrame(lauf); } }, { passive: true });
    addEventListener('resize', lauf);
    lauf();
  }

  // 4. Formulare ohne Versand: zeigen nur den Hinweis, dass die Vorlage nichts sendet
  document.querySelectorAll('[data-formular]').forEach((f) => f.addEventListener('submit', (e) => {
    e.preventDefault();
    const m = f.querySelector('[data-formular-meldung]');
    if (m) m.hidden = false;
  }));
})();
