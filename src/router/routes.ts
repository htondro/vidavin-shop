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
        path: '/vp/:slug',
        component: () => import('pages/VariationsPage.vue'),
        props: (route) => ({ slug: route.params.slug }),
        name: 'Variations',
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
