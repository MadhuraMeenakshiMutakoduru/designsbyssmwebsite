import { icon } from "./icons.js";
import { services, processSteps, benefits, faqs, navLinks } from "../data/content.js";

// Replace every <span data-icon="name" data-size="20"> placeholder with its inline SVG.
export function hydrateIcons(root = document) {
  root.querySelectorAll("[data-icon]").forEach((el) => {
    if (el.dataset.hydrated) return;
    el.innerHTML = icon(el.dataset.icon, { size: Number(el.dataset.size) || 20 });
    el.dataset.hydrated = "1";
    el.style.display = "inline-flex";
  });
}

const html = (strings, ...vals) => strings.reduce((a, s, i) => a + s + (vals[i] ?? ""), "");

export function renderServices() {
  const grid = document.getElementById("services-grid");
  grid.innerHTML = services
    .map(
      (s, i) => html`
      <article class="card service-card reveal" id="service-${s.id}" style="--d:${(i % 3) * 0.08}s">
        <div class="icon-badge">${icon(s.icon, { size: 28 })}</div>
        <h3>${s.title}</h3>
        <p>${s.desc}</p>
        <ul class="deliverables" aria-label="${s.title} deliverables">
          ${s.items.map((it) => `<li>${icon("check", { size: 18 })}<span>${it}</span></li>`).join("")}
        </ul>
        <a class="btn btn-accent btn-sm" href="#contact" data-quote="${s.title}" aria-label="Get a quote for ${s.title}">Get a Quote ${icon("arrow", { size: 18 })}</a>
      </article>`
    )
    .join("");
}

export function renderProcess() {
  document.getElementById("timeline").innerHTML = processSteps
    .map(
      (s, i) => html`
      <li class="step reveal" style="--d:${i * 0.08}s">
        <span class="step-num" aria-hidden="true">${i + 1}</span>
        <span class="step-icon">${icon(s.icon, { size: 26 })}</span>
        <h3><span class="sr-only">Step ${i + 1}: </span>${s.title}</h3>
        <p>${s.text}</p>
      </li>`
    )
    .join("");
}

export function renderBenefits() {
  document.getElementById("benefits-grid").innerHTML = benefits
    .map(
      (b, i) => html`
      <article class="card benefit-card reveal" style="--d:${(i % 3) * 0.08}s">
        <div class="icon-badge">${icon(b.icon, { size: 24 })}</div>
        <div><h3>${b.title}</h3><p>${b.text}</p></div>
      </article>`
    )
    .join("");
}

export function renderFaq() {
  const list = document.getElementById("faq-list");
  list.innerHTML = faqs
    .map(
      (f, i) => html`
      <div class="acc-item reveal">
        <h3>
          <button class="acc-btn" id="faq-btn-${i}" aria-expanded="false" aria-controls="faq-panel-${i}">
            <span>${f.q}</span><span class="acc-icon">${icon("plus", { size: 18 })}</span>
          </button>
        </h3>
        <div class="acc-panel" id="faq-panel-${i}" role="region" aria-labelledby="faq-btn-${i}" inert>
          <div><p>${f.a}</p></div>
        </div>
      </div>`
    )
    .join("");

  const buttons = [...list.querySelectorAll(".acc-btn")];
  buttons.forEach((btn, i) => {
    btn.addEventListener("click", () => {
      const item = btn.closest(".acc-item");
      const open = btn.getAttribute("aria-expanded") !== "true";
      btn.setAttribute("aria-expanded", String(open));
      item.classList.toggle("open", open);
      const panel = item.querySelector(".acc-panel");
      if (open) panel.removeAttribute("inert");
      else panel.setAttribute("inert", "");
    });
    btn.addEventListener("keydown", (e) => {
      const keys = { ArrowDown: 1, ArrowUp: -1 };
      if (e.key in keys) {
        e.preventDefault();
        buttons[(i + keys[e.key] + buttons.length) % buttons.length].focus();
      } else if (e.key === "Home") {
        e.preventDefault();
        buttons[0].focus();
      } else if (e.key === "End") {
        e.preventDefault();
        buttons[buttons.length - 1].focus();
      }
    });
  });
}

export function renderFooterLinks() {
  document.getElementById("footer-links").innerHTML = navLinks
    .map((l) => `<li><a href="#${l.id}" data-scroll>${l.id === "process" ? "Our Process" : l.label}</a></li>`)
    .join("");
  document.getElementById("footer-services").innerHTML = services
    .map((s) => `<li><a href="#service-${s.id}" data-scroll>${s.title}</a></li>`)
    .join("");
  document.getElementById("year").textContent = new Date().getFullYear();
}

// Fade-in on scroll (disabled automatically for reduced-motion users via CSS).
export function initReveal() {
  const els = document.querySelectorAll(".reveal");
  if (typeof window.IntersectionObserver !== "function") {
    els.forEach((el) => el.classList.add("in"));
    return;
  }
  const io = new IntersectionObserver(
    (entries) =>
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      }),
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  els.forEach((el) => io.observe(el));
}
