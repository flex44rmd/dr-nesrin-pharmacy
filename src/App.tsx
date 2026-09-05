import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SocialProof from './components/SocialProof';
import Features from './components/Features';
import Products from './components/Products';
import Benefits from './components/Benefits';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import CTA from './components/CTA';
import Footer from './components/Footer';
import { useEffect, useState } from 'react';
import { Star } from 'lucide-react';
import { useHashRoute } from './lib/useHashRoute';
import { useSiteData } from './lib/SiteDataContext';
import CategoryPage from './pages/CategoryPage';
import ProductPage from './pages/ProductPage';
import AdminPage from './pages/AdminPage';
import SetupPage from './pages/SetupPage';
import { isSetupCompleted } from './lib/storage';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [setupCompleted, setSetupCompleted] = useState(isSetupCompleted());
  const route = useHashRoute();
  const { data } = useSiteData();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (!setupCompleted && !loading) {
    return <SetupPage onComplete={() => setSetupCompleted(true)} />;
  }

  if (route.page === 'admin') return <AdminPage />;
  if (route.page === 'category') return <CategoryPage slug={route.slug} />;
  if (route.page === 'product') return <ProductPage id={route.id} />;

  if (loading) {
    return (
      <div className="fixed inset-0 bg-surface-900 flex items-center justify-center z-[100]">
        <div className="text-center">
          {/* Loading spinner */}
          <div className="relative w-20 h-20 mx-auto mb-6">
            <div className="absolute inset-0 rounded-full border-4 border-surface-800" />
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary-500 animate-spin" />
            <div className="absolute inset-3 rounded-full bg-gradient-to-br from-primary-500 to-accent-600 flex items-center justify-center">
              <span className="text-2xl">💊</span>
            </div>
          </div>
          <div className="w-32 h-1 bg-surface-800 rounded-full mx-auto overflow-hidden">
            <div className="h-full bg-gradient-to-r from-primary-500 to-accent-500 rounded-full animate-pulse" style={{ width: '60%' }} />
          </div>
          <p className="text-white/50 text-sm mt-4 font-medium">جار التحميل...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white" dir="rtl">
      <Navbar />
      <main>
        <Hero />
        <SocialProof />
        <Features />
        <Products />
        <Benefits />
        <Testimonials />
        <FAQ />
        <CTA />
      </main>
      <Footer />
      
      {/* Floating WhatsApp Button */}
      <a
        href={data.settings.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 left-6 z-50 w-14 h-14 bg-green-500 hover:bg-green-400 text-white rounded-full shadow-2xl shadow-green-500/30 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95"
        aria-label="Contact us on WhatsApp"
      >
        <svg viewBox="0 0 24 24" className="w-7 h-7 fill-white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>

      {/* Floating Rating Button */}
      <a
        href={data.settings.ratingUrl}
        {...(data.settings.ratingUrl.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        className="fixed bottom-6 right-6 z-50 flex flex-col items-center gap-1 w-16 h-16 bg-gradient-to-br from-amber-400 to-yellow-500 text-white rounded-full shadow-2xl shadow-amber-500/30 justify-center transition-all duration-300 hover:scale-110 active:scale-95"
        aria-label="قيّم الصيدلية"
      >
        <Star className="w-5 h-5 fill-white" />
        <span className="text-[10px] font-bold leading-none">{data.settings.ratingLabel}</span>
      </a>
    </div>
  );
}
