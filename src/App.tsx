import { useState, useEffect } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { AIBotWidget } from './components/AIBotWidget';
import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { SaveACarPage } from './pages/SaveACarPage';
import { AboutPage } from './pages/AboutPage';
import { ReviewsPage } from './pages/ReviewsPage';
import { CertificatesPage } from './pages/CertificatesPage';
import { BookingPage } from './pages/BookingPage';
import { ContactPage } from './pages/ContactPage';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname]);
  return null;
}

function AppShell() {
  const [aiOpen, setAiOpen] = useState(false);
  const navigate = useNavigate();

  const goToBooking = (service?: string) => {
    navigate('/booking', { state: service ? { service } : undefined });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#07080c] text-zinc-100">
      <ScrollToTop />
      <Navbar onOpenBooking={() => goToBooking()} />

      <main className="flex-1">
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                onOpenBooking={() => goToBooking()}
                onOpenAI={() => setAiOpen(true)}
              />
            }
          />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/save-a-car" element={<SaveACarPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/reviews" element={<ReviewsPage />} />
          <Route path="/certificates" element={<CertificatesPage />} />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <Footer />

      <AIBotWidget
        isOpen={aiOpen}
        setIsOpen={setAiOpen}
        onJumpToBooking={(service) => goToBooking(service)}
      />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}
