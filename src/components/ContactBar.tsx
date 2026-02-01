import { Phone, Mail, MessageCircle } from "lucide-react";
import { Button } from "./ui/button";

interface ContactBarProps {
  phone: string;
  email: string;
  whatsappMessage?: string;
}

const ContactBar = ({
  phone,
  email,
  whatsappMessage = "Ciao! Vorrei informazioni sull'appartamento a Pinarella",
}: ContactBarProps) => {
  const whatsappUrl = `https://wa.me/${phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(whatsappMessage)}`;
  const phoneUrl = `tel:${phone}`;
  const emailUrl = `mailto:${email}`;

  return (
    <div className="bg-pine-dark/10 border-b border-pine-light/20 py-2">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
          <a
            href={phoneUrl}
            className="flex items-center gap-2 text-pine-dark hover:text-pine-600 transition-colors"
          >
            <Phone className="h-4 w-4" />
            <span className="font-medium">{phone}</span>
          </a>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-green-600 hover:text-green-700 transition-colors font-medium"
          >
            <MessageCircle className="h-4 w-4" />
            <span>WhatsApp</span>
          </a>

          <a
            href={emailUrl}
            className="flex items-center gap-2 text-pine-dark hover:text-pine-600 transition-colors"
          >
            <Mail className="h-4 w-4" />
            <span>{email}</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactBar;
