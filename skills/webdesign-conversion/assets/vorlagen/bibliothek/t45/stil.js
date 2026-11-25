/* stil.js der Vorlage "Automatisierung dunkel": Stimmen wechseln, Preisschalter, Formularhinweis.
   Ergänzt bewegung.js, ersetzt nichts. Ohne JavaScript und bei reduzierter Bewegung bleibt alles sichtbar und bedienbar:
   ohne JavaScript stehen die drei Stimmen untereinander, der Preis zeigt den Monatswert. */
(() => {
  // 1. Stimmen: Pfeile wechseln die Karte, vor und zurück ohne Ende
  document.querySelectorAll('[data-zitate]').forEach((gruppe) => {
    const karten = [...gruppe.querySelectorAll('[data-zitat]')], zurueck = gruppe.querySelector('[data-zurueck]'), weiter = gruppe.querySelector('[data-weiter]');
    if (karten.length < 2 || !zurueck || !weiter) return;
    let i = 0;
    const zeige = (n) => { i = (n + karten.length) % karten.length; karten.forEach((k, j) => { k.hidden = j !== i; }); };
    zeige(0);
    zurueck.addEventListener('click', () => zeige(i - 1));
    weiter.addEventListener('click', () => zeige(i + 1));
  });

  // 2. Preise: Jahresschalter tauscht den angezeigten Betrag
  document.querySelectorAll('[data-preise]').forEach((karte) => {
    const schalter = karte.querySelector('[data-jahr]'), preis = karte.querySelector('[data-preis]');
    if (!schalter || !preis) return;
    schalter.addEventListener('change', () => { preis.textContent = (schalter.checked ? preis.dataset.jahrWert : preis.dataset.monat) + ' €'; });
  });

  // 3. Formulare ohne Versand: zeigen nur den Hinweis
  document.querySelectorAll('[data-formular]').forEach((f) => f.addEventListener('submit', (e) => {
    e.preventDefault();
    const m = f.querySelector('[data-formular-meldung]');
    if (m) m.hidden = false;
  }));
})();
