export const BUSINESS = {
  name: 'Florida Panel Beaters',
  legalName: 'Florida Panelbeaters (Pty) Ltd',
  regNumber: '2017/336304/07',
  founded: 1968,
  phone: '011 674 1618',
  phoneHref: 'tel:+27116741618',
  emergencyPhone: '084 503 6324',
  emergencyHref: 'tel:+27845036324',
  whatsappNumber: '27845036324',
  whatsappDisplay: '084 503 6324',
  email: 'nicky@floridapanelbeaters.co.za',
  address: '30A Hull Street, Florida, Roodepoort, Gauteng, 1709',
  postalAddress: 'PO Box 2985, Wilropark, 1731',
  googleMapsUrl:
    'https://www.google.com/maps/place/Florida+Panel+Beaters/@-26.1753883,27.9089255,1057m/data=!3m1!1e3!4m8!3m7!1s0x1e95a064fcd0f897:0x40f8df3fbd1973c7!8m2!3d-26.1753883!4d27.9115004!9m1!1b1!16s%2Fg%2F1tdv9pd0',
  hours: [
    { day: 'Monday – Friday', time: '07:30 – 17:00' },
    { day: 'Saturday – Sunday', time: 'Closed (Workshop)' },
    { day: 'Emergency Towing', time: '24 Hours / 7 Days' },
  ],
  owners: [
    {
      name: 'Nicolette Tibbetts',
      role: 'Owner & Management — 100% Black Female Owned',
      bio: 'Leads Florida Panelbeaters as a Level 1 B-BBEE Contributor (135% recognition level) since March 2020, championing transparent customer care and Lightstone-tracked service excellence.',
    },
    {
      name: 'Marlon Tibbetts',
      role: 'Owner & Technical Management',
      bio: 'Qualified spraypainter since 1986 (John Morrison Panelbeaters), internationally trained in Germany, 17 years running the paint shop at Barwell & Barwell Motors, and founder of Tibby’s Workshop (2009).',
    },
  ],
};

export const OEM_ACCREDITATIONS = [
  'Toyota',
  'Ford',
  'Mazda',
  'Honda',
  'Hyundai',
  'Kia',
  'Mahindra',
  'GWM',
  'Haval',
  'Opel',
  'Chevrolet',
];

export const OEM_BRAND_LOGOS: { name: string; logo: string }[] = [
  { name: 'Toyota', logo: '/logos/toyota.png' },
  { name: 'Ford', logo: '/logos/ford.jpg' },
  { name: 'Mazda', logo: '/logos/mazda.png' },
  { name: 'Honda', logo: '/logos/honda.jpg' },
  { name: 'Hyundai', logo: '/logos/hyundai.png' },
  { name: 'Kia', logo: '/logos/kia.png' },
  { name: 'Mahindra', logo: '/logos/mahindra.png' },
  { name: 'GWM', logo: '/logos/gwm.jpg' },
  { name: 'Haval', logo: '/logos/haval.png' },
  { name: 'Opel', logo: '/logos/opel.jpg' },
  { name: 'Chevrolet', logo: '/logos/chevrolet.jpg' },
];

export const CERTIFICATIONS: { code: string; label: string; logo?: string }[] = [
  { code: 'SAMBRA / RMI', label: 'Structural Repairer', logo: '/logos/sambra-rmi.jpg' },
  { code: 'AA Approved', label: 'Quality & Roadworthy', logo: '/logos/aa.jpg' },
  { code: 'Bureau Veritas', label: 'Audited Facility', logo: '/logos/bureau-veritas.jpg' },
  { code: 'SAARSA', label: 'Repairer Standards', logo: '/logos/saarsa.jpg' },
  { code: 'CRA', label: 'Collision Repair Assoc.', logo: '/logos/cra.png' },
  { code: 'Level 1 B-BBEE', label: '135% Recognition' },
  { code: 'Standox Agent', label: 'Lifetime Paint Warranty' },
  { code: 'MIBCO & CSD', label: 'Registered & Compliant' },
];

export const INSURANCE_BRAND_LOGOS: { name: string; logo: string }[] = [
  { name: 'Santam', logo: '/logos/santam.png' },
  { name: 'Old Mutual Insure', logo: '/logos/old-mutual.png' },
  { name: 'Hollard', logo: '/logos/hollard.png' },
  { name: 'Mutual & Federal', logo: '/logos/mutual-federal.png' },
  { name: 'Renasa Insurance', logo: '/logos/renasa.jpg' },
  { name: 'Standard Bank', logo: '/logos/standard-bank.jpg' },
  { name: 'Absa Insurance', logo: '/logos/absa.png' },
];

export const INSURANCE_PARTNERS = [
  'Santam',
  'Old Mutual Insure',
  'Hollard',
  'Absa Insurance',
  'Standard Bank Fleet',
  'Mutual & Federal (One Sure)',
  'Renasa',
  'Bryte Insurance',
  'Alexander Forbes',
  'Regent Insurance',
  'AIG',
  'GuardRisk',
  'Prime Meridian Direct (PMD)',
  'Safire Insurance',
  'Western National',
  'Zurich',
  'Eqstra',
  'Brolink',
  'Marsh',
  'Digicall',
  'Excess Sure',
  'AMH Insurance',
  'SAPS JHB Garage',
];

export interface ServiceItem {
  id: string;
  title: string;
  category: 'collision' | 'mechanical' | 'fitment';
  shortDesc: string;
  badge?: string;
  highlights: string[];
}

// Balanced 9-card grid (3 Collision + 3 Mechanical + 3 Fitment) -> zero orphan empty spaces on any filter!
export const SERVICES: ServiceItem[] = [
  {
    id: 'panel-beating',
    title: 'Panel Beating & Chassis Straightening',
    category: 'collision',
    badge: '36-Month Guarantee',
    shortDesc:
      'OEM-approved structural collision repairs and laser-accurate chassis bench straightening restoring exact factory tolerances.',
    highlights: [
      'All major insurers & 11 OEMs approved',
      'Sub-millimetre chassis realignment',
      'Digital quotation & assessment centre',
    ],
  },
  {
    id: 'spray-painting',
    title: 'Standox Spray Painting & Refinishing',
    category: 'collision',
    badge: 'Lifetime Warranty',
    shortDesc:
      'Computerised colour matching and German-trained paint booth finishing using premium Standox automotive coatings.',
    highlights: [
      'Lifetime warranty on all paintwork',
      '12-month rust perforation cover',
      'Touch-up paint mixed on request',
    ],
  },
  {
    id: 'pdr-towing',
    title: 'Paintless Dent Removal & 24h Towing',
    category: 'collision',
    badge: '24/7 Emergency',
    shortDesc:
      'Zero-repaint hail & door-ding removal plus round-the-clock roadside accident recovery straight to our Hull Street workshop.',
    highlights: [
      'Preserves original factory paint',
      '24-hour emergency tow: 084 503 6324',
      'Direct insurer claim coordination',
    ],
  },
  {
    id: 'mechanical',
    title: 'Mechanical Repairs & Vehicle Services',
    category: 'mechanical',
    shortDesc:
      'Complete mechanical diagnostics, routine vehicle servicing, exhaust repairs, and post-accident mechanical restoration.',
    highlights: [
      'All passenger & light commercial makes',
      'Willard & Sabat battery agent',
      'Exhaust repair & replacement',
    ],
  },
  {
    id: 'auto-electrical',
    title: 'Auto Electrical, Airbag & Aircon',
    category: 'mechanical',
    shortDesc:
      'Full automotive electrical diagnostics, post-collision airbag sensor & ECU/CPU resetting, and airconditioning servicing.',
    highlights: [
      'Airbag & CPU sensor resetting',
      'Automotive aircon regas & repair',
      'Computerised fault-code diagnostics',
    ],
  },
  {
    id: 'glass-wheels',
    title: 'Windscreens, Alignment & Mag Repairs',
    category: 'mechanical',
    shortDesc:
      'Automotive glass replacement, precision wheel alignment, tyre balancing, and mag wheel refurbishment or replacement.',
    highlights: [
      'Official A-Line Mag Wheels agent',
      'Wheel alignment, tyres & balancing',
      'Windscreen & automotive glass fitment',
    ],
  },
  {
    id: 'fitment-4x4',
    title: '4×4 Equipment & Rubberising',
    category: 'fitment',
    badge: '4×4 Specialists',
    shortDesc:
      'Premium off-road fitment and bakkie protection featuring trusted brands including Ironman, OL, EFS, and ONCA.',
    highlights: [
      'Ironman, OL, EFS & ONCA accessories',
      'Heavy-duty bin rubberising',
      'Sign writing, wrapping & customising',
    ],
  },
  {
    id: 'security-protection',
    title: 'Vehicle Security, PPS & Traceter',
    category: 'fitment',
    shortDesc:
      'Approved fitment centre for PPS (Vehicle Protection System), Traceter tracking, alarms, immobilizers, and locksmithing.',
    highlights: [
      'Traceter fitment centre',
      'PPS Vehicle Protection System',
      'Alarms, immobilizers & locksmithing',
    ],
  },
  {
    id: 'valet-roadworthy',
    title: 'AA Roadworthy, Valet & Upholstery',
    category: 'fitment',
    shortDesc:
      'On-site AA roadworthy assessments, glazing & high-sheen buffing, full valet & car wash, upholstery, and number plates.',
    highlights: [
      'AA Roadworthy & assessment centre',
      'Glazing, buffing & number plates',
      'Upholstery repair & interior protection',
    ],
  },
];

export const EXTRA_MILE_PERKS = [
  {
    title: '36-Month Bodywork Guarantee',
    desc: 'Every structural and panel repair is backed by our 3-year workmanship warranty.',
    metric: '36 MO',
  },
  {
    title: 'Lifetime Paint Warranty',
    desc: 'Official Standox agent delivering factory-grade gloss backed for life.',
    metric: 'LIFE',
  },
  {
    title: 'Home or Office Quotations',
    desc: 'Can’t make it to Hull Street? We bring digital assessments to your doorstep.',
    metric: 'MOBILE',
  },
  {
    title: 'Pick-Up & Drop-Off Service',
    desc: 'Convenient home or office collection and delivery available on request.',
    metric: 'DOOR',
  },
  {
    title: 'Live SMS Job Status Updates',
    desc: 'Automated SMS progress updates at every stage + Lightstone CSI tracking.',
    metric: 'LIVE',
  },
  {
    title: 'Interior Protection & Free Wi-Fi',
    desc: 'Upholstery sealed in protective sheeting throughout repair; free Wi-Fi in our lounge.',
    metric: 'CARE',
  },
];

export interface CertificateDoc {
  id: string;
  title: string;
  brand: string;
  category: 'compliance' | 'oem';
  description: string;
  pdfUrl: string;
  logo?: string;
}

export const CERTIFICATE_DOCUMENTS: CertificateDoc[] = [
  {
    id: 'bbbee',
    title: 'Level 1 B-BBEE Certificate',
    brand: 'B-BBEE Compliance',
    category: 'compliance',
    description:
      'Official Broad-Based Black Economic Empowerment certificate — 100% Black Female Owned, Level 1 Contributor (135% Procurement Recognition).',
    pdfUrl: '/documents/bbbee-certificate.pdf',
  },
  {
    id: 'toyota-oem',
    title: 'Toyota OEM Approval Certificate',
    brand: 'Toyota',
    category: 'oem',
    description: 'Approved Collision Repairer certification for Toyota vehicles.',
    pdfUrl: '/documents/toyota-oem.pdf',
    logo: '/logos/toyota.png',
  },
  {
    id: 'ford-oem',
    title: 'Ford National Body Shop Network Certificate',
    brand: 'Ford',
    category: 'oem',
    description: 'Ford Certified National Body Shop Network approval.',
    pdfUrl: '/documents/ford-oem.pdf',
    logo: '/logos/ford.jpg',
  },
  {
    id: 'gwm-oem',
    title: 'GWM OEM Approval Certificate',
    brand: 'GWM',
    category: 'oem',
    description: 'Factory-approved structural and body repairer for GWM.',
    pdfUrl: '/documents/gwm-oem.pdf',
    logo: '/logos/gwm.jpg',
  },
  {
    id: 'haval-oem',
    title: 'Haval OEM Approval Certificate',
    brand: 'Haval',
    category: 'oem',
    description: 'Official Haval approved collision repair facility certificate.',
    pdfUrl: '/documents/haval-oem.pdf',
    logo: '/logos/haval.png',
  },
  {
    id: 'hyundai-oem',
    title: 'Hyundai OEM Approval Certificate',
    brand: 'Hyundai',
    category: 'oem',
    description: 'Hyundai structural approved repairer certification.',
    pdfUrl: '/documents/hyundai-oem.pdf',
    logo: '/logos/hyundai.png',
  },
  {
    id: 'kia-oem',
    title: 'Kia Motors OEM Approval Certificate',
    brand: 'Kia',
    category: 'oem',
    description: 'Kia Motors approved collision repairer certification.',
    pdfUrl: '/documents/kia-oem.pdf',
    logo: '/logos/kia.png',
  },
  {
    id: 'mazda-oem',
    title: 'Mazda Recommended Autobody Repairer',
    brand: 'Mazda',
    category: 'oem',
    description: 'Official Mazda recommended autobody repairer certificate.',
    pdfUrl: '/documents/mazda-oem.pdf',
    logo: '/logos/mazda.png',
  },
  {
    id: 'honda-oem',
    title: 'Honda Approved Body & Paint Shop',
    brand: 'Honda',
    category: 'oem',
    description: 'Honda approved body and paint repair centre certificate.',
    pdfUrl: '/documents/honda-oem.pdf',
    logo: '/logos/honda.jpg',
  },
  {
    id: 'chevrolet-oem',
    title: 'Chevrolet OEM Approval Certificate',
    brand: 'Chevrolet',
    category: 'oem',
    description: 'Official Chevrolet approved collision repairer certificate.',
    pdfUrl: '/documents/chevrolet-oem.pdf',
    logo: '/logos/chevrolet.jpg',
  },
  {
    id: 'opel-oem',
    title: 'Opel OEM Approval Certificate',
    brand: 'Opel',
    category: 'oem',
    description: 'Official Opel approved collision repairer certificate.',
    pdfUrl: '/documents/opel-oem.pdf',
    logo: '/logos/opel.jpg',
  },
];

export interface Testimonial {
  id: string;
  author: string;
  rating: number;
  date: string;
  source: 'Google Maps' | 'Panel Beaters Directory';
  verified: boolean;
  text: string;
}

// Real positive testimonials extracted from Google Maps (signed-out public view) & Panel Beaters Directory
export const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: 'gm-1',
    author: 'Reon Yssel',
    rating: 5,
    date: '4 weeks ago',
    source: 'Google Maps',
    verified: true,
    text: 'Exceptional 5-Star Service! From the very first phone call to collecting our fully repaired vehicle, the level of service at Florida Panelbeaters was top-tier. A special thank you to Bertha, who was absolutely amazing during our initial assessment appointment. Throughout the entire process, communication was seamless with clear, regular updates so we always knew what was happening. To top it off, the owner personally inspected our vehicle before signing it off and handing it back to us. Highly recommended!',
  },
  {
    id: 'gm-2',
    author: 'Mpho Tsotetsi',
    rating: 5,
    date: '2 years ago',
    source: 'Google Maps',
    verified: true,
    text: 'I had a problem with my car and someone referred me to this place, from the minute I arrived till I left, the guys were helpful and professional. Excellent service through and through.',
  },
  {
    id: 'gm-3',
    author: 'Nicholas Choonilall',
    rating: 5,
    date: '1 year ago',
    source: 'Google Maps',
    verified: true,
    text: 'Friendly staff, great service — definitely will recommend you swing by.',
  },
  {
    id: 'gm-4',
    author: 'Thando Masondo',
    rating: 4,
    date: '2 years ago',
    source: 'Google Maps',
    verified: true,
    text: "They have good service, I'd say people should come to this place — they are the best.",
  },
  {
    id: 'pbd-1',
    author: 'Mzito Nkosi',
    rating: 5,
    date: '16 Feb 2026',
    source: 'Panel Beaters Directory',
    verified: true,
    text: 'Their work is great and the turnaround time was also good.',
  },
  {
    id: 'pbd-2',
    author: 'Nicholas Kyle Choonilall',
    rating: 5,
    date: '12 Mar 2025',
    source: 'Panel Beaters Directory',
    verified: true,
    text: 'Great, seamless, price and service on point.',
  },
];
