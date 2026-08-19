// ─────────────────────────────────────────────────────────────
// SITE CONFIG — sabse pehle yeh file edit karo.
// Client se jab email / landline / WhatsApp number mile, yahan
// change kar dena. Poori website automatically update ho jayegi
// kyunki yeh values har jagah yahin se import hoti hain.
// ─────────────────────────────────────────────────────────────

export const site = {
  brandName: "HI Associates",
  brandTagline: "Your Digital Seva Kendra",
  legalLine: "Authorised CSC (Common Service Centre) Partner",

  email: "hamdaan@hiassociates.com",
  landline: "011-40001234",
  whatsappNumber: "919818123281", // country code + number, no + or spaces
  whatsappDisplay: "+91 98181 23281",

  address: "570, street no.25, Jafrabad, Seelampur, Delhi-110053",

  // Google Apps Script Web App URL (ends in /exec). Every Apply Now
  // submission is saved as a row in your Google Sheet via this — see
  // google-apps-script/Code.gs and the README for setup steps.
  // Required for the Apply Now form to work.
  googleSheetWebhookUrl: "https://script.google.com/macros/s/AKfycby-FdwWh_jmKQrCYgtEzVo8mb9vLhEjanPu1iI1Nb9-zIStiUcKR-WvZ0_WI40axihZ/exec",

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
};

export function whatsappLink(message: string) {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${site.whatsappNumber}?text=${encoded}`;
}
