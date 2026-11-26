/* stil.js der Vorlage "Sanitär hell mit Petrol": Ablauf füllt sich nacheinander, Notdienstknopf pulsiert zweimal beim Sichtbarwerden,
   Formulare ohne Versand. Ergänzt bewegung.js, ersetzt nichts. Ohne JavaScript und bei reduzierter Bewegung steht alles fertig da. */
(() => {
  const reduziert = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const beobachte = (selektor, klasse, schwelle) => {
    const liste = [...document.querySelectorAll(selektor)];
    if (!liste.length) return;
    if (reduziert || !('IntersectionObserver' in window)) { liste.forEach((e) => e.classList.add(klasse)); return; }
    const io = new IntersectionObserver((eintraege) => eintraege.forEach((e) => { if (e.isIntersecting) { e.target.classList.add(klasse); io.unobserve(e.target); } }), { threshold: schwelle });
    liste.forEach((e) => io.observe(e));
  };

  // 1. Ablauf: Kreise füllen sich nacheinander, die Linie zeichnet sich dazwischen (Reihenfolge über --i, Zeiten in stil.css)
  beobachte('[data-ablauf]', 'lauf', 0.35);

  // 2. Notdienst: der Anrufknopf pulsiert beim Sichtbarwerden zweimal (unter fünf Sekunden, WCAG 2.2.2), danach nur beim Überfahren
  beobachte('[data-notdienst]', 'sichtbar', 0.5);

  // 3. Formulare ohne Versand: zeigen nur den Hinweis, dass die Vorlage nichts sendet
  document.querySelectorAll('[data-formular]').forEach((f) => f.addEventListener('submit', (e) => {
    e.preventDefault();
    const m = f.querySelector('[data-formular-meldung]');
    if (m) m.hidden = false;
  }));
})();
