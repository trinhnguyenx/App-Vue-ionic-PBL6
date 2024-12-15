import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import TabsPage from '../views/TabsPage.vue';

const routes: Array<RouteRecordRaw> = [
{
    path: '/auth/login',
    name: 'login',
    component: () => import('@/views/auth/login.vue'),
},
{
  path: '/form/:userId',
  name: 'FormPage',
  component: () => import('@/views/FormPage.vue'),
},
{
  path: '/verify-gplx',
  name: 'GplxPage',
  component: () => import('@/views/GplxPage.vue'),
},
{
  path: '/verify-bhyt',
  name: 'BhytPage',
  component: () => import('@/views/BhytPage.vue'),
},
{
  path: '/cccd-view',
  name: 'CCCDView',
  component: () => import('@/views/CCCDView.vue'),
},
{
  path: '/bhyt-view',
  name: 'BHYTView',
  component: () => import('@/views/BHYTView.vue'),
},
{
  path: '/gplx-view',
  name: 'GPLXView',
  component: () => import('@/views/GPLXView.vue'),
},

  {
    path: '/',
    component: () => import('@/views/auth/login.vue')
  },
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
        component: () => import('@/views/Tab2Page.vue'),
        name: 'Scan'
      },
      {
        path: 'wallet',
        name: 'wallet',
        component: () => import('@/views/Tab3Page.vue')
      },
      {
        path: 'settings',
        name: 'settings',
        component: () => import('@/views/Tab5Page.vue')
      },
      {
        path: 'notification',
        name: 'notification',
        component: () => import('@/views/Tab4Page.vue')
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
