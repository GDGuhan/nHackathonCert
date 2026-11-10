import { CertificateData } from '@/types/certificate';

let certCounter = 3;

export function generateCertificateId(): string {
  certCounter += 1;
  return `FT-HACK-2026-${String(certCounter).padStart(3, '0')}`;
}

export function formatDate(dateStr: string): string {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

export function getCertTypeLabel(type: CertificateData['certificateType']): string {
  const map: Record<string, string> = {
    hackathon: 'HACKATHON ACHIEVEMENT',
    internship: 'INTERNSHIP COMPLETION',
    participation: 'CERTIFICATE OF PARTICIPATION',
    excellence: 'EXCELLENCE AWARD',
  };
  return map[type] || 'CERTIFICATE OF ACHIEVEMENT';
}

export function getCertBodyText(data: CertificateData): string {
  const type = data.certificateType;
  const name = data.participantName || '[Participant Name]';
  const event = data.eventName || '[Event Name]';
  const domain = data.domain || '[Domain]';
  const role = data.role || 'Participant';
  const org = data.organization || 'FIXTON Technologies';

  if (type === 'hackathon') {
    return `This is to certify that <strong>${name}</strong> has successfully participated as a <em>${role}</em> in the <strong>${event}</strong> organized by ${org}, demonstrating exceptional skills in <strong>${domain}</strong> and showcasing remarkable innovation and technical excellence.`;
  }
  if (type === 'internship') {
    return `This is to certify that <strong>${name}</strong> has successfully completed an internship program as a <em>${role}</em> in the domain of <strong>${domain}</strong> at ${org} during the event <strong>${event}</strong>, demonstrating dedication, professionalism, and outstanding performance.`;
  }
  if (type === 'excellence') {
    return `This is to certify that <strong>${name}</strong> has been awarded the <em>Excellence Award</em> for outstanding performance and exceptional contributions in <strong>${domain}</strong> during the <strong>${event}</strong> organized by ${org}.`;
  }
  return `This is to certify that <strong>${name}</strong> has successfully participated in the <strong>${event}</strong> organized by ${org}, contributing as a <em>${role}</em> in the field of <strong>${domain}</strong>.`;
}
