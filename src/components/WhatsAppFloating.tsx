import { MessageCircle } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

interface WhatsAppFloatingProps {
  phoneNumber: string;
  message?: string;
}

const WhatsAppFloating = ({
  phoneNumber,
  message = "Ciao! Vorrei informazioni sull'appartamento a Pinarella",
}: WhatsAppFloatingProps) => {
  const whatsappUrl = `https://wa.me/${phoneNumber.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-2xl transition-all duration-300 hover:scale-110 flex items-center gap-2 group"
      aria-label="Contattaci su WhatsApp"
    >
      <FaWhatsapp className="h-6 w-6" />
      <span className="hidden group-hover:inline-block text-sm font-medium whitespace-nowrap mr-1">
        Scrivici
      </span>
    </a>
  );
};

export default WhatsAppFloating;
