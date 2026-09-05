import { motion } from 'framer-motion';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Star, Quote } from 'lucide-react';
import { useSiteData } from '../lib/SiteDataContext';

const AVATARS = ['👨', '👩', '👨‍💼', '👩‍💼', '💪', '👴', '👵', '🧕', '👨‍⚕️', '👩‍⚕️'];

export default function Testimonials() {
  const { ref, isVisible } = useScrollReveal();
  const { data } = useSiteData();
  const testimonials = data.reviews;

  return (
    <section id="testimonials" ref={ref} className="py-20 lg:py-32 bg-surface-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 text-amber-600 text-sm font-semibold mb-6">
            <Star className="w-4 h-4 fill-amber-600" />
            آراء عملائنا
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-surface-900 mb-6 leading-tight">
            ماذا يقول
            <span className="gradient-text"> عملاؤنا؟</span>
          </h2>
          <p className="text-lg text-surface-500 leading-relaxed">
            نفخر بثقة آلاف العملاء فينا. إليك بعض تجاربهم مع صيدلية دكتورة نسرين.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="group"
            >
              <div className="relative h-full bg-white rounded-3xl p-8 border border-surface-100 hover:border-primary-200/50 shadow-sm hover:shadow-2xl hover:shadow-primary-500/10 transition-all duration-500">
                {/* Quote icon */}
                <Quote className="absolute top-6 left-6 w-10 h-10 text-primary-100 rotate-180" />
                
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-gold-400 fill-gold-400" />
                  ))}
                </div>

                {/* Text */}
                <p className="text-surface-600 leading-relaxed mb-6 relative z-10 text-sm">
                  "{testimonial.text}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-3 pt-4 border-t border-surface-100">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-100 to-accent-100 flex items-center justify-center text-2xl">
                    {AVATARS[i % AVATARS.length]}
                  </div>
                  <div>
                    <div className="font-bold text-surface-900">{testimonial.name}</div>
                    <div className="text-xs text-surface-400">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
