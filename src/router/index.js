import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store';
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const isLoggedIn = (to, from, next)=>{ 
  store.dispatch('getToken').then(res=>{
    if(res){
      return next()
    }
  }).catch(err=>{
    console.log(err);
    return next('/login')
  })
};

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter: isLoggedIn
  },
  {
    path: '/loading',
    name: 'Loading',
    component: ()=>import('../views/Loading.vue'),
    beforeEnter: isLoggedIn
  },
  {
    path: '/app/:id',
    name: 'AppPage',
    component: () => import('../views/AppPage.vue'),
    beforeEnter: isLoggedIn
  },
  {
    path: '/view',
    name: 'Viewer',
    beforeEnter: isLoggedIn,
    component: () => import ('../views/Viewer.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import ('../views/Login.vue')
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
