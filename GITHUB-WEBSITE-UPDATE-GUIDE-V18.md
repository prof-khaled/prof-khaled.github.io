# GitHub Website Update Guide — Version 18

This website is designed for GitHub Pages and for page-by-page maintenance.

## A. Safest method for replacing the complete website

1. Download and keep a backup of the currently published repository/branch.
2. Extract `prof-khaled-academic-platform-v18.zip` on your computer.
3. Open the GitHub repository that publishes **Prof. Dr. Khaled Fouad Khaled | Official Website**.
4. Confirm the GitHub Pages source in **Settings → Pages** (for example `main` branch/root or a `docs/` folder). Upload the website files to that exact publishing location.
5. Do **not** upload the outer `prof-khaled-academic-platform-v18` folder if the Pages source expects `index.html` at the repository root. In that case upload the **contents** of the V18 folder so `index.html` remains at the publishing root.
6. Commit with a clear message, e.g. `Deploy website V18 - fix Knowledge Hub duplicate course button`.
7. Wait for GitHub Pages deployment to complete, then open the live website in a private/incognito window and test Home, Knowledge Hub, Academic Courses, AI Course Assistance, all nine courses, Contact and the EN/AR controls.
8. If a serious issue appears, revert the deployment commit or restore the previous release/branch.

## B. Updating one normal page only

Example: update Research & Scientific Expertise (P03).

1. Edit/test `03-research-scientific-expertise.html` locally.
2. If you changed no shared CSS/JS/assets, upload only that HTML file to the same location in GitHub.
3. Commit the change.
4. Verify the live page and its navigation.

Do not replace unrelated pages.

## C. Updating one course only

Example: update C05 Electrochemistry.

1. Work only in `courses/electrochemistry/`.
2. Upload only the changed files from that directory.
3. If the course catalogue description/card also changed, update `academic-courses.html` or its associated data source as documented.
4. Do not overwrite other course directories.

## D. Updating only a NotebookLM AI Assistant URL

1. Open `assets/data/course-ai-assistants.json`.
2. Locate the course ID, e.g. `C05`.
3. Change only its `url` and, if necessary, `status`.
4. Validate the JSON syntax.
5. Upload only this JSON file.
6. Test both `academic-courses.html`, `ai-course-assistance.html`, and the relevant course page.

## E. Updating navigation or shared design

Navigation/shared CSS/JS changes can affect many pages. Before publishing:

1. Create a separate branch or local backup.
2. Update the shared asset(s).
3. Test representative pages: Home, About, Publications, Knowledge Hub, Academic Courses, AI Assistance, one course, Contact, and mobile widths.
4. Publish only after the shared change is verified.

## F. Adding a new public page

1. Create the new HTML file using the current shared header/footer/design system.
2. Add the page to appropriate navigation only if necessary.
3. Add it to `sitemap.xml`.
4. Add it to `WEBSITE-PAGE-REGISTER.md`, `WEBSITE-PAGE-REGISTER.csv`, and `WEBSITE-PAGE-CONTENT-LIST.md`.
5. Validate internal links and case-sensitive file names before deployment.

## G. GitHub security checklist

- Enable GitHub 2FA/passkey for repository administrators.
- Protect the default branch with a ruleset; block force pushes and deletion.
- Keep collaborators at least privilege.
- Do not store passwords, tokens, private API keys, service-role keys or `.env` secrets in the repository.
- Treat all JavaScript and JSON delivered by GitHub Pages as public.
- Keep GitHub Pages on HTTPS and enable **Enforce HTTPS** when available.
- Review GitHub Actions permissions and use only trusted actions.
- Keep a known-good release/commit for rollback.

## H. Before every deployment

Check:

- `index.html` is at the correct publishing root.
- no duplicate navigation/buttons were introduced;
- no broken internal links/images/scripts;
- English default view still works;
- Arabic and bilingual course views still work;
- Academic Courses is under Knowledge Hub;
- AI Course Assistant links open safely;
- no credentials/secrets are present;
- no `localhost`, `file://` or Windows `C:\` paths are present.
