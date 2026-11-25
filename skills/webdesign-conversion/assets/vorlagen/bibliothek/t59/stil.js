/* stil.js der Vorlage "Studio Kobalt": Punkte für Spuren (Kurse, Stimmen), erreichte Schritte, Menü am Desktop, Formularhinweis.
   Ergänzt bewegung.js, ersetzt nichts. Ohne JavaScript und bei reduzierter Bewegung bleibt alles sichtbar und bedienbar. */
(() => {
  const reduziert = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 1. Spuren mit Punkten: eine Taste je Karte, die aktuelle trägt aria-current. Ohne JavaScript bleibt die Spur wischbar.
  document.querySelectorAll('[data-spur-gruppe]').forEach((gruppe) => {
    const spur = gruppe.querySelector('[data-spur]'), punkte = gruppe.querySelector('[data-punkte]');
    if (!spur || !punkte) return;
    const karten = [...spur.children];
    const knoepfe = karten.map((k, i) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.setAttribute('aria-label', `Karte ${i + 1} von ${karten.length}`);
      b.addEventListener('click', () => {
        const rand = parseFloat(getComputedStyle(spur).paddingLeft) || 0;
        spur.scrollTo({ left: spur.scrollLeft + k.getBoundingClientRect().left - spur.getBoundingClientRect().left - rand, behavior: reduziert ? 'auto' : 'smooth' });
      });
      punkte.appendChild(b);
      return b;
    });
    const stand = () => {
      const s = spur.getBoundingClientRect().left + (parseFloat(getComputedStyle(spur).paddingLeft) || 0);
      let beste = 0, abstand = Infinity;
      karten.forEach((k, i) => { const d = Math.abs(k.getBoundingClientRect().left - s); if (d < abstand) { abstand = d; beste = i; } });
      if (spur.scrollLeft + spur.clientWidth >= spur.scrollWidth - 4) beste = karten.length - 1;
      knoepfe.forEach((b, i) => b.setAttribute('aria-current', String(i === beste)));
    };
    spur.addEventListener('scroll', stand, { passive: true });
    addEventListener('resize', stand);
    stand();
  });

  // 2. Ablauf: Schritte, deren Oberkante die Bildschirmmitte überschritten hat, färben sich (ohne JavaScript sind alle gefärbt)
  const schritte = [...document.querySelectorAll('.schritt')];
  if (schritte.length) {
    let w = false;
    const messen = () => { w = false; const grenze = innerHeight * 0.6; schritte.forEach((s) => s.classList.toggle('erreicht', s.getBoundingClientRect().top < grenze)); };
    addEventListener('scroll', () => { if (!w) { w = true; requestAnimationFrame(messen); } }, { passive: true });
    addEventListener('resize', messen);
    messen();
  }

  // 3. Menü: am Desktop klappt es neben dem Knopf auf, die Seite bleibt dabei bedienbar (bewegung.js sperrt das Scrollen nur für die Handyansicht)
  const menuKnopf = document.querySelector('[data-menue]');
  if (menuKnopf) {
    const frei = () => { if (matchMedia('(min-width: 62rem)').matches) document.body.style.overflow = ''; };
    menuKnopf.addEventListener('click', frei);
    addEventListener('keydown', frei);
    document.querySelectorAll('[data-menue-ziel] a').forEach((a) => a.addEventListener('click', frei));
  }

  // 4. Formulare ohne Versand: zeigen nur den Hinweis, dass die Vorlage nichts sendet
  document.querySelectorAll('[data-formular]').forEach((f) => f.addEventListener('submit', (e) => {
    e.preventDefault();
    const m = f.querySelector('[data-formular-meldung]');
    if (m) m.hidden = false;
  }));
})();
