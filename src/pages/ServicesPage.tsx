import { useNavigate } from 'react-router-dom';
import { ServicesSection } from '../components/ServicesSection';
import { AccreditationsMarquee } from '../components/AccreditationsMarquee';

export function ServicesPage() {
  const navigate = useNavigate();

  return (
    <div className="pt-16">
      <ServicesSection
        onSelectServiceForBooking={(service) =>
          navigate('/booking', { state: { service } })
        }
      />
      <AccreditationsMarquee />
    </div>
  );
}
