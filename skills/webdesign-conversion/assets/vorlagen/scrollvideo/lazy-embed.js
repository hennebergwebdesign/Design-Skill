// Drittanbieter Einbettung (zum Beispiel 3D Viewer) erst laden, wenn sie in die Nähe des Sichtbereichs kommt.
// Markup: <div class="einbettung" data-embed-src="https://…" style="aspect-ratio: 16 / 9"><img src="poster.webp" alt="…"></div>
// Datenschutz: Einbettungen, die Daten laden, gehören hinter die Consent Logik (consent-und-dienste.md).
const reduziert = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

document.querySelectorAll('[data-embed-src]').forEach((box) => {
  if (reduziert) return; // Poster bleibt stehen

  const beobachter = new IntersectionObserver(([eintrag]) => {
    if (!eintrag.isIntersecting) return;
    beobachter.disconnect();

    const rahmen = document.createElement('iframe');
    rahmen.src = box.dataset.embedSrc;
    rahmen.loading = 'lazy';
    rahmen.title = box.dataset.embedTitle || 'Interaktive Darstellung';
    rahmen.style.cssText = 'width:100%;height:100%;border:0';
    box.replaceChildren(rahmen);
  }, { rootMargin: '200px 0px' });

  beobachter.observe(box);
});
