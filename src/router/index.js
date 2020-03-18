import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: resolve => require(['../views/Home.vue'], resolve) 
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    component: resolve => require(['../views/About.vue'], resolve) 
  },
  {
    path: '/curTime',
    name: 'curTime',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "about" */ '../views/curTime.vue')
    component: resolve => require(['../views/curTime.vue'], resolve) 
  },
  {
    path: '/PDF',
    name: 'PDF',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "about" */ '../views/PDF.vue')
    component: resolve => require(['../views/PDF.vue'], resolve)
  },
  {
    path: '/curTimeDo',
    name: 'curTimeDoPDF',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "about" */ '../views/curTimeDo.vue')
    component: resolve => require(['../views/curTimeDo.vue'], resolve)
  },
  {
    path: '/systemPre',
    name: 'systemPre',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "about" */ '../views/systemPre.vue')
    component: resolve => require(['../views/systemPre.vue'], resolve)
  },
  {
    path: '/test',
    name: 'test',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/test.vue')
  },

]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
