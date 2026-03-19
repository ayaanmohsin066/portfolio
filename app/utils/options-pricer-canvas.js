const BG = '#0a0f0a';
const GREEN = '#00ff88';
const GREEN_SOFT = '#7dffbb';
const ORANGE = '#ff9f43';
const WHITE = '#f4f7f4';
const CARD_BG = '#111711';
const INPUT_BG = '#0f1510';
const FONT_SANS = '-apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif';

/**
 * Recreates an options pricer dashboard UI for laptop texture.
 * @param {number} width
 * @param {number} height
 * @returns {HTMLCanvasElement | null}
 */
export function createOptionsPricerCanvas(width = 1280, height = 800) {
  if (typeof document === 'undefined') return null;

  const dpr = Math.min(2, typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1);
  const canvas = document.createElement('canvas');
  canvas.width = width * dpr;
  canvas.height = height * dpr;

  const ctx = canvas.getContext('2d');
  if (!ctx) return canvas;

  ctx.scale(dpr, dpr);
  const w = width;
  const h = height;
  const pad = 56;

  // Background
  ctx.fillStyle = BG;
  ctx.fillRect(0, 0, w, h);

  // Subtle green gradient in top-right
  const glow = ctx.createRadialGradient(w - 120, 60, 30, w - 120, 60, 320);
  glow.addColorStop(0, 'rgba(0, 255, 136, 0.18)');
  glow.addColorStop(1, 'rgba(0, 255, 136, 0)');
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, w, h);

  // Top badge
  roundRect(ctx, pad, 40, 290, 36, 18, 'rgba(0, 255, 136, 0.14)', 'rgba(0, 255, 136, 0.35)');
  ctx.fillStyle = GREEN_SOFT;
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.font = `700 15px ${FONT_SANS}`;
  ctx.fillText('● BLACK-SCHOLES MODEL', pad + 16, 58);

  // Title
  ctx.fillStyle = WHITE;
  ctx.font = `800 78px ${FONT_SANS}`;
  ctx.fillText('OPTIONS', pad, 150);
  ctx.fillStyle = GREEN;
  ctx.fillText('PRICER', pad + 375, 150);
  ctx.fillStyle = 'rgba(200, 255, 222, 0.72)';
  ctx.font = `500 22px ${FONT_SANS}`;
  ctx.fillText('// Real-time European option pricing', pad, 188);

  // Market parameters card
  const panelX = pad;
  const panelY = 232;
  const panelW = w - pad * 2;
  const panelH = 220;
  roundRect(ctx, panelX, panelY, panelW, panelH, 16, CARD_BG, 'rgba(0, 255, 136, 0.14)');

  ctx.fillStyle = GREEN_SOFT;
  ctx.font = `700 18px ${FONT_SANS}`;
  ctx.fillText('MARKET PARAMETERS', panelX + 24, panelY + 32);

  const fields = ['S: 150', 'K: 155', 'R: 5.00%', 'Σ: 20%', 'T: 90 days'];
  const inputW = 200;
  const inputH = 56;
  const inputGap = 18;
  let x = panelX + 24;
  const y = panelY + 56;
  for (const field of fields) {
    roundRect(ctx, x, y, inputW, inputH, 10, INPUT_BG, 'rgba(0, 255, 136, 0.12)');
    ctx.fillStyle = WHITE;
    ctx.font = `600 28px ${FONT_SANS}`;
    ctx.fillText(field, x + 20, y + inputH / 2 + 1);
    x += inputW + inputGap;
  }

  // Result cards
  const resultY = 486;
  const resultGap = 24;
  const resultW = (panelW - resultGap) / 2;
  const resultH = 180;

  roundRect(
    ctx,
    panelX,
    resultY,
    resultW,
    resultH,
    14,
    '#111b13',
    'rgba(0, 255, 136, 0.26)'
  );
  ctx.fillStyle = GREEN;
  ctx.font = `700 20px ${FONT_SANS}`;
  ctx.fillText('CALL OPTION', panelX + 24, resultY + 36);
  ctx.fillStyle = WHITE;
  ctx.font = `800 66px ${FONT_SANS}`;
  ctx.fillText('$6.937', panelX + 24, resultY + 106);

  const rightX = panelX + resultW + resultGap;
  roundRect(
    ctx,
    rightX,
    resultY,
    resultW,
    resultH,
    14,
    '#1b1511',
    'rgba(255, 159, 67, 0.32)'
  );
  ctx.fillStyle = ORANGE;
  ctx.font = `700 20px ${FONT_SANS}`;
  ctx.fillText('PUT OPTION', rightX + 24, resultY + 36);
  ctx.fillStyle = WHITE;
  ctx.font = `800 66px ${FONT_SANS}`;
  ctx.fillText('$10.04', rightX + 24, resultY + 106);

  return canvas;
}

function roundRect(ctx, x, y, w, h, r, fill, stroke) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
  ctx.fillStyle = fill;
  ctx.fill();
  if (stroke) {
    ctx.strokeStyle = stroke;
    ctx.lineWidth = 1.5;
    ctx.stroke();
  }
}
