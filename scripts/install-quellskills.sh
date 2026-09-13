#!/usr/bin/env bash
#
# Installiert die Original-Skills, aus denen dieser Skill destilliert wurde, zusätzlich
# in das aktuelle Projekt. Sinnvoll, wenn die volle Tiefe gebraucht wird:
# die komplette GSAP-Dokumentation, die durchsuchbaren UI/UX-Datensätze oder die
# shadcn-Registry-Anbindung.
#
#   bash scripts/install-quellskills.sh            # installiert nur, was fehlt
#   bash scripts/install-quellskills.sh --update   # holt alle neu
#
# Die Skills bleiben danach im Repository. Damit entfällt die Neuinstallation je Sitzung.
# Suchwerkzeuge werden über .gitattributes und eine Ausschlussdatei von ihnen ferngehalten,
# damit Volltextsuchen nicht in den Datendateien landen.
set -uo pipefail

ZIEL=".claude/skills"
UPDATE=0
[ "${1:-}" = "--update" ] && UPDATE=1

mkdir -p "$ZIEL"

installiere() {
  local ordner="$1"; local beschreibung="$2"; shift 2
  if [ -d "$ZIEL/$ordner" ] && [ "$UPDATE" -eq 0 ]; then
    echo "-> $beschreibung: bereits vorhanden, übersprungen"
    return 0
  fi
  echo "-> $beschreibung"
  npx --yes skills add "$@" 2>&1 | tail -n 3 || { echo "   fehlgeschlagen: $beschreibung"; return 1; }
}

FEHLER=0

# GSAP: acht Skills (core, timeline, scrolltrigger, react, frameworks, plugins, utils, performance)
installiere gsap-core "gsap-skills (greensock)" \
  https://github.com/greensock/gsap-skills --agent claude-code || FEHLER=1

# UI/UX Pro Max: durchsuchbare Datensätze zu Stilen, Paletten, Schriftpaarungen, UX-Regeln
installiere ui-ux-pro-max "ui-ux-pro-max (nextlevelbuilder)" \
  https://github.com/nextlevelbuilder/ui-ux-pro-max-skill --skill ui-ux-pro-max --agent claude-code || FEHLER=1

# Awesome Design Skills: ein Stil als Ausgangspunkt. Weitere auf Zuruf, zum Beispiel:
#   npx --yes skills add bergside/awesome-design-skills --skill minimal --agent claude-code
installiere impeccable "impeccable (bergside)" \
  bergside/awesome-design-skills --skill impeccable --agent claude-code || FEHLER=1

# Responsive Craft: Eskalationsmodell (intrinsisches CSS -> Container Queries -> Media
# Queries), acht ausgearbeitete Responsive-Szenarien und eine Live-Vorschau, die 375, 768,
# 1024 und 1440 px gleichzeitig in iframes zeigt. Destilliert in 16-responsive-container.md;
# die Vorschau lohnt zusaetzlich.
installiere responsive-craft "responsive-craft (kylezantos)" \
  kylezantos/responsive-craft --agent claude-code || FEHLER=1

# Web Animation Skills: neun Skills. Relevant sind accessible-animation (gestufte
# prefers-reduced-motion-Behandlung) und svg-animation (Strich-Zeichnen, Morphing,
# animierte Icons). gsap-web und 60fps-animation ueberschneiden sich mit 09-motion-gsap.md.
installiere accessible-animation "web-animation-skills (iart-ai)" \
  iart-ai/web-animation-skills --agent claude-code || FEHLER=1

# Web Quality Skills von Addy Osmani: Core Web Vitals mit Feld- UND Labordaten, WCAG 2.2,
# technisches SEO, optional live ueber das Chrome-DevTools-MCP. Ergaenzt die Bereiche 3, 4
# und 5 beim MESSEN, wo dieser Skill nur die Zielwerte nennt.
installiere web-quality-audit "web-quality-skills (addyosmani)" \
  addyosmani/web-quality-skills --agent claude-code || FEHLER=1

# Design Assets von jezweb: icon-set-generator erzeugt eigene SVG-Sets mit konsistenter
# Strichstaerke und Pixelrasterausrichtung, dazu favicon-gen und color-palette. Die
# Ableitungslogik (Strichstaerke folgt der Schrift, Form folgt dem Gegenstand) steht in
# 17-icons-eigenes-system.md; dieses Paket liefert die Erzeugung.
installiere icon-set-generator "design-assets (jezweb)" \
  jezweb/claude-skills --skill icon-set-generator --agent claude-code || FEHLER=1

# Suchtreffer in den Skilldaten vermeiden: Nachschlagewerke, keine Projektquellen.
if ! grep -q "\.claude/skills" .gitattributes 2>/dev/null; then
  printf ".claude/skills/** linguist-vendored linguist-generated -diff\n" >> .gitattributes
fi
if [ ! -f "$ZIEL/.ignore" ]; then
  printf "# Von Suchwerkzeugen ausgenommen, siehe scripts/install-quellskills.sh\n*\n" > "$ZIEL/.ignore"
fi

echo
[ "$FEHLER" -eq 0 ] && echo "Fertig. Installierte Skills:" || echo "Teilweise fehlgeschlagen. Vorhanden:"
ls -1 "$ZIEL" 2>/dev/null | grep -v '^\.ignore$' || echo "(keine)"
echo
echo "Bewusst NICHT installiert:"
echo "  theme-factory (Anthropic)   wendet Anthropics eigene Marke an und ist damit genau"
echo "                              die Schablone, gegen die 10-visuelle-richtung.md steht."
echo "                              Die Methode zur Skalenerzeugung ist dort destilliert."
echo "  wondelai/skills             25 Buchdestillate, englisch. Substanz aus refactoring-ui,"
echo "                              storybrand-messaging, cro-methodology und"
echo "                              scorecard-marketing ist in 12, 15 und 19 eingeflossen."
echo "                              Achtung bei influence-psychology und"
echo "                              hundred-million-offers: Verknappung und Dringlichkeit"
echo "                              als Werkzeug kollidieren mit der UWG-Regel in 12."
echo "  awwwards-Stilskills         Stilgeneratoren. Bento- und Broken-Grids als"
echo "                              Voreinstellung sind die naechste Schablonengeneration."
echo
echo "Hinweis: shadcn/ui bringt seinen Skill über die eigene CLI mit."
echo "In einem shadcn-Projekt genügt: npx shadcn@latest info"
echo
echo "Zum Aktualisieren: bash scripts/install-quellskills.sh --update"
