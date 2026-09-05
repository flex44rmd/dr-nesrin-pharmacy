export type ProductStatus = 'available' | 'unavailable';

export interface Product {
  id: string;
  categorySlug: string;
  name: string;
  /** relative path or full URL to the product image */
  image: string;
  /** short description shown on the category listing page, under the image */
  shortDescription: string;
  /** detailed description shown on the product page, under the image */
  detailDescription: string;
  status: ProductStatus;
}

export interface Review {
  id: string;
  name: string;
  role: string;
  rating: number;
  text: string;
}

export interface SiteSettings {
  pharmacyName: string;
  whatsapp: string;
  phone: string;
  facebook: string;
  instagram: string;
  tiktok: string;
  mapsUrl: string;
  ratingUrl: string;
  ratingLabel: string;
}

export interface SiteData {
  settings: SiteSettings;
  products: Product[];
  reviews: Review[];
}
