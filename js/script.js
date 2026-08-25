document.addEventListener("DOMContentLoaded", () => {
  const cta = document.getElementById("bottom-cta");
  const sentinel = document.getElementById("lp-end");

  if (!cta || !sentinel) return;

  const BOTTOM_THRESHOLD = 24;

  const updateVisibility = () => {
    const reachedEnd = sentinel.getBoundingClientRect().top <= window.innerHeight + BOTTOM_THRESHOLD;
    cta.classList.toggle("is-visible", reachedEnd);
  };

  window.addEventListener("scroll", updateVisibility, { passive: true });
  window.addEventListener("resize", updateVisibility);
  updateVisibility();
});
