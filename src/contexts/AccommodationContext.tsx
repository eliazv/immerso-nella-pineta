import React, { createContext, useContext, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

export interface AccommodationData {
  id: string;
  name: string;
  shortName: string;
  description: string;
  heroImage: string;
  heroTitle: string;
  heroSubtitle: string;
  welcomeImage: string;
  welcomeTitle: string;
  welcomeDescription: string;
  galleryImages: {
    soggiorno: string;
    camera: string;
    esterno: string;
  };
  features: {
    guests: string;
    beds: string;
    parking: string;
    parkingNumber: string;
    petsAllowed: string;
  };
  rating: {
    airbnb: string;
  };
  metaTags: {
    title: string;
    description: string;
    keywords: string;
  };
  cin: string;
}

const accommodationsData: Record<string, AccommodationData> = {
  pineta3: {
    id: "pineta3",
    name: "Immerso nella Pineta 3",
    shortName: "Pineta 3",
    description: "Alloggio a Pinarella - Affitto Diretto dai Proprietari",
    heroImage: "https://www.pinarellavillage.com/images/slider/1.jpg",
    heroTitle: "Immerso 3",
    heroSubtitle:
      "Niente commissioni, nessun intermediario. Contatto diretto con Elia e famiglia per la tua vacanza in Romagna.",
    welcomeImage:
      "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTE3MDMyNTgyNDcwNjQwMzA1OQ==/original/529559d4-9514-4ece-a94b-38de9fc199ab.jpeg?q=80&w=800&auto=format&fit=crop",
    welcomeTitle: "Appartamento in affitto per le vostre vacanze",
    welcomeDescription:
      "Benvenuti nel nostro accogliente appartamento, a soli 200 metri dalla splendida pineta e dalle acque del mare di Pinarella. Situato al piano terra di una graziosa palazzina immersa nel verde, ombreggiata da alti pini, questo è il rifugio perfetto per chi cerca relax e comfort durante le vacanze estive. Godetevi la pace della zona, a due passi dalla spiaggia, e lasciatevi coccolare dalla fresca brezza marina.",
    galleryImages: {
      soggiorno:
        "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTE3MDMyNTgyNDcwNjQwMzA1OQ==/original/70cdc17b-b1f7-462e-9751-c2071478d2ce.jpeg?q=80&w=1200&h=800&auto=format&fit=crop",
      camera:
        "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTE3MDMyNTgyNDcwNjQwMzA1OQ==/original/45d7a05d-bfcb-403b-86cf-5a43aeeead4d.jpeg?q=80&w=1200&h=800&auto=format&fit=crop",
      esterno:
        "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTE3MDMyNTgyNDcwNjQwMzA1OQ==/original/1fd1ceeb-47d2-4ce1-a166-18c7147b3709.jpeg?q=80&w=1200&h=800&auto=format&fit=crop",
    },
    features: {
      guests: "Fino a 4 ospiti",
      beds: "Letto matrimoniale e due letti singoli",
      parking: "Parcheggio privato",
      parkingNumber: "Posto auto riservato #3",
      petsAllowed: "Animali domestici accettati",
    },
    rating: {
      airbnb: "4,5 stelle su Airbnb",
    },
    metaTags: {
      title:
        "Alloggio Pinarella Cervia - Affitto Diretto Proprietari | 4 Posti 200m Mare",
      description:
        "Appartamento 4 posti a Pinarella di Cervia. Prenotazione diretta senza intermediari con proprietario Elia. A 200m dal mare. Risparmia 20% vs Booking/Airbnb.",
      keywords:
        "alloggio pinarella, appartamento pinarella cervia, affitto diretto pinarella, casa vacanze pinarella proprietari, prenotazione diretta cervia, affitto senza intermediari pinarella, appartamento mare cervia proprietario",
    },
    cin: "IT039007C2RWYMLE52",
  },
  pineta8: {
    id: "pineta8",
    name: "Immerso nella Pineta 8",
    shortName: "Pineta 8",
    description: "Alloggio 6 posti a Pinarella - Affitto Diretto Proprietario",
    heroImage:
      "https://a0.muscache.com/im/pictures/hosting/Hosting-1496353845267245023/original/b4103f6e-2051-49cb-8453-ccfbb53b3df2.jpeg?im_w=480",
    heroTitle: "Immerso 8",
    heroSubtitle:
      "Appartamento 6 posti letto. Nessun intermediario, gestione diretta con Elia e famiglia. Risparmia vs Booking/Airbnb.",
    welcomeImage:
      "https://a0.muscache.com/im/pictures/hosting/Hosting-1496353845267245023/original/9cd1ae64-2e35-435c-a5a3-f8524a9d931a.jpeg?im_w=480",
    welcomeTitle: "Appartamento in affitto per le vostre vacanze",
    welcomeDescription:
      "Benvenuti nel nostro accogliente appartamento, a soli 200 metri dalla splendida pineta e dalle acque del mare di Pinarella. Situato al secondo piano di una graziosa palazzina immersa nel verde, ombreggiata da alti pini, questo è il rifugio perfetto per chi cerca relax e comfort durante le vacanze estive. Godetevi la pace della zona, a due passi dalla spiaggia, e lasciatevi coccolare dalla fresca brezza marina.",
    galleryImages: {
      soggiorno:
        "https://a0.muscache.com/im/pictures/hosting/Hosting-1496353845267245023/original/cc6b886e-ae40-413a-8af1-b80901eb1ba3.jpeg?im_w=480",
      camera:
        "https://a0.muscache.com/im/pictures/hosting/Hosting-1496353845267245023/original/7c77374c-bfbb-4051-9bd2-4cf289ba6559.jpeg?im_w=480",
      esterno:
        "https://a0.muscache.com/im/pictures/hosting/Hosting-1496353845267245023/original/1890df9a-0345-4fc2-a22a-817a054f94ee.jpeg?im_w=480",
    },
    features: {
      guests: "Fino a 6 ospiti",
      beds: "2 letti matrimoniali e 2 letti singoli in 2 camere",
      parking: "Parcheggio privato",
      parkingNumber: "Posto auto riservato #8",
      petsAllowed: "Animali domestici accettati",
    },
    rating: {
      airbnb: "4,5 stelle su Airbnb",
    },
    metaTags: {
      title:
        "Alloggio Pinarella 6 Posti - Affitto Diretto Proprietario | 200m Mare",
      description:
        "Appartamento 6 posti a Pinarella di Cervia. Prenotazione diretta con proprietario Elia, senza intermediari. 3 balconi, posto auto. -20% vs OTA.",
      keywords:
        "alloggio pinarella 6 posti, appartamento pinarella cervia, affitto diretto pinarella, casa vacanze pinarella proprietario, prenotazione diretta cervia 6 persone, affitto senza intermediari pinarella",
    },
    cin: "IT039007C2UTCCNWG5",
  },
};

interface AccommodationContextType {
  accommodation: AccommodationData;
  accommodationId: string;
  setAccommodationId: (id: string) => void;
  isValidAccommodation: boolean;
}

const AccommodationContext = createContext<
  AccommodationContextType | undefined
>(undefined);

interface AccommodationProviderProps {
  children: React.ReactNode;
}

export const AccommodationProvider: React.FC<AccommodationProviderProps> = ({
  children,
}) => {
  const location = useLocation();
  const [accommodationId, setAccommodationIdState] =
    useState<string>("pineta3");

  useEffect(() => {
    const path = location.pathname;

    if (path.startsWith("/pineta3")) {
      setAccommodationIdState("pineta3");
    } else if (path.startsWith("/pineta8")) {
      setAccommodationIdState("pineta8");
    }
  }, [location.pathname]);

  const setAccommodationId = (id: string) => {
    setAccommodationIdState(id);
  };

  const accommodation =
    accommodationsData[accommodationId] || accommodationsData.pineta3;
  const isValidAccommodation = accommodationId in accommodationsData;

  const value: AccommodationContextType = {
    accommodation,
    accommodationId,
    setAccommodationId,
    isValidAccommodation,
  };

  return (
    <AccommodationContext.Provider value={value}>
      {children}
    </AccommodationContext.Provider>
  );
};

export const useAccommodation = (): AccommodationContextType => {
  const context = useContext(AccommodationContext);
  if (context === undefined) {
    throw new Error(
      "useAccommodation must be used within an AccommodationProvider",
    );
  }
  return context;
};

export { accommodationsData };
