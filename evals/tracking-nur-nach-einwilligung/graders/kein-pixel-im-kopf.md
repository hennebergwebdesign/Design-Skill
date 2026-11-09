---
type: regex
pattern: "<head>[\\s\\S]{0,400}fbq\\('init'"
match: not_contains
target: last_message
weight: 2
---
