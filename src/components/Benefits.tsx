import { motion } from 'framer-motion';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { 
  ArrowLeft, CheckCircle2 
} from 'lucide-react';

export default function Benefits() {
  const { ref, isVisible } = useScrollReveal();

  const benefits = [
    {
      title: 'أدوية أصلية 100%',
      description: 'نستورد أدويتنا مباشرة من المصانع المعتمدة. كل منتج يمر بفحص جودة صارم قبل بيعه لك.',
      detail: 'شراكات مباشرة مع أكبر 50 مصنع دوائي عالمي',
    },
    {
      title: 'استشارة صيدلانية مجانية',
      description: 'فريقنا من الصيادلة المؤهلين يقدم لك استشارات طبية مجانية حول أدويتك وتفاعلاتها.',
      detail: 'أكثر من 5 صيادلة متخصصون في مختلف التخصصات',
    },
    {
      title: 'توصيل لباب بيتك',
      description: 'خدمة التوصيل السريع نصلك أينما كنت. التوصيل مجاني داخل المدينة خلال 30 دقيقة.',
      detail: 'تغطية كامل المدينة والمناطق المجاورة',
    },
    {
      title: 'أسعار تنافسية',
      description: 'نقدم لك أفضل الأسعار مع ضمان الجودة. خصومات مستمرة لأعضاء برنامج الولاء.',
      detail: 'خصومات تصل إلى 30% على منتجات مختارة',
    },
    {
      title: 'خصوصية وتأكيد',
      description: 'نحترم خصوصيتك بالكامل. جميع طلباتك تعامل بأسرار تامة وتغليف محترم.',
      detail: 'تغليف محكم وغير واضح للمحتويات',
    },
    {
      title: 'متابعة صحية',
      description: 'نوفر لك خدمة متابعة الحالة الصحية بشكل دوري مع تذكير بمواعيد الجرعات.',
      detail: 'تذكير عبر الواتساب بالجرعات والمواعيد',
    },
  ];

  return (
    <section id="benefits" ref={ref} className="py-20 lg:py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 text-primary-600 text-sm font-semibold mb-6">
              <CheckCircle2 className="w-4 h-4" />
              لماذا نحن مختلفون؟
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-surface-900 mb-6 leading-tight">
              مميزات تجعلنا
              <br />
              <span className="gradient-text">الخيار الأول</span>
            </h2>
            <p className="text-lg text-surface-500 leading-relaxed mb-10">
              في صيدلية دكتورة نسرين، نسعى دائماً لتقديم تجربة صحية استثنائية تجمع بين الجودة والراحة والثقة.
            </p>

            {/* Benefits List */}
            <div className="space-y-4">
              {benefits.map((benefit, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -30 }}
                  animate={isVisible ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.6 }}
                  className="group flex items-start gap-4 p-4 rounded-2xl hover:bg-surface-50 transition-colors duration-300 cursor-default"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 flex items-center justify-center mt-0.5 group-hover:scale-110 transition-transform">
                    <CheckCircle2 className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-surface-900 mb-1">{benefit.title}</h4>
                    <p className="text-sm text-surface-500 leading-relaxed">{benefit.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Visual */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="relative"
          >
            <div className="relative">
              {/* Main card */}
              <div className="relative rounded-3xl bg-gradient-to-br from-primary-500 via-primary-600 to-accent-700 p-10 lg:p-14 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full opacity-10">
                  <div className="absolute top-4 left-4 w-32 h-32 border border-white rounded-full" />
                  <div className="absolute bottom-8 right-8 w-48 h-48 border border-white rounded-full" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-white rounded-full" />
                </div>

                <div className="relative text-center">
                  <div className="text-6xl mb-6">🏥</div>
                  <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
                    صيدلية دكتورة نسرين
                  </h3>
                  <p className="text-white/60 mb-8 leading-relaxed">
                    أكثر من 15 عاماً من الثقة والاحتراف في خدمة مجتمعكم
                  </p>

                  <div className="grid grid-cols-2 gap-4 mb-8">
                    {[
                      { icon: '💊', label: 'أدوية أصلية', value: '100%' },
                      { icon: '⚕️', label: 'صادلة محترفون', value: '5+' },
                      { icon: '🚚', label: 'توصيل سريع', value: '30د' },
                      { icon: '⭐', label: 'رضا العملاء', value: '4.9' },
                    ].map((item, i) => (
                      <div
                        key={i}
                        className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/10"
                      >
                        <div className="text-2xl mb-2">{item.icon}</div>
                        <div className="text-xl font-bold text-white">{item.value}</div>
                        <div className="text-xs text-white/50">{item.label}</div>
                      </div>
                    ))}
                  </div>

                  <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                    <ArrowLeft className="w-4 h-4 text-white" />
                    <span className="text-white/80 text-sm font-medium">تعرف علينا أكثر</span>
                  </div>
                </div>
              </div>

              {/* Floating elements */}
              <motion.div
                animate={{ y: [-8, 8, -8] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -right-6 top-10 glass-card rounded-2xl p-4 shadow-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-surface-900">معتمد رسمياً</div>
                    <div className="text-xs text-surface-400">وزارة الصحة</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [8, -8, 8] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute -left-6 bottom-16 glass-card rounded-2xl p-4 shadow-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
                    <span className="text-lg">⭐</span>
                  </div>
                  <div>
                    <div className="text-sm font-bold text-surface-900">4.9/5 تقييم</div>
                    <div className="text-xs text-surface-400">+2000 مراجعة</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
