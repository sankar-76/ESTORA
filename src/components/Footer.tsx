import { useState } from 'react';

export const Footer = ({ navigate }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    setError('');
    setSubscribed(true);
  };

  return (
    <footer className="bg-[#181817] text-[#F7F5F0] pt-20 pb-12 border-t border-white/10 font-sans">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
        {/* BRAND COL */}
        <div className="lg:col-span-2 space-y-6">
          <div className="space-y-1">
            <span className="font-serif text-3xl tracking-[0.2em] font-semibold uppercase block text-white">
              ESTORA
            </span>
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#9A7B56] block font-medium">
              Spaces That Define Living
            </span>
          </div>
          <p className="text-sm text-[#76736E] leading-relaxed max-w-md">
            ESTORA is a premier international architectural estate portfolio specializing in ultra-luxury private residences, oceanfront villas, modern penthouses, and landmark commercial hubs.
          </p>
          <div className="text-xs text-[#76736E]">
            <p className="font-semibold text-white uppercase tracking-widest mb-1">Concept Portfolio Note</p>
            <p>Demonstration web platform for luxury architectural design. Non-commercial showcase.</p>
          </div>
        </div>

        {/* DISCOVER LINKS */}
        <div className="space-y-4">
          <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9A7B56]">Discover</h4>
          <ul className="space-y-2.5 text-xs text-white/70">
            {['Luxury Villas', 'Modern Apartments', 'Exclusive Penthouses', 'Commercial Spaces', 'Private Islands'].map((item) => (
              <li key={item}>
                <button onClick={() => navigate('/properties')} className="hover:text-white transition-colors">
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* QUICK NAVIGATION */}
        <div className="space-y-4">
          <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9A7B56]">Navigation</h4>
          <ul className="space-y-2.5 text-xs text-white/70">
            {[
              { label: 'Properties Portfolio', path: '/properties' },
              { label: 'Buy Residences', path: '/buy' },
              { label: 'Rent Residences', path: '/rent' },
              { label: 'Commercial Portfolio', path: '/commercial' },
              { label: 'Saved Favorites', path: '/saved' },
              { label: 'Property Comparison', path: '/compare' },
              { label: 'About ESTORA', path: '/about' },
              { label: 'Contact Advisory', path: '/contact' }
            ].map((link) => (
              <li key={link.label}>
                <button onClick={() => navigate(link.path)} className="hover:text-white transition-colors">
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* NEWSLETTER */}
        <div className="space-y-4">
          <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9A7B56]">Private Gazette</h4>
          <p className="text-xs text-white/70 leading-relaxed">
            Receive exclusive off-market luxury estate previews and architectural intelligence.
          </p>
          {subscribed ? (
            <div className="p-4 bg-[#9A7B56]/20 border border-[#9A7B56] text-xs text-white rounded">
              ✓ Subscribed to ESTORA Private Gazette (Frontend Demo).
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="space-y-3">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/20 text-xs text-white placeholder-white/40 focus:bg-white/10"
              />
              {error && <p className="text-rose-400 text-[11px]">{error}</p>}
              <button
                type="submit"
                className="w-full py-3 bg-[#9A7B56] text-white text-[11px] uppercase tracking-[0.2em] font-semibold hover:bg-[#836746] transition-colors"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>
      </div>

      {/* BOTTOM LEGAL ROW */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between text-[11px] text-[#76736E]">
        <p>© 2026 ESTORA Luxury Real Estate. All rights reserved. Concept & Frontend Architecture Showcase.</p>
        <div className="flex space-x-6 mt-4 md:mt-0 uppercase tracking-widest">
          <span>Privacy Policy</span>
          <span>Terms of Portfolio</span>
          <span>Architectural Advisory</span>
        </div>
      </div>
    </footer>
  );
};
