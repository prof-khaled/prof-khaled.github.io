# دليل تفصيلي لتحديث الموقع على GitHub Pages

## الهدف

نشر الإصدار الجديد مع الحفاظ على:

- الرابط الحالي.
- أسماء الصفحات القديمة.
- فهرسة Google.
- إمكانية الرجوع إلى النسخة السابقة.

## 1. تنزيل نسخة احتياطية

من مستودع GitHub:

1. افتح المستودع.
2. اختر Code ثم Download ZIP.
3. خزّن النسخة باسم يتضمن التاريخ.
4. من Settings ثم Pages سجّل الفرع والمجلد المستخدمين للنشر.

## 2. إنشاء فرع تحديث

من GitHub Desktop أو Git:

```bash
git checkout -b v14-site-refinements
```

لا تبدأ التعديل مباشرة على `main`.

## 3. نسخ ملفات الإصدار

انسخ محتويات الحزمة إلى جذر المستودع مع الحفاظ على:

- `.nojekyll`
- `robots.txt`
- `sitemap.xml`
- ملفات Google verification إن وجدت.
- أسماء صفحات HTML الحالية.

لا ترفع:

- كلمات مرور.
- Client Secret.
- Supabase service role.
- ملفات `.env` الحقيقية.

## 4. ضبط Supabase العام

عدّل فقط:

```text
assets/supabase-config.js
```

بـProject URL والمفتاح العام.

Google Client Secret يوضع في Supabase Dashboard وليس GitHub.

## 5. اختبار محلي

لا تفتح الصفحات مباشرة من `file://` عند اختبار Modules. استخدم خادمًا محليًا:

```bash
python -m http.server 8080
```

ثم افتح:

```text
http://localhost:8080/
```

اختبر:

- الإنجليزية والعربية.
- القائمة على الهاتف.
- صورة Home.
- صفحة المركز.
- البحث في Knowledge Hub.
- زر Google بعد ضبط OAuth.
- الروابط القديمة.

## 6. فحص آلي

```bash
npm install
npm run check
```

راجع أي خطأ قبل الرفع.

## 7. Commit

```bash
git add .
git commit -m "V14: navigation, center visuals, Google sign-in and Knowledge Hub content"
git push -u origin v14-site-refinements
```

## 8. Pull Request

1. افتح Pull Request إلى `main`.
2. راجع قائمة الملفات.
3. تأكد من عدم وجود أسرار.
4. راجع GitHub Actions.
5. ادمج التعديل بعد نجاح الاختبارات.

## 9. النشر

إذا كان Pages مضبوطًا على Deploy from a branch، سيبدأ النشر بعد الدمج إلى الفرع المحدد.

إذا كان يستخدم GitHub Actions، راقب تبويب Actions حتى نجاح Workflow.

## 10. فحص ما بعد النشر

افتح:

```text
https://khaledfouadkhaled.github.io/
```

ثم اختبر:

- `index.html`
- `01-about-prof-khaled.html`
- `10-scientific-services-training.html`
- `knowledge-hub.html`
- `auth.html`
- `robots.txt`
- `sitemap.xml`

استخدم نافذة خاصة للتأكد من عدم اعتماد الاختبار على Cache قديم.

## 11. الحفاظ على Google

- لا تغيّر اسم النطاق.
- لا تحذف ملف تحقق Google إن وجد.
- لا تغيّر Canonical إلى رابط مختلف.
- لا تغيّر أسماء الملفات القديمة.
- أرسل `sitemap.xml` من Search Console بعد النشر إذا كانت الخدمة مربوطة.
- راقب صفحات 404 والفهرسة بعد التحديث.

## 12. التراجع

إذا ظهرت مشكلة حرجة:

```bash
git revert COMMIT_HASH
git push origin main
```

أو أعد نشر النسخة الاحتياطية السابقة.

لا تحذف المستودع ولا تلغِ إعداد Pages أثناء التراجع.
