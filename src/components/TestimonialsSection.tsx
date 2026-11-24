import { motion } from 'framer-motion';
import { Star, ExternalLink, BadgeCheck, Quote } from 'lucide-react';
import { BUSINESS, INITIAL_TESTIMONIALS } from '../data/businessData';

export function TestimonialsSection() {
  return (
    <section id="reviews" className="relative py-24 bg-[#07080c]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header + Google Rating Summary */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-400 mb-3">
              Customer Testimonials
            </p>
            <h2
              className="text-3xl sm:text-5xl font-bold text-white tracking-tight"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Trusted by <span className="text-gradient-gold">West Rand Motorists</span>
            </h2>
          </div>

          {/* Google Maps Aggregate Badge */}
          <a
            href={BUSINESS.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-4 px-5 py-3.5 rounded-2xl glass-panel hover:border-amber-400/50 transition-all group"
          >
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-2xl font-extrabold text-white">4.1</span>
                <div className="flex items-center text-amber-400">
                  {[1, 2, 3, 4].map((n) => (
                    <Star key={n} className="w-4 h-4 fill-amber-400" />
                  ))}
                  <Star className="w-4 h-4 text-amber-400/50" />
                </div>
              </div>
              <p className="text-xs text-zinc-400 mt-0.5">
                Google Maps • 350 Reviews (259 Positive 4–5★)
              </p>
            </div>
            <div className="pl-4 border-l border-white/10 flex items-center gap-1.5 text-xs font-semibold text-amber-300 group-hover:text-amber-200">
              <span>View on Google</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </div>
          </a>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {INITIAL_TESTIMONIALS.map((review, idx) => (
            <motion.article
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08 }}
              className="glass-panel glass-panel-hover rounded-2xl p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="flex items-center gap-0.5 text-amber-400">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <span
                    className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2.5 py-1 rounded-full ${
                      review.source === 'Google Maps'
                        ? 'bg-blue-500/15 text-blue-300 border border-blue-500/25'
                        : 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/25'
                    }`}
                  >
                    <BadgeCheck className="w-3 h-3" />
                    {review.source}
                  </span>
                </div>

                <Quote className="w-6 h-6 text-sky-400/40 mb-2" />
                <p className="text-sm text-zinc-200 leading-relaxed mb-6">
                  “{review.text}”
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold text-white">
                    {review.author
                      .split(' ')
                      .map((n) => n[0])
                      .slice(0, 2)
                      .join('')}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">
                      {review.author}
                    </div>
                    <div className="text-[11px] text-zinc-400">{review.date}</div>
                  </div>
                </div>
                {review.verified && (
                  <span className="text-[10px] text-zinc-400 uppercase tracking-wider">
                    Verified
                  </span>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
