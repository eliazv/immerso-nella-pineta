import React from "react";
import { useLocation } from "react-router-dom";

interface AdvancedSEOSchemaProps {
  accommodationType?: "pineta3" | "pineta8" | "default";
}

const AdvancedSEOSchema = ({
  accommodationType = "default",
}: AdvancedSEOSchemaProps) => {
  const location = useLocation();
  const currentUrl = `https://immerso-nella-pineta.vercel.app${location.pathname}`;

  const baseAccommodation = {
    "@context": "https://schema.org",
    "@type": "VacationRental",
    name: "Appartamento Pinarella Prenotazione Diretta - Casa Vacanze Cervia",
    description:
      "Appartamento in affitto a Pinarella di Cervia con prenotazione diretta senza intermediari. 4 posti letto, parcheggio privato, 200m dal mare. Contatta il proprietario per risparmiare sulle commissioni.",
    url: currentUrl,
    image: [
      "https://www.pinarellavillage.com/images/slider/1.jpg",
      "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTE3MDMyNTgyNDcwNjQwMzA1OQ==/original/529559d4-9514-4ece-a94b-38de9fc199ab.jpeg",
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: "Via Vallombrosa 10",
      addressLocality: "Pinarella di Cervia",
      addressRegion: "Emilia-Romagna",
      postalCode: "48015",
      addressCountry: "IT",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 44.261434,
      longitude: 12.339165,
    },
    telephone: "+393938932793",
    email: "zavattaelia@gmail.com",
    priceRange: "€€",
    petsAllowed: false,
    smokingAllowed: false,
    numberOfRooms: 2,
    floorSize: {
      "@type": "QuantitativeValue",
      value: 60,
      unitCode: "MTK",
    },
    occupancy: {
      "@type": "QuantitativeValue",
      maxValue: 4,
      unitText: "persons",
    },
    amenityFeature: [
      {
        "@type": "LocationFeatureSpecification",
        name: "Parcheggio privato incluso",
        value: true,
      },
      {
        "@type": "LocationFeatureSpecification",
        name: "Accesso autonomo con cassetta sicurezza",
        value: true,
      },
      {
        "@type": "LocationFeatureSpecification",
        name: "Aria condizionata e riscaldamento",
        value: true,
      },
      {
        "@type": "LocationFeatureSpecification",
        name: "Lavatrice",
        value: true,
      },
      {
        "@type": "LocationFeatureSpecification",
        name: "Cucina completamente attrezzata",
        value: true,
      },
      {
        "@type": "LocationFeatureSpecification",
        name: "TV e WiFi",
        value: true,
      },
      {
        "@type": "LocationFeatureSpecification",
        name: "Vicinanza al mare - 200m dalla spiaggia",
        value: true,
      },
    ],
    checkinTime: "16:00",
    checkoutTime: "10:00",
    numberOfBeds: 3,
    bed: [
      {
        "@type": "BedDetails",
        numberOfBeds: 1,
        typeOfBed: "http://schema.org/KingBed",
      },
      {
        "@type": "BedDetails",
        numberOfBeds: 2,
        typeOfBed: "http://schema.org/SingleBed",
      },
    ],
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      price: 80,
      priceCurrency: "EUR",
      priceSpecification: {
        "@type": "PriceSpecification",
        price: 80,
        priceCurrency: "EUR",
        eligibleQuantity: {
          "@type": "QuantitativeValue",
          unitText: "night",
        },
      },
      validFrom: "2025-01-01",
      url: `${currentUrl}/book`,
      seller: {
        "@type": "Person",
        name: "Elia Zavatta",
        telephone: "+393938932793",
        email: "zavattaelia@gmail.com",
      },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: 4.8,
      reviewCount: 15,
      bestRating: 5,
      worstRating: 1,
    },
    review: [
      {
        "@type": "Review",
        reviewRating: {
          "@type": "Rating",
          ratingValue: 5,
          bestRating: 5,
        },
        author: {
          "@type": "Person",
          name: "Marco R.",
        },
        reviewBody:
          "Appartamento perfetto per vacanze in famiglia a Pinarella. Prenotazione diretta molto conveniente, vicino al mare e molto pulito. Parcheggio incluso fantastico!",
        datePublished: "2024-08-15",
      },
      {
        "@type": "Review",
        reviewRating: {
          "@type": "Rating",
          ratingValue: 5,
          bestRating: 5,
        },
        author: {
          "@type": "Person",
          name: "Sofia M.",
        },
        reviewBody:
          "Prenotazione diretta senza commissioni, risparmio notevole rispetto a Booking. Appartamento pulito, comodo e proprietario molto disponibile.",
        datePublished: "2024-07-22",
      },
    ],
    potentialAction: {
      "@type": "ReserveAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${currentUrl}/book`,
        inLanguage: "it",
        actionPlatform: [
          "http://schema.org/DesktopWebPlatform",
          "http://schema.org/MobileWebPlatform",
        ],
      },
      result: {
        "@type": "LodgingReservation",
        name: "Prenotazione diretta appartamento Pinarella Cervia senza intermediari",
      },
    },
    sameAs: [
      "https://www.facebook.com/immersonellapineta",
      "https://www.instagram.com/immersonellapineta",
    ],
    keywords:
      "appartamento Pinarella prenotazione diretta, affitto appartamento Pinarella senza intermediari, casa vacanze Pinarella Cervia, alloggio Pinarella fronte mare, appartamento 4 persone Pinarella contatta proprietario, vacanze famiglia Pinarella senza commissioni",
  };

  // Local Business Schema for better local SEO
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://immerso-nella-pineta.vercel.app/#business",
    name: "Immerso nella Pineta - Affitti Vacanze Pinarella",
    description:
      "Affitti vacanze diretti a Pinarella di Cervia. Appartamenti con parcheggio privato, 200m dal mare. Prenotazione diretta senza intermediari per risparmiare.",
    url: "https://immersonellapineta.it",
    telephone: "+393938932793",
    email: "zavattaelia@gmail.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Via Vallombrosa 10",
      addressLocality: "Pinarella di Cervia",
      addressRegion: "Emilia-Romagna",
      postalCode: "48015",
      addressCountry: "IT",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 44.261434,
      longitude: 12.339165,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "09:00",
      closes: "20:00",
    },
    priceRange: "€€",
    servesCuisine: null,
    areaServed: {
      "@type": "City",
      name: "Pinarella di Cervia",
    },
  };

  // Organization Schema
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://immerso-nella-pineta.vercel.app/#organization",
    name: "Immerso nella Pineta",
    url: "https://immerso-nella-pineta.vercel.app",
    logo: "https://immerso-nella-pineta.vercel.app/images/logo.nobg.png",
    sameAs: [
      "https://www.facebook.com/immersonellapineta",
      "https://www.instagram.com/immersonellapineta",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+393938932793",
      email: "zavattaelia@gmail.com",
      contactType: "reservations",
      availableLanguage: "Italian",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(baseAccommodation) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
    </>
  );
};

export default AdvancedSEOSchema;
