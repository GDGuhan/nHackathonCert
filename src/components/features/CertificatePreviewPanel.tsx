import { useState } from 'react';
import { Maximize2, X } from 'lucide-react';
import { CertificateData } from '@/types/certificate';
import CertificateCanvas from './CertificateCanvas';
import ActionButtons from './ActionButtons';

interface Props {
  data: CertificateData;
}

export default function CertificatePreviewPanel({ data }: Props) {
  const [fullscreen, setFullscreen] = useState(false);

  return (
    <>
      {/* CERTIFICATE GENERATOR HEADING */}
      <div className="mb-4 text-center lg:text-left">
        <p className="text-[#00d4ff] text-xs font-semibold tracking-[4px] uppercase mb-1">
          Certificate Generator
        </p>
        <p className="text-[#c8d8e8] text-sm tracking-[2px]">FIXTON Technologies</p>
        <p className="text-[#8aa8c8] text-xs tracking-[1px]">Innovate • Build • Grow</p>
      </div>

      {/* LIVE PREVIEW LABEL */}
      <div className="flex items-center gap-3 mb-3">
        <span className="text-[#00d4ff] text-xs font-bold tracking-[3px] uppercase">Live Preview</span>
        <span className="flex-1 h-px bg-gradient-to-r from-[#00d4ff]/40 to-transparent" />
        <button
          onClick={() => setFullscreen(true)}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-white/5 border border-white/10
                     text-[#8aa8c8] text-xs hover:text-[#00d4ff] hover:border-[#00d4ff]/30 transition-all
                     min-h-[36px] min-w-[36px] cursor-pointer"
          title="View full certificate"
        >
          <Maximize2 className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Fullscreen</span>
        </button>
      </div>

      {/* CERTIFICATE PREVIEW */}
      <div
        className="cert-preview-container relative rounded-lg overflow-hidden
                   border border-[#00d4ff]/20 shadow-[0_4px_32px_rgba(0,0,0,0.6)]
                   bg-[#060e1a]"
        style={{ touchAction: 'pinch-zoom' }}
      >
        <CertificateCanvas data={data} />
      </div>

      {/* CERTIFICATE ID */}
      <div className="mt-4 flex items-center gap-3 px-4 py-3 rounded-lg bg-[#0a1628] border border-[#00d4ff]/15">
        <div className="w-2 h-2 rounded-full bg-[#00d4ff] animate-pulse flex-shrink-0" />
        <div>
          <p className="text-[#8aa8c8] text-xs tracking-widest uppercase">Certificate ID</p>
          <p className="text-[#f0c040] font-bold font-mono text-sm mt-0.5">
            {data.certificateId || 'FT-HACK-2026-001'}
          </p>
        </div>
      </div>

      {/* ACTION BUTTONS */}
      <div className="mt-4">
        <ActionButtons data={data} layout="grid" />
      </div>

      {/* FULLSCREEN MODAL */}
      {fullscreen && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-center p-4"
          onClick={() => setFullscreen(false)}
        >
          <button
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 text-white
                       hover:bg-white/20 transition-colors cursor-pointer z-10"
            onClick={() => setFullscreen(false)}
          >
            <X className="w-6 h-6" />
          </button>
          <div
            className="w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="rounded-lg overflow-hidden border border-[#00d4ff]/30
                         shadow-[0_0_60px_rgba(0,212,255,0.15)]"
            >
              <CertificateCanvas data={data} />
            </div>
            <div className="mt-4">
              <ActionButtons data={data} layout="row" />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
