# PlayPower Airbnb-style listing clone

Desktop-focused single-page React application that recreates an Airbnb-style **property listing page** for a PlayPower Labs take-home assignment.

The listing is original frontend work. The visual and behavioral target documented in the project is the reference site `https://airbnb-clone-umber-two.vercel.app`. That URL is a target only; this repository does not include copied reference source.

## What this project is

**Source-verified from the current tree:**

- A Vite + React SPA whose UI is composed in `src/App.jsx`
- Listing content stored in `src/data/listing.js` (static JavaScript; no backend)
- Photo Tour and Lightbox overlays, reservation-card interactions, amenities modal, sticky listing nav, and related listing sections in `src/components/` and `src/App.jsx`

**Not present in the current source:**

- Backend, database, authentication, payments, or booking APIs
- React Router or another client-side router
- Automated unit, E2E, or visual-regression test suites (`package.json` has no test script)

## Technology stack

Declared in `package.json` (ranges, not a claim about a specific install on your machine):

| Area | Package / choice |
| --- | --- |
| UI | `react` `^19.2.8`, `react-dom` `^19.2.8` |
| Bundler | `vite` `^8.3.0` with `@vitejs/plugin-react` `^6.1.1` |
| Language | JavaScript (JSX) |
| Lint | `eslint` `^10.10.0` plus `@eslint/js`, `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh` |
| Styles | Plain CSS (`src/index.css`, `src/App.css`) |
| Data | Static module `src/data/listing.js` |

A previous architecture document listed older dependency ranges. Prefer this table and `package.json` over older docs.

## Requirements

- Node.js and npm (exact Node version is **not** specified in the repository)
- Network access to load remote listing images and the Google Maps embed used in `src/App.jsx`

## Install and run

```bash
npm install
npm run dev
```

Vite prints a local URL (commonly `http://localhost:5173/`). If that port is already in use, Vite may bind the next port (this has been observed as `http://localhost:5174/` in local terminals).

Production preview:

```bash
npm run build
npm run preview
```

## Available scripts

From `package.json`:

| Script | Command | Purpose |
| --- | --- | --- |
| `dev` | `vite` | Development server with HMR |
| `build` | `vite build` | Production bundle |
| `lint` | `eslint .` | Lint the project |
| `preview` | `vite preview` | Serve the production build locally |

There is no `test` script.

## Project layout

```text
src/
  App.jsx                 Page composition and overlay state
  App.css                 Application styles
  index.css               Global baseline
  main.jsx                React entry
  data/listing.js         Static listing content
  components/             UI components (see source)
docs/
  ai-development/         Prompt history and AI workflow
  architecture/           Architecture notes and proposed production diagram
  audits/                 Visual comparison notes
screenshots/
  reference/              Captures of the reference listing
  implementation/         Captures of this app
```

## Documentation

| Topic | Location |
| --- | --- |
| AI workflow (operator guide) | [`docs/ai-development/README.md`](docs/ai-development/README.md) |
| Prompt history | [`docs/ai-development/prompts.md`](docs/ai-development/prompts.md) |
| Prompt-driven process | [`docs/ai-development/workflow.md`](docs/ai-development/workflow.md) |
| Screenshot comparison | [`docs/audits/visual-comparison.md`](docs/audits/visual-comparison.md) |
| Implemented vs proposed architecture | [`docs/architecture/system-architecture.md`](docs/architecture/system-architecture.md) |
| Phase 9 workflow notes | [`docs/architecture/ai-native-workflow.md`](docs/architecture/ai-native-workflow.md) |
| Proposed production diagram (PlantUML) | [`docs/architecture/architecture-diagram-code.puml`](docs/architecture/architecture-diagram-code.puml) |
| Proposed production diagram (PNG) | [`docs/architecture/architecture-diagram.png`](docs/architecture/architecture-diagram.png) |

The PlantUML/PNG files describe a **proposed** marketplace with APIs, databases, and external services. They are **not** a picture of the current SPA.

## AI-assisted development

Work on this assignment was driven by numbered phase prompts (01–08 in `docs/ai-development/`) plus later recorded prompts documented in [`docs/ai-development/prompts.md`](docs/ai-development/prompts.md).

This repository does **not** contain Cursor rules, agent skills, or `.cursor/` project configuration. Multi-agent “skills” described in the Phase 9 architecture notes are **proposed**, not implemented here.

## Testing and verification

**Recommended local checks (commands exist):**

- `npm run lint`
- `npm run build`
- `npm run dev` and manual browser review

**Not established by the current source:**

- Automated tests
- Pixel-perfect parity with the reference
- A complete, current browser/accessibility audit checked into `docs/`

Historical lint/build output appears in some phase documents. Those results are **historical records**, not a substitute for running the commands on the current tree. Informal pass/fail notes previously stored in `docs/ai-development/README.md` are preserved in the visual comparison document and are **user notes**, not an automated test report.

## Known limitations

- All listing data is static. Reserve, Save, Share, dates, and similar controls do not persist or call an API.
- Images and the map depend on third-party URLs.
- Header/footer “links” are largely in-page or demo feedback, not a multi-page product.
- Desktop listing is the focus; a dedicated mobile redesign is not claimed as complete.
- Architecture docs from September 2026 lag some later source changes (sticky nav, amenities modal, maps embed, extra sections in `App.jsx`). See the maintenance note in the system architecture document.

## License / assignment note

The original Vite README template was replaced by this project README. The app remains a frontend demo for assignment review, not a production booking product.
