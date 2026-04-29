# Spanish (es) Style Addendum

## Variant

- **Neutral / LATAM-leaning Spanish.** Avoid Spain-only forms
  (vosotros, computational vocabulary like "ordenador").
- Avoid voseo (vos / Argentinian). Use tú forms when address is
  needed.
- The dashboard is read by Spanish-speaking marketers globally;
  prefer the lexicon that doesn't sound Madrid-specific or
  Buenos Aires-specific.

## Register and address

- **Tú** as second-person, never usted, never vos.
- Prefer subject-pronoun drop. `Crea un segmento`, not `Tú crea
  un segmento`.

## Buttons: infinitive form

- Buttons use infinitive (`Enviar`, `Guardar`, `Eliminar`,
  `Crear`), not imperative (`Envía`, `Guarda`).
- This matches Spanish web/SaaS convention and stays consistent
  across the dashboard.
- Status badges and labels: same — noun phrases.

## Punctuation

- Open questions with `¿`. Open exclamations with `¡`. Both are
  required.
- No spaces around punctuation (Spanish standard, not French).
- Sentence endings: period (.). For UI labels with no terminal
  punctuation in source, no terminal punctuation in target.

## Gender

- Default masculine for adjectives describing neutral subjects:
  `Activo`, `Inactivo`, `Pausado`, `Completado`, `Archivado`.
- Don't add @/x neutralization markers.
- For nouns referring to people (`Suscriptor`, `Remitente`,
  `Miembro`), use the form already established in glossary.

## Brand and feature names

- Latin script always. No translation of company names.
- "Email", "Push", "Webhook", "SMS", "RCS" stay Latin (per glossary).
- "Segment" — when it's the OneSignal feature, locked as `Segmento`.
  When it's the Twilio company, stays Latin `Segment`.

## Length

- Button labels: target ≤ 18 characters. Soft cap 24.
- Status badges: target ≤ 14 characters.

## Conventions

- "Set up" / "Setup" → `Configurar` (verb) / `Configuración` (noun).
- "Save" → `Guardar`, never `Salvar` (that's pt).
- Use neutral lexicon: `Buscar` not `Encontrar`, `Eliminar` not
  `Borrar`.

## Examples

| English (role)              | ✓ Right                        | ✗ Wrong                         |
| --------------------------- | ------------------------------ | ------------------------------- |
| Send (button)               | Enviar                         | Envía (imperative)              |
| Save changes (button)       | Guardar cambios                | Guarde los cambios (usted form) |
| Create Segment (button)     | Crear segmento                 | Crea un segmento                |
| Are you sure? (dialog)      | ¿Estás seguro?                 | Estás seguro? (missing ¿)       |
| Sent (status)               | Enviado                        | Enviada (gender)                |
| Failed (status)             | Fallido                        | Falló (verb past tense)         |
| Loading… (spinner)          | Cargando…                      | Cargando... (ASCII ellipsis OK if source uses it) |
| Settings (nav)              | Ajustes                        | Configuración (locked)          |

## Things to watch

- Don't drop articles where Spanish requires them: `el segmento`,
  `los usuarios`. But buttons typically omit articles for brevity:
  `Crear segmento`, not `Crear el segmento`.
- "Tasa de" prefix for rate metrics (`Tasa de apertura`, `Tasa de
  clics`).
