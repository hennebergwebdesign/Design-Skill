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
echo "Hinweis: shadcn/ui bringt seinen Skill über die eigene CLI mit."
echo "In einem shadcn-Projekt genügt: npx shadcn@latest info"
echo
echo "Zum Aktualisieren: bash scripts/install-quellskills.sh --update"
