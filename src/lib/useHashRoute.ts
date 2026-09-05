import { useEffect, useState } from 'react';

export type Route =
  | { page: 'home' }
  | { page: 'category'; slug: string }
  | { page: 'product'; id: string }
  | { page: 'admin' };

function parseHash(hash: string): Route {
  // Only treat hashes that start with '#/' as page routes.
  // Plain in-page anchors like '#hero', '#products' stay on the home page.
  if (!hash.startsWith('#/')) return { page: 'home' };

  const parts = hash.slice(2).split('/').filter(Boolean); // remove '#/'
  if (parts[0] === 'category' && parts[1]) return { page: 'category', slug: decodeURIComponent(parts[1]) };
  if (parts[0] === 'product' && parts[1]) return { page: 'product', id: decodeURIComponent(parts[1]) };
  if (parts[0] === 'admin') return { page: 'admin' };
  return { page: 'home' };
}

export function useHashRoute(): Route {
  const [route, setRoute] = useState<Route>(() => parseHash(window.location.hash));

  useEffect(() => {
    const onChange = () => setRoute(parseHash(window.location.hash));
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);

  return route;
}

export function goTo(hash: string) {
  window.location.hash = hash;
  window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
}
