# V14 Test Report

## Static validation

- HTML files checked: 24
- JavaScript files inventoried: 23
- CSS files inventoried: 22
- Local references checked: 2350
- Duplicate-ID or missing-reference findings: 0
- Knowledge Hub catalogue records: 14
- Publication records reviewed: 113
- Malformed `and ...` title prefixes remaining: 0
- Optimized center WebP files: 15
- Total optimized center image size: 2.05 MB

## Navigation checks

- Top-level academic menu label changed to `About`.
- Official center name applied in Arabic and English.
- Compact Sign In and separate language controls implemented through `assets/v14-refinements.css`.
- Existing public HTML filenames preserved.

## Authentication checks

- Google OAuth button exists in `auth.html`.
- OAuth call uses `supabase.auth.signInWithOAuth()` and a production redirect target.
- Google Client Secret is not stored in the website files.
- Registration remains disabled until owner-controlled Supabase values are entered.

## Content and accessibility

- Duplicate legacy footers removed from three pages.
- Accessibility statement expanded in both languages.
- Knowledge Hub catalogue expanded to 14 records.

## Findings

No missing local references or duplicate IDs were detected by the static audit.

## Runtime limitation

Headless Chromium did not complete reliably in the execution container, so final visual acceptance should be repeated in current Chrome, Firefox, Edge and Safari after deployment. The static HTML, JavaScript syntax and local-reference checks completed successfully.
