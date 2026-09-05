import { ArrowRight, MessageCircle, PackageSearch } from 'lucide-react';
import { getCategory } from '../lib/categories';
import { useSiteData } from '../lib/SiteDataContext';

export default function ProductPage({ id }: { id: string }) {
  const { data, loading } = useSiteData();
  const product = data.products.find((p) => p.id === id);
  const category = product ? getCategory(product.categorySlug) : undefined;

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center" dir="rtl">
        <p className="text-surface-400">جار التحميل...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center gap-4" dir="rtl">
        <PackageSearch className="w-12 h-12 text-surface-300" />
        <p className="text-surface-500 font-medium">هذا المنتج غير موجود.</p>
        <a href="#/" className="text-primary-600 font-semibold hover:underline">
          العودة للرئيسية
        </a>
      </div>
    );
  }

  const orderMessage = encodeURIComponent(`مرحباً، أريد الاستفسار عن منتج: ${product.name}`);

  return (
    <div className="min-h-screen bg-white" dir="rtl">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        <a
          href={category ? `#/category/${category.slug}` : '#/'}
          className="inline-flex items-center gap-2 text-surface-500 hover:text-primary-600 text-sm font-medium mb-8 transition-colors"
        >
          <ArrowRight className="w-4 h-4" />
          {category ? `العودة إلى ${category.title}` : 'العودة للرئيسية'}
        </a>

        <div className="grid md:grid-cols-2 gap-10 items-start">
          <div className="aspect-square bg-surface-100 rounded-3xl overflow-hidden">
            {product.image ? (
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-surface-300">
                <PackageSearch className="w-16 h-16" />
              </div>
            )}
          </div>

          <div>
            <span
              className={`inline-block mb-4 px-3 py-1 rounded-full text-xs font-semibold ${
                product.status === 'available'
                  ? 'bg-green-50 text-green-600'
                  : 'bg-red-50 text-red-500'
              }`}
            >
              {product.status === 'available' ? 'متوفر' : 'غير متوفر حالياً'}
            </span>
            <h1 className="text-2xl lg:text-3xl font-black text-surface-900 mb-4">{product.name}</h1>
            <p className="text-surface-500 leading-relaxed whitespace-pre-line mb-8">
              {product.detailDescription || product.shortDescription}
            </p>

            <a
              href={`${data.settings.whatsapp}?text=${orderMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-green-500 text-white font-bold rounded-2xl hover:bg-green-600 transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              اطلب عبر الواتساب
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
