import { useState, useMemo } from 'react';
import { Icon } from '../components/Icon';
import { SAMPLE_PROPERTIES } from '../data/properties';
import { PropertyCard } from '../components/PropertyCard';

export const PropertiesPage = ({ navigate, defaultCategory = 'All', defaultType = 'All', onToggleSave, savedIds, onToggleCompare, compareIds }) => {
  // Read hash params if present
  const hashString = window.location.hash.split('?')[1] || '';
  const searchParams = new URLSearchParams(hashString);

  const initialLocation = searchParams.get('location') || 'All';
  const initialCategory = searchParams.get('category') || defaultCategory;
  const initialType = searchParams.get('type') || defaultType;

  // Filter States
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState(initialLocation);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedType, setSelectedType] = useState(initialType);
  const [selectedCurrency, setSelectedCurrency] = useState('All');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [minBeds, setMinBeds] = useState('All');
  const [minBaths, setMinBaths] = useState('All');
  const [minArea, setMinArea] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  // Filter Logic
  const filteredProperties = useMemo(() => {
    return SAMPLE_PROPERTIES.filter((item) => {
      // Keyword search
      if (searchTerm) {
        const q = searchTerm.toLowerCase();
        const matchName = item.name.toLowerCase().includes(q);
        const matchLoc = item.location.toLowerCase().includes(q);
        const matchDesc = item.description.toLowerCase().includes(q);
        if (!matchName && !matchLoc && !matchDesc) return false;
      }

      // Location
      if (selectedLocation !== 'All' && item.city !== selectedLocation) {
        return false;
      }

      // Category
      if (selectedCategory !== 'All' && item.category !== selectedCategory) {
        return false;
      }

      // Type (Buy / Rent / Commercial)
      if (selectedType !== 'All' && item.listingType !== selectedType) {
        return false;
      }

      // Currency
      if (selectedCurrency !== 'All' && item.currency !== selectedCurrency) {
        return false;
      }

      // Price Min/Max (Applied to raw price)
      if (minPrice && item.priceRaw < Number(minPrice)) return false;
      if (maxPrice && item.priceRaw > Number(maxPrice)) return false;

      // Bedrooms
      if (minBeds !== 'All' && item.bedrooms < Number(minBeds)) return false;

      // Bathrooms
      if (minBaths !== 'All' && item.bathrooms < Number(minBaths)) return false;

      // Area
      if (minArea && item.areaSqFt < Number(minArea)) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.priceRaw - b.priceRaw;
      if (sortBy === 'price-high') return b.priceRaw - a.priceRaw;
      if (sortBy === 'area-high') return b.areaSqFt - a.areaSqFt;
      return 0; // default newest
    });
  }, [
    searchTerm,
    selectedLocation,
    selectedCategory,
    selectedType,
    selectedCurrency,
    minPrice,
    maxPrice,
    minBeds,
    minBaths,
    minArea,
    sortBy
  ]);

  const clearAllFilters = () => {
    setSearchTerm('');
    setSelectedLocation('All');
    setSelectedCategory('All');
    setSelectedType('All');
    setSelectedCurrency('All');
    setMinPrice('');
    setMaxPrice('');
    setMinBeds('All');
    setMinBaths('All');
    setMinArea('');
    setSortBy('newest');
  };

  return (
    <div className="pt-28 pb-24 max-w-7xl mx-auto px-6 md:px-12 animate-fade-in space-y-12">
      {/* HEADER */}
      <div className="border-b border-[#E2DDD3] pb-8 space-y-3">
        <span className="text-xs uppercase tracking-[0.25em] text-[#9A7B56] font-semibold">
          ESTORA ESTATE PORTFOLIO
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-light text-[#181817]">
          Discover Exceptional Properties.
        </h1>
        <p className="text-xs sm:text-sm text-[#76736E] max-w-2xl font-light">
          Browse our international collection of private villas, penthouses, luxury apartments, and commercial headquarters.
        </p>
      </div>

      {/* FILTER PANEL */}
      <div className="bg-[#FCFBF9] border border-[#E2DDD3] p-6 sm:p-8 space-y-6">
        {/* Top Search Bar & Clear */}
        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="relative flex-1 w-full">
            <input
              type="text"
              placeholder="Search by keyword, location, architectural style..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-[#F7F5F0] border border-[#E2DDD3] text-xs text-[#181817] placeholder-[#76736E]"
            />
            <Icon name="search" className="w-4 h-4 text-[#76736E] absolute left-3 top-3.5" />
          </div>

          <button
            onClick={clearAllFilters}
            className="w-full md:w-auto px-6 py-3 border border-[#E2DDD3] text-[#76736E] hover:text-[#181817] hover:border-[#181817] text-xs uppercase tracking-widest transition-colors"
          >
            Clear Filters
          </button>
        </div>

        {/* Filter Controls Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 text-xs">
          {/* Location */}
          <div className="space-y-1">
            <label className="text-[10px] uppercase tracking-wider text-[#76736E]">Location</label>
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="w-full p-2.5 bg-[#F7F5F0] border border-[#E2DDD3]"
            >
              <option value="All">All Cities</option>
              <option value="Goa">Goa</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Dubai">Dubai</option>
              <option value="London">London</option>
              <option value="Singapore">Singapore</option>
              <option value="Pune">Pune</option>
              <option value="Bengaluru">Bengaluru</option>
            </select>
          </div>

          {/* Category */}
          <div className="space-y-1">
            <label className="text-[10px] uppercase tracking-wider text-[#76736E]">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full p-2.5 bg-[#F7F5F0] border border-[#E2DDD3]"
            >
              <option value="All">All Categories</option>
              <option value="Luxury Villas">Luxury Villas</option>
              <option value="Modern Apartments">Modern Apartments</option>
              <option value="Exclusive Penthouses">Exclusive Penthouses</option>
              <option value="Houses">Houses</option>
              <option value="Commercial Spaces">Commercial Spaces</option>
            </select>
          </div>

          {/* Intent */}
          <div className="space-y-1">
            <label className="text-[10px] uppercase tracking-wider text-[#76736E]">Listing Type</label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full p-2.5 bg-[#F7F5F0] border border-[#E2DDD3]"
            >
              <option value="All">All Intentions</option>
              <option value="Buy">For Purchase</option>
              <option value="Rent">For Lease</option>
              <option value="Commercial">Commercial</option>
            </select>
          </div>

          {/* Currency Selector */}
          <div className="space-y-1">
            <label className="text-[10px] uppercase tracking-wider text-[#76736E]">Currency</label>
            <select
              value={selectedCurrency}
              onChange={(e) => setSelectedCurrency(e.target.value)}
              className="w-full p-2.5 bg-[#F7F5F0] border border-[#E2DDD3]"
            >
              <option value="All">All Currencies</option>
              <option value="INR">INR (₹)</option>
              <option value="AED">AED (د.إ)</option>
              <option value="GBP">GBP (£)</option>
              <option value="SGD">SGD ($)</option>
            </select>
          </div>

          {/* Bedrooms */}
          <div className="space-y-1">
            <label className="text-[10px] uppercase tracking-wider text-[#76736E]">Min Bedrooms</label>
            <select
              value={minBeds}
              onChange={(e) => setMinBeds(e.target.value)}
              className="w-full p-2.5 bg-[#F7F5F0] border border-[#E2DDD3]"
            >
              <option value="All">Any Beds</option>
              <option value="2">2+ Beds</option>
              <option value="3">3+ Beds</option>
              <option value="4">4+ Beds</option>
              <option value="5">5+ Beds</option>
            </select>
          </div>

          {/* Sort By */}
          <div className="space-y-1">
            <label className="text-[10px] uppercase tracking-wider text-[#76736E]">Sort Order</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full p-2.5 bg-[#F7F5F0] border border-[#E2DDD3]"
            >
              <option value="newest">Featured / Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="area-high">Largest Area</option>
            </select>
          </div>
        </div>
      </div>

      {/* RESULTS HEADER */}
      <div className="flex items-center justify-between text-xs text-[#76736E] border-b border-[#E2DDD3] pb-4">
        <span>Showing <strong className="text-[#181817] font-semibold">{filteredProperties.length}</strong> available properties</span>
        {selectedCurrency !== 'All' && (
          <span className="text-[#9A7B56]">Prices filtered strictly in {selectedCurrency}</span>
        )}
      </div>

      {/* PROPERTY GRID */}
      {filteredProperties.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProperties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              navigate={navigate}
              isSaved={savedIds.includes(property.id)}
              onToggleSave={onToggleSave}
              isCompared={compareIds.includes(property.id)}
              onToggleCompare={onToggleCompare}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-24 bg-[#FCFBF9] border border-[#E2DDD3] space-y-4">
          <Icon name="search" className="w-12 h-12 text-[#9A7B56] mx-auto opacity-50" />
          <h3 className="font-serif text-2xl text-[#181817]">No Matching Residences Found</h3>
          <p className="text-xs text-[#76736E] max-w-md mx-auto">
            Try adjusting your search criteria, clearing currency or bedroom constraints, or exploring all global locations.
          </p>
          <button
            onClick={clearAllFilters}
            className="px-6 py-3 bg-[#181817] text-[#F7F5F0] text-xs uppercase tracking-widest font-semibold"
          >
            Reset All Filters
          </button>
        </div>
      )}
    </div>
  );
};
