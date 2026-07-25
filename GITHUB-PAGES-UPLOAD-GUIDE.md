# دليل رفع الموقع إلى GitHub Pages

النسخة النهائية: 23 يوليو 2026، الساعة 05:35:56 بتوقيت القاهرة.

## الرفع لأول مرة

1. فك ضغط ملف ZIP النهائي.
2. أنشئ مستودعًا عامًا جديدًا في GitHub، مثل `khaled-fouad-khaled`.
3. افتح المستودع واختر **Add file → Upload files**.
4. ارفع **جميع الملفات والمجلدات الموجودة داخل المجلد النهائي**، ومنها `index.html` و`assets` و`images` و`.github`.
5. لا ترفع المجلد الخارجي نفسه؛ يجب أن يظهر `index.html` في المستوى الرئيسي للمستودع.
6. اضغط **Commit changes**.
7. افتح **Settings → Pages**، ثم اختر **Deploy from a branch**.
8. اختر الفرع `main` والمجلد `/(root)`، ثم اضغط **Save**.
9. انتظر حتى يظهر رابط الموقع المنشور.

## تفعيل تحديث إحصاءات Google Scholar

1. افتح **Settings → Actions → General**.
2. فعّل **Read and write permissions** ثم احفظ.
3. افتح تبويب **Actions** وشغّل **Update Google Scholar statistics** يدويًا للمرة الأولى.
4. قد يمنع Google Scholar القراءة الآلية أحيانًا؛ عند ذلك يبقى رابط الملف الرسمي ظاهرًا للزائر.

## تحديث صفحة لاحقًا

1. افتح ملف الصفحة محليًا واضغط **Edit / تحرير**.
2. نفّذ التعديل ثم اختر **Download page**.
3. ارفع الملف الجديد إلى GitHub بالاسم نفسه ووافق على استبدال النسخة القديمة.
4. إذا أضفت صورة، ارفعها أيضًا داخل مجلد `images` مع الحفاظ على اسمها المستخدم في الصفحة.
5. اضغط **Commit changes**؛ سيُحدّث GitHub Pages الموقع تلقائيًا.

## إضافة صفحة جديدة

1. أنشئ ملف HTML جديدًا باسم إنجليزي قصير دون مسافات.
2. اربطه بملف `assets/site-public.js` قبل إغلاق وسم `body` لكي تظهر أدوات التحرير ولوحة التواصل والإحصاءات المشتركة.
3. أضف رابط الصفحة إلى قائمة التنقل في الصفحات المطلوبة وإلى `index.html`.
4. ارفع الصفحة وأي صور مرتبطة بها ثم نفّذ **Commit changes**.

## فحص سريع قبل النشر

- افتح `index.html` و`00-home-page.html` محليًا.
- جرّب العربية والإنجليزية.
- تأكد من ظهور الصورة الجديدة في صفحة «نبذة» دون ضغط أو تمدد.
- جرّب الروابط والبريد والهاتف والملفات الأكاديمية.
- لا تحذف `.nojekyll` أو `.github` أو `assets`.

## English quick guide

Create a public GitHub repository, upload the **contents** of the extracted final folder so that
`index.html` is at the repository root, and commit the files. In **Settings → Pages**, select
**Deploy from a branch**, then `main` and `/(root)`. Enable **Read and write permissions** in
**Settings → Actions → General**, and run **Update Google Scholar statistics** once. To update a
page later, upload the revised HTML file with the same filename and commit the replacement.
