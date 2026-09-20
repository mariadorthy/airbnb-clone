# AI-assisted development

This folder is the maintained index for **prompt-driven development** on `playpower-airbnb-clone`.

## How to use these docs

| File | Role |
| --- | --- |
| [`workflow.md`](./workflow.md) | Current operator guide: inspect source, write scoped prompts, review, verify, document |
| [`prompts.md`](./prompts.md) | Prompt history with evidence labels (do not invent missing phases) |
| [`01`](./01-requirements-and-problem-analysis.md)–[`08`](./08-accessibility-and-interaction-audit.md) | Original phase write-ups (preserved) |
| [`../audits/visual-comparison.md`](../audits/visual-comparison.md) | Screenshot inventory, pairing caveats, informal user notes |
| [`../architecture/system-architecture.md`](../architecture/system-architecture.md) | Architecture notes + proposed vs implemented |
| [`../architecture/ai-native-workflow.md`](../architecture/ai-native-workflow.md) | Phase 9 workflow notes (kept; not duplicated here) |

## Evidence labels used in this project

Use these labels in new documentation. They match the Phase 9 notes and the current workflow guide.

| Label | Meaning |
| --- | --- |
| **Source verified** | Confirmed by reading files in this repository |
| **Existing documentation** | Claim appears in `docs/` (may be stale vs current `src/`) |
| **Historical evidence** | Git history, older phase logs, or a dated conversation record |
| **Current recommendation** | Process advice for future work |
| **Pending** | Not done or not verified |

Do not mark unfinished work complete. Do not claim a library, API, or test result unless the source or a recorded command output shows it.

## What exists in the repo

**Source verified**

- Phase documents `01`–`08` under this directory
- Architecture files under `docs/architecture/`
- Screenshot folders `screenshots/reference/` and `screenshots/implementation/`
- Application source under `src/` (JavaScript/React, Vite)

**Not found in the repository**

- Cursor rules, skills, `AGENTS.md`, or `.cursor/` config
- `docs/ai-development/prompts.md` and `workflow.md` did not exist until the documentation pass that added them
- `docs/audits/` did not exist until that same pass
- Automated test runner or CI config
- Original prompt text for a numbered Phase 10 or Phase 11

## Informal checklist notes

The previous contents of this README were informal pass/fail notes (`app1`, `nav1`, `am2`, `fin4`, and similar). Those notes are **preserved verbatim** in [`../audits/visual-comparison.md`](../audits/visual-comparison.md#informal-user-checklist-notes). They are user observations, not a formal audit table.
