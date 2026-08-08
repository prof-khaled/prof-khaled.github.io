# Security Review — V13

## Addressed

- No secret, password, access token or service-role credential was added.
- Authentication is disabled until a real Supabase project is configured.
- Protected-content architecture uses private storage, RLS and restricted table/column grants.
- Users can update only safe profile columns; role and status changes require the protected `admin_set_profile_access()` function.
- Instructor policies are limited to courses assigned to the instructor and their related resources/enrolments.
- Account, dashboard and administration pages are marked `noindex` and excluded from the sitemap.
- External links opened in new tabs use `noopener noreferrer`.
- Search cards are created with DOM methods and `textContent`; catalogue URLs are restricted to local routes.
- Protected file URLs are not included in the public static catalogue.
- Netlify-compatible headers include CSP, HSTS, MIME sniffing protection, referrer policy, permissions policy and frame protection.
- Suspended or pending-deletion profiles are rejected by student and administration gates.

## Deployment requirements

- Review and apply the SQL schema in the owner-controlled project.
- Enable email confirmation, CAPTCHA, Auth rate limits and MFA for administrators.
- Create the private `knowledge-private` bucket.
- Test every RLS policy and grant with separate accounts.
- Never commit a Supabase service-role key.
- Rotate credentials and invalidate sessions if a secret is ever exposed.

## Residual limitations

- The supplied project is a static site. Authentication and protected storage cannot become operational without an external backend.
- The current build supplies the interface, client integration and reviewed database policy blueprint, but does not create owner-controlled cloud resources automatically.
- GitHub Pages does not provide full response-header control. Use a compatible CDN or host when strict production headers are required.
- The compatibility CSP permits inline styles/scripts required by legacy pages. Removing `unsafe-inline` requires a later refactor of existing inline code and styles.
- A live authenticated penetration test cannot be performed until the actual Supabase project and production origin exist.
