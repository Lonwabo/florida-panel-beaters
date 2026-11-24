import { motion } from 'framer-motion';
import { Award, ShieldCheck, Users, Sparkles } from 'lucide-react';
import { BUSINESS, EXTRA_MILE_PERKS } from '../data/businessData';

export function AboutAndGuarantees() {
  return (
    <section
      id="about"
      className="relative py-24 bg-[#0a0c12] border-t border-white/10 overflow-hidden"
    >
      <div className="absolute right-0 top-1/4 w-96 h-96 bg-sky-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Heritage Story */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-20">
          <div className="lg:col-span-5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-400 mb-3">
              Our Heritage • Since 1968
            </p>
            <h2
              className="text-3xl sm:text-5xl font-bold text-white tracking-tight leading-tight"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              55+ Years of Craft.{' '}
              <span className="text-gradient-gold">100% Black Female Owned.</span>
            </h2>
            <p className="mt-5 text-zinc-300 leading-relaxed text-sm sm:text-base">
              Founded in 1968 in Florida, Roodepoort as a family-run beacon of
              workmanship, Florida Panelbeaters entered a bold new era in 2017
              under Marlon &amp; Nicolette Tibbetts. Since March 2020, Nicolette
              Tibbetts holds 100% ownership, making us a proud{' '}
              <strong className="text-white">
                Level 1 B-BBEE Contributor (135% recognition)
              </strong>
              .
            </p>

            {/* Timeline chips */}
            <div className="mt-8 space-y-3">
              {[
                {
                  year: '1968',
                  text: 'Established in Florida, Roodepoort — built on family workmanship.',
                },
                {
                  year: '1986–2009',
                  text: 'Marlon Tibbetts qualifies as spraypainter, trains in Germany, leads BB Cars paint shop for 17 years & founds Tibby’s Workshop.',
                },
                {
                  year: '2017',
                  text: 'Marlon & Nicolette Tibbetts take the helm of Florida Panelbeaters (Pty) Ltd.',
                },
                {
                  year: '2020–Now',
                  text: '100% Black Female Owned (Level 1 B-BBEE • 135%), Bureau Veritas & Automx audited, Lightstone CSI tracked.',
                },
              ].map((item) => (
                <div
                  key={item.year}
                  className="flex items-start gap-3.5 p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]"
                >
                  <span className="text-xs font-bold text-sky-400 bg-sky-400/15 px-2.5 py-1 rounded-lg shrink-0">
                    {item.year}
                  </span>
                  <p className="text-xs sm:text-sm text-zinc-300">{item.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Leadership + Going the Extra Mile Bento */}
          <div className="lg:col-span-7 space-y-6">
            {/* Leadership Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {BUSINESS.owners.map((owner) => (
                <motion.div
                  key={owner.name}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="glass-panel rounded-2xl p-6 border border-white/10"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sky-600 to-amber-500 flex items-center justify-center text-white font-bold text-sm">
                      {owner.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white">{owner.name}</h3>
                      <p className="text-[11px] text-amber-400 font-medium">
                        {owner.role}
                      </p>
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                    {owner.bio}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Going the Extra Mile Grid */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-4 h-4 text-sky-400" />
                <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-300">
                  Going The Extra Mile
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {EXTRA_MILE_PERKS.map((perk, idx) => (
                  <motion.div
                    key={perk.title}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05 }}
                    className="glass-panel glass-panel-hover rounded-2xl p-5"
                  >
                    <span className="inline-block text-[10px] font-extrabold tracking-widest px-2.5 py-1 rounded-md bg-sky-400/15 text-sky-400 mb-3">
                      {perk.metric}
                    </span>
                    <h4 className="text-sm font-bold text-white mb-1.5">
                      {perk.title}
                    </h4>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      {perk.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Owner-managed trust bar */}
            <div className="flex flex-wrap items-center gap-6 px-5 py-4 rounded-2xl bg-gradient-to-r from-sky-600/15 to-amber-500/10 border border-white/10 text-xs text-zinc-200">
              <span className="flex items-center gap-2">
                <Users className="w-4 h-4 text-sky-400" />
                Owner-Managed Workshop
              </span>
              <span className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                12-Month Rust Perforation Warranty
              </span>
              <span className="flex items-center gap-2">
                <Award className="w-4 h-4 text-emerald-400" />
                EFT &amp; Digital Assessment Facilities
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
