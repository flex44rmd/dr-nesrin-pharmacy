import { useState } from 'react';
import { ArrowRight, AlertCircle, CheckCircle2, Upload, Loader2 } from 'lucide-react';
import { markSetupAsCompleted, updateSiteSettings } from '../lib/storage';

interface SetupPageProps {
  onComplete: () => void;
}

export default function SetupPage({ onComplete }: SetupPageProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Step 1: Repository Configuration
  const [owner, setOwner] = useState('');
  const [repo, setRepo] = useState('');
  const [token, setToken] = useState('');

  // Step 2: Branding
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [faviconFile, setFaviconFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [faviconPreview, setFaviconPreview] = useState<string | null>(null);

  // Step 3: Password
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  function handleLogoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setLogoFile(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        setLogoPreview(event.target?.result as string);
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
        setFaviconPreview(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  }

  async function handleNext() {
    setError(null);

    if (step === 1) {
      if (!owner.trim() || !repo.trim() || !token.trim()) {
        setError('يرجى ملء جميع الحقول');
        return;
      }
      updateSiteSettings({
        repositoryOwner: owner.trim(),
        repositoryName: repo.trim(),
        gitToken: token.trim(),
      });
      setStep(2);
    } else if (step === 2) {
      if (!logoPreview && !faviconPreview) {
        setError('يرجى اختيار على الأقل اللوجو أو الـ Favicon');
        return;
      }
      if (logoPreview) updateSiteSettings({ logoUrl: logoPreview });
      if (faviconPreview) updateSiteSettings({ faviconUrl: faviconPreview });
      setStep(3);
    } else if (step === 3) {
      if (!password || !confirmPassword) {
        setError('يرجى إدخال كلمة المرور');
        return;
      }
      if (password !== confirmPassword) {
        setError('كلمات المرور غير متطابقة');
        return;
      }
      if (password.length < 6) {
        setError('كلمة المرور يجب أن تكون 6 أحرف على الأقل');
        return;
      }

      setLoading(true);
      try {
        // Simulate saving (في تطبيق حقيقي ستحتاج لحفظ كلمة المرور بطريقة آمنة)
        await new Promise((resolve) => setTimeout(resolve, 1000));
        
        // Store password as a hash (simplified - في الإنتاج استخدم bcrypt أو ما شابه)
        updateSiteSettings({
          setupCompleted: true,
        });
        markSetupAsCompleted();
        onComplete();
      } catch (err) {
        setError(err instanceof Error ? err.message : 'حدث خطأ');
      } finally {
        setLoading(false);
      }
    }
  }

  function handleBack() {
    if (step > 1) setStep((s) => (s - 1) as 1 | 2 | 3);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-surface-50 to-accent-50 flex items-center justify-center px-4 py-8" dir="rtl">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">💊</span>
          </div>
          <h1 className="text-3xl lg:text-4xl font-black text-primary-900 mb-2">
            إعداد صيدليتك
          </h1>
          <p className="text-surface-600 text-lg">
            خطوات بسيطة لبدء الموقع الخاص بك
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-between mb-8">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex flex-col items-center flex-1">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                  step >= s
                    ? 'bg-gradient-to-br from-primary-500 to-accent-500 text-white'
                    : 'bg-surface-200 text-surface-500'
                }`}
              >
                {step > s ? <CheckCircle2 className="w-5 h-5" /> : s}
              </div>
              <div className="text-xs font-medium text-surface-600 mt-2 whitespace-nowrap">
                {s === 1 && 'المستودع'}
                {s === 2 && 'اللوجو'}
                {s === 3 && 'كلمة المرور'}
              </div>
            </div>
          ))}
        </div>

        {/* Progress Bar */}
        <div className="h-1 bg-surface-200 rounded-full mb-8 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary-500 to-accent-500 transition-all duration-500"
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>

        {/* Step 1: Repository */}
        {step === 1 && (
          <div className="bg-white rounded-3xl border border-surface-200 p-8 lg:p-10 shadow-lg animate-slide-up">
            <h2 className="text-2xl font-bold text-primary-900 mb-6">بيانات مستودع GitHub</h2>
            <p className="text-surface-600 mb-6">أدخل بيانات مستودع GitHub الخاص بك للربط والمزامنة التلقائية</p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-surface-700 mb-2">
                  اسم المستخدم / المؤسسة
                </label>
                <input
                  type="text"
                  value={owner}
                  onChange={(e) => setOwner(e.target.value)}
                  placeholder="مثال: pharmacy-team"
                  className="w-full px-4 py-3 rounded-xl border border-surface-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-surface-700 mb-2">
                  اسم المستودع
                </label>
                <input
                  type="text"
                  value={repo}
                  onChange={(e) => setRepo(e.target.value)}
                  placeholder="مثال: pharmacy-site"
                  className="w-full px-4 py-3 rounded-xl border border-surface-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-surface-700 mb-2">
                  GitHub Personal Access Token
                </label>
                <input
                  type="password"
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                  placeholder="ghp_xxx..."
                  className="w-full px-4 py-3 rounded-xl border border-surface-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition"
                />
                <p className="text-xs text-surface-500 mt-2">
                  سيتم حفظ البيانات في متصفحك فقط ولن تُرسل لأي جهة خارجية
                </p>
              </div>
            </div>

            {error && (
              <div className="mt-6 flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm">{error}</span>
              </div>
            )}

            <div className="flex gap-4 mt-8">
              <button
                onClick={handleNext}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-primary-500 to-accent-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-primary-500/25 transition-all active:scale-95"
              >
                التالي
                <ArrowRight className="w-4 h-4 inline mr-2" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Branding */}
        {step === 2 && (
          <div className="bg-white rounded-3xl border border-surface-200 p-8 lg:p-10 shadow-lg animate-slide-up">
            <h2 className="text-2xl font-bold text-primary-900 mb-6">تخصيص الهوية البصرية</h2>
            <p className="text-surface-600 mb-6">أضيفي اللوجو والـ Favicon الخاص بصيدليتك</p>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Logo Upload */}
              <div>
                <label className="block text-sm font-semibold text-surface-700 mb-3">
                  اللوجو الرئيسي
                </label>
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-primary-300 rounded-2xl cursor-pointer hover:border-primary-500 transition bg-primary-50/50">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-6 h-6 text-primary-500 mb-2" />
                    <span className="text-sm font-medium text-primary-600">اختر الصورة</span>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleLogoChange}
                    className="hidden"
                  />
                </label>
                {logoPreview && (
                  <div className="mt-3 p-3 bg-surface-50 rounded-xl flex items-center justify-center">
                    <img
                      src={logoPreview}
                      alt="Logo preview"
                      className="max-h-20 max-w-full"
                    />
                  </div>
                )}
              </div>

              {/* Favicon Upload */}
              <div>
                <label className="block text-sm font-semibold text-surface-700 mb-3">
                  أيقونة التبويب (Favicon)
                </label>
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-accent-300 rounded-2xl cursor-pointer hover:border-accent-500 transition bg-accent-50/50">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-6 h-6 text-accent-500 mb-2" />
                    <span className="text-sm font-medium text-accent-600">اختر الصورة</span>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFaviconChange}
                    className="hidden"
                  />
                </label>
                {faviconPreview && (
                  <div className="mt-3 p-3 bg-surface-50 rounded-xl flex items-center justify-center">
                    <img
                      src={faviconPreview}
                      alt="Favicon preview"
                      className="w-8 h-8"
                    />
                  </div>
                )}
              </div>
            </div>

            {error && (
              <div className="mt-6 flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm">{error}</span>
              </div>
            )}

            <div className="flex gap-4 mt-8">
              <button
                onClick={handleBack}
                className="flex-1 px-6 py-3 border-2 border-surface-300 text-surface-700 font-semibold rounded-xl hover:bg-surface-50 transition"
              >
                السابق
              </button>
              <button
                onClick={handleNext}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-primary-500 to-accent-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-primary-500/25 transition-all active:scale-95"
              >
                التالي
                <ArrowRight className="w-4 h-4 inline mr-2" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Password */}
        {step === 3 && (
          <div className="bg-white rounded-3xl border border-surface-200 p-8 lg:p-10 shadow-lg animate-slide-up">
            <h2 className="text-2xl font-bold text-primary-900 mb-6">تعيين كلمة المرور</h2>
            <p className="text-surface-600 mb-6">اختري كلمة مرور قوية للدخول إلى لوحة التحكم</p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-surface-700 mb-2">
                  كلمة المرور
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="أدخل كلمة مرور قوية"
                  className="w-full px-4 py-3 rounded-xl border border-surface-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-surface-700 mb-2">
                  تأكيد كلمة المرور
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="أعد إدخال كلمة المرور"
                  className="w-full px-4 py-3 rounded-xl border border-surface-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition"
                />
              </div>

              <div className="mt-6 p-4 bg-accent-50 border border-accent-200 rounded-xl">
                <p className="text-sm text-accent-900">
                  <strong>تنبيه:</strong> استخدمي كلمة مرور قوية تحتوي على أحرف وأرقام وأحرف كبيرة لحماية أفضل
                </p>
              </div>
            </div>

            {error && (
              <div className="mt-6 flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm">{error}</span>
              </div>
            )}

            <div className="flex gap-4 mt-8">
              <button
                onClick={handleBack}
                disabled={loading}
                className="flex-1 px-6 py-3 border-2 border-surface-300 text-surface-700 font-semibold rounded-xl hover:bg-surface-50 transition disabled:opacity-50"
              >
                السابق
              </button>
              <button
                onClick={handleNext}
                disabled={loading}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-primary-500 to-accent-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-primary-500/25 transition-all active:scale-95 disabled:opacity-60 inline-flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    جاري الحفظ...
                  </>
                ) : (
                  <>
                    إنهاء
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
