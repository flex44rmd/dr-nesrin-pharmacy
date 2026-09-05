import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';
import type { SiteData } from './types';
import { RAW_BASE } from './repoConfig';

// Fetched straight from GitHub (not the built copy shipped with the site), so
// admin-panel edits appear on the live site right away — no rebuild/redeploy
// needed for content changes, only for actual code changes.
const DATA_URL = `${RAW_BASE}data/site-data.json`;

const FALLBACK_DATA: SiteData = {
  settings: {
    pharmacyName: 'صيدلية دكتورة نسرين',
    whatsapp: 'https://wa.me/213000000000',
    phone: '+213000000000',
    facebook: 'https://facebook.com/pharmacie.dr.nesrin',
    instagram: 'https://instagram.com/pharmacie_dr_nesrin',
    tiktok: 'https://tiktok.com/@pharmacie.dr.nesrin',
    mapsUrl: 'https://maps.google.com/?q=Pharmacie+Dr+Nesrin',
    ratingUrl: '#testimonials',
    ratingLabel: 'تقييم',
  },
  products: [],
  reviews: [],
};

interface SiteDataContextValue {
  data: SiteData;
  loading: boolean;
  /** re-fetch data.json from the server, e.g. after the admin saves changes */
  refresh: () => Promise<void>;
}

const SiteDataContext = createContext<SiteDataContextValue>({
  data: FALLBACK_DATA,
  loading: true,
  refresh: async () => {},
});

export function SiteDataProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<SiteData>(FALLBACK_DATA);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    try {
      const res = await fetch(`${DATA_URL}?t=${Date.now()}`, { cache: 'no-store' });
      if (!res.ok) throw new Error('failed to load site data');
      const json = (await res.json()) as SiteData;
      setData({
        settings: { ...FALLBACK_DATA.settings, ...json.settings },
        products: json.products ?? [],
        reviews: json.reviews ?? [],
      });
    } catch {
      // keep fallback data if the file isn't reachable yet
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <SiteDataContext.Provider value={{ data, loading, refresh: load }}>
      {children}
    </SiteDataContext.Provider>
  );
}

export function useSiteData() {
  return useContext(SiteDataContext);
}
