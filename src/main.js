import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import routes from './router.js'
import Axios from 'axios'
import VueProgressBar from 'vue-progressbar'
import Swal from 'sweetalert2'
import jwt from 'jsonwebtoken'
import moment from 'moment'
import './jsfiles'
import './assets/js/main'

Vue.prototype.$http = Axios

Vue.use(VueProgressBar, {
    color: '#bffaf3',
    failedColor: '#874b4b',
    height: '8px'
})

import 'vue-loading-overlay/dist/vue-loading.css';
Vue.component('Loading', require('vue-loading-overlay'));

import CKEditor from '@ckeditor/ckeditor5-vue';
Vue.use(CKEditor);

window.Swal = Swal

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfiguration: false,
    timer: 3000
})

window.Toast = Toast

Vue.filter('myDate', function(created) {
  return moment(created).format('MMMM Do YYYY');
});

let Fire = new Vue()
window.Fire = Fire

Vue.use(VueRouter)

const router = new VueRouter({
	routes: routes,
	mode: 'history'
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  let user
  try{
    const decodedToken = jwt.verify(token, 'secretkey')
    user = {
      userID: decodedToken.userID,
      name: decodedToken.username,
      role: decodedToken.role
    }
    window.user = user;
    window.token = token
  }catch(err){
    //
  }
  if (to.matched.some(record => record.meta.requiresAuth)) {

    if (!token || user.role == undefined) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next() 
  }
})

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
