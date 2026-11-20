export const AboutPage = ({ navigate }) => {
  return (
    <div className="pt-28 pb-24 max-w-7xl mx-auto px-6 md:px-12 animate-fade-in space-y-20">
      {/* BRAND MANIFESTO HEADER */}
      <div className="max-w-3xl space-y-6">
        <span className="text-xs uppercase tracking-[0.25em] text-[#9A7B56] font-semibold">
          THE ESTORA STORY
        </span>
        <h1 className="font-serif text-4xl sm:text-6xl font-light text-[#181817] leading-tight">
          Spaces Shape The Way We Live.
        </h1>
        <p className="text-sm sm:text-base text-[#76736E] leading-relaxed font-light">
          ESTORA was conceived as a global architectural real estate brand dedicated to extraordinary human living spaces. We bridge masterwork architecture with discerning private clients across Mumbai, Goa, Pune, Bengaluru, Dubai, London, and Singapore.
        </p>
      </div>

      {/* EDITORIAL SPLIT GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="aspect-[4/3] overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
            alt="ESTORA Architecture"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="space-y-6">
          <h3 className="font-serif text-3xl font-light text-[#181817]">Our Curation Approach</h3>
          <p className="text-xs sm:text-sm text-[#76736E] leading-relaxed font-light">
            Unlike traditional brokerages that prioritize transaction volume, ESTORA operates as an architectural gallery. We evaluate proportion, daylight orientation, structural integrity, material provenance, and spatial harmony.
          </p>
          <div className="p-6 bg-[#FCFBF9] border border-[#E2DDD3] space-y-2">
            <span className="text-xs font-semibold text-[#9A7B56] uppercase tracking-widest block">Concept Notice</span>
            <p className="text-xs text-[#76736E]">
              ESTORA is positioned as a conceptual luxury real estate agency design project. Property records represent high-level architectural demonstrations for web developer portfolio showcase.
            </p>
          </div>
        </div>
      </div>

      {/* 3 CORE PRINCIPLES */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-[#E2DDD3] pt-16">
        <div className="space-y-3">
          <span className="font-serif text-2xl text-[#9A7B56]">I. Architectural Distinction</span>
          <p className="text-xs text-[#76736E] leading-relaxed font-light">
            Only properties that exhibit exceptional architectural design are admitted into our global portfolio.
          </p>
        </div>
        <div className="space-y-3">
          <span className="font-serif text-2xl text-[#9A7B56]">II. Discretion & Privacy</span>
          <p className="text-xs text-[#76736E] leading-relaxed font-light">
            All client viewings, off-market listings, and financial communications are handled with strict privacy protocols.
          </p>
        </div>
        <div className="space-y-3">
          <span className="font-serif text-2xl text-[#9A7B56]">III. Bespoke Advisory</span>
          <p className="text-xs text-[#76736E] leading-relaxed font-light">
            Our advisory team includes architects, interior consultants, and luxury estate strategists.
          </p>
        </div>
      </div>
    </div>
  );
};
