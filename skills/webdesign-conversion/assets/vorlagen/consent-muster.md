# Consent: Referenzimplementierung

Ein Banner, das nichts blockiert, ist wertlos: die Daten sind bereits geflossen, bevor
jemand klickt. Dieses Muster blockiert echt.

Rechtliche Anforderungen: siehe `../../references/07-recht-dsgvo.md`.

## Kategorien

Vier Kategorien reichen für die meisten Unternehmensseiten. Mehr Kategorien heißen mehr
Entscheidungen für den Besucher, nicht mehr Rechtssicherheit.

| ID | Titel | Text |
|---|---|---|
| *(notwendig)* | Notwendig | Immer aktiv, nicht abwählbar. Sicherheit, Lastverteilung, Speicherung der Einwilligung selbst. Erscheint als Information, nicht als Schalter. |
| `funktional` | Funktional und Präferenzen | Speichert Einstellungen, damit sie beim nächsten Besuch erhalten bleiben. |
| `statistik` | Statistik | Hilft uns zu verstehen, wie die Seite genutzt wird. Die Auswertung erfolgt zusammengefasst. |
| `marketing` | Marketing | Ermöglicht die Messung von Werbekampagnen und die Anzeige passender Werbung. |
| `medien` | Externe Medien | Lädt Videos von [[Anbieter]]. Dabei werden Daten an [[Anbieter]] übertragen. |

**Das Banner wird nur gerendert, wenn es wirklich etwas zu entscheiden gibt.** Läuft kein
einwilligungspflichtiger Dienst, erscheint kein Banner, und im Footer kein Link
„Cookie-Einstellungen". Ein Banner ohne blockierten Dienst ist reine Belästigung.

## Markup: geparkte Skripte und Einbettungen

```html
<!-- Skript: type="text/plain" macht es zu Text, der Browser führt nichts aus.
     Die echte Quelle steht in data-src. -->
<script type="text/plain"
        data-consent="statistik"
        data-src="https://www.googletagmanager.com/gtm.js?id=GTM-XXXXXXX"></script>

<!-- Einbettung: kein src, die Quelle steht in data-consent-src. -->
<div data-medien>
  <div data-medien-platzhalter>
    <p>Dieses Video wird von [[Anbieter]] geladen. Dabei werden Daten übertragen.</p>
    <button type="button" data-medien-laden>Video laden</button>
  </div>
  <iframe data-consent="medien"
          data-consent-src="https://www.youtube-nocookie.com/embed/XXXX"
          title="[[FEHLT: aussagekräftiger Titel]]"
          hidden></iframe>
</div>
```

## Logik

```ts
export type Kategorie = 'funktional' | 'statistik' | 'marketing' | 'medien';

const SCHLUESSEL   = 'marke-consent';
const VERSION      = 1;          // hochzählen, wenn sich Dienste ändern → erneut fragen
const GUELTIG_TAGE = 180;

type Zustand = {
  version: number;
  zeit: string;
  kategorien: Record<Kategorie, boolean>;
};

export function lesen(): Zustand | null {
  try {
    const roh = localStorage.getItem(SCHLUESSEL);
    if (!roh) return null;
    const zustand = JSON.parse(roh) as Zustand;
    // Andere Version = andere Dienste = neue Entscheidung nötig
    if (zustand.version !== VERSION) return null;
    const alter = (Date.now() - new Date(zustand.zeit).getTime()) / 86_400_000;
    if (alter > GUELTIG_TAGE) return null;
    return zustand;
  } catch {
    return null;            // privater Modus, gesperrter Speicher
  }
}

export function speichern(kategorien: Record<Kategorie, boolean>) {
  const zustand: Zustand = { version: VERSION, zeit: new Date().toISOString(), kategorien };
  try { localStorage.setItem(SCHLUESSEL, JSON.stringify(zustand)); } catch { /* egal */ }
  anwenden(kategorien);
  window.dispatchEvent(new CustomEvent('consent:geaendert', { detail: kategorien }));
}

/** Ersetzt geparkte Platzhalter durch echte Elemente. Nur für erlaubte Kategorien. */
export function anwenden(kategorien: Record<Kategorie, boolean>) {
  for (const [id, erlaubt] of Object.entries(kategorien)) {
    if (!erlaubt) continue;

    document
      .querySelectorAll<HTMLScriptElement>(`script[type="text/plain"][data-consent="${id}"]`)
      .forEach((alt) => {
        const neu = document.createElement('script');
        for (const attr of Array.from(alt.attributes)) {
          if (attr.name === 'type' || attr.name === 'data-src') continue;
          neu.setAttribute(attr.name, attr.value);
        }
        const quelle = alt.getAttribute('data-src');
        if (quelle) neu.src = quelle;
        else neu.textContent = alt.textContent;
        alt.replaceWith(neu);       // erst jetzt wird es ausgeführt
      });

    document
      .querySelectorAll<HTMLIFrameElement>(`iframe[data-consent="${id}"][data-consent-src]`)
      .forEach((rahmen) => {
        rahmen.src = rahmen.getAttribute('data-consent-src')!;
        rahmen.removeAttribute('data-consent-src');
        rahmen.removeAttribute('hidden');
        rahmen.closest('[data-medien]')
              ?.querySelector<HTMLElement>('[data-medien-platzhalter]')
              ?.setAttribute('hidden', '');
      });
  }
  consentModeAktualisieren(kategorien);
}

/** Google Consent Mode: update nach der Entscheidung. Der default steht im Head. */
function consentModeAktualisieren(k: Record<Kategorie, boolean>) {
  const w = window as unknown as { dataLayer?: unknown[] };
  if (!w.dataLayer) return;
  w.dataLayer.push(['consent', 'update', {
    analytics_storage:       k.statistik ? 'granted' : 'denied',
    ad_storage:              k.marketing ? 'granted' : 'denied',
    ad_user_data:            k.marketing ? 'granted' : 'denied',
    ad_personalization:      k.marketing ? 'granted' : 'denied',
    functionality_storage:   k.funktional ? 'granted' : 'denied',
    personalization_storage: k.funktional ? 'granted' : 'denied',
  }]);
}
```

Beim Laden der Seite: `const z = lesen(); if (z) anwenden(z.kategorien); else bannerZeigen();`

## Anforderungen an die Oberfläche

- **„Alle ablehnen" ist gleichrangig zu „Alle akzeptieren":** gleiche Ebene, vergleichbare
  Gestaltung, vergleichbare Größe. Ein grauer Textlink neben einem bunten Button ist es nicht.
- **Keine Vorauswahl.** Alle Schalter außer „Notwendig" stehen auf aus.
- **Drei Wege:** Alle akzeptieren / Nur notwendige / Einstellungen (granular).
- **Tastaturbedienbar:** Fokusfalle im Banner, Escape schließt nicht ohne Entscheidung,
  Fokus kehrt danach an die auslösende Stelle zurück.
- **Kein Dark Pattern:** keine Cookie-Wall, kein verstecktes Schließkreuz, kein
  „Einstellungen" hinter drei Ebenen.
- **Widerruf immer erreichbar** über einen Footer-Link „Cookie-Einstellungen", der das
  Banner mit dem aktuellen Stand erneut öffnet.

## Prüfung, die zählt

1. Browserdaten löschen, Netzwerk-Tab öffnen, Seite laden.
2. **Ohne Entscheidung dürfen null Anfragen an den Drittanbieter gehen.** Nach Domain
   filtern (`googletagmanager.com`, `youtube.com`, …): die Liste muss leer sein.
3. „Alle akzeptieren" klicken. Jetzt erscheinen die Anfragen.
4. Seite neu laden: Entscheidung wird erinnert, das Banner bleibt weg.
5. Über den Footer-Link widerrufen, neu laden: Anfragen wieder weg.

Ein Screenshot des leeren Netzwerk-Tabs in Schritt 2 ist der einzige belastbare Nachweis.
