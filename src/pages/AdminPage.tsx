import { useEffect, useState } from 'react';
import {
  ArrowRight, Plus, Trash2, Save, LogOut, ImagePlus, Loader2,
  CheckCircle2, AlertCircle, ShieldCheck, Upload,
} from 'lucide-react';
import { CATEGORIES } from '../lib/categories';
import { useSiteData } from '../lib/SiteDataContext';
import type { Product, Review, SiteData } from '../lib/types';
import {
  clearGitHubConfig, loadGitHubConfig, saveGitHubConfig,
  testConnection, putTextFile, uploadImage, type GitHubConfig,
} from '../lib/github';
import { loadSiteSettings, updateSiteSettings } from '../lib/storage';

function newId(prefix: string) {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
}

type Tab = 'products' | 'reviews' | 'settings';

export default function AdminPage() {
  const { data, loading, refresh } = useSiteData();
  const [config, setConfig] = useState<GitHubConfig | null>(loadGitHubConfig());
  const [draft, setDraft] = useState<SiteData | null>(null);
  const [pendingImages, setPendingImages] = useState<Record<string, File>>({});
  const [tab, setTab] = useState<Tab>('products');
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<{ type: 'ok' | 'error'; text: string } | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [faviconPreview, setFaviconPreview] = useState<string | null>(null);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [faviconFile, setFaviconFile] = useState<File | null>(null);

  useEffect(() => {
    const settings = loadSiteSettings();
    setLogoPreview(settings.logoUrl || null);
    setFaviconPreview(settings.faviconUrl || null);
  }, []);

  useEffect(() => {
    if (!loading && !draft) setDraft(structuredClone(data));
  }, [loading, data, draft]);

  if (!config) return <LoginScreen onLogin={setConfig} />;
  if (!draft) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface-50">
        <Loader2 className="w-6 h-6 animate-spin text-primary-500" />
      </div>
    );
  }

  const products = draft.products;
  const reviews = draft.reviews;

  function updateProduct(id: string, patch: Partial<Product>) {
    setDraft((d) => d && { ...d, products: d.products.map((p) => (p.id === id ? { ...p, ...patch } : p)) });
  }

  function addProduct() {
    const p: Product = {
      id: newId('p'),
      categorySlug: CATEGORIES[0].slug,
      name: 'منتج جديد',
      image: '',
      shortDescription: '',
      detailDescription: '',
      status: 'available',
    };
    setDraft((d) => d && { ...d, products: [p, ...d.products] });
  }

  function removeProduct(id: string) {
    setDraft((d) => d && { ...d, products: d.products.filter((p) => p.id !== id) });
    setPendingImages((m) => {
      const { [id]: _drop, ...rest } = m;
      return rest;
    });
  }

  function onImagePick(id: string, file: File) {
    setPendingImages((m) => ({ ...m, [id]: file }));
    updateProduct(id, { image: URL.createObjectURL(file) });
  }

  function addReview() {
    const r: Review = { id: newId('r'), name: '', role: '', rating: 5, text: '' };
    setDraft((d) => d && { ...d, reviews: [r, ...d.reviews] });
  }

  function updateReview(id: string, patch: Partial<Review>) {
    setDraft((d) => d && { ...d, reviews: d.reviews.map((r) => (r.id === id ? { ...r, ...patch } : r)) });
  }

  function removeReview(id: string) {
    setDraft((d) => d && { ...d, reviews: d.reviews.filter((r) => r.id !== id) });
  }

  function handleLogoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setLogoFile(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        const preview = event.target?.result as string;
        setLogoPreview(preview);
        updateSiteSettings({ logoUrl: preview });
      };
      reader.readAsDataURL(file);
    }
  }

  function handleFaviconChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setFaviconFile(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        const preview = event.target?.result as string;
        setFaviconPreview(preview);
        updateSiteSettings({ faviconUrl: preview });
      };
      reader.readAsDataURL(file);
    }
  }

  async function handleSave() {
    if (!config || !draft) return;
    setSaving(true);
    setStatus(null);
    try {
      const finalProducts = await Promise.all(
        draft.products.map(async (p) => {
          const file = pendingImages[p.id];
          if (!file) return p;
          const path = await uploadImage(config, file);
          return { ...p, image: path };
        })
      );
      const finalData: SiteData = { ...draft, products: finalProducts };
      await putTextFile(
        config,
        // Must be inside public/ so Vite includes it in the build output (dist/);
        // committing to data/site-data.json (repo root) is invisible to the build,
        // which is why the homepage never picked up the changes.
        'public/data/site-data.json',
        JSON.stringify(finalData, null, 2),
        'تحديث بيانات الموقع من لوحة التحكم'
      );
      setDraft(finalData);
      setPendingImages({});
      await refresh();
      setStatus({ type: 'ok', text: 'تم الحفظ بنجاح. قد يستغرق ظهور التغييرات على الموقع دقيقة واحدة.' });
    } catch (e) {
      setStatus({ type: 'error', text: e instanceof Error ? e.message : 'حدث خطأ غير متوقع' });
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="min-h-screen bg-surface-50" dir="rtl">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <a href="#/" className="inline-flex items-center gap-2 text-surface-500 hover:text-primary-600 text-sm font-medium">
            <ArrowRight className="w-4 h-4" />
            العودة للموقع
          </a>
          <button
            onClick={() => {
              clearGitHubConfig();
              setConfig(null);
            }}
            className="inline-flex items-center gap-2 text-sm text-surface-400 hover:text-red-500"
          >
            <LogOut className="w-4 h-4" />
            تسجيل الخروج
          </button>
        </div>

        <h1 className="text-2xl lg:text-3xl font-black text-surface-900 mb-2">لوحة التحكم</h1>
        <p className="text-surface-500 mb-8 text-sm">إدارة المنتجات، آراء العملاء، وروابط التواصل.</p>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 border-b border-surface-200">
          {([
            ['products', 'المنتجات'],
            ['reviews', 'آراء العملاء'],
            ['settings', 'الإعدادات والروابط'],
          ] as [Tab, string][]).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`px-4 py-3 text-sm font-semibold border-b-2 -mb-px transition-colors ${
                tab === key ? 'border-primary-600 text-primary-600' : 'border-transparent text-surface-400 hover:text-surface-700'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {tab === 'products' && (
          <div className="space-y-5">
            <button
              onClick={addProduct}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary-600 text-white text-sm font-semibold hover:bg-primary-700"
            >
              <Plus className="w-4 h-4" />
              إضافة منتج
            </button>

            {products.length === 0 && (
              <p className="text-surface-400 text-sm">لا توجد منتجات بعد. اضغطي "إضافة منتج" للبدء.</p>
            )}

            {products.map((p) => (
              <div key={p.id} className="bg-white rounded-2xl border border-surface-100 p-5">
                <div className="grid md:grid-cols-[160px_1fr] gap-5">
                  <div>
                    <div className="w-full aspect-square rounded-xl bg-surface-100 overflow-hidden mb-2">
                      {p.image ? (
                        <img src={p.image} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-surface-300">
                          <ImagePlus className="w-8 h-8" />
                        </div>
                      )}
                    </div>
                    <label className="block text-xs text-center text-primary-600 font-semibold cursor-pointer hover:underline">
                      اختيار صورة
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => e.target.files?.[0] && onImagePick(p.id, e.target.files[0])}
                      />
                    </label>
                  </div>

                  <div className="space-y-3">
                    <div className="grid sm:grid-cols-2 gap-3">
                      <Field label="اسم المنتج">
                        <input
                          className="admin-input"
                          value={p.name}
                          onChange={(e) => updateProduct(p.id, { name: e.target.value })}
                        />
                      </Field>
                      <Field label="القسم">
                        <select
                          className="admin-input"
                          value={p.categorySlug}
                          onChange={(e) => updateProduct(p.id, { categorySlug: e.target.value })}
                        >
                          {CATEGORIES.map((c) => (
                            <option key={c.slug} value={c.slug}>{c.title}</option>
                          ))}
                        </select>
                      </Field>
                    </div>

                    <Field label="الوصف المختصر (يظهر في صفحة القسم)">
                      <textarea
                        className="admin-input"
                        rows={2}
                        value={p.shortDescription}
                        onChange={(e) => updateProduct(p.id, { shortDescription: e.target.value })}
                      />
                    </Field>

                    <Field label="الوصف التفصيلي (يظهر في صفحة المنتج تحت الصورة)">
                      <textarea
                        className="admin-input"
                        rows={3}
                        value={p.detailDescription}
                        onChange={(e) => updateProduct(p.id, { detailDescription: e.target.value })}
                      />
                    </Field>

                    <div className="flex items-center justify-between">
                      <Field label="الحالة">
                        <select
                          className="admin-input"
                          value={p.status}
                          onChange={(e) => updateProduct(p.id, { status: e.target.value as Product['status'] })}
                        >
                          <option value="available">متوفر</option>
                          <option value="unavailable">غير متوفر حالياً</option>
                        </select>
                      </Field>
                      <button
                        onClick={() => removeProduct(p.id)}
                        className="inline-flex items-center gap-1.5 text-sm text-red-500 hover:text-red-700 font-medium"
                      >
                        <Trash2 className="w-4 h-4" />
                        حذف المنتج
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === 'reviews' && (
          <div className="space-y-5">
            <button
              onClick={addReview}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary-600 text-white text-sm font-semibold hover:bg-primary-700"
            >
              <Plus className="w-4 h-4" />
              إضافة رأي عميل
            </button>

            {reviews.map((r) => (
              <div key={r.id} className="bg-white rounded-2xl border border-surface-100 p-5 space-y-3">
                <div className="grid sm:grid-cols-3 gap-3">
                  <Field label="الاسم">
                    <input className="admin-input" value={r.name} onChange={(e) => updateReview(r.id, { name: e.target.value })} />
                  </Field>
                  <Field label="الوصف (مثال: عميل منذ 5 سنوات)">
                    <input className="admin-input" value={r.role} onChange={(e) => updateReview(r.id, { role: e.target.value })} />
                  </Field>
                  <Field label="التقييم (1-5)">
                    <input
                      type="number" min={1} max={5}
                      className="admin-input"
                      value={r.rating}
                      onChange={(e) => updateReview(r.id, { rating: Number(e.target.value) })}
                    />
                  </Field>
                </div>
                <Field label="نص الرأي">
                  <textarea className="admin-input" rows={2} value={r.text} onChange={(e) => updateReview(r.id, { text: e.target.value })} />
                </Field>
                <button
                  onClick={() => removeReview(r.id)}
                  className="inline-flex items-center gap-1.5 text-sm text-red-500 hover:text-red-700 font-medium"
                >
                  <Trash2 className="w-4 h-4" />
                  حذف الرأي
                </button>
              </div>
            ))}
          </div>
        )}

        {tab === 'settings' && (
          <div className="bg-white rounded-2xl border border-surface-100 p-6 space-y-6 max-w-2xl">
            {/* Branding Section */}
            <div className="border-b border-surface-100 pb-6">
              <h3 className="text-lg font-semibold text-surface-900 mb-4">الهوية البصرية</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                {/* Logo */}
                <div>
                  <label className="block text-sm font-semibold text-surface-600 mb-2">اللوجو الرئيسي</label>
                  <div className="w-full aspect-square rounded-xl bg-surface-100 overflow-hidden mb-2 flex items-center justify-center">
                    {logoPreview ? (
                      <img src={logoPreview} alt="Logo" className="w-full h-full object-cover" />
                    ) : (
                      <Upload className="w-8 h-8 text-surface-300" />
                    )}
                  </div>
                  <label className="block text-xs text-center text-primary-600 font-semibold cursor-pointer hover:underline">
                    تغيير الصورة
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleLogoChange}
                    />
                  </label>
                </div>

                {/* Favicon */}
                <div>
                  <label className="block text-sm font-semibold text-surface-600 mb-2">أيقونة التبويب (Favicon)</label>
                  <div className="w-full aspect-square rounded-xl bg-surface-100 overflow-hidden mb-2 flex items-center justify-center">
                    {faviconPreview ? (
                      <img src={faviconPreview} alt="Favicon" className="w-full h-full object-cover" />
                    ) : (
                      <Upload className="w-8 h-8 text-surface-300" />
                    )}
                  </div>
                  <label className="block text-xs text-center text-primary-600 font-semibold cursor-pointer hover:underline">
                    تغيير الصورة
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFaviconChange}
                    />
                  </label>
                </div>
              </div>
            </div>

            <Field label="اسم الصيدلية">
              <input
                className="admin-input"
                value={draft.settings.pharmacyName}
                onChange={(e) => setDraft((d) => d && { ...d, settings: { ...d.settings, pharmacyName: e.target.value } })}
              />
            </Field>
            <Field label="رابط الواتساب (https://wa.me/213...)">
              <input
                className="admin-input"
                value={draft.settings.whatsapp}
                onChange={(e) => setDraft((d) => d && { ...d, settings: { ...d.settings, whatsapp: e.target.value } })}
              />
            </Field>
            <Field label="رقم الهاتف">
              <input
                className="admin-input"
                value={draft.settings.phone}
                onChange={(e) => setDraft((d) => d && { ...d, settings: { ...d.settings, phone: e.target.value } })}
              />
            </Field>
            <Field label="رابط فيسبوك">
              <input
                className="admin-input"
                value={draft.settings.facebook}
                onChange={(e) => setDraft((d) => d && { ...d, settings: { ...d.settings, facebook: e.target.value } })}
              />
            </Field>
            <Field label="رابط انستجرام">
              <input
                className="admin-input"
                value={draft.settings.instagram}
                onChange={(e) => setDraft((d) => d && { ...d, settings: { ...d.settings, instagram: e.target.value } })}
              />
            </Field>
            <Field label="رابط تيك توك">
              <input
                className="admin-input"
                value={draft.settings.tiktok}
                onChange={(e) => setDraft((d) => d && { ...d, settings: { ...d.settings, tiktok: e.target.value } })}
              />
            </Field>
            <Field label="رابط الموقع على خرائط جوجل">
              <input
                className="admin-input"
                value={draft.settings.mapsUrl}
                onChange={(e) => setDraft((d) => d && { ...d, settings: { ...d.settings, mapsUrl: e.target.value } })}
              />
            </Field>
            <Field label="رابط زر التقييم العائم (نجمة)">
              <input
                className="admin-input"
                value={draft.settings.ratingUrl}
                onChange={(e) => setDraft((d) => d && { ...d, settings: { ...d.settings, ratingUrl: e.target.value } })}
              />
            </Field>
          </div>
        )}

        {/* Save bar */}
        <div className="sticky bottom-4 mt-8">
          <div className="bg-surface-900 rounded-2xl p-4 flex items-center justify-between gap-4 shadow-2xl">
            <div className="flex items-center gap-2 text-white/70 text-sm">
              {status?.type === 'ok' && <CheckCircle2 className="w-4 h-4 text-green-400" />}
              {status?.type === 'error' && <AlertCircle className="w-4 h-4 text-red-400" />}
              <span>{status?.text ?? 'التغييرات محلية حتى تضغطي حفظ.'}</span>
            </div>
            <button
              onClick={handleSave}
              disabled={saving}
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 hover:bg-primary-500 disabled:opacity-60 text-white font-semibold rounded-xl transition-colors"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              حفظ التغييرات
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .admin-input {
          width: 100%;
          border: 1px solid #e5e7eb;
          border-radius: 0.75rem;
          padding: 0.5rem 0.75rem;
          font-size: 0.875rem;
          outline: none;
        }
        .admin-input:focus { border-color: #6366f1; }
      `}</style>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-xs font-semibold text-surface-500 mb-1">{label}</span>
      {children}
    </label>
  );
}

function LoginScreen({ onLogin }: { onLogin: (c: GitHubConfig) => void }) {
  const [owner, setOwner] = useState('');
  const [repo, setRepo] = useState('');
  const [branch, setBranch] = useState('main');
  const [token, setToken] = useState('');
  const [checking, setChecking] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setChecking(true);
    const config: GitHubConfig = { owner: owner.trim(), repo: repo.trim(), branch: branch.trim() || 'main', token: token.trim() };
    try {
      await testConnection(config);
      saveGitHubConfig(config);
      onLogin(config);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'تعذر تسجيل الدخول');
    } finally {
      setChecking(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-50 px-4" dir="rtl">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white rounded-3xl border border-surface-100 shadow-sm p-8">
        <div className="w-12 h-12 rounded-2xl bg-primary-50 text-primary-600 flex items-center justify-center mb-4">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <h1 className="text-xl font-bold text-surface-900 mb-1">تسجيل الدخول للوحة التحكم</h1>
        <p className="text-surface-500 text-sm mb-6">
          أدخلي بيانات مستودع GitHub الخاص بالموقع. تُحفظ هذه البيانات في متصفحك فقط ولا تُرسل لأي جهة أخرى.
        </p>

        <div className="space-y-3">
          <Field label="اسم المستخدم / المؤسسة على GitHub">
            <input className="admin-input" value={owner} onChange={(e) => setOwner(e.target.value)} required placeholder="مثال: nesrin-pharmacy" />
          </Field>
          <Field label="اسم المستودع (Repository)">
            <input className="admin-input" value={repo} onChange={(e) => setRepo(e.target.value)} required placeholder="مثال: pharmacy-site" />
          </Field>
          <Field label="الفرع (Branch)">
            <input className="admin-input" value={branch} onChange={(e) => setBranch(e.target.value)} placeholder="main" />
          </Field>
          <Field label="GitHub Personal Access Token">
            <input className="admin-input" type="password" value={token} onChange={(e) => setToken(e.target.value)} required placeholder="ghp_xxx..." />
          </Field>
        </div>

        {error && <p className="text-red-500 text-sm mt-4">{error}</p>}

        <button
          type="submit"
          disabled={checking}
          className="w-full mt-6 inline-flex items-center justify-center gap-2 py-3 bg-primary-600 hover:bg-primary-500 disabled:opacity-60 text-white font-semibold rounded-xl transition-colors"
        >
          {checking ? <Loader2 className="w-4 h-4 animate-spin" /> : <ShieldCheck className="w-4 h-4" />}
          دخول
        </button>
      </form>
    </div>
  );
}
