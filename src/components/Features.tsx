import { motion } from 'framer-motion';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { 
  Stethoscope, Truck, Clock, MessageCircle, 
  ShieldCheck, Heart, Sparkles 
} from 'lucide-react';

export default function Features() {
  const { ref, isVisible } = useScrollReveal();

  const features = [
    {
      icon: Stethoscope,
      title: 'استشارات مجانية',
      description: 'فريق من الصيادلة المحترفين متاح لمساعدتك في اختيار العلاج المناسب والإجابة على استفساراتك الصحية.',
      color: 'from-blue-500 to-blue-600',
      bg: 'bg-blue-50',
      iconColor: 'text-blue-600',
      span: 'md:col-span-1',
    },
    {
      icon: Truck,
      title: 'توصيل سريع ومجاني',
      description: 'نوصل طلبك لباب بيتك خلال 30 دقيقة فقط. توصيل مجاني لجميع الطلبات داخل المدينة.',
      color: 'from-primary-500 to-primary-600',
      bg: 'bg-primary-50',
      iconColor: 'text-primary-600',
      span: 'md:col-span-1',
    },
    {
      icon: ShieldCheck,
      title: 'ضمان الجودة والأصالة',
      description: 'جميع منتجاتنا أصلية 100% ومستوردة من أفضل المصانع المعتمدة. نضمن لك الجودة في كل منتج.',
      color: 'from-purple-500 to-purple-600',
      bg: 'bg-purple-50',
      iconColor: 'text-purple-600',
      span: 'md:col-span-1',
    },
    {
      icon: Clock,
      title: 'متاحون يومياً',
      description: 'نعمل طوال أيام الأسبوع من الصباح حتى المساء. طاقمنا جاهز لخدمتك متى احتجت.',
      color: 'from-amber-500 to-amber-600',
      bg: 'bg-amber-50',
      iconColor: 'text-amber-600',
      span: 'md:col-span-1',
    },
    {
      icon: MessageCircle,
      title: 'طلب عبر الواتساب',
      description: 'أرسل لنا قائمة أدويتك عبر الواتساب وسنجهز طلبك فوراً. خدمة سريعة وسهلة.',
      color: 'from-green-500 to-green-600',
      bg: 'bg-green-50',
      iconColor: 'text-green-600',
      span: 'md:col-span-1',
    },
    {
      icon: Heart,
      title: 'رعاية صحية شاملة',
      description: 'نقدم خدمات قياس الضغط والسكر مجاناً، بالإضافة إلى نصائح صحية مخصصة لكل عميل.',
      color: 'from-rose-500 to-rose-600',
      bg: 'bg-rose-50',
      iconColor: 'text-rose-600',
      span: 'md:col-span-1',
    },
  ];

  return (
    <section id="features" ref={ref} className="py-20 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 text-primary-600 text-sm font-semibold mb-6">
            <Sparkles className="w-4 h-4" />
            لماذا تختارنا؟
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-surface-900 mb-6 leading-tight">
            خدماتنا
            <span className="gradient-text"> المتميزة</span>
          </h2>
            <p className="text-lg text-surface-500 leading-relaxed">
              في صيدلية دكتورة نسرين، نؤمن بأن صحتك تستحق الأفضل. نقدم لك مجموعة شاملة من الخدمات التي تجمع بين الجودة والراحة.
            </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary-500/5 to-accent-500/5 rounded-3xl scale-[0.95] group-hover:scale-100 transition-transform duration-500" />
              <div className="relative h-full bg-white rounded-3xl p-8 border border-surface-100 hover:border-primary-200/50 shadow-sm hover:shadow-2xl hover:shadow-primary-500/10 transition-all duration-500">
                <div className={`w-14 h-14 rounded-2xl ${feature.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className={`w-7 h-7 ${feature.iconColor}`} />
                </div>
                <h3 className="text-xl font-bold text-surface-900 mb-3">{feature.title}</h3>
                <p className="text-surface-500 leading-relaxed text-sm">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
