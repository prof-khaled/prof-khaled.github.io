# Secure publications administration

The public website is a static GitHub Pages project. GitHub Pages cannot securely
validate an owner password or perform protected database writes by itself.
Therefore, no public `admin-publications.html` page and no browser-stored password
have been added.

The public publication browser currently reads the reviewed records from:

- `assets/publications-data.json`
- `assets/publications-data.js` (the same data, provided for local `file://` preview)

## Secure implementation path

1. Create a private Supabase project.
2. Run `documents/publications-supabase-schema.sql`.
3. Create the owner's account using Supabase Authentication.
4. Assign the owner account an `owner` row in `public.user_roles`.
5. Import the 113 reviewed records.
6. Build the administration route only after authentication is configured.
7. Use the public anonymous key only for permitted public reads. Keep the service
   role key outside GitHub and outside all browser code.
8. Enforce every create, update, publish, unpublish, and soft-delete operation with
   the supplied row-level security policies.

Until those external services and credentials are configured, publication updates
should be made by revising the reviewed data files and committing the change to
the private working repository. This avoids presenting JavaScript-only protection
as real security.
