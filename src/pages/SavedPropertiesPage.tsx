import { Icon } from '../components/Icon';
import { SAMPLE_PROPERTIES } from '../data/properties';
import { PropertyCard } from '../components/PropertyCard';

export const SavedPropertiesPage = ({ navigate, savedIds, onToggleSave, onToggleCompare, compareIds }) => {
  const savedProperties = SAMPLE_PROPERTIES.filter((p) => savedIds.includes(p.id));

  return (
    <div className="pt-28 pb-24 max-w-7xl mx-auto px-6 md:px-12 animate-fade-in space-y-12">
      <div className="border-b border-[#E2DDD3] pb-8 space-y-3">
        <span className="text-xs uppercase tracking-[0.25em] text-[#9A7B56] font-semibold">
          PERSONAL PORTFOLIO
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-light text-[#181817]">
          Saved Residences ({savedProperties.length})
        </h1>
        <p className="text-xs sm:text-sm text-[#76736E] max-w-xl font-light">
          Your saved luxury estates remain stored locally on your device for seamless reference.
        </p>
      </div>

      {savedProperties.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {savedProperties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              navigate={navigate}
              isSaved={true}
              onToggleSave={onToggleSave}
              isCompared={compareIds.includes(property.id)}
              onToggleCompare={onToggleCompare}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-24 bg-[#FCFBF9] border border-[#E2DDD3] space-y-4">
          <Icon name="heart" className="w-12 h-12 text-[#9A7B56] mx-auto opacity-40" />
          <h3 className="font-serif text-2xl text-[#181817]">Your Favorites List is Empty</h3>
          <p className="text-xs text-[#76736E] max-w-md mx-auto font-light">
            Click the heart icon on any villa, penthouse, or apartment card to save residences to your personal shortlist.
          </p>
          <button
            onClick={() => navigate('/properties')}
            className="px-8 py-4 bg-[#181817] text-[#F7F5F0] text-xs uppercase tracking-[0.2em] font-semibold hover:bg-[#9A7B56] transition-colors"
          >
            Explore Portfolio
          </button>
        </div>
      )}
    </div>
  );
};
