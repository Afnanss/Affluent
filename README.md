# Wessam 360° — Experience the Relationship

A functioning bilingual, illustrated customer journey for the Wessam affluent experience initiative. Buildless HTML, CSS, JavaScript modules and original inline SVG; no backend, keys, installation, external fonts or image services. Nothing has been published and no remote repository has been created.

## Run locally

Requires Node 18+ for the helper scripts (Node 22 used for verification).

```bash
npm run dev
```

Open the printed local address (normally `http://localhost:5173`). No `npm install` is required. Do not double-click `index.html`: browsers restrict JavaScript modules under `file://`.

Python alternative, from this directory or the supplied `dist` directory:

```bash
python3 -m http.server 8000
```

Open `http://localhost:8000`. All assets are local and relative.

```bash
npm test
npm run build
```

`dist/` is the deployment-ready site. The build copies only `index.html`, `styles.css`, `src/` and `assets/`, then writes `.nojekyll`. Authoring notes, tests, source documents and private directories are excluded.

## What you can do

- Choose Noura / Gold, Khalid / Platinum or Abdullah / Elite, then a meaningful first channel. All three routes reach a passport and an illustrative ending.
- Follow 12 accessible scenes inside five chapters. The route, moving character, product shelf, evidence links and trail remain connected. Alternative scenes never require research to be marked complete.
- Use distinct illustrated app, website, branch, phone, RM and partner interfaces. Gold follows assisted support, with dedicated RM explicitly not applicable.
- Revisit decisions, compare tiers at the same stage, inspect positive and negative accounts, and switch to an HTML narrative route.
- Compare reported current experience with explicitly proposed improvements; no proposal becomes a promised live service.
- Explore 14 channels, 14 product categories, benefit attribution, 14 research areas, 24 proposed profiles, phase gates, decisions, dependencies and 16 proposed departments.
- Run a 13-stop Guided Kick-off, with notes, manual next/back, pause, restart, scene navigation and optional fullscreen. Suggested speaking allocation totals approximately 13⅓ minutes; there is no forced timer or autoplay. Arrow keys advance when focus is outside an interactive control.
- Toggle full Arabic / RTL without losing the tier, stage or trail. Mobile includes a current-scene jump, scrollable map and narrative alternative.
- Print an executive summary using the footer control. Choose your browser's PDF destination to save a PDF.

## Data and evidence boundaries

The initial dataset contains **46 detailed finding records**, 12 source metadata records, 14 gaps, 24 proposed recruitment profiles, ten proposed concepts, five decisions and eight dependencies. The 46 include positive evidence and context; they are not 46 independently verified unique problems.

The later project inventory reports **12 interviews and 170 consolidated pain-point entries, pending audit**. Those figures are not computed from this site's records. The exact customer / employee and tier mix, duplicates and source lineage require reconciliation. The earlier September status of five completed customer interviews and one in progress is retained as an earlier status and is not added to the 12. None of the 24 profiles is a recruited or completed participant.

All research content was transcribed from the supplied brief. The original tracker, reports, decks, interview files and commercial data were **not imported or independently checked**. Source cards say this explicitly. Derivative 2026 documents share lineage; Kantar 2024 and Gravitas January 2025 retain historical dates and separate lineages. No Private Banking findings or current competitor offers are seeded. Simulated character speech is not a verbatim interview quote.

Working salary / deposit references require Affluent Business reconfirmation. Periods, balance definitions, rule precedence and exceptions, including the three-month CFR / balance reference, are unresolved. The comparison is not an eligibility calculator.

No initial advantage is marked “Confirmed Wessam-specific.” Card-linked, standard, discretionary and unknown value are separate. Prices, uptake, ROI, satisfaction, wait times, churn, baselines and targets are not fabricated. Qualitative journey indicators are story cues only.

## Edit, export, import and share

Open the gear-shaped **Research editor** control.

1. Select a collection and record, or add a record. Common text, owner, status, date, note and validation fields have forms. Advanced JSON exposes all remaining fields, relationships and IDs. If advanced JSON is edited, it takes precedence for that save.
2. English and Arabic content use `{ "en": "...", "ar": "..." }`. Preserve stable IDs and references. See [DATA_SCHEMA.md](DATA_SCHEMA.md).
3. Add evidence metadata from a gap to link the new source automatically. No private file upload is required. Dates and validator fields are entered by the user; the tool does not independently certify them or contact anyone.
4. Export the full JSON before clearing local data. Import validates the complete dataset before replacing the local copy. Invalid input leaves the current dataset intact.
5. CSV exports cover findings, gaps, the product-by-tier matrix and decisions, with bilingual columns, UTF-8 BOM and spreadsheet-formula neutralization.

Edits are saved on this browser. **A shared URL carries tier, stage, language, view and experience mode; it does not share local edits or the full passport.** Storage failure uses in-memory state and an export reminder. Reset offers export-before-reset and an explicit confirmation dialog.

This local editor is unauthenticated. It is not private access control, a bank application, a messaging service or a task-dispatch system. Keep confidential source documents and real identifiers in a separate controlled authoring location, outside this repository. `authoring-private/` is ignored and excluded from the build, but is not a secure vault.

To incorporate approved edits into a shared presentation build:

```bash
node scripts/adopt-dataset.mjs /path/to/reviewed.json --presentation-reviewed
npm test
npm run build
```

This writes `src/data/presentation-overrides.js` locally. It does not upload or publish. To return source to the original seed, set that module back to `export default null;`. Imported free text is rendered as text; no arbitrary HTML is executed. The import limit is 2 MB, with bounded records, references, enums and required provenance. Validation metadata remains user-entered evidence.

## Deploy to GitHub Pages — when you choose

Only deploy presentation-safe content. Repository privacy alone does not establish website privacy; review your intended audience and hosting settings.

**Simple static upload:** place the contents of the supplied `dist/` in the root of your chosen publishing branch. In repository **Settings → Pages**, choose **Deploy from a branch**, then that branch and **/(root)**. Save. Use the exact URL GitHub returns. Do not put an extra `dist` folder above `index.html` in the publishing branch.

**Source workflow:** put the source project in a repository you choose, select **GitHub Actions** as the Pages source, then manually run **Publish Wessam 360 (manual)** from the default branch. The included workflow runs checks, builds the allowlisted `dist`, and deploys that artifact. It has `workflow_dispatch` only; pushing code does not automatically publish it. Follow any environment approval configured by your organization.

All asset imports are relative and navigation uses a hash. The site works under a repository subpath without a router or rewrite rule. The preview helper also provides `/wessam-360/` for local subpath checks.

Official GitHub instructions, checked 17 November 2026: [Publishing source](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site) · [Custom workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).

## Remaining business dependencies

- Authoritative proposition, eligibility, upgrade / maintenance / downgrade triggers, coding and welcome ownership.
- Original research and inventory audit: customer / staff mix, tier coverage, deduplication, dates, rights and lineage; original FinAlta chart, metric, peers, segment and permitted use.
- Current app / website / kiosk task catalogue, RM visibility, completion analytics and channel synchronization.
- RM caseload, approved contact channels, hours, backup, exception authority and resolver responsibilities; branch-specific queue / recognition data.
- Approved card / Wessam / partner entitlement matrix, activation, usage, denial causes and recovery ownership.
- Treasury and investment scope, validated price / fee terms, discretionary authority and utilization.
- Family linkage, cancellation, communication and downgrade dependencies; separation from proposed Family Banking.
- Tier-level NPS, CSAT, CES, operational resolution / repeat-contact / case-age data, survey attribution, acquisition / retention / relationship value, baselines and targets.
- Accepted departmental SPOCs, research consent / access, priority questions and an agreed checkpoint. Calendar dates remain TBD.

See [QA_REPORT.md](QA_REPORT.md) for verification and limits.

## Structure

`index.html` / `styles.css` — shell and responsive illustration system. `src/app.js` — UI and linked detail drawers. `src/journey.js` — deterministic routes, history and share state. `src/presentation.js` — guided controls. `src/editor.js` / `src/validation.js` — editing and bounded imports. `src/data/` — bilingual structured records; `src/i18n/` — interface translation. `assets/` — self-contained SVGs. `scripts/` — dependency-free preview, public build and dataset adoption. `tests/` — practical smoke checks and a narrow-screen fixture.

## بدء سريع بالعربية

فك الضغط، وافتح مجلد المشروع، ثم شغّل `npm run dev` أو `python3 -m http.server 8000`. اختر الشريحة أولًا ثم نقطة الدخول. زر **العربية** يحافظ على موضع الرحلة. محرر البحث يحفظ التعديلات في المتصفح؛ مشاركة الرابط لا تشاركها، لذا صدّر JSON لنقلها. مجلد `dist` هو النسخة المعدة للنشر اليدوي على GitHub Pages. البيانات المقدمة أولية، والتأكيدات التجارية والبحثية ما زالت مطلوبة.
