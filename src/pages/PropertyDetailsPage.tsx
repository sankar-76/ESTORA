import { useState, useEffect, useMemo } from 'react';
import { Icon } from '../components/Icon';
import { SAMPLE_PROPERTIES } from '../data/properties';
import { PropertyCard } from '../components/PropertyCard';

export const PropertyDetailsPage = ({ slug, navigate, onToggleSave, savedIds, onToggleCompare, compareIds }) => {
  const property = SAMPLE_PROPERTIES.find((p) => p.slug === slug) || SAMPLE_PROPERTIES[0];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const isSaved = savedIds.includes(property.id);
  const isCompared = compareIds.includes(property.id);

  // Similar Properties
  const similarProperties = useMemo(() => {
    return SAMPLE_PROPERTIES.filter(
      (p) => p.id !== property.id && (p.city === property.city || p.category === property.category)
    ).slice(0, 3);
  }, [property]);

  // Keyboard accessibility for Lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!lightboxOpen) return;
      if (e.key === 'Escape') setLightboxOpen(false);
      if (e.key === 'ArrowRight') {
        setActiveImageIndex((prev) => (prev + 1) % property.images.length);
      }
      if (e.key === 'ArrowLeft') {
        setActiveImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, property.images.length]);

  return (
    <div className="pt-24 pb-24 animate-fade-in">
      {/* BREADCRUMB NAV */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 text-xs text-[#76736E] flex items-center space-x-2">
        <button onClick={() => navigate('/')} className="hover:text-[#181817]">Home</button>
        <span>/</span>
        <button onClick={() => navigate('/properties')} className="hover:text-[#181817]">Properties</button>
        <span>/</span>
        <span className="text-[#181817] font-medium truncate">{property.name}</span>
      </div>

      {/* HERO GALLERY DISPLAY */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-4 my-6">
        <div
          onClick={() => setLightboxOpen(true)}
          className="lg:col-span-8 relative aspect-[16/10] overflow-hidden cursor-pointer group bg-black"
        >
          <img
            src={property.images[activeImageIndex] || property.heroImage}
            alt={property.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1.5 text-white text-[11px] uppercase tracking-widest flex items-center space-x-2">
            <Icon name="sparkles" className="w-3.5 h-3.5 text-[#9A7B56]" />
            <span>Click to Expand Fullscreen Gallery</span>
          </div>
        </div>

        {/* THUMBNAILS COLUMN */}
        <div className="lg:col-span-4 grid grid-cols-2 lg:grid-cols-1 gap-4">
          {property.images.slice(0, 3).map((imgUrl, idx) => (
            <div
              key={idx}
              onClick={() => setActiveImageIndex(idx)}
              className={`relative aspect-[16/9] overflow-hidden cursor-pointer border-2 transition-all ${
                activeImageIndex === idx ? "border-[#9A7B56]" : "border-transparent opacity-70 hover:opacity-100"
              }`}
            >
              <img src={imgUrl} alt={`${property.name} ${idx}`} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </div>

      {/* MAIN DETAILS & STICKY SIDEBAR GRID */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 mt-12">
        {/* LEFT MAIN CONTENT */}
        <div className="lg:col-span-8 space-y-10">
          {/* TITLE & PRICE HEADER */}
          <div className="border-b border-[#E2DDD3] pb-8 space-y-3">
            <div className="flex flex-wrap items-center gap-3">
              <span className="px-3 py-1 bg-[#9A7B56] text-white text-[10px] uppercase tracking-widest font-semibold">
                {property.listingType}
              </span>
              <span className="px-3 py-1 bg-[#181817] text-white text-[10px] uppercase tracking-widest font-semibold">
                Ref ID: EST-{property.id.toUpperCase()}
              </span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl font-light text-[#181817]">
              {property.name}
            </h1>
            <div className="flex items-center text-xs text-[#76736E] space-x-2">
              <Icon name="location" className="w-4 h-4 text-[#9A7B56]" />
              <span className="uppercase tracking-widest">{property.location} • {property.country}</span>
            </div>
            <div className="pt-2">
              <span className="font-serif text-3xl font-bold text-[#181817]">
                {property.priceFormatted}
              </span>
            </div>
          </div>

          {/* SPECS GRID */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 bg-[#FCFBF9] border border-[#E2DDD3] text-center text-xs">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-[#76736E] block mb-1">Bedrooms</span>
              <span className="font-serif text-2xl font-bold text-[#181817]">{property.bedrooms}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-widest text-[#76736E] block mb-1">Bathrooms</span>
              <span className="font-serif text-2xl font-bold text-[#181817]">{property.bathrooms}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-widest text-[#76736E] block mb-1">Total Area</span>
              <span className="font-serif text-2xl font-bold text-[#181817]">{property.areaSqFt.toLocaleString()} sq ft</span>
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-widest text-[#76736E] block mb-1">Category</span>
              <span className="font-serif text-lg font-medium text-[#181817]">{property.category}</span>
            </div>
          </div>

          {/* DESCRIPTION */}
          <div className="space-y-4">
            <h3 className="font-serif text-2xl text-[#181817] border-b border-[#E2DDD3] pb-2">
              Architectural Overview
            </h3>
            <p className="text-sm text-[#76736E] leading-relaxed font-light">
              {property.description}
            </p>
          </div>

          {/* KEY FEATURES */}
          {property.keyFeatures && (
            <div className="space-y-4">
              <h3 className="font-serif text-2xl text-[#181817] border-b border-[#E2DDD3] pb-2">
                Architectural Highlights
              </h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-[#76736E]">
                {property.keyFeatures.map((feat, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <Icon name="check" className="w-4 h-4 text-[#9A7B56] shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* AMENITIES */}
          <div className="space-y-4">
            <h3 className="font-serif text-2xl text-[#181817] border-b border-[#E2DDD3] pb-2">
              Estate Amenities
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs text-[#181817]">
              {property.amenities.map((amenity, idx) => (
                <div key={idx} className="p-3 bg-[#F7F5F0] border border-[#E2DDD3] flex items-center space-x-2">
                  <Icon name="sparkles" className="w-3.5 h-3.5 text-[#9A7B56]" />
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT STICKY INQUIRY PANEL */}
        <div className="lg:col-span-4">
          <div className="sticky top-28 bg-[#FCFBF9] border border-[#E2DDD3] p-6 sm:p-8 space-y-6 shadow-xl">
            <div className="border-b border-[#E2DDD3] pb-4 space-y-1">
              <span className="text-[10px] uppercase tracking-widest text-[#76736E]">Official Listing Price</span>
              <p className="font-serif text-3xl font-bold text-[#181817]">{property.priceFormatted}</p>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => navigate(`/schedule-viewing?propertyId=${property.id}`)}
                className="w-full py-4 bg-[#9A7B56] text-white text-xs uppercase tracking-[0.2em] font-semibold hover:bg-[#836746] transition-colors shadow-md"
              >
                Schedule Private Viewing
              </button>

              <button
                onClick={() => navigate('/contact')}
                className="w-full py-4 bg-[#181817] text-[#F7F5F0] text-xs uppercase tracking-[0.2em] font-semibold hover:bg-black transition-colors"
              >
                Inquire With Advisor
              </button>

              <div className="grid grid-cols-2 gap-2 pt-2">
                <button
                  onClick={() => onToggleSave(property)}
                  className={`py-3 px-2 border border-[#E2DDD3] text-xs flex items-center justify-center space-x-1.5 transition-colors ${
                    isSaved ? "bg-rose-50 text-rose-700 border-rose-200" : "hover:bg-[#F7F5F0]"
                  }`}
                >
                  <Icon name={isSaved ? "heartFilled" : "heart"} className="w-4 h-4" />
                  <span>{isSaved ? "Saved" : "Save"}</span>
                </button>

                <button
                  onClick={() => onToggleCompare(property)}
                  className={`py-3 px-2 border border-[#E2DDD3] text-xs flex items-center justify-center space-x-1.5 transition-colors ${
                    isCompared ? "bg-amber-50 text-[#9A7B56] border-amber-200" : "hover:bg-[#F7F5F0]"
                  }`}
                >
                  <Icon name="compare" className="w-4 h-4" />
                  <span>{isCompared ? "Comparing" : "Compare"}</span>
                </button>
              </div>
            </div>

            <div className="pt-4 border-t border-[#E2DDD3] text-[11px] text-[#76736E] space-y-2">
              <div className="flex items-center space-x-2">
                <Icon name="shield" className="w-4 h-4 text-[#9A7B56]" />
                <span>Verified Architectural Title</span>
              </div>
              <p className="font-light">Demonstration inquiry system. Requests are saved locally.</p>
            </div>
          </div>
        </div>
      </div>

      {/* SIMILAR PROPERTIES SECTION */}
      {similarProperties.length > 0 && (
        <div className="max-w-7xl mx-auto px-6 md:px-12 pt-24 border-t border-[#E2DDD3] mt-24">
          <h2 className="font-serif text-3xl font-light text-[#181817] mb-8">
            Similar Residences in Portfolio
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {similarProperties.map((prop) => (
              <PropertyCard
                key={prop.id}
                property={prop}
                navigate={navigate}
                isSaved={savedIds.includes(prop.id)}
                onToggleSave={onToggleSave}
                isCompared={compareIds.includes(prop.id)}
                onToggleCompare={onToggleCompare}
              />
            ))}
          </div>
        </div>
      )}

      {/* LIGHTBOX MODAL */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 text-white flex flex-col justify-between p-6 animate-fade-in">
          <div className="flex justify-between items-center text-xs">
            <span className="uppercase tracking-widest text-amber-200">
              {property.name} — Image {activeImageIndex + 1} of {property.images.length}
            </span>
            <button
              onClick={() => setLightboxOpen(false)}
              className="p-2 hover:text-[#9A7B56]"
            >
              <Icon name="close" className="w-8 h-8" />
            </button>
          </div>

          <div className="relative flex-1 flex items-center justify-center my-4">
            <img
              src={property.images[activeImageIndex]}
              alt="Gallery Fullscreen"
              className="max-h-[80vh] max-w-full object-contain shadow-2xl"
            />

            <button
              onClick={() => setActiveImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length)}
              className="absolute left-4 p-3 bg-white/10 hover:bg-white/20 rounded-full"
            >
              <Icon name="arrowLeft" className="w-6 h-6" />
            </button>

            <button
              onClick={() => setActiveImageIndex((prev) => (prev + 1) % property.images.length)}
              className="absolute right-4 p-3 bg-white/10 hover:bg-white/20 rounded-full"
            >
              <Icon name="arrowRight" className="w-6 h-6" />
            </button>
          </div>

          <div className="flex justify-center space-x-2 overflow-x-auto py-2">
            {property.images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt="thumb"
                onClick={() => setActiveImageIndex(idx)}
                className={`w-16 h-12 object-cover cursor-pointer border ${
                  activeImageIndex === idx ? "border-[#9A7B56]" : "opacity-40"
                }`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
