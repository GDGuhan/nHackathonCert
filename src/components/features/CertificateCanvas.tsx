import { useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import { CertificateData } from '@/types/certificate';
import { drawCertificate } from '@/lib/drawCertificate';

interface Props {
  data: CertificateData;
}

export interface CertificateCanvasRef {
  getCanvas: () => HTMLCanvasElement | null;
}

const CERT_W = 1122;
const CERT_H = 794;

const CertificateCanvas = forwardRef<CertificateCanvasRef, Props>(({ data }, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useImperativeHandle(ref, () => ({
    getCanvas: () => canvasRef.current,
  }));

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    drawCertificate(canvas, data);
  }, [data]);

  return (
    <canvas
      ref={canvasRef}
      width={CERT_W}
      height={CERT_H}
      style={{ width: '100%', height: 'auto', display: 'block' }}
      className="rounded-sm"
    />
  );
});

CertificateCanvas.displayName = 'CertificateCanvas';
export default CertificateCanvas;
