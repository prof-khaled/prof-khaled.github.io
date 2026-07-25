(() => {
  "use strict";

  document.querySelectorAll("[data-current-year]").forEach((element) => {
    element.textContent = String(new Date().getFullYear());
  });

  const form = document.getElementById("scientific-service-form");
  const emailButton = document.getElementById("send-email");
  const status = document.getElementById("service-form-status");
  if (!form || !status) return;

  const isArabic = () => document.documentElement.lang === "ar";
  const t = (en, ar) => isArabic() ? ar : en;

  const fields = {
    fullName: document.getElementById("full-name"),
    email: document.getElementById("email"),
    requestType: document.getElementById("request-type"),
    description: document.getElementById("description"),
    consent: document.getElementById("consent")
  };

  const setError = (id, message) => {
    const target = form.querySelector(`[data-error-for="${id}"]`);
    if (target) target.textContent = message;
  };

  const clearErrors = () => {
    form.querySelectorAll(".field-error").forEach((element) => {
      element.textContent = "";
    });
    status.textContent = "";
    status.className = "form-status";
  };

  const validate = () => {
    clearErrors();
    let valid = true;

    if (!fields.fullName.value.trim()) {
      setError("full-name", t("Please enter your full name.", "يرجى إدخال الاسم الكامل."));
      valid = false;
    }

    if (!fields.email.value.trim() || !fields.email.validity.valid) {
      setError("email", t("Please enter a valid email address.", "يرجى إدخال بريد إلكتروني صحيح."));
      valid = false;
    }

    if (!fields.requestType.value) {
      setError("request-type", t("Please select the request type.", "يرجى اختيار نوع الطلب."));
      valid = false;
    }

    if (!fields.description.value.trim()) {
      setError("description", t("Please describe your request.", "يرجى كتابة وصف للطلب."));
      valid = false;
    }

    if (!fields.consent.checked) {
      setError("consent", t("Consent is required before sending.", "الموافقة مطلوبة قبل الإرسال."));
      valid = false;
    }

    if (!valid) {
      status.textContent = t("Please review the highlighted required fields.", "يرجى مراجعة الحقول المطلوبة الموضحة.");
      status.classList.add("is-error");
      const firstError = form.querySelector(".field-error:not(:empty)");
      if (firstError) {
        const field = firstError.closest(".form-field")?.querySelector("input,select,textarea");
        field?.focus();
      }
    }
    return valid;
  };

  const value = (id) => {
    const element = document.getElementById(id);
    return element ? element.value.trim() : "";
  };

  const buildMessage = () => {
    const areas = Array.from(form.querySelectorAll('input[name="areas"]:checked')).map((input) => input.value);
    const fileInput = document.getElementById("attachment");
    const fileName = fileInput?.files?.[0]?.name || "";

    const rows = [
      ["Full Name / الاسم الكامل", value("full-name")],
      ["Institution / المؤسسة", value("institution")],
      ["Position / الصفة", value("position")],
      ["Email / البريد الإلكتروني", value("email")],
      ["Phone / الهاتف", value("phone")],
      ["Country / الدولة", value("country")],
      ["Request Type / نوع الطلب", value("request-type")],
      ["Areas / المجالات", areas.join(", ")],
      ["Training Format / نمط التدريب", value("format")],
      ["Participants / عدد المشاركين", value("participants")],
      ["Preferred Timeframe / الإطار الزمني", value("timeframe")],
      ["Relevant File / الملف ذو الصلة", fileName],
      ["Request Details / تفاصيل الطلب", value("description")]
    ].filter(([, item]) => item);

    const title = isArabic()
      ? "طلب خدمة علمية أو تدريب مهني"
      : "Scientific Service or Professional Training Request";

    return `${title}\n\n${rows.map(([label, item]) => `${label}:\n${item}`).join("\n\n")}`;
  };

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!validate()) return;

    const message = buildMessage();
    const whatsappUrl = `https://wa.me/201060932029?text=${encodeURIComponent(message)}`;
    status.textContent = t("Opening WhatsApp with your prepared request…", "جارٍ فتح واتساب بالطلب المُجهز…");
    status.classList.add("is-success");
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  });

  emailButton?.addEventListener("click", () => {
    if (!validate()) return;

    const subject = isArabic()
      ? "طلب خدمة علمية أو برنامج تدريبي"
      : "Scientific Service or Training Programme Request";
    const mailto = `mailto:Khaledrice2003@edu.asu.edu.eg?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(buildMessage())}`;
    status.textContent = t("Opening your email application…", "جارٍ فتح تطبيق البريد الإلكتروني…");
    status.classList.add("is-success");
    window.location.href = mailto;
  });

  form.addEventListener("input", (event) => {
    const id = event.target.id;
    if (!id) return;
    const target = form.querySelector(`[data-error-for="${id}"]`);
    if (target) target.textContent = "";
  });
})();
