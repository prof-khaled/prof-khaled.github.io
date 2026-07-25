(() => {
  "use strict";

  const root = document.documentElement;
  document.querySelectorAll('[data-current-year]').forEach((element) => { element.textContent = new Date().getFullYear(); });
  const languageButtons = [...document.querySelectorAll("[data-global-language]")];

  function applyLanguage(language) {
    const next = language === "ar" ? "ar" : "en";
    root.lang = next;
    root.dir = next === "ar" ? "rtl" : "ltr";
    root.dataset.view = next;
    root.dataset.language = next;
    try { localStorage.setItem("kfk-language", next); } catch {}

    document.querySelectorAll(".en,.ar").forEach((element) => {
      const visible = element.classList.contains(next);
      element.hidden = !visible;
    });
    document.querySelectorAll("[data-lang]").forEach((element) => {
      element.hidden = element.dataset.lang !== next;
    });
    document.querySelectorAll("[data-lang-inline]").forEach((element) => {
      element.hidden = element.dataset.langInline !== next;
    });
    languageButtons.forEach((button) => {
      const active = button.dataset.globalLanguage === next;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
    });
  }

  let savedLanguage = "en";
  try { savedLanguage = localStorage.getItem("kfk-language") || root.lang || "en"; } catch {}
  applyLanguage(savedLanguage);
  languageButtons.forEach((button) => button.addEventListener("click", () => applyLanguage(button.dataset.globalLanguage)));

  const menuButton = document.querySelector(".global-menu-toggle");
  const navigation = document.querySelector(".global-navigation");
  menuButton?.addEventListener("click", () => {
    const open = !navigation.classList.contains("is-open");
    navigation.classList.toggle("is-open", open);
    menuButton.setAttribute("aria-expanded", String(open));
  });

  const dropdowns = [...document.querySelectorAll(".global-dropdown")];
  function closeDropdowns(except = null) {
    dropdowns.forEach((dropdown) => {
      if (dropdown === except) return;
      dropdown.classList.remove("is-open");
      dropdown.querySelector(":scope > button")?.setAttribute("aria-expanded", "false");
    });
  }
  dropdowns.forEach((dropdown) => {
    const button = dropdown.querySelector(":scope > button");
    button?.addEventListener("click", () => {
      const open = !dropdown.classList.contains("is-open");
      closeDropdowns(dropdown);
      dropdown.classList.toggle("is-open", open);
      button.setAttribute("aria-expanded", String(open));
    });
  });
  document.addEventListener("click", (event) => {
    if (!event.target.closest(".global-dropdown")) closeDropdowns();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    closeDropdowns();
    navigation?.classList.remove("is-open");
    menuButton?.setAttribute("aria-expanded", "false");
    menuButton?.focus();
  });

  const current = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".global-navigation a[href]").forEach((link) => {
    const target = link.getAttribute("href").split("#")[0];
    if ((current === "00-home-page.html" && target === "index.html") || target === current) {
      link.setAttribute("aria-current", "page");
    }
  });

  const form = document.getElementById("home-whatsapp-form");
  if (form && !form.dataset.whatsappReady) {
    form.dataset.whatsappReady = "true";
    const whatsappNumber = "201060932029";
    const status = document.getElementById("whatsapp-form-status");
    const submit = form.querySelector(".whatsapp-submit");
    const fields = [
      { input: form.elements.fullName, error: document.getElementById("full-name-error"), label: "Full Name / الاسم الكامل" },
      { input: form.elements.subject, error: document.getElementById("subject-error"), label: "Subject / الموضوع" },
      { input: form.elements.message, error: document.getElementById("message-error"), label: "Message / الرسالة" }
    ];
    fields.forEach(({ input, error }) => input?.addEventListener("input", () => {
      if (input.value.trim()) {
        input.removeAttribute("aria-invalid");
        if (error) error.textContent = "";
      }
    }));
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      if (status) {
        status.textContent = "";
        status.className = "form-status";
      }
      let firstInvalid = null;
      fields.forEach(({ input, error, label }) => {
        if (!input) return;
        const valid = Boolean(input.value.trim());
        input.toggleAttribute("aria-invalid", !valid);
        if (error) error.textContent = valid ? "" : `${label} is required.`;
        if (!valid && !firstInvalid) firstInvalid = input;
      });
      if (firstInvalid) {
        if (status) {
          status.textContent = "Please complete all required fields. / يرجى استكمال جميع الحقول المطلوبة.";
          status.classList.add("error");
        }
        firstInvalid.focus();
        return;
      }
      const fullName = form.elements.fullName.value.trim();
      const subject = form.elements.subject.value.trim();
      const message = form.elements.message.value.trim();
      const whatsappMessage = `Hello Professor Khaled,

My name is: ${fullName}

Subject: ${subject}

Message:
${message}

Best regards,
${fullName}`;
      const whatsappURL = `https://wa.me/201060932029?text=${encodeURIComponent(whatsappMessage)}`;
      if (submit) {
        submit.disabled = true;
        submit.setAttribute("aria-busy", "true");
      }
      if (status) {
        status.textContent = "Opening WhatsApp… / جارٍ فتح واتساب…";
        status.classList.add("success");
      }
      window.open(whatsappURL, "_blank", "noopener,noreferrer");
      window.setTimeout(() => {
        if (submit) {
          submit.disabled = false;
          submit.removeAttribute("aria-busy");
        }
        if (status) status.textContent = "WhatsApp was opened in a new tab. / تم فتح واتساب في علامة تبويب جديدة.";
      }, 700);
    });
  }
})();
