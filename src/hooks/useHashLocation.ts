import { useState, useEffect } from 'react';

export const useHashLocation = () => {
  const [hash, setHash] = useState(window.location.hash || '#/');

  useEffect(() => {
    const handleHashChange = () => {
      setHash(window.location.hash || '#/');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (path) => {
    window.location.hash = path.startsWith('#') ? path : `#${path}`;
  };

  return [hash, navigate] as [string, (path: string) => void];
};
