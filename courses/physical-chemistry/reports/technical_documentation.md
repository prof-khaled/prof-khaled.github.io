# Technical Documentation

- Entry point: `index.html`
- CSS: `assets/styles.css`
- JS: `assets/app.js`
- Scientific artwork: `assets/figures/*.svg`
- Figure data: `assets/data/*.csv`
- Evidence/QA: `reports/`
- No build system or network dependency is needed for the deployable site.
- Progress, bookmarks, and language preference use browser `localStorage` only.
- Browser Print/PDF uses print-specific CSS.
- The site works by opening `index.html`; a static HTTP server is recommended for normal hosting.
