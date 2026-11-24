import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar,
  Car,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  User,
  Copy,
  Check,
} from 'lucide-react';
import {
  BUSINESS,
  INSURANCE_PARTNERS,
  OEM_ACCREDITATIONS,
} from '../data/businessData';

interface BookingSystemProps {
  preselectedService?: string;
}

const BOOKING_SERVICES = [
  'Collision Repair / Insurance Claim',
  'Standox Spray Painting',
  'Paintless Dent Removal (PDR)',
  'Save-A-Car (Cost-Effective Repair)',
  'Chassis Straightening',
  'Mechanical Repairs & Vehicle Service',
  'Windscreen, Alignment & Mag Repairs',
  'AA Roadworthy & Assessment',
  '24-Hour Emergency Towing',
];

const DAMAGE_ZONES = [
  'Front Bumper / Grille',
  'Bonnet / Hood',
  'Left Side / Doors',
  'Right Side / Doors',
  'Rear Bumper / Boot',
  'Roof / Hail Damage',
  'Windscreen / Glass',
  'Chassis / Undercarriage',
  'Mechanical / Electrical',
];

const TIME_SLOTS = [
  '08:00 – 09:00',
  '09:30 – 10:30',
  '11:00 – 12:00',
  '13:30 – 14:30',
  '15:00 – 16:00',
];

export function BookingSystem({ preselectedService }: BookingSystemProps) {
  const [step, setStep] = useState(1);
  const [service, setService] = useState(BOOKING_SERVICES[0]);
  const [claimType, setClaimType] = useState<'insurance' | 'private'>('insurance');
  const [insurer, setInsurer] = useState('Santam');
  const [claimNumber, setClaimNumber] = useState('');

  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('2022');
  const [reg, setReg] = useState('');
  const [damageZones, setDamageZones] = useState<string[]>(['Front Bumper / Grille']);
  const [notes, setNotes] = useState('');

  const [date, setDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  });
  const [timeSlot, setTimeSlot] = useState(TIME_SLOTS[0]);
  const [assessmentMode, setAssessmentMode] = useState<'workshop' | 'mobile'>('workshop');
  const [needsPickup, setNeedsPickup] = useState(false);

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [popiaAccepted, setPopiaAccepted] = useState(true);

  const [bookingRef, setBookingRef] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (preselectedService) {
      const match = BOOKING_SERVICES.find((s) =>
        s.toLowerCase().includes(preselectedService.toLowerCase().slice(0, 10))
      );
      setService(match || preselectedService);
      setBookingRef(null);
      setStep(1);
    }
  }, [preselectedService]);

  const isOemApproved = OEM_ACCREDITATIONS.some(
    (oem) => make.trim().toLowerCase() === oem.toLowerCase()
  );

  const toggleDamageZone = (zone: string) => {
    setDamageZones((prev) =>
      prev.includes(zone) ? prev.filter((z) => z !== zone) : [...prev, zone]
    );
  };

  const canProceed = () => {
    if (step === 1) return Boolean(service);
    if (step === 2) return make.trim().length > 0 && model.trim().length > 0;
    if (step === 3) return Boolean(date && timeSlot);
    if (step === 4)
      return fullName.trim().length > 1 && phone.trim().length >= 8 && popiaAccepted;
    return true;
  };

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canProceed()) return;
    const rand = Math.floor(1000 + Math.random() * 9000);
    setBookingRef(`FPB-${new Date().getFullYear()}-${rand}`);
  };

  const buildWhatsAppLink = () => {
    const msg = [
      `Hi Florida Panel Beaters! I just booked an assessment online.`,
      bookingRef ? `Ref: ${bookingRef}` : '',
      `Name: ${fullName}`,
      `Phone: ${phone}`,
      `Service: ${service}`,
      `Payment: ${claimType === 'insurance' ? `Insurance (${insurer}${claimNumber ? `, Claim #${claimNumber}` : ''})` : 'Private / Save-A-Car'}`,
      `Vehicle: ${year} ${make} ${model}${reg ? ` (${reg})` : ''}`,
      `Damage Areas: ${damageZones.join(', ') || 'General assessment'}`,
      `Date & Time: ${date} at ${timeSlot}`,
      `Location: ${assessmentMode === 'mobile' ? 'Home/Office Mobile Quote requested' : '30A Hull Street Workshop'}`,
      needsPickup ? `Pick-up/Drop-off: Requested` : '',
      notes ? `Notes: ${notes}` : '',
    ]
      .filter(Boolean)
      .join('\n');
    return `https://wa.me/${BUSINESS.whatsappNumber}?text=${encodeURIComponent(msg)}`;
  };

  const copyRef = () => {
    if (!bookingRef) return;
    navigator.clipboard?.writeText(bookingRef);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const resetBooking = () => {
    setBookingRef(null);
    setStep(1);
  };

  return (
    <section
      id="booking"
      className="relative py-24 bg-[#0a0c12] border-y border-white/10 overflow-hidden"
    >
      <div className="absolute -left-32 top-1/3 w-96 h-96 bg-sky-500/12 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Heading */}
        <div className="text-center mb-12">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-400 mb-3">
            Fast Online Scheduling
          </p>
          <h2
            className="text-3xl sm:text-5xl font-bold text-white tracking-tight"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Book Your <span className="text-gradient-accent">Vehicle Assessment</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-zinc-400 max-w-2xl mx-auto">
            Reserve a workshop slot at 30A Hull Street or request a mobile quotation
            at your home or office. Instant confirmation + WhatsApp handoff.
          </p>
        </div>

        {/* Stepper Bar */}
        {!bookingRef && (
          <div className="grid grid-cols-4 gap-2 sm:gap-4 mb-8">
            {[
              { n: 1, label: 'Service', icon: Sparkles },
              { n: 2, label: 'Vehicle', icon: Car },
              { n: 3, label: 'Schedule', icon: Calendar },
              { n: 4, label: 'Details', icon: User },
            ].map((s) => {
              const active = step === s.n;
              const done = step > s.n;
              return (
                <button
                  key={s.n}
                  type="button"
                  onClick={() => done && setStep(s.n)}
                  className={`flex items-center justify-center sm:justify-start gap-2.5 px-3 py-3 rounded-2xl border text-xs sm:text-sm font-semibold transition-all ${
                    active
                      ? 'bg-sky-500/20 border-sky-400 text-white shadow-lg shadow-sky-500/15'
                      : done
                      ? 'bg-emerald-500/10 border-emerald-500/35 text-emerald-300 cursor-pointer'
                      : 'bg-white/[0.02] border-white/10 text-zinc-500'
                  }`}
                >
                  <s.icon className="w-4 h-4 shrink-0" />
                  <span className="hidden sm:inline">{s.label}</span>
                  <span className="sm:hidden">{s.n}</span>
                </button>
              );
            })}
          </div>
        )}

        {/* Main Card */}
        <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-white/10 shadow-2xl">
          <AnimatePresence mode="wait">
            {bookingRef ? (
              /* Confirmation State */
              <motion.div
                key="confirmed"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-6"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mx-auto mb-5">
                  <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                  Assessment Request Confirmed!
                </h3>
                <p className="text-sm text-zinc-400 max-w-md mx-auto mb-6">
                  Thank you, <strong className="text-white">{fullName}</strong>.
                  Our team at Florida Panel Beaters has reserved your slot and will
                  confirm via SMS or phone shortly.
                </p>

                {/* Reference Box */}
                <div className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl bg-white/5 border border-white/15 mb-8">
                  <span className="text-xs text-zinc-400 uppercase tracking-wider">
                    Booking Ref:
                  </span>
                  <span className="text-lg font-mono font-bold text-amber-400">
                    {bookingRef}
                  </span>
                  <button
                    onClick={copyRef}
                    className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-zinc-200 transition-colors cursor-pointer"
                    title="Copy reference"
                  >
                    {copied ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {/* Summary Grid */}
                <div className="max-w-lg mx-auto text-left rounded-2xl bg-black/40 border border-white/10 p-5 space-y-2.5 text-xs sm:text-sm mb-8">
                  <div className="flex justify-between gap-4">
                    <span className="text-zinc-400">Service:</span>
                    <span className="text-white font-medium text-right">{service}</span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span className="text-zinc-400">Vehicle:</span>
                    <span className="text-white font-medium text-right">
                      {year} {make} {model} {reg && `(${reg})`}
                    </span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span className="text-zinc-400">Date &amp; Time:</span>
                    <span className="text-white font-medium text-right">
                      {date} • {timeSlot}
                    </span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span className="text-zinc-400">Type:</span>
                    <span className="text-white font-medium text-right">
                      {claimType === 'insurance' ? `Insurance (${insurer})` : 'Private / Save-A-Car'}
                    </span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span className="text-zinc-400">Assessment Mode:</span>
                    <span className="text-white font-medium text-right">
                      {assessmentMode === 'mobile'
                        ? 'Home / Office Mobile Quote'
                        : '30A Hull Street Workshop'}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap items-center justify-center gap-3.5">
                  <a
                    href={buildWhatsAppLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-black font-bold text-sm shadow-lg shadow-emerald-500/25 transition-all"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Send Booking Details via WhatsApp</span>
                  </a>
                  <button
                    onClick={resetBooking}
                    className="px-6 py-3.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-200 text-sm font-medium transition-colors cursor-pointer"
                  >
                    Make Another Booking
                  </button>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleConfirmBooking}>
                {/* STEP 1: Service & Insurance */}
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -16 }}
                    className="space-y-6"
                  >
                    <div>
                      <label className="block text-sm font-semibold text-white mb-3">
                        1. Select Primary Service
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                        {BOOKING_SERVICES.map((item) => (
                          <button
                            key={item}
                            type="button"
                            onClick={() => setService(item)}
                            className={`text-left px-4 py-3 rounded-xl border text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                              service === item
                                ? 'bg-sky-500/20 border-sky-400 text-white'
                                : 'bg-white/[0.03] border-white/10 text-zinc-300 hover:bg-white/[0.07]'
                            }`}
                          >
                            {item}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-white/10">
                      <label className="block text-sm font-semibold text-white mb-3">
                        2. Insurance Claim or Private Repair?
                      </label>
                      <div className="grid grid-cols-2 gap-3 mb-4">
                        <button
                          type="button"
                          onClick={() => setClaimType('insurance')}
                          className={`py-3 px-4 rounded-xl border text-sm font-semibold transition-all cursor-pointer ${
                            claimType === 'insurance'
                              ? 'bg-sky-500 text-white border-sky-400'
                              : 'bg-white/5 text-zinc-300 border-white/10'
                          }`}
                        >
                          Insurance Claim
                        </button>
                        <button
                          type="button"
                          onClick={() => setClaimType('private')}
                          className={`py-3 px-4 rounded-xl border text-sm font-semibold transition-all cursor-pointer ${
                            claimType === 'private'
                              ? 'bg-amber-500 text-black border-amber-400'
                              : 'bg-white/5 text-zinc-300 border-white/10'
                          }`}
                        >
                          Private / Save-A-Car
                        </button>
                      </div>

                      {claimType === 'insurance' && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs text-zinc-400 mb-1.5">
                              Insurance Company
                            </label>
                            <select
                              value={insurer}
                              onChange={(e) => setInsurer(e.target.value)}
                              className="w-full px-4 py-3 rounded-xl bg-[#12141e] border border-white/15 text-sm text-white focus:outline-none focus:border-sky-400"
                            >
                              {INSURANCE_PARTNERS.map((p) => (
                                <option key={p} value={p}>
                                  {p}
                                </option>
                              ))}
                              <option value="Other Insurer">Other Insurer</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-xs text-zinc-400 mb-1.5">
                              Claim Number (Optional)
                            </label>
                            <input
                              type="text"
                              value={claimNumber}
                              onChange={(e) => setClaimNumber(e.target.value)}
                              placeholder="e.g. CLM-849201"
                              className="w-full px-4 py-3 rounded-xl bg-[#12141e] border border-white/15 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-sky-400"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}

                {/* STEP 2: Vehicle & Damage Zones */}
                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -16 }}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div>
                        <label className="block text-xs text-zinc-400 mb-1.5">
                          Vehicle Make *
                        </label>
                        <input
                          type="text"
                          required
                          list="oem-makes"
                          value={make}
                          onChange={(e) => setMake(e.target.value)}
                          placeholder="e.g. Toyota, Ford, Haval"
                          className="w-full px-4 py-3 rounded-xl bg-[#12141e] border border-white/15 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-sky-400"
                        />
                        <datalist id="oem-makes">
                          {OEM_ACCREDITATIONS.map((oem) => (
                            <option key={oem} value={oem} />
                          ))}
                        </datalist>
                        {isOemApproved && (
                          <span className="inline-flex items-center gap-1 text-[11px] text-emerald-400 mt-1.5 font-medium">
                            <ShieldCheck className="w-3.5 h-3.5" />
                            OEM Factory-Approved Brand!
                          </span>
                        )}
                      </div>
                      <div>
                        <label className="block text-xs text-zinc-400 mb-1.5">
                          Model *
                        </label>
                        <input
                          type="text"
                          required
                          value={model}
                          onChange={(e) => setModel(e.target.value)}
                          placeholder="e.g. Hilux, Ranger, Jolion"
                          className="w-full px-4 py-3 rounded-xl bg-[#12141e] border border-white/15 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-sky-400"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-zinc-400 mb-1.5">
                          Year
                        </label>
                        <input
                          type="number"
                          min="1980"
                          max="2027"
                          value={year}
                          onChange={(e) => setYear(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl bg-[#12141e] border border-white/15 text-sm text-white focus:outline-none focus:border-sky-400"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-zinc-400 mb-1.5">
                          Registration (Optional)
                        </label>
                        <input
                          type="text"
                          value={reg}
                          onChange={(e) => setReg(e.target.value.toUpperCase())}
                          placeholder="e.g. AB 12 CD GP"
                          className="w-full px-4 py-3 rounded-xl bg-[#12141e] border border-white/15 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-sky-400"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-white mb-2.5">
                        Select Affected Area(s)
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {DAMAGE_ZONES.map((zone) => {
                          const selected = damageZones.includes(zone);
                          return (
                            <button
                              key={zone}
                              type="button"
                              onClick={() => toggleDamageZone(zone)}
                              className={`px-3.5 py-2 rounded-full text-xs font-medium border transition-all cursor-pointer ${
                                selected
                                  ? 'bg-sky-500/25 border-sky-400 text-white'
                                  : 'bg-white/[0.03] border-white/10 text-zinc-400 hover:text-zinc-200'
                              }`}
                            >
                              {zone}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs text-zinc-400 mb-1.5">
                        Brief Damage Description (Optional)
                      </label>
                      <textarea
                        rows={2}
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Describe any dents, scratches, hail marks, or mechanical issues..."
                        className="w-full px-4 py-3 rounded-xl bg-[#12141e] border border-white/15 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-sky-400"
                      />
                    </div>
                  </motion.div>
                )}

                {/* STEP 3: Date, Time & Mobile Quote */}
                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -16 }}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-white mb-2">
                          Preferred Assessment Date *
                        </label>
                        <input
                          type="date"
                          required
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                          className="w-full px-4 py-3.5 rounded-xl bg-[#12141e] border border-white/15 text-sm text-white focus:outline-none focus:border-sky-400"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-white mb-2">
                          Preferred Time Slot *
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                          {TIME_SLOTS.map((slot) => (
                            <button
                              key={slot}
                              type="button"
                              onClick={() => setTimeSlot(slot)}
                              className={`flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl border text-xs font-medium transition-all cursor-pointer ${
                                timeSlot === slot
                                  ? 'bg-sky-500 text-white border-sky-400'
                                  : 'bg-white/[0.03] border-white/10 text-zinc-300 hover:bg-white/[0.08]'
                              }`}
                            >
                              <Clock className="w-3.5 h-3.5" />
                              <span>{slot}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-white/10 space-y-4">
                      <label className="block text-sm font-semibold text-white">
                        Where would you like your assessment?
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <button
                          type="button"
                          onClick={() => setAssessmentMode('workshop')}
                          className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                            assessmentMode === 'workshop'
                              ? 'bg-sky-500/15 border-sky-400 text-white'
                              : 'bg-white/[0.03] border-white/10 text-zinc-300'
                          }`}
                        >
                          <div className="font-semibold text-sm">
                            On-Site Assessment Centre
                          </div>
                          <div className="text-xs text-zinc-400 mt-1">
                            30A Hull Street, Florida, Roodepoort (Free Wi-Fi Lounge)
                          </div>
                        </button>
                        <button
                          type="button"
                          onClick={() => setAssessmentMode('mobile')}
                          className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                            assessmentMode === 'mobile'
                              ? 'bg-amber-500/15 border-amber-500 text-white'
                              : 'bg-white/[0.03] border-white/10 text-zinc-300'
                          }`}
                        >
                          <div className="font-semibold text-sm">
                            Home or Office Quotation
                          </div>
                          <div className="text-xs text-zinc-400 mt-1">
                            Our estimator comes to your home or workplace
                          </div>
                        </button>
                      </div>

                      <label className="flex items-center gap-3 p-3.5 rounded-xl bg-white/[0.03] border border-white/10 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={needsPickup}
                          onChange={(e) => setNeedsPickup(e.target.checked)}
                          className="w-4 h-4 accent-sky-500 rounded"
                        />
                        <span className="text-xs sm:text-sm text-zinc-300">
                          I’d also like to request{' '}
                          <strong className="text-white">
                            Home / Office Pick-Up &amp; Drop-Off Service
                          </strong>
                        </span>
                      </label>
                    </div>
                  </motion.div>
                )}

                {/* STEP 4: Contact Details */}
                {step === 4 && (
                  <motion.div
                    key="step4"
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -16 }}
                    className="space-y-5"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs text-zinc-400 mb-1.5">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="Your Name & Surname"
                          className="w-full px-4 py-3 rounded-xl bg-[#12141e] border border-white/15 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-sky-400"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-zinc-400 mb-1.5">
                          Cell / WhatsApp Number *
                        </label>
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="e.g. 082 123 4567"
                          className="w-full px-4 py-3 rounded-xl bg-[#12141e] border border-white/15 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-sky-400"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-zinc-400 mb-1.5">
                          Email Address (Optional)
                        </label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="you@example.co.za"
                          className="w-full px-4 py-3 rounded-xl bg-[#12141e] border border-white/15 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-sky-400"
                        />
                      </div>
                    </div>

                    <label className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/10 cursor-pointer">
                      <input
                        type="checkbox"
                        required
                        checked={popiaAccepted}
                        onChange={(e) => setPopiaAccepted(e.target.checked)}
                        className="w-4 h-4 mt-0.5 accent-sky-500 rounded shrink-0"
                      />
                      <span className="text-xs text-zinc-400 leading-relaxed">
                        I agree that by submitting my details, I acknowledge and
                        accept the Protection of Personal Information Act (POPIA)
                        privacy notice of Florida Panelbeaters (Pty) Ltd.
                      </span>
                    </label>
                  </motion.div>
                )}

                {/* Navigation Footer */}
                <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between gap-4">
                  <button
                    type="button"
                    disabled={step === 1}
                    onClick={() => setStep((s) => Math.max(1, s - 1))}
                    className="inline-flex items-center gap-1.5 px-5 py-3 rounded-full bg-white/5 hover:bg-white/10 disabled:opacity-30 text-sm font-medium text-zinc-200 transition-colors cursor-pointer disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>

                  {step < 4 ? (
                    <button
                      type="button"
                      disabled={!canProceed()}
                      onClick={() => setStep((s) => Math.min(4, s + 1))}
                      className="inline-flex items-center gap-1.5 px-7 py-3 rounded-full bg-sky-500 hover:bg-sky-400 disabled:opacity-40 text-sm font-semibold text-white shadow-lg shadow-sky-500/25 transition-all cursor-pointer disabled:cursor-not-allowed"
                    >
                      <span>Continue</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={!canProceed()}
                      className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-400 hover:to-cyan-400 disabled:opacity-40 text-sm font-bold text-white shadow-xl shadow-sky-500/30 transition-all cursor-pointer disabled:cursor-not-allowed"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Confirm Booking</span>
                    </button>
                  )}
                </div>
              </form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
