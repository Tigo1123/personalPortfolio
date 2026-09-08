# Migration report — 8 September 2026

## Original architecture and inspection

The repository was a static, single-document portfolio: `index.html`, `css/style.css`, `js/script.js`, three portrait images, four certificate images, and a two-page PDF resume. Git was on `main` at `62fbbd3` (`my wibsit`), tracking `origin/main`. Only one commit existed, so `git log -5 --oneline` returned one entry.

Before edits, `git status` showed a modified `index.html` and untracked `my_certification/js.png`. The tracked diff added the JavaScript certificate. The HTML, entire stylesheet, entire script, asset file types/dimensions, CV text, certificate images, and Git diff were inspected before migration changes.

## Findings and fixes

- Invalid second body element and nested/duplicate project h3 elements: replaced with valid React DOM and one h1, section h2s, and card h3s.
- Repeated avatar, logo, hover, and certificate CSS; nested avatar selectors targeting nonexistent descendants: replaced with shared tokens and focused styles.
- Theme icon logic checked `.dark-mode` instead of `dark-mode`: replaced with state-driven theme rendering, OS preference, persistence, storage-failure handling, and cross-tab synchronization.
- No main landmark, skip link, named icon controls, active navigation, Escape support, or reduced-motion handling: implemented these behaviors.
- Reveal content could remain invisible if the old script failed: content now remains visible; intersection observation adds a brief entrance animation only.
- Project section lacked a heading; fixed card markup and section hierarchy.
- Academic repository was mislabeled as a demo, project GitHub links pointed to a generic profile, and planner demo was `#`: corrected known repositories and omitted unavailable URLs. The GitHub profile remains available in social links.
- Long About and Contact copy: condensed while retaining learning, collaboration, software quality, full-stack development, AI interest, and career goals.
- Fixed-width portraits, inflexible tag rows, low-contrast status styles, and cropped certificates: replaced with responsive grids, wrapping controls, tested theme colors, and contained certificate previews.
- Incorrect Python/frontend image alt text: replaced with certificate-specific titles and issuers read from the supplied images.

## Preservation

`migration/original/` is a byte-preserving copy of the entire static site, including the uncommitted certificate change and image. The original diff and Git status are stored alongside it. Original images, certificates, and the CV remain at their original paths; all eight asset checksum checks pass. Generated copies are published through Vite without renaming the CV. No Git reset, clean, checkout, commit, or push was performed.

## New architecture and file inventory

- **Created:** root `package.json`, `package-lock.json`, `.gitignore`, `.prettierignore`, `vite.config.js`, `eslint.config.js`, `playwright.config.js`, and `README.md`.
- **Created:** `src/main.jsx`, `src/App.jsx`; `src/components/{Navbar,MobileMenu,ThemeToggle,Icon,SectionHeading,SocialLinks,SkillCard,ProjectCard,CertificateCard,Footer}.jsx`; seven files under `src/sections/`; four data files under `src/data/`; three hooks under `src/hooks/`; `src/styles/{global,components}.css`.
- **Created:** `scripts/sync-assets.js`, `public/favicon.svg`, `tests/portfolio.spec.js`.
- **Created:** `server/package.json`, `server/package-lock.json`, `server/.env.example`, `server/src/{app,server}.js`, `server/src/routes/health.js`, `server/src/controllers/health.js`, `server/src/middleware/errors.js`, and `server/test/app.test.js`.
- **Created:** migration snapshot, original diff/status, checksums, and this report. Generated asset copies, dependencies, production output, and browser artifacts are ignored by Git.
- **Modified:** `index.html` is now the Vite entry with metadata, favicon, early theme selection, and a noscript resume/contact fallback. The uncommitted JavaScript certificate content is preserved in React data and the snapshot.
- **Removed from the active site:** `css/style.css` and `js/script.js`, superseded by React hooks/components and clean CSS. Exact originals remain under `migration/original/`.
- **Assets removed or modified:** none.

Frontend runtime dependencies are React and React DOM. Development dependencies are Vite, its React plugin, ESLint and its JS config, globals, React Hooks/Refresh lint plugins, Prettier, Playwright, and axe Playwright. Backend dependencies are Express, CORS, and dotenv; its tests use Node’s built-in test runner.

## UX, accessibility, and responsiveness

The site uses a slate/teal palette, distinct light and dark surfaces, system typography without external font requests, spacious numbered sections, the original portraits, restrained CSS project placeholders, technology badges, full-resolution certificate links, and clear resume actions. No invented projects, employment, or measured skill ratings were added. Education, location, and additional technologies come from the supplied CV; certificate issuers come from the images.

Navigation is sticky with active-section indication, named SVG controls, an inert closed mobile menu, Escape and selection closing, focus return after Escape, focus transfer after selection, outside-click closing, and desktop-resize handling. Focus rings, semantic landmarks, reduced-motion support, meaningful alt text, image dimensions, and lazy loading below the fold are included. Cards, tags, buttons, and layout columns respond to available width.

## Validation evidence

- `npm install` in root and `server/`: installed successfully; audits reported zero vulnerabilities. Root installation required a network-enabled retry; the stalled sandbox attempt was stopped.
- `npm run lint`: passed, including after upgrading to supported ESLint 10. `npm run format` applied consistent formatting and `npm run format:check` passed.
- `npm run build`: passed; Vite transformed 54 modules. Production JavaScript is approximately 211.56 kB (66.35 kB gzip); CSS 10.59 kB (3.16 kB gzip).
- `cd server && npm test`: passed health JSON/status, allowed and disallowed CORS origins, absence of the Express signature header, JSON 404, and malformed JSON handling. A sandbox socket restriction required rerunning with permission to bind a local port.
- `cd server && npm start`, then `curl -fsS http://127.0.0.1:3001/api/health`: returned `{"status":"ok"}`.
- `npm run dev -- --host 127.0.0.1 --port 5173 --strictPort`, then `curl -fsS http://127.0.0.1:5173/api/health`: returned `{"status":"ok"}` through Vite’s development proxy.
- `PLAYWRIGHT_CHANNEL=chrome npm run test:browser`: **8 tests passed** in the final full run; production-browser suite covers six widths (320, 375, 430, 768, 1024, 1440px) in light and dark themes; horizontal overflow, console/page errors, axe checks, saved/OS themes, reduced motion, mobile keyboard navigation, active links, resizing, asset responses/MIME types, download attribute, and social URL targets.
- Browser-test development found two test-harness issues: a changing accessible button label required a stable control selector; Playwright’s automatic scroll-into-view on the sticky button required a pointer click at the visible control’s coordinates. The focused navigation check then passed.
- `sha256sum -c migration/asset-checksums.txt`: all eight original files passed.
- External HTTP checks: GitHub profile, Academic System repository, Guess My Number repository, and game demo each returned 200. LinkedIn returned 999, so availability could not be confirmed. Email link syntax/target was checked; no email was sent.
- Desktop/mobile, light/dark full-page screenshots were generated and visually reviewed. Test artifacts are generated under ignored `test-results/`.

## Limitations and next phase

Automated axe results do not replace human screen-reader testing. Browser execution used installed Chrome, not Safari or Firefox. The supplied PDF is preserved unchanged; extracted text suggests some existing layout clipping, which can be reviewed in a future resume edit. Student Planner has no known repository/demo URL, so no fake project actions are shown. Project visuals are intentional placeholders until real screenshots are supplied. Third-party credential destinations have not been independently verified; certificate images are the primary local evidence. LinkedIn requires manual confirmation.

The app is client-rendered. Before public deployment, configure the real domain’s absolute Open Graph image, canonical URL, and hosting settings; no deployment was requested or performed. The backend is intentionally limited to a health endpoint and error/CORS infrastructure.

Recommended next phase: add authentic screenshots and short case studies to the existing projects, confirm the Student Planner URL and LinkedIn profile, review CV layout, then configure the chosen hosting domain and deploy. Do not add a CMS, authentication, or a database without a concrete need.

## Final Git state

Branch remains `main`; no changes are staged or committed. `index.html` is modified. `css/style.css` and `js/script.js` are deleted from the active source tree, with originals safely archived. New files/directories are `.gitignore`, `.prettierignore`, `README.md`, `eslint.config.js`, `migration/`, `package.json`, `package-lock.json`, `playwright.config.js`, `public/` (favicon only tracked candidate), `scripts/`, `server/`, `src/`, `tests/`, and `vite.config.js`. The previously untracked `my_certification/js.png` remains untracked and unchanged. `git diff --check` passed. Temporary frontend/backend validation servers were stopped.
