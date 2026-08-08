# دليل صور مركز تدريب علوم وهندسة التآكل

## الصور المستخدمة في V14

- الصورة العربية الرئيسية:
  `images/services/v14/corrosion-center-hero-ar.webp`
- صور إنجليزية محسنة مشتقة من الأصول الموجودة:
  `images/services/v14/5.webp`
  `images/services/v14/6.webp`
  `images/services/v14/10.webp`
- صورة Home المقتصة من الصورة المرفقة:
  `images/prof-khaled-home-portrait-v14.webp`

## ملاحظة الملفات المرفقة

وصل إلى مساحة الملفات أثناء التنفيذ ملف صورة واحد فقط باسم `image.png`، ولذلك استُخدم في الصورة العربية الرئيسية وفي صورة Home المقتصة. بقية الصور الظاهرة في الرسالة تحتاج إلى رفعها كملفات منفصلة بأسماء مختلفة حتى يمكن دمجها فعليًا في الحزمة.

## أسماء مقترحة للصور الجديدة

```text
center-hero-ar-02.webp
center-training-ar-01.webp
center-testing-ar-01.webp
center-hero-en-02.webp
center-training-en-01.webp
center-testing-en-01.webp
```

## مواضع الصور

في `10-scientific-services-training.html` ابحث عن:

```text
data-center-image-slot="center-ar-01"
data-center-image-slot="center-ar-02"
data-center-image-slot="center-en-01"
data-center-image-slot="center-en-02"
```

استبدل `src` مع الحفاظ على:

- `class="ar"` للصورة العربية.
- `class="en"` للصورة الإنجليزية.
- نص Alt مناسب.
- أبعاد الصورة.

## التحسين

قبل الرفع:

- العرض الأقصى 1600 بكسل.
- WebP جودة 78–85.
- هدف الحجم 100–350KB للصورة.
- لا تضع نصًا صغيرًا جدًا داخل الصورة.
- تجنب ادعاءات مثل الاعتماد أو الشهادات ما لم توجد وثيقة رسمية تدعمها.
