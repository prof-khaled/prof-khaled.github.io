# Technical documentation

The website is a dependency-free static package using semantic HTML5, CSS and vanilla JavaScript. Language switching changes `lang` and `dir`, with bilingual spans embedded in the same document. Progress and display preferences use browser localStorage. Calculators run entirely in the browser. Canvas plots are idealized educational models.

## Accessibility
- Skip link, keyboard-focus styling and semantic headings.
- Text alternatives for all figures.
- Responsive sidebar with mobile drawer.
- Tables are horizontally scrollable on small screens.
- Print stylesheet suppresses controls and preserves academic content.

## Maintenance
Edit `index.html`, `assets/css/style.css`, `assets/js/app.js` and the CSV/Markdown evidence files directly. The Python generator `build_course.py` is retained outside the packaged folder during development; generated artifacts are the deliverable.
