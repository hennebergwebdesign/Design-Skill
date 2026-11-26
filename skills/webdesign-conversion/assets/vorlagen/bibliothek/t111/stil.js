/* stil.js der Vorlage "Produktleuchte im Tagesverlauf": Tagesbühne (Foto, Uhrzeit, Lichtfarbe je Stufe im Blickfeld),
   Reglerkarte, Formulare ohne Versand. Ergänzt bewegung.js, ersetzt nichts. Ohne JavaScript bleiben alle Stufen untereinander lesbar. */
(() => {
  // 1. Tagesbühne: die Stufe in der Bildschirmmitte schaltet Foto, Ziffern und Farbpunkt um
  const tag = document.querySelector('[data-tag]');
  if (tag && 'IntersectionObserver' in window) {
    const stufen = [...tag.querySelectorAll('.tag__stufe')];
    const teile = [...tag.querySelectorAll('.tag__buehne [data-stufe]')];
    const setze = (n) => {
      stufen.forEach((s) => s.classList.toggle('is-an', s.dataset.stufe === n));
      teile.forEach((t) => t.classList.toggle('is-an', t.dataset.stufe === n));
    };
    const io = new IntersectionObserver((eintraege) => eintraege.forEach((e) => { if (e.isIntersecting) setze(e.target.dataset.stufe); }), { rootMargin: '-45% 0px -45% 0px' });
    stufen.forEach((s) => io.observe(s));
  }

  // 2. Reglerkarte: Schieber und Knöpfe stellen Zeit, Farbe und Größe des Lichtpunkts ein
  const STUFEN = [
    { zeit: '07:30', text: 'Kühl und hell, Beispielwert 5000 K' },
    { zeit: '12:00', text: 'Klar, Beispielwert 4000 K' },
    { zeit: '18:00', text: 'Warm, Beispielwert 3000 K' },
    { zeit: '22:00', text: 'Gedimmt, Beispielwert 2200 K' }
  ];
  document.querySelectorAll('[data-regler]').forEach((karte) => {
    const eingabe = karte.querySelector('[data-regler-eingabe]'), zeit = karte.querySelector('[data-regler-zeit]'), wert = karte.querySelector('[data-regler-wert]');
    const knoepfe = [...karte.querySelectorAll('[data-regler-wahl]')];
    const setze = (n) => {
      karte.dataset.stufe = String(n);
      zeit.textContent = STUFEN[n].zeit;
      wert.textContent = STUFEN[n].text;
      eingabe.value = String(n);
      eingabe.setAttribute('aria-valuetext', STUFEN[n].zeit + ', ' + STUFEN[n].text);
      knoepfe.forEach((k) => k.setAttribute('aria-pressed', String(Number(k.dataset.reglerWahl) === n)));
    };
    eingabe.addEventListener('input', () => setze(Number(eingabe.value)));
    knoepfe.forEach((k) => k.addEventListener('click', () => setze(Number(k.dataset.reglerWahl))));
    setze(Number(eingabe.value));
  });

  // 3. Formulare ohne Versand: zeigen nur den Hinweis, dass die Vorlage nichts sendet
  document.querySelectorAll('[data-formular]').forEach((f) => f.addEventListener('submit', (e) => {
    e.preventDefault();
    const m = f.querySelector('[data-formular-meldung]');
    if (m) m.hidden = false;
  }));
})();
