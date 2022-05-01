import { createRouter, createWebHashHistory  } from 'vue-router'
import { useStore } from '../store/pinia';

let store: any = null;

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'userinfo',
      component: ()=>import('@/views/user/userdefault.vue')
    },

    {
      path: '/entry',
      name: 'entry',
      component: () => import('@/views/entrance/entry.vue'),
      children:[
        {
          path: '',
          name:'login',
          component: () => import('@/views/entrance/login.vue')
        },
        {
          path: 'register',
          name:'register',
          component: () => import('@/views/entrance/register.vue')
        },
      ]
    },

    {
      path:'/data',
      name:'data',
      component:()=> import('@/views/data/default.vue')
    }
    
  ]
})

//路由守卫
router.beforeEach((to, from,next) => {
  // 初始化store放在这里
  if (store === null) {
    store = useStore();
  }
  
  if (!store.isLogin) {
    if (to.name!=='login'&&to.name!=='register') {
      next({name:'login'})
    }else{
      next()
    }
  }else{
    next()
  }

})

export default router
