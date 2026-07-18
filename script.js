(() => {
  const selectors = {
    navToggle: ".nav-toggle",
    nav: ".site-nav",
    navLinks: ".site-nav a",
    currentYear: "#current-year",
    contactForm: "#contact-form",
    formStatus: "#form-status",
    header: ".site-header"
  };

  const setCurrentYear = () => {
    const yearElement = document.querySelector(selectors.currentYear);
    if (yearElement) {
      yearElement.textContent = String(new Date().getFullYear());
    }
  };

  const initMobileNavigation = () => {
    const navToggle = document.querySelector(selectors.navToggle);
    const nav = document.querySelector(selectors.nav);
    if (!navToggle || !nav) {
      return;
    }

    const closeNav = () => {
      nav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    };

    navToggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    nav.querySelectorAll(selectors.navLinks).forEach((link) => {
      link.addEventListener("click", closeNav);
    });

    document.addEventListener("click", (event) => {
      const target = event.target;
      if (!(target instanceof Element)) {
        return;
      }

      if (!target.closest(".header-inner")) {
        closeNav();
      }
    });
  };

  const initContactForm = () => {
    const form = document.querySelector(selectors.contactForm);
    const status = document.querySelector(selectors.formStatus);
    if (!(form instanceof HTMLFormElement) || !(status instanceof HTMLElement)) {
      return;
    }

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      form.classList.add("is-submitted");
      status.classList.remove("is-success", "is-error");

      const requiredTextFields = ["nombre-cargo", "empresa", "email-corporativo", "desafio"];
      requiredTextFields.forEach((fieldName) => {
        const field = form.elements.namedItem(fieldName);
        if (!(field instanceof HTMLInputElement) && !(field instanceof HTMLTextAreaElement)) {
          return;
        }
        field.value = field.value.trim();
      });

      if (!form.checkValidity()) {
        status.textContent = "Por favor completa los campos obligatorios para enviar tu solicitud.";
        status.classList.add("is-error");
        const firstInvalid = form.querySelector(":invalid");
        if (firstInvalid instanceof HTMLElement) {
          firstInvalid.focus();
        }
        return;
      }

      const formData = new FormData(form);
      const nombreCargo = String(formData.get("nombre-cargo") || "");
      const empresa = String(formData.get("empresa") || "");
      const email = String(formData.get("email-corporativo") || "");
      const telefono = String(formData.get("telefono") || "No informado");
      const desafio = String(formData.get("desafio") || "");
      const subject = encodeURIComponent(`Solicitud de contacto B2B - ${empresa}`);
      const body = encodeURIComponent(
        `Nombre y cargo: ${nombreCargo}\nEmpresa: ${empresa}\nEmail corporativo: ${email}\nTelefono: ${telefono}\nDesafio principal:\n${desafio}`
      );

      status.textContent = "Solicitud preparada correctamente. Abriremos tu correo para enviarla al equipo comercial de NexoMatrix.";
      status.classList.add("is-success");
      window.location.href = `mailto:contacto@empresa-ti.cl?subject=${subject}&body=${body}`;
      form.reset();
      form.classList.remove("is-submitted");
    });
  };

  const initScrollEffects = () => {
    const header = document.querySelector(selectors.header);
    if (!header) return;

    const onScroll = () => {
      if (window.scrollY > 50) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  };

  const init = () => {
    setCurrentYear();
    initMobileNavigation();
    initContactForm();
    initScrollEffects();
  };

  document.addEventListener("DOMContentLoaded", init);
})();
