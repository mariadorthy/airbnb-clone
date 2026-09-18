# AI-Native Workflow Documentation

## 1. AI-Native Principles

The engineering workflow for this project follows nine core principles designed to maintain architectural integrity, code quality, and factual precision when collaborating with AI tools.

1.  **Source-of-Truth Discipline:** The supplied source code is the sole authority for system state and implementation claims.
2.  **Evidence-First Development:** Claims of system functionality require direct verification (e.g., static inspection, build outputs, test logs).
3.  **Small, Scoped Changes:** Modifications must occur in small, incremental steps to enable precise code review and minimize unintended side effects.
4.  **Accessibility Awareness:** Keyboard listeners, semantic tags, ARIA attributes, and focus management structures are built intentionally during implementation.
5.  **Visual & Runtime Boundaries:** Acknowledge that successful compilation and build passes do not replace visual rendering validation or browser runtime testing.
6.  **Proposal vs. Implementation Distinction:** AI suggestions, code review comments, and refactoring proposals remain proposals until integrated into the codebase and verified.
7.  **No Fabricated Claims:** Never state that files were created, tests were executed, or bugs were fixed without direct, verifiable proof.
8.  **Explicit Verification Labeling:** All statements regarding behavior must be explicitly categorized (*Source Verified*, *Locally Verified*, *Historical Evidence*, *Browser Verified*, or *Not Verified*).
9.  **Phase Boundary Discipline:** Non-implementation phases (such as Phase 9 Architecture Documentation) strictly prohibit application code modifications, refactoring, or dependency changes.

---

## 2. Development Workflow

The software lifecycle follows a ten-stage iterative workflow governing developer and AI collaboration:


```

[1. Objective] ──► [2. Source Collection] ──► [3. AI Prompt] ──► [4. AI Response]
│
[8. Evidence Review] ◄── [7. Browser Verification] ◄── [6. Local Testing] ◄── [5. Human Review]
│
▼
[9. Phase Status] ──► [10. Documentation]

```

1.  **Objective:** Define the explicit goal, scope constraints, and acceptance criteria for the step.
2.  **Source Collection:** Gather relevant source files (`.jsx`, `.css`, `.json`) to establish current code state as primary context.
3.  **AI Prompt:** Construct a targeted prompt specifying context, file scope, exact task, negative constraints, and output constraints.
4.  **AI Response:** The AI generates a proposal, code block, or documentation content based strictly on supplied inputs. AI output is a proposal until verified against source and execution evidence.
5.  **Human Review:** The engineer evaluates the AI output against source code, architectural patterns, and safety constraints.
6.  **Implementation & Local Testing:** Integrate changes and execute CLI checks (`npm run lint`, `npm run build`, `npm run dev`).
7.  **Browser Verification:** Validate UI layout, browser rendering, modal focus traps, keyboard handling, and interaction behavior in an actual browser engine.
8.  **Evidence Review:** Cross-examine execution results against acceptance criteria and record verification limits.
9.  **Phase Status:** Update logs to capture phase completion boundaries and remaining tasks.
10. **Documentation:** Update architectural documents and workflow records to reflect verified code state.

---

## 3. Phase 0–8 Historical Summary

Historical phase records capture project evolution prior to Phase 9. These records summarize audits and development focus areas; they do not constitute live browser verification for current runtime behavior:

*   **Phase 0 — Project Setup & Assessment:** Assignment evaluation and repository initialization.
*   **Phase 1 — Structural & Accessibility Analysis:** Reference structure, visual hierarchy, interaction patterns, and baseline accessibility analysis.
*   **Phase 2 — Project Infrastructure Setup:** React 19 and Vite setup, ESLint configuration, and CSS file structure initialization.
*   **Phase 3 — Listing Structure & Static Data Layer:** Centralized static listing data in `src/data/listing.js`.
*   **Phase 4 — Desktop Layout & Styling:** Desktop grid container, sticky reservation sidebar, header navigation, and image grid styling in `App.css`.
*   **Phase 5 — Interactive Logic Implementation:** Stateful logic for Save toggling, Share actions with clipboard fallback, guest counter bounds, date-based price calculation, and expandable text sections.
*   **Phase 6 — Photo Tour Overlay Implementation:** Full-screen `PhotoTour.jsx` modal overlay rendering photo grid and header controls.
*   **Phase 7 — Lightbox Overlay Implementation:** `Lightbox.jsx` single-image viewer with keyboard event listeners and navigation buttons.
*   **Phase 8 — Interaction & Accessibility Audit:** Audited nested `Escape` key handling, focus restoration targets in `App.jsx`, keyboard focus trapping in modal overlays, and CSS layout behavior.

*Note: Historical records document project progression and findings. Live browser execution and visual rendering remain Browser Unverified for the current state.*

---

## 4. AI Prompt Methodology

To ensure precise output and prevent unintended modifications, prompts provided to AI collaborators follow structured patterns:

*   **Explicit Context Scope:** Provide the exact content of target source files within the prompt.
*   **Negative Constraints:** Clearly define forbidden actions (e.g., "Do not modify application code", "Do not add dependencies").
*   **Accessibility Criteria:** Expressly request ARIA attributes (`aria-modal`, `aria-expanded`), semantic tags, and keyboard listeners where applicable.
*   **Output Specifications:** Require responses in explicit formats (e.g., specific file blocks, exact table structures) without conversational fluff.

---

## 5. AI Response Review

Human engineers review AI responses using an explicit verification checklist:

1.  **Source Consistency Check:** Does the output accurately reflect existing source code without inventing components, hooks, or state?
2.  **Dependency Guard:** Were any unauthorized packages introduced in code blocks or configuration?
3.  **Scope Verification:** Did the AI limit modifications strictly to requested files?
4.  **Accessibility Audit:** Are semantic tags, ARIA roles, and keyboard listeners correctly structured?
5.  **Claim Verification:** Are code suggestions correctly labeled as proposals rather than verified runtime facts?

---

## 6. Verification Discipline

All technical statements in project documentation are categorized into five distinct verification levels:

| Category | Definition | Context / Proof Source |
| :--- | :--- | :--- |
| **Source Verified** | Confirmed through static inspection of supplied source code. | Verified component imports in `src/App.jsx`. |
| **Locally Verified** | Confirmed via local CLI command executions. | `npm run lint` PASSED without errors. |
| **Historical Evidence**| Recorded in historical phase logs and task documentation. | Phase 8 interaction audit logs. |
| **Browser Verified** | Confirmed via runtime testing in a live browser engine. | Requires active browser runtime testing. |
| **Not Verified** | Unconfirmed behavior lacking automated or runtime proof. | Visual pixel alignment against reference screenshots. |

---

## 7. Accessibility Workflow

Accessibility verification requires distinguishing between static code structure and runtime browser verification:

### Source / Code Review (Static Inspection)
*   Confirm semantic elements (`<header>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`).
*   Confirm modal dialog attributes (`role="dialog"`, `aria-modal="true"`, `aria-labelledby`).
*   Confirm interactive control state labels (`aria-expanded`, `aria-pressed`).
*   Confirm keydown event listeners handling `Escape`, `Tab`, `ArrowLeft`, and `ArrowRight`.

### Browser Verification (Runtime Testing Required)
*   **Screen Reader Testing:** Verify DOM order and dynamic updates via screen readers (e.g., VoiceOver, NVDA).
*   **Focus Ring Visibility:** Verify focus indicator visibility (`:focus-visible`) across all interactive controls.
*   **Runtime Focus Trapping:** Confirm keyboard focus cannot escape active modal overlays into the background document.
*   **Focus Restoration:** Confirm closing a modal overlay restores DOM focus to the exact trigger element in a live browser.

---

## 8. Change-Control Workflow

*Illustrative Workflow Example — Not a factual historical log*

| File | Issue / Focus Area | Proposed Change | Reason | Scope | Risk | Verification | Preserved Behavior |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `src/App.jsx` | Focus Restoration Target | Store trigger element references in `photoTourTriggerRef` and `lightboxTriggerRef`. | Preserve trigger focus when closing overlays. | Component state & ref handlers in `App.jsx`. | Low | `npm run lint`, `npm run build` | Modal open/close state logic preserved. |
| `src/components/PhotoTour.jsx` | Key Handling Precedence | Evaluate `isLightboxOpen` inside `PhotoTour` keydown handler. | Prevent event conflicts when Lightbox overlaps Photo Tour. | Keydown event effect in `PhotoTour.jsx`. | Low | `npm run lint`, `npm run build` | Photo Tour modal grid rendering preserved. |

---

## 9. AI Sub-Agent / Skill Workflow

*PROPOSED WORKFLOW — NOT IMPLEMENTED AS EXECUTABLE AGENTS*

In an automated multi-agent architecture, specialized sub-agents perform distinct workflow roles:


```

[ Planning Agent ]
│
▼
[ Implementation Agent ]
│
▼
[ Code Review Agent ]
│
▼
[ Accessibility Agent ]
│
▼
[ Visual QA Agent ]
│
▼
[ Verification Agent ]

```

*   **Planning Agent:** Evaluates project requirements and defines scoped work packages.
*   **Implementation Agent:** Generates code changes based on source context and negative constraints.
*   **Code Review Agent:** Audits diffs against syntax guidelines, linter rules, and structural patterns.
*   **Accessibility Agent:** Inspects JSX markup for ARIA semantics, button labels, and focus management.
*   **Visual QA Agent:** Captures browser layout screenshots and assesses visual correctness against design specifications.
*   **Verification Agent:** Runs test suites, records build outputs, and enforces evidence boundaries.

---

## 10. Phase 9 Boundary

Phase 9 produces architecture and AI-native workflow documentation only. No runtime feature changes, application code modifications, refactorings, bug fixes, or dependency updates are part of this phase.

```

---

REVIEW SUMMARY

Source files reviewed:

* `package.json`
* `src/main.jsx`
* `src/App.jsx`
* `src/App.css`
* `src/index.css`
* `src/data/listing.js`
* `src/components/Header.jsx`
* `src/components/ListingHeader.jsx`
* `src/components/ImageGallery.jsx`
* `src/components/PropertySummary.jsx`
* `src/components/Description.jsx`
* `src/components/Amenities.jsx`
* `src/components/ReservationCard.jsx`
* `src/components/PhotoTour.jsx`
* `src/components/Lightbox.jsx`
* `src/components/Footer.jsx`

Current source findings:

* `package.json` specifies Vite dependency range `^6.2.0`, while the CLI build output reports resolved `v8.3.0`.
* `PhotoTour.jsx` receives `isLightboxOpen` as a prop and uses it to conditionally bypass its keydown handler (`if (isLightboxOpen) return;`).
* Component hierarchy, state, refs, and unidirectional data flow strictly verified against `src/App.jsx` and component sources.
* Application entry tree maps directly from `index.html` → `src/main.jsx` → `App.jsx`.

Historical evidence:

* Phases 0 through 8 document historical planning, layout setup, feature implementation, and accessibility/interaction auditing context without serving as live browser proof.

Current verification:

* `npm run lint`: PASS
* `npm run build`: PASS
* `npm run dev`: STARTED
* **Browser:** NOT VERIFIED
* **Accessibility:** NOT VERIFIED
* **Visual comparison:** NOT VERIFIED
* **Mermaid rendering:** NOT VERIFIED

Application files modified:
None.

Dependencies changed:
None.

Assumptions/limitations:

* All listing data is static (`src/data/listing.js`).
* Images rely on external Unsplash URLs.
* No backend service, database, or API integrations exist.
* Live browser rendering, visual fidelity, focus trapping, focus restoration, and screen-reader interactions remain Browser Unverified.