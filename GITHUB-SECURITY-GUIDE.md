# GitHub Security Guide — Version 16

This website is intentionally public and static. Website access does **not** use usernames or passwords. Security therefore focuses on protecting the GitHub account/repository and preventing client-side secrets.

- Enable GitHub 2FA; prefer a passkey or hardware security key and store recovery codes securely.
- Protect the default branch using a ruleset: require pull requests for important changes, block force pushes, and restrict deletion.
- Give collaborators the least privilege they need and periodically review access.
- Enable secret scanning and push protection when available. Never commit API secrets, service-role keys, private keys, `.env` files, or credentials.
- Keep GitHub Actions permissions read-only by default unless a workflow requires more. Review third-party Actions and pin them to trusted releases or commit SHAs where practical.
- Enable Dependabot alerts/updates when dependency manifests are introduced.
- In GitHub Pages settings, enforce HTTPS and keep the published source limited to the intended branch/folder.
- Treat all HTML, CSS and browser JavaScript as publicly readable. Client-side code is never a place for secrets.
