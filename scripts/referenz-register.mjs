#!/usr/bin/env node
/*
  referenz-register.mjs — führt den Freigabezustand jeder Designreferenz eines Projekts.

  WARUM ES DIESES SKRIPT GIBT
  Die Regel „erst vorlegen, dann crawlen" ist ohne Werkzeug eine Absichtserklärung. Sobald
  eine Referenzseite interessant aussieht, wird sie abgerufen, und die Freigabe wird
  nachgereicht oder vergessen. Dieses Skript ist die einzige Stelle, die Zustände ändert.
  Alle nachgelagerten Werkzeuge (referenz-crawl.mjs, design-dna.mjs, muster-vergleich.mjs,
  muster-paket.mjs) fragen hier nach und verweigern den Dienst, wenn der Zustand nicht passt.

  Damit ist die Freigabe kein Satz in einer Referenzdatei, sondern Verhalten.

  DIE ZUSTÄNDE UND IHRE ÜBERGÄNGE

    ENTDECKT ──vorlegen──> VORGELEGT ──freigeben──> FREIGEGEBEN
                                                        │
                                          vermerken gecrawlt
                                                        ↓
                                                    GECRAWLT
                                          vermerken analysiert
                                                        ↓
                                                   ANALYSIERT
                                          vermerken verglichen
                                                        ↓
                                             OFFEN_FUER_WISSEN
                                                        │
                                       wissen global|erweitern|projekt
                                                        ↓
                                    GLOBAL | ERWEITERT | NUR_PROJEKT

    ablehnen ist aus jedem Zwischenzustand erlaubt und führt nach ABGELEHNT.
    Jeder andere Übergang wird verweigert. Insbesondere gibt es keinen Weg von ENTDECKT
    direkt nach FREIGEGEBEN: auch eine vom Kunden selbst genannte Seite wird erst vorgelegt,
    weil die Vorlage zeigt, WAS extrahiert werden soll und was ausdrücklich nicht.

  ABGELEGT WIRD IN .designrecherche/register.json
    Das ist Projektwissen. Es gehört in die .gitignore des Kundenprojekts und wandert nie in
    die globale Musterbibliothek des Skills. Siehe
    `skills/agentur-website-builder/references/designrecherche-ablauf.md`.

  AUFRUF
    node scripts/referenz-register.mjs anlegen --name "Beispiel GmbH" --url https://beispiel.de \
         --quelle land-book --fuer hero,produkt --grund "asymmetrischer Held" \
         --extraktion raster,hierarchie,cta-platzierung [--risiko "reine JS-Anwendung"]
    node scripts/referenz-register.mjs vorlegen [--id ref-01-beispiel-de | --alle]
    node scripts/referenz-register.mjs freigeben --id ref-01-beispiel-de [--sektionen hero]
         [--komponenten cta] [--notiz "nur der Held"]
    node scripts/referenz-register.mjs ablehnen --id ref-01-beispiel-de --grund "…"
    node scripts/referenz-register.mjs vermerken --id ref-01-beispiel-de --schritt gecrawlt --pfad …
    node scripts/referenz-register.mjs wissen --id ref-01-beispiel-de --entscheidung projekt
    node scripts/referenz-register.mjs status [--id ref-01-beispiel-de] [--json]

    --register <pfad>   anderer Ablageort als .designrecherche/register.json

  EXIT
    0 = erledigt · 1 = Eintrag nicht gefunden oder nichts zu tun · 2 = Aufrufproblem oder
    unzulässiger Übergang
*/

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';

// ------------------------------------------------------------------ Zustände

export const ZUSTAENDE = [
  'ENTDECKT',
  'VORGELEGT',
  'FREIGEGEBEN',
  'GECRAWLT',
  'ANALYSIERT',
  'OFFEN_FUER_WISSEN',
  'GLOBAL',
  'ERWEITERT',
  'NUR_PROJEKT',
  'ABGELEHNT',
];

export const ENDZUSTAENDE = ['GLOBAL', 'ERWEITERT', 'NUR_PROJEKT', 'ABGELEHNT'];

// Erlaubte Übergänge. Was hier nicht steht, ist verboten und wird mit Exit 2 verweigert.
export const UEBERGAENGE = {
  ENTDECKT: ['VORGELEGT', 'ABGELEHNT'],
  VORGELEGT: ['FREIGEGEBEN', 'ABGELEHNT'],
  FREIGEGEBEN: ['GECRAWLT', 'ABGELEHNT'],
  GECRAWLT: ['ANALYSIERT', 'ABGELEHNT'],
  ANALYSIERT: ['OFFEN_FUER_WISSEN', 'ABGELEHNT'],
  OFFEN_FUER_WISSEN: ['GLOBAL', 'ERWEITERT', 'NUR_PROJEKT', 'ABGELEHNT'],
  GLOBAL: [],
  ERWEITERT: [],
  NUR_PROJEKT: [],
  ABGELEHNT: [],
};

// Was aus einer Referenz grundsätzlich nicht übernommen wird. Kommt aus der Anti-Kopie-Regel
// in agentur-website-builder/references/referenzen-und-auswahl.md und steht in jedem Eintrag,
// damit es in der Vorlage an den Menschen sichtbar ist statt nur in einer Referenzdatei.
export const NIE_UEBERNOMMEN = [
  'Farbwerte',
  'Schriften',
  'Logo und Wortmarke',
  'Texte und Claims',
  'Bildmaterial und Illustrationen',
  'charakteristische Layoutkombinationen als Ganzes',
];

export const SCHRITTE = {
  gecrawlt: { von: 'FREIGEGEBEN', nach: 'GECRAWLT', feld: 'roh' },
  analysiert: { von: 'GECRAWLT', nach: 'ANALYSIERT', feld: 'dna' },
  verglichen: { von: 'ANALYSIERT', nach: 'OFFEN_FUER_WISSEN', feld: 'vergleich' },
};

export const WISSEN = {
  global: 'GLOBAL',
  erweitern: 'ERWEITERT',
  projekt: 'NUR_PROJEKT',
  ablehnen: 'ABGELEHNT',
};

// ------------------------------------------------------------------ Register

export function leeresRegister(projekt = null) {
  return { schema: 1, projekt, stand: new Date().toISOString().slice(0, 10), referenzen: [] };
}

export function registerLesen(pfad) {
  if (!existsSync(pfad)) return leeresRegister();
  try {
    const daten = JSON.parse(readFileSync(pfad, 'utf8'));
    if (!Array.isArray(daten.referenzen)) throw new Error('Feld referenzen fehlt');
    return daten;
  } catch (f) {
    throw new Error(`Register ${pfad} ist nicht lesbar: ${f.message}`);
  }
}

export function registerSchreiben(pfad, daten) {
  daten.stand = new Date().toISOString().slice(0, 10);
  mkdirSync(dirname(pfad), { recursive: true });
  writeFileSync(pfad, `${JSON.stringify(daten, null, 2)}\n`, 'utf8');
}

export function kennung(url, vorhandene = []) {
  let host = 'referenz';
  try {
    host = new URL(url.startsWith('http') ? url : `https://${url}`).hostname.replace(/^www\./, '');
  } catch {
    /* bleibt beim Ersatzwert, die Adressprüfung passiert im Aufruf */
  }
  const rumpf = host.replace(/[^a-z0-9]+/gi, '-').toLowerCase();
  const nummer = String(vorhandene.length + 1).padStart(2, '0');
  return `ref-${nummer}-${rumpf}`;
}

/**
 * Führt einen Zustandsübergang aus. Einzige Stelle im gesamten System, die `zustand` ändert.
 * Wirft bei einem nicht erlaubten Übergang, statt ihn still zu schlucken.
 */
export function uebergang(eintrag, ziel, notiz = '') {
  const erlaubt = UEBERGAENGE[eintrag.zustand] ?? [];
  if (!ZUSTAENDE.includes(ziel)) throw new Error(`Unbekannter Zustand: ${ziel}`);
  if (!erlaubt.includes(ziel)) {
    const weg = erlaubt.length ? erlaubt.join(', ') : 'keiner, das ist ein Endzustand';
    throw new Error(
      `Übergang ${eintrag.zustand} nach ${ziel} ist nicht vorgesehen. Erlaubt wäre: ${weg}.`
    );
  }
  const zeit = new Date().toISOString();
  eintrag.zustand = ziel;
  eintrag.zustand_geaendert = zeit;
  eintrag.verlauf.push({ zustand: ziel, zeit, notiz });
  return eintrag;
}

export function neuerEintrag({ id, name, url, quelle, fuer, grund, extraktion, risiken, ebene }) {
  const zeit = new Date().toISOString();
  return {
    id,
    name,
    url,
    gefunden_ueber: quelle ?? null,
    ebene: ebene ?? 'website',
    zustand: 'ENTDECKT',
    zustand_geaendert: zeit,
    relevant_fuer: fuer ?? [],
    begruendung: grund ?? '',
    geplante_extraktion: extraktion ?? [],
    ausgeschlossen: [...NIE_UEBERNOMMEN],
    risiken: risiken ?? [],
    freigabe: null,
    roh: null,
    dna: null,
    vergleich: null,
    wissen: null,
    verlauf: [{ zustand: 'ENTDECKT', zeit, notiz: '' }],
  };
}

export function finden(register, id) {
  return register.referenzen.find((r) => r.id === id) ?? null;
}

/** Vorlageformat für Tor 1. Bewusst hier und nicht in der Referenzdatei, damit es genau
 *  eine Fassung gibt und die Dokumentation sie nur beschreibt. */
export function vorlageText(eintrag, nummer) {
  const liste = (werte, leer) => (werte?.length ? werte.join(', ') : leer);
  return [
    `REFERENZ ${String(nummer).padStart(2, '0')}`,
    `Website: ${eintrag.name}`,
    `URL: ${eintrag.url}`,
    `Gefunden über: ${eintrag.gefunden_ueber ?? 'direkt genannt'}`,
    `Ebene: ${eintrag.ebene}`,
    '',
    `Vorgeschlagen für: ${liste(eintrag.relevant_fuer, '[[FEHLT: Sektion]]')}`,
    `Begründung: ${eintrag.begruendung || '[[FEHLT: warum genau diese Seite]]'}`,
    '',
    `Vorgeschlagene Extraktion: ${liste(eintrag.geplante_extraktion, '[[FEHLT: was extrahiert werden soll]]')}`,
    `Ausdrücklich nicht: ${liste(eintrag.ausgeschlossen, '')}`,
    '',
    `Risiken und Grenzen: ${liste(eintrag.risiken, 'keine benannt')}`,
    '',
    'Freigabe: ganze Website, einzelne Sektionen, einzelne Komponenten, ablehnen oder',
    'Alternativen anfordern.',
  ].join('\n');
}

// -------------------------------------------------------------------- Aufruf

const istHauptprogramm =
  process.argv[1] && import.meta.url === `file://${process.argv[1]}`;

if (istHauptprogramm) {
  const args = process.argv.slice(2);
  const befehl = args.find((a) => !a.startsWith('--'));
  const wert = (name, standard = null) => {
    const i = args.indexOf(name);
    return i >= 0 && args[i + 1] && !args[i + 1].startsWith('--') ? args[i + 1] : standard;
  };
  const dabei = (name) => args.includes(name);
  const liste = (name) => {
    const v = wert(name);
    return v ? v.split(',').map((s) => s.trim()).filter(Boolean) : [];
  };

  const PFAD = wert('--register', join('.designrecherche', 'register.json'));

  const raus = (text, code) => {
    (code ? console.error : console.log)(text);
    process.exit(code);
  };

  if (!befehl) {
    raus(
      'Aufruf: node scripts/referenz-register.mjs <anlegen|vorlegen|freigeben|ablehnen|vermerken|wissen|status> [...]',
      2
    );
  }

  let register;
  try {
    register = registerLesen(PFAD);
  } catch (f) {
    raus(f.message, 2);
  }

  const holen = () => {
    const id = wert('--id');
    if (!id) raus('--id fehlt.', 2);
    const e = finden(register, id);
    if (!e) raus(`Kein Eintrag mit der Kennung ${id} im Register ${PFAD}.`, 1);
    return e;
  };

  const sichern = () => registerSchreiben(PFAD, register);

  try {
    switch (befehl) {
      case 'anlegen': {
        const url = wert('--url');
        const name = wert('--name');
        if (!url || !name) raus('anlegen braucht --name und --url.', 2);
        try {
          new URL(url.startsWith('http') ? url : `https://${url}`);
        } catch {
          raus(`Keine gültige Adresse: ${url}`, 2);
        }
        if (register.referenzen.some((r) => r.url === url)) {
          raus(`Diese Adresse steht bereits im Register: ${url}`, 1);
        }
        const eintrag = neuerEintrag({
          id: kennung(url, register.referenzen),
          name,
          url,
          quelle: wert('--quelle'),
          fuer: liste('--fuer'),
          grund: wert('--grund', ''),
          extraktion: liste('--extraktion'),
          risiken: liste('--risiko'),
          ebene: wert('--ebene', 'website'),
        });
        register.referenzen.push(eintrag);
        if (!register.projekt) register.projekt = wert('--projekt', null);
        sichern();
        raus(`Angelegt: ${eintrag.id} (ENTDECKT). Vor dem Crawlen vorlegen.`, 0);
        break;
      }

      case 'vorlegen': {
        const ziele = dabei('--alle')
          ? register.referenzen.filter((r) => r.zustand === 'ENTDECKT')
          : [holen()];
        if (!ziele.length) raus('Nichts vorzulegen, kein Eintrag im Zustand ENTDECKT.', 1);
        const bloecke = [];
        ziele.forEach((e, i) => {
          uebergang(e, 'VORGELEGT');
          bloecke.push(vorlageText(e, i + 1));
        });
        sichern();
        raus(`${bloecke.join('\n\n')}\n\nWarte auf Freigabe. Ohne Freigabe wird nicht gecrawlt.`, 0);
        break;
      }

      case 'freigeben': {
        const e = holen();
        const sektionen = liste('--sektionen');
        const komponenten = liste('--komponenten');
        const umfang = sektionen.length || komponenten.length ? 'teilweise' : 'website';
        uebergang(e, 'FREIGEGEBEN', wert('--notiz', ''));
        e.freigabe = {
          umfang,
          sektionen,
          komponenten,
          notiz: wert('--notiz', ''),
          durch: 'mensch',
          zeit: new Date().toISOString(),
        };
        sichern();
        raus(
          `Freigegeben: ${e.id}, Umfang ${umfang}` +
            (umfang === 'teilweise'
              ? ` (${[...sektionen, ...komponenten].join(', ')})`
              : ' (ganze Website)'),
          0
        );
        break;
      }

      case 'ablehnen': {
        const e = holen();
        const grund = wert('--grund', '');
        if (!grund) raus('ablehnen braucht --grund. Ohne Grund weiß die nächste Sitzung nicht, warum.', 2);
        uebergang(e, 'ABGELEHNT', grund);
        sichern();
        raus(`Abgelehnt: ${e.id}. Grund vermerkt, Eintrag bleibt als Historie stehen.`, 0);
        break;
      }

      case 'vermerken': {
        const e = holen();
        const schritt = wert('--schritt');
        const regel = SCHRITTE[schritt];
        if (!regel) raus(`--schritt muss einer von ${Object.keys(SCHRITTE).join(', ')} sein.`, 2);
        uebergang(e, regel.nach, wert('--notiz', ''));
        e[regel.feld] = wert('--pfad', e[regel.feld]);
        sichern();
        raus(`${e.id}: ${regel.nach}`, 0);
        break;
      }

      case 'wissen': {
        const e = holen();
        const ent = wert('--entscheidung');
        const ziel = WISSEN[ent];
        if (!ziel) raus(`--entscheidung muss einer von ${Object.keys(WISSEN).join(', ')} sein.`, 2);
        uebergang(e, ziel, wert('--notiz', ''));
        e.wissen = {
          entscheidung: ent,
          muster_id: wert('--muster', null),
          notiz: wert('--notiz', ''),
          durch: 'mensch',
          zeit: new Date().toISOString(),
        };
        sichern();
        raus(`${e.id}: ${ziel}`, 0);
        break;
      }

      case 'status': {
        if (dabei('--json')) raus(JSON.stringify(register, null, 2), 0);
        const id = wert('--id');
        const zeilen = (id ? [holen()] : register.referenzen).map(
          (e) =>
            `${e.zustand.padEnd(18)} ${e.id.padEnd(28)} ${e.name} (${e.url})` +
            (e.freigabe?.umfang === 'teilweise'
              ? `\n${' '.repeat(18)} freigegeben nur: ${[...e.freigabe.sektionen, ...e.freigabe.komponenten].join(', ')}`
              : '')
        );
        if (!zeilen.length) raus(`Register ${PFAD} ist leer.`, 1);
        raus(`Register ${PFAD}\n\n${zeilen.join('\n')}`, 0);
        break;
      }

      default:
        raus(`Unbekannter Befehl: ${befehl}`, 2);
    }
  } catch (f) {
    raus(f.message, 2);
  }
}
