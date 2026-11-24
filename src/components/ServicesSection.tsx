import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Wrench,
  Paintbrush,
  Sparkles,
  CheckCircle2,
  ArrowUpRight,
  HeartHandshake,
  ShieldAlert,
} from 'lucide-react';
import { SERVICES, type ServiceItem } from '../data/businessData';

interface ServicesSectionProps {
  onSelectServiceForBooking: (serviceTitle: string) => void;
}

const TABS = [
  { id: 'all', label: 'All Services (9)' },
  { id: 'collision', label: 'Collision & Paint' },
  { id: 'mechanical', label: 'Mechanical & Electrical' },
  { id: 'fitment', label: '4×4, Fitment & Valet' },
] as const;

export function ServicesSection({ onSelectServiceForBooking }: ServicesSectionProps) {
  const [activeTab, setActiveTab] = useState<'all' | ServiceItem['category']>('all');

  const filtered =
    activeTab === 'all'
      ? SERVICES
      : SERVICES.filter((s) => s.category === activeTab);

  return (
    <section id="services" className="relative py-20 bg-[#07080c]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header + Clean Single-Row Segmented Filter Bar */}
        <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-6 mb-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-400 mb-2.5">
              Complete Automotive Restoration
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
              Every Repair Under <span className="text-gradient-accent">One Roof</span>
            </h2>
          </div>

          {/* Segmented Single-Row Pill Bar — never wraps awkwardly */}
          <div className="inline-flex items-center gap-1 p-1.5 rounded-2xl bg-white/[0.04] border border-white/10 overflow-x-auto max-w-full shrink-0">
            {TABS.map((tab) => {
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    active
                      ? 'bg-gradient-to-r from-sky-500 to-cyan-500 text-slate-950 shadow-md shadow-sky-500/25'
                      : 'text-zinc-300 hover:text-white hover:bg-white/[0.06]'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Balanced 3×3 (All) or 3×1 (Category) Service Cards Grid — Zero Empty Gaps */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((service) => (
              <motion.div
                key={service.id}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.25 }}
                className="group glass-panel glass-panel-hover rounded-2xl p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="w-11 h-11 rounded-xl bg-sky-400/12 border border-sky-400/25 flex items-center justify-center text-sky-400 group-hover:bg-sky-500 group-hover:text-slate-950 transition-colors">
                      {service.category === 'collision' ? (
                        <Paintbrush className="w-5 h-5" />
                      ) : service.category === 'mechanical' ? (
                        <Wrench className="w-5 h-5" />
                      ) : (
                        <Sparkles className="w-5 h-5" />
                      )}
                    </div>
                    {service.badge && (
                      <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/25">
                        {service.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-sky-300 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm text-zinc-400 leading-relaxed mb-5">
                    {service.shortDesc}
                  </p>

                  <ul className="space-y-2 mb-6">
                    {service.highlights.map((h) => (
                      <li
                        key={h}
                        className="flex items-center gap-2 text-xs text-zinc-300"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => onSelectServiceForBooking(service.title)}
                  className="inline-flex items-center justify-between w-full px-4 py-2.5 rounded-xl bg-white/[0.04] hover:bg-sky-500 text-zinc-200 hover:text-slate-950 text-xs font-bold transition-colors cursor-pointer"
                >
                  <span>Book this service</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Spotlight: Save-A-Car & Paintless Dent Removal */}
        <div
          id="save-a-car"
          className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          {/* Save-A-Car */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            className="relative overflow-hidden rounded-3xl p-8 border border-amber-500/30 bg-gradient-to-br from-amber-500/12 via-[#12131c] to-[#0a0b10]"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold mb-4">
              <HeartHandshake className="w-3.5 h-3.5" />
              SAVE-A-CAR PROGRAMME
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
              Uninsured or Insurance Shortfall?{' '}
              <span className="text-gradient-gold">We Can Still Save Your Car.</span>
            </h3>
            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed mb-6">
              If you don’t have insurance, or your insurer won’t cover the full
              repair cost, our Save-A-Car programme lets us source vetted{' '}
              <strong className="text-white">quality used parts</strong> for
              non-critical areas—bringing your cost down significantly without
              ever compromising your vehicle’s safety or reliability.
            </p>
            <button
              onClick={() =>
                onSelectServiceForBooking('Save-A-Car (Cost-Effective Repair)')
              }
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-amber-500 hover:bg-amber-400 text-black font-bold text-sm transition-colors cursor-pointer"
            >
              <span>Request a Save-A-Car Quote</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </motion.div>

          {/* Paintless Dent Removal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: 0.08 }}
            className="relative overflow-hidden rounded-3xl p-8 border border-sky-400/30 bg-gradient-to-br from-sky-500/12 via-[#12131c] to-[#0a0b10]"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-400/20 text-sky-300 text-xs font-semibold mb-4">
              <ShieldAlert className="w-3.5 h-3.5" />
              HAIL &amp; PARKING DENT SPECIALISTS
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
              Paintless Dent Removal{' '}
              <span className="text-gradient-accent">— Zero Repainting.</span>
            </h3>
            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed mb-6">
              Our trained technicians evaluate hail damage and shopping-centre door
              dings, carefully access the panel from behind with specialized PDR
              tooling, massage the metal back to factory contour, and buff your
              car to maximum showroom shine.
            </p>
            <button
              onClick={() =>
                onSelectServiceForBooking('Paintless Dent Removal (PDR)')
              }
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-400 hover:to-cyan-400 text-slate-950 font-bold text-sm transition-colors cursor-pointer"
            >
              <span>Book a Free PDR Check</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
