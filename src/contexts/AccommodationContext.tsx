import React, { createContext, useContext, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

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
  };
  metaTags: {
    title: string;
    description: string;
    keywords: string;
  };
}

const accommodationsData: Record<string, AccommodationData> = {
  pineta3: {
    id: 'pineta3',
    name: 'Immerso nella Pineta 3',
    shortName: 'Pineta 3',
    description: 'Casa vacanze a Cervia - A soli 5 minuti a piedi dal mare',
    heroImage: 'https://www.pinarellavillage.com/images/slider/1.jpg',
    heroTitle: 'Immerso nella Pineta',
    heroSubtitle: 'Casa vacanze a Cervia - A soli 5 minuti a piedi dal mare',
    welcomeImage: 'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTE3MDMyNTgyNDcwNjQwMzA1OQ==/original/529559d4-9514-4ece-a94b-38de9fc199ab.jpeg?q=80&w=800&auto=format&fit=crop',
    welcomeTitle: 'Appartamento in affitto per le vostre vacanze',
    welcomeDescription: 'Benvenuti nel nostro accogliente appartamento, a soli 200 metri dalla splendida pineta e dalle acque del mare di Pinarella. Situato al piano terra di una graziosa palazzina immersa nel verde, ombreggiata da alti pini, questo è il rifugio perfetto per chi cerca relax e comfort durante le vacanze estive. Godetevi la pace della zona, a due passi dalla spiaggia, e lasciatevi coccolare dalla fresca brezza marina.',
    galleryImages: {
      soggiorno: 'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTE3MDMyNTgyNDcwNjQwMzA1OQ==/original/70cdc17b-b1f7-462e-9751-c2071478d2ce.jpeg?q=80&w=1200&h=800&auto=format&fit=crop',
      camera: 'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTE3MDMyNTgyNDcwNjQwMzA1OQ==/original/45d7a05d-bfcb-403b-86cf-5a43aeeead4d.jpeg?q=80&w=1200&h=800&auto=format&fit=crop',
      esterno: 'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTE3MDMyNTgyNDcwNjQwMzA1OQ==/original/1fd1ceeb-47d2-4ce1-a166-18c7147b3709.jpeg?q=80&w=1200&h=800&auto=format&fit=crop'
    },
    features: {
      guests: 'Fino a 4 ospiti',
      beds: 'Letto matrimoniale e due letti singoli',
      parking: 'Parcheggio privato',
      parkingNumber: 'Posto auto riservato #3'
    },
    metaTags: {
      title: 'Appartamento in Affitto a Pinarella di Cervia | Vacanze Mare 2025',
      description: 'Affitto appartamento vacanze a Pinarella di Cervia. A 5 minuti dal mare, posto auto privato, 4 posti letto. Prenotazioni aperte. Ideale famiglie.',
      keywords: 'appartamento affitto pinarella cervia, casa vacanze pinarella, affitto estivo cervia, appartamento mare cervia, alloggio pinarella di cervia, vacanze cervia appartamento, affitto breve termine pinarella'
    }
  },
  pineta8: {
    id: 'pineta8',
    name: 'Immerso nella Pineta 8',
    shortName: 'Pineta 8',
    description: 'Casa vacanze a Cervia - A soli 5 minuti a piedi dal mare',
    heroImage: 'https://www.pinarellavillage.com/images/slider/1.jpg',
    heroTitle: 'Immerso nella Pineta',
    heroSubtitle: 'Casa vacanze a Cervia - A soli 5 minuti a piedi dal mare',
    welcomeImage: 'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTE3MDMyNTgyNDcwNjQwMzA1OQ==/original/529559d4-9514-4ece-a94b-38de9fc199ab.jpeg?q=80&w=800&auto=format&fit=crop',
    welcomeTitle: 'Appartamento in affitto per le vostre vacanze',
    welcomeDescription: 'Benvenuti nel nostro accogliente appartamento, a soli 200 metri dalla splendida pineta e dalle acque del mare di Pinarella. Situato al piano terra di una graziosa palazzina immersa nel verde, ombreggiata da alti pini, questo è il rifugio perfetto per chi cerca relax e comfort durante le vacanze estive. Godetevi la pace della zona, a due passi dalla spiaggia, e lasciatevi coccolare dalla fresca brezza marina.',
    galleryImages: {
      soggiorno: 'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTE3MDMyNTgyNDcwNjQwMzA1OQ==/original/70cdc17b-b1f7-462e-9751-c2071478d2ce.jpeg?q=80&w=1200&h=800&auto=format&fit=crop',
      camera: 'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTE3MDMyNTgyNDcwNjQwMzA1OQ==/original/45d7a05d-bfcb-403b-86cf-5a43aeeead4d.jpeg?q=80&w=1200&h=800&auto=format&fit=crop',
      esterno: 'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTE3MDMyNTgyNDcwNjQwMzA1OQ==/original/1fd1ceeb-47d2-4ce1-a166-18c7147b3709.jpeg?q=80&w=1200&h=800&auto=format&fit=crop'
    },
    features: {
      guests: 'Fino a 4 ospiti',
      beds: 'Letto matrimoniale e due letti singoli',
      parking: 'Parcheggio privato',
      parkingNumber: 'Posto auto riservato #8'
    },
    metaTags: {
      title: 'Appartamento in Affitto a Pinarella di Cervia | Vacanze Mare 2025',
      description: 'Affitto appartamento vacanze a Pinarella di Cervia. A 5 minuti dal mare, posto auto privato, 4 posti letto. Prenotazioni aperte. Ideale famiglie.',
      keywords: 'appartamento affitto pinarella cervia, casa vacanze pinarella, affitto estivo cervia, appartamento mare cervia, alloggio pinarella di cervia, vacanze cervia appartamento, affitto breve termine pinarella'
    }
  }
};

interface AccommodationContextType {
  accommodation: AccommodationData;
  accommodationId: string;
  setAccommodationId: (id: string) => void;
  isValidAccommodation: boolean;
}

const AccommodationContext = createContext<AccommodationContextType | undefined>(undefined);

interface AccommodationProviderProps {
  children: React.ReactNode;
}

export const AccommodationProvider: React.FC<AccommodationProviderProps> = ({ children }) => {
  const location = useLocation();
  const [accommodationId, setAccommodationIdState] = useState<string>('pineta3');

  useEffect(() => {
    const path = location.pathname;
    
    if (path.startsWith('/pineta3')) {
      setAccommodationIdState('pineta3');
    } else if (path.startsWith('/pineta8')) {
      setAccommodationIdState('pineta8');
    }
  }, [location.pathname]);

  const setAccommodationId = (id: string) => {
    setAccommodationIdState(id);
  };

  const accommodation = accommodationsData[accommodationId] || accommodationsData.pineta3;
  const isValidAccommodation = accommodationId in accommodationsData;

  const value: AccommodationContextType = {
    accommodation,
    accommodationId,
    setAccommodationId,
    isValidAccommodation
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
    throw new Error('useAccommodation must be used within an AccommodationProvider');
  }
  return context;
};

export { accommodationsData };