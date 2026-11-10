import { CertificateData } from '@/types/certificate';
import { drawCertificate } from '@/lib/drawCertificate';
import jsPDF from 'jspdf';
import { toast } from 'sonner';

const CERT_W = 1122;
const CERT_H = 794;

function getCanvas(data: CertificateData): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = CERT_W;
  canvas.height = CERT_H;
  drawCertificate(canvas, data);
  return canvas;
}

export async function downloadPDF(data: CertificateData): Promise<void> {
  try {
    const canvas = getCanvas(data);
    const imgData = canvas.toDataURL('image/jpeg', 1.0);
    const pdf = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });
    pdf.addImage(imgData, 'JPEG', 0, 0, 297, 210);
    pdf.save(`FIXTON_Certificate_${data.certificateId || 'FT'}.pdf`);
    toast.success('PDF downloaded successfully!');
  } catch {
    toast.error('Failed to download PDF');
  }
}

export function downloadPNG(data: CertificateData): void {
  try {
    const canvas = getCanvas(data);
    const link = document.createElement('a');
    link.download = `FIXTON_Certificate_${data.certificateId || 'FT'}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
    toast.success('PNG downloaded successfully!');
  } catch {
    toast.error('Failed to download PNG');
  }
}

export function downloadJPG(data: CertificateData): void {
  try {
    const canvas = getCanvas(data);
    const link = document.createElement('a');
    link.download = `FIXTON_Certificate_${data.certificateId || 'FT'}.jpg`;
    link.href = canvas.toDataURL('image/jpeg', 0.95);
    link.click();
    toast.success('JPG downloaded successfully!');
  } catch {
    toast.error('Failed to download JPG');
  }
}

export function printCertificate(data: CertificateData): void {
  try {
    const canvas = getCanvas(data);
    const imgSrc = canvas.toDataURL('image/png');
    const win = window.open('', '_blank');
    if (!win) { toast.error('Please allow popups to print'); return; }
    win.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>FIXTON Certificate – ${data.participantName || 'Certificate'}</title>
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            html, body { width: 100%; height: 100%; background: #000; }
            @page { size: A4 landscape; margin: 0; }
            @media print {
              html, body { width: 297mm; height: 210mm; }
              img { width: 297mm; height: 210mm; display: block; }
            }
            img { width: 100%; height: auto; }
          </style>
        </head>
        <body>
          <img src="${imgSrc}" alt="FIXTON Certificate" />
          <script>
            window.onload = function() {
              setTimeout(function() { window.print(); window.close(); }, 400);
            };
          </scr` + `ipt>
        </body>
      </html>
    `);
    win.document.close();
    toast.success('Print dialog opened!');
  } catch {
    toast.error('Failed to open print dialog');
  }
}

export async function shareCertificate(data: CertificateData): Promise<void> {
  try {
    const canvas = getCanvas(data);
    canvas.toBlob(async (blob) => {
      if (!blob) { toast.error('Failed to create share image'); return; }
      const file = new File([blob], `FIXTON_Certificate_${data.certificateId}.png`, { type: 'image/png' });
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: `FIXTON Certificate – ${data.participantName}`,
          text: `Certificate of Achievement from FIXTON Technologies`,
          files: [file],
        });
        toast.success('Certificate shared!');
      } else {
        downloadPNG(data);
        toast.info('Sharing not supported on this device. PNG downloaded instead.');
      }
    }, 'image/png');
  } catch {
    toast.error('Failed to share certificate');
  }
}
