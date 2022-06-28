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
  slug: string;
  category: number;
  model: number;
  fields: number[];
  related: number;
  price: number;
  image1: string[];
  image2: string[];
  image3: string[];
  image4: string[];
}
