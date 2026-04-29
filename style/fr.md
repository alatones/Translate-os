# French (fr) Style Addendum

## Variant

- **Standard French** (français standard / international). Not
  Quebec French (français québécois) — Quebec lexicon (e.g.
  `courriel` for email, `clavardage` for chat) reads as
  regional in a global SaaS context.
- The dashboard is read by French-speaking marketers worldwide
  (France, Belgium, Switzerland, Luxembourg, Africa); use lexicon
  that doesn't sound region-specific.

## Register and address

- **Vous** for second-person address. Always. Never tu.
  This is the French B2B SaaS default — Stripe, Slack, Notion,
  GitHub, Linear all use vous in their French interfaces.
- Conjugation follows: `Vous avez …`, `Vous êtes …`,
  `Veuillez …`. Imperative form: `Envoyez`, `Créez`, `Confirmez`.

## Buttons: infinitive form

- Buttons use infinitive (`Envoyer`, `Enregistrer`, `Supprimer`,
  `Créer`), matching French SaaS convention.
- Same for primary CTAs across the dashboard.
- Status badges and labels: noun phrases.

## Punctuation

- **Use standard Latin spacing — do NOT insert a non-breaking
  space before `:` `;` `?` `!`.** The strict French typographic
  rule requires NBSP before these marks (e.g. `Bonjour !`), but
  in software UIs this is fiddly to maintain, easy to break, and
  most international SaaS in French (Stripe FR, GitHub FR, Linear
  FR) drops it. Stay consistent: no space before terminal
  punctuation.
- Use ASCII straight quotes (`'` and `"`) in translation values.
  French guillemets `« »` are fine when the source uses them, but
  don't add them.
- Sentence endings match source: period when source has period,
  no terminal punctuation when source has none.

## Gender

- Default masculine for adjectives describing neutral subjects:
  `Actif`, `Inactif`, `Désactivé`, `Activé`, `Suspendu`,
  `Échoué`, `Terminé`.
- Don't add gender-inclusive markers (`.e.s`, `·`, etc.) — these
  read as politicized in software contexts.
- For nouns referring to people, use the masculine form unless the
  glossary specifies otherwise (e.g. `Abonné`, `Expéditeur`).

## Brand and feature names

- Latin script always. No translation of vendor names.
- `OneSignal`, `Apple`, `Twilio`, `HubSpot`, `Mixpanel`, `Amplitude`,
  `Segment`, `Snowflake`, `BigQuery`, `Webhook`, `Email`, `Push`,
  `SMS`, `RCS` — all stay Latin.
- "Segment" — when it's the OneSignal feature, locked as `Segment`
  (Latin, since French already accepts the Latin loanword in
  marketing tech). When it's the Twilio company, also Latin.
- Loanwords like `email` are widely used in French and stay Latin.
  `Courriel` is technically more French but reads as Quebec/
  formal-government.

## Length

- Button labels: target ≤ 16 characters. Soft cap 22.
- Status badges: target ≤ 12 characters.
- French is wordier than English; expect ~20-30% longer than
  source. Plan layout accordingly but don't truncate.

## Conventions

- "Save" → `Enregistrer`. Never `Sauvegarder` (means backup) or
  `Sauver` (means rescue).
- "Delete" → `Supprimer`. Never `Effacer` (means erase) or
  `Détruire`.
- "Settings" → `Paramètres`. Never `Configurations` (singular
  `Configuration` is fine for compound forms).
- "Search" → `Rechercher` (verb) / `Recherche` (noun).
- "Filter" → `Filtrer` (verb) / `Filtre` (noun).
- "Send" → `Envoyer`. Never `Expédier` (too transactional).
- "Manage" → `Gérer` (verb) / `Gestion` (noun).
- Rate metrics: `Taux de` prefix (`Taux d'ouverture`,
  `Taux de clics`, `Taux de livraison`).
- Possessive: prefer `de` over apostrophe-style. `Email de
  l'expéditeur` not `'l'expéditeur Email`.

## Examples

| English (role)              | ✓ Right                          | ✗ Wrong                              |
| --------------------------- | -------------------------------- | ------------------------------------ |
| Send (button)               | Envoyer                          | Envoyez (imperative); Expédier       |
| Save changes (button)       | Enregistrer les modifications    | Sauvegarder les modifications        |
| Create Segment (button)     | Créer un segment                 | Crée un segment (tu form)            |
| Are you sure? (dialog)      | Êtes-vous sûr ?                  | Êtes-vous sûr? (no NBSP either way — see note) |
| Sent (status)               | Envoyé                           | Envoyée (gender)                     |
| Failed (status)             | Échoué                           | Raté (informal)                      |
| Loading… (spinner)          | Chargement…                      | Chargeant... (verb form awkward)     |
| Settings (nav)              | Paramètres                       | Configurations / Réglages            |
| Search (button)             | Rechercher                       | Chercher (less formal)               |

(The "?" example: per the punctuation rule above, we don't insert
NBSP before `?`. Both `Êtes-vous sûr ?` and `Êtes-vous sûr?` exist
in French software UIs; we standardize on no NBSP for consistency
and machine-edit safety.)

## Things to watch

- French requires articles where English drops them. Buttons
  typically use indefinite article: `Créer un segment` not
  `Créer segment`.
- "Vous" verb agreement: `Vous avez`, `Vous êtes`, `Vous pouvez`.
  Never use `Tu as` / `Tu es`.
- Don't drop `de` / `du` / `de la` in compound nouns. `Liste des
  abonnés`, not `Liste abonnés`.
- Preserve placeholders (`{1}`, `{{var}}`, `%s`) unchanged.
- Acronyms stay Latin: `API`, `SDK`, `CSV`, `URL`, `HTML`, `CTR`.
