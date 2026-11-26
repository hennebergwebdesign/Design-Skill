/* stil.js der Vorlage "Smartwatch Zubehör, Limette": Produkt wechselt die Ebene hinter der Großschrift, Konfigurator (Größe, Farbe, Preis),
   Teile Liste schaltet den Ausschnitt, Wortband mit Pause, Formulare ohne Versand. Ergänzt bewegung.js, ersetzt nichts.
   Ohne JavaScript und bei reduzierter Bewegung bleibt alles sichtbar und bedienbar (Produkt vorn, Liste zeigt alle Texte). */
(() => {
  const reduziert = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 1. Held: das Produkt liegt am Anfang hinter der Großschrift und steigt dann davor (z-index Wechsel über data-hinten).
  //    Nur auf der gepinnten Bühne (ab 768 px, ohne reduzierte Bewegung), sonst bleibt es vorn.
  const held = document.querySelector('.held[data-fortschritt]');
  const buehne = held && held.querySelector('.held__buehne');
  if (buehne && !reduziert) {
    const breit = matchMedia('(min-width: 48rem)');
    let w8 = false;
    const pruefen = () => {
      w8 = false;
      const r = held.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, -r.top / Math.max(1, r.height - innerHeight)));
      buehne.toggleAttribute('data-hinten', breit.matches && p < 0.1);
    };
    addEventListener('scroll', () => { if (!w8) { w8 = true; requestAnimationFrame(pruefen); } }, { passive: true });
    addEventListener('resize', pruefen);
    pruefen();
  }

  // 2. Konfigurator: Größe skaliert das Produkt und ändert den Preis, Farbe schaltet das Bild der Uhr (ein Bild je Farbe, im HTML, ohne JavaScript steht das erste)
  document.querySelectorAll('[data-konfig]').forEach((k) => {
    const produkt = k.querySelector('[data-konfig-produkt]'), preis = k.querySelector('[data-konfig-preis]');
    const gName = k.querySelector('[data-konfig-groesse-name]'), fName = k.querySelector('[data-konfig-farbe-name]'), ansage = k.querySelector('[data-konfig-ansage]');
    const lesen = () => {
      const g = k.querySelector('input[name="groesse"]:checked'), f = k.querySelector('input[name="farbe"]:checked');
      if (!g || !f) return;
      produkt.querySelectorAll('[data-farbbild]').forEach((b) => { b.hidden = b.dataset.farbbild !== f.value; });
      produkt.style.setProperty('--skala', g.dataset.skala || '1');
      preis.textContent = g.dataset.preis;
      gName.textContent = `${g.value} mm`;
      fName.textContent = f.dataset.name;
      ansage.textContent = `${f.dataset.name}, ${g.value} mm, ${g.dataset.preis.replace('€', 'Euro')}`;
    };
    k.querySelectorAll('input[type="radio"]').forEach((i) => i.addEventListener('change', lesen));
    const herz = k.querySelector('[data-herz]');
    if (herz) herz.addEventListener('click', () => herz.setAttribute('aria-pressed', String(herz.getAttribute('aria-pressed') !== 'true')));
    const merken = k.querySelector('[data-merken]'), meldung = k.querySelector('[data-formular-meldung]');
    if (merken && meldung) merken.addEventListener('click', () => { meldung.hidden = false; });
    lesen();
  });

  // 3. Teile Liste: ein Eintrag aktiv, das Produktbild wechselt den Ausschnitt (data-teil am Bild, Zoom in CSS)
  document.querySelectorAll('[data-teile]').forEach((g) => {
    const knoepfe = [...g.querySelectorAll('[data-teil-knopf]')], eintraege = [...g.querySelectorAll('[data-teil-eintrag]')];
    const bild = g.querySelector('[data-teil]'), marke = g.querySelector('[data-teil-marke]');
    const namen = { gehaeuse: 'Gehäuse', armband: 'Armband', uhr: 'Smartwatch' };
    const setze = (id) => {
      knoepfe.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.teilKnopf === id)));
      eintraege.forEach((e) => { if (e.dataset.teilEintrag === id) e.setAttribute('data-aktiv', ''); else e.removeAttribute('data-aktiv'); });
      bild.dataset.teil = id;
      if (marke) marke.textContent = `Ansicht: ${namen[id]}`;
    };
    knoepfe.forEach((b) => b.addEventListener('click', () => setze(b.dataset.teilKnopf)));
    setze('gehaeuse');
  });

  // 4. Wortband: Pause Knopf hält die Bewegung an (WCAG 2.2.2), bei reduzierter Bewegung steht das Band ohnehin still
  document.querySelectorAll('[data-band-pause]').forEach((knopf) => {
    const band = document.querySelector('[data-band]');
    if (!band) return;
    knopf.addEventListener('click', () => {
      const an = knopf.getAttribute('aria-pressed') !== 'true';
      knopf.setAttribute('aria-pressed', String(an));
      knopf.querySelector('span').textContent = an ? 'Band starten' : 'Band anhalten';
      if (an) band.setAttribute('data-pausiert', ''); else band.removeAttribute('data-pausiert');
    });
  });

  // 5. Formulare ohne Versand: zeigen nur den Hinweis, dass die Vorlage nichts sendet
  document.querySelectorAll('[data-formular]').forEach((f) => f.addEventListener('submit', (e) => {
    e.preventDefault();
    const m = f.querySelector('[data-formular-meldung]');
    if (m) m.hidden = false;
  }));
})();
