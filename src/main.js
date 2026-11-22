import { hydrateIcons, renderServices, renderProcess, renderBenefits, renderFaq, renderFooterLinks, initReveal } from "./ui/render.js";
import { initNav } from "./ui/nav.js";
import { renderContactCards, initForm } from "./ui/contact.js";
import { initFx } from "./ui/fx.js";

document.documentElement.classList.add("js");

// Each render function owns one section, so a section can later move to its own page.
renderServices();
renderProcess();
renderBenefits();
renderFaq();
renderFooterLinks();
renderContactCards();
initForm();
initNav();
hydrateIcons();
initReveal();
initFx();
