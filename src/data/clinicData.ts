export const CLINIC_INFO = {
  doctorName: 'Dr. Somodyuti Chandra',
  bengaliName: 'দ্র সমদ্যুতি চন্দ্র',
  professionalTitle: 'Best Dermatologist in Kolkata',
  specialization: 'Dermatologist',
  rating: '4.8',
  reviewCount: 44,
  clinicName: 'Wizderm Speciality Skin and Hair Clinic',
  address:
    '1, Wizderm Speciality Skin and Hair Clinic, 503, 1, Gariahat Road South, Selimpur, Jodhpur Park, Kolkata, West Bengal – 700045, India.',
  shortAddress:
    '503, 1, Gariahat Road South, Selimpur, Jodhpur Park, Kolkata, West Bengal – 700045',
  locationShort: 'Jodhpur Park, Kolkata',
  plusCode: 'G937+7Q Kolkata, West Bengal',
  phoneDisplay: '094331 69186',
  phoneHref: 'tel:+919433169186',
  whatsappHref:
    'https://wa.me/919433169186?text=Hello%2C%20I%20would%20like%20to%20request%20a%20dermatology%20consultation%20appointment%20with%20Dr.%20Somodyuti%20Chandra%20at%20Wizderm%20Speciality%20Skin%20and%20Hair%20Clinic.',
  mapsDirectionsHref:
    'https://www.google.com/maps/search/?api=1&query=Wizderm+Speciality+Skin+and+Hair+Clinic+503+Gariahat+Road+South+Jodhpur+Park+Kolkata+700045',
  mapsEmbedSrc:
    'https://maps.google.com/maps?q=G937%2B7Q%20Kolkata%2C%20West%20Bengal&t=&z=16&ie=UTF8&iwloc=&output=embed',
  timingsNote: 'Please contact the clinic to confirm consultation timings.',
};

export const IMAGES = {
  doctorPrimary:
    'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9QTdOzoACjtmpeFeAlH8UxW5GXenZQib4Z-MF4NUXKUK0sIlDAqOqdFI5RhvkBTrWAMkVwehkvCpOmsEof-V3SCO82gGVXhK0nYxh0KoH4Y4t-Aek4SdaYzkJcNa7XRSCkMGdBF5DtRV8Q9=w224-h298-k-no',
  doctorSecondary:
    'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9Tls-gFDvkOxrmf-aRNa59BkH38OfMrrQTI0pHGLNY6pib3BPbSGLmEdOkQrHmngqutFZaTxxOHyUSXtRxEshk4GdnSUx67UitiozuIFUndOMPAi1zAZbegMimdeRD5J6RPIxid7_d5VpaN=w203-h135-k-no',
  heroClinic: '/src/assets/images/hero_dermatology_clinic_1794794099783.jpg',
  consultationOverview: '/src/assets/images/consultation_overview_1794794100842.jpg',
  hairCare: '/src/assets/images/treatment_hair_care_1794794100968.jpg',
  skinCare: '/src/assets/images/treatment_skin_care_1794794100999.jpg',
  clinicInterior: '/src/assets/images/clinic_interior_jodhpur_1794794102735.jpg',
};

export interface NavItem {
  label: string;
  href: string;
}

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '#home' },
  { label: 'About Doctor', href: '#meet-doctor' },
  { label: 'Treatments', href: '#treatments' },
  { label: 'Why Choose Us', href: '#why-choose' },
  { label: 'Patient Reviews', href: '#reviews' },
  { label: 'FAQs', href: '#faqs' },
  { label: 'Contact', href: '#contact-location' },
];

export interface TreatmentCategory {
  id: string;
  title: string;
  concernValue: string;
  description: string;
  image: string;
  focusLabel: string;
}

export const TREATMENT_CATEGORIES: TreatmentCategory[] = [
  {
    id: 'hair-fall',
    title: 'Hair Fall & Hair Loss Consultation',
    concernValue: 'Hair Fall & Hair Loss Consultation',
    description:
      'Thorough evaluation of excessive shedding, thinning patterns, and scalp health to plan individualized medical hair care.',
    image: IMAGES.hairCare,
    focusLabel: 'Hair & Trichology',
  },
  {
    id: 'acne-scars',
    title: 'Acne & Acne Scar Consultation',
    concernValue: 'Acne & Acne Scar Consultation',
    description:
      'Clinical assessment of active breakouts, post-acne marks, and textural scarring with structured dermatological guidance.',
    image: IMAGES.skinCare,
    focusLabel: 'Acne Care',
  },
  {
    id: 'pigmentation',
    title: 'Pigmentation & Melasma Consultation',
    concernValue: 'Pigmentation & Melasma Consultation',
    description:
      'Focused dermatological review for uneven skin tone, dark patches, sun-induced spots, and recurring facial pigmentation.',
    image: IMAGES.consultationOverview,
    focusLabel: 'Tone & Clarity',
  },
  {
    id: 'skin-rejuvenation',
    title: 'Skin Rejuvenation',
    concernValue: 'Skin Rejuvenation',
    description:
      'Personalized skin wellness consultations aimed at supporting barrier repair, hydration balance, and healthy skin vitality.',
    image: IMAGES.heroClinic,
    focusLabel: 'Skin Vitality',
  },
  {
    id: 'scalp-health',
    title: 'Scalp & Hair Health',
    concernValue: 'Scalp & Hair Health',
    description:
      'Diagnostic attention for dandruff, scalp sensitivity, oiliness, and weakened hair roots tailored to your daily routine.',
    image: IMAGES.hairCare,
    focusLabel: 'Scalp Wellness',
  },
  {
    id: 'general-skin',
    title: 'General Skin Care Consultation',
    concernValue: 'General Skin Care Consultation',
    description:
      'Comprehensive dermatology appointments for everyday skin concerns, allergies, dryness, and long-term preventive routines.',
    image: IMAGES.clinicInterior,
    focusLabel: 'Clinical Dermatology',
  },
];

export interface WhyChooseItem {
  number: string;
  title: string;
  description: string;
  iconName: 'user-check' | 'heart' | 'sparkles' | 'clipboard' | 'stethoscope' | 'map-pin';
}

export const WHY_CHOOSE_ITEMS: WhyChooseItem[] = [
  {
    number: '01',
    title: 'Personalized Dermatological Consultation',
    description:
      'Every consultation begins with attentive listening to your medical history, lifestyle, and specific skin or hair goals.',
    iconName: 'user-check',
  },
  {
    number: '02',
    title: 'Patient-Focused Care',
    description:
      'Compassionate one-on-one consultations where your questions and comfort remain central at every step.',
    iconName: 'heart',
  },
  {
    number: '03',
    title: 'Skin and Hair Health Guidance',
    description:
      'Clear, practical advice covering daily skin care, scalp hygiene, and sustainable habits suited to Kolkata’s climate.',
    iconName: 'sparkles',
  },
  {
    number: '04',
    title: 'Individualized Treatment Planning',
    description:
      'Tailored care regimens designed around your specific skin type, scalp condition, and tolerance—never one-size-fits-all.',
    iconName: 'clipboard',
  },
  {
    number: '05',
    title: 'Professional Medical Attention',
    description:
      'Clinical evaluation by Dr. Somodyuti Chandra with a measured, evidence-informed approach to dermatology.',
    iconName: 'stethoscope',
  },
  {
    number: '06',
    title: 'Convenient Clinic Location',
    description:
      'Easily accessible at Wizderm Speciality Skin and Hair Clinic in Jodhpur Park, Gariahat Road South, Kolkata.',
    iconName: 'map-pin',
  },
];

export interface CommonConcern {
  id: string;
  title: string;
  summary: string;
  details: string;
  image: string;
}

export const COMMON_CONCERNS: CommonConcern[] = [
  {
    id: 'hair-thinning',
    title: 'Hair Fall and Hair Thinning',
    summary:
      'Increased hair shedding on your pillow or brush, widening hair parts, and gradual reduction in hair volume.',
    details:
      'Hair fall can stem from nutritional gaps, stress, seasonal humidity, hormonal shifts, or pattern thinning. An early dermatologist consultation helps identify contributing triggers and establish a structured care plan.',
    image: IMAGES.hairCare,
  },
  {
    id: 'acne-scars',
    title: 'Acne and Acne Scars',
    summary:
      'Recurring whiteheads, inflammatory breakouts, post-inflammatory dark marks, and uneven skin indentations.',
    details:
      'Addressing acne promptly under dermatological supervision helps calm active inflammation and reduces the likelihood of lingering marks or textural changes.',
    image: IMAGES.skinCare,
  },
  {
    id: 'pigmentation',
    title: 'Pigmentation',
    summary:
      'Localized dark patches, sun spots, or stubborn facial pigmentation that deepens with UV exposure.',
    details:
      'Pigmentation varies by depth and cause. Dr. Somodyuti Chandra evaluates skin tone patterns carefully to recommend gentle, steady pigment-management routines and sun protection.',
    image: IMAGES.consultationOverview,
  },
  {
    id: 'uneven-tone',
    title: 'Uneven Skin Tone',
    summary:
      'Dullness, patchy tanning, and complexion imbalance caused by daily environmental exposure and barrier stress.',
    details:
      'Restoring an even, healthy-looking complexion starts with rebuilding the skin barrier and tailoring daily topical care to your skin sensitivity.',
    image: IMAGES.skinCare,
  },
  {
    id: 'scalp-concerns',
    title: 'Scalp-Related Concerns',
    summary:
      'Persistent dandruff, itchy or flaky scalp, excessive oiliness, and scalp discomfort affecting hair quality.',
    details:
      'Healthy hair growth depends on a balanced scalp environment. Targeted scalp evaluation addresses flaking, irritation, and buildup safely.',
    image: IMAGES.hairCare,
  },
  {
    id: 'other-skin',
    title: 'Other Common Skin Conditions',
    summary:
      'Dryness, eczema-prone patches, sensitivity reactions, rashes, and everyday dermatological concerns.',
    details:
      'Timely clinical assessment ensures accurate identification of common skin conditions without guesswork or harsh over-the-counter experimentation.',
    image: IMAGES.clinicInterior,
  },
];

export interface ConsultationStep {
  step: string;
  title: string;
  description: string;
}

export const CONSULTATION_STEPS: ConsultationStep[] = [
  {
    step: '01',
    title: 'Initial Dermatologist Consultation',
    description:
      'Discuss your concerns, timeline, lifestyle factors, and prior skin or hair care routines in a calm, attentive setting.',
  },
  {
    step: '02',
    title: 'Skin or Scalp Assessment',
    description:
      'A careful clinical examination of your skin texture, pigmentation, hair density, or scalp health to understand root contributors.',
  },
  {
    step: '03',
    title: 'Personalized Treatment Planning',
    description:
      'Receive a structured, individualized care plan with clear guidance on daily routines and appropriate clinical next steps.',
  },
  {
    step: '04',
    title: 'Follow-Up and Care Guidance',
    description:
      'Ongoing monitoring and thoughtful adjustments over follow-up visits to support steady skin and hair wellness.',
  },
];

export interface ShowcaseComparison {
  id: string;
  category: string;
  focusArea: string;
  beforeSummary: string;
  afterGoal: string;
  note: string;
}

export const BEFORE_AFTER_SHOWCASE: ShowcaseComparison[] = [
  {
    id: 'hair-density',
    category: 'Hair Fall & Scalp Care',
    focusArea: 'Parting Density & Scalp Balance',
    beforeSummary:
      'Visible hair shedding, fragile strands, and scalp discomfort reported prior to clinical assessment.',
    afterGoal:
      'Structured scalp care and targeted hair health planning focused on strengthening roots and supporting hair volume.',
    note: 'Verified clinical photographs are presented exclusively in-clinic with patient consent.',
  },
  {
    id: 'acne-clarity',
    category: 'Acne & Post-Acne Care',
    focusArea: 'Active Breakouts & Skin Calm',
    beforeSummary:
      'Recurrent congested pores, inflammatory blemishes, and post-acne redness across cheeks and jawline.',
    afterGoal:
      'Consistent dermatologist-guided care aimed at calming breakouts and supporting smoother skin clarity.',
    note: 'Individual skin responses vary; realistic timelines are discussed during consultation.',
  },
  {
    id: 'tone-balance',
    category: 'Pigmentation & Skin Tone',
    focusArea: 'Complexion Evenness & Barrier Health',
    beforeSummary:
      'Patchy facial darkening, sun-aggravated discoloration, and dehydrated surface texture.',
    afterGoal:
      'Gradual tone balancing paired with barrier-supportive hydration and daily sun protection habits.',
    note: 'No illustrative images are substituted for real patient outcomes.',
  },
];

export interface ConditionAddressCard {
  title: string;
  subtitle: string;
  image: string;
  concernValue: string;
}

export const CONDITIONS_ADDRESSED: ConditionAddressCard[] = [
  {
    title: 'Hair Loss',
    subtitle: 'Assessment for sudden or persistent shedding',
    image: IMAGES.hairCare,
    concernValue: 'Hair Fall & Hair Loss Consultation',
  },
  {
    title: 'Male and Female Pattern Hair Thinning',
    subtitle: 'Targeted planning for receding hairlines & widening parts',
    image: IMAGES.consultationOverview,
    concernValue: 'Hair Fall & Hair Loss Consultation',
  },
  {
    title: 'Acne',
    subtitle: 'Clinical care for teen and adult breakouts',
    image: IMAGES.skinCare,
    concernValue: 'Acne & Acne Scar Consultation',
  },
  {
    title: 'Acne Scarring',
    subtitle: 'Evaluation of post-acne marks & uneven texture',
    image: IMAGES.heroClinic,
    concernValue: 'Acne & Acne Scar Consultation',
  },
  {
    title: 'Pigmentation',
    subtitle: 'Structured support for dark patches & melasma',
    image: IMAGES.consultationOverview,
    concernValue: 'Pigmentation & Melasma Consultation',
  },
  {
    title: 'Skin Texture Concerns',
    subtitle: 'Guidance for roughness, pores & barrier care',
    image: IMAGES.skinCare,
    concernValue: 'Skin Rejuvenation',
  },
  {
    title: 'Scalp Conditions',
    subtitle: 'Care for dandruff, flaking & scalp sensitivity',
    image: IMAGES.clinicInterior,
    concernValue: 'Scalp & Hair Health',
  },
];

export interface GoogleReviewExcerpt {
  id: string;
  quote: string;
  sourceLabel: string;
}

export const GOOGLE_REVIEWS: GoogleReviewExcerpt[] = [
  {
    id: 'review-1',
    quote: 'Solved my long standing hair and skin problems.',
    sourceLabel: 'Verified Google Review Excerpt',
  },
  {
    id: 'review-2',
    quote: 'She is very comfortable with answering queries/concerns.',
    sourceLabel: 'Verified Google Review Excerpt',
  },
  {
    id: 'review-3',
    quote: 'Highly recommend to anyone looking for a skilled and compassionate doctor!',
    sourceLabel: 'Verified Google Review Excerpt',
  },
];

export interface FaqItem {
  question: string;
  answer: string;
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'What skin conditions can a dermatologist help with?',
    answer:
      'A dermatologist evaluates and helps manage a wide spectrum of concerns including acne, post-acne marks, pigmentation and melasma, uneven skin tone, dryness, skin allergies, scalp flaking, and hair thinning. During your consultation, Dr. Somodyuti Chandra assesses your specific symptoms to recommend an appropriate medical care plan.',
  },
  {
    question: 'What causes excessive hair fall?',
    answer:
      'Excessive hair fall can be linked to multiple factors such as genetics, hormonal fluctuations, nutritional deficiencies, physical or emotional stress, scalp conditions, or environmental factors. Because causes often overlap, an in-person dermatological evaluation helps pinpoint what may be contributing to your hair shedding.',
  },
  {
    question: 'When should I consult a dermatologist?',
    answer:
      'Consider scheduling a consultation if you notice persistent hair shedding lasting more than a few weeks, widening hair parts, recurring acne that leaves marks, spreading pigmentation patches, or ongoing scalp discomfort. Early clinical assessment helps prevent concerns from becoming harder to manage.',
  },
  {
    question: 'Can acne scars and pigmentation be treated?',
    answer:
      'Yes, acne marks, textural scars, and pigmentation concerns can be evaluated and managed under dermatological guidance. Suitability and expected progress depend on scar depth, skin type, and consistency with care and sun protection, which Dr. Somodyuti Chandra discusses transparently during your appointment.',
  },
  {
    question: 'How can I maintain healthy skin?',
    answer:
      'Healthy skin relies on gentle cleansing, consistent barrier-supporting moisturization, daily broad-spectrum sun protection, and avoiding harsh unverified products. A personalized consultation helps simplify your routine around what your skin genuinely needs.',
  },
  {
    question: 'How can I book an appointment?',
    answer:
      'You can submit an appointment request directly through the booking form on this page or call the clinic at 094331 69186. Consultation timings are confirmed by the clinic desk upon receiving your request.',
  },
  {
    question: 'Where is Wizderm Speciality Skin and Hair Clinic located?',
    answer:
      'Wizderm Speciality Skin and Hair Clinic is located at 503, 1, Gariahat Road South, Selimpur, Jodhpur Park, Kolkata, West Bengal – 700045 (Google Maps Plus Code: G937+7Q Kolkata, West Bengal).',
  },
];
