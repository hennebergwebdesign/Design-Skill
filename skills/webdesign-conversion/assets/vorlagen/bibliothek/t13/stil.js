/* stil.js der Vorlage "Abo Dunkelstart": Reiter, Preisschalter, wachsende Karte, Beispielformulare.
   Ergänzt bewegung.js, ersetzt nichts. Regeln: Endwert steht im HTML, ohne JavaScript bleibt alles sichtbar und bedienbar. */
(() => {
  const reduziert = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 1. Reiter: scroll-snap trägt die Bewegung, Pfeile und Punkte werden nur mit JavaScript eingeblendet
  document.querySelectorAll('[data-kar]').forEach((kar) => {
    const spur = kar.querySelector('.kar__spur'), folien = [...kar.querySelectorAll('.kar__folie')], steuerung = kar.querySelector('.kar__steuerung');
    if (!spur || folien.length < 2 || !steuerung) return;
    const punkte = steuerung.querySelector('.kar__punkte');
    const knoepfe = folien.map((_, i) => {
      const b = document.createElement('button');
      b.type = 'button'; b.className = 'kar__punkt';
      b.setAttribute('aria-label', `Folie ${i + 1} von ${folien.length}`);
      b.addEventListener('click', () => gehe(i));
      punkte.appendChild(b);
      return b;
    });
    let aktuell = 0;
    const setze = (i) => { aktuell = i; knoepfe.forEach((b, k) => b.setAttribute('aria-current', String(k === i))); };
    const gehe = (i) => {
      const ziel = Math.max(0, Math.min(folien.length - 1, i));
      spur.scrollTo({ left: folien[ziel].offsetLeft - spur.offsetLeft, behavior: reduziert ? 'auto' : 'smooth' });
      setze(ziel);
    };
    steuerung.querySelector('[data-zurueck]').addEventListener('click', () => gehe(aktuell - 1));
    steuerung.querySelector('[data-weiter]').addEventListener('click', () => gehe(aktuell + 1));
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) setze(folien.indexOf(e.target)); }), { root: spur, threshold: 0.6 });
      folien.forEach((f) => io.observe(f));
    }
    spur.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') { e.preventDefault(); gehe(aktuell + 1); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); gehe(aktuell - 1); }
    });
    steuerung.hidden = false;
    setze(0);
  });

  // 2. Preisschalter: monatlich oder jährlich, Zahlen laufen auf den neuen Wert
  const zeile = document.querySelector('[data-schalter]');
  if (zeile) {
    const knopf = zeile.querySelector('.schalter'), tM = zeile.querySelector('[data-text-monat]'), tJ = zeile.querySelector('[data-text-jahr]');
    const zahlen = [...document.querySelectorAll('.preis__zahl[data-monat]')];
    const fmt = (n) => Math.round(n).toLocaleString('de-DE');
    const zeigen = (jahr) => {
      knopf.setAttribute('aria-checked', String(jahr));
      tM.classList.toggle('ist-an', !jahr); tJ.classList.toggle('ist-an', jahr);
      zahlen.forEach((el) => {
        const ziel = Number(jahr ? el.dataset.jahr : el.dataset.monat), start = Number(String(el.textContent).replace(/\./g, '')) || ziel;
        if (reduziert || start === ziel) { el.textContent = fmt(ziel); return; }
        const t0 = performance.now(), dauer = 450;
        const lauf = (t) => { const p = Math.min(1, (t - t0) / dauer), w = start + (ziel - start) * (1 - Math.pow(1 - p, 3)); el.textContent = fmt(p < 1 ? w : ziel); if (p < 1) requestAnimationFrame(lauf); };
        requestAnimationFrame(lauf);
      });
    };
    knopf.addEventListener('click', () => zeigen(knopf.getAttribute('aria-checked') !== 'true'));
    zeile.hidden = false;
    zeigen(false);
  }

  // 3. Wachsende Karte: [data-wachs] setzt --wachs von 0 bis 1, je weiter der Abschnitt ins Bild kommt. Endzustand: voll sichtbar.
  const wachs = reduziert ? [] : [...document.querySelectorAll('[data-wachs]')];
  if (wachs.length) {
    let t = false;
    const lauf = () => {
      t = false;
      const h = innerHeight;
      wachs.forEach((el) => {
        const r = el.getBoundingClientRect();
        el.style.setProperty('--wachs', Math.min(1, Math.max(0, (h * 0.9 - r.top) / (h * 0.5))).toFixed(3));
      });
    };
    addEventListener('scroll', () => { if (!t) { t = true; requestAnimationFrame(lauf); } }, { passive: true });
    addEventListener('resize', lauf);
    lauf();
  }

  // 4. Beispielformulare: nichts wird versendet, die Rückmeldung steht im Status
  document.querySelectorAll('[data-beispielformular]').forEach((f) => {
    f.addEventListener('submit', (e) => {
      e.preventDefault();
      const s = f.querySelector('.formular__status');
      if (s) s.textContent = 'Beispielformular: Es wurde nichts gesendet.';
    });
  });
})();
