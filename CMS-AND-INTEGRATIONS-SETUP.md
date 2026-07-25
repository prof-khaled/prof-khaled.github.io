# CMS and integrations setup

## Decap CMS
1. Edit `admin/config.yml` and replace `YOUR-GITHUB-USERNAME/YOUR-REPOSITORY`.
2. Configure a GitHub OAuth proxy or deploy on Netlify and enable the supported authentication workflow.
3. Open `/admin/`.
4. `local_backend: true` supports local authoring with `npx decap-server`.

## Plausible Analytics
Set `plausibleDomain` in `assets/site-config.js`. The analytics script remains unloaded while this value is blank.

## Cloudflare Turnstile
Set the public key in `assets/site-config.js` and the secret as `TURNSTILE_SECRET_KEY` in the hosting environment. Server-side verification is included in `netlify/functions/contact.mjs`.

## ORCID
The public profile link works immediately. For API retrieval, set `ORCID_ACCESS_TOKEN` in Netlify.

## Crossref
The browser DOI importer works directly from `academic-tools.html`; an optional serverless proxy is also included. Always verify imported metadata.

## Automated quality checks
The GitHub Action runs missing-link checks, Playwright + axe-core accessibility tests, and Lighthouse CI.

## Before publishing
Replace every `YOUR-DOMAIN.example`, configure the repository, and connect the contact function to an email service or CRM.
