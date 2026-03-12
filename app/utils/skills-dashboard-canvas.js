/**
 * Draws a "Skills Dashboard" panel onto a canvas for use as a device screen texture.
 * Dark theme matching the portfolio; category headings in teal/cyan; skills as pill chips.
 */

const DARK_BG = '#1a1b1f';
const CARD_BG = '#25262b';
const ACCENT = '#00d4ff'; // teal/cyan matching portfolio
const TEXT_PRIMARY = '#e4e4e7';
const TEXT_SECONDARY = '#a1a1aa';
const PILL_BG = '#3f3f46';
const PILL_TEXT = '#e4e4e7';

const CATEGORIES = [
  {
    heading: 'MATHEMATICS & ANALYTICS',
    skills: ['Linear Algebra', 'Calculus', 'Statistics', 'Probability Theory'],
  },
  {
    heading: 'PROGRAMMING & DATA',
    skills: ['Python', 'R', 'Excel', 'SQL'],
  },
  {
    heading: 'FINANCE',
    skills: ['Financial Modeling', 'Risk Analysis', 'Investment Fundamentals'],
  },
  {
    heading: 'SOFT SKILLS',
    skills: ['Leadership', 'Communication', 'Research'],
  },
];

/**
 * @param {number} width
 * @param {number} height
 * @returns {HTMLCanvasElement}
 */
export function createSkillsDashboardCanvas(width = 1280, height = 800) {
  const dpr = Math.min(2, typeof window !== 'undefined' ? window.devicePixelRatio : 2);
  const canvas = document.createElement('canvas');
  canvas.width = width * dpr;
  canvas.height = height * dpr;

  const ctx = canvas.getContext('2d');
  if (!ctx) return canvas;

  ctx.scale(dpr, dpr);
  const w = width;
  const h = height;

  // Dark background
  ctx.fillStyle = DARK_BG;
  ctx.fillRect(0, 0, w, h);

  const padding = 48;
  const titleHeight = 56;
  const categoryGap = 28;
  const pillHeight = 36;
  const pillPaddingX = 18;
  const pillGap = 10;
  const lineHeight = 44;

  // Title
  ctx.fillStyle = TEXT_SECONDARY;
  ctx.font = '600 22px system-ui, -apple-system, sans-serif';
  ctx.fillText('Skills Dashboard', padding, padding + 28);

  let y = padding + titleHeight + 24;

  ctx.font = '600 11px system-ui, -apple-system, sans-serif';
  ctx.letterSpacing = '0.12em';

  for (const cat of CATEGORIES) {
    // Category heading (teal/cyan)
    ctx.fillStyle = ACCENT;
    ctx.fillText(cat.heading, padding, y);
    y += lineHeight;

    // Pills row
    let x = padding;
    const pillFont = '500 14px system-ui, -apple-system, sans-serif';
    ctx.font = pillFont;
    ctx.letterSpacing = '0';

    for (const skill of cat.skills) {
      const textWidth = ctx.measureText(skill).width;
      const pillW = textWidth + pillPaddingX * 2;
      const pillY = y - 8;

      ctx.fillStyle = PILL_BG;
      roundRect(ctx, x, pillY, pillW, pillHeight, pillHeight / 2);
      ctx.fill();

      ctx.fillStyle = PILL_TEXT;
      ctx.fillText(skill, x + pillPaddingX, pillY + pillHeight / 2 + 5);

      x += pillW + pillGap;
    }

    y += pillHeight + categoryGap;
  }

  return canvas;
}

function roundRect(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}
