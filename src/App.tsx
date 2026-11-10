import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import CertificateGenerator from '@/pages/CertificateGenerator';
import NotFound from '@/pages/NotFound';

export default function App() {
  return (
    <BrowserRouter>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#0d1f3c',
            border: '1px solid rgba(0,212,255,0.3)',
            color: '#e8f4ff',
          },
        }}
      />
      <Routes>
        <Route path="/" element={<CertificateGenerator />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
