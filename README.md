# Tageldin Gasmalla — Developer Portfolio

A personal portfolio for a Software Engineering student and Full-Stack Developer. React presents projects, skills, certificates, and contact information; a separate Express API provides a small foundation for future features.

## Stack

React 19, Vite 7, JavaScript, CSS, Node.js 22.13+ (22 LTS or 24+), Express 5, CORS, dotenv. ESLint checks code and Prettier formats it; Playwright and axe check browser behavior and accessibility. No database, authentication, or contact form is included.

## Structure

```text
src/
  components/       Navigation, cards, headings, shared UI
  sections/         Hero, About, Skills, Projects, Certificates, Resume, Contact
  data/             Profile links, projects, skills, certificates
  hooks/            Theme, active navigation, scroll reveal
  styles/           Design tokens, global styles, component layouts
  App.jsx           Section composition
  main.jsx          React entry
server/
  src/              Express app and process entry
    routes/         Health route
    controllers/    Health response
    middleware/     JSON errors and 404 handling
  test/             HTTP integration checks
images/             Original profile assets
my_certification/   Original certificate images
files/              Original CV PDF (unchanged)
public/             Favicon and generated asset copies
scripts/            Asset synchronization
migration/          Original site snapshot, original diff, audit, checksums
tests/             Browser regression checks
```

## Run locally

From this project directory:

```bash
npm ci
npm run dev
```

Frontend: http://localhost:5173. In another terminal:

```bash
cd server
npm ci
cp .env.example .env
npm run dev
```

Backend: http://127.0.0.1:3001/api/health → `{"status":"ok"}`. Vite proxies `/api` to this port during development. The portfolio renders independently of the API. Run backend commands from `server/` so dotenv loads its `.env`.

## Commands

| Location | Command                | Purpose                                      |
| -------- | ---------------------- | -------------------------------------------- |
| Root     | `npm run dev`          | Sync assets and start Vite                   |
| Root     | `npm run lint`         | Lint frontend, backend, and test code        |
| Root     | `npm run build`        | Sync original assets and build `dist/`       |
| Root     | `npm run preview`      | Preview the production build locally         |
| Root     | `npm run assets`       | Refresh public copies after asset edits      |
| Root     | `npm run test:browser` | Test a built frontend in Chromium            |
| server   | `npm run dev`          | Start API with Node watch mode               |
| server   | `npm start`            | Start API without watch mode                 |
| server   | `npm test`             | Health, CORS, 404, and JSON validation tests |

Before browser tests, run `npm run build` and `npx playwright install chromium`. If Chrome is already installed, use `PLAYWRIGHT_CHANNEL=chrome npm run test:browser`. Tests cover 320, 375, 430, 768, 1024, and 1440px, both themes, keyboard navigation, local assets, and axe accessibility checks.

Formatting commands: `npm run format` applies formatting; `npm run format:check` verifies it without editing files.

## Update content

Edit `src/data/projects.js`, `skills.js`, or `certificates.js`. Projects follow the explicit order in the data array. `featured` enables the badge and up to four highlights; `shortTitle` labels the preview frame, and a known `year` appears beside the category. Leave unavailable URLs and screenshot images as `null`; only verified demo URLs belong in the public list.

Place authentic screenshots in `public/projects/`, preferably 1600 × 900 WebP (16:9). Set `image: "/projects/clinic-management.webp"` after the file exists; the component resolves Vite’s base path. See [screenshot guidance](public/projects/README.md) and [project evidence/deployment fixes](docs/PROJECTS.md).

Keep original assets in `images/`, `my_certification/`, and `files/`. The build copies them to ignored `public/` directories, preserving their original URL paths and exact bytes. Do not edit generated copies. The CV remains `files/Tageldin_Gasmalla_Modern_CV.pdf`.

## Deployment

Deploy only `dist/` to a static host after `npm ci && npm run build`. Do not publish the repository root or migration snapshot. For a GitHub Pages project site, build with `VITE_BASE_PATH=/personalPortfolio/ npm run build`; asset helpers and the HTML base placeholders support a subdirectory. No routing rewrite is needed for this single-page, hash-navigation site.

Deploy the API separately using Node 22.13+ (22 LTS or 24+) with `cd server && npm ci --omit=dev && npm start`. Configure `NODE_ENV=production`, `HOST=0.0.0.0` where required by the host, `PORT`, and comma-separated `CORS_ORIGINS` with the exact frontend origin(s), without trailing slashes. CORS is an origin policy, not authentication. Use the hosting platform’s HTTPS termination and process supervision. `/api/health` can be used for health monitoring.

Vite’s development proxy does not apply to production or preview. If future frontend features call `/api`, configure the deployment host to reverse-proxy that path to the API. No production localhost URL is embedded in React components.

Before publication, set an absolute `og:image` URL and add `og:url`/canonical metadata for the chosen public domain. The current relative Open Graph image is a local fallback; a real domain has not been assumed. Verify external profiles and project visibility manually.

## Migration safety

`migration/original/` preserves the full pre-migration static site, including the uncommitted JavaScript certificate addition. `migration/pre-migration.patch` records the original tracked diff; `migration/asset-checksums.txt` proves asset preservation. No commits, resets, or pushes were performed. See `migration/REPORT.md` for findings and validation evidence.
