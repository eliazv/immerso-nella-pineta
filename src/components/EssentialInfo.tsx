import React from "react";
import { cn } from "@/lib/utils";
import { Clock, Contact, Mail, Phone, Car } from "lucide-react";
import { useAccommodation } from "@/contexts/AccommodationContext";

interface EssentialInfoProps {
  className?: string;
}

const EssentialInfo = ({ className }: EssentialInfoProps) => {
  const { accommodation } = useAccommodation();
  const parkingNumber = accommodation.features.parkingNumber.split('#')[1]; // Estrae solo il numero
  
  return (
    <div className={cn("space-y-6", className)}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-xl border border-border bg-card/50">
          <h3 className="font-serif text-lg font-medium mb-4 flex items-center">
            <Clock className="mr-2 h-5 w-5 text-pine-dark" />
            Orari
          </h3>
          <ul className="space-y-3">
            <li className="flex justify-between items-center">
              <span className="text-sm">Check-in</span>
              <span className="text-sm font-medium">dalle 14:00</span>
            </li>
            <li className="flex justify-between items-center">
              <span className="text-sm">Check-out</span>
              <span className="text-sm font-medium">fino alle 10:00</span>
            </li>
          </ul>
        </div>

        <div className="p-6 rounded-xl border border-border bg-card/50">
          <h3 className="font-serif text-lg font-medium mb-4 flex items-center">
            <Contact className="mr-2 h-5 w-5 text-pine-dark" />
            Contatti
          </h3>
          <ul className="space-y-3">
            <li className="flex items-center">
              <Mail className="h-5 w-5 text-pine-dark shrink-0 mr-3" />
              <a
                href="mailto:zavattaelia@gmail.com"
                className="text-sm hover:underline"
              >
                zavattaelia@gmail.com
              </a>
            </li>
            <li className="flex items-center">
              <Phone className="h-5 w-5 text-pine-dark shrink-0 mr-3" />
              <a
                href="https://wa.me/393938932793"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm hover:underline"
              >
                +39 393 893 2793
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="p-6 rounded-xl border border-border bg-card/50">
        <h3 className="font-serif text-lg font-medium mb-4 flex items-center">
          <Car className="mr-2 h-5 w-5 text-pine-dark" />
          Parcheggio e Accesso
        </h3>
        <div className="space-y-3">
          <p className="text-sm">
            🚗 <strong>Parcheggio riservato:</strong> Gli ospiti possono
            accedere comodamente al cortile interno con l'auto e parcheggiare
            nel posto riservato, identificato dal numero {parkingNumber} e situato {parkingNumber === '3' ? 'di fronte all\'ingresso' : 'a destra del cancello del cortile interno'}.
          </p>
          <p className="text-sm">
            🔑 <strong>Accesso autonomo:</strong> L'appartamento dispone di un
            sistema di accesso autonomo tramite una cassetta di sicurezza con
            codice, rendendo l'arrivo e la partenza semplici e flessibili.
          </p>
        </div>
      </div>
    </div>
  );
};

export default EssentialInfo;
