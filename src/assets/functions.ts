import { api } from 'src/boot/axios';
import { Category } from 'src/components/models';

export async function getCategories(shopLocale: string): Promise<Category[]> {
  const res: { data: Category[] } = await api.post('shop/json', {
    action: 'getJSON',
    locale: shopLocale,
    json: 'categories',
  });
  return res.data;
}
