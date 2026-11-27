/* stil.js der Vorlage "Fahrzeugwahl mit Technikbühne": Fahrzeugwahl mit Akkuregler, Kartenband mit Mittelkarte, Zählwerk der Technikbühne,
   Formular ohne Versand. Ergänzt bewegung.js, ersetzt nichts. Ohne JavaScript stehen alle Fahrzeuge untereinander, das Band ist seitlich scrollbar
   und das Zählwerk zeigt seinen Endwert. */
(() => {
  const reduziert = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const rahmen = (fn) => { let wartet = false; return () => { if (wartet) return; wartet = true; requestAnimationFrame(() => { wartet = false; fn(); }); }; };

  // 1. Fahrzeugwahl: Fahrzeug, Akkupaket und Farbe stellen Freisteller, Reichweite und Balken ein
  document.querySelectorAll('[data-wahl]').forEach((geraet) => {
    const fahrzeuge = [...geraet.querySelectorAll('[data-fz]')];
    const regler = geraet.querySelector('[data-wahl-regler]'), steuer = geraet.querySelector('[data-wahl-steuer]');
    if (!fahrzeuge.length || !regler || !steuer) return;
    const eingabe = regler.querySelector('[data-wahl-eingabe]'), ausgabe = regler.querySelector('[data-wahl-km]');
    const tempo = regler.querySelector('[data-wahl-tempo]'), preis = regler.querySelector('[data-wahl-preis]');
    const segmente = [...regler.querySelectorAll('[data-wahl-balken] i')];
    const wahlKnoepfe = [...steuer.querySelectorAll('[data-wahl-fz]')], farbKnoepfe = [...steuer.querySelectorAll('[data-wahl-farbe]')];
    const GRENZE = 150;
    const aktiv = () => fahrzeuge.find((f) => f.classList.contains('ist-an')) || fahrzeuge[0];
    const werte = () => {
      const f = aktiv(), n = Number(eingabe.value), km = Number(f.dataset.km.split(' ')[n - 1]);
      ausgabe.textContent = km + ' km';
      eingabe.setAttribute('aria-valuetext', km + ' Kilometer mit ' + n + (n === 1 ? ' Akku' : ' Akkus') + ', Beispielwert');
      tempo.textContent = f.dataset.tempo; preis.textContent = f.dataset.preis;
      const an = Math.round(km / GRENZE * segmente.length);
      segmente.forEach((s, i) => s.classList.toggle('an', i < an));
    };
    const zeige = (id) => {
      fahrzeuge.forEach((f) => f.classList.toggle('ist-an', f.dataset.fz === id));
      wahlKnoepfe.forEach((k) => k.setAttribute('aria-pressed', String(k.dataset.wahlFz === id)));
      werte();
    };
    const farbe = (name) => {
      geraet.dataset.farbe = name;
      farbKnoepfe.forEach((k) => k.setAttribute('aria-pressed', String(k.dataset.wahlFarbe === name)));
    };
    regler.hidden = false; steuer.hidden = false; geraet.classList.add('ist-aktiv');
    eingabe.addEventListener('input', werte);
    wahlKnoepfe.forEach((k) => k.addEventListener('click', () => zeige(k.dataset.wahlFz)));
    farbKnoepfe.forEach((k) => k.addEventListener('click', () => farbe(k.dataset.wahlFarbe)));
    zeige(aktiv().dataset.fz); farbe('gruen');
  });

  // 2. Kartenband: die Karte in der Mitte ist hervorgehoben, Pfeile und Tastatur schalten weiter
  document.querySelectorAll('[data-karten]').forEach((spur) => {
    const karten = [...spur.children];
    const pfeile = spur.parentElement.querySelector('.karten__pfeile');
    const mitteX = (k) => k.offsetLeft + k.offsetWidth / 2;
    const finde = () => { const c = spur.scrollLeft + spur.clientWidth / 2; return karten.reduce((b, k) => (Math.abs(mitteX(k) - c) < Math.abs(mitteX(b) - c) ? k : b), karten[0]); };
    const markiere = () => { const m = finde(); karten.forEach((k) => k.classList.toggle('ist-mitte', k === m)); };
    const gehe = (k, weich) => spur.scrollTo({ left: mitteX(k) - spur.clientWidth / 2, behavior: weich && !reduziert ? 'smooth' : 'auto' });
    const schritt = (d) => { const i = karten.indexOf(finde()); gehe(karten[Math.min(karten.length - 1, Math.max(0, i + d))], true); };
    spur.addEventListener('scroll', rahmen(markiere), { passive: true });
    addEventListener('resize', rahmen(markiere));
    const start = karten.find((k) => k.classList.contains('ist-mitte')) || karten[0];
    gehe(start, false); markiere();
    if (pfeile) {
      pfeile.hidden = false;
      pfeile.querySelector('[data-karten-zurueck]').addEventListener('click', () => schritt(-1));
      pfeile.querySelector('[data-karten-weiter]').addEventListener('click', () => schritt(1));
    }
  });

  // 3. Zählwerk: Tachozahl, Nadel und Skala laufen mit dem Scrollweg der Bühne von 0 auf den Endwert (nicht gepinnt)
  const buehne = document.querySelector('[data-zaehlwerk]');
  if (buehne && !reduziert) {
    const wert = buehne.querySelector('[data-zaehlwert]'), nadel = buehne.querySelector('.technik__nadel');
    const ticks = [...buehne.querySelectorAll('.tz-ticks line')];
    const ENDE = 45, MAX = 60, SPANNE = 240;
    const messen = () => {
      const r = buehne.getBoundingClientRect(), h = innerHeight;
      const p = Math.min(1, Math.max(0, (h * 0.85 - r.top) / (r.height * 0.8 + h * 0.1)));
      const winkel = -SPANNE / 2 + SPANNE * (ENDE / MAX) * p;
      wert.textContent = String(Math.round(ENDE * p));
      nadel.style.setProperty('--winkel', winkel.toFixed(1) + 'deg');
      ticks.forEach((t) => t.classList.toggle('an', Number(t.dataset.w) <= winkel + 0.5));
    };
    addEventListener('scroll', rahmen(messen), { passive: true });
    addEventListener('resize', rahmen(messen));
    messen();
  }

  // 4. Formulare ohne Versand: zeigen nur den Hinweis, dass die Vorlage nichts sendet
  document.querySelectorAll('[data-formular]').forEach((f) => f.addEventListener('submit', (e) => {
    e.preventDefault();
    const m = f.querySelector('[data-formular-meldung]');
    if (m) m.hidden = false;
  }));
})();
