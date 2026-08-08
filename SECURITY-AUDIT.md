# Security Audit — V17

| Finding | Risk | V17 action | Status |
|---|---|---|---|
| NotebookLM external links | Reverse-tabnabbing | `target="_blank"` plus `rel="noopener noreferrer"` | Addressed |
| AI configuration | Credentials accidentally embedded | Only public URLs/course metadata stored; no passwords/tokens | Addressed |
| Authentication | Public learning should not require site credentials | No website login is added; NotebookLM authentication, if required, occurs only at Google | Addressed |
| GitHub Pages secrets | Client files are public | No private credentials should be committed; keep repository/account security separate | Ongoing policy |
| User-controlled dynamic content | DOM XSS risk | V17 AI script only assigns URLs from owner-controlled JSON and fixed labels | Low |

See `GITHUB-SECURITY-GUIDE.md` for repository hardening.
