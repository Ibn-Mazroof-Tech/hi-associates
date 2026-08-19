export type GazetteReason =
  | "Marriage"
  | "Divorce"
  | "Religion Conversion"
  | "Spelling Correction"
  | "Personal Preference"
  | "Other";

export type Service = {
  slug: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  icon: string; // lucide-react icon name
  documentsRequired: string[];
  processingTime: string;
  isGazette?: boolean;
  gazetteReasons?: GazetteReason[];
};

export const processSteps = [
  {
    title: "Fill Online Form",
    desc: "Choose your service and share your basic details in our secure form.",
  },
  {
    title: "Share Documents",
    desc: "Send the required documents to us over WhatsApp or email.",
  },
  {
    title: "Verification",
    desc: "Our team checks every document for accuracy before filing.",
  },
  {
    title: "Processing",
    desc: "We submit and follow up your application with the concerned department.",
  },
  {
    title: "Delivery",
    desc: "Get your certificate or document on email and WhatsApp — job done.",
  },
];

export const services: Service[] = [
  {
    slug: "gazette-notification",
    title: "Gazette Notification",
    shortDesc:
      "Legally change your name, surname, or gender through official Gazette of India publication.",
    fullDesc:
      "A Gazette Notification is the official government publication that gives your name change legal recognition across India. Whether it's a name change after marriage, a surname correction, a gender change, or a religion change, we handle the entire process — affidavit drafting, newspaper advertisement, and application filing with the Government Press — so you don't have to run between offices.",
    icon: "ScrollText",
    documentsRequired: [
      "Notarized affidavit stating the reason for change",
      "Identity proof (Aadhaar card / PAN card)",
      "Address proof (utility bill / rent agreement)",
      "2 recent passport-size photographs",
      "Newspaper advertisement copies (local + national daily)",
      "Application fee payment receipt",
    ],
    processingTime: "4–8 weeks (State Gazette: 3–5 weeks · Central Gazette: 6–8 weeks)",
    isGazette: true,
    gazetteReasons: [
      "Marriage",
      "Divorce",
      "Religion Conversion",
      "Spelling Correction",
      "Personal Preference",
      "Other",
    ],
  },
  {
    slug: "gst-registration",
    title: "GST Registration",
    shortDesc:
      "Get your GSTIN and start billing legally — mandatory once you cross the turnover threshold.",
    fullDesc:
      "GST registration gives your business a unique GSTIN, letting you collect tax legally and claim input credit. We handle document preparation, portal filing, and ARN tracking end-to-end, keeping you posted at every step until your certificate is issued.",
    icon: "Receipt",
    documentsRequired: [
      "PAN card of business / proprietor",
      "Aadhaar card",
      "Passport-size photograph",
      "Business address proof (electricity bill / rent agreement / NOC)",
      "Bank account statement or cancelled cheque",
      "Digital Signature Certificate (for companies & LLPs)",
    ],
    processingTime: "3–7 working days",
  },
  {
    slug: "gst-return-filing",
    title: "GST Return Filing",
    shortDesc:
      "Monthly, quarterly, and annual GST return filing so you stay compliant and avoid late fees.",
    fullDesc:
      "Missed or incorrect GST returns attract penalties and interest. We prepare and file your GSTR-1, GSTR-3B, and annual returns on time, reconciling your sales and purchase data so your books stay clean and audit-ready.",
    icon: "FileText",
    documentsRequired: [
      "GSTIN login credentials",
      "Sales invoices for the period",
      "Purchase invoices for the period",
      "Debit / credit notes, if any",
      "Details of previous filed returns",
    ],
    processingTime: "1–3 working days per return",
  },
  {
    slug: "income-tax-return-filing",
    title: "Income Tax Return (ITR) Filing",
    shortDesc:
      "Accurate ITR filing for salaried individuals, professionals, and business owners.",
    fullDesc:
      "We assess your income sources, apply eligible deductions, and file the correct ITR form on your behalf — helping you stay compliant and claim refunds faster, without the usual last-minute scramble.",
    icon: "Calculator",
    documentsRequired: [
      "PAN card & Aadhaar card",
      "Form 16 (for salaried individuals)",
      "Income and expense details (for business / professional income)",
      "Bank statements for the financial year",
      "Investment proofs for deductions (80C, 80D, etc.)",
      "Previous year's ITR, if available",
    ],
    processingTime: "1–3 working days",
  },
  {
    slug: "pan-card",
    title: "PAN Card (New / Correction)",
    shortDesc:
      "Apply for a new PAN card or correct existing details like name, date of birth, or photo.",
    fullDesc:
      "PAN is required for almost every financial transaction in India. We assist with fresh PAN applications as well as corrections to name, spelling, date of birth, or photograph on an existing card, and track your application until the card reaches you.",
    icon: "CreditCard",
    documentsRequired: [
      "Identity proof (Aadhaar / Voter ID / Passport)",
      "Address proof",
      "Date of birth proof",
      "Passport-size photograph",
      "Copy of existing PAN card (for correction requests)",
    ],
    processingTime: "7–15 working days (card delivered by post)",
  },
  {
    slug: "udyam-msme-registration",
    title: "Udyam (MSME) Registration",
    shortDesc:
      "Register your business as an MSME to access government schemes, subsidies, and easier loans.",
    fullDesc:
      "Udyam registration unlocks priority-sector lending, lower interest rates, tender preferences, and protection against delayed payments. We complete the entire Aadhaar-based registration for you in a single sitting.",
    icon: "Building2",
    documentsRequired: [
      "Aadhaar card of proprietor / partner / director",
      "PAN card of the business",
      "Business address proof",
      "Bank account details",
      "Business activity details (for NIC code selection)",
    ],
    processingTime: "1–2 working days",
  },
  {
    slug: "company-llp-registration",
    title: "Company / LLP Registration",
    shortDesc:
      "Incorporate a Private Limited Company, LLP, or OPC with complete ROC compliance.",
    fullDesc:
      "From name approval to Certificate of Incorporation, we manage the full ROC filing process for Private Limited Companies, LLPs, and One Person Companies, including PAN, TAN, and DSC for your directors.",
    icon: "Landmark",
    documentsRequired: [
      "PAN & Aadhaar of all directors / partners",
      "Passport-size photographs",
      "Address proof of directors / partners",
      "Registered office address proof (utility bill + NOC from owner)",
      "Digital Signature Certificate for all directors",
    ],
    processingTime: "7–12 working days",
  },
  {
    slug: "trademark-registration",
    title: "Trademark Registration",
    shortDesc: "Protect your brand name, logo, or tagline with a registered trademark.",
    fullDesc:
      "A registered trademark stops others from copying your brand identity and gives you legal ownership nationwide. We run a prior-art search, file your application, and track it through examination and publication.",
    icon: "BadgeCheck",
    documentsRequired: [
      "Business PAN and registration proof",
      "Identity proof of applicant",
      "Logo / wordmark file, if applicable",
      "Address proof",
      "Udyam certificate (for reduced MSME filing fee)",
    ],
    processingTime: "1–2 working days to file · 12–18 months for full registration (government timeline)",
  },
  {
    slug: "fssai-food-license",
    title: "FSSAI Food License",
    shortDesc: "Mandatory food safety license for restaurants, cloud kitchens, and food businesses.",
    fullDesc:
      "Whether you need a Basic, State, or Central FSSAI license depends on your turnover and scale. We assess your business, prepare the food safety declaration, and file your application with the correct authority.",
    icon: "UtensilsCrossed",
    documentsRequired: [
      "Identity and address proof of proprietor",
      "Passport-size photograph",
      "Business address proof",
      "Food safety management declaration",
      "NOC from local municipality (for certain categories)",
    ],
    processingTime: "7–20 working days (depends on Basic / State / Central license type)",
  },
  {
    slug: "iso-certification",
    title: "ISO Certification",
    shortDesc: "Get ISO 9001, 14001, or 22000 certification to demonstrate quality and build client trust.",
    fullDesc:
      "ISO certification helps you win larger contracts and tenders by proving your processes meet international quality standards. We guide you through documentation and coordinate the audit with an accredited certification body.",
    icon: "Award",
    documentsRequired: [
      "Business registration proof (GST / Udyam / Incorporation certificate)",
      "PAN card",
      "Company letterhead",
      "Existing process / quality documentation, if any",
    ],
    processingTime: "5–10 working days",
  },
  {
    slug: "digital-signature-certificate",
    title: "Digital Signature Certificate (DSC)",
    shortDesc: "Class 3 DSC for GST, MCA, income tax e-filing, and e-tendering.",
    fullDesc:
      "A Digital Signature Certificate is required to file GST returns, incorporate companies, and submit e-tenders. We complete your video verification and issue a Class 3 DSC token quickly.",
    icon: "KeySquare",
    documentsRequired: [
      "PAN card",
      "Aadhaar card",
      "Passport-size photograph",
      "Active mobile number and email for video verification",
    ],
    processingTime: "1–2 working days",
  },
  {
    slug: "passport-assistance",
    title: "Passport Assistance",
    shortDesc: "End-to-end help with new passport applications, renewals, and correction requests.",
    fullDesc:
      "From filling the online application to appointment booking and document checklists, we guide you through every step of getting a new passport, renewing an existing one, or correcting your details.",
    icon: "Plane",
    documentsRequired: [
      "Aadhaar card",
      "Birth certificate / 10th marksheet (as date of birth proof)",
      "Address proof",
      "Passport-size photographs",
      "Old passport (for renewal applications)",
    ],
    processingTime: "7–15 working days (Tatkal: 3–5 working days), subject to police verification",
  },
  {
    slug: "import-export-code",
    title: "Import Export Code (IEC)",
    shortDesc: "Mandatory code for anyone starting an import or export business in India.",
    fullDesc:
      "IEC is a one-time registration required to legally import or export goods and services from India. We prepare your application and file it directly with DGFT.",
    icon: "Globe",
    documentsRequired: [
      "PAN card of the business",
      "Aadhaar card of proprietor / director",
      "Business address proof",
      "Bank certificate or cancelled cheque",
    ],
    processingTime: "1–3 working days",
  },
  {
    slug: "accounting-bookkeeping",
    title: "Accounting & Bookkeeping",
    shortDesc: "Monthly accounting, ledger maintenance, and financial statements for small businesses.",
    fullDesc:
      "We maintain your day-to-day books, reconcile bank statements, and prepare financial statements every month — so you always know where your business stands and stay ready for tax season.",
    icon: "BookOpen",
    documentsRequired: [
      "Sales and purchase invoices",
      "Bank statements",
      "Expense receipts",
      "Previous year's books of accounts, if available",
    ],
    processingTime: "Ongoing monthly service · first report within 7 working days of onboarding",
  },
];

export function getServiceBySlug(slug: string) {
  return services.find((s) => s.slug === slug);
}
