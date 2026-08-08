# Deployment Guide — V13

## 1. Preserve the current Google identity

- Publish to the existing canonical host: `https://khaledfouadkhaled.github.io`.
- Keep all existing public root filenames. The build intentionally preserves them.
- Do not delete any Google verification file or verification meta tag if one is added later.
- `sitemap.xml`, `robots.txt`, canonical URLs and the URL audit are already prepared for the current host.
- Do not publish a duplicate production copy under another public hostname without a migration plan.

## 2. GitHub Pages deployment

1. Back up the current repository and export the live site.
2. Upload the contents of this package to a new branch and review the diff.
3. Keep `.nojekyll` in the repository root.
4. Publish the reviewed branch through GitHub Pages.
5. Verify these URLs after deployment:
   - `/index.html`
   - `/01-about-prof-khaled.html`
   - `/10-scientific-services-training.html`
   - `/knowledge-hub.html`
   - `/robots.txt`
   - `/sitemap.xml`
6. Confirm that old URLs do not return 404.
7. Re-check Google Search Console ownership and submit the existing sitemap only after the public pages are verified.

GitHub Pages can host the public interface, but strict response security headers require a proxy/CDN or a host that supports them. `netlify.toml` contains a reviewed header baseline for a compatible deployment.

## 3. Supabase activation

1. Create an owner-controlled Supabase project.
2. Review and run `documents/knowledge-hub-supabase-schema.sql` in the SQL editor.
3. Create a private Storage bucket named `knowledge-private`.
4. Copy `assets/supabase-config.example.js` to `assets/supabase-config.js` and enter only:
   - project URL;
   - publishable/anon key;
   - optional public Turnstile site key.
5. Never enter a service-role key in a browser file.
6. Configure the production Site URL and redirect URL:
   - `https://khaledfouadkhaled.github.io/auth.html`
7. Enable email confirmation and configure SMTP from an owner-controlled account.
8. Enable CAPTCHA and review Auth rate limits.
9. Create a normal account for the first administrator, then assign the role from the SQL editor:

```sql
update public.profiles
set role='admin', status='active', updated_at=now()
where id=(select id from auth.users where email='ADMIN_EMAIL_HERE');
```

10. Subsequent role/status changes should use the protected RPC `admin_set_profile_access`, not browser metadata.
11. Upload protected files only to `knowledge-private` and create matching `resources` rows.
12. Test every role separately before exposing private content.

## 4. Pre-release checks

- Run `node tests/check-links.mjs`.
- Run `python /mnt/data/audit_v13.py` when using the supplied workspace, or reproduce its checks in CI.
- Run Playwright accessibility tests and Lighthouse in a network environment that permits a local browser.
- Test Arabic and English navigation at 320, 375, 430, 768, 1024 and 1440 pixels.
- Test account confirmation, reset, suspension, enrolment approval and access to private storage.

## 5. Rollback

- Tag the currently published release before deployment.
- If a critical issue appears, republish the previous tag/branch.
- Keep the current public filenames in both releases so rollback does not break indexed links.
