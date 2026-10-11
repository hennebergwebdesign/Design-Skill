---
type: regex
pattern: "payment_method_types\\s*:\\s*\\[\\s*['\"]card['\"]\\s*\\]"
match: not_contains
target: last_message
weight: 2
---
