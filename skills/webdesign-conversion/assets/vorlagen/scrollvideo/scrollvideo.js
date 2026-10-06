// Lädt die Bibliothek erst, wenn der Abschnitt in die Nähe des Sichtbereichs kommt.
// Bei reduzierter Bewegung bleibt das Poster stehen. Importpfad und Optionen vor dem Einbau in der README der Bibliothek prüfen.
const abschnitt = document.querySelector('[data-scrollvideo]');
const reduziert = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (abschnitt && !reduziert) {
  const beobachter = new IntersectionObserver(async ([eintrag]) => {
    if (!eintrag.isIntersecting) return;
    beobachter.disconnect();

    const { default: ScrollyVideo } = await import('scrolly-video');
    abschnitt.querySelector('.scrollvideo__poster')?.setAttribute('hidden', '');

    new ScrollyVideo({
      scrollyVideoContainer: abschnitt,
      src: abschnitt.dataset.src,
    });
  }, { rootMargin: '300px 0px' });

  beobachter.observe(abschnitt);
}
