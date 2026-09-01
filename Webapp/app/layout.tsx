import type { Metadata } from "next";
import "./globals.css";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppFloatButton } from "@/components/WhatsAppFloatButton";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: {
    default: `${site.brandName} — ${site.brandTagline}`,
    template: `%s | ${site.brandName}`,
  },
  description:
    "Online paperwork and compliance services — Gazette Notification, GST Registration, Income Tax Filing, MSME, Trademark, and more. 100% online, transparent, and on time.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Header />
        <AnnouncementBar />
        <main>{children}</main>
        <Footer />
        <WhatsAppFloatButton />
      </body>
    </html>
  );
}
