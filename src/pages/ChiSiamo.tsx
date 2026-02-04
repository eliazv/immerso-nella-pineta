import React from "react";
import { Heart, Home, MapPin, Users, Star, MessageCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MetaTags from "@/components/MetaTags";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CONTACT_INFO } from "@/lib/contactConfig";
import WhatsAppFloating from "@/components/WhatsAppFloating";

const ChiSiamo = () => {
  const whatsappUrl = `https://wa.me/${CONTACT_INFO.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(CONTACT_INFO.whatsappMessage)}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: CONTACT_INFO.businessName,
    description:
      "Affitto appartamenti a Pinarella di Cervia gestiti direttamente dai proprietari. Prenotazione diretta senza intermediari.",
    owner: {
      "@type": "Person",
      name: CONTACT_INFO.ownerName,
    },
    telephone: CONTACT_INFO.phone,
    email: CONTACT_INFO.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: CONTACT_INFO.address.street,
      addressLocality: CONTACT_INFO.address.city,
      addressRegion: CONTACT_INFO.address.region,
      postalCode: CONTACT_INFO.address.postalCode,
      addressCountry: CONTACT_INFO.address.country,
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sage-50 to-white">
      <MetaTags
        title="Chi Siamo - Proprietari Appartamenti Pinarella | Gestione Diretta"
        description="Siamo Elia e famiglia, proprietari di appartamenti a Pinarella di Cervia. Gestiamo personalmente ogni prenotazione per garantirti la migliore esperienza, senza intermediari."
        keywords="proprietari pinarella, affitto diretto cervia, gestione privata appartamenti, elia zavatta pinarella"
        canonicalUrl="https://immerso-nella-pineta.vercel.app/chi-siamo"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Header />
      <WhatsAppFloating
        phoneNumber={CONTACT_INFO.phone}
        message={CONTACT_INFO.whatsappMessage}
      />

      <article className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-pine-dark mb-4">
            Siamo Elia e Famiglia
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            <strong>Proprietari diretti</strong> di appartamenti a Pinarella dal
            1970. Nessun intermediario, solo persone vere che amano la propria
            terra.
          </p>
        </div>

        {/* Foto Proprietari - PLACEHOLDER */}
        {/* <div className="mb-12 rounded-xl overflow-hidden shadow-lg">
          <div className="bg-gradient-to-br from-pine-light/20 to-sage-light/20 aspect-[16/9] flex items-center justify-center">
            <div className="text-center p-8">
              <Users className="h-24 w-24 mx-auto text-pine-dark/30 mb-4" />
              <p className="text-gray-500 italic">
                [INSERIRE FOTO FAMIGLIA/PROPRIETARI]
              </p>
            </div>
          </div>
        </div> */}

        {/* Storia */}
        <div className="prose prose-lg max-w-none mb-12">
          <h2 className="text-3xl font-serif text-pine-dark mb-6 flex items-center gap-3">
            <Home className="h-8 w-8" />
            La Nostra Storia
          </h2>

          <p className="text-gray-700 leading-relaxed mb-4">
            Siamo <strong>Elia Zavatta</strong> e famiglia. I nostri
            appartamenti a Pinarella non sono un business anonimo: sono le case
            dove abbiamo passato le nostre estati, dove conosciamo ogni angolo,
            ogni spiaggia, ogni gelateria.
          </p>

          <p className="text-gray-700 leading-relaxed mb-4">
            Nel <strong>1970, mio nonno</strong> ha costruito questa graziosa
            palazzetta immersa nella pineta di Pinarella. Da allora,{" "}
            <strong>gestiamo sempre noi</strong> gli affitti, mantenendo vivo lo
            spirito di accoglienza familiare che ci contraddistingue. Siamo
            orgogliosi di portare avanti questa tradizione da oltre 50 anni.
          </p>

          <p className="text-gray-700 leading-relaxed mb-4">
            Affittiamo questi appartamenti{" "}
            <strong>senza agenzie e senza intermediari</strong>. Perché? Perché
            vogliamo che chi viene da noi si senta a casa, non un numero in un
            portale.
          </p>

          <Card className="bg-pine-dark/5 border-pine-light my-8">
            <CardContent className="p-6">
              <p className="text-pine-dark font-medium italic text-lg">
                "Quando prenoti direttamente con noi, non stai solo affittando
                un appartamento. Stai entrando in contatto con chi questa zona
                la conosce davvero, e che sarà felice di consigliarti i posti
                migliori lontani dai soliti circuiti turistici."
              </p>
              <p className="text-right text-pine-600 mt-4">— Elia</p>
            </CardContent>
          </Card>
        </div>

        {/* Perché Sceglierci */}
        <div className="mb-12">
          <h2 className="text-3xl font-serif text-pine-dark mb-8 flex items-center gap-3">
            <Heart className="h-8 w-8 text-red-500" />
            Perché Prenotare Direttamente con Noi
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-pine-light/30">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-green-100 rounded-full p-3">
                    <span className="text-2xl">💰</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">
                      Risparmi Davvero
                    </h3>
                    <p className="text-gray-600">
                      Senza commissioni Booking o Airbnb,{" "}
                      <strong>risparmi il 15-20%</strong>. Prezzi diretti,
                      nessun sovrapprezzo.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-pine-light/30">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 rounded-full p-3">
                    <MessageCircle className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">
                      Contatto Umano
                    </h3>
                    <p className="text-gray-600">
                      Rispondiamo noi, <strong>non un call center</strong>. Hai
                      una domanda? WhatsApp, telefono o email diretta.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-pine-light/30">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-purple-100 rounded-full p-3">
                    <span className="text-2xl">🔑</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">
                      Massima Flessibilità
                    </h3>
                    <p className="text-gray-600">
                      Check-in/out personalizzati,{" "}
                      <strong>esigenze particolari</strong>? Parliamone
                      direttamente, troviamo la soluzione.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-pine-light/30">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-yellow-100 rounded-full p-3">
                    <MapPin className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">
                      Consigli Locali Veri
                    </h3>
                    <p className="text-gray-600">
                      Ti diamo una <strong>mappa personalizzata</strong> con i
                      nostri 15 posti preferiti che nessuna guida turistica ti
                      dirà mai.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Cosa Dicono i Nostri Ospiti */}
        <div className="mb-12">
          <h2 className="text-3xl font-serif text-pine-dark mb-8 flex items-center gap-3">
            <Star className="h-8 w-8 text-yellow-500" />
            Cosa Dicono i Nostri Ospiti
          </h2>

          <div className="space-y-6">
            <Card className="bg-gradient-to-br from-sage-50 to-white border-sage-light">
              <CardContent className="p-6">
                <div className="flex items-start gap-4 mb-3">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed italic mb-3">
                  "Ho soggiornato a Pinarella di Cervia per una settimana e mi
                  sono trovata davvero molto bene. La casa era ben fornita di
                  tutto il necessario e pulita. Si trova in una zona tranquilla
                  e comoda, a pochi passi dal mare e vicina a tutti i servizi
                  principali. I proprietari sono stati sempre molto disponibili
                  e gentili. Le istruzioni per il check-in e per l'utilizzo
                  della casa erano chiare e precise, il che ha reso tutto ancora
                  più semplice. Consiglio assolutamente questo alloggio!"
                </p>
                <p className="text-gray-500 text-sm">— Alice, Giugno 2025</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-sage-50 to-white border-sage-light">
              <CardContent className="p-6">
                <div className="flex items-start gap-4 mb-3">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed italic mb-3">
                  "Abbiamo soggiornato nell'appartamento di Elia e Romano e
                  l'esperienza è stata davvero ottima. La casa era pulitissima,
                  curata nei dettagli e ben attrezzata, con tutto il necessario
                  per un soggiorno confortevole. La posizione è un vero punto di
                  forza: immersa nel verde, tranquilla e con ampio parcheggio. A
                  soli 100 metri c'è un market super fornito, comodissimo. E in
                  poco più di 3 minuti a piedi si raggiunge il parco pineta e la
                  spiaggia. La casa è in una posizione strategica per visitare
                  la riviera: in mezz'ora si raggiungono facilmente Rimini e
                  Riccione."
                </p>
                <p className="text-gray-500 text-sm">— Riccardo, Maggio 2025</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-sage-50 to-white border-sage-light">
              <CardContent className="p-6">
                <div className="flex items-start gap-4 mb-3">
                  <div className="flex gap-1">
                    {[...Array(4)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed italic mb-3">
                  "Appartamento vicinissimo alla spiaggia, raggiungibile con una
                  breve passeggiata all'ombra dei pini marittimi. Molto comodo
                  il piccolo supermercato sul tragitto così come il posto auto
                  di pertinenza dell'appartamento. Lo stabile è sempre
                  ombreggiato dai pini e pranzare all'aperto nella zona esterna
                  è stato molto piacevole. Si trova in fondo ad una strada
                  chiusa, un posto quindi molto tranquillo e silenzioso. Un
                  piccolo e gradito dono per le bimbe ci ha accolto all'arrivo."
                </p>
                <p className="text-gray-500 text-sm">— Ilaria, Luglio 2025</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-sage-50 to-white border-sage-light">
              <CardContent className="p-6">
                <div className="flex items-start gap-4 mb-3">
                  <div className="flex gap-1">
                    {[...Array(4)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed italic mb-3">
                  "Soggiorno tranquillo, appartamento accogliente e pulito. Zona
                  immersa nel verde, tranquilla e a pochi passi dalla spiaggia."
                </p>
                <p className="text-gray-500 text-sm">
                  — Antonella, Settembre 2025
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-sage-50 to-white border-sage-light">
              <CardContent className="p-6">
                <div className="flex items-start gap-4 mb-3">
                  <div className="flex gap-1">
                    {[...Array(4)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed italic mb-3">
                  "Alloggio pulito e ordinato. Host gentili e disponibilissimi.
                  Il posto è vicinissimo a tutto quello che serve ed è comunque
                  in una zona molto tranquilla, quindi consiglio!"
                </p>
                <p className="text-gray-500 text-sm">— Manuel, Luglio 2025</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA Contatto */}
        <div className="bg-gradient-to-br from-pine-dark to-pine-600 rounded-xl p-8 text-center text-white">
          <h2 className="text-3xl font-serif mb-4">
            Vuoi Parlare Direttamente con Noi?
          </h2>
          <p className="text-pine-50 mb-6 max-w-xl mx-auto">
            Niente form complicati o email automatiche. Contattaci come
            preferisci:
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="bg-green-500 hover:bg-green-600 text-white"
            >
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-2 h-5 w-5" />
                WhatsApp
              </a>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="bg-white text-pine-dark hover:bg-gray-100"
            >
              <a href={`tel:${CONTACT_INFO.phone}`}>
                Chiama {CONTACT_INFO.phone}
              </a>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="bg-white text-pine-dark hover:bg-gray-100"
            >
              <a href={`mailto:${CONTACT_INFO.email}`}>Email</a>
            </Button>
          </div>
        </div>

        {/* Nota finale */}
        <div className="mt-12 text-center text-gray-600">
          <p className="italic">A presto a Pinarella! 🌲🌊</p>
          <p className="font-medium mt-2">Elia e famiglia</p>
        </div>
      </article>

      <Footer />
    </div>
  );
};

export default ChiSiamo;
