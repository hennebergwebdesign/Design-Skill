/* stil.js der Vorlage "Nachunternehmerprüfung im Bau": Funktionsbühne (fünf Funktionen nacheinander im Gerät), Siegel dreht mit dem Scrollen,
   Formular ohne Versand. Ergänzt bewegung.js, ersetzt nichts. Ohne JavaScript und bei reduzierter Bewegung steht alles untereinander und lesbar. */
(() => {
  const reduziert = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 1. Funktionsbühne: nur auf breiten Schirmen und ohne reduzierte Bewegung. Der Scrollweg im Abschnitt wählt die Funktion.
  const funk = document.querySelector('[data-funk]');
  if (funk) {
    const breit = matchMedia('(min-width: 64rem)');
    const eintraege = [...funk.querySelectorAll('.funk__eintrag')];
    const screens = [...funk.querySelectorAll('.funk__screen')];
    const punkte = [...funk.querySelectorAll('.funk__punkte li')];
    const setze = (n) => [eintraege, screens, punkte].forEach((liste) => liste.forEach((e, i) => e.classList.toggle('is-an', i === n)));
    let warte = false;
    const lauf = () => {
      warte = false;
      const r = funk.getBoundingClientRect();
      const p = Math.min(0.9999, Math.max(0, -r.top / Math.max(1, r.height - innerHeight)));
      setze(Math.floor(p * eintraege.length));
    };
    const pruefe = () => {
      if (breit.matches && !reduziert) { funk.dataset.buehne = ''; lauf(); }
      else { delete funk.dataset.buehne; eintraege.forEach((e) => e.classList.remove('is-an')); screens.forEach((e) => e.classList.remove('is-an')); }
    };
    addEventListener('scroll', () => { if (funk.dataset.buehne !== undefined && !warte) { warte = true; requestAnimationFrame(lauf); } }, { passive: true });
    breit.addEventListener('change', pruefe);
    pruefe();
  }

  // 2. Siegel dreht langsam mit dem Scrollweg (nur transform)
  if (!reduziert) {
    const siegel = [...document.querySelectorAll('[data-drehen]')];
    let w2 = false;
    const dreh = () => { w2 = false; siegel.forEach((s) => { const r = s.getBoundingClientRect(); s.style.transform = `rotate(${((r.top / innerHeight) * -120).toFixed(1)}deg)`; }); };
    if (siegel.length) { addEventListener('scroll', () => { if (!w2) { w2 = true; requestAnimationFrame(dreh); } }, { passive: true }); dreh(); }
  }

  // 3. Formulare ohne Versand: zeigen nur den Hinweis, dass die Vorlage nichts sendet
  document.querySelectorAll('[data-formular]').forEach((f) => f.addEventListener('submit', (e) => {
    e.preventDefault();
    const m = f.querySelector('[data-formular-meldung]');
    if (m) m.hidden = false;
  }));
})();
