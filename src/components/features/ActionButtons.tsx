import { FileDown, Image, Printer, Share2, FileImage } from 'lucide-react';
import { CertificateData } from '@/types/certificate';
import { downloadPDF, downloadPNG, downloadJPG, printCertificate, shareCertificate } from '@/lib/exportCertificate';
import { cn } from '@/lib/utils';

interface Props {
  data: CertificateData;
  layout?: 'grid' | 'row';
}

interface Action {
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
  variant: 'primary' | 'secondary' | 'ghost';
}

export default function ActionButtons({ data, layout = 'grid' }: Props) {
  const actions: Action[] = [
    {
      label: 'Download PDF',
      icon: <FileDown className="w-4 h-4" />,
      onClick: () => downloadPDF(data),
      variant: 'primary',
    },
    {
      label: 'Download PNG',
      icon: <Image className="w-4 h-4" />,
      onClick: () => downloadPNG(data),
      variant: 'secondary',
    },
    {
      label: 'Download JPG',
      icon: <FileImage className="w-4 h-4" />,
      onClick: () => downloadJPG(data),
      variant: 'secondary',
    },
    {
      label: 'Print',
      icon: <Printer className="w-4 h-4" />,
      onClick: () => printCertificate(data),
      variant: 'ghost',
    },
    {
      label: 'Share',
      icon: <Share2 className="w-4 h-4" />,
      onClick: () => shareCertificate(data),
      variant: 'ghost',
    },
  ];

  return (
    <div
      className={cn(
        layout === 'grid'
          ? 'grid grid-cols-2 gap-2 sm:grid-cols-3 lg:flex lg:flex-row lg:flex-wrap'
          : 'flex flex-row flex-wrap gap-2'
      )}
    >
      {actions.map((action) => (
        <button
          key={action.label}
          onClick={action.onClick}
          className={cn(
            'flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-semibold transition-all duration-200 min-h-[44px] cursor-pointer select-none',
            layout === 'grid' && 'w-full lg:w-auto',
            action.variant === 'primary' && [
              'bg-[#00d4ff] text-[#060e1a] col-span-2 sm:col-span-1',
              'hover:bg-[#33ddff] hover:shadow-[0_0_18px_rgba(0,212,255,0.5)]',
              'active:scale-95',
            ],
            action.variant === 'secondary' && [
              'bg-[#f0c040] text-[#060e1a]',
              'hover:bg-[#f5d060] hover:shadow-[0_0_18px_rgba(240,192,64,0.4)]',
              'active:scale-95',
            ],
            action.variant === 'ghost' && [
              'bg-white/5 border border-white/15 text-[#c8d8e8]',
              'hover:bg-white/10 hover:border-[#00d4ff]/40 hover:text-[#00d4ff]',
              'active:scale-95',
            ]
          )}
        >
          {action.icon}
          <span>{action.label}</span>
        </button>
      ))}
    </div>
  );
}
