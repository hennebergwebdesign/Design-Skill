/* stil.js der Vorlage "Sportclub hell": Stimmenwechsler, Hallenmodus-Schalter, Mitgliedskarte hebt sich beim Scrollen, Formulare ohne Versand.
   Ergänzt bewegung.js, ersetzt nichts. Ohne JavaScript und bei reduzierter Bewegung bleibt alles sichtbar und bedienbar. */
(() => {
  const reduziert = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 1. Stimmenwechsler: ohne JavaScript stehen alle Stimmen untereinander, mit JavaScript eine, dazu Pfeile und Zähler
  document.querySelectorAll('[data-stimmen]').forEach((rahmen) => {
    const folien = [...rahmen.querySelectorAll('.stimme')], steuerung = rahmen.querySelector('[data-stimmen-steuerung]'), nr = rahmen.querySelector('[data-stimmen-nr]');
    if (folien.length < 2 || !steuerung) return;
    let i = 0;
    steuerung.hidden = false;
    const zeige = (neu, richtung) => {
      i = (neu + folien.length) % folien.length;
      folien.forEach((f, k) => {
        f.style.setProperty('--versatz', richtung > 0 ? '-1.5rem' : '1.5rem');
        f.classList.toggle('aktiv', k === i);
        f.setAttribute('aria-hidden', String(k !== i));
        f.inert = k !== i;
      });
      if (nr) nr.textContent = String(i + 1).padStart(2, '0');
    };
    steuerung.querySelector('[data-stimmen-knopf="zurueck"]').addEventListener('click', () => zeige(i - 1, -1));
    steuerung.querySelector('[data-stimmen-knopf="weiter"]').addEventListener('click', () => zeige(i + 1, 1));
    rahmen.addEventListener('keydown', (e) => { if (e.key === 'ArrowLeft') zeige(i - 1, -1); if (e.key === 'ArrowRight') zeige(i + 1, 1); });
    zeige(0, 1);
  });

  // 2. Hallenmodus: Schalter erscheint erst mit JavaScript und ändert nur die Statuszeile der Karte
  document.querySelectorAll('[data-schalter]').forEach((s) => {
    const knopf = s.querySelector('button'), status = document.querySelector('[data-schalter-status]');
    if (!knopf || !status) return;
    s.hidden = false;
    knopf.addEventListener('click', () => {
      const an = knopf.getAttribute('aria-checked') !== 'true';
      knopf.setAttribute('aria-checked', String(an));
      status.textContent = an ? 'Halle: beheizt, trocken und beleuchtet, auch im Winter.' : 'Draußen: Sand, Sonne und Frischluft bis in den Abend.';
    });
  });

  // 3. Mitgliedskarte hebt sich: --hub (0 bis 1) wächst, bis die Karte in der Bildschirmmitte steht, CSS setzt daraus transform und Schatten
  const karten = reduziert ? [] : [...document.querySelectorAll('[data-hebt]')];
  if (karten.length) {
    let w8 = false;
    const messen = () => {
      w8 = false;
      const h = innerHeight;
      karten.forEach((k) => { const r = k.getBoundingClientRect(), p = Math.min(1, Math.max(0, (h - r.top) / (h * 0.6))); k.style.setProperty('--hub', p.toFixed(3)); });
    };
    addEventListener('scroll', () => { if (!w8) { w8 = true; requestAnimationFrame(messen); } }, { passive: true });
    addEventListener('resize', messen);
    messen();
  }

  // 4. Formulare ohne Versand: zeigen nur den Hinweis, dass die Vorlage nichts sendet
  document.querySelectorAll('[data-formular]').forEach((f) => f.addEventListener('submit', (e) => {
    e.preventDefault();
    const m = f.querySelector('[data-formular-meldung]');
    if (m) m.hidden = false;
  }));
})();
