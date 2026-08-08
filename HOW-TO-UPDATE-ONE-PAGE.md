# How to update one page only — Version 16

## Root page example: P03
Replace `03-research-scientific-expertise.html`. Replace a page-specific image only when that image changed. Do not replace other HTML pages.

## Course example: C06
Update files only inside `courses/electrochemical-impedance-spectroscopy/`. If the course content is regenerated as one package, replace that directory only. Shared site shell files under `/assets/` need replacement only when the global design itself changes.

## GitHub web interface
Open the repository, navigate to the file, use Edit or Upload files, commit the change, and verify the GitHub Pages deployment. For a full course, upload the changed files under the same stable course directory.

## Git command line
Commit only the changed page/course files, review `git diff`, then push. Stable paths are intentionally preserved so unrelated pages are not rebuilt.


## V17 — Updating an AI Assistant link

Edit only `assets/data/course-ai-assistants.json` and replace the `url` value for the relevant course ID (C01–C09). No unrelated course page needs to be edited.
