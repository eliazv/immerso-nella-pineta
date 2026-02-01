import React from "react";

const SEOSchema = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    name: "Appartamento Pinarella Prenotazione Diretta - Casa Vacanze Cervia",
    description:
      "Appartamento in affitto a Pinarella di Cervia con prenotazione diretta senza intermediari. 4 posti letto, parcheggio privato, 200m dal mare. Contatta il proprietario per risparmiare sulle commissioni. Casa vacanze ideale per famiglie nella pineta di Cervia.",
    url: "https://immerso-nella-pineta.vercel.app",
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
      latitude: "44.261434",
      longitude: "12.339165",
    },
    priceRange: "€€",
    starRating: {
      "@type": "Rating",
      ratingValue: "5",
    },
    checkinTime: "16:00",
    checkoutTime: "10:00",
    numberOfRooms: "2",
    maximumAttendeeCapacity: 4,
    petsAllowed: false,
    amenityFeature: [
      {
        "@type": "LocationFeatureSpecification",
        name: "Parcheggio privato incluso - posto auto riservato",
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
        name: "Vicinanza al mare - 200m dalla spiaggia e pineta",
        value: true,
      },
      {
        "@type": "LocationFeatureSpecification",
        name: "Piano terra accessibile",
        value: true,
      },
      {
        "@type": "LocationFeatureSpecification",
        name: "Cucina completamente attrezzata",
        value: true,
      },
      {
        "@type": "LocationFeatureSpecification",
        name: "TV e area giardino riservata",
        value: true,
      },
    ],
    image: [
      "https://www.pinarellavillage.com/images/slider/1.jpg",
      "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTE3MDMyNTgyNDcwNjQwMzA1OQ==/original/529559d4-9514-4ece-a94b-38de9fc199ab.jpeg",
    ],
    offers: {
      "@type": "Offer",
      availability: "InStock",
      price: "80",
      priceCurrency: "EUR",
      priceSpecification: {
        "@type": "PriceSpecification",
        price: "80",
        priceCurrency: "EUR",
        eligibleQuantity: {
          "@type": "QuantitativeValue",
          unitText: "notte",
        },
      },
    },
    potentialAction: {
      "@type": "ReserveAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://immerso-nella-pineta.vercel.app/book",
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
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "12",
    },
    review: [
      {
        "@type": "Review",
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
        },
        author: {
          "@type": "Person",
          name: "Marco R.",
        },
        reviewBody:
          "Appartamento perfetto per vacanze in famiglia a Pinarella. Vicino al mare e molto pulito.",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
};

export default SEOSchema;
