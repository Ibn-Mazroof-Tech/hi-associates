import {
  ScrollText,
  Receipt,
  FileText,
  Calculator,
  CreditCard,
  Building2,
  Landmark,
  BadgeCheck,
  UtensilsCrossed,
  Award,
  KeySquare,
  Plane,
  Globe,
  BookOpen,
  Baby,
  Newspaper,
  type LucideIcon,
} from "lucide-react";

export const serviceIcons: Record<string, LucideIcon> = {
  ScrollText,
  Receipt,
  FileText,
  Calculator,
  CreditCard,
  Building2,
  Landmark,
  BadgeCheck,
  UtensilsCrossed,
  Award,
  KeySquare,
  Plane,
  Globe,
  BookOpen,
  Baby,
  Newspaper,
};

export function ServiceIcon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const Icon = serviceIcons[name] ?? FileText;
  return <Icon className={className} strokeWidth={1.75} />;
}
