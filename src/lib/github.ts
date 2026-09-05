import { RAW_BASE } from './repoConfig';

export interface GitHubConfig {
  owner: string;
  repo: string;
  branch: string;
  token: string;
}

const STORAGE_KEY = 'admin_github_config';

export function loadGitHubConfig(): GitHubConfig | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as GitHubConfig) : null;
  } catch {
    return null;
  }
}

export function saveGitHubConfig(config: GitHubConfig) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
}

export function clearGitHubConfig() {
  localStorage.removeItem(STORAGE_KEY);
}

function apiBase(config: GitHubConfig) {
  return `https://api.github.com/repos/${config.owner}/${config.repo}/contents`;
}

function authHeaders(config: GitHubConfig) {
  return {
    Authorization: `Bearer ${config.token}`,
    Accept: 'application/vnd.github+json',
  };
}

/** UTF-8 safe base64 encoding for text content */
function toBase64(text: string): string {
  const bytes = new TextEncoder().encode(text);
  let binary = '';
  bytes.forEach((b) => (binary += String.fromCharCode(b)));
  return btoa(binary);
}

async function getFileSha(config: GitHubConfig, path: string): Promise<string | undefined> {
  const res = await fetch(`${apiBase(config)}/${path}?ref=${config.branch}`, {
    headers: authHeaders(config),
  });
  if (res.status === 404) return undefined;
  if (!res.ok) throw new Error(`تعذر قراءة الملف ${path} (${res.status})`);
  const json = await res.json();
  return json.sha as string;
}

/** Commit a text file (e.g. data/site-data.json) to the repo, creating or updating it. */
export async function putTextFile(config: GitHubConfig, path: string, content: string, message: string) {
  const sha = await getFileSha(config, path);
  const res = await fetch(`${apiBase(config)}/${path}`, {
    method: 'PUT',
    headers: { ...authHeaders(config), 'Content-Type': 'application/json' },
    body: JSON.stringify({
      message,
      content: toBase64(content),
      branch: config.branch,
      ...(sha ? { sha } : {}),
    }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || `فشل حفظ الملف ${path} (${res.status})`);
  }
  return res.json();
}

/** Upload an image file (base64) to the repo under data/uploads/ and return its relative path. */
export async function uploadImage(config: GitHubConfig, file: File): Promise<string> {
  const base64 = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve((reader.result as string).split(',')[1]);
    reader.onerror = () => reject(new Error('تعذرت قراءة ملف الصورة'));
    reader.readAsDataURL(file);
  });

  const safeName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, '_');
  // Relative path used at runtime by <img src> (must match how the site is served).
  const path = `data/uploads/${Date.now()}-${safeName}`;
  // Actual location in the repo: must live under public/ so Vite copies it into
  // the build output (dist/) — anything outside public/ is ignored by the build.
  const repoPath = `public/${path}`;

  const res = await fetch(`${apiBase(config)}/${repoPath}`, {
    method: 'PUT',
    headers: { ...authHeaders(config), 'Content-Type': 'application/json' },
    body: JSON.stringify({
      message: `رفع صورة منتج: ${file.name}`,
      content: base64,
      branch: config.branch,
    }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || `فشل رفع الصورة (${res.status})`);
  }
  // Full direct URL, not the bare relative path — so the image is visible
  // immediately, without waiting on a rebuild of the site.
  return `${RAW_BASE}${path}`;
}

/** Simple sanity check that the token/repo/branch combination works and has write access. */
export async function testConnection(config: GitHubConfig): Promise<void> {
  const res = await fetch(`https://api.github.com/repos/${config.owner}/${config.repo}`, {
    headers: authHeaders(config),
  });
  if (!res.ok) throw new Error('تعذر الوصول إلى المستودع. تأكد من اسم المستودع والتوكن.');
  const json = await res.json();
  if (json.permissions && json.permissions.push !== true) {
    throw new Error('التوكن ليس لديه صلاحية الكتابة على هذا المستودع.');
  }
}
