import { 
  MapPin, Phone, Clock, Mail, MessageCircle, 
  Pill, ArrowUp 
} from 'lucide-react';
import { useSiteData } from '../lib/SiteDataContext';

export default function Footer() {
  const { data } = useSiteData();
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-surface-900 text-white relative overflow-hidden">
      {/* Top gradient line */}
      <div className="h-1 bg-gradient-to-r from-primary-500 via-accent-500 to-primary-500" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer */}
        <div className="py-16 grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center">
                <Pill className="w-7 h-7 text-white" />
              </div>
              <div>
                <div className="text-lg font-bold">DR. NESRIN</div>
                <div className="text-xs text-surface-400">{data.settings.pharmacyName}</div>
              </div>
            </div>
            <p className="text-surface-400 text-sm leading-relaxed mb-6">
              صحتكم أولويتنا. نقدم لكم أفضل الخدمات الصحية والدوائية بأعلى معايير الجودة منذ أكثر من 15 عاماً.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-white mb-6">روابط سريعة</h4>
            <ul className="space-y-3">
              {['الرئيسية', 'خدماتنا', 'منتجاتنا', 'مميزاتنا', 'آراء العملاء', 'الأسئلة الشائعة'].map((link, i) => (
                <li key={i}>
                  <a href="#" className="text-surface-400 hover:text-primary-400 text-sm transition-colors flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-surface-600 group-hover:bg-primary-400 transition-colors" />
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold text-white mb-6">خدماتنا</h4>
            <ul className="space-y-3">
              {[
                'استشارات مجانية',
                'توصيل سريع',
                'قياس الضغط والسكر',
                'برامج الولاء',
                'أدوية بوصفة طبية',
                'مكملات غذائية',
              ].map((service, i) => (
                <li key={i}>
                  <a href="#" className="text-surface-400 hover:text-primary-400 text-sm transition-colors flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-surface-600 group-hover:bg-primary-400 transition-colors" />
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-white mb-6">تواصل معنا</h4>
            <div className="space-y-4">
              <a href={data.settings.mapsUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-surface-400 hover:text-primary-400 transition-colors group">
                <div className="w-10 h-10 rounded-xl bg-surface-800 group-hover:bg-primary-600/20 flex items-center justify-center transition-colors">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm">العنوان</div>
                  <div className="text-xs text-surface-500">حي النصر، شارع الرئيس بوضياف</div>
                </div>
              </a>
              <a href={`tel:${data.settings.phone}`} className="flex items-center gap-3 text-surface-400 hover:text-primary-400 transition-colors group">
                <div className="w-10 h-10 rounded-xl bg-surface-800 group-hover:bg-primary-600/20 flex items-center justify-center transition-colors">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm">الهاتف</div>
                  <div className="text-xs text-surface-500">0000 00 00 06</div>
                </div>
              </a>
              <a href="#" className="flex items-center gap-3 text-surface-400 hover:text-primary-400 transition-colors group">
                <div className="w-10 h-10 rounded-xl bg-surface-800 group-hover:bg-primary-600/20 flex items-center justify-center transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm">البريد الإلكتروني</div>
                  <div className="text-xs text-surface-500">contact@pharmacie-nesrin.dz</div>
                </div>
              </a>
              <div className="flex items-center gap-3 text-surface-400">
                <div className="w-10 h-10 rounded-xl bg-surface-800 flex items-center justify-center">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm">أوقات العمل</div>
                  <div className="text-xs text-surface-500">8:00 - 22:00 يومياً</div>
                </div>
              </div>
            </div>

            {/* WhatsApp button */}
            <a
              href={data.settings.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-500 text-white font-semibold rounded-2xl transition-all duration-300 hover:scale-105"
            >
              <MessageCircle className="w-5 h-5" />
              واتساب
            </a>
          </div>
        </div>

        {/* Bottom */}
        <div className="py-8 border-t border-surface-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-surface-500 text-sm">
            © 2025 {data.settings.pharmacyName}. جميع الحقوق محفوظة.
          </p>
          <button
            onClick={scrollToTop}
            className="w-10 h-10 rounded-xl bg-surface-800 hover:bg-primary-600 flex items-center justify-center transition-all duration-300 hover:scale-110"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
