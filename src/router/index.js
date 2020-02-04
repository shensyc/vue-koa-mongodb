import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    redirect:'/index'
  },
  {
    path: '/index',
    name: 'index',
    component: Home,
    meta:{
      requiresAuth:true
    }
  },
  {
   path:'/login',
   name:'login',
   component:()=>import('../views/Login.vue')
  },
  {
    path:'/edit',
    name:'edit',
    component:()=>import('../views/Edit.vue')
  },
  {
    path:'/register',
    name:'register',
    component:()=>import('../views/Register.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
