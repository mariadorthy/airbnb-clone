# Prompt history

This file records **development prompts that can be supported by the repository or other available records**. It does not invent missing phases.

## How to read this file

| Kind of claim | Meaning |
| --- | --- |
| **Verified historical information** | Confirmed from git, a stored conversation transcript, or files that still exist |
| **Existing documentation** | Taken from `docs/ai-development/01`–`08` or architecture docs; may not match current `src/` |
| **Current recommendation** | How to prompt going forward ([`workflow.md`](./workflow.md)) |
| **Pending** | No prompt text, or work not finished |

**Not found:** original prompt bodies for a Phase 10 or Phase 11; original Phase 9 prompt body (architecture **outputs** exist).

---

## Documented development prompts 01–08

**Source:** files in this folder, present in git from `bda204c` (2026-09-18). The summaries below are **existing documentation**, not a re-audit of current source.

| ID | File | Objective (from that file) | Prompt text in file? |
| --- | --- | --- | --- |
| 01 | [`01-requirements-and-problem-analysis.md`](./01-requirements-and-problem-analysis.md) | Analyze the Airbnb-style reference and list structure, interactions, a11y, and constraints before coding | No separate quoted prompt; the document *is* the analysis |
| 02 | [`02-project-setup-and-configuration.md`](./02-project-setup-and-configuration.md) | Establish React + Vite tooling and record lint/build/dev | No quoted prompt; stack and scripts are listed |
| 03 | [`03-listing-page.md`](./03-listing-page.md) | Structural desktop listing page | **Yes** — quoted “senior React frontend engineer” prompt |
| 04 | [`04-assets-and-visual-fidelity.md`](./04-assets-and-visual-fidelity.md) | Desktop visual fidelity without Photo Tour/Lightbox | **Yes** — quoted Phase 4 prompt |
| 05 | [`05-listing-page-interactions.md`](./05-listing-page-interactions.md) | Share, Save, dates, guests, pricing, expanders | Summarized instructions, not a full quoted prompt |
| 06 | [`06-photo-tour.md`](./06-photo-tour.md) | Desktop Photo Tour overlay | Summarized instructions |
| 07 | [`07-lightbox.md`](./07-lightbox.md) | Lightbox + Phase 6 image fix | **Yes** — long Phase 7 prompt in the file |
| 08 | [`08-accessibility-and-interaction-audit.md`](./08-accessibility-and-interaction-audit.md) | Audit Phase 7 code; nested Escape, focus, CSS fixes | Report-style; not a single quoted user prompt |

Those files also record **limitations** (rate-limited reference, deferred mobile, no backend, verification often “local verification required”). Do not treat a “COMPLETED” heading in an old phase file as proof that the **current** tree was re-verified.

Common constraints across the quoted prompts (**existing documentation**):

- React + Vite, independently written (no copy from the reference or public clones)
- Desktop-first; backend/auth/payment out of scope unless a later phase says otherwise
- Do not fabricate filesystem access or test results
- Keep listing data separate from presentation (`src/data/listing.js`)

---

## Architecture documentation (Phase 9 outputs, prompt text missing)

**Verified historical information**

- `docs/architecture/system-architecture.md` and `docs/architecture/ai-native-workflow.md` are in the initial commit `bda204c`.
- Those files describe a **Phase 9** documentation boundary (architecture and workflow only; no app code changes in that phase).
- PlantUML/PNG for a **proposed** production marketplace were added in `9ccbf93` (2026-09-20), originally named `architecture-digram.*`.

**Pending:** the original Phase 9 *prompt* was not found in `docs/`, git blobs, or the indexed Cursor conversation “Phase 12 visual fidelity audit”. Do not invent it.

---

## Additional recorded prompts (only two with recoverable text)

The user instruction for this documentation pass: if only two extra prompts are available, document **only those two**. Indexed Cursor history for this project contained one prior conversation besides this documentation task. Together they supply two additional prompt texts.

### Additional prompt A — Phase 12 visual fidelity audit

| Field | Value |
| --- | --- |
| Date | Friday, 18 Sep 2026 (conversation timestamp) |
| Source | Cursor conversation [Phase 12 visual fidelity audit](66146327-e57d-4ae4-b9d7-eb240c493554) |
| Kind | **Verified historical information** (stored user message) |
| App files changed by that session | Conversation states no source modifications |

**Prompt (stored user text):**

```text
PHASE 12 — REFERENCE AND VISUAL FIDELITY AUDIT

Project:
D:\GitHub\playpower-airbnb-clone

Local app:
http://localhost:5173

Reference:
https://airbnb-clone-umber-two.vercel.app

You are a senior frontend engineer, visual QA specialist, and accessibility reviewer.

Perform an evidence-based comparison of my LOCAL APPLICATION against the REFERENCE WEBSITE.

The reference is the visual and behavioral source of truth, but do not copy source code, hidden implementation details, or proprietary assets. Keep the implementation original.

IMPORTANT:
- This is PHASE 12 ONLY.
- Do not perform the final assignment audit.
- Do not create the final ZIP.
- Do not modify source files automatically.
- Do not claim anything was tested unless you actually tested it.
- Do not invent reference behavior.
- Do not claim pixel-perfect parity without adequate visual evidence.

STEP 1 — Inspect package.json, App.jsx/css, listing.js, src/components, existing docs.
Check whether the local development server is running. Use existing npm scripts.
Do not install or upgrade dependencies. Run lint and build if practical.

STEP 2 — Open the reference URL and http://localhost:5173 in a browser tool if available,
same desktop viewport. Wait for load. If the reference is inaccessible, report that.

STEP 3 — Compare listing page, Photo Tour, and Lightbox (layout, type, color, reservation
card, location, footer, motion, missing/extra content).

STEP 4 — Test observable behavior (galleries, keyboard, focus, Save/Share, dates, guests,
pricing, description). Separate browser-tested, source-code, not tested, and blocked.

STEP 5 — Fill a findings table with IDs VIS-01…VIS-10, PHOTO-01/02, LIGHT-01/02, A11Y-01
using PASS / FAIL / NEEDS IMPROVEMENT / NOT TESTED / BLOCKED.

STEP 6 — Audit only. Do not modify application code. Decision: COMPLETE / NEEDS CORRECTION /
PARTIALLY COMPLETE / MORE VERIFICATION REQUIRED.
```

**Recorded result (historical evidence from that conversation, 2026-09-18):**

- Decision: **MORE VERIFICATION REQUIRED**
- Reference site: **blocked** (HTTP 429 / Vercel bot verification)
- No browser tool screenshots in that session
- Local lint/build reported as passing in that session (historical; not re-certified here)
- Findings such as map placeholder copy and Unsplash-only images **may not match current `src/`** (later commits added a maps embed, Design Cafe image URLs, `ListingStickyNav`, and more)

A follow-up in the same conversation asked only whether the agent could open the reference URL. That is a **capability check**, not a third development prompt.

### Additional prompt B — Documentation and AI-development workflow

| Field | Value |
| --- | --- |
| Date | Sunday, 20 Sep 2026 |
| Source | Current documentation task (same requirements were also sent in conversation `66146327` later the same day) |
| Kind | **Verified historical information** (this assignment) |
| App source | Must not be modified |

**Prompt (requirements, condensed but not invented):**

```text
Inspect the repository, documentation, architecture, Cursor/agent/skill/rule config,
screenshots, audits, git history, and prompt docs before changing anything.

Organize and complete documentation and the AI-development workflow without inventing
information or changing application functionality.

Create or update where appropriate:
- README.md
- docs/ai-development/README.md
- docs/ai-development/prompts.md
- docs/ai-development/workflow.md
- docs/audits/visual-comparison.md

Preserve useful existing information. Document purpose, stack from the actual repo,
install/run, scripts, AI workflow, prompt process, screenshot comparison, testing,
limitations, and architecture references.

The first eight development prompts are already documented. If only two additional
prompts are available, document only those two. Do not fabricate prompts or results.

Fix filename problems such as architecture-digram / ai-native-workflow/.md if present.
Do not claim proposed architecture is implemented. Do not invent tests or tools.
```

**Result of this prompt:** this documentation set. Application source was not part of the allowed change set.

---

## Prompts that were not documented as extra phases

| Candidate | Why it is not listed as an extra development prompt |
| --- | --- |
| Phase 9 prompt | Output files exist; **prompt text not found** |
| Phase 10 / 11 | **No files, git messages, or indexed conversations** |
| Browser-access-only follow-up (18 Sep 2026) | Nested under Phase 12, not a product phase |
| Git commits `2f06293`, `cda1c6b`, `2bd253e` | Feature updates; **no stored prompt text** |

---

## Current recommendation

When adding a future prompt to this file:

1. Store the prompt in git (this file or a new `09-….md`).
2. Label evidence.
3. Do not skip numbers if a phase was never run; say it is missing instead.
4. After UI changes, update architecture notes rather than implying Phase 3–8 file trees are still exact.
