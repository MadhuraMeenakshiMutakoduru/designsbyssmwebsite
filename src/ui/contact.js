import {
  siteConfig,
  hasInstagram,
  hasMobile,
  hasWhatsapp,
  getInstagramUrl,
  getWhatsappUrl,
  getTelUrl,
  getMailtoUrl,
  getMissingConfig
} from "../config/siteConfig.js";
import { services, serviceOptions, preferredContactOptions } from "../data/content.js";
import { icon } from "./icons.js";
import { qrSvg } from "./qr.js";

const $ = (id) => document.getElementById(id);
const esc = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

/* ------------------------------------------------------------------ */
/* Contact cards + footer contact (all read from siteConfig)           */
/* ------------------------------------------------------------------ */
function setupNote(field, label) {
  return `<p class="setup-note">Setup reminder: add your ${label} to <code>${field}</code> in <code>src/config/siteConfig.js</code>. This button stays hidden until then.</p>`;
}

export function renderContactCards() {
  const mailto = getMailtoUrl(siteConfig, { subject: `Enquiry for ${siteConfig.brandName}` });
  const ig = getInstagramUrl();
  const wa = getWhatsappUrl(siteConfig, `Hi ${siteConfig.brandName}, I'd like to discuss a project.`);
  const tel = getTelUrl();

  const emailCard = `
    <article class="contact-card reveal">
      <div class="cc-head"><div class="icon-badge">${icon("mail", { size: 24 })}</div><h3>Email Us</h3></div>
      <p>Send your requirements and we'll review your enquiry and discuss the next steps.</p>
      <a class="detail" href="${mailto}">${esc(siteConfig.email)}</a>
      <a class="btn btn-accent btn-sm" href="${mailto}">Email Us ${icon("arrow", { size: 18 })}</a>
    </article>`;

  const igCard = ig
    ? `
    <article class="contact-card ig-card reveal">
      <div class="ig-head"><span class="ig-badge">${icon("instagram", { size: 22 })}</span><h3>Follow Us on Instagram</h3></div>
      <p class="ig-invite">Explore our creative content and see the kind of work we love making.</p>
      <div class="qr-frame">
        <div class="qr-tile">${qrSvg(ig, { label: `QR code linking to the ${siteConfig.brandName} Instagram profile` })}</div>
      </div>
      <p class="ig-scan">Scan the QR code or proceed via button.</p>
      <a class="btn btn-white btn-block" href="${ig}" target="_blank" rel="noopener noreferrer">Go To Profile ${icon("arrow", { size: 20 })}</a>
    </article>`
    : `
    <article class="contact-card reveal">
      <div class="cc-head"><div class="icon-badge">${icon("instagram", { size: 24 })}</div><h3>Follow Us on Instagram</h3></div>
      <p>Explore our creative content and see the kind of work we love making.</p>
      ${setupNote("instagramUsername", "Instagram username")}
    </article>`;

  const waCard = `
    <article class="contact-card reveal">
      <div class="cc-head"><div class="icon-badge">${icon("whatsapp", { size: 24 })}</div><h3>Chat With Us</h3></div>
      <p>Prefer a quick conversation? Message us to discuss your project.</p>
      ${hasMobile() ? `<a class="detail" ${tel ? `href="${tel}"` : ""}>${esc(siteConfig.mobileNumber)}</a>` : ""}
      ${
        wa
          ? `<a class="btn btn-accent btn-sm" href="${wa}" target="_blank" rel="noopener noreferrer">Chat on WhatsApp ${icon("arrow", { size: 18 })}</a>`
          : setupNote("whatsappNumber", "WhatsApp number (digits only, with country code, e.g. 91XXXXXXXXXX)")
      }
    </article>`;

  $("contact-cards").innerHTML = emailCard + igCard + waCard;

  // Footer contact list + buttons: only real, configured items are shown.
  const items = [
    `<li>${icon("mail", { size: 18 })}<a href="${mailto}">${esc(siteConfig.email)}</a></li>`
  ];
  if (hasMobile()) {
    items.push(
      `<li>${icon("phone", { size: 18 })}${tel ? `<a href="${tel}">${esc(siteConfig.mobileNumber)}</a>` : esc(siteConfig.mobileNumber)}</li>`
    );
  }
  $("footer-contact").innerHTML = items.join("");

  const btns = [];
  if (wa) btns.push(`<a class="btn btn-accent btn-sm" href="${wa}" target="_blank" rel="noopener noreferrer">${icon("whatsapp", { size: 18 })} WhatsApp</a>`);
  if (ig) btns.push(`<a class="btn btn-outline-light btn-sm" href="${ig}" target="_blank" rel="noopener noreferrer">${icon("instagram", { size: 18 })} Instagram</a>`);
  $("footer-buttons").innerHTML = btns.join("");

  const missing = getMissingConfig();
  if (missing.length) {
    console.info(
      `[DesignsBySSM] Placeholder contact details still in src/config/siteConfig.js: ${missing.join(", ")}. Links for these are hidden until configured.`
    );
  }
}

/* ------------------------------------------------------------------ */
/* Enquiry form                                                        */
/* ------------------------------------------------------------------ */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function initForm() {
  const form = $("quote-form");
  const status = $("form-status");
  const serviceSel = $("f-service");
  const multiWrap = $("multi-wrap");

  const opt = (v, label = v, extra = "") => `<option value="${esc(v)}"${extra}>${esc(label)}</option>`;
  serviceSel.innerHTML = opt("", "Select a service…") + serviceOptions.map((s) => opt(s)).join("");
  $("f-budget").innerHTML = siteConfig.budgetOptions.map((b) => opt(b)).join("");
  $("f-contact").innerHTML = preferredContactOptions.map((c) => opt(c)).join("");
  $("multi-grid").innerHTML = services
    .map((s) => `<label class="check"><input type="checkbox" name="multi" value="${esc(s.title)}" /> ${esc(s.title)}</label>`)
    .join("");

  if (siteConfig.formEndpoint) {
    $("form-intro-text").innerHTML =
      "Fill in the details below and press <strong>Send enquiry</strong>. Your enquiry is sent straight to our inbox and we'll get back to you soon.";
  }

  const syncMulti = () => {
    multiWrap.hidden = serviceSel.value !== "Multiple Services";
  };
  serviceSel.addEventListener("change", syncMulti);

  // "Get a Quote" buttons preselect the matching service
  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-quote]");
    if (!btn) return;
    const service = btn.dataset.quote;
    if (serviceOptions.includes(service)) {
      serviceSel.value = service;
      clearError("f-service");
      syncMulti();
      setStatus(`“${service}” has been selected for you below.`, "");
    }
    setTimeout(() => $("f-name").focus({ preventScroll: true }), 50);
  });

  /* ---- validation ---- */
  const field = (id) => $(id).closest(".field");
  function showError(id, msg) {
    const input = $(id);
    const wrap = field(id);
    wrap.classList.add("invalid");
    input.setAttribute("aria-invalid", "true");
    wrap.querySelector(".error").textContent = msg;
  }
  function clearError(id) {
    const input = $(id);
    const wrap = field(id);
    if (!wrap) return;
    wrap.classList.remove("invalid");
    input.removeAttribute("aria-invalid");
    const err = wrap.querySelector(".error");
    if (err) err.textContent = "";
  }
  ["f-name", "f-email", "f-service", "f-desc"].forEach((id) => {
    $(id).addEventListener("input", () => clearError(id));
    $(id).addEventListener("change", () => clearError(id));
  });

  function validate() {
    const errors = [];
    const name = $("f-name").value.trim();
    const email = $("f-email").value.trim();
    const service = serviceSel.value;
    const desc = $("f-desc").value.trim();
    ["f-name", "f-email", "f-service", "f-desc"].forEach(clearError);

    if (!name) errors.push(["f-name", "Please enter your full name."]);
    if (!email) errors.push(["f-email", "Please enter your email address."]);
    else if (!EMAIL_RE.test(email)) errors.push(["f-email", "Please enter a valid email address, like name@example.com."]);
    if (!service) errors.push(["f-service", "Please choose the service you need."]);
    if (!desc) errors.push(["f-desc", "Please tell us a little about your project."]);

    errors.forEach(([id, msg]) => showError(id, msg));
    if (errors.length) $(errors[0][0]).focus();
    return errors.length === 0;
  }

  function collect() {
    const picked = [...form.querySelectorAll('input[name="multi"]:checked')].map((c) => c.value);
    return {
      name: $("f-name").value.trim(),
      email: $("f-email").value.trim(),
      service: serviceSel.value,
      services: serviceSel.value === "Multiple Services" ? picked : [],
      description: $("f-desc").value.trim(),
      budget: $("f-budget").value,
      contactMethod: $("f-contact").value
    };
  }

  function buildEmail(d) {
    const serviceLine =
      d.service === "Multiple Services" && d.services.length
        ? `Multiple Services (${d.services.join(", ")})`
        : d.service;
    const subject = `New enquiry: ${serviceLine.length > 60 ? "Multiple Services" : serviceLine} - ${d.name}`;
    const body = [
      `Hello ${siteConfig.brandName},`,
      "",
      "I'd like to enquire about your services.",
      "",
      `Name: ${d.name}`,
      `Email: ${d.email}`,
      `Service required: ${serviceLine}`,
      `Budget range: ${d.budget || "Not specified"}`,
      `Preferred contact method: ${d.contactMethod || "No preference"}`,
      "",
      "Project description:",
      d.description,
      "",
      "Thank you."
    ].join("\n");
    return { subject, body };
  }

  function setStatus(msg, kind) {
    status.className = "form-status" + (kind ? ` ${kind}-state` : "");
    status.textContent = msg;
  }

  function openMailto(url) {
    const a = document.createElement("a");
    a.href = url;
    a.style.display = "none";
    document.body.appendChild(a);
    a.click();
    a.remove();
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!validate()) {
      setStatus("Please check the highlighted fields. Everything you typed has been kept.", "error");
      return;
    }
    const data = collect();
    const { subject, body } = buildEmail(data);

    // Spam trap: bots fill the hidden field. Pretend success, send nothing.
    if ($("f-hp").value) {
      setStatus("Thank you! Your enquiry has been received.", "success");
      return;
    }

    // Direct sending through a form service (siteConfig.formEndpoint).
    if (siteConfig.formEndpoint) {
      const btn = $("submit-btn");
      btn.disabled = true;
      setStatus("Sending your enquiry…", "");
      try {
        const serviceLine =
          data.service === "Multiple Services" && data.services.length
            ? `Multiple Services (${data.services.join(", ")})`
            : data.service;
        const res = await fetch(siteConfig.formEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            _subject: subject,
            _template: "table",
            Name: data.name,
            email: data.email,
            "Service required": serviceLine,
            "Budget range": data.budget || "Not specified",
            "Preferred contact method": data.contactMethod || "No preference",
            "Project description": data.description
          })
        });
        let result = null;
        try { result = await res.json(); } catch { /* non-JSON response */ }
        // Only report success when the service explicitly confirms it.
        const confirmed = res.ok && result && (result.success === true || result.success === "true");
        if (!confirmed) {
          const reason = result && result.message ? ` (${result.message})` : "";
          throw new Error(`Not confirmed${reason}`);
        }
        setStatus("Thank you! Your enquiry has been sent. We'll review it and get back to you soon.", "success");
        form.reset();
        syncMulti();
      } catch (err) {
        console.warn("[DesignsBySSM] Enquiry was not sent:", err);
        setStatus(
          `Sorry, we couldn't send your enquiry just now. Nothing has been sent. Your details are still here: please try again, or use “Copy enquiry text” and email it to ${siteConfig.email}.`,
          "error"
        );
      } finally {
        btn.disabled = false;
      }
      return;
    }

    // Default: client-side mailto fallback (no backend configured).
    openMailto(getMailtoUrl(siteConfig, { subject, body }));
    setStatus(
      `Your email app should now open with your enquiry filled in. Please press Send in that app to complete it. Nothing has been sent yet, because this website does not transmit enquiries automatically. If nothing opens, use “Copy enquiry text” and email it to ${siteConfig.email}.`,
      ""
    );
    status.focus();
  });

  $("copy-btn").addEventListener("click", async () => {
    if (!validate()) {
      setStatus("Please complete the highlighted fields first, then copy your enquiry.", "error");
      return;
    }
    const { subject, body } = buildEmail(collect());
    const text = `To: ${siteConfig.email}\nSubject: ${subject}\n\n${body}`;
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand("copy"); } catch { /* ignore */ }
      ta.remove();
    }
    setStatus(`Enquiry text copied. Paste it into an email to ${siteConfig.email} and send it to complete your enquiry.`, "");
  });
}
