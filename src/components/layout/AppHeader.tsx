import { Shield } from 'lucide-react';

export default function AppHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-[#1a2f4a] bg-[#060e1a]/95 backdrop-blur-md">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00d4ff]/20 to-[#f0c040]/10
                            border border-[#00d4ff]/30 flex items-center justify-center flex-shrink-0">
              <span className="text-[#00d4ff] font-black text-xs font-cinzel">FX</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[#00d4ff] font-black text-sm tracking-widest font-cinzel">FIXTON</span>
                <span className="hidden sm:inline text-[#6a8aaa] text-xs tracking-wider">TECHNOLOGIES</span>
              </div>
              <p className="text-[#3a5070] text-[10px] tracking-widest hidden sm:block">
                CERTIFICATE GENERATOR
              </p>
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md
                            bg-[#00d4ff]/8 border border-[#00d4ff]/20">
              <Shield className="w-3 h-3 text-[#00d4ff]" />
              <span className="text-[#00d4ff] text-xs font-semibold hidden sm:inline">v1.0</span>
            </div>
            <div className="text-right hidden md:block">
              <p className="text-[#c8d8e8] text-xs font-semibold">Hackathon Cert</p>
              <p className="text-[#3a5070] text-[10px]">Innovate • Build • Grow</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
