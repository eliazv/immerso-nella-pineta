import React from "react";
import { getSiteUrl } from "@/lib/config";

interface LocalSEOProps {
  pageName?: string;
}

const LocalSEO = ({ pageName = "Homepage" }: LocalSEOProps) => {
  const siteUrl = getSiteUrl();
  const currentPath =
    typeof window !== "undefined" ? window.location.pathname : "";

  // Local Business Schema for Google My Business
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "TouristAccommodation",
    "@id": `${siteUrl}/#localbusiness`,
    name: "Immerso nella Pineta - Appartamenti Vacanze Pinarella",
    description:
      "Appartamenti in affitto per vacanze a Pinarella di Cervia. Prenotazione diretta senza intermediari, parcheggio privato incluso, 200m dal mare.",
    url: siteUrl,
    telephone: "+393938932793",
    email: "zavattaelia@gmail.com",
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
    openingHoursSpecification: [
      {
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
    ],
    priceRange: "€€",
    paymentAccepted: "Cash, Credit Card, Bank Transfer",
    currenciesAccepted: "EUR",
    areaServed: {
      "@type": "City",
      name: "Pinarella di Cervia",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Emilia-Romagna",
      },
    },
    availableLanguage: ["Italian", "English"],
    amenityFeature: [
      {
        "@type": "LocationFeatureSpecification",
        name: "Private Parking",
        value: true,
      },
      {
        "@type": "LocationFeatureSpecification",
        name: "Air Conditioning",
        value: true,
      },
      {
        "@type": "LocationFeatureSpecification",
        name: "Kitchen",
        value: true,
      },
      {
        "@type": "LocationFeatureSpecification",
        name: "Washing Machine",
        value: true,
      },
      {
        "@type": "LocationFeatureSpecification",
        name: "Beach Access",
        value: true,
      },
    ],
    checkinTime: "16:00",
    checkoutTime: "10:00",
    petsAllowed: true,
    smokingAllowed: false,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: 4.8,
      reviewCount: 15,
      bestRating: 5,
    },
    review: [
      {
        "@type": "Review",
        author: {
          "@type": "Person",
          name: "Marco Rossi",
        },
        datePublished: "2024-08-15",
        reviewBody:
          "Appartamento fantastico a Pinarella! Prenotazione diretta conveniente, parcheggio incluso e vicinissimo al mare. Proprietario molto disponibile.",
        reviewRating: {
          "@type": "Rating",
          ratingValue: 5,
          bestRating: 5,
        },
      },
      {
        "@type": "Review",
        author: {
          "@type": "Person",
          name: "Sofia Martini",
        },
        datePublished: "2024-07-22",
        reviewBody:
          "Prenotando direttamente abbiamo risparmiato tanto! Appartamento pulito, ben attrezzato e in posizione perfetta per le vacanze a Cervia.",
        reviewRating: {
          "@type": "Rating",
          ratingValue: 5,
          bestRating: 5,
        },
      },
      {
        "@type": "Review",
        author: {
          "@type": "Person",
          name: "Luca Bianchi",
        },
        datePublished: "2024-06-10",
        reviewBody:
          "Casa vacanze ideale per famiglie. Bambini felici, genitori rilassati. Prenotazione diretta senza commissioni è un grande vantaggio!",
        reviewRating: {
          "@type": "Rating",
          ratingValue: 5,
          bestRating: 5,
        },
      },
    ],
    sameAs: [
      "https://www.facebook.com/immersonellapineta",
      "https://www.instagram.com/immersonellapineta",
    ],
    hasMap: "https://maps.google.com/?q=44.261434,12.339165",
    isAccessibleForFree: false,
    maximumAttendeeCapacity: 4,
    tourBookingPage: `${siteUrl}/book`,
  };

  // WebPage Schema for better page understanding
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${siteUrl}${currentPath}#webpage`,
    url: `${siteUrl}${currentPath}`,
    name: `${pageName} - Appartamenti Vacanze Pinarella di Cervia`,
    description:
      "Appartamenti in affitto per vacanze a Pinarella di Cervia con prenotazione diretta. Parcheggio privato, 200m dal mare, senza commissioni intermediari.",
    inLanguage: "it-IT",
    isPartOf: {
      "@type": "WebSite",
      "@id": `${siteUrl}#website`,
      url: siteUrl,
      name: "Immerso nella Pineta",
      description:
        "Appartamenti vacanze Pinarella di Cervia - Prenotazione diretta",
      publisher: {
        "@type": "Person",
        name: "Elia Zavatta",
        "@id": `${siteUrl}#owner`,
      },
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${siteUrl}/search?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    },
    about: {
      "@type": "Thing",
      name: "Appartamenti vacanze Pinarella di Cervia",
    },
    mentions: [
      {
        "@type": "Place",
        name: "Pinarella di Cervia",
      },
      {
        "@type": "Place",
        name: "Pineta di Cervia",
      },
      {
        "@type": "Thing",
        name: "Prenotazione diretta",
      },
      {
        "@type": "Thing",
        name: "Casa vacanze",
      },
    ],
  };

  return (
    <>
      {/* Local Business Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema),
        }}
      />

      {/* WebPage Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
    </>
  );
};

export default LocalSEO;
