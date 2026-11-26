/* stil.js der Vorlage "Tennisclub Waldgrün": Fotowechsel im Held, Wiedergabeknöpfe als Platzhalter, Schalter, Tarifwahl,
   Trainerwahl, Wortliste der Stimmen, Wischspur mit Pfeilen, Formulare ohne Versand. Ergänzt bewegung.js, ersetzt nichts.
   Ohne JavaScript bleibt alles sichtbar: Foto 01 steht, alle Zitate stehen untereinander, Tarife führen zum Formular. */
(() => {
  const reduziert = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 1. Held: Punkte 01 bis 03 wechseln das Foto, Pfeiltasten springen weiter
  const punkte = document.querySelector('[data-held-punkte]');
  const folien = [...document.querySelectorAll('[data-slide]')];
  const name = document.querySelector('[data-held-name]');
  if (punkte && folien.length) {
    punkte.hidden = false;
    const titel = ['Platz und Spiel', 'Training im Grünen', 'Gemeinschaft'];
    const knoepfe = [...punkte.querySelectorAll('button')];
    const zeige = (i) => {
      folien.forEach((f, n) => f.classList.toggle('aktiv', n === i));
      knoepfe.forEach((k, n) => k.setAttribute('aria-pressed', String(n === i)));
      const bild = folien[i].querySelector('img');
      if (bild && bild.loading === 'lazy') bild.loading = 'eager';
      if (name) name.textContent = String(i + 1).padStart(2, '0') + ' ' + titel[i];
    };
    knoepfe.forEach((k, i) => {
      k.addEventListener('click', () => zeige(i));
      k.addEventListener('keydown', (e) => {
        const r = e.key === 'ArrowDown' || e.key === 'ArrowRight' ? 1 : e.key === 'ArrowUp' || e.key === 'ArrowLeft' ? -1 : 0;
        if (!r) return;
        e.preventDefault();
        const n = (i + r + knoepfe.length) % knoepfe.length;
        zeige(n); knoepfe[n].focus();
      });
    });
    folien.forEach((f) => { const b = f.querySelector('img'); if (b && !f.classList.contains('aktiv')) b.loading = 'eager'; });
  }

  // 2. Wiedergabeknöpfe: Platzhalter ohne Video, schalten nur Symbol und Beschriftung (Pause nach WCAG 2.2.2 vorgesehen)
  document.querySelectorAll('[data-video]').forEach((k) => {
    const label = k.getAttribute('aria-label') || '';
    k.addEventListener('click', () => {
      const an = k.getAttribute('aria-pressed') !== 'true';
      k.setAttribute('aria-pressed', String(an));
      k.setAttribute('aria-label', an ? label.replace('abspielen', 'pausieren') : label);
    });
  });

  // 3. Schalter in der grünen Karte
  document.querySelectorAll('[data-schalter]').forEach((k) => {
    const text = document.querySelector('[data-schalter-text]');
    const an = 'Neue und erfahrene Spieler sind willkommen, das Probetraining ist für alle.';
    const aus = 'Heute nur Mitglieder und Ligaspiel: Gäste bitte vorher anfragen.';
    k.addEventListener('click', () => {
      const neu = k.getAttribute('aria-pressed') !== 'true';
      k.setAttribute('aria-pressed', String(neu));
      k.querySelector('.schalter__name').textContent = neu ? 'Offen für alle Niveaus' : 'Heute nur für Mitglieder';
      if (text) text.textContent = neu ? an : aus;
    });
  });

  // 4. Tarifwahl: Zeilen schalten die Hauptkarte um, ohne JavaScript führen sie zum Formular
  const buehne = document.querySelector('[data-buehne]');
  const zeilen = [...document.querySelectorAll('[data-tarif]')];
  if (buehne && zeilen.length) {
    const nm = buehne.querySelector('[data-t-name]'), pr = buehne.querySelector('[data-t-preis]'), tx = buehne.querySelector('[data-t-text]'), li = buehne.querySelector('[data-t-liste]'), lb = buehne.querySelector('.stage__label');
    const waehle = (z) => {
      zeilen.forEach((x) => { x.classList.toggle('gewaehlt', x === z); x.setAttribute('aria-pressed', String(x === z)); });
      nm.textContent = z.dataset.name; pr.textContent = z.dataset.preis; tx.textContent = z.dataset.text;
      li.innerHTML = '';
      z.dataset.features.split('|').forEach((f) => { const e = document.createElement('li'); e.textContent = f; li.appendChild(e); });
      lb.textContent = z.dataset.tarif === 'pro' ? 'Beliebteste Wahl' : 'Gewählter Tarif';
      buehne.classList.remove('wechsel'); void buehne.offsetWidth; if (!reduziert) buehne.classList.add('wechsel');
    };
    zeilen.forEach((z) => {
      z.setAttribute('role', 'button'); z.setAttribute('aria-pressed', String(z.classList.contains('gewaehlt')));
      z.addEventListener('click', (e) => { e.preventDefault(); waehle(z); });
      z.addEventListener('keydown', (e) => { if (e.key === ' ') { e.preventDefault(); waehle(z); } });
    });
  }

  // 5. Trainerwahl: Chips tauschen Foto, Name und Schwerpunkt im Laptop
  const chips = document.querySelector('[data-trainer-wahl]');
  if (chips) {
    chips.hidden = false;
    const bilder = [...document.querySelectorAll('[data-trainer-bild]')], tn = document.querySelector('[data-trainer-name]'), tf = document.querySelector('[data-trainer-fokus]');
    const knoepfe = [...chips.querySelectorAll('button')];
    knoepfe.forEach((k) => k.addEventListener('click', () => {
      knoepfe.forEach((x) => x.setAttribute('aria-pressed', String(x === k)));
      bilder.forEach((b) => { b.hidden = b.dataset.trainerBild !== k.dataset.i; });
      if (tn) tn.textContent = k.dataset.name;
      if (tf) tf.textContent = k.dataset.fokus;
    }));
  }

  // 6. Stimmen: das Wort im Fokus (Überfahren, Fokus, Klick) wechselt das Zitat
  const worte = document.querySelector('[data-stimmen-worte]');
  if (worte) {
    worte.hidden = false;
    const zitate = [...document.querySelectorAll('[data-zitat]')], knoepfe = [...worte.querySelectorAll('button')];
    const zeige = (i) => {
      knoepfe.forEach((k, n) => k.setAttribute('aria-pressed', String(n === i)));
      zitate.forEach((z, n) => z.classList.toggle('aktiv', n === i));
    };
    zeige(0);
    knoepfe.forEach((k, i) => {
      k.addEventListener('pointerenter', () => zeige(i));
      k.addEventListener('focus', () => zeige(i));
      k.addEventListener('click', () => zeige(i));
    });
  }

  // 7. Wischspur der Angebote mit Pfeilknöpfen
  document.querySelectorAll('[data-reiter-gruppe]').forEach((gruppe) => {
    const spur = gruppe.querySelector('[data-reiter-spur]'), steuerung = gruppe.querySelector('[data-reiter-steuerung]');
    if (!spur || !steuerung) return;
    const zurueck = steuerung.querySelector('[data-reiter="zurueck"]'), weiter = steuerung.querySelector('[data-reiter="weiter"]');
    const stand = () => {
      steuerung.hidden = spur.scrollWidth - spur.clientWidth <= 4;
      zurueck.setAttribute('aria-disabled', String(spur.scrollLeft < 4));
      weiter.setAttribute('aria-disabled', String(spur.scrollLeft > spur.scrollWidth - spur.clientWidth - 4));
    };
    const schritt = (r) => {
      const k = spur.querySelector('li'), s = (k ? k.getBoundingClientRect().width : 280) + (parseFloat(getComputedStyle(spur).columnGap) || 16);
      spur.scrollBy({ left: r * s, behavior: reduziert ? 'auto' : 'smooth' });
    };
    zurueck.addEventListener('click', () => schritt(-1));
    weiter.addEventListener('click', () => schritt(1));
    spur.addEventListener('scroll', stand, { passive: true });
    addEventListener('resize', stand);
    stand();
  });

  // 8. Formulare ohne Versand: zeigen nur den Hinweis, dass die Vorlage nichts sendet
  document.querySelectorAll('[data-formular]').forEach((f) => f.addEventListener('submit', (e) => {
    e.preventDefault();
    const m = f.querySelector('[data-formular-meldung]');
    if (m) m.hidden = false;
  }));
})();
