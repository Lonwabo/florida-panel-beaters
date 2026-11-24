import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bot,
  X,
  Send,
  Sparkles,
  Calendar,
  MessageCircle,
  Phone,
} from 'lucide-react';
import {
  BUSINESS,
  INSURANCE_PARTNERS,
  OEM_ACCREDITATIONS,
} from '../data/businessData';

interface AIBotWidgetProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onJumpToBooking: (service?: string) => void;
}

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  action?: {
    label: string;
    type: 'booking' | 'whatsapp' | 'call';
    service?: string;
  };
}

const QUICK_PROMPTS = [
  'Check my car brand (OEM)',
  'Which insurers do you work with?',
  'Save-A-Car (No insurance)',
  'What warranties do you offer?',
  '24h Emergency Towing',
  'Book an assessment',
];

function generateBotReply(input: string): Omit<ChatMessage, 'id' | 'sender'> {
  const q = input.toLowerCase();

  // Check specific OEM brand mentioned
  const matchedOem = OEM_ACCREDITATIONS.find((b) => q.includes(b.toLowerCase()));
  if (matchedOem) {
    return {
      text: `Great news! Florida Panel Beaters is an OEM-approved repairer for ${matchedOem}. Your factory warranty and structural standards remain fully protected, backed by our 36-month bodywork guarantee and lifetime Standox paint warranty.`,
      action: {
        label: `Book ${matchedOem} Assessment`,
        type: 'booking',
        service: 'Collision Repair / Insurance Claim',
      },
    };
  }

  // Check specific insurer mentioned
  const matchedInsurer = INSURANCE_PARTNERS.find((ins) =>
    q.includes(ins.toLowerCase().split(' ')[0])
  );
  if (matchedInsurer) {
    return {
      text: `Yes! We are an approved repairer for ${matchedInsurer}. We handle digital quotations, on-site assessments, and direct insurer communication—plus live SMS progress updates while your car is in our workshop.`,
      action: {
        label: 'Book Insurance Assessment',
        type: 'booking',
        service: 'Collision Repair / Insurance Claim',
      },
    };
  }

  if (q.includes('oem') || q.includes('brand') || q.includes('manufacturer')) {
    return {
      text: `We hold OEM manufacturer approvals for 11 major brands: ${OEM_ACCREDITATIONS.join(', ')}. We also service and repair all other makes with SAMBRA/RMI-accredited workmanship. What car do you drive?`,
      action: {
        label: 'Book Vehicle Assessment',
        type: 'booking',
      },
    };
  }

  if (
    q.includes('save') ||
    q.includes('uninsured') ||
    q.includes('no insurance') ||
    q.includes('cheap') ||
    q.includes('used part') ||
    q.includes('budget')
  ) {
    return {
      text: `Our Save-A-Car programme is built specifically for uninsured drivers or insurance shortfalls! We can source vetted quality used parts on non-safety-critical areas to significantly reduce repair costs without compromising reliability.`,
      action: {
        label: 'Request Save-A-Car Quote',
        type: 'booking',
        service: 'Save-A-Car (Cost-Effective Repair)',
      },
    };
  }

  if (q.includes('insur') || q.includes('claim')) {
    return {
      text: `We work with South Africa’s top insurers including Santam, Old Mutual Insure, Hollard, Bryte, Alexander Forbes, Renasa, Regent, AIG, GuardRisk, Standard Bank Fleet, PMD, Safire, Zurich, and more.`,
      action: {
        label: 'Start Insurance Booking',
        type: 'booking',
        service: 'Collision Repair / Insurance Claim',
      },
    };
  }

  if (q.includes('hail') || q.includes('dent') || q.includes('pdr')) {
    return {
      text: `We specialize in Paintless Dent Removal (PDR) for hail damage and shopping-centre door dings—no repainting needed! Our technicians restore the metal contour and buff your car to maximum shine.`,
      action: {
        label: 'Book Free PDR Check',
        type: 'booking',
        service: 'Paintless Dent Removal (PDR)',
      },
    };
  }

  if (q.includes('tow') || q.includes('accident') || q.includes('emergency')) {
    return {
      text: `Our 24-Hour Emergency Towing line is standing by right now on ${BUSINESS.emergencyPhone}. We’ll safely recover your vehicle straight to our 30A Hull Street assessment centre.`,
      action: {
        label: `Call 24h Towing (${BUSINESS.emergencyPhone})`,
        type: 'call',
      },
    };
  }

  if (q.includes('warrant') || q.includes('guarant') || q.includes('paint') || q.includes('standox')) {
    return {
      text: `Every repair at Florida Panel Beaters comes with industry-leading cover:\n• 36-Month Guarantee on all bodywork\n• Lifetime Warranty on Standox paintwork\n• 12-Month Warranty on rust perforation`,
      action: {
        label: 'Book an Assessment',
        type: 'booking',
      },
    };
  }

  if (q.includes('book') || q.includes('quote') || q.includes('estimate') || q.includes('price') || q.includes('cost')) {
    return {
      text: `I can get you booked in under 60 seconds! You can visit our 30A Hull Street assessment centre or request a mobile quote at your home or office—or send damage photos straight to our WhatsApp estimator.`,
      action: {
        label: 'Open Online Booking',
        type: 'booking',
      },
    };
  }

  if (q.includes('where') || q.includes('address') || q.includes('hour') || q.includes('open') || q.includes('location')) {
    return {
      text: `We are located at ${BUSINESS.address}.\nHours: Mon–Fri 07:30–17:00 (Closed Sat–Sun), and 24/7 Emergency Towing on ${BUSINESS.emergencyPhone}. We also offer Home/Office Pick-Up & Drop-Off!`,
      action: {
        label: 'Chat on WhatsApp',
        type: 'whatsapp',
      },
    };
  }

  if (q.includes('bee') || q.includes('owner') || q.includes('about') || q.includes('history')) {
    return {
      text: `Founded in 1968, Florida Panelbeaters is 100% Black Female Owned by Nicolette Tibbetts (Level 1 B-BBEE • 135% recognition) with German-trained paint shop leadership by Marlon Tibbetts. We are SAMBRA/RMI, AA, Bureau Veritas & Automx audited.`,
    };
  }

  return {
    text: `Thanks for reaching out! I can help you check OEM & insurance approvals, explain our Save-A-Car uninsured options, give warranty details, arrange 24/7 towing, or book an assessment. Would you like to book online or chat directly on WhatsApp?`,
    action: {
      label: 'Send Photos on WhatsApp',
      type: 'whatsapp',
    },
  };
}

export function AIBotWidget({
  isOpen,
  setIsOpen,
  onJumpToBooking,
}: AIBotWidgetProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'bot',
      text: `Hi! I’m Florida Auto AI — your 24/7 virtual estimator for Florida Panel Beaters (Est. 1968). Ask me about OEM approvals, insurance claims, Save-A-Car quotes, warranties, or tap below to book!`,
    },
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, typing, isOpen]);

  const sendMessage = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: trimmed,
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setTyping(true);

    setTimeout(() => {
      const reply = generateBotReply(trimmed);
      setMessages((prev) => [
        ...prev,
        { id: `b-${Date.now()}`, sender: 'bot', ...reply },
      ]);
      setTyping(false);
    }, 520);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.94 }}
            transition={{ duration: 0.22 }}
            className="mb-3 w-[calc(100vw-2.5rem)] sm:w-[390px] h-[540px] max-h-[78vh] rounded-3xl bg-[#0d1018] border border-white/15 shadow-2xl shadow-black/70 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="px-5 py-4 bg-gradient-to-r from-sky-700 via-sky-600 to-cyan-700 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-white/15 backdrop-blur flex items-center justify-center text-white">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-sm font-bold text-white leading-none">
                      Florida Auto AI
                    </h3>
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  </div>
                  <span className="text-[11px] text-sky-100 flex items-center gap-1.5 mt-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />
                    Online • Instant Repair Assistant
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg bg-black/20 hover:bg-black/35 text-white transition-colors cursor-pointer"
                aria-label="Close AI Assistant"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-[#090b11]"
            >
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${
                    msg.sender === 'user' ? 'items-end' : 'items-start'
                  }`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs sm:text-sm leading-relaxed whitespace-pre-line ${
                      msg.sender === 'user'
                        ? 'bg-sky-500 text-white rounded-br-sm'
                        : 'bg-white/[0.06] border border-white/10 text-zinc-200 rounded-bl-sm'
                    }`}
                  >
                    {msg.text}
                  </div>

                  {msg.action && (
                    <div className="mt-2">
                      {msg.action.type === 'booking' && (
                        <button
                          onClick={() => {
                            setIsOpen(false);
                            onJumpToBooking(msg.action?.service);
                          }}
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-sky-500 hover:bg-sky-400 text-white text-xs font-semibold transition-colors cursor-pointer"
                        >
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{msg.action.label}</span>
                        </button>
                      )}
                      {msg.action.type === 'whatsapp' && (
                        <a
                          href={`https://wa.me/${BUSINESS.whatsappNumber}?text=${encodeURIComponent(
                            'Hi Florida Panel Beaters! I was chatting with your website AI assistant and would like help with a quote.'
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#25D366] hover:bg-[#1ebe5d] text-black text-xs font-bold transition-colors"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>{msg.action.label}</span>
                        </a>
                      )}
                      {msg.action.type === 'call' && (
                        <a
                          href={BUSINESS.emergencyHref}
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold transition-colors"
                        >
                          <Phone className="w-3.5 h-3.5" />
                          <span>{msg.action.label}</span>
                        </a>
                      )}
                    </div>
                  )}
                </div>
              ))}

              {typing && (
                <div className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-2xl bg-white/[0.05] w-fit">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-bounce" />
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-bounce"
                    style={{ animationDelay: '0.15s' }}
                  />
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-bounce"
                    style={{ animationDelay: '0.3s' }}
                  />
                </div>
              )}
            </div>

            {/* Quick Reply Chips */}
            <div className="px-3 py-2 bg-[#0c0e15] border-t border-white/10 flex gap-1.5 overflow-x-auto">
              {QUICK_PROMPTS.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => sendMessage(prompt)}
                  className="shrink-0 px-3 py-1.5 rounded-full bg-white/5 hover:bg-sky-500/25 border border-white/10 hover:border-sky-400/40 text-[11px] text-zinc-300 hover:text-white transition-colors cursor-pointer"
                >
                  {prompt}
                </button>
              ))}
            </div>

            {/* Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage(input);
              }}
              className="p-3 bg-[#0d1018] border-t border-white/10 flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about your car, insurer, or quote..."
                className="flex-1 px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs sm:text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-sky-400"
              />
              <button
                type="submit"
                className="p-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-white transition-colors cursor-pointer"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.96 }}
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center gap-2.5 px-5 py-3.5 rounded-full bg-gradient-to-r from-sky-500 to-cyan-500 text-white font-semibold text-sm shadow-2xl shadow-sky-500/40 border border-sky-400/30 cursor-pointer"
      >
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-amber-400 animate-ping" />
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-amber-400" />
        {isOpen ? (
          <X className="w-5 h-5" />
        ) : (
          <Bot className="w-5 h-5" />
        )}
        <span className="hidden sm:inline">
          {isOpen ? 'Close AI' : 'Ask Florida Auto AI'}
        </span>
      </motion.button>
    </div>
  );
}
