import { motion } from 'framer-motion';
import {
  ArrowRight,
  Phone,
  ShieldCheck,
  Sparkles,
  Award,
  MapPin,
  Bot,
} from 'lucide-react';
import { HeroScene3D } from './HeroScene3D';
import { BUSINESS } from '../data/businessData';

interface HeroProps {
  onOpenBooking: () => void;
  onOpenAI: () => void;
}

export function Hero({ onOpenBooking, onOpenAI }: HeroProps) {
  return (
    <section
      id="top"
      className="relative min-h-screen flex items-center pt-28 pb-16 overflow-hidden bg-[#070a12]"
    >
      {/* Interactive Three.js 3D Studio Backdrop */}
      <HeroScene3D />

      {/* Subtle Vignette — keeps moving 3D background clearly visible */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#070a12]/80 via-[#070a12]/35 to-transparent z-[1] pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#07080c] to-transparent z-[1] pointer-events-none" />
      <div className="absolute -top-32 -left-32 w-[460px] h-[460px] rounded-full bg-sky-500/10 blur-[130px] pointer-events-none z-[1]" />

      {/* Content — pointer-events-none on wrapper so the entire 3D car area is directly draggable */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pointer-events-none">
        <div className="max-w-xl pointer-events-auto">
          {/* Eyebrow Pill */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="inline-flex flex-wrap items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel text-[11px] font-medium text-zinc-200 mb-5"
          >
            <span className="flex items-center gap-1.5 text-sky-400 font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              EST. 1968 • ROODEPOORT
            </span>
            <span className="text-zinc-600">•</span>
            <span className="text-amber-300 font-semibold">Level 1 B-BBEE (135%)</span>
            <span className="text-zinc-600 hidden sm:inline">•</span>
            <span className="text-zinc-300 hidden sm:inline">SAMBRA / RMI</span>
          </motion.div>

          {/* Compact, Sleek Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="text-3xl sm:text-4xl lg:text-[3.1rem] font-bold tracking-tight leading-[1.12] text-white"
          >
            Factory-Precision{' '}
            <span className="text-gradient-accent">Collision Repair</span>{' '}
            &amp; Standox Finish.
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.16 }}
            className="mt-4 text-sm sm:text-base text-zinc-300 leading-relaxed max-w-md"
          >
            Trusted across Florida &amp; the West Rand for over 55 years. OEM &amp;
            insurer approved, backed by our{' '}
            <strong className="text-white">36-month bodywork guarantee</strong> and{' '}
            <strong className="text-sky-300">lifetime Standox paint warranty</strong>.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.24 }}
            className="mt-7 flex flex-wrap items-center gap-3"
          >
            <button
              onClick={onOpenBooking}
              className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-400 hover:to-cyan-400 text-slate-950 font-bold text-sm shadow-xl shadow-sky-500/25 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              <span>Book an Assessment</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={onOpenAI}
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full glass-panel hover:border-sky-400/50 text-zinc-100 font-semibold text-sm transition-all hover:bg-white/10 cursor-pointer"
            >
              <Bot className="w-4 h-4 text-sky-400" />
              <span>Ask AI Estimator</span>
            </button>

            <a
              href={BUSINESS.phoneHref}
              className="inline-flex items-center gap-1.5 px-3 py-3 text-zinc-300 hover:text-white text-sm font-medium transition-colors"
            >
              <Phone className="w-4 h-4 text-sky-400" />
              <span>{BUSINESS.phone}</span>
            </a>
          </motion.div>

          {/* Compact Trust Metrics Strip */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.34 }}
            className="mt-9 grid grid-cols-2 sm:grid-cols-4 gap-2.5"
          >
            {[
              { value: '55+ Yrs', label: 'Heritage', icon: Award },
              { value: '36 Mo', label: 'Bodywork', icon: ShieldCheck },
              { value: 'Lifetime', label: 'Standox Paint', icon: Sparkles },
              { value: '24 / 7', label: 'Towing', icon: Phone },
            ].map((stat) => (
              <div
                key={stat.label}
                className="glass-panel rounded-xl px-3 py-2.5 border border-white/10"
              >
                <div className="flex items-center gap-1.5 text-sky-400">
                  <stat.icon className="w-3.5 h-3.5 shrink-0" />
                  <span className="text-sm sm:text-base font-bold text-white tracking-tight">
                    {stat.value}
                  </span>
                </div>
                <p className="text-[11px] text-zinc-400 mt-0.5">{stat.label}</p>
              </div>
            ))}
          </motion.div>

          {/* Address quick note */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-5 flex items-center gap-2 text-xs text-zinc-400"
          >
            <MapPin className="w-3.5 h-3.5 text-sky-400 shrink-0" />
            <span>{BUSINESS.address}</span>
          </motion.div>
        </div>
      </div>

      {/* Subtle 3D interaction badge — positioned clear of the AI Bot button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="hidden lg:flex items-center gap-2 absolute bottom-8 right-56 z-10 px-3.5 py-2 rounded-full glass-panel text-[11px] text-zinc-200 pointer-events-none"
      >
        <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping" />
        <span>Interactive 3D Car • Click &amp; drag to rotate 360°</span>
      </motion.div>
    </section>
  );
}
