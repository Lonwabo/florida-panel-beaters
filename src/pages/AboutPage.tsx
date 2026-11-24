import { AboutAndGuarantees } from '../components/AboutAndGuarantees';
import { WorkshopGallery } from '../components/WorkshopGallery';
import { AccreditationsMarquee } from '../components/AccreditationsMarquee';

export function AboutPage() {
  return (
    <div className="pt-16">
      <AboutAndGuarantees />
      <WorkshopGallery />
      <AccreditationsMarquee />
    </div>
  );
}
