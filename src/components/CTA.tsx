import { motion } from 'framer-motion';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { ArrowDown, Phone, MessageCircle, MapPin, Clock, Heart, ShieldCheck, Sparkles } from 'lucide-react';
import { FacebookIcon, InstagramIcon, TikTokIcon } from './SocialLinks';
import { useSiteData } from '../lib/SiteDataContext';

export default function CTA() {
  const { ref, isVisible } = useScrollReveal();
  const { data } = useSiteData();

  return (
    <section id="cta" ref={ref} className="py-20 lg:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 hero-gradient" />
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-accent-500/20 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-400/10 rounded-full blur-3xl animate-float" />
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
          backgroundSize: '32px 32px'
        }} />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          {/* Sparkle */}
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="inline-block mb-6"
          >
            <Sparkles className="w-12 h-12 text-gold-400" />
          </motion.div>

          <h2 className="text-3xl sm:text-4xl lg:text-6xl font-black text-white mb-6 leading-tight">
            صحتك تبدأ من هنا
            <br />
            <span className="bg-gradient-to-l from-primary-300 to-accent-300 bg-clip-text text-transparent">
              اطلب الآن
            </span>
          </h2>
          
          <p className="text-lg lg:text-xl text-white/60 mb-12 max-w-2xl mx-auto leading-relaxed">
            لا تنتظر أكثر! أرسل لنا طلبك عبر الواتساب أو اتصل بنا مباشرة. 
            فريقنا جاهز لخدمتك خلال دقائق.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <a
              href={data.settings.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center justify-center gap-3 px-10 py-5 bg-green-500 text-white font-bold text-lg rounded-2xl hover:shadow-2xl hover:shadow-green-500/30 transition-all duration-300 hover:scale-105 active:scale-95 overflow-hidden"
            >
              <MessageCircle className="w-6 h-6" />
              <span>اطلب عبر الواتساب</span>
              <ArrowDown className="w-5 h-5 rotate-[-45deg] group-hover:translate-y-1 transition-transform" />
            </a>
            <a
              href={`tel:${data.settings.phone}`}
              className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-bold text-lg rounded-2xl hover:bg-white/20 transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <Phone className="w-6 h-6" />
              اتصل بنا
            </a>
          </div>

          {/* Social order buttons */}
          <div className="flex flex-wrap gap-4 justify-center mb-16">
            <a
              href={data.settings.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#1877F2] text-white font-bold rounded-2xl hover:shadow-2xl hover:shadow-[#1877F2]/30 transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <FacebookIcon className="w-5 h-5" />
              اطلب عبر فيسبوك
            </a>
            <a
              href={data.settings.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-br from-[#F58529] via-[#DD2A7B] to-[#8134AF] text-white font-bold rounded-2xl hover:shadow-2xl hover:shadow-pink-500/30 transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <InstagramIcon className="w-5 h-5" />
              اطلب عبر انستجرام
            </a>
            <a
              href={data.settings.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-black text-white font-bold rounded-2xl hover:shadow-2xl hover:shadow-black/30 transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <TikTokIcon className="w-5 h-5" />
              اطلب عبر تيك توك
            </a>
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {[
              { icon: ShieldCheck, text: 'أدوية أصلية 100%' },
              { icon: Clock, text: 'متاح يومياً' },
              { icon: Heart, text: 'استشارة مجانية' },
              { icon: MapPin, text: 'توصيل سريع' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                className="glass rounded-2xl p-4 flex items-center justify-center gap-3"
              >
                <item.icon className="w-5 h-5 text-primary-300" />
                <span className="text-white/70 text-sm font-medium text-center">{item.text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
