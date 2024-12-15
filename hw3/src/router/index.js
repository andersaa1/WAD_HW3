import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue';
import auth from '../auth'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    beforeEnter: async (to, from, next) => {
      const authenticated = await auth.authenticated();  // Check if authenticated
      if (authenticated) {
        next();  // Allow access to home if authenticated
      } else {
        next({ name: 'login' });  // Redirect to login if not authenticated
      }
    },
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import(/* webpackChunkName: "about" */ '../views/SignupView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/post',
    name: 'post',
    component: () => import('../views/AnyPost.vue')
  },
  {
    path: '/addpost',
    name: 'addpost',
    component: () => import('../views/AddPost.vue')
  },
  {
    path: '/contact',
    name: 'contact',
    component: () => import('../views/ContactsView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
