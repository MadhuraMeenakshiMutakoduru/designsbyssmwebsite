import qrcode from "qrcode-generator";

// Builds an inline SVG QR code for `text`. Modules use currentColor on a white background
// with a 4-module quiet zone, so it stays reliably scannable.
export function qrSvg(text, { label = "QR code", margin = 4 } = {}) {
  const qr = qrcode(0, "M");
  qr.addData(text);
  qr.make();
  const n = qr.getModuleCount();
  const size = n + margin * 2;
  let d = "";
  for (let r = 0; r < n; r++) {
    let c = 0;
    while (c < n) {
      if (!qr.isDark(r, c)) { c++; continue; }
      let start = c;
      while (c < n && qr.isDark(r, c)) c++;
      d += `M${start + margin} ${r + margin}h${c - start}v1h-${c - start}z`;
    }
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" role="img" aria-label="${label}" shape-rendering="crispEdges"><rect width="${size}" height="${size}" fill="#fff"/><path d="${d}" fill="currentColor"/></svg>`;
}
