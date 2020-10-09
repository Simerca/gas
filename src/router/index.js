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
    console.log('from',to)
    return next(`/login?redirect=${to.path}`)
  })
};

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/loading',
    name: 'Loading',
    component: ()=>import('../views/Loading.vue'),
    beforeEnter: isLoggedIn
  },
  {
    path: '/app/:id_app',
    name: 'AppPage',
    component: () => import('../views/AppPage.vue'),
  },
  {
    path: '/categorie',
    name: 'AppList',
    component: () => import('@/views/Categories.vue'),
    children:[
      {path:':categorie', component:()=>import('@/components/AppsList.vue')}
    ]
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
    path: '/creators',
    name: 'Creators',
    beforeEnter: isLoggedIn,
    component: () => import ('../views/Creators.vue'),
    children:[
      {path:'', component:()=>import('@/components/Creators/Dashboard')},
      {path:'add', component:()=>import('@/components/Creators/AddYourApp')},
      {path:'edit/:id_app', component:()=>import('@/components/Creators/AddYourApp')},
    ]
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
