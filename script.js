const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if ("IntersectionObserver" in window && !prefersReducedMotion) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach((el, i) => {
    el.style.setProperty("--delay", `${Math.min(i % 4, 3) * 70}ms`);
    observer.observe(el);
  });
} else {
  document.querySelectorAll(".reveal").forEach((el) => el.classList.add("visible"));
}

const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav nav");
menuButton?.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
});
nav?.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
  nav.classList.remove("open");
  menuButton?.setAttribute("aria-expanded", "false");
  menuButton?.setAttribute("aria-label", "Open navigation");
}));

// Restrained pointer parallax; respect reduced-motion preferences.
const visual = document.querySelector(".hero-visual");
if (visual && !prefersReducedMotion) {
  visual.addEventListener("pointermove", (event) => {
    const rect = visual.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    visual.querySelectorAll(".orbital").forEach((orbital, index) => {
      orbital.style.translate = `${x * (index + 1) * 7}px ${y * (index + 1) * 7}px`;
    });
  });
  visual.addEventListener("pointerleave", () => {
    visual.querySelectorAll(".orbital").forEach((orbital) => { orbital.style.translate = "0 0"; });
  });
}
