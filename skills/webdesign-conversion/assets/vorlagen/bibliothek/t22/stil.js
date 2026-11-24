/* stil.js der Vorlage "Handwerk vor Ort": Wortstart der Überschrift, Karussells, Überblendfolie, Beispielformulare.
   Ergänzt bewegung.js, ersetzt nichts. Ohne JavaScript bleibt alles sichtbar, Karussells sind dann per Wischen scrollbar. */
(() => {
  const reduziert = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 1. Held: Wörter der H1 steigen gestaffelt auf. Der Text bleibt über aria-label vollständig.
  const h1 = document.querySelector('.held h1');
  if (h1 && !reduziert && !h1.children.length) {
    const teile = h1.textContent.trim().split(/\s+/);
    h1.setAttribute('aria-label', h1.textContent.trim());
    h1.textContent = '';
    teile.forEach((w, i) => {
      const s = document.createElement('span');
      s.className = 'w';
      s.setAttribute('aria-hidden', 'true');
      s.style.setProperty('--i', i);
      s.textContent = w;
      h1.appendChild(s);
      if (i < teile.length - 1) h1.appendChild(document.createTextNode(' '));
    });
  }

  // 2. Karussell: [data-karussell] mit [data-spur], Knöpfen [data-zurueck] und [data-vor] in [data-pfeile]
  document.querySelectorAll('[data-karussell]').forEach((k) => {
    const spur = k.querySelector('[data-spur]'), zu = k.querySelector('[data-zurueck]'), vor = k.querySelector('[data-vor]'), leiste = k.querySelector('[data-pfeile]');
    if (!spur || !zu || !vor) return;
    leiste.hidden = false;
    const schritt = () => { const e = spur.children[0], zwei = spur.children[1]; return zwei ? zwei.offsetLeft - e.offsetLeft : e.offsetWidth; };
    const stand = () => { zu.disabled = spur.scrollLeft < 4; vor.disabled = spur.scrollLeft + spur.clientWidth >= spur.scrollWidth - 4; };
    const gehe = (r) => spur.scrollBy({ left: r * schritt(), behavior: reduziert ? 'auto' : 'smooth' });
    zu.addEventListener('click', () => gehe(-1));
    vor.addEventListener('click', () => gehe(1));
    spur.addEventListener('scroll', stand, { passive: true });
    addEventListener('resize', stand);
    stand();
  });

  // 3. Folien mit Überblendung: [data-folien] mit .fall, Steuerung [data-steuerung]
  document.querySelectorAll('[data-folien]').forEach((f) => {
    const folien = [...f.querySelectorAll('.fall')], st = f.querySelector('[data-steuerung]');
    if (!folien.length || !st) return;
    st.hidden = false;
    const zaehler = st.querySelector('[data-aktuell]');
    let i = 0;
    const zeige = (n) => {
      i = (n + folien.length) % folien.length;
      folien.forEach((x, j) => { x.classList.toggle('aktiv', j === i); x.setAttribute('aria-hidden', String(j !== i)); });
      zaehler.textContent = String(i + 1);
    };
    st.querySelector('[data-zurueck]').addEventListener('click', () => zeige(i - 1));
    st.querySelector('[data-vor]').addEventListener('click', () => zeige(i + 1));
    zeige(0);
  });

  // 4. Beispielformulare: es wird nichts gesendet, der Besucher sieht das
  document.querySelectorAll('[data-beispielformular]').forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const s = form.querySelector('[data-status]');
      if (s) s.textContent = 'Beispielformular: Es wurde nichts gesendet.';
    });
  });
})();
