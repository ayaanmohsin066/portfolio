/**
 * Phone screen canvases styled like Apple Notes — minimal, clean, no decorations.
 */

const WHITE = '#FFFFFF';
const BG_GREY = '#F2F2F7';
const TEXT_BLACK = '#000000';
const TEXT_GREY = '#8E8E93';
const DIVIDER = '#E5E5EA';
const FONT = '-apple-system, BlinkMacSystemFont, San Francisco, system-ui, sans-serif';

const SKILLS_LIST = [
  'REST APIs',
  'URL Encoding',
  'API Integration',
  'Data Extraction from Web Services',
  'Lists, Dictionaries, Tuples',
  'Python Programming',
  'Scripting in Python',
  'Python Data Structures',
  'File Handling (CSV, Text Files)',
  'Data Parsing',
];

/**
 * Phone 1: Apple Notes style — white background, "Notes" label, large "My Skills" title, subtle divider.
 */
export function createCourseraPhone1Canvas(width = 374, height = 512) {
  const dpr = Math.min(2, typeof window !== 'undefined' ? window.devicePixelRatio : 2);
  const canvas = document.createElement('canvas');
  canvas.width = width * dpr;
  canvas.height = height * dpr;
  const ctx = canvas.getContext('2d');
  if (!ctx) return canvas;
  ctx.scale(dpr, dpr);

  ctx.fillStyle = WHITE;
  ctx.fillRect(0, 0, width, height);

  const paddingX = 20;
  const topPadding = 52;

  ctx.font = `400 13px ${FONT}`;
  ctx.fillStyle = TEXT_GREY;
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.fillText('Notes', paddingX, topPadding - 28);

  ctx.font = `600 26px ${FONT}`;
  ctx.fillStyle = TEXT_BLACK;
  ctx.fillText('My Skills', paddingX, topPadding);

  const dividerY = topPadding + 24;
  ctx.strokeStyle = DIVIDER;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(paddingX, dividerY);
  ctx.lineTo(width - paddingX, dividerY);
  ctx.stroke();

  return canvas;
}

/**
 * Phone 2: Open Apple Note — light grey background, "Skills" title, clean list with subtle dividers.
 */
export function createCourseraPhone2Canvas(width = 374, height = 512) {
  const dpr = Math.min(2, typeof window !== 'undefined' ? window.devicePixelRatio : 2);
  const canvas = document.createElement('canvas');
  canvas.width = width * dpr;
  canvas.height = height * dpr;
  const ctx = canvas.getContext('2d');
  if (!ctx) return canvas;
  ctx.scale(dpr, dpr);

  ctx.fillStyle = BG_GREY;
  ctx.fillRect(0, 0, width, height);

  const paddingX = 20;
  const topPadding = 44;
  const lineHeight = 36;

  ctx.font = `600 20px ${FONT}`;
  ctx.fillStyle = TEXT_BLACK;
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.fillText('Skills', paddingX, topPadding);

  const listStartY = topPadding + 28;
  ctx.font = `400 16px ${FONT}`;
  ctx.fillStyle = TEXT_BLACK;

  SKILLS_LIST.forEach((skill, i) => {
    const y = listStartY + i * lineHeight;
    ctx.fillText(skill, paddingX, y + lineHeight / 2);
    if (i < SKILLS_LIST.length - 1) {
      ctx.strokeStyle = DIVIDER;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(paddingX, y + lineHeight);
      ctx.lineTo(width - paddingX, y + lineHeight);
      ctx.stroke();
    }
  });

  return canvas;
}
