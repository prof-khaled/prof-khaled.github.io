# Technical documentation

The course is delivered as one self-contained `index.html` file with inline CSS, JavaScript, SVG illustrations, and base64-embedded textbook-cover thumbnails. It has no framework, analytics, advertising, tracking, server requirement, or runtime external dependency.

## Features

- English/Arabic switch with RTL/LTR handling
- dark/light theme
- responsive chapter navigation and search
- local bookmarks and chapter completion using browser localStorage
- immediate-feedback knowledge checks
- interactive periodic table
- eight calculation aids
- browser print and Save as PDF support

## Maintenance

Edit content in `index.html` or rerun `build_general_chem.py` if available in the development environment. New figures must be entered in `data/visual_asset_manifest.csv`; new sources must be added to `data/source_inventory.csv` and the numbered reference list. Test changes at desktop, tablet, mobile, and print widths.
