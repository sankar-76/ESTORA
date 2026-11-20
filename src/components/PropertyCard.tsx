import { Icon } from '../components/Icon';

export const PropertyCard = ({ property, navigate, isSaved, onToggleSave, isCompared, onToggleCompare }) => {
  return (
    <div className="group bg-[#FCFBF9] border border-[#E2DDD3] overflow-hidden flex flex-col justify-between transition-all duration-500 hover:shadow-xl hover:-translate-y-1">
      <div>
        {/* IMAGE & BADGES */}
        <div className="relative aspect-[4/3] img-hover-zoom cursor-pointer" onClick={() => navigate(`/properties/${property.slug}`)}>
          <img
            src={property.heroImage}
            alt={property.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 opacity-80 group-hover:opacity-40 transition-opacity" />

          {/* Top Info Badges */}
          <div className="absolute top-4 left-4 flex gap-2">
            <span className="px-3 py-1 bg-[#181817]/80 backdrop-blur-md text-white text-[10px] uppercase tracking-[0.18em] font-medium">
              {property.listingType}
            </span>
            <span className="px-3 py-1 bg-[#9A7B56]/90 backdrop-blur-md text-white text-[10px] uppercase tracking-[0.18em] font-medium">
              {property.category}
            </span>
          </div>

          {/* Save & Compare Buttons */}
          <div className="absolute top-4 right-4 flex space-x-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleCompare(property);
              }}
              className={`p-2 rounded-full backdrop-blur-md transition-all ${
                isCompared
                  ? "bg-[#9A7B56] text-white"
                  : "bg-white/80 text-[#181817] hover:bg-white"
              }`}
              title={isCompared ? "Remove from comparison" : "Add to comparison"}
            >
              <Icon name="compare" className="w-4 h-4" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleSave(property);
              }}
              className={`p-2 rounded-full backdrop-blur-md transition-all ${
                isSaved
                  ? "bg-rose-700 text-white"
                  : "bg-white/80 text-[#181817] hover:bg-white"
              }`}
              title={isSaved ? "Remove from favorites" : "Save property"}
            >
              <Icon name={isSaved ? "heartFilled" : "heart"} className="w-4 h-4" />
            </button>
          </div>

          {/* Price Overlay */}
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <span className="font-serif text-2xl font-bold tracking-tight">
              {property.priceFormatted}
            </span>
          </div>
        </div>

        {/* CARD CONTENT */}
        <div className="p-6">
          <div className="flex items-center text-[#76736E] text-xs space-x-1.5 mb-2">
            <Icon name="location" className="w-3.5 h-3.5 text-[#9A7B56]" />
            <span className="uppercase tracking-wider truncate">{property.location}</span>
          </div>

          <h3
            onClick={() => navigate(`/properties/${property.slug}`)}
            className="font-serif text-xl font-medium text-[#181817] cursor-pointer hover:text-[#9A7B56] transition-colors mb-3 line-clamp-1"
          >
            {property.name}
          </h3>

          {/* Specs Row */}
          <div className="grid grid-cols-3 gap-2 py-3 my-2 border-t border-b border-[#E2DDD3] text-center text-xs text-[#76736E]">
            <div className="flex flex-col items-center">
              <span className="font-semibold text-[#181817]">{property.bedrooms}</span>
              <span className="text-[10px] uppercase tracking-wider">Beds</span>
            </div>
            <div className="flex flex-col items-center border-l border-r border-[#E2DDD3]">
              <span className="font-semibold text-[#181817]">{property.bathrooms}</span>
              <span className="text-[10px] uppercase tracking-wider">Baths</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-semibold text-[#181817]">{property.areaSqFt.toLocaleString()}</span>
              <span className="text-[10px] uppercase tracking-wider">Sq Ft</span>
            </div>
          </div>
        </div>
      </div>

      {/* CARD FOOTER CTA */}
      <div className="px-6 pb-6">
        <button
          onClick={() => navigate(`/properties/${property.slug}`)}
          className="w-full py-3 border border-[#181817] text-[#181817] text-[11px] uppercase tracking-[0.2em] font-semibold hover:bg-[#181817] hover:text-[#F7F5F0] transition-colors flex items-center justify-center space-x-2 group"
        >
          <span>View Residence</span>
          <Icon name="arrowRight" className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  );
};
