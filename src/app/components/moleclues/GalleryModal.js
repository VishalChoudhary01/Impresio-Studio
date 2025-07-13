import React from 'react';
import Image from 'next/image';
import { MdClose, MdChevronLeft, MdChevronRight } from 'react-icons/md';

const GalleryModal = ({ images, currentIndex, onClose, onNext, onPrev }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
      <div className="relative max-w-6xl w-full max-h-[90vh]">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-white text-2xl z-10 bg-black/50 rounded-full p-2 hover:bg-black/80"
          aria-label="Close gallery"
        >
          <MdClose />
        </button>
        
        <button 
          onClick={onPrev}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-2xl z-10 bg-black/50 rounded-full p-2 hover:bg-black/80"
          aria-label="Previous image"
        >
          <MdChevronLeft size={28} />
        </button>
        
        <button 
          onClick={onNext}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-2xl z-10 bg-black/50 rounded-full p-2 hover:bg-black/80"
          aria-label="Next image"
        >
          <MdChevronRight size={28} />
        </button>
        
        <div className="relative w-full h-full aspect-[4/3]">
          <Image 
            src={images[currentIndex]} 
            alt={`Gallery image ${currentIndex + 1}`} 
            fill
            className="object-contain"
            sizes="(max-width: 768px) 90vw, 80vw"
          />
        </div>
        
        <div className="absolute bottom-4 left-0 right-0 text-center text-white text-sm">
          {currentIndex + 1} of {images.length}
        </div>
      </div>
    </div>
  );
};

export default GalleryModal;