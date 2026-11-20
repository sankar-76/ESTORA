import { useState } from 'react';
import { Icon } from '../components/Icon';
import { SAMPLE_PROPERTIES } from '../data/properties';
import { PropertyCard } from '../components/PropertyCard';

export const HomePage = ({ navigate, onToggleSave, savedIds, onToggleCompare, compareIds }) => {
  // Search Form State
  const [searchLocation, setSearchLocation] = useState('All');
  const [searchCategory, setSearchCategory] = useState('All');
  const [searchType, setSearchType] = useState('All');

  const handleSearch = (e) => {
    e.preventDefault();
    let query = `#/properties?`;
    const params = [];
    if (searchLocation !== 'All') params.push(`location=${encodeURIComponent(searchLocation)}`);
    if (searchCategory !== 'All') params.push(`category=${encodeURIComponent(searchCategory)}`);
    if (searchType !== 'All') params.push(`type=${encodeURIComponent(searchType)}`);
    window.location.hash = `/properties${params.length ? '?' + params.join('&') : ''}`;
  };

  const featuredListings = SAMPLE_PROPERTIES.slice(0, 6);

  return (
    <div className="animate-fade-in">
      {/* A. CINEMATIC HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#181817] text-white">
        {/* Background Image with Scale Effect */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=2000&q=90"
            alt="ESTORA Luxury Villa"
            className="w-full h-full object-cover opacity-60 scale-105 transition-transform duration-[10000ms] ease-out animate-scale-in"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#181817] via-black/30 to-black/50" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-24 pb-16 space-y-8">
          <div className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full">
            <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-amber-200">
              THE ART OF EXCEPTIONAL LIVING
            </span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-tight leading-[1.08]">
            Spaces That <span className="italic font-normal text-amber-100">Define</span> Living.
          </h1>

          <p className="font-sans text-sm md:text-lg text-white/80 max-w-2xl mx-auto leading-relaxed font-light">
            Discover extraordinary private estates, coastal sanctuaries, and sky residences engineered for the world's most discerning individuals.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => navigate('/properties')}
              className="w-full sm:w-auto px-8 py-4 bg-[#9A7B56] text-white text-xs uppercase tracking-[0.25em] font-semibold hover:bg-[#836746] transition-all duration-300 shadow-lg"
            >
              Explore Properties
            </button>
            <button
              onClick={() => navigate('/about')}
              className="w-full sm:w-auto px-8 py-4 bg-white/10 backdrop-blur-md border border-white/30 text-white text-xs uppercase tracking-[0.25em] font-semibold hover:bg-white hover:text-[#181817] transition-all duration-300"
            >
              Discover ESTORA
            </button>
          </div>

          {/* Bottom Architectural Metadata Bar */}
          <div className="pt-16 grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-white/15 max-w-4xl mx-auto text-left text-xs font-light">
            <div>
              <span className="block text-[#9A7B56] text-[10px] uppercase tracking-widest font-semibold">Featured Location</span>
              <span className="text-white font-medium">Anjuna Coast, Goa</span>
            </div>
            <div>
              <span className="block text-[#9A7B56] text-[10px] uppercase tracking-widest font-semibold">Architectural Style</span>
              <span className="text-white font-medium">Tropical Modernism</span>
            </div>
            <div>
              <span className="block text-[#9A7B56] text-[10px] uppercase tracking-widest font-semibold">Global Portfolio</span>
              <span className="text-white font-medium">14 Premier Listings</span>
            </div>
            <div>
              <span className="block text-[#9A7B56] text-[10px] uppercase tracking-widest font-semibold">Private Viewing</span>
              <span className="text-white font-medium">By Appointment Only</span>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-2 opacity-70">
          <span className="text-[9px] uppercase tracking-[0.3em] text-white/60">Scroll</span>
          <div className="w-4 h-7 border border-white/40 rounded-full flex justify-center p-1">
            <div className="w-1 h-1.5 bg-white rounded-full animate-bounce" />
          </div>
        </div>
      </section>

      {/* B. PROPERTY SEARCH PANEL */}
      <section className="relative z-20 max-w-6xl mx-auto -mt-16 px-6">
        <div className="bg-[#FCFBF9] border border-[#E2DDD3] shadow-2xl p-6 md:p-8">
          <div className="mb-6 flex items-center justify-between border-b border-[#E2DDD3] pb-4">
            <h3 className="font-serif text-xl font-medium text-[#181817]">Curated Search</h3>
            <span className="text-xs uppercase tracking-widest text-[#76736E]">Filter By Preference</span>
          </div>

          <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Location Select */}
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase tracking-[0.18em] text-[#76736E] font-semibold">Location</label>
              <select
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
                className="w-full p-3 bg-[#F7F5F0] border border-[#E2DDD3] text-xs text-[#181817] font-medium focus:bg-white"
              >
                <option value="All">All International Locations</option>
                <option value="Goa">Goa, India</option>
                <option value="Mumbai">Mumbai, India</option>
                <option value="Dubai">Dubai, UAE</option>
                <option value="London">London, UK</option>
                <option value="Singapore">Singapore</option>
                <option value="Pune">Pune, India</option>
                <option value="Bengaluru">Bengaluru, India</option>
              </select>
            </div>

            {/* Category Select */}
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase tracking-[0.18em] text-[#76736E] font-semibold">Property Type</label>
              <select
                value={searchCategory}
                onChange={(e) => setSearchCategory(e.target.value)}
                className="w-full p-3 bg-[#F7F5F0] border border-[#E2DDD3] text-xs text-[#181817] font-medium focus:bg-white"
              >
                <option value="All">All Categories</option>
                <option value="Luxury Villas">Luxury Villas</option>
                <option value="Modern Apartments">Modern Apartments</option>
                <option value="Exclusive Penthouses">Exclusive Penthouses</option>
                <option value="Commercial Spaces">Commercial Spaces</option>
              </select>
            </div>

            {/* Buy / Rent Select */}
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase tracking-[0.18em] text-[#76736E] font-semibold">Intent</label>
              <select
                value={searchType}
                onChange={(e) => setSearchType(e.target.value)}
                className="w-full p-3 bg-[#F7F5F0] border border-[#E2DDD3] text-xs text-[#181817] font-medium focus:bg-white"
              >
                <option value="All">Buy, Rent & Commercial</option>
                <option value="Buy">For Purchase</option>
                <option value="Rent">For Lease</option>
                <option value="Commercial">Commercial Portfolio</option>
              </select>
            </div>

            {/* Search Submit Button */}
            <div className="flex items-end">
              <button
                type="submit"
                className="w-full py-3 px-6 bg-[#181817] text-[#F7F5F0] text-xs uppercase tracking-[0.2em] font-semibold hover:bg-[#9A7B56] transition-colors flex items-center justify-center space-x-2"
              >
                <Icon name="search" className="w-4 h-4" />
                <span>Search Portfolio</span>
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* C. FEATURED PROPERTIES GRID */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 space-y-4 md:space-y-0">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[#9A7B56] font-semibold block mb-2">
              EXCEPTIONAL PORTFOLIO
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#181817]">
              Extraordinary Living Spaces.
            </h2>
          </div>
          <button
            onClick={() => navigate('/properties')}
            className="text-xs uppercase tracking-[0.2em] font-semibold text-[#181817] hover:text-[#9A7B56] transition-colors flex items-center space-x-2"
          >
            <span>View All 14 Properties</span>
            <Icon name="arrowRight" className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredListings.map((property) => (
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
      </section>

      {/* D. PROPERTY CATEGORIES SHOWCASE */}
      <section className="bg-[#EAE5DC]/50 py-24 border-t border-b border-[#E2DDD3]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs uppercase tracking-[0.25em] text-[#9A7B56] font-semibold">
              CURATED ARCHITECTURAL TYPES
            </span>
            <h2 className="font-serif text-3xl md:text-5xl font-light text-[#181817]">
              Find Your Kind of Space.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Luxury Villas",
                subtitle: "Coastal & Country Estates",
                img: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=80",
                cat: "Luxury Villas"
              },
              {
                title: "Modern Apartments",
                subtitle: "Urban Residences & Maisonettes",
                img: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80",
                cat: "Modern Apartments"
              },
              {
                title: "Exclusive Penthouses",
                subtitle: "Panoramic Sky Sanctuaries",
                img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
                cat: "Exclusive Penthouses"
              },
              {
                title: "Commercial Spaces",
                subtitle: "Landmark Corporate Hubs",
                img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
                cat: "Commercial Spaces"
              }
            ].map((cat, idx) => (
              <div
                key={idx}
                onClick={() => navigate(`/properties?category=${encodeURIComponent(cat.cat)}`)}
                className="group relative aspect-[3/4] overflow-hidden cursor-pointer shadow-md"
              >
                <img
                  src={cat.img}
                  alt={cat.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                  <h3 className="font-serif text-2xl font-medium">{cat.title}</h3>
                  <p className="text-xs text-white/70 font-light">{cat.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* E. ESTORA PHILOSOPHY EDITORIAL SECTION */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative aspect-[4/5] overflow-hidden shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
              alt="ESTORA Architectural Philosophy"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-8 left-8 bg-[#F7F5F0] p-6 max-w-xs border border-[#E2DDD3] hidden sm:block">
              <span className="font-serif italic text-2xl text-[#181817] block">"Architecture is liveable sculpture."</span>
              <span className="text-[10px] uppercase tracking-widest text-[#9A7B56] block mt-2 font-semibold">ESTORA Design Manifesto</span>
            </div>
          </div>

          <div className="space-y-8">
            <span className="text-xs uppercase tracking-[0.25em] text-[#9A7B56] font-semibold">
              OUR PHILOSOPHY
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#181817] leading-tight">
              More Than Property. <br />
              <span className="italic">A Way of Living.</span>
            </h2>
            <p className="text-sm md:text-base text-[#76736E] leading-relaxed font-light">
              At ESTORA, we believe architectural spaces shape human experience. We do not merely catalog real estate; we curate environments where light, proportion, material purity, and landscape converge.
            </p>
            <p className="text-sm md:text-base text-[#76736E] leading-relaxed font-light">
              Every villa, penthouse, and urban pavilion in our portfolio undergoes rigorous architectural evaluation—ensuring our clients acquire spaces that define living.
            </p>

            <div className="pt-4 grid grid-cols-2 gap-8 border-t border-[#E2DDD3]">
              <div>
                <span className="font-serif text-3xl font-light text-[#181817] block">100%</span>
                <span className="text-xs text-[#76736E] uppercase tracking-wider">Curated Estate Portfolio</span>
              </div>
              <div>
                <span className="font-serif text-3xl font-light text-[#181817] block">7</span>
                <span className="text-xs text-[#76736E] uppercase tracking-wider">International Destinations</span>
              </div>
            </div>

            <div>
              <button
                onClick={() => navigate('/about')}
                className="px-8 py-4 bg-[#181817] text-[#F7F5F0] text-xs uppercase tracking-[0.2em] font-semibold hover:bg-[#9A7B56] transition-colors"
              >
                Read Our Full Story
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* F. SIGNATURE PROPERTY SHOWCASE */}
      <section className="bg-[#181817] text-white py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="mb-12">
            <span className="text-xs uppercase tracking-[0.25em] text-[#9A7B56] font-semibold">
              SIGNATURE RESIDENCE SHOWCASE
            </span>
            <h2 className="font-serif text-3xl md:text-5xl font-light text-white mt-2">
              The Pavilion Penthouse, Worli Sea Face
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 relative aspect-[16/9] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80"
                alt="Signature Property Worli"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="lg:col-span-4 space-y-6 bg-white/5 p-8 border border-white/10">
              <div className="space-y-1">
                <span className="text-xs uppercase tracking-widest text-[#9A7B56]">Mumbai • India</span>
                <p className="font-serif text-3xl font-bold text-amber-100">₹35.00 Cr</p>
              </div>
              <p className="text-xs text-white/70 leading-relaxed font-light">
                Top dual-level sky sanctuary with private cantilever spa pool framing panoramic vistas of the Bandra-Worli Sea Link.
              </p>
              <div className="grid grid-cols-3 gap-4 border-t border-b border-white/10 py-4 text-center text-xs">
                <div>
                  <span className="block font-semibold">4</span>
                  <span className="text-[10px] text-white/50 uppercase">Beds</span>
                </div>
                <div>
                  <span className="block font-semibold">5</span>
                  <span className="text-[10px] text-white/50 uppercase">Baths</span>
                </div>
                <div>
                  <span className="block font-semibold">5,200</span>
                  <span className="text-[10px] text-white/50 uppercase">Sq Ft</span>
                </div>
              </div>
              <button
                onClick={() => navigate('/properties/skyline-penthouse-worli')}
                className="w-full py-3.5 bg-[#9A7B56] text-white text-xs uppercase tracking-[0.2em] font-semibold hover:bg-[#836746] transition-colors"
              >
                Explore Signature Residence
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* G. WHY ESTORA 4 PILLARS */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-24 border-b border-[#E2DDD3]">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs uppercase tracking-[0.25em] text-[#9A7B56] font-semibold">
            THE ESTORA ADVANTAGE
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-light text-[#181817]">
            Why Discerning Clients Trust ESTORA.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              title: "Carefully Curated",
              desc: "Every listing is hand-vetted by our architectural design advisory board."
            },
            {
              title: "Exceptional Locations",
              desc: "Prime real estate in Goa, Mumbai, Dubai, London, Singapore, Pune, and Bengaluru."
            },
            {
              title: "Thoughtful Discovery",
              desc: "Tailored spatial search matching lifestyle aspirations with structural precision."
            },
            {
              title: "Personalized Viewing",
              desc: "Private multi-step guided viewing experiences arranged strictly on demand."
            }
          ].map((pillar, idx) => (
            <div key={idx} className="p-8 bg-[#FCFBF9] border border-[#E2DDD3] space-y-4">
              <span className="text-xs font-serif italic text-[#9A7B56] text-lg font-bold">0{idx + 1}</span>
              <h3 className="font-serif text-xl text-[#181817] font-medium">{pillar.title}</h3>
              <p className="text-xs text-[#76736E] leading-relaxed font-light">{pillar.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* H. FINAL CALL TO ACTION */}
      <section className="py-24 bg-[#EAE5DC]/40 text-center px-6">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#181817]">
            Your Next Chapter Begins With The Right Space.
          </h2>
          <p className="text-sm text-[#76736E] font-light max-w-xl mx-auto">
            Explore our global portfolio of architectural villas, sky penthouses, and commercial spaces.
          </p>
          <div>
            <button
              onClick={() => navigate('/properties')}
              className="px-10 py-4 bg-[#181817] text-[#F7F5F0] text-xs uppercase tracking-[0.25em] font-semibold hover:bg-[#9A7B56] transition-colors shadow-lg"
            >
              Explore Our Properties
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
