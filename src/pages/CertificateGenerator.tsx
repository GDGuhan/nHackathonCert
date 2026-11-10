import { useState } from 'react';
import { CertificateData } from '@/types/certificate';
import { generateCertificateId } from '@/lib/certUtils';
import AppHeader from '@/components/layout/AppHeader';
import CertificatePreviewPanel from '@/components/features/CertificatePreviewPanel';
import CertificateForm from '@/components/features/CertificateForm';

const defaultData: CertificateData = {
  participantName: 'Arjun Mehta',
  email: 'arjun@example.com',
  phone: '+91 98765 43210',
  domain: 'Full Stack Development',
  role: 'Winner',
  eventName: 'HackFusion 2026',
  startDate: '2026-07-15',
  endDate: '2026-07-17',
  issueDate: new Date().toISOString().split('T')[0],
  organization: 'FIXTON Technologies',
  certificateType: 'hackathon',
  certificateId: 'FT-HACK-2026-003',
};

export default function CertificateGenerator() {
  const [data, setData] = useState<CertificateData>(defaultData);

  function handleDataChange(updated: CertificateData) {
    setData(updated);
  }

  function handleReset() {
    setData({ ...defaultData, certificateId: generateCertificateId() });
  }

  return (
    <div className="min-h-screen bg-[#060e1a] flex flex-col">
      <AppHeader />

      <main className="flex-1 max-w-[1400px] mx-auto w-full px-4 sm:px-6 py-6">

        {/* ─── MOBILE / TABLET: stacked layout ─── */}
        {/* ─── DESKTOP (lg+): side-by-side ────── */}
        <div className="flex flex-col lg:flex-row lg:gap-8 lg:items-start">

          {/* ════════════════════════════════════
              RIGHT COLUMN (desktop) / TOP (mobile)
              = Certificate Preview
              ════════════════════════════════════ */}
          <div className="w-full lg:flex-1 lg:sticky lg:top-20 order-1 lg:order-2">
            <div className="bg-[#0a1628]/80 border border-[#1a2f4a] rounded-xl p-4 sm:p-5
                            shadow-[0_4px_32px_rgba(0,0,0,0.5)]">
              <CertificatePreviewPanel data={data} />
            </div>
          </div>

          {/* ════════════════════════════════════
              LEFT COLUMN (desktop) / BOTTOM (mobile)
              = Form
              ════════════════════════════════════ */}
          <div className="w-full lg:w-[420px] xl:w-[460px] flex-shrink-0 order-2 lg:order-1 mt-6 lg:mt-0">
            <div className="bg-[#0a1628]/80 border border-[#1a2f4a] rounded-xl p-4 sm:p-5
                            shadow-[0_4px_32px_rgba(0,0,0,0.5)]">

              {/* Mobile section label */}
              <div className="lg:hidden mb-4 flex items-center gap-3">
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#1a2f4a] to-transparent" />
                <span className="text-[#3a5070] text-xs tracking-widest uppercase">Enter Details</span>
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#1a2f4a] to-transparent" />
              </div>

              <CertificateForm data={data} onChange={handleDataChange} />

              {/* Reset button */}
              <div className="mt-6 pt-4 border-t border-[#1a2f4a] flex gap-3">
                <button
                  onClick={handleReset}
                  className="flex-1 py-3 px-4 rounded-lg bg-white/5 border border-white/10
                             text-[#6a8aaa] text-sm font-medium hover:bg-white/8 hover:text-[#c8d8e8]
                             transition-all duration-200 min-h-[44px] cursor-pointer"
                >
                  Reset Form
                </button>
                <button
                  onClick={() =>
                    setData((d) => ({ ...d, certificateId: generateCertificateId() }))
                  }
                  className="flex-1 py-3 px-4 rounded-lg bg-[#f0c040]/10 border border-[#f0c040]/25
                             text-[#f0c040] text-sm font-medium hover:bg-[#f0c040]/15
                             transition-all duration-200 min-h-[44px] cursor-pointer"
                >
                  New Cert ID
                </button>
              </div>
            </div>

            {/* Info note */}
            <div className="mt-3 px-4 py-3 rounded-lg bg-[#00d4ff]/5 border border-[#00d4ff]/15
                            flex items-start gap-2.5">
              <div className="w-1.5 h-1.5 rounded-full bg-[#00d4ff] mt-1.5 flex-shrink-0" />
              <p className="text-[#6a8aaa] text-xs leading-relaxed">
                Certificate updates live as you type. Use the action buttons above to download
                PDF, PNG, JPG, or print.
              </p>
            </div>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#1a2f4a] mt-8 py-5 text-center">
        <p className="text-[#3a5070] text-xs tracking-wider">
          © 2026 FIXTON Technologies • Innovate • Build • Grow
        </p>
      </footer>
    </div>
  );
}
