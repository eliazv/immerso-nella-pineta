import React from "react";
import { Helmet } from "react-helmet";

interface MetaTagsProps {
  title: string;
  description: string;
  keywords?: string;
  canonicalUrl?: string;
  imageUrl?: string;
}

const MetaTags = ({
  title,
  description,
  keywords = "appartamento Pinarella prenotazione diretta, affitto appartamento Pinarella senza intermediari, casa vacanze Pinarella Cervia, alloggio Pinarella fronte mare, appartamento 4 persone Pinarella contatta proprietario, vacanze famiglia Pinarella senza commissioni, affitto settimanale Pinarella prenotazione diretta, appartamento vicino mare Cervia, casa vacanze Emilia Romagna prenotazione diretta, appartamento affitto pinarella, appartamento mare cervia, alloggio pinarella di cervia, vacanze cervia appartamento, affitto breve termine pinarella",
  canonicalUrl = "",
  imageUrl = "https://www.pinarellavillage.com/images/slider/1.jpg",
}: MetaTagsProps) => {
  const siteName = "Immerso nella Pineta - Appartamento a Pinarella di Cervia";
  const fullUrl = `https://immerso-nella-pineta.vercel.app${canonicalUrl}`;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      {/* Canonical URL */}
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:site_name" content={siteName} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={fullUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
    </Helmet>
  );
};

export default MetaTags;
