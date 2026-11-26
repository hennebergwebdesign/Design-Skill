/* stil.js der Vorlage "Wellness waldgrün": Angebotsliste wechselt das Foto, Sortiment filtert und läuft als Karussell mit hervorgehobener Mitte,
   Stimmen wechseln mit Pfeilen, die FAQ zählt gelesene Fragen, Formulare ohne Versand. Ergänzt bewegung.js, ersetzt nichts.
   Ohne JavaScript und bei reduzierter Bewegung bleibt alles sichtbar und bedienbar: das erste Foto steht, alle Produkte und Stimmen sind da. */
(() => {
  const reduziert = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const weich = reduziert ? 'auto' : 'smooth';

  // 1. Angebote: das geöffnete Akkordeon bestimmt Foto und Kartenwerte
  const liste = document.querySelector('[data-angebote]'), medium = document.querySelector('[data-angebote-medium]');
  if (liste && medium) {
    const bilder = [...medium.querySelectorAll('.angebote__bild')];
    const feld = (n) => medium.querySelector(n);
    liste.addEventListener('toggle', (e) => {
      const d = e.target;
      if (!d.matches('details.angebot') || !d.open) return;
      bilder.forEach((b) => b.classList.toggle('ist-aktiv', b.dataset.bild === d.dataset.bild));
      feld('[data-angebot-preis]').textContent = d.dataset.preis;
      feld('[data-angebot-dauer]').textContent = d.dataset.dauer;
      feld('[data-angebot-platz]').textContent = d.dataset.platz;
    }, true);
    bilder[0].classList.add('ist-aktiv');
  }

  // 2. Sortiment: Filter und Karussell, die Mitte ist hervorgehoben
  const gruppe = document.querySelector('[data-karussell]');
  if (gruppe) {
    const spur = gruppe.querySelector('[data-karussell-spur]'), steuerung = gruppe.querySelector('[data-karussell-steuerung]');
    const nrEl = gruppe.querySelector('[data-karussell-nr]'), gesamtEl = gruppe.querySelector('[data-karussell-gesamt]');
    const zurueck = gruppe.querySelector('[data-karussell-knopf="zurueck"]'), weiter = gruppe.querySelector('[data-karussell-knopf="weiter"]');
    const leiste = document.querySelector('[data-filterleiste]');
    const sichtbar = () => [...spur.querySelectorAll('.produkt')].filter((p) => !p.hidden);
    let t = false;
    const mitteFinden = () => {
      t = false;
      const m = spur.getBoundingClientRect(), mx = m.left + m.width / 2, liste2 = sichtbar();
      let best = null, abstand = Infinity;
      liste2.forEach((p) => { const r = p.getBoundingClientRect(), d = Math.abs(r.left + r.width / 2 - mx); if (d < abstand) { abstand = d; best = p; } });
      spur.querySelectorAll('.produkt').forEach((p) => p.classList.toggle('ist-mitte', p === best));
      const i = liste2.indexOf(best);
      nrEl.textContent = String(i + 1);
      gesamtEl.textContent = String(liste2.length);
      zurueck.setAttribute('aria-disabled', String(i <= 0));
      weiter.setAttribute('aria-disabled', String(i >= liste2.length - 1));
      return i;
    };
    const zu = (i, art) => { const l = sichtbar(), p = l[Math.max(0, Math.min(l.length - 1, i))]; if (p) spur.scrollTo({ left: p.offsetLeft + p.offsetWidth / 2 - spur.clientWidth / 2, behavior: art || weich }); };
    steuerung.hidden = false;
    spur.addEventListener('scroll', () => { if (!t) { t = true; requestAnimationFrame(mitteFinden); } }, { passive: true });
    addEventListener('resize', mitteFinden);
    zurueck.addEventListener('click', () => zu(mitteFinden() - 1));
    weiter.addEventListener('click', () => zu(mitteFinden() + 1));
    spur.addEventListener('keydown', (e) => { if (e.key === 'ArrowRight') { e.preventDefault(); zu(mitteFinden() + 1); } if (e.key === 'ArrowLeft') { e.preventDefault(); zu(mitteFinden() - 1); } });
    if (leiste) {
      leiste.hidden = false;
      const knoepfe = [...leiste.querySelectorAll('[data-filter]')];
      knoepfe.forEach((k) => k.addEventListener('click', () => {
        knoepfe.forEach((x) => x.setAttribute('aria-pressed', String(x === k)));
        spur.querySelectorAll('.produkt').forEach((p) => { p.hidden = k.dataset.filter !== 'alle' && p.dataset.kategorie !== k.dataset.filter; });
        spur.scrollLeft = 0;
        mitteFinden();
        zu(sichtbar().length > 1 ? 1 : 0, 'auto');
      }));
    }
    // Start: zweites Produkt in der Mitte, damit die Hervorhebung beidseitig Nachbarn hat
    requestAnimationFrame(() => { zu(1, 'auto'); mitteFinden(); });
  }

  // 3. Stimmen: eine Karte sichtbar, Pfeile wechseln
  const st = document.querySelector('[data-stimmen]');
  if (st) {
    const karten = [...st.querySelectorAll('.stimme')], steuerung = st.querySelector('[data-stimmen-steuerung]'), zaehler = st.querySelector('[data-stimmen-zaehler]');
    let i = 0;
    const zeige = (n, neu) => {
      i = (n + karten.length) % karten.length;
      karten.forEach((k, j) => { k.hidden = j !== i; k.classList.remove('ist-neu'); });
      if (neu) { void karten[i].offsetWidth; karten[i].classList.add('ist-neu'); }
      st.querySelector('[data-stimmen-nr]').textContent = String(i + 1);
    };
    st.querySelector('[data-stimmen-gesamt]').textContent = String(karten.length);
    steuerung.hidden = false; zaehler.hidden = false;
    st.querySelector('[data-stimmen-knopf="zurueck"]').addEventListener('click', () => zeige(i - 1, true));
    st.querySelector('[data-stimmen-knopf="weiter"]').addEventListener('click', () => zeige(i + 1, true));
    zeige(0, false);
  }

  // 4. FAQ: Statusanzeige zählt die Fragen, die mindestens einmal geöffnet wurden
  const fragen = document.querySelector('[data-fragen]'), status = document.querySelector('[data-status]');
  if (fragen && status) {
    const alle = [...fragen.querySelectorAll('details')], gelesen = new Set();
    status.hidden = false;
    status.querySelector('[data-status-gesamt]').textContent = String(alle.length);
    fragen.addEventListener('toggle', (e) => {
      if (e.target.open) gelesen.add(e.target);
      status.querySelector('[data-status-nr]').textContent = String(gelesen.size);
      status.querySelector('[data-status-balken]').style.setProperty('--p', (gelesen.size / alle.length).toFixed(3));
    }, true);
  }

  // 5. Formulare ohne Versand: zeigen nur den Hinweis, dass die Vorlage nichts sendet
  document.querySelectorAll('[data-formular]').forEach((f) => f.addEventListener('submit', (e) => {
    e.preventDefault();
    const m = f.querySelector('[data-formular-meldung]');
    if (m) m.hidden = false;
  }));
})();
