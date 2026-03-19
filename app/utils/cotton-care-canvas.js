const BG = '#0D1117';
const CARD_BG = '#161B22';
const GOLD = '#C9A84C';
const GOLD_LIGHT = '#E5C66F';
const TEXT_SOFT = '#D1D5DB';
const FONT_SANS = '-apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif';

/**
 * Premium Cotton Care dashboard texture for laptop screen.
 * @param {number} width
 * @param {number} height
 * @returns {HTMLCanvasElement}
 */
export function createCottonCareCanvas(width = 1280, height = 800) {
  if (typeof document === 'undefined') return null;

  const dpr = Math.min(2, window.devicePixelRatio || 1);
  const canvas = document.createElement('canvas');
  canvas.width = width * dpr;
  canvas.height = height * dpr;

  const ctx = canvas.getContext('2d');
  if (!ctx) return canvas;

  ctx.scale(dpr, dpr);
  const w = width;
  const h = height;
  const pad = 56;

  // Deep navy background
  ctx.fillStyle = BG;
  ctx.fillRect(0, 0, w, h);

  // Subtle diagonal fabric texture
  ctx.strokeStyle = 'rgba(201, 168, 76, 0.08)';
  ctx.lineWidth = 1;
  for (let i = -h; i < w + h; i += 18) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i - h, h);
    ctx.stroke();
  }

  // Header
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = GOLD_LIGHT;
  ctx.font = `700 34px ${FONT_SANS}`;
  ctx.fillText('COTTON CARE', pad, 78);
  ctx.fillStyle = 'rgba(229, 198, 111, 0.7)';
  ctx.font = `500 14px ${FONT_SANS}`;
  ctx.fillText('PREMIUM TEXTILE OPERATIONS', pad, 108);
  ctx.fillStyle = GOLD;
  ctx.fillRect(pad, 124, w - pad * 2, 2);

  // Stat cards
  const cardGap = 22;
  const cardW = (w - pad * 2 - cardGap * 2) / 3;
  const cardH = 150;
  const cardY = 164;
  drawCard(ctx, pad, cardY, cardW, cardH, 'Quality Control', '95%', 'check');
  drawCard(ctx, pad + cardW + cardGap, cardY, cardW, cardH, 'Operations', '88%', 'gear');
  drawCard(
    ctx,
    pad + (cardW + cardGap) * 2,
    cardY,
    cardW,
    cardH,
    'Certified',
    '2024',
    'badge'
  );

  // Performance Summary
  const summaryY = 360;
  ctx.fillStyle = GOLD_LIGHT;
  ctx.font = `600 24px ${FONT_SANS}`;
  ctx.fillText('Performance Summary', pad, summaryY);
  ctx.fillStyle = 'rgba(229, 198, 111, 0.5)';
  ctx.fillRect(pad, summaryY + 18, 260, 1.5);

  const bars = [
    { label: 'Quality', value: 95 },
    { label: 'Efficiency', value: 88 },
    { label: 'Operations', value: 92 },
  ];
  let barY = summaryY + 56;
  bars.forEach(item => {
    drawBar(ctx, pad, barY, w - pad * 2, item.label, item.value);
    barY += 72;
  });

  // Footer copy
  ctx.textAlign = 'center';
  ctx.fillStyle = GOLD_LIGHT;
  ctx.font = `500 28px ${FONT_SANS}`;
  ctx.fillText('Internship Completion Certificate', w / 2, h - 98);

  ctx.fillStyle = 'rgba(209, 213, 219, 0.8)';
  ctx.font = `500 16px ${FONT_SANS}`;
  ctx.fillText('Ayaan Mohsin - 2024', w / 2, h - 62);

  return canvas;
}

function drawCard(ctx, x, y, w, h, label, metric, icon) {
  ctx.fillStyle = CARD_BG;
  ctx.fillRect(x, y, w, h);
  ctx.strokeStyle = GOLD;
  ctx.lineWidth = 2;
  ctx.strokeRect(x, y, w, h);

  drawIcon(ctx, x + 26, y + 28, icon);

  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = '#F5E7BF';
  ctx.font = `700 34px ${FONT_SANS}`;
  ctx.fillText(metric, x + 22, y + 86);

  ctx.fillStyle = TEXT_SOFT;
  ctx.font = `500 16px ${FONT_SANS}`;
  ctx.fillText(label, x + 22, y + 118);
}

function drawIcon(ctx, x, y, icon) {
  ctx.strokeStyle = GOLD_LIGHT;
  ctx.fillStyle = GOLD_LIGHT;
  ctx.lineWidth = 2;

  if (icon === 'check') {
    ctx.beginPath();
    ctx.moveTo(x, y + 8);
    ctx.lineTo(x + 8, y + 16);
    ctx.lineTo(x + 22, y);
    ctx.stroke();
    return;
  }

  if (icon === 'gear') {
    ctx.beginPath();
    ctx.arc(x + 12, y + 10, 8, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(x + 12, y + 10, 3, 0, Math.PI * 2);
    ctx.fill();
    return;
  }

  // badge
  ctx.beginPath();
  ctx.arc(x + 12, y + 8, 8, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(x + 8, y + 15);
  ctx.lineTo(x + 12, y + 24);
  ctx.lineTo(x + 16, y + 15);
  ctx.closePath();
  ctx.fill();
}

function drawBar(ctx, x, y, totalW, label, value) {
  const barW = totalW - 220;
  const filledW = Math.round((barW * value) / 100);

  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = TEXT_SOFT;
  ctx.font = `500 16px ${FONT_SANS}`;
  ctx.fillText(label, x, y);

  ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
  ctx.fillRect(x + 140, y - 8, barW, 16);

  const gradient = ctx.createLinearGradient(x + 140, 0, x + 140 + filledW, 0);
  gradient.addColorStop(0, GOLD);
  gradient.addColorStop(1, GOLD_LIGHT);
  ctx.fillStyle = gradient;
  ctx.fillRect(x + 140, y - 8, filledW, 16);

  ctx.fillStyle = GOLD_LIGHT;
  ctx.font = `600 15px ${FONT_SANS}`;
  ctx.fillText(`${value}%`, x + 140 + barW + 14, y);
}
