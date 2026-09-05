import { motion } from 'framer-motion';
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function SocialProof() {
  const { ref, isVisible } = useScrollReveal();

  const stats = [
    { value: '15+', label: 'سنوات خبرة', icon: '🏆' },
    { value: '10,000+', label: 'عميل سعيد', icon: '😊' },
    { value: '5,000+', label: 'منتج متوفر', icon: '💊' },
    { value: '30 د', label: 'توصيل سريع', icon: '🚚' },
  ];

  return (
    <section ref={ref} className="py-20 lg:py-28 bg-surface-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 + i * 0.1, duration: 0.6 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary-500/5 to-accent-500/5 rounded-3xl scale-[0.95] group-hover:scale-100 transition-transform duration-500" />
              <div className="relative bg-white rounded-3xl p-8 border border-surface-100 shadow-sm hover:shadow-xl hover:shadow-primary-500/5 transition-all duration-500 text-center">
                <div className="text-4xl mb-3">{stat.icon}</div>
                <div className="text-3xl lg:text-4xl font-black gradient-text mb-2">{stat.value}</div>
                <div className="text-surface-500 text-sm font-medium">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
