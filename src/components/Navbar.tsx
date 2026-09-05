import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, Pill } from 'lucide-react';
import SocialLinks from './SocialLinks';
import { useSiteData } from '../lib/SiteDataContext';
import { loadSiteSettings } from '../lib/storage';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { data } = useSiteData();
  const [logoUrl, setLogoUrl] = useState<string | null>(null);

  useEffect(() => {
    const settings = loadSiteSettings();
    setLogoUrl(settings.logoUrl || null);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when opening to prevent body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Close menu when clicking on links
  const handleLinkClick = () => {
    setIsOpen(false);
  };

  const links = [
    { label: 'الرئيسية', href: '#hero' },
    { label: 'خدماتنا', href: '#features' },
    { label: 'منتجاتنا', href: '#products' },
    { label: 'مميزاتنا', href: '#benefits' },
    { label: 'آراء العملاء', href: '#testimonials' },
    { label: 'الأسئلة الشائعة', href: '#faq' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/80 backdrop-blur-xl shadow-lg shadow-black/5 border-b border-surface-200/50'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a href="#hero" className="flex items-center gap-2 group min-w-0 flex-shrink-0">
            {logoUrl ? (
              <img
                src={logoUrl}
                alt="Logo"
                className={`w-10 h-10 lg:w-12 lg:h-12 rounded-xl object-cover transition-all duration-300 group-hover:scale-105 ${
                  scrolled ? 'shadow-md' : 'shadow-lg shadow-white/20'
                }`}
              />
            ) : (
              <div className={`w-10 h-10 lg:w-12 lg:h-12 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-105 flex-shrink-0 ${
                scrolled ? 'bg-gradient-to-br from-primary-500 to-accent-600' : 'bg-white/20 backdrop-blur-sm'
              }`}>
                <Pill className="w-6 h-6 lg:w-7 lg:h-7 text-white" />
              </div>
            )}
            <div className="flex flex-col min-w-0 hidden sm:flex">
              <span className={`text-lg lg:text-xl font-bold tracking-tight transition-colors duration-300 truncate ${
                scrolled ? 'text-surface-900' : 'text-white'
              }`}>
                DR. NESRIN
              </span>
              <span className={`text-xs font-medium transition-colors duration-300 truncate ${
                scrolled ? 'text-primary-600' : 'text-primary-300'
              }`}>
                {data.settings.pharmacyName}
              </span>
            </div>
          </a>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-1">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105 ${
                  scrolled
                    ? 'text-surface-600 hover:text-primary-600 hover:bg-primary-50'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA + Contact */}
          <div className="hidden lg:flex items-center gap-3">
            <SocialLinks
              tone={scrolled ? 'dark' : 'light'}
              size="sm"
              className="hidden xl:flex ml-1"
            />
            <span className={`hidden xl:block w-px h-6 ${scrolled ? 'bg-surface-200' : 'bg-white/15'}`} />
            <a
              href={`tel:${data.settings.phone}`}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105 ${
                scrolled
                  ? 'text-surface-600 hover:bg-surface-100'
                  : 'text-white/80 hover:bg-white/10'
              }`}
            >
              <Phone className="w-4 h-4" />
              <span className="hidden xl:inline">اتصل بنا</span>
            </a>
            <a
              href="#cta"
              className="px-6 py-2.5 bg-gradient-to-r from-primary-500 to-primary-600 text-white text-sm font-semibold rounded-xl hover:shadow-lg hover:shadow-primary-500/25 transition-all duration-300"
            >
              اطلب الآن
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`lg:hidden p-2 rounded-xl transition-colors flex-shrink-0 ${
              scrolled ? 'text-surface-700' : 'text-white'
            }`}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white/95 backdrop-blur-xl border-t border-surface-200/50 overflow-hidden"
          >
            <div className="px-3 sm:px-6 py-4 space-y-1 max-h-[calc(100vh-64px)] overflow-y-auto">
              {links.map((link) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={handleLinkClick}
                  whileHover={{ x: -4 }}
                  className="block px-4 py-3 rounded-xl text-surface-700 font-medium hover:bg-primary-50 hover:text-primary-600 transition-colors"
                >
                  {link.label}
                </motion.a>
              ))}
              <div className="pt-3 border-t border-surface-200/50 space-y-2 mt-2">
                <a
                  href={`tel:${data.settings.phone}`}
                  onClick={handleLinkClick}
                  className="flex items-center gap-2 px-4 py-3 rounded-xl text-surface-600 hover:bg-surface-50 transition-colors"
                >
                  <Phone className="w-4 h-4 flex-shrink-0" />
                  <span>اتصل بنا</span>
                </a>
                <a
                  href="#cta"
                  onClick={handleLinkClick}
                  className="block px-4 py-3 bg-gradient-to-r from-primary-500 to-accent-500 text-white text-center font-semibold rounded-xl transition-all hover:shadow-lg hover:shadow-primary-500/30"
                >
                  اطلب الآن
                </a>
                <div className="pt-3 flex justify-center pb-2">
                  <SocialLinks tone="dark" size="md" solid />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
