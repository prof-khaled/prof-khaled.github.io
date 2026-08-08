# Publications Data Quality — V14

## Corrections applied

The active publications catalogue and the embedded fallback dataset were reviewed for parser artefacts. Twelve records were corrected using their existing `sourceText` citations as the sole source:

- IDs 5, 11, 12, 14, 33, 36, 38, 48, 78, 79 and 105: coauthor fragments beginning with `and ...` were moved from the title into the author field.
- ID 112: the author list, article title, volume and page range were separated correctly from the existing source citation.
- ID 105: placeholder bibliographic values `0(0): 0–0` were removed from the display fields pending verification.
- Google Scholar and Crossref search links were regenerated from the corrected titles.

## Items still requiring authoritative verification

- DOI values are absent from most historical records. No DOI was invented.
- Some older conference records have incomplete page or volume information.
- The 2026 in-press record does not identify a journal in the supplied source text.
- Publication counts, author order and bibliographic metadata should eventually be reconciled against ORCID, Scopus, Web of Science, Crossref or publisher records by the site owner.

## Files updated

- `assets/data/publications.json`
- Embedded JSON inside `04-publications.html`

The legacy citation dataset `assets/publications-data.json` already retained the complete citation strings and was not rewritten.
