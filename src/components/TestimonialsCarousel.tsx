import React, { useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";

interface Review {
  rating: number;
  text: string;
  author: string;
  date: string;
}

const reviews: Review[] = [
  {
    rating: 5,
    text: "Ho soggiornato a Pinarella di Cervia per una settimana e mi sono trovata davvero molto bene. La casa era ben fornita di tutto il necessario e pulita. Si trova in una zona tranquilla e comoda, a pochi passi dal mare e vicina a tutti i servizi principali. I proprietari sono stati sempre molto disponibili e gentili. Le istruzioni per il check-in e per l'utilizzo della casa erano chiare e precise, il che ha reso tutto ancora più semplice. Consiglio assolutamente questo alloggio!",
    author: "Alice",
    date: "Giugno 2025",
  },
  {
    rating: 5,
    text: "Abbiamo soggiornato nell'appartamento di Elia e Romano e l'esperienza è stata davvero ottima. La casa era pulitissima, curata nei dettagli e ben attrezzata, con tutto il necessario per un soggiorno confortevole. La posizione è un vero punto di forza: immersa nel verde, tranquilla e con ampio parcheggio. A soli 100 metri c'è un market super fornito, comodissimo. E in poco più di 3 minuti a piedi si raggiunge il parco pineta e la spiaggia.",
    author: "Riccardo",
    date: "Maggio 2025",
  },
  {
    rating: 4,
    text: "Appartamento vicinissimo alla spiaggia, raggiungibile con una breve passeggiata all'ombra dei pini marittimi. Molto comodo il piccolo supermercato sul tragitto così come il posto auto di pertinenza dell'appartamento. Lo stabile è sempre ombreggiato dai pini e pranzare all'aperto nella zona esterna è stato molto piacevole. Si trova in fondo ad una strada chiusa, un posto quindi molto tranquillo e silenzioso.",
    author: "Ilaria",
    date: "Luglio 2025",
  },
  {
    rating: 5,
    text: "Posto accogliente e ben organizzato, a 5 minuti a piedi dalla spiaggia. Proprietari molto disponibili e presenti per qualsiasi necessità. L'appartamento è esattamente come descritto: pulito, funzionale e dotato di tutto. La zona è tranquilla, ideale per famiglie. Supermercato a due passi. Il parcheggio privato è comodissimo. Torneremo sicuramente!",
    author: "Marco",
    date: "Agosto 2025",
  },
  {
    rating: 5,
    text: "Esperienza molto positiva! L'appartamento è perfetto per una vacanza rilassante: spazioso, luminoso e fresco anche d'estate grazie all'ombra dei pini. La cucina è ben attrezzata, il bagno moderno con lavatrice. Elia è stato gentilissimo e super disponibile, ha risposto a tutte le nostre domande in pochi minuti. Consigliatissimo per chi cerca tranquillità e vicinanza al mare!",
    author: "Francesca",
    date: "Settembre 2025",
  },
];

interface TestimonialsCarouselProps {
  className?: string;
}

const TestimonialsCarousel: React.FC<TestimonialsCarouselProps> = ({
  className = "",
}) => {
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: false }),
  );

  return (
    <div className={`w-full ${className}`}>
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        plugins={[plugin.current]}
        className="w-full"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {reviews.map((review, index) => (
            <CarouselItem
              key={index}
              className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3"
            >
              <Card className="bg-gradient-to-br from-sage-50 to-white border-sage-light h-full">
                <CardContent className="p-6 flex flex-col h-full">
                  {/* Rating */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < review.rating
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>

                  {/* Review Text */}
                  <p className="text-gray-700 leading-relaxed italic mb-4 flex-grow text-sm md:text-base">
                    "{review.text}"
                  </p>

                  {/* Author */}
                  <p className="text-gray-500 text-sm font-medium">
                    — {review.author}, {review.date}
                  </p>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex -left-4 lg:-left-12 bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg border-2 border-pine-light/50 hover:border-pine-dark transition-all" />
        <CarouselNext className="hidden md:flex -right-4 lg:-right-12 bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg border-2 border-pine-light/50 hover:border-pine-dark transition-all" />
      </Carousel>
    </div>
  );
};

export default TestimonialsCarousel;
