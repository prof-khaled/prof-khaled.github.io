# Technical Documentation

## File structure

- `index.html` — all examinable content and website sections
- `assets/styles.css` — responsive, print, bilingual, and accessibility styling
- `assets/app.js` — language display, search, progress, bookmarks, quizzes, calculators, simulator
- `assets/images/*.svg` — original scientific diagrams
- `docs/*.md` — governance, planning, rubrics, alignment, manifests, QA

## Browser support

Designed for current Chromium, Firefox, Safari, and Edge. JavaScript enhances the site; the main instructional text remains readable without it.

## Local storage keys

- `ci-lang`
- `ci-completed`
- `ci-bookmarks`

## Maintenance

When adding a module:

1. add the semantic module section and stable ID;
2. add navigation and previous/next links;
3. update progress total if module count changes;
4. add source basis and visual attribution;
5. update weekly plan, assessment alignment, and QA files.

## Security and privacy

No external scripts, cookies, analytics, form submission, or network calls are included.
