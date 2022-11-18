import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: () => import('./../views/Dashboard')
  },
  {
    path: '/add',
    name: 'add',
    component: () => import('./../views/Add')
  },
  {
    path: '/user',
    name: 'user',
    component: () => import('./../views/User')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('./../components/Login')
  },
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
