
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

type Image = {
  id: number;
  src: string;
  alt: string;
};

// Placeholder images for the gallery
const galleryImages: Image[] = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1200&h=800&auto=format&fit=crop",
    alt: "Soggiorno luminoso con divano e vista esterna"
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1200&h=800&auto=format&fit=crop",
    alt: "Cucina completamente attrezzata"
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?q=80&w=1200&h=800&auto=format&fit=crop",
    alt: "Camera da letto con letto matrimoniale"
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1564078516393-cf04bd966897?q=80&w=1200&h=800&auto=format&fit=crop",
    alt: "Bagno moderno con doccia"
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?q=80&w=1200&h=800&auto=format&fit=crop",
    alt: "Vicino mare di Pinarella"
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?q=80&w=1200&h=800&auto=format&fit=crop",
    alt: "Pineta di Cervia"
  }
];

interface PhotoGalleryProps {
  compact?: boolean;
  className?: string;
}

const PhotoGallery = ({ compact = false, className }: PhotoGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);
  const displayImages = compact ? galleryImages.slice(0, 3) : galleryImages;

  const openLightbox = (image: Image) => {
    setSelectedImage(image);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };

  const navigateImage = (direction: 'next' | 'prev') => {
    if (!selectedImage) return;
    
    const currentIndex = galleryImages.findIndex(img => img.id === selectedImage.id);
    let newIndex;
    
    if (direction === 'next') {
      newIndex = (currentIndex + 1) % galleryImages.length;
    } else {
      newIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
    }
    
    setSelectedImage(galleryImages[newIndex]);
  };

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
          <a href="/gallery" className="text-pine-dark hover:text-pine-dark/80 font-medium inline-flex items-center transition-colors">
            Vedi tutte le foto
            <ChevronRight className="h-4 w-4 ml-1" />
          </a>
        </div>
      )}

      {/* Lightbox */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <button
            className="absolute top-4 right-4 text-white/80 hover:text-white focus:outline-none z-10"
            onClick={closeLightbox}
          >
            <X className="h-8 w-8" />
          </button>
          
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white focus:outline-none z-10 bg-black/20 p-2 rounded-full"
            onClick={(e) => {
              e.stopPropagation();
              navigateImage('prev');
            }}
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          
          <img
            src={selectedImage.src}
            alt={selectedImage.alt}
            className="max-h-[90vh] max-w-[90vw] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white focus:outline-none z-10 bg-black/20 p-2 rounded-full"
            onClick={(e) => {
              e.stopPropagation();
              navigateImage('next');
            }}
          >
            <ChevronRight className="h-6 w-6" />
          </button>
          
          <div className="absolute bottom-4 left-0 right-0 text-center text-white/90">
            <p>{selectedImage.alt}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoGallery;
