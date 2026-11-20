import { useState, useEffect } from 'react';
import { Icon } from './components/Icon';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { PropertiesPage } from './pages/PropertiesPage';
import { PropertyDetailsPage } from './pages/PropertyDetailsPage';
import { SavedPropertiesPage } from './pages/SavedPropertiesPage';
import { ComparePropertiesPage } from './pages/ComparePropertiesPage';
import { ScheduleViewingPage } from './pages/ScheduleViewingPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { useHashLocation } from './hooks/useHashLocation';
import { getLocalStorage, setLocalStorage } from './utils/storage';
import { injectGlobalStyles } from './utils/injectGlobalStyles';

export default function App() {
  const [hash, navigate] = useHashLocation();

  // Dynamic Styles Injection
  useEffect(() => {
    injectGlobalStyles();
  }, []);

  // Saved Properties State (LocalStorage)
  const [savedIds, setSavedIds] = useState(() => getLocalStorage('estora_saved_ids', []));

  // Compare Properties State (LocalStorage - Max 3)
  const [compareIds, setCompareIds] = useState(() => getLocalStorage('estora_compare_ids', []));

  // Notification Toast State
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  const handleToggleSave = (property) => {
    if (savedIds.includes(property.id)) {
      const updated = savedIds.filter((id) => id !== property.id);
      setSavedIds(updated);
      setLocalStorage('estora_saved_ids', updated);
      showToast(`Removed "${property.name}" from favorites.`);
    } else {
      const updated = [...savedIds, property.id];
      setSavedIds(updated);
      setLocalStorage('estora_saved_ids', updated);
      showToast(`Saved "${property.name}" to favorites.`);
    }
  };

  const handleToggleCompare = (property) => {
    if (compareIds.includes(property.id)) {
      const updated = compareIds.filter((id) => id !== property.id);
      setCompareIds(updated);
      setLocalStorage('estora_compare_ids', updated);
      showToast(`Removed "${property.name}" from comparison.`);
    } else {
      if (compareIds.length >= 3) {
        showToast(`Comparison limit reached (Maximum 3 properties).`);
        return;
      }
      const updated = [...compareIds, property.id];
      setCompareIds(updated);
      setLocalStorage('estora_compare_ids', updated);
      showToast(`Added "${property.name}" to comparison matrix.`);
    }
  };

  const handleClearCompare = () => {
    setCompareIds([]);
    setLocalStorage('estora_compare_ids', []);
    showToast('Cleared all comparison properties.');
  };

  // ROUTING DECODER
  const cleanHash = hash.replace(/^#/, '') || '/';
  const mainRoute = cleanHash.split('?')[0];

  let pageContent = null;

  if (mainRoute === '/' || mainRoute === '') {
    pageContent = (
      <HomePage
        navigate={navigate}
        onToggleSave={handleToggleSave}
        savedIds={savedIds}
        onToggleCompare={handleToggleCompare}
        compareIds={compareIds}
      />
    );
  } else if (mainRoute === '/properties') {
    pageContent = (
      <PropertiesPage
        navigate={navigate}
        onToggleSave={handleToggleSave}
        savedIds={savedIds}
        onToggleCompare={handleToggleCompare}
        compareIds={compareIds}
      />
    );
  } else if (mainRoute.startsWith('/properties/')) {
    const slug = mainRoute.replace('/properties/', '');
    pageContent = (
      <PropertyDetailsPage
        slug={slug}
        navigate={navigate}
        onToggleSave={handleToggleSave}
        savedIds={savedIds}
        onToggleCompare={handleToggleCompare}
        compareIds={compareIds}
      />
    );
  } else if (mainRoute === '/buy') {
    pageContent = (
      <PropertiesPage
        navigate={navigate}
        defaultType="Buy"
        onToggleSave={handleToggleSave}
        savedIds={savedIds}
        onToggleCompare={handleToggleCompare}
        compareIds={compareIds}
      />
    );
  } else if (mainRoute === '/rent') {
    pageContent = (
      <PropertiesPage
        navigate={navigate}
        defaultType="Rent"
        onToggleSave={handleToggleSave}
        savedIds={savedIds}
        onToggleCompare={handleToggleCompare}
        compareIds={compareIds}
      />
    );
  } else if (mainRoute === '/commercial') {
    pageContent = (
      <PropertiesPage
        navigate={navigate}
        defaultCategory="Commercial Spaces"
        defaultType="Commercial"
        onToggleSave={handleToggleSave}
        savedIds={savedIds}
        onToggleCompare={handleToggleCompare}
        compareIds={compareIds}
      />
    );
  } else if (mainRoute === '/saved') {
    pageContent = (
      <SavedPropertiesPage
        navigate={navigate}
        savedIds={savedIds}
        onToggleSave={handleToggleSave}
        onToggleCompare={handleToggleCompare}
        compareIds={compareIds}
      />
    );
  } else if (mainRoute === '/compare') {
    pageContent = (
      <ComparePropertiesPage
        navigate={navigate}
        compareIds={compareIds}
        onToggleCompare={handleToggleCompare}
        onClearCompare={handleClearCompare}
      />
    );
  } else if (mainRoute === '/schedule-viewing') {
    pageContent = <ScheduleViewingPage navigate={navigate} />;
  } else if (mainRoute === '/about') {
    pageContent = <AboutPage navigate={navigate} />;
  } else if (mainRoute === '/contact') {
    pageContent = <ContactPage navigate={navigate} />;
  } else {
    // FALLBACK 404
    pageContent = (
      <div className="pt-32 pb-24 text-center max-w-md mx-auto space-y-4">
        <h2 className="font-serif text-4xl text-[#181817]">404 - Space Not Found</h2>
        <p className="text-xs text-[#76736E]">The architectural route you requested does not exist.</p>
        <button
          onClick={() => navigate('/')}
          className="px-6 py-3 bg-[#181817] text-white text-xs uppercase tracking-widest"
        >
          Return to ESTORA Home
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#F7F5F0] text-[#181817]">
      {/* NAVBAR */}
      <Navbar
        activeRoute={mainRoute}
        navigate={navigate}
        savedCount={savedIds.length}
        compareCount={compareIds.length}
      />

      {/* FLOATING TOAST NOTIFICATION */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#181817] text-white px-5 py-3 shadow-2xl border border-[#9A7B56] text-xs font-medium animate-fade-in flex items-center space-x-2">
          <Icon name="sparkles" className="w-4 h-4 text-[#9A7B56]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* PAGE VIEW RENDER */}
      <main className="grow">{pageContent}</main>

      {/* FOOTER */}
      <Footer navigate={navigate} />
    </div>
  );
}
