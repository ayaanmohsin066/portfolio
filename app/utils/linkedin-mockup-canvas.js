/**
 * Draws a LinkedIn profile mockup for use as a laptop screen texture.
 * Blue header, profile area, name, title, location, connections. Navy/white scheme.
 */

const LINKEDIN_BLUE = '#0a66c2';
const HEADER_NAVY = '#057642';
const BG_WHITE = '#f3f6f8';
const CARD_WHITE = '#ffffff';
const TEXT_DARK = '#000000e6';
const TEXT_SECONDARY = '#00000099';
const BORDER = '#e0e0e0';
const PROFILE_PLACEHOLDER = '#e0e0e0';

/**
 * @param {number} width
 * @param {number} height
 * @returns {HTMLCanvasElement}
 */
export function createLinkedInMockupCanvas(width = 1280, height = 800) {
  const dpr = Math.min(2, typeof window !== 'undefined' ? window.devicePixelRatio : 2);
  const canvas = document.createElement('canvas');
  canvas.width = width * dpr;
  canvas.height = height * dpr;

  const ctx = canvas.getContext('2d');
  if (!ctx) return canvas;

  ctx.scale(dpr, dpr);
  const w = width;
  const h = height;

  // Page background
  ctx.fillStyle = BG_WHITE;
  ctx.fillRect(0, 0, w, h);

  // Top bar (LinkedIn blue)
  const barH = 52;
  ctx.fillStyle = LINKEDIN_BLUE;
  ctx.fillRect(0, 0, w, barH);

  // Banner / cover area (light gray)
  const bannerH = 200;
  ctx.fillStyle = '#e0e0e0';
  ctx.fillRect(0, barH, w, bannerH);

  // Main content card (white)
  const cardX = Math.max(24, w * 0.12);
  const cardW = w - cardX * 2;
  const cardTop = barH + bannerH - 60;
  const cardH = 320;
  ctx.fillStyle = CARD_WHITE;
  ctx.shadowColor = 'rgba(0,0,0,0.08)';
  ctx.shadowBlur = 12;
  ctx.shadowOffsetY = 2;
  ctx.fillRect(cardX, cardTop, cardW, cardH);
  ctx.shadowColor = 'transparent';
  ctx.shadowBlur = 0;
  ctx.shadowOffsetY = 0;

  // Profile photo circle placeholder
  const photoRadius = 52;
  const photoX = cardX + 32;
  const photoY = cardTop - photoRadius + 20;
  ctx.fillStyle = PROFILE_PLACEHOLDER;
  ctx.beginPath();
  ctx.arc(photoX + photoRadius, photoY + photoRadius, photoRadius, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = CARD_WHITE;
  ctx.lineWidth = 4;
  ctx.stroke();

  // Name
  ctx.fillStyle = TEXT_DARK;
  ctx.font = '600 24px system-ui, -apple-system, sans-serif';
  ctx.fillText('Ayaan Mohsin', photoX + photoRadius * 2 + 24, cardTop + 50);

  // Title (wrapped)
  const title =
    'Mathematics @ University of Waterloo | Data Analysis, Python & Statistics | Aspiring Quantitative Analyst';
  ctx.fillStyle = TEXT_SECONDARY;
  ctx.font = '400 14px system-ui, -apple-system, sans-serif';
  const maxTitleW = cardW - 120;
  const titleLines = wrapText(ctx, title, maxTitleW);
  let ty = cardTop + 82;
  for (const line of titleLines) {
    ctx.fillText(line, cardX + 32, ty);
    ty += 20;
  }

  // Location
  ctx.font = '400 13px system-ui, -apple-system, sans-serif';
  ctx.fillText('Waterloo, Ontario, Canada', cardX + 32, ty + 12);

  // Connections
  ctx.fillStyle = LINKEDIN_BLUE;
  ctx.font = '500 13px system-ui, -apple-system, sans-serif';
  ctx.fillText('500+ connections', cardX + 32, ty + 40);

  return canvas;
}

function wrapText(ctx, text, maxWidth) {
  const words = text.split(' ');
  const lines = [];
  let current = '';
  for (const word of words) {
    const test = current ? `${current} ${word}` : word;
    const m = ctx.measureText(test);
    if (m.width > maxWidth && current) {
      lines.push(current);
      current = word;
    } else {
      current = test;
    }
  }
  if (current) lines.push(current);
  return lines;
}
