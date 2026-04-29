# Japanese (ja) Style Addendum

## Register

- **Buttons / labels / status states / table headers**: 体言止め
  (noun-form ending). No です／ます tail. Concise.
- **Tooltips, descriptions, onboarding copy, empty states, full
  sentences**: です／ます. Polite but not honorific.
- **Never** use plain form (だ／である) anywhere. Never use casual
  endings (〜だよ, 〜だね). The dashboard's voice is professional
  but not stiff.

## Punctuation

- Use 全角 punctuation (。、) in Japanese-only sentences.
- Use 半角 spacing/punctuation when mixing with Latin or numeric
  content: `5件のメッセージを送信` (no full-width digit, half-width
  space allowed before/after Latin tokens if natural).
- 「」 for quotes within explanatory copy; preserve source `"..."`
  only when quoting code or identifiers literally.
- No exclamation marks unless the source uses one (success toasts,
  marketing CTAs).
- No emoji unless the source has them.

## Brand and feature names

- Latin: OneSignal, Apple, Twilio, Mailgun, Snowflake, BigQuery,
  HubSpot, Mixpanel, Amplitude, Segment, Adobe, Apache, AWS,
  Google, Microsoft, Mozilla, Firefox, Chrome, Edge, Safari, Webhook.
- カタカナ for established loanwords already in glossary:
  ジャーニー, セグメント, テンプレート, キャンペーン, プッシュ,
  オーディエンス, インポート, エクスポート, etc.

## Length

- Button labels: target ≤ 8 characters. Soft cap 12.
- Status badges: target ≤ 6 characters.
- No hard cap on tooltips / descriptions.

## Conventions

- Plural is implicit. `セグメント` covers both "Segment" and
  "Segments" — don't try to mark plurality.
- Action verbs in compound buttons: noun + を + verb. e.g.
  "Create Segment" → `セグメントを作成`. Don't drop the を.
- Prefer 〜する verb base over 〜します for buttons:
  - `送信する` is fine but `送信` (noun-form) is preferred — shorter.

## Examples

| English (role)             | ✓ Right                    | ✗ Wrong                       |
| -------------------------- | -------------------------- | ----------------------------- |
| Send (button)              | 送信                        | 送信します (too long)          |
| Save changes (button)      | 変更を保存                  | 変更を保存します               |
| Create Segment (button)    | セグメントを作成            | 作成セグメント (word order)    |
| Are you sure? (dialog)     | 本当によろしいですか？       | 本当に？ (too curt)            |
| Sent (status)              | 送信済み                    | 送られた (passive past)        |
| Failed (status)            | 失敗                        | 失敗しました (too long)        |
| Loading… (spinner)         | 読み込み中…                 | ロード中... (mixed quote/period) |

## Things to watch

- Don't auto-add 「」 around English brand names.
- Don't translate `Apr 1` style chart labels — these match patterns
  in `languages.json` and the pattern handles formatting.
- Watch for source strings ending in colon: keep the colon (`:` →
  `：` is NOT correct here; we keep ASCII colon for layout).
