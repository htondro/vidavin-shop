
export interface Model {
  id: string;
  name: string;
  priceRange: string;
  slug: string;
  image: string[];
}
export interface Category {
  id: string;
  name: string;
  desc: string;
  slug: string;
  image: string[];
  models: Model[];
}

export interface Variation {
  id: string;
  name: string;
  subtitle: string;
  desc: string;
  wcid: string;
  wcPrice: number;
  quantity: number;
  available: boolean;
  slug: string;
  category: string;
  model: string;
  fields: string[];
  related: string[];
  priceIsComputed: boolean;
  computedPriceFunction: string;
  computedPrice: number;
  modelPriceRange: string;
  sellingPrice: number;
  discount: boolean;
  normalPrice: number;
  images: [string[]];
  meta: Record<string, string | number | null>;
}

export interface VariationField {
  id: string;
  label: string;
  desc: string;
  model: 'number' | 'text' | 'file';
  accepts: string;
  value: 'number' | 'text' | null;
}

export interface Customer {
  username: string | number;
  exist: boolean;
  firstName: string;
  lastName: string;
  phone: number | null;
  email: string;
  country: string;
  state: string;
  city: string;
  address: string;
  postcode: number | null;
}

export interface Banner {
  url: string;
  image: string[];
}
