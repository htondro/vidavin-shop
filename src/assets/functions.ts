import { api } from 'src/boot/axios';
import { Category, Variation } from 'src/components/models';

export async function getCategories(): Promise<Category[]> {
  const res: { data: Category[] } = await api.post('shop/content', {
    action: 'getCategories',
    data: {},
  });
  return res.data;
}
export async function getVariations(): Promise<Variation[]> {
  const res: { data: Variation[] } = await api.post('shop/content', {
    action: 'getVariations',
    data: {},
  });
  return res.data;
}
