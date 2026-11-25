/* stil.js der Vorlage "Restaurant Magazin": Reiter für die Karte, Umschalter für Stimmen, Hinweis am Filmplatzhalter.
   Ergänzt bewegung.js, ersetzt nichts. Ohne JavaScript stehen alle Tafeln und Stimmen untereinander, alles bleibt lesbar. */
(() => {
  // 1. Karte mit Reitern: Reiterleiste entsteht aus den Namen der Tafeln, Pfeiltasten wechseln
  const tafeln = [...document.querySelectorAll('[data-tafel]')];
  if (tafeln.length) {
    const leiste = document.createElement('div');
    leiste.className = 'reiter';
    leiste.setAttribute('role', 'tablist');
    leiste.setAttribute('aria-label', 'Kategorien der Karte');
    const knoepfe = tafeln.map((t, i) => {
      const b = document.createElement('button');
      b.type = 'button'; b.setAttribute('role', 'tab');
      b.id = 'reiter-' + i; b.setAttribute('aria-controls', t.id);
      b.textContent = t.querySelector('.tafel__name').textContent;
      t.setAttribute('role', 'tabpanel'); t.setAttribute('aria-labelledby', b.id);
      b.addEventListener('click', () => zeige(i, false));
      b.addEventListener('keydown', (e) => {
        const n = e.key === 'ArrowRight' ? i + 1 : e.key === 'ArrowLeft' ? i - 1 : null;
        if (n === null) return; e.preventDefault(); zeige((n + tafeln.length) % tafeln.length, true);
      });
      leiste.appendChild(b); return b;
    });
    const zeige = (n, fokus) => {
      tafeln.forEach((t, i) => { t.hidden = i !== n; knoepfe[i].setAttribute('aria-selected', String(i === n)); knoepfe[i].tabIndex = i === n ? 0 : -1; });
      if (fokus) knoepfe[n].focus();
    };
    tafeln[0].parentElement.insertBefore(leiste, tafeln[0]);
    zeige(0, false);
  }

  // 2. Stimmen: Rundbilder schalten das Zitat um
  const stimmen = [...document.querySelectorAll('[data-stimme]')], punkte = [...document.querySelectorAll('[data-stimme-knopf]')];
  if (stimmen.length && punkte.length) {
    const setze = (n) => {
      stimmen.forEach((s, i) => { s.hidden = i !== n; s.classList.toggle('aktiv', i === n); });
      punkte.forEach((p, i) => p.setAttribute('aria-pressed', String(i === n)));
    };
    punkte.forEach((p, i) => p.addEventListener('click', () => setze(i)));
    setze(0);
  }

  // 3. Filmplatzhalter: der Knopf zeigt nur einen Hinweis, es läuft kein Film
  document.querySelectorAll('[data-film]').forEach((b) => b.addEventListener('click', () => {
    const h = document.getElementById(b.getAttribute('aria-describedby'));
    if (h) h.hidden = !h.hidden;
  }));
})();
