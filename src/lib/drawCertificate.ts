import { CertificateData } from '@/types/certificate';
import { formatDate, getCertTypeLabel, getCertBodyText } from '@/lib/certUtils';

// Colors
const NAVY = '#0a1628';
const DARK_NAVY = '#060e1a';
const CYAN = '#00d4ff';
const GOLD = '#f0c040';
const WHITE = '#ffffff';
const SILVER = '#c8d8e8';

export function drawCertificate(canvas: HTMLCanvasElement, data: CertificateData): void {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const W = canvas.width;
  const H = canvas.height;

  ctx.clearRect(0, 0, W, H);

  // === BACKGROUND GRADIENT ===
  const bgGrad = ctx.createLinearGradient(0, 0, W, H);
  bgGrad.addColorStop(0, DARK_NAVY);
  bgGrad.addColorStop(0.4, '#0d1f3c');
  bgGrad.addColorStop(1, '#081220');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, W, H);

  // === DECORATIVE CIRCUIT GRID ===
  drawCircuitGrid(ctx, W, H);

  // === OUTER GOLD BORDER ===
  ctx.strokeStyle = GOLD;
  ctx.lineWidth = 4;
  ctx.strokeRect(18, 18, W - 36, H - 36);

  // === INNER CYAN BORDER ===
  ctx.strokeStyle = CYAN;
  ctx.lineWidth = 1.5;
  ctx.strokeRect(28, 28, W - 56, H - 56);

  // === CORNER ORNAMENTS ===
  drawCornerOrnaments(ctx, W, H, GOLD, CYAN);

  // === TOP HEADER BAND ===
  const headerGrad = ctx.createLinearGradient(0, 38, 0, 120);
  headerGrad.addColorStop(0, 'rgba(0,212,255,0.18)');
  headerGrad.addColorStop(1, 'rgba(0,212,255,0)');
  ctx.fillStyle = headerGrad;
  ctx.fillRect(38, 38, W - 76, 82);

  // === FIXTON LOGO (stylized text) ===
  ctx.save();
  ctx.font = `bold ${Math.round(W * 0.032)}px 'Cinzel', serif`;
  ctx.fillStyle = CYAN;
  ctx.textAlign = 'center';
  ctx.letterSpacing = '6px';
  ctx.fillText('FIXTON', W / 2, 75);
  ctx.restore();

  // === TECHNOLOGIES tagline ===
  ctx.save();
  ctx.font = `${Math.round(W * 0.014)}px 'Inter', sans-serif`;
  ctx.fillStyle = SILVER;
  ctx.textAlign = 'center';
  ctx.letterSpacing = '8px';
  ctx.fillText('T E C H N O L O G I E S', W / 2, 96);
  ctx.restore();

  // === TAGLINE ===
  ctx.save();
  ctx.font = `italic ${Math.round(W * 0.011)}px 'Playfair Display', serif`;
  ctx.fillStyle = GOLD;
  ctx.textAlign = 'center';
  ctx.fillText('Innovate  •  Build  •  Grow', W / 2, 114);
  ctx.restore();

  // === DIVIDER LINE ===
  drawGradientLine(ctx, 80, 124, W - 80, 124, CYAN, GOLD);

  // === CERT TYPE LABEL ===
  const certTypeLabel = getCertTypeLabel(data.certificateType);
  ctx.save();
  ctx.font = `600 ${Math.round(W * 0.018)}px 'Cinzel', serif`;
  ctx.fillStyle = GOLD;
  ctx.textAlign = 'center';
  ctx.letterSpacing = '4px';
  ctx.fillText(certTypeLabel, W / 2, 158);
  ctx.restore();

  // === "CERTIFICATE" large text ===
  ctx.save();
  ctx.font = `900 ${Math.round(W * 0.048)}px 'Cinzel', serif`;
  ctx.fillStyle = WHITE;
  ctx.textAlign = 'center';
  ctx.shadowColor = CYAN;
  ctx.shadowBlur = 20;
  ctx.fillText('CERTIFICATE', W / 2, 210);
  ctx.shadowBlur = 0;
  ctx.restore();

  // === "OF ACHIEVEMENT" ===
  ctx.save();
  ctx.font = `400 ${Math.round(W * 0.022)}px 'Cinzel', serif`;
  ctx.fillStyle = SILVER;
  ctx.textAlign = 'center';
  ctx.letterSpacing = '10px';
  ctx.fillText('OF  ACHIEVEMENT', W / 2, 238);
  ctx.restore();

  // === PRESENTED TO ===
  ctx.save();
  ctx.font = `300 ${Math.round(W * 0.012)}px 'Inter', sans-serif`;
  ctx.fillStyle = SILVER;
  ctx.textAlign = 'center';
  ctx.letterSpacing = '3px';
  ctx.fillText('P R E S E N T E D  T O', W / 2, 268);
  ctx.restore();

  // === PARTICIPANT NAME ===
  const participantName = data.participantName || 'Participant Name';
  ctx.save();
  ctx.font = `700 ${Math.round(W * 0.036)}px 'Playfair Display', serif`;
  ctx.fillStyle = GOLD;
  ctx.textAlign = 'center';
  ctx.shadowColor = 'rgba(240,192,64,0.4)';
  ctx.shadowBlur = 15;
  ctx.fillText(participantName, W / 2, 308);
  ctx.shadowBlur = 0;
  ctx.restore();

  // === NAME UNDERLINE ===
  const nameWidth = Math.min(ctx.measureText(participantName).width + 60, W * 0.6);
  drawGradientLine(ctx, W / 2 - nameWidth / 2, 318, W / 2 + nameWidth / 2, 318, GOLD, CYAN);

  // === BODY TEXT ===
  const bodyText = getCertBodyText(data).replace(/<[^>]+>/g, '');
  wrapText(ctx, bodyText, W / 2, 348, W - 160, Math.round(W * 0.013), SILVER, 22, 'center');

  // === DATES ROW ===
  if (data.startDate || data.endDate || data.issueDate) {
    const dateY = H - 168;
    drawDateRow(ctx, data, W, dateY);
  }

  // === DIVIDER ===
  drawGradientLine(ctx, 80, H - 148, W - 80, H - 148, CYAN, GOLD);

  // === SIGNATURE SECTION ===
  drawSignatureSection(ctx, W, H, data);

  // === CERTIFICATE ID & ISSUE DATE ===
  ctx.save();
  ctx.font = `500 ${Math.round(W * 0.011)}px 'Inter', sans-serif`;
  ctx.fillStyle = SILVER;
  ctx.textAlign = 'left';
  ctx.fillText(`Certificate ID: ${data.certificateId || 'FT-HACK-2026-001'}`, 50, H - 32);
  ctx.restore();

  ctx.save();
  ctx.font = `500 ${Math.round(W * 0.011)}px 'Inter', sans-serif`;
  ctx.fillStyle = SILVER;
  ctx.textAlign = 'right';
  ctx.fillText(`Issue Date: ${formatDate(data.issueDate) || new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`, W - 50, H - 32);
  ctx.restore();

  // === OFFICIAL SEAL ===
  drawSeal(ctx, W - 100, H / 2 - 20, 52, GOLD, CYAN, NAVY);

  // === QR CODE placeholder ===
  drawQRPlaceholder(ctx, 72, H - 115, 68, CYAN, NAVY);

  // === FOOTER STRIPE ===
  const footerGrad = ctx.createLinearGradient(0, H - 48, 0, H - 28);
  footerGrad.addColorStop(0, 'rgba(0,212,255,0)');
  footerGrad.addColorStop(1, 'rgba(0,212,255,0.1)');
  ctx.fillStyle = footerGrad;
  ctx.fillRect(38, H - 48, W - 76, 14);

  ctx.save();
  ctx.font = `300 ${Math.round(W * 0.009)}px 'Inter', sans-serif`;
  ctx.fillStyle = 'rgba(200,216,232,0.5)';
  ctx.textAlign = 'center';
  ctx.fillText('© 2026 FIXTON Technologies. This certificate is digitally generated and verifiable.', W / 2, H - 18);
  ctx.restore();
}

function drawCircuitGrid(ctx: CanvasRenderingContext2D, W: number, H: number): void {
  ctx.save();
  ctx.strokeStyle = 'rgba(0,212,255,0.04)';
  ctx.lineWidth = 1;
  const step = 40;
  for (let x = 0; x <= W; x += step) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
  }
  for (let y = 0; y <= H; y += step) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
  }
  ctx.restore();
}

function drawCornerOrnaments(ctx: CanvasRenderingContext2D, W: number, H: number, gold: string, cyan: string): void {
  const size = 28;
  const corners = [[18, 18], [W - 18, 18], [18, H - 18], [W - 18, H - 18]];
  corners.forEach(([cx, cy]) => {
    ctx.strokeStyle = gold;
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(cx, cy + (cy < H / 2 ? size : -size));
    ctx.lineTo(cx, cy);
    ctx.lineTo(cx + (cx < W / 2 ? size : -size), cy);
    ctx.stroke();
    ctx.strokeStyle = cyan;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(cx, cy + (cy < H / 2 ? size * 0.6 : -size * 0.6));
    ctx.lineTo(cx, cy);
    ctx.lineTo(cx + (cx < W / 2 ? size * 0.6 : -size * 0.6), cy);
    ctx.stroke();
  });
}

function drawGradientLine(ctx: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number, c1: string, c2: string): void {
  const grad = ctx.createLinearGradient(x1, y1, x2, y2);
  grad.addColorStop(0, 'transparent');
  grad.addColorStop(0.3, c1);
  grad.addColorStop(0.7, c2);
  grad.addColorStop(1, 'transparent');
  ctx.strokeStyle = grad;
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
}

function wrapText(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, maxWidth: number, fontSize: number, color: string, lineHeight: number, align: CanvasTextAlign): void {
  ctx.save();
  ctx.font = `400 ${fontSize}px 'Inter', sans-serif`;
  ctx.fillStyle = color;
  ctx.textAlign = align;
  const words = text.split(' ');
  let line = '';
  let currentY = y;
  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + ' ';
    const metrics = ctx.measureText(testLine);
    if (metrics.width > maxWidth && n > 0) {
      ctx.fillText(line.trim(), x, currentY);
      line = words[n] + ' ';
      currentY += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line.trim(), x, currentY);
  ctx.restore();
}

function drawDateRow(ctx: CanvasRenderingContext2D, data: CertificateData, W: number, y: number): void {
  const items: { label: string; value: string }[] = [];
  if (data.startDate) items.push({ label: 'START DATE', value: formatDate(data.startDate) });
  if (data.endDate) items.push({ label: 'END DATE', value: formatDate(data.endDate) });
  if (data.issueDate) items.push({ label: 'ISSUE DATE', value: formatDate(data.issueDate) });

  if (items.length === 0) return;

  const colW = (W - 160) / items.length;
  items.forEach((item, i) => {
    const colX = 80 + colW * i + colW / 2;
    ctx.save();
    ctx.font = `500 11px 'Inter', sans-serif`;
    ctx.fillStyle = '#00d4ff';
    ctx.textAlign = 'center';
    ctx.letterSpacing = '2px';
    ctx.fillText(item.label, colX, y);
    ctx.restore();
    ctx.save();
    ctx.font = `600 13px 'Inter', sans-serif`;
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.fillText(item.value, colX, y + 18);
    ctx.restore();
  });
}

function drawSignatureSection(ctx: CanvasRenderingContext2D, W: number, H: number, _data: CertificateData): void {
  const sigY = H - 110;
  const sig1X = W * 0.25;
  const sig2X = W * 0.75;

  [sig1X, sig2X].forEach((sx, i) => {
    // Signature line
    ctx.strokeStyle = 'rgba(200,216,232,0.4)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(sx - 70, sigY);
    ctx.lineTo(sx + 70, sigY);
    ctx.stroke();

    // Signature flourish
    ctx.strokeStyle = i === 0 ? '#00d4ff' : '#f0c040';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    if (i === 0) {
      ctx.moveTo(sx - 50, sigY - 8);
      ctx.bezierCurveTo(sx - 30, sigY - 22, sx - 10, sigY - 18, sx, sigY - 12);
      ctx.bezierCurveTo(sx + 12, sigY - 6, sx + 30, sigY - 20, sx + 50, sigY - 8);
    } else {
      ctx.moveTo(sx - 50, sigY - 10);
      ctx.bezierCurveTo(sx - 25, sigY - 24, sx, sigY - 16, sx + 20, sigY - 20);
      ctx.bezierCurveTo(sx + 35, sigY - 24, sx + 45, sigY - 12, sx + 50, sigY - 8);
    }
    ctx.stroke();

    const names = ['Dr. Rajesh Kumar', 'Ms. Priya Sharma'];
    const titles = ['Director – FIXTON Technologies', 'Program Coordinator'];

    ctx.save();
    ctx.font = `600 12px 'Inter', sans-serif`;
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.fillText(names[i], sx, sigY + 16);
    ctx.restore();

    ctx.save();
    ctx.font = `400 10px 'Inter', sans-serif`;
    ctx.fillStyle = '#8aa8c8';
    ctx.textAlign = 'center';
    ctx.fillText(titles[i], sx, sigY + 30);
    ctx.restore();
  });
}

function drawSeal(ctx: CanvasRenderingContext2D, cx: number, cy: number, r: number, gold: string, cyan: string, navy: string): void {
  // Outer ring
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.strokeStyle = gold;
  ctx.lineWidth = 2.5;
  ctx.stroke();

  // Inner fill
  ctx.beginPath();
  ctx.arc(cx, cy, r - 4, 0, Math.PI * 2);
  const sealGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r - 4);
  sealGrad.addColorStop(0, '#1a3050');
  sealGrad.addColorStop(1, navy);
  ctx.fillStyle = sealGrad;
  ctx.fill();

  // Star burst
  ctx.strokeStyle = cyan;
  ctx.lineWidth = 1;
  for (let i = 0; i < 8; i++) {
    const angle = (i * Math.PI * 2) / 8;
    ctx.beginPath();
    ctx.moveTo(cx + Math.cos(angle) * 8, cy + Math.sin(angle) * 8);
    ctx.lineTo(cx + Math.cos(angle) * (r - 6), cy + Math.sin(angle) * (r - 6));
    ctx.stroke();
  }

  ctx.save();
  ctx.font = `bold 9px 'Cinzel', serif`;
  ctx.fillStyle = gold;
  ctx.textAlign = 'center';
  ctx.fillText('FIXTON', cx, cy - 3);
  ctx.fillText('OFFICIAL', cx, cy + 8);
  ctx.restore();
}

function drawQRPlaceholder(ctx: CanvasRenderingContext2D, x: number, y: number, size: number, cyan: string, navy: string): void {
  // Background
  ctx.fillStyle = 'rgba(0,20,40,0.6)';
  ctx.fillRect(x, y, size, size);
  ctx.strokeStyle = cyan;
  ctx.lineWidth = 1;
  ctx.strokeRect(x, y, size, size);

  // QR-like pattern
  const cell = size / 7;
  const pattern = [
    [1,1,1,0,1,1,1],
    [1,0,1,0,1,0,1],
    [1,1,1,0,1,1,1],
    [0,0,0,0,0,0,0],
    [1,1,1,0,1,1,1],
    [1,0,1,0,1,0,1],
    [1,1,1,0,1,1,1],
  ];
  pattern.forEach((row, ri) => {
    row.forEach((cell_val, ci) => {
      if (cell_val) {
        ctx.fillStyle = ri < 3 || ri > 4 ? cyan : 'rgba(0,212,255,0.4)';
        ctx.fillRect(x + ci * cell + 1, y + ri * cell + 1, cell - 1, cell - 1);
      }
    });
  });

  ctx.save();
  ctx.font = '7px Inter, sans-serif';
  ctx.fillStyle = 'rgba(200,216,232,0.6)';
  ctx.textAlign = 'center';
  ctx.fillText('VERIFY', x + size / 2, y + size + 12);
  ctx.restore();
}
