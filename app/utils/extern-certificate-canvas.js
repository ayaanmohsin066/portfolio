/**
 * Extern completion certificate mockup for laptop screen texture.
 * Professional certificate layout: logo, completer badge, name, title, body, footer.
 */

const BG = '#F5F5F5';
const TEXT_BLACK = '#000000';
const TEXT_GREY = '#333333';
const FONT_SANS = '-apple-system, BlinkMacSystemFont, system-ui, sans-serif';
const FONT_SERIF = 'Georgia, "Times New Roman", serif';

/**
 * @param {number} width
 * @param {number} height
 * @returns {HTMLCanvasElement}
 */
export function createExternCertificateCanvas(width = 1280, height = 800) {
  const dpr = Math.min(2, typeof window !== 'undefined' ? window.devicePixelRatio : 2);
  const canvas = document.createElement('canvas');
  canvas.width = width * dpr;
  canvas.height = height * dpr;

  const ctx = canvas.getContext('2d');
  if (!ctx) return canvas;

  ctx.scale(dpr, dpr);
  const w = width;
  const h = height;

  ctx.fillStyle = BG;
  ctx.fillRect(0, 0, w, h);

  const pad = 64;
  const centerX = w / 2;

  // Top left: "extern" logo (black bold)
  ctx.font = `700 28px ${FONT_SANS}`;
  ctx.fillStyle = TEXT_BLACK;
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  ctx.fillText('extern', pad, 48);

  // Top right: circular "COMPLETER" badge with X in center
  const badgeX = w - pad - 56;
  const badgeY = 72;
  const badgeR = 48;
  ctx.strokeStyle = TEXT_BLACK;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(badgeX, badgeY, badgeR, 0, Math.PI * 2);
  ctx.stroke();
  ctx.font = `600 10px ${FONT_SANS}`;
  ctx.fillStyle = TEXT_BLACK;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  drawTextAlongCircle(ctx, 'COMPLETER', badgeX, badgeY, badgeR - 8, -Math.PI / 2);
  ctx.font = `700 24px ${FONT_SANS}`;
  ctx.fillText('×', badgeX, badgeY);

  // Main content (centered block)
  let y = 220;

  // "Ayaan Mohsin," — large italic serif
  ctx.font = `italic 400 42px ${FONT_SERIF}`;
  ctx.fillStyle = TEXT_BLACK;
  ctx.textAlign = 'center';
  ctx.fillText('Ayaan Mohsin,', centerX, y);
  y += 52;

  // "Extern, is recognized as a"
  ctx.font = `400 20px ${FONT_SERIF}`;
  ctx.fillStyle = TEXT_GREY;
  ctx.fillText('Extern, is recognized as a', centerX, y);
  y += 44;

  // "Completer" — large italic serif
  ctx.font = `italic 400 38px ${FONT_SERIF}`;
  ctx.fillStyle = TEXT_BLACK;
  ctx.fillText('Completer', centerX, y);
  y += 56;

  // Body
  ctx.font = `400 18px ${FONT_SERIF}`;
  ctx.fillStyle = TEXT_GREY;
  ctx.fillText(
    'for successfully finishing the Amazon Operational Strategy & People Analytics Externship',
    centerX,
    y
  );
  y += 80;

  // Bottom left: small disclaimer
  ctx.font = `400 12px ${FONT_SANS}`;
  ctx.fillStyle = '#666666';
  ctx.textAlign = 'left';
  ctx.fillText(
    'Awarded to Externs who successfully complete their Externship on time and met program expectations.',
    pad,
    y
  );
  y += 28;

  // "Issued on March 2, 2026"
  ctx.font = `500 14px ${FONT_SANS}`;
  ctx.fillStyle = TEXT_GREY;
  ctx.fillText('Issued on March 2, 2026', pad, y);

  // Bottom right: signature line
  const sigY = h - 80;
  ctx.strokeStyle = TEXT_BLACK;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(w - pad - 180, sigY);
  ctx.lineTo(w - pad, sigY);
  ctx.stroke();
  ctx.font = `400 11px ${FONT_SANS}`;
  ctx.fillStyle = TEXT_GREY;
  ctx.textAlign = 'right';
  ctx.fillText('Extern Founder & CEO', w - pad, sigY + 18);

  return canvas;
}

function drawTextAlongCircle(ctx, text, cx, cy, radius, startAngle) {
  const chars = text.split('');
  const step = (Math.PI * 2 * 0.85) / chars.length;
  let angle = startAngle;
  for (const char of chars) {
    const x = cx + radius * Math.cos(angle);
    const y = cy + radius * Math.sin(angle);
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle + Math.PI / 2);
    ctx.fillText(char, 0, 0);
    ctx.restore();
    angle += step;
  }
}
