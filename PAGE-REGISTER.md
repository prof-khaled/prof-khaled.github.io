# Website Page Register

Use the page reference code when requesting a change. For example:

- `Update P04 only`
- `Apply this change to P01, P03, and P06`
- `Apply this change to ALL pages`

| Reference | Page name | File address | Main information and sections |
|---|---|---|---|
| P00 | Home / الصفحة الرئيسية | `index.html` | Professional introduction; name and academic title; principal portrait; Google Scholar indicators; books and funded-project figures; research fields; academic journey highlights; website exploration cards; blog and CV access; final call to explore and collaborate. |
| P00-L | Legacy Home Address / رابط الرئيسية القديم | `00-home-page.html` | Compatibility copy of the home page retained so older links continue to work. Changes to the home page should normally be applied to both `index.html` and this file. |
| P01 | About Prof. Khaled / نبذة عن الأستاذ الدكتور خالد | `01-about-prof-khaled.html` | Professional and academic biography; research identity; integrated experimental and computational approach; teaching and supervision; major contributions; professional engagement; portrait; CV 2025 download. |
| P02 | Academic Career & Education / المسيرة الأكاديمية والتعليم | `02-academic-career-education.html` | Academic qualifications; appointments and promotion timeline; Ain Shams University career; international research experience; university teaching; academic development; documentary and institutional references. |
| P03 | Research & Scientific Expertise / البحث والخبرة العلمية | `03-research-scientific-expertise.html` | Research vision; electrochemistry; corrosion science; corrosion inhibition; computational chemistry; quantum calculations; molecular modelling and simulations; methods, equipment, expertise, and research impact. |
| P04 | Publications / المنشورات العلمية | `04-publications.html` | Scientific publication record; searchable and filterable publication list; bibliographic information; journal articles; selected research contributions; books and related outputs; publication statistics and external publication links. |
| P05 | Research Projects / المشروعات البحثية | `05-research-projects.html` | Funded and documented research projects; project titles; roles; funding or institutional context; research objectives; project outcomes; scientific and collaborative significance. |
| P06 | Research Group & Supervision / المجموعة البحثية والإشراف | `06-research-group.html` | Research-group vision; postgraduate supervision; MSc and PhD students; thesis topics; named researchers and collaborators; mentoring approach; laboratory skills; training and research infrastructure. |
| P07 | Teaching & Courses / التدريس والمقررات | `07-teaching-courses.html` | Teaching philosophy; undergraduate and postgraduate teaching; chemistry and electrochemistry courses; learning methods; supervision and assessment; educational resources and course-related activities. |
| P08 | Books & Scientific Activity / الكتب والنشاط العلمي | `08-books-scientific-activity.html` | Authored and educational books; scientific activities; conferences; workshops; training; professional and community contributions; educational and scientific communication. |
| P09 | Official Blog / المدونة الرسمية | `blog.html` | Bilingual introduction to “Khaled’s Equations: Where Symbols Meet Meanings”; explanation of the blog’s scope; direct link to the official Blogger website; route back to the main website. |

## Shared components

These elements appear throughout the website and should be referenced as `ALL`:

| Reference | Shared component | Description |
|---|---|---|
| ALL-NAV | Main navigation | Unified responsive menu, dropdown navigation, active-page indicator, and Arabic/English controls. |
| ALL-LANG | Language system | English LTR and Arabic RTL display, language persistence, and bilingual labels. |
| ALL-FOOTER | Footer | Contact information, academic and professional profile links, copyright, and related website links. |
| ALL-METRICS | Academic metrics | Google Scholar citations and h-index display, source link, update status, and fallback values. |
| ALL-STYLE | Visual system | Typography, colours, spacing, buttons, cards, image proportions, responsive layout, focus states, and accessibility styling. |
| ALL-SEO | Search metadata | Page titles, descriptions, canonical links, social metadata, structured data, sitemap, and robots directives. |

## Change request format

For accurate future changes, use:

`Page reference + section + requested change + language scope`

Example:

`P03 — Corrosion Science section — replace the second image and revise the Arabic and English introduction.`

Or:

`ALL-NAV — increase the menu font size on mobile and desktop in both languages.`
