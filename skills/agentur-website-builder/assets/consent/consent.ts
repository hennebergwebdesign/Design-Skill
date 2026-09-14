/**
 * Consent Manager, Eigenbau fuer Agenturprojekte.
 * Kopieren nach src/scripts/consent.ts und an das Projekt anpassen.
 *
 * Blockierung:
 *   <script type="text/plain" data-consent="statistik" data-src="/js/analytics.js"></script>
 *   <iframe data-consent="medien" data-consent-src="https://..." ></iframe>
 *
 * Wichtig: Wenn ein Projekt nur notwendige Technik nutzt, dieses Modul nicht einbinden
 * und kein Banner anzeigen.
 *
 * Grenze: anwenden() laeuft nur vorwaerts. Ein bereits geladenes Skript laesst sich nicht
 * nachtraeglich aus der laufenden Seite entfernen. Wird eine Kategorie zurueckgenommen,
 * laedt der Aufrufer die Seite neu, siehe speichern().
 */

export type Kategorie = 'funktional' | 'statistik' | 'marketing' | 'medien';

export const KATEGORIEN: { id: Kategorie; titel: string; text: string }[] = [
  { id: 'funktional', titel: 'Funktional und Präferenzen', text: 'Speichert Einstellungen wie Sprache oder Auswahl, damit sie beim nächsten Besuch erhalten bleiben.' },
  { id: 'statistik', titel: 'Statistik', text: 'Hilft uns zu verstehen, wie die Seite genutzt wird. Die Auswertung erfolgt zusammengefasst.' },
  { id: 'marketing', titel: 'Marketing', text: 'Ermöglicht die Messung von Werbekampagnen und die Anzeige passender Werbung.' },
  { id: 'medien', titel: 'Externe Medien', text: 'Lädt Inhalte von Drittanbietern, etwa Karten, Videos oder Buchungssysteme.' },
];

const SCHLUESSEL = 'consent'; // pro Projekt eindeutig benennen
const VERSION = 1;            // erhöhen, sobald sich die Liste der Dienste ändert
const GUELTIG_TAGE = 180;

type Zustand = { version: number; zeit: string; kategorien: Record<Kategorie, boolean> };

const leer = (): Record<Kategorie, boolean> => ({ funktional: false, statistik: false, marketing: false, medien: false });

export function lesen(): Zustand | null {
  try {
    const roh = localStorage.getItem(SCHLUESSEL);
    if (!roh) return null;
    const zustand = JSON.parse(roh) as Zustand;
    if (zustand.version !== VERSION) return null;
    const alter = (Date.now() - new Date(zustand.zeit).getTime()) / 86400000;
    if (alter > GUELTIG_TAGE) return null;
    return zustand;
  } catch {
    return null;
  }
}

export function speichern(kategorien: Record<Kategorie, boolean>) {
  const vorher = lesen()?.kategorien ?? leer();
  const zustand: Zustand = { version: VERSION, zeit: new Date().toISOString(), kategorien };
  localStorage.setItem(SCHLUESSEL, JSON.stringify(zustand));
  anwenden(kategorien);
  window.dispatchEvent(new CustomEvent('consent:geaendert', { detail: kategorien }));

  // Zuruecknahme: ein geladenes Skript verschwindet nicht von selbst, also neu laden.
  const zurueckgenommen = (Object.keys(kategorien) as Kategorie[]).some((id) => vorher[id] && !kategorien[id]);
  if (zurueckgenommen) location.reload();
}

/** Wandelt blockierte Skripte und Einbettungen in echte um. Laeuft nur vorwaerts. */
export function anwenden(kategorien: Record<Kategorie, boolean>) {
  for (const [id, erlaubt] of Object.entries(kategorien)) {
    if (!erlaubt) continue;

    document.querySelectorAll<HTMLScriptElement>(`script[type="text/plain"][data-consent="${id}"]`).forEach((alt) => {
      const neu = document.createElement('script');
      for (const attr of Array.from(alt.attributes)) {
        if (attr.name === 'type' || attr.name === 'data-src') continue;
        neu.setAttribute(attr.name, attr.value);
      }
      const quelle = alt.getAttribute('data-src');
      if (quelle) neu.src = quelle;
      else neu.textContent = alt.textContent;
      alt.replaceWith(neu);
    });

    document.querySelectorAll<HTMLIFrameElement>(`iframe[data-consent="${id}"][data-consent-src]`).forEach((rahmen) => {
      rahmen.src = rahmen.getAttribute('data-consent-src')!;
      rahmen.removeAttribute('data-consent-src');
      rahmen.closest('[data-consent-platzhalter]')?.removeAttribute('hidden');
    });
  }

  aktualisiereConsentMode(kategorien);
}

/** Google Consent Mode, Basic. Vorab wird alles verweigert, siehe Kopfbereich des Layouts. */
function aktualisiereConsentMode(kategorien: Record<Kategorie, boolean>) {
  const w = window as unknown as { dataLayer?: unknown[] };
  if (!w.dataLayer) return;
  w.dataLayer.push([
    'consent',
    'update',
    {
      analytics_storage: kategorien.statistik ? 'granted' : 'denied',
      ad_storage: kategorien.marketing ? 'granted' : 'denied',
      ad_user_data: kategorien.marketing ? 'granted' : 'denied',
      ad_personalization: kategorien.marketing ? 'granted' : 'denied',
      functionality_storage: kategorien.funktional ? 'granted' : 'denied',
      personalization_storage: kategorien.funktional ? 'granted' : 'denied',
    },
  ]);
}

export function alleAnnehmen() {
  speichern({ funktional: true, statistik: true, marketing: true, medien: true });
}

export function alleAblehnen() {
  speichern(leer());
}

/** Beim Laden aufrufen. Gibt zurueck, ob das Banner gezeigt werden muss. */
export function init(): boolean {
  const zustand = lesen();
  if (zustand) {
    anwenden(zustand.kategorien);
    return false;
  }
  return true;
}
