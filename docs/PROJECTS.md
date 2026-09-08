# Project curation and deployment review

Inspected on 8 September 2026. The existing React/Vite/Express migration was retained. No Git staging, commits, pushes, external repository edits, or hosting changes were performed.

## Before this phase

Order: Academic System (featured), Guess My Number, Student Planner. Academic used a real repository but an inaccurate React stack. Guess My Number linked to GitHub Pages without checking that the game actually rendered. Student Planner had an old vanilla-JavaScript description and no repository/demo links. Cards had optional image support but no safe new-tab attributes or featured highlights.

`main` already contained the uncommitted migration. Those changes and all original assets were retained. Copies of the six files about to be edited were saved under `/tmp/portfolio-projects-before/` for this session.

## Final public list

| Order | Project                             | Category / status                           | Repository                                  | Live demo                                    |
| ----- | ----------------------------------- | ------------------------------------------- | ------------------------------------------- | -------------------------------------------- |
| 1     | Clinic Management System · featured | Full-Stack Application / Active Development | https://github.com/Tigo1123/clinic_         | https://clinic-staging-web.onrender.com/     |
| 2     | Student Planner · featured          | Full-Stack Application / Active Development | https://github.com/Tigo1123/student-planner | https://student-planner-web-v2.onrender.com/ |
| 3     | Guess My Number                     | Frontend / Completed                        | https://github.com/Tigo1123/Guess-My-Number | https://guess-my-number-elg5.onrender.com/   |
| 4     | Academic System                     | Full-Stack Application / Prototype          | https://github.com/Tigo1123/academic-system | No verified public demo                      |

The three live URLs above are the current verified public demos. Academic System has no verified public demo.

Four cards are easy to scan in two desktop columns, so filters were not added. Order is explicitly curated in the data array, not alphabetical. Only the first two display featured badges/highlights. No new runtime dependencies were added.

## Source evidence and truthful scope

- **Clinic:** local `../clinic_` at `89aabc2`; public `main` at `cd94c30`. README and frontend/backend package files confirm React, Vite, Node.js, Express, Prisma, PostgreSQL. Prisma schema and `backend/src/routes/{appointments,records,pharmacy,billing,auth}.js` confirm patient/appointment flow, consultations, lab orders/results, prescriptions/dispensing, inventory, billing, and role checks. Middleware verifies access tokens and roles. The card describes security-related mechanisms, not a security certification, real clinical deployment, or production-readiness guarantee. Local work is newer than public main; core stack/workflows are represented rather than local-only backup changes.
- **Student Planner:** local `../student  planner` at `4c749f2`, origin `Tigo1123/student-planner`; public main `c3fada1`. Local and public frontend/API READMEs agree: React calendar/tasks/events, authenticated Express API, Prisma/PostgreSQL per-user storage. `PlannerPage.jsx`, API modules, and Prisma models confirm completion, categories, editing, selected-date navigation, today summaries, and upcoming events. Browser persistence is now a legacy import path; the card does not imply localStorage is still the primary data store.
- **Guess My Number:** local `../guess_number` and public main both `07bff0b` (7 September). README, package manifest, React components, game-state/profile hooks, and existing tests show a released React/Vite game with difficulty levels, modes, scores, local profiles, and history. Although the brief described HTML/CSS/JavaScript, the current repository is React-based; all three fundamentals remain in its stack alongside React/Vite. It stays below the two deeper applications. “Completed” refers to the documented v1.0.0 application, not a working deployment.
- **Academic:** public repository exists and contains frontend HTML/CSS/JS portals, Express routes, `mysql2`, and a SQL schema. The README describes student results, administration, lecturer grade entry, and student results/GPA views. Its old React claim was removed. Retained last as an earlier prototype, not featured. No completion year is inferred.
- **Years:** 2026 denotes inspected development/release activity, not an invented start date. Null year is omitted in the UI.

## Projects not added

Local searches covered development directories under `/home/taj/Desktop/mine`, Git repositories up to five levels under `/home/taj`, and project-name searches under Desktop/Documents/Downloads. Public GitHub enumeration returned eight repositories: academic-system, Calculator, clinic_, Guess-My-Number, personalPortfolio, student-planner, tag-barth, and Unimate-AI.

No separate **Laboratory Results Platform** or **FindIt / Lost & Found** source was confidently identified. Clinical lab code inside Clinic and student academic results do not establish a separate Laboratory Results project. These two projects require a repository URL or local directory; no features or team contribution were invented. Unimate-AI and small unrelated repositories were discovered but were not added in this requested curation phase. Private repositories and other accounts may not appear in the public listing.

## Guess My Number: historical GitHub Pages blank-page cause

The old GitHub Pages deployment is not the portfolio demo. The current verified demo is https://guess-my-number-elg5.onrender.com/.

Chrome opened `https://tigo1123.github.io/Guess-My-Number/` and received HTTP 200, the expected React game title, **empty visible body text**, and a failed request to:

```text
https://tigo1123.github.io/src/main.jsx → 404 (text/html)
```

The deployed document references `/src/main.jsx`, exactly like the repository's development `index.html`. It is not the compiled Vite output. The root slash also bypasses `/Guess-My-Number/`. React never loads, so there was no evidence of an application-level exception causing this blank page.

The repository's `vite.config.js` lacks `base`. `.github/workflows/ci.yml` installs, tests, and builds, but never uploads/deploys `dist`. GitHub's public Actions API showed successful CI and “pages build and deployment” runs on `07bff0b`, including [Pages run 34160699593](https://github.com/Tigo1123/Guess-My-Number/actions/runs/34160699593). This points to deployment of raw source rather than the build artifact. It is not evidence of a missing root index, wrong URL casing, or an old commit. The Pages settings/build endpoints returned 404 without authentication, so the exact configured source branch/directory could not be read; they must not be claimed as confirmed.

### Required fix in the Guess-My-Number repository

1. Add `base: '/Guess-My-Number/'` to its existing `defineConfig` object, retaining its React plugin and test configuration.
2. Configure Settings → Pages → Source as **GitHub Actions**.
3. Add a Pages workflow that runs `npm ci`, `npm run test:run`, and `npm run build`; uploads **`./dist`** with `actions/upload-pages-artifact`; then deploys that artifact with `actions/deploy-pages`. Grant `contents: read`, `pages: write`, `id-token: write` and use the `github-pages` environment. Keep verification-only CI or combine it with deployment.
4. Deploy the reviewed changes in that repository. The production HTML must reference `/Guess-My-Number/assets/...js`, never `/src/main.jsx`. Confirm those assets return JavaScript with HTTP 200.
5. In a fresh browser, verify that the game renders, accepts a guess, changes score, resets, and preserves profile/high-score data on reload. These checks apply if the old Pages deployment is repaired; the portfolio uses the verified Render demo.

These are the build/base/artifact steps described in the [official Vite Pages deployment guide](https://vite.dev/guide/static-deploy.html#github-pages). A portfolio edit cannot repair another repository's Pages build. No deployment was attempted, consistent with the no-push instruction.

## Student Planner: Render deployment

The current verified public demo is https://student-planner-web-v2.onrender.com/.

Historical note: https://student-planner-tx84.onrender.com/ is an obsolete deployment and is not used. Earlier checks returned HTTP 404 with no application content.

## Screenshot and data architecture

Clinic Management System, Student Planner, and Guess My Number now use authentic public-page screenshots: `public/projects/clinic-management.webp`, `public/projects/student-planner.webp`, and `public/projects/guess-my-number.webp`. Academic System intentionally retains `image: null` and the fallback visual. `public/projects/README.md` documents the captures and their 1600×900 WebP format. `ProjectVisual` handles the deployment base path, a decorative browser frame, 16:9 containment, lazy loading, and missing-image fallback. No stock imagery or invented application screenshots were created.

Data fields are `id`, `title`, `shortTitle`, `category`, `description`, `technologies`, `status`, `featured`, `image`, `githubUrl`, `liveUrl`, `highlights`, and `year`. Every field has a rendering purpose. Optional team/case-study fields were not added without a project that uses them. Missing URLs produce no link; all project links have project-specific accessible names, external icons, `target="_blank"`, and `rel="noopener noreferrer"`.

## Changed files

Updated `src/data/projects.js`, `src/sections/Projects.jsx`, `src/components/ProjectCard.jsx`, `src/styles/components.css`, `README.md`, and project tests/configuration. Added `src/components/ProjectVisual.jsx`, `public/projects/README.md`, this review, and isolated card-rendering test fixtures. Backend and dependencies were not intentionally modified. No project assets or existing content outside this phase were deleted.

## Validation results

- `npm run lint`: passed (exit 0).
- `npm run format:check`: passed (exit 0).
- `npm run build`: passed (exit 0), 55 modules; JS 214.04 kB / 67.09 kB gzip, CSS 11.43 kB / 3.33 kB gzip.
- `PLAYWRIGHT_CHANNEL=chrome npm run test:browser`: **14 passed in 35.5 seconds** (exit 0). All six viewport widths (320, 375, 430, 768, 1024, 1440) passed in light/dark themes without horizontal overflow, production console/page errors, or axe violations. Project order, featured highlights, safe repository links, missing demos, Projects navigation, OS/persisted themes, optional links, 16:9 image sizing, and broken-image fallback are covered.
- `cd server && npm test`: **1 passed, 0 failed** (exit 0). Unchanged backend health/CORS/404/invalid-JSON checks were run.
- `git diff --check`: passed.
- `sha256sum -c migration/asset-checksums.txt`: all eight original assets passed.
- Full-page desktop dark and mobile light screenshots were visually reviewed. Generated images are under ignored `test-results/`.

External deployment checks were performed manually in Chrome and through HTTP requests, not added as flaky third-party tests. Those earlier deployment findings are superseded by the current verified public demos listed above. Tests use an isolated development-only fixture for optional image/link paths; its existing portrait image is strictly an image-sizing fixture and is never represented as a real project screenshot in the portfolio. The fixture is not included in the production build. Test servers shut down after the suite.

### Exact files changed in this phase

Modified existing working files:

- `src/data/projects.js`
- `src/sections/Projects.jsx`
- `src/components/ProjectCard.jsx`
- `src/styles/components.css`
- `README.md`
- `tests/portfolio.spec.js`
- `playwright.config.js`

Added:

- `src/components/ProjectVisual.jsx`
- `public/projects/README.md`
- `docs/PROJECTS.md`
- `tests/projects.spec.js`
- `tests/fixtures/project-card.html`
- `tests/fixtures/project-card.jsx`

No files were removed in this phase. No dependency manifests, lockfiles, backend source, or original assets were changed intentionally.

### Final Git state

Branch: `main`. Nothing staged or committed. Since the previous migration is still untracked, its React files remain under `?? src/` rather than appearing as tracked modifications. The existing `index.html` modification and legacy CSS/JS deletions predate this phase.

```text
 D css/style.css
 M index.html
 D js/script.js
?? .gitignore
?? .prettierignore
?? README.md
?? docs/
?? eslint.config.js
?? migration/
?? my_certification/js.png
?? package-lock.json
?? package.json
?? playwright.config.js
?? public/
?? scripts/
?? server/
?? src/
?? tests/
?? vite.config.js
```

Next: review this curation. Laboratory Results and FindIt still need source locations before inclusion.
