// Little Steps Public School demo interactions
document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const preloader = document.getElementById("preloader");
  const hideLoader = () => {
    if (preloader) {
      preloader.classList.add("is-hidden");
      body.classList.remove("is-loading");
      window.setTimeout(() => preloader.remove(), 650);
    }
  };
  window.addEventListener("load", () => window.setTimeout(hideLoader, 650), { once: true });
  window.setTimeout(hideLoader, 2400);

  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".main-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("nav-open");
      toggle.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
      body.classList.toggle("menu-open", open);
    });
    nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
      nav.classList.remove("nav-open");
      toggle.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      body.classList.remove("menu-open");
    }));
  }

  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(el => observer.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add("revealed"));
  }

  const lightbox = document.getElementById("lightbox");
  if (lightbox) {
    const lightboxImg = lightbox.querySelector("img");
    const close = () => {
      lightbox.classList.remove("open");
      lightbox.setAttribute("aria-hidden", "true");
      document.body.classList.remove("lightbox-open");
      window.setTimeout(() => { if (!lightbox.classList.contains("open")) lightboxImg.src = ""; }, 250);
    };
    document.querySelectorAll("[data-lightbox]").forEach(button => button.addEventListener("click", () => {
      lightboxImg.src = button.dataset.lightbox;
      lightbox.classList.add("open");
      lightbox.setAttribute("aria-hidden", "false");
      document.body.classList.add("lightbox-open");
    }));
    lightbox.querySelector(".lightbox-close").addEventListener("click", close);
    lightbox.addEventListener("click", e => { if (e.target === lightbox) close(); });
    document.addEventListener("keydown", e => { if (e.key === "Escape") close(); });
  }

  const openWhatsApp = (form, title) => {
    const data = new FormData(form);
    const lines = [`Hello Little Steps Public School, I have an enquiry (${title}).`];
    data.forEach((value, key) => {
      if (key !== "consent" && String(value).trim()) lines.push(`${key.replace(/([A-Z])/g, " $1").replace(/^./, s => s.toUpperCase())}: ${String(value).trim()}`);
    });
    const phone = "919876543210"; // Replace with the school's WhatsApp number, country code included.
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(lines.join("\n"))}`;
    const status = form.querySelector(".form-status");
    if (status) status.textContent = "Opening WhatsApp with your message. Please review it and press Send to contact the school.";
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const admissionForm = document.getElementById("admissionEnquiryForm");
  if (admissionForm) admissionForm.addEventListener("submit", e => {
    e.preventDefault();
    if (!admissionForm.reportValidity()) return;
    openWhatsApp(admissionForm, "Admission enquiry");
  });
  const contactForm = document.getElementById("contactForm");
  if (contactForm) contactForm.addEventListener("submit", e => {
    e.preventDefault();
    if (!contactForm.reportValidity()) return;
    openWhatsApp(contactForm, "General contact");
  });

  document.querySelectorAll(".faq-item").forEach(item => {
    item.addEventListener("toggle", () => {
      const sign = item.querySelector("summary span");
      if (sign) sign.textContent = item.open ? "−" : "+";
    });
  });
});
