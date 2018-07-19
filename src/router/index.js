import Vue from 'vue'
import Router from 'vue-router'

import HelloWorld from '@/components/HelloWorld'
import Mine from '@/views/mine/Mine'
import Login from '@/views/user/Login'
import Register from '@/views/user/Register'
import FindPassword from '@/views/user/FindPassword'



Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
      /*children:[
        { path: '/register/account-validate', component: AccountValidate},
        { path: '/mine/Register', component: Register}
      ]*/
    },
    {
      path: '/find-password',
      component: FindPassword,
    },
    {
      path: '/mine',
      component: Mine,
    },
  ]
})
