import { ArrowRight, PackageSearch } from 'lucide-react';
import { getCategory } from '../lib/categories';
import { useSiteData } from '../lib/SiteDataContext';

export default function CategoryPage({ slug }: { slug: string }) {
  const { data, loading } = useSiteData();
  const category = getCategory(slug);
  const products = data.products.filter((p) => p.categorySlug === slug);

  return (
    <div className="min-h-screen bg-surface-50" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        <a
          href="#/"
          className="inline-flex items-center gap-2 text-surface-500 hover:text-primary-600 text-sm font-medium mb-8 transition-colors"
        >
          <ArrowRight className="w-4 h-4" />
          العودة للرئيسية
        </a>

        <div className="mb-10">
          <h1 className="text-3xl lg:text-4xl font-black text-surface-900 mb-2">
            {category ? category.title : 'قسم غير معروف'}
          </h1>
          {category && <p className="text-surface-500">{category.description}</p>}
        </div>

        {loading ? (
          <p className="text-surface-400">جار التحميل...</p>
        ) : products.length === 0 ? (
          <div className="bg-white rounded-3xl border border-surface-100 p-16 text-center">
            <PackageSearch className="w-12 h-12 text-surface-300 mx-auto mb-4" />
            <p className="text-surface-500 font-medium">لا توجد منتجات مضافة في هذا القسم حالياً.</p>
            <p className="text-surface-400 text-sm mt-2">تواصلوا معنا عبر الواتساب للاستفسار عن توفر أي منتج.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((p) => (
              <a
                key={p.id}
                href={`#/product/${p.id}`}
                className="group bg-white rounded-3xl overflow-hidden border border-surface-100 hover:border-transparent shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col"
              >
                <div className="aspect-[4/3] bg-surface-100 overflow-hidden">
                  {p.image ? (
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-surface-300">
                      <PackageSearch className="w-10 h-10" />
                    </div>
                  )}
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-bold text-surface-900">{p.name}</h3>
                    <span
                      className={`shrink-0 px-2.5 py-1 rounded-full text-[11px] font-semibold ${
                        p.status === 'available'
                          ? 'bg-green-50 text-green-600'
                          : 'bg-red-50 text-red-500'
                      }`}
                    >
                      {p.status === 'available' ? 'متوفر' : 'غير متوفر حالياً'}
                    </span>
                  </div>
                  <p className="text-sm text-surface-400 leading-relaxed line-clamp-3 mb-4">
                    {p.shortDescription}
                  </p>
                  <span className="mt-auto text-sm font-semibold text-primary-600 group-hover:underline">
                    عرض التفاصيل ←
                  </span>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
