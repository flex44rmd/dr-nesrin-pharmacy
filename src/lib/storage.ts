// Local Storage management for site configuration and branding
export interface SiteSettings {
  logoUrl?: string;
  faviconUrl?: string;
  setupCompleted?: boolean;
  repositoryOwner?: string;
  repositoryName?: string;
  gitToken?: string;
}

const STORAGE_KEY = 'pharmacy_site_settings';

export function loadSiteSettings(): SiteSettings {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

export function saveSiteSettings(settings: SiteSettings): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  } catch (err) {
    console.error('Failed to save site settings:', err);
  }
}

export function updateSiteSettings(partial: Partial<SiteSettings>): SiteSettings {
  const current = loadSiteSettings();
  const updated = { ...current, ...partial };
  saveSiteSettings(updated);
  return updated;
}

export function clearSiteSettings(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}

export function isSetupCompleted(): boolean {
  return loadSiteSettings().setupCompleted ?? false;
}

export function markSetupAsCompleted(): void {
  updateSiteSettings({ setupCompleted: true });
}
