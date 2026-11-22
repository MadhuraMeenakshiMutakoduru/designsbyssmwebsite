import { navLinks } from "../data/content.js";
import { icon } from "./icons.js";

export function initNav() {
  const header = document.getElementById("site-header");
  const nav = document.getElementById("primary-nav");
  const toggle = document.getElementById("nav-toggle");
  const list = document.getElementById("nav-list");

  list.innerHTML = navLinks
    .map((l) => `<li><a href="#${l.id}" data-scroll data-spy="${l.id}">${l.label}</a></li>`)
    .join("");

  const setToggle = (open) => {
    nav.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    toggle.innerHTML = icon(open ? "close" : "menu", { size: 24 });
  };
  setToggle(false);
  toggle.addEventListener("click", () => setToggle(!nav.classList.contains("open")));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && nav.classList.contains("open")) {
      setToggle(false);
      toggle.focus();
    }
  });

  // Smooth scrolling for every in-page link
  document.addEventListener("click", (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const id = a.getAttribute("href").slice(1);
    if (!id) return;
    const target = document.getElementById(id);
    if (!target) return;
    e.preventDefault();
    setToggle(false);
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    history.replaceState(null, "", `#${id}`);
    target.setAttribute("tabindex", "-1");
    target.focus({ preventScroll: true });
    if (target.classList.contains("card")) {
      target.classList.remove("flash");
      void target.offsetWidth; // restart animation
      target.classList.add("flash");
    }
  });

  // Scroll-spy + header shadow
  const spyLinks = [...list.querySelectorAll("a")];
  const sections = navLinks.map((l) => document.getElementById(l.id)).filter(Boolean);
  let ticking = false;
  const update = () => {
    ticking = false;
    header.classList.toggle("scrolled", window.scrollY > 8);
    const line = window.scrollY + header.offsetHeight + 120;
    let current = sections[0]?.id;
    for (const s of sections) if (s.offsetTop <= line) current = s.id;
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
      current = sections[sections.length - 1]?.id;
    }
    spyLinks.forEach((a) => {
      const on = a.dataset.spy === current;
      a.classList.toggle("active", on);
      if (on) a.setAttribute("aria-current", "true");
      else a.removeAttribute("aria-current");
    });
  };
  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    },
    { passive: true }
  );
  window.addEventListener("resize", update);
  update();
}
