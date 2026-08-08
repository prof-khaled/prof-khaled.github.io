# V15 Test Report

## Automated static checks

- Public HTML pages checked: **23**
- Local images referenced: **167**
- Links checked: **1,830**
- Missing local files: **0**
- Duplicate HTML IDs: **0**
- Top-level Collaboration links remaining: **0**
- Collaboration links retained inside About: **all public pages**
- JavaScript files checked with `node --check`: **passed**
- CSS files parsed with `tinycss2`: **passed**
- Home V15 profile reference: **passed**
- Arabic static `في هذه الصفحة`: **passed**
- Arabic generated `في هذه الصفحة`: **passed**
- V15 stylesheet attached to public pages: **passed**

## Media checks

- All local image paths resolve.
- Center language-specific image paths resolve.
- Center V15 images normalized to 1280×720.
- Home portrait optimized to WebP and displayed at a matching 5:4 ratio.
- Main-content images receive the no-crop rule through `assets/v15-refinements.css`.

## Dynamic template notes

Three dialog images intentionally begin without a `src`, because JavaScript sets their image at runtime:

- Book details dialog.
- Research-project document dialog.
- Awards document dialog.

These are not missing production assets.

## Manual checks required after deployment

1. English and Arabic navigation at 1440, 1100, 768, 430, and 320 pixels.
2. `Sign In` and `EN / ع` separation.
3. Dropdown keyboard navigation.
4. Home portrait presentation in both languages.
5. Generated `On this page / في هذه الصفحة` after changing language.
6. Corrosion-center image display in both languages.
7. Long pages containing documents, books, awards, and projects.
8. Google Sign-In after Supabase and Google OAuth credentials are configured.
