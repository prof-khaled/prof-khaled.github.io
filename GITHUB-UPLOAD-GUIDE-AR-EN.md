# دليل رفع وتحديث الموقع على GitHub Pages

## الرفع لأول مرة

1. سجّل الدخول إلى GitHub وأنشئ مستودعًا جديدًا عامًا، وليكن اسمه
   `khaled-fouad-khaled`.
2. فك ضغط ملف الموقع النهائي.
3. افتح المستودع، ثم اختر **Add file → Upload files**.
4. ارفع **محتويات المجلد** كلها، بما فيها `.github` و`assets` و`images`، ولا
   ترفع المجلد الخارجي نفسه.
5. اضغط **Commit changes**.
6. افتح **Settings → Pages**، واختر **Deploy from a branch**، ثم الفرع `main`
   والمجلد `/ (root)`، واضغط **Save**.
7. بعد النشر، افتح **Actions** وشغّل مهمة
   **Update Google Scholar statistics** مرة واحدة. من **Settings → Actions →
   General** امنح Workflow صلاحية **Read and write permissions**.

## تعديل صفحة موجودة

1. افتح الصفحة محليًا واضغط **Edit / تحرير**.
2. عدّل النصوص أو الصور ثم اضغط **Download page**.
3. في GitHub افتح الملف القديم، اختر **Upload files** وارفع الملف الجديد بنفس
   الاسم، ثم وافق على الاستبدال واضغط **Commit changes**.

## إضافة صورة

- ضع الصورة داخل مجلد `images` باسم إنجليزي قصير دون مسافات.
- يفضّل WebP أو JPG، بعرض 1600 بكسل للصور الأفقية و1200 بكسل للصور الرأسية.
- استبدل الصورة من أدوات التحرير، ثم نزّل الصفحة وارفع الصفحة والصورة معًا.
- لا تغيّر نسبة عرض الصورة يدويًا؛ تنسيق الموقع يحافظ على النسبة ويقص الزائد
  بطريقة متوازنة.

## إضافة بحث أو مشروع جديد

- أضف السجل داخل صفحة `04-publications.html` أو `05-research-projects.html`
  باستخدام أدوات التحرير مع المحافظة على نفس ترتيب الحقول.
- أضف رابط DOI إن وُجد، أو رابط البحث في Google Scholar.
- بعد التنزيل ارفع ملف الصفحة المعدل إلى GitHub بنفس الاسم.

## English quick guide

Create a public GitHub repository, upload all extracted site files, then enable
GitHub Pages from **Settings → Pages → Deploy from a branch → main → /(root)**.
To update a page, open it locally, use **Edit**, select **Download page**, and
upload the downloaded HTML file to GitHub with the same filename. Upload any
new image to the `images` directory. Enable read/write workflow permissions and
run **Update Google Scholar statistics** once from the Actions tab.
