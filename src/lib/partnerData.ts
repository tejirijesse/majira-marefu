// Majira Marefu — institutional (B2B) data layer.
// Segments, capabilities, partnership phases, case studies, brief fields.

export type SegmentKey = 'corporate' | 'government' | 'institution';

export interface Segment {
  key: SegmentKey;
  label: string;
  short: string;
  intro: string;
  typicalBuyers: string[];
  formats: { title: string; detail: string }[];
  scale: string;
  leadTime: string;
  pricingNote: string;
}

export const SEGMENTS: Record<SegmentKey, Segment> = {
  corporate: {
    key: 'corporate',
    label: 'Corporations & firms',
    short: 'Leadership off-sites, annual gatherings, portfolio retreats.',
    intro:
      'Private seasons for executive teams, partnerships, and portfolio companies. We host firms who have outgrown the ordinary retreat — who want a month of considered time together, not three days of panels.',
    typicalBuyers: [
      'Private-equity and venture firms hosting portfolio CEO retreats',
      'Law and strategy consultancies running annual partner off-sites',
      'Family offices and multi-generational investment platforms',
      'Founding teams preparing for a board reset or a succession',
    ],
    formats: [
      {
        title: 'Private buyout',
        detail: 'The full season reserved for your organisation. Forty guests, five weeks, no outside travellers. Custom content throughout.',
      },
      {
        title: 'Reserved week',
        detail: 'A seven or twelve-night block inside the public season — your team kept together, with one or two shared dinners by mutual invitation.',
      },
      {
        title: 'Executive arc',
        detail: 'A Safari journey (eighteen nights) built around a specific objective — succession, merger integration, strategy reset.',
      },
    ],
    scale: 'Typical parties of 10–40. Private buyouts accommodate up to 80.',
    leadTime: 'Six months for reserved weeks. Twelve months for private buyouts.',
    pricingNote: 'From USD 140,000 for a reserved week of sixteen. Private buyouts from USD 1.6M.',
  },
  government: {
    key: 'government',
    label: 'Governments & delegations',
    short: 'Cultural diplomacy, trade missions, diaspora programmes.',
    intro:
      'Private seasons commissioned by sovereign bodies, ministries, and diplomatic missions. We operate with full protocol awareness, vetted logistics, and a security posture reviewed annually with counterparts at the Kenya Tourism Board and the Tanzania Ministry of Natural Resources and Tourism.',
    typicalBuyers: [
      'Ministries of culture and tourism hosting bilateral delegations',
      'Trade offices running investor-familiarisation visits',
      'Diaspora-engagement programmes for pan-African governments',
      'Embassy-led cultural exchange and heritage tours',
    ],
    formats: [
      {
        title: 'State-level delegation',
        detail: 'Up to twenty principals plus staff. Full-protocol hosting, bilateral meetings coordinated on request, single point of government liaison.',
      },
      {
        title: 'Trade-mission arc',
        detail: 'Twelve or eighteen nights combining the coast and the grasslands with targeted investor and operator meetings along the way.',
      },
      {
        title: 'Diaspora cohort',
        detail: 'A twenty-night programme for a returning-diaspora cohort — cultural, historical, and civic — with alumni access to the full guest network.',
      },
    ],
    scale: 'Typical parties of 12–30. State-level delegations up to 60 principals and staff.',
    leadTime: 'Nine to eighteen months. Fast-track windows available for confirmed ministerial travel.',
    pricingNote: 'Priced per engagement. Indicative range: USD 220K – 1.2M depending on format and duration.',
  },
  institution: {
    key: 'institution',
    label: 'Institutions & foundations',
    short: 'Universities, foundations, NGOs, arts and research bodies.',
    intro:
      'Private seasons for universities running executive education, foundations convening grantees, research institutes on sabbatical, and arts organisations on commission. We design content with your academic or programme lead — not around them.',
    typicalBuyers: [
      'Executive-education programmes (African Leadership, Oxford, INSEAD) running cohort retreats',
      'Global foundations hosting board retreats or grantee convenings',
      'Research institutes running cross-disciplinary field weeks',
      'Arts foundations commissioning residencies along the coast',
    ],
    formats: [
      {
        title: 'Academic cohort',
        detail: 'Twelve to twenty-four participants, twelve to thirty nights, content co-designed with your faculty. Private writer in residence for the Marefu arc.',
      },
      {
        title: 'Foundation board retreat',
        detail: 'Eight to twenty trustees and staff for seven to fourteen nights. Confidential setting, full NDA on all hands.',
      },
      {
        title: 'Residency & field',
        detail: 'A fourteen to thirty-night residency for artists, researchers, or writers, anchored in Lamu or Zanzibar with field access across the region.',
      },
    ],
    scale: 'Typical parties of 8–24. Specialised cohorts up to 40.',
    leadTime: 'Six to twelve months. Academic calendars honoured.',
    pricingNote: 'Institutional rates: USD 95K – 520K depending on format. Sponsorship-eligible for accredited grantees.',
  },
};

// ——— How a season gets built ———
export interface Phase {
  n: string;
  title: string;
  duration: string;
  detail: string;
}

export const PARTNER_TIMELINE: Phase[] = [
  {
    n: '01',
    title: 'Confidential brief',
    duration: 'Week 1',
    detail:
      'You share a short brief — objective, cohort, dates, sensitivities. We return within five working days with a draft engagement memo and an indicative quote. NDAs in either direction on request.',
  },
  {
    n: '02',
    title: 'Discovery call',
    duration: 'Week 2–3',
    detail:
      'Sixty minutes with our director and the relevant regional lead. We bring questions, not pitches. If the fit is not right, we tell you then.',
  },
  {
    n: '03',
    title: 'Site visit (optional)',
    duration: 'Week 3–8',
    detail:
      'A two- or three-night familiarisation for your programme lead, hosted at our cost if the engagement proceeds. Government and institutional protocols honoured.',
  },
  {
    n: '04',
    title: 'Engagement memo & contract',
    duration: 'Week 4–10',
    detail:
      'A written scope — every surface, every hand, every line item. Contract reviewed by your counsel on your timeline. We do not rush this part.',
  },
  {
    n: '05',
    title: 'Content co-design',
    duration: 'Month 2–4 before arrival',
    detail:
      'A sequence of working sessions with your programme lead to place content — speakers, readings, interventions — inside the arc without disturbing its shape.',
  },
  {
    n: '06',
    title: 'Delivery',
    duration: 'Across the season',
    detail:
      'A dedicated liaison travels with your cohort for the full engagement. Daily debriefs, a private communication channel, and a single on-property decision-maker at every location.',
  },
  {
    n: '07',
    title: 'Debrief & archive',
    duration: 'Two weeks after',
    detail:
      'A confidential written debrief and, by agreement, an impact summary suitable for grantor or stakeholder reporting. Our archive remains closed unless you choose to open it.',
  },
];

// ——— Capabilities ———
export interface Capability {
  category: string;
  items: string[];
}

export const CAPABILITIES: Capability[] = [
  {
    category: 'Operational',
    items: [
      'Single-point concierge and on-property liaison across every location',
      'Private charter aviation between Nairobi, the Mara, Lamu, and Zanzibar',
      'Dedicated security posture briefing, reviewed annually',
      'On-property medical, with evacuation cover via AMREF Flying Doctors',
      'Dietary, religious, and access requirements honoured without negotiation',
    ],
  },
  {
    category: 'Legal & compliance',
    items: [
      'Mutual NDA available at brief stage; strict on-arrival NDA for staff and hands',
      'KYC and sanctions screening for all commissioning parties',
      'Full procurement-ready invoicing, multi-currency (USD, EUR, GBP, KES, TZS)',
      'Standard-form master services agreement; bespoke review on request',
      'GDPR-aligned data handling; right-to-erasure on close of engagement',
    ],
  },
  {
    category: 'Content & co-design',
    items: [
      'Programme co-design with your faculty, policy team, or chief of staff',
      'Private writer, translator, or academic in residence (Fraunces, Swahili, Mandarin available)',
      'Confidential facilitation for succession, merger, or strategy resets',
      'Historical, cultural, and conservation-content curation',
      'Closed recording and archival at your discretion',
    ],
  },
  {
    category: 'Impact & reporting',
    items: [
      'Written debrief within two weeks of departure',
      'Impact summary suitable for grantor or stakeholder reporting',
      'Conservancy-fee pass-through documentation',
      'Supplier-distribution report — how spend reached local operators',
      'Optional post-season cohort follow-up, at six and twelve months',
    ],
  },
];

// ——— Case studies (fictional but positioned realistically) ———
export interface CaseStudy {
  slug: string;
  org: string;
  orgType: string;
  quote: string;
  attribution: string;
  summary: string;
  metrics: { label: string; value: string }[];
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: 'foundation-board',
    org: 'A pan-African foundation',
    orgType: 'Institution · Board retreat',
    quote:
      "Our trustees needed time, not content. Majira built a fortnight that let our strategy reset happen without anyone realising it was being facilitated.",
    attribution: 'Chief of Staff, on behalf of the chair',
    summary:
      'Fourteen nights, twelve trustees and two staff, full confidentiality. A quiet house in Shela, three working sessions over the full fortnight, and a closing dinner that produced the board resolution the chair had been trying to pass for two years.',
    metrics: [
      { label: 'Duration', value: '14 nights' },
      { label: 'Cohort', value: '12 trustees · 2 staff' },
      { label: 'Outcome', value: '3-year strategy adopted unanimously' },
    ],
  },
  {
    slug: 'pe-portfolio',
    org: 'A European private-equity firm',
    orgType: 'Corporate · Portfolio CEO retreat',
    quote:
      "We had run this retreat in five different cities over seven years. Nothing came close. The CEOs stopped performing by day three. That was the whole point.",
    attribution: 'Managing Partner',
    summary:
      'Eighteen nights across the full Safari arc for twenty-two portfolio-company CEOs. Co-designed with the firm\'s head of operations; one board-level speaker brought in for a single fireside at the coast. Two portfolio-wide commitments came out of the journey.',
    metrics: [
      { label: 'Duration', value: '18 nights' },
      { label: 'Cohort', value: '22 CEOs' },
      { label: 'Re-booking', value: 'Committed for 2028' },
    ],
  },
  {
    slug: 'diaspora-cohort',
    org: 'A sovereign diaspora programme',
    orgType: 'Government · Cultural engagement',
    quote:
      "We have run returning-diaspora programmes in four countries. This was the first one that felt like a homecoming rather than a tour.",
    attribution: 'Director, Diaspora Engagement',
    summary:
      'Twenty-four nights for thirty-two first-generation diaspora professionals returning to the region for the first time. Historical and civic content co-designed with the ministry; full protocol and diplomatic security liaison. Closed under Chatham House; public summary issued by the ministry.',
    metrics: [
      { label: 'Duration', value: '24 nights' },
      { label: 'Cohort', value: '32 professionals' },
      { label: 'Outcome', value: '11 committed to return-investment' },
    ],
  },
];

// ——— Trust signals ———
export const OPERATING_PARTNERS: string[] = [
  'Maasai Mara Wildlife Conservancies Association',
  'Kenya Tourism Board',
  'Tanzania Tourism Board',
  'Lamu County',
  'AMREF Flying Doctors',
  'Ecotourism Kenya',
  'Pan-African Travel Association',
  'African Wildlife Foundation',
];

// ——— Brief form fields ———
export interface BriefField {
  key: string;
  type: 'text' | 'email' | 'tel' | 'textarea' | 'select';
  prompt: string;
  hint?: string;
  placeholder?: string;
  required?: boolean;
  options?: { value: string; label: string }[];
  showIf?: (values: Record<string, string>) => boolean;
  rows?: number;
}

export const BRIEF_STEPS: { title: string; fields: BriefField[] }[] = [
  {
    title: 'Who is asking',
    fields: [
      { key: 'org', type: 'text', prompt: 'Organisation name', required: true },
      {
        key: 'org_type',
        type: 'select',
        prompt: 'Organisation type',
        required: true,
        options: [
          { value: '', label: 'Select one' },
          { value: 'corporate', label: 'Corporation or professional firm' },
          { value: 'pe_vc', label: 'Private equity / venture capital' },
          { value: 'family_office', label: 'Family office' },
          { value: 'government', label: 'Government body or ministry' },
          { value: 'diplomatic', label: 'Diplomatic mission or embassy' },
          { value: 'university', label: 'University or research institute' },
          { value: 'foundation', label: 'Foundation or grant-making body' },
          { value: 'ngo', label: 'NGO or non-profit' },
          { value: 'arts', label: 'Arts or cultural institution' },
          { value: 'other', label: 'Other — explain in the final step' },
        ],
      },
      { key: 'contact_name', type: 'text', prompt: 'Your name', required: true },
      { key: 'contact_role', type: 'text', prompt: 'Your role', required: true },
      { key: 'contact_email', type: 'email', prompt: 'Email', required: true },
      { key: 'contact_phone', type: 'tel', prompt: 'Phone (optional)' },
    ],
  },
  {
    title: 'What you are planning',
    fields: [
      {
        key: 'objective',
        type: 'textarea',
        prompt: 'What are you trying to achieve?',
        hint: 'Two sentences is plenty. We can read between them.',
        required: true,
        rows: 4,
      },
      {
        key: 'format',
        type: 'select',
        prompt: 'Preferred format',
        options: [
          { value: '', label: 'Still open' },
          { value: 'private_buyout', label: 'Private buyout — full season exclusively' },
          { value: 'reserved_week', label: 'Reserved week inside a public season' },
          { value: 'bespoke', label: 'Bespoke — longer or shorter' },
          { value: 'not_sure', label: 'Not sure yet — advise us' },
        ],
      },
      {
        key: 'party_size',
        type: 'select',
        prompt: 'Party size',
        options: [
          { value: '', label: 'Select a range' },
          { value: '6-12', label: '6–12' },
          { value: '13-20', label: '13–20' },
          { value: '21-40', label: '21–40' },
          { value: '41-80', label: '41–80' },
          { value: '80+', label: '80+' },
        ],
      },
      {
        key: 'dates',
        type: 'text',
        prompt: 'Target dates (approximate is fine)',
        placeholder: 'August 2027, or a three-month window',
      },
    ],
  },
  {
    title: 'Confidentiality & procurement',
    fields: [
      {
        key: 'confidentiality',
        type: 'select',
        prompt: 'Confidentiality requirement',
        required: true,
        options: [
          { value: '', label: 'Select one' },
          { value: 'standard', label: 'Standard — our usual NDA on all hands' },
          { value: 'nda_mutual', label: 'Mutual NDA required before further detail' },
          { value: 'chatham', label: 'Chatham House — no attribution, no archival' },
          { value: 'full', label: 'Full — nothing in writing publicly, ever' },
        ],
      },
      {
        key: 'procurement',
        type: 'textarea',
        prompt: 'Procurement notes (optional)',
        hint: 'Vendor registration, multi-currency needs, staged payment, tax treatment.',
        rows: 3,
      },
      {
        key: 'budget_band',
        type: 'select',
        prompt: 'Indicative budget band',
        hint: 'We do not use this to gate the brief — only to shape the response usefully.',
        options: [
          { value: '', label: 'Not specified' },
          { value: 'u250', label: 'Under USD 250,000' },
          { value: '250-500', label: 'USD 250K – 500K' },
          { value: '500-1m', label: 'USD 500K – 1M' },
          { value: '1m-2m', label: 'USD 1M – 2M' },
          { value: '2m+', label: 'USD 2M and above' },
        ],
      },
    ],
  },
  {
    title: 'Anything we should know',
    fields: [
      {
        key: 'anything_else',
        type: 'textarea',
        prompt: 'Anything else we should know?',
        hint: 'Sensitivities, preferences, existing operators, constraints. We read every word.',
        rows: 6,
      },
    ],
  },
];
