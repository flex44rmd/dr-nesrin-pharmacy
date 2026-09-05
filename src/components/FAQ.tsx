import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Plus, Minus } from 'lucide-react';

export default function FAQ() {
  const { ref, isVisible } = useScrollReveal();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: 'هل يمكنني طلب الأدوية عبر الهاتف أو الواتساب؟',
      answer: 'بالتأكيد! يمكنك إرسال طلبك عبر الواتساب أو الاتصال بنا مباشرة. سنجهز طلبك ونوصله لباب بيتك في أسرع وقت ممكن. خدمة الطلب الإلكتروني متاحة 24/7.',
    },
    {
      question: 'ما هي مدة التوصيل؟ وهل هو مجاني؟',
      answer: 'نوصل طلبك خلال 30 دقيقة داخل المدينة. التوصيل مجاني لجميع الطلبات لأعضاء برنامج الولاء، و30 دج للطلبات العادية.',
    },
    {
      question: 'هل تقدمون استشارات طبية مجانية؟',
      answer: 'نعم! فريق الصيادلة المتخصصين يقدم استشارات مجانية لجميع العملاء. يمكنك استشارتهم حول أدويتك، التفاعلات الدوائية، والنصائح الصحية العامة.',
    },
    {
      question: 'كيف أضمن أن الأدوية أصلية؟',
      answer: 'نستورد أدويتنا مباشرة من المصانع المعتمدة ولدينا شهادات جودة رسمية. كل منتج يمر بفحص دقيق قبل عرضه للبيع. نضمن لك الجودة والأصالة 100%.',
    },
    {
      question: 'ما هي أوقات العمل؟',
      answer: 'نحن متاحون يومياً من الساعة 8:00 صباحاً حتى 10:00 مساءً، بما في ذلك عطلات نهاية الأسبوع والأعياد. خدمة الطلب عبر الواتساب متاحة على مدار الساعة.',
    },
    {
      question: 'هل يمكنكم تحضير وصفات طبية خاصة؟',
      answer: 'نعم، نحضر جميع الوصفات الطبية ونضمن لك الحصول على الأدوية المطلوبة. في حالة عدم توفر دواء معين، نوفر لك بديلاً معتمداً بنفس الفعالية.',
    },
    {
      question: 'كيف أتنضم لبرنامج الولاء؟',
      answer: 'انضمامك مجاني! فقط زور الصيدلية أو اتصل بنا وسنقوم بتسجيلك فوراً. ستحصل على بطاقة عضوية تمنحك خصومات حصرية ومزايا إضافية مع كل طلب.',
    },
    {
      question: 'هل تقدمون خدمات قياس الضغط والسكر؟',
      answer: 'نعم! نقدم خدمة مجانية لقياس الضغط والسكر لجميع العملاء. يمكنك زيارة الصيدلية في أي وقت لإجراء هذه القياسات مع نصائح من فريقنا الصيدلاني.',
    },
  ];

  return (
    <section id="faq" ref={ref} className="py-20 lg:py-32 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 text-primary-600 text-sm font-semibold mb-6">
            ❓ الأسئلة الشائعة
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-surface-900 mb-6 leading-tight">
            كل ما تريد
            <span className="gradient-text"> معرفته</span>
          </h2>
          <p className="text-lg text-surface-500 leading-relaxed">
            إجابات على أكثر الأسئلة شيوعاً حول خدماتنا
          </p>
        </motion.div>

        {/* FAQ List */}
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="group"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className={`w-full text-right p-6 rounded-2xl border transition-all duration-300 ${
                  openIndex === i
                    ? 'bg-white border-primary-200 shadow-lg shadow-primary-500/10'
                    : 'bg-surface-50 border-surface-100 hover:bg-white hover:border-surface-200 hover:shadow-md'
                }`}
                aria-expanded={openIndex === i}
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="font-bold text-surface-900 text-base">
                    {faq.question}
                  </span>
                  <div className={`flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-300 ${
                    openIndex === i
                      ? 'bg-primary-100 text-primary-600 rotate-180'
                      : 'bg-surface-100 text-surface-400 group-hover:bg-primary-50 group-hover:text-primary-500'
                  }`}>
                    {openIndex === i ? (
                      <Minus className="w-4 h-4" />
                    ) : (
                      <Plus className="w-4 h-4" />
                    )}
                  </div>
                </div>
                <AnimatePresence>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="pt-4 text-surface-500 leading-relaxed text-sm">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
