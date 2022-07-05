import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/CategoriesPage.vue'),
        name: 'Models',
      },
      {
        path: '/vp-:id(\\d+)/:slug',
        component: () => import('pages/VariationsPage.vue'),
        props: (route) => ({ slug: route.params.slug, id: route.params.id }),
        name: 'Variations',
      },
      {
        path: 'var-:id(\\d+)/:slug',
        component: () => import('pages/VariationPage.vue'),
        name: 'Variation',
        props: (route) => ({
          id: route.params.id,
          slug: route.params.slug,
        }),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
