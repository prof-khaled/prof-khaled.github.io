# Version 7 — Reference Palette and Compact Navigation

This build applies the visual palette from the supplied `index(7).html` across the complete website:

- Navy: `#071b2e`
- Blue: `#143f62`
- Gold: `#d7ad5b`
- Paper: `#f5f2ea`
- Ink: `#14212c`
- Border: `#cbc7bd`

## Navigation

The desktop navigation is deliberately compact and remains on one line on wide screens. Before the links can wrap, it changes to a single-column menu at 1180 px. This prevents two-line navigation and prevents controls from leaving the page.

## Main theme file

`assets/reference-theme-compact-nav.css`

This stylesheet is loaded last on every HTML page. Older competing contrast/readability patch files were removed from page heads to avoid cascading conflicts.

## Included tools

The existing CMS, academic tools, accessibility panel, analytics configuration, Crossref/ORCID utilities, automated quality checks, and form integrations remain in the package.

After deployment, perform a hard refresh with `Ctrl + Shift + R`.
