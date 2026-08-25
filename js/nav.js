document.addEventListener("DOMContentLoaded", () => {
  const btn = document.querySelector("[data-nav-toggle]");
  const menu = document.querySelector("[data-nav-menu]");
  if (!btn || !menu) return;

  const closeMenu = () => {
    btn.classList.remove("is-open");
    menu.classList.remove("is-open");
    btn.setAttribute("aria-expanded", "false");
  };

  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    const isOpen = menu.classList.toggle("is-open");
    btn.classList.toggle("is-open", isOpen);
    btn.setAttribute("aria-expanded", String(isOpen));
  });

  document.addEventListener("click", (e) => {
    if (!menu.contains(e.target) && !btn.contains(e.target)) closeMenu();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });
});
