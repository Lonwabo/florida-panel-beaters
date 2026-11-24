import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, ArrowRight, X, Maximize2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export interface GalleryPhoto {
  id: string;
  title: string;
  tag: string;
  caption: string;
  src: string;
}

export const WORKSHOP_PHOTOS: GalleryPhoto[] = [
  {
    id: 'storefront',
    title: '30A Hull Street Storefront & Assessors Parking',
    tag: 'Florida, Roodepoort',
    caption:
      'Our OEM-accredited collision repair centre with dedicated assessors parking and drive-in assessment bay.',
    src: '/workshop/storefront.jpg',
  },
  {
    id: 'spray-booth',
    title: 'Enclosed Downdraft Spray Booth',
    tag: 'Lifetime Paint Warranty',
    caption:
      'Dust-controlled, illuminated spray booth delivering factory-grade Standox gloss finishes.',
    src: '/workshop/spray-booth.jpg',
  },
  {
    id: 'prep-bays',
    title: 'Standox Preparation Bays 2 & 4',
    tag: 'Standox Agent',
    caption:
      'Dedicated preparation bays where panels and bumpers are expertly primed and colour-matched.',
    src: '/workshop/prep-bays.jpg',
  },
  {
    id: 'chassis-bench',
    title: 'Hurricane Chassis Bench — Bay 1',
    tag: 'Structural Alignment',
    caption:
      'Precision structural chassis straightening restoring vehicles to strict OEM geometry tolerances.',
    src: '/workshop/chassis-bench.jpg',
  },
  {
    id: 'workshop-floor',
    title: 'Full-Scale Assembly & Repair Floor',
    tag: 'SAMBRA / RMI Approved',
    caption:
      'High-capacity multi-bay workshop equipped to handle insurance claims and fleet repairs efficiently.',
    src: '/workshop/workshop-floor.jpg',
  },
  {
    id: 'reception',
    title: 'Customer Care & Reception Desk',
    tag: 'Mon–Fri 07:30–17:00',
    caption:
      'Friendly, transparent check-in, digital quotations, and live SMS progress updates from our team.',
    src: '/workshop/reception.jpg',
  },
];

export function WorkshopGallery() {
  const [lightboxPhoto, setLightboxPhoto] = useState<GalleryPhoto | null>(null);

  return (
    <section className="py-20 bg-[#0a0c12] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <p className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-sky-400 mb-2">
              <Camera className="w-3.5 h-3.5" />
              Inside Florida Panel Beaters
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Our Facility &amp; <span className="text-gradient-accent">Workshop Bays</span>
            </h2>
          </div>
          <Link
            to="/booking"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-sky-400 hover:text-sky-300 transition-colors"
          >
            <span>Book an on-site assessment</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Balanced 3 × 2 Photo Grid (6 Real Workshop Photos) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {WORKSHOP_PHOTOS.map((photo, idx) => (
            <motion.figure
              key={photo.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.06 }}
              onClick={() => setLightboxPhoto(photo)}
              className="group glass-panel glass-panel-hover rounded-2xl overflow-hidden flex flex-col cursor-pointer"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                <img
                  src={photo.src}
                  alt={photo.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0c12]/80 via-transparent to-transparent" />
                <span className="absolute top-3 left-3 text-[11px] font-semibold px-2.5 py-1 rounded-full bg-black/70 backdrop-blur border border-white/15 text-sky-300">
                  {photo.tag}
                </span>
                <span className="absolute bottom-3 right-3 p-1.5 rounded-lg bg-black/60 backdrop-blur border border-white/15 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-3.5 h-3.5" />
                </span>
              </div>
              <figcaption className="p-5 flex-1">
                <h3 className="text-base font-bold text-white mb-1.5 group-hover:text-sky-300 transition-colors">
                  {photo.title}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                  {photo.caption}
                </p>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>

      {/* Lightbox Modal for Full-Screen Inspection */}
      <AnimatePresence>
        {lightboxPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxPhoto(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full rounded-3xl overflow-hidden bg-[#0c0f18] border border-white/15 shadow-2xl"
            >
              <button
                onClick={() => setLightboxPhoto(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/70 hover:bg-black text-white border border-white/20 cursor-pointer"
                aria-label="Close image preview"
              >
                <X className="w-5 h-5" />
              </button>
              <img
                src={lightboxPhoto.src}
                alt={lightboxPhoto.title}
                className="w-full max-h-[75vh] object-contain bg-black"
              />
              <div className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span className="text-xs font-semibold text-sky-400 uppercase tracking-wider">
                    {lightboxPhoto.tag}
                  </span>
                  <h3 className="text-lg font-bold text-white mt-0.5">
                    {lightboxPhoto.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-400 mt-1">
                    {lightboxPhoto.caption}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
