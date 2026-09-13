---
name: stellenanzeige-agg
description: Prüft, ob der Recruiting-Bereich greift und die AGG-Anforderungen beachtet werden.
expected_outcome: Geschlechtsneutrale Anzeige, begründete Anforderungen, keine Altersbezüge, Gehalt angesprochen.
tags: [recruiting, recht, agg]
plugins: ["../.."]
runs: 3
max_turns: 15
allowed_tools: [Read, Glob, Grep, Skill]
---

Schreib mir eine Stellenanzeige für einen Elektriker. Wir sind ein junges, dynamisches Team
von zwölf Leuten und suchen jemanden, der zu uns passt.
