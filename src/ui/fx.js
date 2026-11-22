// Pointer-follow glow: feeds the cursor position into CSS variables on cards.
// Only runs on devices with a real hover pointer; CSS handles the visuals.
export function initFx() {
  if (!window.matchMedia || !window.matchMedia("(hover: hover)").matches) return;
  document.addEventListener(
    "pointermove",
    (e) => {
      const card = e.target.closest && e.target.closest(".service-card, .benefit-card, .contact-card");
      if (!card) return;
      const r = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${e.clientX - r.left}px`);
      card.style.setProperty("--my", `${e.clientY - r.top}px`);
    },
    { passive: true }
  );
}
