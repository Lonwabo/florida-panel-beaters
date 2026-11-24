import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  MessageCircle,
  AlertTriangle,
  ExternalLink,
} from 'lucide-react';
import { BUSINESS } from '../data/businessData';

const SUBJECTS = [
  'General Information',
  'Request a Repair Quote',
  'Where in the repair process is my car?',
  'Save-A-Car (Uninsured / Used Parts)',
  'Types of Repair Services Available',
  'Need More Feedback / Register a Complaint',
];

export function ContactSection() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState(SUBJECTS[0]);
  const [message, setMessage] = useState('');
  const [preferredContact, setPreferredContact] = useState<
    'Phone Call' | 'Email' | 'WhatsApp'
  >('WhatsApp');
  const [popia, setPopia] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !popia) return;
    setSubmitted(true);
  };

  const buildWhatsAppDirectUrl = () => {
    const text = name.trim() || message.trim()
      ? `Hi Florida Panel Beaters!${name ? ` My name is ${name}.` : ''}\nSubject: ${subject}${phone ? `\nPhone: ${phone}` : ''}${message ? `\nMessage: ${message}` : ''}`
      : `Hi Florida Panel Beaters! I would like to enquire about a vehicle repair / quotation.`;
    return `https://wa.me/${BUSINESS.whatsappNumber}?text=${encodeURIComponent(text)}`;
  };

  return (
    <section id="contact" className="relative py-24 bg-[#07080c]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mb-12">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-400 mb-3">
            Get In Touch
          </p>
          <h2
            className="text-3xl sm:text-5xl font-bold text-white tracking-tight"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Contact <span className="text-gradient-accent">Our Workshop</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Contact Form + WhatsApp Option Directly Under Form */}
          <div className="lg:col-span-7 space-y-5">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/10"
            >
              {submitted ? (
                <div className="py-10 text-center">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-7 h-7 text-emerald-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Message Received!
                  </h3>
                  <p className="text-sm text-zinc-400 max-w-md mx-auto mb-6">
                    Thanks, <strong className="text-white">{name}</strong>. Our
                    customer care team will respond via{' '}
                    <strong className="text-sky-400">{preferredContact}</strong>{' '}
                    shortly.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setMessage('');
                    }}
                    className="px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/15 text-sm font-medium text-white transition-colors cursor-pointer"
                  >
                    Send Another Enquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-zinc-400 mb-1.5">
                        Name &amp; Surname *
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Thabo Mokoena"
                        className="w-full px-4 py-3 rounded-xl bg-[#12141e] border border-white/15 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-sky-400"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-zinc-400 mb-1.5">
                        Contact Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="e.g. 082 555 1234"
                        className="w-full px-4 py-3 rounded-xl bg-[#12141e] border border-white/15 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-sky-400"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-zinc-400 mb-1.5">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.co.za"
                        className="w-full px-4 py-3 rounded-xl bg-[#12141e] border border-white/15 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-sky-400"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-zinc-400 mb-1.5">
                        Subject
                      </label>
                      <select
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-[#12141e] border border-white/15 text-sm text-white focus:outline-none focus:border-sky-400"
                      >
                        {SUBJECTS.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-zinc-400 mb-1.5">
                      Message
                    </label>
                    <textarea
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Tell us about your vehicle, repair query, or claim status..."
                      className="w-full px-4 py-3 rounded-xl bg-[#12141e] border border-white/15 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-sky-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-zinc-400 mb-2">
                      How would you like us to contact you?
                    </label>
                    <div className="flex flex-wrap gap-2.5">
                      {(['WhatsApp', 'Phone Call', 'Email'] as const).map(
                        (method) => (
                          <button
                            key={method}
                            type="button"
                            onClick={() => setPreferredContact(method)}
                            className={`px-4 py-2 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                              preferredContact === method
                                ? method === 'WhatsApp'
                                  ? 'bg-[#25D366]/20 border-[#25D366] text-[#25D366]'
                                  : 'bg-sky-500/20 border-sky-400 text-white'
                                : 'bg-white/[0.03] border-white/10 text-zinc-400'
                            }`}
                          >
                            {method}
                          </button>
                        )
                      )}
                    </div>
                  </div>

                  <label className="flex items-start gap-2.5 pt-2 cursor-pointer">
                    <input
                      type="checkbox"
                      required
                      checked={popia}
                      onChange={(e) => setPopia(e.target.checked)}
                      className="w-4 h-4 mt-0.5 accent-sky-500 rounded shrink-0"
                    />
                    <span className="text-xs text-zinc-400 leading-relaxed">
                      I acknowledge and accept the Protection of Personal
                      Information (POPI) disclaimer on the Florida Panelbeaters
                      (Pty) Ltd website. *
                    </span>
                  </label>

                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-400 hover:to-cyan-400 text-white font-semibold text-sm shadow-lg shadow-sky-500/25 transition-all cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Enquiry</span>
                  </button>
                </form>
              )}
            </motion.div>

            {/* DEDICATED WHATSAPP OPTION DIRECTLY UNDER THE CONTACT FORM */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-3xl p-6 border border-[#25D366]/35 bg-gradient-to-r from-[#25D366]/15 via-[#0e1c15] to-[#0a0c12] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#25D366] text-black flex items-center justify-center shrink-0 shadow-lg shadow-[#25D366]/25">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div>
                  <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#25D366] mb-1">
                    <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
                    Prefer WhatsApp? Instant Quote &amp; Photos
                  </div>
                  <h3 className="text-lg font-bold text-white">
                    Chat Directly on WhatsApp ({BUSINESS.whatsappDisplay})
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-300 mt-1">
                    Send damage photos straight from your phone for faster
                    estimates, repair updates, or 24-hour emergency towing.
                  </p>
                </div>
              </div>

              <a
                href={buildWhatsAppDirectUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto shrink-0 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#25D366] hover:bg-[#1ebe5d] text-black font-bold text-sm shadow-xl shadow-[#25D366]/25 transition-all hover:scale-[1.02]"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </a>
            </motion.div>
          </div>

          {/* Right Column: Info Cards + Interactive Map */}
          <div className="lg:col-span-5 space-y-5">
            {/* Emergency Towing Banner */}
            <div className="rounded-2xl p-5 bg-sky-500/15 border border-sky-400/35 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-sky-500 flex items-center justify-center text-white shrink-0">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-sky-300">
                    24-Hour Emergency Towing
                  </div>
                  <div className="text-lg font-extrabold text-white">
                    {BUSINESS.emergencyPhone}
                  </div>
                </div>
              </div>
              <a
                href={BUSINESS.emergencyHref}
                className="px-4 py-2 rounded-full bg-sky-500 hover:bg-sky-400 text-white text-xs font-bold transition-colors"
              >
                Call Now
              </a>
            </div>

            {/* Contact Details Card */}
            <div className="glass-panel rounded-3xl p-6 space-y-5 border border-white/10">
              <div className="flex items-start gap-3.5">
                <Phone className="w-5 h-5 text-sky-400 mt-0.5 shrink-0" />
                <div>
                  <div className="text-xs text-zinc-400">Customer Care</div>
                  <a
                    href={BUSINESS.phoneHref}
                    className="text-base font-bold text-white hover:text-sky-400 transition-colors"
                  >
                    {BUSINESS.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <Mail className="w-5 h-5 text-sky-400 mt-0.5 shrink-0" />
                <div>
                  <div className="text-xs text-zinc-400">Email</div>
                  <a
                    href={`mailto:${BUSINESS.email}`}
                    className="text-sm sm:text-base font-semibold text-white hover:text-sky-400 transition-colors break-all"
                  >
                    {BUSINESS.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <MapPin className="w-5 h-5 text-sky-400 mt-0.5 shrink-0" />
                <div>
                  <div className="text-xs text-zinc-400">Physical Address</div>
                  <p className="text-sm font-medium text-white">
                    {BUSINESS.address}
                  </p>
                  <p className="text-xs text-zinc-500 mt-0.5">
                    Postal: {BUSINESS.postalAddress}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 pt-3 border-t border-white/10">
                <Clock className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
                <div className="w-full space-y-1.5">
                  <div className="text-xs text-zinc-400">Operating Hours</div>
                  {BUSINESS.hours.map((h) => (
                    <div
                      key={h.day}
                      className="flex items-center justify-between text-xs sm:text-sm"
                    >
                      <span className="text-zinc-300">{h.day}</span>
                      <span className="text-white font-medium">{h.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Storefront Preview Card */}
            <div className="glass-panel rounded-3xl overflow-hidden border border-white/10">
              <div className="relative aspect-[16/8] overflow-hidden bg-slate-900">
                <img
                  src="/workshop/storefront.jpg"
                  alt="Florida Panel Beaters Storefront at 30A Hull Street"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c0e15] via-transparent to-transparent" />
                <span className="absolute bottom-3 left-4 text-xs font-semibold text-white bg-black/65 backdrop-blur px-3 py-1 rounded-full border border-white/15">
                  30A Hull Street • Dedicated Assessors Parking
                </span>
              </div>
            </div>

            {/* Embedded Google Map */}
            <div className="glass-panel rounded-3xl overflow-hidden border border-white/10">
              <iframe
                title="Florida Panel Beaters Location Map"
                src="https://www.google.com/maps?q=-26.1753883,27.9115004&z=16&output=embed"
                className="w-full h-56 border-0 brightness-90 contrast-105"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="p-3.5 flex items-center justify-between bg-[#0c0e15]">
                <span className="text-xs text-zinc-400">
                  30A Hull Street, Florida, Roodepoort
                </span>
                <a
                  href={BUSINESS.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-sky-400 hover:text-sky-300"
                >
                  <span>Open in Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
