import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  HeartHandshake,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  MessageCircle,
  Wrench,
  Sparkles,
} from 'lucide-react';
import { BUSINESS } from '../data/businessData';

export function SaveACarPage() {
  const navigate = useNavigate();

  const whatsappUrl = `https://wa.me/${BUSINESS.whatsappNumber}?text=${encodeURIComponent(
    'Hi Florida Panel Beaters! I would like to enquire about your Save-A-Car cost-effective repair programme.'
  )}`;

  return (
    <div className="pt-28 pb-24 bg-[#07080c] min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-3xl p-8 sm:p-12 border border-amber-500/30 bg-gradient-to-br from-amber-500/12 via-[#101522] to-[#080a10] mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold mb-5">
            <HeartHandshake className="w-4 h-4" />
            SAVE-A-CAR PROGRAMME • UNINSURED &amp; SHORTFALL REPAIRS
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold text-white tracking-tight max-w-3xl leading-tight">
            No Insurance or Insurance Shortfall?{' '}
            <span className="text-gradient-gold">We Can Still Save Your Car.</span>
          </h1>
          <p className="mt-5 text-sm sm:text-base text-zinc-300 leading-relaxed max-w-2xl">
            Should you not have insurance, or if your insurance company will not
            pay the full amount for your car repair, Florida Panel Beaters offers
            smart, transparent alternatives. One of our most effective options is
            using <strong className="text-white">vetted quality used parts</strong>{' '}
            on specific areas of your vehicle—bringing repair costs down
            significantly without ever compromising safety or reliability.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3.5">
            <button
              onClick={() =>
                navigate('/booking', {
                  state: { service: 'Save-A-Car (Cost-Effective Repair)' },
                })
              }
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-amber-500 hover:bg-amber-400 text-black font-bold text-sm transition-colors cursor-pointer"
            >
              <span>Book a Save-A-Car Assessment</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#25D366] hover:bg-[#1ebe5d] text-black font-bold text-sm transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Send Damage Photos on WhatsApp</span>
            </a>
          </div>
        </motion.div>

        {/* How It Works */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            {
              step: '01',
              icon: Sparkles,
              title: 'Free Digital Assessment',
              desc: 'Bring your vehicle to 30A Hull Street or send photos via WhatsApp. We assess structural vs. cosmetic damage transparently.',
            },
            {
              step: '02',
              icon: Wrench,
              title: 'Smart Used-Parts Sourcing',
              desc: 'Where safe and reliable (such as panels, doors, bonnets, or trim), we source vetted quality used parts to slash costs.',
            },
            {
              step: '03',
              icon: ShieldCheck,
              title: 'Safety Never Compromised',
              desc: 'Critical structural and safety components are repaired strictly to SAMBRA/RMI standards, finished with Standox paint.',
            },
          ].map((item) => (
            <div
              key={item.step}
              className="glass-panel rounded-2xl p-6 border border-white/10"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-extrabold text-amber-400 bg-amber-500/15 px-2.5 py-1 rounded-lg">
                  STEP {item.step}
                </span>
                <item.icon className="w-5 h-5 text-sky-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Benefits Checklist */}
        <div className="glass-panel rounded-3xl p-8 border border-white/10">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-5">
            Why Motorists Choose Save-A-Car
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              'Significantly lower repair bills for uninsured vehicles',
              'Ideal when insurers want to write off a repairable car',
              'Same Standox colour-matched spray booth finish',
              'Honest, owner-managed advice from Marlon & Nicolette Tibbetts',
              'Home or office quotation available on request',
              'Electronic Funds Transfer (EFT) facilities available',
            ].map((point) => (
              <div key={point} className="flex items-start gap-2.5 text-sm text-zinc-300">
                <CheckCircle2 className="w-4 h-4 text-sky-400 mt-0.5 shrink-0" />
                <span>{point}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
