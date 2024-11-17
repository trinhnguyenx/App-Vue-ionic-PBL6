import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import TabsPage from '../views/TabsPage.vue';

const routes: Array<RouteRecordRaw> = [
//   {
//     path: '/auth/login',
//     name: 'login',
//     component: () => import('),
// },
  {
    path: '/',
    component: () => import('@/views/auth/login.vue')
  },
  // {
  //   path: '/type-travel',
  //   component: () => import('@/views/preview/TypeTravelPage.vue')
  // },
  // {
  //   path: '/age-range',
  //   component: () => import('@/views/preview/AgeRangePage.vue')
  // },
  {
    path: '/tabs/',
    component: TabsPage,
    children: [
      {
        path: '',
        name: 'tabs',
        redirect: '/tabs/home'
      },
      {
        path: 'scan',
        component: () => import('@/views/Tab2Page.vue')
      },
      {
        path: 'wallet',
        name: 'profile',
        component: () => import('@/views/Tab3Page.vue')
      },
      {
        path: 'home',
        name: 'home',
        component: () => import('@/views/HomePage.vue')
      },
    ]
  },
  {
    path: '/auth/register',
    name: 'register',
    component: () => import('@/views/auth/register.vue')
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
