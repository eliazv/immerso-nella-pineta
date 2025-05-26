import React from "react";

const SEOSchema = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    name: "Appartamento Immerso nella Pineta - Pinarella di Cervia",
    description:
      "Appartamento per affitto estivo a Pinarella di Cervia, a soli 5 minuti a piedi dal mare e 200 metri dalla pineta. Ideale per famiglie e coppie.",
    url: "https://immersonellapineta.it",
    telephone: "+393938932793",
    email: "zavattaelia@gmail.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Via Vallombrosa 10",
      addressLocality: "Pinarella di Cervia",
      addressRegion: "RA",
      postalCode: "48015",
      addressCountry: "IT",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "44.261434",
      longitude: "12.339165",
    },
    priceRange: "€€",
    amenityFeature: [
      {
        "@type": "LocationFeatureSpecification",
        name: "Parcheggio privato",
        value: true,
      },
      {
        "@type": "LocationFeatureSpecification",
        name: "Wi-Fi",
        value: true,
      },
      {
        "@type": "LocationFeatureSpecification",
        name: "Aria Condizionata",
        value: true,
      },
      {
        "@type": "LocationFeatureSpecification",
        name: "Lavatrice",
        value: true,
      },
      {
        "@type": "LocationFeatureSpecification",
        name: "Vicino alla spiaggia",
        value: true,
      },
    ],
    image: "https://www.pinarellavillage.com/images/slider/1.jpg",
    potentialAction: {
      "@type": "ReserveAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://immersonellapineta.it/book",
        inLanguage: "it",
        actionPlatform: [
          "http://schema.org/DesktopWebPlatform",
          "http://schema.org/MobileWebPlatform",
        ],
      },
      result: {
        "@type": "LodgingReservation",
        name: "Prenotazione appartamento a Pinarella di Cervia",
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
};

export default SEOSchema;
