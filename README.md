# V14 Refinement Note

This package preserves the existing GitHub Pages URL structure and adds compact navigation, the official center name, optimized center visuals, a Google OAuth sign-in path, an expanded Knowledge Hub catalogue, and detailed editing/deployment guides. See `V14-IMPLEMENTATION-REPORT.md` and `CHANGELOG-V14.md`.

# Prof. Dr. Khaled Fouad Khaled — Official Academic Website

نسخة GitHub المحدثة بتاريخ 23 يوليو 2026.

تتضمن النسخة 111 سجلًا في قائمة النشر العلمي، و18 مشروعًا بحثيًا ممولًا،
وقائمة موثقة لطلاب الماجستير والدكتوراه والباحثين المتعاونين، وصفحة مستقلة
للكتب والنشاط العلمي. تعرض الصور بنسب ثابتة باستخدام `object-fit: cover` لمنع
التمدد أو الضغط غير المتناسب.

الموقع الأكاديمي الرسمي للأستاذ الدكتور خالد فؤاد خالد، باللغتين العربية والإنجليزية.

## نسخة العمل وأدوات المالك

تحتوي جميع الصفحات في هذه النسخة على زر **Edit / تحرير**. يفتح الزر شريطًا
موحدًا لتعديل النصوص والعناوين والألوان والأحجام والقوائم والروابط والصور،
وإضافة كتل نصية أو حذفها، مع الحفظ المحلي وتنزيل ملف HTML المحدث. بعد انتهاء
مراجعة الموقع يمكن إزالة الأدوات من ملف `assets/site-public.js` لإنتاج النسخة
العامة النهائية.

يربط الموقع تلقائيًا أسماء جامعة عين شمس، وجامعة رايس، وجامعة الطائف، ومؤسسة
ويلش بمواقعها الرسمية عند ظهور هذه الأسماء في المحتوى.

## تحديث إحصاءات Google Scholar

تعرض كل صفحة بطاقة ثابتة للاستشهادات ومعامل هيرش، وتقرأ القيم من
`assets/scholar-stats.json`. تحاول آلية GitHub الموجودة في
`.github/workflows/update-scholar-stats.yml` تحديث الإحصاءات العامة يوميًا،
ويمكن تشغيلها يدويًا من تبويب **Actions**. بعد رفع الموقع لأول مرة، يجب تفعيل
GitHub Actions ومنح آلية العمل صلاحية القراءة والكتابة للمستودع.

قد يمنع Google Scholar الطلبات الآلية أحيانًا. في هذه الحالة تحتفظ الصفحة بآخر
قيم تم التحقق منها، وتظل البطاقة مرتبطة دائمًا بالملف الرسمي المباشر.

## صفحات الموقع

- `index.html` — فهرس الموقع وصفحة البداية الخاصة بـ GitHub Pages.
- `00-home-page.html` — الصفحة الرئيسية.
- `01-about-prof-khaled.html` — نبذة عن الأستاذ.
- `02-academic-career-education.html` — المسيرة الأكاديمية والتعليم.
- `03-research-scientific-expertise.html` — البحث العلمي والتخصصات.
- `04-publications.html` — المنشورات العلمية.
- `05-research-projects.html` — المشروعات البحثية.
- `06-research-group.html` — المجموعة البحثية والإشراف العلمي.
- `07-teaching-courses.html` — التدريس والمقررات والموارد التعليمية.
- `08-books-scientific-activity.html` — الكتب والنشاط العلمي.
- `GITHUB-UPLOAD-GUIDE-AR-EN.md` — دليل الرفع والتحديث.

يجب رفع مجلدات `images` و`assets` و`documents` مع ملفات HTML، مع الحفاظ على الأسماء والمواقع نفسها.

## تعديل صفحة منفردة

1. نزّل نسخة من المستودع أو افتح الملف المطلوب من GitHub.
2. عدّل ملف HTML مع عدم تغيير اسمه.
3. ارفع الملف المعدّل إلى مكانه نفسه داخل المستودع.
4. إذا أضفت صورة، ضعها داخل `images` واستخدم مسارًا نسبيًا مثل `images/photo.webp`.
5. انتظر دقيقة أو دقيقتين حتى تُحدّث GitHub Pages النسخة المنشورة.

## نشر الموقع على GitHub Pages

1. أنشئ مستودعًا جديدًا على GitHub.
2. ارفع **محتويات هذا المجلد** إلى المستوى الرئيسي للمستودع، وليس المجلد الخارجي نفسه.
3. افتح `Settings` ثم `Pages`.
4. في `Build and deployment` اختر `Deploy from a branch`.
5. اختر فرع `main` والمجلد `/(root)` ثم اضغط `Save`.
6. استخدم الرابط الذي تعرضه GitHub Pages بعد اكتمال النشر.

## ملاحظات مهمة

- جميع الروابط داخل الموقع نسبية، لذلك تعمل داخل مستودع مشروع GitHub Pages.
- هذه نسخة نشر نظيفة؛ حُذفت منها أدوات المالك والتحرير المحلي.
- لإجراء تعديل، عدّل ملف HTML المطلوب أو أرسله للمراجعة، ثم ارفعه إلى مكانه نفسه في المستودع.
- عداد الزيارات الحالي محلي على جهاز الزائر، وليس عدادًا عالميًا لجميع الزوار.
- تجنب تغيير أسماء الملفات أو المجلدات حتى لا تنكسر الروابط.
- احتفظ بنسخة احتياطية قبل استبدال أي صفحة منشورة.

## English

Upload the contents of this folder to the repository root. In GitHub, open **Settings → Pages**, choose **Deploy from a branch**, then select **main** and **/(root)**. Keep all filenames and relative folder paths unchanged.


## V13 Knowledge Hub and bilingual platform
See `V13-IMPLEMENTATION-REPORT.md`, `SETUP-KNOWLEDGE-HUB.md`, `SEO-MIGRATION-REPORT.md`, and `SECURITY-REVIEW-V13.md`.
