/* stil.js der Vorlage "Fallstudie als Kennzahlen Erzählung": Zugübersicht, Verlaufstafel, Team, Bandpause, Formular ohne Versand.
   Ergänzt bewegung.js, ersetzt nichts. Ohne JavaScript steht alles im Endzustand und bleibt lesbar. */
(() => {
  const io = (cb, opt) => ('IntersectionObserver' in window ? new IntersectionObserver(cb, opt) : null);

  // 1. Züge: der Eintrag in Bildschirmmitte schaltet Nummer, Name, Knoten und Striche der klebenden Übersicht um
  document.querySelectorAll('[data-zug-bereich]').forEach((bereich) => {
    const eintraege = [...bereich.querySelectorAll('.zug__eintrag')];
    const nr = bereich.querySelector('[data-zug-nr]'), name = bereich.querySelector('[data-zug-name]');
    const knoten = [...bereich.querySelectorAll('[data-knoten]')], striche = [...bereich.querySelectorAll('[data-strich]')];
    const setze = (n) => {
      if (nr) nr.textContent = String(n).padStart(2, '0');
      const e = eintraege[n - 1];
      if (name && e) name.textContent = e.dataset.name;
      knoten.forEach((k) => k.classList.toggle('is-an', Number(k.dataset.knoten) === n));
      striche.forEach((s) => s.classList.toggle('is-an', Number(s.dataset.strich) === n));
    };
    const o = io((liste) => liste.forEach((x) => { if (x.isIntersecting) setze(Number(x.target.dataset.zug)); }), { rootMargin: '-45% 0px -45% 0px' });
    if (o) eintraege.forEach((e) => o.observe(e));
  });

  // 2. Verlauf: die Phase in Bildschirmmitte setzt Woche, Umsatz, Meilenstein und die Aufdeckung des Diagramms (--rest)
  document.querySelectorAll('[data-verlauf]').forEach((bereich) => {
    const phasen = [...bereich.querySelectorAll('.verl__phase')];
    const woche = bereich.querySelector('[data-verl-woche]'), umsatz = bereich.querySelector('[data-verl-umsatz]');
    const meilen = [...bereich.querySelectorAll('[data-meile]')], chart = bereich.querySelector('[data-verl-chart]');
    const setze = (p) => {
      const i = Number(p.dataset.phase);
      if (woche) woche.textContent = p.dataset.woche;
      if (umsatz) umsatz.textContent = p.dataset.umsatz;
      if (chart) chart.style.setProperty('--rest', p.dataset.rest);
      phasen.forEach((x) => x.classList.toggle('is-an', x === p));
      meilen.forEach((m) => { const k = Number(m.dataset.meile); m.classList.toggle('is-an', k === i); m.classList.toggle('ist-erreicht', k < i); });
    };
    // reduzierte Bewegung: Endzustand, die Tafel folgt nicht dem Scrollen
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) { if (phasen.length) setze(phasen[phasen.length - 1]); return; }
    if (phasen.length) setze(phasen[0]);
    const o = io((liste) => liste.forEach((x) => { if (x.isIntersecting) setze(x.target); }), { rootMargin: '-45% 0px -45% 0px' });
    if (o) phasen.forEach((p) => o.observe(p));
  });

  // 3. Team: Zeile wählen schaltet Name, Rolle und Zähler am Film um
  document.querySelectorAll('[data-team]').forEach((t) => {
    const zeilen = [...t.querySelectorAll('[data-person]')];
    const nr = t.querySelector('[data-team-nr]'), name = t.querySelector('[data-team-name]'), rolle = t.querySelector('[data-team-rolle]'), flaeche = t.querySelector('[data-team-flaeche]');
    zeilen.forEach((z) => z.addEventListener('click', () => {
      const i = Number(z.dataset.person);
      zeilen.forEach((x) => x.setAttribute('aria-pressed', String(x === z)));
      if (nr) nr.textContent = String(i + 1).padStart(2, '0');
      if (name) name.textContent = z.dataset.name;
      if (rolle) rolle.textContent = z.dataset.rolle;
      if (flaeche) flaeche.dataset.teamFlaeche = String(i % 2);
    }));
  });

  // 4. Kennzahlenband: Knopf hält es an (WCAG 2.2.2), Zustand steht im Knopf
  document.querySelectorAll('[data-zb-pause]').forEach((b) => b.addEventListener('click', () => {
    const an = b.getAttribute('aria-pressed') !== 'true';
    b.setAttribute('aria-pressed', String(an));
    b.closest('.zb').classList.toggle('is-pause', an);
    const text = b.querySelector('span');
    if (text) text.textContent = an ? 'Band abspielen' : 'Band anhalten';
    const u = b.querySelector('use');
    if (u) u.setAttribute('href', an ? '#i-play' : '#i-pause');
  }));

  // 5. Formulare ohne Versand: zeigen nur den Hinweis, dass die Vorlage nichts sendet
  document.querySelectorAll('[data-formular]').forEach((f) => f.addEventListener('submit', (e) => {
    e.preventDefault();
    const m = f.querySelector('[data-formular-meldung]');
    if (m) m.hidden = false;
  }));
})();
