/* stil.js der Vorlage "Teamseite": Aufstieg der Karten beim Scrollen, Zeitleiste mit wachsender Linie, Formularmeldung, Jahr.
   Ergänzt bewegung.js, ersetzt nichts. Regeln: ohne dieses Skript und bei reduzierter Bewegung steht alles sichtbar da. */
(() => {
  const jahr = document.querySelector('[data-jahr]');
  if (jahr) jahr.textContent = String(new Date().getFullYear());

  // Beispielformular: kein Versand, nur eine Rückmeldung
  const form = document.querySelector('form.formular');
  if (form) form.addEventListener('submit', (e) => {
    e.preventDefault();
    const status = form.querySelector('[data-status]');
    if (status) status.textContent = 'Beispiel: Hier würde die Anfrage gesendet. In dieser Vorlage geschieht nichts.';
  });

  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const root = document.documentElement;
  const klemme = (x) => Math.min(1, Math.max(0, x));

  // 1. Aufstieg: [data-anheben] setzt --rise (0 bis 1) aus der eigenen Lage im Bildschirm, je Element --weg als Strecke
  const hoch = [...document.querySelectorAll('[data-anheben]')];
  // 2. Zeitleiste: Linie füllt sich bis 55 Prozent der Bildschirmhöhe, erreichte Punkte werden voll lesbar
  const liste = document.querySelector('.weg__liste');
  const punkte = liste ? [...liste.querySelectorAll('.weg__punkt')] : [];
  if (liste) liste.classList.add('weg--live');
  root.classList.add('live');

  let warte = false;
  const messen = () => {
    warte = false;
    const h = innerHeight;
    hoch.forEach((el) => { const r = el.getBoundingClientRect(); el.style.setProperty('--rise', klemme((h * 0.95 - r.top) / (h * 0.4)).toFixed(3)); });
    if (liste) {
      const r = liste.getBoundingClientRect(), marke = h * 0.55;
      liste.style.setProperty('--fuell', klemme((marke - r.top) / Math.max(1, r.height)).toFixed(4));
      punkte.forEach((p) => { const d = p.querySelector('.weg__dot').getBoundingClientRect(); p.classList.toggle('erreicht', d.top + d.height / 2 <= marke); });
    }
  };
  const planen = () => { if (!warte) { warte = true; requestAnimationFrame(messen); } };
  addEventListener('scroll', planen, { passive: true });
  addEventListener('resize', planen);
  messen();
})();
