# Verification — 17 November 2026

This is a working presentation website, with an intentionally unvalidated business dataset. UI verification does not validate banking policy or source research.

## Practical checks completed

| Area | Check and result |
| --- | --- |
| Three routes | Gold, Platinum and Elite completed in Chrome through distinct stages and four illustrative ending choices. Platinum's unavailable-RM action was exercised. |
| Determinism / backtracking | Node smoke checks cover repeatable outcomes and history rollback without duplicate stamps or accumulating penalties. |
| First touchpoint | App, website and branch have distinct responses and simulation layouts. App evidence narrowed to the matching channel. Trail records the selected channel and any handoff. |
| Gold service model | Every available action at every stage is checked to exclude RM contact and RM handoffs for Gold. A dedicated RM is explicitly not applicable. |
| Evidence | All 46 finding records have period, provenance, lineage, scope and status; positive and negative accounts are present. Historical sources remain dated. |
| Counts / gaps | 46 loaded findings, 12 source metadata records, 14 research areas, 24 proposed profiles (eight per tier). Reported 12 / 170 remain separately qualified. |
| Product attribution | Separate card, standard, discretionary and unknown labels. No seeded confirmed Wessam-specific benefit; rates, fees, performance and satisfaction are not invented. |
| Local editing | Treasury gap notes edited through the form, saved, reloaded and read back successfully. Test notes were removed using the confirmed reset before handoff. |
| JSON roundtrip | Full dataset exported in Chrome and re-imported through the file chooser; the UI confirmed import validation and preservation of the local edit. |
| Invalid imports | Smoke checks reject duplicate IDs, broken source references, unsupported validation claims, missing capability evidence, unsafe metadata, malformed map coordinates and prototype keys. |
| CSV | Serializer checks include Arabic, quoting, newlines and spreadsheet-formula neutralization. Findings, gaps, product/tier matrix and decision handlers are implemented. |
| Storage fallback | Storage adapter tested with a working store and an unavailable store; exports remain usable with memory-only state. Quota failure was simulated at adapter level, not through browser settings. |
| Arabic / RTL | Language switch preserved a completed Gold route and history. Mirrored Arabic map and translated scene controls inspected. |
| Narrow screen | Tested in a 390px iframe (375px content viewport after scrollbar). DOM page width equaled viewport width, with no page-level horizontal overflow. Map scrolling is intentional. Current-scene jump reached an operable Arabic family scene. |
| Keyboard | Semantic buttons/selects/dialogs, native modal focus behavior and visible focus CSS. Skip link verified to focus `main` without changing the current hash or tier. Map also has keyboard-scroll focus and a narrative alternative. |
| Guided mode | First and final curated slides, direct navigation, pause/resume and disabled advancement while paused were exercised. Data holds all 13 steps and an 800-second suggested allocation. |
| Proposed mode | Persistent proposal banner and same-scene comparison were inspected, including owner, dependency, feasibility and blank measurement fields. |
| Pages subpath | Site loaded successfully under `/wessam-360/`, with modules, local assets, hash state and interactions. |
| Console | No application-origin browser errors observed. Browser-extension metadata warnings were excluded from application results. |
| Source checks / build | Module syntax checks, `npm test`, and the allowlisted static build passed. No runtime dependency install needed. |
| Public boundary | No original source documents, real participant/staff identifiers, contact details, account information, keys or live integrations included. |

## Verification limits

- Current Chrome was exercised; native iOS Safari and physical phones were not tested.
- Reduced-motion styling, native fullscreen, clipboard fallback and print styles are implemented. Operating-system print/PDF and fullscreen dialogs were not automated.
- CSV serialization was checked programmatically; the four resulting file types were not each opened in a desktop spreadsheet application.
- GitHub Pages deployment itself was not executed. The relative-path site was tested under a repository subpath; a manual-only Pages workflow and instructions are supplied.
- No original study, 170-entry workbook, interview file, operational dataset, commercial term or eligibility policy was available for independent validation. The initial dataset is the supplied brief, not the full confidential research corpus.

## Business data still required

Authoritative eligibility and lifecycle rules; welcome and coding records; source / sample / pain-inventory audit; current digital task catalogue; branch performance; RM contact/coverage/authority; benefit entitlements and provider usage/recovery; Treasury and investment scope/terms; family-linkage dependencies; tier satisfaction and operational/retention metrics; original FinAlta context; accepted departmental SPOCs, access and agreed checkpoint.
