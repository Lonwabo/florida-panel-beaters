import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react';
import { BUSINESS } from '../data/businessData';

export function Footer() {
  return (
    <footer className="bg-[#05070d] border-t border-white/10 pt-14 pb-10 text-zinc-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          {/* Brand with official logo */}
          <div className="space-y-4">
            <Link to="/">
              <img
                src="/fpb-logo.png"
                alt="Florida Panel Beaters Logo"
                className="h-10 w-auto object-contain brightness-0 invert opacity-95"
              />
            </Link>
            <p className="text-xs leading-relaxed text-zinc-400">
              {BUSINESS.legalName} — Est. 1968. 100% Black Female Owned (Level 1
              B-BBEE • 135%), SAMBRA/RMI &amp; OEM approved collision repair
              centre in Florida, Roodepoort.
            </p>
            <p className="text-[11px] text-zinc-500">
              Reg No: {BUSINESS.regNumber} • POPIA Compliant
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-4">
              Pages
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/" className="hover:text-sky-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-sky-400 transition-colors">
                  About Us &amp; Guarantees
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-sky-400 transition-colors">
                  Services &amp; PDR
                </Link>
              </li>
              <li>
                <Link to="/certificates" className="hover:text-sky-400 transition-colors">
                  Certificates &amp; OEM Approvals (PDF)
                </Link>
              </li>
              <li>
                <Link to="/save-a-car" className="hover:text-sky-400 transition-colors">
                  Save-A-Car (Uninsured Repairs)
                </Link>
              </li>
              <li>
                <Link to="/reviews" className="hover:text-sky-400 transition-colors">
                  Reviews &amp; Rate Our Service
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-sky-400 transition-colors">
                  Contact &amp; WhatsApp
                </Link>
              </li>
              <li>
                <Link to="/booking" className="hover:text-sky-400 transition-colors">
                  Online Assessment Booking
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-4">
              Workshop Contact
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-sky-400" />
                <a href={BUSINESS.phoneHref} className="hover:text-white">
                  {BUSINESS.phone} (Customer Care)
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                <a
                  href={`https://wa.me/${BUSINESS.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white"
                >
                  {BUSINESS.emergencyPhone} (24h Tow / WhatsApp)
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-sky-400" />
                <a href={`mailto:${BUSINESS.email}`} className="hover:text-white">
                  {BUSINESS.email}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-sky-400 mt-0.5 shrink-0" />
                <span>{BUSINESS.address}</span>
              </li>
            </ul>
          </div>

          {/* Warranties */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-4">
              Our Warranties
            </h4>
            <ul className="space-y-2 text-xs text-zinc-400">
              <li>• 36-Month Guarantee on all bodywork</li>
              <li>• Lifetime Warranty on Standox paintwork</li>
              <li>• 12-Month Warranty on rust perforation</li>
              <li>• Bureau Veritas &amp; Automx Audited</li>
              <li>• Lightstone Customer Satisfaction Tracked</li>
            </ul>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <p>
            © {new Date().getFullYear()} {BUSINESS.legalName}. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="#popia"
              onClick={(e) => e.preventDefault()}
              className="hover:text-sky-400 transition-colors"
            >
              POPIA
            </a>
            <span className="text-zinc-700">|</span>
            <a
              href="#paia"
              onClick={(e) => e.preventDefault()}
              className="hover:text-sky-400 transition-colors"
            >
              PAIA
            </a>
          </div>
          <p>
            30A Hull Street, Florida, Roodepoort, 1709 • Gauteng, South Africa
          </p>
        </div>
      </div>
    </footer>
  );
}
