import React from "react";

const SEOSchema = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    name: "Immerso nella Pineta - Appartamento in Affitto Pinarella di Cervia",
    description:
      "Appartamento in affitto per vacanze a Pinarella di Cervia. A 5 minuti dal mare, posto auto privato, 4 posti letto. Casa vacanze ideale per famiglie nella pineta di Cervia.",
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
        name: "Parcheggio privato gratuito",
        value: true,
      },
      {
        "@type": "LocationFeatureSpecification",
        name: "Wi-Fi gratuito",
        value: true,
      },
      {
        "@type": "LocationFeatureSpecification",
        name: "Aria condizionata",
        value: true,
      },
      {
        "@type": "LocationFeatureSpecification",
        name: "Lavatrice",
        value: true,
      },
      {
        "@type": "LocationFeatureSpecification",
        name: "A 5 minuti dalla spiaggia",
        value: true,
      },
      {
        "@type": "LocationFeatureSpecification",
        name: "Piano terra",
        value: true,
      },
      {
        "@type": "LocationFeatureSpecification",
        name: "Cucina attrezzata",
        value: true,
      },
      {
        "@type": "LocationFeatureSpecification",
        name: "TV",
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
        urlTemplate: "https://immersonellapineta.it/book",
        inLanguage: "it",
        actionPlatform: [
          "http://schema.org/DesktopWebPlatform",
          "http://schema.org/MobileWebPlatform",
        ],
      },
      result: {
        "@type": "LodgingReservation",
        name: "Prenotazione appartamento in affitto a Pinarella di Cervia",
      },
    },
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
