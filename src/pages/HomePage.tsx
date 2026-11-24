import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Wrench,
  HeartHandshake,
  ShieldCheck,
  Star,
  Calendar,
  MessageCircle,
} from 'lucide-react';
import { Hero } from '../components/Hero';
import { AccreditationsMarquee } from '../components/AccreditationsMarquee';
import { WorkshopGallery } from '../components/WorkshopGallery';

interface HomePageProps {
  onOpenBooking: () => void;
  onOpenAI: () => void;
}

const EXPLORE_CARDS = [
  {
    to: '/services',
    icon: Wrench,
    tag: '16+ Workshop Services',
    title: 'Collision, Standox Paint & PDR',
    desc: 'OEM-approved panel beating, laser chassis straightening, hail dent removal, mechanical & 4×4 fitment.',
  },
  {
    to: '/save-a-car',
    icon: HeartHandshake,
    tag: 'Uninsured / Shortfall',
    title: 'Save-A-Car Programme',
    desc: 'Vetted quality used parts on non-critical areas to bring repair costs down without compromising safety.',
  },
  {
    to: '/about',
    icon: ShieldCheck,
    tag: 'Est. 1968 • Level 1 B-BBEE',
    title: 'Heritage & Guarantees',
    desc: '100% Black Female Owned, 36-month bodywork guarantee, lifetime Standox paint warranty & home/office quotes.',
  },
  {
    to: '/reviews',
    icon: Star,
    tag: '4.1★ Google (350 Reviews)',
    title: 'Customer Testimonials',
    desc: 'Read verified positive reviews from West Rand motorists or rate your recent workshop experience.',
  },
  {
    to: '/booking',
    icon: Calendar,
    tag: '60-Second Scheduling',
    title: 'Book an Assessment',
    desc: 'Reserve a workshop slot at 30A Hull Street or request a mobile quotation at your home or office.',
  },
  {
    to: '/contact',
    icon: MessageCircle,
    tag: 'Direct WhatsApp & 24h Tow',
    title: 'Contact & Directions',
    desc: 'Send an enquiry, chat directly on WhatsApp (084 503 6324), or call 24-hour emergency towing.',
  },
];

export function HomePage({ onOpenBooking, onOpenAI }: HomePageProps) {
  return (
    <>
      <Hero onOpenBooking={onOpenBooking} onOpenAI={onOpenAI} />
      <AccreditationsMarquee />

      {/* Multi-Page Quick Directory Section */}
      <section className="py-20 bg-[#07080c]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-400 mb-2">
                Explore Florida Panel Beaters
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                How Can We <span className="text-gradient-accent">Help Your Vehicle</span> Today?
              </h2>
            </div>
            <Link
              to="/services"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-sky-400 hover:text-sky-300 transition-colors"
            >
              <span>View all services</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {EXPLORE_CARDS.map((card, idx) => (
              <motion.div
                key={card.to}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
              >
                <Link
                  to={card.to}
                  className="group block h-full glass-panel glass-panel-hover rounded-2xl p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-sky-400/12 border border-sky-400/25 flex items-center justify-center text-sky-400 group-hover:bg-sky-500 group-hover:text-slate-950 transition-colors">
                      <card.icon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-medium text-zinc-400 px-2.5 py-1 rounded-full bg-white/5 border border-white/10">
                      {card.tag}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-sky-300 transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-4">
                    {card.desc}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-400 group-hover:translate-x-1 transition-transform">
                    <span>Open page</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <WorkshopGallery />
    </>
  );
}
