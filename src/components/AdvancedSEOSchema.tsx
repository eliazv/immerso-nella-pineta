import React from "react";
import { useLocation } from "react-router-dom";
import { getSiteUrl } from "@/lib/config";

interface AdvancedSEOSchemaProps {
  accommodationType?: "pineta3" | "pineta8" | "default";
}

const PINETA3_IMAGES = [
  "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTE3MDMyNTgyNDcwNjQwMzA1OQ==/original/529559d4-9514-4ece-a94b-38de9fc199ab.jpeg",
  "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTE3MDMyNTgyNDcwNjQwMzA1OQ==/original/70cdc17b-b1f7-462e-9751-c2071478d2ce.jpeg",
  "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTE3MDMyNTgyNDcwNjQwMzA1OQ==/original/34e3c56b-d643-4d2f-9e52-40aa4647cac3.jpeg",
  "https://a0.muscache.com/im/pictures/hosting/Hosting-1170325824706403059/original/13f80286-d183-42c2-84a7-c4b45c123c85.jpeg",
  "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTE3MDMyNTgyNDcwNjQwMzA1OQ==/original/45d7a05d-bfcb-403b-86cf-5a43aeeead4d.jpeg",
  "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTE3MDMyNTgyNDcwNjQwMzA1OQ==/original/01b0f8f4-5330-4853-bf2d-5d72d8d16cc5.jpeg",
  "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTE3MDMyNTgyNDcwNjQwMzA1OQ==/original/66929108-72b5-4dab-a35d-0c3c28680943.jpeg",
  "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTE3MDMyNTgyNDcwNjQwMzA1OQ==/original/1fd1ceeb-47d2-4ce1-a166-18c7147b3709.jpeg",
  "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTE3MDMyNTgyNDcwNjQwMzA1OQ==/original/b938ef34-e209-4ba2-a3ae-19da60030748.jpeg",
  "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTE3MDMyNTgyNDcwNjQwMzA1OQ==/original/d0896c17-b5d9-48b7-bf98-9d2aba92f7f8.jpeg",
  "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTE3MDMyNTgyNDcwNjQwMzA1OQ==/original/a2559d72-0bca-4c53-bf21-5915d8512fa9.jpeg",
];

const PINETA8_IMAGES = [
  "https://a0.muscache.com/im/pictures/hosting/Hosting-1496353845267245023/original/b4103f6e-2051-49cb-8453-ccfbb53b3df2.jpeg",
  "https://a0.muscache.com/im/pictures/hosting/Hosting-1496353845267245023/original/9cd1ae64-2e35-435c-a5a3-f8524a9d931a.jpeg",
  "https://a0.muscache.com/im/pictures/hosting/Hosting-1496353845267245023/original/cc6b886e-ae40-413a-8af1-b80901eb1ba3.jpeg",
  "https://a0.muscache.com/im/pictures/hosting/Hosting-1496353845267245023/original/a5c01fe0-c1b7-4c10-96e4-c12172fa70bb.jpeg",
  "https://a0.muscache.com/im/pictures/hosting/Hosting-1496353845267245023/original/0866d0ce-2734-4efd-a6b2-058496b05211.jpeg",
  "https://a0.muscache.com/im/pictures/hosting/Hosting-1496353845267245023/original/994ebf07-aebd-4386-9809-a763799a7a7e.jpeg",
  "https://a0.muscache.com/im/pictures/hosting/Hosting-1496353845267245023/original/7c77374c-bfbb-4051-9bd2-4cf289ba6559.jpeg",
  "https://a0.muscache.com/im/pictures/hosting/Hosting-1496353845267245023/original/c355a805-0ada-44de-bb98-a39f741ce1af.jpeg",
  "https://a0.muscache.com/im/pictures/hosting/Hosting-1496353845267245023/original/7d89911f-fd93-4821-97ac-e35805ba81c5.jpeg",
  "https://a0.muscache.com/im/pictures/hosting/Hosting-1496353845267245023/original/1890df9a-0345-4fc2-a22a-817a054f94ee.jpeg",
];

const COMMON_AMENITIES = [
  { "@type": "LocationFeatureSpecification", name: "Parcheggio privato incluso", value: true },
  { "@type": "LocationFeatureSpecification", name: "Accesso autonomo con cassetta sicurezza", value: true },
  { "@type": "LocationFeatureSpecification", name: "Aria condizionata e riscaldamento", value: true },
  { "@type": "LocationFeatureSpecification", name: "Lavatrice", value: true },
  { "@type": "LocationFeatureSpecification", name: "Cucina completamente attrezzata", value: true },
  { "@type": "LocationFeatureSpecification", name: "TV", value: true },
  { "@type": "LocationFeatureSpecification", name: "Vicinanza al mare - 200m dalla spiaggia", value: true },
];

const AdvancedSEOSchema = ({
  accommodationType = "default",
}: AdvancedSEOSchemaProps) => {
  const location = useLocation();
  const siteUrl = getSiteUrl();
  const currentUrl = `${siteUrl}${location.pathname}`;

  const isPineta8 = accommodationType === "pineta8";
  const propertyId = isPineta8 ? "pineta8" : "pineta3";
  const airbnbId = isPineta8 ? "1496353845267245023" : "1170325824706403059";
  const images = isPineta8 ? PINETA8_IMAGES : PINETA3_IMAGES;

  const pineta3ContainsPlace = [
    {
      "@type": "Accommodation",
      "@id": `${siteUrl}/pineta3#camera-matrimoniale`,
      name: "Camera matrimoniale",
      numberOfBedrooms: 1,
      numberOfBathroomsTotal: 1,
      occupancy: { "@type": "QuantitativeValue", maxValue: 2, unitText: "persons" },
      bed: { "@type": "BedDetails", numberOfBeds: 1, typeOfBed: "https://schema.org/KingBed" },
      amenityFeature: [
        { "@type": "LocationFeatureSpecification", name: "Aria condizionata", value: true },
        { "@type": "LocationFeatureSpecification", name: "Letto matrimoniale", value: true },
      ],
    },
    {
      "@type": "Accommodation",
      "@id": `${siteUrl}/pineta3#camera-singoli`,
      name: "Camera con letti singoli",
      numberOfBedrooms: 1,
      numberOfBathroomsTotal: 0,
      occupancy: { "@type": "QuantitativeValue", maxValue: 2, unitText: "persons" },
      bed: { "@type": "BedDetails", numberOfBeds: 2, typeOfBed: "https://schema.org/SingleBed" },
      amenityFeature: [
        { "@type": "LocationFeatureSpecification", name: "Aria condizionata", value: true },
        { "@type": "LocationFeatureSpecification", name: "Letti singoli", value: true },
      ],
    },
    {
      "@type": "Accommodation",
      "@id": `${siteUrl}/pineta3#soggiorno`,
      name: "Soggiorno con cucina",
      numberOfBedrooms: 0,
      numberOfBathroomsTotal: 0,
      occupancy: { "@type": "QuantitativeValue", maxValue: 4, unitText: "persons" },
      amenityFeature: [
        { "@type": "LocationFeatureSpecification", name: "Cucina attrezzata", value: true },
        { "@type": "LocationFeatureSpecification", name: "TV", value: true },
      ],
    },
  ];

  const pineta8ContainsPlace = [
    {
      "@type": "Accommodation",
      "@id": `${siteUrl}/pineta8#camera-matrimoniale`,
      name: "Camera matrimoniale con balcone",
      numberOfBedrooms: 1,
      numberOfBathroomsTotal: 1,
      occupancy: { "@type": "QuantitativeValue", maxValue: 2, unitText: "persons" },
      bed: { "@type": "BedDetails", numberOfBeds: 1, typeOfBed: "https://schema.org/KingBed" },
      amenityFeature: [
        { "@type": "LocationFeatureSpecification", name: "Aria condizionata", value: true },
        { "@type": "LocationFeatureSpecification", name: "Balcone", value: true },
      ],
    },
    {
      "@type": "Accommodation",
      "@id": `${siteUrl}/pineta8#camera-singoli`,
      name: "Camera con letti singoli",
      numberOfBedrooms: 1,
      numberOfBathroomsTotal: 0,
      occupancy: { "@type": "QuantitativeValue", maxValue: 2, unitText: "persons" },
      bed: { "@type": "BedDetails", numberOfBeds: 2, typeOfBed: "https://schema.org/SingleBed" },
      amenityFeature: [
        { "@type": "LocationFeatureSpecification", name: "Aria condizionata", value: true },
        { "@type": "LocationFeatureSpecification", name: "Letti singoli", value: true },
      ],
    },
    {
      "@type": "Accommodation",
      "@id": `${siteUrl}/pineta8#soggiorno`,
      name: "Soggiorno con cucina e balcone",
      numberOfBedrooms: 0,
      numberOfBathroomsTotal: 0,
      occupancy: { "@type": "QuantitativeValue", maxValue: 4, unitText: "persons" },
      amenityFeature: [
        { "@type": "LocationFeatureSpecification", name: "Cucina attrezzata", value: true },
        { "@type": "LocationFeatureSpecification", name: "Balcone", value: true },
        { "@type": "LocationFeatureSpecification", name: "TV", value: true },
      ],
    },
  ];

  const baseAccommodation = {
    "@context": "https://schema.org",
    "@type": "VacationRental",
    "@id": `${siteUrl}/${propertyId}#accommodation`,
    identifier: `${siteUrl}/${propertyId}`,
    name: isPineta8
      ? "Appartamento Pinarella con Balcone - Casa Vacanze Cervia"
      : "Appartamento Pinarella Prenotazione Diretta - Casa Vacanze Cervia",
    description: isPineta8
      ? "Appartamento al piano superiore con balcone a Pinarella di Cervia. Prenotazione diretta senza intermediari. 4 posti letto, parcheggio privato, 200m dal mare."
      : "Appartamento in affitto a Pinarella di Cervia con prenotazione diretta senza intermediari. 4 posti letto, parcheggio privato, 200m dal mare. Contatta il proprietario per risparmiare sulle commissioni.",
    url: currentUrl,
    image: images,
    address: {
      "@type": "PostalAddress",
      streetAddress: isPineta8 ? "Via Vallombrosa 8" : "Via Vallombrosa 10",
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
    containsPlace: isPineta8 ? pineta8ContainsPlace : pineta3ContainsPlace,
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
    amenityFeature: COMMON_AMENITIES,
    checkinTime: "T16:00",
    checkoutTime: "T10:00",
    numberOfBeds: 3,
    bed: [
      { "@type": "BedDetails", numberOfBeds: 1, typeOfBed: "https://schema.org/KingBed" },
      { "@type": "BedDetails", numberOfBeds: 2, typeOfBed: "https://schema.org/SingleBed" },
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
        reviewRating: { "@type": "Rating", ratingValue: 5, bestRating: 5 },
        author: { "@type": "Person", name: "Marco R." },
        reviewBody:
          "Appartamento perfetto per vacanze in famiglia a Pinarella. Prenotazione diretta molto conveniente, vicino al mare e molto pulito. Parcheggio incluso fantastico!",
        datePublished: "2024-08-15",
      },
      {
        "@type": "Review",
        reviewRating: { "@type": "Rating", ratingValue: 5, bestRating: 5 },
        author: { "@type": "Person", name: "Sofia M." },
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

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${siteUrl}/#business`,
    name: "Immerso nella Pineta - Affitti Vacanze Pinarella",
    description:
      "Affitti vacanze diretti a Pinarella di Cervia. Appartamenti con parcheggio privato, 200m dal mare. Prenotazione diretta senza intermediari per risparmiare.",
    url: siteUrl,
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
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "09:00",
      closes: "20:00",
    },
    priceRange: "€€",
    areaServed: {
      "@type": "City",
      name: "Pinarella di Cervia",
    },
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    name: "Immerso nella Pineta",
    url: siteUrl,
    logo: `${siteUrl}/images/logo.nobg.png`,
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
    </>
  );
};

export default AdvancedSEOSchema;
