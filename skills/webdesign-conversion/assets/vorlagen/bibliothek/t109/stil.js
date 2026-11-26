/* stil.js der Vorlage "Zahlung per Bank, Salbei und Tinte": Zeigerneigung der Bühne im Held, Wechsel der Oberfläche in der
   Schnittstellen-Bühne, Formular ohne Versand. Ergänzt bewegung.js, ersetzt nichts. Ohne JavaScript und bei reduzierter Bewegung
   bleibt alles sichtbar: die Bühne steht still, die drei Oberflächen stehen untereinander. */
(() => {
  const reduziert = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 1. Zeigerneigung: die gekippte Szene im Held folgt der Maus um höchstens 6 Grad (nur transform, nur mit Maus)
  const buehne = document.querySelector('[data-buehne]');
  if (buehne && !reduziert && matchMedia('(hover:hover) and (pointer:fine)').matches) {
    const held = buehne.closest('.held') || buehne;
    held.addEventListener('pointermove', (e) => {
      const r = buehne.getBoundingClientRect();
      const x = Math.max(-1, Math.min(1, (e.clientX - (r.left + r.width / 2)) / (innerWidth / 2)));
      const y = Math.max(-1, Math.min(1, (e.clientY - (r.top + r.height / 2)) / (innerHeight / 2)));
      buehne.style.setProperty('--kx', (x * 6).toFixed(2));
      buehne.style.setProperty('--ky', (y * -5).toFixed(2));
    });
    held.addEventListener('pointerleave', () => { buehne.style.setProperty('--kx', '0'); buehne.style.setProperty('--ky', '0'); });
  }

  // 2. Schnittstellen-Bühne: die Sektion ist hoch, die Tafel bleibt stehen, der Scrollweg wählt Schritt 0, 1 oder 2.
  //    Nur ohne reduzierte Bewegung. Sonst stehen alle drei Oberflächen untereinander und sind lesbar.
  const stufen = document.querySelector('[data-stufen]');
  if (stufen && !reduziert) {
    stufen.classList.add('stufen--bewegt');
    stufen.dataset.schritt = '0';
    let w = false;
    const messen = () => {
      w = false;
      const r = stufen.getBoundingClientRect(), weg = Math.max(1, r.height - innerHeight);
      const p = Math.min(0.999, Math.max(0, -r.top / weg));
      const s = String(Math.min(2, Math.floor(p * 3)));
      if (stufen.dataset.schritt !== s) stufen.dataset.schritt = s;
    };
    addEventListener('scroll', () => { if (!w) { w = true; requestAnimationFrame(messen); } }, { passive: true });
    addEventListener('resize', messen);
    messen();
  }

  // 3. Formulare ohne Versand: zeigen nur den Hinweis, dass die Vorlage nichts sendet
  document.querySelectorAll('[data-formular]').forEach((f) => f.addEventListener('submit', (e) => {
    e.preventDefault();
    const m = f.querySelector('[data-formular-meldung]');
    if (m) m.hidden = false;
  }));
})();
