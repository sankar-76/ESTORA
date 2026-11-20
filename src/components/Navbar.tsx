import { useState, useEffect } from 'react';
import { Icon } from '../components/Icon';

export const Navbar = ({ activeRoute, navigate, savedCount, compareCount }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: "Discover", path: "/properties" },
    { label: "Buy", path: "/buy" },
    { label: "Rent", path: "/rent" },
    { label: "Commercial", path: "/commercial" },
    { label: "About ESTORA", path: "/about" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-[#F7F5F0]/95 glass-header py-4 border-hairline-b shadow-sm text-[#181817]"
          : "bg-gradient-to-b from-black/60 via-black/20 to-transparent py-6 text-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* LOGO */}
        <button
          onClick={() => navigate('/')}
          className="group flex flex-col text-left focus:outline-none"
        >
          <span className="font-serif text-2xl md:text-3xl tracking-[0.2em] font-semibold uppercase transition-transform group-hover:scale-[1.02]">
            ESTORA
          </span>
          <span className={`text-[9px] tracking-[0.3em] uppercase font-sans ${isScrolled ? "text-[#76736E]" : "text-white/80"}`}>
            Luxury Real Estate
          </span>
        </button>

        {/* DESKTOP NAV LINKS */}
        <nav className="hidden lg:flex items-center space-x-10 text-xs uppercase tracking-[0.2em] font-medium">
          {navLinks.map((link) => {
            const isActive = activeRoute === link.path;
            return (
              <button
                key={link.path}
                onClick={() => navigate(link.path)}
                className={`relative py-1 transition-colors duration-300 ${
                  isActive
                    ? "text-[#9A7B56] font-semibold"
                    : isScrolled
                    ? "hover:text-[#9A7B56]"
                    : "hover:text-amber-200"
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#9A7B56] animate-fade-in" />
                )}
              </button>
            );
          })}
        </nav>

        {/* ACTION BUTTONS & ICONS */}
        <div className="hidden sm:flex items-center space-x-5 text-xs">
          {/* Compare Link */}
          <button
            onClick={() => navigate('/compare')}
            className={`relative p-2 rounded-full transition-colors ${
              isScrolled ? "hover:bg-[#EAE5DC]/60" : "hover:bg-white/10"
            }`}
            title="Property Comparison"
          >
            <Icon name="compare" className="w-5 h-5" />
            {compareCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#9A7B56] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {compareCount}
              </span>
            )}
          </button>

          {/* Favorites Link */}
          <button
            onClick={() => navigate('/saved')}
            className={`relative p-2 rounded-full transition-colors ${
              isScrolled ? "hover:bg-[#EAE5DC]/60" : "hover:bg-white/10"
            }`}
            title="Saved Properties"
          >
            <Icon name="heart" className="w-5 h-5" />
            {savedCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#9A7B56] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {savedCount}
              </span>
            )}
          </button>

          {/* Contact Button */}
          <button
            onClick={() => navigate('/contact')}
            className={`px-5 py-2.5 uppercase tracking-[0.18em] text-[11px] font-semibold transition-all duration-300 ${
              isScrolled
                ? "bg-[#181817] text-[#F7F5F0] hover:bg-[#9A7B56]"
                : "bg-white/90 text-[#181817] hover:bg-white hover:text-[#9A7B56]"
            }`}
          >
            Inquire
          </button>
        </div>

        {/* MOBILE MENU TOGGLE */}
        <div className="lg:hidden flex items-center space-x-3">
          <button
            onClick={() => navigate('/saved')}
            className="p-2 relative"
          >
            <Icon name="heart" className="w-6 h-6" />
            {savedCount > 0 && (
              <span className="absolute top-0 right-0 bg-[#9A7B56] text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {savedCount}
              </span>
            )}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-current focus:outline-none"
            aria-label="Toggle Navigation"
          >
            <Icon name={mobileMenuOpen ? "close" : "menu"} className="w-7 h-7" />
          </button>
        </div>
      </div>

      {/* MOBILE NAV DRAWER */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[73px] bg-[#181817] text-[#F7F5F0] z-40 flex flex-col justify-between p-8 animate-fade-in">
          <div className="flex flex-col space-y-6 text-center pt-8 font-serif text-2xl tracking-wide">
            {navLinks.map((link) => (
              <button
                key={link.path}
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigate(link.path);
                }}
                className="hover:text-[#9A7B56] transition-colors py-2"
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                navigate('/compare');
              }}
              className="hover:text-[#9A7B56] transition-colors py-2 font-sans text-sm uppercase tracking-widest text-[#76736E]"
            >
              Compare Properties ({compareCount})
            </button>
          </div>

          <div className="flex flex-col space-y-4 pt-8 border-t border-white/10">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                navigate('/schedule-viewing');
              }}
              className="w-full py-4 bg-[#9A7B56] text-white uppercase tracking-[0.2em] text-xs font-semibold"
            >
              Schedule Private Viewing
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                navigate('/contact');
              }}
              className="w-full py-4 border border-white/20 text-white uppercase tracking-[0.2em] text-xs font-semibold"
            >
              Contact Advisory Team
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
