/* stil.js der Vorlage "Ökosystem aus Geräten und App": Profilwechsel, waagerechte Spuren mit Pfeilen, Formulare ohne Versand.
   Ergänzt bewegung.js, ersetzt nichts. Ohne JavaScript stehen alle Profile untereinander, die Spuren bleiben mit Tastatur und Wischen bedienbar. */
(() => {
  const reduziert = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 1. Profilwechsel: ein Profil sichtbar, die Knöpfe schalten um (aria-pressed)
  document.querySelectorAll('[data-profil]').forEach((box) => {
    const tafeln = [...box.querySelectorAll('[data-profil-tafel]')];
    const knoepfe = [...box.querySelectorAll('[data-profil-wahl]')];
    if (!tafeln.length || !knoepfe.length) return;
    const setze = (n) => {
      tafeln.forEach((t) => { t.hidden = t.dataset.profilTafel !== String(n); });
      knoepfe.forEach((k) => k.setAttribute('aria-pressed', String(k.dataset.profilWahl === String(n))));
    };
    knoepfe.forEach((k) => k.addEventListener('click', () => setze(k.dataset.profilWahl)));
    setze(0);
  });

  // 2. Waagerechte Spuren: Pfeile scrollen um eine Karte, Pfeile sind ohne JavaScript ausgeblendet
  document.querySelectorAll('[data-spur]').forEach((spur) => {
    const feld = spur.parentElement;
    const schritt = () => { const k = spur.firstElementChild; return k ? k.getBoundingClientRect().width + 16 : 300; };
    const gehe = (r) => spur.scrollBy({ left: r * schritt(), behavior: reduziert ? 'auto' : 'smooth' });
    feld.querySelector('[data-spur-zurueck]')?.addEventListener('click', () => gehe(-1));
    feld.querySelector('[data-spur-weiter]')?.addEventListener('click', () => gehe(1));
  });

  // 3. Formulare ohne Versand: zeigen nur den Hinweis, dass die Vorlage nichts sendet
  document.querySelectorAll('[data-formular]').forEach((f) => f.addEventListener('submit', (e) => {
    e.preventDefault();
    const m = f.querySelector('[data-formular-meldung]');
    if (m) m.hidden = false;
  }));
})();
