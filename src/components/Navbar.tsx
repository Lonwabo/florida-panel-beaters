import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Calendar, Menu, X } from 'lucide-react';
import { BUSINESS } from '../data/businessData';

interface NavbarProps {
  onOpenBooking: () => void;
}

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Certificates', to: '/certificates' },
  { label: 'Save-A-Car', to: '/save-a-car' },
  { label: 'Reviews', to: '/reviews' },
  { label: 'Contact', to: '/contact' },
];

export function Navbar({ onOpenBooking }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#070a12]/92 backdrop-blur-xl border-b border-white/10 py-3 shadow-2xl shadow-black/50'
          : 'bg-[#070a12]/75 backdrop-blur-md border-b border-white/5 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        {/* Official FPB Logo */}
        <Link to="/" className="flex items-center gap-3 group shrink-0">
          <img
            src="/fpb-logo.png"
            alt="Florida Panel Beaters Logo"
            className="h-10 sm:h-11 w-auto object-contain brightness-0 invert opacity-95 group-hover:opacity-100 transition-opacity"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-5 xl:gap-7">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors whitespace-nowrap relative pb-1 ${
                  isActive
                    ? 'text-sky-400 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-sky-400'
                    : 'text-zinc-300 hover:text-white after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-sky-400 hover:after:w-full after:transition-all'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-2.5 shrink-0">
          <a
            href={BUSINESS.emergencyHref}
            className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium text-zinc-200 transition-colors whitespace-nowrap"
            title="24-Hour Emergency Towing"
          >
            <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
            <Phone className="w-3.5 h-3.5 text-sky-400" />
            <span>24h Tow: {BUSINESS.emergencyPhone}</span>
          </a>
          <button
            onClick={onOpenBooking}
            className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-400 hover:to-cyan-400 text-slate-950 text-sm font-bold shadow-lg shadow-sky-500/25 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer whitespace-nowrap"
          >
            <Calendar className="w-4 h-4" />
            <span>Book Assessment</span>
          </button>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileOpen((v) => !v)}
          className="lg:hidden p-2 rounded-lg bg-white/5 border border-white/10 text-zinc-200 hover:text-white"
          aria-label="Toggle Menu"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#0b0f19]/98 backdrop-blur-xl border-b border-white/10 overflow-hidden"
          >
            <div className="px-4 py-5 space-y-2">
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === '/'}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `block py-2.5 px-3.5 rounded-xl font-medium transition-colors ${
                      isActive
                        ? 'bg-sky-500/15 text-sky-300 border border-sky-400/30'
                        : 'text-zinc-200 hover:bg-white/5 hover:text-white'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
              <div className="pt-3 border-t border-white/10 flex flex-col gap-2.5">
                <a
                  href={BUSINESS.phoneHref}
                  className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/5 text-zinc-200 text-sm font-medium"
                >
                  <Phone className="w-4 h-4 text-sky-400" />
                  Workshop: {BUSINESS.phone}
                </a>
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    onOpenBooking();
                  }}
                  className="flex items-center justify-center gap-2 py-3 rounded-xl bg-sky-500 text-slate-950 text-sm font-bold"
                >
                  <Calendar className="w-4 h-4" />
                  Book Assessment Online
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
