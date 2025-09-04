import React, { useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useAccommodation } from "@/contexts/AccommodationContext";
import { useLocation, Link } from "react-router-dom";

type Image = {
  id: number;
  src: string;
  alt: string;
};

// Gallery images for different accommodations
const galleryImagesData = {
  pineta3: [
    // SOGGIORNO
    {
      id: 1,
      src: "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTE3MDMyNTgyNDcwNjQwMzA1OQ==/original/70cdc17b-b1f7-462e-9751-c2071478d2ce.jpeg?q=80&w=1200&h=800&auto=format&fit=crop",
      alt: "Soggiorno luminoso appartamento a Pinarella di Cervia",
    },
    {
      id: 9,
      src: "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTE3MDMyNTgyNDcwNjQwMzA1OQ==/original/34e3c56b-d643-4d2f-9e52-40aa4647cac3.jpeg?q=80&w=1200&h=800&auto=format&fit=crop",
      alt: "Cucina completa attrezzata appartamento Pinarella di Cervia",
    },
    {
      id: 8,
      src: "https://a0.muscache.com/im/pictures/hosting/Hosting-1170325824706403059/original/13f80286-d183-42c2-84a7-c4b45c123c85.jpeg?q=80&w=1200&h=800&auto=format&fit=crop",
      alt: "Divano e tavolo da pranzo appartamento in affitto Pinarella di Cervia",
    },

    // CAMERE DA LETTO
    {
      id: 3,
      src: "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTE3MDMyNTgyNDcwNjQwMzA1OQ==/original/45d7a05d-bfcb-403b-86cf-5a43aeeead4d.jpeg?q=80&w=1200&h=800&auto=format&fit=crop",
      alt: "Camera da letto appartamento in affitto Pinarella di Cervia",
    },
    {
      id: 7,
      src: "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTE3MDMyNTgyNDcwNjQwMzA1OQ==/original/01b0f8f4-5330-4853-bf2d-5d72d8d16cc5.jpeg?q=80&w=1200&h=800&auto=format&fit=crop",
      alt: "Seconda camera da letto appartamento affitto Pinarella di Cervia",
    },
    // BAGNO
    {
      id: 4,
      src: "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTE3MDMyNTgyNDcwNjQwMzA1OQ==/original/66929108-72b5-4dab-a35d-0c3c28680943.jpeg?q=80&w=1200&h=800&auto=format&fit=crop",
      alt: "Bagno con doccia appartamento Pinarella di Cervia",
    },
    // ESTERNI E AMBIENTE
    {
      id: 10,
      src: "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTE3MDMyNTgyNDcwNjQwMzA1OQ==/original/1fd1ceeb-47d2-4ce1-a166-18c7147b3709.jpeg?q=80&w=1200&h=800&auto=format&fit=crop",
      alt: "Cortile esterno con zona pranzo all'aperto appartamento Pinarella",
    },
    {
      id: 12,
      src: "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTE3MDMyNTgyNDcwNjQwMzA1OQ==/original/b938ef34-e209-4ba2-a3ae-19da60030748.jpeg?q=80&w=1200&h=800&auto=format&fit=crop",
      alt: "Strada tranquilla dell'appartamento in affitto Pinarella di Cervia",
    },
    {
      id: 6,
      src: "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTE3MDMyNTgyNDcwNjQwMzA1OQ==/original/d0896c17-b5d9-48b7-bf98-9d2aba92f7f8.jpeg?q=80&w=1200&h=800&auto=format&fit=crop",
      alt: "Pineta di Pinarella di Cervia vicino all'appartamento",
    },
    {
      id: 5,
      src: "https://www.discovercervia.com/cervia/territorio-localita/pinarella/568/image-thumb__568__thumb800/PINETA%20AEREA%20GRANDE_slide_pinarella-di-cervia-Mattia%20Lumini.a288ca8a.jpg?q=80&w=1200&h=800&auto=format&fit=crop",
      alt: "Spiaggia di Pinarella di Cervia vicino all'appartamento",
    },
    // IDENTIFICAZIONE
    {
      id: 11,
      src: "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTE3MDMyNTgyNDcwNjQwMzA1OQ==/original/a2559d72-0bca-4c53-bf21-5915d8512fa9.jpeg?q=80&w=1200&h=800&auto=format&fit=crop",
      alt: "Targhetta appartamento in affitto Pinarella di Cervia",
    },
  ],
  pineta8: [
    // BALCONE (immagine principale)
    {
      id: 1,
      src: "https://a0.muscache.com/im/pictures/hosting/Hosting-1496353845267245023/original/b4103f6e-2051-49cb-8453-ccfbb53b3df2.jpeg?im_w=480",
      alt: "Balcone con vista pineta appartamento secondo piano Pinarella di Cervia",
    },
    // SOGGIORNO
    {
      id: 2,
      src: "https://a0.muscache.com/im/pictures/hosting/Hosting-1496353845267245023/original/9cd1ae64-2e35-435c-a5a3-f8524a9d931a.jpeg?im_w=480",
      alt: "Soggiorno luminoso appartamento 6 posti letto Pinarella di Cervia",
    },
    {
      id: 3,
      src: "https://a0.muscache.com/im/pictures/hosting/Hosting-1496353845267245023/original/cc6b886e-ae40-413a-8af1-b80901eb1ba3.jpeg?im_w=480",
      alt: "Soggiorno con divano appartamento secondo piano Pinarella",
    },
    {
      id: 4,
      src: "https://a0.muscache.com/im/pictures/hosting/Hosting-1496353845267245023/original/a5c01fe0-c1b7-4c10-96e4-c12172fa70bb.jpeg?im_w=480",
      alt: "Area pranzo soggiorno appartamento Pinarella di Cervia",
    },
    // CUCINA
    {
      id: 5,
      src: "https://a0.muscache.com/im/pictures/hosting/Hosting-1496353845267245023/original/0866d0ce-2734-4efd-a6b2-058496b05211.jpeg?im_w=480",
      alt: "Cucina attrezzata appartamento 6 posti letto Pinarella",
    },
    {
      id: 6,
      src: "https://a0.muscache.com/im/pictures/hosting/Hosting-1496353845267245023/original/994ebf07-aebd-4386-9809-a763799a7a7e.jpeg?im_w=480",
      alt: "Cucina completa con forno appartamento Pinarella di Cervia",
    },
    // CAMERE DA LETTO
    {
      id: 7,
      src: "https://a0.muscache.com/im/pictures/hosting/Hosting-1496353845267245023/original/7c77374c-bfbb-4051-9bd2-4cf289ba6559.jpeg?im_w=480",
      alt: "Prima camera da letto matrimoniale appartamento Pinarella",
    },
    {
      id: 8,
      src: "https://a0.muscache.com/im/pictures/hosting/Hosting-1496353845267245023/original/c355a805-0ada-44de-bb98-a39f741ce1af.jpeg?im_w=480",
      alt: "Seconda camera da letto con letto matrimoniale e singolo Pinarella",
    },
    // BAGNO
    {
      id: 9,
      src: "https://a0.muscache.com/im/pictures/hosting/Hosting-1496353845267245023/original/7d89911f-fd93-4821-97ac-e35805ba81c5.jpeg?im_w=480",
      alt: "Bagno completo con doccia appartamento secondo piano Pinarella",
    },
    // BALCONE ESTERNO
    {
      id: 10,
      src: "https://a0.muscache.com/im/pictures/hosting/Hosting-1496353845267245023/original/1890df9a-0345-4fc2-a22a-817a054f94ee.jpeg?im_w=480",
      alt: "Balcone arredato con sedie e tavolo appartamento Pinarella",
    },
    // AMBIENTE GENERALE (foto comuni)
    {
      id: 11,
      src: "https://www.discovercervia.com/cervia/territorio-localita/pinarella/568/image-thumb__568__thumb800/PINETA%20AEREA%20GRANDE_slide_pinarella-di-cervia-Mattia%20Lumini.a288ca8a.jpg?q=80&w=1200&h=800&auto=format&fit=crop",
      alt: "Spiaggia di Pinarella di Cervia vicino all'appartamento",
    },
  ]
};

interface PhotoGalleryProps {
  compact?: boolean;
  className?: string;
}

const PhotoGallery = ({ compact = false, className }: PhotoGalleryProps) => {
  const { accommodation } = useAccommodation();
  const location = useLocation();
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);
  const [imageLoading, setImageLoading] = useState(false);
  
  const galleryImages = galleryImagesData[accommodation.id as keyof typeof galleryImagesData] || galleryImagesData.pineta3;
  const displayImages = compact ? galleryImages.slice(0, 3) : galleryImages;
  
  const getBasePath = () => {
    if (location.pathname.startsWith('/pineta8')) return '/pineta8';
    if (location.pathname.startsWith('/pineta3')) return '/pineta3';
    return '/';
  };

  const openLightbox = (image: Image) => {
    setImageLoading(true);
    setSelectedImage(image);
    document.body.style.overflow = "hidden";
    // Preload next and previous images for smoother navigation
    const currentIndex = galleryImages.findIndex((img) => img.id === image.id);
    const nextIndex = (currentIndex + 1) % galleryImages.length;
    const prevIndex =
      (currentIndex - 1 + galleryImages.length) % galleryImages.length;

    // Create image elements to preload
    const preloadNext = new Image();
    const preloadPrev = new Image();
    preloadNext.src = galleryImages[nextIndex].src;
    preloadPrev.src = galleryImages[prevIndex].src;
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = "auto";
  };

  const navigateImage = useCallback(
    (direction: "next" | "prev") => {
      if (!selectedImage) return;

      const currentIndex = galleryImages.findIndex(
        (img) => img.id === selectedImage.id
      );
      let newIndex;

      if (direction === "next") {
        newIndex = (currentIndex + 1) % galleryImages.length;
      } else {
        newIndex =
          (currentIndex - 1 + galleryImages.length) % galleryImages.length;
      }

      setImageLoading(true);
      setSelectedImage(galleryImages[newIndex]);
    },
    [selectedImage]
  );

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedImage) return;

      switch (e.key) {
        case "ArrowLeft":
          e.preventDefault();
          navigateImage("prev");
          break;
        case "ArrowRight":
          e.preventDefault();
          navigateImage("next");
          break;
        case "Escape":
          e.preventDefault();
          closeLightbox();
          break;
        default:
          break;
      }
    };

    if (selectedImage) {
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [selectedImage, navigateImage]);

  return (
    <div className={cn("w-full", className)}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {displayImages.map((image) => (
          <div
            key={image.id}
            className="relative overflow-hidden rounded-lg group aspect-[4/3]"
            onClick={() => openLightbox(image)}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
              <p className="text-white text-sm font-medium">{image.alt}</p>
            </div>
          </div>
        ))}
      </div>

      {compact && (
        <div className="mt-4 text-center">
          <Link
            to={`${getBasePath()}/gallery`}
            className="text-pine-dark hover:text-pine-dark/80 font-medium inline-flex items-center transition-colors"
          >
            Vedi tutte le foto
            <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
      )}

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 animate-in fade-in duration-300"
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button
            className="absolute top-4 right-4 text-white/80 hover:text-white focus:outline-none z-20 bg-black/30 hover:bg-black/50 p-3 rounded-full transition-all duration-200 backdrop-blur-sm"
            onClick={closeLightbox}
            aria-label="Chiudi galleria"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Previous button */}
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white focus:outline-none z-20 bg-black/30 hover:bg-black/50 p-3 rounded-full transition-all duration-200 backdrop-blur-sm hover:scale-110"
            onClick={(e) => {
              e.stopPropagation();
              navigateImage("prev");
            }}
            aria-label="Immagine precedente"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          {/* Main image container */}
          <div className="relative max-h-[85vh] max-w-[90vw] flex items-center justify-center">
            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="max-h-full max-w-full object-contain rounded-lg shadow-2xl animate-in zoom-in-95 duration-300"
              onClick={(e) => e.stopPropagation()}
              onLoad={() => setImageLoading(false)}
              onError={() => setImageLoading(false)}
            />

            {/* Image loading spinner */}
            {imageLoading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white opacity-50"></div>
              </div>
            )}
          </div>

          {/* Next button */}
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white focus:outline-none z-20 bg-black/30 hover:bg-black/50 p-3 rounded-full transition-all duration-200 backdrop-blur-sm hover:scale-110"
            onClick={(e) => {
              e.stopPropagation();
              navigateImage("next");
            }}
            aria-label="Immagine successiva"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Image info and navigation dots */}
          <div className="absolute bottom-4 left-0 right-0 text-center text-white/90">
            <div className="bg-black/30 backdrop-blur-sm rounded-lg p-4 max-w-md mx-auto">
              <p className="text-sm font-medium mb-2">{selectedImage.alt}</p>

              {/* Navigation dots */}
              <div className="flex justify-center space-x-2">
                {galleryImages.map((img, index) => (
                  <button
                    key={img.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      setImageLoading(true);
                      setSelectedImage(img);
                    }}
                    className={`w-2 h-2 rounded-full transition-all duration-200 ${
                      img.id === selectedImage.id
                        ? "bg-white scale-125"
                        : "bg-white/50 hover:bg-white/70"
                    }`}
                    aria-label={`Vai all'immagine ${index + 1}`}
                  />
                ))}
              </div>

              {/* Image counter */}
              <p className="text-xs text-white/70 mt-2">
                {galleryImages.findIndex((img) => img.id === selectedImage.id) +
                  1}{" "}
                di {galleryImages.length}
              </p>
            </div>
          </div>

          {/* Keyboard hints */}
          <div className="absolute top-4 left-4 text-white/60 text-xs bg-black/30 backdrop-blur-sm rounded-lg p-2">
            <p>← → Naviga • ESC Chiudi</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoGallery;
