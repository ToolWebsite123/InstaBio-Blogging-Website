# Instabiogen.online — Technical Audit Report

**Audit date:** 2026-10-25  
**Live site:** https://instabiogen.online/  
**Repository:** https://github.com/ToolWebsite123/InstaBio-Blogging-Website  
**Reviewed branch:** `main` (`56902355755fd7724f57b11ba6c9da1cb947a7b6`)  
**Audit mode:** Read-only inspection. No application code, dependencies, or configuration were changed. This report file is the only requested repository addition.

> **Important scope limitation:** The repository was inspected through GitHub's read-only API and the public website through a text-rendered web fetch. The execution environment could not resolve `github.com` for a local clone, so npm/Node/Git/Lighthouse/curl commands could not be run against a checkout. The public sitemap and robots.txt could not be retrieved by the available website fetcher. Consequently, this is a source/static audit with partial live verification, not a claim that every runtime path or every source line was executed.

## 1. Executive summary

The project is a public Next.js App Router site for Instagram bio ideas and a client-side bio generator. It uses React, TypeScript, Tailwind CSS, MDX posts stored in `content/posts`, and static export. The current tree contains 588 entries, including 30 MDX posts, a large collection of banner images, app routes, React components, utility libraries, and maintenance scripts.

Confirmed configuration facts:
- `next.config.mjs` sets `output: 'export'`, `trailingSlash: false`, and `images.unoptimized: true`.
- `package.json` declares Next.js `^15.5.15`, React `^19`, TypeScript `^5`, Tailwind `^3.4.1`, MDX packages, and a build script that generates sitemap/llms.txt before `next build`.
- The root layout defines site-wide metadata, Open Graph/Twitter metadata, Google site verification, theme provider, navbar/footer and toast notifications.
- Blog posts render MDX from repository-controlled files and emit Article/BreadcrumbList JSON-LD, with conditional FAQPage/HowTo data.
- The repository tree contains no `.env*` files, no `app/api/` route, no `.github/workflows/` entries, and no test/spec files matching the inspected filename pattern. This does not prove there are no secrets in commit history.
- GitHub repository metadata reports public visibility, default branch `main`, branches `main` and `master`, no open issues, and both branches unprotected.

The live homepage text fetch succeeded and showed the main bio-generator landing page and site navigation. The fetcher could not retrieve `/sitemap.xml` or `/robots.txt`, so their deployed response/status/contents remain unverified.

## 2. Findings

### [CSP allows unsafe inline scripts and eval]
- **Severity:** Medium
- **Category:** Security
- **Location:** `public/_headers`, top-level `Content-Security-Policy` header
- **Problem:** The configured policy contains `script-src 'self' 'unsafe-inline' 'unsafe-eval'`. These directives weaken Content Security Policy protections against script injection. The file is present in the repository; whether the current hosting platform actually applies this file was not independently confirmed.
- **Impact:** If an injection flaw is present elsewhere, this policy reduces the browser's ability to block injected inline scripts or eval-based execution.
- **Fix:** First verify which host consumes `public/_headers`. If compatible, remove unsafe directives and use nonces or hashes for scripts that genuinely require inline execution. A stricter starting point (test against the deployed site before rollout) is:
  ```text
  Content-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; img-src 'self' data: https://images.unsplash.com https://api.dicebear.com; connect-src 'self'; frame-ancestors 'none'; object-src 'none'; base-uri 'self'; form-action 'self'
  ```
  Do not deploy this blindly: Next.js output and any third-party scripts may require a nonce/hash or additional explicitly justified source.

### [Static export disables server-side Next.js runtime features]
- **Severity:** Medium
- **Category:** Architecture / Functionality
- **Location:** `next.config.mjs`, `output: 'export'`
- **Problem:** The project is configured to produce a static export. The inspected repository has no `app/api/` route tree. This architecture does not provide a conventional Next.js server runtime for request-time API handlers, server actions, or other dynamic server features.
- **Impact:** Future additions such as server-backed contact submissions, authentication, comments, rate limiting, or database-backed publishing will not work merely by adding client-side UI; they require an external service or a change in hosting/runtime architecture.
- **Fix:** If static hosting is intentional, document that all forms and interactive tools must use client-side processing or a separately hosted API. For a server-backed feature, implement and deploy a separate API/service or reconsider static export before building that feature.

### [All images are configured as unoptimized]
- **Severity:** Medium
- **Category:** Performance
- **Location:** `next.config.mjs`, `images.unoptimized: true`
- **Problem:** Next.js image optimization is disabled globally. The repository contains many local banner images; image delivery therefore depends on the stored assets and hosting/CDN behavior rather than Next.js's built-in image optimizer.
- **Impact:** Oversized images can increase transfer size and delay Largest Contentful Paint, particularly on mobile connections. Actual image bytes and Core Web Vitals were not measured in this environment.
- **Fix:** Measure the largest above-the-fold images and optimize source dimensions/quality to the rendered size; prefer appropriately sized WebP/AVIF assets. If the deployment supports it, use an image optimization service or enable the Next.js image optimization path compatible with the chosen host.

### [The sitemap generator marks every static page as modified today]
- **Severity:** Low
- **Category:** SEO
- **Location:** `scripts/generate-sitemap.js`, `today` and `STATIC_PAGES`
- **Problem:** `today` is generated at build time and assigned as `lastmod` to every static URL regardless of whether that page changed.
- **Impact:** Each build can make search engines see unchanged static URLs as recently modified, reducing the usefulness of sitemap modification dates.
- **Fix:** Use actual page/content modification dates where available, or omit `lastmod` for static pages when a reliable date is not available. Do not set it to the build date solely because a build occurred.

### [Banner insertion script expects a legacy directory and HTML input files]
- **Severity:** Medium
- **Category:** Build tooling / Content operations
- **Location:** `scripts/insert-banner-images.js`, `BANNER_ROOT` declaration and `.filter((f) => f.endsWith(".html"))`
- **Problem:** The script expects its source directory to be `public/All instagram bio` and scans that directory's subfolders for HTML files. The inspected repository tree instead contains banner assets under `public/banner-images/`; no `public/All instagram bio` directory was present in the tracked tree. The script's mapping and HTML-input assumption also differ from the visible WebP asset collection.
- **Impact:** Running the script from a clean checkout may fail with a missing-directory error or find no source files, so the intended MDX banner updates may not happen. It writes to MDX files, so do not run it against the working tree without a backup/diff review.
- **Fix:** Confirm whether legacy HTML source files are stored outside Git. If they are not, either retire the script or deliberately update its input format, folder mapping, and tests to match the intended source assets. Add an explicit existence check before reading:
  ```js
  if (!fs.existsSync(BANNER_ROOT)) {
    throw new Error(`Banner source directory does not exist: ${BANNER_ROOT}`);
  }
  ```
  Test only on a temporary copy and inspect the diff before committing.

### [The README is still the create-next-app starter guide]
- **Severity:** Low
- **Category:** Documentation / Repository health
- **Location:** `README.md`
- **Problem:** The README describes a generic create-next-app project and says to edit `app/page.tsx`; it does not document the actual MDX content workflow, custom scripts, environment requirements, static export/hosting setup, or audit/test commands.
- **Impact:** A maintainer may not know how to add a post, regenerate sitemap/llms.txt, prepare assets, or deploy the site consistently.
- **Fix:** Replace the starter guide with project-specific setup, Node/npm versions, install/dev/build commands, content frontmatter schema, supported MDX components, script descriptions, deployment/headers behavior, and a troubleshooting section.

### [Branches are unprotected]
- **Severity:** Low
- **Category:** GitHub repository health
- **Location:** GitHub branches `main` and `master`
- **Problem:** GitHub's branch listing reports `protected: false` for both branches. No CI workflow files were found in the inspected recursive tree.
- **Impact:** Changes can land without required automated checks or review gates; a broken build can be merged without CI catching it.
- **Fix:** Add a minimal CI workflow that installs from the lockfile and runs type-check/lint/build, then protect `main` with required checks. Keep `master` only if it has a documented purpose; otherwise decide deliberately whether it should be archived/deleted after checking deployment references.

### [The blog archive and post route use different content indexes]
- **Severity:** Medium
- **Category:** Blog / SEO / Functionality
- **Location:** `app/blog/page.tsx` uses `ALL_STORIES` from `lib/constants`; `app/[slug]/page.tsx` uses MDX files through `getAllPosts()`
- **Problem:** The archive is populated from `ALL_STORIES`, while the dynamic post route and sitemap generator use files in `content/posts`. These are separate sources of truth. This audit did not run a full slug-by-slug comparison, so missing/mismatched entries are a risk to verify rather than a confirmed list of broken URLs.
- **Impact:** A post may exist but not appear in the archive, or a story card may point to a slug without a corresponding MDX file.
- **Fix:** Add a validation script that compares every `ALL_STORIES` slug with the MDX filename set and fails the build on missing/duplicate slugs. Ideally derive the archive and post sitemap from one shared post index.

### [The MDX route derives heading IDs with a lossy text conversion]
- **Severity:** Low
- **Category:** Accessibility / Blog UX
- **Location:** `app/[slug]/page.tsx`, `getHeadingText` and `getHeadingSlug`
- **Problem:** Heading IDs are made by converting `children` to a string and replacing punctuation/whitespace. For rich headings with nested React nodes, the resulting text can be incomplete; repeated headings can also produce duplicate IDs. The actual affected posts were not exhaustively rendered.
- **Impact:** Table-of-contents links may fail or point to the wrong heading, and duplicate IDs can make in-page navigation/accessibility less reliable.
- **Fix:** Use a stable slugging utility that recursively extracts text from React nodes or, preferably, generate heading IDs during MDX compilation. Track IDs per document and append a suffix when a slug repeats.

### [The bio generator does not visibly handle clipboard-write failures]
- **Severity:** Low
- **Category:** Functionality / Accessibility
- **Location:** `components/BioGenerator.tsx`, `handleCopyBio`
- **Problem:** The handler awaits `navigator.clipboard.writeText(text)` and then displays a success toast, but the inspected function has no local `try/catch` fallback for rejected clipboard writes. Clipboard access can fail in unsupported contexts or when browser permission/security requirements are not met.
- **Impact:** A copy action can reject without a helpful user-facing explanation or fallback.
- **Fix:** Wrap clipboard access in `try/catch`; on failure, show an error toast and provide a selectable text field or manual-copy fallback. Confirm the full handler and caller behavior during runtime testing.

### [The sitemap and robots.txt were not verifiable from the live fetch]
- **Severity:** Medium
- **Category:** SEO / Deployment
- **Location:** `https://instabiogen.online/sitemap.xml`, `https://instabiogen.online/robots.txt`
- **Problem:** The available live-page fetcher failed to retrieve the sitemap and could not access robots.txt. The repository includes `public/robots.txt` and a sitemap generation script, but that does not prove the deployed responses are correct or current.
- **Impact:** If either file is missing, stale, or served with an error, crawling and sitemap discovery may be affected.
- **Fix:** From a networked shell, run:
  ```bash
  curl -sS -D - https://instabiogen.online/robots.txt -o /tmp/robots.txt
  curl -sS -D - https://instabiogen.online/sitemap.xml -o /tmp/sitemap.xml
  ```
  Confirm HTTP 200, valid content types, sitemap XML parsing, canonical host consistency, and that every sitemap URL returns an indexable 200 response.

## 3. Checks requested but not executed

These checks were **not run**, so this report makes no claims about their pass/fail status:
- `npm audit`, `npm outdated`, `npx eslint .`, `npx tsc --noEmit`, `npm run build`, `npx depcheck`
- `git log --oneline` in a local clone, `git grep`/grep secret scan over the complete working tree, and secret scan across all historical commits
- `npx lighthouse` on desktop and mobile, browser-driven responsive/accessibility checks, and Core Web Vitals measurements
- `curl -I` response-header inspection and direct HTTP checks for sitemap/robots.txt
- Full functional testing of every route, all form submissions, all generator interactions, and all post links
- Complete MDX quality analysis for thin/duplicate content, all image alt attributes, every internal/external link, all image sizes, all redirects, and every content metadata field
- Database/API schema, database indexes, server-side rate limits, authentication/roles, comments, newsletter delivery, and admin dashboard: the inspected repository tree has no `app/api/` routes and no evident database-backed admin implementation, but external services/hosting configuration were not accessible for verification.
- Deployed hosting provider, whether `public/_headers` and `public/_redirects` are honored, actual TLS/header values, and production build artifacts.

**Why:** The shell environment could not resolve `github.com`, preventing a local checkout and dependency installation. The web fetcher is not a full browser/HTTP diagnostic tool and could not fetch the two crawler endpoints. Do not interpret a check as passed merely because it was unavailable.

## 4. Severity summary

Counts below include only findings documented above; unexecuted checks are not counted as issues. Adding the banner-script finding brings the confirmed source-review total to 11 findings.

| Severity | Count |
|---|---:|
| Critical | 0 |
| High | 0 |
| Medium | 5 |
| Low | 5 |
| **Total** | **10** |

## 5. Category scores (provisional)

These are **source-review estimates**, not test-derived measurements. Categories with unavailable runtime evidence have lower confidence.

| Category | Score / 100 | Confidence |
|---|---:|---|
| Code quality & maintainability | 68 | Medium-low |
| Security | 65 | Low (no dependency/secret/runtime scan) |
| Performance | 60 | Low (no Lighthouse/Core Web Vitals run) |
| SEO | 68 | Medium-low |
| Blog/content architecture | 65 | Medium-low |
| UI/UX & responsive | 70 | Low (text-rendered homepage only) |
| Accessibility | 65 | Low (no automated/manual browser audit) |
| Functionality | 65 | Low (no end-to-end tests) |
| Dependencies & configuration | 60 | Low (no npm commands/build) |
| GitHub/repository health | 60 | Medium (metadata/tree available) |
| Database/API | N/A | No repository API/database implementation identified |

## 6. Top 10 priorities

1. Run dependency vulnerability and outdated-package checks using the committed lockfile.
2. Run TypeScript, ESLint, and production build locally or in CI; fix verified failures before changing architecture.
3. Validate production response headers and make CSP as strict as the application can support.
4. Fetch and parse live `robots.txt` and `sitemap.xml`; compare sitemap URLs to live status/canonical URLs.
5. Add a build-time integrity check comparing `ALL_STORIES` entries and MDX slugs.
6. Measure desktop and mobile Lighthouse/Core Web Vitals before making image/performance changes.
7. Add CI for install, lint, type-check, and build; protect the production branch with required checks.
8. Improve clipboard failure handling and test browser permission-denied behavior.
9. Make heading IDs deterministic and unique; verify generated table-of-contents links.
10. Replace the starter README with the actual project setup, content, scripts, and deployment instructions.

## 7. Step-by-step action plan

### Phase 1 — Establish reproducible checks
1. Use a networked machine with Node.js/npm installed and clone the `main` branch.
2. Record `node --version` and `npm --version`; run `npm ci`.
3. Run `npm audit`, `npm outdated`, `npx eslint .`, `npx tsc --noEmit`, `npm run build`, and `npx depcheck`. Save full output.
4. Run a secret scan against the working tree and full Git history. If a real credential is found, rotate/revoke it before considering history cleanup.

### Phase 2 — Confirm production behavior
5. Check HTTP headers and crawler endpoints with curl; verify redirects, canonical host, 404 behavior, and every sitemap URL.
6. Run Lighthouse for mobile and desktop and record LCP, CLS, INP/TBT, accessibility, SEO, and best-practice results.
7. Crawl the site's internal links and compare every archive/category card slug with an existing MDX post.

### Phase 3 — Fix in isolated changes
8. Prioritize verified security/dependency/build failures, then crawlability and broken routes, then performance/accessibility.
9. Make one issue per commit, run the relevant regression check after each change, and avoid mixing unrelated refactors.
10. Re-run the full checks before deploying and compare post-deploy headers, sitemap, and Core Web Vitals.

## 8. Limitations and files/areas not fully verified

- The GitHub recursive tree was retrieved successfully (588 entries, not truncated), but **not every file's full contents were individually read**. Therefore, the user-requested exhaustive line-by-line review is not complete.
- The README, package manifest, lockfile presence, TypeScript/ESLint config, Next config, root layout, home page, blog archive, dynamic post page, category page, MDX loader, bio form/generator, sitemap/llms generators, headers/redirects, and robots.txt source were inspected.
- Full content review of all 30 MDX posts and all image assets was not completed. No claims are made that the site's articles are duplicate, thin, inaccurate, or have missing alt text without a completed crawl.
- No local dependency install, npm audit, lint, type-check, build, depcheck, git history secret scan, or Lighthouse run was possible.
- No live login/admin/database/API was found in the inspected source tree, but hosting dashboard settings and external services were not accessible.
- The `master` branch was identified in repository metadata but was not fully compared against `main`.
- GitHub reports no open issues; the repository has no workflow files in the inspected tree. Branch protection was reported false for `main` and `master`.
- Live homepage text was fetched on the audit date. Sitemap and robots.txt fetch attempts failed at the inspection tool, so their live status/content remain unknown.

---

**Approval gate:** No application code was changed. Review this report first and tell me which finding(s) you want fixed. After explicit approval, fixes should be made one issue per commit, with checks and results recorded for each commit.
