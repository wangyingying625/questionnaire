import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'guide',
      component:()=> import('@/views/guide')
    },
    {
      path: '/home',
      name: 'home',
      component:()=> import('@/views/index')
    },
    {
      path: '/success',
      name: 'success',
      component: ()=> import('@/views/success')
    },
    {
      path: '/result',
      name: 'result',
      component: ()=> import('@/views/result')
    },
    {
      path: '/view',
      name: 'view',
      component: ()=> import('@/views/view')
    },
    {
      path: '/search',
      name: 'search',
      component: ()=> import('@/views/search')
    }
  ]
})
