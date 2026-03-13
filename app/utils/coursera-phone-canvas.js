/**
 * Phone screen canvases for Coursera certifications project.
 * Screen 1: "My Skills" heading. Screen 2: Scrollable skills list with teal bullets.
 */

const DARK_BG = '#1a1b1f';
const ACCENT = '#00d4ff';
const TEXT_WHITE = '#e4e4e7';

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
 * First phone: "My Skills" large centered heading, dark bg, teal accent.
 */
export function createCourseraPhone1Canvas(width = 374, height = 512) {
  const dpr = Math.min(2, typeof window !== 'undefined' ? window.devicePixelRatio : 2);
  const canvas = document.createElement('canvas');
  canvas.width = width * dpr;
  canvas.height = height * dpr;
  const ctx = canvas.getContext('2d');
  if (!ctx) return canvas;
  ctx.scale(dpr, dpr);

  ctx.fillStyle = DARK_BG;
  ctx.fillRect(0, 0, width, height);

  ctx.fillStyle = ACCENT;
  ctx.font = '600 32px system-ui, -apple-system, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('My Skills', width / 2, height / 2);

  return canvas;
}

/**
 * Second phone: Scrollable skills list, dark bg, white text, teal bullets.
 */
export function createCourseraPhone2Canvas(width = 374, height = 512) {
  const dpr = Math.min(2, typeof window !== 'undefined' ? window.devicePixelRatio : 2);
  const canvas = document.createElement('canvas');
  canvas.width = width * dpr;
  canvas.height = height * dpr;
  const ctx = canvas.getContext('2d');
  if (!ctx) return canvas;
  ctx.scale(dpr, dpr);

  ctx.fillStyle = DARK_BG;
  ctx.fillRect(0, 0, width, height);

  const padding = 24;
  const lineHeight = 28;
  const bulletRadius = 4;
  const startY = 32;

  ctx.font = '500 15px system-ui, -apple-system, sans-serif';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';

  SKILLS_LIST.forEach((skill, i) => {
    const y = startY + i * lineHeight;
    ctx.fillStyle = ACCENT;
    ctx.beginPath();
    ctx.arc(padding + bulletRadius, y, bulletRadius, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = TEXT_WHITE;
    ctx.fillText(skill, padding + bulletRadius * 2 + 10, y);
  });

  return canvas;
}
