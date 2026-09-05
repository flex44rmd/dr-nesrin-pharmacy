export interface Category {
  slug: string;
  title: string;
  description: string;
  gradient: string;
  bg: string;
  iconColor: string;
  iconName: 'HeartPulse' | 'Baby' | 'Eye' | 'Smile' | 'Pill' | 'Activity' | 'UtensilsCrossed' | 'Droplets';
}

export const CATEGORIES: Category[] = [
  {
    slug: 'chronic-diseases',
    iconName: 'HeartPulse',
    title: 'أدوية الأمراض المزمنة',
    description: 'السكري، الضغط، القلب والكوليسترول',
    gradient: 'from-red-500 to-rose-600',
    bg: 'from-red-50 to-rose-50',
    iconColor: 'text-red-600',
  },
  {
    slug: 'mother-child',
    iconName: 'Baby',
    title: 'الأم والطفل',
    description: 'حفاضات، حليب، رعاية طفلك',
    gradient: 'from-pink-500 to-rose-500',
    bg: 'from-pink-50 to-rose-50',
    iconColor: 'text-pink-600',
  },
  {
    slug: 'skin-care',
    iconName: 'Eye',
    title: 'العناية بالبشرة',
    description: 'منتجات عالمية لجمال بشرتك',
    gradient: 'from-amber-500 to-orange-500',
    bg: 'from-amber-50 to-orange-50',
    iconColor: 'text-amber-600',
  },
  {
    slug: 'dental-care',
    iconName: 'Smile',
    title: 'العناية بالأسنان',
    description: 'كل ما تحتاجه لنظافة فمك',
    gradient: 'from-cyan-500 to-blue-500',
    bg: 'from-cyan-50 to-blue-50',
    iconColor: 'text-cyan-600',
  },
  {
    slug: 'supplements',
    iconName: 'Pill',
    title: 'المكملات الغذائية',
    description: 'فيتامينات ومعادن لجسم أقوى',
    gradient: 'from-green-500 to-emerald-500',
    bg: 'from-green-50 to-emerald-50',
    iconColor: 'text-green-600',
  },
  {
    slug: 'medical-devices',
    iconName: 'Activity',
    title: 'الأجهزة الطبية',
    description: 'أجهزة قياس ومراقبة صحية',
    gradient: 'from-purple-500 to-violet-600',
    bg: 'from-purple-50 to-violet-50',
    iconColor: 'text-purple-600',
  },
  {
    slug: 'therapeutic-food',
    iconName: 'UtensilsCrossed',
    title: 'الأغذية العلاجية',
    description: 'طعام صحي لحالات خاصة',
    gradient: 'from-lime-500 to-green-500',
    bg: 'from-lime-50 to-green-50',
    iconColor: 'text-lime-600',
  },
  {
    slug: 'perfumes-care',
    iconName: 'Droplets',
    title: 'العطور والعناية',
    description: 'أفضل العطور العالمية',
    gradient: 'from-indigo-500 to-purple-500',
    bg: 'from-indigo-50 to-purple-50',
    iconColor: 'text-indigo-600',
  },
];

export function getCategory(slug: string): Category | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}
