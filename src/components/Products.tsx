import { motion } from 'framer-motion';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { HeartPulse, Baby, Eye, Smile, Pill, Activity, UtensilsCrossed, Droplets, ArrowLeft } from 'lucide-react';
import { CATEGORIES, type Category } from '../lib/categories';
import { useSiteData } from '../lib/SiteDataContext';

const ICONS = { HeartPulse, Baby, Eye, Smile, Pill, Activity, UtensilsCrossed, Droplets };

export default function Products() {
  const { ref, isVisible } = useScrollReveal();
  const { data } = useSiteData();

  const countFor = (cat: Category) => data.products.filter((p) => p.categorySlug === cat.slug).length;

  return (
    <section id="products" ref={ref} className="py-20 lg:py-32 bg-surface-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-50 text-accent-600 text-sm font-semibold mb-6">
            <Pill className="w-4 h-4" />
            منتجاتنا المتنوعة
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-surface-900 mb-6 leading-tight">
            أكثر من <span className="gradient-text">5,000 منتج</span>
          </h2>
          <p className="text-lg text-surface-500 leading-relaxed">
            نوفر لك شاملة واسعة من المنتجات الصحية والدوائية من أفضل العلامات التجارية المحلية والعالمية.
          </p>
        </motion.div>

        {/* Products Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIES.map((cat, i) => {
            const Icon = ICONS[cat.iconName];
            const count = countFor(cat);
            return (
              <motion.div
                key={cat.slug}
                initial={{ opacity: 0, y: 40 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.08, duration: 0.6 }}
                className="group"
              >
                <div className="relative h-full flex flex-col bg-white rounded-3xl overflow-hidden border border-surface-100 hover:border-transparent shadow-sm hover:shadow-2xl transition-all duration-500">
                  {/* Gradient top */}
                  <div className={`h-2 bg-gradient-to-r ${cat.gradient}`} />

                  <div className="p-7 flex flex-col flex-1">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${cat.bg} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className={`w-7 h-7 ${cat.iconColor}`} />
                    </div>
                    <h3 className="text-lg font-bold text-surface-900 mb-2">{cat.title}</h3>
                    <p className="text-sm text-surface-400 mb-4">{cat.description}</p>
                    <p className="text-xs text-surface-400 mb-5">
                      {count > 0 ? `${count} منتج متوفر` : 'قريباً منتجات جديدة'}
                    </p>
                    <a
                      href={`#/category/${cat.slug}`}
                      className="mt-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-surface-50 text-surface-700 text-sm font-semibold hover:bg-surface-900 hover:text-white transition-all duration-300"
                    >
                      عرض المزيد عن المنتج
                      <ArrowLeft className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* View all CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-center mt-12"
        >
          <a
            href="#cta"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-surface-900 text-white font-semibold hover:bg-surface-800 transition-all duration-300 hover:scale-105 active:scale-95"
          >
            اكتشف كل منتجاتنا
            <motion.span
              animate={{ x: [-4, 4, -4] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ←
            </motion.span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
