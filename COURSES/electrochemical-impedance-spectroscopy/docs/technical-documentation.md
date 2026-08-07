# Technical Documentation

## Architecture
- `index.html`: complete course content and interface.
- `assets/styles.css`: responsive visual system, RTL/LTR, print, focus, and contrast styles.
- `assets/app.js`: language view, search, progress, bookmarks, quizzes, calculators, EIS simulator, CSV workbench, and navigation.
- `assets/images/*.svg`: original scientific diagrams.
- `docs/*.md`: governance and quality evidence.

## Hosting
The package is static. It can be opened locally or hosted on GitHub Pages, institutional web hosting, or any static server. No database, analytics, cookies, or server-side code is required.

## Browser support
Use a current Chromium, Firefox, Safari, or Edge browser. Local storage is used only for language, progress, and bookmarks. If storage is unavailable, the course remains readable.

## Editing
Edit module content in `index.html` or regenerate it from `/mnt/data/build_eis_course.py`. Keep numeric source IDs stable. Add any visual to the visual manifest before publication.

## Simulator equations
- Rₛ+(R∥C)
- Rₛ+(R∥CPE)
- Randles-type C in parallel with R + semi-infinite Warburg
- Series R+C
The simulator is educational and not a substitute for validated fitting software.
