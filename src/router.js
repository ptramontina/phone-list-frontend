import Vue from 'vue';
import Router from 'vue-router';
import { getToken } from './helpers/localStorage'

import Application from './components/Application'
import Login from './components/Login'

Vue.use(Router);

export const router = new Router({
  mode: 'history',
  routes: [
    { path: '/', component: Application },
    { path: '/login', component: Login },

    // otherwise redirect to home
    { path: '*', redirect: '/' }
  ]
});

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/login'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = getToken();

  if (authRequired && !loggedIn) {
    return next('/login');
  }

  return next();
})