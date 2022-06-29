import { api } from 'src/boot/axios';
import { Category, Variation, Model } from 'src/components/models';

export async function getCategories(): Promise<Category[]> {
  const res: { data: Category[] } = await api.post('shop/content', {
    action: 'getCategories',
    data: {},
  });
  return res.data;
}
export async function getVariations(modelSlug: string): Promise<Variation[]> {
  const res: { data: Variation[] } = await api.post('shop/content', {
    action: 'getVariations',
    data: {
      modelSlug: modelSlug,
    },
  });
  return res.data;
}

export async function getModel(modelSlug: string): Promise<Model> {
  const res: { data: Model } = await api.post('shop/content', {
    action: 'getModel',
    data: { modelSlug: modelSlug },
  });
  return res.data;
}
