# دليل الصور والخطوط والألوان — V15
# Image, Typography and Color Guide — V15

## الصور | Images

- استخدم WebP للصور الفوتوغرافية والرسوم الكبيرة.
- احتفظ بنسبة الصورة الأصلية ولا تقص الوجه أو النصوص الموجودة داخل الإنفوجرافيك.
- صور مركز التدريب العريضة: `1280 × 720` بنسبة `16:9`.
- صورة Home الشخصية: نسبة `5:4`.
- استخدم `object-fit: contain` للصور التي تحتوي على أشخاص أو نصوص أو مستندات.
- يمكن استخدام `object-fit: cover` فقط للصور الزخرفية التي لا تحتوي على نص أو تفاصيل ضرورية، وبعد مراجعة القص على الهاتف.
- أضف `width` و`height` الحقيقيين لتقليل حركة الصفحة أثناء التحميل.
- استخدم `loading="lazy"` للصور الواقعة أسفل الجزء المرئي، ولا تستخدمه لصورة Hero الرئيسية.
- يجب أن يكون النص البديل مختلفًا وذا معنى في كل لغة عند الحاجة.

## English

- Use WebP for photographs and large graphics.
- Preserve the original aspect ratio and do not crop faces, document edges, or infographic text.
- Wide center visuals: `1280 × 720`, `16:9`.
- Home profile portrait: `5:4`.
- Use `object-fit: contain` for portraits, infographics, documents, and scientific diagrams.
- Use `object-fit: cover` only for nonessential decorative photography after mobile review.
- Include intrinsic `width` and `height`.
- Lazy-load below-the-fold images, not primary hero images.

## الخطوط | Typography

- الإنجليزية: Arial أو Segoe UI أو خط نظام مماثل.
- العربية: Noto Sans Arabic عند توفره على الجهاز، ثم Tahoma وArial.
- لا ترفع أو توزع ملفات خطوط داخل حزمة الموقع دون ترخيص واضح.
- عناوين العربية تستخدم ارتفاع سطر أكبر من الإنجليزية وتمنع المسافات السالبة بين الحروف.
- لا يقل حجم النص الأساسي عن 16px في الهاتف.
- لا تقل مساحة الأزرار القابلة للمس عن 44px.

## الألوان | Colors

- Navy: `#071b2e`
- Blue: `#143f62`
- Gold: `#d7ad5b`
- Light gold on dark backgrounds: `#f2cf83`
- Main ink: `#14212c`
- Light section background: `#eef3f7`

- لا تستخدم اللون البنفسجي الافتراضي للروابط التي تمت زيارتها.
- يجب أن تظل روابط الجامعة ذهبية فاتحة على الخلفية الزرقاء، وزرقاء داكنة على الخلفيات الفاتحة.
- يجب أن تظهر حالة Focus بوضوح عند التنقل بلوحة المفاتيح.
