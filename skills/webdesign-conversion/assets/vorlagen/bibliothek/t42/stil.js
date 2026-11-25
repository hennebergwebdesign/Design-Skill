/* stil.js der Vorlage "Finanz App, drei Varianten": Kleinigkeiten, die bewegung.js nicht abdeckt. Ergänzt, ersetzt nichts.
   Ohne JavaScript und bei reduzierter Bewegung bleibt alles sichtbar und bedienbar. */
(() => {
  const reduziert = matchMedia('(prefers-reduced-motion: reduce)').matches;
  void reduziert;
})();
