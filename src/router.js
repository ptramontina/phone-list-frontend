import Vue from 'vue'
import Router from 'vue-router'
import { getToken } from './helpers/local-storage'

import Application from './components/Application'
import PhoneList from './components/PhoneList'

import Login from './components/Login'

import Phones from './components/Phones'
import Phone from './components/Phone'

import Users from './components/Users'
import User from './components/User'

Vue.use(Router)

export const router = new Router({
  mode: 'history',
  routes: [
    { path: '/login', component: Login },
    { path: '*', redirect: '/' },
    { 
      path: '/', 
      redirect: '/phone-list',
      component: Application, 
      children: [
        { 
          path: '/phone-list', 
          component: PhoneList, 
        },      
        {
          path: 'users/:userid/phones', 
          component: Phones, 
          props: true,
          meta: { requiresAuth: true } 
        },
        {
          path: 'users/:userid/phones/create', 
          component: Phone, 
          props: true,
          meta: { requiresAuth: true } 
        },
        {
          path: 'users/:userid/phones/:phoneid/edit', 
          component: Phone, 
          props: true,
          meta: { requiresAuth: true } 
        },
        {
          path: '/users', 
          component: Users, 
          meta: { requiresAuth: true },
        },
        {
          path: 'users/create',
          component: User,
          meta: {requiresAuth: true}
        },
        {
          path: 'users/:id/edit',
          component: User,
          props: true,
          meta: {requiresAuth: true}
        }
      ]
    }    
  ]
})

router.beforeEach((to, from, next) => {
  const loggedIn = getToken()

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!loggedIn) {
      next({path:'/login', query: { redirect: to.fullPath }})
    } else {
      next()
    }
  } else {
    next()
  }

})