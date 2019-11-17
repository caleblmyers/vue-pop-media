import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue')
  },
  {
    path: '/discover',
    name: 'discover',
    component: () => import(/* webpackChunkName: "discover" */ '../views/Discover.vue')
  },
  {
    path: '/results',
    name: 'results',
    component: () => import(/* webpackChunkName: "results" */ '../views/Results.vue'),
    props: true
  },
  {
    path: '/account',
    name: 'account',
    component: () => import(/* webpackChunkName: "account" */ '../views/Account.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue'),
    props: true
  },
  {
    path: '/register',
    name: 'register',
    component: () => import(/* webpackChunkName: "register" */ '../views/Register.vue')
  },
  {
    path: '/details/:type/:id',
    name: 'details',
    component: () => import(/* webpackChunkName: "results" */ '../views/Details.vue'),
  },
  { path: '*', component: () => import(/* webpackChunkName: "notFound" */ '../views/NotFound.vue') }
];

const router = new VueRouter({
  routes,
  mode: 'history',
  base: process.env.BASE_URL,
});

export default router;
