# V15 Implementation Report

## Scope

This release applies the requested navigation, bilingual on-page navigation, home portrait, corrosion-center visual, and image-display refinements while preserving the existing GitHub Pages file names and public URLs.

## Implemented changes

### Navigation

- Removed the duplicated top-level `Collaboration / التعاون` link from the main navigation on all 23 public HTML pages.
- Retained `Scientific Collaboration / التعاون العلمي` inside the `About` dropdown.
- Kept `collaboration.html` unchanged so existing indexed links and external references continue to work.
- Rebalanced desktop navigation widths after the removal.
- Reduced the `Sign In` control to a compact pill and preserved clear separation from `EN / ع`.
- Kept the official center name:
  - `Corrosion Science and Engineering Training Center`
  - `مركز تدريب علوم وهندسة التآكل`

### Home page

- Replaced the Home hero image in both language views with the approved formal profile portrait.
- Added an optimized WebP asset: `images/prof-khaled-home-profile-v15.webp`.
- Changed the portrait frame to the source image’s 5:4 ratio and used `object-fit: contain` so the portrait is not cropped.

### “On this page” component

- Corrected the Arabic title to `في هذه الصفحة`.
- Rebuilt the generated component so English and Arabic labels coexist in the DOM and follow the selected language.
- Fixed the language initialization order that previously allowed the component to be generated in English before the saved Arabic preference was applied.
- Added readable contrast, consistent spacing, visible focus styles, and a mobile layout.
- Updated the static About-page component to use the same wording and styling.

### Corrosion center

- Added a language-specific hero image for English and Arabic.
- Added two visual cards for each language.
- Copied selected approved images to semantic paths under `images/services/v15/`.
- Normalized center banners to 1280×720 without cropping by using letterboxing where required.
- Kept the original center URL and section anchors.

### Image and visual consistency

- Added intrinsic width and height to local images where needed.
- Added lazy loading to non-prominent images and retained eager loading for hero content.
- Added a site-wide media safety rule for content images: `object-fit: contain` and centered positioning.
- Retained full images in cards, figures, project pages, award documents, teaching pages, books, and center banners.
- Added consistent neutral backgrounds where an image does not fill a fixed container.
- Standardized heading line-height and Arabic typography without distributing font files.
- Corrected visited-link and institution-link color behavior on dark backgrounds.

## Files added

- `assets/v15-refinements.css`
- `images/prof-khaled-home-profile-v15.webp`
- `images/services/v15/center-electrochemical-testing-en.webp`
- `images/services/v15/center-scientific-protection-en.webp`
- `images/services/v15/center-research-support-en.webp`
- `images/services/v15/center-corrosion-training-ar.webp`
- `images/services/v15/center-electrochemical-lab-ar.webp`
- `V15-IMPLEMENTATION-REPORT.md`
- `TEST-REPORT-V15.md`
- `IMAGE-AND-TYPOGRAPHY-GUIDE-V15-AR-EN.md`

## Compatibility and SEO

- No public HTML page name was changed.
- `collaboration.html` remains published and accessible through the About menu.
- Canonical URLs, sitemap paths, and the previous GitHub Pages deployment structure were preserved.
- No Google verification, Analytics, or OAuth secret was invented or embedded.

## Known limitation

The execution environment’s local Chromium process did not complete headless screenshot capture. Static structure, asset references, JavaScript syntax, CSS parsing, duplicate IDs, and local links were tested successfully. A final visual pass on Chrome, Edge, Firefox, and mobile devices is still recommended after GitHub deployment.
