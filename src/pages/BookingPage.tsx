import { useLocation } from 'react-router-dom';
import { BookingSystem } from '../components/BookingSystem';

export function BookingPage() {
  const location = useLocation();
  const state = location.state as { service?: string } | null;

  return (
    <div className="pt-16 min-h-screen bg-[#0a0c12]">
      <BookingSystem preselectedService={state?.service} />
    </div>
  );
}
