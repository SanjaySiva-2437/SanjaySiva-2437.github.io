const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if ("IntersectionObserver" in window && !prefersReducedMotion) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.08, rootMargin: "0px 0px -20px 0px" });
  document.querySelectorAll(".reveal").forEach((element, index) => {
    element.style.transitionDelay = String((index % 3) * 45) + "ms";
    observer.observe(element);
  });
} else {
  document.querySelectorAll(".reveal").forEach((element) => element.classList.add("visible"));
}

const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".main-nav");

function closeNavigation() {
  if (!menuButton || !navigation) return;
  navigation.classList.remove("open");
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "Open navigation");
}

if (menuButton && navigation) {
  menuButton.addEventListener("click", () => {
    const expanded = navigation.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(expanded));
    menuButton.setAttribute("aria-label", expanded ? "Close navigation" : "Open navigation");
  });
  navigation.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeNavigation));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeNavigation();
  });
}
