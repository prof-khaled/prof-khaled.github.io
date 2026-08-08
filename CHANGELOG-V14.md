# V14 Change Log

## Navigation

- Changed the top-level `Prof. Khaled` label to `About`.
- Applied the official center name: `Corrosion Science and Engineering Training Center` / `مركز تدريب علوم وهندسة التآكل`.
- Rebuilt desktop navigation sizing so the Sign In control no longer occupies an oversized grid cell or obscures language controls.
- Added an earlier compact-menu breakpoint for tablets and smaller laptops.

## Home

- Replaced the Home portrait with an optimized crop from the supplied center image.
- Added explicit dimensions and high-priority loading for the Home portrait.
- Corrected Ain Shams University link colors on dark and light backgrounds, including visited links.

## Corrosion Center

- Added a language-specific hero image: Arabic supplied image and optimized English scientific-service visual.
- Added a bilingual visual showcase with future image slots.
- Converted 14 large PNG files to optimized WebP variants.
- Reduced the total size of the 14 center images from about 31.7 MB to about 2.1 MB.
- Preserved the existing center page URL and anchors.

## Knowledge Hub

- Expanded the catalogue from 7 records to 14 structured records.
- Added courses, workshops, learning materials, software tutorials, research resources and AI-assistant entries.
- Expanded subject filters.
- Clarified free-account and protected-content access.

## Authentication

- Added a primary free Google sign-in button.
- Added OAuth redirect handling through Supabase.
- Kept email/password as an optional fallback.
- Updated the database trigger to obtain a display name from Google metadata.
- Added a detailed Google sign-in configuration guide.

## Quality

- Removed three legacy duplicate footers.
- Replaced the minimal accessibility page with a bilingual accessibility statement.
- Added detailed page-editing, Knowledge Hub content, image-placement and GitHub deployment guides.
- Preserved all existing public HTML filenames and canonical URLs.

## Publications

- Corrected 12 publication records affected by author/title parsing artefacts.
- Regenerated Scholar and Crossref search links from the corrected titles.
- Removed unverified `0(0): 0–0` display placeholders without inventing missing metadata.
- Added `PUBLICATIONS-DATA-QUALITY-V14.md` to record remaining verification work.
