# AI development workflow

**Status:** Current recommendation for work on this repository, grounded in existing Phase 9 notes and how the project is actually structured.

This file does **not** replace [`../architecture/ai-native-workflow.md`](../architecture/ai-native-workflow.md). That document is the Phase 9 historical methodology. This file is the shorter operator guide. If they ever conflict, **prefer current source** over either document.

## 1. Principles (keep)

From the Phase 9 notes, still useful:

1. Source code is the authority for what the app does.
2. Claims need evidence (files, command output, screenshots, or browser checks).
3. Change in small, reviewable steps.
4. Accessibility is designed in (semantics, keyboard, focus), then verified in a browser.
5. Lint/build success is not visual or runtime proof.
6. AI output is a proposal until reviewed and, where needed, executed.
7. Do not invent files, tests, prompts, or tools.
8. Label verification: source, local CLI, historical, browser, or not verified.
9. Documentation-only work must not change application source unless the task explicitly includes that.

## 2. Practical loop

```text
Objective → Collect source → Prompt → AI proposal → Human review
    → Implement (if in scope) → lint/build/dev → Browser / screenshots
    → Record evidence and remaining work
```

1. **Objective.** One phase or bug; list what is out of scope.
2. **Source collection.** Open the actual `src/` files. Do not rely only on phase 01–08 write-ups; the app has changed since those docs (for example `ListingStickyNav.jsx` and extra sections in `App.jsx`).
3. **Prompt.** Include file scope, constraints (“do not add dependencies”, “do not copy the reference”), and required output shape.
4. **Review.** Check invented components, extra packages, and verification claims.
5. **Local commands.** Use only scripts in `package.json`: `npm run lint`, `npm run build`, `npm run dev`, `npm run preview`.
6. **Browser.** Confirm layout, overlays, keyboard, and focus. Dev server port may be `5173` or the next free port.
7. **Screenshots.** Follow [`../audits/visual-comparison.md`](../audits/visual-comparison.md). Numbered `01.png` files are **not** guaranteed to show the same section on reference vs implementation.
8. **Document.** Update the relevant `docs/` file. Label pending items. Do not close a phase as fully verified without evidence.

## 3. Prompt-driven process

Documented phase prompts live in this folder (`01`–`08`) and in [`prompts.md`](./prompts.md).

**Current recommendation** for a new prompt:

- Name the phase or task.
- Point at the reference URL as visual/behavior target only (no copying source).
- Paste or attach current files; do not assume the model already inspected disk.
- Forbid unrelated refactors, new dependencies, and fabricated test results.
- Ask for complete file contents when the engineer will paste locally.
- Require a remaining-work list.

**Pending:** There is no checked-in prompt template file besides these docs.

## 4. Screenshot-based visual comparison

1. Capture the reference and local app at a similar desktop width and 100% zoom.
2. Store files under `screenshots/reference/` and `screenshots/implementation/`.
3. Prefer **same-section** names (`amenities.png`, `lightbox.png`) over assuming `04.png` pairs with `04.png`.
4. Record observations as PASS / FAIL / NEEDS IMPROVEMENT / NOT TESTED / BLOCKED.
5. Do not claim pixel parity without side-by-side evidence.

Existing captures were added in git commit `9ccbf93` (2026-09-20). They are historical visual evidence, not a completed formal audit.

## 5. Testing and verification

| Check | How | Status in repo |
| --- | --- | --- |
| Lint | `npm run lint` | Script exists; re-run on the current tree |
| Production build | `npm run build` | Script exists; re-run on the current tree |
| Dev server | `npm run dev` | Script exists |
| Preview | `npm run preview` | Script exists |
| Unit / E2E / visual CI | — | **Not present** |
| Browser / a11y | Manual | Required; not replaced by docs |
| Reference site | Browser | Has been blocked (HTTP 429 / bot check) in recorded sessions |

Phase documents contain some historical command output. Treat that as **historical evidence**.

## 6. Architecture references

| Document | Use |
| --- | --- |
| [`../architecture/system-architecture.md`](../architecture/system-architecture.md) | Component/state notes; read the 2026-09-20 maintenance banner first |
| [`../architecture/architecture-diagram-code.puml`](../architecture/architecture-diagram-code.puml) | **Proposed** production marketplace |
| [`../architecture/architecture-diagram.png`](../architecture/architecture-diagram.png) | Rendered proposed diagram |
| [`../architecture/ai-native-workflow.md`](../architecture/ai-native-workflow.md) | Phase 9 principles and verification categories |

Do not describe PostgreSQL, API gateways, or payment providers as implemented. They appear only in the proposed diagram.

## 7. Tooling that is not in this repo

**Source verified (absent):**

- No `.cursor/` project rules
- No Cursor skills or `AGENTS.md`
- No `opencode.json` in the current tree (a 2026-09-18 audit conversation mentioned that filename; it is not in git `HEAD`)

Section 9 of the Phase 9 workflow (planning / implementation / review agents) is **proposed only**.

## 8. Documentation-only tasks

When the objective is documentation (as with organizing this folder):

- Do not modify `src/`, `public/`, or `package.json` unless asked.
- Preserve existing phase files; do not overwrite them to “clean up” history.
- Rename files only when names are wrong, then update links.
- Report inspected files, edits, renames, findings, and blockers.

## 9. Known incomplete areas (documentation)

**Pending / not verified as a complete assignment close-out:**

- Formal current visual comparison table against the live reference
- Formal current accessibility runtime audit
- Architecture document fully rewritten to match post–Phase 9 UI
- Phases 10 and 11: no prompt text found
- Exact Node.js version for contributors
