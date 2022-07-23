import { api } from 'src/boot/axios';
import { Category, Variation, Model, VariationField, Banner } from 'src/components/models';

export async function getCategories(): Promise<Category[]> {
  const res: { data: Category[] } = await api.post('shop/content', {
    action: 'getCategories',
    data: {},
  });
  return res.data;
}
export async function getVariations(id: number): Promise<Variation[]> {
  const res: { data: Variation[] } = await api.post('shop/content', {
    action: 'getVariations',
    data: {
      modelId: id,
    },
  });
  return res.data;
}

export async function getModel(id: number): Promise<Model> {
  const res: { data: Model } = await api.post('shop/content', {
    action: 'getModel',
    data: { modelId: id },
  });
  return res.data;
}

export async function getVariation(id: string): Promise<Variation> {
  const res: { data: Variation } = await api.post('shop/content', {
    action: 'getVariation',
    data: { varId: id },
  });
  return res.data;
}

export async function getProductDesc(wcid: string): Promise<string> {
  const res: { data: string } = await api.post('shop/content', {
    action: 'getProductDesc',
    data: {
      wcid: wcid,
    }
  });
  return res.data;
}

export async function getProductSpecs(wcid: string): Promise<string> {
  const res: { data: string } = await api.post('shop/content', {
    action: 'getProductSpecs',
    data: {
      wcid: wcid,
    }
  });
  return res.data;
}

export async function getVariationFields(fields: string[]): Promise<VariationField[]> {
  const res: { data: VariationField[] } = await api.post('shop/content', {
    action: 'getVariationFields',
    data: {
      fields: fields,
    }
  });
  return res.data;
}


export async function getBanners(position: string): Promise<Banner[]> {
  const res: { data: Banner[] } = await api.post('shop/content', {
    action: 'getBanners',
    data: {
      position: position,
    }
  });
  return res.data;
}
