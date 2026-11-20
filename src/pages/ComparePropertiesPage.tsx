import { Icon } from '../components/Icon';
import { SAMPLE_PROPERTIES } from '../data/properties';

export const ComparePropertiesPage = ({ navigate, compareIds, onToggleCompare, onClearCompare }) => {
  const comparedList = SAMPLE_PROPERTIES.filter((p) => compareIds.includes(p.id));

  return (
    <div className="pt-28 pb-24 max-w-7xl mx-auto px-6 md:px-12 animate-fade-in space-y-12">
      <div className="border-b border-[#E2DDD3] pb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-3">
          <span className="text-xs uppercase tracking-[0.25em] text-[#9A7B56] font-semibold">
            ANALYTICAL EVALUATION
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-light text-[#181817]">
            Property Comparison ({comparedList.length}/3)
          </h1>
          <p className="text-xs sm:text-sm text-[#76736E] max-w-xl font-light">
            Compare key architectural specifications, layout areas, and amenities side-by-side.
          </p>
        </div>

        {comparedList.length > 0 && (
          <button
            onClick={onClearCompare}
            className="px-6 py-3 border border-[#E2DDD3] text-[#76736E] hover:text-[#181817] hover:border-[#181817] text-xs uppercase tracking-widest transition-colors"
          >
            Clear All Comparisons
          </button>
        )}
      </div>

      {comparedList.length > 0 ? (
        <div className="overflow-x-auto border border-[#E2DDD3] bg-[#FCFBF9] shadow-md">
          <table className="w-full text-left text-xs border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-[#E2DDD3] bg-[#F7F5F0]">
                <th className="p-4 w-1/4 font-semibold uppercase tracking-wider text-[#76736E]">Specification</th>
                {comparedList.map((item) => (
                  <th key={item.id} className="p-4 w-1/4 font-serif text-xl font-medium text-[#181817]">
                    <div className="space-y-2">
                      <div className="aspect-[16/10] overflow-hidden">
                        <img src={item.heroImage} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="line-clamp-1">{item.name}</div>
                      <button
                        onClick={() => onToggleCompare(item)}
                        className="text-[10px] text-rose-600 hover:underline uppercase tracking-widest font-sans font-normal"
                      >
                        Remove
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2DDD3] text-[#181817]">
              <tr>
                <td className="p-4 font-semibold text-[#76736E] uppercase tracking-wider">Price</td>
                {comparedList.map((item) => (
                  <td key={item.id} className="p-4 font-serif text-lg font-bold text-[#9A7B56]">
                    {item.priceFormatted}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-4 font-semibold text-[#76736E] uppercase tracking-wider">Location</td>
                {comparedList.map((item) => (
                  <td key={item.id} className="p-4">{item.location}</td>
                ))}
              </tr>
              <tr>
                <td className="p-4 font-semibold text-[#76736E] uppercase tracking-wider">Listing Type</td>
                {comparedList.map((item) => (
                  <td key={item.id} className="p-4 font-medium">{item.listingType} ({item.category})</td>
                ))}
              </tr>
              <tr>
                <td className="p-4 font-semibold text-[#76736E] uppercase tracking-wider">Bedrooms</td>
                {comparedList.map((item) => (
                  <td key={item.id} className="p-4 font-bold">{item.bedrooms}</td>
                ))}
              </tr>
              <tr>
                <td className="p-4 font-semibold text-[#76736E] uppercase tracking-wider">Bathrooms</td>
                {comparedList.map((item) => (
                  <td key={item.id} className="p-4 font-bold">{item.bathrooms}</td>
                ))}
              </tr>
              <tr>
                <td className="p-4 font-semibold text-[#76736E] uppercase tracking-wider">Total Area</td>
                {comparedList.map((item) => (
                  <td key={item.id} className="p-4 font-bold">{item.areaSqFt.toLocaleString()} sq ft</td>
                ))}
              </tr>
              <tr>
                <td className="p-4 font-semibold text-[#76736E] uppercase tracking-wider">Amenities</td>
                {comparedList.map((item) => (
                  <td key={item.id} className="p-4">
                    <ul className="space-y-1 text-[11px] text-[#76736E]">
                      {item.amenities.map((a, i) => (
                        <li key={i}>• {a}</li>
                      ))}
                    </ul>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-4 font-semibold text-[#76736E] uppercase tracking-wider">Action</td>
                {comparedList.map((item) => (
                  <td key={item.id} className="p-4">
                    <button
                      onClick={() => navigate(`/properties/${item.slug}`)}
                      className="w-full py-2 bg-[#181817] text-white text-[10px] uppercase tracking-widest font-semibold hover:bg-[#9A7B56] transition-colors"
                    >
                      View Details
                    </button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-24 bg-[#FCFBF9] border border-[#E2DDD3] space-y-4">
          <Icon name="compare" className="w-12 h-12 text-[#9A7B56] mx-auto opacity-40" />
          <h3 className="font-serif text-2xl text-[#181817]">No Properties Selected for Comparison</h3>
          <p className="text-xs text-[#76736E] max-w-md mx-auto font-light">
            Select up to three properties using the comparison icon on any property card to view side-by-side metrics.
          </p>
          <button
            onClick={() => navigate('/properties')}
            className="px-8 py-4 bg-[#181817] text-[#F7F5F0] text-xs uppercase tracking-[0.2em] font-semibold hover:bg-[#9A7B56] transition-colors"
          >
            Select Properties
          </button>
        </div>
      )}
    </div>
  );
};
