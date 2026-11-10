import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#060e1a] flex flex-col items-center justify-center text-center px-4">
      <p className="text-[#00d4ff] text-7xl font-black font-cinzel mb-4">404</p>
      <h1 className="text-[#c8d8e8] text-xl font-semibold mb-2">Page Not Found</h1>
      <p className="text-[#6a8aaa] text-sm mb-8">This page does not exist.</p>
      <button
        onClick={() => navigate('/')}
        className="px-6 py-3 bg-[#00d4ff] text-[#060e1a] font-bold rounded-lg
                   hover:bg-[#33ddff] transition-colors cursor-pointer"
      >
        Back to Certificate Generator
      </button>
    </div>
  );
}
