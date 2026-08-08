# Technical Documentation

## Architecture

The course is a static, framework-free website. `index.html` contains the academic content; `css/styles.css` provides responsive, RTL/LTR and print styles; `js/app.js` provides lightweight interaction.

## Interactivity

- Arabic/English switch toggles complete language blocks and document direction.
- Search is performed locally over page text.
- Module reading progress and bookmarks are stored only in browser `localStorage`.
- Print/PDF uses browser-native print functionality.
- Lennard–Jones exploration is a local HTML Canvas calculation from a documented equation.

No tracking, advertising, analytics, remote database or server is used.

## Accessibility

Implemented features include a skip link, semantic headings, keyboard-operable controls, visible focus styling, high-contrast academic palette, meaningful image alternative text, responsive layout, reduced-motion support and print rules. Essential examinable text is never available only through JavaScript.

## Hosting

The folder can be uploaded unchanged to GitHub Pages or any static web server. The site also opens directly from `index.html` in ordinary browsers. Relative links are used throughout.

## Maintenance

When updating content:

1. Preserve stable module/reference/figure anchors.
2. Update the source inventory and coverage matrix for every new source.
3. Add every new visual to the manifest before deployment.
4. Keep generated/model data explicitly identified as such.
5. Re-run the structural checks: JavaScript syntax, local asset existence, internal anchors, assessment total and visual-manifest file existence.
