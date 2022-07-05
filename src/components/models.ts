export interface Todo {
  id: number;
  content: string;
}

export interface Meta {
  totalCount: number;
}
export interface Model {
  id: number;
  name: string;
  desc: string;
  slug: string;
  image: string[];
}
export interface Category {
  id: number;
  name: string;
  desc: string;
  slug: string;
  image: string[];
  models: Model[];
}

export interface Variation {
  id: number;
  name: string;
  desc: string;
  wcid: string;
  slug: string;
  category: string;
  model: string;
  fields: string[];
  related: string[];
  price: number;
  images: [string[]];
}
