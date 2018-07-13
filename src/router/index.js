import Vue from 'vue'
import Router from 'vue-router'

import HelloWorld from '@/components/HelloWorld'
import Mine from '@/views/mine/Mine'
import Login from '@/views/login/Login'
import Register from '@/views/register/Register'
import AccountValidate from '@/views/register/AccountValidate'



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
      path: '/mine',
      component: Mine,
    },
  ]
})
