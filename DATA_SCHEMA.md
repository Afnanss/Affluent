# Presentation dataset schema · v1

Export/import is a complete JSON dataset, not a merge or a single-record patch. `schemaVersion` must be `1` and `datasetType` must be `presentation-demo`. Seed examples are in `docs/presentation-dataset.json` and the modules under `src/data/`.

| Collection | Stable identity / main references |
| --- | --- |
| tiers / personas | `id`, bilingual name, service model, salary / deposit reference; `personaId` / `tier` |
| chapters / stages | `id`, bilingual title; chapter ID; finite map x/y from 0–100 |
| touchpoints | purpose, availability / practice, authentication, services, branch dependency, handoff, owner, sources, questions and measures |
| products / benefits | tier scope, availability by tier, value attribution, channels, conditions, commercial gaps, owner, sources |
| scenes | stage ID, goal, situation, expected experience, reveal, gap IDs; actions with channel, response and handoff |
| findings | unique ID, provenance, scope, status, capability, completeness, polarity, gaps, proposed owner and next action |
| evidence | bilingual title / method / scope, period, lineage, validation, original-access note and optional reference |
| gaps | question, have / missing / why, required evidence, method, scope, owner / SPOC, priority, status, requests, dates, dependencies, validator |
| researchProfiles | proposed profile ID, tier, city, context; initially no participant identity |
| owners / decisions / dependencies | proposed responsibility, unassigned SPOCs, local acceptance / decisions / notes / dates |
| concepts | future/proposed title, stage, supporting context, owner, dependency, feasibility and measurement plan |
| kickoff | curated step ID, tier / stage, bilingual body and notes, suggested speaking seconds |
| plan | proposed methods, adjustable phases with dates blank, themes, outputs and candidate benchmarks |

Text intended for display uses `{ "en": "English text", "ar": "النص العربي" }`. Null measurement values mean not supplied; never replace them with zero unless a real zero measurement has been provided.

## Finding example

```json
{
  "id": "F01",
  "title": {"en": "Discovery at the branch", "ar": "اكتشاف الشريحة في الفرع"},
  "summary": {"en": "A scoped customer report...", "ar": "رواية عميل محددة النطاق..."},
  "tierScope": ["gold", "platinum", "elite"],
  "stageIds": ["discover"],
  "touchpointIds": ["branch"],
  "productIds": [],
  "theme": "discover",
  "evidenceType": "customer",
  "sourceId": "S02",
  "sourceLineageId": "L-CX26",
  "sourcePeriod": "2026",
  "validationStatus": "reported",
  "capabilityStatus": "unknown",
  "researchCompleteness": "partial",
  "positiveOrPain": "pain",
  "severity": null,
  "frequency": null,
  "rootCauseHypothesis": {"en": "Unassessed", "ar": "غير مقيم"},
  "linkedGapIds": ["G05"],
  "proposedOwner": "affluent",
  "lastReviewedAt": null,
  "lifecycle": "current",
  "baseline": null,
  "target": null,
  "validator": "",
  "validatedAt": ""
}
```

Keep full exported record fields when importing; the abbreviated example explains the model, not a complete importable dataset.

## Independent status dimensions

- Evidence type: `customer`, `staff`, `observation`, `historical`, `operational`, `cx`, `illustrative`.
- Validation: `reported`, `validated`, `historical`, `hypothesis`, `missing`.
- Capability: `available`, `partial`, `unavailable`, `unknown`, `na`.
- Research completeness: `sufficient`, `partial`, `needed`.
- Lifecycle: `current`, `future`.
- Value attribution: `confirmed`, `card`, `standard`, `discretionary`, `unknown`, `na`.
- Research status: `proposed`, `in-progress`, `received`, `reviewed`, `validated`.
- Request status: `not-sent`, `draft`, `received`, `reviewed`. No state sends a request.

`validated` requires a nonempty `validator` and a `validatedAt` date in YYYY-MM-DD form. `confirmed` value additionally requires recorded owner validation. These are user-entered records, not independently certified facts. `unavailable` capability requires `capabilityEvidence`. Severity/frequency may only be entered when `manualWorkshopAssessment: true` explicitly marks them as workshop judgments; this still does not establish measured prevalence.

IDs use letters, digits, hyphens and underscores, max 60 characters, unique within each collection. All graph references must resolve. Retain the seeded stage, gap and persona IDs because the core routes and presentation link to them. Edit and add records; removing core graph records is not supported. Collections must remain nonempty. Source lineage in a finding must match its source record.

The importer rejects invalid JSON, dangerous prototype keys, broken references, unsupported enums, malformed validation metadata, nonfinite map or tier values and payloads above 2 MB. It limits each collection to 1,000 records, total records to 3,500, depth to 18 and text fields to 20,000 characters. It validates structure and consistency, not the truth or confidentiality of entered content. Imported references are displayed as text rather than followed as executable links.

## Public/private boundary

No source report is uploaded by this app. A reference is metadata only. Do not paste real identifiers, contacts, accounts or confidential excerpts into a build destined for public use. Local storage and hidden UI are not access controls. `scripts/adopt-dataset.mjs` updates local public presentation source only after the author's explicit reviewed-data flag; it does not redact content or publish it. Keep private authoring files outside the repository and export only a reviewed presentation dataset.
