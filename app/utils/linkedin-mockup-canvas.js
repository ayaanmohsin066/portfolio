/**
 * Realistic LinkedIn profile mockup for laptop screen texture.
 * Light grey page, navy bar with "in" logo, campus-style banner, white profile card, buttons.
 */

const LINKEDIN_BLUE = '#0A66C2';
const BG_PAGE = '#F3F2EF';
const CARD_WHITE = '#FFFFFF';
const TEXT_BLACK = '#000000';
const TEXT_GREY = '#00000099';
const TEXT_GREY_LIGHT = '#666666';
const BORDER = '#e0e0e0';
const PROFILE_PHOTO_BG = '#e0e0e0';
const FONT = '-apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif';

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

  // Page background (LinkedIn light grey)
  ctx.fillStyle = BG_PAGE;
  ctx.fillRect(0, 0, w, h);

  // Top navy blue bar
  const barH = 52;
  ctx.fillStyle = LINKEDIN_BLUE;
  ctx.fillRect(0, 0, w, barH);

  // "in" logo (white text on blue bar)
  ctx.font = `600 20px ${FONT}`;
  ctx.fillStyle = '#FFFFFF';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.fillText('in', 24, barH / 2);

  // Banner (University of Waterloo feel: teal/green gradient)
  const bannerH = 200;
  const gradient = ctx.createLinearGradient(0, barH, 0, barH + bannerH);
  gradient.addColorStop(0, '#0d9488');
  gradient.addColorStop(0.5, '#0f766e');
  gradient.addColorStop(1, '#134e4a');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, barH, w, bannerH);

  // White profile card with shadow
  const cardX = Math.max(32, w * 0.14);
  const cardW = w - cardX * 2;
  const cardTop = barH + bannerH - 64;
  const cardH = 340;
  ctx.shadowColor = 'rgba(0,0,0,0.12)';
  ctx.shadowBlur = 16;
  ctx.shadowOffsetY = 4;
  ctx.fillStyle = CARD_WHITE;
  ctx.beginPath();
  roundRect(ctx, cardX, cardTop, cardW, cardH, 8);
  ctx.fill();
  ctx.shadowColor = 'transparent';
  ctx.shadowBlur = 0;
  ctx.shadowOffsetY = 0;

  // Card border
  ctx.strokeStyle = BORDER;
  ctx.lineWidth = 1;
  ctx.beginPath();
  roundRect(ctx, cardX, cardTop, cardW, cardH, 8);
  ctx.stroke();

  // Circular profile photo placeholder
  const photoRadius = 48;
  const photoCenterX = cardX + 40;
  const photoCenterY = cardTop - photoRadius + 32;
  ctx.fillStyle = PROFILE_PHOTO_BG;
  ctx.beginPath();
  ctx.arc(photoCenterX, photoCenterY, photoRadius, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = CARD_WHITE;
  ctx.lineWidth = 4;
  ctx.stroke();

  // Name (bold black 22px)
  const textLeft = cardX + 40;
  let contentY = cardTop + 48;
  ctx.font = `600 22px ${FONT}`;
  ctx.fillStyle = TEXT_BLACK;
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.fillText('Ayaan Mohsin', textLeft, contentY);

  // Title (grey 13px, wrapped)
  const title =
    'Mathematics @ University of Waterloo | Data Analysis, Python & Statistics | Aspiring Quantitative Analyst';
  ctx.fillStyle = TEXT_GREY;
  ctx.font = `400 13px ${FONT}`;
  const maxTitleW = cardW - 80;
  const titleLines = wrapText(ctx, title, maxTitleW);
  contentY += 28;
  for (const line of titleLines) {
    ctx.fillText(line, textLeft, contentY);
    contentY += 18;
  }

  // Location (grey 12px)
  contentY += 6;
  ctx.font = `400 12px ${FONT}`;
  ctx.fillText('Waterloo, Ontario, Canada', textLeft, contentY);

  // 500+ connections (blue 12px)
  contentY += 22;
  ctx.fillStyle = LINKEDIN_BLUE;
  ctx.font = `500 12px ${FONT}`;
  ctx.fillText('500+ connections', textLeft, contentY);

  // Buttons row
  const btnY = contentY + 28;
  const btnHeight = 32;
  const btnPaddingX = 16;
  const btnGap = 12;

  // "Open to" (blue filled)
  ctx.font = `600 14px ${FONT}`;
  const openToW = ctx.measureText('Open to').width + btnPaddingX * 2;
  const openToX = textLeft;
  ctx.fillStyle = LINKEDIN_BLUE;
  ctx.beginPath();
  roundRect(ctx, openToX, btnY - btnHeight / 2, openToW, btnHeight, 16);
  ctx.fill();
  ctx.fillStyle = '#FFFFFF';
  ctx.textAlign = 'center';
  ctx.fillText('Open to', openToX + openToW / 2, btnY);

  // "Add profile section" (outlined)
  ctx.font = `600 14px ${FONT}`;
  const addSectionW = ctx.measureText('Add profile section').width + btnPaddingX * 2;
  const addSectionX = openToX + openToW + btnGap;
  ctx.strokeStyle = LINKEDIN_BLUE;
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  roundRect(ctx, addSectionX, btnY - btnHeight / 2, addSectionW, btnHeight, 16);
  ctx.stroke();
  ctx.fillStyle = LINKEDIN_BLUE;
  ctx.fillText('Add profile section', addSectionX + addSectionW / 2, btnY);

  return canvas;
}

function roundRect(ctx, x, y, width, height, radius) {
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
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
