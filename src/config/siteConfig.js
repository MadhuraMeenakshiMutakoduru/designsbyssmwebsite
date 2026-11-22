// Central brand configuration for DesignsBySSM.
// Replace the YOUR_* placeholders below; everything else on the site reads from here.
export const siteConfig = {
  brandName: "DesignsBySSM",
  email: "designsbyssm.in@gmail.com",
  instagramUsername: "designsbyssm",
  mobileNumber: "9999999999", // temporary number: replace with your real one
  whatsappNumber: "919999999999", // digits only, with country code (91 + mobile number)
  colors: {
    royalBlue: "#075B9A",
    goldenYellow: "#FFD447",
    white: "#FFFFFF"
  },
  // Indicative enquiry categories, NOT official pricing. Edit freely.
  budgetOptions: [
    "Not decided yet",
    "Prefer to discuss",
    "Under ₹5,000",
    "₹5,000 – ₹15,000",
    "₹15,000 – ₹30,000",
    "₹30,000+"
  ],
  // Empty = the form opens the visitor's email app with the enquiry filled in.
  // To send directly instead, set this to a form service URL, e.g. "https://formsubmit.co/ajax/designsbyssm.in@gmail.com"
  formEndpoint: ""
};

const isPlaceholder = (value) =>
  !value || /^YOUR_/i.test(String(value).trim());

export function hasInstagram(config = siteConfig) {
  const u = String(config.instagramUsername || "").trim().replace(/^@/, "");
  return !isPlaceholder(u) && /^[A-Za-z0-9._]{1,30}$/.test(u);
}

export function getInstagramUrl(config = siteConfig) {
  if (!hasInstagram(config)) return null;
  const u = config.instagramUsername.trim().replace(/^@/, "");
  return `https://www.instagram.com/${u}/`;
}

export function hasMobile(config = siteConfig) {
  return !isPlaceholder(config.mobileNumber);
}

export function getTelUrl(config = siteConfig) {
  if (!hasMobile(config)) return null;
  const digits = String(config.mobileNumber).replace(/[^\d+]/g, "");
  return digits ? `tel:${digits}` : null;
}

export function normalizeWhatsappNumber(raw) {
  return String(raw || "").replace(/\D/g, "");
}

export function hasWhatsapp(config = siteConfig) {
  if (isPlaceholder(config.whatsappNumber)) return false;
  const n = normalizeWhatsappNumber(config.whatsappNumber);
  return n.length >= 10 && n.length <= 15;
}

export function getWhatsappUrl(config = siteConfig, message = "") {
  if (!hasWhatsapp(config)) return null;
  const n = normalizeWhatsappNumber(config.whatsappNumber);
  return message
    ? `https://wa.me/${n}?text=${encodeURIComponent(message)}`
    : `https://wa.me/${n}`;
}

export function getMailtoUrl(config = siteConfig, { subject = "", body = "" } = {}) {
  const params = [];
  if (subject) params.push(`subject=${encodeURIComponent(subject)}`);
  if (body) params.push(`body=${encodeURIComponent(body)}`);
  return `mailto:${config.email}${params.length ? "?" + params.join("&") : ""}`;
}

// Reports which contact details are still placeholders (used for the setup reminder).
export function getMissingConfig(config = siteConfig) {
  const missing = [];
  if (!hasInstagram(config)) missing.push("instagramUsername");
  if (!hasMobile(config)) missing.push("mobileNumber");
  if (!hasWhatsapp(config)) missing.push("whatsappNumber");
  return missing;
}
