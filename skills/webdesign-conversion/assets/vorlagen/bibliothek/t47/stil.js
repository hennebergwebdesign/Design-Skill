/* stil.js der Vorlage "Startseite blau" (alle drei Varianten): Zähler bis zum Start, Pausenknopf für das treibende Licht,
   Preisschalter, Formularhinweis. Ergänzt bewegung.js, ersetzt nichts. Ohne JavaScript stehen alle Werte als Beispiel im HTML,
   das Licht steht still (die Bewegung gibt es nur mit JavaScript, damit sie sich anhalten lässt). */
(() => {
  // 1. Zähler bis zum Starttermin (Beispieldatum im Attribut data-countdown, im Projekt ersetzen)
  document.querySelectorAll('[data-countdown]').forEach((z) => {
    const ziel = new Date(z.dataset.countdown).getTime();
    if (Number.isNaN(ziel)) return;
    const f = { tage: z.querySelector('[data-t="tage"]'), std: z.querySelector('[data-t="std"]'), min: z.querySelector('[data-t="min"]'), sek: z.querySelector('[data-t="sek"]') };
    const zwei = (n) => String(n).padStart(2, '0');
    const lauf = () => {
      let rest = Math.max(0, Math.floor((ziel - Date.now()) / 1000));
      const t = Math.floor(rest / 86400); rest -= t * 86400;
      const s = Math.floor(rest / 3600); rest -= s * 3600;
      const m = Math.floor(rest / 60), sek = rest - m * 60;
      f.tage.textContent = String(t); f.std.textContent = zwei(s); f.min.textContent = zwei(m); f.sek.textContent = zwei(sek);
    };
    lauf();
    setInterval(lauf, 1000);
  });

  // 2. Pausenknopf: hält das treibende Licht im Hintergrund an (WCAG 2.2.2), der Zustand bleibt am Knopf sichtbar
  document.querySelectorAll('[data-pause]').forEach((knopf) => {
    const bereich = knopf.closest('section, main') || document.body;
    const text = knopf.querySelector('.sr-nur');
    knopf.addEventListener('click', () => {
      const an = knopf.getAttribute('aria-pressed') !== 'true';
      knopf.setAttribute('aria-pressed', String(an));
      bereich.classList.toggle('steht', an);
      if (text) text.textContent = an ? 'Hintergrundbewegung fortsetzen' : 'Hintergrundbewegung anhalten';
    });
  });

  // 3. Preise: Jahresschalter tauscht Beträge, auch durchgestrichene Vergleichspreise
  const schalter = document.querySelector('[data-jahr]');
  if (schalter) {
    const felder = [...document.querySelectorAll('[data-preis],[data-alt]')];
    schalter.addEventListener('change', () => felder.forEach((p) => {
      const w = schalter.checked ? p.dataset.jahrWert : p.dataset.monat;
      p.textContent = w + ' €';
    }));
  }

  // 4. Formulare ohne Versand: zeigen nur den Hinweis
  document.querySelectorAll('[data-formular]').forEach((f) => f.addEventListener('submit', (e) => {
    e.preventDefault();
    const m = f.querySelector('[data-formular-meldung]');
    if (m) m.hidden = false;
  }));
})();
