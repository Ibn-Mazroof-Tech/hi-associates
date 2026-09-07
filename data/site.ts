// ─────────────────────────────────────────────────────────────
// SITE CONFIG — sabse pehle yeh file edit karo.
// Client se jab email / landline / WhatsApp number mile, yahan
// change kar dena. Poori website automatically update ho jayegi
// kyunki yeh values har jagah yahin se import hoti hain.
// ─────────────────────────────────────────────────────────────

export const site = {
  brandName: "Hamdan Associates",
  brandTagline: "Documentation & Compliance, Simplified",
  legalLine: "Expert Assistance for All Your Professional Document Needs.",

  website: "https://hiassociates.com",
  email: "hamdan@hiassociates.com",
  landline: "+91 11 4907 2356",
  whatsappNumber: "919910247897", // country code + number, no + or spaces
  whatsappDisplay: "+91 99102 47897",

  address: "Jafrabad, Seelampur, Delhi-110053",

  // Exact pin location for the Footer map embed — searching by the
  // address text alone can point Google Maps to the wrong spot, so this
  // uses precise coordinates instead. Update both if the office moves.
  mapCoordinates: { lat: 28.679513, lng: 77.272064 },

  // "Get Quote" button (homepage hero + bottom CTA) opens this Google
  // Form in a new tab instead of the Apply Now page — see README for
  // how to create the form (Service, Full Name, Last Name, Contact,
  // City, Address, Remark) and link its responses to a Sheet.
  getQuoteFormUrl: "https://forms.gle/EhS4AHRbGrmVqwm36",

  // Image paths — all files live in /public, but you only ever need to
  // edit the path here. To swap an image: drop the new file into
  // /public (any filename) and update the matching line below —
  // nothing in components/ or app/ needs to change.
  images: {
    logo: "/logo.png",
    homeHero: "/hero-office.jpg", // homepage hero background
    aboutHero: "/about-hero.jpg", // About Us page intro background
    contactHero: "/contact-hero.jpg", // Contact Us page intro background
  },

  social: {
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
    linkedin: "https://linkedin.com",
  },

  stats: [
    { label: "Applications Processed", value: "15,000+" },
    { label: "Years of Service", value: "8+" },
    { label: "Client Rating", value: "4.8/5" },
    { label: "Cities Served", value: "Pan India" },
  ],

  // Scrolling announcement bar at the very top of the site. Each string
  // is one message — add, remove, or edit freely; the bar automatically
  // adjusts to however many messages are listed here.
  announcementMessages: [
    "We charge for our consultancy services only and do not charge or collect funds in the name of the Government of India or any other related Government Agencies including Passport Services. We apply on your behalf and help you with the processing stages and the moment you press the 'Submit' button on our enquiry or submission pages, to accept the 'Terms and Conditions' and 'Privacy Policy', you authorize us to proceed on your behalf.",
    "Hamdan Associates is a Private Organization and not associated with Ministry of External Affairs (MEA)",
    "User's relationship with Hamdan Associates shall be governed by the terms & conditions, privacy policy and refund policy of this website.",
  ],
};

export function whatsappLink(message: string) {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${site.whatsappNumber}?text=${encoded}`;
}
