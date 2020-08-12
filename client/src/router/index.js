import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

import UserService from '../services/user.service';

Vue.use(VueRouter);

const routes = [{
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/signup',
    name: 'Signup',
    component: () => import('../views/Signup.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../views/Profile.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    path: '/settings/:section',
    name: 'Settings',
    component: () => import('../views/Settings.vue')
  },

  // important to leave this as the last element
  {
    path: '*',
    name: '404',
    component: () => import('../views/404.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});


router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    UserService.isLoggedIn().then(result => {
      if (result.user) {
        next();
      } else {
        next({
          name: 'Login'
        });
      }
    }).catch(err => {
      console.error(err);
    });
  } else {
    next();
  }
});

export default router;