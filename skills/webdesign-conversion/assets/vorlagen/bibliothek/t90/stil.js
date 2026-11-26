/* stil.js der Vorlage "Leuchtenshop warm": Reiter und Chips filtern die Produktkarten, Lichtspiel und Film anhalten,
   Warenkorb und Anmeldung ohne Funktion, Formular ohne Versand. Ergänzt bewegung.js, ersetzt nichts.
   Ohne JavaScript bleiben alle Produkte sichtbar, die Filterleisten erscheinen erst mit JavaScript. */
(() => {
  const liste = document.querySelector('[data-produkte]');
  const karten = liste ? [...liste.querySelectorAll('.pk')] : [];

  // 1. Filter: Kollektion (Reiter) und Art der Leuchte (Chips) wirken zusammen
  const zustand = { linie: 'alle', typ: '' };
  const reiter = document.querySelector('[data-reiter]'), chips = document.querySelector('[data-chips]');
  const stand = document.querySelector('[data-stand]'), leer = document.querySelector('[data-leer]');
  const filtern = () => {
    let n = 0;
    karten.forEach((k) => {
      const ok = (zustand.linie === 'alle' || k.dataset.linie === zustand.linie) && (!zustand.typ || k.dataset.typ === zustand.typ);
      k.hidden = !ok; if (ok) n += 1;
    });
    if (stand) { stand.hidden = false; stand.textContent = n + ' von ' + karten.length + ' Leuchten'; }
    if (leer) leer.hidden = n !== 0;
  };
  if (reiter && karten.length) {
    reiter.hidden = false;
    const knoepfe = [...reiter.querySelectorAll('button')];
    knoepfe.forEach((b) => b.addEventListener('click', () => { zustand.linie = b.dataset.linie; knoepfe.forEach((x) => x.setAttribute('aria-pressed', String(x === b))); filtern(); }));
  }
  if (chips && karten.length) {
    chips.hidden = false;
    const knoepfe = [...chips.querySelectorAll('button')];
    knoepfe.forEach((b) => b.addEventListener('click', () => {
      zustand.typ = zustand.typ === b.dataset.typ ? '' : b.dataset.typ;
      knoepfe.forEach((x) => x.setAttribute('aria-pressed', String(x.dataset.typ === zustand.typ)));
      filtern();
    }));
  }
  const zurueck = document.querySelector('[data-zuruecksetzen]');
  if (zurueck) zurueck.addEventListener('click', () => {
    zustand.linie = 'alle'; zustand.typ = '';
    document.querySelectorAll('[data-reiter] button').forEach((x) => x.setAttribute('aria-pressed', String(x.dataset.linie === 'alle')));
    document.querySelectorAll('[data-chips] button').forEach((x) => x.setAttribute('aria-pressed', 'false'));
    filtern();
  });

  // 2. Lichtspiel im Held anhalten (WCAG 2.2.2): pausiert Schein, schwebende Karte und Film
  const pause = document.querySelector('[data-pause]');
  if (pause) pause.addEventListener('click', () => {
    const an = pause.getAttribute('aria-pressed') !== 'true';
    pause.setAttribute('aria-pressed', String(an));
    document.documentElement.classList.toggle('still', an);
    pause.querySelector('span').textContent = an ? 'Lichtspiel abspielen' : 'Lichtspiel anhalten';
  });

  // 3. Film Platzhalter: Pause Knopf hält die langsame Kamerafahrt über dem Poster an
  document.querySelectorAll('[data-video]').forEach((v) => {
    const k = v.querySelector('[data-video-knopf]'); if (!k) return;
    k.addEventListener('click', () => {
      const steht = k.getAttribute('aria-pressed') !== 'true';
      k.setAttribute('aria-pressed', String(steht));
      k.setAttribute('aria-label', steht ? 'Filmbewegung abspielen' : 'Filmbewegung anhalten');
      v.toggleAttribute('data-steht', steht);
      k.querySelector('[data-ikone="pause"]').hidden = steht;
      k.querySelector('[data-ikone="play"]').hidden = !steht;
    });
  });

  // 4. Warenkorb und Anmeldung: ohne Funktion, sagen das offen
  document.querySelectorAll('[data-warenkorb]').forEach((b) => b.addEventListener('click', () => {
    const t = b.textContent; b.textContent = 'Beispiel, ohne Warenkorb';
    setTimeout(() => { b.textContent = t; }, 2200);
  }));
  const anm = document.querySelector('[data-anmelden]');
  if (anm) anm.addEventListener('click', () => { const m = document.querySelector('[data-anmelden-meldung]'); if (m) m.hidden = false; });

  // 5. Formular ohne Versand
  document.querySelectorAll('[data-formular]').forEach((f) => f.addEventListener('submit', (e) => {
    e.preventDefault();
    const m = f.querySelector('[data-formular-meldung]'); if (m) m.hidden = false;
  }));

  // 6. Jahr im Fuß
  document.querySelectorAll('[data-jahr]').forEach((j) => { j.textContent = new Date().getFullYear(); });
})();
