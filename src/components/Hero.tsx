import { motion } from 'framer-motion';
import { ArrowDown, Shield, Truck, HeartPulse, Star, CheckCircle, Clock, Phone, Pill } from 'lucide-react';
import SocialLinks from './SocialLinks';
import { useSiteData } from '../lib/SiteDataContext';

export default function Hero() {
  const { data } = useSiteData();
  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden hero-gradient">
      {/* Ambient animated orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute top-1/3 -left-20 w-80 h-80 bg-accent-500/15 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-1/4 w-64 h-64 bg-primary-400/10 rounded-full blur-3xl animate-float-delayed" />
        <div className="absolute top-1/4 right-1/3 w-48 h-48 bg-gold-400/10 rounded-full blur-3xl animate-pulse-glow" />
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 lg:py-40">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-right">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 mb-8"
            >
              <div className="flex -space-x-1 space-x-reverse">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 text-gold-400 fill-gold-400" />
                ))}
              </div>
              <span className="text-white/80 text-sm font-medium">مقيّمون بـ 4.9/5 من أكثر من 2,000 عميل</span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-white leading-tight mb-6 animate-slide-up"
            >
              صحتكم
              <br />
              <span className="bg-gradient-to-l from-primary-300 via-primary-400 to-accent-400 bg-clip-text text-transparent">
                أولويتنا
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-lg sm:text-xl text-white/60 leading-relaxed mb-10 max-w-xl mx-auto lg:mx-0 lg:mr-0"
            >
              {data.settings.pharmacyName} — حيث تلتقي الخبرة الطبية بالخدمة المتميزة. 
              أدوية موثوقة 100%، استشارات مجانية مع صيادلة محترفين، وتوصيل سريع لباب بيتك.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <a
                href="#cta"
                className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-primary-500 to-accent-600 text-white font-bold text-lg rounded-2xl hover:shadow-2xl hover:shadow-primary-500/40 transition-all duration-300 hover:scale-105 active:scale-95 overflow-hidden"
              >
                <span className="relative z-10">اطلب أدويتك الآن</span>
                <ArrowDown className="w-5 h-5 relative z-10 group-hover:translate-y-1 transition-transform" />
                <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-700 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              <a
                href={`tel:${data.settings.phone}`}
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold text-lg rounded-2xl hover:bg-white/20 transition-all duration-300 hover:scale-105 active:scale-95"
              >
                <Phone className="w-5 h-5" />
                اتصل بنا
              </a>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="mt-12 flex flex-wrap gap-6 justify-center lg:justify-start"
            >
              {[
                { icon: Shield, text: 'موثوقية 100%' },
                { icon: Truck, text: 'توصيل سريع' },
                { icon: HeartPulse, text: 'صيادلة محترفون' },
                { icon: Clock, text: 'مفتوح يومياً' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-white/50 text-sm">
                  <CheckCircle className="w-4 h-4 text-primary-400" />
                  <span>{item.text}</span>
                </div>
              ))}
            </motion.div>

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.15, duration: 0.8 }}
              className="mt-10 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center gap-4 lg:justify-start justify-center"
            >
              <span className="text-white/40 text-sm font-medium">تابعنا وقيّمنا</span>
              <SocialLinks tone="light" size="md" />
            </motion.div>
          </div>

          {/* Right Content - 3D Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="hidden lg:flex justify-center"
          >
            <div className="relative">
              {/* Main card */}
              <div className="relative w-96 h-[500px] rounded-3xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 overflow-hidden animate-float">
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary-400 to-accent-500 flex items-center justify-center mb-8 shadow-2xl shadow-primary-500/30">
                    <Pill className="w-16 h-16 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3 text-center">{data.settings.pharmacyName}</h3>
                  <p className="text-white/50 text-center text-sm leading-relaxed mb-6">
                    أكثر من 15 عاماً من الخبرة في خدمة مجتمعكم
                  </p>
                  <div className="grid grid-cols-3 gap-4 w-full">
                    {[
                      { label: 'عميل سعيد', value: '10K+' },
                      { label: 'منتج متوفر', value: '5K+' },
                      { label: 'سنوات خبرة', value: '15+' },
                    ].map((stat, i) => (
                      <div key={i} className="text-center p-3 rounded-2xl bg-white/5 border border-white/10">
                        <div className="text-xl font-bold text-primary-300">{stat.value}</div>
                        <div className="text-xs text-white/40 mt-1">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating badge 1 */}
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -right-4 top-16 glass rounded-2xl p-4 shadow-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white">منتجات أصلية</div>
                    <div className="text-xs text-white/40">ضمان الجودة</div>
                  </div>
                </div>
              </motion.div>

              {/* Floating badge 2 */}
              <motion.div
                animate={{ y: [10, -10, 10] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute -left-8 bottom-24 glass rounded-2xl p-4 shadow-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
                    <Truck className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white">توصيل مجاني</div>
                    <div className="text-xs text-white/40">خلال 30 دقيقة</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-surface-50 to-transparent z-10" />
    </section>
  );
}
