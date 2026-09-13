# Komponenten mit shadcn/ui (React, Next.js)

Gilt für React-Projekte mit einer `components.json`. Für Astro-Projekte ohne React gilt
stattdessen `14-projektstruktur-astro.md`: die Kompositionsregeln unten sind trotzdem
übertragbar.

## Grundsätze

1. **Vorhandene Komponenten zuerst.** Vor eigener UI die Registries durchsuchen
   (`npx shadcn@latest search`), auch die Community-Registries.
2. **Komponieren statt neu erfinden.** Eine Einstellungsseite ist Tabs + Card +
   Formularfelder. Ein Dashboard ist Sidebar + Card + Chart + Table.
3. **Eingebaute Varianten vor eigenem Styling:** `variant="outline"`, `size="sm"`.
4. **Semantische Farben.** `bg-primary`, `text-muted-foreground`: nie `bg-blue-500`.

Alle CLI-Befehle mit dem Paketmanager des Projekts ausführen: `npx`, `pnpm dlx` oder
`bunx --bun`, je nach `packageManager`.

## Projektkontext lesen, bevor irgendetwas passiert

```bash
npx shadcn@latest info --json
```

Die wichtigsten Felder:

| Feld | Bedeutung |
|---|---|
| `aliases` | tatsächliches Importpräfix (`@/`, `~/`, `@workspace/ui/components`): nie hart kodieren |
| `isRSC` | bei `true` brauchen Komponenten mit `useState`, `useEffect`, Event-Handlern oder Browser-APIs `"use client"` |
| `tailwindVersion` | `v4` nutzt `@theme inline`, `v3` die `tailwind.config.js` |
| `tailwindCssFile` | die globale CSS-Datei mit den Variablen: immer diese bearbeiten, nie eine neue anlegen |
| `base` | `radix` oder `base`: bestimmt `asChild` vs. `render` und die verfügbaren Props |
| `iconLibrary` | bestimmt die Icon-Importe. Nie `lucide-react` annehmen |
| `framework` | Next App Router, Vite SPA, Astro … |
| `resolvedPaths` | wohin Dateien wirklich geschrieben werden |

## Harte Regeln

### Styling

- **`className` für Layout, nicht für Optik.** Farben und Typografie einer Komponente werden
  nicht überschrieben.
- **Kein `space-x-*` / `space-y-*`.** Stattdessen `flex` mit `gap-*`, vertikal
  `flex flex-col gap-*`.
- **`size-*`**, wenn Breite und Höhe gleich sind: `size-10`, nicht `w-10 h-10`.
- **`truncate`** statt `overflow-hidden text-ellipsis whitespace-nowrap`.
- **Keine manuellen `dark:`-Farbüberschreibungen.** Semantische Tokens benutzen.
- **`cn()` für bedingte Klassen**, keine Template-Literal-Ternaries.
- **Kein manuelles `z-index`** auf Overlay-Komponenten: Dialog, Sheet, Popover regeln ihre
  Stapelung selbst.

### Formulare

- **`FieldGroup` + `Field`**, nie `div` mit `space-y-*` oder `grid gap-*` für Formularlayout.
- **`InputGroup` nutzt `InputGroupInput`/`InputGroupTextarea`**, nie rohe `Input`/`Textarea`.
- **Buttons in Eingabefeldern** über `InputGroup` + `InputGroupAddon`.
- **Optionsmengen mit 2–7 Einträgen:** `ToggleGroup`, keine Button-Schleife mit eigenem
  Aktivzustand.
- **`FieldSet` + `FieldLegend`** für zusammengehörige Checkboxen/Radios.
- **Validierung:** `data-invalid` am `Field`, `aria-invalid` am Bedienelement. Deaktiviert:
  `data-disabled` am `Field`, `disabled` am Bedienelement.

### Komposition

- **Items gehören in ihre Group:** `SelectItem` → `SelectGroup`, `DropdownMenuItem` →
  `DropdownMenuGroup`, `CommandItem` → `CommandGroup`.
- **Eigene Trigger** über `asChild` (Radix) bzw. `render` (Base): je nach `base`-Feld.
- **Dialog, Sheet und Drawer brauchen immer einen Titel** (`DialogTitle` …), notfalls mit
  `className="sr-only"`.
- **Card vollständig komponieren:** `CardHeader`/`CardTitle`/`CardDescription`/`CardContent`/
  `CardFooter`, nicht alles in `CardContent`.
- **`Button` hat kein `isPending`/`isLoading`.** Stattdessen `Spinner` + `data-icon` +
  `disabled`.
- **`TabsTrigger` gehört in `TabsList`.**
- **`Avatar` braucht immer `AvatarFallback`.**

### Fertige Komponenten statt eigenem Markup

`Alert` für Hinweise, `Empty` für leere Zustände, `Separator` statt `<hr>`, `Skeleton` statt
eigener `animate-pulse`-Divs, `Badge` statt gestylter Spans, `toast`/`sonner` für Meldungen
je nach Projektbasis.

### Icons

- In Buttons über `data-icon="inline-start"` / `data-icon="inline-end"`.
- **Keine Größenklassen an Icons innerhalb von Komponenten:** die Komponente regelt das
  per CSS. Kein `size-4`.
- Icons als Objekte übergeben (`icon={CheckIcon}`), nicht als String-Schlüssel.
- Emoji sind keine Icons.

## Komponentenwahl

| Bedarf | Komponente |
|---|---|
| Aktion | `Button` mit passender Variante |
| Eingaben | `Input`, `Select`, `Combobox`, `Switch`, `Checkbox`, `RadioGroup`, `Textarea`, `InputOTP`, `Slider` |
| 2–5 Optionen | `ToggleGroup` + `ToggleGroupItem` |
| Daten | `Table`, `Card`, `Badge`, `Avatar` |
| Navigation | `Sidebar`, `NavigationMenu`, `Breadcrumb`, `Tabs`, `Pagination` |
| Overlays | `Dialog`, `Sheet`, `Drawer`, `AlertDialog` |
| Rückmeldung | `toast`/`sonner`, `Alert`, `Progress`, `Skeleton`, `Spinner` |
| Befehlspalette | `Command` in `Dialog` |
| Diagramme | `Chart` (Recharts) |
| Leere Zustände | `Empty` |

## Ablauf

1. Projektkontext holen (`info`).
2. **Installierte Komponenten prüfen**, bevor `add` läuft. Nichts importieren, was nicht
   installiert ist, nichts doppelt hinzufügen.
3. Suchen: `npx shadcn@latest search @shadcn -q "sidebar"`.
4. **Docs holen und lesen**, bevor eine Komponente gebaut oder repariert wird:
   `npx shadcn@latest docs button dialog select` liefert URLs, die dann abgerufen werden.
   Nicht aus dem Gedächtnis arbeiten.
5. Hinzufügen: `npx shadcn@latest add button card`. Vorschau mit `--dry-run`, `--diff`.
6. **Nach dem Hinzufügen die Dateien lesen und prüfen:** fehlende Unterkomponenten, fehlende
   Importe, falsche Komposition, Regelverstöße. Icon-Importe auf die `iconLibrary` des
   Projekts umstellen.
7. **Importe in Fremdkomponenten korrigieren.** Community-Registries schreiben oft
   `@/components/ui/…`; das passt selten zum Alias des Projekts.
8. **Registry nie raten.** Sagt der Auftrag nicht, aus welcher Registry ein Block kommt,
   nachfragen.
9. **Updates:** `add <komponente> --dry-run`, dann je Datei `--diff`, dann entscheiden.
   `--overwrite` nur nach ausdrücklicher Zustimmung.

## Presets

```bash
npx shadcn@latest preset decode <code>     # nie selbst dekodieren
npx shadcn@latest preset resolve --json    # aktuellen Stand lesen
npx shadcn@latest apply <code>             # überschreiben
npx shadcn@latest apply <code> --only theme,font
```

Beim Wechsel eines Presets zuerst fragen: überschreiben, teilweise, zusammenführen oder
überspringen?

## Verbindung zum Conversion-System

shadcn/ui liefert Bausteine, keine Positionierung. Die Regeln aus
`06-conversion-architektur.md` gelten unverändert: ein Primär-CTA-Text, 3–5 Formularfelder,
Trust-Elemente mehrfach platziert. Und die Regeln aus `04-barrierefreiheit-bfsg.md` gehen
vor: eine shadcn-Komponente ist zugänglich gebaut, aber ein selbst gesetzter
`text-muted-foreground` auf getönter Fläche kann trotzdem unter 4,5:1 fallen.
