import { MessageCircle } from "lucide-react";
import { site, whatsappLink } from "@/data/site";

export function WhatsAppFloatButton() {
  return (
    <a
      href={whatsappLink(`Hi ${site.brandName}, I'd like to know more about your services.`)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-5 right-5 z-40 flex size-14 items-center justify-center rounded-full bg-[#1F9E4E] text-white shadow-lg shadow-[#1F9E4E]/30 hover:scale-105 transition-transform motion-reduce:hover:scale-100"
    >
      <MessageCircle className="size-6.5" strokeWidth={1.75} />
    </a>
  );
}
