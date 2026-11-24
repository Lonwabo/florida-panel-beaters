import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText,
  Download,
  Eye,
  ShieldCheck,
  Award,
  X,
  ExternalLink,
} from 'lucide-react';
import {
  CERTIFICATE_DOCUMENTS,
  type CertificateDoc,
} from '../data/businessData';

export function CertificatesPage() {
  const [previewDoc, setPreviewDoc] = useState<CertificateDoc | null>(null);

  const complianceDoc = CERTIFICATE_DOCUMENTS.find(
    (d) => d.category === 'compliance'
  );
  const oemDocs = CERTIFICATE_DOCUMENTS.filter((d) => d.category === 'oem');

  return (
    <div className="pt-28 pb-24 bg-[#07080c] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-10">
          <p className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-sky-400 mb-2.5">
            <ShieldCheck className="w-4 h-4" />
            Verified Official Documentation
          </p>
          <h1 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">
            Certificates &amp;{' '}
            <span className="text-gradient-accent">OEM Approvals</span>
          </h1>
          <p className="mt-3 text-sm sm:text-base text-zinc-400 max-w-2xl">
            View or download Florida Panel Beaters’ official B-BBEE Level 1
            compliance certificate and manufacturer (OEM) collision repair
            approvals.
          </p>
        </div>

        {/* Featured Compliance Document: Level 1 B-BBEE */}
        {complianceDoc && (
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10 rounded-3xl p-6 sm:p-8 border border-amber-500/35 bg-gradient-to-br from-amber-500/12 via-[#101522] to-[#080a10] flex flex-col lg:flex-row lg:items-center justify-between gap-6"
          >
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border border-amber-400/35 flex items-center justify-center text-amber-300 shrink-0">
                <Award className="w-7 h-7" />
              </div>
              <div>
                <span className="inline-block text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 mb-2">
                  Official Compliance Certificate • PDF
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  {complianceDoc.title}
                </h2>
                <p className="text-xs sm:text-sm text-zinc-300 mt-1 max-w-2xl leading-relaxed">
                  {complianceDoc.description}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <button
                onClick={() => setPreviewDoc(complianceDoc)}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-amber-500 hover:bg-amber-400 text-black font-bold text-sm transition-colors cursor-pointer"
              >
                <Eye className="w-4 h-4" />
                <span>Preview PDF</span>
              </button>
              <a
                href={complianceDoc.pdfUrl}
                download
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white/10 hover:bg-white/15 border border-white/15 text-white font-semibold text-sm transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Download</span>
              </a>
            </div>
          </motion.div>
        )}

        {/* Section Heading for OEM Approvals */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            Manufacturer (OEM) Approval Certificates ({oemDocs.length})
          </h2>
          <span className="text-xs text-zinc-400 hidden sm:inline">
            Click Preview to inspect any PDF directly in your browser
          </span>
        </div>

        {/* Balanced 2-Column Grid (10 OEM Certificates = 5 full rows, zero empty gaps) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {oemDocs.map((doc, idx) => (
            <motion.div
              key={doc.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.04 }}
              className="glass-panel glass-panel-hover rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-14 rounded-xl bg-white flex items-center justify-center p-2 shadow-sm shrink-0 overflow-hidden">
                  {doc.logo ? (
                    <img
                      src={doc.logo}
                      alt={`${doc.brand} Logo`}
                      className="max-w-full max-h-full object-contain"
                      loading="lazy"
                    />
                  ) : (
                    <FileText className="w-6 h-6 text-slate-700" />
                  )}
                </div>
                <div>
                  <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-sky-400">
                    <FileText className="w-3 h-3" />
                    PDF Certificate
                  </span>
                  <h3 className="text-base font-bold text-white leading-snug mt-0.5">
                    {doc.title}
                  </h3>
                  <p className="text-xs text-zinc-400 mt-0.5">{doc.description}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0 sm:flex-col md:flex-row">
                <button
                  onClick={() => setPreviewDoc(doc)}
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-sky-500/15 hover:bg-sky-500 text-sky-300 hover:text-slate-950 border border-sky-400/30 text-xs font-bold transition-colors cursor-pointer whitespace-nowrap"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Preview</span>
                </button>
                <a
                  href={doc.pdfUrl}
                  download
                  className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 text-zinc-200 text-xs font-semibold transition-colors whitespace-nowrap"
                  title={`Download ${doc.title}`}
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>PDF</span>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* In-Browser PDF Preview Modal */}
      <AnimatePresence>
        {previewDoc && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPreviewDoc(null)}
            className="fixed inset-0 z-50 bg-black/88 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-5xl h-[86vh] rounded-3xl overflow-hidden bg-[#0c0f18] border border-white/15 shadow-2xl flex flex-col"
            >
              {/* Modal Top Bar */}
              <div className="px-5 py-4 bg-[#101522] border-b border-white/10 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <FileText className="w-5 h-5 text-sky-400 shrink-0" />
                  <h3 className="text-sm sm:text-base font-bold text-white truncate">
                    {previewDoc.title}
                  </h3>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <a
                    href={previewDoc.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-semibold text-white transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Open Tab</span>
                  </a>
                  <a
                    href={previewDoc.pdfUrl}
                    download
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-xs font-bold text-slate-950 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Download</span>
                  </a>
                  <button
                    onClick={() => setPreviewDoc(null)}
                    className="p-2 rounded-xl bg-white/5 hover:bg-white/15 text-zinc-300 hover:text-white cursor-pointer"
                    aria-label="Close PDF preview"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Embedded PDF Frame */}
              <iframe
                title={previewDoc.title}
                src={previewDoc.pdfUrl}
                className="w-full flex-1 bg-zinc-900 border-0"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
