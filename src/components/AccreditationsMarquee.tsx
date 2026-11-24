import { Link } from 'react-router-dom';
import { ShieldCheck, FileText, ArrowRight } from 'lucide-react';
import {
  OEM_BRAND_LOGOS,
  INSURANCE_BRAND_LOGOS,
  CERTIFICATIONS,
} from '../data/businessData';

export function AccreditationsMarquee() {
  return (
    <section className="relative py-16 border-y border-white/10 bg-[#0a0c12] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-400 mb-2">
              Approved &amp; Audited Excellence
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              OEM, Insurance &amp; Industry Accreditations
            </h2>
          </div>
          <div className="flex flex-col sm:items-end gap-2">
            <p className="text-sm text-zinc-400 max-w-md sm:text-right">
              Audited by Bureau Veritas &amp; Automx. Approved by 11 leading vehicle
              manufacturers and South Africa’s major insurance underwriters.
            </p>
            <Link
              to="/certificates"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-400 hover:text-sky-300 transition-colors"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>View &amp; Download Official PDF Certificates</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Track 1: Official OEM Manufacturer Logos */}
      <div className="relative mb-4">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#0a0c12] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#0a0c12] to-transparent z-10 pointer-events-none" />
        <div className="animate-marquee gap-4">
          {[...OEM_BRAND_LOGOS, ...OEM_BRAND_LOGOS].map((brand, idx) => (
            <div
              key={`${brand.name}-${idx}`}
              className="group flex items-center gap-3.5 px-4 py-2.5 rounded-2xl glass-panel border border-white/10 hover:border-sky-400/50 transition-all shrink-0"
            >
              <div className="w-16 h-12 rounded-xl bg-white flex items-center justify-center p-1.5 shadow-sm overflow-hidden shrink-0">
                <img
                  src={brand.logo}
                  alt={`${brand.name} OEM Approved Logo`}
                  className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>
              <div className="pr-2">
                <span className="block text-sm font-bold tracking-wide uppercase text-zinc-100 leading-tight">
                  {brand.name}
                </span>
                <span className="inline-block text-[10px] px-2 py-0.5 mt-1 rounded-full bg-sky-400/15 text-sky-300 font-semibold">
                  OEM Approved
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Track 2: Official Insurance Partner Logos (reverse scroll) */}
      <div className="relative mb-10">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#0a0c12] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#0a0c12] to-transparent z-10 pointer-events-none" />
        <div className="animate-marquee-reverse gap-4">
          {[...INSURANCE_BRAND_LOGOS, ...INSURANCE_BRAND_LOGOS, ...INSURANCE_BRAND_LOGOS].map(
            (insurer, idx) => (
              <div
                key={`${insurer.name}-${idx}`}
                className="group flex items-center gap-3.5 px-4 py-2.5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-amber-400/45 transition-all shrink-0"
              >
                <div className="w-20 h-11 rounded-xl bg-white flex items-center justify-center p-1.5 shadow-sm overflow-hidden shrink-0">
                  <img
                    src={insurer.logo}
                    alt={`${insurer.name} Approved Repairer`}
                    className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
                <div className="pr-2">
                  <span className="block text-xs sm:text-sm font-semibold text-zinc-100 leading-tight">
                    {insurer.name}
                  </span>
                  <span className="inline-block text-[10px] px-2 py-0.5 mt-1 rounded-full bg-amber-400/15 text-amber-300 font-semibold">
                    Insurer Approved
                  </span>
                </div>
              </div>
            )
          )}
        </div>
      </div>

      {/* Industry Accreditations & Certifications Grid (with official logos!) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {CERTIFICATIONS.map((cert) => (
            <div
              key={cert.code}
              className="rounded-2xl bg-white/[0.03] border border-white/[0.08] p-3 text-center hover:border-sky-400/40 transition-colors flex flex-col items-center justify-between"
            >
              {cert.logo ? (
                <div className="w-full h-11 rounded-lg bg-white flex items-center justify-center p-1.5 mb-2 overflow-hidden">
                  <img
                    src={cert.logo}
                    alt={`${cert.code} Accreditation`}
                    className="max-w-full max-h-full object-contain"
                    loading="lazy"
                  />
                </div>
              ) : (
                <div className="w-full h-11 rounded-lg bg-sky-400/10 border border-sky-400/20 flex items-center justify-center mb-2">
                  <ShieldCheck className="w-5 h-5 text-sky-400" />
                </div>
              )}
              <div>
                <div className="text-xs font-bold text-white leading-tight">
                  {cert.code}
                </div>
                <div className="text-[10px] text-zinc-400 mt-0.5">{cert.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
