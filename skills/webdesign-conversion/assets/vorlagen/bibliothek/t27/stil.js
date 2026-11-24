/* stil.js der Vorlage Lehrpfad: Kopfzeile blendet aus und ein, Überschrift im Held läuft Wort für Wort ein, Bildfeld wächst beim Scrollen,
   Stimmen klappen auf, Beispielformular, Jahr. Ohne JavaScript bleibt alles sichtbar. Bei reduzierter Bewegung bleibt alles ruhend. */
(() => {
  const reduziert = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const klemme = (x) => Math.min(1, Math.max(0, x));

  // Jahr im Fuß
  document.querySelectorAll('[data-jahr]').forEach((e) => { e.textContent = new Date().getFullYear(); });

  // Held: Überschrift Wort für Wort (Text bleibt ein lesbarer Satz)
  if (!reduziert) {
    document.querySelectorAll('[data-wortrein]').forEach((el) => {
      const teile = el.textContent.trim().split(/\s+/);
      el.textContent = '';
      teile.forEach((w, i) => {
        const s = document.createElement('span');
        s.className = 'hw'; s.style.setProperty('--i', i); s.textContent = w;
        el.append(s); if (i < teile.length - 1) el.append(' ');
      });
    });
  }

  const kopf = document.getElementById('kopf');
  const feld = document.querySelector('[data-panel]');
  let letzt = scrollY, tick = false;
  const messen = () => {
    tick = false;
    const h = innerHeight, y = scrollY;
    // Kopfzeile: nach unten weg, nach oben zurück (Menü offen oder Fokus drin: bleibt)
    if (kopf && !reduziert) {
      const offen = kopf.querySelector('[data-menue]')?.getAttribute('aria-expanded') === 'true';
      const hinein = kopf.contains(document.activeElement) && document.activeElement !== document.body;
      if (y < 120 || y < letzt - 4 || offen || hinein) kopf.classList.remove('kopf--weg');
      else if (y > letzt + 4) kopf.classList.add('kopf--weg');
    }
    letzt = y;
    // Held: Bildfeld wächst auf volle Breite, je näher es an den oberen Rand kommt
    if (feld && !reduziert) {
      const r = feld.getBoundingClientRect();
      feld.style.setProperty('--z', klemme((h - r.top) / (h * 0.85)).toFixed(3));
    }
  };
  addEventListener('scroll', () => { if (!tick) { tick = true; requestAnimationFrame(messen); } }, { passive: true });
  addEventListener('resize', messen);
  messen();

  // Stimmen: gekürzt mit Verlauf, Knopf klappt auf (ohne JavaScript steht alles offen)
  document.querySelectorAll('[data-klappe]').forEach((raster) => {
    const knopf = document.querySelector('[data-klappe-knopf][aria-controls="' + raster.id + '"]');
    if (!knopf) return;
    knopf.hidden = false;
    knopf.addEventListener('click', () => {
      const offen = raster.classList.toggle('offen');
      knopf.setAttribute('aria-expanded', String(offen));
      knopf.textContent = offen ? 'Weniger anzeigen' : 'Mehr anzeigen';
    });
  });

  // Beispielformular: sendet nichts
  document.querySelectorAll('[data-beispielform]').forEach((f) => {
    f.addEventListener('submit', (e) => {
      e.preventDefault();
      const s = f.querySelector('.fuss__status');
      if (s) s.textContent = 'Danke, das Beispielformular sendet nichts. Beim Kunden an einen echten Versand anschließen.';
    });
  });
})();
